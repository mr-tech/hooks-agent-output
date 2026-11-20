# Brief — uat (post-deploy looks), chain 017

Duties negated: the UAT document. Chain 017 is released and closed. You are the reader of three post-deploy rows. Your results go into
the carrier named below, not into a `uat/` document.

- **You:** session `uat-hooks-017-looks`, cwd `/usr/local/bin/hooks/website`.
- **His word:** `steering/017-rulings.md`, block "2026-11-20T02:41Z". He moved these three looks from himself to a test-account session.
- **Carrier:** `/usr/local/bin/hooks/agent-output/handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`, rows **B-6**, **B-8**
  and **B-9**. Read each row whole (Condition, Predicted, Failure mode and B-6's add-ons), plus the register rows they cite
  (`qa/closed/017-existing-items-backlog-qa.md`, "Blocking-condition register"). Walk them on live hooks.gg as the rows state, with "he"
  read as a test account. Fill each row's **Result** with the observed values, time and evidence path, and leave every other row alone.
  Production today is website `7923a1d` and generator `8512a1d` (devops records). Re-read with `git ls-remote` before walking.
- **Access:** the Discord test accounts, through the `discord-test-browser` skill and its shared kept profile. His standing ruling
  (`steering/015-rulings.md` line 429): test accounts may sign in on live hooks.gg and write to the production database through them,
  never customers' data. Delete every message you create at the end.
  - **The browser is shared with chain 081.** Before opening it, ask `implementer-statbot-081` by SendMessage whether it is free. Wait
    for the answer, and close it (browser_close) and tell them when you finish.
  - **hCaptcha or a signed-out wall:** run `node ~/.claude/tools/challenge-alert.js challenge --session uat-hooks-017-looks --stage uat
    --page <url>` and wait with the window open. Do nothing else meanwhile.
- **Screenshots stay untracked** (his ruling, `steering/017-rulings.md` block 2026-11-19T09:01Z). Evidence text goes under
  `verification/017/post-deploy/looks/`.
- **Deliver your report to** `steering-roadmap-hooks` by SendMessage. Steering closes the three item handoffs on passing rows.
