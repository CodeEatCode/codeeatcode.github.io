---
title: "Your Codebase Has Rules. Does CI Know That?"
slug: your-codebase-has-rules-does-ci-know-that
date: 2026-05-21T00:00:00.000Z
authors: [ambersariya]
tags:
  - python
  - testing
  - architecture
  - ai-engineering
---

There's a particular kind of meeting that happens on mixed teams. Someone's opened a pull request, and two engineers are staring at the same diff with completely different facial expressions. One is confused. The other is quietly furious. Neither is wrong, exactly — they just have entirely different mental models of what the codebase is *supposed* to look like.

That's the drift I'm talking about. Not bugs. Not broken tests. Just two people who've been building in the same repository for months and have somehow ended up with incompatible ideas about what goes where.

<!-- truncate -->

It happens a lot when you mix software engineers and AI engineers. Software engineers have typically spent years worrying about layered architecture, separation of concerns, not importing your database layer into your API handler — all the stuff that feels obvious once it's been drilled into you by a senior who winced at your first PR. AI engineers have spent years writing scripts, notebooks, and pipelines that get the job done. Both are legitimate ways to work. They're just not the same way.

The answer, at least in part, is [pytest-archon](https://github.com/jwbargsten/pytest-archonon). It lets you write tests that assert structural rules about your codebase. Not "does this function return the right value" — more like "nothing in the API layer should reach directly into the database layer." Rules you'd normally write in a wiki nobody reads, enforced as a test that CI will actually fail on.

Here's what that looks like:

```python
from pytest_archon import archrule

def test_api_does_not_import_database():
    (
        archrule("api-layer-isolation")
        .match("myapp.api.*")
        .should_not_import("myapp.database.*")
        .check("myapp")
    )
```

That's it. That test will fail if anyone — human or otherwise — writes an API handler that imports a database model directly. No argument needed. No code review comment that gets ignored. No Confluence page gathering digital dust. The build fails. The feedback is immediate.

Which brings me to the agentic angle, because this isn't just about human engineers anymore. When you're vibe-coding with an agent generating chunks of your codebase, the agent doesn't inherently know your architectural rules. It knows how to write Python. It does not know that your team decided six months ago that services should never instantiate repositories directly. Architecture tests give it the same feedback signal they give a human: *that's not how we do it here, try again.*

The rules become the documentation. Living documentation, with teeth. If the structure is correct, the tests pass. If it drifts — whether from a human in a hurry or an agent that didn't know better — they don't.

We caught no bugs this way. We caught something slower and harder to fix than bugs: a gradual divergence in how the team understood the system. An AI engineer pulling in a service directly from an API handler because that's how you'd do it in a notebook. A software engineer quietly losing the will to review it because the conversation about why it's wrong is long and the PR queue is longer.

Architecture tests remove the conversation. The boundary is in the codebase. The codebase enforces it. Everyone, human and agent alike, gets the same feedback.

Getting ahead of drift is worth more than most people give it credit for.
