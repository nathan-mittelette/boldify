# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Boldify is a SvelteKit 3 / Svelte 5 static site for formatting LinkedIn and X posts with Unicode character styling (bold, italic, strikethrough, etc.). It transforms text using Unicode code point mapping rather than HTML/markdown.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build + generate robots.txt, sitemap.xml, indexnow
pnpm preview      # Preview production build
pnpm check        # Type check with svelte-check
pnpm lint         # ESLint + Prettier check
pnpm format       # Auto-format with Prettier
pnpm pre:commit   # Full pipeline: check, format, lint, build
```

**Always run `pnpm pre:commit` after making changes to verify everything passes (type check, formatting, linting, build).**

## Architecture

### Routing (`src/routes/`)

Multi-language routing with `[lang=lang]` parameter:

- `/[lang]/` - Home (editor/preview)
- `/[lang]/about/` - About page
- `/[lang]/how-it-works/` - How it works
- `/[lang]/help/` - Help page

Parameter validators are registered in `src/params.ts`. The language list at `src/params/lang.ts` supports `fr`, `en`, `es`, `pt`, `de`, `tr`, and `pl`. X pages use `/x` for French and `/{lang}/x` for the other languages, with the same secondary pages as LinkedIn.

### i18n (`svelte-i18n`)

- Service: `src/lib/services/i18n.service.ts`
- Translations: `src/locales/{lang}.json` for all seven languages
- Default language: French ('fr')
- Initialized per route in `[lang]/+layout.ts`

### Text Formatting System (`src/lib/handlers/`)

Handler pattern: `Handler<T> = (text: string, args?: T) => string`

Each handler transforms selected text to Unicode equivalents:

- `bold.handler.ts` - Unicode bold (𝗕𝗼𝗹𝗱)
- `italic.handler.ts` - Unicode italic
- `strike.handler.ts` - Strikethrough
- `underline.handler.ts` - Underlined
- `overline.handler.ts` - Overlined
- `list.handler.ts` - Bullet/numbered lists

`handleUpdateToText()` in `text.handler.ts` manages Quill selection, deletion, and reinsertion.

Kit 3 imports use `#lib/*` (with `.js` for TypeScript modules). `resolve()` from `$app/paths` accepts paths without a leading slash. Adapter and preprocessor configuration lives in `vite.config.ts`.

### Key Components (`src/lib/components/`)

- `Home.svelte` - Main page with editor/preview sections
- `TextEditor.svelte` - Quill-based editor with custom toolbar
- `TextPreviewContainer.svelte` - Live formatted preview
- `Navbar.svelte` - Navigation with language links
- `SEOHead.svelte` - Reusable meta tags component
- `Snackbar.svelte` - Toast notifications

### Stores (`src/lib/stores/`)

- `text.store.ts` - Editor text state
- `snackbar.store.ts` - Notification queue with `addSnackbar()` / `removeSnackbar()`

### Build Pipeline

Static adapter outputs to `/build/`. Post-build scripts in `devops/scripts/`:

- `generate_robots.js` - Creates robots.txt
- `generate_sitemap.js` - Creates sitemap.xml with all language variants
- `generate_indexnow.js` - IndexNow verification for search engines

Vite config includes custom `langPlugin` that updates HTML `lang` attribute per route in build output.

### Styling

Tailwind CSS v4 with custom theme in `src/app.css`:

- Custom color palette (primary, secondary, accent, neutral)
- Utility classes: `.card`, `.btn`, `.section`, `.gradient-text`
- Quill editor style overrides

## Design and Decision Principles

- Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout.
- Make the best decision that will elevate all three: the user experience (UX), developer experience (DX), and agent experience (AX) always, without breaking anything.

## Code Conventions

- **Single Responsibility**: Each component should only do or display one thing. Separate logic between components.

## Tech Stack

- SvelteKit 3 / Svelte 5 with `@sveltejs/adapter-static`
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Quill 2.0 for rich text editing
- svelte-i18n for localization
- TypeScript with strict mode

@RTK.md
