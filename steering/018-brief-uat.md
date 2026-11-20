# Brief — uat-hooks-018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act. Its lines 25-28 (branch not cut) are superseded: the chain branch is cut.

From `steering-roadmap-hooks`, 2026-11-20T06:20Z. You are the session `uat-hooks-018`, launched in `/usr/local/bin/hooks/website`.

## Your stage

UAT on plan `agent-output/planning/018-next-upgrade-save-size-cap.md` revision 8 (`2dc79a3`, Status QA Complete).
- **Start:** QA's effort-final Phase 2, `agent-output/qa/018-next-upgrade-save-size-cap-m4-qa.md` at agent-output `62703f1`,
  `Verified-At` `d1bb9b0` (website `chain/018-next-upgrade-save-size-cap`). The per-milestone QA documents are
  `qa/018-next-upgrade-save-size-cap-m{1,2,3}-qa.md`; the register (B-1 to B-10) is in `qa/018-next-upgrade-save-size-cap-qa.md`.
- **Your rows:**
  - local build at `d1bb9b0`: B-1, B-2 (both limbs; the second is the capped refusal read over HTTP, signed in), B-3 (R1, R2, R3, R5),
    B-9 (M2-e, highlighted code blocks), and M5-d (sign-in reaches Discord's authorise page; stop there);
  - preview: B-4 (M5-b, M5-c) once `devops-hooks-018` tells you the release-check deployment is `READY` (B-5, M5-a). On the preview
    `/api/auth/*` answers 500; record it, it is not a failure (D-8);
  - post-deploy rows (B-6, B-7, B-8, B-10, M1-h, M2-e) are not walked now. M2-e's after-deploy look is yours after release (revision 8
    names UAT its runner); devops carries them in its Stage-1 handoff.
- **R3:** when your R3 walk is committed, tell `steering-roadmap-hooks`; the architect lands it from
  `handoff/018-m4-r3-navigation-limit-to-architecture-record-2026-11-20.md`.
- **The shared tree** is on the chain branch at `d1bb9b0` with `node_modules` installed to the chain lockfile (ruling,
  `steering/018-rulings.md` block "2026-11-20T04:51Z"). Build there, or in an export of `d1bb9b0`; either way record the SHA you built.
- **Local build rule** (common part, quoted whole): move the message id sequence to 900000000000001 before the first save and record
  the id range you wrote. `.env.local`: key names, hosts and ports only, never a value. A local database that already holds low ids is
  recreated, not reused.
- **Access:** Discord test accounts through the `discord-test-browser` skill. Screenshots stay untracked; evidence text under
  `agent-output/verification/018/uat/`.
- Use `browser-walker` helpers for multi-step walks.

## Delivery

- Your committed UAT document → `devops-hooks-018` by SendMessage; to `steering-roadmap-hooks` when no devops session is live.
- Owner-needing items, the R3 cue and spawn cues → `steering-roadmap-hooks`.
- Security follows UAT in the stage set; steering briefs it.

## Not checked by this brief

Whether the local stack starts cleanly at `d1bb9b0` (`uat-local-stack.sh` or your own); whether test accounts are signed in.
