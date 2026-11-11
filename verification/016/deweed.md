# Deweed table — chain 016 (the send-check validity chain)

Written by `deweeder-hooks-016`. One section per round, appended. A row scores one test case, or a
group of `it.each` rows that share a score, a reason and a disposition.

## Round 1 — 2026-11-11T12:04Z

- **Repository:** `website`
- **Range:** `0e3d903..df0fc0b` on `chain/016-send-check-validity` (M1 `ae7c8fe`, M1b `44ecd05`, M2 `df0fc0b`)
- **Paths and limits:** none named by the implementer's message; no other chain commits to the branch.
- **Tree check:** branch `chain/016-send-check-validity`, `HEAD` `df0fc0b` at round start
  (`git merge-base --is-ancestor df0fc0b HEAD` exit 0); `git status --porcelain` showed only the
  untracked `.playwright-mcp/`.
- **Read for this round:** plan 016 revision 5 whole, then its diff to revision 6
  (`git diff b2d78b0 a8468d0`); QA's Phase 1 document whole, then the same diff; the implementation
  document (untracked in the working tree, read at 12:02Z); Test Conventions (`CLAUDE.md`).
- **Deletion commits:** `7a268dc` (deletions), then `4cdb81a` (one deletion undone, see Process
  facts). Net over the range tip, `git diff --numstat df0fc0b 4cdb81a`: `page.invalid-data.test.tsx`
  0/8, `DiscordMessageEditor.component-limit.test.tsx` 0/7, `limits.v2-send-validity.test.ts` 1/23.
- **Suite at `4cdb81a`:** `npx vitest run --reporter=json`, exit 0, `numTotalTests` 1499, passed
  1499, failed 0, 122 `testResults` entries. `pnpm run typecheck`, exit 0. The implementation
  document records 1514 at `df0fc0b`; 15 executed cases are removed.

Hold sources: **msg** is the implementer's round 1 message; **EC** is an Entry Conditions row of
`implementation/016-send-check-validity-implementation.md`. Where the message names a group rather
than a title ("the L1/L7/L8/L10 sole-carrier cases"), the held rows are the ones that realise a
literal carrier in QA's "Coverage obligations"; the other rows of the same table are scored on
their own. Corpus ids (B2, W6, Q-…) are members of `helpers/discordV2SendCorpus.ts`.

