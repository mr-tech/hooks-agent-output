# Rulings — fixer chain `fix-emoji-pretransform-widths` (website editor: the parser's emoji pre-transform shifts widths — pasted text lost)

Fixer chain steered by `steering-hooks-fixer` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), effort
`fixer-queue-2026-11-21`. tmux category: `fix-emoji-pretransform-widths`. Source: `TODO.md` item "website editor: the emoji pre-transform
shifts widths — pasted text lost"; findings and evidence in `steering/fix-decorator-offsets-rulings.md`, blocks from 2026-11-22T22:0x on.

## 2026-11-22T22:56 — his two selections: this chain goes next, and starts now despite the weekly limit

Disclosed: this heading was first typed with an estimated minute (22:58, ahead of the clock); the stamp gate flagged it after the commit;
restamped from `date -u`.

(1) Recorded in `steering/fix-decorator-offsets-rulings.md` block 22:1x: "Agent: fix it next (Recommended)" — the four remaining small editor
fixes each move back one place. (2) Selection prompt put 22:5xZ, answered 22:5xZ (ledger `steering/selection-ledger/2026-11-22.md`);
wording this thread's. Premises read before it: `plan-usage.py --json` (source live, 22:55Z) `weekly_all` 95.0%, resets 2026-11-25T09:00Z;
the gate at 98% (steering.md, Usage gates). Options: A "Agent: start it now (Recommended)" — "Its scoping and first steps happen tonight;
if it reaches 98% partway, the fixer saves its progress and the fix resumes after Wednesday's reset. Users keep losing pasted text until it
ships either way."; B "Wait for the reset" — "Nothing new starts tonight; the emoji fix starts fresh after Wednesday 09:00 UTC, using the
full week's allowance. Saves the setup cost of a run that may be cut off." Chosen: **A**. This thread's error in the option text: "Today's
last fix alone moved the week about 4 points" was not measured by a command (91% at 21:41Z and 95% at 22:45Z bracket it, other sessions
included).
Scope sweep started (helper; output `verification/fix-emoji-pretransform-widths/scoping/sweep.md`). Determination, stage set and branch
cut on its return, from `origin/master` `febf20e`.

## 2026-11-22T22:59 — determination and stage set

