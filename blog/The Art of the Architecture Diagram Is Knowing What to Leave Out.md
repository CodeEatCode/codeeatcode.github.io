---
title: The Art of the Architecture Diagram Is Knowing What to Leave Out
slug: the-art-of-the-architecture-diagram-is-knowing-what-to-leave-out
date: 2026-05-21T07:00:00.000Z
authors: [ambersariya]
tags:
  - architecture
  - diagrams
  - c4
  - d2
---

There's a particular type of diagram that engineers love producing and nobody can read. It has boxes for every service, arrows for every dependency, labels on each arrow explaining the protocol, and a legend in the corner that requires its own legend. It is, technically speaking, accurate. It is also completely useless.

I've been doing C4 modelling for a while now and I genuinely love it — not because it's fashionable, but because it gives you a proper mental model for what a diagram is actually *for*. System Context, Container, Component, Code. Four levels. Each one answers a different question for a different audience. The mistake most teams make is picking the wrong level, or worse, mixing levels in the same diagram because they couldn't decide and nobody wanted to have the argument.

<!-- truncate -->

The tooling has always been a headache. I tried a few diagram-as-code options and they all seemed to get in the way more than they helped. Recently switched to [D2](https://d2lang.com/) and it's been noticeably better. Minimal syntax, clean output, doesn't try to do seventeen things at once. It renders the diagram and gets out of your way.

The discipline isn't in drawing the boxes though — it's in deciding what *not* to draw. Engineers instinctively want to put everything in. Every dependency. Every call. Every integration they personally wired up at 11pm on a Thursday and feel a certain proprietary affection for. The result is a diagram that documents institutional knowledge and communicates nothing.

Here's the difference in practice. The noisy version — everything that's technically true:

```d2
direction: right

user -> api_gateway: HTTPS POST /v1/chat
api_gateway -> auth_service: JWT validation
auth_service -> user_db: SELECT users WHERE id=?
api_gateway -> chat_service: gRPC StreamChat
chat_service -> redis: GET session:{id}
chat_service -> llm_provider: POST /completions
llm_provider -> chat_service: SSE stream
chat_service -> redis: SET session:{id}
chat_service -> postgres: INSERT messages
chat_service -> api_gateway: SSE stream
api_gateway -> user: SSE stream
```

The clean version — what the Container diagram should actually say:

```d2
direction: down

user: User {shape: person}
web_app: Web App
api: API Service
llm: LLM Provider
db: Database {shape: cylinder}

user -> web_app: uses
web_app -> api: sends messages
api -> llm: streams completions
api -> db: persists conversations
```

Same system. The second one takes thirty seconds to understand. The first takes thirty minutes and a whiteboard session that everyone leaves more confused than when they arrived.

My preference is top-down layout — things flow downward, dependencies point in one direction, you can scan it. It's a small thing that makes a significant difference to whether a diagram reads as a story or as a pub quiz question.

AI tools make the arrows problem considerably worse. They're very close to the code — that's their whole thing — and if you ask one to generate an architecture diagram, it will dutifully render every import, every function call, every database relationship it can find. The result looks impressively comprehensive. It communicates approximately nothing.

Simplification requires a judgement call about what matters to the reader. That depends on who the reader is, what decision they're trying to make, and what level of detail actually serves them. Current AI tools don't have access to any of that context. A human has to make the call. That judgement is the actual skill the diagram is expressing.

The test I use: if someone new to the team can look at your diagram and explain back what the system does — without you hovering over their shoulder narrating — the diagram is doing its job. If they need you to explain the diagram, you've drawn a very expensive set of notes.

Pick your level. Remove the noise. Push back on the arrows.
