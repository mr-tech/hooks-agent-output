---
ID: 019
Origin: 019
UUID: 286c730a
Status: Resolved
Status-Detail: "Cycle 5 pass 1 on plan revision 11: APPROVED, and closed at that pass. F-1 to F-33 are RESOLVED, each verified landed. F-34 (SL-11) and F-35 are Planner batch rows in the plan (R-32). F-36 and F-37 are closed as landed-by-author: their landing is the plan's Planner batch, folded at the seam after the last milestone's QA Phase 2. A later revision that changes a criterion's text opens cycle 6."
Artifact-Revision: 11 — read as the delta 890d0b78..ec2440d9 (cycle 5 pass 1)
Reviewed-At: "ec2440d9 — repos=agent-output; no website source read in this pass"
Verdict: APPROVED
---

# Critique — Plan 019, Slate formatting on Discord's engine

**Artifact**: `planning/019-slate-formatting-discord-engine.md`, revision 11 (`ec2440d9`). Revisions 1 and 2 were read whole
(passes 1 and 2); revision 3 as a delta with M5 and M6 whole (pass 3); revisions 4 to 11 as deltas.
**Read at cycle 5 pass 1**: the plan's diff `890d0b78..ec2440d9`; the plan at `ec2440d9` at AC-3.7 whole, AC-3.4, AC-3.8,
"Adjustments toward legacy", M4's adjustment-module lines, outcome rows C5 and C6, RK-9, X-23 and the Reading Order; the two
measurement files the revision cites, `verification/019/impl/m4-residue-measurement-6379abc.json` and
`m4-dom-residue-before.json`, with their run logs, as they stand in the working tree (neither is in `HEAD` at `047add44`);
the M4 implementation document and the code-review document at their lines naming AC-3.7; the effort rulings file's block
headings from 22:00Z.
**Read at cycle 4 pass 1**: the plan's diff `47348a6d..890d0b78`; effort rulings blocks 21:18Z, 21:31Z and 21:38Z; the plan's
AC-6.3, AN-8 sign-in limb, Testing Strategy, Reading Order, X-14 and RK-8 as they stand at `890d0b78`; website at `5ec0621`:
`src/utils/markdown/rules.tsx` (the four mention rules), `src/providers/GuildProvider.tsx` whole,
`src/providers/WebhookProvider.tsx:useValue`, `src/utils/redis/index.ts:fetchChannels`, `src/app/_components/Providers.tsx`,
`src/app/message/layout.tsx`, the `src/app` layout and preview listing, `src/constants/index.ts` (the channel-type sets); website
at `7dcedc9`: `src/utils/markdown/engine.ts` (`MENTION_KINDS`, `STATIC_MENTION_KINDS`);
`verification/019/analysis/an3/an3-dom2.json` for the channel's drawn form.
**Read at cycle 3 pass 2**: the plan's diff `7b419f5b..47348a6d`; effort rulings block 18:02Z.
**Read at cycle 3 pass 1**: the plan's diff `e0eb1e87..7b419f5b`; effort rulings blocks 17:56Z and 17:58Z; website
`src/utils/loadLocales.ts` and its two importers, `MarkdownTimestamp.tsx` at its picker lines, and `pnpm-lock.yaml`'s dayjs
entry, all at `af3d95a`; `verification/019/qa/probe-r7-timestamp-locale.out`; GLOSSARY, "Severity floor".
**Read at cycle 2 pass 2**: the plan's diff `946d4e54..e0eb1e87`; `verification/019/planning/timestamp-s-S-dayjs-vs-intl.txt`;
website `MarkdownTimestamp.tsx` and `src/components/LoadLocale.tsx` at `af3d95a`.
**Read at cycle 2 pass 1**: the plan's diff `d2912590..946d4e54`; the analysis's AN-8 section at `3681654e` (limbs 1, 2 and
2b); website `src/utils/markdown/components/MarkdownTimestamp.tsx` at `af3d95a`.
**Read at cycle 1 pass 5**: the plan's diff `e53c7cdb..d2912590`; `verification/019/qa/probe-mask-vs-an3-table.r4.out`.
**Analysis**: `analysis/019-slate-formatting-discord-engine-analysis.md` (`3681654e`). AN-8's limbs 1 to 4 and 2b have landed;
limb 5 has not.
**Read at cycle 1 pass 4**: the plan's diff `9ac9ba62..e53c7cdb`; the analysis at its wasm-hash lines and AN-3's GAME_MENTION
row; QA's document at `24d537bf` for its GAME_MENTION finding; `verification/019/qa/probe-mask-vs-an3-table.out`; QA's P-Q9 row
for the 15,480 figure.
**Read at earlier passes**: listed in this critique at `af0b21d` (pass 3), `e3e49ac7` (pass 2) and `0435794c` (pass 1).
**Roadmap**: `roadmap/` holds no roadmap document, so alignment is judged against the rulings and the architecture record.
**Date**: 2026-11-23.

## Changelog