### `src/utils/__tests__/limits.v2-send-validity.test.ts`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `covers the whole measured population` | 2 | Asserts the fixture's own 86/34 split; exercises no production code | left unasserted if removed: the split (Phase 2's sha256 check decides the fixture) | held: EC ("Corpus fixture byte-identical") |
| `refuses a message Discord refused: $shape` (86 rows) | 9 | Each row is the only case for one measured member AC1-1 quantifies over | — | held: msg |
| `sends a message Discord accepted: $shape` (34 rows) | 9 | Each row is the only case for one accepted member (AC1-4) | — | held: msg |
| `records a message Discord refused as not valid: $shape` (86 rows) | 9 | Only assertions of the stored `valid` verdict against Discord's (AC1-7) | — | held: msg |
| `records a message Discord accepted as valid: $shape` (34 rows) | 9 | As above, accepted side | — | held: msg |
| `refuses an empty Action Row when only the V2 flag makes the message V2` | 9 | The one fixture where the flag conjunct alone decides reach | — | held: msg |
| `refuses an empty Text Display when only the component types make the message V2` | 9 | The one fixture where structure alone decides reach; every corpus body carries the flag | — | held: msg |
| `leaves a classic message with a link button in every refused button shape as it was` | 9 | Discriminating control of the reach class: fails if the V2 gate is dropped from `validateMessage` | — | held: msg (the reach fixtures) |
| `sends a V2 message with a Separator and a filled Text Display` | 5 | Same body as corpus F2 | corpus row F2, `sends a message Discord accepted` | removed |
| `refuses a Text Display of a space` | 5 | Same input as corpus B2 | corpus B2 | held: msg (L1 carrier `" "`) |
| `refuses a Text Display of U+0085 alone` | 5 | Same input as corpus W6 | corpus W6 | held: msg (L1 carrier, U+0085 counted as whitespace) |
| `refuses a Text Display of` a tab and a newline · U+00A0 · U+0085 between spaces · U+0085 repeated (4 rows) | 5 | Repeat corpus W1/B3, B4, Q3 run members with the same or equivalent data | corpus W1, B3, B4, Q3-td-space-u0085-space-u0085-space, Q3-td-u0085-u0085 | removed |
| `sends a Text Display of U+FEFF beside a space` | 5 | Same input as corpus Q2-td-ufeff-space | that corpus row | held: msg (L1 carrier, U+FEFF counted as content) |
| `sends a Text Display of text padded with spaces` | 5 | Same input as corpus W8 | corpus W8 | held: msg (L1 carrier, `trim()`) |
| `sends a Text Display of` U+FEFF alone · text with U+0085 after it · U+200B beside a space (3 rows) | 5 | Same inputs as corpus W5, Q2-td-u0085-in-text, Q2-td-u200b-space | those corpus rows | removed |
| `refuses a link button labelled a space` | 5 | Same fault as corpus H6 | corpus H6 | held: msg (L8 carrier, label after trim) |
| `refuses a link button labelled` U+0085 · U+0085 between spaces (2 rows) | 5 | Same inputs as corpus Q2-label-u0085, Q3-label-u0085-space-u0085 | those corpus rows | removed |
| `sends a link button labelled U+FEFF` | 5 | Same input as corpus Q2-label-ufeff | that corpus row | removed |
| `sends it when the emoji has an id` | 9 | Only case where the emoji `id` half of L8's definition alone decides; corpus X1 carries a name only | — | kept |
| `sends it when the emoji has a name` | 5 | Same shape as corpus X1 | corpus X1 | held: msg (L8 carrier, emoji clause) |
| `refuses it for an empty emoji object` · `an emoji with an empty name` (2 rows) | 5 | Same shapes as corpus Q2-btn-emoji-empty-object, Q2-btn-emoji-name-empty | those corpus rows | held: msg (L8 carrier, QAF-2's members) |
| `refuses it for an emoji with an empty id and name` | 9 | Only case for "non-empty `id`": an `id` present but empty must not count as an emoji | — | kept |
| `sends %s with a description of 1024 characters and refuses 1025` (2 rows) | 5 | Same bounds as corpus Q-thumb-desc-1024/1025, Q-gal-desc-1024/1025-top | those corpus rows | held: msg (L10 carrier, length limb) |
| `sends %s with a one-space description and refuses an empty one` (2 rows) | 5 | Same shapes as corpus C10/C11, D4/D5 | those corpus rows | held: msg (L10 carrier, empty limb and control) |
| `refuses a %s at %s`, rows with no corpus member (17 rows): the five link-button faults at top (fault on the second button); in a Container: Text Display with no content, Section with no accessory, empty Container, Thumbnail with no media, Thumbnail 1025 description, gallery item with no media, gallery item invalid URL, link button URL key absent; at top: gallery item with no media, invalid URL, empty description and 1025 description on the second item | 7 | Constructed placements AC1-2 extends from the schema; the second-button rows are the only cases that a fault past the first button refuses. The empty-Container-in-a-Container row is input the save schema's nesting excludes and would score 5 alone | — | kept |
| `refuses a %s at %s`, rows that repeat a corpus member (29 rows) | 5 | Same fault at the same placement as a corpus member (B1, B6, B11, C2–C4, D2, G2, H2, E2, I2, C10, X2, X3 and the Q- nested members) | the named corpus rows | kept: the rows are generated from `faults` × `placements`, and every `faults` entry is also used by a kept case below, so no row can be removed without rewriting the table |
| `refuses a link button fault as a Section accessory at %s` (2 rows) | 5 | Same shapes as corpus C6 and Q-sec-btn-url-empty | those corpus rows | removed |
| `sends a filled piece of each kind at %s` (2 rows) | 9 | Discriminating control of the placement table: shows each host built by `place` is itself accepted | — | kept |
| `names the component type for a $name` (19 rows, one per distinct reason) | 9 | Only case per (limb, component type) reason that the reason names its type (AC1-5) | — | kept |
| `names the component type for a $name`, the four key-absent faults | 5 | Implied by the same-reason case and the empty-form row | `gives the absent form the same reason as the empty form` | kept: generated from `faults`, inseparable as above |
| `gives every fault a reason of its own, apart from the reasons already in use` | 9 | Only assertion that reasons are pairwise distinct and distinct from the existing ones (AC1-5) | — | kept |
| `gives the absent form the same reason as the empty form` | 8 | Only assertion that an absent key is refused the same way as an empty one (AC1-3) | — | kept |

### `src/components/DiscordMessageEditor/__tests__/DiscordMessageEditor.component-limit.test.tsx`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `shows one line naming the Text Display, with a red border, for an empty Text Display` | 8 | Only DOM assertion that the new reason reaches the editor line and the border union | — | kept |
| `shows no line and no border for a filled Text Display` | 5 | Same mount and same end state as the filled half of the drop case | `drops the line once the Text Display is filled` | removed |
| `shows the line for an empty Action Row when only the V2 flag makes the message V2` | 8 | Only case that fails if the editor stops passing `message.flags` to the validator | — | kept |
| `shows no line for an empty Action Row in a classic message` | 7 | Control through the editor; overlaps the predicate's classic control only in part | — | kept |
| `shows the line after the components-total line` | 7 | Only case where the new line and the total line show together | — | held: EC (QA entry 2) |
| `drops the line once the Text Display is filled` | 8 | The filled-in transition a user sees (AC1-6 in DOM) | — | kept |
| `shows the line when the message is not being edited, as the send page preview does` | 9 | Discriminating control for the preview signal: a read-only render without it keeps the line (AC1b-2) | — | kept |
| `shows the total and the limit with a red border when validation is not hidden` (retitled, body unchanged) | 9 | Same control for the existing total line | — | kept |

### `src/app/preview/__tests__/page.invalid-data.test.tsx`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `shows no error line and no red border for %s`: nothing in it · embeds over 6000 · Text Displays over 4000 · 41 components · empty Text Display · empty username (6 rows) | 9 | Each row is the only `/preview` case for one member of AC1b-1's class | — | held: msg |
| `shows no error line and no red border for a username Discord does not allow` | 5 | Second trigger for the Author member; the code path does not differ by username | the empty-username row | held: msg (the seven per-member rows) |
| `shows neither for a message within every limit` | 5 | With the signal set no line can render for any message, so it repeats the rows above with a trigger-free message | the `41 components` row | removed |

### `src/components/DiscordMessageEditor/components/__tests__/Author.username-error.test.tsx`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `shows the username error in the %s style` (2 rows) | 9 | Discriminating control: without the signal the line stays, in each style | — | held: msg |
| `shows no username error in the %s style when validation is hidden` (2 rows) | 9 | Compact is the only case for that branch (QAF-12); cozy is the component-level red test | — | held: msg |
| `shows no error for a valid username in the %s style` (2 rows) | 5 | A render that always emits the line already fails the hidden rows | the hidden rows | held: msg (the Author cases) |

### `ComponentEditors/__tests__/ThumbnailEditor.description-limit.test.tsx` and `MediaGalleryEditor.description-limit.test.tsx`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `stops typing and pasting at 1024 characters` (one per file) | 9 | The red test of each input's TDD Compliance row; literal 1024 | — | held: msg, EC (QA entry 3) |
| `shows a stored description longer than 1024 in full` (one per file) | 7 | Fails if the cap is implemented by truncating the stored value; not decidable further from the code | — | kept |

### `src/server/api/utils/__tests__/shapes.message-validation.test.ts`

| Case | Score | Reason | Covered by / left unasserted | Disposition |
|---|---|---|---|---|
| `saves a Thumbnail description longer than 1024 characters` | 9 | Only assertion that the save schema admits it (AC2-3); a `.max(1024)` on the field fails it | — | convention: never-red guard (also held: msg). The mutation its disposition owes is the implementer's, recorded as pending in the TDD Compliance section |
| `saves a gallery item description longer than 1024 characters` | 9 | As above, for the gallery item field | — | convention: never-red guard (also held: msg). The pending mutant named in the implementation document covers only the Thumbnail field |

### Not in the population

`src/utils/__tests__/helpers/discordV2SendCorpus.ts` is a fixture every corpus case uses, fixed
byte-identical by AC1-1; `sha256sum` at `df0fc0b` gave `49b54f8e…15bb9b`. Untouched.

### Process facts

- **A deletion made and undone.** `7a268dc` removed `covers the whole measured population` at
  score 2. The implementation document did not exist at session start and I looked for it at round
  start with a listing that returned nothing; it appeared in the working tree (untracked) while the
  round ran, and I read it only after the commit. Its Entry Conditions row "Corpus fixture
  byte-identical" names that case by file and title, so it is held. `4cdb81a` restores it exactly
  (`git diff df0fc0b 4cdb81a` shows no hunk on it); suite and typecheck were run again at that tree.
- **Deletion by script.** The rows holding literal U+00A0, U+FEFF and U+200B characters in
  `limits.v2-send-validity.test.ts` were deleted by a line-range script that asserted each line's
  title before writing; the resulting diff was read whole before the commit.
- **No red run.** The suite was green on the first run after the deletions, so no deletion was
  undone for redness.
