---
ID: 016
Origin: 016
UUID: 54673438
Verified-At: "0e3d903 — repos=website; Phase 1 strategy, read at this base tree; no verdict issued"
Status: Awaiting Implementation
Status-Detail: "Phase 1 written on plan revision 1 (record 3b4205d). AC1-1's corpus is built and confirmed against Discord (76 of 76 verdicts, 52 of 52 error bodies byte-identical). Eight findings (QAF-1 to QAF-8, five MEDIUM) go to planner-hooks-016 as one batch. This document holds the chain's blocking-condition register (B-1 to B-4)."
Phase: 1
---

# QA Report: Plan 016 — the send check refuses what Discord refuses

**Plan Reference**: `agent-output/planning/016-send-check-validity.md`, `Revision: 1`, read whole at
record `3b4205d` (the brief's anchor). Revision 1 was committed at `4c9bcf2`; `3b4205d` adds steering's
R-1 registration (D-12, D-13), which changes no requirement.

## Changelog

| Date | Agent Handoff | Request | Summary |
|------|---------------|---------|---------|
| 2026-11-11T11:00 | steering-queue-hooks → qa-hooks-016 | Phase 1 on revision 1 (brief `steering/queue-hooks-briefs/qa-016-brief.md`) | Phase 1. Corpus rebuilt and re-sent in the test server: 76 of 76 match Discord's earlier verdicts. 40 further members measured. Ledger tally by script: 52 + 24 = 76, each id once. Strategy per criterion, the Irreversible Side-Effect Register, register rows B-1 to B-4, and QAF-1 to QAF-8 (five MEDIUM, three LOW) for the planner. Status `Awaiting Implementation`. |

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

## Findings (Phase 1, to the planner as one batch)

QAF-1 MEDIUM Phase 1 — **AC1-2 enumerates placement for L1 to L5 only, and Discord refuses the L6 to L10
faults inside a Container too.** All 14 nested faults above returned 400, each beside an accepted nested
control. The research sent the L6 to L10 members only at top level or in a top-level Section. So a check
that walks top-level link buttons, Thumbnails, galleries and Files but not a Container's children passes
AC1-1 whole, while Discord refuses the nested form: the defect this chain exists to fix, one level down.
The save schema admits each nested shape (`shapes.ts`, `containerChildShape`: Action Row, Section, Media
Gallery, File; `sectionShape.accessory`: Thumbnail or link button). The same holds for "every item": a
second gallery item with url `''` is refused, so a check that reads only `items[0]` passes D3. **Asked:**
extend AC1-2 to every limb over the save schema's nesting (Action Row and Section accessory, top level and
in a Container; Media Gallery and its every item, top level and in a Container; File, top level and in a
Container). Mark L6 to L10's cells "anywhere in the tree" as L1, L3 and L5 are.

QAF-2 MEDIUM Phase 1 — **L8's "has no emoji" is undefined, and two members on each side of it are measured.**
Discord refuses a label-less link button whose emoji is `{}` or `{name: ''}` (400
`COMPONENT_INVALID_EMOJI`) and accepts one with a named emoji (X1). The save schema admits both refused
forms (`emojiShape`, every key optional). The contract cannot say which way a check should go, so by the
disposition order (step 2) the contract is the defect, not a guard behind it. These forms arrive only by
JSON: `LinkButtonEditor.tsx` has no emoji control (research F-5). **Asked:** define "an emoji" for L8, for
example an `emoji` with a non-empty `id` or `name`. State whether an invalid emoji beside a label is in
the class. It is unmeasured, and residue if out.

