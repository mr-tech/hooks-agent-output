# Brief — uat (post-deploy reads), fix-personal-message-access

Duties negated: the UAT document. This fixer chain has no UAT stage; you are its post-deploy reader. Your results go into the carrier
handoff named below (its Owning-Stage is uat), not into a `uat/` document.

Common part, read first and whole: `/usr/local/bin/hooks/agent-output/steering/fix-personal-message-access-brief-common.md`. It carries
the property and the standing prohibitions.

- **You:** session `uat-hooks-fix-personal-message-access`, cwd `/usr/local/bin/hooks/website`.
- **Start:** now. Website `master` is at `983681c` (released 2026-11-20T01:33:58Z, devops;
  `deployment/closed/fix-personal-message-access-deployment.md`).
- **Carrier:** `/usr/local/bin/hooks/agent-output/handoff/fix-personal-message-access-post-deploy-2026-11-20.md`, § "Rows, carried in full
  from the register". Run B-2 first, then B-1, exactly as the rows state them, with their pass conditions:
  - B-2: a signed-in `message.getOne` on `99999999999999999999` must return 400 BAD_REQUEST. A 500 means the deploy is not serving the
    fix: stop there and report it.
  - B-1: re-walk `verification/access-defects/browser-check/README.md`. Test account 1 must be refused test account 2's personal
    message.
  Together they are security's RC-2, the one production read of the session path. Record each row's observed values, time and
  evidence path in the carrier, and set its state. Row R-1 is his read; leave it alone.
- **Access:** the Discord test accounts on live hooks.gg, through the `discord-test-browser` skill. His standing ruling allows test
  accounts to sign in on live hooks.gg and write to the production database through them, never customers' data
  (`steering/015-rulings.md` line 429). Any message you create belongs to a test account; delete it at the end, as the README does.
- **Screenshots stay untracked** (his ruling, `steering/017-rulings.md` block 2026-11-19T09:01Z). Evidence text goes under
  `verification/fix-personal-message-access/post-deploy/`.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage, along with owner-needing items.
