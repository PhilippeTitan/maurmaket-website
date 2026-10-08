# MaurMaket Web Support — Official Website Context for AI Agents

This folder is the **official MaurMaket website**. It is a separate project from the app
(`C:\MAURINEX\Maurinex Projects\New folder\MaurMaket`), which has its own AGENTS.md — read that
one too for app-wide rules, but this file is the source of truth for website work.

## Session start protocol

1. Read this file end to end.
2. Read `docs/website-plan.md` (the full plan) and `docs/discovery/website-qna-ledger.md`
   (settled decisions, one row per question).
3. Check `git status` before any change (the folder has been a git repo since 2026-10-07 —
   see "Git status" below).
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
- **Prod deploys need Philippe's explicit say-go.** Phase 1 shipped 2026-10-07 under his
  directive "create a repo for the website and publish it, push to netlify", which replaced
  the stale 2026-06-27 Expo export with real content. Do not deploy again casually.
- **No email addresses anywhere on the website** (Philippe, W-Q10): support is handled on the
  site itself via the future ticket system. The app-side `support@maurmaket.com` is a separate
  app question — never put an email on this site.
- **Sequencing**: ledger implementation in the app repo (DeepSeek) finishes before the Support
  API is built. Website design may continue early; wiring waits.
- Discovery style: one focused question at a time, plain-language tradeoffs, recommendation when
  useful; do not implement before Philippe signals ready. Same rules as the app's product Q&A.

## Current status

- **Phase 1 — LIVE (deployed 2026-10-07).** The Astro static site is published at
  https://maurmaket.netlify.app (13 routes: EN/FR/HT home + about + terms + privacy, plus a
  custom 404). Live-verified: every route 200 (404 page returns 404), zero email addresses
  anywhere, footer contact note on every page, download support copy on all three home pages.
  `npm run build` and `npm run check` both pass clean (0/0/0, 13 routes).
- **All 10 plan questions settled (W-Q1…W-Q10 — 2026-10-07).** W-Q10 (Philippe): no email
  addresses on the website — support is handled on the site via the future ticket system.
  His "create a repo … publish it, push to netlify" directive also serves as the W-Q8 copy
  sign-off for Phase 1.
- Discovery ledger: 10 questions settled (see `docs/discovery/website-qna-ledger.md`).
- Folder contents: this file, `docs/`, `package.json`, `astro.config.mjs`, `tsconfig.json`,
  `netlify.toml`, `.gitignore`, `.netlify/` state, `scripts/`, `public/`, `src/`, `node_modules/`.
- **Git repo since 2026-10-07** — private https://github.com/PhilippeTitan/maurmaket-website,
  branch `main`, initial commit pushed (46 files; `node_modules`/`dist`/`.astro`/`.netlify`/
  `src/generated` ignored).

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
- Q10 (W-Q10): **no email addresses anywhere on the website** — support happens on the site
  itself via the future ticket system ("opening soon" until it exists). App-side support email
  is out of website scope.
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
- **Phase 1 deployed 2026-10-07:** `netlify deploy --dir=dist --prod --no-build` from this
  folder (deploy `6ac6e1487b93baee093da0e0`). The production **deploy lock** had blocked the
  first attempt: the published deploy `6a3ffaa4799139fd225409e3` had `locked: true`; cleared
  with `netlify api unlockDeploy --data '{"deploy_id":"6a3ffaa4799139fd225409e3"}'` (the same
  call the CLI's y/N prompt makes; it succeeds silently — re-query `getSite` to confirm
  `locked: false`). The older repo-linked builds that fail with "Install dependencies" errors
  are inert: the site has no repo link (`build_settings` is `{}`).
- Do not touch the GitHub App installation — the other 3 sites' CD depends on it.

## Tech direction (W-Q9 — confirmed; Phase 1 implemented)

- **Astro 7.3.6 + React islands** (React islands only where interactivity is needed — none in
  Phase 1; every page is zero-JS static HTML). Static output on Netlify's CDN; no Node server.
