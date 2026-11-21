Duties negated: QA Phase 1 and the Phase 2 test-audit duties (the code review ran the suite, the red tests and the controls at
`b68f94c`; you do not repeat them). Your stage is one pre-release browser walk, by his selection.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-desktop-draft-as-typed-brief-common.md` — read it whole first.

You are `qa-fix-desktop-draft-as-typed`. The stage set you run under is quoted in `steering/fix-desktop-draft-as-typed-rulings.md`,
block "2026-11-21T11:14Z" (his selection A, "Agent: walk before release"). You start on the code reviewer's committed approval
(`code-review/fix-desktop-draft-as-typed-code-review.md`, record `488b209`, `Reviewed-At` `b68f94c`) and its Assumption Not Checked
(line 98), which this walk discharges.

- **The walk:** a local build of website `b68f94c` (the chain branch, checked out in `/usr/local/bin/hooks/website`; do not switch the
  tree — use an export if you need another SHA), in a real desktop-width browser (the `browser-walker` helper drives it from your
  step list). Walk the fixer's **User-visible flows** 1-4 (`implementation/fix-desktop-draft-as-typed-implementation.md`,
  § User-visible flows): type into the open content editor (message content, and at least one embed field), the embed author name
  and the footer text, then reload with the editor still open; record whether the typed text comes back, and whether the caret stays
  at the end while typing (type a multi-word value with spaces, e.g. "a b c", in author name and footer). Where it costs no extra
  build, the same walk at `b663b35` is the base (the text is lost at base).
- **Typing and reload only, never Save.** Prefer route 0 (a new message, whose draft is in the browser's storage). If the walk needs a
  local database at all, the common part's "before the first save" prohibition binds before the first request that could write, and
  you record the id range; the record's `uat-local-stack.sh` is the local stack used before.
- Flow 5 is being corrected by the fixer on the reviewer's CR-1 (record only); read the document's current text, and a flow 5 you
  find still wrong is a finding.
- A PASS carries `Verified-At: b68f94c` and is delivered to `steering-hooks` by SendMessage (devops is started from it). A failure
  (text lost, caret jumps) goes to `fixer-fix-desktop-draft-as-typed`, copied to `steering-hooks`.
- Your document: `qa/fix-desktop-draft-as-typed-qa.md` in `/usr/local/bin/hooks/agent-output`, with a per-flow execution table.
  Evidence under `verification/fix-desktop-draft-as-typed/qa/`; screenshots stay untracked.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
