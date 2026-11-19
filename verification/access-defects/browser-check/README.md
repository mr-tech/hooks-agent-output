# Browser check — can another account open a personal message on hooks.gg?

Session `uat-access-check`, brief `agent-output/steering/backlog-2026-11-18-briefs/uat-access-check.md`,
2026-11-19, production `https://hooks.gg`.

## Result

**Test account 1 opened test account 2's personal message 6020 in the full editor.** The page loaded at
`https://hooks.gg/message/m/6020/edit` with account 2's content (`access-check 2026-11-19T08:57:52Z`),
the File / Edit / View / Help / Send menus and the editable message. No error, no "not found", no
sign-in prompt and no read-only notice. See `02-account1-opens-6020.png`.

Who was who, read from each browser's `GET /api/auth/session` and compared against the credential
files' `user_id` without printing them:

| Browser | Profile | hooks.gg session user id | Matches |
|---|---|---|---|
| account 2 (own Playwright script) | `/home/dev/.cache/ms-playwright-mcp/chrome-test-account-2` | `1219222937962283038` | account 2 credential |
| account 1 (`mcp__playwright__*`) | `/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550` (kept) | `1219217003659788418` | account 1 credential, not account 2 |

## Steps and times (UTC)

| Time | Account | Step |
|---|---|---|
| ~08:56 | 2 | New profile launched headed on `DISPLAY=:0` (Playwright `launchPersistentContext`, loopback CDP port). hooks.gg → Log in → Discord login (credentials from file, not printed) → Authorize. No challenge appeared. |
| 08:57 | 2 | New message → "My Account" (personal, no server). The site created message **6020** at that click (`/message/m/6020/edit`). |
| 08:57:52 | 2 | Content set to `access-check 2026-11-19T08:57:52Z`. Before that two typing misses landed in the username field and then the embed author field; both were put back to their template values ("Hooks.gg Bot", "Author Name") before the save. |
| 08:58:35 | 2 | File → Save. Toast "Message saved!" (`01-account2-saved-6020.png`). |
| 08:58:47 | 1 | Navigated straight to `https://hooks.gg/message/m/6020/edit`. The kept profile was already signed in to hooks.gg, so it went through no new Discord sign-in. The page rendered account 2's message (screenshot taken ~08:59). Account 1 made no save, edit or delete and clicked nothing on the page. |
| ~08:59 | 1 | `browser_close`. |
| 08:59–09:00:05 | 2 | My Account folder → message actions → Delete. Toast "Deleting message…", then "No Messages" (`03-account2-deleted-6020.png`). |
| 09:00 | 2 | Launcher process ended, which closed its Chrome. |

## Scope kept

- No other message was opened. Account 2's `/message/m/new` page is where the site creates the message;
  `/message` and `/message/f/0` are account 2's own dashboard and folder.
- The only save carrying a message number was account 2's save of its own message 6020. Account 1 saved nothing.
- Nothing was sent to any person, server or channel.

## Cleanup

- Message 6020 deleted by account 2. Its folder shows "No Messages".
- Both browsers closed. The kept profile had no holder; its cache directories were emptied per
  `agent-browser.md`. Account 2's profile stays at the path above for reuse, still signed in.
- `~/.claude/skills/discord-test-browser/test-estate.json`: test account 2's `chrome_profile` now holds that path
  (updated by this session). Rewriting the file through `json.dump` also re-indented its inline arrays.
