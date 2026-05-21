const fs = require("fs");
const path = require("path");
const {
    buildDraftPost,
    findPrivacyFindings,
    loadSeedCard,
    loadTemplate,
} = require("./workflow");

const repoRoot = path.resolve(__dirname, "..", "..");
const seedName = readSeedName(process.argv.slice(2));

try {
    const publicSeed = loadSeedCard(repoRoot, seedName);
    const template = loadTemplate(repoRoot, publicSeed.seed.template);
    const draft = buildDraftPost(publicSeed.seed, {
        sourceSeed: publicSeed.relativePath,
        templateBody: template.body,
        templateName: publicSeed.seed.template,
    });
    const findings = findPrivacyFindings(draft, publicSeed.seed.slug);

    if (findings.length > 0) {
        throw new Error(formatPrivacyFindings(findings));
    }

    const draftsDir = path.join(repoRoot, "blog", "drafts");
    const draftPath = path.join(draftsDir, `${publicSeed.seed.slug}.md`);
    fs.mkdirSync(draftsDir, { recursive: true });
    fs.writeFileSync(draftPath, draft, "utf8");
    process.stdout.write(`Generated ${path.relative(repoRoot, draftPath)}\n`);
} catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
}

function readSeedName(args) {
    const seedFlag = args.indexOf("--seed");
    const seedName = seedFlag === -1 ? args[0] : args[seedFlag + 1];
    if (!seedName || seedName.startsWith("--")) {
        throw new Error("Usage: node scripts/publishing/generate-draft.js --seed <seed-name>");
    }

    return seedName.replace(/\.md$/, "");
}

function formatPrivacyFindings(findings) {
    return findings
        .map((finding) => {
            return `${finding.fileName}: ${finding.rule} (${finding.message}) ${finding.excerpt}`;
        })
        .join("\n");
}
