# Rulings — website dependency review and its fixes

Steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Coordinator: `steering-coordinator`. Origin: his selection at
2026-11-20T01:33Z, recorded in `steering/fix-personal-message-access-rulings.md`, block "2026-11-20T01:34Z", question "Deps review",
chosen option "Agent: open it after release (Recommended)": after the access fix ships, steering starts a security dependency-only review
of website, which assesses what hooks.gg reaches and brings any fix back to him as its own scope question.

## 2026-11-20T01:59Z — review delivered; three scope answers (his selection)

**Review:** `security/website-deps-review-security-audit.md` (record `1248690`), `Status: Active`, `Reviewed-At: 983681c…`, read this
turn. Session `security-hooks-website-deps` (brief `steering/website-deps-review-brief-security.md`, `d1abc6e`). By its message:
- 141 advisory entries were dispositioned, in 34 packages. 5 are reached; none of the 8 criticals is reached as hosted.
- Owner-needing: H-001 (HIGH), H-002 (HIGH) and M-001 (MEDIUM), plus two confirmations (`/_next/image` served by Vercel; the
  `x-query-params` passthrough on Vercel) and unused dependencies.
**Refutation of H-001** (a `general-purpose-sonnet` helper, asked to run it on a production build, localhost only): not completed. The
question said so and carried security's development-build timings as security's.
**Selection prompt, put 01:5xZ, answered 01:59Z** (selection-ledger `steering/selection-ledger/2026-11-20.md`, block "2026-11-20T01:59Z
— steering-roadmap-hooks"). The options' wording is this thread's.
- Q "H-001 fix":
  - **Agent: fixer chain now (Recommended)** — CHOSEN, by selection. "Steering opens a small fixer chain on website: change the one
    function so the header is no longer decoded by the library, plus a lockfile override of decode-uri-component to 0.5.1 or later.
    It runs fixer, then code review, then security on the change, then a website master push, which Vercel deploys to production and
    which needs your word."
  - Agent: lockfile override only.
  - Agent: handoff record only.
  - Agent: do nothing.
- Q "H-002/M-001":
  - **Agent: separate chain after H-001 (Recommended)** — CHOSEN, by selection. "Once H-001 ships, steering opens its own chain for
    the Next.js upgrade and the save-size cap. A framework upgrade touches the whole site, so it gets its own scope, QA and release; it
    never delays H-001."
  - Agent: same chain as H-001.
  - Agent: handoff records only.
- Q "Unused deps":
  - **Agent: remove in H-001's chain (Recommended)** — CHOSEN, by selection. "The H-001 fixer drops the three from package.json, with a
    build and a suite run to show nothing used them."
  - Agent: leave them.
**Next (this thread):**
- The H-001 fixer chain's scoping determination: the scope sweep by a helper, then the determination block. Chain id
  `fix-message-page-header-decode`.
- Confirmation (a), whether Vercel serves `/_next/image`, is a read-only Vercel read by `vercel api` (a Standing Default per
  `steering/017-standing.md`). It is made, not asked.
- Confirmation (b) needs a request to production. It goes into the chain's post-deploy reads, never as a load request.
