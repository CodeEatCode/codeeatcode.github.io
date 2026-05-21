---
name: code-eat-code-post-authoring
description: Create or review public-safe Code Eat Code engineering field notes from approved sanitized seed cards and public references, including privacy, SEO/GEO, verification, and publish-boundary checks.
---

# Code Eat Code Post Authoring

Use this skill when an agent needs to:

- create a new Code Eat Code draft from an approved sanitized seed card
- revise or review a generated draft for editorial quality, privacy, SEO/GEO, and publish readiness

Do not use this skill to mine private context for post ideas or to turn unsanitized notes into publishable copy.

## Input Boundary

Allowed inputs:

- approved seed cards that are already sanitized for public writing
- public references needed to support factual or tooling claims
- public repo content needed to fit the Code Eat Code site structure and link to existing posts

Forbidden inputs:

- raw personal vault notes
- work notes or employer material
- private repo context
- credentials, secrets, tokens, or environment values
- personal or employer details useful for social engineering

If the seed card is not clearly approved and sanitized, stop before drafting and ask for a safe seed card.

## Editorial Direction

Write Code Eat Code as engineering field notes:

- practical, concrete, and evidence-backed
- grounded in a real engineering question, pattern, failure mode, or recipe
- clear about assumptions, tradeoffs, and verification
- free of hype, generic AI filler, inflated claims, and invented experience

Prefer specific examples, commands, code, diagrams, observed constraints, and public references over broad advice.

## Supported Shapes

Choose one shape before drafting:

1. `Tooling Recipe`
   - answer a concrete "how do I" intent with prerequisites, steps, verification, and failure notes
2. `Pattern Note`
   - explain a reusable engineering pattern with the problem, shape of the solution, example, tradeoffs, and when not to use it
3. `Anti-Pattern Note`
   - name a failure mode, show how it appears, explain the cost, and give a better alternative
4. `Diagram/Architecture Note`
   - center the post on a system boundary, flow, or component relationship and explain the decisions the diagram supports

Use the closest matching template in `publishing/templates/` when one exists. If the selected shape does not have a repo template yet, draft manually from the approved seed card and keep the same input boundary.

## Draft Workflow

1. Read only the approved seed card, relevant public references, and repo-local public blog context.
2. Pick one supported shape and one concrete query intent the post should answer.
3. Prefer the repo-local public-seed generator for new drafts when the seed card lives in `publishing/public-seeds/`:

   ```sh
   node scripts/publishing/generate-draft.js --seed <seed-name>
   ```

   The package alias is `yarn draft:post --seed <seed-name>` when Yarn is available.
4. Create or revise the Docusaurus post under `blog/drafts/` as a local draft unless the user explicitly asked only for review.
5. Keep the direct answer or core claim near the top. Readers and answer engines should not need to infer the point from a long preamble.
6. Add evidence-bearing structure: commands, code, examples, tradeoffs, verification notes, diagrams when useful, and authoritative public references where factual or tooling claims need support.
7. Run the privacy review and verification steps below.
8. Report what remains manual before publish.

For a new post, start with explicit front matter:

```md
---
title: Concrete Post Title
slug: concrete-post-slug
description: One public-safe summary that matches the query intent.
date: 2026-05-21T00:00:00.000Z
tags:
  - relevant-tag
draft: true
---
```

Use the real drafting date. Preserve repo conventions when updating an existing post, and update `modified` when the surrounding post format already uses it.

The current generator keeps posts in draft status and records the seed provenance. Add required public metadata such as `description` during the authoring pass if the generated front matter does not include it yet.

## SEO/GEO Checklist

Each draft or review must check for:

- one concrete query intent, not a bag of keywords
- explicit `title`, `slug`, `description`, `tags`, and `date` metadata
- direct answer or core claim early in the post
- clear headings that map to the reader task
- internal links to relevant public Code Eat Code posts where they add context
- authoritative public references for factual or tooling claims where appropriate
- useful quotable claims, examples, evidence, and verification steps without keyword stuffing

The title and description should promise the article actually delivered. Do not optimize metadata around a claim the body cannot support.

## Privacy Review

Before treating a draft as publish-ready, review it for:

- names, handles, contact details, locations, and calendar details that do not need to be public
- employer, client, customer, incident, roadmap, system, or team details not present in approved public inputs
- home-directory paths, internal hostnames, screenshots, logs, stack traces, and code comments that leak private context
- credentials, tokens, keys, identifiers, or configuration values that should never be published
- phrasing that enables social engineering by combining harmless details into a personal or employer profile

Run deterministic sweeps against the changed draft and inspect every match:

```sh
node scripts/publishing/check-publishing.js
rg -n -i "(password|secret|token|api[_ -]?key|credential|vault|employer|client|customer|incident|internal|confidential|private)" blog/<draft-file>
rg -n "(/Users/|~/|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|https?://(localhost|127\.0\.0\.1|[^/]*internal))" blog/<draft-file>
```

`check-publishing.js` validates seed-card shape, template references, generated draft front matter, and repo-defined privacy rules. The `rg` sweeps remain a manual-review aid for the changed draft, not proof that publication is safe.

## Verification

Before reporting a generated or revised post:

1. inspect the diff for the post and skill-driven metadata changes
2. run relevant repo-local generator, check, typecheck, and build commands that exist for the changed surface
3. for the current publishing workflow, run `node tests/publishing-workflow.test.js` when publishing scripts or templates change and `node scripts/publishing/check-publishing.js` after generated draft changes
4. for the current Docusaurus baseline, use `yarn typecheck` and `yarn build` when Yarn and dependencies are available
5. report any command not run, any failed command, and every manual publish check still outstanding

Manual publish checks always include a final human privacy read, source/link review, and an editorial pass against the selected post shape.

## External Action Boundary

Local drafting and local review are allowed.

Publishing, pushing, opening pull requests, deploying, or changing remote resources require explicit user approval.
