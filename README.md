# Website

This website is built using [Docusaurus 3](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Mise toolchain

This repo pins its local Node and Yarn toolchain in `mise.toml` and exposes the
main project commands as discoverable tasks.

```
$ mise trust
$ mise install
$ mise tasks ls
$ mise run install
```

Review `mise.toml` before the first `mise trust`; Mise requires that trust step
before it will load project tasks. The toolchain tracks the Node 20 line used by
the GitHub Pages workflows. Existing Yarn commands still work directly when the
pinned tools are already on `PATH`.

### Local Development

```
$ mise run dev
```

or:

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ mise run verify
```

or, for only the site build:

```
$ mise run build
```

or:

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Agent authoring workflow

The canonical repo-local post authoring skill lives at `skills/code-eat-code-post-authoring/SKILL.md`. Codex can discover the companion shim under `.agents/skills/code-eat-code-post-authoring/`; Claude-style workflows can use or mirror the canonical `skills/` body without copying its rules.

- Generate a draft from an approved sanitized seed card: `Use $code-eat-code-post-authoring to create a local Code Eat Code draft from this approved seed card: ...`
- Review a draft before publish: `Use $code-eat-code-post-authoring to review blog/<post>.md for privacy, editorial quality, SEO/GEO, and verification gaps before publish.`

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
