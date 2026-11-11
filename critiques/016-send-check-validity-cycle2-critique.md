---
ID: 016
Origin: 016
UUID: 54673438
Status: Open
Status-Detail: "Cycle 2 pass 1 on plan revision 3: APPROVED, with the stop authority fired on F-12 (MEDIUM, M1b's class is narrower than D-14's words). F-12 is closed by property and lands when the planner folds the architect's AF-12; F-13 and F-14 (LOW) go to the Planner batch. Open until those landings are recorded in the plan."
Artifact-Revision: 3 — read as the diff 6b07655..21db6c8 (72 added, 36 removed), against revision 2 read at cycle 1
Reviewed-At: "21db6c8 — repos=agent-output; website code read at 0e3d903 (master); corpus fixture blob 9fb22ae"
Verdict: APPROVED
---

# Critique — Plan 016, the send check refuses what Discord refuses — cycle 2

**Artifact**: `planning/016-send-check-validity.md`, revision 3 (`21db6c8`). **Analysis**: none
commissioned. **Prior cycle**: `critiques/closed/016-send-check-validity-critique.md` (cycle 1,
resolved at revision 2, `5c1512f`). Revision 3 adds a milestone and changes a criterion's predicate,
so it opens cycle 2. **Date**: 2026-11-11.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-11T11:16 | planner-hooks-016 (message, 11:13Z) | cycle 2 pass 1: delta over `6b07655..21db6c8` (revision 3) | Delta-bounded pass: the new milestone M1b is wholly inside the diff (72/36, read whole), and the plan at `HEAD` is `21db6c8` (`git diff --quiet`, exit 0). Artifact changes: M1b added (D-14, the owner's selection 23); whitespace-empty restated per character; corpus re-pinned to 120 members. Findings addressed: cycle 1's F-11 is landed by revision 3's predicate. New findings: F-12 MEDIUM (closed by property under the stop authority; duplicates the architect's AF-12), F-13 LOW, F-14 LOW. Verdict APPROVED. Pricing: sized to the ask as D-14 extended it. |

## Verdict

**APPROVED — cycle 2, pass 1.**

Pricing: sized to the ask as the owner extended it. Selection 14 asked for one send-check change
with the 1024 bound. Selection 23 (D-14) added one change to the preview route, and M1b is that
change and nothing more.

**The stop authority fired on this pass, on F-12.** F-12 is the second instance of one shape: a
class enumerated over part of the domain its property is stated over (the first was cycle 1's F-3,
placement). No revision is requested by this critique for it. It is closed by the property below.
The hard stop did not fire. Nothing routes to the owner from this pass.

**The property (F-12).** On `/preview`, the rendered tree carries no validation chrome: no error
text and no error border, from any component `DiscordMessageEditor` renders there. This is D-14's
own wording ("no error lines and no red border at all"). The domain is every component in that
tree, not `DiscordMessageEditor/index.tsx` alone. Its members are enumerated by rendering
`/preview` with each validator's trigger present and reading the output.

Members at `0e3d903`, by this pass's read:

- The plan's six, all in `index.tsx`.
- A seventh the plan does not list: the username error line in
  `DiscordMessageEditor/components/Author.tsx`. It is computed by `validateUsername` and rendered
  with no edit-mode condition. `ContentBody.tsx` renders `Author`, and `index.tsx` shows
  `ContentBody` whenever the tree is not editing, so the line reaches `/preview`.
  `MIN_NAME_LENGTH` is 1, so a message with no username triggers it.

Residue this pass did not read, as a bounded class: chrome driven by `data-erroring-state`
(`styles.errorStateBorder`) outside edit mode, and whatever the sub-components' read-only branches
render. The architect's AF-12 lists `EmbedField`, `EmbedTitle`, `EmbedAuthor` and `EmbedFooter`
there. In this pass's read, the error lines of the first three sit below an early return on
`!showEdit`, and `EmbedFooter`'s is commented out; the read-only branches themselves were not read.
Membership is therefore settled by the render, not by either list.

Who bears it: the planner folds AF-12 in its next revision, which restates M1b's class. QA
enumerates the members by render when it re-keys. An implementer who finds a further member treats
it as inside M1b, since D-14 already covers it.

