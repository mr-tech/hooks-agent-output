---
UUID: d1d3015e
Status: Open
Status-Detail: "Six architecture items routed to the architect while no architect session was running: system-architecture.md is not reconciled to chains 012-014, the chain-013 findings document is still Active, and four record lines are stale or incomplete. Nothing blocks on them; a brief citing the architecture record reads stale text until they land."
Owning-Stage: architect
Review-Trigger: when an architect is next commissioned in this record (the conformance pass of the next plan, or the owner's word), and before any brief cites system-architecture.md § Roadmap Readiness for the state of plans 012-014
---

# Handoff — architecture record reconciliation owed

## What is seeded

1. **Reconcile `architecture/system-architecture.md` to chains 012, 013 and 014 as implemented.** Chain 015's reconciliation is landed (changelog row 2026-11-08T22:14); the three earlier chains' is not. § Roadmap Readiness (line 250 at this writing) still says plan 013 "is open and in critique"; chain 013 released on 2026-08-25.
2. **Disposition and close `architecture/013-components-v2-editing-surfaces-architecture-findings.md`** (`Status: Active`; chain 013 is closed). Its own Integration requirements say the reconciliation "is owed **after** implementation": the two V2 Problem Areas close and the Data-flow bullets take their post-M1/M8 state. It closes `Resolved` with item 1.
3. **Read `handoff/components-v2-invariant-for-system-architecture-2026-08-24.md` against the record and close it if discharged.** A cleanup helper found the invariant already present (ADR D-004 "The flag is the mode", the withdrawal of "flags derive from structure", the Data-flow correction in the changelog) but did not compare it line by line with plan 013's Handoff Notes "For the architect". The judgement is the architect's.
4. **`architecture/preview-image-generator.md` P-2** says the security and maintenance risk of the 2023 dependencies is a separate question nobody has assessed. `security/closed/015-preview-image-generator-security-audit.md` H-001 and H-003 are that assessment's first result (Chrome 116.0.5845.96 before the CVE-2023-4863 fix, run as root with `--no-sandbox`; Node 18.17.1, end of life). P-2 should point at the security document.
5. **`architecture/preview-image-generator.md` P-3** names a self-hosted runner but not its liveness as a deploy dependency. At chain 015's release the generator deployed 24 minutes after the push because the runner was down until the owner started it.
6. **Per-repo records.** `architecture/website.md` and `architecture/preview-image-generator.md` now exist; `project-utils` and `cdn` have none. Whether each needs one is the architect's judgement (raised by `architect-hooks-1`, 2026-08-23).

## Evidence

- Item 1: `grep -n -i 'in critique' architecture/system-architecture.md` returns line 250 (run by the cleanup, 2026-11-10); the 22:14 reconciliation row is line 12 of the same file.
- Item 2: the findings document's frontmatter `Status: Active` and its § Integration requirements, third bullet.
- Item 3: the cleanup's helper table, `verification/cleanup-2026-11-10/handoffs-survey.md`, row 7c4e1a92.
- Item 4: the security document's H-001 and H-003; capture `verification/015/security-host-read-2026-11-08T0929Z.txt` § E and § H.
- Item 5: `retrospectives/closed/015-bug-evaluation-fixes-retrospective.md`, R8 and its Handoff.
- Item 6: `ls architecture/` on 2026-11-10 lists `preview-image-generator.md`, `system-architecture.md`, `website.md` and the 013 findings document.

## Origin

Record-inbox entries, deleted in this pass: architect-hooks-015 (2026-11-08, items 1 and 2); security-hooks-015 (2026-11-08, item 4); pi-batch (2026-11-09, item 5 and the Roadmap Readiness line of item 1); `TODO.md` "Per-repo architecture records do not exist" (item 6, deleted there). Item 3 is the project cleanup's own finding.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-10T08:40 | steering-cleanup | Created by the 2026-11-10 project cleanup from record-inbox entries routed to this stage while no session of it was running; the entries are deleted from `INBOX.md` in the same pass |
