Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-brief-common.md` — read it whole first. Its scope
statement is replaced by rulings blocks "2026-11-22T20:44" (the source-width class) and "2026-11-22T21:21" (CR-4 carried elsewhere;
CR-3 rides) in `steering/fix-decorator-offsets-rulings.md`; the chain is capped (block 22:27).

From `steering-hooks-fixer`. You are `devops-fix-decorator-offsets`. Release fixer chain `fix-decorator-offsets` (website) per your
definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the push to website
`master` deploys to Vercel production).

## Gate documents (take each anchor from its document at your start)

- Fixer: `implementation/fix-decorator-offsets-implementation.md` (§ "Round 6", `Handoff-At: febf20e`).
- Code review: `code-review/fix-decorator-offsets-code-review.md`, scoped confirmation `Reviewed-At: febf20e39905c977b0d42081137817cb7b704478`
  (record `4dfe5b40`, APPROVED; production files byte-identical to the approved `24eda1c`).
- QA Phase 2: `qa/fix-decorator-offsets-qa.md` — its `Verified-At` must name `febf20e` with a pass; read it there.

## Trees and refs

- Website `/usr/local/bin/hooks/website` on `chain/fix-decorator-offsets` (cut from `origin/master` `8845b7e`, no upstream). Re-read
  `git ls-remote origin master` and the porcelain at your start; `?? .playwright-mcp/` is not this chain's.
- No `.github/workflows`. Re-run `release-move.js … --dry-run` at your tip.
- The shared tree's gitignored `.next/types` is stale: an in-tree typecheck exits 2; Vercel builds clean. Leave it.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-decorator-offsets-rulings.md`, every block from 03:03 (his selection) on;
  carried elsewhere: CR-4, CR-6 and the nested-scope rows (chain `fix-decorator-nested-styles`), the emoji pre-transform defects (chain
  `fix-emoji-pretransform-widths`, his selection 22:1x).
- Assumptions Not Checked: the code review's and QA's sections.
- **Post-deploy row = QA's blocking-condition row B-1** (`qa/fix-decorator-offsets-qa.md`, record `b2a0bd6b`; owner devops): on hooks.gg,
  signed out, in the blank message editor, a `browser-walker` helper (your subagent) enters the four lines QA names — `***ab*** cd`,
  `# **a**`, `**a https://x.y**`, and a ```js block holding `const a = 1;` — and captures the editor; pass conditions as QA's row states
  (including its Assumption Not Checked on two-class leaf colouring); nothing saved. Captures
  under `verification/fix-decorator-offsets/devops/` (screenshots stay uncommitted). If a real browser is not available, record not run
  and say so.
- The fixer's **User-visible flows** list is quoted to him with the release, in his words.
- Architecture: steering lodges any entry at closure.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings `steering/fixer-queue-2026-11-21-rulings.md` block "2026-11-21T19:02"): from the
  website dir with stdin closed, `vercel ls --prod`, `vercel inspect <url>`, `vercel logs <url>` (CLI 29.1.1 returns the build log). The
  CLI hangs intermittently: `timeout 60`; a hang is not a control — retry up to twice. `vercel inspect https://hooks.gg` gives the
  serving deployment's URL directly. Never deploy, change settings or read secret values.
- Public signed-out requests and the browser walk above, on hooks.gg, read-only.

## Hazards (each a candidate to re-derive)

1. Deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
2. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the flows in his words. The verbatim detail goes in your record.
3. Never use the bare word `none` anywhere in a command. A call stopped by a control: stop and message `steering-hooks-fixer`, never
   re-issue; the record says only "not completed".

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-decorator-offsets/devops/`.
