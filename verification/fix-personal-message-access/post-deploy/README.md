# Post-deploy reads B-2 and B-1 — fix-personal-message-access

Session `uat-hooks-fix-personal-message-access` (uat role), brief `steering/fix-personal-message-access-brief-uat.md`,
2026-11-20, production `https://hooks.gg`. The carrier is `handoff/fix-personal-message-access-post-deploy-2026-11-20.md`. Its
`Result` lines are the authority, and this file is their evidence. Website `origin/master` was `983681ca6cd7…` (`git ls-remote`
read 2026-11-20 ~01:39Z). No agent can read which commit Vercel is serving. B-2's 400 shows that the running code holds the fixed
`messageIdShape`.

## Who was who

Each browser's `GET /api/auth/session` id was compared with that account's credential `user_id` (`grep -c` against the
credential's value, never printed). Account 1 is `1219217003659788418`, which ran on the kept profile `mcp-chrome-313b550`. That
profile was signed out of hooks.gg at 01:37Z. It was signed back in through hooks.gg's own Discord sign-in: Discord was already
signed in, so the only step was the consent page's Authorize. No challenge appeared. Account 2 is `1219222937962283038`, which ran
on its own profile `chrome-test-account-2` through a playwright-core script driven by the `browser-walker` helper.

## Rows (all times UTC)

| Row | Step | Expected | Observed | Result | Evidence |
|---|---|---|---|---|---|
| B-2 | 01:37:58 account 1 `GET /api/trpc/message.getOne` on `"99999999999999999999"` | 400 `BAD_REQUEST` | 400 `BAD_REQUEST` (zod `invalid_string` regex, then custom) | PASS | `b2-getone-past-int8-signed-in.json` |
| B-1 | 01:41:02 account 2 creates a personal message under "My Account" and saves it | "Message saved!" | Message **6021** saved, marker `access-check-post-deploy 2026-11-20T01:40:17Z` | PASS | `b1-step3-account2-create-save.txt` |
| B-1 | 01:41:07 account 2 `getOne` 6021 (owner control) | 200 with the marker | 200, marker present | PASS | `b1-step4-account2-getOne-6021.txt` |
| B-1 | 01:41:13–21 account 1 opens `/message/m/6021/edit` and waits 8 s | the editor's load error, none of account 2's content | marker absent from the body text. The editor was a blank shell: menu bar, an empty box and the cookie banner. The page's own `getOne` 6021 answered 404 four times, and it was still retrying at the read. No load-error wording had rendered | PASS (content refused). The load-error display was not observed (F-1) | `b1-step5-account1-6021.json`; page console below |
| B-1 | 01:41:21 account 1 `getOne` 6021 | 404 `NOT_FOUND`, no marker | 404 `NOT_FOUND` "One of the provided messages does not exist.", no marker | PASS | `b1-step5-account1-6021.json` |
| B-1 | 01:41:35 account 2 reloads its own editor | marker shown | marker shown | PASS | `b1-step6-account2-reload-6021.txt` |
| B-1 | 01:41:50–59 account 2 deletes 6021, then `getOne` 6021 | "Message deleted.", folder empty, `getOne` not 200 | "Message deleted.", "No Messages", `getOne` 500 `INTERNAL_SERVER_ERROR` "no result" | PASS (500 on an absent number: F-2) | `b1-step7-account2-delete-6021.txt` |

Screenshots are untracked (his 09:01Z ruling) and kept outside the record at `/home/dev/.cache/ms-playwright-mcp/output/b1-pd-*.png`.
Account 1's page at step 5 is `b1-pd-step5-account1-6021.png`.

## Account 1's page console at step 5

`b1-step5-account1-6021-console.log` is kept untracked beside this file, because the record ignores `*.log`. It holds five lines, each
`[ERROR] Failed to load resource: the server responded with a status of 404 () @ https://hooks.gg/api/trpc/message.getOne?input=%7B%22json%22%3A%226021%22%7D`,
at 1418, 3006, 5594, 10224 and 13149 ms. Four are the page's own load, and the fifth is the walker's direct fetch at 01:41:21Z.

## Findings (stated limits; neither moves a row)

- **F-1 LOW**: the predicted "editor's load error" was not seen within 8 s. Account 1 saw a blank editor shell with no wording, while
  the page's query was still retrying on 404. Whether the error wording renders once the retries end was not read. The discriminating
  limb, account 2's content, was absent, so the row closes on it. This is product copy, not access.
- **F-2 LOW**: `getOne` on a deleted (absent) number answers 500 "no result". This is the out-of-scope "`getOne`'s absent-number
  error", which the chain sent to a handoff (common brief, 22:59Z amendment). Duplicates: that handoff.

## Data written and cleaned up

Account 2 created and deleted message 6021, its own. Account 1 saved, edited, deleted and clicked nothing on that page. No other
message was opened, and nothing was sent to any person or channel. Both browsers were closed and both profiles kept. The kept
profile has no `SingletonLock`, and its caches were emptied by the helper. Because the sign-in crossed an OAuth return, the page
snapshots and console logs this run wrote to the browser's output directory were deleted, after the step-5 console log was copied
here (untracked, see above). No files were written under `website/.playwright-mcp/` (`find -newermt` 01:36 returned nothing).

## Process facts

- The browser's `browser_evaluate` refused to write `filename` into the record repository: "outside allowed roots", which are the
  output directory and `website/`. The read was re-run with the file in the output directory and copied here with `cp`. That was a
  path rule of the browser server, met by writing inside its root. It was not a control guarding the read.
- Account 2's profile had a stale `SingletonLock` from 2026-11-19 (dead pid 70127). Chrome took it over.
