---
title: Journey To The Centre Of The Stack
slug: journey-to-the-centre-of-the-stack
description: Containerising legacy software has always been a journey into the unknown. What's changed is who you take with you.
date: 2020-11-30 11:00:00 +0000
modified: 2026-05-21T00:00:00.000Z
tags:
  - docker
  - legacy-software
  - modernisation
  - ai-engineering
  - developer-experience
---

I first wrote this post in 2020 after spending several weeks containerising a legacy application I hadn't built and didn't fully understand. The experience was mostly archaeology — reading old config files, tracing hardcoded paths, figuring out what half a dozen processes actually did before touching anything. By the time I had a working Docker image, I'd earned it.

I'm updating it now because the journey has changed, and I think it's worth being honest about how.

<!-- truncate -->

The destination is the same. Legacy modernisation still means diving into unfamiliar depth, finding the load-bearing assumptions nobody documented, and making a series of architectural decisions that will outlive the sprint you're in. None of that has gone away.

What's changed is the discovery phase. The part where you spend half a day grepping through twelve config files to find every hardcoded `/tmp` path. The part where you read three hundred lines of an entrypoint script to understand what order things start in. The part where you're trying to build a mental model of a system from first principles because the person who built it left two years ago.

That part is cheaper now. Not free — cheaper. And for senior engineers in particular, that matters more than it might sound.

## The cognitive load is the real cost

When you're working in unfamiliar legacy code, there's a ceiling on how much you can think about architecture while simultaneously trying to understand what you're looking at. The mental budget goes to comprehension first and decision- making second.

AI tooling shifts that balance. You can ask an agent to map the dependency graph, find all the places a config value is used, summarise what a given module does, or trace what happens to a file after it's uploaded. It doesn't always get this perfectly right, but it gets you oriented faster. And orientation is the precondition for good architectural thinking.

The senior engineer's job in a legacy modernisation isn't to read every file — it's to understand the system well enough to make the right calls. AI handles more of the reading. You do more of the deciding. That's a reasonable trade.

## What still requires a human

This is the part worth being direct about: you cannot vibe code your way through a legacy containerisation.

Legacy systems have accumulated tradeoffs that aren't visible in the code itself. A hardcoded path exists for a reason. Session storage lives in a particular place because of a deployment constraint nobody remembered to remove. An environment variable has a default that only works in production because of how the CI pipeline was wired up five years ago.

An agent will find the path, tell you what it does, maybe suggest you move it to an env var. What it can't tell you is whether that change will break the cron job on the production server that six business processes depend on — the one that isn't in any of the tests because it predates the testing culture.

AI tools don't have access to the organisational context: the deployment constraints, the team agreements, the compliance requirements, the reason something was done a particular way three years ago. That knowledge lives in people, not code. And in legacy systems, it's often the most important knowledge there is.

That's still yours. The judgment about which changes are safe, which tradeoffs are real, which "quick wins" are landmines with a friendly face — that's the work. AI lowers the cost of getting to the point where you can make those calls. It doesn't make the calls for you.

## The practical shape of it now

For what it's worth, here's roughly how I'd approach a legacy containerisation today, with AI tooling in the picture:

**Discovery first.** Ask the agent to map the application — what processes run, what config files exist, what external services are referenced, what file paths are hardcoded. Treat this as a starting point for your own investigation, not a definitive answer. Legacy codebases often have behaviour that doesn't show up in a static read.

**Identify the decisions, not just the tasks.** The genuine work in a containerisation is a small number of architectural choices — how to handle sessions, where persistent storage lives, how secrets are managed, how the application handles multiple running instances. Everything else is mechanics. Get to the decisions faster and spend your time there.

**Keep the base image simple.** If you have multiple applications sharing a common runtime, extract a base image. Agent tooling is good at spotting what's common across applications — use it for that comparison work.

**Externalise everything that changes between environments.** File paths, URLs, secrets, feature flags — environment variables. Not because it's clever, but because it's the minimum requirement for any container to be operationally useful. This hasn't changed.

**Test incrementally.** Don't wait until the Dockerfile is complete to run the application. Run it as early as possible, find the first thing that breaks, fix it, repeat. The agent can help write tests for the areas you're refactoring, but you need to know which areas matter enough to test.

**Understand what you're committing to.** Every dependency you add to the container — a system library, an OCR engine, a local model — is infrastructure you're now responsible for. The Docling post on this blog exists because we learnt that lesson the long way.

## The title still fits

The journey to the centre of the stack is still a journey. The technology has changed, the tooling has improved, and you have better company on the way down than you did five years ago. But the stack is still there, and the centre of it still contains the decisions that matter.

The difference is that you can now spend more of your cognitive budget on the part that actually requires experience to get right.

That seems like a reasonable upgrade.
