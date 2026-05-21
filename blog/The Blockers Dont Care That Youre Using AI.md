---
title: The Blockers Don't Care That You're Using AI
slug: the-blockers-dont-care-that-youre-using-ai
date: 2026-05-21T00:00:00.000Z
authors: [ambersariya]
tags:
  - ai-engineering
  - software-delivery
  - walking-skeleton
---

I wrote a post back in 2021 about walking skeletons — the idea that before you go deep on features, you ship something thin and deployable end-to-end. Not because it's useful to users, but because it flushes out the real blockers while the cost of finding them is still low. Permissions. Pipelines. Infrastructure assumptions that looked fine on a whiteboard.

That advice hasn't aged out. If anything, AI projects have made it more relevant, not less.

<!-- truncate -->

Here's the thing about AI systems specifically: the surface area for things to silently go wrong is larger. You've got model integrations, inference infrastructure, data pipelines, prompt management, evaluation loops, and whatever cloud hoops your organisation has decided to add on top. Any one of those can be perfectly fine in isolation and a disaster when wired together in a real environment. The feedback loop — getting something running end-to-end early — serves exactly the same purpose it always did. You learn what's actually broken before you've written ten thousand lines of feature code around it.

I saw this recently on an AI project. We pushed to establish the skeleton early, before anyone could argue we weren't ready. And yes, we hit the usual suspects: IAM permissions that looked correct until they didn't, model API access that needed a different approval path than expected, tooling that worked locally and had strong opinions about containers. None of it was AI-specific. I've been burned by the same class of problems in every non-trivial project I've worked on since before "AI engineering" was a job title.

What was different was the speed at which we got through it. That's where the AI era genuinely does change things — not the nature of the blockers, but the time between "we found the problem" and "we fixed it." Digging through IAM policies, drafting the right internal request, figuring out the correct incantation for whichever cloud service had opinions today — all of it moved faster with AI tooling alongside. It's a multiplier on the resolution side, not the discovery side.

Which is worth saying plainly: AI tooling doesn't help you find blockers you never looked for. The skeleton is still the mechanism for surfacing them. You still have to commit to the discipline of doing it early, before the temptation to just build features wins.

That temptation is strong. AI tooling makes feature development feel fast. You can go from idea to working prototype in a morning. That speed makes it very easy to go deep before you've established whether any of it will actually run in production. And then you've got a lot of impressive-looking code and a pipeline that doesn't exist yet.

The honest caveat: this is still a discipline problem more than a tooling problem. AI makes the fixing faster, but it can't make you look for trouble before you think you need to. The teams that skipped the walking skeleton before will probably still skip it now — just with faster excuses.