QAF-3 MEDIUM Phase 1 — **L8's `trim()` disagrees with Discord on a label, for both of D-9's characters.**
Measured: label U+0085 → Discord 400, but `trim()` leaves length 1, so an L8 check as written passes it
(a missed refusal). Label U+FEFF → Discord **200**, but `trim()` empties it, so the check refuses it (a
false refusal, RK-1's class, and a member AC1-4 would fail if the measured accepted set includes it).
D-9 rules the two exceptions for a Text Display only, and his option text was about that check. Label
U+00A0 is refused by both. **Asked:** whether L8 takes D-9's two exceptions. If extending a ruling the
owner gave for one field needs his word, it is his; the planner judges that. Reachability: typed or
pasted into the label input, which stores what it is given (research methodology, `typed`).

QAF-4 MEDIUM Phase 1 — **AC1-1 and AC1-4 judge the research's 76 examples, not the class the limbs state.**
Each L1 member is a single character. The rule D-9 states ("U+0085 counted as whitespace, U+FEFF counted
as content") is a class, and its discriminating members are runs. Measured: `"\u0085 "` and
`" \u0085\n"` refused, `"﻿ "`, `"a\u0085"` and `"​ "` accepted. Two implementations pass all
76 and fail these: one that special-cases `content === '\u0085'`, and one that tests
`/^[\s\u0085]*$/`, since JavaScript's `\s` contains U+FEFF and so refuses `"﻿ "`. The same gap covers
the key-absent forms of AC1-3 (QAF-5) and the 1024/1025 boundary, which AC1-1's corpus does not hold.
**Asked:** make AC1-1 and AC1-4's population the measured set in
`verification/016/corpus/fixture/discordV2SendCorpus.ts`: the 76 plus this pass's 40, each with
Discord's verdict. A member QAF-2 or QAF-3 leaves undecided goes out by name. A member whose ledger cell
the plan does not change is residue, never a blocking finding.

QAF-5 LOW Phase 1 — **L5's limb says "empty" while AC1-3 requires every field of L1 to L6 to refuse
key-absent too.** Discord refuses an Action Row with no `components` key (400 `BASE_TYPE_REQUIRED`,
`Q2-row-components-absent`). It also refuses the other "not sent" absent forms: Section `components`,
link-button `url`, Thumbnail `media` (absent and `{}`), gallery item `media`, File `file`. **Asked:** L5
reads "empty or absent", and AC1-3's population names these measured members.

QAF-6 MEDIUM Phase 1 — **M1's "Nothing else changes in what is sent, saved or refused" has no criterion.**
AC1-8 covers `validateContentRequirements` only. The stated preservation is wider. A classic message
(the *Reach* assumption: V2 by flag or by structure only) and a V2 message outside L1 to L10 must get
the same `validateMessage` result as at `0e3d903`. With no assertion, a check that ignores `hasV2` and
refuses a classic message's empty Action Row would pass every M1 criterion. By the severity floor, a
claimed preservation with no failing assertion blocks. **Asked:** a criterion (AC1-9 or an AC1-8 limb)
stating it, decided by a two-tree differential. QA builds the differential at Phase 2
(`verification/016/differential/`): `validateMessage` at `0e3d903` and at the tip, over (a) the corpus
with V2 structure replaced by classic analogues and the flag cleared, (b) every input the existing
`limits.*`, `utils.mutual-exclusivity` and `messageValidity.predicate` tests pass to the predicate, and
(c) the accepted corpus members. Movement is allowed only on members of an L1 to L10 refused class. A
suite case that pins a classic link button with url `''` as sendable is not the instrument: Discord's
verdict on it is unmeasured (X-6), so the pin could be known-wrong in waiting (Axiom D).

QAF-7 LOW Phase 1 — **AC2-2 ("cap typed and pasted input") has no instrument that can see a paste.** jsdom
does not apply `maxLength` to typing or paste (the environment-fidelity convention: assert only what the
substitute environment does like a browser). The suite can assert the rendered `<input>`'s `maxLength`
is 1024. That also catches a wrapper that drops the prop, which `LinkButtonEditor`'s sibling depends on
for nothing. The cap itself is a browser fact. **Asked:** name the instrument. This pass mints it as
register row B-2 (UAT, pre-release); the plan cites it.

QAF-8 LOW Phase 1 — **AC1-5's unit is unclear: one reason per limb, or per limb and type.** L6, L7 and L10
each span types (Thumbnail, gallery item, link button), and AC1-5 also says the reason "names the
component type". Both readings are testable but they assert different populations. **Asked:** say which.
Under either, the test asserts distinctness pairwise over the set and against the existing reasons
(`validateContentRequirements`, `validateComponentCount`, `validateDisplayableTextCount`, username and
embed reasons). It asserts the type word by a literal, never by importing the reason strings.

No finding against D-10, AC2-3, rider R1 or the stored-row residue. AC2-3's "the save schema admits a
1025-character description at the tip" is the owner's ruling (W-2, D-10), not a known-wrong pin.

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
| `isMessageValid` (AC1-7) | `messageValidity.predicate.test.ts` (rider R1 moves it to `src/server/api/utils/__tests__/` if edited) | `isMessageValid` against **Discord's verdict** (`discord === 'accepted'`), never against `validateMessage`'s result. The file's existing parity case states delegation and cannot fail on a predicate defect. |
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
| AC1-8 | `validateContentRequirements`'s existing test classes (`limits.send-gate-partition` PARTITION and its extensions; `utils.mutual-exclusivity`) | Whitespace content beside V2 (A4: Discord accepts) | Phase 2 two-tree differential, plus the existing tests unchanged and green |
| AC2-1 | One constant, two inputs, one check | 1024 passes, 1025 refused at Send, for both description fields | Suite (literals 1024 and 1025, never the constant read back) |
| AC2-2 | Two inputs | Paste of 1100 characters; a stored over-1024 description is shown and editable | Suite (attribute) + B-2 (browser) |
| AC2-3 | The save schema | 1025 admits, and `isMessageValid` is false for it | Suite |

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
| B-1 | observable pre-release | AC1-6: on a local build of the chain tip, a V2 message with a freshly added Text Display shows the reason line in the editor and the send-page preview, with Send disabled. Filled in, the line goes and Send is enabled, and the send to the test-server webhook returns 200. Record N-2 (one typed space reaches the data as a space or not) | Stage browser walk (browser-walker) on the local build, signed in as the test account | UAT; owner as fallback subject | Chain tip committed; local stack up with `ALTER SEQUENCE "Messages_id_seq" RESTART WITH 900000000000001` after the schema push and before the first save; the id range written recorded | Line present and Send disabled; line absent and Send enabled after filling; send 200 | If Send stays enabled on the fresh Text Display, the user still meets the generic toast and the fix buys him nothing. If the line never clears after filling, every V2 message is unsendable | uat | UAT pass of chain 016 (to be briefed; document not yet created) | open |
| B-2 | observable pre-release | AC2-2: pasting 1100 characters into the Thumbnail description and into a gallery item description leaves 1024 in each field. Typing at 1024 adds nothing | Same walk as B-1; field length read by `browser_evaluate` (`input.value.length`) | UAT; owner fallback | As B-1; depends on B-1's stack | 1024 and 1024 | If the paste lands whole, the user composes a description Discord refuses, and only Send's reason catches it | uat | UAT pass of chain 016 | open |
| B-3 | post-deploy-observable | The user-reported defect (handoff `components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`, his words) is fixed in production. On hooks.gg, a new V2 message with one fresh Text Display shows the Text Display reason line, and Send is disabled | Stage browser single look on `https://hooks.gg/message/m/new` → "My Account" → V2 → add Text Display; read `.text-error` lines. Read-only: no Save, no Send | UAT stage; owner fallback | Production serving the chain's merge SHA (how that is verified is devops's to establish) | **Fixed:** the line present. **Unfixed (`0e3d903`, by code read):** no line, since `DiscordMessageEditor/index.tsx`'s error lines are `noContentError`, `v2TextError` and `componentCountError`, and none fires for one empty Text Display. One observation decides | If no line shows after deploy, production is not running the fix, or the fix does not reach the editor | uat | Devops's Stage 1 carrier `handoff/<name>.md` | open. **Minting run attempted 10:52Z, not completed:** the page showed a "Select a Server" picker before the editor, and the walker was not authorised to choose. The browser server then disconnected. Owed: the first stage-browser pass of this chain runs the look once against production before release, read-only, and records the unfixed value beside this prediction |
| B-4 | post-deploy-observable | Liveness beside B-3, which declines sends: in production a filled V2 message (one Text Display "hello") still sends. The test account's own message, sent to the test-server webhook, returns success | Stage browser walk on hooks.gg as the test account (its own row: `discord-test-browser` skill) | UAT stage; owner fallback | As B-3; same session as B-3 (B-3's refused member is the control) | Send enabled; Discord 200; message visible in `#general` | If a filled message cannot be sent, the change blocks every V2 user: the most-exposed class is every V2 sender | uat | Devops's Stage 1 carrier | open; depends on B-3's session |

Every plan validation line that designates an operator-observed check has a row: AC1-6 → B-1. AC2-2's
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
  QA at Phase 1. At Phase 2, the rename evidence is the per-file case count and pass set, identical
  at the trees before and after the move.

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

This pass assumes the research's recorded webhook-kind independence (F-11) still holds today, and does
not test it: every re-send went through the user-created webhook only. If false, a bot-created
webhook (which the website's users can also hold) gets a different verdict or error body for some
member. The signature is a B-1 or B-4 send behaving unlike the corpus. Owner of closing it: UAT, whose
B-1 send can use the other kind, or the next QA pass, by re-running `resend.py` on a bot-created
webhook.

## Handoff

- Findings QAF-1 to QAF-8 → `planner-hooks-016`, as one batch.
- Assumption Not Checked → UAT (B-1) or the next QA pass, named above.
- Next stage after the plan is approved: the implementer, with the fixture, the entry conditions and
  the register as input.
