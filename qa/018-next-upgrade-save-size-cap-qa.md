---
ID: 018
Origin: 018
UUID: 6273a762
Verified-At: "7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe — repos=website; Phase 1 reads and probes only, no verdict; probes ran in an isolated export of this commit (shapes.ts blob 1c13ca2 verified equal)"
Status: Awaiting Implementation
Status-Detail: "Phase 1 re-keyed to plan revision 7 (agent-output af8a9d6), M2 only. QAF-1 to QAF-10 resolved; no open QA finding. Register B-9, B-10 appended (M2-e)."
Phase: 1
---

# QA Report: Plan 018 — Next.js 16.4.6 and the save-list cap (H-002, M-001)

**Plan Reference**: `agent-output/planning/018-next-upgrade-save-size-cap.md`, revision 7 (`af8a9d6`). Re-keyed from revision 6
(`8277b08`) by reading the `git diff 8277b08 af8a9d6` of the plan whole (38 lines added, 22 removed, `--numstat`). Revision 7
folds QAF-10, moving highlight.js to 11.12.0 and dropping the `paths` entry. It adds the bundle limb to M2-c and adds M2-e, which
mints B-9 and B-10. Revision 6 was re-keyed from revision 5 (`e45e8cf`) by reading the `git diff e45e8cf 8277b08` whole (42 lines
added, 18 removed). The re-key is owed because M2
has started: the implementer holds it on the `tsconfig.json` finding, and the plan's Owed re-verdicts row names QA on M2-b and M2-c.
Revision 6 changes M2's steps, M2-b, M2-c and M2-d, and adds X-21. It moves no register row. Each earlier revision was re-keyed the
same way: 5 from 4 (`29277d3`), 4 from 3 (`428090e`), 3 from 2 (`7a1bd46`), and 2 from 1 (`c2a6b85`).
**Brief**: `steering/018-brief-qa.md` (`96612e1`); common part `steering/018-brief-common.md`; rulings `steering/018-rulings.md` block
2026-11-20T03:25Z (X-1 to X-15 accepted).
**Architecture read**: `architecture/website.md` W-2, A-1, A-4; `architecture/system-architecture.md` not re-read beyond the plan's
citation of line 110 (nothing in this pass rests on it).
**Roadmap**: absent (`agent-output/roadmap/` holds none; plan header `Epic-Alignment`). No epic criterion moves.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-20T03:43 | steering-roadmap-hooks (brief `96612e1`) | QA Phase 1 on revision 1 | Phase 1: strategy per milestone, populations measured, three probes run in an isolated export of `7923a1d` and captured under `verification/018/qa/phase-1/`; differential instrument for M1-b/M1-c built with its controls; findings QAF-1 to QAF-5 (1 HIGH, 3 MEDIUM, 1 LOW) to the planner; Irreversible Side-Effect Register; blocking-condition register B-1 to B-8; three QA-owned handoffs dispositioned. |
| 2026-11-20T04:12 | planner-hooks-018 (revision 2, `7a1bd46`) | Phase 1 re-key on revision 2 | Phase 1 re-key. The plan's diff was read whole. QAF-1..5 RESOLVED (disposition lines). The planner's abort-form probe was re-tallied (182/182). QAF-6 MEDIUM (R7 cites a superseded 015 row and a fix 015 dropped) and QAF-7 LOW (M1-h's carrier) go to the planner. The differential was extended (1134 labels: b+50, nested kind, the import schema), with the base re-captured and its controls re-run. Production base reads were made over HTTP on hooks.gg (M1-h 51 issues; B-8 minting; Next 16.1.6), which closes the earlier Assumption Not Checked. Zod was shown not to move under the M2 package step. Register rows B-1..B-8 were re-specified with dated reconcile lines; B-4/B-5 are held on OQ-5. |
| 2026-11-20T04:21 | planner-hooks-018 (revision 3, `428090e`) | Phase 1 re-key on revision 3 | Phase 1 re-key. The plan's diff was read whole. QAF-6 and QAF-7 RESOLVED; QAF-8 HIGH to the planner (one issue echoes its input: a 100,000-char `parse` element gives a 301,470-char refusal, so a count cap does not bound the error). M1-i premises run on the async path tRPC uses: same issue order; the stop holds; 21 lines via `formatMutationError`. A read-count instrument separates a real stop (63 reads) from full-then-trim (4800). `compare.py` was moved to M1-b over the cap, with a positive control (68) and a negative control (0). NM-9..NM-13 added. Register: B-2 set-up; B-4/B-5 hold lifted (D-8); B-6 carrier adopted. |
| 2026-11-20T04:30 | planner-hooks-018 (revision 4, `29277d3`) | Phase 1 re-key on revision 4 | Phase 1 re-key. The plan's diff was read whole. QAF-8 RESOLVED. QAF-9 LOW goes to the planner: M1-i's literal-position list misses a section child's text-display `type`, which echoes 100,257 chars from one issue; QA's full enumeration is recorded. Differential v3 now runs through the callers on `code`/`path`/`message`, with plain-union pseudo-sites. Base re-captured (1224 labels); controls 18224 / 84 = 84 / 0. NM-14..NM-17 added. My revision-3 claim that the async stop holds is corrected: one body read as a class, with no rejection watch; plan rev 4 requires a synchronous stop. Register unchanged. |
| 2026-11-20T05:23 | planner-hooks-018 (revision 7, `af8a9d6`) | Phase 1 re-key on revision 7 (M2) | Phase 1 re-key, M2 only. The plan's diff was read whole. QAF-10 RESOLVED. The planner's form-A run (`m2-tsconfig/A-final/`) was read: exit codes are now recorded, the tsconfig diff is the two keys with the end-of-file newline kept, and the runtime markers are present (static 1, server 4). The `(void 0)` receiver count was not taken there, so it moves to Phase 2 under M2-c. M2-e mints B-9 (UAT, local build) and B-10 (post-deploy, hooks.gg). B-10's instrument was shown working at minting by one production read of `/preview`, with 11 `hljs` elements and no error (`m2-hljs-resolution/prod-preview-read.md`). Correction: the revision-6 row's stamp and the probe README's run times were typed ahead of the clock and are corrected. |
| 2026-11-20T05:16 | planner-hooks-018 (revision 6, `8277b08`) | Phase 1 re-key on revision 6 (M2) | Phase 1 re-key, M2 only (stamp corrected at the revision 7 re-key: first written ahead as `05:5x`; the commit is 05:16Z). The plan's diff was read whole. **QAF-10 HIGH** goes to the planner: under form B, Turbopack follows the `paths` entry, so `import hljs from 'highlight.js'` binds to `undefined` in the production bundle. The base build has 0 `(void 0).getLanguage`/`.highlight` call sites and form B has 10; the runtime markers are in 2 files at base and 0 under B. Build, typecheck and suite all stay green (`verification/018/qa/m2-hljs-resolution/`). M2-b and M2-c instruments were re-specified. Assumption Not Checked: form A's bundle binding. Register unchanged. |
| 2026-11-20T04:33 | planner-hooks-018 (revision 5, `e45e8cf`) | Phase 1 re-key on revision 5 | Phase 1 re-key. The plan's diff was read whole (M1-i wording only: F-19, F-20, AF-9, QAF-9). QAF-9 RESOLVED; no open QA finding. QA's long-value enumeration and F-19's unit are recorded under the M1-i instruments. Assumption Not Checked: AF-9's helper keeps the union's issue. Register unchanged. The document body was committed at `cdb71e2` before this row: an anchor miss, so this row is committed on its own. |

## Findings (Phase 1)

QAF-1 HIGH Phase 1 RESOLVED — plan rev 2 M1-a (`null` and nested over-limit kinds; returns, never throws) and M1-d (abort form, OQ-3
re-closed). QA re-tallied the planner's `verification/018/planning/abort-form-probe/rows-abort.txt`: 182 of 182 over-limit S1–S11 rows
carry `issues=1 atList=1 innerPath=false textIssue=false` (the 16 import rows, labelled `S10i`, are counted separately). Argument at
commit `e1b25c7`.

QAF-2 MEDIUM Phase 1 RESOLVED — plan rev 2 M1-g has two surfaces (the JSON view 150 → 1; Save As for the server, because Save's toast
carries no reason, X-18), and the Consumers paragraph names the import schema's binding at S4, S6, S7 and S8. Phase 2 checks the
paste refusal set by the differential's `import` rows (below). B-1 and B-2 are re-specified.

QAF-3 MEDIUM Phase 1 RESOLVED — plan rev 2 M1-e's class is {0, 10, 11, 50} × {id open, no id}, plus the open id at position 11 or later.

QAF-4 MEDIUM Phase 1 RESOLVED — plan rev 2 M4: R5 narrowed to `loading: () => null`, with a UAT walk under throttling as its
instrument. `.render.preload` is dispositioned as having no consumer.

QAF-5 LOW Phase 1 RESOLVED — plan rev 2 M1 class: 21 site-and-procedure pairs; S11 through the router's real input.

QAF-6 MEDIUM Phase 1 RESOLVED — plan rev 3 M4: R7 has left the class, dispositioned as no consumer (015 row superseded at rev 15;
015 D30). Argument at commit `e8f18ef`.

QAF-7 LOW Phase 1 RESOLVED — plan rev 3 M1-h: the after read is a row of devops's Stage-1 post-deploy handoff, with
`Owning-Stage: uat`, and it cites QA's base read. Argument at commit `e8f18ef`.

QAF-8 HIGH Phase 1 RESOLVED — plan rev 4 M1-i *no huge error*: every issue of every refusal (k of 1 included) carries exactly
`code`, `path` and `message`. The 16 KB population includes one long value at each literal position, and S6 at its bound. The
planner's `strip-cap-probe/` shows 168 to 512 characters on QAF-8's inputs, with client lines equal to the base. Argument at commit
`9218925`.

QAF-9 LOW Phase 1 RESOLVED — plan rev 5 M1-i *no huge error*: the population adds `textDisplayShape.type` inside
`sectionShape.components`, cites QA's enumeration, and states the exclusion rule (excluded only where reached as a discriminator).
Argument at commit `413798f`; the enumeration itself now stands under § M1-i instruments, *No huge error*.

QAF-10 HIGH Phase 1 RESOLVED — plan rev 7 M2 drops the `paths` entry and raises highlight.js to 11.12.0 (`^11.12.0`); M2-c carries the bundle limb (markers in `.next/static` and `.next/server`, real member and non-member named; no `(void 0)` receiver); M2-e adds the walked look (B-9, B-10). The original finding follows.
QAF-10 (as raised) — plan rev 6 M2 step 2 (`compilerOptions.paths` `"highlight.js": ["./node_modules/highlight.js/types/index.d.ts"]`)
breaks syntax highlighting in the production bundle, and no M2-c instrument can see it. Turbopack honours tsconfig `paths` for the
modules it bundles. So the bare `import hljs from 'highlight.js'` in `src/utils/markdown/rules.tsx` and
`src/components/SlateEditor/utils/decorator.tsx` resolves to the declaration file, and the default import is `undefined`.
Measured in an isolated export of `7923a1d` with the plan's three keys, Next 16.4.6 and highlight.js 11.7.0
(`verification/018/qa/m2-hljs-resolution/`, `probe.sh`, `summary.txt`):
- `next build` exits 0, with no "mandatory" line.
- The two highlight.js runtime markers are in 2 files at base and 0 under B.
- `(void 0).getLanguage(`/`(void 0).highlight(` call sites: 0 at base, 10 under B. The markdown `codeBlock` rule bundles as
  `if(a.lang&&void 0!==(void 0).getLanguage(a.lang))`.
- The negative control is 0 in both builds.
On that reading, rendering or editing any code block with a language tag throws a TypeError, in the message preview and in the
editor. The page itself was not rendered.
The suite stays green because vitest resolves through its own `alias` and never through tsconfig `paths`
(`rules.multi-line-code-block.test.ts` gets the real library). The `ts-node` scripts load `tsconfig-paths/register`, which maps
the same specifier to the `.d.ts`; any script whose import closure reaches highlight.js is exposed the same way (not run).
**Property to check:** in the production build, the module that `highlight.js`'s importers bind to is the library's runtime. The
instrument is this probe, read as markers present and zero `(void 0)` receivers, with the base as the positive control. It has been
seen red (B) and green (base).
**To the planner:** M2 needs a type fix that the bundler does not follow. One option is form A (highlight.js ≥ 11.8.0, X-21's
trade-off), which this pass has not probed at the bundle (Assumption Not Checked, rev 6). Another is a declaration-only route,
such as an ambient module in `src/@types/`. Whichever form is chosen, M2-c gains this bundle limb.

## Test Strategy (Pre-Implementation)

From the user's side, what can break:
- A signed-in save gets a 500 instead of its error list (QAF-1).
- A save that worked yesterday is refused, at a new bound, with no way to fix it in the editor (M1-f).
- The recent-messages list stops updating, silently: `useUpdatePreferences` has no `onError`, so a refused update shows nothing (M1-e).
- Pages, images or the leave-page guard change under Next 16.4.6 (M2, M4, M5).
- Lint becomes a configuration error rather than a red count (M3).

### Populations, measured (each with its command)

| Criterion | Population | Measured |
|---|---|---|
| M1 class | `z.array(` sites in the save schemas | `git show 7923a1d:src/server/api/utils/shapes.ts \| grep -c 'z.array('` = **11**: S1–S10 plus `discordMessageImportShape.components` (client-only, M1-d). `user.ts` = 2: `recentMessageIds` (S11) and a commented line (`updateMessages`). `guild.ts` = 1, commented (`updateMessages`). `message.ts` = 0. The class is the plan's 11 sites, complete under this predicate. |
| M1-a | site × procedure pairs | 21 (QAF-5) |
| M1-b/c | inputs in QA's differential | Revision 1: 618 labels. **Reconcile 2026-11-20 (plan rev 2):** 1134 labels. 10 sites × 7 lengths {0, 1, b−1, b, b+1, b+10, b+50} × 5 kinds {valid, invalid, null, number, mixed} = 350, plus the `nested` kind (an element whose own list is over its bound) at S4, S9 and S10 = 21, gives 371 per input. That is computed for `upsert`, for `updatePreferences` (+21 S11 labels, 7 lengths × {string, number, null}) and for the client `import` schema: 371 + 392 + 371. The labels are computed per tree (`differential/base-7923a1d.json`, Counter by procedure). |
| M1-e | production users with a stored recent list over 10 | **Not measurable by agents**: the production database URL is the owner's (plan RK-3). The falsifier is a liveness row (B-8). |
| M1-f | stored messages over S4/S6/S7/S8's new bounds | **Not measurable by agents** (RK-3). Stated residue; falsifier is a user report. |
| M2-a | lockfile keys at `7923a1d` (`grep -c` over `git show 7923a1d:pnpm-lock.yaml`) | `next@16.1.6` 16, `@next/env@16.1.6` 2, `@next/swc-[a-z0-9-]*@16.1.6` 16, `next@16.4.6` 0. The instrument reads non-zero at base, which is its positive control. |
| M4 | tests per behaviour (`git grep -l` over `src/**/__tests__/*` at `7923a1d`) | R1/R2: `src/app/message/__tests__/layout.navigation-guard.test.tsx`, `src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx` (StyledLink). R4: `src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx`, `src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx`. R3: none (a stated limit; walk only). R5: **none** (QAF-4). **Reconcile 2026-11-20 (plan rev 2):** R4 has left the class (`beforeunload` ties to no Next version), and its two tests stay in the M2-c suite run. R5 is a UAT walk. R6 is the implementer's read of `layout-router.js`, plus a walk if the read differs; no test covers it. R7 has no test, and its cited fix is not in the record (QAF-6). **Reconcile 2026-11-20 (plan rev 3):** R7 has left the class. M4 is R1, R2, R3, R5 and R6. |
| M5-b | public routes | The plan's set (sweep §4 inventory, plus the two redirects); not re-derived here. |

### Required Unit Tests (M1, Node environment)

- **M1-a, per pair.** For each of the 21 pairs, lists of bound+1 and bound+50 (plan rev 2), for each element kind:
  - valid; invalid of the right type; a wrong primitive; `null`;
  - where the element has its own list, an element whose list is over its bound;
  - a nested `null` at S2, S4 and S10.
  Each case expects exactly one issue for the list: `code` `too_big`, `maximum` the bound as a literal, `path` the list's full path as
  a literal. No issue inside the list, no displayable-text issue, and no throw.
- **M1-b, inside the bound.** Spec cases at lengths b and b−1, with invalid elements: per-element issues as literals (code and path),
  never the schema's output. QA's two-tree differential (below) carries the whole input space.
- **M1-c, refusal sets.** The six sites bounded today: an over-bound list of valid elements is still refused. The five new sites:
  length b accepted, b+1 refused.
- **M1-d.** One shared definition: covered by NM-2/NM-5, which a sweep kills only if every site's case exists.
  - The import schema's top-level list keeps its refusal set: 41 valid top-level components refused, with one issue.
  - QAF-2's limb: a paste at S7 with 101 well-formed ids is refused by the import schema; 100 is accepted.
- **M1-e (hook test, DOM environment):** `usePreferences` mounted with a mocked `useSession`, capturing the argument passed to
  `useUpdatePreferences`. Cases per QAF-3. The expected sent list is literal ids, never a slice computed in the test.

### Required Integration Tests

- One `createCaller` case per procedure (pattern: `message.personal-ownership.test.ts`): an over-bound list answers `BAD_REQUEST`, its
  message parses to an issue list of length 1, and the database records **zero** queries. The base figure through the caller is
  `caller-probe/report.txt`: 51 issues, 0 database touches.
- Control case: an accepted input passes the input stage (base: reaches `authorizeUser`).

### M1-i, the error cap (plan rev 3, D-9) — instruments

His binding phrases: "stops checking after a small number of errors", "returns a short reason", "no save can build a huge error".
Each phrase has its own instrument, all through the procedures' real path. tRPC 11 calls zod 3.22.4's `parseAsync`: `getParseFn` in
`@trpc/server` `dist/initTRPC-*.mjs` finds no `~standard` key, so it takes `parser.parseAsync`.
- **Premise on the async path, run in this pass** (`verification/018/qa/phase-1/error-cap-async-probe/report.txt`; real
  `optionalIdMessageShape`, every list within its bound, 1950 issues):
  - The sync and async parses record the same 1950 issues in the same order. M1-b's "first min(k, 20) in the same order" is therefore
    well defined on the route's path.
  - A contextual error map that throws on the 21st issue stops the async parse there: 21 error-map calls, and 0 calls after the
    throw during a 50 ms wait. The planner's sync premise holds on the async path too.
  - **Correction 2026-11-20 (plan rev 4 re-key):** "holds on the async path too" overstated one body as the class. This run used one
    input and did not watch for unhandled rejections. The planner's async variant (`verification/018/planning/strip-cap-probe/`,
    `strip-report-async.txt`) stopped inside `safeParseAsync` on other bodies. It left three unhandled rejections (vitest exit 1),
    and kept a different first 20 for one body (`steering B_sections_only`).
    - What stands from this run: on a **complete** parse, the sync and async orders are equal, which is all M1-b needs.
    - What does not stand: a stop inside the async parse being safe. Plan rev 4 M1-i *wiring* requires a synchronous stopping parse,
      so this run's conclusion is not relied on anywhere.
    - The method failure: one input, read as a class, with no rejection watch.