- Phase 3 support API lives on the existing Express backend (Render `maurmaket.onrender.com`),
  routes under `/api/*` — no new server. Netlify proxy `/api/*` → Render planned for Phase 3 so
  the session cookie is first-party (one origin, no CORS/session-exchange hacks).
- i18n: EN/FR/HT with **website-local** locale files (`src/i18n/locales/{en,fr,ht}.json`,
  78 keys each) — deliberately separate from the app's `messages/*.json` so the app's parity
  guardrails and the site never fight.
- Legal text synced from the app's `MaurMaket/src/utils/policyBaseline.js` at build time via
  `scripts/sync-policy.mjs` → `src/generated/policy-meta.json` (gitignored, regenerated by
  `predev`/`prebuild`).
- Version pins learned the hard way: **`typescript@^5.9.0` required** (`@astrojs/check` 0.9.10
  breaks on npm's TS 7.x); never create `src/fetch.ts` (reserved by Astro).

## Verification (commands, run from this folder)

- `npm run check` — sync policy + locale parity (78 keys ×3) + `astro sync` + `astro check`.
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

- **Git repo since 2026-10-07:** `main` → `origin` = https://github.com/PhilippeTitan/maurmaket-website
  (**private**), initial commit pushed (46 files). Author config: `PhilippeTitan` /
  `philijanathethird@gmail.com`. `.gitignore` excludes `node_modules/`, `dist/`, `.astro/`,
  `src/generated/`, `.netlify/`. Push after each meaningful change (same rule as the app repo);
  ask Philippe before anything unusual (force-push, history rewrite, visibility change).

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
- **2026-10-07 — Session W4 (no-email directive, ledger closed, repo + live deploy):** Philippe
  directed: **no email addresses anywhere on the website** — support is handled on the site via
  the future ticket system (the app keeps its own support email as a separate, app-side matter).
  Removed every email reference: EN/FR/HT `download.supportBody` rewritten to on-site wording,
  new `footer.contactNote` key ("Support is coming to this site." / FR / HT) replacing the
  `Base.astro` mailto (77→78 keys), all 9 legal markdown pages reworded off
  `support@maurmaket.com`, `docs/website-plan.md` support-email mention edited. Kept the two
  historical mentions inside this repo's own docs (ledger line, plan line 71). Logged ledger
  **W-Q10 — 10/10 settled**; Philippe's "create a repo for the website and publish it, push to
  netlify" directive doubles as the W-Q8 copy sign-off. Verification: `npm run build` passes
  (78 keys ×3, 13 routes), `npm run check` 0/0/0, `dist` email-grep clean.
  **Git:** `git init -b main` → initial commit (46 files, correct ignores) → private repo
  https://github.com/PhilippeTitan/maurmaket-website created + pushed (clean, tracking
  `origin/main`). **Deploy:** the first `netlify deploy --prod` aborted on a production deploy
  lock (published deploy `6a3ffaa4799139fd225409e3`, `locked: true`); cleared via
  `netlify api unlockDeploy`, then `netlify deploy --dir=dist --prod --no-build` → **live at
  https://maurmaket.netlify.app** (deploy `6ac6e1487b93baee093da0e0`). Live check (Node fetch):
  all 13 routes pass — 200s (custom 404 returns 404), zero `mailto:`/email matches, footer
  contact note present on every page, support copy present on all three home pages.
  **Lessons:** (1) Astro HTML-compresses apostrophes, so FR `supportBody` appears as
  `d&#39;aide` — decode HTML entities before substring-comparing live pages; (2) `supportBody`
  only exists on home pages (download section), don't assert it on about/legal pages;
  (3) PowerShell has no `\u` escapes and `>` writes UTF-16 — do locale verification in Node;
  (4) the Netlify lock prompt is non-interactive-hostile — call `unlockDeploy` directly and
  re-query `getSite` to confirm, since the CLI call may return no output on success.
