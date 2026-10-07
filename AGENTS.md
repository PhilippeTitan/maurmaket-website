# MaurMaket Web Support — Official Website Context for AI Agents

This folder is the **official MaurMaket website**. It is a separate project from the app
(`C:\MAURINEX\Maurinex Projects\New folder\MaurMaket`), which has its own AGENTS.md — read that
one too for app-wide rules, but this file is the source of truth for website work.

## Session start protocol

1. Read this file end to end.
2. Read `docs/website-plan.md` (the full plan) and `docs/discovery/website-qna-ledger.md`
   (settled decisions, one row per question).
3. Check `git status` before any change (once the folder is a git repo — see "Git status" below).
4. Record new settled decisions in BOTH:
   - `docs/discovery/website-qna-ledger.md` (decision log), and
   - the main app AGENTS.md section `### Official Website Discovery` (one-line pointer/summary),
     so the MaurMaket agent stays in sync with web updates.

## What this website is (umbrella scope)

- App download + updates hub (APK/AAB, changelog / what's new)
- Marketing / landing — brand and company presence
- Public help center (self-serve tips before contacting support)
- Support case intake + user case tracking (sign-in) — **later phase**
- Owner/staff dashboard to oversee the review/support system — **later phase**
- Back pocket (NOT scoped): Business-tier tools such as posting listings from the website

## Hard constraints (Philippe)

- **No cables plugged yet**: no support API/backend calls, no sign-in wiring, no credentials.
  Design/purpose discussion first. No implementation or deploy until Philippe says go.
- **Never claim a case was filed.** The app's `src/support/supportGateway.ts` stays
  `not_connected` until the real support API exists. Existing app rule: build the narrow typed
  seam only; route users to in-app Help & Support until then.
- **No prod deploy until real content exists.** The live site (`maurmaket.netlify.app`) still
  serves the stale 2026-06-27 Expo export from the app repo. Do not deploy over it casually.
- **Sequencing**: ledger implementation in the app repo (DeepSeek) finishes before the Support
  API is built. Website design may continue early; wiring waits.
- Discovery style: one focused question at a time, plain-language tradeoffs, recommendation when
  useful; do not implement before Philippe signals ready. Same rules as the app's product Q&A.

## Current status

- **Phase 1 — BUILT, awaiting Philippe's copy approval (2026-10-07).** Astro scaffold, EN/FR/HT
  static landing + about + terms + privacy + 404 all compile. `npm run build` and `npm run check`
  both pass clean. **Nothing deployed, nothing committed.** Next: Philippe reviews the copy
  (W-Q8 — AI drafts, he signs off), then approve deploy and (separately) `git init`/commit.
- **All plan open questions are settled (W-Q7, W-Q8, W-Q9 — 2026-10-07).**
- Discovery ledger: 9 questions settled (see `docs/discovery/website-qna-ledger.md`).
- Folder contents: this file, `docs/`, `package.json`, `astro.config.mjs`, `tsconfig.json`,
  `netlify.toml`, `.gitignore`, `.netlify/` state, `scripts/`, `public/`, `src/`, `node_modules/`.
- **Not a git repo yet** — ask Philippe before `git init`.

## Settled decisions (summary — full log in docs/discovery/)

- Q1: folder = official MaurMaket website, umbrella scope, started early while DeepSeek does the
  ledger work; no cables.
- Q2: support direction = self-serve help area + owner dashboard + user sign-in case tracking +
  future Business tools (back pocket). Two-role model is industry standard; security = server-side
  authorization, single sign-in reused from the app (never a second password store), 2FA + audit
  log on staff actions, HTTPS/rate-limit/validation.
- Q3 (technical answer, binding): help center → ticket/case system → staff dashboard with two
  roles is the standard pattern (Zendesk/Freshdesk/Intercom; Instagram/Amazon have help centers).
- Q4: **"Full plan first, build later"** — design the complete site map and all pages as one
  plan; build nothing until the plan is approved.
- Q7 (W-Q7): domain — ship Phase 1 on the free `maurmaket.netlify.app`; attach a custom domain
  later with zero rebuild (DNS only).
- Q8 (W-Q8): content owner — AI drafts everything (EN/FR/HT, app's voice); Philippe reviews and
  approves before anything ships; brand-sensitive wording flagged for explicit approval.
- Q9 (W-Q9): framework — **Astro with React islands.** Static-by-default (legal/help/marketing
  = zero-JS static files on Netlify's CDN, no Render/DB), React islands only where
  interactivity is needed; built-in i18n routing; legal text synced from the app's
  `policyBaseline.js` at build time.
- Ledger support decisions to design against (do NOT rediscover): case reference, status + latest
  update + next expected step, timestamped user-provided-labeled evidence, honest priority-based
  response estimates, closure with outcome + one reopen path, duplicate linking, multilingual
  low-bandwidth public help site, bounded AI (never deciding fault), staff audit trails.

## Netlify (deployment target)

- Site: `maurmaket`, id `c3f3013a-dfb1-4db1-b6c0-e948a57ab816`, URL https://maurmaket.netlify.app
- **GitHub repo link removed** (`unlinkSiteRepo`, `build_settings` now `{}`) — pushes to
  `PhilippeTitan/MaurMaket` never build this site. Folder is linked via `.netlify/state.json`.
- Netlify CLI: `netlify` (v23.13.0) at `C:\Users\drato\AppData\Roaming\npm\netlify.ps1`,
  logged in as Maurinex / team "PhilippeTitan's team". CLI file deploys are allowed only when
  Philippe says go.
- Bundled API spec (operation IDs): `C:\Users\drato\AppData\Roaming\npm\node_modules\netlify-cli\node_modules\@netlify\open-api\dist\swagger.json`
- Do not touch the GitHub App installation — the other 3 sites' CD depends on it.

## Tech direction (W-Q9 — confirmed; Phase 1 implemented)

- **Astro 7.3.6 + React islands** (React islands only where interactivity is needed — none in
  Phase 1; every page is zero-JS static HTML). Static output on Netlify's CDN; no Node server.
- Phase 3 support API lives on the existing Express backend (Render `maurmaket.onrender.com`),
  routes under `/api/*` — no new server. Netlify proxy `/api/*` → Render planned for Phase 3 so
  the session cookie is first-party (one origin, no CORS/session-exchange hacks).
- i18n: EN/FR/HT with **website-local** locale files (`src/i18n/locales/{en,fr,ht}.json`,
  77 keys each) — deliberately separate from the app's `messages/*.json` so the app's parity
  guardrails and the site never fight.
- Legal text synced from the app's `MaurMaket/src/utils/policyBaseline.js` at build time via
  `scripts/sync-policy.mjs` → `src/generated/policy-meta.json` (gitignored, regenerated by
  `predev`/`prebuild`).
- Version pins learned the hard way: **`typescript@^5.9.0` required** (`@astrojs/check` 0.9.10
  breaks on npm's TS 7.x); never create `src/fetch.ts` (reserved by Astro).

## Verification (commands, run from this folder)

- `npm run check` — sync policy + locale parity (77 keys ×3) + `astro sync` + `astro check`.
  Target: **0 errors / 0 warnings / 0 hints** (21 files).
- `npm run build` — `sync:policy` + `check:locales` (via `prebuild`) → `astro build` →
  `scripts/check-built.mjs` (verifies 13 dist routes: 12 localized + `404.html`; `<html lang>`
  matches path; no `undefined`/`[object Object]`; non-empty `<title>`; internal hrefs resolve).
- `npm run dev` — Astro dev server (runs `sync:policy` first via `predev`).
- `npm run preview` — serve `dist/` locally.
- Never run the app repo's `npm test` against this folder (different project).
- PowerShell 5.1 notes: no `&&` inside one command, no `grep` (use `Select-String`), `>` writes
  UTF-16 (write JSON via a node script), console mangles UTF-8 accents (verify special chars via
  node codepoints, not console display).

## Git status

- The folder is **not yet a git repository** (only `.gitignore` + `.netlify` exist). Ask Philippe
  before `git init` and before any commit/push. Separate repo from the app by design.

## Session log

- **2026-10-07 — Session W1 (start):** Netlify transition executed (repo unlinked, folder linked);
  discovery Q1–Q4 answered (scope, support direction, standard pattern, "full plan first"); full
  plan drafted in `docs/website-plan.md`; this MD structure created. No code, no deploy.
- **2026-10-07 — Session W2 (discovery closed, plan approved, Phase 1 GO):** W-Q5–W-Q9 settled
  (order marketing → help → support cases → dashboard; "coming soon" until the APK exists; free
  `maurmaket.netlify.app` domain; AI drafts copy with Philippe's sign-off; Astro + React islands).
  Plan approved with amendments; Philippe gave explicit GO for Phase 1. Ledger:
  `docs/discovery/website-qna-ledger.md`.
- **2026-10-07 — Session W3 (Phase 1 built):** Full static site implemented — Astro 7.3.6
  scaffold (`package.json`, `astro.config.mjs` with i18n `{prefixDefaultLocale:false}`,
  `tsconfig.json`, `netlify.toml`); design system `src/styles/global.css`; `src/i18n.ts` +
  `src/i18n/locales/{en,fr,ht}.json` (77 keys each, parity-checked); `src/layouts/Base.astro`;
  sections `Landing/About/LegalPage`; 12 pages (EN root + `fr/` + `ht/`: home, about, terms,
  privacy) + `404.astro`; 6 legal markdown entries `src/content/legal/{terms,privacy}.{en,fr,ht}.md`
  (content collection with explicit `generateId` — see lesson below); brand wordmark as text
  (gradient logo invisible on white; `logo-text.webp` only in the dark download band) with
  MonCash/NatCash payment logos; "Get the app — coming soon" state, support
  `support@maurmaket.com`, © 2026 MaurMaket footer.
  Three guardrail scripts: `scripts/sync-policy.mjs` (build-time sync from the app's
  `policyBaseline.js`), `scripts/check-locales.mjs` (EN/FR/HT key parity), `scripts/check-built.mjs`
  (13 dist routes, lang attributes, titles, internal links) wired into `predev`/`prebuild`/`build`.
  **Lessons:** (1) YAML frontmatter dates must be quoted (`updated: "2026-10-07"`) or they parse
  as Date and fail the schema; (2) nested `src/pages/{fr,ht}/legal/*.astro` needs `../../../`
  import depth; (3) Astro 7's default glob `generateId` slugifies `privacy.fr.md` → `privacyfr`,
  so `getEntry('legal','privacy.fr')` missed — fixed with an explicit
  `generateId: ({entry}) => entry.replace(/\.[^./]+$/, '')` on the loader; data store lives at
  `node_modules/.astro/data-store.json`, not `.astro/`.
  **Verification:** `npm install` (268 pkgs, 0 vulns, pin `typescript@^5.9`), `npm run build`
  passes (all 13 routes), `npm run check` passes (0 errors / 0 warnings / 0 hints, 21 files).
  **No deploy, no commit, no `git init`** — copy sign-off (W-Q8) is the gate; deploy and git
  each need Philippe's explicit approval.
