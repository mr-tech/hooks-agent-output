Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-brief-common.md` — read it whole first.

From `steering-hooks-fixer`. You are `devops-fix-emoji-pretransform-widths`. Release fixer chain `fix-emoji-pretransform-widths` (website)
per your definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the push to website
`master` deploys to Vercel production).

Stage set, quoted from the determination (`steering/fix-emoji-pretransform-widths-rulings.md`, block "2026-11-22T22:59"):
"`fixer-fix-emoji-pretransform-widths` → `code-reviewer-fix-emoji-pretransform-widths` (under 20 production lines: the reviewer also runs
the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1 or UAT."

## Gate documents (take each anchor from its document at your start)

- Fixer: `implementation/fix-emoji-pretransform-widths-implementation.md` (`Handoff-At: 0411d3b`).
- Code review: `code-review/fix-emoji-pretransform-widths-code-review.md`, Round 1 sub-entry APPROVED_WITH_COMMENTS,
  `Reviewed-At: 0411d3ba146018a5a8d3e8a45398d7d04f499d18` (record `83e02c84`).
- QA Phase 2: `qa/fix-emoji-pretransform-widths-qa.md` — QA Complete, `Verified-At: 0411d3ba146018a5a8d3e8a45398d7d04f499d18`
  (record `b3537900`, read by this thread 08:2xZ); re-read it there.

## Trees and refs

- Website `/usr/local/bin/hooks/website` on `chain/fix-emoji-pretransform-widths` (cut from `origin/master` `febf20e`, no upstream; HEAD
  `0411d3b` by `git rev-parse` at this brief's compose time). Re-read `git ls-remote origin master` and the porcelain at your start;
  `?? .playwright-mcp/` is not this chain's.
- `.github/` holds `prompts/` only, no `workflows/` (`ls`, this turn). Run `release-move.js … --dry-run` at your tip.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-emoji-pretransform-widths-rulings.md`, every block; effort-wide
  `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-23T08:15Z" (the resume). Carried elsewhere: CR-3, the `_`-pairing rows and
  QA's static-render note (`TODO.md`, item "website editor: nested formatting loses the outer style"); CR-2 declined by the reviewer.
  The exclusion stands: an emoji element is stored and copied as `:name:`.
- Assumptions Not Checked: the code review's section (discharged by QA's browser walk, per QA's document) and QA's section — the emoji
  picker's click path is assumed to insert through `editor.insertText`; guild emoji and mobile IME are unverified.
- **Post-deploy row = QA's B-1** (`qa/fix-emoji-pretransform-widths-qa.md`, register; owner devops): on hooks.gg production's message
  editor, a `browser-walker` helper (your subagent) pastes `x🙂 abcdefghijklmnopq` with a real paste and reads the line; pass and fail
  forms as the row states; nothing saved. Guidance this thread composed: in the same walk, also paste `wow :ok🙂 hi` (expect it exactly,
  🙂 plain), and, where the picker is reachable without signing in, pick a standard emoji into a ```js code line after `x = 1;` and read
  that nothing after the cursor changes — that is QA's picker assumption, its standard-emoji limb. Whether the editor is reachable signed
  out, without a save, is yours to establish (the decorator chain's walk used the blank editor signed out). Guild emoji and mobile IME
  cannot be driven here: name them in your Stage 1 handoff as open forward items owned by `steering-hooks-fixer`. Captures under
  `verification/fix-emoji-pretransform-widths/devops/` (screenshots uncommitted). If a real browser is not available, record not run and
  say so.
- The fixer's **User-visible flows** list (implementation document, § "User-visible flows") is quoted to him with the release.
- Architecture: steering lodges any entry at closure.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings block "2026-11-21T19:02"): from the website dir with stdin closed,
  `vercel ls --prod`, `vercel inspect <url>`, `vercel logs <url>`. The CLI hangs intermittently: `timeout 60`; a hang is not a control —
  retry up to twice. `vercel inspect https://hooks.gg` gives the serving deployment's URL. Never deploy, change settings or read secret
  values.
- Public signed-out requests and the browser walk above, on hooks.gg, read-only.

## Hazards (each a candidate to re-derive)

1. Deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
2. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the flows in his words. The verbatim detail goes in your record.
3. Never use the bare word `none` anywhere in a command. A call stopped by a control: stop and message `steering-hooks-fixer`, never
   re-issue; the record says only "not completed".
4. Usage: `plan-usage.py --json` live 08:15Z read `weekly_all` 0.0%; the 98% weekly gate stands.

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-emoji-pretransform-widths/devops/`.
