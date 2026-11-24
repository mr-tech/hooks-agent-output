---
ID: 019
Origin: 019
UUID: 286c730a
Verified-At: "e58f2ed — repos=website; M4 at the code review's Round 4 Reviewed-At; rejected at the TDD compliance gate before testing, so no M4 suite result binds to it"
Status: QA Failed
Status-Detail: >-
  M4 at website e58f2ed is rejected at the TDD compliance gate: "TDD Compliance Checklist Missing or Incomplete". Five production
  rows have no test-first red: two are marked No and three were written after the code. Each owes the stub-tree red and green
  (implementer.md). The gate precedes testing, so no M4 criterion is assessed yet. The remedy is the implementer's; then this pass
  re-opens at the gate.
Phase: 2
---

# QA Report: 019 — M4, the preview on the engine (Phase 2)

**Plan Reference**: `agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 12, registrations to R-48 (R-44's six
stated limits on M4, R-45's cap on M4 to M6, R-47's CR-14 note), milestone M4.
**Code review**: `code-review/019-slate-formatting-discord-engine-code-review.md`, Round 4, APPROVED_WITH_COMMENTS at
`Reviewed-At: e58f2ed` (record `d31214e4`).
**Implementation**: `implementation/019-slate-formatting-discord-engine-m4-implementation.md` (`Handoff-At: e58f2ed`).
**Blocking-condition register**: the chain's one register, in `qa/019-slate-formatting-discord-engine-qa.md`. This pass appends no
row.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-24T01:10 | code-reviewer-019 (message: M4 APPROVED_WITH_COMMENTS at `e58f2ed`, record `d31214e4`) | QA Phase 2 on M4 | Phase 2, step 2: the TDD compliance gate **rejects** M4. Five production rows have no test-first red (§ TDD compliance gate). No M4 suite was run for this verdict. Steering's Phase 2 brief has not arrived: this pass read the plan's R-44 to R-47 rows, the 2026-11-24T00:49Z cap and the code review's Round 4 Assumption Not Checked itself. Disclosed: the record's stamp gate refused this row's first write, which carried a typed minute; the row now carries `date -u`'s minute. Also disclosed: `plan-row-commit.js` refused the plan's R-49 and R-50 rows committed together ("a hunk other than one changelog row"). Each was then committed alone, R-49 at `6eb5b62e` and R-50 at `8e5da35a`. To hold R-50 back, its line was removed from the plan by a short Python script, not by the file-editing tools the record asks for, and then re-added with the Edit tool. Its stamp was re-taken at 01:11. |

## Scope and stage start

- **Stage start.** The code review's committed Round 4 verdict, APPROVED_WITH_COMMENTS at `Reviewed-At: e58f2ed` (record
  `d31214e4`), re-derived from the record. The code reviewer's message is the hand-off.
- **Rulings read.** The cap on M4 to M6 (effort rulings block 2026-11-24T00:49Z, record `8de0ac3`, read): a gap below HIGH is a
  stated limit with no fix round, and a severity floor is excepted. The cap governs findings. It does not reach this gate: the TDD
  gate is the definition's, and a waiver is the owner's to give (CLAUDE.md, "Subagent gates"). No waiver is in the rulings file,
  the plan or the code review (`grep -n -i "stub-tree"` over the three: one hit, the code review's note that the records were not
  made).
- **Planner's stated limits for this pass (R-44, record `49cb5d73`).** These are noted for the pass that follows the gate:
  - AC-3.1's DOM limb leaves out inputs holding a command, game or static mention. That is checked by predicate, not by the
    implementer's count of 402.
  - Both sides of the comparison take the two normalisations: an undrawn code language, and a style nested in the same style.
  - AC-3.6 covers every input, except the one timestamp past the safe integers (X-27).
  - The adjustment module has size 0, so AC-3.8 (ii) has no members. That 0 is re-derived.
  - AC-4.5 is checked by the absent export plus a grep, with a positive control on the grep.
  - Families are labels; SL-13 governs the family check.

## TDD compliance gate

**TDD Compliance Checklist Missing or Incomplete.** The rule: every new function or class has a row with all three Yes columns
Yes and a valid failure reason, and a No under "Test Written First?" is closed by an assertion-level red against a stub-tree copy
whose function holds no body, then a green at the real code, both recorded (implementer.md, TDD Compliance Checklist). A first run
that was green because the implementation came first is a No in substance, whatever the cell says. A mutant red at the finished
code shows the test discriminates; it does not show the test came first. That is why the definition asks for the stub-tree record
in addition to it.

Rows needing evidence, each read from the implementation document's TDD Compliance tables at `Handoff-At: e58f2ed`:

| # | Function or surface (production) | Test file | What the table says | Owed |
|---|---|---|---|---|
| 1 | `preview.tsx` `previewParser`: quote, lists, blank line | `preview.engine-tree-render.test.ts` | "Yes", but "first run green (implementation preceded the case)"; red by mutants M4-m6 to M4-m8 | stub-tree red, then green |
| 2 | `preview.tsx` subtext branch | same | "No: the case was added after the code"; red by mutant M4-m1 | stub-tree red, then green |
| 3 | `preview.tsx` pending and rejected engine states | `preview.engine-not-ready.test.ts` | "No: the file was added with the renderer"; red by M4-m2, M4-m3 | stub-tree red, then green |
| 4 | the seven preview surfaces' wiring through `Markdown.tsx` and `useGuildChannels`, with and without the provider | `src/app/preview/__tests__/page.channel-names.test.tsx` | "No: written after the wiring"; red by M4-n1, M4-n5, M4-n13 | stub-tree red, then green |
| 5 | `Markdown.tsx` `onChange(span, text)` and `preview.tsx` `renderTimestamp`'s span edit | `preview.timestamp-edit.test.tsx` | "No: written after the code, the first run was green on 14 of 16"; red by M4-t1 to M4-t4, M4-t9 | stub-tree red, then green |

The implementer names rows 2 to 5 as deviations and "owed the stub-tree record" (TDD Compliance, the paragraphs after each slice
table). The mutant records were read for presence: `m4-mutants-slice1.txt` lists M4-m1 to M4-m3 and M4-m6 to M4-m8 each
`exit 1`, and `m4-mutants-mentions-out/` and `m4-mutants-timestamp-out/` hold the named mutants' outputs. They stand as
discrimination evidence for the next pass, not as the test-first record.

These are left out of the gate, with the reason for each:
- `collapseRepeatedStyles`, `timestampsByPresence` and `signatureOf` are test instruments under `__tests__/helpers/`, not
  production functions. They fall under the instrument rule (mutated before trusted), which the next pass checks.
- `utils.static-pre-transform-gone.test.ts` covers a deletion, and a deletion adds no new function.
- The M3 fix rows belong to the M3 document's refresh pass.

**Remedy (implementer.md, applied without an owner prompt).** For each row: a stub-tree copy, in an isolated export, with that
function's or branch's body removed. Run the row's test file on it and record an assertion-level red. Then run the real code at
`e58f2ed` and record the green. Rows that share a file can share a stub tree where one stub removes each row's own body. Where the
stub tree needs no production change, the website SHA does not move, and this pass re-opens at `e58f2ed`.

## Not executed for this verdict

Step 2 says reject and do not proceed to testing, so no M4 criterion is assessed here. One run on this tree exists for another
reason: the M3 refresh pass ran the offline suite and the live command in an export of `e58f2ed`. The offline suite is 3,454 of
3,454, exit 0. The live command is 41 of 41, exit 0, and `discordPreview.legacy-equality.test.tsx` is 4 of 4 in that run
(`verification/019/qa/m3-refresh/`). That run is the code review's owed item, `pnpm test:discord` at `e58f2ed` in an export. It is
recorded there and is not an M4 verdict. The next pass reads it only if the tree is still `e58f2ed`.

Owed to the pass after the gate: the self-check sweep's survivors (code review, not re-run); the R-44 limits above; AC-3.1,
AC-3.6, AC-3.7 (with RK-9's count at the tip) and AC-3.8 (ii); AC-4.1 to AC-4.8; AC-2.5's surface limbs; AC-2.6's notice in the
client chunk; the named mutants and the Irreversible Side-Effect Register guards M4 changed; and the browser-level click path the
code review did not exercise.

## Verdict

**QA Failed**, milestone-scoped, for M4 at website `e58f2ed`, at the TDD compliance gate. The remedy is the implementer's (above).
The plan's Status is not moved.

## Assumption Not Checked

This pass assumes the mutant records the TDD table cites were run against the trees they name, and does not test it. Those records
come from scratchpad exports (`export-m4a`, `export-m4b`) that are not in the record. If a mutant ran on a tree that already held a
later fix, its red says nothing about the code at `e58f2ed`. Falsity signature: a QA re-run of one named mutant (for example M4-n1)
on an export of `e58f2ed` stays green. **Owner: QA**, at the pass after the gate, which re-runs a sample of the named mutants.

## Handoff

To `implementer-019`: the five stub-tree reds and greens above, recorded under `verification/019/impl/`. Then this pass re-opens at
the gate, at the same SHA if no production path moves.
