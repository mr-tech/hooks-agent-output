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
