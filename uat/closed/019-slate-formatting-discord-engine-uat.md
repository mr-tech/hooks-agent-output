---
ID: 019
Origin: 019
UUID: 286c730a
Status: Committed
Status-Detail: "Committed at website 48eb60a (devops Stage 1, 2026-11-25), awaiting release."
Verified-At: "48eb60a — repos=website; the chain branch's head, built in place with next build (exit 0) and served by next start on 127.0.0.1:3000"
Release-Decision: APPROVED FOR RELEASE
---

# UAT Report: Slate formatting on Discord's engine

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md` (walks keyed to Revision 25; read again at Revision 26, whose delta changes no criterion: its own changelog row, and no walked criterion appears in its diff `d79f481e`)
**Date**: 2026-11-25
**UAT Agent**: Product Owner (UAT), session `uat-019`

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-25T16:31 | steering-hooks-fixer (brief `steering/019-brief-uat.md`, record `5a2a60ca`) | UAT for plan 019: all nine pre-release walks (rulings block "2026-11-25T15:49Z") | All nine rows EXECUTED, all PASS on website `48eb60a`. **APPROVED FOR RELEASE**. B-5 stays post-deploy (devops' carrier); B-6 is QA Phase 3's. Two findings, neither blocking: UAT-1 (pre-existing, also in production) and UAT-2 (local-build instrument limit). |
| 2026-11-25T17:10 | devops-019 | Document closed | Status: Committed at website `48eb60a`, awaiting release. |

## Stage start and tree

- **Stage start.** QA's M6 Phase 2 verdict, `qa/019-slate-formatting-discord-engine-m6-qa.md` § "Pass on Fix Round 6": Status `QA Complete`,
  `Verified-At: 48eb60a`, committed (record `135068f3`). QA's effort-final mutation sweep was **not run**, on the owner's waiver (rulings block
  "2026-11-25T15:46Z"). QA records that waiver in its verdict, so the waiver is the authority here, not a sweep with a kill table.
- **Tree, re-derived.** Website `git rev-parse HEAD` = `48eb60a02f4a…`, on `chain/019-slate-formatting-discord-engine`. `git status` showed only the
  foreign `?? .playwright-mcp/`. Code review's Round 9 sub-entry (`Reviewed-At: 48eb60a`) and QA's verdict name the same SHA. Any change to
  production code after `48eb60a` expires those verdicts and this one.
- **Build.** `pnpm build` in place, in a capped scope (8 GB): exit 0, BUILD_ID `2Mpu4y52pbn9VWlrEvGXa`
  (`verification/019/uat/build-48eb60a.*`). Served by `next start -H 127.0.0.1 -p 3000` in its own scope (`next-start.log.txt`).
- **Set up and removed.** These were stopped on exit: the server (port 3000 free after, and no `next start` process in `ps`); the local Postgres
  `hooks-postgres-local` from `tools/uat-local-stack.sh up` (schema pushed, ids from 900000000000001; removed with `down`, so 0 containers
  remain); the `git archive` export used for the B-3 node probe (deleted); the stage Chrome (closed, holder read `no holder`, caches emptied);
  and this run's page and console files under the browser's output directory (deleted).
- **What the walks wrote.**
  - Local database: one message, id **900000000000001** (B-4's "New Message"; nothing saved to it after), and the sign-in's user and session
    rows. All of it was removed with the container.
  - Redis: hazard 2's premise is re-derived as moved. `.env.local` now names a **loopback** `REDISHOST` on port 6379 (host class read only, and
    the stack tool's PING answered at 127.0.0.1:6379), so B-7's channel fetch cached to a local Redis, not a remote one.
  - Pusher: any save event went out on `message-update-900000000000001`, inside the moved range.
  - Production hooks.gg: nothing saved. The one production read (UAT-1's control) changed only the test profile's local draft.

## Flow Execution

**Build**: website `48eb60a`, `next build` plus `next start` at `http://127.0.0.1:3000`. The walks ran in the stage Chrome (kept profile), by
the `browser-walker` helper (three runs), with one look of my own (UAT-1). B-1's Firefox limb is my script,
`verification/019/uat/walk/b1-firefox.js` (Playwright Firefox 144.0.2). All evidence is under `verification/019/uat/walk/`.

