---
ID: 015
Origin: 015
UUID: 861e5f61
Verified-At: "7ce866b,471578f — repos=website,preview-image-generator; Phase 1 premise reads at the chain-branch base, no implementation yet"
Status: Awaiting Implementation
Status-Detail: "Phase 1 delta re-key to plan rev 10 (bceb84a; rev 9 d6da978 + 1b8b43b and rev 10 in one round). M1-c's no-account class, M1-f and RK-7 (corroborated by a transitive client-import scan), the re-derivation and P3's liveness pass. QAF-10 is RESOLVED. Two new findings go to the planner: QAF-12 MEDIUM (M1-h's four inputs omit a double rejection and the early-return path, so a catch-and-rethrow fix passes them all), owed before M1-h's reopened code lands; QAF-13 LOW (the run-2 span's restart limb is unreachable as Start is defined), owed before the run-2 script extension. Entry conditions E-1 to E-9 bind the implementer. Register B-1 to B-8."
Phase: 1
---

# QA Report: Plan 015 — Bug-evaluation fixes (website, preview-image-generator)

**Plan Reference**: `agent-output/planning/015-bug-evaluation-fixes.md`, revision 10 (agent-output `bceb84a`). The rev 9 + 10 re-key is delta-only, one round as steering briefed. It read the whole diff `1f7715b..1b8b43b` (rev 9: 87 added, 16 removed) and `1b8b43b..bceb84a` (rev 10: 25 added, 21 removed); steering named the range `3a805b5..bceb84a`, which adds only registration rows R-3 and R-4 and other stages' changelog rows. The rev 8 re-key is delta-only, as steering briefed: `38b12e6..1f7715b`, read in full (`git diff --numstat`: 39 added, 18 removed). The rev 7 re-key read the whole diff `8d67ce5..38b12e6` (`git diff --numstat`: 53 added, 19 removed). Earlier keys: rev 6 (`5d516d9`) and rev 4 (`f19e688`). The strategy was first written against rev 4. The re-key read the whole diff `f19e688..5d516d9` (`git diff --numstat`: 67 added, 27 removed), plus `5d516d9..8d67ce5`, which only appends the planner's Resumption State (8 lines added, 0 removed).

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-08T05:41 | steering-hooks-015 → qa-hooks-015 (brief) | QA Phase 1 for plan 015 rev 4 | Phase 1: strategy per milestone with measured populations, the Irreversible Side-Effect Register, testing infrastructure, entry conditions E-1 to E-9, blocking-condition register B-1 to B-8, findings QAF-1 to QAF-5. Premises captured in `verification/015/qa-phase1-premises.sh` and its run `verification/015/qa-phase1-premises-run1.txt`. The Playwright constraint (D2) was lifted by the owner at 05:33Z (`steering/015-rulings.md`, `d852da1`, read). Status → Awaiting Implementation. **Process disclosure:** one count-update pass on this document used an in-place `sed -i`, not the edit tools or `record-edit.js`, which breaks the record-writing rule. It replaced the finding count four→five in the Status-Detail, the changelog row, the batch line and the Handoff, and relabelled E-1. A `grep -c` afterwards showed 0 stale phrasings and 3 new ones. |
| 2026-11-08T05:46 | steering-hooks-015 → qa-hooks-015 (message) | Phase 1 confirmation against plan rev 6 (`5d516d9`) | Phase 1 re-key. The rev 4→6 delta was read in full: D19, D20, M1-a's route (AF-12), M1-c's clear-out cells and ordering, M1-d's limit (X-16), M2's QAF-1 note, P3's idle cell and run-2 record, stop (1)/(2) restated, M8's E-1 paragraph and M8-c route, M9's owner steps. Changes in this document: QAF-1 to QAF-5 RESOLVED (all folded); § M1-c rewritten to rev 6's six cells; § M8 run-2 note; E-1 reconciled (dependencies for the export); B-8's reader and record reconciled; new QAF-6 and QAF-7 (LOW). The trees did not move (website `7ce866b`, preview-image-generator `471578f`), so populations, the baseline and `Verified-At` stand. |
| 2026-11-08T05:48 | critic-hooks-015 → qa-hooks-015 (message) | Amend E-1 (critique cycle 2 M-C2-1, `39fb6b9`) | Phase 1 correction. The critic's measurement was re-run here (`verification/015/netns-loopback-probe.sh`, run captured beside it): loopback is DOWN in a fresh `unshare -rn` namespace until `ip link set lo up`. E-1 now states the full form: `-rn`, `lo` up, an isolation check (0 non-lo links, 0 default routes) and a loopback positive control. `-n` is never dropped. It was my method failure: E-1 omitted the step that § Infrastructure item 3 named. M-C2-3 (the M8-c fallback dropped at rev 6) is noted beside § M8's fallback. The approval of rev 6 stands, with E-1 as amended. |
| 2026-11-08T05:52 | steering-hooks-015 → qa-hooks-015 (message) | Phase 1 re-key to plan rev 7 (`38b12e6`) | Phase 1 re-key. The rev 6→7 delta was read in full: E-1 (loopback, self-check, install in the export), M8-c's source and fallback, M1-c's no-account cell, P3's pool read in `getPool.ts` and the run-2 request read, M2's property note. The mechanism claims were checked at source: `clearUser`'s three deletes (`src/utils/redis/index.ts`); next-auth 4.24.5 signout ordering (`deleteSession` before `events.signOut`); the request logging in `server.ts`. QAF-6 and QAF-7 are RESOLVED. New: QAF-8 MEDIUM (the run-2 request read windows the process started after stop (2), and counts unauthenticated requests), owed before run 2's script extension; QAF-9 LOW (the session-row limb and Ordering anchor sit outside `removeUserSession`). Reconciled: § M1-c no-account cell, E-1's self-check, M8-c's source, B-8. Trees unchanged (`7ce866b`, `471578f`). Approves rev 7 for implementation start. |
| 2026-11-08T05:55 | steering-hooks-015 → qa-hooks-015 (message) | Phase 1 delta re-key to plan rev 8 (`1f7715b`) | Phase 1 delta. M1-c passes: the no-account cell is limited to `removeUserSession`'s own acts, the session row sits outside M1-c (next-auth adapter), and the ordering is anchored on the `Accounts` `access_token: null` update. This releases the implementer's held cells. QAF-8 and QAF-9 are RESOLVED. New: QAF-10 MEDIUM on rev 8's run-2 span. Reconciled: § M1-c (no `Sessions` query in the captured SQL) and B-8. Trees unchanged (`7ce866b`, `471578f`). |
| 2026-11-08T06:31 | steering-hooks-015 → qa-hooks-015 (messages) | Phase 1 delta re-key to plan rev 9 + rev 10 (`d6da978`, `1b8b43b`, `bceb84a`) | Phase 1 delta. Each item's premise was checked at source. (1) M1-c's "no account found" class: `fetchUserAccount`'s loader ends in `executeTakeFirstOrThrow()` at `7ce866b`. (2) M1-f premise and RK-7: the plan's first-hop sweep is corroborated by a transitive scan; with value imports from 80 client roots, no server-key module is reachable at `be881c9`, and three planted controls fire as designed (`verification/015/qa-rk7-client-reach.js`, its runner and run 1). The scanner's first two versions gave false positives through type-only imports (`import type`, then `import { type AppRouter }` in `src/utils/api.ts`), and both were fixed before any result was used. (3) M1-h under D21, read against `hydratedAuthCallback` at `be881c9`. (4) The run-2 span (QAF-10) and P3's liveness. QAF-10 is RESOLVED. New: QAF-12 MEDIUM and QAF-13 LOW. § M1 strategy reconciled for M1-c, M1-f and M1-h. B-1 to B-5 note the sign-out revoke. Trees: website chain tip `be881c9` read; preview-image-generator `471578f`. |

