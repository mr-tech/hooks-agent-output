# Walk — the new-message dialog on imported drafts whose content conflicts

Session name: `qa-fix-import-save-conflict`. Stage: `qa`. Evidence folder (text and JSON only):
`/usr/local/bin/hooks/agent-output/verification/fix-import-save-conflict/qa/walk/evidence/`. Screenshots go to
`/tmp/claude-1000/-usr-local-bin-hooks-website/fd2d388b-4b35-45cb-93ec-797066948871/scratchpad/walk-shots/`, never the
evidence folder.

Build: website `f23568a` (`next dev`) on `http://127.0.0.1:3000`, already running. Fixtures:
`/usr/local/bin/hooks/agent-output/verification/fix-import-save-conflict/qa/walk/fixtures.json` (keys `raw-<row>`,
`trpc-getFromUrl-<row>`, `trpc-getFromCode-<row>`; rows `rowD`, `rowB`, `rowE`, `emptyEmbed`).

## Interception (install once, after the first navigation, with `browser_run_code_unsafe`; re-install if the page context is replaced)

Read `fixtures.json` with the Read tool and inline its JSON into the code. Keep a selector `globalThis.__walkRow` (Node side) that each step sets
(`browser_run_code_unsafe`: `async (page) => { globalThis.__walkRow = 'rowD'; }`). Routes:

1. `**/api/trpc/message.getFromUrl**` → `route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(F['trpc-getFromUrl-' + globalThis.__walkRow]) })`.
2. `**/api/trpc/message.getFromCode**` → the same with `trpc-getFromCode-`.
3. `https://discord.com/api/webhooks/**`: if the path ends in `/messages/<digits>` → fulfill `F['raw-' + globalThis.__walkRow]`;
   otherwise → fulfill `{"id":"1400000000000000009","type":1,"name":"walk","token":"t","guild_id":"1566742402180456559","channel_id":"1400000000000000002"}`.
4. `**/api/trpc/message.upsert**` → push `route.request().postData()` onto `globalThis.__walkUpserts` (an array), then
   `route.fulfill({ status: 400, contentType: 'application/json', body: '{"error":{"json":{"message":"walk: save captured, not sent","code":-32600,"data":{"code":"BAD_REQUEST","httpStatus":400}}}}' })`.
   Nothing reaches a server or Discord on Save.

Before each Save, clear `globalThis.__walkUpserts = []`; after it, write `JSON.stringify(globalThis.__walkUpserts)` to the step's evidence file
(return it from `browser_run_code_unsafe` and Write it).

## Reading the dialog (for every "observe" below, one evaluation, written to the step's file)

From `document.body` (the dialog is a portal): (a) the text of any element with class `text-warning` inside the dialog;
(b) whether the dialog's text contains `Components V2 messages cannot contain embeds or content.`; (c) whether it contains
`Message must have content, embeds, or components.`; (d) the `disabled`/`aria-disabled` state of the button labelled `Save` (page 2) or
`Continue` (page 1); (e) the `innerText` of the block headed `Message Preview`. Screenshot the dialog beside it.

## Steps

0. Navigate to `http://127.0.0.1:3000/message`. If signed out, use the page's log-in and Discord's Authorize on the OAuth consent page
   (a Discord login page or a human check is handled per agent-browser.md, never typed into). Expected: the message list page, signed in.
   Open the dialog titled `Create or upload a new message` (the page's new/create-message control). Install the routes.

Each row step below starts from a freshly opened dialog (close it and open it again; reload the page if it does not reset).

1. **Webhook tab, row D.** Set `__walkRow='rowD'`. Open the Webhook section; type
   `https://discord.com/api/webhooks/1400000000000000009/t` into `Webhook URL`, then `1400000000000000001` into `Message Link or ID`.
   Observe. Expected: (a) contains `it has been saved as Classic and the flag cleared`; (b) false; (e) contains `walk row D text`; Continue
   enabled. Then Continue, type `walk d` into the name field (placeholder `New Message`), Save, write the captured upsert.
   Expected: one upsert whose `json.message.data` has `content` `walk row D text` and `flags` without bit 32768 (record the number).
2. **Webhook tab, row B.** As 1 with `rowB`. Expected: (a) contains `it has been set to match`; (e) contains `walk container text`;
   upsert `data.flags` has bit 32768 and `data.components[0].type` is 17.
3. **Webhook tab, row E, Classic.** As 1 with `rowE`. Expected before Continue: (a) empty or absent; (b) false; (e) record it whole.
   Continue, name `walk e1`, Save. Expected: no upsert captured; dialog title `Are you sure?` with buttons starting `Save as Classic` and
   `Save as Components V2` (record their full text) and `Cancel`. Observe (e) is not applicable here. Click `Save as Classic`.
   Expected upsert: `data.content` `walk row E text`, no component of type 17, flags without 32768.
4. **Webhook tab, row E, V2.** As 3, clicking `Save as Components V2`. Expected upsert: `data.components[0].type` 17, `data.content`
   empty or absent, flags with 32768.
5. **Webhook tab, draft changed in place.** Fresh dialog, `rowD`, load as in 1 and observe. Then set `__walkRow='rowE'` and change
   `Message Link or ID` to `1400000000000000003`. Observe again. Expected second observation: (a) empty or absent (no `saved as Classic`
   text); (e) record whole. Continue, name `walk de`, Save. Expected: no upsert; the `Are you sure?` choice opens. Click `Cancel`; record
   the dialog afterwards.
6. **Webhook tab, empty embed.** As 1 with `emptyEmbed`. Expected: (c) true; (b) false; after Continue and name `walk x`: Save disabled;
   attempt Save anyway; no upsert.
7. **Message Link tab, row D.** Set `rowD`. Open the Message Link section; type
   `https://discord.com/channels/1566742402180456559/1400000000000000002/1400000000000000001` into `URL`. Observe. Expected as in 1, and the
   upsert as in 1.
8. **Message Link tab, row E, Classic.** As 7 with `rowE`, then as 3 (Save, choice, Save as Classic). Expected as in 3.
9. **Message Context Command tab, row D.** Set `rowD`. Open the code section; type `walkcode` into `Code`. Observe and save as in 1.
   Expected as in 1.
10. **JSON tab, row D draft.** Open the JSON section and replace the editor's text with
   `{"content":"walk json D","flags":32768,"embeds":[],"components":[]}`. Observe. Expected: the JSON tab's own notice
   (`saved as Classic and the flag cleared`) appears exactly once in the dialog's text (count occurrences); (e) contains `walk json D`;
   Save writes `content` `walk json D` with flags without 32768.

## Exit

Close the browser and empty the cache directories per agent-browser.md "On every exit path". Delete any page files the run wrote under
`.playwright-mcp/` in your cwd that did not exist when you began.
