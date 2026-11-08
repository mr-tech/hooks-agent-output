# UAT browser runs, chain 015 (uat-hooks-015, 2026-11-08)

Build: `git archive` exports of website `b96e364` (tip) and `7ce866b` (base) under the session scratchpad,
`.env.local` copied in, `node_modules` a read-only symlink to `website/node_modules`, served one at a time by
`next dev --webpack -H 127.0.0.1 -p 3000` (logs: `server-b96e364.txt`, `server-7ce866b.txt`; OAuth code and
state redacted). Browser: Playwright MCP Chrome on the kept profile. Go: steering-coordinator via
steering-hooks-015, 14:45Z. Released 15:16Z. Not signed in to the site: the sign-in failed at the database
(below). Nothing was saved and nothing was sent.

Each script is in this folder and was run through `browser_run_code_unsafe` by filename. Tip runs came first,
then base runs. The base run is the red side that makes each read evidence.

| Script | Row / flow | Tip `b96e364` | Base `7ce866b` |
|---|---|---|---|
| `b12-preview-data.js` | B-12, M5-h | `{"embeds":""}`, non-JSON, `5`, `null` and `{"embeds":[{"fields":""}]}` each show "Invalid message data.", with no editor and no page error. `{"embeds":[[]]}` shows the editor and no line | No case shows the line. `""`, non-JSON, `null` and `fields:""` throw page errors (`embeds.reduce is not a function`, `SyntaxError`, `Cannot read properties of null`, `embed.fields?.reduce …`). `5` renders the editor |
| `b13-json-dialog-close.js` | B-13, M5-a | Control (cancelled Load): Esc closes it. After a confirmed Load (39 text displays loaded): reopened, Esc closes it, and an outside click closes it | Control: Esc closes it. After a confirmed Load: Esc leaves it open, and an outside click leaves it open |
| `b04-over-40.js`, `b04-screens.js` | B-4, M6-l | At 39 text displays, Add Component → Section completes. Total **42** (a default Section is section + text display + accessory). Editor and Send page each show "Message has 42 components; the limit is 40." in red (rgb 248,113,113) under a red border (screenshots `b04-editor-b96e364.png`, `b04-send-b96e364.png`). Add Component and the counter are hidden. Send is disabled. `/preview` with 39+Section shows the line and border (`b04-preview-42-b96e364.png`). Control at 37+Section = 40: no line and no border in the editor, Send page or `/preview` (`b04-preview-40-b96e364.png`) | At 39+Section: no count line in the editor or on `/preview` |
| `preview-render-flows.js` + inline geometry read | B-5, M6-a; M6-c; M2-a render; M6-g | A two-line fenced block renders as a `pre` block, in content and in an embed field. An empty embed `{}` collapses to 4×0 px. `color: 0` draws a black bar (rgb 0,0,0). Emoji: 👍🏽 and 👨‍👩‍👧 each render as one image | No `pre`. `{}` draws a 32×24 px box. `color: 0` draws the default bar (rgb 30,31,34). Emoji: the same as tip, **not discriminated** |
| `editor-flows.js` | M2 limits; M6-b; M6-f | The JSON dialog's Load is enabled for author 256, title 256 and footer 2048, and disabled for 257, 257 and 2049. The image dialog shows "Invalid url." for `a.png.html` and `.avif`, and none for `.jpeg`, `.webp`, `A.PNG` and `a.png?x=1`. The picker opens at `#000000` for 0 and `#00FF00` for 0x00ff00 | footer 2048 not loadable; author and title the same as tip (**not discriminated**). The image dialog refuses `.jpeg`, `.webp` and `A.PNG` and accepts `a.png.html`. The picker shows `255` for 0x00ff00 and `#000000` for 0 (black **not discriminated**) |
| `b11-offline-webhook-url.js` | B-11 send-page leg, M4-b | Offline: "Invalid URL" under the field. Online control, same URL: "Invalid URL" (the existing refusal) | Offline and online: no error text |

Instrument defects, my own, lodged here (they are not product findings):
- `b13` run 1 used a Playwright `isVisible` predicate, which did not see the reopened dialog: `reopened` read false. I
  replaced it with a DOM read (role=dialog, "Message JSON", client rects), and run 2 is the one reported. At base the
  helper first timed out on the stuck dialog itself (the red), so I added an `already-open` return, which is used only
  when the dialog is already open. At the tip no step took that branch.
- `b04` run 1 read the JSON from the CodeMirror DOM, which renders only visible lines: the JSON was truncated at 1181
  chars and would not parse. Copy to Clipboard is disabled for a non-conforming draft (the M5 flow), so the `/preview`
  leg uses hand-built data of the same shape.
- `b04`'s computed-border predicate (`redBorders`) read 0 where the screenshots show the red border. It is not used
  as evidence; the screenshots are.
- `b04` at base: the stuck JSON dialog (M5-a's base defect) intercepts the Send link, so the base read is the inline
  editor and `/preview` read, recorded in the UAT document.
