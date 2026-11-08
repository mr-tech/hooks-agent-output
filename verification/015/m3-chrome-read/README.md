# Real-Chrome read: Enter with focus on Cancel (website @ 6001f7f)

Tree: `git archive 6001f7f` (SHA 6001f7f39eb24977a528cdef825873c211c37fb4), exported to the scratchpad; no .env* in export (`ls -a | grep -c '^\.env'` = 0).
Chrome: Google Chrome 156.0.8078.47 (headless, /usr/bin/google-chrome), Playwright 1.65.0-alpha from ~/.npm/_npx/314abffa6aaf2cd1 (existing).
Isolation: everything inside `unshare -rn`; `ip -o link show | grep -vc ': lo:'` = 0, `ip route show default | grep -c .` = 0, loopback GET / = 200 (see run-*-output.txt). All env vars are probe values (127.0.0.1:1 / 'probe'), SKIP_ENV_VALIDATION=1.
Server: `next dev --webpack` (Turbopack panics on the node_modules symlink: next-turbopack-fail.log). Google Fonts fetch failed (no network), fallback font used. Next also wrote a panic log under /tmp (outside the write fence) in the failed Turbopack attempt.
Each cell runs in a fresh browser context (clean storage); an earlier WarningDialog run reused one context and the app persisted embeds across reload, so its cell c/d numbers were contaminated and were discarded (rerun is the one reported).
Real input: page.keyboard.press('Tab'/'Enter'); cell d is a pointer click.
Observation for WarningDialog = count of `button[aria-label="Embed actions"]`; ConfirmationDialog = body text "Welcome to Hooks.gg, the ultimate" present/absent after File > Clear; ImageUploader = count of `img[alt="embed main"][src=<loopback png>]` (Save sets image).

## WarningDialog ("Delete Embed?", EmbedEditor/index.tsx) - run-warningdialog.cjs
| cell | focus asserted | embeds before | embeds after | outcome |
|---|---|---|---|---|
| a Enter on Cancel | yes (Delete -> close modal -> Cancel) | 2 | 2 | survived |
| b Enter on Delete (control) | yes | 2 | 1 | removed |
| c Enter, body focused | yes (BODY) | 2 | 1 | removed |
| d click Cancel (control) | pointer | 2 | 2 | survived |

## ConfirmationDialog ("Clear Message", File > Clear) - run-others.cjs
| cell | focus asserted | content before | content after | outcome |
|---|---|---|---|---|
| a Enter on Cancel | yes | present | present | survived |
| b Enter on Clear (control) | yes | present | cleared | confirmed |
| c Enter, body focused | yes (BODY) | present | cleared | confirmed |
| d click Cancel | pointer | present | present | survived |

## ImageUploader (embed image URL; confirm = Save) - run-others.cjs
| cell | focus asserted | images set before | after | outcome |
|---|---|---|---|---|
| a Enter on Cancel | yes (input -> Cancel) | 0 | 0 | not saved |
| b Enter on Save (control) | yes | 0 | 1 | saved |
| c Enter, body focused | yes (BODY) | 0 | 1 | saved |
| d click Cancel | pointer | 0 | 0 | not saved |
(Enter on Clear not run; "other buttons" = Cancel only tested.)

Screenshots: `cell-{a-d}-{before,after}-press.png` = WarningDialog; `ConfirmationDialog-cell-*` / `ImageUploader-cell-*` for the others.
Other files: run-*-output.txt (full output), run-others-attempt1/2 (earlier selector-error attempts, kept), server.sh, chrome-version.txt, tree-sha.txt, next-dev-last-run.log.
