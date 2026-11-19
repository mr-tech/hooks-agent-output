# Brief — security-hooks-017

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/017-brief-common.md` — read it whole before
your first act; its 2026-11-19T07:24Z update covers the branches.

From `steering-roadmap-hooks`, 2026-11-19T07:5xZ. You are the session `security-hooks-017`, launched in
`/usr/local/bin/hooks`. Chain 017 is a full planned chain (plan
`agent-output/planning/017-existing-items-backlog.md`, revision 7, agent-output `6ade256`).

Stage set, quoted from the determination (`steering/backlog-2026-11-18-rulings.md` block 21:59Z):
"… **Security** on the preview-image-generator delta before release: item 2's fix ships code the
generator runs, and the generator runs as root (`security/closed/015-preview-image-generator-security-audit.md`
H-001, cited by the architecture record)."

## What you review

The preview-image-generator delta on `chain/017-existing-items-backlog`, from `8de2b53` (production
`prod`, `git ls-remote` 07:23Z) to `8512a1d`: milestone M6. Anchors, copied from the gate documents
read 07:56Z:
- code review: `code-review/017-existing-items-backlog-code-review.md` Round 7 sub-entry APPROVED at
  `8512a1d` (agent-output `a010246`; plan R-39 `2208314`);
- QA Phase 2: `qa/017-existing-items-backlog-m6-qa.md`, `Verified-At` `8512a1d`, QA Complete
  (agent-output `dd7a449`; plan R-41 `b23a226`); QA's range: `src/generateImage.ts`, `src/server.ts`;
- implementation: `implementation/017-existing-items-backlog-m6-implementation.md` (agent-output
  `4c4e948`, fix round `008468b`). The fix round also changed the record script
  `verification/015/pig-host-read.sh`, which runs on the production host over the read-only user.

The website side of the same contract (M5: the website now deletes old preview objects in the bucket,
in `src/server/api/utils/shared.ts` and its helpers, website `4b8db9c`) is in your reach as far as the
generator's contract with it bears on security. Out: the generator's host posture and API-key
handoffs (his rulings: `handoff/preview-image-generator-host-security-posture-2026-11-08.md`,
`handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md`); reference them, do not
reopen them.

## Hazards (this thread's, candidates to re-derive)

- The generator runs as root (H-001); any new path it writes, reads or logs is the first thing to check.
- The generator's `.github/workflows/prod.yml` is flagged by the secret-file gate: no `git log`/`git
  show`/recursive read that can print it. This thread's own `git log -1` in that repo was refused even
  with `--name-only` (07:56Z). Name files explicitly, exclude `.github` from any export (QA did), and
  disclose any refusal without re-issuing the read in another form.
- Run nothing in the shared trees; use `git archive` exports.

## Delivery

- Your committed document's path and SHA → `steering-roadmap-hooks` by SendMessage; devops reads it at
  Stage 1.
- Findings with an implementer remedy → `implementer-hooks-017` (live) as well, by SendMessage.
- Owner-needing items and spawn cues → `steering-roadmap-hooks`.

## Not checked by this brief

The generator's dependency tree at `8512a1d`; whether `pig-host-read.sh` reads anything beyond pm2 and
app logs.