| Date | Handoff | Request | Summary |
|---|---|---|---|
| 2026-11-23T16:11 | steering-hooks-fixer (brief `steering/019-brief-critic.md`) | cycle 1 pass 1: plan revision 1, whole-document read | Depth: whole-document, the cycle's first pass, at `103687b4`. New findings: F-1 to F-23 (3 HIGH, 15 MEDIUM, 5 LOW), all OPEN. Verdict REQUEST REVISION. |
| 2026-11-23T16:34 | planner-019 (message naming revision 2 at `8dfd4659`) | cycle 1 pass 2: plan revision 2, whole-document read | Depth: whole-document. Findings addressed: F-1 to F-5 and F-7 to F-23 RESOLVED (22). New findings: F-24 (MEDIUM), and F-25 and F-26, closed by property with stated limits SL-1 to SL-7. The stop authority fired on both. Verdict REQUEST REVISION. |
| 2026-11-23T17:19 | planner-019 (message naming revision 3 at `9ac9ba62`); steering-hooks-fixer (resume pointer after a clear) | cycle 1 pass 3: plan revision 3 | Resumed after a clear from this document's Resumption State at `c579526e`. Depth: delta-bounded, M5 and M6 read whole. Findings addressed: F-6, F-24, F-25 and F-26 RESOLVED. New findings: F-27 and F-28 (MEDIUM), F-30 (LOW); F-29 closed by property with stated limit SL-8; SL-9 under F-26's property. The stop authority fired on F-29. Verdict REQUEST REVISION. |
| 2026-11-23T17:27 | planner-019 (message naming revision 4 at `e53c7cdb`) | cycle 1 pass 4: plan revision 4 | Depth: delta-bounded. The delta `9ac9ba62..e53c7cdb` is 132 added and 75 removed lines over 1,083 (`git diff --numstat`, three commits, two of them registrations R-4 and R-5), fully readable as a diff; it reshapes no milestone. Boundary check by this pass's own instrument, the ID regex over both revisions computed in memory: none removed; added X-25 and X-26; no criterion ID added, and AC-2.3, AC-3.2, AC-3.7, AC-3.8, AC-4.7 and AC-6.5 changed in place, as the owed re-verdicts table lists. Artifact changes: the folds of pass 3, the architect's CF-9 and CF-10, QA's QAF-18 to QAF-22 and its GAME_MENTION mask finding. Findings addressed: F-27 to F-30 RESOLVED; SL-8 and SL-9 landed; the pass-3 assumption answered by AC-3.8 (i′) and X-26. New finding: F-31 (LOW), OPEN with a landing trigger. Verdict APPROVED. |
| 2026-11-23T17:31 | planner-019 (message naming revision 5 at `d2912590`) | cycle 1 pass 5: plan revision 5 | Depth: delta-bounded. The delta `e53c7cdb..d2912590` is 73 added and 35 removed lines (`git diff --numstat`, two commits, one of them registration R-6), fully readable as a diff; it reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. Artifact changes: AC-2.3 states six mask literals (and "seven masks" is corrected to six); AC-6.5's expected spans come from Discord's native box, with emoji edits added to its typed-edit class (the architect's CF-11, QA's QAF-23); M3's drift rule holds no gate on a live native-box departure under drift; F-31 is a Planner batch row and M4's mask line marks its premise not established. Findings addressed: F-31 carries its landing trigger in the plan. New findings: none. Verdict APPROVED. |
| 2026-11-23T17:31 | critic-019 | Document closed | Status: Resolved. Every finding is RESOLVED or, for F-31, carries a landing trigger recorded in the plan's Planner batch. |
| 2026-11-23T17:44 | planner-019 (message naming revision 6 at `946d4e54`) | cycle 2 pass 1: plan revision 6 | Reopened from `critiques/closed/` for cycle 2, which revision 6 opens by changing criterion text. Depth: delta-bounded; the delta `d2912590..946d4e54` is 99 added and 43 removed lines (`git diff --numstat`, four commits, three of them registrations R-7 to R-10), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed as a token (X-24 has no Exclusions row left and is named only where withdrawn); added EC-7, QA's entry condition. Artifact changes: AN-8 limbs 1 to 4 and 2b folded (AC-2.3's mask table, M4's mask line, AC-4.7, AC-6.3's provision step, X-14); AC-6.5's expected value split by surface with two entry conditions at M6 (the architect's CF-12, QA's EC-7, this critique's pass-5 assumption). Findings addressed: F-31 RESOLVED, read against the analysis. New finding: F-32 (LOW), OPEN. Verdict APPROVED. |
| 2026-11-23T17:54 | planner-019 (message naming revision 7 at `e0eb1e87`) | cycle 2 pass 2: plan revision 7 | Depth: delta-bounded; the delta `946d4e54..e0eb1e87` is 55 added and 18 removed lines (`git diff --numstat`, three commits, two of them registrations R-11 and R-12), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. Artifact changes: AC-4.7 marks `s` and `S` a deviation from the sibling table with its reason, follows the sibling in UTC before mount and in locale, and says what its test sets (the architect's CF-13, QA's QAF-25); AC-6.5's helper gains a mask control (QA's QAF-24) and cites the heading bit as read. Findings addressed: F-32 RESOLVED. New findings: none. Verdict APPROVED. |
| 2026-11-23T17:54 | critic-019 | Document closed | Status: Resolved. Every finding, F-1 to F-32, is RESOLVED and verified landed. |
| 2026-11-23T18:00 | planner-019 (message naming revision 8 at `7b419f5b`); steering-hooks-fixer (the M4 and M6 revision cap, effort rulings block 17:56Z) | cycle 3 pass 1: plan revision 8 | Reopened from `critiques/closed/` for cycle 3, which revision 8 opens by changing AC-4.7's text. Depth: delta-bounded; the delta `e0eb1e87..7b419f5b` is 60 added and 16 removed lines (`git diff --numstat`, four commits, three of them registrations R-13 to R-15), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added D-16. Artifact changes: AC-4.7 names the resolved dayjs locale and lists a fixture per branch (QA's QAF-26, the architect's CF-14); D-16 registers his picker selection; steering's revision cap is recorded as a scope constraint; QAF-27 is a stated limit. New finding: F-33 (MEDIUM), a further member of RK-8's class, closed by property with stated limit SL-10; the stop authority fired. Verdict APPROVED. Correction of this critique's own cycle 2 pass 2: it read the picker's key mapping and reported the cited sibling behaviours as holding, and did not read the clause "already omits `R`", which was false; steering found it. |
| 2026-11-23T18:04 | planner-019 (message naming revision 9 at `47348a6d`); steering-hooks-fixer (effort rulings block 18:02Z: read AC-4.7's delta only) | cycle 3 pass 2: plan revision 9 | Depth: delta-bounded, and bounded further to AC-4.7 by steering's decision. The delta `7b419f5b..47348a6d` is 52 added and 18 removed lines (`git diff --numstat`, four commits, three of them registrations R-16 to R-18). Boundary check: the in-memory ID regex over both revisions shows none removed and none added, and the diff, read whole, changes no criterion but AC-4.7; its other hunks are the header, the owed re-verdicts table, steering's 18:02Z constraint beside the Decisions Register, RK-8's record, the disposition table and Planner batch rows. Findings addressed: F-33 RESOLVED, SL-10 discharged into AC-4.7's text. New findings: none. Verdict APPROVED. |
| 2026-11-23T18:04 | critic-019 | Document closed | Status: Resolved. Every finding, F-1 to F-33, is RESOLVED and verified landed. |
| 2026-11-23T21:41 | planner-019 (message naming revision 10 at `890d0b78`) | cycle 4 pass 1: plan revision 10 | Resumed after a clear from this document's Resumption State; nothing written before the clear was re-verified, and this pass's claims are its own reads. Cycle 4 opens because revision 10 changes AC-4.4's text. Depth: delta-bounded; the delta `47348a6d..890d0b78` is 100 added and 17 removed lines (`git diff --numstat`, 13 commits, 12 of them registrations R-19 to R-30), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed; added D-17. The diff, read whole, changes no criterion but AC-4.4; its other hunks are the header, the changelog, the Resumption State, the owed re-verdicts table, register row D-17, G-13's carriage line, M4's Mirrors line and Planner batch rows. Artifact changes: AC-4.4 is D-17's decision table over the eight mention kinds, with its list source, deviations, residue and walk; the resolved-role and resolved-command limbs are gone. New findings: F-34 (LOW), one more member of RK-8's class, closed by property with stated limit SL-11, the stop authority firing; F-35 (MEDIUM), for the Planner batch. Verdict APPROVED. |
| 2026-11-23T21:41 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-34 is closed by property. F-35 closes as landed-by-author, its discharging document the plan's Planner batch. |

| 2026-11-23T22:32 | planner-019 (message naming revision 11 at `ec2440d9`) | cycle 5 pass 1: plan revision 11 | Cycle 5 opens because revision 11 changes AC-3.7's text. Depth: delta-bounded; the delta `890d0b78..ec2440d9` is 49 added and 17 removed lines (`git diff --numstat`, 10 commits, 9 of them registrations), fully readable as a diff, and reshapes no milestone. Boundary check by the in-memory ID regex over both revisions: none removed, none added. The diff, read whole, changes no criterion but AC-3.7; its other hunks are the header, the changelog, the owed re-verdicts table and Planner batch rows, which register this critique's F-34 and F-35 among others. Artifact changes: AC-3.7's frozen residue list holds one literal entry per differing input, per surface and mask, each with a family and a reason; a stale entry fails; RK-9's count is entries per surface. New findings: F-36 (MEDIUM) and F-37 (LOW), both for the Planner batch. Verdict APPROVED. |
| 2026-11-23T22:32 | critic-019 | Document closed | Status: Resolved, set at the approving pass and edited in `critiques/closed/` without a move. F-36 and F-37 close as landed-by-author, their discharging document the plan's Planner batch. |

## Verdict

**APPROVED — cycle 5, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his rulings; revision 11 changes the form of one test-data list and adds no criterion, milestone or instrument.

M4's residue-list commit is released by this gate. The architect's and QA's reads of revision 11 are separate.

What holds in revision 11's delta:
- **The literal form is the stricter one.** An input that differs with no entry fails, and so does an entry whose difference
  is not exactly its signature. That is the property F-29 closed on, with the class an entry names narrowed to one input.
- **A stale entry fails**, so the list cannot keep an excuse the site no longer needs, and a change of generator, seed or
  count is loud.
- **The figures are the file's.** This pass tallied `m4-dom-residue-before.json` by its own count of class members: 500, 501,
  818, 354 and 500 differing inputs, in 148, 151, 174, 132 and 148 classes, each member distinct. They match the plan.
- **No standing verdict expires.** The site-DOM limb of AC-3.7 and the list are M4's work (M4 implementation document, "Not
  built yet"; code-review document, Round 3), so M3's review at `2c1590f` did not rest on the list's form.
- **The adjustment rule is untouched.** B3's condition (b) and AC-3.8 (ii) still address an adjustment by its own tree
  predicate. The list's entries no longer carry one.
- **The family set has its producing step**: the implementation document at M4 states each family once, with its reason and
  its member count per surface.

Two findings go to the Planner batch and take no revision round, since after implementation approval only a HIGH or CRITICAL
finding does:
- **F-36** (MEDIUM). The revision's figures read "500 of 1,344 inputs". The file's own fields say 1,344 is the inputs with no
  atom, out of 2,378. AC-3.7 covers all 2,378, so the entry count the list will reach is not stated.
- **F-37** (LOW). Three wordings the revision left behind.

Stated limits under F-29's property, with their bearers:
- A commit that re-measures the list changes thousands of literal lines. Its reviewer reads the families and their counts and
  samples entries, as AC-3.7 says. A change inside entries that are already listed, made in that same commit, is seen only
  where a sampled entry shows it. Code review of that commit bears it, and reports a family whose count moved without a stated
  cause.
- AC-3.7 now speaks for the generator at its committed seed and count. It says nothing about another seed until the list is
  re-measured for it.

**RK-9.** The count before adjustment is now measured on the inputs without atoms: 37% on the description, field value and V2
text display, 53% on the title, and 23% on the title with an embed url (500, 501 and 500 of 1,344; 818 and 354 of 1,545). The
corpus members among them are 37, 33, 53, 35 and 37, close to the counts AN-3 gave before D-14 was selected (37, 32, 54, 37,
37). D-14 accepted the residue as unmeasured, and no evidence in its reopening class is new, so nothing is re-raised. The
count after adjustment, at M4, is still RK-9's read.

**RK-8, the class from pass 1: no new member found by this pass.** The plan's R-35 row records one the implementer found
(`jumboify` has no caller).

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `ec2440d9`). Routed to the owner: nothing.

