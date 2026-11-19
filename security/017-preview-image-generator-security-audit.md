---
ID: 017
Origin: 017
UUID: 5c3e9a71
Status: Active
Status-Detail: "Pre-release security gate on the preview-image-generator delta 8de2b53..8512a1d (M6): APPROVED, no required control. One LOW (L-001, log sinks take the request's id unescaped; optional remedy, the planner's call under X-4). Two observations outside the reviewed delta, in website code this chain does not change, are with steering as an owner-needing scope item (§ Outside the reviewed delta). Stays Active until the chain closes."
Reviewed-At: "8512a1d — repos=preview-image-generator; base 8de2b53 (prod, ls-remote 08:06Z). The website's side of the contract was read at 4b8db9c and is not under this verdict."
Kind: pre-production-gate
---

# Security Assessment: preview-image-generator — chain 017 M6 delta (pre-production gate)

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-19T08:06 | steering-roadmap-hooks → security-hooks-017 (brief `steering/backlog-2026-11-18-briefs/security-hooks-017.md`; common part `steering/017-brief-common.md`; stage set, `steering/backlog-2026-11-18-rulings.md` block 21:59Z) | Security on the generator delta before release | Initial assessment at generator `8512a1d` against `8de2b53`. Verdict APPROVED. L-001 LOW recorded. Dependency audit run for the first time on this lockfile: 25 advisories, none introduced (the lockfile is byte-identical to production's). Two observations in unchanged website code routed to steering. No read was refused by the secret-file gate in this pass. |

## Metadata

| Field | Value |
|-------|-------|
| Assessment Type | Pre-Production Gate, scoped to a delta: Phase 2 over the two changed source files and the changed record script, Phase 3 over the lockfile, the prior audit's findings checked for movement. |
| Mode Determination | Inferred from the brief: it names a release-bound SHA range, the gate documents before it and the prior audit. **Mode**: Pre-Production Gate. **Scope**: below. |
| Scope | `preview-image-generator` `8de2b53..8512a1d` on `chain/017-existing-items-backlog`: `src/generateImage.ts` (+17 −28), `src/server.ts` (+2 −1) (`git diff --numstat 8de2b53 8512a1d -- . ':(exclude).github'`). The record script `verification/015/pig-host-read.sh` section [7] (blob `17059da`; +32 since `f616d83`, one hunk). The website's side of the contract at `4b8db9c`: `src/server/api/utils/previewImage.ts`, `previewBucket.ts`, `deleteMessagePreviewImages.ts`, `shared.ts` `upsertMessage`, and the `upsert` and `delete` routes in `src/server/api/routers/message.ts`, as far as they decide what the generator receives and what is deleted in the bucket. |
| Out of scope | The generator host's posture and the API key in the workflow files (plan X-3; carried by `handoff/preview-image-generator-host-security-posture-2026-11-08.md` and `handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md`): referenced, not re-rated. `/generate` body validation (plan X-4). The website beyond the contract. |
| Reviewer | security-hooks-017 (role session), 2026-11-19 |

Finding IDs below are this document's. A finding of the chain 015 audit is always written with its document: "015 audit H-001".

## Executive Summary

The delta is safe to release from a security standpoint and reduces what the service can do. The generator no longer lists or deletes bucket objects, so a holder of its API key can no longer delete a message's previews through it. It no longer publishes a screenshot of an error page as a message's public preview. It reads no new input, opens no new network path and touches no file. Its one addition is a log line, which carries the request's `id` unescaped, as an existing line already did (L-001, LOW, needs the API key).

The release redeploys the posture the chain 015 audit recorded and the owner accepted (root, unsandboxed Chrome 116, a public plain-HTTP port). Nothing in the delta widens it, and neither handoff's review trigger fires: the lockfile is byte-identical at both SHAs and the `.github` tree is unchanged.

**Overall Risk Rating**: LOW for the delta under review. The accepted host posture (015 audit H-001 to M-002) is unchanged and not re-rated.
**Verdict**: APPROVED for `8de2b53..8512a1d`. Required controls: none. This verdict is reached at generator `8512a1d`; a change to either source file expires it.

## Threat Model Summary

Boundaries as numbered in the 015 audit, with what the delta changes at each.

| # | Boundary | Change in `8de2b53..8512a1d` | STRIDE reading |
|---|---|---|---|
| B1 | Internet → `0.0.0.0:3000` | None. The pre-auth handler in `src/server.ts` is untouched. | Unchanged (015 audit H-003). |
| B2 | website → `/generate` body | The contract is unchanged (`id`, `nonce`, `message`). `id` now also reaches a stderr line. On the website side, the `id` sent is now the database's own (`upsertMessage` passes the `returning` id; at `1ad625e` an existing message's `id` was the client's string). | **T/R**: log forging by a key holder (L-001). **T** on bucket keys: narrower than before (I-3). |
| B3 | generator Chromium → `PREVIEW_ENDPOINT?data=…` → user image URLs | Same URL, same `waitUntil`. The response's status is now read; no further fetch. | Unchanged (015 audit H-001). |
| B4 | PM2 daemon → process | None; `shutdown()` is outside the diff. | Unchanged. |
| B5 | local accounts → host files | One more line shape in the existing error log. | Unchanged (015 audit M-001 covers the log directory's readability). |
| B7 (new to this document) | generator and website → bucket | The generator makes one request class, `PutObject`. Listing and deleting are the website's alone. | **T/D**: the generator's key path can no longer delete (I-1). |

### Every act of the changed code, by name

The generator runs as root, so each act of the delta is listed with the path or endpoint it touches and who can write it.

| Act (symbol) | Touches | New, changed or removed | Who controls the target |
|---|---|---|---|
| `page.goto` in `generateMessagePreviewImage` | `config.PREVIEW_ENDPOINT` with `data` in the query | Unchanged call; its result's `status()` is now read | The website (endpoint), the saving user (content) |
| `page.screenshot` | memory only | Unchanged call; rejection now classed | — |
| `PutObjectCommand` in the default export | bucket key `[dev/]previews/<id>/<nonce>.jpeg`, `public-read` | Unchanged key, body and ACL; rejection now classed | The website mints both parts (I-3) |
| `ListObjectsCommand`, `DeleteObjectsCommand` (`deleteMessagePreviewImages`) | bucket prefix `[dev/]previews/<id>/` | **Removed** | — |
| `console.error` failure line in `processImage` | stderr, which PM2 appends to `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log` | **New** line in an existing file | Root's PM2 daemon owns the file; the line's `id` is the caller's (L-001) |
| No filesystem read, create or execute | — | None added | — |

The record script's section [7], run as `claude-ro` over `ssh hooks-pig`:

| Act | Touches | Prints |
|---|---|---|
| `grep -c` ×5 | `/etc/.pm2/logs/hooks-image-preview-generator-prod-error.log` (**new read**) | Five integers |
| `grep` + `awk` | the prod out log (already read by [3] and [6]) | One stamp, constrained to `NNNN-NN-NNTNN:NN:NN.NNNZ` by the selecting pattern, and one integer |
| Writes, pm2 commands, env reads | none | — |

## Findings

### Critical Findings (Must Fix Before Production)

None.

### High Findings (Fix Before Production Recommended)

None in the delta. The 015 audit's H-001, H-002 and H-003 are redeployed unchanged; see Prior Findings.

### Medium Findings (Fix in Next Sprint)

None.

### Low Findings (Track for Future)

| ID | Severity | Title | Category | Location | Introduced | Description | Remediation | CVSS |
|----|----------|-------|----------|----------|------------|-------------|-------------|------|
| L-001 | LOW | The request's `id` reaches the logs unescaped and unbounded; the delta adds a second sink | Log injection (CWE-117); input validation (CWE-20) | generator `8512a1d` `src/server.ts` `processImage`: the new `preview-image-failure id=${id} …` line (stderr) and, since before the base, the `Generated image for message ${id} with nonce ${nonce}` line (stdout) | Partly: the stderr sink is new; the stdout sink and the missing schema predate it (015 audit L-001, parse guard checks shape, not schema) | `id` and `nonce` come from the JSON body after an object test only. A caller holding the API key can put a newline in `id` and write whole lines of its choosing into either log, or a megabyte-long `id` into the error log on a failed put. The out log is the more useful target: `pig-host-read.sh` sections [3] and [6] print matching out-log lines into captures agents read, and place process boundaries by stamped `Server running at` lines. Section [7], the only reader of the new line, prints counts and a pattern-constrained stamp, never log text, so the new sink adds no text to any capture. Not reachable by a Hooks user: at website `4b8db9c` the `id` sent is the database's and the nonce is minted server-side (I-3), and a navigation error quotes the preview URL percent-encoded (`verification/017/impl/m6/green/probe-result.json`: `…preview?data=%7B%22mode%22%3A…`), so saved content cannot form a line of the counted shape. A key holder needs no forgery to inflate the failure count either: a real failing render does it. | Optional, not required for approval. Either the schema the 015 audit named at the parse site (`id: z.string().regex(/^\d{1,20}$/)`, `nonce` to its minted alphabet), which plan X-4 keeps out of this chain, or one line at the two sinks (`String(id).replace(/[^\w-]/g, '?').slice(0, 32)`). Both change `src/server.ts` and so re-open code review and QA at a new SHA; whether that is worth it in this chain is the planner's call. | 2.7 (AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N) |

### Informational / Best Practice Recommendations

- **I-1 — The generator can no longer delete (positive).** `git grep -c "DeleteObjectsCommand\|ListObjectsCommand" 8512a1d -- src` in the generator gives no hit (the implementer's and code review's read, re-read by me in the export: the import line names `PutObjectCommand, S3` only). At the base, any `/generate` call deleted everything under `previews/<id>/` for the `id` it sent, so the key alone could remove any message's previews. That is gone. The generator's bucket credentials are now used for `PutObject` only; if the bucket's key scheme ever allows it, the generator's key can drop list and delete rights. A recommendation, not an owed act.
- **I-2 — Error pages are no longer published (positive).** `generateMessagePreviewImage` throws on a main-resource status outside 200 to 299 before the screenshot. At the base a 404 or 500 page was stored `public-read` as the message's preview and answered 204 (QA's base run: 13 of 17 failing).
- **I-3 — The website now sends the generator canonical values (positive, website `4b8db9c`).** `upsertMessage` passes the `id` its insert returned, and `mintNonce` builds the nonce from the database clock and `randomBytes(8)`. At `1ad625e` an existing message's `id` was the client's string (`optionalIdMessageShape`'s `id` is `z.string().optional()`), forwarded as sent. Every deletion in `previewImage.ts` builds its key from that returned `id` and from a nonce read from the row or minted in the same call, through `previewPrefix`, which ends in `/` so message 1's listing cannot match message 10's keys. I found no path by which one user's save or delete names another message's prefix.
- **I-4 — The preview URL is still unguessable.** The nonce went from 32 random hex characters to `v`, a 16-digit microsecond timestamp and 16 random hex characters: 64 random bits from `crypto.randomBytes`. Enumeration against the CDN stays infeasible, so the protection architecture P-4 records (an unguessable URL on a `public-read` object) holds. The URL now carries the save time to the microsecond, to whoever holds the URL.
- **I-5 — Message content still reaches the error log, as before.** The `console.error(err)` after the new line prints a `goto` rejection whose text quotes the `/preview?data=…` URL, which is the saved message. The base printed the same error directly; code review's Round 7 redaction row records it as not new. The new line itself carries no content, nonce or key (read in `src/server.ts`; asserted per class by the probe).
- **I-6 — Orphaned previews stay public but unreferenced.** An object whose 204 no continuation processed stays in the bucket until the message's next commit at least 120 s later, or for good if the message is deleted (plan X-19, RK-2). Its nonce was never returned to any client, because the save's response carries only a committed nonce, so nobody holds its URL. The class existed at the base in another form (a render finishing after a message's delete).
- **I-7 — `pig-host-read.sh` reads one more file and prints none of it.** The brief left open whether the script reads beyond PM2 and app logs. Its whole read set at blob `17059da`: the process table (`ps`, the PM2 daemon's and the generator's lines); `/etc/.pm2/dump.pm2` through a three-field extract that never prints env; a listing of `/etc/.pm2/logs`; both apps' out logs; `/etc/.pm2/pm2.log`; and, new in section [7], the prod error log, counts only. It writes nothing, runs no pm2 command, reads no `.env` and no `/proc/<pid>/environ`, and exits unless run as `claude-ro`. The change since `f616d83` is one hunk, all inside section [7].
- **I-8 — First dependency audit of this lockfile: 25 advisories in production dependencies, none introduced.** `npm audit --package-lock-only --omit=dev` over the lockfile at `8512a1d` (`cmp` against `8de2b53`'s: identical) reports 4 critical, 11 high, 4 moderate and 6 low (`verification/017/security/security-npm-audit-summary-8512a1d.txt`; raw JSON beside it). Read in context: `fast-xml-parser` (critical) parses the bucket endpoint's XML, a trusted host over TLS, and the delta removes the two calls whose responses carried XML bodies; `basic-ftp`, `ip`, `socks`, `pac-resolver`, `extract-zip` and `tar-fs` sit on puppeteer's browser-download and proxy paths, which run at install on the deploy runner, not per request; `ws` is the client to the local Chromium; `zod` is not imported in `src`; `js-yaml` reads puppeteer's local config. None is reached by a `/generate` request in a way the delta opens. The set is the 2023 dependency age the 015 audit raised through its H-001 and H-003 and the owner accepted; the host-posture handoff's trigger (the next puppeteer or generic-pool bump) is where it is acted on.
- **I-9 — No secret entered with the delta.** The 106-line diff read whole; the skill's `check-secrets.sh` over the tip export (`.github` excluded) and over the website's `src/server/api/utils` at `4b8db9c`: no pattern hit, exit 0 each (`verification/017/security/security-secret-pattern-check.txt`). The `.github` tree is the same object at both SHAs (`git rev-parse 8de2b53:.github 8512a1d:.github` → `8475baf` twice), so the workflow files and `deploy.sh` did not move.
- **I-10 — Both deploy orders are neutral for security.** Authentication, the key and the request fields are the same on both sides of either window. The planned order's window (new website, old generator) and the reverse differ in what is deleted and shown (plan § Release and rollback), not in who can reach or change anything.

## Prior Findings (015 audit) at this release

| Finding | State at `8512a1d` | Basis |
|---|---|---|
| 015 audit H-001 (root, unsandboxed Chrome 116 renders user image URLs) | Unchanged, redeployed | `src/getPool.ts` untouched; lockfile identical |
| 015 audit H-002 (DevTools on loopback) | Unchanged | same |
| 015 audit H-003 (public plain-HTTP port, end-of-life Node) | Unchanged | `src/server.ts` handler and `ecosystem.config.js` untouched |
| 015 audit M-001, M-002 (world-readable secrets; root runner) | Unchanged | `.github` tree identical |
| 015 audit L-001 (parse guard checks shape, not schema) | Narrowed, not closed | The delete-prefix limb is gone with the deleter; the key and, new, a log line still take `id` unvalidated (this document's L-001) |
| 015 audit L-002 (pool and host limits) | Unchanged | `src/getPool.ts` untouched |

Neither handoff's `Review-Trigger` fires on this release: no puppeteer or generic-pool pin moves, and no workflow or `deploy.sh` file is edited. Both stay Open as they are.

## Outside the reviewed delta — observed, not reviewed

Two things in website code this chain does not change (`src/server/api/routers/message.ts` is not in `git diff --numstat 1ad625e 4b8db9c`; the `upsertMessage` lines are context lines of M5's diff). I read them while tracing what `id` the generator receives. They are read from code, not run, carry no finding ID and do not bear on the verdict above. Sent to steering as one owner-needing item, because whether and where they are taken up is a scope decision.

- **A signed-in user can read any personal message by its number.** `message.getOne` loads the message, then for a message with no guild calls `authorizeUser(session.user.id)` with no message id, which checks only that the caller has an account. The guild branch checks guild access. Message ids are sequential (`project-utils/prisma/schema.prisma` `model Message`, `autoincrement()`, as the handoff below cites it; not re-read by me). Whether reading by number is intended (the `f/[id]` page reads a message to copy by this route) is not stated anywhere I searched.
- **A save can claim a message number that does not exist yet, and later new messages by other users then land in that row.** `message.upsert` accepts a client `id`; `authorizeUser` and `getOldMessages` pass when no row has it; `upsertMessage` inserts it, skipping the `MAX_MESSAGES` check, which runs only for a save without an id. `buildUpsertMessageQuery` is `on conflict (id) do update` over `name`, `data`, `valid` and `updatedAt`, not the owner columns. So when the sequence reaches a claimed number, another user's new message updates the claimant's row: the claimant can read it, and the author's next save of it is refused. `handoff/local-walk-save-can-write-a-client-sent-low-message-id-2026-11-11.md` records the client-sent id as a hazard for local walks only.
- A smaller third: `message.delete` passes the client's `id` string to `deleteMessagePreviewImages` as sent. A form the database reads as the same number but is not the same text (leading space or zero) deletes the row and lists a prefix that holds nothing, leaving that user's own previews in the bucket.

Search run before marking this owner-needing (08:05Z): `grep -c 'getOne\|fk_users_id\|authorizeUser\|client-sent\|sequence squat'` over `steering/017-rulings.md`, `steering/backlog-2026-11-18-rulings.md`, the plan, `architecture/system-architecture.md`, `architecture/website.md` and `INBOX.md`, and `grep -l` of the first three terms over `handoff/*.md` and `security/closed/*.md`. Hits: the plan's and the effort rulings' citations of the local-walk handoff, and an architecture row about the cost of `upsertMessage`'s count. No ruling, decision or handoff addresses either observation as an access question.

## Required Controls

None for approval.

## Testing Recommendations

- If L-001 is taken up: a probe case sending an `id` with an embedded newline and one of 100 kB, asserting a 500, exactly one failure line, and no line beginning with the text after the newline.
- If the outside-scope observations are taken up: a real-Postgres test in the M5 lane's form, two users, asserting that a save carrying an unknown `id` is refused or ignored and that `getOne` on another user's personal message is refused.

## Compliance Mapping

| Requirement | Standard | Status | Notes |
|-------------|----------|--------|-------|
| No credentials or session data in logs | OWASP ASVS 4.0.3 V7.1.1 | ✅ | The new line carries id, class and milliseconds only |
| Logged data is encoded against injection | ASVS V7.3.1 | ⚠️ | L-001; key holder only |
| Input validated against a schema at the trust boundary | ASVS V5.1.3 | ⚠️ | Unchanged (015 audit L-001; plan X-4) |
| Least privilege on the storage path | ASVS V1.4.3; CIS Controls v8 3.3 | ✅ improved | The generator no longer lists or deletes (I-1) |
| Components current and supported | ASVS V14.2.1; CIS v8 7.x | ❌ | Unchanged, accepted (I-8; 015 audit H-001, H-003) |
| Application process runs with least privilege | ASVS V14.1; NIST CSF PR.AC-4 | ❌ | Unchanged, accepted (plan X-3) |
| API authentication fails closed | ASVS V13.1 | ✅ | `src/config.ts` and the key check untouched |

## Routing

- **steering-roadmap-hooks**: this document's path and SHA (the brief's delivery), and the owner-needing item in § Outside the reviewed delta.
- **implementer-hooks-017**: L-001 with its optional remedy, marked as no change requested: the generator stays at `8512a1d` unless the planner takes the finding into the chain.
- **devops (Stage 1)**: nothing here blocks the generator's `prod` push. No security read is owed at the release.
- **Record `INBOX.md`**: one entry pointing the architect's closing pass at I-8 (the first `npm audit` of the generator's lockfile), since `architecture/preview-image-generator.md` P-2 names the 015 audit as the dependency assessment.

## Not Covered

- Nothing was run against the generator by this review. The behaviour claims rest on my read of the two files at `8512a1d` and on the probe runs code review and QA reproduced at the same SHA (`code-review/017-existing-items-backlog-code-review.md` Round 7; `qa/017-existing-items-backlog-m6-qa.md`).
- No host read was made in this pass. The posture rows above rest on the files being unchanged, not on a new read of the host.
- No scanner beyond `npm audit` and the skill's pattern check: gitleaks, semgrep, osv-scanner and trivy are absent on this box.
- The website's own lockfile and its new `@vercel/functions` dependency (M5), and the website outside the files named in Scope.
- The generator's deployed `ENV` value, which decides the `dev/` prefix on its side (plan M5-g, RK-10; its `.env` is a secret file).
- The Postgres behaviours the third outside-scope bullet rests on (a number written with a leading space or zero matching the same row) are documented behaviour, not run here: no Postgres client is installed on this box outside the M5 lane's container.

## Appendix

### Instruments

- Tree: `git -C preview-image-generator rev-parse HEAD` → `8512a1d`, `branch --show-current` → `chain/017-existing-items-backlog`, `ls-remote origin prod` → `8de2b53` (08:06Z); `merge-base --is-ancestor 8de2b53 8512a1d` exit 0.
- Code: `git archive` exports of `8de2b53` and `8512a1d` naming `src`, `package.json`, `package-lock.json`, `ecosystem.config.js`, `tsconfig.json`, `README.md` and the three dotfiles (so `.github` is never exported), read with the Read tool; `git diff 8de2b53 8512a1d -- src/generateImage.ts src/server.ts` written to a file and read whole. Website: `git archive 4b8db9c` of `src/server/api/utils`, `src/server/api/routers/message.ts`, `src/env.mjs`; `git diff 1ad625e 4b8db9c` of `shared.ts` and `deleteMessagePreviewImages.ts`.
- Record script: `verification/015/pig-host-read.sh` read whole at blob `17059da`; `git diff f616d83 HEAD` of it (one hunk, `@@ -253,4 +253,36 @@`); unchanged since `008468b` (`git diff --numstat 008468b HEAD` empty).
- Scans: `verification/017/security/` (three files, named above).
- Records read: the brief and its common part; plan § M5, § M6, Risks, Release and rollback, Exclusions; the M6 implementation document; code review Round 7 and its sub-entry; QA's M6 report; `security/closed/015-preview-image-generator-security-audit.md`; both generator handoffs (the API-key one: frontmatter only); `architecture/preview-image-generator.md`.

### Process facts

- The session-start `node tools/check-repo.js` failed on two LINKS lines, both in other stages' documents (`code-review/…code-review.md`, `implementation/…m6-implementation.md`, each citing the reviewer's liveness-scope falsifier by a path that does not resolve from the record root). `INBOX.md` already carries both (`grep -c liveness-scope INBOX.md` → 2), so no entry was added.
- The exports and scan inputs lived in this session's scratchpad and are removed at the end of the run; the captures a reader needs are under `verification/017/security/`.

### References

- OWASP ASVS 4.0.3 (V5.1.3, V7.1.1, V7.3.1, V13.1, V14.1, V14.2.1); CWE-117, CWE-20; CVSS v3.1 vector as stated on L-001.
- GitHub advisory IDs for I-8 are in the summary capture, one per line.
