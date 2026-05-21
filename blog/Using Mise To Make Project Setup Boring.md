---
title: Stop Arguing With Your Terminal About Python Versions
slug: stop-arguing-with-your-terminal-about-python-versions
date: 2026-05-21T00:00:00.000Z
authors: [ambersariya]
tags:
  - tooling
  - developer-experience
  - mise
---

Project setup should be boring. Not in a "this is beneath me" way — in a
"this takes thirty seconds and I never think about it" way.

Most of the time, it isn't.

You clone a repo you haven't touched in six months. The README says "install
Python 3.11". You have 3.12. Something breaks. You remember there's a
`.python-version` file somewhere, or maybe a `requires-python` in
`pyproject.toml`. You spend twenty minutes figuring out which version manager
you're even supposed to be using for this project before you've written a
single line of code.

This isn't a Python problem. Terraform has `tfenv`. Node has `nvm` or `volta`
or `.nvmrc`. Every language brings its own version manager, its own config
file format, its own way of silently using the wrong version. And that's before
you even get to figuring out how to run things — is it `make test`? `./scripts/test.sh`?
Some npm script buried in a `package.json`? Nobody knows. You ask Slack.

I got tired of this and started using [mise](https://mise.jdx.dev/). It's a
single tool that handles both problems: pinned runtimes and discoverable tasks,
for any language, in one file.

A Python service looks like this:

```toml
[tools]
python = "3.12.3"

[tasks.test]
description = "Run the test suite"
run = "pytest"

[tasks.verify]
description = "Run all checks before pushing"
depends = ["test", "build"]
```

Run `mise install` and you get exactly that Python version. Run `mise tasks`
and you see everything the project knows how to do. Run `mise run verify`
before pushing. That's it.

The part I find most satisfying is that `mise run <task>` becomes a stable
interface that hides whatever's behind it. I had a project that needed a custom
k6 binary with SSE support for load testing a streaming API. Building it
requires Go and a tool called `xk6`, which most people have never heard of.
With mise, that's just:

```toml
[tools]
go = "1.22.3"

[tasks.build]
description = "Build k6 with xk6-sse extension"
run = "xk6 build --with github.com/phymbert/xk6-sse"
```

Now `mise run build` works for everyone — the developer who knows what xk6 is,
the one who doesn't, and the CI job. Nobody has to know what's behind it. When
I added another extension later, I changed one line. The interface didn't move.

Speaking of CI — this is where the real payoff is. A GitHub Actions workflow
for a mise project looks like:

```yaml
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: jdx/mise-action@v4
      - run: mise run verify
```

`mise-action` reads `mise.toml`, installs the pinned versions, and puts them
on `PATH`. Then `mise run verify` runs the exact same thing you run locally.
No separate version install steps. No drift between what CI checks and what
you check. This is the thing that makes it worth the setup cost — CI and local
are no longer two separate mental models.

The one thing mise can't do is install itself. You need it on the machine
before any of this works. I solve that with [Chezmoi](https://www.chezmoi.io/),
a dotfile manager that runs once on a fresh machine. A `run_once_install-mise.sh`
script does the bootstrap:

```bash
#!/bin/sh
curl https://mise.run | sh
```

Then the shell hook in `~/.zshrc` (also managed by Chezmoi) activates mise
per directory:

```bash
eval "$(mise activate zsh)"
```

Chezmoi sets up the machine, mise sets up each project. Neither knows the other
exists. You go from a blank laptop to a running project without reading a setup
guide — which is the point.

It won't fix an undocumented deployment process or a service that can't run
locally. It encodes what's already known. And if your team is already settled
on `nvm` + `make` for a single-language, single-runtime project, the migration
cost might not be worth it. The value really compounds when you're working
across multiple projects or switching between them regularly — which, in my
experience, is most of the time.

---

*`mise` replaces `pyenv`, `nvm`, `rbenv`, `tfenv`, `asdf`, and most other
per-language version managers. If you're on `asdf` already, migration is
painless — `mise` reads `.tool-versions` files natively.*