The cycle 4 verdict follows, as written at that pass.

**APPROVED — cycle 4, pass 1.** The stop authority fired on one shape (F-34). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings; revision 10 changes one criterion inside M4 on his 21:31Z selection, removes
two limbs and adds one lookup over data the site already holds. The thread lookup and the `#` prefix are the planner's readings
inside his option's words, recorded as his to veto (effort rulings block 21:38Z).

M4's mention code is released by this gate. The architect's and QA's reads of revision 10 are separate.

What holds in revision 10's delta:
- **D-17** carries the option text of effort rulings block 21:31Z word for word, with the three options not chosen, and its
  reopening clause quotes the option's own cost sentence. AC-4.4 names the row.
- **The decision table is total.** `MENTION_KINDS` at `7dcedc9` has eight members (`user`, `channel`, `role`, `game`, `command`,
  `everyone`, `here`, `static`) and `STATIC_MENTION_KINDS` five. Each has a row, and `channel` has both of its cases.
- **"Today's form" is what the code draws.** At `5ec0621` the four rules `discordChannel`, `discordRole`, `discordUser` and
  `discordEveryone` each render their capture and resolve no id. The classes in the table are the classes in the rules, and
  `rules.tsx` has no command rule.
- **The list is where the plan says.** `GuildProvider` is mounted once, in `Providers`, which only `src/app/message/layout.tsx`
  uses. `src/app/preview/page.tsx` sits outside it, and `useGuild` throws without the provider. With no session, no guild or
  no data, `channels` is an empty array, so every "no list in reach" case in row 2 reduces to "the id is not on the list".
- **The residue's timings** are the code's: `staleTime` of 5 minutes with `refetchOnWindowFocus: false`, and `expireSeconds: 10`
  in `fetchChannels`.
- **The deviations are marked**: the `#` prefix in place of Discord's icon (the capture shows an icon, then
  `slate-oracle-walk`), and the lookup inside `threads`, which `attachChannelsToWebhooks` does not do.

**Stop authority: F-34.** AC-4.4's residue says "Forum, category and archived thread ids are not on the list". Forum ids are on
it: `fetchChannels` keeps a channel whose type is in `TEXT_CHANNEL_TYPES` or `VOICE_CHANNEL_TYPES`, and
`src/constants/index.ts` at `5ec0621` defines those as `[0, 5, 15]` and `[2, 13]`, with `FORUM_CHANNEL_TYPE = 15`. This is one
more member of RK-8's class, a statement of what the site does today that the base contradicts. It is not sent back for a
revision. The table itself is right, because its rows turn on list membership and never on channel type. The class is stated
below as a property over revision 10's delta, checked in this pass, and its one gap is stated limit SL-11 with its bearer.

**RK-8, the class from pass 1.** One new member in this pass (F-34). The planner writes it into RK-8's record at the fold.

**F-35** (MEDIUM) does not hold approval and takes no revision round: after implementation approval, and under steering's cap
on M4 (block 17:56Z), a gap below HIGH is a Planner batch row. AC-4.4's walk names UAT as its runner, but no surface UAT reads
routes to it, and it has no clause for a build that cannot sign in.

