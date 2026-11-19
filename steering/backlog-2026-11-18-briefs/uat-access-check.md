# Brief — uat-access-check

Duties negated: the UAT document, value assessment and release decision (uat.md). Every other duty and
every prohibition in your definition stands.

From `steering-roadmap-hooks`. You are the session `uat-access-check`, launched in `/usr/local/bin/hooks`.

## Steps

0. Read `~/.claude/skills/discord-test-browser/SKILL.md`, `~/.claude/skills/discord-test-browser/test-estate.json`
   and `~/.claude/agent-skills/stage-procedures/agent-browser.md`. The browser grant file exists.
1. **Test account 2** (credentials `~/.claude-credentials/discord_test_user_2.json`; never print them) signs
   in to `https://hooks.gg` in **its own new Chrome profile**, never test account 1's kept profile. Drive it
   with a Playwright script of your own via Bash, headed on `DISPLAY=:0`, with its user-data-dir under
   `/home/dev/.cache/ms-playwright-mcp/`, named for account 2. Record that path in `test-estate.json`, per the
   skill. If Discord shows a challenge, leave the window open, message `steering-roadmap-hooks`, and touch and
   capture nothing on that page.
2. As account 2, create one **personal** message (no server) with the content `access-check <UTC time>`, and
   save it. Record its number from the URL (`/message/m/<number>/edit`).
3. **Test account 1** (your `mcp__playwright__*` browser, kept profile) signs in to hooks.gg through Discord
   and opens `https://hooks.gg/message/m/<number>/edit`. Take a screenshot of what it shows. As account 1,
   do not save, edit or delete anything.
4. As account 2, delete that message. Close both browsers (`browser_close`; end your script).

Open no message other than that one. Make no save that carries a message number. Send nothing to any
person, server or channel.

## Evidence and delivery

Write the screenshots and a short `README.md` to
`/usr/local/bin/hooks/agent-output/verification/access-defects/browser-check/`. The README gives the steps,
the times, the message number, what account 1 saw, and the cleanup. Commit those paths by pathspec
(`git commit --only`, with `--intent-to-add` for new files). Then send `steering-roadmap-hooks` by
SendMessage: the commit, and one line on what account 1 saw. Send anything that stops you there too.
