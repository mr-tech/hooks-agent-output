# Brief — security-hooks-website-deps, on chain 018

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/018-brief-common.md` (determination, his answers, stage set, prohibitions,
architecture record, hazards). Read it before your first act. Its lines 25-28 (branch not cut) are superseded: the chain branch is cut.

From `steering-roadmap-hooks`, 2026-11-20T06:5xZ. You are the session `security-hooks-website-deps`, launched in
`/usr/local/bin/hooks/website`. Your Resumption State is in `security/website-deps-review-security-audit.md` § Resumption State
(written 02:39Z); its "Next, when a brief arrives" items 1 and 2 are this work. The chain it waited for is 018.

## Now: security on the change, and H-002 and M-001 closed

- **The change:** website `7923a1d..d1bb9b0` on `chain/018-next-upgrade-save-size-cap` (no upstream). Plan
  `planning/018-next-upgrade-save-size-cap.md` revision 8 (`2dc79a3`). Next.js 16.4.6, ESLint 9 and its packages, `highlight.js`
  11.12.0, `zod` pinned exactly at 3.22.4, and M1's save-list cap and error cap (D-9).
- **The bars are your own** (Resumption State item 1): H-002's lockfile `next` version; M-001's refusal before one issue per element.
  Your zod probe, the `pnpm audit --prod --json` re-run at the chain lockfile, and the `apply-dispositions.js --allow-unused` join, with
  a disposition for each new entry.
- **A-1:** the read is made. `verification/website-deps-review/scoping/a1-vercel-image-config.json` (block 02:53Z of
  `steering/website-deps-review-rulings.md`).
- **Shared tree:** the website tree is on the chain branch at `d1bb9b0`, and its `node_modules` follows the chain's lockfile (ruling
  `steering/018-rulings.md` block "2026-11-20T04:51Z"). Read it; run builds and servers in an isolated export under caps, as your
  Resumption State's approach says. Do not switch the tree.
- **Not the review's object:** the release-check branch `release-check/018-next-upgrade-save-size-cap` at `5677889` is `d1bb9b0` plus one
  `vercel.json` commit for the preview alone. It never reaches `master`.
- **Gate anchors**, copied 06:5xZ from each document's anchor field (re-read before you rely on them):
  - implementation `Handoff-At` `d1bb9b0` (`implementation/018-next-upgrade-save-size-cap-m2-implementation.md`, at `404df24`);
  - code review `Reviewed-At` `d1bb9b0` (`code-review/018-next-upgrade-save-size-cap-code-review.md`, at `b937d63`);
  - QA `Verified-At` `d1bb9b0`, QA Complete (`qa/018-next-upgrade-save-size-cap-m4-qa.md`, at `62703f1`);
  - UAT `Verified-At` `d1bb9b0`, APPROVED FOR RELEASE (`uat/018-next-upgrade-save-size-cap-uat.md`, at `fabdbe7`).
- **Your document's close** (item 2): A-1, A-2, A-3, I-1, I-3, I-5 and I-6 each get a carrier or an end.

What this brief did not check: whether the chain's lockfile resolves `next` 16.4.6 everywhere, whether the audit re-run is clean, and
whether any new advisory entry appears. Each is yours to establish.

## Delivery

Your report → `devops-hooks-018` by SendMessage (its Stage 1 waits on your committed document). Owner-needing items and spawn cues →
`steering-roadmap-hooks` by SendMessage.
