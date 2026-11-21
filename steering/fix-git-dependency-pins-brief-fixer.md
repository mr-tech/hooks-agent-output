Duties negated: none. (How your red-test duty applies to a manifest-and-build-output change is yours to decide and record; the
determination's checks — frozen install, byte-identical rebuild apart from the deleted files — are this thread's guidance.)

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-git-dependency-pins-brief-common.md` — read it whole first.

You are `fixer-fix-git-dependency-pins`. Work in two halves.

1. **Now — project-utils half** (scope items 1-2), on `chain/fix-git-dependency-pins` in `/usr/local/bin/hooks/project-utils` (first act
   `git -C /usr/local/bin/hooks/project-utils branch --show-current`). Commit by pathspec; hand off (spawn cue to `steering-hooks`) with
   `Handoff-At` naming the project-utils SHA. The reviewer then reviews it and devops pushes project-utils `master`.
2. **Later — website half** (items 3-4), only after `steering-hooks` messages you that the website tree is on
   `chain/fix-git-dependency-pins` and names the pushed project-utils commit. Until then, read website only at `origin/master`.

- Your document: `implementation/fix-git-dependency-pins-implementation.md` in `/usr/local/bin/hooks/agent-output` — one document for
  both halves, `Handoff-At` naming each repository's SHA (`repos=…`), the `git diff --numstat` counts per repository, and a
  **User-visible flows** list for the owner in plain English.
- Evidence under `verification/fix-git-dependency-pins/`.
- A change outside the write set, or a `dist/` rebuild that differs beyond the two deleted files: stop and message `steering-hooks`.
- Owner-needing items and spawn cues: SendMessage to `steering-hooks`.