Readings recorded, not findings:
- The clause "no mention renders the text `unknown`" is read as a consequence of the table. A channel whose own name is
  `unknown` renders `#unknown` under row 1.
- Preview images are screenshots of `/preview` (architecture W-4), so a channel mention in a preview image stays `#<id>` while
  the message editor's preview shows the name. AC-4.4 states this in row 2 and in its walk.
- M1's AN-7 line still says "AC-4.4's unresolved-kind rendering takes its source text". AN-7 completed, so that outcome never
  applied.

No milestone is marked `PREMISE-STALE` by this delta. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved (0 lines
without `[RESOLVED]` or `[CLOSED]`, counted in memory over the plan at `890d0b78`). Routed to the owner: nothing.

The cycle 3 verdicts follow, as written at their passes.

**APPROVED — cycle 3, pass 2.** Neither the stop authority nor the hard stop fired (pass 2 of 15 in this cycle). Pricing: sized
to the ask plus his rulings; revision 9 changes one fixture and one sentence of AC-4.7.

- **F-33 is resolved.** The unloaded-tag fixture is `vi-VN`, which `loadLocales.ts` does not import; the test loads the site's
  locale files as production does and supplies the tag through react-aria's locale. The expected text and the mutant's text
  are the pair this critique ran at cycle 3 pass 1 (`11/14/23, 10:13 PM` against `22:13 14/11/23`).
- **Steering's 18:02Z decision** is recorded beside the Decisions Register as a constraint with its date, its reason and what
  voids it. Its premise holds: AC-4.7 changed in revisions 6, 7 and 8.
- **RK-8's record** carries cycle 3 pass 1's member and the one steering found. No new member in this pass.
- **The cycle 3 pass 1 assumption** is a Planner batch row for M4's implementer.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 3 pass 1 verdict follows, as written at that pass.

**APPROVED — cycle 3, pass 1.** The stop authority fired on one shape (F-33). The hard stop did not fire (pass 1 of 15 in this
cycle). Pricing: sized to the ask plus his rulings; revision 8 touches AC-4.7 only and adds no criterion, milestone or
instrument.

What holds in revision 8's delta:
- **D-16** matches effort rulings block 17:58Z word for word, and the picker line now reads as the code does: six table keys
  and a separate `R` button (`MarkdownTimestamp.tsx` at `af3d95a`, read in this pass).
- **Steering's revision cap** is recorded as a scope constraint with its date, its reason and what voids it. Its premise
  holds: revision 8 is M4's third revision since revision 5's approval.
- **The locale rule** closes this critique's cycle 2 pass 2 assumption: `Intl` takes the locale dayjs resolves to, so `s` and
  `S` render in the six siblings' language. Every one of the 29 dayjs locale names `loadLocales.ts` loads is a tag `Intl`
  accepts and resolves to the same language (run in this pass, Node 24.14.0, ICU 78.2: 0 of 29 rejected).
- **The `en-GB` literal** is right: `14/11/2023, 22:13` (same run).

**Stop authority: F-33.** AC-4.7's fifth fixture is "a tag the site has no file for, `ja-JP`", expected to give the `en` form.
The site loads a `ja` file (`src/utils/loadLocales.ts` at `af3d95a` imports `dayjs/locale/ja`), and dayjs 1.11.7 resolves
`ja-JP` to `ja` when it is loaded. So with the site's own loader the fixture exercises the loaded branch, its literal is wrong,
and the mutant it is meant to catch (the tag passed to `Intl`) gives the same text as correct code. This is one more member
of the class RK-8 has predicted since pass 1, a statement of what the site does today that the base contradicts; six earlier
members were each folded singly. It is not sent back for a revision round. The class is stated below as a property over
AC-4.7, checked in this pass, and its one gap is stated limit SL-10 with its bearer. That is also where steering's cap would
send it; under the GLOSSARY's definition it is a severity-floor finding and so excepted from the cap, but the stop authority
binds this gate first.

**RK-8, the class from pass 1.** One new member in this pass (F-33). One member appeared in revision 7 and was found by
steering, not by this critique's pass on that revision (the `R` button; corrected in revision 8).

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 2 verdicts follow, as written at their passes.

**APPROVED — cycle 2, pass 2.** Neither the stop authority nor the hard stop fired (pass 2 of 15 in this cycle). Pricing: sized
to the ask plus his three rulings, unchanged; revision 7 adds no criterion, milestone or instrument.

- **F-32 is resolved.** AC-4.7 names the dayjs format table as the sibling, marks `s` and `S` a deviation, and gives the reason
  with its capture: dayjs's `L LT` gives `11/14/2023 10:13 PM`, and Discord draws `11/14/23, 10:13 PM`. Everything else about
  the two styles follows the sibling. The three sibling behaviours the criterion cites were read at `af3d95a` and hold
  (`if (!state.mounted) date = date.utc()`; `LoadLocale` sets `dayjs.locale` from react-aria's `useLocale`; the picker maps
  `Object.keys(TIMESTAMP_TO_DAYJS_FORMAT)`). The `America/New_York` literal is right (22:13 UTC is 5:13 PM there).
- **The pass-1 assumption** is read: `0x02000000` is `Syntax.HEADING` at the pin, by the planner's run and the architect's.
- **RK-8: no new member found by this pass.**

Not a finding: the planner left the format picker without `s` and `S` and flagged that choice to steering as his to overturn.
It adds nothing he did not ask for.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged. No `OPEN QUESTION` is unresolved. Routed to the owner:
nothing.

The cycle 2 pass 1 verdict follows, as written at that pass.

**APPROVED — cycle 2, pass 1.** Neither the stop authority nor the hard stop fired (pass 1 of 15 in this cycle). Pricing: sized
to the ask plus his three rulings, unchanged; revision 6 adds no criterion, milestone or instrument, and withdraws one stated
limit (X-24).

What this pass read in revision 6's delta:
- **F-31 is settled.** AN-8 limb 2b ran Discord's legacy code per surface and read the drawn result: a game mention is a pill
  on the description, the field value and the V2 text display, and literal text on the title and field name. AC-2.3's table
  and M4's mask line now say exactly that, and content's game mentions are in the agree class (limb 2, four cases).
- **The pass-5 assumption** is an entry condition at M6: M3 records whether the box exposes its emoji spans, and a miss goes
  to the planner before M6's literals freeze.
- **AC-6.5's expected value** is split by surface, with the box for content and the three surfaces whose masks match it on the
  bits that matter, and the oracle helper for the title and field name. A wrong split shows as red, not as a false pass.
- **AC-6.3's provision step** names what UAT's build needs (a local Postgres, the `127.0.0.1` host, the id-sequence move).

One finding is open and does not hold approval: **F-32** (LOW). AC-4.7 writes `s` and `S` as `Intl.DateTimeFormat` option sets
"in the viewer's locale and time zone". The six styles beside them come from one dayjs format table, and the plan does not
say the two new ones depart from it or why. It needs to land before M4 is coded.

