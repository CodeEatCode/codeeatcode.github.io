const fs = require("fs");
const path = require("path");
const {
    GENERATED_BY,
    findPrivacyFindings,
    loadTemplate,
    parseSeedCard,
    validateGeneratedDraft,
    validateSeedCard,
} = require("./workflow");

const repoRoot = path.resolve(__dirname, "..", "..");
const seedDir = path.join(repoRoot, "publishing", "public-seeds");
const draftDir = path.join(repoRoot, "blog", "drafts");
const blogDir = path.join(repoRoot, "blog");
const errors = [];
const findings = [];

readMarkdownFiles(seedDir).forEach((seedPath) => {
    try {
        const source = fs.readFileSync(seedPath, "utf8");
        const seed = validateSeedCard(parseSeedCard(source, seedPath));
        loadTemplate(repoRoot, seed.template);
    } catch (error) {
        errors.push(error.message);
    }
});

readMarkdownFiles(blogDir).forEach((postPath) => {
    const source = fs.readFileSync(postPath, "utf8");
    const relativePath = toRepoPath(postPath);

    if (postPath.startsWith(draftDir)) {
        errors.push(...validateGeneratedDraft(source, relativePath));
    }

    if (source.includes(`generated_by: ${GENERATED_BY}`)) {
        findings.push(...findPrivacyFindings(source, relativePath));
    }
});

if (errors.length > 0 || findings.length > 0) {
    errors.forEach((error) => process.stderr.write(`${error}\n`));
    findings.forEach((finding) => {
        process.stderr.write(
            `${finding.fileName}: ${finding.rule} (${finding.message}) ${finding.excerpt}\n`
        );
    });
    process.exitCode = 1;
} else {
    process.stdout.write("Publishing seeds, templates, and generated drafts passed checks.\n");
}

function readMarkdownFiles(directory) {
    if (!fs.existsSync(directory)) {
        return [];
    }

    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const entryPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            return readMarkdownFiles(entryPath);
        }

        return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
    });
}

function toRepoPath(filePath) {
    return path.relative(repoRoot, filePath).split(path.sep).join("/");
}
