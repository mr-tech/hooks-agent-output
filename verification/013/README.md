# `verification/013/` — QA-authored instruments for chain 013

**What belongs here**: executable instruments QA built to **discriminate a finding** or to compute
a number a verdict rests on — probes, controls, differential matrices, payload sets — together
with their captured runs and a README stating what each one settles. Also: operator-observation
captures for criteria with no automated coverage, where the designated observer is a stage agent
(`<criterion>.md`), per plan 013 "Surfaces Without Automated Coverage".

**What does not belong here**: acceptance specs for plan 013's criteria. Vitest already reaches
`src/**/__tests__/` in the `website` tree; a criterion's spec lives in the service's own suite so
it runs on every future change. This directory is not a second home for the test suite.

**Where the owner's attestations go**: nowhere here. Where the designated observer is the
repository owner, no capture path is minted and no file is owed — his attestation, quoted with
its timestamp in the consuming document (the UAT record), is complete evidence.

| Directory | Settles |
|---|---|
| `probe-preexisting-seed-route/` | whether UAT can mint its own M8-G seed pre-deploy, making the D19 repair not a one-way door |
