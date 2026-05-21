const fs = require("fs");
const path = require("path");

const GENERATED_BY = "public-seed-draft";
const REQUIRED_SEED_SECTIONS = [
    ["coreClaim", "Core claim"],
    ["allowedMaterial", "Allowed material"],
    ["avoid", "Avoid"],
];

const PRIVACY_RULES = [
    {
        name: "private-key",
        pattern: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g,
        message: "private key block",
    },
    {
        name: "aws-access-key",
        pattern: /\bAKIA[0-9A-Z]{16}\b/g,
        message: "AWS access key shape",
    },
    {
        name: "github-token",
        pattern: /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/g,
        message: "GitHub token shape",
    },
    {
        name: "openai-secret",
        pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/g,
        message: "secret key shape",
    },
    {
        name: "assigned-secret",
        pattern:
            /\b(api[_-]?key|password|secret|token)\b\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{12,}/gi,
        message: "assigned secret-like value",
    },
    {
        name: "local-path",
        pattern: /(?:\/Users\/|\/home\/|[A-Za-z]:\\Users\\)[^\s)`"'<>]+/g,
        message: "local user path",
    },
    {
        name: "private-url",
        pattern: /\bhttps?:\/\/(?:localhost|127\.0\.0\.1|[^/\s]*\.(?:local|internal))\b/gi,
        message: "private or local URL",
    },
    {
        name: "private-context-marker",
        pattern:
            /\b(?:employer|client|customer|work notes?|personal notes?|private repo|internal architecture|account id|provider incident|live incident)\b/gi,
        message: "private-context marker",
    },
];

function parseSeedCard(source, sourceName) {
    const parsed = parseFrontMatter(source, sourceName);
    const sections = parseMarkdownSections(parsed.body);

    return {
        sourceName,
        title: stringField(parsed.frontMatter, "title"),
        slug: stringField(parsed.frontMatter, "slug"),
        template: stringField(parsed.frontMatter, "template"),
        tags: arrayField(parsed.frontMatter, "tags"),
        coreClaim: paragraphSection(sections["core claim"]),
        allowedMaterial: bulletSection(sections["allowed material"]),
        avoid: bulletSection(sections.avoid),
    };
}

function validateSeedCard(seed) {
    ["title", "slug", "template"].forEach((field) => {
        if (!seed[field]) {
            throw new Error(`${seed.sourceName} must define ${field}.`);
        }
    });

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(seed.slug)) {
        throw new Error(`${seed.sourceName} must use a lowercase kebab-case slug.`);
    }

    REQUIRED_SEED_SECTIONS.forEach(([field, label]) => {
        if (!seed[field] || seed[field].length === 0) {
            throw new Error(`${seed.sourceName} must include ${label}.`);
        }
    });

    return seed;
}

function buildDraftPost(seed, options) {
    validateSeedCard(seed);
    const generatedAt = options.generatedAt || new Date().toISOString();
    const renderedTemplate = renderTemplate(options.templateBody, {
        allowedMaterial: toBulletList(seed.allowedMaterial),
        coreClaim: seed.coreClaim,
        slug: seed.slug,
        sourceSeed: options.sourceSeed,
        templateName: options.templateName || seed.template,
        title: seed.title,
    });
    const tags = seed.tags.map((tag) => `  - ${tag}`).join("\n");
    const frontMatter = [
        "---",
        `title: ${seed.title}`,
        `slug: ${seed.slug}`,
        `date: ${generatedAt}`,
        `modified: ${generatedAt}`,
        "draft: true",
        `generated_by: ${GENERATED_BY}`,
        `source_seed: ${options.sourceSeed}`,
        `template: ${options.templateName || seed.template}`,
        ...(tags ? ["tags:", tags] : []),
        "---",
    ].join("\n");

    return `${frontMatter}\n\n${renderedTemplate.trim()}\n`;
}

function findPrivacyFindings(source, fileName) {
    return PRIVACY_RULES.flatMap((rule) => {
        const pattern = new RegExp(rule.pattern.source, rule.pattern.flags);
        return [...source.matchAll(pattern)].map((match) => ({
            fileName,
            rule: rule.name,
            message: rule.message,
            excerpt: redactFinding(match[0]),
        }));
    });
}

function validateGeneratedDraft(source, fileName) {
    const parsed = parseFrontMatter(source, fileName);
    const errors = [];

    if (parsed.frontMatter.draft !== "true") {
        errors.push(`${fileName} must keep draft: true until editorial review.`);
    }

    if (parsed.frontMatter.generated_by !== GENERATED_BY) {
        errors.push(`${fileName} must declare generated_by: ${GENERATED_BY}.`);
    }

    if (!parsed.frontMatter.source_seed) {
        errors.push(`${fileName} must record source_seed.`);
    }

    return errors;
}

function loadSeedCard(repoRoot, seedName) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(seedName)) {
        throw new Error(`Invalid public seed name "${seedName}".`);
    }

    const seedPath = path.join(repoRoot, "publishing", "public-seeds", `${seedName}.md`);
    if (!fs.existsSync(seedPath)) {
        throw new Error(`Unknown public seed "${seedName}".`);
    }

    const source = fs.readFileSync(seedPath, "utf8");
    return {
        path: seedPath,
        relativePath: toPosixPath(path.relative(repoRoot, seedPath)),
        seed: validateSeedCard(parseSeedCard(source, seedPath)),
    };
}

function loadTemplate(repoRoot, templateName) {
    const templatePath = path.join(repoRoot, "publishing", "templates", `${templateName}.md`);
    if (!fs.existsSync(templatePath)) {
        throw new Error(`Unknown publishing template "${templateName}".`);
    }

    const templateBody = fs.readFileSync(templatePath, "utf8");
    if (!templateBody.includes("{{title}}") || !templateBody.includes("{{coreClaim}}")) {
        throw new Error(`${templatePath} must include {{title}} and {{coreClaim}}.`);
    }

    return {
        path: templatePath,
        body: templateBody,
    };
}

function parseFrontMatter(source, sourceName) {
    const normalized = source.replace(/\r\n/g, "\n");
    const lines = normalized.split("\n");
    if (lines[0] !== "---") {
        throw new Error(`${sourceName} must start with front matter.`);
    }

    const end = lines.indexOf("---", 1);
    if (end === -1) {
        throw new Error(`${sourceName} has unterminated front matter.`);
    }

    const frontMatter = {};
    let activeList = null;
    lines.slice(1, end).forEach((line) => {
        const field = line.match(/^([A-Za-z0-9_-]+):(?:\s*(.*))?$/);
        const item = line.match(/^\s+-\s+(.+)$/);

        if (field) {
            activeList = field[1];
            frontMatter[activeList] = field[2] || [];
            return;
        }

        if (item && activeList && Array.isArray(frontMatter[activeList])) {
            frontMatter[activeList] = [...frontMatter[activeList], item[1].trim()];
        }
    });

    return {
        body: lines.slice(end + 1).join("\n"),
        frontMatter,
    };
}

function parseMarkdownSections(body) {
    return body.split(/^##\s+/m).slice(1).reduce((sections, chunk) => {
        const [headingLine, ...content] = chunk.split("\n");
        return {
            ...sections,
            [headingLine.trim().toLowerCase()]: content.join("\n").trim(),
        };
    }, {});
}

function stringField(frontMatter, field) {
    return typeof frontMatter[field] === "string" ? frontMatter[field].trim() : "";
}

function arrayField(frontMatter, field) {
    return Array.isArray(frontMatter[field]) ? frontMatter[field] : [];
}

function paragraphSection(section) {
    if (!section) {
        return "";
    }

    return section
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .join(" ");
}

function bulletSection(section) {
    if (!section) {
        return [];
    }

    return section
        .split("\n")
        .map((line) => line.match(/^\s*-\s+(.+)$/))
        .filter(Boolean)
        .map((match) => match[1].trim());
}

function renderTemplate(templateBody, values) {
    return Object.entries(values).reduce((rendered, [name, value]) => {
        return rendered.replace(new RegExp(`{{${name}}}`, "g"), value || "");
    }, templateBody);
}

function redactFinding(match) {
    if (match.length < 16) {
        return match;
    }

    return `${match.slice(0, 8)}...${match.slice(-4)}`;
}

function toBulletList(items) {
    return items.map((item) => `- ${item}`).join("\n");
}

function toPosixPath(filePath) {
    return filePath.split(path.sep).join("/");
}

module.exports = {
    GENERATED_BY,
    buildDraftPost,
    findPrivacyFindings,
    loadSeedCard,
    loadTemplate,
    parseFrontMatter,
    parseSeedCard,
    validateGeneratedDraft,
    validateSeedCard,
};
