# Brief, common part — fixer chain `fix-image-uploader-url` (9e)

From `steering-hooks-fixer`, written 2026-11-23T15:55Z at the determination. Every brief of this chain names this file second, after its
`Duties negated:` line, and adds only what is its own stage's. tmux category: `fix-image-uploader-url`.

## Determination and stage set

- His words and the determination (scope statement, write set, what the sweeps did not cover):
  `/usr/local/bin/hooks/agent-output/steering/fix-image-uploader-url-rulings.md`, blocks "2026-11-22T04:44" (his selection, "fix all
  three") and "2026-11-23T15:54Z" (re-sweep, refutation, determination). The blocks govern. "Fix everything found along the way" is
  effort rulings block 04:50 (`steering/fixer-queue-2026-11-21-rulings.md`); it brings F3 in.
- Stage set, quoted: "`fixer-fix-image-uploader-url` → `code-reviewer-fix-image-uploader-url` (under 20 production lines: the reviewer
  also runs the suite, typecheck, red test) → QA Phase 2 at 20 or more → devops for website `master` (his word). No plan, critic, Phase 1
  or UAT."
- End step: website `master`, which Vercel deploys to production (no `.github/workflows`; `release-move.js --dry-run` passed at `af3d95a`).
- Evidence: the sweep `verification/fix-image-uploader-url/scoping/sweep-af3d95a.md`; the refutation
  `verification/fix-image-uploader-url/scoping/refutation-af3d95a.md`; the older sweep `…/scoping/sweep.md` (at `132a7ab`).

Repositories: `/usr/local/bin/hooks/website` (branch `chain/fix-image-uploader-url`, cut by steering from `origin/master` `af3d95a`, no
upstream) and `/usr/local/bin/hooks/agent-output` (the record). `/usr/local/bin/hooks` is not a repository: use `git -C <repo>`.

## Architecture

`/usr/local/bin/hooks/agent-output/architecture/website.md` (W-1 to W-4; W-2: the back end reflects what the front end allows, so a bad
address is stopped in the dialog, not by a server-side gate). `architecture/system-architecture.md` is the evergreen record. Not checked by
this brief: the full prohibition list of either file.

## Hazards (each a candidate to re-derive)

1. Load order drives F2 and F3. A test that resolves `Image` in a microtask, as the existing two do, never reaches them. Drive load order by
   hand.
2. `PresetDialog unmount={false}` keeps the component mounted across close and reopen. Cancel's reset has to work without a remount.
3. The five consumers (`Author.tsx`, `EmbedAuthor.tsx`, `EmbedFooter.tsx`, `EmbedImage.tsx`, `EmbedThumbnail.tsx`) pass `image` and a
   setter. A changed prop contract reaches all five.
4. The "Image not found." branch (a well-formed address that fails to load) is read from code, not run.

## Standing rules

- A call stopped by a control: stop and message `steering-hooks-fixer`; never re-issue it in any form. The record says only "not
  completed", with no reason.
- Record documents: Write, Edit or `record-edit.js` only. Stamps come from `date -u` in the same turn.
- Never use the bare word `none` in a command. Run commands with your shell outside `preview-image-generator`.
- Usage: `weekly_all` 14% (live, 15:26Z). At 98% every session checkpoints and stops until the reset.