**RK-8, the class from pass 1: no new member found by this pass.**

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step. No `OPEN
QUESTION` is unresolved. Routed to the owner: nothing.

Cycle 1's verdicts follow, as written at their passes.

**APPROVED — cycle 1, pass 5.** Neither the stop authority nor the hard stop fired (pass 5 of 15). Pricing: sized to the ask
plus his three rulings, unchanged; revision 5 adds no criterion, milestone or instrument.

Pass 5 read revision 5's delta and found nothing new:
- **F-31** is a Planner batch row with its landing trigger, and M4's mask line now says the premise is not established.
- **AC-2.3's six literals** each differ from AN-3's native mask by the one bit `0x400` on the five legacy-only masks, and
  content's is unchanged (this pass's arithmetic; QA's probe at revision 4 reads "cells 248 mismatches 1", content's).
- **The pass-4 assumption** no longer bears on a gate: under drift a live native-box departure is reported with C2 and holds
  nothing, and `pnpm test`'s frozen literals under the pinned wasm still catch a site regression.
- **AC-6.5's expected value** moved to Discord's native box doing its own join (the architect's CF-11), with the oracle helper
  as a positive control. This pass's assumption below is about its reach.

The pass-4 verdict follows, as written at that pass.

**APPROVED — cycle 1, pass 4.** Neither the stop authority nor the hard stop fired (pass 4 of 15).

Pricing: sized to the ask plus his three rulings, unchanged from revision 3. Seven milestones. Revision 4 adds no criterion;
it restates six, adds one read to AN-8 (the slow-CPU capture, from QA) and one site helper for the emoji image and size (from
the architect).

What revision 4 settled:
- **F-27.** The native box now runs on the pinned wasm, and its literals are taken under it. Under drift the native-box limbs
  report "not comparable under drift" with both hashes and hold nothing.
- **F-28.** A later release that does not touch the region is held by nothing the command reports, a fetch failure included.
  Devops at Stage 1 runs it there.
- **F-29 and SL-8.** AC-3.7 excuses an input only through a frozen residue list. Each entry's predicate is evaluated on the
  oracle helper's parse, not the site's output; a newly different input fails; the list changes only by a reviewed commit. An
  adjustment that reaches no member fails AC-3.8 (ii).
- **F-30, SL-9** and the pass-3 assumption (AC-3.8 (i′), with X-26 for what it still cannot see).

One finding is open and does not hold approval: **F-31** (LOW). The mask line clears `GAME_MENTION` on the legacy-only surfaces
on a premise the analysis marks not established. AN-8's limb reads it, and the planner's next batch folds AN-8.

A reading recorded, not a finding: outcome row C6's later-release cell names limb (i) and not (i′). The row's first cell groups
the two, so (i′) at a later release is read as (i): it goes to him through steering and holds no release.

**RK-8, the class from pass 1: no new member found by this pass.** Two statements of today's site that revision 4 added (the
emoji image and jumbo flag come from `simple-markdown`'s emoji rule; `common.ts` holds two `isEmojiNode(node?.ast)` predicates)
are the architect's reads at CF-10 and were not re-read here.

No milestone is marked `PREMISE-STALE`. `Target-Release` is unchanged and equals the scoping block's end step. No `OPEN
QUESTION` is unresolved.

Routed to the owner: nothing.

## Value Statement Assessment

Present, in user-story form, and delivered directly. Unchanged at revision 4.

## Assumption Not Checked

Cycle 5 pass 1: this pass assumes that the site's rendering can be compared with legacy in the visible form on an input that
holds an atom (a mention, an emoji or a timestamp), so that the list gets entries for those inputs too, and does not test it.
No document says why `m4-dom-residue-before.json` counts only its `atomFree` inputs, and no test was run in this pass. If it
is false, M4's list holds entries for 1,344 of 2,378 inputs per surface (1,545 on the title), and AC-3.7 passes while saying
nothing about the rest. The signature is a list whose inputs include none with an atom. The implementer owns closing it at
M4's list commit, and QA at Phase 2 reads the number of inputs compared per surface against 2,378.

Cycle 4 pass 1: this pass assumes that the bot whose token `getApi` uses on UAT's local build is a member of the test guild
`1566742402180456559`, so that `getWebhooksAndChannels` returns that guild's channels there, and does not test it. Reading it
takes the build's credentials and a signed-in session, which this pass did not have. If it is false, the walk shows
`#1574358729577599086` in the message editor's preview, which is also what a broken lookup shows, so the walk cannot tell the
two apart. UAT owns closing it at the build's provision step: the channel list is seen non-empty in the site's own channel
picker before AC-4.4's walk is read. AC-6.3's guild-emoji walk rests on the same bot membership.

Cycle 3 pass 2: this pass assumes that the suite's DOM environment lets a test set the locale react-aria's `useLocale` reports
to `LoadLocale`, and does not test it. No test was written or run in this pass. If it is false, M4's implementer cannot drive
the `vi-VN` and `en-GB` fixtures the way AC-4.7 requires and would have to call `dayjs.locale` directly, which the criterion
bars because the tag-passing mutant then has no tag to pass. The implementer at M4 owns closing it; a miss is an AC-4.7 gap
and goes to steering before any fold (effort rulings block 18:02Z).

Cycle 3 pass 1 (carried at plan revision 9 as a Planner batch row for M4's implementer): this pass assumes that `dayjs.locale()`, read when a timestamp renders, is the locale `LoadLocale` set for
that viewer, and does not test it. dayjs keeps one locale per process, and nothing was rendered in this pass. If it is false
(a server render that serves two viewers, or a route that renders a timestamp without `LoadLocale` above it), `s` and `S`
take another locale than the viewer's before mount and change at hydration. The six sibling styles have the same exposure
today, so the two would still agree with each other. The implementer at M4 owns closing it, with AC-4.7's pre-mount fixture.

Cycle 2 pass 2 (settled at plan revision 8: `Intl` takes dayjs's resolved locale, so an unloaded tag gives the siblings'
language): this pass assumes that every locale react-aria reports to `LoadLocale` is one dayjs has loaded, and does not
test it. `src/utils/loadLocales.ts` at `af3d95a` names dayjs locale files (`git grep -c "dayjs/locale"`: 29 lines in that file);
which locales those cover against what a browser can report was not read. If it is false, a viewer in an unloaded locale sees
`s` and `S` in their own language from `Intl` and the six sibling styles in dayjs's fallback, in one message. The implementer
at M4 owns closing it; a user report goes to X-19's locale-wording residue.

Cycle 2 pass 1 (read at plan revision 7: `0x02000000` is `Syntax.HEADING`): this pass assumes that `0x02000000`, the one bit by which the field value's mask differs from content's, is
the heading bit, and does not test it. The plan marks it an inference from AN-3's table, and `@discord/markdown-types` is not
in the workspace to read. If it is false and the bit is one that decides whether an emoji sits inside a construct, AC-6.5 goes
red on field-value inputs with no site defect, because the box's spans were taken under content's mask. The implementer at M2
owns closing it: AC-2.3 checks each mask over all 31 single-bit members with the package installed.

Cycle 1 pass 5 (now an entry condition at M6; plan revision 6, AC-6.5): this pass assumes that a run of Discord's native box (module 818948) exposes the emoji spans of its own parse,
and does not test it. The analysis's AN-6 table describes the box's output as leaf attributes per token, where an emoji is an
`atom` carrying the enclosing styles, not a span marked as an emoji. If it is false, M3's implementer finds no emoji span to
freeze for AC-6.5, and the expected value falls back to the oracle helper that revision 5 made the positive control. The
implementer at M3 owns closing it and takes a miss to the planner; the architect's delta pass on revision 5 reads the same form.

Cycle 1 pass 4 (no longer bears on a gate; plan revision 5, M3 "Which wasm"): this pass assumes that Discord's served box JavaScript, run against the pinned wasm bytes while the served wasm
differs, either fails to initialise or computes what it would on its own wasm, and does not test it. No Discord build was run.
If it is false, a native-box limb goes red under drift as a moved literal (C4) when neither the site nor Discord's box moved,
and the gate holds on it. The implementer at M3 owns closing it (its re-derivation list names the wasm each live limb runs
on); QA reads any C4 that arrives together with C2 against both hashes before it is treated as a hold.

Pass 3's line is answered by AC-3.8 (i′), with X-26 as its stated residue.

## Unresolved Open Questions

None.

## Findings

### Open

None.

### Closed at cycle 5 pass 1

F-36 MEDIUM cycle 5 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: AC-3.7's "Why per input" figures are over the inputs without atoms, and the entry count the list will reach is
  not stated.
- **Location**: plan revision 11, AC-3.7 "Why per input" and its last bullet (RK-9's count);
  `verification/019/impl/m4-dom-residue-before.json`, fields `n`, `atomFree` and `count`;
  `verification/019/impl/m4-residue-measurement-6379abc.json`.
- **Description**: the plan says "500 of 1,344 inputs differ" and "818 of 1,545". In the file, `n` is 2,378 on every surface
  and 1,344 and 1,545 are `atomFree`. AC-3.7 is stated over every input in the generator, the 272 corpus and the 106 link
  inputs, under each mask. So the DOM measurement leaves 1,034 inputs unread on the description, field value and V2 text
  display, and 833 on the title. The other cited file, which this pass takes to be the tree-level comparison, counts 1,190,
  1,208, 1,369, 630 and 1,190 of 2,378. The files hold five cells; the field name, with and without an embed url, has none.
  Neither file is in `HEAD`.
- **Impact**: RK-9's falsifier is now "entries per surface", and QA reads the tip's count against M4's. With 43% of the
  inputs unmeasured in the visible form on three surfaces (1,034 of 2,378), the list may be two to three times the size
  the revision's figures suggest, and nobody can say which from the plan. The choice of the literal form does not turn on
  it.
- **Recommendation**: at the fold, the figures name their subset; the implementation document at M4 records the entry count
  per surface and mask over all 2,378 inputs, which is the count RK-9 reads; the implementer commits the two files.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2. The count itself lands with
  M4's list commit.

F-37 LOW cycle 5 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: three wordings revision 11 left behind.
- **Location**: plan revision 11, changelog row 11; Reading Order, the `code-reviewer` row; AC-3.7 "What fails".
- **Description**: (1) The changelog row says the change is not put to him because it tightens a test instrument. A change to
  a criterion of an open milestone rides his last selection on it only when the row names that selection, and the row does
  not name D-14, whose words are "the rest are listed". (2) The `code-reviewer` row still routes to "AC-3.7's listed classes
  and their reasons", and the reviewer now reads families and samples entries. (3) The stale-entry limb is a new check on
  the list, and the plan names no milestone that runs it against a real stale entry and a real live one before a run relies
  on it.
- **Impact**: each costs one reader a look elsewhere. None changes what is built.
- **Recommendation**: at the fold, the row names D-14, the Reading Order row says families, and M4 is named as where the
  stale-entry check is seen to fail on a stale entry.
- **Landing trigger**: the same fold.

### Closed at cycle 4 pass 1

F-34 LOW cycle 4 pass 1 — RESOLVED, closed by property with stated limit SL-11
- **Title**: AC-4.4's residue says forum ids are not on the channel list, and they are.
- **Location**: plan revision 10, AC-4.4 "Residue"; `website@5ec0621 src/constants/index.ts:TEXT_CHANNEL_TYPES`,
  `src/utils/redis/index.ts:fetchChannels`.
- **Description**: `TEXT_CHANNEL_TYPES` is `[0, 5, 15]` and `FORUM_CHANNEL_TYPE` is 15, so `fetchChannels` keeps forum
  channels, and their active posts arrive as `threads`. The residue sentence puts forum ids outside the list.
- **Impact**: a fixture or a walk written from the sentence expects `#<id>` for a forum id that the table's row 1 names.
  The table decides, so the cost is one wrong expectation, found when it goes red.
- **The property, in place of a revision**: every statement in revision 10's delta about what the site does at a named
  commit holds at that commit. Its domain is the statements the delta makes, listed here from the diff: the four mention
  rules and their classes; no command rule; `WebhookProvider.tsx:useValue` reads `useGuild().channels`;
  `attachChannelsToWebhooks` finds by `id` over top-level channels; `fetchChannels` returns named text and voice channels
  with their active threads; `GuildProvider` is mounted only through `src/app/message/layout.tsx`; `useGuild` throws
  outside it; the two cache timings; the members of `MENTION_KINDS` and `STATIC_MENTION_KINDS`; forum, category and
  archived thread ids are off the list. Each was read at its commit in this pass. All hold but the last, and of the last,
  the category and archived-thread parts hold (`/threads/active` returns active threads only).
- **SL-11**: the residue sentence is read as "category ids, archived thread ids, and ids of channel types outside
  `[0, 5, 15, 2, 13]`". A forum id on the list renders its name under row 1. The M4 implementer and QA Phase 2 bear it:
  they take list membership from `fetchChannels`' filter, never from the sentence. A user report goes to AC-4.4.
- **Residue of the property**: statements the plan makes about the site outside this delta were not re-read in this pass.

F-35 MEDIUM cycle 4 pass 1 — closed as landed-by-author; discharging document: the plan's Planner batch
- **Title**: AC-4.4's walk names UAT, and nothing UAT reads routes to it.
- **Location**: plan revision 10, AC-4.4 "Human-observable form"; Reading Order, the `uat` row; Testing Strategy, "Probe
  versus gate"; AC-6.3 "Provision step".
- **Description**: the walk is "on a local production build signed in to the test guild … Walked by UAT on that build before
  release". The `uat` row of the Reading Order names AC-4.2 for M4 and not AC-4.4. Testing Strategy lists the post-landing
  walks as AC-2.5, AC-4.2, AC-5.5 and AC-6.3 (QA register B-1 to B-4), and AC-4.4 is not among them. The signed-in build
  is the one AC-6.3's provision step describes, where a complete sign-in was not executed (AN-8 limb 3), and AC-6.3 says what
  happens when sign-in cannot be completed. AC-4.4 cites neither that step nor a fallback.
- **Impact**: UAT reads its row and the B-1 to B-4 list, so 1 of the 5 walks the plan now names would be missed, and the
  channel-name limb would release on suite evidence alone. Where sign-in fails, AC-4.4 has no stated limit to fall to, while
  its `/preview` half needs no sign-in and can still be walked.
- **Recommendation**: at the Planner batch fold, the `uat` row and the walk list name AC-4.4; the walk cites AC-6.3's
  provision step and takes its "where sign-in cannot be completed" clause for the signed-in half; QA registers the walk.
- **Landing trigger**: the Planner batch fold at the seam after the last milestone's QA Phase 2, before the UAT anchor. The
  planner registers the row from this pass.

### Resolved

F-33 MEDIUM cycle 3 pass 1 — RESOLVED — the unloaded-tag fixture is `vi-VN`, with the site's locale files loaded and the tag supplied through react-aria's locale; SL-10 is discharged into the text. Plan revision 9, AC-4.7 (on steering's decision, effort rulings block 18:02Z). The same member is CF-15 in the architect's findings and QAF-28 in QA's document, each raised on revision 8.

F-32 LOW cycle 2 pass 1 — RESOLVED — `s` and `S` are a marked deviation from `TIMESTAMP_TO_DAYJS_FORMAT`, with the reason and its capture; UTC before mount and the locale follow the sibling. Plan revision 7, AC-4.7.

F-31 LOW cycle 1 pass 4 — RESOLVED — AN-8 limb 2b read it per surface: `GAME_MENTION` stays set on the description, field value and V2 masks and is cleared on title and field name only. Plan revision 6, AC-2.3, M4's mask line, Planner batch row F-31 discharged. Read against analysis `3681654e` at cycle 2 pass 1.

F-1 HIGH cycle 1 pass 1 — RESOLVED — each AN item carries its "Not completed" outcome and the approval it holds. Plan revision 2, M1.

F-2 HIGH cycle 1 pass 1 — RESOLVED — outcome table by cause and gate, the release-interval figure, the Test Conventions carrier. Plan revision 2, M3, D-5, M7.

F-3 HIGH cycle 1 pass 1 — RESOLVED — pending stays hidden as today; rejected is a marked deviation. Plan revision 2, M2, AC-2.5, P-4.

F-4 MEDIUM cycle 1 pass 1 — RESOLVED — the gap is recorded on every capture; the missing production read is a stated limit. Plan revision 2, AN-2, RK-2, X-21.

F-5 MEDIUM cycle 1 pass 1 — RESOLVED — declared and observed enumerators, an outcome for an unmapped kind, the `0` rule. Plan revision 2, AC-2.4, M2, RK-3, AC-2.3.

F-6 MEDIUM cycle 1 pass 1 — RESOLVED — the class table has the editor's rows. Plan revision 3, M3 "Classes".

F-7 MEDIUM cycle 1 pass 1 — RESOLVED — a legacy-only surface went to him before M2's approval; ruled at D-14. Plan revisions 2 and 3.

F-8 MEDIUM cycle 1 pass 1 — RESOLVED — the rule names the inline runs; block context stays the Slate layer's. Plan revision 2, AC-5.6.

F-9 MEDIUM cycle 1 pass 1 — RESOLVED — two modes, the paste limb bounded, the refusals kept. Plan revision 2, AC-3.3, P-5.

F-10 MEDIUM cycle 1 pass 1 — RESOLVED — the mutated code is named per criterion. Plan revision 2, AC-3.4.

F-11 MEDIUM cycle 1 pass 1 — RESOLVED — AN-1 takes plan 018's build form. Plan revision 2, AN-1.

F-12 MEDIUM cycle 1 pass 1 — RESOLVED — the base is `master` at the cut, with a re-derivation step. Plan revision 2, Header notes.

F-13 MEDIUM cycle 1 pass 1 — RESOLVED — AN-4 needs no driver; M3 takes AC-2.2's pin rule; the rollback names its runner. Plan revision 2, AN-4, M3.

F-14 MEDIUM cycle 1 pass 1 — RESOLVED — the loose form is named, with the strict count and its blur in X-19. Plan revision 2, M3.

F-15 MEDIUM cycle 1 pass 1 — RESOLVED — QA's production read is cited and the reader is the carrier. Plan revision 2, Testing Strategy.

F-16 MEDIUM cycle 1 pass 1 — RESOLVED — AC-2.7. Plan revision 2, M2.

F-17 MEDIUM cycle 1 pass 1 — RESOLVED — Reading Order with the owed re-verdicts table. Plan revision 2.

F-18 MEDIUM cycle 1 pass 1 — RESOLVED — AC-6.3 has a provision step and AC-6.4 names what a place would take. Plan revision 2, M6.

F-19 LOW cycle 1 pass 1 — RESOLVED — the criteria name their decision rows. Plan revision 2.

F-20 LOW cycle 1 pass 1 — RESOLVED — Exclusions rows with carriers. Plan revision 2, Exclusions.

F-21 LOW cycle 1 pass 1 — RESOLVED — AC-2.1, AC-2.2, AC-2.6. Plan revision 2, M2.

F-22 LOW cycle 1 pass 1 — RESOLVED — gates stated in M5 and M6; devops mints the handoff. Plan revision 2.

F-23 LOW cycle 1 pass 1 — RESOLVED — replaced by D-13: AC-6.5 on the engine, AC-6.6. Plan revision 3, M6. Duplicates: CF-2 in architecture/019-slate-formatting-discord-engine-architecture-findings.md

F-24 MEDIUM cycle 1 pass 2 — RESOLVED — the command runs at every later website release, as D-12 reads. Plan revision 3, M3 "Who runs it", M7.

F-25 MEDIUM cycle 1 pass 2 — RESOLVED — SL-1: `tel` and `sms` listed, checked by the observed enumerator (AC-4.6). SL-2: AC-4.7, AN-8's first limb, X-24. Plan revision 3.

F-26 MEDIUM cycle 1 pass 2 — RESOLVED — SL-3 to SL-7 landed or discharged at revision 3 (M3 "Form", AC-3.4, AN-5, AN-3, AN-8). SL-9: the code-reviewer row names M3 and M4. Plan revision 4, Reading Order.

F-27 MEDIUM cycle 1 pass 3 — RESOLVED — the native box runs on the pinned wasm; under drift its limbs are "not comparable" and hold nothing. Plan revision 4, M3 "Which wasm the native box runs on", outcome row C2, AC-3.2.

F-28 MEDIUM cycle 1 pass 3 — RESOLVED — the later-release column holds no release on any cause; devops at Stage 1 is the runner. Plan revision 4, outcome row C1, M3 "Who runs it", M7.

F-29 MEDIUM cycle 1 pass 3 — RESOLVED — the property is adopted: AC-3.7's frozen residue list (predicate on the oracle helper's parse, a difference signature, changed only by a reviewed commit), and AC-3.8 (ii) fails an adjustment that reaches no member. SL-8 landed with it. Plan revision 4, AC-3.7, AC-3.8.

F-30 LOW cycle 1 pass 3 — RESOLVED — D-4's and D-5's consequence cells are re-aimed. Plan revision 4, Decisions Register.

## Questions

None.

## Scope assumptions the plan lists

Unchanged from pass 3: one adapter with seven masks (five of them now with `GAME_MENTION` cleared, F-31); the read-only
branches move with the editor surfaces; the Slate block layer stays the site's own; the emoji lift reads the engine.

## Review-method lines with no finding

Pass 4:
- **Decisions Register.** D-4 and D-5 changed in their consequence cells only; no verbatim cell moved. No row is re-raised.
- **Restated figures**, each read at its source: the wasm hash `da7b9e5e…` equal for the built and the served file (analysis
  AN-1 and AN-4 lines); QA's 8 of 248 mask cells (`probe-mask-vs-an3-table.out`: "cells 248 mismatches 8", all GAME_MENTION);
  15,480 typed edits (QA's P-Q9).
- **Instruments.** AC-3.7's residue count names its reader (QA at Phase 2, against the count recorded at M4). AC-4.7's `R` limb
  is read under a fixed clock. AC-6.5's expected spans come from the oracle helper's own join, not the adapter's.
- **Runners.** The later-release run is devops's at Stage 1, recorded in that chain's deployment document.
- **Exclusions.** X-25 and X-26 carry a reason and a carrier. X-21 is restated on QA's declining of E-4.
- **Reading Order.** Rows name current headings; the code-reviewer row reaches AC-3.7 and the adjustment module.
- **Release target.** Unchanged.

Earlier passes, still standing: listed in this critique at `af0b21d`.

## Process record

- Cycle 5 pass 1: the plan was read as `git diff 890d0b78 ec2440d9` saved in this session's scratchpad, and the plan's other
  sections from `git show ec2440d9` held in memory. The record-write gate refused one command that saved that export to the
  scratchpad through a shell variable, reading the path as a record document; it was re-run with nothing written but a text
  extract at a literal scratchpad path. The tally of the measurement files ran in memory. QA's re-key on revision 11
  (`047add44`) was committed while this pass ran and was not read before this pass was written.

- Cycle 4 pass 1: the plan was read as `git diff 47348a6d 890d0b78` saved in this session's scratchpad, with website source
  exported there by `git -C /usr/local/bin/hooks/website show`; the ID comparison ran in memory. Nothing was installed or
  run. The architect's and QA's reads of revision 10 were not read before this pass was written. `node tools/check-repo.js`
  at session start printed one failure outside this document (the M4 implementation document's `Handoff-At`).

- Cycle 3 pass 1: the architect's and QA's passes on revision 8 were not read before this pass was written. At the seam their
  commit subjects show the same `ja-JP` fixture raised by each (`architecture/…-architecture-findings.md` CF-15 at `e1e6f363`,
  a stated limit under the cap; `qa/…-qa.md` QAF-28 at `5ca68b07`, asking `vi-VN`). F-33 was reached independently and names
  the same member; the three meet at the planner.

- Pass 4: the plan was read as `git diff 9ac9ba62 e53c7cdb` saved in this session's scratchpad; the ID comparison ran in memory.
  Nothing was installed or run.
- Pass 4: the architect's delta pass on revision 4 was committed (`a5f78f83`) while this pass ran and was not read before
  this pass was written. QA's re-key on revision 4 was not yet committed.
- Pass 3: one comparison command was not completed, then re-run in a form that writes no file.
- Passes 1 to 3 otherwise: in this document at `af0b21d`.

## Resumption State

Closed at cycle 5 pass 1 (APPROVED on plan revision 11, `ec2440d9`), with nothing in flight, no process running and no question awaiting an answer. The verdict was sent to `planner-019` (F-36 and F-37 for the Planner batch) and `implementer-019` (M4's residue-list commit is released by this gate). A later criterion-changing revision opens cycle 6: read the plan as the `git diff` from `ec2440d9` with the ID-set comparison computed in memory (no file written from the shell), and work under the brief (`steering/019-brief-critic.md`, `steering/slate-formatting-brief-common.md`: shell in the record folder, website by `git show <sha>:<path>`, record documents by Write or Edit only) and steering's two standing decisions in the effort rulings file (block 17:56Z, the M4 and M6 cap; block 18:02Z, any AC-4.7 gap to steering before a fold).

## Appendix — engine probes (cycle 1 pass 2)

`@discord/markdown-wasm@0.16.0` with `@discord/markdown-types@0.14.0`, `npm install --ignore-scripts`, Node 24.14.0, `parse`
with its default flags (`Syntax.ALL`), 2026-11-23.

**Link schemes.** Each input, then the `url` of every link node returned:

| Input | Link `url` |
|---|---|
| `<+15551234567>` | `tel:+15551234567` |
| `<a@b.co>` | `mailto:a@b.co` |
| `a@b.co` | no link |
| `<mailto:a@b.co>` | `mailto:a@b.co` |
| `<tel:+15551234567>` | `tel:+15551234567` |
| `<ftp://x.y>`, `[a](ftp://x.y)` | no link |
| `[a](tel:+15551234567)` | `tel:+15551234567` |
| `[a](mailto:a@b.co)` | `mailto:a@b.co` |
| `[a](sms:+15551234567)` | `sms:+15551234567` |
| `[a](discord://-/channels/1/2)` | `discord://-/channels/1/2` |
| `discord://-/channels/1/2` | no link |
| `[a](steam://run/1)`, `[a](spotify:track:1)`, `[a](//x.y)`, `[a](file:///etc/passwd)` | no link |
| `[a](javascript:alert(1))`, `[a](data:text/html,x)`, `[a](vbscript:x)` | no link |
| `[a](HTTP://X.Y)` | `http://x.y/` |
| `dev://branch/main`, `[a](dev://branch/main)` | `dev://branch/main` |
| `[a](blob:https://x.y/1)` | `https://x.y/1` |

**`Syntax`.** `Object.keys(Syntax)`: 38 keys; 31 hold a single bit; the other seven are `EMOJI`, `LINKS`, `MENTIONS`,
`CODE_SPANS`, `ITALIC`, `QUOTES` and `ALL`.

**Timestamp styles.** `<t:1700000000:X>` for every ASCII letter X: a timestamp node comes back for `d f s t D F R S T`,
nine letters, and for `<t:1700000000>` with no style.

**Heading levels.** `# a`, `## a` and `### a` return headings of level 1, 2 and 3. `#### a` and `##### a` return a paragraph.
