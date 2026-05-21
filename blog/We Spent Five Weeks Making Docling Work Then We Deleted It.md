---
title: We Spent Five Weeks Making Docling Work. Then We Deleted It.
slug: we-spent-five-weeks-making-docling-work-then-we-deleted-it
date: 2026-05-21T08:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - python
  - lessons-learned
  - document-parsing
---

This is a post-mortem on five weeks of infrastructure work that ended with
`git rm` and 1,452 lines deleted from the lockfile alone.

The library in question is [Docling](https://github.com/DS4SD/docling). It's
a capable open-source document parser from IBM Research — handles PDFs,
tables, figures, DOCX, the lot. On paper it looked like exactly what we needed.
In practice it turned out to be a small ML platform hiding inside a Python
package, and we didn't fully appreciate that distinction until we were already
three acts deep.

<!-- truncate -->

## Act I: The Optimistic Beginning

The first pull request adding Docling was merged and reverted on the same day.
A flag from the universe that was politely ignored.

A couple of days later it was back in with the proper integration. The
complications started immediately:

- A Docker entrypoint script was needed to pre-download HuggingFace models at
  container startup
- `HOME` and `HF_HOME` env vars had to be manually set so the image could
  write to its own cache directories
- The `DOCLING_MODELS` list kept breaking as a shell argument — positional
  args split incorrectly, then comma-separated, then space-separated — three
  separate fixes for what should have been a config value
- Tesseract OCR and OpenCV had to be added to the runtime Docker stage
- EasyOCR kept sneaking back into the model list and had to be explicitly
  excluded every time

None of this is catastrophic. But it's the kind of friction that tells you
something about what you're dealing with.

## Act II: The Model Infrastructure Tax

Because Docling models can't be downloaded at cold-start in production — too
slow, no egress — a CI/CD model sync workflow was introduced to pre-bake them
into S3. This became its own small project: a GitHub Actions workflow to sync
models, config to point Docling at the S3 cache path, and downstream fixes
when the sync workflow itself had bugs.

The application now had an out-of-band model synchronisation pipeline that had
to be kept in step with the Docling version in `pyproject.toml`. Updating the
OCR engine or parser models meant updating the Dockerfile, updating the sync
workflow, and triggering the S3 pipeline before deploy — in that order.

This is the moment where "we added a parsing library" became "we are now
operating a small model registry."

## Act III: The Performance Whack-a-Mole

- OMP thread count reduced from 4 to 2 because Docling was spawning more CPU
  threads than the pod's limit. The pod was being throttled.
- `images_scale` pinned to 1.0, accelerator switched to `AUTO`
- Thread bootstrap broke entirely and had to be fixed
- The parse method was decomposed to make tuning easier
- OCR engine switched from EasyOCR to RapidOCR — which then had to be added to
  the model sync workflow and the Docker defaults
- OCR skipped entirely for native digital PDFs — meaning Docling's headline
  feature wasn't being used for the most common input type

On the same day as that last round of fixes, a VLM-based parser was added and
validated in a few hours. It used Bedrock's document API directly. No local
models. No thread budget. Just an API call.

## Act IV: The Quiet Betrayal

A config change silently disabled Docling routing and enabled the VLM parsers
by default. Docling was still in the codebase, still in the Docker image, still
pulling in Torch and Tesseract and RapidOCR and a full HuggingFace model cache.

It was handling zero traffic.

## Act V: The Purge

Gone. All of it.

- The Docling parser and all its tests
- The S3 model sync CI workflow
- All Docling-specific settings and constants
- Torch, Tesseract, OpenCV from the build
- The Docker entrypoint script
- The thread-count tuning, the `images_scale` pin, all of it

1,452 lines deleted from `uv.lock` alone.

## What replaced it

Two parsers, one fallback chain, zero local ML models.

The primary path sends the raw document bytes directly to Bedrock as a document
content block — one API call, no pre-processing. Claude handles layout, tables,
and embedded images natively. The only constraint is an undocumented ~4.5 MB
limit on document blocks; files over that automatically fall through to the
fallback.

The fallback rasterises each page to an image using `pypdfium2` and sends them
to Bedrock vision in parallel. DOCX files go through LibreOffice headless first
to become a PDF, then hit the same rasterise-and-describe path.

The comparison:

| Concern | Docling | Now |
|---|---|---|
| PDF text extraction | Torch + Tesseract + layout models | Bedrock document block |
| Tables | Docling HTML table mode | Claude extracts to HTML natively |
| Images / figures | SmolVLM locally | Bedrock vision per page |
| DOCX | pydocx parser | LibreOffice → PDF → same VLM path |
| Dependencies | Torch, Tesseract, RapidOCR, OpenCV, HF models | pypdfium2, LibreOffice (system) |
| Infrastructure | S3 model sync pipeline, entrypoint bootstrap | Nothing — models live in Bedrock |

The entire local inference stack is gone. Parsing is now API calls with a
lightweight rasterisation step as fallback for large files.

## The lesson, if there is one

Docling required bundling a mini ML stack — Torch, Tesseract, RapidOCR,
HuggingFace models — plus a dedicated S3 sync pipeline and several rounds of
thread-count tuning, to do PDF parsing that a Bedrock API call does better with
zero infrastructure overhead and a thirty-line parser class.

In hindsight the clue was in the very first day: merged and reverted before
anyone had even run it in a container. The library wasn't broken — it did what
it said. The mistake was not recognising early enough that we were running local
inference on CPU-based nodes. Docling's layout models and OCR pipeline are
designed for GPU workloads — on CPU they're slow by nature, not by
misconfiguration. No amount of OMP thread tuning was going to fix that.
We gave it a Kubernetes pod with a CPU limit and spent three weeks wondering
why it was slow, when the answer was baked into the infrastructure choice
from the start.

To be clear: Docling is a capable library. On GPU-backed infrastructure, with
a proper model serving layer, it likely performs well — and there are
self-hosted or air-gapped contexts where a managed API isn't an option and
something like Docling is exactly the right tool. We may also have missed
configuration options that would have helped. It's entirely possible that
with different infrastructure or more time, we'd have got there.

But that's the point. The question isn't whether a tool works in the right
environment — it's whether your environment is the right one for it. Running
local inference on CPU nodes in an application service, when a managed API
exists that does the job with less ops surface, is a mismatch. Not a failure
of the tool. A failure of context.

We learnt it the expensive way.
