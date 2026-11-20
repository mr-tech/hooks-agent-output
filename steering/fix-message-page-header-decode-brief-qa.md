# Brief — qa (Phase 3 only), fix-message-page-header-decode

Duties negated: Phase 1 and Phase 2. This fixer chain's stage set has no QA (1 production line; the code reviewer ran the suite). You
run the release-tip verdict alone, which devops's Phase 2A requires.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-message-page-header-decode-brief-common.md`.

- **You:** session `qa-hooks-fix-message-page-header-decode`, cwd `/usr/local/bin/hooks/website`.
- **Start:** now, on devops's spawn cue. The readiness record is `deployment/fix-message-page-header-decode-deployment.md` (records
  `2596a57`, `294c911`).
- **Tip:** website `7923a1d`, the chain's single commit over master `983681c` on `chain/fix-message-page-header-decode`. Nothing needs
  assembling. Origin `fix-message-page-header-decode`, record repo `/usr/local/bin/hooks/agent-output`.
- **Prior evidence to re-derive, not inherit:** code review at `7923a1d` (`code-review/…`, `d67e7d5`: red 4/4 at base, suite 1913/1913
  exit 0, typecheck 0) and security at `7923a1d` (`security/fix-message-page-header-decode-security-audit.md`, `5640deb`).
- **Owed per your definition:** the Phase 3 record with `Verified-At`, and the open-handoff sweep (`qa-phase-3.md` step 1b). Run any
  build in an isolated export, never in the shared tree. Never read `.env.local` values.
- **Deliver your verdict** to `devops-hooks-fix-message-page-header-decode` by SendMessage, copied to `steering-roadmap-hooks`.
