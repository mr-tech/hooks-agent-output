# UAT walk, chain 016 — production minting reads before release (browser-walker)

Session name for `challenge-alert.js`: `uat-hooks-016`, stage `uat`. Read
`~/.claude/agent-skills/stage-procedures/agent-browser.md` before the first browser call and follow it.
The kept profile is the test account; the discord-test-browser skill permits the test account to sign
in live on hooks.gg and save its own messages there. **Send nothing** (no Send button press, no webhook)
in this walk. Production is website `0e3d903` today, before chain 016's release; these reads record the
**unfixed** value beside QA's predictions.

Evidence: `/usr/local/bin/hooks/agent-output/verification/016/uat/walk-production/` (`*.png`, `*.json`).
Return a table: step · action · expected · observed · PASS/FAIL · evidence file.

Reads (`browser_evaluate`):
- `ERR` = `[...document.querySelectorAll('.text-error')].map(e => e.textContent.trim())`
- `RING` = `[...document.querySelectorAll('[class*="!ring-red-500"]')].map(e=>e.className.toString())`

## P1 — B-3 unfixed value (read-only: no Save, no Send)

1. Open `https://hooks.gg`. Sign in with Discord if not signed in (on Discord's OAuth consent page click
   **Authorize**; a login page or challenge follows the procedure).
2. Open `https://hooks.gg/message/m/new`. If a "Select a Server" picker shows, choose **My Account**
   (the test account's own space; that choice is authorised for this walk). Switch the editor to
   **Components V2**. Add one **Text Display**, leave it empty. Read `ERR`, `RING`. Screenshot.
   Predicted (unfixed): `ERR` has **no** line about a Text Display (it may be [] entirely). Record exactly.
3. Leave the page without saving (if a "discard changes" dialog shows, discard).

## P2 — B-6(b) unfixed value (one save of the test account's own message)

1. `https://hooks.gg/message/m/new` → My Account → Components V2. Build a message of **41 Text
   Displays**, each with content `x`. Fastest route: the editor's JSON view/import (look for a "JSON"
   button or menu); paste this JSON (generate it with the code below, do not hand-type):
   `JSON.stringify({flags:32768, components: Array.from({length:41},()=>({type:10,content:'x'}))})`
   If the JSON route is unavailable, add Text Displays through the UI until there are 41.
   Read `ERR` in the editor. Predicted: one line "Message has 41 components; the limit is 40." Screenshot.
2. Save it to **My Account** with the name `uat-016-b6b-41-text-displays`. Record the message id from the URL.
3. Open `https://hooks.gg/message` (the message list). Find the card for that message; read its preview
   image `src` (the `<img>` in the card). Record the src URL. Wait up to 60 s and reload if the image is
   missing (generation is asynchronous).
4. Download that image with `browser_run_code` (fetch the src, write bytes is not possible there — so
   instead return the URL; the UAT stage downloads it). Also screenshot the card (`p2-card.png`).

## Exit

Close per the procedure's "On every exit path". Report the message id, the image src URL, and every
`ERR` read verbatim.
