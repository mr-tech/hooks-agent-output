# PD-1 read — production hooks.gg, read only

Carrier: `handoff/fix-import-save-conflict-post-deploy-2026-11-21.md` (row PD-1). Session name `qa-fix-import-save-conflict`, stage `qa`.
Evidence (text/JSON only): `/usr/local/bin/hooks/agent-output/verification/fix-import-save-conflict/qa/pd1/evidence/`.
Screenshots: `/tmp/claude-1000/-usr-local-bin-hooks-website/fd2d388b-4b35-45cb-93ec-797066948871/scratchpad/pd1-shots/` (create it).

**Never press Save, Save as Classic, or Save as Components V2; never edit or delete anything on hooks.gg or in Discord.** Only read.

Reading the dialog (one evaluation per observe, written to the step's file): (a) text of `.text-warning` elements in the dialog;
(b) whether the dialog text contains `Components V2 messages cannot contain embeds or content.`; (c) whether it contains
`Message must have content, embeds, or components.`; (d) `disabled` state of the `Continue` button (page 1) or `Save` button (page 2);
(e) `innerText` of the block headed `Message Preview`. Also record `location.href` and the UTC time. Screenshot beside it.

0. Navigate to `https://hooks.gg/message`. If signed out, use the page's log-in and Discord's Authorize on the OAuth consent page (a login
   page or human check: handle per agent-browser.md, touch nothing). Expected: the message list, signed in. Record the signed-in username
   shown in the top-right menu if readable.

1. **Build check (served build carries the fix).** Open `Create or upload a new message`. With `browser_run_code_unsafe`, install a route
   **only** for `https://discord.com/api/webhooks/1400000000000000009/t**` (a fake URL; nothing real matches it): a path ending
   `/messages/1400000000000000001` → fulfill JSON
   `{"id":"1400000000000000001","channel_id":"1400000000000000002","author":{"id":"1","username":"u","avatar":null,"discriminator":"0","public_flags":0,"global_name":null},"content":"pd1 build check","embeds":[],"components":[],"flags":32768}`;
   any other path → fulfill `{"id":"1400000000000000009","type":1,"name":"walk","token":"t","guild_id":"1566742402180456559","channel_id":"1400000000000000002"}`.
   Open the Webhook section, type `https://discord.com/api/webhooks/1400000000000000009/t` into `Webhook URL` and `1400000000000000001` into
   `Message Link or ID`. Observe. Expected (new build): (a) contains `it has been saved as Classic and the flag cleared`; (b) false; (e) contains
   `pd1 build check`; Continue enabled. If instead (b) is true and (a) is empty, wait 120 s, reload the page, and repeat this step once; record
   both reads. Then unroute (`page.unrouteAll()`), close the dialog (its X), and do not continue.

2. **Message Link, Components V2 message.** Open the dialog fresh. Open `Message Link`, type
   `https://discord.com/channels/1566742402180456559/1566742403195469906/1573621673230602251` into `URL`. Wait for the preview (up to 15 s).
   Observe. Expected: (e) shows the container's text (record it whole); (b) false; (a) record; Continue enabled. Click Continue; type `pd1 v2`
   into the name field (placeholder `New Message`); observe (d) for Save. Expected: Save enabled. **Do not press Save.** Press Back, then close the
   dialog with its X.

3. **Message Link, classic message.** As step 2 with
   `https://discord.com/channels/1566742402180456559/1566742403195469906/1573621671380910101` and name `pd1 classic`. Expected: (e) shows the
   message content; (a) empty or absent; (b) false; Continue enabled; Save enabled after the name. **Do not press Save.** Back, close.

Exit: close the browser; empty the cache directories per agent-browser.md "On every exit path".
