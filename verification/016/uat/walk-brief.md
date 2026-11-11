# UAT walk, chain 016 — steps and expected values (browser-walker)

Session name for `challenge-alert.js`: `uat-hooks-016`, stage `uat`. Read
`~/.claude/agent-skills/stage-procedures/agent-browser.md` before the first browser call and follow its
challenge, sign-in and exit-path rules (you click nothing in a Discord challenge or login page).

Builds (already running; do not start or stop them):
- **tip** `http://127.0.0.1:3000` — website `395510e` (`next dev`), local Postgres, message ids start at 900000000000001.
- **base** `http://127.0.0.1:3001` — website `0e3d903`, used only for `/preview` controls (part C). Do not sign in or save there.

Evidence: write everything under `/usr/local/bin/hooks/agent-output/verification/016/uat/walk/`
(screenshots `*.png`, each step's raw reads as `*.json`). Return a table: step · action · expected ·
observed · PASS/FAIL, one line of evidence (file name) each.

**Secret rule.** The webhook URL is in `/tmp/claude-1000/-usr-local-bin-hooks-website/fec9cd02-45d0-4ca2-8b13-cb1ac64ad51a/scratchpad/webhook-url.txt`.
Read it only at the moment you type it. Never write it, or any part after `/webhooks/`, into a file,
a screenshot (take no screenshot while the URL is visible in a field), or your report.

Standard reads (use `browser_evaluate`; save each result):
- `ERR` = `[...document.querySelectorAll('.text-error')].map(e => e.textContent.trim())`
- `RING` = count of elements whose `className` (string or `baseVal`) contains `ring-red-500` and does NOT start with `erroring:` for that token — simpler: `[...document.querySelectorAll('[class*="!ring-red-500"]')].map(e=>e.className.toString())`
- `ERRSTATE` = `[...document.querySelectorAll('[data-erroring-state="true"]')].length`
- `TOOLONG` = `document.body.innerText.includes('Too long.')`
- Send button state on the send page: the button whose text is "Send" (or "Edit"): its `disabled` property, `aria-disabled`, `data-disabled`.

## Part A — B-1 (AC1-6): fresh Text Display refused, filled one sends

A1. Open `http://127.0.0.1:3000`. Sign in with Discord (the kept profile is the test account; on
    Discord's OAuth consent page click **Authorize** — that page is not a login page). Expected: signed in, the test account's name/avatar shows.
A2. Start a new message for **My Account** (try `http://127.0.0.1:3000/message/m/new`; if a server
    picker shows, choose the account/"My Account" option). Switch the editor to **Components V2**
    mode. Add one **Text Display** and leave it empty. Read `ERR`, `RING`. Screenshot.
    Expected: `ERR` contains exactly one line naming "Text Display" (an empty-text reason). Record its exact text.
A3. Save the message (to My Account). Record the URL and the message id. Expected id 900000000000001.
A4. Open the send page `http://127.0.0.1:3000/message/m/<id>/send`. Read `ERR` and the Send button
    state. Screenshot. Expected: the same Text Display line present in the preview; Send disabled.
A5. Back in the editor (`/message/m/<id>/edit`), click into the Text Display and type exactly one
    space character, nothing else. Read `ERR`. Save. Record whether the line is present. (N-2: the UAT
    stage reads the saved row itself.)
A6. In the editor, clear the Text Display and type `hello`. Read `ERR`. Expected: no Text Display line
    (`ERR` empty). Save.
A7. Send page for the same id. Read `ERR` and Send state. Expected: `ERR` empty; Send enabled.
    Screenshot (before any webhook URL is typed).
A8. In the Webhook menu, enter the webhook URL from the file (Secret rule). Click Send. Record the
    toast or message text shown and the time (UTC). Expected: a success indication, no "Failed to send" toast.

## Part B — B-2 (AC2-2): description inputs stop at 1024

B1. New message (My Account), Components V2 mode. Add a **Section** with a **Thumbnail** accessory
    (or whatever path the add menu gives to a Thumbnail), and a **Media Gallery** with one item.
B2. For the Thumbnail description input: focus it, then paste a 1100-character string of `a`
    (preferred: grant clipboard permissions via `browser_run_code` —
    `await page.context().grantPermissions(['clipboard-read','clipboard-write'])`, write the string with
    `navigator.clipboard.writeText`, then press Control+V in the focused field; record which method you used.
    If the clipboard route fails, use `page.keyboard.insertText` and say so). Read `input.value.length`.
    Expected 1024. Then press End and type `b` once; read the length again. Expected 1024, last char still `a`.
B3. The same for the gallery item's description input. Expected 1024 and 1024.

## Part C — B-5 (AC1b-4 local): `/preview` shows no chrome; base control shows it

URLs are in `/usr/local/bin/hooks/agent-output/verification/016/uat/preview-urls.json` (keys; each has
`tip` and `base`). For every key, open the `tip` URL, wait until the message renders (`Captain Hook`
or the content is visible, or 5 s), then read `ERR`, `RING`, `ERRSTATE`, `TOOLONG`. Then the same for
the `base` URL. Screenshot each of the tip pages (`c-<key>-tip.png`) and the base pages for
`41-text-displays` and `empty-username`.

Expected at tip, every key: `ERR` = [], `RING` = [], `ERRSTATE` = 0, `TOOLONG` = false.
Expected at base: `41-text-displays` → `ERR` holds "Message has 41 components; the limit is 40." and
`RING` non-empty; `empty-username` → `ERR` holds a username line; `fresh-text-display` → [] (no line at
base for this one); `control-valid-v2` → [] at both.

## Exit

Follow the procedure's "On every exit path" (close the browser, holder read, cache empty). Report.
