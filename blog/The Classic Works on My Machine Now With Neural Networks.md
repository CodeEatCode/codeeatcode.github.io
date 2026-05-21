---
title: "The Classic 'Works on My Machine' — Now With Neural Networks"
slug: the-classic-works-on-my-machine-now-with-neural-networks
date: 2026-05-21T09:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - python
  - lessons-learned
  - document-parsing
  - testing
---

I built the evaluation harness first. Ten libraries, same documents, same
metrics, timestamped results, HTML report. Proper engineering. And I still
ended up in a five-week infrastructure nightmare.

This is about why.

<!-- truncate -->

## The requirements were genuinely hard

It's easy to read the [Docling post-mortem](/we-spent-five-weeks-making-docling-work-then-we-deleted-it/)
on this blog and conclude that we reached for the wrong tool. But the
requirements weren't trivial, and I want to be honest about that.

We needed a parser that could handle:

- **Rasterised PDFs** — scanned documents with no embedded text
- **Table detection** — not just "there is a table here" but structure extraction
- **Merged cells** — tables where cells span multiple rows or columns
- **Layout detection** — understanding headings, sections, figures as distinct elements
- **Picture descriptions** — extracting meaning from embedded images

Most PDF parsing libraries handle one or two of these. The lightweight ones
— pdfplumber, pypdf, PyMuPDF — are excellent for native digital PDFs with
clean text, but they're not designed for the document complexity we were
dealing with. We needed something that understood documents as structured
objects, not as streams of text.

Docling handled all of it.

## The harness said so

I built a comparison harness before committing to anything — ten parsers, a
standardised subprocess-based runner, isolated output per library, metrics
covering wall-clock time, peak memory, word counts, table detection, heading
extraction. You can find it here:
[github.com/ambersariya/pdf-parsing-comparison](https://github.com/ambersariya/pdf-parsing-comparison).

I ran it against a set of representative documents. Docling won on every
qualitative dimension that mattered: table structure, merged cells, layout
comprehension, image handling. It wasn't close. The other libraries produced
flat text extractions. Docling produced structured, readable Markdown that
actually reflected the document's intent.

The harness was doing its job. The numbers were real.

## The problem was the machine

I ran all of this on an M4 Pro MacBook. Apple Silicon with MPS
acceleration — for PyTorch workloads, that's not far off GPU performance.
Docling's layout models, its table structure analysis, its OCR pipeline — all
of it ran fast. Fast enough that performance never became a question worth
asking.

Production ran on CPU-based Kubernetes nodes.

The gap between those two environments for an ML inference workload is not
a percentage difference. It's a different order of magnitude. What took
seconds on the M4 took minutes on a CPU pod. The OMP thread throttling,
the concurrency tuning, the performance whack-a-mole documented in the
post-mortem — all of it was a consequence of running local ML inference on
hardware it wasn't designed for.

The harness was correct. The harness environment was not representative.

## The pressure factor

There's a human element worth naming too. We were under pressure to find a
solution that met those qualitative requirements, and Docling met them
convincingly. When you're looking for something specific and you find it, the
instinct is to commit — not to ask what happens when you move it to a
different machine.

That instinct is understandable. It's also exactly when the infrastructure
question matters most. The harder the requirements, the more likely you're
reaching for a heavy tool — and heavy tools are the ones most sensitive to
the hardware they run on.

## What the evaluation was missing

In hindsight, the harness needed one more dimension: a production-equivalent
environment. Running the same comparison on a CPU-constrained container would
have surfaced the performance characteristics immediately. The qualitative
winners would have been the same. The decision might not have been.

For ML-heavy libraries specifically, the evaluation environment is part of the
evaluation. A benchmark on Apple Silicon is not a benchmark for a CPU pod.
That sounds obvious written down. It was not obvious in the moment.

The other thing worth checking earlier: whether a managed API could meet the
same qualitative bar. In our case, Claude via Bedrock handled rasterised pages,
tables, merged cells, layout, and picture descriptions — via the same vision
pipeline we use for everything else. No local models. No infrastructure. We
didn't know that when we started, but we could have found out faster.

## The harness is still worth building

None of this is an argument against evaluation harnesses. Building one before
committing to a library is still the right instinct — it forces you to define
what "good" means before you've seen any results, and it makes the comparison
repeatable and shareable.

The lesson is narrower: for any library that runs local inference, add hardware
parity to the checklist. Run it on something that resembles production before
you wire it into the Dockerfile.

The harness told the truth. We just didn't ask it the right question.
