# qa/

QA documents, one per chain (`NNN-<plan-name>-qa.md`; per milestone delivery `NNN-<plan-name>-m<n>-qa.md`;
release-tip records named by release identifier). Owned by the qa agent. Terminal documents live in `closed/`.

## Checklist per QA document

- [ ] Header: ID, Origin, UUID inherited; `Verified-At` with `repos=`; `Status` from the qa vocabulary; `Phase`.
- [ ] Phase 1: strategy per criterion with measured population (count and command), Irreversible Side-Effect
      Register, "TESTING INFRASTRUCTURE NEEDED" items, entry conditions as probe shapes.
- [ ] The chain's blocking-condition register lives in its first QA document; later passes append and cite.
- [ ] Every instrument a finding or verdict rests on is captured under `verification/<chain>/` and committed.
- [ ] Phase 2: TDD Compliance table checked first; suites run with exit code beside counters; mutation sweep over
      the chain's production diff where required.
- [ ] One "Assumption Not Checked" line per pass, routed in the handoff.
- [ ] Changelog row per pass, opening with the phase.
