# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An internal, bilingual (English / Slovenian) library of **approved AI prompts** for
Banka Slovenije employees. It is both a folder of Markdown prompts and a dependency-free
static web app that renders them with search, a language toggle, and copy-to-clipboard.

The app must run **offline from `file://`** and in a **locked-down intranet**: no CDN,
no fonts, no analytics, no network requests, no `npm install`. The only browser storage
used is `localStorage` for the language preference. Preserve these constraints — they are
the whole point of the project, not incidental.

## Commands

```sh
# Regenerate data/prompts.js from the Markdown in prompts/ (Node built-ins only)
node scripts/build.mjs

# Run the app: just open index.html in a browser (works under file://)
```

There is no test suite, linter, or package manager. `scripts/build.mjs` is the only
build step, and the app itself needs no build to run.

## Architecture

The data flow is one direction:

```
prompts/*.md  ──(node scripts/build.mjs)──►  data/prompts.js  ──(<script>)──►  index.html + assets/app.js
 source of truth        generated, committed         window.PROMPTS
```

- **`prompts/*.md`** are the source of truth. One file per prompt. Each has YAML-ish
  front-matter (`id`, `order`, `status`, `approved_by`, `approved_date`, `version`) and a
  body split into `# EN` and `# SL` level-1 sections, each containing the same `## ` fields.
- **`scripts/build.mjs`** parses every `.md` (except `TEMPLATE.md`), maps the localized
  `## ` headings to canonical field keys via `HEADING_TO_FIELD`, and writes
  `data/prompts.js` as `window.PROMPTS = [...]` sorted by `order`. It is loaded as a plain
  `<script>` (not `fetch`) specifically so the site works under `file://`.
- **`data/prompts.js`** is a **generated artifact that is committed** so the site runs with
  no build step. Do not hand-edit it unless Node is genuinely unavailable.
- **`assets/app.js`** reads `window.PROMPTS`, renders cards, and handles language toggle,
  diacritic-insensitive search, and copy. All UI chrome strings live in its `UI` object,
  keyed by `en`/`sl`; prompt *content* lives only in `data/prompts.js`.

### Adding the same field in three places

When you add a new prompt field, it must be wired in consistently or it silently disappears:
1. `prompts/TEMPLATE.md` — both `# EN` and `# SL` headings.
2. `scripts/build.mjs` — `HEADING_TO_FIELD` (both languages) and, if mandatory, `REQUIRED_FIELDS`.
3. `assets/app.js` — `UI.en.fields` / `UI.sl.fields` labels and `FIELD_ORDER` (controls
   render order; a field absent from `FIELD_ORDER` is never displayed).

### Known gap: `status` is parsed but not enforced

Governance says only `status: approved` prompts should reach staff, but **neither
`build.mjs` nor `app.js` filters on `status`** — every `.md` in `prompts/` is built and
rendered regardless. Approval is currently enforced only by human review at merge time. If
asked to "hide drafts" or enforce approval, that filter does not exist yet and must be added.

## Editing prompts

1. Copy `prompts/TEMPLATE.md` to `prompts/NN-name.md`.
2. Fill in front-matter and **both** `# EN` and `# SL` sections (they are approved together
   and must stay in sync — keep both languages current in the same commit).
3. Run `node scripts/build.mjs`.
4. Commit **both** the `.md` file and the regenerated `data/prompts.js`.

`build.mjs` prints warnings (it does not fail) for files missing an EN/SL section or a
required field — check its output after building.
