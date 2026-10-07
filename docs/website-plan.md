# MaurMaket Website — Full Plan (Phase 0 deliverable)

Status: **presented, awaiting Philippe's approval.** Nothing in this document is built.
Rule: build nothing until the plan is approved; no cables until the app's ledger work is done.

## 1. Site map

### Public — no sign-in, low-bandwidth, EN/FR/HT

| Route | Purpose |
|---|---|
| `/` | Landing: what MaurMaket is, trust signals, primary **Download** CTA |
| `/download` | Download + updates hub: current APK/AAB, version, changelog / what's new |
| `/about` | Brand / company presence, support entry (handled on this site — no email address) |
| `/legal/terms`, `/legal/privacy` | Read-only documents (served from the app's existing policy baseline) |
| `/help` | Help center home: categorized FAQ / tips articles, client-side search |
| `/help/:article` | Single help article (account, buying, selling, payments, safety, meetup) |
| `/help/contact` | Contact entry: signs in → opens a case; signed out → explains how (app or sign-in) |

### Signed in — user role

- `/account` — profile stub + **My cases** list
- `/account/cases/new` — open a case: category, description, optional evidence with
  user-provided labels (never presented as verified)
- `/account/cases/:ref` — case detail: reference, status, latest update, next expected step,
  honest priority-based response estimate, evidence timeline, one reopen path after closure

### Staff — owner dashboard

- `/dashboard` — case queue (new / awaiting reply / overdue), response-time view
- `/dashboard/cases/:id` — reply, set status, link duplicates, close with outcome;
  **every staff action audit-logged**
- Back pocket (NOT scoped): moderation queues, KYC review, Business-tier web listing tools

## 2. Phasing — "full plan first, build later"

| Phase | Contents | Blocked on |
|---|---|---|
| **0** | This plan approved | now — awaiting answer |
| **1** | Static site: landing with **"Get the app — coming soon"** (no download link until the v1 APK exists), about, legal links, EN/FR/HT — zero cables. `/download` added once the APK exists. Order + coming-soon state agreed 2026-10-07 | Philippe's go |
| **2** | Static help center: articles + client-side search (still no backend) | Phase 1 |
| **3** | Support API (on the existing Render backend) + sign-in + case flows; app `supportGateway` connects here | ledger work finished + Philippe's go |
| **4** | Owner dashboard: queues, replies, audit log, response estimates | Phase 3 |

Standing rules across all phases:

- Never claim a case was filed before Phase 3; `supportGateway` stays `not_connected` until then.
- No prod deploy until Phase 1 content is real (live site still shows the 2026-06-27 Expo export).
- Two roles only (user / staff); server-side authorization on every endpoint; client checks are
  cosmetic. 2FA + audit log on all staff actions. Rate limits on case creation. HTTPS everywhere.
- AI (future) only triages/routes — never decides fault (ledger: bounded AI).

## 3. Tech direction (recommendation, not approved)

- **Static-first** (Astro or plain HTML/CSS/JS): matches the ledger's "multilingual low-bandwidth
  help site"; no Node server to host; Netlify serves it free. Framework islands only where needed
  (search, forms).
- **Deploy:** Netlify CLI from this folder (GitHub repo stays unlinked — DeepSeek's pushes to the
  app repo must never build this site).
- **Backend:** none new. Phase 3 adds `/api/support/*` to the existing Express server on Render
  (`maurmaket.onrender.com`).
- **Auth (Phase 3):** reuse Better Auth — one sign-in system, never a second password store.
  Recommended: Netlify proxy `/api/*` → Render so site + API share one origin and the session
  cookie is first-party (avoids CORS / cross-site cookie exchange).
- **i18n:** EN/FR/HT using website-local locale files in this folder — deliberately separate from
  the app's `messages/*.json` so app parity guardrails and the site never fight.

## 4. Security model (settled in discovery)

- Owner-vs-users two-role model is the industry standard (Zendesk/Freshdesk/Intercom; Instagram
  and Amazon also have help centers — email is only their escalation tier).
- Role split is not itself the risk. Security comes from: server-side authorization on every
  endpoint, a single sign-in system reused from the app, 2FA + audit log on admin actions (both
  patterns already exist in the app), and HTTPS / rate-limit / validation hygiene.

## 5. Ledger decisions the support side must honor (do not rediscover)

Case reference; status + latest update + next expected step; timestamped evidence with
user-provided labels; honest priority-based response estimates (updated when delayed, never
promising a resolution deadline); closure with concise outcome + one reopen path (routed to a
different reviewer where practical); duplicate linking without lost evidence; multilingual
low-bandwidth public help site; bounded AI (never deciding fault); staff audit trails.

## 6. Open questions (one at a time)

1. ~~Phase 1 without an APK~~ — **settled 2026-10-07 (W-Q6):** Phase 1 ships now with a
   "Get the app — coming soon" landing state; `/download` is added once the v1 APK exists.
   (Building the APK is a separate app-repo task and can run in parallel.)
2. ~~Domain~~ — **settled 2026-10-07 (W-Q7):** ship Phase 1 on `maurmaket.netlify.app` now;
   attach a custom domain later with zero rebuild (DNS only).
3. ~~Phase 1 content owner~~ — **settled 2026-10-07 (W-Q8):** AI drafts everything (EN/FR/HT,
   app's voice); Philippe reviews and approves before anything ships; brand-sensitive wording
   flagged for explicit approval.
4. ~~Framework pick~~ — **settled 2026-10-07 (W-Q9):** Astro with React islands.
   Static-by-default (legal/help/marketing = zero-JS static files on Netlify's CDN, no
   Render/DB), React islands only where interactivity is needed (Phase 3 case forms, search,
   sign-in behind the Netlify→Render proxy). Built-in i18n routing for EN/FR/HT; legal text
   single-sourced from the app's `policyBaseline.js` via a build-time sync script.

**All open questions are now settled (W-Q7, W-Q8, W-Q9 closed 2026-10-07).**
