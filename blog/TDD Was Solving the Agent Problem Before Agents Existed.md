---
title: TDD Was Solving the Agent Problem Before Agents Existed
slug: tdd-was-solving-the-agent-problem-before-agents-existed
date: 2026-05-21T04:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - tdd
  - developer-experience
  - agile
---

The first time I set an agent loose on a real codebase, it ran out of context before it had done anything useful. That's a clarifying experience.

The repository wasn't exotic — a Python monorepo with shared libraries and some infrastructure code. I drew a diagram to understand what was happening. A rectangle for the full context window; blocks for what was already consumed just from loading the codebase: directory tree, CLAUDE.md, relevant modules, config, dependencies. The bar was more than half full before the agent had read a single line of task context or seen a single error message.

<!-- truncate -->

That image stuck with me. Half the agent's working memory gone on orientation alone. And the uncomfortable follow-up question: whose fault is that?

Mostly ours, it turns out.

A codebase with fuzzy boundaries, large unfocused modules, and implicit conventions forces the agent to do the same orientation work a new engineer would do — except a new engineer can ask questions, build intuition over weeks, and remember what they learned yesterday. With the tools I've been using, there's no persistent memory between sessions by default. Every session is effectively day one. The codebase has to compensate for what the agent can't retain.

There's a body of practice — going back about twenty-five years — that points in exactly this direction. We just didn't know we were solving this particular problem at the time.

TDD and the XP practices around it — simple design, ruthless refactoring, tests as documentation — produce exactly the properties that make a codebase agent-readable. Small focused units with explicit interfaces. Behaviour described in tests rather than buried in implementation. No accidental complexity quietly accumulating in corners. Clear boundaries that tell you where one thing ends and another begins.

None of this is new. But the agentic era has made the value of it more visible. The "too much to hold in your head at once" problem that TDD was designed to address is the same problem the context window makes concrete. A codebase with small focused units and tests that describe behaviour fits into an agent's context cleanly. One where complexity has accumulated unchecked — regardless of how it got there — does not.

Tests also do something specific for agents that code alone can't: they describe intended behaviour without requiring the agent to read the implementation. A test called `test_chat_service_returns_error_on_empty_prompt` tells the agent more in one line than several hundred lines of service code could. When an agent needs to understand a boundary, it reads the tests. Targeted context. Problem contained.

The cost angle is real too. Context is billed by the token. An agent flailing around a poorly structured codebase — re-reading files, tracing implicit dependencies, inferring conventions that should be explicit — is burning money before it's produced anything. Good structure isn't just clean, it's cheap.

This also connects to the current conversation around "vibe-coding" and agents generating code freely. From what I've seen, the concern isn't really about whether the agent can write working code — it often can. The concern is whether the codebase it's writing into has enough structure to keep the output coherent over time. Architecture tests help here too: codify the rules, and both human and agent get immediate feedback when something drifts from the intended shape.

The agentic era didn't invent a new problem. It gave us a new, very legible way to feel the cost of one we'd been politely ignoring for years.

TDD and XP have always pushed toward properties — small units, explicit interfaces, behaviour-as-tests — that turn out to be just as valuable for agents as they are for humans. The reasons stack up.
