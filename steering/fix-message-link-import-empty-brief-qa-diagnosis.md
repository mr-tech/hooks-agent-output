Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/fix-message-link-import-empty-brief-common.md` — read it whole first.

You are `qa-fix-message-link-import-empty`. Your task is one production read for the fixer's diagnosis. This is not a Phase 2: there is
no code change. The diagnosis is in `implementation/fix-message-link-import-empty-implementation.md` in `/usr/local/bin/hooks/agent-output`
(record `1c5541fd`), with its captures under `verification/fix-message-link-import-empty/diagnosis/`. Its conclusion is that the Hooks.gg
Discord app lacks the Message Content intent; re-derive it from those files rather than taking it from this brief.

- **The read** (hooks.gg, signed in as the Discord test account, the `discord-test-browser` skill; read only):
  - Load two messages in the Claude test server. One mentions the app:
    `https://discord.com/channels/1566742402180456559/1566742403195469906/1573645928798355507`. One is plain:
    `https://discord.com/channels/1566742402180456559/1566742403195469906/1573645137471471668`.
  - Load them through the new-message dialog's Message Link tab, or by a direct `GET` of `message.getFromUrl` as the signed-in test account.
  - **Prediction:** the mention message loads its content and one rich embed; the plain one comes back blank.
  - **Falsifiers:** the mention message is also blank (production reads with a different app), or the plain message loads its content
    (production's app already has the intent, so the cause lies elsewhere).
- **Not allowed:** Save, and any other production write. The two fixtures are already posted; post nothing on hooks.gg.
- **Record:** write the result, with its capture, in your own document,
  `qa/fix-message-link-import-empty-production-read.md`, per your definition, and commit it by pathspec.
- **Report delivery:** send the result, holds or falsified, to `steering-hooks` by SendMessage.
- **Owner-needing items:** SendMessage to `steering-hooks`.
