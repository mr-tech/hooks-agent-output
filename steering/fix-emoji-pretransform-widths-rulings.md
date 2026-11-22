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
