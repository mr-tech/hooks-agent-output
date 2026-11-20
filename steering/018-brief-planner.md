# Brief — planner, the H-002/M-001 chain

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (sent under its first name,
`website-deps-upgrade-brief-common.md`, renamed at minting), read whole. It names his word, the
scoping determination, his three answers, the stage set, the standing prohibitions and the hazard-bearing analysis.

- **You:** session `planner-hooks-website-deps-upgrade` (category `website-deps-upgrade`). cwd `/usr/local/bin/hooks/website`.
- **Your commission:** the plan for this chain, on his word in `steering/website-deps-review-rulings.md` (blocks 01:59Z, 02:53Z and 03:08Z).
  The scoping block records his word opening the chain, so mint the chain's ID. On minting, tell steering the ID by SendMessage; steering
  renames the tmux category, the common brief and the rulings file.
- **Scope**, quoted from block 02:53Z, "In scope" (the block governs; his 03:08Z answers set the version to 16.4.6 and add the preview
  check):
  - "`next`, `@next/bundle-analyzer`, `@next/eslint-plugin-next` and `eslint-config-next` … raised to one matching 16.x release"; with
    16.4.6 chosen.
  - "The two test helpers that import Next.js internals … wherever the upgrade moves them."
  - "Re-verification of behaviour the record ties to Next 16.1.6": 017's navigation guards and link interception, and 004's
    `next/dynamic` preload.
  - "M-001: every array site reachable from `message.upsert` and `user.updatePreferences` (11 sites …), bounded at the site or not, is
    refused when over its limit before its elements are validated … The fix mechanism … is the planner's."
  - From 03:08Z: "Agent pushes the chain branch (preview only, production untouched). UAT loads the public pages, images and the sign-in
    redirect on the preview."
  - The exclusions in block 02:53Z ("Out, each shown to him in the scope question") were accepted with "as determined"; carry them into
    the plan's Exclusions register.
- **Hazard 4 (ESLint 9) is yours to settle in revision 1.** If the lint packages at 16.4.6 need an ESLint major, state it as its own
  milestone or as an exclusion, marked as a scope delta for him.
- **Deliver to:** the critic, per the next-act table. Send owner-needing items (`OPEN QUESTION`s, scope deltas) and spawn cues to
  `steering-roadmap-hooks` by SendMessage.
