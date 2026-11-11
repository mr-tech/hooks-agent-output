---
ID: 016
Origin: 016
UUID: 54673438
Verified-At: "0e3d903 — repos=website; Phase 1 strategy, read at this base tree; no verdict issued"
Status: Awaiting Implementation
Status-Detail: "Phase 1 re-keyed to plan revision 7 (record 9fd96d5). AC1-1's fixture identity checked equal to the regenerated fixture (sha256 9ab22baa…a77afe, blob 7fcf64f, record 188bc93). AC1-11's row reconciled to no exemption. No finding open; QAF-1 to QAF-12 RESOLVED. This document holds the chain's blocking-condition register (B-1 to B-6)."
Phase: 1
---

# QA Report: Plan 016 — the send check refuses what Discord refuses

**Plan Reference**: `agent-output/planning/016-send-check-validity.md`, `Revision: 3` (record `21db6c8`),
read as its diff from revision 2 (`git diff 6b07655 21db6c8`). Revision 2 was read as its diff from revision 1, and revision 1 whole at record `3b4205d`.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T11:00 | steering-queue-hooks → qa-hooks-016 | Phase 1 on revision 1 (brief `steering/queue-hooks-briefs/qa-016-brief.md`) | Phase 1. Corpus rebuilt and re-sent in the test server: 76 of 76 match Discord's earlier verdicts. 40 further members measured. Ledger tally by script: 52 + 24 = 76, each id once. Strategy per criterion, the Irreversible Side-Effect Register, register rows B-1 to B-4, and QAF-1 to QAF-8 (five MEDIUM, three LOW) for the planner. Status `Awaiting Implementation`. |
| 2026-11-11T11:11 | planner-hooks-016 → qa-hooks-016 | Re-key Phase 1 to revision 2 (`6b07655`) | Phase 1 re-key. QAF-1 to QAF-8 read in the diff and collapsed as RESOLVED. Four members measured (batch 3); they found QAF-9 MEDIUM: revision 2's formal whitespace-empty predicate is wrong on 3 of 30 measured members. Fixture re-pinned at 120 members (`49b54f8e…`). Strategy rows for AC1-7 (rider R1 dropped), AC1-9, AC1-10 and AC1-11; B-1 amended for the `/preview` record. Status stays `Awaiting Implementation`. |
| 2026-11-11T11:17 | planner-hooks-016 → qa-hooks-016 | Re-key Phase 1 to revision 3 (`21db6c8`) | Phase 1 re-key. QAF-9 collapsed as RESOLVED; the fixture hash checked at `21db6c8`. M1b's class checked against every error element in the editor tree: QAF-10 MEDIUM (Author's username error renders on `/preview`, executed at `0e3d903` with a control) and QAF-11 LOW (AC1b-4's post-deploy member does not distinguish). Strategy rows for AC1b-1 to AC1b-3, side effect SE-6 (preview images), register rows B-5 and B-6. Status stays `Awaiting Implementation`. |
| 2026-11-11T11:26 | planner-hooks-016 → qa-hooks-016 | Re-key Phase 1 to revision 4 (`c249af3`) | Phase 1 re-key. Interrupted at 11:23 by a stop steering then withdrew (its error, by its 11:24Z message), checkpoint `cc91291`, resumed. QAF-10 and QAF-11 collapsed as RESOLVED, SE-6's ask folded. By-render enumeration of M1b's class run at `0e3d903` over 31 fixtures through the real `/preview` page: seven members, matching the plan's table, every "not rendered" and "not painted" row confirmed. Instrument discriminates under an edit-mode mutant. QAF-12 LOW raised. B-5 reconciled; B-5, B-6 unmoved. |
| 2026-11-11T11:40 | planner-hooks-016 → qa-hooks-016 | Re-key Phase 1 to revision 5 (`b2d78b0`) | Phase 1 re-key, read as `git diff c249af3 b2d78b0` (covers R-2 `5f95a30` and the checkpoint `a9bb644`). QAF-12 collapsed as RESOLVED: AC1b-1 checks Author on `/preview` in cozy and compact at the component with the signal set as `/preview` sets it. Wording only; no criterion QA verified moves, no register row moves, no re-run owed. No new finding. |
| 2026-11-11T11:54 | planner-hooks-016 → qa-hooks-016 | Re-key AC1-11's row on revision 6 (`07e2e41`) | Phase 1 re-key of one criterion, read as `git diff fcbb6b2 07e2e41` (covers R-4 and R-5). The premise was measured: the fixture at its shipped path has 7078 errors (all auto-fixable: `quotes`, `quote-props`, `comma-dangle`, `member-delimiter-style`) and 1 `max-len` warning (`verification/016/corpus/fixture-eslint-summary.txt`). AC1-11's row now excludes the fixture, which the Phase 2 sha256 and blob check decides, and its instrument is re-specified: a per-file export lint fails on a duplicate react plugin. No finding. |
| 2026-11-11T12:56 | planner-hooks-016 → qa-hooks-016 | Regenerate the corpus fixture for code review CR-1 (`code-review/016-send-check-validity-code-review.md`, website `ee114ff`) | `make_fixture.py` now emits no comment line, in the website's eslint style. The fixture is regenerated (sha256 `9ab22baa…a77afe`, blob `7fcf64f`). Data is identical to the previous fixture by `compare_fixture.mjs` (120 of 120 members deep-equal, same order, 34 accepted and 86 refused), and three planted controls each report their one member. The fixture lints 0/0, its comment gate is clean (the previous fixture is the failing control), and `tsc -p tsconfig.test.json` exits 0. Captures are `verification/016/corpus/regen-*.txt`. The plan's digest moves at revision 7, which is the planner's. |
| 2026-11-11T12:58 | planner-hooks-016 → qa-hooks-016 | Re-key on revision 7 (`9fd96d5`) | Read as `git diff 07e2e41 9fd96d5`, which covers R-6 to R-9. The digest was checked: `git show 188bc93:<fixture> \| sha256sum` gives `9ab22baa9c81…d693fa77afe`, and `git rev-parse` gives `7fcf64f`, both equal to AC1-1's line. The comparison base AC1-1 names, `77b1fd6`, is blob `9fb22ae`, the file `regen-compare.txt` compared against. AC1-11's row is reconciled to no exemption. Correction: this document and the three `regen-*.txt` headers had abbreviated the new sha256 as `9ab22baa…fafe`, which is not its tail. It now reads `…a77afe`; the full value is in `fixture/discordV2SendCorpus.ts.sha256`. No finding. |

## Reading

- Plan 016 whole (revision 1, record `3b4205d`). The rulings file `steering/queue-hooks-rulings.md`
  whole, including the blocks "selection 14" (09:09Z), "scoping determination" (09:17Z), "selections 17
  to 20" (10:30Z) and "selections 21 and 22" (10:38Z).
- Research `research/closed/components-v2-send-validity-2026-11-11.md` (record `c9f8e3a`, unchanged
  since: `git diff --stat c9f8e3a HEAD` over the path is empty), read whole. Research
  `research/closed/components-v2-description-text-limit-2026-11-11.md`: F-6 and its DESCBOUND builders
  only.
- Architecture: `system-architecture.md` D-004 and D-005, and the "Validity is recorded, not enforced"
  line; `website.md` W-1, W-2 and A-4. The architecture record does not name the Node major that
  Vercel runs (`grep -n -i "node\|runtime" architecture/website.md`: one unrelated hit). The runtime
  gap is stated under Strategy, "Runtime".
- No roadmap. The workspace has none, by the owner's standing instruction (plan header,
  `Epic-Alignment`).
