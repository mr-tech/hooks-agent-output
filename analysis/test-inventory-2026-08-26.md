---
UUID: 4e9b17c3
Status: Active
---

# Hooks test inventory — the 48 files, classified

## Changelog

| Date | Change |
| ---------- | ------------------------------------------------------------------ |
| 2026-08-26 | Created. Full inventory of `website`'s 48 test files against the coordination plan's rubric. Static analysis only; suite not executed. |

## Question

For the Hooks workspace, which existing test files are useful evidence and which are junk, by the
classification in the approved coordination plan at
`/home/dev/.claude/plans/we-recently-changed-the-wobbly-sparrow.md` (sections "Context", "Owner
rulings", "The rubric"; classes H1–H3 and J1–J6)?

This document is ID-less and is never promoted. A planner citing it mints its own ID.

## Context

`/usr/local/bin/hooks` is four sibling repos: `website`, `project-utils`, `preview-image-generator`,
`agent-output`. **Only `website` carries tests.**

- Runner: vitest. `website/vitest.config.ts` sets `include: ['src/**/*.test.ts']`,
  `environment: 'node'`, and aliases `~` → `src`, `bot` → `bot`.
- `environment: 'node'` and the `.ts`-only include together mean **no DOM harness and no `.tsx`
  test is ever collected**. Two files work around this with a hand-rolled `render()` (see
  Unclassified 8).
- No CLAUDE.md anywhere under `/usr/local/bin/hooks`. Confirmed by `find`.
- No CI runs the suite. (Out of scope per owner ruling 3; recorded only because it is why nothing
  has ever forced these files to stay honest.)
- `agent-output/.next-id` reads `14`. **Not read for allocation and not incremented** — recorded
  because a planner will need it, and reading it is not minting.

Scope boundary observed: read-only over all source. No test was deleted, renamed or edited. The
suite was **not** run.

## Methodology

Static analysis over the checked-out tree (`website` @ `a74b9e2`, `agent-output` @ `9bda359`).

- File set: `find src -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts'` written to a
  file, counted with `grep -c ''` → **48**. No `.tsx` or `.spec.ts` files exist; all 48 are
  `.test.ts`.
- Case counts: `grep -cE "^[[:space:]]*(it|test)(\.[a-z]+)?\(" <file>` — counted **inside grep**,
  never `| wc -l`. Sum **570**.
- Surface under test: the file's own `import` lines, read directly.
- Class predicates: each stated beside its count in "Per-class counts" below.
- Provenance: searched `agent-output/{analysis,planning,qa,handoff,research}` and their `closed/`
  subfolders, plus `git log` in both repos.

Techniques from `~/.claude/agent-skills/analysis-methodology/`: component isolation (reading each
file's import surface rather than inferring from its name), upstream tracing (following each
bug-form test back to the artefact that would earn it). No POC executed — see the hard-pivot note
under Open Questions.

## The inventory

Paths are relative to `/usr/local/bin/hooks/website/`. "cases" is the static `it(`/`test(` call-site
count; where a file uses `it.each`, the executed count is higher and the row says so.

| # | path | cases | surface under test (from imports) | class | provenance artefact | duplicated helper |
|---|---|---|---|---|---|---|
| 1 | `src/scripts/__tests__/012-backfill-classify.test.ts` | 11 | `~/scripts/backfillValid` → `classifyRow` | H2 | n/a (spec-form) | `function data(o: Record<string, unknown>)` |
| 2 | `src/scripts/__tests__/012-backfill-evaluation-failure-category-qa.test.ts` | 3 | `~/scripts/backfillValid` → `classifyRow`, `emptyReport`, `accumulate` | H2 | none (mutant MS-8, intra-chain) | — |
| 3 | `src/scripts/__tests__/012-backfill-report.test.ts` | 30 | `~/scripts/backfillValid` → report/persist/guard helpers | H2 · **Unclassified 1** | none | `function fakeDatabase(countResult)` |
| 4 | `src/server/api/utils/__tests__/012-upsert-valid.test.ts` | 6 | `~/server/api/utils/shared` → `buildMessageValues`, `buildUpsertMessageQuery` | H2 | none | `function values(overrides)` |
| 5 | `src/server/api/utils/__tests__/013-m4-shapes-parity.test.ts` | 10 | `~/server/api/utils/shapes` | H2 | none | `make*` component-builder family (5 files) |
| 6 | `src/server/api/utils/__tests__/013-m9f-dropped-types-notice.test.ts` | 3 | `~/server/api/utils/shapes` → `describeDroppedComponentTypesNotice` | H2 | none (CR round 23 LOW-2, intra-chain) | — |
| 7 | `src/server/api/utils/__tests__/shapes-v2.test.ts` | 52 | `~/server/api/utils/shapes` → `discordMessageShape`, `discordMessageImportShape`, `messageShape` | H2 (titles) · **Unclassified 4** | none | `make*` family (5 files) |
| 8 | `src/server/api/v1/__tests__/012-valid-exposure.test.ts` | 2 (+2 `it.each`) | v1 guild-messages handlers, dynamically imported | H2 | none | `function makeRes()`, `function serialized(body)` |
| 9 | `src/utils/__tests__/008-qa-validation.test.ts` | 23 | `~/utils` → `genUuid`, `rekeyComponent`; `~/constants` | H2 | `qa/closed/008-sub-component-crud-actions.md` (self-dated; see Gap 2) | `makeEditable*` family (2 files) |
| 10 | `src/utils/__tests__/010-transition-height-style.test.ts` | 11 (11 source-text) | **source text** of `components/TransitionHeightElement.tsx` | **H1** · H2 | `analysis/closed/011-transition-height-react-style-conflict-analysis.md`, self-dated 2026-04-12 — escaped vs intra-chain unresolved | — |
| 11 | `src/utils/__tests__/011-style-reconciliation-poc.test.ts` | 4 (4 source-text) | **source text** of `node_modules/react-dom`, `utils/hooks/index.ts`, `TransitionHeightElement.tsx` | **H1** · H2 · J5 (candidate) · **Unclassified 6** | same 011 analysis, 2026-04-12 | — |
| 12 | `src/utils/__tests__/012-json-editor-repair-path.test.ts` | 7 | `~/utils/limits`, `~/utils`, `~/server/api/utils/shapes`, `~/providers/MessageProvider/useApiMethods` | H2 | none (critic cycle-2 assumption, intra-chain) | — |
| 13 | `src/utils/__tests__/012-message-mode.test.ts` | 6 | `~/utils/messageMode` → `switchToV2`, `switchToClassic`, `applyModeSwitch` | H2 | none | — |
| 14 | `src/utils/__tests__/012-send-gate-partition.test.ts` | 19 (2 source-text, +2 `it.each`) | `~/utils/limits` → `validateMessage` | **H1** (partial) · H2 | none | `function data(o: Record<string, unknown>)`; also a local `switchToClassic` transcription |
| 15 | `src/utils/__tests__/012-validity-predicate.test.ts` | 11 (2 source-text) | `~/server/api/utils/messageValidity` → `isMessageValid`; `~/utils/limits` | **H1** (partial) · H2 | none | `function data(o: Record<string, unknown>)` |
| 16 | `src/utils/__tests__/013-fqa15-rowd-load-gate.test.ts` | 9 (3 source-text, +1 `it.each`) | `~/utils` → `applyDisposition`, `jsonModalSeed`, `resolveContentLoss`; `~/utils/limits` | **H1** (partial) · H2 | F-QA15 in `qa/closed/013-components-v2-editing-surfaces-qa.md` @ `c482584` — **intra-chain, does not qualify under axiom B** | — |
| 17 | `src/utils/__tests__/013-fqa17-supported-types-parity.test.ts` | 2 | `~/utils/discordResponseToMessage`; `~/server/api/utils/shapes` | H2 | F-QA17, same QA doc — intra-chain | — |
| 18 | `src/utils/__tests__/013-fqa18-thumbnail-persist-gate.test.ts` | 3 | `~/utils` → `gateBeforePersist` | H2 | F-QA18, same QA doc — intra-chain | — |
| 19 | `src/utils/__tests__/013-fqa19-ingress-gate-reachability.test.ts` | 11 (3 source-text) | `~/utils/discordResponseToMessage`; `~/utils` → `gateBeforePersist`; **source text** of `app/message/_components/NewMessageModal.tsx` | **H1** (partial) · H2 | F-QA19, same QA doc — intra-chain | `const apiMessage = (over) => …` |
| 20 | `src/utils/__tests__/013-fqa31-load-confirmation-names-actual-mode.test.ts` | 6 | `~/utils`; `~/utils/messageMode` → `isMessageV2` | H2 | F-QA31, same QA doc — intra-chain | local `modeAfterLoad` / `confirmationFor` transcriptions |
| 21 | `src/utils/__tests__/013-m1-fix-round-1-extraction.test.ts` | 3 | `~/utils` → `saveAsPayload`, `jsonModalSeed` | H2 | none (CR MEDIUM-1, intra-chain) | — |
| 22 | `src/utils/__tests__/013-m1-fix-round-1-hash-parity.test.ts` | 6 | `~/utils` → `hashMessage`; `~/server/api/utils/shapes`; `~/providers/MessageProvider/usePusher` → `normalizeForHash` | H2 | none (CR HIGH-1, intra-chain) | `function producerHash(...)` / `function consumerHash(...)` |
| 23 | `src/utils/__tests__/013-m1-transport-form.test.ts` | 7 | `~/utils` → `hashMessage`, `stripKeys`, `makeEditable` | H2 | none | — |
| 24 | `src/utils/__tests__/013-m2c-load-diff.test.ts` | 7 | `~/utils` → `computeLoadDiff`, `describeLoadDiff` | H2 | none | — |
| 25 | `src/utils/__tests__/013-m3-bot-get-message.test.ts` | 1 | `bot/serverCommands` | H2 | none | `function author(overrides: Record<string, unknown> = {})` |
| 26 | `src/utils/__tests__/013-m3-code-path.test.ts` | 1 | `~/utils/redis/messageStore` | H2 | none | `function author(overrides: Record<string, unknown> = {})` |
| 27 | `src/utils/__tests__/013-m3-discord-ingress.test.ts` | 11 | `~/utils/discordResponseToMessage` | H2 | none | `function author(overrides: Record<string, unknown> = {})` |
| 28 | `src/utils/__tests__/013-m7-mode-follows-flag.test.ts` | 16 | `~/utils/messageMode` | H2 | none | — |
| 29 | `src/utils/__tests__/013-m8-ec3-resolver-gate.test.ts` | 31 | `~/utils` (disposition resolver + persist gate) | H2 | none | — |
| 30 | `src/utils/__tests__/013-m8-json-modal-notices.test.ts` | 7 | `~/utils` → `noticeMessageForSettled`, `describeDropSet` | H2 | none | — |
| 31 | `src/utils/__tests__/013-m9a-delimiter-collision.test.ts` | 4 | `~/utils/formatMutationError` → `formatZodIssues`; `~/server/api/utils/shapes` → `containerChildShape` | H2 (filename only) | none (CR round 23 MEDIUM-1 @ `5f6fda8`, intra-chain) | — |
| 32 | `src/utils/__tests__/013-owner-choice-rewrites-editor-2026-08-25.test.ts` | 3 (3 source-text) | **source text** of `app/message/m/[id]/_components/JsonModalBody.tsx` | **H1** · H2 (date) · **Unclassified 5** | owner ruling 2026-08-25 (D33), `planning/closed/013-components-v2-editing-surfaces.md` rev 27 @ `f1b1e42` — registration only | `const readSrc = (path: string) => readFileSync(path, 'utf8')`; also `function extractFunctionBody(src, signature)` |
| 33 | `src/utils/__tests__/013-owner-conflict-choice-not-default-2026-08-25.test.ts` | 5 (5 source-text) | **source text** of `JsonModalBody.tsx`, `NewMessageJsonInput.tsx` | **H1** · H2 (date) · **Unclassified 5** | owner ruling 2026-08-25 (D31), plan rev 25 @ `53e7da9` — registration only | `const readSrc = (path: string) => readFileSync(path, 'utf8')` |
| 34 | `src/utils/__tests__/013-owner-load-notice-reversal-2026-08-25.test.ts` | 4 (4 source-text) | **source text** of `JsonModalBody.tsx` (`commitLoad`) | **H1** · H2 (date) · **Unclassified 5** | owner ruling 2026-08-25 quoted verbatim in the file header (steering session); reverses D29 | `const readSrc = (path: string) => readFileSync(path, 'utf8')` |
| 35 | `src/utils/__tests__/013-owner-readable-mutation-errors-2026-08-25.test.ts` | 6 (2 source-text) | `~/utils/formatMutationError`; **source text** of `SaveAsMenu.tsx`, `NewMessageModal.tsx` | **H1** (partial) · H2 (date) · **Unclassified 5** | owner ruling 2026-08-25 | `const readSrc = (path: string) => readFileSync(path, 'utf8')` |
| 36 | `src/utils/__tests__/013-owner-toast-vessel-2026-08-25.test.ts` | 5 (5 source-text) | **source text** of `NewMessageJsonInput.tsx`, `providers/MessageProvider/index.tsx`, `JsonModalBody.tsx` | **H1** · H2 (date) · **Unclassified 5** | owner ruling 2026-08-25 (reverses D29) | `const readSrc = (path: string) => readFileSync(path, 'utf8')` |
| 37 | `src/utils/__tests__/013-qa-cr24-6-independent-mode-oracle.test.ts` | 9 (+3 `it.each`) | `~/utils` → `computeLoadDiff`, `describeLoadDiff` | H2 · **Unclassified 7** | CR24-6, intra-chain | — |
| 38 | `src/utils/__tests__/013-qa-paste-surface-render.test.ts` | 5 | `~/app/message/_components/NewMessageJsonInput`, through a bespoke renderer | H2 · **Unclassified 8** | none | `function render(el: any): any` |
| 39 | `src/utils/__tests__/013-qa-toast-vessel-render.test.ts` | 5 (+1 `it.each`) | `~/components/NullableComponent`, through a bespoke renderer | H2 · **Unclassified 8** | none | `function render(el: any): any` |
| 40 | `src/utils/__tests__/components-v2-data-layer.test.ts` | 32 | `~/utils`; `~/constants` → `IS_COMPONENTS_V2_FLAG`, `MAX_TOTAL_COMPONENTS` | **clean** | n/a | `make*` family (5 files); also `collectKeys` / `hasAnyKey` |
| 41 | `src/utils/__tests__/isValidUrl.test.ts` | 10 | `~/utils/isValidUrl` | **clean** | n/a | — |
| 42 | `src/utils/__tests__/m7-m10-coverage-gaps.test.ts` | 33 | `~/utils`; `~/utils/limits` → `validateContentRequirements` | H2 (milestone IDs in filename; **not** caught by the plan's regex) | none | `make*` family (5 files) |
| 43 | `src/utils/__tests__/message-init-route0.test.ts` | 8 | **none — no production import at all**; tests local transcriptions `copyIntroMessage` / `selectInitialMessage` | **J1/J2** (1 case) · **J5** · **Unclassified 2** | none | — |
| 44 | `src/utils/__tests__/mutual-exclusivity.test.ts` | 49 | `~/utils`; `~/utils/limits` → `validateMessage`, `validateDisplayableTextCount`; `~/constants` | H2 (1 title) | none | `make*` family (5 files) |
| 45 | `src/utils/__tests__/plan-004-lazy-loading.test.ts` | 24 (24 source-text, +1 `it.each`) | **source text** of `app/message/m/[id]/edit/page.tsx` and sibling components | **H1** · H2 | `planning/closed/004-lazy-loading-preload-overhaul.md` (Status `Released`) — no dated *defect* artefact | `const read = (relativePath) => readFileSync(resolve(...), 'utf-8')` |
| 46 | `src/utils/__tests__/plan-005-bug-fixes.test.ts` | 7 | `~/utils/constructImageUrl` | **H3/J6** · H2 · **Unclassified 3** | **`analysis/closed/005-user-reported-bugs-analysis.md`, self-dated 2026-04-07: "Users reported five bugs"** | — |
| 47 | `src/utils/__tests__/plan-005-qa-validation.test.ts` | 28 | `~/utils/constructImageUrl`; `~/utils/redis/formatKey`; `zod` | **H3/J6** · H2 | same 005 analysis, 2026-04-07 | — |
| 48 | `src/utils/__tests__/sub-component-actions.test.ts` | 14 | `~/utils` → `genUuid`, `rekeyComponent`; `~/constants` | **clean** | n/a | `makeEditable*` family (2 files) |

## Per-class counts, each beside its predicate

**H1 — source-text regex. 12 files, 68 of 570 cases.**
Predicate: the file reads a **production** module's text and asserts over it with `toContain` /
`toMatch` / `not.toContain`.
Command: `grep -rl 'readFileSync' src --include=*.test.ts` → 15 files. Three excluded by
inspection, each for a different reason:
- `012-backfill-report.test.ts` reads back the **temp files the code under test wrote** (3 cases) —
  that is behaviour, not source text.
- `013-qa-cr24-6-independent-mode-oracle.test.ts` reads **its own `__filename`** (1 case) — see
  Unclassified 7.
- `013-qa-toast-vessel-render.test.ts` names `readFileSync` only inside a header comment; no call.

Case-level split (source-text cases / total cases in that file), computed by segmenting each file at
its `it(`/`test(` call sites and testing each block for a source read, comment lines stripped:
`010`(11/11), `011-poc`(4/4), `plan-004`(24/24), `owner-toast-vessel`(5/5),
`owner-conflict-choice`(5/5), `owner-load-notice`(4/4), `owner-choice-rewrites`(3/3),
`fqa15`(3/9), `fqa19`(3/11), `send-gate-partition`(2/19), `validity-predicate`(2/11),
`owner-readable-mutation-errors`(2/6). **5 files are wholly source-text; 7 are mixed** — the mixed
ones cannot be deleted wholesale under the rubric's H1 disposition without losing behavioural cases.

**H2/J3 — ticket, chain, agent or date in the name. 44 files.**
Predicate (union of two): filename matches the plan's `^(\d{3}-|qa\d|cr-|plan-)`, **or** any
`describe`/`it` title carries a chain/plan/milestone/finding ID or a date.
Commands:
`grep -cE '/(([0-9]{3}-)|qa[0-9]|cr-|plan-)' <filelist>` → **41 filenames**.
`grep -cE '20[0-9]{2}-[0-9]{2}-[0-9]{2}' <filelist>` → **5 filenames carry a date** (all
`013-owner-*-2026-08-25`).
Per-file title scan with
`grep -cE "(describe|it)\((['\`])[^'\`]*(M[0-9]+-?[a-z]?\b|F-QA[0-9]|MS-[0-9]|CR-?[0-9]|D[0-9]{1,2}\b|[Pp]lan [0-9]|[Rr]ider [0-9]|EC-[0-9]|012|013|Owner ruling|2026-)"` → **38 files** carry at
least one such title.
Union = 41 (name) + `shapes-v2.test.ts` + `mutual-exclusivity.test.ts` (clean names, ID-carrying
titles) + `m7-m10-coverage-gaps.test.ts` = **44**. The last is a judgement call, flagged: its
filename encodes milestones M7–M10, which axiom (C) forbids, but it does **not** match the plan's
acceptance regex — so the plan's own predicate would pass a file the plan's own axiom fails.

**H3/J6 — escaped provenance. 2 files (1 firmly).**
Predicate: a bug-form test whose defect has a citable artefact outside the chain branch, dated
before the fix.
`plan-005-bug-fixes.test.ts` and `plan-005-qa-validation.test.ts` both trace to
`agent-output/analysis/closed/005-user-reported-bugs-analysis.md`, whose body opens "Users reported
five bugs…" and whose changelog is dated 2026-04-07. **User-reported is escaped by definition.**
`plan-005-bug-fixes.test.ts` is the firmer of the two (its `describe` is literally "Plan 005 Bug
Fixes"); `plan-005-qa-validation.test.ts` is a mix of that provenance and ordinary spec-form.
Neither carries an `// escaped:` line — `grep -rc '// escaped:' src --include=*.test.ts` → **0
across all 48**.

**J1/J2 — pin of a known-unfixed bug. 1 file, 1 case explicitly (4 more implicated).**
Predicate: an assertion whose expected value the file itself labels as the current defect.
Command: `grep -rn 'BROKEN\|current bug' src --include=*.test.ts` → **2 lines, 1 file**:
`src/utils/__tests__/message-init-route0.test.ts` at `it('BROKEN: unconditional copyIntroMessage()
replaces cached edits'` with the comment `// This is the current bug — cached edits are lost`. Axiom
(D) exactly. The other 7 cases in that file are implicated for a different reason (Unclassified 2).
Broader sweep for pin language —
`grep -rniE 'known.?(bug|wrong|broken|defect)|not fixed|unfixed|todo|fixme|for now|deliberately (wrong|broken)'`
— returned **1 line, and it is a false positive** (`assertConfirmedTarget — refuses to run against an
unacknowledged target`). So the Statbot "flip this pin when fixed" idiom does **not** appear in
Hooks.

**J4 — inter-agent revert guard. 0 files.**
Predicate/command:
`grep -rniE 'do not (remove|delete|revert)|must not be (reverted|removed)|another agent|concurrent agent|reverted by'`
→ **1 hit, not a J4**: `012-backfill-report.test.ts` says "a regression guard, not a TDD red/green".
That is Unclassified 1, a different problem. The plan's acceptance predicate
`grep -rlE 'CR-[0-9]|QA-[0-9]|RED-[0-9]|flip this|out-of-scope bug|superseded|concurrent agent'`
returns exactly **one file** today — `m7-m10-coverage-gaps.test.ts`, on a single comment
`// Tests: validateContentRequirements (extracted per CR-3)`.

**J5 — superseded implementation. 0 by keyword, 2 by inspection.**
Command: `grep -rli 'superseded' src --include=*.test.ts` → **0**.
By inspection: `message-init-route0.test.ts` (tests a transcription its own comment calls "current
uncommitted code") and `011-style-reconciliation-poc.test.ts` (asserts on React's reconciler source
to prove a hypothesis about an implementation `010-transition-height-style.test.ts` now asserts is
*gone* — it tests that `getTransitionWrapperStyle` is no longer exported).

**clean — 3 files.** `components-v2-data-layer.test.ts`, `isValidUrl.test.ts`,
`sub-component-actions.test.ts`. Predicate: no H1 source read, no ID in filename or in any title, no
pin. All three import real production symbols and assert on returned values.

**Reconciliation.** 44 (H2) + 3 (clean) + 1 (`message-init-route0`, clean name and titles but J1/J5)
= 48. H1, H3/J6, J1/J2 and J5 are all subsets of, or overlap, those rows; the rubric permits
multi-tagging and this inventory uses it.

## Duplicated helpers

Six families, by `grep -rlF <name> src --include=*.test.ts | grep -c ''`:

| signature | files | note |
|---|---|---|
| `function data(o: Record<string, unknown>)` | 3 | `012-backfill-classify`, `012-send-gate-partition`, `012-validity-predicate`. Bodies differ only in the `username` literal (`'U'` vs `'TestUser'`) and line wrapping. This is the duplicate the coordination plan already named. |
| `make{LinkButton,ActionRow,TextDisplay,Thumbnail,Section,Container,Separator,MediaGallery,File}` | 5 | `shapes-v2`, `013-m4-shapes-parity`, `m7-m10-coverage-gaps`, `mutual-exclusivity`, `components-v2-data-layer`. **Larger than the plan recorded** — nine builders across five files, with per-file signature drift (`makeSection()` vs `makeSection(textCount = 1)` vs `makeSection(accessory = makeThumbnail())`). |
| `const readSrc = (path: string) => readFileSync(path, 'utf8')` | 5 | the four `013-owner-*` files plus a renamed variant `const read = (relativePath) => …` in `plan-004-lazy-loading`. This helper *is* the H1 pattern; lifting it would entrench H1 rather than fix it. |
| `function author(overrides: Record<string, unknown> = {})` | 3 | `013-m3-bot-get-message`, `013-m3-code-path`, `013-m3-discord-ingress`. **Byte-identical bodies.** |
| `makeEditable{TextDisplay,LinkButton,Thumbnail,Section,MediaGalleryItem}` | 2 | `008-qa-validation`, `sub-component-actions`. |
| `function render(el: any): any` | 2 | `013-qa-paste-surface-render`, `013-qa-toast-vessel-render`. See Unclassified 8. |

On ruling 4 (helper policy, planner decides), the "third duplicate" trigger the plan sketches is
already met by three families, and `make*` is at five.

## The `env.mjs` import barrier — what I observed

**The barrier is real, and it is already routinely broken by 36 of the 48 files.** Both halves are
Verified (Level 1, direct inspection); neither required running anything.

**Real.** `website/src/env.mjs` builds a Zod schema (`server` merged with `client`) over 26 required
environment variables and, at **module scope**, does:

```js
if (!!process.env.SKIP_ENV_VALIDATION === false) {
  const parsed = isServer ? merged.safeParse(processEnv) : client.safeParse(processEnv);
  if (parsed.success === false) { … throw new Error('Invalid environment variables'); }
  …
}
```

The throw is unconditional on parse failure and is not inside a function — importing the module
executes it. `src/constants/index.ts` does `import { env } from '~/env.mjs'` and uses
`env.NEXT_PUBLIC_DISCORD_CLIENT_ID` at module scope, so **anything importing `~/constants`
transitively triggers the validation**. Other importers: `src/server/api/utils/shared.ts`,
`src/server/api/utils/deleteMessagePreviewImages.ts`, `src/server/auth.ts`, `src/utils/discord.ts`,
`src/providers/MessageProvider/usePusher.ts`.

**Already broken, everywhere.** `grep -rlE "vi\.mock\('~/env\.mjs'" src --include=*.test.ts` →
**36 files**, all of the form:

```ts
vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));
```

Two of those files say in their own comments that they discovered this the hard way —
`012-send-gate-partition.test.ts`: *"`src/constants/index.ts` imports `~/env.mjs`, which validates
the full production env at MODULE SCOPE and throws without it. Discovered by executing this spec,
not by reading. Same mock the adjacent suites use."*

**The reason given for H1 is therefore contradicted by the repo's own practice.** The header of
`010-transition-height-style.test.ts` reads: *"Direct import is not viable because the component's
module graph pulls in env.mjs validation. Tests use source-code verification."* That claim was
already false when written — the `vi.mock` workaround was in use in adjacent files at the time.
`env.mjs` also honours `SKIP_ENV_VALIDATION`, a second unused escape hatch (nothing in
`vitest.config.ts` or `package.json` sets it).

I am not proposing a fix, and I have not tried to import any component under the mock. What I have
established is that **step 1a's question is narrower than the plan assumes**: the barrier is not the
obstacle for the module-level cases, and the analyst's remaining question is the *separate* one of
whether a **React component** (`.tsx`, JSX, `environment: 'node'`, `include: 'src/**/*.test.ts'`)
can be exercised at all — which owner ruling D28 (no DOM harness in chain 013) already answered
"no" for that chain. The five wholly-source-text H1 files split cleanly on that line: `010` and
`plan-004` and the four `013-owner-*` files all assert over `.tsx` component sources, while
`011-style-reconciliation-poc` asserts over `node_modules`.

## System weaknesses this inventory exposes

1. **Nothing forces a test to have been red.** `grep -rcE '\.(skip|only)\('` → 0 (good), but there
   is no equivalent instrument for "was seen to fail". At least one file states in its own title
   that its guard *"already passed at HEAD"*. Axiom (A) has no mechanical check anywhere in the
   plan's acceptance predicates.
2. **A test can pass with zero production imports.** `message-init-route0.test.ts` proves it: 8
   cases, green, importing nothing but `vitest`. No lint rule, config setting or predicate catches
   this, and the rubric has no class for it.
3. **Two independent case-count instruments will disagree.** The static call-site count is 570; the
   plan's verification step reads `numTotalTests` from a vitest JSON report, which expands the 10
   `it.each` sites (6 files) into their rows. `012-send-gate-partition.test.ts` alone declares a
   14-cell partition behind one call site. **Anyone reconciling "48 files / 570 cases" against a
   vitest run will find a deficit that is an artefact of the instrument, not missing tests.**
4. **The naming predicate and the naming axiom disagree.** The acceptance regex
   `^(\d{3}-|qa\d|cr-|plan-)` passes `m7-m10-coverage-gaps.test.ts`, which axiom (C) fails.
5. **Provenance dates are not recoverable from git.** Every pre-013 artefact in `agent-output` has
   the same first commit, `fb99edd` (2026-08-23) — the repo was seeded then. `website` history runs
   2026-04-09 → 2026-08-25, so fix commits *are* datable, but the artefacts that would earn a
   bug-form test are datable only by their own self-reported changelog rows. Axiom (B)'s "dated
   before the fix commit" is therefore **not mechanically checkable in this workspace** for anything
   before 2026-08-23.

## Instrumentation gaps

**Normal** (always-on, low-volume, structured, actionable, safe by default):
- A single acceptance predicate for "every test file imports at least one `~/` or `bot/` symbol".
  One `grep`, catches weakness 2, zero volume.
- The executed case count captured per merge SHA alongside the static file count, since the two
  measure different things (weakness 3).

**Debug** (opt-in, high-volume, short-lived, safe to disable):
- Mutation runs per file to establish which cases can go red. High cost, run once during the
  disposition pass, discarded after — the plan already routes this through the implementer's
  Disposition Table.
- A one-off `SKIP_ENV_VALIDATION=1` run to measure how many `vi.mock('~/env.mjs')` lines are
  load-bearing versus cargo-culted. Diagnostic only; do not wire it into the suite.

## Files I could not classify with confidence

Eight, and every one is a gap in the **rubric**, not in the evidence.

1. **`012-backfill-report.test.ts` — the never-red guard.** Its own title says: *"L7 — a regression
   guard, not a TDD red/green: this already passed at HEAD, since the fields already reached the
   body through the untyped spread; the point is to fail if a future refactor drops them."* Axiom
   (A) says a test is evidence only once seen to fail against the defect it names. This one was
   never red and says so. **No J-class covers a never-red test**, and its disposition is genuinely
   open — a forward-looking refactor guard is arguably legitimate.
2. **`message-init-route0.test.ts` — tests a copy.** No production import. `selectInitialMessage`
   takes a `useTernary: boolean` and branches between the "correct" and, verbatim, the "Broken
   (current uncommitted code)" path — so the file asserts both. Four more cases re-implement a
   `localStorage` branch inline and assert `JSON.parse(JSON.stringify(x))` round-trips, i.e. they
   test JavaScript. J1/J2 covers the one BROKEN case; **nothing covers "characterises a
   transcription"**, which is the other seven. Closest fit J5, but J5's evidence-owed column
   ("name and mutation-check the test covering the current implementation") presumes a surviving
   test on that surface, and there is none.
3. **`plan-005-bug-fixes.test.ts` — self-referential oracle.** Two cases compute the expected value
   with the formula under test: `const avatarIndex = Number((BigInt(id) >> 22n) % 6n); expect(url)
   .toBe(\`…/${avatarIndex}.png\`)`. A defect in the shift-and-modulo moves code and oracle
   together. Partly mitigated by an inline `expect(avatarIndex).not.toBe(0); // sanity`. The file is
   **also** the strongest H3/J6 in the repo, so it is simultaneously the best-earned and the
   weakest-instrumented file here. No class covers that combination.
4. **`shapes-v2.test.ts` — ruled-true vs known-rejected.** One case:
   `it('accepts text display with empty content (owner ruling 2026-08-25, D34)')` asserting
   `result.success === true`. The handoff
   `hooks:handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (Status `Open`)
   records the owner observing that a V2 message whose only component is an **empty Text Display**
   is rejected by Discord on send. Not J1 — the schema's acceptance was *ruled*, deliberately, and
   the schema and the send gate are different surfaces. But it is not "clean" either: the value the
   plan puts out of scope is asserted `true` here. The planner must decide; I will not.
5. **The five `013-owner-*-2026-08-25.test.ts` files — is an owner ruling escaped or intra-chain?**
   Axiom (B) admits "an owner observation quoted with date" as earning a bug-form test, and rules
   that "a CR/QA finding ID is intra-chain and does not qualify". These five are owner observations,
   quoted, dated — **and made against in-flight chain-013 revisions** (D33 at plan rev 27
   `f1b1e42`; D31 at rev 25 `53e7da9`; the toast reversal from a steering session the same day).
   Axiom (B) does not say which side of the line that falls on. Per its own tiebreak (ambiguous →
   spec-form default) they are spec-form, but the rubric then offers **no disposition for an
   owner-ruling-named source-text test** — H1 says convert-or-delete, H2 says rename-and-reclassify,
   and the two point different directions for the same file.
6. **`011-style-reconciliation-poc.test.ts` — asserts on a third-party dependency.** It reads
   `node_modules`' React DOM source and `react-use`'s `useMount` to prove a hypothesis about React's
   style reconciliation. It is not testing this product, it breaks on any React upgrade, and it is
   H1 against a file the repo does not own. J5 is the nearest class but its evidence-owed column
   does not apply.
7. **`013-qa-cr24-6-independent-mode-oracle.test.ts` — a test of the test.** One case,
   `it('this oracle never reaches the function under test')`, reads `__filename` and asserts that no
   executable line calls `resolveContentLoss`, `settledMode`, `applyDisposition`, `isMessageV2` or
   `detectMessageMode`. It is a real and defensible guard against oracle contamination — and it is
   also a source-text regex test whose surface is the test file. No class fits; deleting it under H1
   would remove a genuine safeguard.
8. **`013-qa-paste-surface-render.test.ts` and `013-qa-toast-vessel-render.test.ts` — bespoke
   renderer.** Both define `function render(el: any): any` and walk React elements by hand, because
   D28 forbade adding a DOM harness. The assertions are behavioural, so neither is H1, but they
   exercise a renderer written in the test file rather than React's. They are the closest thing the
   repo has to component tests, and the rubric has no class for "behavioural against a hand-rolled
   substitute for the framework".

## Assumption Not Checked

**I did not execute the suite, so no claim here rests on a test having run, passed, or failed.**
Every case count is a static count of `it(`/`test(` call sites at the start of a line; the 10
`it.each` sites in 6 files each expand to more executed cases than they are counted as, so **570 is
a floor, not the executed total**, and a case constructed inside a helper or a loop I did not read
would be missed entirely. I also did not verify that all 48 files currently pass, that any `vi.mock`
is load-bearing, or that the H1 files' regexes still match the sources they read — a source-text
test that has silently rotted to vacuous truth (`not.toContain` against a renamed file, say) is
indistinguishable from a passing one by inspection alone, and I made no attempt to detect that
class. **The single fastest thing that would close this: one `npx vitest run --reporter=json` at
`a74b9e2`, giving the executed count and the pass set.**

## Open questions

| # | Question | Why it is open | What would close it |
|---|---|---|---|
| 1 | Does an owner ruling made against an in-flight plan revision earn a bug-form test? | Axiom (B) admits dated owner observations and excludes intra-chain CR/QA IDs; these five files are both at once. | An owner ruling, or the planner tightening axiom (B) with a sentence on owner rulings specifically. Affects 5 files, 23 cases. |
| 2 | Is `shapes-v2.test.ts`'s empty-Text-Display case a pin? | It asserts `true` on the shape the open handoff says Discord rejects — but at the schema layer, under a deliberate owner ruling (D34). | Deciding whether D34 governs the schema only or the send gate too. Blocked on the handoff's own "the class is not known" note. |
| 3 | What is the executed case count? | Static counting cannot expand `it.each`. | One suite run at `a74b9e2`. Deliberately not done here (see the commission's constraint). |
| 4 | Can any `.tsx` component be tested at all under this config? | The `env.mjs` barrier is settled (breakable, and broken 36 times). The *component* question is separate and D28 answered it only for chain 013. | Step 1a's analyst, with the question re-pointed: not "is `env.mjs` breakable" but "can `environment: 'node'` + `include: 'src/**/*.test.ts'` reach a component at all". |
| 5 | Which of the 68 H1 cases have a behavioural equivalent already? | Requires per-case surface mapping against the behavioural suite, beyond this inventory's brief. | The implementer's Disposition Table (`covering test (path::name)` column), which the plan already requires. |
| 6 | Which cases can go red? | Axiom (A) is unverifiable by reading. | Per-file mutation, local and restored, during the disposition pass. |

## Recommendations (investigation only — no dispositions proposed)

1. **Re-point step 1a before commissioning it.** Its stated question is answered in this document.
   The live question is question 4 above.
2. **Give the rubric a class for the never-red and copy-characterising patterns** before the
   disposition pass, or files 1, 2, 6, 7 and 8 above will each be argued individually and
   inconsistently. Two files (`012-backfill-report`, `message-init-route0`) turn on it directly.
3. **Fix the naming predicate/axiom disagreement** (weakness 4) — one file passes the check and
   fails the rule.
4. **Record the two case-count instruments as measuring different things** in the conventions doc,
   so no later reader treats the gap as missing coverage.
5. **Treat `readSrc` as a smell, not a helper.** It is the third-most duplicated helper in the repo
   and lifting it into a shared layer (ruling 4) would entrench H1.
