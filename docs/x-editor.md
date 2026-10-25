# X editor

The static build publishes the same seven languages as LinkedIn: French at `/x`, and English, Spanish, Portuguese, German, Turkish and Polish at `/{lang}/x`. `/fr/x` is a prerendered redirect to `/x`. X-specific about, how-it-works, help and MCP pages are published for all seven languages. Their French `/fr/x/...` aliases redirect to `/x/...`. LinkedIn routes remain unchanged.

`platform.model.ts` defines platform routes, formatting options, limits and themes. The route determines the platform through a Svelte context getter. Both platforms render the same `Home`, `Intro`, `TextEditor`, `TextPreviewContainer` and contribution components. Both route trees reuse the exact same About, HowItWorks, Help and MCP page components under `src/lib/pages/`. `platform-i18n.service.ts` adapts platform references and explicitly overrides counting/formatting/rendering copy. Internal links and metadata use the platform route helpers. Only the post preview body and the counter differ. Coffee buttons keep the shared yellow accent.

The client keeps one shared draft and an edited flag across navigation. Empty drafts and user line breaks are preserved. Extraction removes exactly one Quill terminal newline. Counting, copying and the X preview consume that same final string. No persistence after reload is provided.

The X counter uses `twitter-text` (`parseTweet().weightedLength`), including URL recognition, emoji sequences and NFC normalization for counting. Normalization does not rewrite copied text. The limit is 280 weighted units for standard posts, with a warning from 260; copying remains available above the limit. See [X counting rules](https://docs.x.com/fundamentals/counting-characters).

The monochrome logo variants preserve the original favicon geometry through SVG color filters. The source SVG embeds a PNG rather than editable glyph paths; the variants retain that source artwork. The dedicated 1200×630 OG image remains P2.

## Verification

Run `pnpm pre:commit`. Playwright builds and serves the actual `build/` directory through `preview:static`, so tests also cover the generated sitemap and static FR redirect. Tests exercise Chromium, Firefox and WebKit, desktop/mobile widths, Unicode transformations, boundary counts, exact clipboard payloads, draft preservation, published metadata and FAQ interactions in all seven languages.

## External rendering check

Browser tests validate Boldify’s preview and copied Unicode. They do not establish rendering in the real X web composer or native mobile applications. Before marking that ticket criterion complete, paste bold, italic, strikethrough and both list formats into X web and an actual mobile client, including accents and emoji. Confirm glyph rendering, line breaks and the final standard-post count. Do not assume underline or overline are unsupported: they are simply outside the P1 toolbar.

The follow-up revision shares all page compositions with LinkedIn and retains platform-preserving navigation and the sliding switch. Structural browser tests compare both platforms on desktop and mobile. The X locale set now follows the shared language matcher. Only the dedicated OG image remains deferred. P3 may add useful format-specific landing pages.

## Preview action hover

The six preview actions retain their illustrative counts. Hover uses X's engagement colors: blue `#1d9bf0` for reply, views, bookmark and share; green `#00ba7c` for repost; magenta `#f91880` for like. The pill background uses 10% opacity and fades/scales from 0.88 to 1 over 140ms, with motion disabled for reduced-motion preferences. Values were checked against the [public reference post](https://x.com/neerajjj6785/status/2114042145346850856) and its loaded X client stylesheet. These styles are local to the tweet preview.

X publication and content modification dates live in `src/lib/models/x-content-dates.json`. The initial release is dated 2026-10-25. Visible update labels, JSON-LD on all five page types and the sitemap share this source. Update `dateModified` when X content changes; keep `datePublished` fixed. Sitemap dates also account for later Git changes. LinkedIn keeps its existing dates.
