# Public Seed Publishing

This workflow drafts public-safe field notes from sanitized seed cards in
`publishing/public-seeds/`. Do not use raw personal notes, work notes, private
repository context, chat exports, or unreviewed transcripts as generation input.

## Workflow

1. Add or revise a public seed card with a core claim, allowed material, and
   explicit avoid list.
2. Choose the closest template in `publishing/templates/`.
3. Generate a Docusaurus draft from only the seed card and template:

   ```shell
   yarn draft:post --seed using-mise-to-make-project-setup-boring
   ```

4. Run the deterministic publishing checks and site build:

   ```shell
   yarn test:publishing
   yarn check:publishing
   yarn build
   ```

5. Edit the generated post in `blog/drafts/` while keeping it public-safe.
   Review every claim, example, link, code sample, and diagram before moving it
   out of draft status.

Generated posts are intentionally born with `draft: true`. Publishing remains a
reviewed manual step: remove or change the draft flag only after privacy review,
editorial review, and normal repo review.

## Generation Contract

An AI authoring pass may use:

- The chosen public seed card.
- The selected template.
- Public documentation or public examples checked during the authoring task.
- Editorial direction already recorded in this repo.

An AI authoring pass must not use:

- Raw personal or work notes.
- Private repository code or history.
- Employer, client, customer, project, or account identifiers.
- Internal results, timelines, incidents, thresholds, URLs, credentials, or
  local machine paths.

Keep examples generic or reconstruct them from public-safe toy material. Prefer
small claims that can be verified from the seed and public sources over a draft
that sounds more specific than the safe material allows.

## Templates

- `tooling-recipe`: a compact repeatable workflow or command recipe.
- `pattern-note`: an engineering boundary, testing, or observability note.
- `diagram-architecture-note`: a boundary-oriented note where a diagram adds
  clarity without exposing real system details.

## Guardrails

`yarn check:publishing` validates seed-card shape, template references, draft
front matter, and deterministic privacy rules over posts that keep the
`generated_by: public-seed-draft` marker. It rejects secret-like strings,
user-local paths, private or local URLs, and high-signal private-context
markers. Keep the generator marker while a generated post moves through review;
these checks are a floor, not a substitute for human review.