Sweep (helper, at `origin/master` `febf20e`): `verification/fix-emoji-pretransform-widths/scoping/sweep.md`. One input rewrite exists,
`translateSurrogatesToInlineEmoji` (`emoji.tsx:83`), applied by both parsers (`utils.ts:41`, `:66`); width only grows (`🙂` 2 → 14). A
related node-width gap: the `escape` rule's `content` is 1 narrower than its source. Class (a) widths applied to the original text:
`withNormalizeNode.ts:172-198`, `decorator.tsx:222` (+ `createLeaf.ts`), `getInitialValue.ts:49,65`. Class (b) text rebuilt from the tree:
`getInitialValue.ts:49-69`, `SlateEditor/index.tsx:53,58-59` via `flattenNodeText.ts:11`, `onCopy.ts:29`, `withNormalizeNode.ts:183`. Class
(c) render only: unaffected. No test touches `getInitialValue.ts` or `withNormalizeNode.ts`. `release-move.js --dry-run` on `master` `febf20e`
(22:59Z): passed.
**Determination.** Shape: defect, cause proven (QA's and the reviewer's probes; the refutation helper's paste probe HOLDS). Blast radius:
every editor built on `SlateEditor`; E-1 and the code-fence case lose the user's text. End step: website `master`, Vercel production.
Pipeline: the `fixer` agent.
**Scope statement** (website, from `febf20e`): code that applies parsed widths or positions to the editor's original text uses the source
width of each node, never the pre-treated width: (1) `withNormalizeNode.ts` `handleElement` — a pasted or typed line with an emoji keeps
every character (E-1), including in a fenced code line, and an escape (`\*`) before an emoji shifts nothing (sweep's extra find); (2)
`getInitialValue.ts` — a stored message loads with its text unchanged, an escaped emoji included (E-2); (3) `decorator.tsx` — formatting
after an emoji (escaped or not) colours at its true position. A test drives each through the real parser with literal expectations.
Write set: those three files and any helper beside them, `src/utils/markdown/` where a node must carry its source width, new tests per Test
Conventions, the fixer's document and `verification/fix-emoji-pretransform-widths/`. **Exclusion he sees (told in chat):** an emoji element
is stored and copied as its `:name:` form (`flattenNodeText.ts:11`, `onCopy.ts:29`) — existing behaviour whose intent is undecided; not
changed here. QA's unrun case (a custom Discord emoji via the picker in a code line) is a QA candidate.
**Stage set:** `fixer-fix-emoji-pretransform-widths` → `code-reviewer-fix-emoji-pretransform-widths` (under 20 production lines: the
reviewer also runs the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic,
Phase 1 or UAT. **Usage:** weekly at 95%; at 98% every session checkpoints and stops (his selection 22:56). **Not covered by the sweep:**
real paste events, IME, Slate normalisation order, DOM mapping — devops's post-deploy browser walk pastes the E-1 line.

## 2026-11-22T23:17 — handed to code review at website c2fee5c; reviewer started

Fixer's cue by message ~23:1xZ: document `implementation/fix-emoji-pretransform-widths-implementation.md` (record `eaecd18d`;
`Handoff-At: c2fee5c — repos=website`, read). This thread's numstat `febf20e..c2fee5c`: six production files (70 lines by the fixer's
count; QA Phase 2 follows review), three test files. Owner residue named in its Diagnosis (text already lost to E-1; stored messages
rewritten on load before the fix) — told him in chat. Reviewer brief `steering/fix-emoji-pretransform-widths-brief-code-reviewer.md`;
`code-reviewer-fix-emoji-pretransform-widths` started with `tmux-agent spawn`. weekly_all 96% (23:17Z, live).

## 2026-11-22T23:23 — review round 1 REJECTED (CR-1 HIGH, to the fixer); CR-3 carried in TODO.md

Reviewer's copy by message ~23:3xZ: `code-review/fix-emoji-pretransform-widths-code-review.md` (record `b7f2aac4`), Round 1 REJECTED at
`c2fee5c`. CR-1 HIGH: an emoji right after a `:name:` token is deleted on load and on typing (`wow :o🙂` → `wow :o:`; base gave
`wow :o:slight_smile:`); 8 of 407 probe lines right at base, text lost at fix. The rest of the scope is delivered; 70 production lines
re-derived. CR-3 (pre-existing, decorator ranges past a line's end on some `#` lines) carried in the `TODO.md` item
"nested formatting loses the outer style" (same function's chain). The reviewer's open assumption (real paste/IME) goes to QA's walk.
weekly_all 97% (live read this turn).

## 2026-11-22T23:34 — round-1 sub-entry APPROVED_WITH_COMMENTS at 0411d3b; QA Phase 2 started

Fixer's round 2 at `0411d3b` (83 production lines). Reviewer's cue by message ~23:3xZ: record `83e02c84` (read: `Reviewed-At 0411d3ba…`,
`APPROVED_WITH_COMMENTS`); CR-1 resolved (1,662 lines: load and typing failures 0, base 114 and 525; none newly failing); CR-2 LOW declined
(type file outside the write set). The decorator `#` rows and the `_`-pairing cosmetic rows join the `TODO.md` nested-styles item.
Disclosed by the reviewer: its sub-entry was written with a Python heredoc (its changelog row). QA brief
`steering/fix-emoji-pretransform-widths-brief-qa.md`; `qa-fix-emoji-pretransform-widths` started with `tmux-agent spawn`. weekly_all 97%
(23:34Z, live).

## 2026-11-23T08:25Z — resumed; QA Phase 2 PASS at 0411d3b; devops started

Resumed 08:15Z (effort block of that minute); `qa-fix-emoji-pretransform-widths` spawned fresh with
`steering/fix-emoji-pretransform-widths-brief-qa-resume.md`. QA's cue by message ~08:2xZ: `qa/fix-emoji-pretransform-widths-qa.md`
(record `b3537900`, read: Status QA Complete, `Verified-At 0411d3ba…`); browser walk 5/5 at the tip, 5/5 fail at base; no findings; B-1
post-deploy for devops. QA's Assumption Not Checked (emoji picker click path; guild emoji; mobile IME) routed by this thread: the
standard-emoji picker limb to devops's post-deploy walk, the other two to devops's Stage 1 handoff, owned by this thread. Disclosed by QA:
one pass section written by a shell-run script (its changelog). Website HEAD `0411d3b` (`git rev-parse`); no `.github/workflows` (`ls -d`
fails). Devops brief `steering/fix-emoji-pretransform-widths-brief-devops.md`; `devops-fix-emoji-pretransform-widths` started.

## 2026-11-23T08:48Z — released and closed out; sessions stopped; retrospective joins the batch

His release answer in devops's session ("Release now", ledger `steering/selection-ledger/2026-11-23.md`). QA Phase 3 Release Verified
(`qa/closed/website-0411d3b-release-tip-qa.md`, record `4f43628b`). Website `master` `0411d3b` (`git ls-remote`, devops; tree on `master`
at `0411d3b`, `git rev-parse`, 08:4xZ). B-1 PASS on hooks.gg (devops record `49ce5066`): the walk shows the fixed form, which base fails
deterministically, so the serving build carries the fix (devops did not read the deployment's commit; `vercel inspect` hung).
Closure reads (this thread, 08:4xZ): implementation, code review, QA, release-tip QA, deployment and the post-deploy handoff are in their
`closed/` folders; no open stage document names the chain. Open carrier, owned by this thread:
`handoff/fix-emoji-pretransform-widths-picker-guild-emoji-ime-2026-11-23.md` (5b19c3e4), on its own trigger. Source `TODO.md` item
"website editor: the emoji pre-transform shifts widths" deleted (every limb in the scope delivered; QA's picker assumption is in the
handoff). Architecture: devops found no line this chain changes; nothing lodged. Fired trigger seen in the round: QA's report on
`handoff/qa-014-bc7-…` (fires on every QA run), lodged in record `INBOX.md`. Sessions stopped: `qa-…` and `devops-…` (`tmux-agent stop`).
Docker: `mariadb:11.8` and `postgres:16` images, not this chain's, left as they are. Disclosed: the TODO.md deletion was first issued as a
shell python write; the record-write gate refused it, and it was re-made with the Edit tool.
Retrospective: this chain took a REJECTED round; it joins the batch of every fixer chain closed since batch e (effort block 08:48Z).
