---
title: Establishing A Walking Skeleton For Projects
slug: establishing-a-walking-skeleton-for-projects
date: 2021-09-16T11:56:19.338Z
modified: 2022-05-18T13:29:31.906Z
---

I've been reading the excellent book [Growing Object-Oriented Software, Guided By Tests](https://www.goodreads.com/en/book/show/4268826-growing-object-oriented-software-guided-by-tests "Growing Object-Oriented Software, Guided By Tests") and there's so much that resonated with me about starting work on a new project.

As with anything new, give developers some shiny new something to work on and there's always the temptation to dive right in and get started with code. This often means that you're starting from the inside-out of a problem space and often some operational details are overlooked. When we're done solving that problem, trying to release that or to push that to production is often a problem nobody had perceived.

I recently experienced this on a project where we'd resorted to creating the application locally to put that online later. We had an idea of things like tech limitations and choices at the time, and deferring that decision seemed right, but it later came to bite us when we wanted to release the first feature.

We had roadblocks after one another, these came in the form of security policies, technology choices and release process already in place and trying something new. This whole thing cost us a couple of months of back and forth between dev/ops/admin folks.

So if I could tell my past self, I would say, release early and release often even if it means releasing the project skeleton in a hello world state.

In the context of the book I've been reading, establishing a walking skeleton is hugely important.