## Value Statement Assessment

Unchanged by revision 3. M1b serves a second outcome the owner chose by selection 23; the changelog
row sizes it against the original ask and says so.

## Assumption Not Checked

This pass assumes a save regenerates a message's preview image, as the plan cites from steering's
read of `upsertMessage`, and does not test it. If that is false, an image saved after release still
carries a line although `/preview` renders none. UAT's post-deploy read under AC1b-4 owns closing
it.

Premises run in this pass:

- **The re-pinned corpus.** The plan says 120 members, 86 refused and 34 accepted, blob `9fb22ae`.
  `grep -c` over the fixture gives 86 `"discord": "refused"` and 34 `"discord": "accepted"`;
  `git hash-object` gives `9fb22ae`.
- **The render sites.** The plan enumerates them by a grep for the JSX tags. A second instrument,
  `git grep -l` for importers of the editor module and of `MessagePreview` at `0e3d903`, gives the
  same five sites: the preview page, the edit page, the send page, `EditMessageMenu.tsx` and
  `NewMessageModal.tsx`.
- **Open questions.** 5 lines name `OPEN QUESTION`; 4 are `[RESOLVED]` and the fifth is the section
  heading. No milestone is `PREMISE-STALE`.

## Findings

### Medium

**F-12 MEDIUM cycle 2 pass 1 — CLOSED BY PROPERTY (stop authority). M1b's class lists six members of one file; D-14 covers every error line on the route.** Duplicates: AF-12 in `architecture/016-send-check-validity-architecture-findings.md`
- **Location**: plan M1b, "The class, enumerated at `0e3d903`", and AC1b-1 ("Each of the six
  members"); D-14.
- **Description**: the class is enumerated from `DiscordMessageEditor/index.tsx`. At least one
  error line outside that file renders on `/preview`: the username line in `Author.tsx` (see
  Verdict, "The property").
- **Impact**: built to the six, the route still shows an error line, and a preview image carries
  it. That is 1 verified member outside the class, for every message whose username is empty, over
  80 characters or disallowed.
- **Disposition**: closed by the property in the Verdict; decided by the critic under the stop
  authority. Landing trigger: the planner's fold of AF-12, which the architect requires.

### Low

**F-13 LOW cycle 2 pass 1 — OPEN. AC1b-4's post-deploy half names no instrument and has no positive read.**
- **Location**: plan AC1b-4 ("After deploy, the preview image … carries no red line").
- **Description**: the criterion is a negative read off a generated image. It does not say where
  the image is read, and nothing shows the instrument can see a line in an image at all. A stale
  image, or an image that was never regenerated, reads "no red line" for the wrong reason.
- **Recommendation**: name where the image is read, and cite one read of an image that carries a
  line today (an existing line's state qualifies), taken before release. Planner batch; QA
  registers the row.

**F-14 LOW cycle 2 pass 1 — OPEN. M1b does not state its residue for images already generated.**
- **Location**: plan M1b, "What changes" ("in every preview image generated from it"); D-14 ("no
  preview image carries them").
- **Description**: M1b changes what the route renders from release onward. An image generated
  before release for a message in an error state keeps its line until that message is saved again.
  The plan states the matching residue for stored `valid` (RK-3) and not for images.
- **Recommendation**: state it as a limit beside RK-3. Planner batch.

### Carried from cycle 1

F-11 LOW cycle 1 pass 2 RESOLVED — the per-character definition removes the difference between the two wordings; landed by the author in plan rev 3, ledger "Whitespace-empty", and verified here against QA's three U+0085-run members in the corpus.

## Review-method lines with no finding

- **AC1b-3's negative has an instrument.** "No other render site passes the signal" is caught by
  AC1b-2, which requires every member to render on each other site.
- **M1b's rollback and re-derivation.** The rollback names its command and follows M1's runners.
  M1b carries its re-derivation paragraph against M1.
- **D-14.** The row quotes the selection and the option text as the rulings block records them
  (`steering/queue-hooks-rulings.md`, block "2026-11-11T11:11Z — selection 23"), and names the
  reversal of plan 015 D33.
- **Release target and Reading Order.** The target is unchanged. The plan is 475 lines; no Reading
  Order is owed under 500.

## Questions

None for the owner.
