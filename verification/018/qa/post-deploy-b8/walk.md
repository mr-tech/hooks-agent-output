# B-8 post-deploy walk (qa-018)

| Step | UTC | Values | Outcome |
|---|---|---|---|
| pre | 13:38:51 | browser held by another session (holder read: holder); free at about 13:42 | waited about 3 min |
| 1 | 13:42:15 | status 200, signedIn false, isArray false, length null | FAIL (expected signedIn true, length >= 4); walk stopped |
| 2-7 | - | depend on step 1 | NOT RUN |
| 8 | after 13:42 | browser_close done; holder read and cache emptying as in the reply | done |