- Website at `0e3d903` (`git rev-parse HEAD`, tree on `master`, `git status --porcelain` empty at
  10:41Z): `src/utils/limits.tsx`, `src/server/api/utils/messageValidity.ts`,
  `src/server/api/utils/shapes.ts` (component shapes), `src/constants/messageLimits.ts`, the send page
  (`src/app/message/m/[id]/send/page.tsx`, `sendMessage`, `isMessageValid`, `allowSave`),
  `src/providers/WebhookProvider.tsx` (the old-message fetch), the surface tests named below.

## Phase 1 acts the plan assigns

### AC1-1 — the corpus, rebuilt and confirmed against Discord

All instruments are under `verification/016/corpus/` (README there). The run, in order:

1. **Reconstruction.** `corpus.py` rebuilds the research's 76 bodies from its Appendix builders and
   Evidence-table "Shape" text. Where the text leaves a detail open, the research's own error-body
   paths decide it (E5's `components.1` puts B7's empty Text Display second; E17 to E19 put the File
   at index 1, E22 to E25 the Action Row at index 1). The six choices no path fixes are listed in
   `RECON_NOTES` (A2, E2, F2, H1, X1, N5). The expected verdicts are not in this file:
   `research_table.py` reads them from the research text at `c9f8e3a` (76 rows, 52 refused, 24
   accepted, 33 error bodies).
2. **Website side, as the research recorded it.** `website_side.mjs` ran the real `validateMessage` and
   `discordMessageShape` over the 76 bodies. The run used a `git archive 0e3d903` export (blob ids of
   `limits.tsx` `e5420c7` and `shapes.ts` `ccde3a6`, equal to the commit's), under `unshare -rn`. It
   printed `research=76 match=76 mismatches=0 blocks=6 rejects=13`, exit 0: every body gets the
   research's recorded "Send check" and "Save schema" cell. Positive control: two mutated bodies (B6
   given content, A3 given a component) gave `mismatches=2`, `['A3', 'B6']`, exit 1
   (`website-side-control.txt`).
3. **Re-send to Discord** (D-6: test server only). `resend.py` used the existing user-created webhook
   "Spidey Bot" in `#general` (`1566742403195469906`). It checked first that the channel's
   `guild_id` is `1566742402180456559` and that exactly one such webhook exists. Run 10:46:13Z to
   10:49:35Z: 99 requests, 0 retries on 429, 30 accepted, 30 deleted (204). Results for the 76:
   **76 of 76 verdicts match the research, and 52 of 52 refusals return an error body byte-identical
   to the research's E-text** (`resend-results.json`, `resend-stdout.txt`). The webhook list was
   `["Spidey Bot"]` before and after the run, so the estate is unchanged and `test-estate.json` was
   not edited. **RK-2 (reconstruction drift) is falsified for the 76.**

### Members beyond the research (measured by this pass, first sends)

The research stops at the measured class, and the plan's limbs reach further. Two batches settled the
gap, one sent with run 1 (23 members, `set: qa-extra`) and one at 10:50:24Z to 10:50:54Z (17
members, `set: qa-extra-2`, 4 accepted and 4 deleted, `resend-results-batch2.json`). The bodies are in
`corpus.py`. Beside each Discord status, the website's verdict at `0e3d903`:

| Member class | Members | Discord | `validateMessage` at `0e3d903` |
|---|---|---|---|
| Nested accepted controls: Container holding a valid Action Row, Section and Thumbnail, Section and link button, Media Gallery | 4 | all 200 | passes |
| L6, L7, L8, L10 and L9 faults **inside a Container**: link button url `''`, `abc`, `ftp://`, label absent; Section link-button accessory url `''` and label one space; Thumbnail url `''`, `abc`, description `''`; gallery item url `''`, description `''`, description 1025; File with https url; Section `components: []` in a Container | 14 | all 400 | passes all 14 |
| Description bound at the description research's shapes: Thumbnail and gallery item at 1024 and 1025 | 4 | 1024 → 200, 1025 → 400 `BASE_TYPE_BAD_LENGTH` | passes all 4 |
| Second gallery item with url `''`, first valid | 1 | 400 | passes |
| Key-absent forms the research marked "not sent": link button url, Thumbnail `media: {}`, Thumbnail no `media`, gallery item no `media`, File no `file`, Section no `components`, Action Row no `components` | 7 | all 400 | passes all 7 |
| Label-less link button with emoji `{}` and with emoji `{name: ''}` | 2 | 400 `COMPONENT_INVALID_EMOJI` | passes |
| Link-button label of U+00A0, U+0085 | 2 | 400 `BASE_TYPE_REQUIRED` | passes |
| Link-button label of U+FEFF | 1 | **200** | passes |
| Text Display `"\u0085 "`, `" \u0085\n"` | 2 | 400 | passes |
| Text Display `"﻿ "`, `"a\u0085"`, `"​ "` | 3 | 200 | passes |

Total: 40 members, 34 refused and 6 accepted, besides the 4 nested controls (`resend-results*.json`;
rows counted by `python3` over the two files). These feed QAF-1 to QAF-4.

### The Requirement ledger tally (the plan's last ledger paragraph)

`python3 -I tally.py <record> 3b4205d research-table.json` (`tally-3b4205d.txt`), exit 0:
`ledger ids: refused=52 accepted=24 distinct=76; evidence rows=76`, no PROBLEM line. Every Evidence
id appears in exactly one ledger cell, in the column matching Discord's verdict. The five prose
fragments (L7's ftp note, L10's "1025 chars", "requests 25–36", "one space", "1024 chars") are listed
and not counted. Positive control (`tally-control.txt`): flipping W5 to refused and adding a phantom
row `Z9` gave `PROBLEM L1 accepted: W5 is Discord-refused`, `PROBLEM Z9 appears in no ledger cell`,
exit 1. **The planner's hand tally holds.**

### The fixture the implementer ships

Reconcile 2026-11-11T12:56, regeneration for code review CR-1 at the planner's request. This supersedes the identity in the next paragraph. `make_fixture.py` now emits no comment line, and writes the website's eslint style: single quotes, or double where a string holds `'` and no `"`; unquoted identifier keys; trailing commas; a multiline `body` type. Every non-ASCII or control character is still `\uXXXX`-escaped. The data is unchanged.

- **New identity:** sha256 `9ab22baa9c81157d09d38b2e0da655af8881bb28b389b8d6894d0d693fa77afe`, git blob `7fcf64fb6060a21c1aad8439d5ce9b563740e538` (in `fixture/discordV2SendCorpus.ts.sha256`). The generator re-run gives the same bytes.
- **Data identical:** `compare_fixture.mjs` is new and takes the export's array literal into an empty vm context. Previous vs regenerated, 120 of 120 members are deep-equal in the same order (34 accepted, 86 refused), and the data digest `908bbb24…08ea` is equal on both sides. It was mutated before being trusted: a body character changed, a verdict flipped, and a `\u0085` escape changed to `\u0086`. Each reports exactly its one member, exit 1. Its first run reported all 120 as different, because a vm context's prototypes defeat `isDeepStrictEqual`; a JSON round trip into this realm fixed it. All of this is captured in `verification/016/corpus/regen-compare.txt`.
- **Lint:** 0 errors, 0 warnings (was 7078 errors and 1 warning), read-only over stdin at the website path (`regen-eslint.txt`).
- **Comment gate:** `--files <path> --tests --gate` is clean, exit 0. The previous fixture, as control, reports its 4 prose lines, exit 1 (`regen-comment-gate.txt`).
- **Type-check:** `npx tsc --noEmit -p tsconfig.test.json` in a `git archive 0e3d903` export with the fixture at its website path: exit 0, 0 `error TS`.
- **What it changes for this document:** at the plan's revision 7, the AC1-1 sha256 and blob check at Phase 2 reads the new identity. AC1-11's X-12 exclusion has no remaining reason, so it is the planner's to drop.