- ***Stop checking* is observed from outside the parse by counting reads.** A test calling the procedure cannot inject its own error
  map, because the implementation owns the parse. The instrument is an input whose elements count reads of their properties through
  getters. Run in this pass (`error-cap-async-probe/read-count-report.txt`; 40 containers × 40 invalid text displays):
  - full parse: 4800 reads;
  - full parse then trimmed to 20 (the mutant): **4800** reads;
  - parse stopped at the 21st issue: **63** reads.
  The case asserts the read count stays below a literal far under the full count (for example 200), with its control: the same input
  inside a refused parse that is not capped would read 4800, and the run that installs the case shows that red.
- ***A short reason.*** The procedure answers `BAD_REQUEST`. Its message parses to 21 issues: 20 in base order, then one summary at
  `path: []`. `formatMutationError` renders them as 21 lines, which was run in this pass on the real formatter
  (`error-cap-async-probe/formatter-report.txt`: 21 lines, no fallback to the raw message, 3951 bytes). The summary line renders as
  `Code: custom ~ Path:  ~ Message: …`, with an empty path. That is what UAT will see; it is a wording matter, not a failure.
- ***No huge error.*** The message is at most 16 KB (a literal) on steering's within-bound worst case
  (`verification/018/steering/refute-within-bound/`) and on M1-a's over-limit bodies. Issues created, message length and time are
  recorded beside the base's figures (48,500 issues; 13,324,552 characters), as a measurement outside the suite's pass/fail.
  - **Reconcile 2026-11-20 (plan rev 4/5, QAF-8, QAF-9):** the population also holds one 100,000-char value at each long-value
    member (the plan cites this enumeration).
    - The predicate is a `z.literal(` or `z.union(` position in `shapes.ts` or `routers/user.ts` at `7923a1d`, excluded only where
      it is reached as a discriminator. That is 12 `z.literal(` and 3 `z.union(` lines in `shapes.ts`, none in `user.ts`.
    - Members:
      - `linkButtonShape.type` and `.style`;
      - `textDisplayShape.type` inside a section;
      - `thumbnailShape.type`;
      - `sectionShape.accessory`;
      - `separatorShape.spacing`;
      - the element of `parse`, alone and three at its bound.
    - Excluded as discriminator-only: the `type` of action row, section, media gallery, file, separator and container.
    - Base sizes per member: `issue-size-probe/report.txt`, 100,255 to 904,406 chars. Controls at a discriminator: 325 and 339.
    - Each member's case is a refusal of one issue, which also kills NM-14.
  - **Reconcile 2026-11-20 (plan rev 5, F-19):** k is the M1 parse's own uncapped result. On an over-limit list that is the one list
    issue, so a body with an over-limit list and 25 other issues has k = 26 and is capped. The differential's inputs carry one list
    each, so its rules are unchanged.
