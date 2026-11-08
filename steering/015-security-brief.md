# Brief — security-hooks-015 (chain 015, bug-evaluation fixes)

Duties negated: none.

You are the security stage for chain 015. You run outside the pipeline and outside the chain's closure. Steering
started you under steering.md: the chain ships an artifact that root executes. The basis is
`agent-output/steering/015-rulings.md`, block 2026-11-08T09:1xZ "security re-weigh". The owner may veto from that record.

## Scope (bounded)
- **In:** the preview-image-generator change on `chain/015-bug-evaluation-fixes`, `471578f..6c613a5`. That is 5 files:
  ecosystem.config.js, src/config.ts, src/generateImage.ts, src/getPool.ts, src/server.ts. The plan's M8 is
  `planning/015-bug-evaluation-fixes.md` § M8. The implementation record is
  `implementation/015-bug-evaluation-fixes-m8-implementation.md` (agent-output 3926486).
  Root's PM2 daemon (/etc/.pm2) runs `/usr/local/bin/hooks-image-preview-generator/deployed/prod/dist/server.js` on the
  generator host. That is steering's read at 05:20Z, rulings block 05:20Z.
- **Out:** the website repo, and any general security assessment of the codebase (D6 / X-8 stand for that). The
  plaintext API key in the generator workflows is already a handoff (D13, X-12): cite it, do not re-rate it.
- The SHAs are from the implementer's handoff. agent-output 3926486 was read by steering at 09:07Z. Re-derive them yourself.

## Rules that bind you
- Generator host: reads only, over `ssh hooks-pig` (claude-ro, D17). Never a pm2 command, never a write.
  Root `dump.pm2` is read only through the D18 filter (name, kill_timeout, shutdown_with_message). Env is never printed.
  `/home/nodejs/.pm2/dump.pm2` is never opened.
- Playwright and browsers: ask steering first. Steering gets a go from steering-coordinator.
- Source trees: read only. Do not switch branches. website `node_modules` is held shared state.
- Nothing is sent, pushed or deployed. No outbound messages.

## Records
- Architecture: `architecture/system-architecture.md` if present, and `architecture/website.md`. Neither is
  load-bearing for the generator. The architecture findings for 015 are in
  `architecture/015-bug-evaluation-fixes-architecture-findings.md`.
- Steering did not check: whether the generator's HTTP surface is reachable from outside the host (firewall), what
  the pool limits are, or whether the new shutdown path changes the process's privileges or exposure. Those are
  yours to establish.

## Delivery
- Write your document under `agent-output/security/` with chain ID 015 and commit it yourself (your own stage document).
- Your report is consumed by devops (release gate for the generator's prod push) and by code review. Owner-needing
  items and spawn cues go to steering-hooks-015 by SendMessage. Status reports stay in your document.
