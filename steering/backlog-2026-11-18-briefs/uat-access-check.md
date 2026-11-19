# Brief — uat-access-check (one live browser check, outside chain 017)

Duties negated: the UAT document, value assessment and release decision (uat.md) — this session writes
no stage document and renders no release verdict. It runs one owner-ordered browser check and records
its evidence. Every other duty and every prohibition in your definition stands.

From `steering-roadmap-hooks`, 2026-11-19T08:4xZ. You are the session `uat-access-check`, launched in
`/usr/local/bin/hooks`. The owner ordered this check in his session (selection "Test account 2's
message", `agent-output/steering/017-rulings.md` block 2026-11-19T08:45Z "browser check: his order and design"). Read
`~/.claude/skills/discord-test-browser/SKILL.md`, `~/.claude/skills/discord-test-browser/test-estate.json`
and `~/.claude/agent-skills/stage-procedures/agent-browser.md` first. The browser grant file exists.

## The question (a candidate, not a fact: your check decides it)

On production `https://hooks.gg` (website `master` `1ad625e`), can one signed-in user open another user's
**personal** (not server) message by its number? A run against a local database says yes
(`agent-output/verification/017/steering-refute-access/`); code says the personal branch of
`message.getOne` checks only that the caller is signed in. Confirm or refute it live.

## Steps

1. **Test account 2** (credentials `~/.claude-credentials/discord_test_user_2.json`; never print them) signs
   in to hooks.gg in **its own new Chrome profile**, never test account 1's kept profile: drive it with a
   Playwright script of your own via Bash, headed on `DISPLAY=:0`, user-data-dir under
   `/home/dev/.cache/ms-playwright-mcp/` named for account 2. Record that path in `test-estate.json`
   (it is null there), per the skill. A Discord challenge is the owner's to answer: wait with the window
   open and message `steering-roadmap-hooks`, touching and capturing nothing on that page.
2. Account 2 creates one throwaway **personal** message (no server) with content `access-check
   <UTC time>` and saves it. Record its number from the URL (`/message/m/<number>/edit`).
3. **Test account 1** (your `mcp__playwright__*` browser, kept profile) signs in to hooks.gg through Discord
   and opens `https://hooks.gg/message/m/<number>/edit`. Screenshot what it shows. Do **not** save, edit or
   delete anything as account 1. A failure such as "not found" or "unauthorized" is a valid result.
4. Account 2 deletes its throwaway message. Close both browsers (`browser_close`; end your script).

Never open, list or read any message other than that one throwaway message. Never try a save that carries a
message number (the number-claim bug): on production it would capture a real user's next message.
Nothing is sent to any person, server or channel.

## Evidence and delivery

Write the screenshots and a short `README.md` (steps, times, the message number, what account 1 saw, and the
cleanup) to `/usr/local/bin/hooks/agent-output/verification/access-defects/browser-check/`. Commit those paths
by pathspec (`git commit --only`, `--intent-to-add` for new files). Then send `steering-roadmap-hooks` by
SendMessage: CONFIRMED / REFUTED / NOT DETERMINED, the commit, and one line on what account 1 saw.
Blocks, challenges and anything owner-needing go there too.