Reconcile at the re-key: the fixture now holds 120 members (QAF-9 adds four `qa-extra-3` members), sha256 `49b54f8e6b7226f1258a497b6e2f01d73126a85c9e66c2ef1acbff32bb15bb9b`, git blob `9fb22ae`. That figure supersedes the 116-member hash below, which was this pass's first build.

`make_fixture.py` writes `verification/016/corpus/fixture/discordV2SendCorpus.ts`: 116 members (34
accepted, 82 refused), each with `id`, `source`, `shape`, Discord's **measured** `discord` verdict,
`measuredOn` and `body`. sha256 `2043a8a84220660c9587f8b6f1b06ba8b0283b04e520790cf041e1af06990a6d`,
git blob `00c45ad`. Checked in the export: `npx tsc --noEmit -p tsconfig.test.json` (the test
program `pnpm run typecheck` runs as its second half) exit 0, 0 `error TS` lines, with the file under
`src/utils/__tests__/helpers/`. A smoke test (export only, not shipped) asserted 116
members and the blocked set `A3 A5 N2 N4 N6 N9` at `0e3d903`, exit 0. Its comment lines match the
Test Conventions ID-token class zero times (`grep -c -P`, the class's own pattern).

**The implementer copies it byte-identical** to `src/utils/__tests__/helpers/discordV2SendCorpus.ts`.
Phase 2 checks the sha256 and the blob. Test titles use `$shape`, never `$id`: research ids `D1` to
`D6` and the ledger's `L1` to `L11` fall in the ID-token class, so they stay as data.

## Findings

Revision 1's batch, dispositioned at the re-key on revision 2 (record `6b07655`, each read in its diff
`git diff 3b4205d 6b07655 -- planning/016-send-check-validity.md`):

QAF-1 MEDIUM Phase 1 RESOLVED — ledger "Placement" paragraph and AC1-2 cover every limb at every schema placement, every gallery item included. Plan rev 2.
QAF-2 MEDIUM Phase 1 RESOLVED — L8 defines "has an emoji" as a non-empty `id` or `name`; an invalid emoji beside a label is residue. Plan rev 2, L8 and Residue.
QAF-3 MEDIUM Phase 1 RESOLVED — L8 takes D-9's whitespace-empty rule, riding selection 18, reported to the owner for veto (the planner's judgement, as asked). Plan rev 2, "Whitespace-empty". Its formal wording is QAF-9's subject.
QAF-4 MEDIUM Phase 1 RESOLVED — AC1-1 and AC1-4's population is the corpus fixture. Plan rev 2, Requirement ledger and AC1-1. The fixture's sha256 moves with QAF-9.
QAF-5 LOW Phase 1 RESOLVED — L5 and L6 cover absent forms; AC1-3 names the measured members. Plan rev 2.
QAF-6 MEDIUM Phase 1 RESOLVED — AC1-9 states the preservation over three named input classes, decided by QA's two-tree differential at Phase 2. Plan rev 2.
QAF-7 LOW Phase 1 RESOLVED — AC2-2 split into a suite half (`maxLength` 1024) and B-2. Plan rev 2.
QAF-8 LOW Phase 1 RESOLVED — the reason unit is (limb, component type). Plan rev 2, AC1-5.

Raised at the re-key, to the planner:

QAF-9 MEDIUM Phase 1 RESOLVED — whitespace-empty is restated per character (no U+FEFF, every character `c.trim() === ''` or U+0085); the four U+0085-run members are in L1 and L8; the corpus is re-pinned to 120 members. Plan rev 3 (`21db6c8`). The pinned hash checked at that commit: `git rev-parse 21db6c8:verification/016/corpus/fixture/discordV2SendCorpus.ts` → `9fb22ae…`, sha256 `49b54f8e…15bb9b`, equal to the plan's citation.

Raised at the re-key on revision 3, to the planner:

QAF-10 MEDIUM Phase 1 RESOLVED — **M1b's class leaves out an error line that renders on `/preview`: Author's username
error.** `Author.tsx` computes `const error = validateUsername(username)` and renders
`{error && <div className='mt-1 text-xs font-bold text-error'>{error}</div>}` in both `visualStyle`
branches, with no `showEdit` condition (read at `0e3d903`). `/preview` mounts `DiscordMessageEditor`
with no `editableState`, so a draft whose username is empty, `everyone` or `here`, or holds `@`, `#`,
`:`, "discord" or "clyde" puts a red line in its preview image today. Executed at `0e3d903` (a
`git archive` export, jsdom; `verification/016/preview-chrome/Author.preview-error-probe.test.tsx`,
output `author-probe-0e3d903.txt`, exit 0, 4 of 4): with `showEdit={false}`, an empty username renders
`["This username is too short or too long."]` in the cozy and compact styles, and the control username
renders `[]` in both. M1b enumerates only `index.tsx`'s four lines, the new line and `errorBorder`, but
D-14's words are "the preview route shows no error lines or red border at all". The other child error
lines read at `0e3d903` do not reach `/preview`. `EmbedTitle`, `EmbedAuthor` and `EmbedField` return
before their error lines when `!showEdit`. `EmbedFooter`'s line is commented out. `LinkButtonEditor`
sits under `ComponentEditor`, which renders in edit mode. **Asked:** add Author's line as a seventh
member (AC1b-1, AC1b-2, cozy and compact both). The alternative is to state it out, but that departs
from D-14's "at all" and would need the owner. Also say whether `styles.errorStateBorder` on the
author header is chrome. The code is unread past the class name, which is residue unless stated. Duplicates: F-12 in critiques/016-send-check-validity-cycle2-critique.md

