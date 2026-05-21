---
title: The Metric Your Users Feel Before You Measure It
slug: the-metric-your-users-feel-before-you-measure-it
date: 2026-05-21T02:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - observability
  - performance
---

Working on a streaming chat product taught me something: the standard
latency metrics don't really describe what users experience. They're not
waiting for a page to load or an API to return a JSON blob. They're watching
tokens appear — and what they feel before anything appears is the thing
most teams aren't measuring.

That thing is time-to-first-token. TTFT.

<!-- truncate -->

I ran into this while load testing a streaming chat endpoint. The obvious
thing to reach for is `http_req_duration` — it's right there in k6, it
captures how long the request took, job done. Except it isn't. For a
streaming LLM response, `http_req_duration` captures the entire stream from
first byte sent to last byte received. If your model takes two seconds to
start streaming and then streams for eight seconds, your p95 latency looks
like ten seconds. That tells you almost nothing about whether the product
feels responsive.

What matters to the person using a chat interface is: how long until
*something* appears? A response that starts in 800ms and streams for thirty
seconds feels fast. A response that sits blank for four seconds then dumps
everything at once feels broken — even if the total duration is shorter.

That gap between "request sent" and "first content chunk received" is TTFT,
and it's the metric that actually describes streaming UX.

## Measuring it

Standard k6 doesn't parse SSE streams, so you need a custom binary built
with [xk6-sse](https://github.com/phymbert/xk6-sse):

```bash
xk6 build --with github.com/phymbert/xk6-sse
```

Then define a custom `Trend` metric and record it the moment the first
content event arrives:

```javascript
import sse from "k6/x/sse";
import { Trend } from "k6/metrics";

const ttft = new Trend("ttft_s", true);

export default function () {
  const start = Date.now();
  let firstTokenRecorded = false;

  sse.open(url, params, (client) => {
    client.on("event", (event) => {
      if (!firstTokenRecorded && event.data !== "[DONE]") {
        ttft.add((Date.now() - start) / 1000);
        firstTokenRecorded = true;
      }
    });
  });
}
```

Critically: read the stream to completion even after you've recorded TTFT.
Dropping the connection early skews the load profile — the server is still
doing work and your test stops accounting for it.

## Load profile design

For observational load testing, a ramp-and-hold pattern gives you clean
steady-state numbers to actually reason about:

```
VUs
100 ┤               ▄▄▄▄▄▄▄
 50 ┤         ▄▄▄▄▄▀       ▀▄▄▄▄▄
 10 ┤   ▄▄▄▄▄▀                   ▀▄▄▄▄▄
  0 ┤──▀                               ▀──
      ramp  hold   ramp   hold   ramp  hold
```

During a ramp phase, concurrency is in transition — exclude those samples
from headline stats. During a hold phase, you have stable concurrency and
predictable sample counts. Tag every sample with its phase and VU target
so you can filter cleanly in post-processing.

One request per VU per hold window also gives you deterministic sample
counts: 50 VUs × 60s hold = exactly 50 requests. Reproducible, comparable
across runs.

## What you actually learn

Here's where it gets interesting. Once you have TTFT as a real metric, you
start seeing things that `http_req_duration` completely hides.

What we found was that different models have quite different characteristics.
Some are fast to start and slow to finish. Some are the opposite. Prompt
caching had a measurable effect in our tests — a cache hit on a large system
prompt shaved hundreds of milliseconds off first token time, and we wouldn't
have seen that signal at all if we'd only been watching total duration.

We also saw how concurrency affects *perceived* responsiveness differently
than it affects throughput. At low VU counts the TTFT p95 looked fine. Add
more concurrent users and TTFT degraded before throughput did — which means
users start feeling slowness before the dashboards register a problem.
Your mileage will vary depending on model and infrastructure, but it's worth
checking.

These are the kinds of insights that only exist once you're measuring the
right thing. Total request duration isn't the wrong metric — it's just the
wrong *first* metric for a product where the UX is a stream.

## Set a concrete target before you test

Before running at scale, decide what good looks like. What is an acceptable
p95 TTFT at your expected concurrency? Write it down before you look at the
numbers — otherwise you'll rationalise whatever you find.

Your target will depend on your model, your infrastructure, your users'
expectations, and honestly, what your provider can actually deliver under
load. The test reveals that; it doesn't guarantee it. But without a target,
you're just generating numbers.

---

*TTFT is one dimension. Token throughput — how fast the stream itself moves
once started — is another. Both matter, and they can point in opposite
directions. Worth measuring separately.*
