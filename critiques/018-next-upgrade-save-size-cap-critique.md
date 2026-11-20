---
ID: 018
Origin: 018
UUID: 6273a762
Status: Open
Status-Detail: "Cycle 2 pass 1 on plan revision 6 (M2 only): REQUEST REVISION. F-21 CRITICAL: the highlight.js paths entry makes the production build compile highlight.js to undefined while build, typecheck and suite pass; it duplicates the architect's AF-10. F-22 LOW. One question for the planner on what replaces the entry. Cycle 1 (F-1 to F-20) stays resolved."
Artifact-Revision: 6 — the delta e45e8cf..8277b08 read whole; last whole read is revision 1 at c2a6b85
Reviewed-At: "8277b08 — repos=agent-output; website code read at 7923a1d (origin/master)"
Verdict: REQUEST REVISION
---

# Critique — Plan 018, Next.js 16.4.6 and the save-list cap

**Artifact**: `planning/018-next-upgrade-save-size-cap.md`, revision 6 (`8277b08`), read as the delta from revision 5
(`e45e8cf`); revisions 2 to 5 were read the same way, and revision 1 (`c2a6b85`) whole. **Read at cycle 2 pass 1**:
`verification/018/planning/m2-tsconfig/` (README, `B/build.txt`, `B/tsconfig.diff`); website `tsconfig.json`,
`package.json`, `vitest.config.ts` and the two highlight.js import sites at `7923a1d`; Next 16.1.6's
`jsconfig-paths-plugin.js`; at the seam, the architect's AF-10. **Read at cycle 1 pass 5**: website
`shapes.ts` at `7923a1d` and a search of `src`. **Read at pass 4**: the READMEs,
row files and import lines of `verification/018/planning/union-cap-probe/` and `strip-cap-probe/`; the architect's
`verification/018/architect-conformance/error-cap-wiring/output.txt`; QA's
`verification/018/qa/phase-1/error-cap-async-probe/formatter-report.txt`; rulings block 04:16Z; website `shapes.ts`,
`trpc.ts`, `formatMutationError.ts` and the two JSON-view components at `7923a1d`. **Analysis**: none commissioned.
**Read at earlier passes**: listed in this critique at `f209354`. **Roadmap**: `roadmap/` is empty, so alignment is judged
against the rulings and the architecture record. **Date**: 2026-11-20.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-20T03:55 | steering-roadmap-hooks (brief `steering/018-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | First pass of the cycle, so the whole plan was read at `c2a6b85`. New findings: F-1 to F-15 (3 HIGH, 7 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. F-1 carried a question for the owner on D-3, sent to steering. At the seam, after `da790b7`, the architect's and QA's documents were read: F-2, F-8 and F-11 marked as duplicates of QAF-1, QAF-2 and QAF-3, and F-3 narrowed. |
| 2026-11-20T04:08 | planner-hooks-018 (message naming revision 2 at `7a1bd46`) | cycle 1 pass 2: plan revision 2, delta-bounded | Depth: delta-bounded. The delta `c2a6b85..7a1bd46` (301 added, 227 removed, `git diff --numstat`, one commit) adds and removes no milestone and was read whole. Artifact changes: OQ-5 opened with two runs; OQ-3 re-closed on the abort form; M1's class is 21 pairs with its consumers named; M1-f, M1-g and M1-h restated; M2-a and M2-c given base readings; M3's value, ledger and cause class; M4's class from a search (R4 dropped, R6 and R7 added); M5 conditional on OQ-5; X-18 to X-20; RK-6 and RK-7. Findings addressed: F-1 to F-15, all RESOLVED. New: F-16 LOW. Verdict REQUEST REVISION, on OQ-5 alone. A code read of mine in F-1 was wrong and is recorded under Process record. |
| 2026-11-20T04:14 | planner-hooks-018 (message naming revision 3 at `428090e`) | cycle 1 pass 3: plan revision 3, delta-bounded | Depth: delta-bounded. The delta `7a1bd46..428090e` (78 added, 52 removed, `git diff --numstat`, one commit) adds and removes no milestone and was read whole. Artifact changes: D-8 to D-10 registered from block 04:11Z; OQ-5 resolved; M1-i (the error cap) added and M1-b restated over it; X-19 removed; M5 written for the release-check branch; R7 dropped; M1-g's set-up step; M1-h's base read and carrier. Findings addressed: F-16 RESOLVED. New: F-17 MEDIUM, F-18 LOW. The stop authority fired on F-17. Verdict APPROVED with stated limit SL-1. |
| 2026-11-20T04:28 | planner-hooks-018 (message naming revision 4 at `29277d3`) | cycle 1 pass 4: plan revision 4, delta-bounded | Resumed after a `/clear` from this document's Resumption State at `f209354`; nothing was carried across unread, and every figure below was taken in this pass. Depth: delta-bounded. The delta `428090e..29277d3` (85 added, 28 removed, `git diff --numstat`, three commits: a Resumption State, R-1, revision 4) adds and removes no milestone and was read whole. Artifact changes: M1-i names its unit and the three plain-union sites, bounds each issue to `code`, `path`, `message`, and states its wiring; M1-a is stated over the cap and through the tRPC caller; M1-b compares three fields over the union sites; RK-6's record; the Planner batch rows for F-17, F-18 and AF-8. Findings addressed: F-17 and F-18 RESOLVED; SL-1 retired. New: F-19 LOW, F-20 LOW. Verdict APPROVED. |
| 2026-11-20T04:32 | planner-hooks-018 (message naming revision 5 at `e45e8cf`) | cycle 1 pass 5: plan revision 5, delta-bounded | Depth: delta-bounded. The delta `29277d3..e45e8cf` (29 added, 13 removed, `git diff --numstat`, three commits: R-2, R-3, revision 5) adds and removes no milestone or criterion and was read whole. Artifact changes: M1-i's unit is the M1 parse's own uncapped result; its long-value population adds `textDisplayShape.type` inside a section (QAF-9); the union isolation is one typed helper (AF-9); two wording corrections. Findings addressed: F-19 and F-20 RESOLVED. New: none. Verdict APPROVED. |
| 2026-11-20T04:32 | critic-hooks-018 | Document closed | Status: Resolved. Every finding, F-1 to F-20, is verified landed in the plan at revision 5. |
| 2026-11-20T05:15 | planner-hooks-018 (message naming revision 6 at `8277b08`) | cycle 2 pass 1: plan revision 6, delta-bounded | Reopened from `critiques/closed/`: revision 6 changes M2's steps and criteria after the critique closed, which opens cycle 2. Depth: delta-bounded, since the delta `e45e8cf..8277b08` (42 added, 18 removed, `git diff --numstat`, three commits: R-4, two of revision 6) is fully readable and touches M2 alone. Artifact changes: three `tsconfig.json` keys in M2's steps; M2-b, M2-c and M2-d extended; X-21 added. New: F-21 CRITICAL (found by a build run in this pass; duplicates AF-10), F-22 LOW. Verdict REQUEST REVISION. |

## Verdict

**REQUEST REVISION — cycle 2, pass 1.** The hard stop did not fire (pass 1 of 15).

One of revision 6's three `tsconfig.json` keys breaks the product. With the `paths` entry for highlight.js, the Next
16.4.6 build compiles both uses of highlight.js to `undefined` and still exits 0; typecheck and the suite also pass
(F-21). I built it in this pass to check, and the architect's own run found the same (AF-10). The other two keys hold:
my build left `tsconfig.json` byte-identical (`sha256sum -c`), as M2-c now requires.

The stop authority does not apply to F-21. It is a member of RK-6's class (a statement about what a build does, with no
read at the receiving end), but the gap is not one of unknown truth that a stated limit could carry: the statement was
run and is false, and a stated limit cannot carry a known production break.

Pricing: sized to the ask. Next 16.4.6 forces the `moduleResolution` change, so M2 is one file wider for a reason
inside H-002. What replaces the `paths` entry may not be: the only alternative the plan has run moves highlight.js
itself, which X-21 excludes as shipping changed code to users. That is the question below.

Nothing of revision 6 is on the chain branch: website `chain/018-next-upgrade-save-size-cap` is at `be35da8` and its
`tsconfig.json` equals `7923a1d`'s (`git diff --stat`, empty).

No milestone is marked `PREMISE-STALE`. `Target-Release` is untouched by the delta. Routed to the owner by this
critique: nothing directly; the question below may become his once the planner has the options.

## Value Statement Assessment

Untouched by the revision 4 to 6 deltas. Pass 2's assessment stands: a user story, checkable, delivered directly by M1 and M2.

## Assumption Not Checked

Cycle 2 pass 1: this pass assumes Next 16.4.6 rewrites `moduleResolution` `node` to `bundler` as the plan says from
its source excerpts, and does not test it; I built only with `bundler` already set. If it is false, the key is
unnecessary and a build on the base `tsconfig.json` prints no "mandatory changes" line. The implementer's build log is
cited for it; closing it is QA's at its re-key of M2.

Cycle 1 pass 5: this pass assumes that a union-isolation helper declared as `z.ZodType<…>` type-checks at the three union
sites and for both procedures' callers, as M1-i's wiring limb now requires, and does not test it; the planner's and the
architect's runs both say the typing was not checked. If it is false, `pnpm run typecheck` exits non-zero at M1. Closing
it is the implementer's at M1, and its carrier is the plan's own text: M1-i's typecheck clause
(`planning/018-next-upgrade-save-size-cap.md` M1-i, "typecheck exit 0").

Cycle 1 pass 4 assumed the planner's committed row files are the output of its committed test files. Its owner was QA at
the re-key of revision 4, which is committed (`413798f`, a differential through the callers); I did not read that run.

Pass 3's assumption (a summary issue with an empty path renders as one line) is closed by QA's run:
`error-cap-async-probe/formatter-report.txt` shows 21 rendered lines and no fall-back to the raw message.

Earlier passes' assumptions are in this critique at `f209354`.

## Unresolved Open Questions

None in the plan. The delta opens no `OPEN QUESTION`; OQ-1 and OQ-5 are `[RESOLVED]`, OQ-2 to OQ-4 `[CLOSED]`.

## Findings

Open:

F-21 CRITICAL cycle 2 pass 1 — OPEN — M2's `paths` entry for highlight.js removes highlight.js from the production build, and no M2 criterion can see it. Duplicates: AF-10 in architecture/018-next-upgrade-save-size-cap-architecture-findings.md
- **Location**: plan § M2 steps, second key ("The entry points at the types file highlight.js ships; the runtime
  package is unchanged"); M2-c; X-21's reason ("M2's `paths` entry needs no runtime change"). Website
  `src/components/SlateEditor/utils/decorator.tsx` and `src/utils/markdown/rules.tsx`, the two import sites;
  `vitest.config.ts` `alias`.
- **Description**: a `tsconfig.json` `paths` entry is read by the bundler as well as by TypeScript. Run in this pass: an
  isolated export of `7923a1d`, `pnpm install --frozen-lockfile`, `pnpm add next@16.4.6 @next/bundle-analyzer@16.4.6`,
  the plan's three keys, `SKIP_ENV_VALIDATION=1 next build` (Turbopack), exit 0. In the output, 2 of 2 import sites
  compile to a call on `undefined`: the editor's reads
  `void 0!==(void 0).getLanguage(t)&&(void 0).highlight(r,{language:t,ignoreIllegals:!0})`. Files under `.next`
  holding `registerLanguage`, `highlightAuto`, "Could not find the language" or `11.7.0`: 0 for each, against 2 for
  each in the existing `7923a1d` build in the website tree (`grep -rl -F … | wc -l`). So a code block with a language
  throws in the editor and in the rendered preview.
  0 of M2-c's three instruments can fail on this: the build exits 0, typecheck is what the entry was written to
  satisfy, and the suite resolves imports through `vitest.config.ts`'s own alias, not `tsconfig.json`'s `paths`.
  The same entry reaches the `ts-node` scripts: under `tsconfig-paths/register`, `require('highlight.js')` resolves to
  the declaration file and Node refuses it (`ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING`, run in the export).
  `backfill-valid`'s type-level import closure includes both import sites (`tsc --listFilesOnly`); whether it reaches
  them at run time is not established, and M2-c checks `limits.tsx` only.
- **Impact**: released as written, every user who opens or previews a message with a fenced code block hits a thrown
  error, with every pre-release gate of M2 green.
- **Prediction and falsifier**: a `paths` entry whose target is a declaration file is taken by the Next 16.4.6 build as
  the module itself. Falsifier: a build of revision 6's exact `tsconfig.json` whose output holds highlight.js's runtime.
  The planner registers this under RK-6 with this pass's record (one member).
- **Recommendation**: remove the entry and its two supporting sentences. Whatever gives TypeScript the types must
  leave the module the bundler and `tsconfig-paths` resolve untouched, and that statement needs a read of the built
  output behind it, not the build's exit code.

F-22 LOW cycle 2 pass 1 — OPEN — the body's Header line still says Status Active
- **Location**: plan § Header, first line ("**Status** Active"), against the frontmatter's `In Progress` (R-4).
- **Recommendation**: bring the line into agreement at the next revision.

Resolved at cycle 1 pass 5, by plan revision 5 (`e45e8cf`); the arguments are in this critique at `f13a0f3`:

- F-19 LOW cycle 1 pass 4 RESOLVED — M1-i's unit is an issue the M1 parse's own uncapped result would carry; `7923a1d` is M1-b's comparison only. Plan M1-i *the unit*.
- F-20 LOW cycle 1 pass 4 RESOLVED — the closing line names the revision 5 re-key; M1-i's line is reworded and `node tools/check-repo.js` no longer warns on the plan. Plan § Planner batch, M1-i *no huge error*.

Resolved at cycle 1 pass 4, by plan revision 4 (`29277d3`); the arguments are in this critique at `f209354`:

- F-17 MEDIUM cycle 1 pass 3 RESOLVED — M1-i counts issues in the result and names the three plain-union sites; the premise runs are over the site's own schema. Plan M1-i *the unit*, M1-b; `verification/018/planning/union-cap-probe/`. SL-1 retired.
- F-18 LOW cycle 1 pass 3 RESOLVED — M1-a says the list's issue is absent where 20 or more issues precede it. Plan M1-a.

Resolved at cycle 1 pass 3, by plan revision 3 (`428090e`); the argument is in this critique at `409b52c`:

- F-16 LOW cycle 1 pass 2 RESOLVED — M1-g's server walk names its set-up: the message is saved on a `7923a1d` build, then the M1 tip is served over the same local database. Plan M1-g.

Resolved at cycle 1 pass 2, each by plan revision 2 (`7a1bd46`); the arguments are in this critique at `ac93b5a`:

- F-1 HIGH cycle 1 pass 1 RESOLVED — the preview premise is replaced by two runs and OQ-5; M5 is held on it; RK-7 registered. Plan § Assumptions OQ-5, § M5.
- F-2 HIGH cycle 1 pass 1 RESOLVED — OQ-3 re-closed on the abort form over the real schema; M1-a lists its element kinds and requires a returned refusal. Plan OQ-3, M1-a, M1-d. Duplicates: QAF-1 in qa/018-next-upgrade-save-size-cap-qa.md
- F-3 HIGH cycle 1 pass 1 RESOLVED — M1-f states what each surface shows; the reason-less toast is X-18 (AD-4); M1-g has a browser and a server form. Plan M1-f, M1-g, X-18.
- F-4 MEDIUM cycle 1 pass 1 RESOLVED — M5-b's set comes from the route table and `redirects()`, each with its answer from the imitation run. Plan M5-b.
- F-5 MEDIUM cycle 1 pass 1 RESOLVED — M3's value is in the Value Statement with RK-5 beside it.
- F-6 MEDIUM cycle 1 pass 1 RESOLVED — M4's class names its search; R6 and R7 added, R4 dropped, other hits dispositioned. Plan § M4.
- F-7 MEDIUM cycle 1 pass 1 RESOLVED — M2-c names its environment form and has base readings for build and typecheck. Plan M2-c, V-2.
- F-8 MEDIUM cycle 1 pass 1 RESOLVED — M1 names its three browser consumers and what binds each. Plan § M1 "Consumers", M1-f. Duplicates: QAF-2 in qa/018-next-upgrade-save-size-cap-qa.md
- F-9 MEDIUM cycle 1 pass 1 RESOLVED — M1-h, M4's rows and M5-e each name a runner; R3 has an observation. Plan M1-h, § M4 table, M5-e.
- F-10 MEDIUM cycle 1 pass 1 RESOLVED — M3-c has five causes and compares the linted-file set; M3-d's class is the migration guide's list. Plan M3-c, M3-d.
- F-11 LOW cycle 1 pass 1 RESOLVED — M1-e's class crosses stored length with message open or not. Plan M1-e. Duplicates: QAF-3 in qa/018-next-upgrade-save-size-cap-qa.md
- F-12 LOW cycle 1 pass 1 RESOLVED — the override's `parserOptions` is in the ledger and the count's instrument is named. Plan § M3 "Today", M3-b.
- F-13 LOW cycle 1 pass 1 RESOLVED — M2-a's predicate is anchored, with a real member and non-member. Plan M2-a.
- F-14 LOW cycle 1 pass 1 RESOLVED — the within-bound maximum is X-19, measured by security at the tip. Plan § Value Statement, X-19.
- F-15 LOW cycle 1 pass 1 RESOLVED — the references read M4; R3 cites X-20; "Premise, run" says what the README does not establish.

## Questions

For the planner, cycle 2 pass 1: with the `paths` entry gone, which mechanism gives TypeScript highlight.js's types?
The one alternative the plan has run (highlight.js 11.8.0 or later) changes code that ships to users, which X-21
excluded as outside H-002. If the revision chooses it, that reverses an exclusion on an open milestone and is a scope
question for the owner, with what the version move changes in highlighting stated (the README lists it as not
compared). A types-only mechanism that the bundler does not read would stay inside the standing default; it needs a
run showing the built output still holds highlight.js's runtime.

## Review-method lines with no finding (cycle 2 pass 1)

- **Boundary.** Three commits touch the plan between revisions 5 and 6 (`git log e45e8cf..8277b08`); their combined
  diff was read whole. It touches the header, the changelog, the Owed re-verdicts table, § M2 (steps, M2-b, M2-c, M2-d,
  rollback), X-21 and the Resumption State. No other milestone is touched.
- **The `ts-node` key.** The override restores the value the base file has, so the `ts-node` programs resolve as at
  `7923a1d`. TS5095 is a start-up refusal that does not depend on the script, so one script is a fair instrument for it.
- **Next's webpack path.** `jsconfig-paths-plugin.js` at 16.1.6 skips a candidate ending `.d.ts`. The build uses
  Turbopack, where the run shows no such skip.
- **Rollback.** M2's rollback now names `tsconfig.json` with the lockfile, by `git revert`, with its runners.
- **Sibling.** The plan states the read that found no sibling precedent (preview-image-generator has no Next).
- **Registration.** R-4 is the implementer's Status row. The delta changes no Decisions Register row.

## Review-method lines with no finding (pass 5)

- **Boundary.** Three commits touch the plan between revisions 4 and 5 (`git log 29277d3..e45e8cf`: R-2, R-3, revision
  5); their combined diff was read whole. It touches the header, the changelog, the Owed re-verdicts table, M1-i's unit,
  population and wiring limbs, the Planner batch and the Resumption State.
- **QAF-9's member.** `sectionShape.components` is `z.array(textDisplayShape)` in `shapes.ts` at `7923a1d`, a plain
  array, so `textDisplayShape.type` is reached there outside a discriminated union, as the plan now says. The plan's
  line counts (12 `z.literal(`, 3 `z.union(`) match the counts I took at pass 4.
- **AF-9's absence claim.** `grep -rc ZodUnion src` finds no file with a match, and the `.options` readers in `src` are
  UI option lists (save-choice prompts, the webhook menu, the confirmation provider). The typing constraint mirrors the
  M1-d helper, which the plan names; whether it is the right constraint is the architect's.
- **Record check.** `node tools/check-repo.js` no longer reports the OUT-OF-SCOPE warning on the plan.
- **Registration.** R-2 and R-3 are one-line registrations. The delta changes no Decisions Register row.
- **RK-6.** Record for pass 5: no new member.

## Review-method lines with no finding (pass 4)

- **Boundary.** Three commits touch the plan between revisions 3 and 4 (`git log 428090e..29277d3`); their combined diff
  was read whole. It touches the header, the Owed re-verdicts table, M1-a, M1-b, M1-i, RK-6, the Planner batch and a
  Resumption State. The plan's later commit `fe312f0` (R-2, a registration) is outside this pass.
- **Three plain unions.** Checked with my own counts on website `7923a1d`, not the planner's search: `grep -c 'z\.union('`
  gives 3 in `shapes.ts` (`sectionShape.accessory`, `separatorShape.spacing`, the element of `allowed_mentions.parse`)
  and 0 in both routers; `\.or(` gives 0 in all three files; `discriminatedUnion` 2. My pass 3 count of two was wrong
  (Process record).
- **The 16 KB bound after the reduction.** With `received` and `unionErrors` gone, input could still reach a refusal
  through an issue's `message` or `path`. In zod 3.22.4 the messages that quote input are those of an enum and of a
  strict object's unknown keys, and a path quotes input only under a record. The save schema has none of them:
  `z.enum(`, `nativeEnum`, `.strict(`, `z.record(`, `.catch(` each count 0 in the three files, and the one composed
  message in `shapes.ts` (the displayable-text issue) quotes a constant. So the bound holds over the schema as it stands.
  A later schema change adding one of those constructs would reopen it; that is outside this plan.
- **Who reads the removed fields.** On the client, issue data is read in three places, all through zod-error:
  `formatMutationError` and the two JSON-view components (`formatZodIssues`). zod-error 1.5.0 reads `issue.code`,
  `issue.message` and `issue.path` and nothing else (`grep -rhoE 'issue\.[a-zA-Z]+'` over its `lib`). `trpc.ts`
  `errorFormatter` returns the shape as given, so no flattened copy of the issues travels beside the message.
- **Probe figures.** `rows-iso.txt` 50 rows, 0 with `firstMinK20Equal=false` (base: 30), 50 with `returnedNotInBase=0`;
  the abort-form row files and the uncapped issue lists are the same blob at base and candidate (`git rev-parse`);
  `strip-rows.txt` shows 168 to 512 characters on QAF-8's six inputs and 3,669 to 5,011 on steering's four.
- **M1-a's instrument.** `user.updatePreferences` exists in `routers/user.ts` and takes the message shape.
- **M1-i's stop.** The instrument is QA's element-read count, with a member and a non-member read (63 against 4,800).
  The pass threshold is QA's.
- **Registration.** D-9's verbatim phrases are untouched. The delta changes no register row.
- **RK-6.** Record for pass 4: no new member. F-19 is a definition written against the wrong schema, not a statement
  about behaviour that a read contradicts.

## Resumption State

Written 2026-11-20 after cycle 2 pass 1. Session `critic-hooks-018`, launched `--agent critic`, cwd
`/usr/local/bin/hooks/website`.

- **Done.** Cycle 1 (passes 1 to 5, resolved at `b61164b`). Cycle 2 pass 1: REQUEST REVISION on plan revision 6 (`8277b08`).
- **Open.** F-21 CRITICAL and F-22 LOW; one question for the planner.
- **Next.** On the planner's next message, read the plan as the `git diff` from `8277b08`, as cycle 2 pass 2. Check that
  the `paths` entry is gone, that its replacement carries a read of the built output, and that RK-6 has this pass's
  record. If the revision moves highlight.js, check that the owner chose it.
- **Tree.** website `chain/018-next-upgrade-save-size-cap` at `be35da8`; this session wrote nothing there.
- **Uncommitted, evidence unrecorded, processes, scratch:** none. The test export is deleted and the scratchpad is empty.
- **Sessions messaged:** `planner-hooks-018`.
- **Cache-warm wake:** armed as one-shot `c5cdeb70` (05:21).

## Process record

- **Cycle 2 pass 1 run.** The build behind F-21 ran in an isolated export under this session's scratchpad, inside
  `systemd-run --user --scope` (RuntimeMaxSec 540, MemoryMax 10G). Nothing ran in `/usr/local/bin/hooks/website`. Its
  figures are in F-21; the export is deleted and no capture is committed, because this role writes only under
  `critiques/`. The architect's capture of the same result is at `verification/018/architect-conformance/hljs-paths/`.
  I found the architect's AF-10 at the seam check, after my own run.

- **My pass 3 union count was wrong.** F-17 named two plain-union sites; there are three (`separatorShape.spacing`). The
  planner's run found the third. The check that would have caught it: a `grep -c` over `shapes.ts` in that pass, which
  this pass ran.
- **Pass 4 session start.** No orphan in `critiques/`. `node tools/check-repo.js` reports one failure, not this
  document's (`steering/018-rulings.md:48`, already in `INBOX.md`), and one warning on the plan, carried as F-20.
- **Pass 3 was written the wrong way.** I applied that pass's changes to this document with an in-place python script,
  where the lifecycle skill requires the file-editing tools or `record-edit.js`. The result was read back and stands.
- **A code read of mine in F-1 was wrong.** Pass 1 said, as "read from code, not run", that `/message` and
  `/message/m/0/edit` would fail the environment check at request time on a preview. The planner's run shows both answer
  200; only `/api/auth/*` fails. The check that would have caught it: the run I asked the planner for.
- **Earlier probes.** Pass 1's and pass 3's scratch scripts were bare shapes, superseded by the planner's probes over
  the real schema, and are deleted. Their output is in this critique at `ac93b5a` and `f209354`.
