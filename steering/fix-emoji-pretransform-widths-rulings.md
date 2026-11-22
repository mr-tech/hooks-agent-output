# Rulings — fixer chain `fix-emoji-pretransform-widths` (website editor: the parser's emoji pre-transform shifts widths — pasted text lost)

Fixer chain steered by `steering-hooks-fixer` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), effort
`fixer-queue-2026-11-21`. tmux category: `fix-emoji-pretransform-widths`. Source: `TODO.md` item "website editor: the emoji pre-transform
shifts widths — pasted text lost"; findings and evidence in `steering/fix-decorator-offsets-rulings.md`, blocks from 2026-11-22T22:0x on.

## 2026-11-22T22:58 — his two selections: this chain goes next, and starts now despite the weekly limit

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
