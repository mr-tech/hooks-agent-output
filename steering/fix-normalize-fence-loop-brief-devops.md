Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-normalize-fence-loop-brief-common.md` — read it whole first.

From `steering-hooks-fixer`. You are `devops-fix-normalize-fence-loop`. Release fixer chain `fix-normalize-fence-loop` (website) per your
definition: Stage 1 now; Stage 2 only on the owner's release approval, which you ask him for in this session (the push to website `master`
deploys to Vercel production).

Stage set, quoted from the determination (`steering/fix-normalize-fence-loop-rulings.md`, block "2026-11-23T08:55Z"):
"`fixer-fix-normalize-fence-loop` → `code-reviewer-fix-normalize-fence-loop` (under 20 production lines: the reviewer also runs the
suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1 or UAT."

## Gate documents (take each anchor from its document at your start)

- Fixer: `implementation/fix-normalize-fence-loop-implementation.md` (`Handoff-At: 61e5dfe — repos=website`).
- Code review: `code-review/fix-normalize-fence-loop-code-review.md`, Round 1 sub-entry 1b APPROVED, `Reviewed-At: 61e5dfe — repos=website`
  (record `1e93f428`).
- QA Phase 2: `qa/fix-normalize-fence-loop-qa.md`, QA Complete, `Verified-At: af3d95a — repos=website; production code identical to the
  reviewed 61e5dfe (the delta 61e5dfe..af3d95a is QA's test files only)` (record `c03ffba3`, read by this thread 13:09Z). Re-read it there.

## Trees and refs

- Website `/usr/local/bin/hooks/website` on `chain/fix-normalize-fence-loop` (cut from `origin/master` `0411d3b`, no upstream; HEAD
  `af3d95a` by `git rev-parse` at this brief's compose time). Re-read `git ls-remote origin master` and the porcelain at your start.
- `.github/workflows` does not exist (`ls`, 13:09Z this turn). Run `release-move.js … --dry-run` at your tip.

## Decisions and carriers for your forward-item sweep

- Rulings: `/usr/local/bin/hooks/agent-output/steering/fix-normalize-fence-loop-rulings.md`, every block, including "2026-11-23T09:40Z"
  (`utils/codeFence.ts` is inside the write set). Effort-wide: `steering/fixer-queue-2026-11-21-rulings.md`.
- Carried elsewhere, not holding the release: typing a fence above or inside a quote line drops that line's `> ` on save (same at base). It
  is row S-29 of `verification/slate-formatting-effort/scoping/inventory.md`, owned by `steering-hooks-fixer` for the Slate formatting
  effort. QA's QAF-4 (346 of 15,480 random edits, a wider trigger for the same mechanism) widens that row; steering carries it into that
  effort's planner brief.
- Assumptions Not Checked: the code review's section (discharged by QA's mounted-editor test and dev-build walk, per QA's document) and
  QA's section: its walk ran a development build, so the premise left is that the production bundle behaves the same.
- **Post-deploy walk** (this thread's guidance; QA records no post-deploy row, so you decide whether to make it one): on hooks.gg
  production's message editor, signed out and saving nothing, have a `browser-walker` helper (your subagent): (1) paste `> a`, a bare
  fence line, then `foo`, and type one character in the box, which should be accepted with no error; (2) paste `>>> a\nb` and leave the
  box, then read the text back, which should be unchanged. Captures go under `verification/fix-normalize-fence-loop/devops/` (screenshots
  uncommitted). If the editor is not reachable signed out without a save, or no real browser is available, record not run and say so.
- The fixer's **User-visible flows** list (implementation document, § "User-visible flows") is quoted to him with the release.
- Architecture: steering lodges any entry at closure.

## Instruments you hold

- Vercel CLI, look-only (his selection, effort rulings block "2026-11-21T19:02"): from the website dir with stdin closed,
  `vercel ls --prod`, `vercel inspect <url>`, `vercel logs <url>`, each under `timeout 60`. The CLI hangs intermittently; a hang is not a
  control, so retry up to twice. Never deploy, change settings or read secret values.
- Public signed-out requests and the browser walk above, on hooks.gg, read-only.

## Hazards (each a candidate to re-derive)

1. Deploy evidence is the production deployment itself (Ready, built from your tip, serving hooks.gg), not the push.
2. His standard for questions to him (effort block "2026-11-21T18:37Z"): your release ask opens with the context, then the decision, in
   plain English, with no commit IDs, tool or branch names; the flows in his words. The verbatim detail goes in your record.
3. Never use the bare word `none` anywhere in a command. A call stopped by a control: stop and message `steering-hooks-fixer`, never
   re-issue; the record says only "not completed".
4. Usage: `weekly_all` 6% (live, 09:40Z); the 98% weekly gate stands.

## Routing

- Owner-needing items you are not asking him yourself, and spawn cues: SendMessage to `steering-hooks-fixer`.
- Stage 1 completion and the Stage 2 / post-deploy outcome: to `steering-hooks-fixer` by SendMessage.
- Your document under `deployment/`; evidence under `verification/fix-normalize-fence-loop/devops/`.
