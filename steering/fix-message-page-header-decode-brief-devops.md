# Brief — devops, fix-message-page-header-decode

Duties negated: none.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-message-page-header-decode-brief-common.md`. The
register for this fixer chain is the rulings file `steering/website-deps-review-rulings.md`, blocks 01:59Z to 02:18Z. There is no plan
and no UAT.

- **You:** session `devops-hooks-fix-message-page-header-decode`, cwd `/usr/local/bin/hooks/website`.
- **Start:** now. The spawn cue came from security on the change.
- **End step:** website `master` → the chain tip. Vercel deploys a `master` push to production, with no beta and no workflows. Stage 2
  runs only on his release approval, which you ask for in your own session (Phase 2B). Steering puts no release prompt of its own while
  you are live.
- **Gate anchors**, copied at 02:2xZ from each document's anchor field (re-read before you act):
  - fixer `Handoff-At: 7923a1d` (`implementation/fix-message-page-header-decode-implementation.md`, `0c17d20`);
  - code review `Reviewed-At: 7923a1d9…`, APPROVED (`code-review/fix-message-page-header-decode-code-review.md`, `d67e7d5`; under 20
    production lines, so the reviewer ran the suite: 1913/1913, exit 0);
  - security `Reviewed-At: 7923a1d9…`, APPROVED, risk LOW (`security/fix-message-page-header-decode-security-audit.md`, `5640deb`).
  - No QA stage: 1 production line, per the determination.
- **Steering's dry run, 02:2xZ:** `release-move.js website master 7923a1d9ac0b78df9a88a3fa99a82460e6d1edfe --dry-run`: "every check
  passed". Live master was `983681c`.
- **The release-tip verdict:** QA is not in this chain's stage set. Where your definition needs a release-tip verdict, the reviewer's
  run at `7923a1d` is the chain's suite evidence. If your definition still requires QA Phase 3, say so to steering; do not proceed past
  it.
- **Assumption Not Checked items to sweep:** the code review's (Vercel's `/_next/image` does not need the direct `sharp`) and
  security's (§ around its line 105).
- **Post-deploy row for your Stage 1 handoff**, a read an agent makes:
  - P-1, after the push: the same GET steering made before it (block 02:18Z, headers in
    `verification/fix-message-page-header-decode/steering/next-image-headers-pre-push.txt`):
    `curl -s -o /dev/null -D - 'https://hooks.gg/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Fembed%2Favatars%2F0.png&w=64&q=75'`.
  - Pass: 200 and `image/png`. A 5xx means images broke with the `sharp` removal; that is a rollback question for him.
  Name its reader.
- **User-visible flows:** quote the fixer's **User-visible flows** list to him with the release ask. It holds nothing.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage, along with owner-needing items and spawn cues.
