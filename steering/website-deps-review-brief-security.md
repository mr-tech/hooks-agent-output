# Brief — security, website dependency-only review

Duties negated: none.

- **You:** session `security-hooks-website-deps`, cwd `/usr/local/bin/hooks/website`.
- **His word:** a selection at 2026-11-20T01:33Z. Recorded in `steering/fix-personal-message-access-rulings.md`, block
  "2026-11-20T01:34Z", question "Deps review", the option chosen: "Agent: open it after release (Recommended)". After this fix ships,
  steering starts a security dependency-only review of website. It assesses which findings hooks.gg actually reaches and records them,
  then brings any fix back to him as its own scope question. The fix shipped at 01:33:58Z.
- **Scope:** website at `master` `983681c`, its lockfile only, dependencies and not product code. The input:
  `pnpm audit --prod --json` gave 8 critical, 76 high, 50 moderate and 12 low (steering's run, 00:2xZ, exit 1; the
  `security-hooks-fix-personal-message-access` audit's INBOX entry gave the same counts). For each finding, assess whether hooks.gg
  reaches the vulnerable code: which package and path, whether it ships to the server or to the browser, and how it is reached.
- **Out of scope:** remediation. A fix comes back to him as its own scope question, through steering. Do not edit `package.json` or the
  lockfile. Do not install into the shared tree: an isolated export takes its own install. Never read `.env.local` values.
- **Output:** one ID-less document under `security/`, named for the website dependency review.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage, along with owner-needing items.
