# Rulings — website dependency review and its fixes

Steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Coordinator: `steering-coordinator`. Origin: his selection at
2026-11-20T01:33Z, recorded in `steering/fix-personal-message-access-rulings.md`, block "2026-11-20T01:34Z", question "Deps review",
chosen option "Agent: open it after release (Recommended)": after the access fix ships, steering starts a security dependency-only review
of website, which assesses what hooks.gg reaches and brings any fix back to him as its own scope question.

## 2026-11-20T01:59Z — review delivered; three scope answers (his selection)

**Review:** `security/website-deps-review-security-audit.md` (record `1248690`), `Status: Active`, `Reviewed-At: 983681c…`, read this
turn. Session `security-hooks-website-deps` (brief `steering/website-deps-review-brief-security.md`, `d1abc6e`). By its message:
- 141 advisory entries were dispositioned, in 34 packages. 5 are reached; none of the 8 criticals is reached as hosted.
- Owner-needing: H-001 (HIGH), H-002 (HIGH) and M-001 (MEDIUM), plus two confirmations (`/_next/image` served by Vercel; the
  `x-query-params` passthrough on Vercel) and unused dependencies.
**Refutation of H-001** (a `general-purpose-sonnet` helper, asked to run it on a production build, localhost only): not completed. The
question said so and carried security's development-build timings as security's.
**Selection prompt, put 01:5xZ, answered 01:59Z** (selection-ledger `steering/selection-ledger/2026-11-20.md`, block "2026-11-20T01:59Z
— steering-roadmap-hooks"). The options' wording is this thread's.
- Q "H-001 fix":
  - **Agent: fixer chain now (Recommended)** — CHOSEN, by selection. "Steering opens a small fixer chain on website: change the one
    function so the header is no longer decoded by the library, plus a lockfile override of decode-uri-component to 0.5.1 or later.
    It runs fixer, then code review, then security on the change, then a website master push, which Vercel deploys to production and
    which needs your word."
  - Agent: lockfile override only.
  - Agent: handoff record only.
  - Agent: do nothing.
- Q "H-002/M-001":
  - **Agent: separate chain after H-001 (Recommended)** — CHOSEN, by selection. "Once H-001 ships, steering opens its own chain for
    the Next.js upgrade and the save-size cap. A framework upgrade touches the whole site, so it gets its own scope, QA and release; it
    never delays H-001."
  - Agent: same chain as H-001.
  - Agent: handoff records only.
- Q "Unused deps":
  - **Agent: remove in H-001's chain (Recommended)** — CHOSEN, by selection. "The H-001 fixer drops the three from package.json, with a
    build and a suite run to show nothing used them."
  - Agent: leave them.
**Next (this thread):**
- The H-001 fixer chain's scoping determination: the scope sweep by a helper, then the determination block. Chain id
  `fix-message-page-header-decode`.
- Confirmation (a), whether Vercel serves `/_next/image`, is a read-only Vercel read by `vercel api` (a Standing Default per
  `steering/017-standing.md`). It is made, not asked.
- Confirmation (b) needs a request to production. It goes into the chain's post-deploy reads, never as a load request.

## 2026-11-20T02:03Z — corrected premise re-put (his selection); scoping determination for fix-message-page-header-decode

**This thread's error:** the 01:59Z "Unused deps" question stated that the three packages were never used, from the review's claim, and
did not mark it as such. The scope sweep (below) found `form-data` imported by `bot/utils/DiscordMessage.ts:1`, which
`src/pages/api/interactions-edge.ts` and `interactions-server.ts` load. The correction changes what is built, so it was re-put. The check
that would have caught it: marking the premise "unread: security's claim", or sweeping before asking.
**Selection, answered 02:03Z** (ledger day file, block "2026-11-20T02:03Z — steering-roadmap-hooks"; wording this thread's):
- **Agent: remove sanitize-html and sharp (Recommended)** — CHOSEN, by selection. "The fixer removes sanitize-html with its
  @types/sanitize-html companion and the direct sharp, keeps form-data, and shows a production build plus the suite passing. If the
  build shows Next.js needs the direct sharp, the fixer keeps it and says so."
- Agent: remove sanitize-html only.
- Agent: remove none.

**Scoping determination — chain `fix-message-page-header-decode` (fixer).**
- **Shape:** defect. No dated outside event. Cause: the code path is read from code (sweep). The slowdown is security's measurement on
  a development build, in `security/website-deps-review-security-audit.md` H-001. A production-build check was not completed.
- **Property:** a value the browser sends is decoded on the server through an outdated parsing dependency (decode-uri-component 0.4.1,
  via query-string).
- **Region swept** (`verification/fix-message-page-header-decode/scoping/sweep.md`, helper): website at `983681c` (`src/`, config,
  lockfile) and project-utils `src/` at `749606d`. Rows S1 to S28; predicates and blind spots are in the file.
- **Placement:**
  - In scope: S1/S2, `Providers.tsx` `getMessage`. It is the only site where a browser-sent value (the `x-query-params` header, set by
    `middleware.ts:17-21` only when the URL has a query string; line 12 copies every incoming header) reaches `query-string` and
    `decodeURIComponent`. Also in scope:
    - the decode-uri-component ≥0.5.1 override, per his option. It is a transitive dependency of `query-string` 8.1.0 alone. There is no
      `pnpm.overrides` today; there is an npm-style `overrides` key whose effect under pnpm 10 is untested.
    - removal of `sanitize-html`, `@types/sanitize-html` and the direct `sharp`, per the 02:03Z selection.
  - Out (no ruling needed, since none takes a browser-sent value through an outdated parser):
    - S3: `middleware.ts`'s `URLSearchParams`, built in;
    - S4: client clipboard decoding;
    - S5, S6: outbound builders;
    - S12 to S17: header string compares and signature checks.
- **Breach catch:** a test that `getMessage`, or the `/message` layout, given a client-sent `x-query-params` with no URL query, neither
  passes it to the old decoder nor throws. Also a lockfile check that no `decode-uri-component` < 0.5.1 resolves.
- **Not covered** (sweep): Next.js internal parsers, dynamic segments, Vercel's header handling, which `sharp` copy Next.js loads,
  project-utils `dist/`, and the preview-image-generator.
- **Stage set:** `fixer` (a red test for the property), then `code-reviewer` (and, under 20 production lines, the suite and the red test
  too), then QA Phase 2 at 20 or more lines, then `security` on the change (`security-hooks-website-deps`, the reviewing stage), then
  devops for website `master`.
- **End step:** website `master`, which Vercel deploys to production; his word is needed. `release-move.js website master 983681c…
  --dry-run` at 02:03Z: "every check passed"; no workflows; one serving ref. Live master `983681c` (`ls-remote`).
- **Post-deploy:** confirmation (b), whether a client header reaches the function, read with a harmless request after the fix, by an
  agent.
- **Released chain touching this route:** none known. `Providers.tsx` was last shaped by 017 (`architecture/closed/017-…findings.md:34`).

## 2026-11-20T02:11Z — fixer handoff at 7923a1d; two rulings; code reviewer spawned

The fixer's document, read this turn: `implementation/fix-message-page-header-decode-implementation.md` (record `0c17d20`), `Status:
Active`, `Handoff-At: 7923a1d`. Website log: `7923a1d` over `983681c`. By the fixer's message:
- `getMessage` is removed from `Providers.tsx`. Its fetch result was discarded; share-code loads run client-side.
- The red test was 4/4 red at the base and is green at the fix.
- `query-string` is removed, so `decode-uri-component` is absent from the lockfile.
- `sanitize-html`, `@types/sanitize-html` and the direct `sharp` are removed. `next build` exits 0, and Next.js resolves its own
  `sharp` 0.34.5. `form-data` is kept.
- The lockfile only loses entries (43 packages). The suite passes 1913 cases with exit 0. 1 production line added, so there is no QA
  Phase 2 and the reviewer runs the suite and the red test.
**Rulings (this thread's):**
- **No override:** his option named "a lockfile override of decode-uri-component to 0.5.1 or later". Once `query-string` went unused,
  the fixer removed it, and the vulnerable package left the tree entirely. That is a mechanism choice inside agreed scope (Standing
  Default): recorded, and reported to him as moot rather than done.
- **The `middleware.ts:17-21` write of `x-query-params`**, now unread: out of scope (it is the sweep's S9 to S11 region, middleware),
  harmless, and left as is. Recorded here as its carrier; no handoff.
Spawned `code-reviewer-hooks-fix-message-page-header-decode` on `steering/fix-message-page-header-decode-brief-code-reviewer.md`. On
approval it delivers to `security-hooks-website-deps`.
**R-1 (access fix), his first run, 02:1xZ, his words:** `psql: error: connection to server at "127.0.0.1", port 5432 failed: Connection
refused`. The script's premise was wrong: the active `DATABASE_URL` in `website/.env.local` is a local database, not production. The
hazards record's "the remote hosted database" (2026-08-24) is stale. This thread's error: I took the premise from that record without a
read. The check that would have caught it: a key-and-host-only read of that line (never its value). The script now asks for production's
URL, typed hidden.

## 2026-11-20T02:18Z — code review APPROVED at 7923a1d; confirmation (a) read; CR-1 left

`code-review/fix-message-page-header-decode-code-review.md` (record `d67e7d5`). By the reviewer's message: APPROVED at `7923a1d`; red
4/4 at the base and green at the fix; suite 1913/1913 with exit 0; typecheck 0. Delivered to `security-hooks-website-deps`.
- **Confirmation (a)** (the reviewer's Assumption Not Checked: does Vercel's `/_next/image` need the removed direct `sharp`?). Read by
  this thread at 02:18:15Z, one ordinary GET to production at today's `983681c`:
  `curl … 'https://hooks.gg/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Fembed%2Favatars%2F0.png&w=64&q=75'` → 200, `image/png`,
  495 bytes; `server: Vercel`, `x-vercel-cache: MISS`, `x-vercel-id: pdx1::…` (one hop), no `x-matched-path`. Headers are kept at
  `verification/fix-message-page-header-decode/steering/next-image-headers-pre-push.txt`.
  This thread's reading: a single-hop id with no matched path is consistent with Vercel's image service answering, not a site function.
  That is an inference from headers, not proof. The deciding read is the same request after the push, carried into the devops brief as a
  post-deploy row.
- **CR-1 (INFO):** the commented-out `sanitizeHtml(hljs…)` in `JsonModalBody.tsx` names the removed package. Left. It is a comment, so
  dropping it would move the reviewed tree for no behaviour. Recorded here as its carrier, for the next chain touching that file.

## 2026-11-20T02:24Z — security APPROVED at 7923a1d; devops spawned

Read this turn: `security/fix-message-page-header-decode-security-audit.md` (record `5640deb`): `Reviewed-At: 7923a1d9…`, Verdict
APPROVED, Overall Risk LOW. H-001 is closed, exercised by security on production builds of the base and the fix on this box. The
anchors match at `7923a1d`: fixer `Handoff-At` and code-review `Reviewed-At`. Live master is `983681c` (`ls-remote`).
`release-move.js website master 7923a1d… --dry-run`: "every check passed". Spawn cue acted on:
`devops-hooks-fix-message-page-header-decode`, on `steering/fix-message-page-header-decode-brief-devops.md` (`f2c995b`). The release ask
is its own (Phase 2B); P-1, the post-push `/_next/image` read, is carried in its Stage 1 handoff.

## 2026-11-20T02:30Z — devops needs a release-tip QA verdict; QA Phase 3 spawned; confirmation (b) dropped

By devops's message (records `2596a57`, `294c911`; nothing pushed), its Phase 2A step 3 requires a QA record against the tip, and
`release-move.js` refuses a real move without `--qa-record` or `--reason`. Stage 1 is done: the implementation and code-review documents
are closed Committed; P-1's carrier is `handoff/message-page-header-decode-post-deploy-2026-11-20.md`, read by P1R from crontab every
2 hours from 04:07Z on 20 to 22 Nov, gated on the push plus 15 minutes; the readiness record is
`deployment/fix-message-page-header-decode-deployment.md`.
- **Route taken: QA Phase 3** (devops's option 1). It is a spawn cue, so no owner word is needed. The alternative, his waiver, was not
  put. `qa-hooks-fix-message-page-header-decode` was spawned on `steering/fix-message-page-header-decode-brief-qa.md` (`46a0211`); its
  verdict goes to devops. This thread's error: the stage set (block 02:03Z) left out the release-tip verdict that devops's definition
  requires of every release. The check that would have caught it: reading devops.md Phase 2A against the stage set at the determination.
- **Confirmation (b) dropped** (this thread's ruling): after the fix nothing reads `x-query-params`, so a post-deploy read of its
  passthrough decides nothing. Security's audit called it "for the record's sake". P-1 is the only post-deploy row.
- **Pre-push preview push:** not taken. P-1 after the push and devops's checked reversing patch cover the `/_next/image` assumption.
- **Disclosure:** the relay to devops at 02:30Z cited this block before it was committed. The block was committed right after.

## 2026-11-20T02:36Z — H-001 fix RELEASED at 7923a1d; older handoff closed; security close asked

**Released**, by devops's message and `ls-remote` read this turn: website `master` `983681c` → `7923a1d` at 02:34:40Z, on his selection
in devops's session ("Agent: push master to 7923a1d (Recommended)"). The chain branch is merged and deleted, and the tree is on `master`.
- Deployment record closed Released (`deployment/closed/fix-message-page-header-decode-deployment.md`, `04132a7`). The implementation,
  code-review and QA Phase 3 documents are closed. The owner-wait `release-ask` is resolved.
- **Post-deploy:** P-1, `handoff/message-page-header-decode-post-deploy-2026-11-20.md`, read by P1R (crontab), first fire 04:07Z. A 5xx
  is a rollback question for him.
- **Closed Addressed by this thread:** `handoff/closed/providers-query-params-header-decode-throws-2026-11-08.md`. Its trigger fired with
  this release, per QA Phase 3. check-repo PASS.
- **Open:** `security/fix-message-page-header-decode-security-audit.md`. Asked of `security-hooks-website-deps`, resumed from its
  Resumption State (`4e876a7`), together with recording H-001 closed in the review document.
- **Architecture:** `system-architecture.md:179` still lists the removed direct `sharp`. devops's uncommitted `INBOX.md` entry carries it
  to the architect.
- **Retrospective:** this fixer chain took no rejected round, no QA failure, no re-scope and no owner-needing block, so it joins the next
  fixer batch (steering.md, Fixer).

## 2026-11-20T02:42Z — security closed its fix audit; chain closed out; a correction to block 02:18Z

- `security/closed/fix-message-page-header-decode-security-audit.md`, Review Complete (`cd2e816`). Its one owed item, the post-push
  `/_next/image` read, is carried by P-1. `security/website-deps-review-security-audit.md` (`4bccf05`) records H-001 CLOSED by the
  release; H-002 and M-001 stay OPEN, and the document stays Active.
- Every stage document of `fix-message-page-header-decode` is closed (`ls -d */fix-message-page-header-decode*` outside `closed/`: none
  but this chain's verification and steering files). P-1 is carried by its handoff and read by P1R from crontab.
- **Stopped** (`tmux-agent stop`, all idle): fixer, code-reviewer, qa and devops `-hooks-fix-message-page-header-decode`. The standing
  check `27cceb8d` is deleted, and a cache-warm wake is armed.
- **Correction (security's, 02:4xZ), to block 02:18Z:** the post-push image request cannot decide which component serves
  `/_next/image`, because Vercel's service and Next.js's own optimiser would both answer 200. P-1 decides only whether images still
  answer without the direct `sharp`. Security's A-1 (13 host-only dispositions, two critical) stays unsettled until a `vercel api`
  project read, which no block has recorded. It goes moot for the ten Next.js entries if the H-002 chain raises `next` to 16.4.5 or
  later. Carried into that chain's scoping.

## 2026-11-20T02:53Z — scoping determination: the H-002/M-001 chain (planned); A-1 read made

**Origin:** his selection at block 01:59Z, question "H-002/M-001", option "Agent: separate chain after H-001 (Recommended)": "Once H-001
ships, steering opens its own chain for the Next.js upgrade and the save-size cap … its own scope, QA and release". H-001 shipped at
02:34:40Z (block 02:36Z). The chain id is the planner's to mint; until then this chain is "the H-002/M-001 chain".

**A-1 read (Standing Default, made, not asked).** `npx -y vercel@latest api /v9/projects/hooks-gg-website --scope hooks-gg` and
`… /v13/deployments/dpl_CRSCY7cwracCXWNKE8uGnGrnuQ8r …`, 02:4xZ. Non-secret fields saved at
`verification/website-deps-review/scoping/a1-vercel-image-config.json`. Read: framework `nextjs`; the production target is the deployment
of website `7923a1d9…`; that deployment carries a platform `images` block (sizes, qualities, the two remote patterns of
`next.config.js`) and one function, with no `_next/image` string anywhere in the record (`grep -o`, 0). This thread's reading: Vercel's
image service answers `/_next/image`. That is an inference from the deployment record, not a request trace. A-1 is security's
assumption; the file goes to security in this chain's brief.

**Scoping determination.**
- **Shape:** two items, one chain. H-002 is a dependency defect (Next.js 16.1.6 carries two App Router denial-of-service advisories; reach
  rests on the advisories' text, not exercised). M-001 is a defect measured by security in an isolated export (a 1 MB signed-in save
  builds a validation error of over 100 MB; the HTTP step is read from code). No dated outside event.
- **Properties:**
  - H-002: the website runs a Next.js release below the advisories' patched version.
  - M-001 (the class): a signed-in request can make the server validate an unbounded number of client-sent array elements and record
    one issue for each.
- **Regions swept** (helpers, at website `origin/master` 7923a1d and project-utils `origin/master` 749606d):
  - `verification/website-deps-review/scoping/sweep-next-upgrade.md` (package entries, lockfile, imports, config, runtime conventions,
    peer dependencies, record). Its Sections 2, 4 and 6 were completed by this thread (addendum in the file).
  - `verification/website-deps-review/scoping/sweep-unbounded-input.md` (server entry points, arrays and bounds, body limits, zod,
    error-to-response, record).
- **In scope:**
  - `next`, `@next/bundle-analyzer`, `@next/eslint-plugin-next` and `eslint-config-next` (today `^15.0.0`, resolved 15.5.14) raised to
    one matching 16.x release at or above 16.2.5. The target is his question (below). React stays at 19.2.4: next 16.2.5 and 16.4.6 both
    take react `^18.2.0 || ^19.0.0` and node `>=20.9.0` (`npm view`, sweep §5).
  - The two test helpers that import Next.js internals (`src/components/__tests__/helpers/linkNavigation.tsx:1`,
    `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx:12`), wherever the upgrade moves them.
  - Re-verification of behaviour the record ties to Next 16.1.6: 017's navigation guards and link interception (AN-2, X-14, D-12;
    `planning/closed/017-existing-items-backlog.md:232, 290, 749, 1375, 1396`) and 004's `next/dynamic` preload
    (`planning/closed/004-lazy-loading-preload-overhaul.md:39, 64`).
  - M-001: every array site reachable from `message.upsert` and `user.updatePreferences` (11 sites, `sweep-unbounded-input.md` §2),
    bounded at the site or not, is refused when over its limit before its elements are validated. Bounded sites are in because
    security's measurement filled `embeds` (`.max(10)` at the site) and recorded 524,266 issues (audit, M-001 table). The fix
    mechanism (a pre-parse length check, a lower tRPC body limit, or both) is the planner's.
- **Breach catch:** for H-002, the lockfile resolves `next` at or above the target, and security's re-run of `pnpm audit --prod`. For
  M-001, a test that sends each of the two procedures an over-limit array of invalid elements, at every array site, and gets a refusal
  that records no per-element issues.
- **Out, each shown to him in the scope question:**
  - zod 4 (the advisory's patched major): his option chose the save-size cap.
  - The other 39 `z.string()` server lines: a string yields one issue, not one per element; the body limit bounds them.
  - `interactions-server.ts`, which reads a body with no schema: token-gated (`x-hooks-api-token`), not client input.
  - `project-utils` declaring `prisma-kysely` at runtime (audit I-2): another repository, not in his selection.
  - `x-pathname` trusted for a redirect (audit I-5); Vercel's cache keeping RSC apart from HTML (A-2).
  - preview-image-generator's `@next/eslint-plugin-next ^13.4.12`: another repository, a lint dependency.
  - The leftovers carried from H-001: `middleware.ts:17-21`'s now-unread `x-query-params` write (block 02:11Z) and CR-1's commented
    `sanitizeHtml` in `JsonModalBody.tsx` (block 02:18Z). `system-architecture.md:179`'s removed `sharp` goes to this chain's
    architect.
- **Not covered by the sweep:** Next.js's own internals between versions (the release notes, read by the planner and analyst); the
  framework default body limit's value; platform request limits on Vercel; dynamic imports with computed specifiers; project-utils
  `dist/`.
- **A way to run the real service first (step 6):** a push of a non-master branch makes a Vercel preview deployment (`vercel api
  /v6/deployments?…&target=preview`: two READY previews, `probe/017-waituntil*`, 2026-11-19). Preview has no database or Redis: the
  Postgres and Redis keys are production-only (key names and targets of the project's env list, values not read). Put to him as its
  own option.
- **Stage set:** planner → critic (first pass at xhigh) → architect conformance → QA Phase 1 → implementer → code-reviewer → QA Phase 2 →
  UAT (the framework moves under every page) → security (`security-hooks-website-deps`, on the change and to close H-002 and M-001) →
  devops for website `master`. Retrospective at close-out. A planned chain, not a fixer: the upgrade's blast radius is the whole site.
- **End step:** website `master`, which Vercel deploys to production; his word is needed. `release-move.js website master 7923a1d…
  --dry-run` at 02:5xZ: "DRY RUN: every check passed"; workflows none (directory absent); sibling serving refs none. Live master
  `7923a1d` (`ls-remote`).
- **Released chains touching these routes:** 017 (navigation guards, the draft store) and `fix-message-page-header-decode`
  (`Providers.tsx`). Their open post-deploy carriers: `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (B-6, B-8, B-9 being
  walked by `uat-hooks-017-looks`) and `handoff/message-page-header-decode-post-deploy-2026-11-20.md` (P-1, from 04:07Z).

## 2026-11-20T02:54Z — three scope questions on the H-002/M-001 chain, put in plain text (017's looks can still move)

Put in plain-message form (steering.md, Prompting the owner): `uat-hooks-017-looks` is walking, and its report leads to closures that
need no word of his. One `owner-wait` notice sent (`--chain website-deps-review --wait-key h002-m001-scope`). Wording this thread's.
**Premises, each with its read this turn:**
- The save schema's limits do not stop the per-element checks: a `general-purpose-sonnet` helper, briefed with the conclusion alone,
  ran the real `shapes.ts` (zod 3.22.4) in an isolated export under a cap. 50 invalid embeds over the limit of 10 gave 51 issues; 100
  invalid components over the limit of 40 gave 101; 11 valid embeds gave 1 (`verification/website-deps-review/scoping/refute-zod-max/output.txt`).
  Confirmed.
- "16.2.5 is the first release fixing both advisories; 16.4.5 or later clears all 42 Next.js entries and makes A-1 moot for its ten
  Next.js entries": security's reading (audit H-002 and A-1); unread by this thread.
- Same React and Node needs at 16.2.5 and 16.4.6: `npm view` (sweep §5). 69 website files import Next.js (`git grep -c`, sweep addendum).
- Preview deployments: a branch push made two READY previews on 2026-11-19 (`vercel api`); preview carries no Postgres or Redis keys,
  and shares Discord and Pusher keys with production (env key names and targets, values unread).
- 11 array sites across the two save procedures (`sweep-unbounded-input.md` §2).
**Options:**
- Q "Next.js version": **Agent: latest 16.4 (16.4.6) (Recommended)** / Agent: minimum fix (16.2.5) / Agent: no upgrade, save cap only.
- Q "Preview check": **Agent: preview deploy before release (Recommended)** — a chain-branch push makes a Vercel preview; UAT loads the
  public pages, images and the sign-in redirect there; signed-in pages cannot run (no database); production is untouched / Agent: local
  build only.
- Q "Scope": **Agent: as determined (Recommended)** — the version bump with its lint and analyzer packages, the two test helpers, a
  re-check of 017's leave-page warnings and link handling, and a cap on all 11 save-list sites; the exclusions in block 02:53Z stay out /
  Agent: as determined plus the two H-001 leftovers (the unused header write in `middleware.ts`, the commented line in
  `JsonModalBody.tsx`) / Agent: don't open the chain.