- **Edges:** exactly 20 issues → no summary; 21 → 20 + summary; an over-limit list with other issues elsewhere → the list's one issue
  counts toward the 20. The client JSON view stays uncapped: the differential's `import` rows hold the tip equal to the base.

### Acceptance Criteria — the instrument per milestone

- **M1:** the suite cases above. **QA's differential** (built, below) runs at Phase 2 over the tip export against
  `base-7923a1d.json`, using `compare.py`'s M1-a/b/c predicates. Mutation sweep over the M1 production diff (effort-final; the
  implementer's NM runs do not replace it).
- **M2:** `grep -c` per M2-a key form on the committed lockfile; `git diff 7923a1d -- pnpm-lock.yaml` dispositioned per M2-b; `next
  build`, suite and typecheck in an export with its **own** install (never a symlinked `node_modules`: Turbopack refused one at chain
  015, `bug-evaluation-fixes` handoff item 1). The suite is compared by `testResults` path membership and per-file counts against the
  base (1913 cases / 149 files, exit 0), exit code beside the counters.
  **Reconcile 2026-11-20 (plan rev 6):** four instruments are added.
  (1) M2-b `tsconfig.json`: `git diff 7923a1d -- tsconfig.json` at the tip, with every hunk dispositioned against the plan's
  named keys. That includes the end-of-file newline: the planner's `B/tsconfig.diff` drops it, which is a change outside the
  named keys if the committed file carries it.
  (2) M2-c *leaves `tsconfig.json` as committed*: `cmp` of the export's file after `next build` against
  `git show <tip>:tsconfig.json`, beside `grep -c mandatory` on the build log. The positive control is the planner's
  `A/build.txt` (1).
  (3) M2-c `ts-node` check: transpile-only (`-T`) and typed, each with its exit code written beside its output. The planner's
  `tsnode-fixed*.txt` are empty files that carry no exit code. The red control is `B/tsnode.txt` (TS5095, exit 1).
  (4) M2-c bundle limb (QAF-10): `verification/018/qa/m2-hljs-resolution/probe.sh` over the tip's build: the runtime markers
  present and zero `(void 0)` highlight.js receivers, with the base build as the control.
  **Reconcile 2026-11-20 (plan rev 7):**
  (1) now reads two keys (`moduleResolution` `bundler`, `ts-node.compilerOptions.moduleResolution` `node`), with the end-of-file
  newline kept (`A-final/tsconfig.diff`, where it is kept).
  M2-b adds the `highlight.js` 11.7.0 → 11.12.0 mover, checked by `grep -c "^  highlight.js@"` before and after.
  `package.json` changes three specifiers (`A-final/package-specifiers.txt`).
  (4) is now the plan's own M2-c limb. The planner's marker counts for form A (static 1, server 4) were read, not re-run. The
  `(void 0)` receiver count was not taken for form A and is owed at Phase 2 over the tip's build.
  M2-e's two limbs are B-9 and B-10. The editor limb (decorator) needs a signed-in editor. `/preview` mounts no
  `[data-slate-editor]`, so it covers the `codeBlock` rule only.
