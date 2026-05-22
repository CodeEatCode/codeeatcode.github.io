---
title: "The Classic 'Works on My Machine' — Now With Neural Networks"
slug: the-classic-works-on-my-machine-now-with-neural-networks
date: 2026-05-21T09:00:00.000Z
last_updated: 2026-05-21T12:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - python
  - lessons-learned
  - document-parsing
  - testing
---

There's a version of this story where we made a mistake and fixed it. That's true but incomplete. The fuller version is about what a structured evaluation process gets right, what it misses, and how the ground can shift under you even when you've done the work.

<!-- truncate -->

## Why Document Fidelity Matters

Our virtual assistant answers questions by retrieving content from product documentation — policies, guides, structured forms. For retrieval to produce accurate, grounded answers, the source material has to survive parsing intact.

This sounds obvious until you see what "not intact" looks like in practice. A table rendered as a flat string of values with no row or column relationship. A heading that becomes a bold paragraph indistinguishable from body copy. A figure caption attached to nothing. These aren't cosmetic defects — they're retrieval failures. The model can't correctly reference what wasn't preserved.

Our requirements were non-negotiable:

- **Scanned and rasterised PDFs** — documents with no embedded text layer, relying entirely on OCR
- **Table structure** — including merged cells, multi-row headers, nested content
- **Layout and heading hierarchy** — sections, subsections, callouts, columns
- **Image semantics** — figures and diagrams needed descriptions, not just placeholders

Without these, the knowledge base becomes a lossy approximation of the actual documents. RAG answers become confidently wrong.

## Starting Simple, Hitting Walls

We started where most teams start: the obvious libraries. `python-docx` for Word documents, `pdfplumber`, `pypdf`, and `PyMuPDF` for PDFs. These are excellent tools — fast, lightweight, well-maintained, and more than capable for clean digital documents.

Our documents weren't clean. The simpler libraries handled native digital PDFs without trouble but broke down on scanned content and gave up entirely on complex table structures. Merged cells became misaligned rows. Headings lost their hierarchy. OCR was absent or rudimentary.

We needed to go deeper.

## Building the Evaluation Harness

Rather than try libraries one at a time, we built a structured comparison harness — [available here](https://github.com/ambersariya/pdf-parsing-comparison) if you want to run it yourself. Ten parsers, standardised document inputs representing the range of formats we'd encounter in production, and a consistent set of metrics:

- Wall-clock parse time
- Peak memory consumption
- Word count accuracy (proxy for text extraction fidelity)
- Table detection and structure preservation
- Heading and layout extraction quality

The harness made evaluation repeatable and honest. We ran everything through the same documents, measured the same things, and scored against the same rubric.

**Docling won on every qualitative dimension that mattered.** It produced structured, readable Markdown that actually reflected the document's intent — tables with correct cell relationships, headings with correct hierarchy, image descriptions, and full OCR support for scanned content. For our requirements, it wasn't close.

We shipped it.

## The Constraint We Didn't Measure

Here is where the story gets instructive.

Docling is not a lightweight parser. It's a neural network pipeline: layout detection models, table structure analysis, OCR, and PyTorch inference — all running locally, inside the pod, on every document processed.

We had evaluated it on an M4 Pro MacBook with Apple Silicon MPS acceleration. Near-GPU performance for PyTorch workloads. Parse times of two to three seconds per document.

Production was CPU-only Kubernetes nodes.

The performance gap was not a percentage difference. It was an order of magnitude. What took seconds on the MacBook took minutes on a CPU pod. Our AWS load balancer had a 60-second timeout. Docling on CPU regularly exceeded that.

The consequence: timeouts, 502 errors, retry storms, queue backlog, pod memory pressure. Five weeks of thread throttling, semaphore tuning, and concurrency experiments — the full story is in the [Docling post-mortem](/we-spent-five-weeks-making-docling-work-then-we-deleted-it/). The constraint was never the code. It was the hardware, and we had benchmarked against hardware we didn't have in production.

There's a human element worth naming too. We were under pressure to find a solution that met those qualitative requirements, and Docling met them convincingly. When you're looking for something specific and you find it, the instinct is to commit — not to ask what happens when you move it to a different machine. That instinct is understandable. It's also exactly when the infrastructure question matters most.

The harness was rigorous. The question it was missing: *does this library assume hardware you don't have?*

## Pragmatism Over Purity

At some point the engineering question stopped being "how do we make Docling work on CPU" and became "why does it have to run locally at all?"

We could have chased GPU nodes. We could have built an async queue and worked around the timeout with a callback model. We could have kept tuning. Any of those would have been defensible.

Instead we stepped back. The requirement was structured, semantically meaningful content extracted from documents. That's a capability problem, not an infrastructure problem. The assumption that it needed to be solved with local inference was an artefact of the evaluation process, not a genuine constraint.

## Now It's All Prompt-Driven

Claude via Bedrock handles our complete requirements — scanned PDFs, merged-cell tables, layout hierarchy, image semantics — without a byte of local inference.

The implementation is straightforward. For documents under 4.5MB we send a document block directly to the Bedrock API. For larger documents, we rasterise each page to PNG and send image blocks. Claude returns structured Markdown that preserves the document's intent.

Pod CPU stays flat during parsing. No timeouts. No GPU nodes. No async queue. No concurrency tuning. The "parsing pipeline" is a well-prompted API call.

The accuracy is comparable to Docling on our document set. The operational complexity is dramatically lower.

## What the Evaluation Harness Gets Right — And What It Doesn't

The structured evaluation process had real value. It forced rigour where gut feel would have been faster but less reliable. The harness surfaced Docling as the correct answer to the qualitative question we were asking.

The gap was in the question itself. We measured capability and performance, but performance on the wrong hardware. For any library that runs local inference — ML models, neural networks, GPU-accelerated workloads — production hardware parity is not an optional benchmark condition. It's the first one.

There's also a broader point about evaluation framing. The harness asked "which library does this best?" It didn't ask "should this be a library at all?" As LLM APIs have matured, the answer to a class of document understanding problems has shifted from "find the best local model" to "describe what you need and ask a capable model." The evaluation dimension that matters now isn't which OCR pipeline is most accurate — it's whether the capability can be prompt-driven and whether that changes your operational posture.

For us it did, substantially.

## Lessons

**1. Hardware parity is line one of the evaluation checklist for ML-heavy libraries.**
Benchmarking on an M4 Pro and deploying to CPU Kubernetes is not a benchmark. It's a misdirection. Add production-equivalent hardware to the evaluation environment before architectural commitment.

**2. Structured evaluation is worth building — but the harness only finds what you measure.**
The comparison harness was the right approach. We just needed one more measurement axis: "does this work on the hardware we actually have?"

**3. Pragmatism beats purity.**
We could have made Docling work in production. The question was whether the cost — GPU nodes, async queues, operational complexity — was proportionate to the benefit over an API-based alternative. It wasn't.

**4. The right abstraction level has shifted.**
A year ago the answer to "parse this complex PDF" was "find the best parser library." Today it's often "send it to a VLM." The evaluation harness needs to include that option, and the question needs to be capability-first rather than implementation-first.

**5. Five weeks is feedback, not failure.**
The operational pain of running Docling in production gave us the forcing function to reconsider the approach. Teams that avoid the pain by over-engineering around it (GPU nodes, larger instances, longer timeouts) often miss the signal.