QAF-11 LOW Phase 1 RESOLVED — **AC1b-4's post-deploy member cannot tell fixed from unfixed.** It reads "the preview
image of a test-account V2 message saved with an unfilled component carries no red line". At `0e3d903`
(production now) no line fires for an unfilled component either: M1's line does not exist there, and no
other line fires for it (B-3's code read). So the image is clean before and after the release. A member
whose line exists at the base does distinguish: 41 Text Displays (`componentCountError`, "Message has 41
components; the limit is 40.") or an empty username (QAF-10). **Asked:** add one such member to
AC1b-4's post-deploy limb. Register row B-6 carries both members now. Duplicates: F-13 in critiques/016-send-check-validity-cycle2-critique.md

Reconcile at commit: the critic's cycle 2 pass (record `56b2916`, 8 s before this pass's `c121e92`) raised both independently. F-12 adds what this pass did not read: the architect's AF-12 names `src/components/DiscordContentEditor/{Desktop,Mobile}.tsx` (a ring, an erroring counter, "Too long."), and both gates route M1b's membership to a **by-render enumeration**. QA owes that enumeration at its re-key on the next revision: mount `DiscordMessageEditor` as `/preview` does over every validator's trigger and collect every `.text-error`, `errorBorder`, `errorStateBorder` and `data-erroring-state` it emits, beside a control that renders none.

Re-key on revision 4 (`c249af3`, read as `git diff 0c01944 c249af3 -- planning/016-send-check-validity.md`). QAF-10 is folded: Author's line is the seventh member, cozy and compact, AC1b-1 and AC1b-2. QAF-11 is folded: AC1b-4's post-deploy limb is member (b), and it states that (a) does not distinguish. SE-6's ask is folded: M1 never ships or stays live without M1b. Both findings are RESOLVED.

**By-render enumeration of M1b's class at `0e3d903`** (owed to this re-key by the plan, architect AF-12 and critique F-12; it closes the critic's routed assumption that the class table's "not rendered" and "not painted" rows are right). The instrument is `verification/016/preview-chrome/page.preview-chrome.test.tsx` (sha256 `f97b6b7a5b07116f…`). It runs in a `git archive 0e3d903` export, with `node_modules` symlinked and blob identity checked on `page.tsx`, `DiscordMessageEditor/index.tsx`, `Author.tsx` and `limits.tsx`, under `unshare -rn`. It mounts the real `src/app/preview/page.tsx` `Page`, with `next/navigation` mocked to serve each fixture as its `data` query, so the tree is exactly what the route renders: `makeEditable`, `MarkdownProvider` real, no `editableState`. It waits until the editor tree is in. Its population is 31 fixtures. They are 3 valid controls plus one trigger for every validator in `src/utils/limits.tsx` that the render tree calls:
- `index.tsx`'s four: empty message, classic and V2; embeds over 6000; V2 text over 4000; 41 components
- `validateEmbedDescription` (over 4096)
- `validateEmbedTitle` (over 256, invalid URL, URL without title)
- `validateEmbedAuthor` (over 256, invalid URL, URL without name)
- `validateEmbedField` (each of its four branches)
- the footer over 2048
- `validateUsername`: empty, `clyde`, `everyone`, and empty in V2
- content over 2000, through `DiscordContentEditor`
- six V2 component shapes: a fresh Text Display, a link button with no URL or label, a section accessory with an invalid URL, an empty gallery, an empty container, a File with no URL

It reads seven things on each fixture: every `.text-error` text, `!ring-red-500` (errorBorder), `erroring:!ring-red-500` split by whether an ancestor carries `data-erroring-state="true"` (painted or not), every `data-erroring-state`, any `text-red-*`, `aria-invalid="true"`, and "Too long.".

Result (`by-render-run-0e3d903.txt`, exit 0, 33 of 33; `by-render-results-0e3d903.json`):
- `.text-error` appears on exactly 9 fixtures, all from the seven members: `noContentError` (2 fixtures), `embedCharacterError`, `v2TextError`, `componentCountError`, and Author's line (4 fixtures).
- `errorBorder` appears on exactly 3 fixtures: embeds over 6000, V2 text over 4000, and 41 components.
- `errorStateBorder` is **unpainted on all 31**: one element each, the cozy Author header, with no `data-erroring-state` anywhere in any tree.
- `text-red-*`, `aria-invalid` and "Too long." are 0 everywhere. The three controls render none.
- Each embed and content fixture with a long string rendered it statically. Text lengths of 289, 2081, 4129 and so on equal the fixture plus the 32-character base, so "no chrome" is not "nothing rendered". The two short field fixtures (a name or value missing) render no field at all.

**No member beyond the plan's seven.** Every "not rendered" and "not painted" row of the plan's class table is confirmed by render. The `Embed.tsx` description error, which the table does not name, reaches `DiscordContentEditor`'s `error` prop, and the `!showEdit` static branch drops it (`DiscordContentEditor/index.tsx`). That is the table's `DiscordContentEditor` row. M1's new line does not exist at this tree, so "fresh text display" is `[]` here, as AC1b-4 predicts for the base.

**Instrument shown to discriminate.** The mutant edits `page.tsx` in the export to pass an `editableState` with every `show*` true and `messageMode: 'classic'`. It was restored afterwards and the blob re-verified. Under it, the same run (`by-render-run-mutant-edit-mode.txt`, `by-render-results-mutant-edit-mode.json`) shows:
- the embed title, author and field lines (10 fixtures)
- `data-erroring-state="true"` with the ring painted on the author, footer and username fixtures

So the probe sees exactly the chrome that `/preview` suppresses. **Bound:** under the mutant, the two `DiscordContentEditor` edit-branch fixtures (description over 4096, content over 2000) still show nothing. The probe was not seen to detect that editor's edit-mode counter or ring in jsdom, so for that component the `/preview` result rests on the render reaching the static branch (its text was rendered) and the static branch carrying no chrome (code read above), not on the selector. In classic edit mode the V2 component fixtures are not shown, so the component editors' chrome had no positive control. The `.text-error` selector itself was seen firing in this run.

Raised at the re-key on revision 4, to the planner:

QAF-12 LOW Phase 1 RESOLVED — **AC1b-1 asks for Author's line "in both visual styles" on `/preview`, but the route renders only `cozy`.** `src/app/preview/page.tsx` at `0e3d903` passes no `visualStyle`, and `DiscordMessageEditor` defaults it to `'cozy'`. So a `/preview` render can never show the compact branch, and a test held to "on `/preview`" cannot exercise it. The by-render run shows one style only: the unpainted header and every username line come from the cozy branch. **Asked:** state that compact is checked at the component (`Author` with the preview signal off, as `verification/016/preview-chrome/Author.preview-error-probe.test.tsx` does with `showEdit={false}`). Alternatively, state the compact limb out as unreachable on the route. Either is the planner's wording; no owner question. Resolved at plan rev 5 (`b2d78b0`), the first form: AC1b-1's Author limb is cozy on the route and compact at the component, and § M1b's "Visual style on `/preview`" paragraph cites the default.

The duplicated sentence in the Testing Strategy's QA-sequencing paragraph is not raised here. The architect recorded it at `47c7a4c` and left it to the critic.

No finding against D-10, AC2-3, AC1-10, AC1-11, the stored-row residue, or rider R1's drop. AC2-3's "the
save schema admits a 1025-character description at the tip" is the owner's ruling (W-2, D-10), not a
known-wrong pin.

## Test Strategy (Pre-Implementation)

From the user's side, what breaks: (1) a draft Discord will refuse still has Send enabled, so the
generic toast stays (the defect); (2) a draft Discord would accept is refused, a false refusal that
blocks a working send (RK-1); (3) the reason line is missing, or names the wrong part, so the user
cannot find what to fix; (4) a classic message, or a V2 message outside the class, starts refusing
(QAF-6); (5) the 1024 cap blocks typing below 1024, or does not stop a paste above it.

**Existing coverage, measured.** The existing suite holds no case on the L1 to L10 surface. A rough M1
(approximate refusals for empty Text Display, empty or absent collections, File, empty URLs, nested)
patched into an export of `0e3d903` and run over the whole suite: `numTotalTests` 1145, failed 0, 118
`testResults` entries, exit 0 (`approx-m1.json`, scratch). Control on the same export: making the probe
refuse every V2 message failed 14 of 466 cases under `src/utils/__tests__`, exit 1. So the patched
source was live and the suite simply never asks. Every AC1 assertion is new. No existing pin needs
removing for M1 to land.

**Before adding a test** (Test Conventions), extend the sibling on each surface:

| Surface | Sibling to extend | What goes there |
|---|---|---|
| `validateMessage`'s new validator (AC1-1 to AC1-5) | `src/utils/__tests__/limits.send-gate-partition.test.ts` or `limits.component-count.test.ts` (the plan-007 sibling shape) | `it.each` over the fixture: non-empty exactly when `discord === 'refused'` (AC1-1), and `''` for every accepted member (AC1-4) |
| `isMessageValid` (AC1-7) | Reconcile at the re-key: rider R1 is dropped, so `messageValidity.predicate.test.ts` is not edited, and AC1-7's cases go in the `limits.*` sibling, which imports `isMessageValid` (plan rev 2, Testing Strategy) | `isMessageValid` against **Discord's verdict** (`discord === 'accepted'`), never against `validateMessage`'s result. The file's existing parity case states delegation and cannot fail on a predicate defect. |
| The reason line (AC1-5, AC1-6 in DOM) | `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx` | Mounting the editor with a V2 message holding one empty Text Display shows one line with the Text Display reason. The same message filled shows no line. |
| Description inputs (AC2-1, AC2-2) | `src/components/DiscordMessageEditor/components/ComponentEditors/__tests__/` (`MediaGalleryEditor.duplicate-placement.test.tsx` is the gallery sibling; the Thumbnail editor has none) | The rendered `<input>`'s `maxLength === 1024` (a literal), for both |
| Save schema (AC2-3) | `src/server/api/utils/__tests__/shapes.*` or the existing `limits.import-validation.test.ts` | `discordMessageShape.safeParse` of a 1025-character description succeeds |

### Per criterion — population, measured, and edge cases

| Criterion | Population it judges (count, command) | Edge cases that carry the decision | Instrument |
|---|---|---|---|
| AC1-1 | 76 at revision 1 (`tally.py`, 52 + 24); 116 if QAF-4 lands (`make_fixture.py`, 82 refused + 34 accepted) | B5 and W5 (accepted invisible characters); W6 (refused U+0085); the `qa-extra-2` runs (QAF-4); N1 to N9 at the 40/41 edge, which L11 must not regress | Suite, `it.each` over the fixture; expected = `m.discord` (a measured fact) |
| AC1-2 | Placements from the save schema: Text Display 4 (top, Container, Section, Section in Container); Media Gallery 2; Action Row 2; Section 2; Container 1; and under QAF-1, Thumbnail 2, link button 4 (row and accessory, each top or Container), File 2, gallery item every index | Section-in-Container (X7, the deepest); a second gallery item; a nested fault beside a valid nested sibling | Suite: one fault per placement, plus the nested accepted controls (`Q-ctl-*`) green |
| AC1-3 | Absent forms: B6, C4, D6, G3 (research) and seven measured here (QAF-5) | Absent `media` vs `media: {}` (two distinct shapes, both refused) | Suite over the fixture |
| AC1-4 | 24 accepted (research); 34 with QAF-4 | W5 and `"﻿ "` (U+FEFF counted as content: `trim()` and `\s` both get it wrong); X6 (ftp Thumbnail accepted, so L7's scheme limb must not reach Thumbnails); X1 (emoji, no label); C11 and D5 (one-space description accepted); 1024 descriptions | Suite |
| AC1-5 | 10 limbs (or limb × type, QAF-8) | A fresh Section holds two faults at once (research N-4). The reason names one; the test asserts it is one of the two, never which, unless the plan orders them | Suite: pairwise distinct, with literal type words |
| AC1-6 | One walk | Typing one space (N-2 recorded); Send disabled vs enabled; the send-page preview | Register B-1 (UAT) |
| AC1-7 | Same population as AC1-1 | Expected from `m.discord`, not from `validateMessage` | Suite |
| AC1-9 | Three named classes: (a) classic messages, with classic Action Rows in L5 to L8 shapes; (b) every input the existing `limits.*`, `utils.mutual-exclusivity` and `messageValidity.predicate` tests pass to the predicate; (c) the corpus's 34 accepted members | A classic message carrying an L5 to L8 Action Row (the reach limb's sole carrier, the flag clear); whitespace content beside V2 (A4) | Phase 2 two-tree differential, `verification/016/differential/` |
| AC1-10 | `limits.tsx`'s import closure | A bound imported from `~/constants` (the barrel), or `shapes.ts`, either of which reaches `~/env.mjs` | `npx ts-node -r tsconfig-paths/register -T -e "require('~/utils/limits')"` from `website/`, exit 0 at the tip, outside vitest; its red member is the architect's capture. Placed by QA at Phase 2 |
| AC1-11 | Each file the chain changes | A changed test file that is already red at base (`limits.send-gate-partition`, `limits.import-validation`) | `npx eslint <file> --format json` at `0e3d903` and at the tip, per file, counted from the JSON; never the `lint` script, which writes (`--fix`)<br>Reconcile 2026-11-11T11:54 (plan rev 6, X-12): the population excludes `src/utils/__tests__/helpers/discordV2SendCorpus.ts`. That file is decided instead by AC1-1's Phase 2 check that it is byte-identical to QA's fixture (sha256 `49b54f8e…`, blob `9fb22ae`), which also catches the X-12 `--fix` rewrite. Its 7078 errors and 1 warning are measured (`verification/016/corpus/fixture-eslint-summary.txt`). The population predicate for the rest is `git diff --name-only 0e3d903..<tip>` minus that path, with a file the chain adds counted against zero. The instrument is re-specified: in a `git archive` export with a symlinked `node_modules`, eslint fails ("couldn't determine the plugin react uniquely"). So each side is linted from `website/` as `git show <sha>:<path> \| npx eslint --stdin --stdin-filename <path> --format json`, read-only. Each run records that `.eslintrc.json` and `.eslintignore` are unchanged across the range, since the config comes from the working tree<br>Reconcile 2026-11-11T12:58 (plan rev 7): the exclusion above is withdrawn. The fixture is lint-clean (`verification/016/corpus/regen-eslint.txt`, 0/0), so the population is all of `git diff --name-only 0e3d903..<tip>`, the fixture included, counted against zero as a file the chain adds. The stdin instrument and the config-unchanged record stand |
| AC1-8 | `validateContentRequirements`'s existing test classes (`limits.send-gate-partition` PARTITION and its extensions; `utils.mutual-exclusivity`) | Whitespace content beside V2 (A4: Discord accepts) | Phase 2 two-tree differential, plus the existing tests unchanged and green |
| AC2-1 | One constant, two inputs, one check | 1024 passes, 1025 refused at Send, for both description fields | Suite (literals 1024 and 1025, never the constant read back) |
| AC2-2 | Two inputs | Paste of 1100 characters; a stored over-1024 description is shown and editable | Suite (attribute) + B-2 (browser) |
| AC2-3 | The save schema | 1025 admits, and `isMessageValid` is false for it | Suite |
| AC1b-1 | Six members as revision 3 enumerates them (seven with QAF-10), each with its own trigger: an empty message (`noContentError`), embed text over 6000 (`embedCharacterError`), V2 text over 4000 (`v2TextError`), 41 components (`componentCountError`), a fresh Text Display (M1's line), the `errorBorder` class from any of the last three; and Author's line from an empty username, cozy and compact | Each member checked alone, its trigger present, the others absent, so a mechanism that hides only some lines is caught; the border checked as a class on the accessories container, not by colour | DOM, mounting `DiscordMessageEditor` the way `src/app/preview/page.tsx` does (no `editableState`, plus the new signal); mount `Author` directly for its member |
| AC1b-2 | The other render sites: the edit page, and through `MessagePreview` the send page, `EditMessageMenu` and `NewMessageModal` | The send page's read-only preview (no edit state, no signal) still shows every line. This is the case an edit-mode mechanism would get wrong, and why the signal is not edit mode | DOM over `MessagePreview` with each trigger (it covers three of the four sites); the edit page through `DiscordMessageEditor` with an `editableState` |
| AC1b-3 | Only `src/app/preview/page.tsx` passes the signal | A second site passing it, which hides lines on the send page | Behaviourally, AC1b-2 at every site. The call-site enumeration (`git grep -n "<DiscordMessageEditor\b\|<MessagePreview\b"` over production paths) is code review's read, and QA re-runs it at Phase 2 against revision 3's six-path list |

### Coverage obligations — each conjunct carries the decision alone, controls both ways

- **Reach (`hasV2` = structural V2 or the flag).** One fixture where only the flag makes the message V2:
  flag set, components only an Action Row with `components: []`. This must refuse, which tests the
  flag conjunct alone. One where only structure does: an empty Text Display with `flags: 0`, which
  must refuse too, since `stripKeys` sets the bit before the send. The control is a classic message
  (flag 0, no V2 type) and goes in the QAF-6 differential, not a suite pin.
- **L1 whitespace rule.** Sole carriers: U+0085 counted as whitespace (`"\u0085 "` refuses), U+FEFF
  counted as content (`"﻿ "` passes), `trim()` itself (`" "` refuses, `" hello "` passes, W8).
- **L7.** The URL-parse limb alone (`abc`, I1 to I3) and the scheme limb alone (`ftp://` link button,
  X5, which parses as a URL). Control: X6, an ftp Thumbnail, is accepted.
- **L8.** No-label alone (label absent with no emoji: H4). The emoji clause alone (X1 accepted,
  QAF-2's members). Label-after-trim alone (H6).
- **L10.** The empty-string limb alone (C10, D4) and the length limb alone (1025 refused, 1024
  accepted). Control: one-space description (C11, D5) accepted.
- **Seen red.** Each new case is recorded red at its point of addition (Axiom A). The TDD table's
  failure reason is "the check returns '' for a Discord-refused member", never a compile error, for
  every row past the first in a file.

### Runtime

The L1 and L8 rules depend on `String.prototype.trim`'s whitespace set, which ECMAScript fixes from
Unicode's `Zs` category plus the line terminators and U+FEFF. The send page runs it in the user's
browser. `isMessageValid` runs it on the server (Vercel), whose Node major is not in the architecture
record. Node 24.14.0 here agrees with Discord on the 11 measured characters, as the research reported.
**Gap stated:** the server runtime's major is unread, and Unicode-version drift in `Zs` touches no
measured member.

### Telemetry Validation

Not applicable. The root cause is proven by execution (research F-1), and the chain adds no logging.

## Irreversible Side-Effect Register

| # | Effect | Performed by (read) | What must be true before it fires | Enforced identically on every route? |
|---|---|---|---|---|
| SE-1 | A message posted to or edited in a Discord channel (POST or PATCH to the webhook) | `sendWebhook` (`src/utils/sendWebhook.ts`). One production caller, `send/page.tsx:sendMessage` (`git grep -n "sendWebhook"` over `src`, tests excluded: the import and the call in that file only) | `validateMessage(message.data) === ''`, read as `isMessageValid`, which gates `allowSave`. The button is `isDisabled={!allowSave}` (`page.tsx`, `onPress={sendMessage}`) | **One route, gated in the UI only.** `sendMessage` does not re-check validity. The edit (PATCH, `showEdit`) uses the same button and gate. The checked object is `message.data`, while the sent one is `stripKeys(…).data`, which adds the V2 bit. Hence the reach fixture above. M1 changes what the gate refuses, not its ordering. The Phase 2 sweep seeds the new validator's branch conditions here. `WebhookProvider.tsx`'s `fetch(constructWebhookUrl(…))` is a GET of the old message (read, no write). |
| SE-2 | The stored `valid` column, and what the public v1 API serves from it | `upsertMessage` (`src/server/api/utils/shared.ts`) stores `isMessageValid(data)` on every save. v1 `messages.ts` and `messages/[id].ts` serve it when non-null | None, by W-2. A save always writes | Every save route writes it. M1 moves the value from true to false for newly saved L1 to L10 shapes. The flip survives a rollback until the row is next saved (plan, Rollback). The consumer is Statbot (plan 012 D1: `valid`'s truth condition is the composer's send checks). **What Statbot does with a newly false row is devops's to establish.** |
| SE-3 | A Pusher "message updated" event on save | `shared.ts` (rulings 10:13Z, line 290 at `963a25c`), channel `message-update-<id>` | On a local build: the id sequence restarted above production's range (D-7, `CLAUDE.md`) | **Not enforced by the record tool.** `tools/uat-local-stack.sh` has no restart (`grep -c -E "RESTART\|Messages_id_seq"` → 0). B-1 carries it as a precondition, and an inbox entry goes to the tool's owner. |
| SE-4 | `valid` written for NULL rows | `src/scripts/backfillValid.ts` | Not run by this chain, and not modified (plan, Entry work) | n/a |
| SE-5 | This pass's own sends in the test server | `verification/016/corpus/resend.py` | The guild guard, the webhook guard, a delete for every 200 | 116 POSTs, 34 accepted, 34 deleted (204), webhooks unchanged |
| SE-6 | A preview image generated on save and published (the preview-image service screenshots `/preview`; D-003) | `upsertMessage` (`src/server/api/utils/shared.ts`) triggers generation in both branches (plan rev 3, Objective, steering's read; not re-read by this pass) | What `/preview` renders at the moment of the save. An image keeps what it was generated with until the message is next saved | **M1 without M1b puts M1's line into the image of every draft saved with an unfilled component.** So M1b ships in the same release as M1, never after it. This is devops's to hold at the push, since one chain merge carries both. A rollback of M1b alone brings the lines back (plan rev 3, M1b Rollback). Images generated before the release keep any line they carry today (the four existing lines, and Author's) until the message is re-saved. That is a stated limit, the image-side counterpart of RK-3 |

## Testing Infrastructure Requirements

- TESTING INFRASTRUCTURE NEEDED: the corpus fixture at
  `src/utils/__tests__/helpers/discordV2SendCorpus.ts`, copied byte-identical from
  `verification/016/corpus/fixture/discordV2SendCorpus.ts` (sha256 above). It is built and
  typechecked. Nothing to install: vitest 4.1.2 and jsdom are present (`node_modules/.pnpm`).
- TESTING INFRASTRUCTURE NEEDED: a local stack for B-1 and B-2 with the id-sequence restart applied
  after the schema push and before the first save. `docker` responds and a `postgres:16` image is
  present (`docker images`, 10:52Z). No container is running.
- QA builds at Phase 2: `verification/016/differential/` (QAF-6, AC1-8), and the mutation sweep over
  `git diff <chain base>..<tip>` production paths. Phase 1 supplied fixture text the implementer
  ships, so the effort-final verdict rests on a sweep, not a reading.

## Entry conditions for the implementer (probe shapes)

1. Before writing the validator, run the copied fixture through the base `validateMessage`. The blocked
   set is exactly `A3 A5 N2 N4 N6 N9`; the comparand exists. This pass ran it in the export and it
   passed.
2. Before the DOM test, mount `DiscordMessageEditor` as its `component-limit` sibling does. Confirm
   the existing `componentCountError` line renders for a 41-component message, so the new line has a
   live sibling to sit beside.
3. Before AC2-2's test, confirm the description input component passes `maxLength` through to the
   DOM `<input>` (the wrapper is the risk, not the attribute).

## Blocking-condition register (the chain's one register)

> **BLOCKING RELEASE CONDITION** — each item must be executed and recorded in the UAT document before merge/deploy.

Standing note: this register is point-in-time. The UAT document, then the deployment record, then
the post-deploy carrier (`handoff/<name>.md`, created by devops at Stage 1) are authoritative on each
row's execution state.

| ID | Class | Condition | Primary instrument | Subject / fallback | Earliest-decidable condition | Predicted value | Failure mode | Owner | Discharging document | State |
|---|---|---|---|---|---|---|---|---|---|---|
| B-1 | observable pre-release | AC1-6: on a local build of the chain tip, a V2 message with a freshly added Text Display shows the reason line in the editor and the send-page preview, with Send disabled. Filled in, the line goes and Send is enabled, and the send to the test-server webhook returns 200. Record N-2 (one typed space reaches the data as a space or not). Amended at the re-key: the same walk also records the `/preview` render of the same draft (plan rev 2, AC1-6, "The reason line"); it is a record, not a pass condition | Stage browser walk (browser-walker) on the local build, signed in as the test account | UAT; owner as fallback subject | Chain tip committed; local stack up with `ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001` after the schema push and before the first save; the id range written recorded | Line present and Send disabled; line absent and Send enabled after filling; send 200 | If Send stays enabled on the fresh Text Display, the user still meets the generic toast and the fix buys him nothing. If the line never clears after filling, every V2 message is unsendable | uat | UAT pass of chain 016 (to be briefed; document not yet created) | open |
| B-2 | observable pre-release | AC2-2: pasting 1100 characters into the Thumbnail description and into a gallery item description leaves 1024 in each field. Typing at 1024 adds nothing | Same walk as B-1; field length read by `browser_evaluate` (`input.value.length`) | UAT; owner fallback | As B-1; depends on B-1's stack | 1024 and 1024 | If the paste lands whole, the user composes a description Discord refuses, and only Send's reason catches it | uat | UAT pass of chain 016 | open |
| B-3 | post-deploy-observable | The user-reported defect (handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`, his words) is fixed in production. On hooks.gg, a new V2 message with one fresh Text Display shows the Text Display reason line, and Send is disabled | Stage browser single look on `https://hooks.gg/message/m/new` → "My Account" → V2 → add Text Display; read `.text-error` lines. Read-only: no Save, no Send | UAT stage; owner fallback | Production serving the chain's merge SHA (how that is verified is devops's to establish) | **Fixed:** the line present. **Unfixed (`0e3d903`, by code read):** no line, since `DiscordMessageEditor/index.tsx`'s error lines are `noContentError`, `v2TextError` and `componentCountError`, and none fires for one empty Text Display. One observation decides | If no line shows after deploy, production is not running the fix, or the fix does not reach the editor | uat | Devops's Stage 1 carrier `handoff/<name>.md` | open. **Minting run attempted 10:52Z, not completed:** the page showed a "Select a Server" picker before the editor, and the walker was not authorised to choose. The browser server then disconnected. Owed: the first stage-browser pass of this chain runs the look once against production before release, read-only, and records the unfixed value beside this prediction |
| B-4 | post-deploy-observable | Liveness beside B-3, which declines sends: in production a filled V2 message (one Text Display "hello") still sends. The test account's own message, sent to the test-server webhook, returns success | Stage browser walk on hooks.gg as the test account (its own row: `discord-test-browser` skill) | UAT stage; owner fallback | As B-3; same session as B-3 (B-3's refused member is the control) | Send enabled; Discord 200; message visible in `#general` | If a filled message cannot be sent, the change blocks every V2 user: the most-exposed class is every V2 sender | uat | Devops's Stage 1 carrier | open; depends on B-3's session |
| B-5 | observable pre-release | AC1b-4 (local): on a local build of the tip, `/preview` for a draft with a fresh Text Display shows no `.text-error` element and no `errorBorder` class, while the editor and the send page show M1's line. The same `/preview` read for a 41-component draft and for an empty-username draft (QAF-10, if it lands). Reconcile 2026-11-11T11:26: QAF-10 landed at plan rev 4 (AC1b-4 names the three drafts); the by-render enumeration predicts `[]` and no border class for all three at the tip, and at `0e3d903` the 41-component and empty-username drafts render their lines on `/preview` (`verification/016/preview-chrome/by-render-results-0e3d903.json`), so each is a discriminating member | Stage browser, in B-1's session (browser-walker): `browser_evaluate` of the `.text-error` texts and the accessories container's class list on each surface | UAT; owner fallback | As B-1 (same stack, id restart applied) | `/preview`: `[]` and no border class for each draft. Editor and send page: the line present | If `/preview` still shows the line, every saved draft with an unfilled component publishes a preview image carrying a red error | uat | UAT pass of chain 016 | open |
| B-6 | post-deploy-observable | AC1b-4 (production): the preview image of a test-account V2 message saved on hooks.gg carries no red line, for (a) one unfilled Text Display and (b) 41 Text Displays | Stage browser on hooks.gg as the test account (its own rows, `discord-test-browser` skill): save each draft, open its generated preview image, read it by eye (the Read tool on the downloaded image) | UAT stage; owner fallback | Production serving the chain's merge SHA (devops's to establish); the image regenerated after that save | **Fixed:** no red line in either. **Unfixed (`0e3d903`):** (a) no line, which does not distinguish (QAF-11); (b) the red line "Message has 41 components; the limit is 40.", by the code read of `index.tsx` (`componentCountError`, no edit-mode condition). (b) decides in one observation | If (b)'s image still carries the line, production is not running M1b, or the image was not regenerated | uat | Devops's Stage 1 carrier `handoff/<name>.md` | open. Minting: not run. The browser server is disconnected in this session, and the run writes production rows. How the image URL is found for a saved message is **UNVERIFIED**; the executor establishes it first. Owed: the first stage-browser pass runs (b) once against production before release and records the unfixed value beside this prediction |

Re-key on revision 3: AC1b-4's local limb → B-5, its post-deploy limb → B-6. Every plan validation line that designates an operator-observed check has a row: AC1-6 → B-1. AC2-2's
browser half → B-2 (QAF-7). The defect's production observable → B-3, with its liveness row B-4. No
other plan line designates one (plan read whole).

## Existing-test audit (touched surface, Test Conventions)

Files read for class: `limits.send-gate-partition`, `limits.component-count`,
`messageValidity.predicate`, `limits.import-validation`, `limits.embed-text-errors`. Every test file
that calls the predicate (`grep -rln -E "validateMessage|isMessageValid|allowSave"` over `src` test
files: these plus `useApiMethods.json-editor-repair` and `utils.mutual-exclusivity`).

- ID-token class over the first five (basenames, titles, comments; `grep -c -i -P` with the class's
  own pattern, including `0NN` and dates): 0 hits in each.
- No pin of a known-unfixed bug on this surface. The rough M1 flips no case, so no existing case
  asserts a Discord-refused V2 shape as sendable.
- `messageValidity.predicate`'s parity cases compute the expectation with `validateMessage`. This is a
  delegation spec, so it is not Axiom E's self-referential class. But it cannot fail on a predicate
  defect, which is why AC1-7's new cases take Discord's verdict (Strategy).
- The barrel case ("imports the gate directly … identical either way") asserts module identity. It is
  not a source-text assertion and is left.
- No time-based cell on the surface.

## Handoffs read at this pass

- `handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md` (trigger: QA runs).
  **Item 1 discharged:** `qa/closed/014-test-suite-cleanup-qa.md` BC-7/AC8 now carries its terminal
  write, observed as predicted. Plan 015 is the first planning document in this workspace after 014
  (created `adc5c1a`), and it cites `agent-output/CLAUDE.md` § Test Conventions (line 1023). Statbot
  plan 024 lines 71 to 86 were read and agree. Items 2 and 3 are not QA's; the handoff stays `Open`,
  with a changelog row and `Status-Detail` brought into agreement.
- `handoff/website-tests-not-beside-their-module-2026-11-08.md` (through rider R1). Nothing is owed by
  QA at Phase 1. Reconcile at the re-key: rider R1 is dropped (plan rev 2, critique F-6), so the chain
  edits none of the six files and no rename evidence is owed at Phase 2.

## Process facts of this pass

- **A gate satisfied, disclosed:** the record's `stamp-gate-hook` refused this document's first write
  because its changelog stamp, `11:05`, was typed ahead of the clock. The stamp was replaced with the
  `date -u` minute (`11:00`) and written again. That is the gate's own remedy.
- Exports and scratch: `export-0e3d903` and `export-0e3d903-full` (a `git archive 0e3d903` with
  `node_modules` symlinked) under this session's scratchpad. The rough M1 was patched only there.
  Both are deleted at run end. No database, container or listener was started.
- The browser-walker's single look wrote a page snapshot under `/home/dev/Dev/.playwright-mcp/`, by
  its own report. The browser was closed and the profile caches emptied, its holder read showing
  "no holder".
- No secret printed or written: the bot token and the webhook token were held in the probe's memory
  only.

## Assumption Not Checked

Re-key pass on revision 7: this pass assumes the implementer's re-copy of the fixture into the website is byte-identical to `188bc93`'s, and does not check the chain branch, where the re-copy is pending. If false, AC1-1 runs over a different file. The signature is Phase 2's sha256 and blob check failing on `src/utils/__tests__/helpers/discordV2SendCorpus.ts`. Owner of closing it: QA Phase 2, by that check at the tip.

Regeneration pass: this pass assumes the website's test suite reads the fixture only through `DISCORD_V2_SEND_CORPUS`'s values, never its text (a file read or a source pattern match), and does not test it against the implementer's suite. Data identity holds by construction, but text identity does not. If false, a case that reads the fixture's text changes result on the re-copy. The signature is a suite case going red or green on the re-copy alone. Owner of closing it: the implementer, by the suite run on the re-copy, then QA Phase 2's audit (such a case would also be a source-text assertion under the Test Conventions).

Re-key pass on revision 6: this pass assumes the X-12 exclusion is the only file-level carve-out AC1-11 needs, i.e. that no other file the chain changes is red because of bytes another criterion fixes. It did not enumerate the implementer's changed set, which is in progress. If false, Phase 2 finds a second file over its base count with a reason like X-12's. The signature is a per-file count rising on a file whose content another criterion pins. Owner of closing it: QA Phase 2, by AC1-11's per-file run over the final range.

Re-key pass on revision 5: this pass assumes that revision 5 changes only the AC1b-1 wording, the Reading Order, the owed-re-verdicts table, the changelog and the Resumption State, as its own changelog row says. It read the diff whole (`c249af3..b2d78b0`, 48/29) and did not re-run the by-render probe, since no criterion's population moved. If false, a criterion moved without a QA read. The signature is a later gate citing a revision 5 limb that is absent from this pass's changelog row. Owner of closing it: code review, against the plan revision it reads.

Re-key pass on revision 4: this pass assumes that `DiscordContentEditor`'s edit branch (`Desktop.tsx`, `Mobile.tsx`) is never reached on `/preview` for any input, i.e. that `showEdit` reaching it is always false there, and does not test that by a selector the run saw fire (the edit-mode mutant did not surface that component's chrome in jsdom). If false, a long description or content shows a counter, ring or "Too long." in a preview image. The signature is B-5's browser read on a long-content draft showing any of them. Owner of closing it: the implementer's AC1b-1 DOM tests and code review of the signal's route (AC1b-3), then UAT's B-5 read with real CSS.

This pass assumes the research's recorded webhook-kind independence (F-11) still holds today, and does
not test it: every re-send went through the user-created webhook only. If false, a bot-created
webhook (which the website's users can also hold) gets a different verdict or error body for some
member. The signature is a B-1 or B-4 send behaving unlike the corpus. Owner of closing it: UAT, whose
B-1 send can use the other kind, or the next QA pass, by re-running `resend.py` on a bot-created
webhook.

Re-key pass on revision 3: this pass assumes the preview-image service screenshots exactly what `/preview` renders in jsdom-equivalent terms, i.e. no CSS rule in the image path re-shows a hidden line, and does not test it (the generator was not run). If false, an image carries a line the DOM tests say is absent. The signature is B-6 (b) still red with the tip serving. Owner of closing it: UAT, by B-5's browser read (real CSS) before release, and B-6 after.

Re-key pass on revision 2: this pass assumes Discord's verdicts on the 44 first-measured members (the
40 plus batch 3's 4) are stable and not transient, and does not re-send them; each was sent once. If false,
a member's recorded verdict is not what Discord returns now, and AC1-1 judges against a stale oracle. The
signature is a re-send differing from `measuredOn`'s verdict. Owner of closing it: QA Phase 2, by
re-running `resend.py` over the whole corpus once before its verdict, the plan's AC1-1 rule then deciding
any difference. This is also the critic's routed assumption.

## Handoff

- Findings QAF-1 to QAF-8 → `planner-hooks-016`, as one batch.
- Assumption Not Checked → UAT (B-1) or the next QA pass, named above.
- Next stage after the plan is approved: the implementer, with the fixture, the entry conditions and
  the register as input.

## Resumption State

Written 2026-11-11T12:58 at the end of the re-key on revision 7. Read this first on resume.

- **Done:** Phase 1 on revisions 1 to 7. QAF-1 to QAF-12 RESOLVED; no finding open. The fixture is regenerated (`188bc93`, sha256 `9ab22baa…a77afe`, blob `7fcf64f`), AC1-1's identity is checked, and AC1-11 has no exemption. Status `Awaiting Implementation`. The plan is `In Progress`.
- **Sent:** the rev-7 result → `planner-hooks-016`.
- **Next:** the code review's committed verdict (the Phase 2 start). A further plan revision is read as `git diff 9fd96d5 <rev> -- planning/016-send-check-validity.md`.
- **Trees:** website on `chain/016-send-check-validity` with the implementer's work; read only. No export or process left.
- **Owed later:** B-3 and B-6's production minting reads. At Phase 2: the whole-corpus re-send, the AC1-9 differential, AC1-10's probe, AC1-11's per-file eslint counts (no exemption), the fixture's sha256 and blob check (`9ab22baa…a77afe`, `7fcf64f`), the mutation sweep, and the by-render probe re-run at the tip.
- **Cache-warm wake:** armed (`2edc251f`).