- **M3:** both configs over the same tree with `--format json`, tallied per rule id by a script (never by a filtered count), never
  `--fix`; exit code 0/1 and never 2.
- **M4:** the M4 tests named above, at 16.4.6; walks B-3 (R1, R2, R3, R5); R6 and R7 by the implementer's source reads, which QA
  re-reads at Phase 2 against `next` 16.4.6's installed files.
- **M5:** B-4, B-5, held on OQ-5. Under the recommended option, M5-d (sign-in redirect) is walked on the local build and joins B-3.

### Named mutants

- **NM-1** (M1-a): the cap lets a parent refinement run over unvalidated elements. Wrong change: S10, S4 or S2 capped in the OQ-3 pipe
  form with `refineDisplayableText` unchanged; an over-bound list holding a `null` throws.
- **NM-2** (M1-a, M1-d): one site keeps `.max()` after element validation. Wrong change: S5's cap left as `.max(MAX_EMBED_FIELDS)`; an
  over-bound list of invalid fields records 1 + n issues.
- **NM-3** (M1-b, M1-c): off by one. Wrong change: one site's bound is `bound - 1`, or is compared exclusively; a list of exactly the
  bound is refused.
- **NM-4** (M1-e): the composer is bounded only on the branch with an open message id. Wrong change: the slice is applied to the
  composed `ids`, and the stored list is sent unchanged when there is no id.
- **NM-5** (M1-d): the shared definition is duplicated per site. Wrong change: the two top-level lists use different forms; caught
  only if the import case and the S10 case both exist.
- **NM-6** (M1-e, M1-c): S11's bound is 10 instead of 11. Wrong change: the server refuses the composer's `[open id, …10 stored]`.
- **NM-7** (M1-a, updatePreferences pairs): the cap reaches `optionalIdMessageShape` and not `partialMessageShape`. Wrong change: the cap
  is applied in a schema only `message.upsert` reads.
- **NM-8** (M1-a): wrong issue path. Wrong change: the cap's issue carries `path: []` relative to the procedure, or the element path.
- **NM-9** (M1-i *stop checking*): the parse completes and the issue list is trimmed afterwards. Wrong change: `issues.slice(0, 20)`
  after a full `safeParseAsync`. Caught only by the read count (4800 against 63), never by the response shape.
- **NM-10** (M1-i, M1-b): off by one at the cap. Wrong change: the stop at the 20th issue, or the summary added at k = 20; caught at
  exactly 20 and at 21 issues.
- **NM-11** (M1-i *short reason*): the summary is added whenever the parse fails. Wrong change: a 3-issue refusal carries a 4th,
  summary issue; caught by M1-b's k ≤ 20 equality.
- **NM-12** (M1-i, reach): the cap is wired into one procedure only. Wrong change: `user.updatePreferences` parses uncapped; caught
  by the differential's `updatePreferences` labels with k > 20 (68 such labels at base, counted over both procedures).
- **NM-13** (M1-i *no huge error*, QAF-8): the cap bounds the count only. Wrong change: the 20 issues are sent as zod built them,
  `received` and `unionErrors` included; one 100,000-char `parse` element returns about 300,000 chars.
