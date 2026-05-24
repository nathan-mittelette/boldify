# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Boldify is a SvelteKit 5 static site for formatting LinkedIn posts with Unicode character styling (bold, italic, strikethrough, etc.). It transforms text using Unicode code point mapping rather than HTML/markdown.

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

Language matcher at `src/params/lang.ts` validates against `['fr', 'en']`.

### i18n (`svelte-i18n`)

- Service: `src/lib/services/i18n.service.ts`
- Translations: `src/locales/en.json`, `src/locales/fr.json`
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

## Code Conventions

- **Single Responsibility**: Each component should only do or display one thing. Separate logic between components.

## Tech Stack

- SvelteKit 5 with `@sveltejs/adapter-static`
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Quill 2.0 for rich text editing
- svelte-i18n for localization
- TypeScript with strict mode

<!-- rtk-instructions v2 -->

# RTK (Rust Token Killer) - Token-Optimized Commands

## Golden Rule

**Always prefix commands with `rtk`**. If RTK has a dedicated filter, it uses it. If not, it passes through unchanged. This means RTK is always safe to use.

**Important**: Even in command chains with `&&`, use `rtk`:

```bash
# ❌ Wrong
git add . && git commit -m "msg" && git push

# ✅ Correct
rtk git add . && rtk git commit -m "msg" && rtk git push
```

## RTK Commands by Workflow

### Build & Compile (80-90% savings)

```bash
rtk cargo build         # Cargo build output
rtk cargo check         # Cargo check output
rtk cargo clippy        # Clippy warnings grouped by file (80%)
rtk tsc                 # TypeScript errors grouped by file/code (83%)
rtk lint                # ESLint/Biome violations grouped (84%)
rtk prettier --check    # Files needing format only (70%)
rtk next build          # Next.js build with route metrics (87%)
```

### Test (60-99% savings)

```bash
rtk cargo test          # Cargo test failures only (90%)
rtk go test             # Go test failures only (90%)
rtk jest                # Jest failures only (99.5%)
rtk vitest              # Vitest failures only (99.5%)
rtk playwright test     # Playwright failures only (94%)
rtk pytest              # Python test failures only (90%)
rtk rake test           # Ruby test failures only (90%)
rtk rspec               # RSpec test failures only (60%)
rtk test <cmd>          # Generic test wrapper - failures only
```

### Git (59-80% savings)

```bash
rtk git status          # Compact status
rtk git log             # Compact log (works with all git flags)
rtk git diff            # Compact diff (80%)
rtk git show            # Compact show (80%)
rtk git add             # Ultra-compact confirmations (59%)
rtk git commit          # Ultra-compact confirmations (59%)
rtk git push            # Ultra-compact confirmations
rtk git pull            # Ultra-compact confirmations
rtk git branch          # Compact branch list
rtk git fetch           # Compact fetch
rtk git stash           # Compact stash
rtk git worktree        # Compact worktree
```

Note: Git passthrough works for ALL subcommands, even those not explicitly listed.

### GitHub (26-87% savings)

```bash
rtk gh pr view <num>    # Compact PR view (87%)
rtk gh pr checks        # Compact PR checks (79%)
rtk gh run list         # Compact workflow runs (82%)
rtk gh issue list       # Compact issue list (80%)
rtk gh api              # Compact API responses (26%)
```

### JavaScript/TypeScript Tooling (70-90% savings)

```bash
rtk pnpm list           # Compact dependency tree (70%)
rtk pnpm outdated       # Compact outdated packages (80%)
rtk pnpm install        # Compact install output (90%)
rtk npm run <script>    # Compact npm script output
rtk npx <cmd>           # Compact npx command output
rtk prisma              # Prisma without ASCII art (88%)
```

### Files & Search (60-75% savings)

```bash
rtk ls <path>           # Tree format, compact (65%)
rtk read <file>         # Code reading with filtering (60%)
rtk grep <pattern>      # Search grouped by file (75%). Format flags (-c, -l, -L, -o, -Z) run raw.
rtk find <pattern>      # Find grouped by directory (70%)
```

### Analysis & Debug (70-90% savings)

```bash
rtk err <cmd>           # Filter errors only from any command
rtk log <file>          # Deduplicated logs with counts
rtk json <file>         # JSON structure without values
rtk deps                # Dependency overview
rtk env                 # Environment variables compact
rtk summary <cmd>       # Smart summary of command output
rtk diff                # Ultra-compact diffs
```

### Infrastructure (85% savings)

```bash
rtk docker ps           # Compact container list
rtk docker images       # Compact image list
rtk docker logs <c>     # Deduplicated logs
rtk kubectl get         # Compact resource list
rtk kubectl logs        # Deduplicated pod logs
```

### Network (65-70% savings)

```bash
rtk curl <url>          # Compact HTTP responses (70%)
rtk wget <url>          # Compact download output (65%)
```

### Meta Commands

```bash
rtk gain                # View token savings statistics
rtk gain --history      # View command history with savings
rtk discover            # Analyze Claude Code sessions for missed RTK usage
rtk proxy <cmd>         # Run command without filtering (for debugging)
rtk init                # Add RTK instructions to CLAUDE.md
rtk init --global       # Add RTK to ~/.claude/CLAUDE.md
```

## Token Savings Overview

| Category         | Commands                       | Typical Savings |
| ---------------- | ------------------------------ | --------------- |
| Tests            | vitest, playwright, cargo test | 90-99%          |
| Build            | next, tsc, lint, prettier      | 70-87%          |
| Git              | status, log, diff, add, commit | 59-80%          |
| GitHub           | gh pr, gh run, gh issue        | 26-87%          |
| Package Managers | pnpm, npm, npx                 | 70-90%          |
| Files            | ls, read, grep, find           | 60-75%          |
| Infrastructure   | docker, kubectl                | 85%             |
| Network          | curl, wget                     | 65-70%          |

Overall average: **60-90% token reduction** on common development operations.

<!-- /rtk-instructions -->
