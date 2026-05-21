---
title: You Can't Debug What Bedrock Swallowed
slug: you-cant-debug-what-bedrock-swallowed
date: 2026-05-21T00:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - observability
  - python
  - opentelemetry
---

There's a particular kind of hell reserved for debugging LLM-backed systems that nobody bothered to instrument. You've got a request that took twelve seconds and you don't know if the slow part was your retrieval pipeline, the prompt construction, the Bedrock call itself, or the post-processing that turned the model's output into something you'd actually show a user. You have logs. You have vibes. You have, essentially, nothing.

We hit this early on an LLM project and it focused the mind quickly.

<!-- truncate -->

AWS Bedrock is opaque by design. You send a prompt, you get tokens back, and what happens between those two events isn't your concern. That's fine — it's not your model to look inside.

The problem is when that opacity bleeds into the code *you* wrote. Your retrieval logic, your prompt templates, your retry handling, your fallback paths — none of that needs to be a mystery. But without deliberate instrumentation, it becomes one anyway. You end up with a black box you built yourself, which is a considerably more embarrassing situation than the one Bedrock put you in.

Rather than manually sprinkling trace calls everywhere and inevitably missing the interesting bits, I wrote a Python decorator that wraps functions and methods automatically. Every call gets emitted as a span — class name, method name, duration, outcome — and it all folds into a single trace you can read in sequence:

```python
import functools
import time
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def traced(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        class_name = args[0].__class__.__name__ if args else ""
        span_name = f"{class_name}.{func.__name__}" if class_name else func.__name__

        with tracer.start_as_current_span(span_name) as span:
            start = time.perf_counter()
            try:
                result = func(*args, **kwargs)
                span.set_status(trace.StatusCode.OK)
                return result
            except Exception as exc:
                span.record_exception(exc)
                span.set_status(trace.StatusCode.ERROR, str(exc))
                raise
            finally:
                span.set_attribute("duration_ms", (time.perf_counter() - start) * 1000)
    return wrapper
```

Apply it to the functions you care about and suddenly your trace reads like a story. Vector search: 40ms. Prompt assembly: 2ms. That "fast" Bedrock call that's actually 3.8 seconds because you're using a large model with a 6,000-token context and no caching — that's visible now. The information was always there. You just couldn't see it.

The part I didn't anticipate: OpenTelemetry handles both technical traces *and* business metrics through the same pipeline. We used it to answer latency questions ("why did this request take four seconds?") and business questions at the same time ("how many users hit the fallback path today?", "what's our prompt cache hit rate this week?"). Same instrumentation layer, different dimensions. There's something satisfying about a monitoring setup that doesn't require you to maintain two separate systems with two separate mental models.

Here's the thing that surprised me most: a well-instrumented LLM pipeline can actually be easier to reason about than a lot of distributed systems. The order of operations is relatively clear, and when every step emits a span, you can read a trace like a timeline. The non-determinism of the model itself is a different problem — spans won't tell you why the model said what it said — but at least the plumbing stops being a mystery.

The opacity was never really about the LLM. It was about the code around the LLM that we hadn't bothered to make visible.

What I took from this: don't leave observability as something to add later when things go wrong. Wire it in from the start — it's the interface you build for yourself so that when Bedrock starts behaving oddly at 11pm, you have structured data to work with rather than a twelve-second request duration and a shrug.