- **NM-14** (M1-i *no huge error*, plan rev 4 "k of 1 included"): the strip runs only on the capped path. Wrong change: a refusal of
  20 or fewer issues is passed through unreduced, so one long `parse` element still returns about 300,000 chars. Caught by the
  per-member long-value cases (QAF-9's enumeration), each a refusal of one issue.
- **NM-15** (M1-i *wiring*, per parse): the count lives at module scope. Wrong change: a module-level counter, or `z.setErrorMap`, is
  not reset per parse. Caught by two concurrent refusals (`Promise.all` over two callers, each with 15 issues), which must each keep
  their own 15, and by the second of two sequential refusals.
- **NM-16** (M1-i *wiring*, synchronous stop): the stop is placed inside `safeParseAsync`. Wrong change: the async form of the
  planner's `strip-cap-probe` async variant. Caught by the suite's process exit code (an unhandled rejection exits 1 with every case
  passing; workspace `CLAUDE.md`), and by the differential's first-20 order on steering's sections-only body.
- **NM-17** (M1-a, plan rev 4): the list's issue loses zod's wording. Wrong change: the M1-d helper records its own `message`; caught by
  `compare.py`'s message match, "Array must contain at most <bound> element(s)".

### Testing Infrastructure

- **Capture label note:** in `list-bound-probe/report.txt` the S6 lines labelled "valid" used `'users'`, which S6's element does not admit (it admits `user`, `here`, `everyone`), so those three lines are all-invalid. No finding rests on them. The differential uses `'user'` (corrected before its committed capture).
- **Built:** the M1 two-tree differential, under `verification/018/qa/phase-1/differential/`.
  - `user.save-list-differential.test.ts` (sha256 `4562e07b…` at revision 1) is copied into each export and run with `PROBE_OUT`. It
    reads each procedure's real input via `_def.procedures.<name>._def.inputs[0]`.
  - `compare.py` (sha256 `4b79dcfe…` at revision 1) carries the plan's bounds as literals.
  - Controls on the base capture: `--self-check` finds 5032 over-bound violations (non-zero, as the base must; `self-check.txt`), and
    base-vs-base finds 0 within-bound violations (`base-vs-base.txt`; `grep -c 'within bound'` = 0).
  - **Reconcile 2026-11-20 (plan rev 2):** the instrument was extended to cover M1-a's revised class and the import schema.
    - Test file sha256 `129b6ac6…`: lengths b+50, the `nested` kind, and the `import` procedure over `discordMessageImportShape`.
    - `compare.py` sha256 `05042ae2…`: at S1, S4 and S10, import rows with `null`/`number` elements (which the preprocess drops or, at
      S1 with `null`, throws on) compare tip to base for equality.
    - Base re-captured in a fresh export of `7923a1d` (`shapes.ts` blob `1c13ca2` verified): 1134 labels, exit 0.
    - Controls: `--self-check` 15872 (non-zero); base-vs-base 0 within-bound and 0 import-preprocess violations
      (`grep -c 'within bound\|import preprocess'` = 0).
  - **Reconcile 2026-11-20 (plan rev 3 M1-b over M1-i):** `compare.py` sha256 `a837e1e8…`. Within the bound, for the two
    procedures, the tip carries the base's first min(k, 20) issues plus one summary at `[]` when k > 20. The `import` schema keeps
    exact equality.
    - Positive control: base-vs-base now flags exactly the 68 within-bound labels whose base k > 20 (the count derived independently
      from the capture). An uncapped tip fails the rule.
    - Negative control: a planted tip, capped correctly, gives 0 within-bound violations
      (`differential/planted-capped-tip.txt`).
  - **Reconcile 2026-11-20 (plan rev 4 M1-a, M1-b, M1-i wiring): version 3, driven through the callers.** Test file sha256
    `d597c91a…`; `compare.py` sha256 `6dd66ac7…`.
    - Each input goes through `messageRouter`/`userRouter` `.createCaller`, not `_def.inputs[0]`, so whatever wraps the procedures'
      input at the tip is exercised.
    - Each refusal is read as tRPC's message JSON and reduced to `code`, `path` and `message`. "Accepted" means the call reached the
      database proxy's sentinel ("past the input stage").
    - M1-a's list issue is matched on `message`, zod's "Array must contain at most <bound> element(s)".
    - Two pseudo-sites carry the plain unions, failing alone and mixed: UA (section accessory) and US (separator spacing), with
      n ∈ {1, 6, 20, 21, 40} top-level components, always within S10's bound.
    - Base re-captured in a fresh export of `7923a1d` (`shapes.ts` blob `1c13ca2` verified), exit 0: 1224 labels (401 `upsert`, 422
      `updatePreferences`, 401 `import`). 390 inputs were accepted; the only throws are the six known `import S1 … null`.
    - Spot reads: `S11 n=61 string` accepted at base; `UA n=21 invalid` refused with 21 `invalid_union` issues.
    - Controls: `--self-check` 18224 (non-zero). Base-vs-base flags 84 within-bound labels, equal to the independently counted
      within-bound procedure labels with k > 20, and 0 import-preprocess labels. A planted, correctly capped tip gives 0
      (`planted-capped-tip.txt`).
  - **Residue, outside the class:** the base capture shows `discordMessageImportShape` throws `TypeError` on a `null` button inside an
    action row (6 labels, `import S1 n≥1 null`): `filterActionRowButtons` reads `button.type`. This happens only on the client. The
    JSON view's `useEffect` catches it and shows the raw message as its error. Not a finding: it is pre-existing, client-only on the
    user's own paste, caught, and outside M1's lists. The differential holds the tip equal to the base there.
  - The instrument is mutated before its Phase 2 result is trusted, as the record rules require: a hand-planted tip JSON with one
    within-bound issue changed must fail, recorded at Phase 2.
- **TESTING INFRASTRUCTURE NEEDED: a local build stack for the walks (B-1, B-2, B-3).**
  - No Postgres listens on this box (`ss -ltn`, read 2026-11-20 before 03:43Z: only `127.0.0.1:6379`, which is another party's Redis and not ours to use).
  - The record's `tools/uat-local-stack.sh` stands one up. The walk's stage runs it, with its own Postgres and Redis, and removes them
    on exit.
  - The message-id `ALTER SEQUENCE` is run before the first save (workspace rule). Before that, the walk reads the key **names** in
    `.env.local` for the preview-bucket and generator settings. A local save calls the preview continuation, and whether that reaches
    production's bucket is `UNVERIFIED` (register E-4).
- **TESTING INFRASTRUCTURE NEEDED: M1-e's hook test.** `next-auth/react`'s `useSession` and `~/utils/hooks/useUpdatePreferences` are
  mocked at the module boundary. The capture records the argument only, and invents no store.

### Entry conditions (probe shapes, for the implementer)

1. Before building the cap, run it under the message-level refinement: the real `discordMessageShape` refinement over a capped S10 holding
   one `null` at length 41. The comparand (one `too_big` issue, no throw) must exist on that path before any M1-a test consumes it
   (QAF-1).
2. Before writing M1-e's cases, drive `usePreferences` with no message id and a stored list of 50, and record what reaches
   `useUpdatePreferences` (QAF-3).

## Irreversible Side-Effect Register

| # | Effect | Must hold before it fires | Every route enforces it identically? | Read that established it |
|---|---|---|---|---|
| E-1 | `message.upsert` writes `Messages`, then publishes on Pusher and starts the preview continuation | Session; input validated, with an over-bound list refused before any write | Yes, by framework: `protectedProcedure` then `.input(...)` before `.mutation`. The probe touched the database 0 times on refusal (`caller-probe/report.txt`). M1 moves only what the input stage refuses. | `message.ts` `upsert` (`.input(z.object({ message: optionalIdMessageShape }))`); caller probe |
| E-2 | `user.updatePreferences` overwrites `Users.preferences` (merge of old and new) | Session; input validated (S11 bound) | Same mechanism as E-1. One route. | `user.ts` `updatePreferences`; caller probe (0 touches on refusal; the control reached `authorizeUser`) |
| E-3 | A save request that crashes in validation (NM-1) returns 500 | Refused with an issue list, no throw | Not yet: depends on AD-1's form (QAF-1). **Reconcile 2026-11-20 (plan rev 2):** the abort form (M1-d) holds on the planner's run (0 throws in 288 rows, re-tallied by QA); the tip is checked by the differential at Phase 2. | `list-bound-probe/report.txt`; `verification/018/planning/abort-form-probe/` |
| E-4 | A local-build save during a walk publishes `message-update-<id>` on the Pusher app in `.env.local`, and may upload a preview to the configured bucket | Message ids moved to 900000000000001+ before the first save; the bucket key names read | Pusher: the workspace rule governs. Bucket target: `UNVERIFIED` (key names not yet read). | `CLAUDE.md` "Local builds of `website`"; `previewBucket`/`previewImage` modules named, not read |
| E-5 | Preview push (M5) deploys a Vercel preview that shares production's Discord and Pusher keys | No sign-in completed on the preview; no save possible (no Postgres) | M5-d stops at Discord's authorise page. A save on the preview cannot reach Pusher without a database: `UNVERIFIED` against `shared.ts` ordering. | common brief hazard 7; plan M5-d |
| E-6 | Release: website `master` push deploys production | Owner's word; QA Phase 3 record; `release-move.js` | Devops's one route | plan Release; Header (`release-move.js … --dry-run`) |
| E-7 | M1-h's production write attempt (B-6) | The payload is refused at both trees, so nothing is written | Yes at base through the caller (51 issues, 0 touches); over HTTP not yet run. **Reconcile 2026-11-20:** run over HTTP on hooks.gg: 400 `BAD_REQUEST`, refused at input. | `caller-probe/report.txt`; `prod-base-reads/README.md` |

## Blocking-Condition Register (this chain's; later passes append here)

Standing note: this register is point-in-time. The UAT document, and then the deployment record, are authoritative on each row's
execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | M1-g as restated by QAF-2: the JSON view shows the paste's issues | Browser walk on the local build: paste `allowed_mentions.users` with 150 invalid ids into the JSON view; count the error lines | UAT through the stage browser, test account / owner | Local build at the M1 tip; stack per Infrastructure | Tip: 1 line naming 100. Base: 150 lines (measured through the client schema). One observation decides it. | If 150 lines still show, the cap never reached the client schema the editor uses. | uat | The UAT pass to be briefed (`uat/018-…-uat.md`) | Open; depends on QAF-2's restatement. **Reconcile 2026-11-20:** the restatement landed (plan rev 2 M1-g, *Browser* limb; "150 malformed ids … one error line … where `7923a1d` shows 150; no request is sent"). The row settles M1-g's browser limb. |
| B-2 | observable pre-release | Server refusal of a message already in the editor (QAF-2 limb) | Walk: a message with 150 well-formed user ids, seeded in the local database (id ≥ 900000000000001) or as a draft from a base-build session on the same origin; press Save. **Reconcile 2026-11-20 (plan rev 2 M1-g *Server* limb, M1-f, X-18):** the action is **Save As**, not Save. Save shows only the reason-less toast "Error. Failed to save message. Please try again." Load the message before opening the JSON view. | UAT / owner | Local build at the tip; seeded row | Tip: one line from Save naming the 100 bound; nothing written. Base: saves. **Reconcile 2026-11-20:** "Save" reads "Save As". A second observation under the same seed: Save shows the fixed toast, which is X-18's stated limit and not a failure. | If Save succeeds, the server cap is absent on the save path the editor uses. If several lines show, the cap is not length-first. | uat | The UAT pass to be briefed | Open. **Reconcile 2026-11-20:** QAF-2 landed (rev 2). The row settles M1-g's server limb. **Reconcile 2026-11-20 (plan rev 3 M1-g set-up):** seeding as the plan states it.
On a local build of `7923a1d`, paste the 150-id message into the JSON view and save it there, which succeeds. Then serve the M1 tip
over the same local database (ids ≥ 900000000000001), open that message without opening the JSON view, and use Save As. Predicted
at the tip: one line naming 100, inside M1-i's cap. |
| B-3 | observable pre-release | M4-a walks: R1 (leave-page guard, both Cancel and confirm), R2 (external link interception), R4 (`beforeunload` with unsaved edits), R3 recorded either way | `browser-walker`, signed in, local build at the M3 tip | UAT / owner | Local build at the M3 tip | R1, R2 and R4 behave as at 16.1.6. R3: recorded, no prediction. | A link click with unsaved edits navigates without asking, so the user loses edits. | uat | The UAT pass to be briefed | Open. **Reconcile 2026-11-20 (plan rev 2 M4):** R4 has left the class, so the walk is R1 (Cancel and confirm), R2, R3 (the browser's back with unsaved edits; record whether a confirmation appears) and R5 (network throttled; the editor shell stays rendered while a lazy child is pending). M5-d's sign-in redirect joins under OQ-5's recommended option (reaches Discord's authorise page; stop there). Captures go to `verification/018/uat/local/`. The row settles M4-a and M5-d. |
| B-4 | observable pre-release | M5-b/c/d on the preview: public pages 200, two redirects, images 200 with an image type, sign-in reaches Discord's authorise page and stops | Anonymous browser walk of the preview URL | UAT / owner | Preview `READY` at the tip (B-5) | All 200 / redirect / authorise as the plan states | A page that 500s on Vercel at 16.4.6 and not locally ships to every visitor. | uat | The UAT pass to be briefed | Open; depends on B-5. **Reconcile 2026-11-20 (plan rev 2 M5, OQ-5):** held on OQ-5. Under the recommended option, the walk covers the release-check branch's preview: `/`, `/legal/privacy`, `/legal/terms`, `/preview`, `/message`, `/message/m/0/edit`, `/message/m/0/send` 200; `/support` 308; `/message/m/<n>` 307; images 200. `/api/auth/*` 500 is recorded and is not a failure. M5-d moves to B-3. Re-specified at OQ-5's answer. The row settles M5-b and M5-c. **Reconcile 2026-11-20 (plan rev 3, D-8):** OQ-5 is answered as the release-check branch, so the hold is lifted and the row stands as written above. |
| B-5 | observable pre-release | M5-a: the preview deployment is `READY` and its `githubCommitSha` is the tip | `vercel api` read (read-only) | devops / none | After the chain branch push | `READY`, SHA equal | A build that fails only on Vercel. | devops | The deployment record | Open. **Reconcile 2026-11-20 (plan rev 2 M5-a, OQ-5):** held on OQ-5. Under the recommended option it is `READY` at the release-check head, the tip's child, and `git diff --name-only <tip> <head>` prints `vercel.json` alone. A plain push of the tip is predicted not to reach READY (RK-7). The row settles M5-a. **Reconcile 2026-11-20 (plan rev 3, D-8):** the hold is lifted and the row stands as written. |
| B-6 | post-deploy-observable | M1-h: one test-account `message.upsert` with 50 invalid embeds on hooks.gg | The HTTP response's tRPC error message, parsed as the issue list; count | QA or UAT through the stage browser signed in to hooks.gg as the test account / owner | The serving production deployment's commit contains the release tip (containment, via `vercel api`) | Tip: 1. Base: 51 (through the caller, `caller-probe/report.txt`; over HTTP not yet run). One observation decides it. | If 51, production is not serving M1. | qa | `handoff/<name>.md`, created by devops at Stage 1 | Open; HTTP minting read owed at the first executor run (browser held at Phase 1, below). **Reconcile 2026-11-20 (plan rev 2 M1-h):** the base read is **done** over HTTP on hooks.gg, 2026-11-20T04:09Z, while production served Next 16.1.6: `POST /api/trpc/message.upsert` → 400 `BAD_REQUEST`, 51 issues (`prod-base-reads/README.md`). The instrument works at minting, so the predicted base value of 51 is confirmed. The executor after release is UAT, so the Owner cell reads **uat**. The carrier stays devops's Stage-1 handoff (QAF-7). The row settles M1-h. **Reconcile 2026-11-20 (plan rev 3 M1-h):** the plan now names this carrier, with `Owning-Stage: uat`, and cites the base read. QAF-7 is resolved. |
| B-7 | post-deploy-observable | M5-e: hooks.gg's page script carries `window.next={version:"16.4.6"` | `curl` of hooks.gg plus `grep -c` (the planner's instrument, non-zero today for 16.1.6: `verification/018/planning/prod-next-version-pre.txt`) | devops or QA / none | The release deployment serving | 16.4.6 count ≥ 1, and 16.1.6 count 0 | 16.1.6 still served means H-002 is not closed in production. | qa | `handoff/<name>.md` by devops at Stage 1 | Open. **Reconcile 2026-11-20 (plan rev 2 M5-e):** the plan runs the after read by devops after the push (a public GET), so the Owner cell reads **devops**. At 04:09Z, `window.next.version` on hooks.gg read `"16.1.6"` (`prod-base-reads/README.md`, item 2), a second instrument beside the planner's capture. The row settles M5-e. |
| B-8 | post-deploy-observable (liveness beside S11's limit) | The recent list keeps updating after release, for the test account | Session read on hooks.gg (`/api/auth/session`, `user.preferences.recentMessageIds`, length and first id only). Open message A, then message B. Control: B's id moves to first place. | QA through the stage browser / owner | After release, same condition as B-6 | First id = the message last opened; length ≤ 11 | If the first id does not move, updates are refused silently (no `onError`): the recent list freezes for users. | qa | `handoff/<name>.md` by devops at Stage 1 | Open; minting read not done at Phase 1 (cause: browser held by another session, lock read 2026-11-20 before 03:43Z, `holder`). **Reconcile 2026-11-20:** minting read done at 04:09Z: `/api/auth/session` → 200, signed in, `recentMessageIds` an array of length 10 (`prod-base-reads/README.md`, item 1). The row settles M1-e's liveness (declined work, S11). |
| B-9 | observable pre-release | M2-e, local build: a message with fenced ` ```js `, ` ```ts ` and ` ```diff ` blocks renders highlighted, with no error, (a) in the editor's text (decorator) and (b) in the message preview (`codeBlock` rule) | Count of elements whose class contains `hljs-` within each surface, plus console errors, read by `browser_evaluate`. Limb (b) can also be read on `/preview?data=…` (URL in `m2-hljs-resolution/prod-preview-read.md`). | UAT through the stage browser signed in as the test account, on a local build at the M2 tip, which can drive both surfaces / owner | Local build at the M2 tip, under the local-build rule, in the same session as M1-g | (a) and (b): each > 0 with token classes (`hljs-keyword`, `hljs-number`, `hljs-addition`/`hljs-deletion`); "Invalid message data." absent; 0 console errors. One observation refutes by construction: the `paths` form gives 0 or the error boundary. | A user's code block renders as plain text, or the editor crashes on a code block with a language tag. | uat | The UAT pass to be briefed | Open. Settles M2-e (local limb). Depends on QAF-10's form: a later return to a `paths` entry makes this row decisive. Minted 2026-11-20T05:23. |
| B-10 | post-deploy-observable | M2-e after deploy: the same look on hooks.gg | `browser_evaluate` on `https://hooks.gg/preview?data=…` (the URL committed in `m2-hljs-resolution/prod-preview-read.md`), counting elements whose class contains `hljs` and reading for "Invalid message data."; the editor limb on a signed-in editor page, without saving | QA or UAT through the stage browser, test account for the editor limb / owner | The serving production deployment's commit contains the release tip (containment, via `vercel api`), as for B-6 | `/preview`: 11 `hljs` elements and the same 7 classes as at minting (2026-11-20T05:22Z, Next 16.1.6, 11 elements, 0 errors), give or take the finer 11.12.0 classes `hl-compare` names; no error boundary. One observation decides it. | Production renders users' code blocks unhighlighted or breaks the preview page. | uat | `handoff/<name>.md`, created by devops at Stage 1 | Open. Settles M2-e (deploy limb). The minting read ran read-only (no sign-in, no save). Minted 2026-11-20T05:23. |

## Open handoffs (Owning-Stage qa), dispositioned at Phase 1

- **`handoff/mutant-equivalence-by-argument-unverified-2026-11-19.md`.** Its trigger is the diff touching `leaveWithoutAlert.ts`,
  `messageDrafts.ts`, `withLocalStorage.ts`, `StyledLink.tsx` or `generateImage.ts`. It has not fired: no planned step edits those
  files. It can fire through M4-b, whose permitted fix is "confined to the surface 017 or 004 built", and `StyledLink.tsx` is R2's
  surface. Phase 2 entry check: `git diff --name-only 7923a1d..<tip>` against the five paths. On a match, survivors #1 and #6 are QA's
  in that pass.
- **`handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md`.** The trigger ("next website effort scoped") has fired. Per item:
  - #1 (export with a symlinked `node_modules` behaves as the shared tree): touched. Every run of this chain is in an export with its
    own install, so the symlink variant does not arise. The export ≡ shared-tree premise is still assumed, because a shared-tree run is
    barred until the branch is cut. The item stays carried.
  - #2–#8 (jsdom focus, `/generate` callers, thread `guild_id`, ioredis, generic pool, generator corpus, cross-guild read): none lies on
    this chain's surfaces; each stays as carried.
  - A row is written in its changelog.
- **`handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md`.** The trigger ("QA next runs") has fired again. Nothing
  QA-owned remains: item 1 was discharged 2026-11-11, and items 2 and 3 are the analyst's and the record vocabulary's. A row is written
  in its changelog. That the `Owning-Stage: qa` routing re-fires every QA pass is lodged in `INBOX.md` for steering.

## Assumption Not Checked

This pass assumes that the probes' export at `7923a1d` (its own `pnpm install --frozen-lockfile`, zod 3.22.4) parses as the
production bundle does, and does not test it. A production `message.upsert` over HTTP would show a different issue count from the
caller probe's 51 if it were false. B-6's first executor run closes it (owner: qa, at the B-6 read).
**Closed 2026-11-20 (re-key):** run over HTTP on hooks.gg, 51 issues (`prod-base-reads/README.md`).

**Re-key on plan revision 2.**
- **A premise run in the pass, not assumed:** the abort form rests on zod 3.22.4's `lib/types.js`. In the base export,
  `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6` (exit 0) leaves the `^  zod@` lockfile keys unchanged: `zod@3.22.4`,
  `zod@3.25.76` and `zod@4.6.7` before and after, 6 lines each. The installed `zod` is still 3.22.4
  (`verification/018/qa/phase-1/zod-under-m2/`).
- **Assumption Not Checked:** this pass assumes, and does not test, that a preview built with `SKIP_ENV_VALIDATION=1` at build time (OQ-5's
  recommended form) serves the same pages and images as the chain tip's own build. The two differ only by that variable at build time,
  and `env.mjs` also reads `VERCEL`/`VERCEL_URL`/`VERCEL_ENV`, which the planner's imitation did not set. The signature of its falsity
  is a page or redirect answering differently on the preview than on the local build at the tip. Owner: UAT, at B-4 against B-3's
  local-build captures, once OQ-5 is answered.

**Re-key on plan revision 3.** This pass assumes, and does not test, that the tRPC HTTP handler sends a **capped** refusal's
message over the wire exactly as the caller returns it. That was seen for the uncapped 51-issue refusal at 04:09Z, but not for a
message built by M1-i's wrapper, which does not exist yet. The signature of its falsity is an issue count or message size over HTTP
that differs from the caller's at the tip. Owner: QA at Phase 2 (one HTTP read against the local build at the tip), then UAT at B-6.

**Re-key on plan revision 4.** This pass assumes, and does not test, that the differential's caller context reaches the input stage
through the same middleware as the HTTP route. That context is a session object with `guilds: []`, a database proxy and an empty
`req`. If the tip adds a middleware ahead of input validation that reads a context field the probe fakes, the differential would read
that middleware's outcome as a refusal or an acceptance. The signature of its falsity: at the tip, a label whose caller result
disagrees with one HTTP read of the same input on the local build. Owner: QA at Phase 2, on the same local-build HTTP read owed
above.

**Re-key on plan revision 5.** This pass assumes, and does not test, that AF-9's union-isolation helper (one helper at the three
plain-union sites, declared as `z.ZodType<…>`) records, within the bound, the same issue the plain `z.union` records at `7923a1d`:
`invalid_union`, at the union's path, "Invalid input". No such helper exists to run yet. The signature of its falsity: at the tip,
the differential's UA, US or S6 within-bound labels differ from the base on `code`, `path` or `message`. Owner: QA at Phase 2, by the
differential (v3), which carries those labels.

**Re-key on plan revision 7.** This pass assumes, and does not test, that highlight.js 11.12.0's decorator path in the editor
(`hljs.highlight(...)._emitter.rootNode`, an internal field, cast in `decorator.tsx`) still produces the leaf decorations the
editor renders. The planner's `hl-compare` shows the tree keeps its shape in 18 of 18 samples, run in Node outside the editor. The
signature of its falsity: at B-9, the editor's text shows no `hljs-*` classes on a ` ```js ` block while the preview shows them.
Owner: UAT at B-9.
The revision-6 line below is partly closed: the planner's `A-final/counts.txt` shows the runtime markers present under form A. The
`(void 0)` limb is still open, owner QA at Phase 2 (M2-c).

**Re-key on plan revision 6.** This pass assumes, and does not test, that form A (highlight.js 11.12.0, no `paths` entry,
`moduleResolution` `bundler`) binds highlight.js's runtime in the production bundle. The planner's run shows its build, typecheck
and suite pass, which cannot see the binding (QAF-10). The signature of its falsity: the m2-hljs-resolution probe over a form-A
build finds zero marker files or a non-zero count of `(void 0)` highlight.js receivers. Owner: the planner, if revision 7 adopts form A
(the probe is runnable as committed); otherwise QA at Phase 2, by the same probe over the tip.

## Implementation Review (Post-Implementation)

Not started (Phase 2).

## Resumption State

Written 2026-11-20T04:34Z at steering's checkpoint request, by session `qa-hooks-018`, cwd `/usr/local/bin/hooks/website`.

- **Standing for M2 (steering ruling `steering/018-rulings.md` block 2026-11-20T05:26Z, `44efb1f`):** M2 is capped. Each further M2 gap below HIGH goes to the plan's Planner batch as a stated limit, with no revision round; a severity-floor finding (an unasserted preserved behaviour, MEDIUM floor) is excepted. Code review of M1 is running at `Handoff-At` `f9e66c2` (code-reviewer-hooks-018). Its committed verdict starts Phase 2 on M1, run in an export of the reviewed SHA because the shared tree moves under M2.
- **Re-key on revision 7 (2026-11-20T05:23Z):** QAF-10 RESOLVED; B-9 and B-10 appended; the browser is closed and its caches emptied after the 05:22Z `/preview` read. No QA finding is open.
- **Re-key on revision 6 (2026-11-20T05:16Z, after a `/clear`; stamp corrected, first written ahead):** QAF-10 HIGH went to the planner; evidence is in
  `verification/018/qa/m2-hljs-resolution/`, and its exports are deleted. Phase 2 adds the M2 instruments (§ Acceptance Criteria,
  M2 reconcile).
- **Done:** Phase 1 on plan revisions 1 to 5. The last re-key is on revision 5 (`e45e8cf`), committed at agent-output `cdb71e2` and
  `0160d45` (changelog row). QAF-1 to QAF-9 are RESOLVED; no QA finding is open. Status: `Awaiting Implementation`. Steering was
  told there are no findings (message to `steering-roadmap-hooks`, after `0160d45`).
- **Next (Phase 2, after code review's committed verdict):**
  1. Read the plan as the `git diff e45e8cf..<revision then current>`.
  2. TDD Compliance table first.
  3. List the criteria the pass will assess before running anything.
  4. Run the suites, with exit codes, in an isolated export of the tip with its own install, compared with the base's 1913 cases in
     149 files by path membership.
  5. Run differential v3 (`verification/018/qa/phase-1/differential/`, test file sha256 `d597c91a…`, `compare.py` `6dd66ac7…`) in
     a tip export against `base-7923a1d.json`. Mutate the instrument first, with a planted tip.
  6. M1-i: the read-count case (63 against 4800), the long-value enumeration (§ M1-i instruments), the concurrency and
     exit-code checks (NM-15, NM-16), and the 16 KB measurement against steering's bodies.
  7. One HTTP read on a local build of the tip. This closes the revision-3 and revision-4 Assumption Not Checked lines, and the
     local build follows the workspace's local-build rule.
  8. Mutation sweep over the effort's production diff (`node ~/.claude/tools/mutant-gen.js`, plus NM-1 to NM-17), in an export,
     with runs delegated to a helper.
  9. Handoff entry check: `git diff --name-only 7923a1d..<tip>` against the five paths of
     `handoff/mutant-equivalence-by-argument-unverified-2026-11-19.md`.
- **Approach in flight:** none.
- **Trees:** website's shared tree is now on `chain/018-next-upgrade-save-size-cap` at `7923a1d` (steering cut it; read at this
  write). Nothing of this session is uncommitted in agent-output. No website file was edited by this session.
- **Scratch:** no export is left (each one was deleted after its run). Scratchpad holds only plan diffs, record-edit JSON and install
  logs, none of them cited as evidence.
- **Evidence:** every run this document cites is committed under `verification/018/qa/phase-1/`. These are `list-bound-probe`,
  `caller-probe`, `differential`, `prod-base-reads`, `zod-under-m2`, `error-cap-async-probe` and `issue-size-probe`. One file is
  not committed: `zod-under-m2/add.log`, which `.gitignore` excludes (`*.log`); its result is in `before.txt` and `after.txt`.
- **Browser:** closed, with its caches emptied, after the 04:09Z production reads.
- **Questions out:** none. **Sessions messaged:** `planner-hooks-018` (findings on revisions 1 to 4), `steering-roadmap-hooks`
  (no findings on revision 5).