| Flow | Action | Expected | Observed | Result |
|------|--------|----------|----------|--------|
| B-1 AC-2.5 Chrome, wasm blocked | `/preview` of `**a** plain *i* ||s||`, `*.wasm` aborted | every character unformatted; 0 `strong`; 1 `markdown-engine-init-failure` line | verbatim text, 0 `strong`, 1 line (`B-1-observed.json`) | PASS |
| B-1 Chrome, unblocked | reload | formatted | `a plain i s`, 1 `strong`, 0 failure lines | PASS |
| B-1 Firefox, blocked / unblocked | same two loads | as Chrome | blocked: verbatim, 0 `strong`, 1 line (`reason=TypeError`); unblocked: 1 `strong`, 0 lines (`b1-firefox.json`) | PASS |
| B-1 Slow 4G (QAF-15) | CDP 562.5 ms / 180 kB/s, cache off | formats once loaded; time-to-shown is recorded for X-22 and is not a pass condition | editor shown at 18,972 ms; `/preview` `strong` at 14,004 ms, 0 failure lines | PASS |
| B-1 AN-2 capture clause | run only if AN-8's fifth limb was not completed | — | not owed: AN-8 limb 5 landed (plan changelog, "Registered AN-8 limb 5 as landed") | n/a |
| B-2 AC-4.2 (his D-2 report) | type `https://x.y🙂 [a](https://x.y/🙂)`, blur, read `a[href]` | hrefs `https://x.xn--y-bz3s/` and `https://x.y/%F0%9F%99%82`; no `slight_smile` | exactly those two, and no `slight_smile` (`B-2-observed.json`) | PASS |
| B-3 AC-5.5, planted control | the comparator, one expected label planted wrong (case 104) | reports case 104 only | `[104]`: char 1, Chrome `emText` vs planted `-` (`B-3-planted.json`) | PASS |
| B-3 AC-5.5, 65 cases | paste each AN-6 comparable case into content; per-character leaf classes against the decorator's labels | 0 characters differ | 65 cases, **786 characters, 0 differ**, 0 page errors (`B-3-run.json`); 104, 105 and 67 among them | PASS |
| B-4 sign-in | Log in → Discord Authorise as the test account | returns to the site signed in; guild emoji listed | signed in (the client secret is current); guild calls needed UAT-2's cookie fixture; the picker's CLAUDE section lists `slate_oracle`, `qa_prc_static`, `qa_prc_anim` | PASS |
| B-4 AC-6.3 content line | `abcd`, caret after `ab`, pick `slate_oracle` | every character kept, text form at the caret | `ab<:slate_oracle:1574460051593240606>cd` | PASS |
| B-4 code line | "```\nxy\n```", caret after `x` | the same | "```\nx<:slate_oracle:…606>y\n```" (one attempt with a misplaced caret was discarded and redone) | PASS |
| B-4 quote line | `> pq`, caret after `p` | the same | `> p<:slate_oracle:…606>q` (the discarded attempt is UAT-1's state, not the picker's) | PASS |
| B-7 AC-4.4 limb 1 (signed in, guild chosen) | type `<#1574358729577599086> <@&1>` | `#slate-oracle-walk` mention+interactive; `@&1` mention; no `unknown` | exactly so (`B-7-limb1-observed.json`) | PASS |
| B-7 limb 2 (`/preview`) | same content on `/preview` | `#1574358729577599086`; page renders; no `unknown` | exactly so, 0 page errors (`B-7-limb2-preview-observed.json`) | PASS |
| B-8 AC-3.3 Chrome paste, full mode | Ctrl+V corpus 143 `> a\n> b`, 145 `>>> a\nb\nc`, 126 a `js` fence; read JSON | equal, character for character | all three equal (`B-8-full-mode.json`) | PASS |
| B-8 refused pastes | 6,001 chars into content holding `keep`; `a\nb` into the embed title `T1` | text unchanged, with the toast | `keep` + "Text too long."; `T1` + "This field does not support multiple lines." | PASS |
| B-9 AC-6.7 (1) Enter | `> a`, Enter, `b` | `b` inside the quote; `> a\n> b` | inside; `> a\n> b` (`B-9-observed.json`) | PASS |
| B-9 (2) paste | paste `> a⏎b` | outside; `> a\nb` | outside; `> a\nb` | PASS |
| B-9 (3) gesture (Backspace, the M6 document's) | `> a`, Enter, Backspace, `b` | outside; `> a\nb` | outside; `> a\nb` | PASS |
| B-10 AC-6.8 | 2,000 lines in the embed description; type 10 keys at the end of line 999, keydown to paint | no visible lag (unfixed: 0.43 s at 1,000) | 54 to 67 ms per key; line 999 `a0123456789`; 0 errors (`B-10-observed.json`) | PASS |
| B-11 AC-6.9 K1a, run A / run B | `>> a` + 1,999 `a`, `>` at line 0's start | B: `>>> a`; A: `>>> za`, kept across reload; 0 errors | B `>>> a`; A JSON `>>> za`, reload `>>> za` | PASS |
| B-11 K1b | `>> abc` … | B `>>> abc`; A `>>> zabc` | B `>>> abc`; A `>>> zabc`, reload the same | PASS |
| B-11 K2 | two backticks on line 2, type a backtick | B three backticks; A three backticks then `z` | as expected, reload the same | PASS |
| B-11 K3 | three backticks on line 2, Backspace | B two backticks; A two backticks then `z` | as expected, reload the same | PASS |
| B-11 K4 (QA's discriminator: an error) | 200 `a🙂` lines, a backtick at the end of line 0 | B `a🙂` + backtick; A `a🙂` + backtick + `z`; **0 errors** | as expected; 0 page or console errors on every key in all ten runs | PASS |

Reading notes, each a stated limit:
- **K1's helper "CHECK".** The editor draws a `>>> ` line as a quote element with the marker outside its text, so the editor's `innerText` reads
  `za` and `zabc`. The row's predicate is the saved text: JSON and the reload read `>>> za` and `>>> zabc`.
- **The one console error seen across the walks** was a 404, the Vercel Speed Insights script on a reload. It is a local-build artefact, not an
  editor error. QA's K4 discriminator is `pageerror` plus editor errors, and there were 0 of those.
- **B-3's saved per-case list** was shortened by the helper to one sentence. Its total of 786 characters equals the count I computed
  independently from the node labels (`b3-node-labels-48eb60a.json`). The probe that made those labels is kept as `b3-node-dump.test.ts.txt`.
- **B-7 limb 1** ran without page-error listeners, so its error state was not recorded. Its pass condition is the pill texts, which were read.
- **B-10's earlier attempts** placed the caret with ArrowDown ×999 and missed the line. They are not counted; the counted run placed the caret by click.

**Register.** Every pre-release row assigned to UAT is now terminal:
- B-1, B-2, B-3, B-4, B-7 (both limbs), B-8, B-9, B-10 and B-11 are **EXECUTED 2026-11-25, PASS**.
- B-5 (post-deploy-observable) is approved conditionally and gates nothing of the release act. Its carrier is the Stage 1 handoff devops
  creates.
- B-6 is QA Phase 3's.
- There is no second travelling list.

## Findings

UAT-1 LOW pre_existing — `website/src/components/SlateEditor/` (the editor's delete of a whole quote line)
- **What.** In the content editor, Ctrl+A then Delete over `> pq` leaves an empty quote line. The message's content saves as `> `, not empty.
  Pasting `> pq` into that line then saves `> > pq`. A Backspace removes the quote.
- **Measured.** At `48eb60a` locally, and on production hooks.gg (an unsaved new message): both read `"content": "> "`
  (`walk/look-clear-json.png`, `walk/look-clear-json-prod.png`). It is therefore not introduced by 019.
- **Routed.** No 019 criterion covers select-all deletion, so it is not a release condition. It goes to `steering-hooks-fixer` for the editor
  rebuild (rulings blocks "15:36Z" and "15:38Z").

UAT-2 LOW — `website/src/utils/getServerSideSessionCookie.ts` (outside the 019 region; an instrument limit for local walks)
- **What.** A production build reads `__Secure-next-auth.session-token`. Over http on 127.0.0.1, NextAuth issues `next-auth.session-token`.
  So on any local production build, every guild-scoped call returns 401 "No session token provided."
- **Effect on this walk.** It blocked B-4 and B-7 limb 1 on the first run.
- **Fixture.** The walk copied the session cookie under the production name in the test browser. The value was never printed or written, and the
  copy was removed after. This makes the local build behave as production does over https. It changes no product code and touches no control.
- **Routed.** It is for whichever later walk needs a signed-in local build (recorded here for QA and UAT walks; no product change asked).

## Value Delivery Assessment

The plan's Value Statement (§ Value Statement and Business Objective) is that the editor's colouring and the preview format input as Discord does
and keep every character typed, pasted or loaded. This was demonstrated in a real browser on the release tree:
- **The preview.** B-2 shows links keep their emoji: his D-2 report, where the target lost `🙂` to `:slight_smile`, is fixed locally. B-7 shows
  mentions render as Discord draws them. B-1 shows formatting appears once the engine loads, in Chrome and Firefox, and the raw text shows (never
  an empty box) when it cannot load.
- **Colouring.** B-3: in Chrome, the editor's per-character colours on all 65 of AN-6's comparable cases equal what the suite proved in node,
  with a planted difference caught.
- **No lost characters.**
  - B-8: pastes keep their text in full mode, and partial mode's refusals keep the text as it was.
  - B-4: a guild-emoji pick keeps every character on content, code and quote lines.
  - B-9: Enter, paste and Backspace behave as D-22 decided.
  - B-11: the keystroke lands and is saved with no editor error.
  - B-10: a 2,000-line description types without visible lag.
- **Not deferred.** No core value is deferred.
- **Known limits carried from QA.** QAF-56 MEDIUM is a stated limit: one of six bench rounds read 17.1 ms against 16 ms, at most about one frame.
  The mutation sweep was waived, so QA's Assumption Not Checked on Fix Round 6's `linesOf` branches stands unread.
- **The rebuild.** The owner's rulings put the editor's rebuild after 019. That does not lessen this release: 019's editor is what users get
  until then.

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES
**Evidence**:
- Every user-visible criterion that UAT holds (AC-2.5, AC-3.3's Chrome paste, AC-4.2, AC-4.4, AC-5.5, AC-6.3, AC-6.7, AC-6.8, AC-6.9) was driven on
  the release tree and matched the plan's literal expected values.
- QA's M6 verdict covers the suite side: 4,785 of 4,785, exit 0; `test:discord` live 41 of 41.
**Drift Detected**: None in delivered behaviour. Process drift, owner-ruled and recorded: the effort-final sweep, the Planner batch fold and the
architect's closing pass were waived (block 15:46Z; plan Revision 26, D-32 to D-34).

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Verdict identity**: website `48eb60a`. The predecessor verdicts (code review Round 9, QA M6 Phase 2) were re-derived at the same SHA. Any
change to production code expires them and this one. The plan was read at Revision 26; a later revision expires this verdict only where it
changes a criterion this pass verified.
**Rationale**: All nine pre-release blocking rows EXECUTED and PASS, each against its literal prediction. B-3's comparator was shown to fail on a
planted difference first. QA is Complete at the same tree, and its open items are a stated limit (QAF-56) and an owner waiver, not failures.
Neither UAT finding is a 019 defect.
**Conditional limb**: B-5 (AC-4.2 in production) is post-deploy-observable. It is decided on the first production read after the deploy, carried by
devops' Stage 1 handoff, and gates nothing of the release act. B-6 is QA Phase 3's at the release tip.
**Recommended Version**: The website `package.json` has no version field (plan § Version Management), so there is no bump. If devops labels the
deploy, it is a minor-class change: user-visible behaviour changes, with no breaking change to saved messages.
**Key Changes for Changelog**:
- The message preview and the editor's colouring now use Discord's own published formatter (`@discord/markdown-wasm`, pinned), so formatting
  matches Discord's.
- Links keep emoji in their targets: they are no longer rewritten to `:slight_smile:`.
- Channel mentions show the channel's name when the server is chosen; role mentions keep their id.
- The editor keeps every character on type, paste, load and guild-emoji insert. Pastes are saved exactly as pasted.
- Enter after a `> ` line continues the quote, as in Discord's box; Backspace on the new line ends it.
- Typing in very long embed descriptions no longer stalls, and opening or closing a code block near the top of one no longer raises an editor error.
- If the formatter cannot load, the text still shows unformatted, and the browser console logs `markdown-engine-init-failure` (console channel).

## Next Actions

*Point-in-time list: later stage documents are authoritative on these items' current state.*
- devops: prepare the release from `48eb60a`. QA Phase 3 (B-6) runs at the release tip. Create B-5's Stage 1 carrier.
- steering-hooks-fixer: UAT-1 goes to the editor rebuild effort.
