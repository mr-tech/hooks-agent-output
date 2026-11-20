# Walk 2, row B-8 (qa-018)

| Step | UTC | Expected | Observed | Result |
|---|---|---|---|---|
| 0 | 13:45:52Z | session signed in (else OAuth) | status 200, signedIn true; no sign-in needed, no Discord consent screen, no OAuth redirect | PASS |
| 1 | 13:45:55Z | 200, signedIn true, length >= 4, ids[0]!==A | 200, true, isArray true, length 10, ids[0]!==A true | PASS |
| 2 | 13:46:05Z | editor UI visible after 8 s | /message/m/<A>/edit loaded; body shows only the menubar (File, Edit, View, Help, Send); 4 console errors, message.getOne returned 500 (x4) | FAIL (editor did not load the message) |
| 3 | 13:46:08Z | POST user.updatePreferences, 200 | no request with updatePreferences; only 4 GET message.getOne, all 500 | FAIL |
| 4 | 13:46:12Z | firstIsA true, length <= 11 | status 200, length 10, firstIsA false, indexOfA 2 | FAIL |
| 5 | 13:46:23Z | editor visible after 8 s | /message/m/<B>/edit; same shape, 4 console errors, message.getOne 500 (x4) | FAIL (editor did not load the message) |
| 6 | 13:46:24Z | new updatePreferences POST 200 | none; only 4 GET message.getOne, all 500 | FAIL |
| 7 | 13:46:26Z | firstIsB true, secondIsA true, length <= 11 | status 200, length 10, firstIsB false, secondIsA false, indexOfB 3 | FAIL |
| 8 | 13:46:31Z | exit steps | browser_close done; holder read "no holder"; cache directories' files emptied; 12 page/console files created this run deleted from the browser output dir; 0 files created this run under .playwright-mcp/ in cwd | done |

Deviations: the browser was held by another session at start (holder read: holder); retried about once a minute from 13:44Z, acquired 13:45:49Z. Steps 2 and 5 were judged by the page showing only the menubar, not a full editor.
