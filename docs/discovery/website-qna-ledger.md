# MaurMaket Website — Discovery Ledger

Append-only decision log, mirroring the app's `app-wide-qna-ledger.md` pattern.
One row per question asked and answered. Do not ask a settled question again — check here first.
Discovery style: one focused question at a time, plain-language tradeoffs, recommendation offered.

| ID | Question (intent) | Answer | Date | Status |
|---|---|---|---|---|
| W-Q1 | What is this folder for? | Official MaurMaket website — umbrella scope: app download + updates hub, marketing/landing, company/brand presence, and eventually support. Started early while DeepSeek does the ledger work in the app repo. | 2026-10-07 | settled |
| W-Q2 | What should the support side eventually do, and is a two-role (owner/users) model standard/secure? | Wants (a) self-serve tips/help area users check before contacting support, (b) owner dashboard to oversee review/support, (c) user sign-in to track own cases, (d) future Business-tier tools (e.g. posting listings from the website) = back pocket, not scoped. Two-role model is standard; security = server-side authorization per endpoint, one sign-in reused from the app (never a second password store), 2FA + audit log on staff actions, HTTPS/rate-limit/validation. | 2026-10-07 | settled |
| W-Q3 | (technical, answered in chat) Is help center → ticket system → staff dashboard the right pattern? | Yes — industry standard (Zendesk/Freshdesk/Intercom; Instagram/Amazon have help centers; email is only their escalation tier). Role split itself is not the risk. | 2026-10-07 | settled |
| W-Q4 | What ships first in v1 — which phase order? | "Full plan first, build later": design the complete site map (landing + help + support + dashboard) as one plan; build nothing until the plan is approved. | 2026-10-07 | settled |
| W-Q5 | Confirm Phase 1→4 order: marketing/download → help center → support cases → owner dashboard? | Agreed — order confirmed: marketing/download → static help center → support cases → owner dashboard. Amendment: the download hub cannot be the practical focus yet because the v1 APK hasn't been created. | 2026-10-07 | settled (with amendment) |
| W-Q6 | Until the v1 APK exists, should Phase 1 ship the landing anyway with a "Get the app — coming soon" state, or hold Phase 1 until the APK is built? | Agreed — Phase 1 ships now with a coming-soon download state; `/download` is added when the v1 APK exists. Building the v1 APK is a separate app-repo task (gradle instructions in the app's AGENTS.md) and can happen in parallel. | 2026-10-07 | settled |
| W-Q7 | Domain: ship on `maurmaket.netlify.app` now, or wait for a custom domain? | Agreed — ship Phase 1 on the free `maurmaket.netlify.app` now; a custom domain (e.g. `maurmaket.ht` / `.com`, ~$10–15/yr) can be attached later with zero rebuild (DNS points at the same Netlify site). Waiting would only delay launch for something that doesn't change the code. | 2026-10-07 | settled |
| W-Q8 | Phase 1 content owner: who writes the landing copy and changelog? | Agreed — **AI drafts everything (EN/FR/HT, app's established voice), Philippe reviews and approves before anything ships.** Nothing public goes live without his sign-off; brand-sensitive wording (tagline, company blurb) flagged for his explicit approval. | 2026-10-07 | settled |
| W-Q9 | Framework pick at Phase 1 start: Astro vs plain static HTML/CSS/JS? | Agreed — **Astro with React islands.** Static-by-default (legal/help/marketing = zero-JS static files served from Netlify's CDN — no Render, no DB, per the legal-storage tip and the low-bandwidth rule); React islands only where interactivity is needed (Phase 3 case forms, search, sign-in behind the Netlify→Render proxy). Built-in i18n routing for EN/FR/HT with one shared layout. Legal text single-sourced from the app's `policyBaseline.js` via a build-time sync script. Netlify detects Astro automatically. | 2026-10-07 | settled |
| W-Q10 | Where should the website point users for support — email, or on-site? (Philippe directive) | **No email on the website.** No `mailto:` links, no `support@maurmaket.com` (domain not owned), no `maurinexus.contact@gmail.com` (unnecessary). Support will be handled **on the website itself** via the future ticket system (Phase 3). Until then, Phase 1 copy says support/help center/case tracking is "opening soon" on this site, plus the in-app Help & Support screen for app users. `maurinexus.contact@gmail.com` remains valid **app-side only** if ever needed — never on the website. | 2026-10-07 | settled |

**All questions settled (10/10) — 2026-10-07.** Phase 1 built; shipped to Netlify after Philippe's "create a repo … publish it, push to netlify" directive (which also serves as W-Q8 copy sign-off).

**Deploy / sign-off log (append-only):**

- 2026-10-07 — W6 redesign deployed (`2909f03`) under Philippe's "commit + push + deploy now"; his "accept all 5 as built" closed the W6 design questions.
- 2026-10-08 — W7 immersive-hero + discovery rework (`4233f2a`) and the W7b meetup-photo swap (`8412b8e`, `9e52535`) deployed after Philippe's "proceed" / "u can deploy". That same message covers **W-Q8 sign-off for the W7 `discover.*` and `story.*` copy** (AI-drafted EN/FR/HT), so no copy approval is outstanding. Deploy `6ac72aa30b7c8efff030df10`, verified 71/71 live (all 12 routes 200, 0 emails, per-locale skip links, W7 sections present in all three locales, new 27,122 B meetup image served).

## Cross-references

- Full plan: `docs/website-plan.md`
- Standing constraints (no cables, no case-filing claims, no prod deploy): `AGENTS.md`
- App-side pointer: MaurMaket `AGENTS.md` → `### Official Website Discovery — In Progress (2026-10-07)`
- App ledger support decisions the website must honor: case reference, status + latest update +
  next expected step, user-provided-labeled evidence, priority-based response estimates,
  closure + one reopen path, duplicate linking, multilingual low-bandwidth help site, bounded AI,
  staff audit trails.
