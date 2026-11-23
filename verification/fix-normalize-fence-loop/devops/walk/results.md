# fix-normalize-fence-loop walk (https://hooks.gg/message/m/0/edit)
Note: /message/m/new showed only "Select a Server" (no editor); /message/m/0/edit gave the editor. The kept browser profile was signed in (user avatar shown); no sign-in was done and nothing was saved. The brief's "signed out" did not hold.
| Step | Expected | Observed (JSON dialog) | Result |
|---|---|---|---|
| 1 | content `> a\n```\nfoox\n```` kept; 0 "Could not completely normalize" | content `> a\n```\nfoox\n```` ; 0 matches; 0 console errors/warnings | PASS |
| 2 | `>>> a\nb` after focus then blur | content `>>> a\nb` | PASS |
Evidence: step1.png step1-json.png step2.png step2-json.png step1-observed.json step2-observed.json console-errors.txt (empty)
Caveat: the console/request listeners covered only the final run of each step (earlier runs' listeners were lost to tool limits); no request matching message.upsert/delete/updateRecentMessageData and no /api or trpc request was seen in those runs.
