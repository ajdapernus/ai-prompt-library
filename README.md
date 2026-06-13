# AI Prompt Library — Banka Slovenije

A curated internal library of **approved prompts** for safe, effective use of AI
tools. Aimed at all employees. Bilingual (English / Slovenian).

The library is two things in one:

- A folder of human-readable **Markdown** files (`prompts/`) — the source of truth.
- A small **static web app** (`index.html`) that renders those prompts with search,
  a language toggle, and copy-to-clipboard.

## How to use

**Locally:** double-click `index.html` — it opens in your browser and works
offline. No installation, no internet connection, no dependencies.

**On the intranet:** drop this whole folder onto any static web server and share
the link. Behaviour is identical to opening it locally.

In the app you can:

- Switch between **EN** and **SL** (top-right).
- **Search** across all prompt text in the current language (accent-insensitive).
- Click a **category** in the sidebar to jump to a prompt.
- **Copy** a prompt template with one click, then paste it into your AI tool and
  fill in the `[BRACKETED]` placeholders.

## Confidentiality & data handling

- You may use data classified **up to and including “Confidential”** in the approved
  AI platform. **Do not** paste anything classified **above Confidential**.
- Always replace `[PLACEHOLDERS]` with the minimum information needed.
- This app sends **no data anywhere** — it runs entirely in your browser. The only
  thing it stores is your language preference (`localStorage`), which never leaves
  your device.

## How to add or edit a prompt

1. Copy `prompts/TEMPLATE.md` to a new file, e.g. `prompts/10-my-prompt.md`.
2. Fill in the front-matter (`id`, `order`, `status`, `approved_by`,
   `approved_date`, `version`) and **both** the `# EN` and `# SL` sections.
3. Regenerate the data file the app reads:

   ```sh
   node scripts/build.mjs
   ```

   This rewrites `data/prompts.js` from the Markdown. The script uses only Node
   built-ins — no `npm install`.

   **No Node available?** Edit `data/prompts.js` by hand to mirror your Markdown
   (it is a single `window.PROMPTS = [ ... ]` array).
4. Commit **both** the `.md` file and the regenerated `data/prompts.js`.

### Prompt structure

Each prompt has, in both languages:

- **Title**
- **Prompt template** — the reusable text employees copy (the Copy button copies this)
- **Use case** — when and why to use it
- **Required inputs** — what the employee must provide
- **Expected output** — what the AI should return
- **Example** — a short, filled-in example

## Governance / approval

- Only prompts with `status: approved` should be merged and shown to staff.
- Changes go through review by the designated owner (`approved_by`).
- Bump `version` on any material change to wording.
- Keep EN and SL in sync — they live in the same file and are approved together.

## No external dependencies

Plain HTML, CSS and JavaScript. **Zero** runtime dependencies, **no** build step
required to use, **no** CDN, fonts or analytics from any external origin. Suitable
for a locked-down intranet environment.

## Project layout

```
ai-prompt-library/
├── index.html            # the web app
├── assets/
│   ├── styles.css
│   └── app.js
├── data/
│   └── prompts.js        # generated from prompts/ (committed)
├── prompts/              # Markdown source of truth (one file per prompt)
│   ├── TEMPLATE.md
│   └── 01-…-09-….md
└── scripts/
    └── build.mjs         # regenerates data/prompts.js
```
