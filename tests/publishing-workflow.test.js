const assert = require("assert");
const path = require("path");
const {
    buildDraftPost,
    findPrivacyFindings,
    loadSeedCard,
    parseSeedCard,
    validateSeedCard,
} = require("../scripts/publishing/workflow");

const toolingSeed = `---
title: Using mise to Make Project Setup Boring
slug: using-mise-to-make-project-setup-boring
template: tooling-recipe
tags:
  - tooling
  - developer-experience
---

## Core claim

Project setup should be encoded and discoverable.

## Allowed material

- Pinned runtimes
- Stable project commands

## Avoid

- Private repo names
`;

function test(name, run) {
    try {
        run();
        process.stdout.write(`ok - ${name}\n`);
    } catch (error) {
        process.stderr.write(`not ok - ${name}\n`);
        throw error;
    }
}

test("parses public seed card front matter and sections", () => {
    const seed = parseSeedCard(toolingSeed, "tooling.md");

    assert.equal(seed.title, "Using mise to Make Project Setup Boring");
    assert.deepEqual(seed.tags, ["tooling", "developer-experience"]);
    assert.equal(seed.coreClaim, "Project setup should be encoded and discoverable.");
    assert.deepEqual(seed.allowedMaterial, ["Pinned runtimes", "Stable project commands"]);
});

test("rejects seed cards without constrained public material", () => {
    const seed = parseSeedCard(
        `---
title: Missing sections
slug: missing-sections
template: pattern-note
---

## Core claim

Still too loose.
`,
        "missing.md"
    );

    assert.throws(() => validateSeedCard(seed), /Allowed material/);
});

test("rejects seed names outside the sanitized seed directory", () => {
    assert.throws(
        () => loadSeedCard(path.resolve(__dirname, ".."), "../private-notes"),
        /public seed name/
    );
});

test("builds a Docusaurus draft from a seed and template", () => {
    const seed = parseSeedCard(toolingSeed, "tooling.md");
    const draft = buildDraftPost(seed, {
        templateName: "tooling-recipe",
        templateBody: [
            "# {{title}}",
            "",
            "{{coreClaim}}",
            "",
            "{{allowedMaterial}}",
        ].join("\n"),
        generatedAt: "2026-05-21T09:30:00.000Z",
        sourceSeed: path.join("publishing", "public-seeds", "tooling.md"),
    });

    assert.match(draft, /draft: true/);
    assert.match(draft, /generated_by: public-seed-draft/);
    assert.match(draft, /date: 2026-05-21T09:30:00.000Z/);
    assert.match(draft, /- Pinned runtimes/);
    assert.doesNotMatch(draft, /Private repo names/);
});

test("flags secret-like strings and private context markers", () => {
    const findings = findPrivacyFindings(
        [
            "token = ghp_1234567890abcdefghijklmnop",
            "See /Users/example/work/private-system/notes.md",
            "This came from an employer incident.",
        ].join("\n"),
        "blog/drafts/example.md"
    );

    assert.deepEqual(
        findings.map((finding) => finding.rule),
        ["github-token", "assigned-secret", "local-path", "private-context-marker"]
    );
});
