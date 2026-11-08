---
UUID: bf5186e5
Status: Open
Status-Detail: "Eight Assumption Not Checked items from chain 015's QA and code-review documents that no later document closes and no other carrier holds, found by the Phase 2D sweep and re-read at their sources. Each names the instrument that would close it and the signature of its falsity. None gates anything shipped."
Owning-Stage: qa (it reads each item's closing instrument; the per-item owner each source document named is kept below)
Review-Trigger: when the next website or preview-image-generator effort is scoped, or when a user report names one of the surfaces below (getFromUrl, the /generate endpoint, a stored message's preview image, the Upload Message / sign-out paths)
---

# Chain 015: assumptions no document closed

## What is seeded

Chain 015 shipped on 2026-11-08 (website `master` b96e364, preview-image-generator `prod` 8de2b53). The sweep of every "Assumption Not Checked" block in the chain's QA, code-review, UAT and plan documents (49 distinct items, classified by a helper and re-read here at their sources) found eight with no closing record, no register row, no Exclusions row and no handoff. They are carried here. Items closed by UAT, by the effort-final QA or by run 2 are not repeated; items held by the post-deploy handoff (B-6, B-7) or the RK-8 handoff are not repeated either.

| # | Assumption (source document, its own wording) | Source owner of closing | Instrument that would close it | Signature of its falsity |
|---|---|---|---|---|
| 1 | The git-archive export with a symlinked `node_modules` behaves as the shared tree would (`qa/closed/015-bug-evaluation-fixes-m0-qa.md` § Assumption Not Checked). | QA, Phase 2 at M1 (re-derives membership) | A suite run in an export with a copied, not symlinked, `node_modules`. One datum from this release: Next's Turbopack refused a symlinked `node_modules` outright ("Symlink node_modules is invalid, it points out of the filesystem root"), where UAT's `--webpack` build accepted it; the tip then built with a copied `node_modules` (`verification/015/devops-2a-website-build-b96e364.txt`). | An export run and a shared-tree run disagree on a case. |
| 2 | jsdom's `document.activeElement` follows react-aria's `focus()` as Chrome does (`qa/closed/015-bug-evaluation-fixes-qaf34-qaf35-cr26-qa.md`; code review's CR-26 block). | UAT, as an observation during B-9's walk (B-9 recorded none) | A Chrome read of the focus after the Button / DiscordMessageEditor mount paths, in a UAT walk. | Focus lands elsewhere in Chrome than the suite asserts. |
| 3 | Only the website calls `/generate`, so refusing non-object bodies breaks no other caller (`qa/closed/015-bug-evaluation-fixes-qa.md`, rev 26 pass; D35). | devops, at release readiness, from the generator's access logs | The generator's out log records method and URL only (`POST /generate`), with no caller identity, so no host read can establish it. It needs the list of the generator's callers outside the website repository, which is the owner's knowledge. | A caller other than the website that sends a non-JSON-object body and used to get a result now gets a 500. |
| 4 | A Discord `GET /channels/<id>` response carries `guild_id` for every guild channel, threads included (same document, rev 17 + 18 pass; the CR-12 rider's belonging check rests on it). | UAT, through B-9's thread cell (B-9 loaded one channel message only) | One B-9-style bot load of a link to a message in a thread of the test account's own server. | The belonging check refuses a thread of the user's own guild. |
| 5 | ioredis's pipeline `exec()` reports a failed delete in only two shapes, a rejected promise or a resolved `[err, null]` tuple per command (same document, rev 12 + 13 pass; M1-c). | Code review, at the M1-c re-review (none recorded) | Read the installed ioredis `Pipeline.exec` source and run a failing delete through the real client. | A failed Redis delete resolves in a third shape and sign-out reports success. |
| 6 | Where S3 answers, a request under the generic-pool drift mutant waits rather than returning (RK-8's inference; code review Round 18 sub-entry). | QA's effort-final, or devops at the RK-8 carrier read | An S3 stub in the E-1 export (the loopback endpoint) answering, then `run-drift.sh` on the member-absent export. The same read belongs to `handoff/preview-image-generator-generic-pool-private-field-2026-11-08.md` step 3. | The drift mutant's `/generate` returns before the 15 s cut while the pool's pending count is 1. |
| 7 | Every stored message the generator screenshots renders today, so none turns into the error line after M5-h / M6-l (code review Round 12). | devops, at M8/M9 (the post-release generator read) | Compare the stored corpus's preview results before and after; the corpus is unread. The first post-deploy `/generate` traffic after 22:05Z is the cheapest start. | A stored message's preview image becomes the "Invalid message data." / over-40 error rendering. |
| 8 | Discord serves a message from a channel outside the link's guild when the bot can read that channel (code review Round 4; the Discord leg of CR-12). | Security, with a test guild pair | One bot-token GET for a channel and message in a second guild the bot is in, from a controlled pair of test guilds. | Discord refuses the cross-guild read; the rider then guards a case Discord already closes (a lower-severity outcome). |

## Evidence

- Sweep: a read-only helper (general-purpose-sonnet) classified 49 distinct items as 28 CLOSED, 8 CARRIED, 3 STATED LIMIT and 10 UNCARRIED by its own count; its table lists eight UNCARRIED rows, and its summary line disagrees with its table. The table is not retained as a record. Only these eight rows were re-read at their sources by devops; the CLOSED, CARRIED and STATED LIMIT classifications are the helper's and were not re-read. The eight were re-read at `qa/closed/015-bug-evaluation-fixes-qa.md`, `qa/closed/015-bug-evaluation-fixes-m0-qa.md`, `qa/closed/015-bug-evaluation-fixes-qaf34-qaf35-cr26-qa.md` and `code-review/closed/015-bug-evaluation-fixes-code-review.md`.
- Release: `deployment/015-bug-evaluation-fixes-deployment.md`.

## Origin

devops Phase 2D, step 5c, chain 015.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T22:10 | devops-hooks-015 (Stage 2) | Created, carrying the eight items. |