## Reading and sources

- Plan rev 4 read in full; latest changelog row (rev 4) read. The D19 registration the brief names is **not yet in the plan**. This strategy reads the 05:29Z selection from `steering/015-rulings.md` (`fa693e0`): the verifying stop is a devops `prod.yml` re-run through `workflow_dispatch`, owner-approved.
- Read: critique `critiques/015-bug-evaluation-fixes-critique.md` (pass 2, `3398fc0`: L-6 to L-9 open, routed to the planner); architect findings `architecture/015-bug-evaluation-fixes-architecture-findings.md` (AF-1 to AF-12; AF-11 and AF-12 read in full); `architecture/system-architecture.md`, `website.md` and `preview-image-generator.md`, consulted for the generator's deploy route and the website's test conventions; `research/codebase-bug-evaluation-2026-11-08.md`, finding rows F-10 to F-30 and F-39; `agent-output/CLAUDE.md` § Test Conventions.
- Not read: `analysis/015-bug-evaluation-fixes-analysis.md` beyond what the plan, critique and architect quote from it. Its § Host observation commands are the M8-0 instrument, which already exists (`verification/015/pig-host-read.sh`, `fe27690`). No roadmap exists (plan header).
- Mechanism reads made in this pass, at website `7ce866b` and preview-image-generator `471578f` (both chain branches' HEADs):
  - `vitest.config.ts`, `tsconfig.test.json`, `tsconfig.json`;
  - `src/server/auth.ts` `removeUserSession` and the `signOut` event;
  - `src/pages/api/cron.ts`;
  - `src/server/api/utils/__tests__/shared.upsert-valid.test.ts` (the DummyDriver compile pattern);
  - `src/utils/__tests__/bugFixCoverage.supplemental.test.ts`;
  - the generator's `src/config.ts`, `server.ts`, `generateImage.ts`, `getPool.ts`, `ecosystem.config.js`, `.github/deploy.sh` and `.github/workflows/prod.yml` (lines 1–40);
  - `puppeteer@21.1.0` and `generic-pool@3.9.0` from the registry, each checked against the generator lockfile's integrity.

## Baseline (M0's comparand, re-derived here)

`npx vitest run --reporter=json` at website `7ce866b`, 2026-11-08T05:35Z. Result: `numTotalTests` 598, passed 598, failed 0; `testResults` 54 entries; process **exit 0**. This equals the planner's figures. The report was captured to this session's scratchpad and is not committed. M0 re-records it as the gate's comparand.

`pnpm run typecheck` was not run by this pass. The plan records exit 1, confined to `.next/dev/types/validator.ts`, and M0 deletes that directory (D7).

## Populations (measured; `verification/015/qa-phase1-premises-run1.txt`)

Each population below comes from the stated command at `7ce866b`/`471578f`. Every class criterion is verified per member at Phase 2.

| Criterion | Population | Command (in the script) |
|---|---|---|
| M1-a | 4 `'in',` sites: `user.ts` 1, `authorizeGuildUser.ts` 1, `shared.ts` 2 | `grep -rc "'in'," src/server` |
| M3 | 3 dialogs: `ImageUploader.tsx`, `WarningDialog.tsx`, `ConfirmationDialog.tsx`. 6 files call `useHotkeys(` in all; the other 3 (`edit/page.tsx`, `Navigation.tsx`, `Sidebar.tsx`) carry no focus guard and are outside the class | `grep -rc "tagName !== '~/components/Button'" src` |
| M6-i | 6 handlers: `duplicateEmbed`, `duplicateComponent` (`DiscordMessageEditor/index.tsx`), `duplicateTextComponent` (Section), `duplicateItem` (MediaGallery), `duplicateButton` (ActionRow), `duplicateChild` (Container). This equals the plan's "two top-level plus four nested" | `grep -rc "const duplicate[A-Z]" src --include=*.tsx` |
| M5-e | 2 `getDateString` copies (`Header.tsx`, `f/[id]/page.tsx`) | `grep -rc "function getDateString\|const getDateString" src` |
| M6-l (iii) | 1 `countTotalComponents` definition (`DiscordMessageEditor/index.tsx`, module-private) | `grep -rc "function countTotalComponents" src` |
| M7 | 0 test files under `bot/`; vitest collects `src/**` only (see Infrastructure) | `find bot -name '*.test.*'` |
| Suite naming | ID-token negative form: 0 basenames, 0 title or comment lines. The planted control fired 2 of 2 | in the script |

## Test Strategy (Pre-Implementation)

The approach is the plan's Testing Strategy, and each milestone carries the obligations below. These are coverage obligations, not test lists. They state, per named risk class: which fixture makes each conjunct carry the decision alone; which member in each direction is required; and what each test must be seen red against. Throughout:

- Expected values are literals (Axiom E).
- Names follow the positive form, with no ID tokens.
- Each surface's existing test is tightened before a new file is added (the pattern ladder).
- Every new case's red run is recorded in the implementation document's TDD table, with a valid failure reason. A compile-time failure is a valid reason for at most the first row per file.

### M0
- The baseline above is re-recorded with exit code, and `pnpm run typecheck` exits 0 after the deletion.
- **M0 also lands the bot test-collection change** (Infrastructure, item 1), and the baseline is re-read after it. Before the change, a new `bot/**/__tests__` file would be silently uncollected. So the comparand for every later milestone is the post-change run, whose `testResults` membership must equal the 54 base paths exactly.

### M1 — server and data path (node project, compile-only SQL)
- **M1-a (4 members × {empty, non-empty}).** Each member is driven through its real function against a Kysely instance whose driver *captures* compiled queries; existing tests only compile a builder directly. The obligations:
  - For an empty list: the captured SQL contains no `in ()`.
  - `getUserRecentMessages([])` issues **zero** queries. The red run is against the base, where it issues one containing `in ()`.
  - `getPartialMessages` with no guilds still issues the user-scoped query and drops only the `exists` limb. The case is asserted positively: the user's own messages are still selected, so a fix that returns `[]` early fails it.
  - Every non-empty control still compiles an `in ($1, …)` with the list bound as parameters.
  - For the two latent sites, `authorizeUser` and `getOldMessages` with `[]`, the result is "names no messages". The expected value is a literal.
- **M1-b.** The compiled cron selection contains `"error" is null`, and nothing compares `= $n` with a null parameter. Red against the base's `.where('ScheduledMessages.error', '=', null)` (`src/pages/api/cron.ts`).
- **M1-c.** `fetch` is stubbed and the network is never reached. The cells:
  - A session with an access token: one request to the revoke URL, whose body carries `token=<that token>`.
  - A session without one: **zero** revoke requests, and the DB update and Redis clear still run.
  - Today the request is sent *before* the account is read (`removeUserSession`, `src/server/auth.ts`). So the token-bearing cell is red at the base, because the body has no `token`.
  - **Rev 6 clear-out cells (QAF-3 folded).** There are five, and the clear-out is asserted in each:
    - token present, revoke answers 2xx;
    - token present, revoke answers non-2xx;
    - token present, `fetch` rejects;
    - token absent;
    - no account.

    How each cell earns its red run:
    - The reject and no-account cells are red at the base. A reject aborts before the clear-out; a missing account throws `Expected to find account`.
    - The non-2xx cell is **green at the base**, because the base ignores the response. It earns its red only under a mutation that throws on `!res.ok`, recorded per E-6.
    - The no-account cell's assertion waits on QAF-7. *Reconciled 2026-11-08T05:52 to rev 7:* the expected value is now a literal. The `user-access-token` and `user-session-token` keys are deleted, no `Accounts` update is issued and no revoke is sent; `user-guilds` is a stated residue. Three conjuncts, each asserted on its own. The base throws before any of them, so all three cells are red at the base. A mutation that keeps the `user-guilds` delete with an `undefined` id must redden the key-set assertion. The "session's DB rows are removed" limb is NextAuth's, not `removeUserSession`'s (QAF-9), and is not asserted here. *Reconciled 2026-11-08T05:55 to rev 8:* "does not delete it a second time" is asserted as zero `Sessions` statements in the captured SQL for every M1-c cell. The ordering anchor is the `Accounts` `access_token: null` update: the account read precedes the revoke, and both precede that update.
  - **Ordering.** The rev 6 rule is "the token is read before the session's rows are removed". The stub records call order across the account read, the revoke, the Redis clear and the `Accounts` update. The test asserts the account read comes first, and the revoke comes before the `access_token: null` update.
  - **Same-tick mutation.** A mutation that issues the `Accounts` update first must redden this case. Without it, a passing ordering assertion proves nothing.
  - *Reconciled 2026-11-08T06:31 to rev 9 ("no account found" class).* The no-account cell has two fixtures:
    - the lookup throws Kysely's real `NoResultError`, imported from `kysely`, never a look-alike `Error` subclass;
    - the lookup resolves falsy.

    The stated residue is a third cell, asserted positively: a generic lookup `Error` still propagates out of `removeUserSession`. This cell fails a catch-all that swallows every lookup error. A catch-all passes both no-account fixtures, so without this cell, narrowing the catch is untested.
- **M1-d.** The full 2×2×2 table from the plan. The count query's result is stubbed through the capturing driver, at **999 and 1000**: 1000 is the boundary member, and 999 is its control. The refusal asserts today's error text, quoted as a literal.
  - Each conjunct must carry the decision alone. Two fixtures matter: (a) an existing message at count 1000 is not refused, which isolates the "new" conjunct; (b) a guild-scoped save whose *user* count is ≥ 1000 while its guild count is < 1000 is not refused, which isolates the owner selection.
  - See QAF-4 for concurrency.
- **M1-e.** Members: `"0"`; 17-, 20- and 23-digit strings, accepted. `"0abc"`, `"00"`, the 16- and 24-digit strings, `""` and `"01234567890123456789"` with a trailing letter, refused. The base regex `^(0|[0-9]{17,23}$)` accepts `"0abc"` because the `^0` alternative is unanchored at the end. That accept is the red run.
- **M1-f.** Under the client branch, reading `NODE_ENV` does not throw. A non-`NEXT_PUBLIC_` key, e.g. `DISCORD_CLIENT_SECRET`, still throws (the control). *Reconciled 2026-11-08T06:31 to rev 9:* the refusal is new behaviour. At `7ce866b`, `!prop === 'NODE_ENV'` is always false, so the server-key cell is **red at the base** and is the case's red run. The cells:
  - a server key throws;
  - `NODE_ENV` does not throw;
  - a `NEXT_PUBLIC_` key does not throw.
  Each is asserted on its own, so that a guard refusing everything, or nothing, fails a cell.
  - **RK-7.** RK-7's exposure is checked by `verification/015/qa-rk7-client-reach-run.sh`: 0 reachable server-key modules at `be881c9`. Its predicate is bounded: static and dynamic string imports; `~/`, `bot/` and relative specifiers; candidates from `src/` only; `require()` and computed imports excluded. The editor walks B-2 to B-5 remain RK-7's runtime falsifier.
- **M1-g.** The handler is fed a bad signature in two body forms: malformed JSON and valid JSON. Each gets 401, and the JSON parser is never called before verification fails (spy on the parse step, or assert no parse error surfaces). The valid-signature control reaches the parse.
- **M1-h.** Two deferred promises. The test asserts both fetches have started while neither has resolved. It is red against the sequential base. *Reconciled 2026-11-08T06:31 to rev 10 (D21):* rev 9 records that this cell holds at the base, so it is no red run. The case is replaced by the class property. The test shape:
  - Each of the three promises (message fetch, account lookup, guild fetch) is a manually controlled deferred.
  - The test registers its own `process.on('unhandledRejection')` listener and counts events. It never relies on vitest's process exit alone.
  - After `hydratedAuthCallback` settles, it yields with `setImmediate`, not the wall clock, so that Node's rejection tracking can fire.
  - For each input, it asserts 0 unhandled events and the rejection reaching the caller.
  - The plan's four inputs, plus QAF-12's two.
  - The message-rejects-during-lookup input is red at `be881c9` (the planner's probe premise). It must be seen red under the test's own instrument, not only under the probe.
- **M1-i.** Members: `a=1; b=2`; `a=x=y`, whose value is `x=y`; a segment `junk` with no `=`, which is skipped without throwing; and an empty segment.
- **M1-j.** The fix lands in `src/utils/redis/index.ts` `getItem`/`getFromCache` (architect AF-8). A stored `null` within `expireSeconds` is a hit, so there is no second loader call; the redis client is the existing in-memory stub pattern (`serverCommands.get-message.test.ts`). A true miss still calls the loader (the control). Because the fix is in the shared helper, the obligation is on the helper, plus one caller: the account-without-refresh-token path.
- **M1-k.** Development with the port set gives `<host>:<port>/dev/…`. Without the port, the URL is unchanged from the base (the control).

### M2 — limits and save schema
- **M2-a.**
  - `embedShape` is imported from `shapes.ts`, never transcribed (QAF-1). It admits `color: 0`, `1` and `16777215`, and refuses `-1`, `16777216` and `1.5`.
  - `discordResponseToMessage` keeps `color: 0`; an absent field leaves `color` absent. Extend `discordResponseToMessage.ingress.test.ts` before adding a file.
  - The human-observable limb is B-2.
- **M2-b.** Author name at 256 shows no error; 257 shows it; 81 shows no error (the red member at the base, where the bound is 80). The bound is asserted as the literal 256, not by reading the constant (Axiom E).
- **M2-c.** The error text names the title; the expected string is a literal.
- **M2-d.** Footer lengths 0, 2048 and 2049, in both the editor's validator and `embedShape`. For the one-constant claim, a mutation of the constant must redden **both** surfaces' cases. Each case's red run names which mutation reddened it.

### M3 — Enter on dialogs (DOM)
- **The full table, per dialog, 3 dialogs × 3 focus states.** Each cell counts the confirm/submit spy and the other button's spy; the counts are literal 1 and 0. The "no button focused" row asserts each dialog's base outcome, read at `7ce866b` before the change and written as a literal.
- **The uploader's extra member.** In `ImageUploader`, the "any other button" row has two members, Cancel and Clear, and each is its own cell. That makes 10 cells: 3 for each of the two dialogs and 4 for the uploader.
- **Keyboard.** Use the `useHotkeys` path. Keyboard activation of a focused button is the separate `detail: 0` click convention, and both paths must be exercised. Otherwise the test passes even when the Enter hotkey still fires confirm alongside the button's own action.

### M4 — send page (DOM)
- **M4-a.**
  - `sendWebhook` is mocked, and no live send is ever made (the global no-outbound rule; X-14's constraint). Three presses during a pending send produce exactly 1 call.
  - The failure case rejects the mocked call. Send re-enables, and the vitest **process exit is 0**: an unhandled rejection fails the process even when the counters are green. The red run for that cell is the exit code at the base, not a case failure.
- **M4-b.** The truth table is {URL empty, non-empty} × {validating, settled} × {`selectedWebhook` null, non-null}. The message shows exactly at (non-empty, settled, null).
- **M4-c.** Clear is enabled with `threadId` set and `threadName` empty, in both the list view and the name view.
- **M4-d.** The members:
  - id-test: a whole-string id and a message URL are accepted; an id embedded in other text is refused.
  - A rejected fetch in each validation effect is caught and shown.
  - Overlapping validations use deferred promises resolved out of order. Only the latest input's result is applied, and the stale one resolves last.

### M5 — editor pages and providers (DOM)
- M5-a: Esc and outside-click close the dialog after confirm-Load. Extend an existing `JsonModalBody.*` test first.
- M5-b: an unparsable draft disables Copy. Pressing it never throws.
- M5-c: the cells are {changed, unchanged} × the event. The assertion is on the text "Any changes you have made will be lost." It must not touch the hash forms (X-10).
- M5-d: a session update without remount refreshes the dropdown.
- **M5-e, a clock-dependent cell.** It runs under `vi.useFakeTimers()` with `vi.setSystemTime` at a fixed instant, never the wall clock. That keeps it out of the time-based class (testing-patterns, "Time-Based Tests"). The members, against a fixed "now":
  - same day → "Today";
  - same day-of-month in another month → not "Today";
  - the same month and day in another year → not "Today";
  - yesterday → not "Today".
  Both copies are covered.
- M5-f: Save As opens with the current name and server.
- M5-g: the toast text is a literal.
- M5-h: a `/preview?data=` value that is not JSON renders the error state without throwing; valid JSON is the control.

### M6 — editor components and markdown
- **M6-a (and RK-1).** Two instruments:
  - The unit members: the research's three strings, plus 1-line, 2-line and N-line bodies, each with and without a tag, through each of `parseContent`, `parseEmbedField` and `parseEmbedTitle` (rule at `src/utils/markdown/rules.tsx`).
  - **RK-1's oracle is a differential, owed at Phase 2 and captured under `verification/015/`.** It runs the shipped code-block regex against Discord's rule over a generated space. The space covers: tags inside and outside `[a-z0-9-]` (e.g. `c++`, `c#`, `objective-c`), empty bodies, bodies containing a backtick fence, leading and trailing blank lines, and an unterminated fence. It reports every input where the two disagree, and each disagreement is dispositioned.
- **M6-b.** The plan's five members, plus: each of the 8 extensions in upper case; `a.png#frag`; `a.png/` (path ends in a segment with no extension); `apng` as a bare segment with no dot; `.webmx`. The set is asserted as a literal list, never read from the module.
- M6-c and M6-d: read-only fixtures, with a hidden earlier field for M6-d.
- M6-e: fake timers. After unmount, `vi.getTimerCount()` is 0, and advancing time calls no setter.
- M6-f: members `0` → `#000000`, `255` → `#0000ff`, `0xffffff`.
- M6-g: a string whose longer sequence has a shorter prefix that is itself a mapped emoji.
- M6-h: the attribute toggles with visibility, both directions.
- **M6-i: 6 members.** Each asserts the copy at `idx + 1`, with the original at `idx` and the item that followed now at `idx + 2`. A list of ≥ 3 is required, duplicating a middle item: with fewer than 3, or with the last item duplicated, "after the original" and "at the end" coincide, so the fixture could not tell them apart.
- M6-j: a footer with no `text` renders.
- M6-k: deleting by key without `innerKey` removes the entry, and the sibling key survives.
- **M6-l.**
  - (i): the adds, each from a total of 39 — a Section, a container duplicate, `addButton` and `addTextComponent` — complete in full. The top-level add at 40 is still refused.
  - (ii): `validateMessage` over totals of 40 and 41 (the boundary pair). The 41 case must be reached by **nesting**: a top-level count ≤ 40 with nested children making 41. A flat 41 cannot tell a top-level-only count from the total. The error text names 41 and 40, as literals.
  - (iii): `canAddComponent` and `validateMessage` import the one exported counter. Mutating its nesting recursion must redden cases in both consumers.
  - (iv) and (v) are stated limits, with no cells. No case sends.

### M7 — bot (node project, after the collection change)
- M7-a: `ADMIN_PERMS === "32"`, a literal. M7-b: `setTimestamp(t)` then the payload's `timestamp` equals `t`. M7-c: `isUserCommand` over a user command, a slash command and a message command; true only for the first.
- The Discord-visible limb is B-6.

### M8 — preview-image-generator (no runner; probes)
The probes are QA Phase 2 instruments, captured under `verification/015/`. Each is mutated before it is trusted (E-6), and none is a register row. They run under entry conditions E-1 to E-4.
- **P1 local probe.**
  - The server is started under `child_process.fork` with an IPC channel, and the probe sends `'shutdown'`.
  - The out log gains exactly one line beginning `Server received` that names the trigger, plus the drain-complete line with an elapsed figure.
  - A SIGINT then a `'shutdown'` (both triggers) still yields exactly one `Server received` line: this is the idempotency check.
  - The `Server running at` ready line is counted by the same predicate as a non-member: the plan's own negative control.
  - The exit time is under 10 s (P3).
- **P4.** The source order shows the handlers registered before `process.send('ready')`. The probe asserts it by sending `'shutdown'` immediately on `ready`.
- **QAF-2's cell.** A process that served **no** request is stopped. Its drain neither launches nor waits on a browser: the probe counts Chromium children, with the forcing condition that no browser is installed.
- **M8-b.** A `/generate` with the correct auth and an unparsable body gets 500. A second, well-formed request after it still gets a response. On the base, the `JSON.parse` throw inside `req.on('end')` crashes the process, which makes the red run.
- **M8-d.** With no browser installed, a well-formed request gets 500, not a TypeError, and the server stays up.
- **M8-e.** Unset and empty `API_KEY` each refuse start, with a line naming the variable. A set key starts (the control).
- **M8-c.** The page closes on both paths. Now that D2 is lifted, it runs locally with a real Chromium: puppeteer launched against an executable already on this box via `executablePath`, with nothing installed. The goto target is a loopback page served inside the isolated namespace. The two paths:
  - success: a screenshot is taken and the page closes;
  - throw: the page closes after a forced screenshot failure.
  Assert open pages = 0 after each. If no compatible executable is present, M8-c is verified by code review and recorded as a limit. (Reconciled 2026-11-08T05:46 to rev 6: the plan now runs M8-c locally under E-1 with a browser (D20) and no longer names the code-review fallback; the critic's M-C2-3 asks the planner to restore it. The fallback stands here as QA's limit if no usable Chromium exists on the box. Installing one is not implied. *Reconciled 2026-11-08T05:52 to rev 7:* the plan restores the fallback (M-C2-3) and names the sources, `/usr/bin/google-chrome` 156.0.8078.47 and `/snap/bin/chromium` 157.0.8103.38. The implementer records one launch and one screenshot under E-1 against the chosen binary first. That run is M8-c's comparand-exists probe, and it is not M8-c's evidence.)
- **Run 2's idle record (rev 6, P3).** M8-0 run 2 records whether the process stopped at stop (2) had served a request. If it had not, its drain-complete figure is read as an idle drain, not a drain measurement. The local probe's idle cell gives the comparand for that case: browsers launched (0), drain elapsed.

## Irreversible Side-Effect Register

Enumerated by effect: what performs I/O outside the process or destroys state. For each, the preconditions before it fires and whether every route enforces them.

| # | Effect | Performed by (read) | Must be true before it fires | Enforced identically on every route? |
|---|---|---|---|---|
| I-1 | **S3 `ListObjects` + `DeleteObjects` on `previews/<id>/`, then `PutObject` (public-read)** | `generateImage.ts` default export. `deleteMessagePreviewImages` is awaited before the image is awaited, so the delete runs even when the browser launch fails | Auth header matches `config.API_KEY`; body parsed | **No, on the local probe route.** `npm start`/`ts-node -r dotenv/config` and `ecosystem.config.js` (`require('dotenv').config()`) load the tree's `.env`, whose 9 keys are all set, CDN credentials included (keys read, values not). The plan's M8-d probe sends a well-formed body under no browser, which reaches the delete. Raised as QAF-5. E-1 is the sole control. |
| I-2 | Discord OAuth token revoke (invalidates the user's token) | `src/server/auth.ts` `removeUserSession`, from the NextAuth `signOut` event | The session belongs to the signing-out user (NextAuth event) | One route (`signOut`). Tests stub `fetch`; no real revoke from any test (E-5) |
| I-3 | Webhook post to a Discord channel | Send page `sendMessage` → `sendWebhook` | Valid message, selected webhook, not loading; after M4-a, not pending | One route; tests mock `sendWebhook`. **No agent presses Send in any walk** (global no-outbound rule) |
| I-4 | Message insert (live Postgres) | `shared.ts` `upsertMessage` | Authorized owner; count < 1000 for a new message (M1-d) | One route. Count-then-insert is not atomic (QAF-4) |
| I-5 | Scheduled webhook sends and `ScheduledMessages` updates | `src/pages/api/cron.ts` | Due, unsent, `error is null` (M1-b) | UNVERIFIED: the cron route's auth was not read in this pass. There is no producer (research F-1); tests compile only |
| I-6 | Publishing every bot command to Discord | `pnpm run push-commands` (owner, M7-a) | Website release done; `ADMIN_PERMS` "32" in the pushed tree | Owner act; republishes all commands (RK-4) |
| I-7 | Generator prod deploy: `rm -rf deployed/prod`, copy, `pm2 startOrReload --update-env`, `pm2 reset` (restart counters cleared), `pm2 save` (rewrites root `dump.pm2`); the old process is SIGKILLed after 12000 ms (transition stop) | `.github/deploy.sh` (read), triggered by `prod.yml` on push to `prod` or `workflow_dispatch` (read, lines 7–12) | Owner-approved push; `ecosystem.config.js` states `shutdown_with_message` and `kill_timeout` 12000 | Two routes (push, re-run), same script. `pm2 reset` and `pm2 save` are irreversible: the previous `dump.pm2` is overwritten and not a git object |
| I-8 | The verifying stop: a second full deploy of I-7 | devops `prod.yml` `workflow_dispatch` (05:29Z selection; D19 owed) | Run 2's instrument ready; owner approval | Same as I-7 |
| I-9 | Website production deploy | push to website `master` (Vercel). The release consequence is devops's to establish: the plan's Entry work records no `.github/workflows`, and this pass did not read Vercel's configuration | Owner-approved push | — |
| I-10 | Writes to the live database during pre-release walks (saves under the walking account) | Locally served chain tip on `.env.local` (plan § Validation) | The walking account is the test account, or the owner's own by his choice | Walk rows B-1 to B-5 |
| I-11 | Deleting `website/.next/dev/types` | M0 (D7) | `pgrep -af "next dev"` empty for this tree | Not git-revertible, because the directory is git-ignored. It is regenerated by the next `next dev`/`next build`, so the loss is recoverable by regeneration only |

## Testing Infrastructure Requirements

1. **TESTING INFRASTRUCTURE NEEDED: bot test collection.** `vitest.config.ts`'s node project includes `src/**/*.test.ts` only, `tsconfig.test.json` includes `src/**/__tests__` only, and `bot/` holds 0 tests. M7's tests placed beside the code (`bot/**/__tests__/`) would be collected by neither. The existing bot test `src/utils/__tests__/serverCommands.get-message.test.ts` sits outside `bot/` for this reason. Needed at M0:
   - add `'bot/**/*.test.ts'` to the node project's `include`;
   - add `"bot/**/__tests__/**/*.ts"` to `tsconfig.test.json`'s `include`;
   - confirm `tsconfig.json`'s `**/__tests__` exclude covers `bot/`. It does by glob, and `bot/**/*.ts` is in its `include`.

   The evidence is a planted failing `bot/**/__tests__` case seen red, then removed.
2. **Capturing Kysely driver helper**, for M1-a/b/d. Extend the DummyDriver pattern in `shared.upsert-valid.test.ts` into a driver that records each compiled query and returns stubbed rows. The functions under test call `getPostgres()` themselves, so tests mock that module to return the capturing instance. Place it in `src/server/api/utils/__tests__/helpers/` when its third copy appears (helper policy). M1 will reach three files, so lift it at M1.
3. **Generator probes**: no runner and none added (plan). Needs:
   - an isolated export, `git archive <sha> | tar -x` into a scratch directory;
   - `npm ci --omit=optional` there under `PUPPETEER_SKIP_DOWNLOAD=1`, whose effect is confirmed at 21.1.0;
   - `node` from the export's `dist/` after `npm run build`, run inside `unshare -rn` with `ip link set lo up`.

   No install touches the shared generator tree.
4. No new dependency in either repository (plan, lockfile rule).

## Entry conditions (binding on the implementer from M0)

Each is a probe shape: prove the comparand exists on the live path before building the comparison that consumes it.

- **E-1 (I-1, QAF-5).** Every local generator run happens in an export without the tree's `.env`, under `unshare -rn`, with every `CDN_*`, `PREVIEW_ENDPOINT` and `API_KEY` set explicitly to probe values. `PREVIEW_ENDPOINT` is a loopback URL. This applies from the first run, and the shared tree's `.env` is never sourced. Two facts make this necessary: `dotenv` does not override variables already set, and the export carries no `.env` because the file is git-ignored.
  - *Reconciled 2026-11-08T05:46 to rev 6, which carries E-1 in § M8.* The plan's Install bullet still installs "into the generator tree", while E-1 runs in an export. The export's dependencies come from `npm ci --omit=optional` under `PUPPETEER_SKIP_DOWNLOAD=1` **inside the export**. Never use a symlink to the shared tree's `node_modules`, which another session could alter mid-run. The install needs the network, so it runs before `unshare -rn`; the server runs inside it. QAF-6 asks the planner to align the Install bullet.
  - *Reconciled 2026-11-08T05:48 (critic M-C2-1, `critiques/015-bug-evaluation-fixes-cycle2-critique.md`, `39fb6b9`; re-measured here).* E-1 as first written left loopback down. In a fresh `unshare -rn` namespace, `lo` is `state DOWN` and a connect to a socket bound in the same namespace fails with `[Errno 101] Network is unreachable` (`verification/015/netns-loopback-probe.sh`, run `verification/015/netns-loopback-probe-run1.txt`). So every HTTP-shaped probe would fail: M8-b, M8-d, the P1 server and M8-c's loopback goto. The cheapest workaround, dropping `-n`, is exactly the limb that keeps a mis-set request away from the real bucket (I-1). § Testing Infrastructure item 3 named `ip link set lo up`; E-1 did not. The full form, binding from the first run:
    1. Enter with `unshare -rn`.
    2. Run `ip link set lo up` before the server starts.
    3. Check isolation before any request: `ip -o link show | grep -vc ': lo:'` → 0 and `ip route show default | grep -c .` → 0. The run aborts otherwise.
    4. Run the probe's loopback connect as the positive control.

    `-n` is never dropped. A probe that cannot reach loopback is fixed by step 2, never by leaving the namespace.
  - *Reconciled 2026-11-08T05:52 to rev 7.* Rev 7's self-check is a loopback GET that answers plus an external name lookup that fails. Both steps are kept, along with step 3's link and route counts. A failed lookup alone does not show the absence of a route: a direct connect to an address would bypass DNS. The counts do show it.
- **E-2.** Before any generator install, record `env | grep -c '^PUPPETEER'` (0 now), `~/.cache/puppeteer` (absent now) and `PUPPETEER_SKIP_DOWNLOAD=1` in the install command. Puppeteer reads the variable as `Boolean(process.env['PUPPETEER_SKIP_DOWNLOAD'] ?? …)` (`getConfiguration.js` at 21.1.0), so any non-empty value skips; this settles the plan's "recalled, not read" premise. The M8-d forcing condition (no browser) holds only while that cache is absent. Re-check it at the probe.
- **E-3.** The P1 probe runs on Node 18, the `prod.yml` setup-node major, or records the gap. This box runs Node v24.14.0. Whether the host's PM2 daemon runs the app under the runner's node is unread. M8-0 run 2 records the interpreter if its script can.
- **E-4.** The P1 predicate (`^.*Server received` per line) is exercised on a local log containing both a member and the `Server running at` non-member before any host read relies on it (plan, critique M-3).
- **E-5.** No test reaches the network. `fetch` and `sendWebhook` are stubbed. A test touching `removeUserSession` asserts the stub's call count and never constructs a real request.
- **E-6.** Every new test or probe is seen red against the base, or under a restored mutation of the fixed line, with the red output recorded in the TDD table. For sibling cases over one surface (M3's cells, M6-i's members), the record names which cases each mutation reddened.
- **E-7.** The gate at every milestone is `pnpm run typecheck` exit 0, plus the vitest counters **and exit code**, plus `testResults` path membership equal to the previous milestone's set plus the new files.
- **E-8.** No lockfile pin moves: `git diff --numstat <base>.. -- pnpm-lock.yaml package-lock.json` is empty.
- **E-9.** A pre-release walk never presses Send and never saves a message with more than 40 components to a real webhook (X-14). Walk saves go to the walking account's own messages only.

## Telemetry Validation (M8)

- **What is logged.** The P1 trigger line and the drain-complete line with its elapsed milliseconds go to stdout through `console.debug`, which `server.ts` already prefixes with a date. These are the only operational signals run 2 reads.
- **How it is verified.** Locally, the probe counts lines by the E-4 predicate. On the host, `pig-host-read.sh` reads the out log. Neither line carries a secret: the API key and CDN credentials must not appear, and the probe greps its own capture for the probe values it set (E-1) and requires 0 hits.

## Blocking-condition register (chain 015)

> **BLOCKING RELEASE CONDITION** — each observable pre-release item must be executed and recorded in the UAT document before merge/deploy.

Standing note: this register is point-in-time. Later stage documents are authoritative on each row's execution state: the UAT document, then the deployment record, then the post-deploy carrier.

The plan's Validation lines and human-observable limbs map to rows as follows:
- the pre-release walk → B-2 to B-5;
- limb 1 → B-1 and B-7;
- limb 2 → B-6;
- M8-0 run 2 → B-8.

*Reconciled 2026-11-08T06:31 to rev 9 (§ Validation; M1-c from `be881c9`):* in any walk, B-1 to B-5 and B-7, signing out revokes the walking account's Discord OAuth token for this app (I-2), and the walker signs in again. Only the app's token is revoked: the Discord session in the stage browser is unaffected. A walk that signs out mid-row records the re-sign-in, never reads it as a row failure.

Instruments shown working at minting:
- B-8's script exists, and run 1 is captured (`fe27690`).
- The browser rows (B-1 to B-6) were not run at minting. Their instrument is the stage browser, whose subject is the test account. Each row's precondition read is the first act of its executor.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | **M1-a, limb 1**: "a user who administers no server can open the message list" — at `7ce866b` and at the chain tip, served locally | Stage browser driving `/message` on the locally served tree | Test account (if it administers no server) / owner with such an account | The test account's guild list read and found to contain no server it administers | Base: the list fails to load (Postgres syntax error from `in ()`). Tip: the list loads with the account's own messages. One failing load at the tip refutes | If the tip still errors, the user with no server still cannot see their messages | uat | UAT document for 015 | open |
| B-2 | observable pre-release | **M2-a**: "pick black in the colour picker, save, reload — the embed is black" | Stage browser on the locally served chain tip | Test account / owner | Tip served locally | The save succeeds and black persists after reload. A Zod error toast refutes | If the save errors, a black embed is still lost | uat | UAT document for 015 | open |
| B-3 | observable pre-release | **M3**: "in *Delete Embed*, Tab to Cancel, press Enter — the embed remains" | Stage browser, keyboard | Test account / owner | Tip served locally | The embed remains. One deletion refutes | Cancel+Enter still destroys work | uat | UAT document for 015 | open |
| B-4 | observable pre-release | **M6-l**: "at 39 components, add a Section. The add completes, Send is disabled, and the error names the count" | Stage browser; **Send is never pressed** (E-9) | Test account / owner | Tip served locally; a message at 39 components buildable | The add completes, Send is disabled, and the error names 41 or the actual total and 40 | If the add is refused, D10's "allow" is unmet; if Send is enabled, an invalid message can send | uat | UAT document for 015 | open |
| B-5 | observable pre-release | **M6-a**: "a two-line code block in the read-only preview renders as a block" | Stage browser | Test account / owner | Tip served locally | It renders as a block | The block renders as raw text | uat | UAT document for 015 | open |
| B-6 | post-deploy-observable | **M7-a, limb 2**: "a member holding Manage Server and not Administrator sees *Get Message*" | Discord web client in the stage browser, a message's context menu | Test account, if it is such a member in a guild with the bot / owner, attested with time | After the owner's `push-commands` (I-6) following the website release, and Discord's command cache refreshed; the test account's role read first | Visible. Absent refutes D4's fix (Discord semantics inferred, not executed, per research) | Moderators still cannot use Get Message | uat; owner fallback minted only if the precondition fails (cost: one Discord check by him) | `handoff/<name>.md` created by devops at Stage 1 | open |
| B-7 | post-deploy-observable | **M1-a in production**, limb 1 repeated | Stage browser on production | as B-1 | After the Vercel deploy of the merge SHA | List loads | as B-1 | uat | `handoff/<name>.md` (devops, Stage 1) | open |
| B-8 | post-deploy-observable | **M8-a P1–P3 on the verifying stop (2) only**: one `Server received` line naming the trigger plus the drain-complete line; exit before 12000 ms; no `still alive`/SIGKILL for that stop. Also RK-3: app `online`; RK-5: no Chromium with ppid 1 | `verification/015/pig-host-read.sh` as `claude-ro` over `hooks-pig` (D17, D18), capture to `verification/015/` | No human | After the `prod.yml` re-run completes and `pm2.log` shows the app online after it. The read is anchored on stop (2)'s timestamp, never stop (1)'s (RK-6). Depends on D19's registration and on L-6's naming of the reader | Exactly 1 line + 1 drain-complete line for stop (2); 0 `still alive` for stop (2). Stop (1) shows SIGKILL by prediction, which is not a refutation. One `still alive` on stop (2) refutes by construction | If the drain still never runs, deploys still kill in-flight previews | devops (the stage that runs the stop and reads in the same seam; the plan's L-6 fixes it). *Reconciled 2026-11-08T05:46: rev 6 fixes the reader as devops (D19, L-6), earliest after the re-run completes and `pm2.log` shows the app online. The read also records whether the stopped process had served a request (P3's idle cell), which decides how the drain-complete figure is read.* *Reconciled 2026-11-08T05:52 to rev 7:* the request read is the plan's L-C2-2 form, held on QAF-8 (wrong window; unauthenticated requests counted). Until the planner fixes it, run 2 reports the request figure as not established, and the drain-complete figure carries no idle/served reading. *Reconciled 2026-11-08T05:55 to rev 8:* the pool read is `Created instance` lines (primary) and `POST /generate` lines (secondary) within the stopped process's span. The span's end bound is held on QAF-10 (ready line to ready line). Until it is fixed, run 2 counts `Server received` between the two ready lines bracketing stop (2), never within a span ending at that line. *Reconciled 2026-11-08T06:31 to rev 9:* the span is bounded by ready lines and anchored on stop (2)'s `pm2.log` timestamp; the read list is enumerated. A zero-`Server received` span is a valid refuting read. QAF-10 is closed. The restart limb is QAF-13. | `handoff/<name>.md` (devops, Stage 1) | open |

Liveness for B-8, whose pass form includes an absence (no `still alive`): run 1 shows the instrument sees `pm2.log` stop lines (two members, 2024-06-15 and 2026-06-15). Stop (1)'s predicted SIGKILL line at the push is the same-run positive control.

## Findings

QAF-12 MEDIUM Phase 1 — Rev 10's M1-h property ("every promise `hydratedAuthCallback` starts has a rejection handler attached before the function next awaits anything else") is right. But its four single-rejection inputs miss two members of the class, read at `be881c9`, `src/server/auth.ts` `hydratedAuthCallback`:
- **(a) Both reject.** The account lookup rejects, and the message fetch rejects after it. The function throws from `await redis.fetchUserAccount(...)`, and `messagePromise` is abandoned.
- **(b) Early return.** The account lookup resolves falsy, so the function returns `{}`, and the message fetch rejects afterwards. `messagePromise` is again abandoned, and the plan's stated outcome, "the rejection reaches `hydratedAuthCallback`'s caller", cannot hold, because the caller has `{}`.
- **Why it matters.** A plausible fix, `try { await fetchUserAccount } catch (e) { throw e }` or any handler confined to the lookup, passes all four listed inputs and still emits `unhandledRejection` on (a) and (b).
- **What it fails to check:** the property on the two paths where the function leaves without awaiting `messagePromise`.
- **Asked of the planner:** add (a) and (b) as inputs, with literal outcomes. For (a): the caller receives the account lookup's rejection, and 0 `unhandledRejection` events. For (b): the caller receives `{}`, and 0 events.
- **Timing:** owed before M1-h's reopened change is reviewed.

QAF-13 LOW Phase 1 — Rev 9's run-2 span defines **Start** as "the stopped process's `Server running at` line, the last ready line before the re-run's", and then reports "any extra ready line inside the span" as a restart. With Start defined as the *last* ready line before the re-run's, no ready line can lie inside the span, so the restart limb can never fire. A crash-restart of the M8 process between the push and the re-run would silently move Start to the restarted process, and drop the earlier process's `Created instance` and `POST /generate` lines from the idle reading.
- **What it fails to check:** whether the process stopped at stop (2) is the one the push started.
- **Asked of the planner:** anchor Start on the first ready line after stop (1)'s `pm2.log` timestamp, the push's own new process. Every further ready line before the re-run's is then a reported restart.
- **Timing:** owed before the analyst extends `pig-host-read.sh` for run 2.

QAF-10 MEDIUM Phase 1 RESOLVED — folded at rev 9 (`d6da978`), M8-a "Every run-2 read": ready-line bounds, the stop (2) anchor and the enumerated reads. The restart limb is QAF-13. — Rev 8's "Every run-2 read" bounds the span by the stopped process's `Server running at` line and **its `Server received` line** ("the last such pair before the ready line of the process the re-run started"). Two consequences:
- **The count cannot fail.** The criterion's first limb, the out log gains "exactly one `Server received` line", is counted inside a span that ends at that line, so it reads 1 whenever the span exists.
- **The span is undefined when the drain fails.** If the drain still never runs, which is the refuting case (run 1 found 0 such lines in 180,284), there is no pair. The span then falls back to an earlier pair, or to none.
- **What it fails to check:** that P1's line count can refute.
- **Asked of the planner:** bound the span by ready lines only, independent of any counted line. That is, from the stopped process's `Server running at` line, the last ready line before the re-run's, up to the ready line of the process the re-run started. Cross-check it against `pm2.log`'s stop timestamp for stop (2). A restart inside the span (`exp_backoff_restart_delay`, `max_restarts: 10` in `ecosystem.config.js`) shows up as an extra ready line, and the run must report it rather than pick one.
- **Timing:** owed before the analyst extends `pig-host-read.sh` for run 2. Not owed before code. The RK-6 register in the plan records this pass's member.

QAF-9 LOW Phase 1 RESOLVED — folded at rev 8 (`1f7715b`), M1-c "The session row is outside M1-c" and the `Accounts`-anchored Ordering. — Rev 7's M1-c attributes "the session's DB rows are removed" to the no-account cell, and keeps the Ordering line "The token is read before the session's rows are removed". In next-auth 4.24.5 (the installed version, `node_modules/next-auth/package.json`), the signout route calls `adapter.deleteSession(sessionToken)` (`core/routes/signout.js`, line 46 at that version), then `events.signOut` (line 47), and only that event calls `removeUserSession`. So the `Sessions` row is gone before `removeUserSession` starts, and in both clauses "session's rows" names an act outside M1-c's surface. The token lives in `Accounts`, so no behaviour is wrong.
- **What it fails to check:** a test driving `removeUserSession` cannot observe the session-row limb, and the Ordering clause read literally is false by construction.
- **Asked of the planner:** name the anchor the ordering means (the `Accounts` `access_token: null` update), and attribute the session-row deletion to NextAuth's adapter, outside M1-c's assertion.

QAF-8 MEDIUM Phase 1 RESOLVED — folded at rev 8 (`1f7715b`): `Created instance` is the primary figure, POSTs are secondary, and the span is the stopped process's own. The span's end bound is QAF-10. — Rev 7's run-2 request read (critic L-C2-2) counts `POST /generate` lines "after the last `Server running at` line". It runs after the `prod.yml` re-run has completed and the app is back online. By then, the last ready line in the shared out log belongs to the process the re-run **started after** stop (2), not the one stop (2) stopped. So the read counts the wrong process's requests. This is a member of RK-6's class: an observation read off a process other than the one stopped.
- A second gap: `server.ts` logs `req.method, req.url` **before** the auth check (`console.debug` at the top of the `createServer` handler, `471578f`). So an unauthenticated `POST /generate` counts as "served" without ever creating the pool.
- **What it fails to check:** whether *the stopped process* created its pool, which is what decides how its drain-complete figure is read.
- **Asked of the planner:** fix the window to the stopped process's own span: from its `Server running at` line to its `Server received` line, the last such pair before the re-run's new ready line. Read pool creation directly, from `Created instance` lines in that span (`getPool.ts` factory `create`, `console.debug`), with the `POST /generate` count as a secondary figure.
- **Timing:** owed before the analyst extends `pig-host-read.sh` for run 2. Not owed before code.

QAF-7 LOW Phase 1 RESOLVED — folded at rev 7 (`38b12e6`), M1-c "The no-account cell", which names the two keys, no `Accounts` update, no revoke and the `user-guilds` residue; `clearUser`'s three deletes were re-read at `7ce866b`. — Rev 6's M1-c says the clear-out "runs for every session in the class", the no-account case included. It does not say what clearing out means when there is no account.
- At `7ce866b`, both clear-out limbs are keyed on the account's `providerAccountId`: `redis.clearUser(userDbId, sessionToken, account.providerAccountId)`, and the `Accounts` update `.where('providerAccountId', '=', …)` (`src/server/auth.ts` `removeUserSession`).
- **What it fails to check:** the no-account cell has no expected value, so whatever the implementer writes would pass.
- **Asked of the planner:** state the expected observation as a literal, e.g. "the session and user keys are cleared, and no `Accounts` update is issued", or "the Redis clear runs with the user and session keys only".

QAF-6 LOW Phase 1 RESOLVED — folded at rev 7 (`38b12e6`), § M8's E-1 paragraph, which installs inside the export before the namespace and never links the shared `node_modules`. — Rev 6's M8 Install bullet still installs "into the generator tree", while rev 6's E-1 paragraph runs every local generator run in an export without `.env`.
- **What it fails to check:** that the export runs against the lockfile's dependency tree, installed there, rather than a shared-tree `node_modules` another session can alter.
- **Asked of the planner:** align the bullet: install inside the export, before entering the isolated namespace. E-1's reconcile note already binds the implementer.

QAF-5 HIGH Phase 1 RESOLVED — folded at rev 6 (`5d516d9`), § M8's "Entry condition for every local generator run" carries E-1 in full. — The plan's M8 "Locally, no browser" route does not isolate the generator from its credentials or the network, and the probe it prescribes performs an irreversible external delete.
- **Why the route reaches credentials.** The route installs into the generator tree, and a start through `npm start` (`ts-node -r dotenv/config`) or `ecosystem.config.js` (`require('dotenv').config()`) loads that tree's `.env`. All 9 of its keys are set, `CDN_KEY`, `CDN_SECRET`, `CDN_BUCKET` and `CDN_ENDPOINT` among them (`verification/015/qa-phase1-premises-run1.txt`; values not read).
- **Why the probe reaches the delete.** M8-d's forcing probe sends a well-formed `/generate` request with no browser installed. `generateImage.ts` awaits `deleteMessagePreviewImages` — S3 `ListObjects` + `DeleteObjects` on `CDN_BUCKET` — before it awaits the image, so the delete runs whether or not the launch fails.
- **What it fails to check:** that no probe of this chain can delete or write CDN objects.
- **Asked of the planner:** carry E-1, which binds the implementer now regardless, into M8's verification note.

QAF-1 MEDIUM Phase 1 RESOLVED — folded at rev 6 (`5d516d9`), § M2-a "Standing-suite defect". — `src/utils/__tests__/bugFixCoverage.supplemental.test.ts`, describe "Embed Field Clearing", asserts against a local `const embedShape = z.object({…})`. That is a transcription of `shapes.ts` `embedShape` (the conventions' self-referential-oracle class, Axiom E), on M2's touched surface.
- It already diverges from production: footer `max(2048)` against production's 256 (`MAX_EMBED_FOOTER_TEXT_LENGTH = 256`, `src/constants/index.ts`), and it copies F-12's `color … positive()`.
- **What it fails to check:** the property that the real save schema accepts and refuses what those cases claim. The cases stay green under any change to `shapes.ts`, M2 included.
- **Disposition (implementer, at M2):** rewrite the describe to import `embedShape` from `~/server/api/utils/shapes`, keeping the cases. Each case must be shown red against a one-token mutation of the real schema. The file's module segment `bugFixCoverage` names no production module; its rename is owed under (C) only if the file is otherwise touched.

QAF-2 MEDIUM Phase 1 RESOLVED — folded at rev 6 (`5d516d9`), P3 "The idle cell" and run 2's record. — The P3 population omits a process that has served no request.
- `server.ts` `shutdown()` calls `getPool().drain()`. `getPool()` creates the pool on first call, and generic-pool 3.9.0 autostarts (`PoolDefaults.js` `autostart = true` → `Pool` constructor `start()` → `_ensureMinimum`) with `min = 2` (`getPool.ts` `createPool`). So the first act of draining an idle process is launching two Chromiums.
- **What it fails to check:** P3 ("the process exits as soon as the drain completes") and run 2's drain measurement for a stop of a process that never created a pool. Stop (2) follows the re-run deploy closely, so its process may well be that case. The drain-complete figure would then measure browser launches, not a drain.
- **Asked of the planner:** a cell in P3, or a stated limit. Proposed property: a stop of a process with no pool launches no browser and completes its drain without one. The local probe cell is in § M8 above.

QAF-3 LOW Phase 1 RESOLVED — folded at rev 6 (`5d516d9`), M1-c "Clear-out" and "Ordering"; the no-account cell's expected value is QAF-7. — M1-c's "the DB and Redis clear-out still runs in both cases" names token present and token absent. It does not name a **failed revoke** (a rejected `fetch`, or a non-2xx response) or a **missing account**.
- At the base, a rejected `fetch` aborts `removeUserSession` before the clear-out. A missing account throws `Expected to find account`.
- **What it fails to check:** whether sign-out clears local state while Discord's revoke endpoint fails.
- **Asked of the planner:** add the cell, or state the limit. The implementer will reorder the function, because the token must be read before the revoke, so the ordering is being decided in this chain either way.

QAF-4 LOW Phase 1 RESOLVED — folded at rev 6 (`5d516d9`), M1-d stated limit and X-16. — M1-d's "refused exactly when that count before the insert is ≥ 1000" is undefined under concurrent saves. `upsertMessage` counts, then inserts, without a lock or constraint (architect AF-9a describes the count). Two saves at 999 both pass.
- **What it fails to check:** the cap under concurrency.
- **Asked of the planner:** a stated limit. A fix needs a constraint or a transaction, outside F-4's comparator change.

These five went to the planner as one batch with this document at rev 4 and are folded at rev 6. QAF-6 and QAF-7 (rev 6 re-key) go to the planner as one batch; both are LOW and do not block implementation. QAF-1 also binds the implementer at M2 regardless of the planner's disposition, because it is a standing-suite defect on a touched surface.

## Assumption Not Checked

This pass assumes the live Postgres schema matches the Kysely `DatabaseSchema` type the compile-only M1 tests type against — in particular `ScheduledMessages.error`'s nullability and the `Messages` owner columns `fk_users_id`/`fk_guilds_id` — and does not test it. No database is reachable from this box.
- **Signature of its falsity:** M1's compiled-SQL tests pass, but the locally served tip errors on the message list or on save (B-1, B-2), or in production after deploy (B-7).
- **Owner of closing:** UAT, through B-1 and B-2 on the live database before release.

## Implementation Review (Post-Implementation)

*Phase 2.*

## Test Execution Results

*Phase 2.*

## Handoff

- **Next stage:** the implementer. No session exists yet, so steering gets a spawn cue to start from M0.
- **Planner (through steering):** at rev 4, QAF-1 to QAF-5, now folded at rev 6. At rev 6, QAF-6 and QAF-7, both LOW and non-blocking. B-8's reader is fixed by D19 and L-6.
- **Rev 9 + 10 delta:** passes, except two findings for the planner (deliver to planner-hooks-015). QAF-12 MEDIUM is owed before M1-h's reopened change is reviewed. QAF-13 LOW is owed before the run-2 script extension. Neither holds M2 onward, M1's other cells or the analyst's work outside the restart limb.
- **Rev 8 delta:** passes for M1-c, which releases the implementer's held cells. QAF-10 (MEDIUM) is owed before run 2's script extension, not before code.
- **Rev 7 confirmation:** QA Phase 1 approves rev 7 (`38b12e6`) for implementation start. QAF-8 is owed before the run-2 read is scripted, and QAF-9 is LOW; neither blocks code. *(Superseded line, kept for the record:)* QA Phase 1 approves rev 6 for implementation start. The implementer is bound by E-1 to E-9, E-1's reconcile note included.
- **Assumption Not Checked:** routed to UAT, through B-1 and B-2.
