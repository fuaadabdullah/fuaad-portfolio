# CODE_PRINCIPLES.md

This document contains Fuaad’s Code Doctrine™ turned into a practical, repo-ready style guide and automated pre-commit setup. Drop this in the root of any project and force your goblins to behave.

---

## Purpose

Keep code readable, testable, and sane. These rules are short, opinionated, and built for fast iteration and long-term maintenance.

---

## Principles (short list you can paste anywhere)

1. **Single Responsibility** — Functions and modules do one thing and one thing only.
2. **Clear Layering** — Keep controllers, services, repositories, and utils separated.
3. **Self-explanatory Names** — If you have to explain it, rename it.
4. **Fail Fast** — Validate early; throw meaningful errors.
5. **Pure Where Possible** — Avoid hidden side effects; prefer pure functions.
6. **Config Over Code** — Put env-specific values in config or environment variables.
7. **Document** — Docstrings, module READMEs, and a project `ARCHITECTURE.md`.
8. **Test First Mindset** — Unit tests for logic, integration tests for flows.
9. **Readable > Clever** — If it needs a PhD to read, refactor it.
10. **Automate Repetition** — Script repeated tasks; make CLIs for routine ops.
11. **Typed Interfaces** — Use type hints and mypy for contracts.
12. **No Dead Code** — Remove or archive unused code immediately.
13. **Meaningful Commits** — Write commit messages that explain intent.
14. **Security by Default** — Sanitize and validate all external inputs.
15. **Measure Before Optimizing** — Profile, then fix the real bottleneck.

---

## Single Responsibility — Practical guidance

Make it easy to keep functions and modules focused. Use this short checklist when writing or reviewing code:

- **One responsibility**: A function or module should have a single, well-defined purpose.
- **Small is readable**: Prefer small functions (20–80 lines); if a function grows beyond ~120 lines, consider splitting it.
- **Limit params**: Prefer <= 4 parameters; group related params into objects if needed.
- **Avoid long switch/cascades**: Extract branch handlers into named helpers.
- **Keep side effects explicit**: Functions that mutate state should indicate it in their name (e.g., `updateUser()` vs `formatUser()`).
- **Write tests for behavior**: Small, focused functions are easier to test — unit tests should cover each responsibility.

Quick refactor checklist:

- Extract helpers for repeated or nested logic.
- Move persistence, networking, or I/O into separate modules (adapters/services).
- Turn complex functions into small, pure functions plus a thin orchestrator.

Enforcement (automated and human):

- Add lint rules to warn on large/complex functions (see `.eslintrc.json`).
- Include SRP checks in PR reviews: ask "what does this function do?" and prefer short, well-named functions.

How to check locally:

Run the project's linter to see SRP-related warnings:

```bash
# npm
npm run lint

# or pnpm
pnpm lint

# or run ESLint directly
npx eslint . --ext .ts,.tsx
```

Example (before → after):

Before: a big `processOrder()` that validates input, applies discounts, persists an order, and sends emails.

After: `validateOrder()`, `applyDiscounts()`, `persistOrder()`, `notifyOrderCreated()` — orchestrated by `processOrder()`.


## Recommended Repo Layout (example)

```
project-root/
├─ src/
│  ├─ myapp/
│  │  ├─ api/         # controllers / endpoints / handlers
│  │  ├─ services/    # business logic
│  │  ├─ adapters/    # external integrations (DB, APIs)
│  │  ├─ models/      # domain models / pydantic / dataclasses
│  │  └─ utils/       # small helpers
├─ tests/
├─ docs/
│  └─ ARCHITECTURE.md
├─ .pre-commit-config.yaml
├─ pyproject.toml
├─ README.md
└─ CODE_PRINCIPLES.md
```

---

## How to enforce this (recommended tooling)

* **Formatting & style**: black, isort, ruff (or flake8)
* **Type checking**: mypy
* **Pre-commit**: pre-commit to run checks locally
* **CI**: run the same checks in CI (GitHub Actions example below)

---

## Quick onboarding checklist for a new repo

1. Add `pyproject.toml` with black/isort/ruff config (example below).
2. Add `.pre-commit-config.yaml` (provided below).
3. Add `tests/` and at least one smoke test.
4. Add `ARCHITECTURE.md` describing modules and high level flow.
5. Install pre-commit and run `pre-commit run --all-files`.

---

# .pre-commit-config.yaml (drop this file in the repo root)

```yaml
repos:
  - repo: https://github.com/psf/black
    rev: 23.9.1
    hooks:
      - id: black
        language_version: python3.11

  - repo: https://github.com/PyCQA/isort
    rev: 5.12.0
    hooks:
      - id: isort
        name: isort (python)

  - repo: https://github.com/charliermarsh/ruff-pre-commit
    rev: v0.21.0
    hooks:
      - id: ruff
        args: ["--fix"]

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.4.1
    hooks:
      - id: mypy
        args: ["--ignore-missing-imports"]

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: check-yaml
      - id: end-of-file-fixer
      - id: trailing-whitespace

# Optional: add a hook to run tests (slow), or CI-only
#  - repo: local
#    hooks:
#      - id: pytest
#        name: run tests
#        entry: pytest -q
#        language: system
#        pass_filenames: false
```

---

# pyproject.toml (minimal recommended settings)

```toml
[tool.black]
line-length = 88
target-version = ['py311']

[tool.isort]
profile = "black"

[tool.ruff]
line-length = 88
select = ["E", "F", "W", "B", "C", "I"]

[tool.mypy]
python_version = 3.11
ignore_missing_imports = true

[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"
```

---

# DEV-INSTALL.md (how your goblins set up a repo locally)

```
# recommended: create a venv
python -m venv .venv
source .venv/bin/activate

# install dev tooling
pip install --upgrade pip
pip install pre-commit black isort ruff mypy

# install pre-commit git hooks
pre-commit install

# run checks against the whole repo once
pre-commit run --all-files
```

---

# GitHub Actions snippet (ci.yaml) — put under .github/workflows/ci.yaml

```yaml
name: CI
on: [push, pull_request]

jobs:
  checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - name: Install deps
        run: |
          python -m pip install --upgrade pip
          pip install pre-commit black isort ruff mypy
      - name: Run pre-commit
        run: pre-commit run --all-files
```

---

# Examples of good commit messages

* `feat(auth): add token-refresh endpoint with tests`
* `fix(db): avoid N+1 by eager-loading user profiles`
* `chore: run black/isort on repository`
* `docs(arch): add sequence diagram for order flow`

---

# Optional: enforce on PR level

* Protect main branch in Git hosting.
* Add required status checks: `pre-commit` / `ci`.

---

# Final notes

This is an opinionated starting point. Tweak versions and tool args to match project constraints. Use ruff as the single linter where you want speed; include mypy for strict typing if your project benefits from it.

If you want, I can also:

* produce a ready `.githooks/` script for custom checks,
* create a GitHub Actions pipeline that caches dependencies,
* or convert this into a shell script that bootstraps new repos.

---

*End of CODE_PRINCIPLES_AND_PRECOMMIT*