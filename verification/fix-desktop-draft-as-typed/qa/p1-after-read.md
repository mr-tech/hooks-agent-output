# P-1 after-read on production — saved message 6008, desktop (2026-11-21T11:36-11:37Z)

Reader: `qa-fix-desktop-draft-as-typed`, briefed by `steering-hooks`. Carrier: `handoff/fix-desktop-draft-as-typed-post-deploy-2026-11-21.md`
(4bbe68a5). E-WEBSITE-PUSH: website `master` → `b68f94c` at 11:32:56Z-11:33:01Z (`git ls-remote origin master` read
`b68f94cda114…` again at 11:35Z by this session).

Set-up:
- Chrome on the kept profile (Playwright MCP), viewport 1440x900, signed in to hooks.gg as the test account.
- **Fresh tab**: my previous browser had been closed at 11:29Z, so this page was first loaded at ~11:36Z, after the push.
- Reloads were in-tab `page.goto` of `https://hooks.gg/message/m/6008/edit`.
- Leave-prompt instrument: the real `beforeunload` dialog, surfaced by the MCP as a modal state. The control for it is
  `devops/baseline/production-baseline-2026-11-21.md` row 3 and `qa/leave-prompt-and-field-results.md` runs B-C.
- **No Save, Send or production write.**

| # | UTC | Action | Baseline (unfixed, 11:28Z) | Observed now |
|---|---|---|---|---|
| 1 | ~11:36:35Z | open the content editor, Control+End, type " QA after one", reload with the editor open | no dialog; text lost | **`["beforeunload" dialog with message ""]`** (accepted). After the fresh load (navigation `navigate`, 6697 ms old, 11:36:48Z) the content tail is `py to help you!\n  QA after one`, and the `6008` draft holds `QA after one`. **Text survives.** |
| 2 | ~11:36:55Z | first embed author name (saved empty): End, type a, Space, b, reload with the field focused | no dialog; text lost | **beforeunload dialog** raised again (accepted). After the fresh load (6616 ms old, 11:37:04Z) the author name is `a b` (codes 97,32,98), and the draft `embeds[0].author` is `{"name":"a b"}`. **Text survives.** |

The baseline run used the same account, message, fields and instrument before the push and read "lost, no prompt" in both
limbs, so these two reads can only come from the deployed fix. This read also satisfies the earliest-decidable condition:
production serves a build containing the fix.

**Cleanup (local only).**
- 11:37:10-11:37:13Z, type-back: 13 Backspaces at the end of the content (tail back to `…elp you!\n_ _`) and 3 in the author
  name (back to `""`), each followed by a click away. **The `6008` draft remained.** At 11:37:19Z it held
  `embeds[0].author = {"name":""}`, where the saved author was empty. That is the likely difference from the saved message,
  and the unfixed build showed the same thing on the content alone (baseline cleanup note). It is not this fix's change.
- 11:37:19Z: removed only the `6008` entry from `localStorage.messageDrafts`. `6020` and `0:vqjq7pvgfv` were left in place.
- The next reload raised the prompt (accepted), because the in-memory state still counted as changed. After it the drafts
  were `6020`, `0:vqjq7pvgfv`.
- 11:37:33Z, final reload: **no dialog**. Drafts `6020`, `0:vqjq7pvgfv`; content tail `happy to help you!\n `, the saved
  text; author name `""`.
- The saved message on the server was never written.

**Disposition of the leftover draft** (pre-existing, not this fix): routed to
`handoff/typed-back-edit-leaves-saved-message-draft-2026-11-21.md` (ffab0db5), Owning-Stage planner.
