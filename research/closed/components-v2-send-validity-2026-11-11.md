---
UUID: d696896c
Parent: components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26
Status: Answered
Status-Detail: >-
  Measured on the agents' test server: 76 Components V2 shapes, 52 refused by Discord. The website's
  send check blocks 6 of the 52 and lets 46 through; it has no test for emptiness inside a
  component. Whether and how the send check should change is the owner's question (OQ-1), carried
  by handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md.
---

# Which Components V2 configurations does Discord refuse on send, and which does the website's send check let through?

## Changelog

| Date | Agent | Change | Status |
|---|---|---|---|
| 2026-11-11T09:05 | researcher-hooks-text-limit | Created with the question, four probe runs (138 send requests over 76 shapes), the website's send check and save schema executed over the same shapes, findings F-1 to F-14 | Active |
| 2026-11-11T09:07 | researcher-hooks-text-limit | Document closed. The fix question (OQ-1) is routed to the owner through steering-queue-hooks; its carrier is the Open handoff named in Open Questions, read at 09:07Z | Status: Answered |

## Question

Which Components V2 configurations does Discord refuse on send, emptiness first, and which of the
refused ones does the website's send check let through?

Asked by `steering-queue-hooks` on the owner's selection of 2026-11-11
(`steering/queue-hooks-rulings.md`, block "selection 12": "Agent: measure it now (Recommended)").
The brief is `steering/queue-hooks-briefs/researcher-v2-validity-brief.md`. The owner's words of
2026-08-26, from the handoff this builds on:

> "checking which component v2 configurations are valid (namely, emptiness), for instance, a V2
> message with only an empty Text Display errors on send, and the UI doesn't catch this like empty
> content / embeds."

## Answer

**Discord refuses a V2 message when any one component in it is empty. The website's send check
looks inside no component, so it lets every one of those through.**

- Of 76 shapes sent, Discord refused 52 and accepted 24.
- The website's send check (`validateMessage`), run over the same 76 shapes, blocks 6 of the 52
  refused ones and passes the other 46. It blocks none of the 24 accepted ones.
- The 6 it blocks: no components at all, non-empty `content` beside V2 components, and four shapes
  over the 40-component total.
- The owner's instance is confirmed. A message whose only component is an empty Text Display
  returns HTTP 400, code 50035, `BASE_TYPE_BAD_LENGTH`, "Must be between 1 and 4000 in length."
- A freshly added Text Display, Section, Media Gallery, File, Container or Action Row is in a state
  Discord refuses until the user fills it in. Only a freshly added Separator is sendable.
- A File component cannot be sent from the website in any state (F-7).

The three kinds the brief asks to keep apart, per field. "Refused" and "accepted" are Discord's
answer; the case ids point into the Evidence table.

| Field | Empty | Whitespace-only | Key absent |
|---|---|---|---|
| Text Display `content` | refused (B1) | refused for 9 whitespace characters tried, accepted for U+200B and U+FEFF (F-2) | refused (B6) |
| Top-level `content` beside V2 components | accepted (A2) | accepted (A4) | accepted (A1) |
| Link button `label` | refused (H5, C8) | refused (H6, C9) | refused (H4, C7), accepted when an emoji is present (X1) |
| Link button `url` | refused (H3, C6) | not sent | not sent |
| Thumbnail or gallery item `description` | refused (C10, D4) | accepted (C11, D5) | accepted (C1, D1) |
| Thumbnail, gallery item or File `url` | refused (C3, D3, E1) | not sent | not sent |
| Section `components` | refused as `[]` (C2) | does not apply | not sent |
| Section `accessory` | does not apply | does not apply | refused (C4) |
| Media Gallery `items` | refused as `[]` (D2) | does not apply | refused (D6) |
| Container `components` | refused as `[]` (G2) | does not apply | refused (G3) |
| Action Row `components` | refused as `[]` (H2) | does not apply | not sent |
| Message `components` | refused as `[]` (A3), and the send check blocks it | does not apply | not sent |

## Context

- The open ground is the "What is established and what is not" list of
  `../../handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md`. Its five
  unestablished items are answered or bounded in "The handoff's list" below.
- Plan 012's register row D14 and QA row R20
  (`../../planning/closed/012-message-valid-field.md`,
  `../../qa/closed/012-message-valid-field-qa.md`) left one general fact undetermined: whether
  Discord accepts a V2 message whose `content` is whitespace-only. F-8 measures it.
- The earlier research document `./components-v2-description-text-limit-2026-11-11.md` left "does
  Discord refuse an empty-string description" unmeasured (its N-4). F-6 measures it.
- Records read: `architecture/system-architecture.md` and `architecture/website.md`, both whole.
  The product is a Discord message builder that sends through webhooks, so a send check that agrees
  with Discord is the product working as described.
- Website tree: every read and every execution is of `website` at `6d78b19`, which is the remote's
  `master` (`git ls-remote origin master`, this session). The working tree's branch moved twice
  during the run under another session (`460000b`, then `08b0d7f`). The files read and executed
  were checked identical to `6d78b19` after the last run
  (`git -C website diff --quiet 6d78b19 -- src/constants src/env.mjs src/utils/limits.tsx
  src/utils/isValidUrl.ts src/server/api/utils/shapes.ts src/utils/sendWebhook.ts`, exit 0, and the
  same for `src/components/DiscordMessageEditor`).

## Methodology

**Which shapes.** The component types in scope are the seven the editor's add menus offer
(`DiscordMessageEditor/index.tsx` and `ContainerEditor.tsx`: Action Row, Text Display, Section,
Media Gallery, File, Separator, Container), plus the Thumbnail and link button they contain. For
each field of each type the matrix holds the empty, whitespace-only and key-absent form where the
form exists, at top level and nested. A small non-emptiness sample was added where the same fields
were already in play: non-URL strings, File, and the 40-component total.

**How the editor reaches a shape** (the "Editor" column; a code read, not a browser run):

- `default`: a component fresh from the add menu is in this state. The factories are in
  `src/components/DiscordMessageEditor/types/components.ts`: `createTextDisplay` gives
  `content: ''`; `createSection` gives one empty Text Display and a Thumbnail with `url: ''`;
  `createMediaGallery` gives one item with `url: ''`; `createFile` gives `url: ''`;
  `createContainer` gives one empty Text Display; `createLinkButton` gives `label: 'Link'`,
  `url: ''`.
- `control`: a delete or clear control leads there. `deleteButton` (`ActionRowEditor.tsx`),
  `deleteChild` (`ContainerEditor.tsx`) and `deleteItem` (`MediaGalleryEditor.tsx`) leave an empty
  array behind. `LinkButtonEditor.tsx` writes `undefined` for a cleared label.
  `deleteTextComponent` (`SectionEditor.tsx`) is the exception: removing the last Text Display
  removes the Section.
- `typed`: the value is typed into an input whose handler stores it as given. For Text Display
  whitespace this is not traced through the text editor (N-2).
- `JSON`: no editor control produces it, but the save schema admits it, so it can arrive through
  JSON. A Section's link-button accessory is in this class: no control switches an accessory's type.
- `no`: no control produces it and the save schema rejects it.
- `valid`: an ordinary filled-in component, sent as a control.

**Sends.** A Python probe (standard library) sent each shape as
`{"flags": 32768, "components": …}` with
`POST /webhooks/{id}/{token}?wait=true&with_components=true` to `#general`
(`1566742403195469906`) in the agents' test server (guild `1566742402180456559`), after asserting
the channel's `guild_id`. The website sends through user-supplied webhooks
(`src/utils/sendWebhook.ts`), so the senders were the two webhook kinds: the existing user-created
"Spidey Bot" webhook (`application_id` null) and a bot-created one (`application_id`
`1558266761101447248`) made and deleted in the run.

| Run | UTC, 2026-11-11 | What | Requests |
|---|---|---|---|
| 1 | 08:53:59 to 08:57:45 | 52 shapes (A to I) on both webhook kinds | 104 |
| 2 | 08:58:43 to 08:59:15 | 15 follow-up shapes (W, X), user-created webhook | 15 |
| 3 | 08:59:15 to 08:59:35 | 10 of run 1's shapes as `PATCH` on an existing message, user-created webhook | 10 |
| 4 | 09:02:40 to 09:03:01 | 9 total-count shapes (N), user-created webhook | 9 |

138 send requests: 39 returned 200 and 99 returned 400. No request was rate-limited (the probe
counted retries: 0 in every run). Counts here and below were computed by script over the probe's
saved JSON.

**The website's side, executed.** The real `validateMessage` (`src/utils/limits.tsx`) and the real
`discordMessageShape` (`src/server/api/utils/shapes.ts`) were run over the exact request bodies the
probe sent, 76 of them, with `username: 'Probe'` added because the send check requires a username
and the probe bodies carry none. The send page's gate is `validateMessage` alone:
`src/app/message/m/[id]/send/page.tsx` computes `isMessageValid = message &&
!validateMessage(message.data)` and sends `stripKeys(…).data`, and `stripKeys`
(`src/utils/index.ts`) removes `_key`s and sets the V2 bit, nothing else. The save schema is not
on the send path; its column says whether the shape can be saved or loaded as JSON.

## Findings

All are Verified by execution unless a finding says "code read".

**F-1. The send check has no notion of emptiness inside a component.** `validateContentRequirements`
(`src/utils/limits.tsx`) asks only whether `components.length > 0`. The rest of `validateMessage`
checks the username, the embed character total, the 4000 text total, the 40-component total and
the classic content length. Executed: it returned `''` for 46 of the 52 refused shapes. The 6 it
blocked are A3 ("Message must have content, embeds, or components."), A5 ("Components V2 messages
cannot contain embeds or content.") and N2, N4, N6, N9 ("Message has 41 components; the limit is
40."). It blocked none of the 24 shapes Discord accepted.

**F-2. Text Display: refused when the content is empty after Discord strips whitespace, and one
such Text Display anywhere refuses the whole message.**

- Refused alone: `''` (B1), space (B2), newline (B3), U+00A0 (B4), tab (W1), CR LF (W2), U+3000
  (W3), U+2003 (W4), U+0085 (W6), U+2028 (W7). Key absent is refused as "This field is required"
  (B6).
- Refused beside valid content: next to a non-empty Text Display (B7, B8), inside a Section (B9,
  B10), inside a Container (B11, B12), inside a Section inside a Container (X7).
- Accepted: U+200B (B5) and U+FEFF (W5). Discord does not treat either as whitespace.
- Discord stores the stripped text: `' hello '` came back as `'hello'` (W8).
- JavaScript's `String.prototype.trim` (Node 24) agrees with Discord on 9 of these 11 characters
  and differs on two. U+0085: Discord refuses it, `trim()` leaves length 1. U+FEFF: Discord accepts
  it, `trim()` leaves length 0.

**F-3. Every empty collection is refused.** Section `components: []` ("Must be between 1 and 3 in
length.", C2), Media Gallery `items: []` ("between 1 and 10", D2), Container `components: []`
("between 1 and 40", G2), Action Row `components: []` ("between 1 and 5", H2). The same holds
inside a Container (X2, X3). The editor's delete controls produce three of the four (D2, G2, H2);
the empty Section arrives only through JSON.

**F-4. Every required URL is refused when empty, and when not a URL.** Thumbnail, gallery item and
File `url: ''` return "This field is required" (C3, D3, E1); link button `url: ''` returns "A url
is required" (H3, C6). The string `abc` is refused in all three places tried (I1 to I3). A link
button's scheme must be http, https or discord: `ftp://example.com` is refused (X5), and the save
schema admits it. A Thumbnail with an `ftp://` media URL is accepted (X6).

**F-5. A link button needs a label or an emoji.** Label absent, `''` or one space is refused as
"This field is required" (H4 to H6, C7 to C9). Label absent with an emoji is accepted (X1). The
editor's label input writes `undefined` when cleared (H4), and `LinkButtonEditor.tsx` has no emoji
control (the word appears zero times in it, `grep -c`).

**F-6. An empty description is refused; a whitespace-only one is not.** `description: ''` returns
"Must be between 1 and 1024 in length." for the Thumbnail (C10) and the gallery item (D4). One
space is accepted and stored as one space (C11, D5). This closes N-4 of
`./components-v2-description-text-limit-2026-11-11.md`. The editors write `undefined` for an
empty description, so only JSON produces the refused form.

**F-7. A File component cannot be sent from the website in any state.** Discord refused all three
forms: `url: ''` ("This field is required", E1), an https URL
(`UNFURLED_MEDIA_ITEM_MUST_USE_ATTACHMENT_PROTOCOL`, E2), and `attachment://missing.png` with no
upload (`UNFURLED_MEDIA_ITEM_REFERENCED_ATTACHMENT_NOT_FOUND`, E3). Code read: `sendWebhook`
uploads a file only for an embed image given as a `data:` URL, and a V2 message carries no embeds,
so no V2 send from the website carries an attachment. The send check passes all three. One case is
outside this: editing a message that already has attachments (N-5).

**F-8. Shapes that look empty and are accepted.**

- Whitespace-only top-level `content` (`' \n '`) beside V2 components is accepted, and the stored
  message has `content: ''` (A4). This is the general fact plan 012's D14 and R20 left
  undetermined. Measured on message creation, both webhook kinds; not on edit.
- `content: ''` and `embeds: []` beside V2 components, the shape `switchToV2` leaves, is accepted
  (A2).
- A message of only a Separator (F1), only an Action Row with a valid button (H7), or a Container
  holding only a Separator (X4) is accepted. A V2 message needs no text.

**F-9. On the 40-component total the website and Discord agree.** Nine shapes at 40 and 41 by the
website's own count (`countTotalComponents`), across top-level, Container children, Section
accessories, Action Row buttons and gallery items: every 40 was accepted and passed, every 41 was
refused and blocked (N1 to N9). Gallery items are counted by neither side (N7).

**F-10. Editing behaves like sending.** Ten shapes sent as `PATCH` on an existing message returned
the same status and the same error body as their `POST` (run 3: A1, B1, B2, B11, C3, D2, D3, G2,
H2, H3).

**F-11. The two webhook kinds behave identically.** All 52 shapes of run 1 returned the same status
and byte-identical error body on the user-created and the bot-created webhook.

**F-12. A component fresh from the add menu is refused, except a Separator.** By the factories
(code read) and the measured shapes: Text Display (B1, B7), Container (B11), Media Gallery (D3),
File (E1), Action Row (H3). A fresh Section holds two refused parts at once, an empty Text Display
(B9) and an empty Thumbnail URL (C3); the two were sent separately, not as the one default
component.

**F-13. Most let-through shapes can also be saved.** `discordMessageShape` admits 34 of the 46
let-through refused shapes and rejects 12: every `url: ''` (C3, C6, D3, E1, H3), every non-URL
string (I1 to I3), and four key-absent forms (B6, C4, D6, G3). A link button with no label key is
among the 34 it admits. It rejects no shape Discord accepted.

**F-14. Code read: a refused send tells the user nothing specific.** `sendWebhook` throws on any
non-200 status, and its toast reads "Failed to send message. Please try again or contact
support." Discord's error body goes to `console.error` only.

### High-confidence inference

**I-1. A stored message in one of the 34 saveable let-through shapes carries `valid: true`.**
`architecture/website.md` A-4 states the stored `valid` column is computed by `validateMessage`,
and `src/server/api/utils/messageValidity.ts` is among its callers (file listing; the file itself
was not read). Fastest disconfirming test: save an empty-Text-Display message on a non-production
database and read the row's `valid`.

### Hypothesis

None.

## The handoff's list

The five items the handoff lists as not established, in its order:

1. *Whether the gate has any notion of V2 emptiness.* It has none (F-1).
2. *Whether other V2 component types behave the same way when empty.* They do: F-2 to F-7.
3. *What Discord returns for the owner's instance.* HTTP 400, code 50035, body E3 below. The same
   top-level code as the other rejections on this work; the inner code is `BASE_TYPE_BAD_LENGTH`.
4. *Whether any stored record is in this state.* Not counted. The brief rules it out: no agent
   reads that database.
5. *Whether the existing empty-content and empty-embed checks share a code path the V2 case could
   reuse.* The fact only: the send check's one emptiness test is in `validateContentRequirements`,
   which reads `content.trim()`, `embeds.length` and `components.length`. Where the composer
   catches an empty embed, as the owner's sentence says it does, was not traced (N-7).

## Evidence

"Editor" is defined under Methodology. "Send check" is `validateMessage`'s result and "Save schema"
is `discordMessageShape.safeParse`, both executed on the request body. "Senders" says which webhook
kinds the shape was sent through; where both, the results were identical.

| Id | Shape | Editor | Discord | Error body and codes | Send check | Save schema | Senders |
|---|---|---|---|---|---|---|---|
| A1 | baseline: one Text Display 'hello' | valid | accepted |  | passes | admits | both |
| A2 | website-shaped baseline: content '' and embeds [] beside one Text Display | default | accepted |  | passes | admits | both |
| A3 | V2 flag with components [] | control | **refused** | E1: `50006` | blocks | admits | both |
| A4 | whitespace-only content ' \n ' beside one Text Display | not traced | accepted |  | passes | admits | both |
| A5 | non-empty content 'x' beside one Text Display | not traced | **refused** | E2: `MESSAGE_CANNOT_USE_LEGACY_FIELDS_WITH_COMPONENTS_V2` | blocks | admits | both |
| B1 | only an empty Text Display ('') | default | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B2 | only a Text Display of one space | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B3 | only a Text Display of one newline | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B4 | only a Text Display of one no-break space U+00A0 | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B5 | only a Text Display of one zero-width space U+200B | typed | accepted |  | passes | admits | both |
| B6 | only a Text Display with no content key | no | **refused** | E4: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| B7 | empty Text Display beside a non-empty one | default | **refused** | E5: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B8 | one-space Text Display beside a non-empty one | typed | **refused** | E5: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B9 | Section holding only an empty Text Display, valid Thumbnail | default | **refused** | E6: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B10 | Section holding only a one-space Text Display, valid Thumbnail | typed | **refused** | E6: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B11 | Container holding only an empty Text Display | default | **refused** | E6: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| B12 | Container holding only a one-space Text Display | typed | **refused** | E6: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| C1 | valid Section: one Text Display, valid Thumbnail | valid | accepted |  | passes | admits | both |
| C2 | Section with components [] and a valid Thumbnail | JSON | **refused** | E7: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| C3 | Section whose Thumbnail media.url is '' | default | **refused** | E8: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| C4 | Section with no accessory key | no | **refused** | E9: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| C5 | Section whose accessory is a valid link button | JSON | accepted |  | passes | admits | both |
| C6 | Section accessory link button with url '' | JSON | **refused** | E10: `BUTTON_COMPONENT_URL_REQUIRED` | passes | rejects | both |
| C7 | Section accessory link button with no label key | JSON | **refused** | E11: `BASE_TYPE_REQUIRED` | passes | admits | both |
| C8 | Section accessory link button with label '' | JSON | **refused** | E11: `BASE_TYPE_REQUIRED` | passes | admits | both |
| C9 | Section accessory link button with label of one space | JSON | **refused** | E11: `BASE_TYPE_REQUIRED` | passes | admits | both |
| C10 | Thumbnail description '' | JSON | **refused** | E12: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| C11 | Thumbnail description of one space | typed | accepted |  | passes | admits | both |
| D1 | valid Media Gallery: one item | valid | accepted |  | passes | admits | both |
| D2 | Media Gallery with items [] | control | **refused** | E13: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| D3 | Media Gallery item with media.url '' | default | **refused** | E14: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| D4 | Media Gallery item description '' | JSON | **refused** | E15: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| D5 | Media Gallery item description of one space | typed | accepted |  | passes | admits | both |
| D6 | Media Gallery with no items key | no | **refused** | E16: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| E1 | File with file.url '' | default | **refused** | E17: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| E2 | File with an https file.url | typed | **refused** | E18: `UNFURLED_MEDIA_ITEM_MUST_USE_ATTACHMENT_PROTOCOL` | passes | admits | both |
| E3 | File with attachment://missing.png and no upload | typed | **refused** | E19: `UNFURLED_MEDIA_ITEM_REFERENCED_ATTACHMENT_NOT_FOUND` | passes | admits | both |
| F1 | only a Separator | default | accepted |  | passes | admits | both |
| F2 | Separator beside a Text Display | default | accepted |  | passes | admits | both |
| G1 | valid Container: one Text Display | valid | accepted |  | passes | admits | both |
| G2 | Container with components [] | control | **refused** | E20: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| G3 | Container with no components key | no | **refused** | E21: `BASE_TYPE_REQUIRED` | passes | rejects | both |
| H1 | valid Action Row with one link button, beside a Text Display | valid | accepted |  | passes | admits | both |
| H2 | Action Row with components [], beside a Text Display | control | **refused** | E22: `BASE_TYPE_BAD_LENGTH` | passes | admits | both |
| H3 | link button with url '', beside a Text Display | default | **refused** | E23: `BUTTON_COMPONENT_URL_REQUIRED` | passes | rejects | both |
| H4 | link button with no label key, beside a Text Display | control | **refused** | E24: `BASE_TYPE_REQUIRED` | passes | admits | both |
| H5 | link button with label '', beside a Text Display | JSON | **refused** | E24: `BASE_TYPE_REQUIRED` | passes | admits | both |
| H6 | link button with label of one space, beside a Text Display | typed | **refused** | E24: `BASE_TYPE_REQUIRED` | passes | admits | both |
| H7 | V2 flag with only a valid Action Row | valid | accepted |  | passes | admits | both |
| I1 | link button url 'abc' | typed | **refused** | E25: `URL_TYPE_INVALID_SCHEME`; `URL_TYPE_INVALID_URL` | passes | rejects | both |
| I2 | Thumbnail media.url 'abc' | typed | **refused** | E26: `URL_TYPE_INVALID_URL` | passes | rejects | both |
| I3 | Media Gallery item media.url 'abc' | typed | **refused** | E27: `URL_TYPE_INVALID_URL` | passes | rejects | both |
| W1 | only a Text Display of one tab | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W2 | only a Text Display of CR LF | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W3 | only a Text Display of one ideographic space U+3000 | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W4 | only a Text Display of one em space U+2003 | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W5 | only a Text Display of one U+FEFF | typed | accepted |  | passes | admits | user-created |
| W6 | only a Text Display of one next-line U+0085 | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W7 | only a Text Display of one line separator U+2028 | typed | **refused** | E3: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| W8 | Text Display ' hello ' with surrounding spaces | typed | accepted |  | passes | admits | user-created |
| X1 | link button with an emoji and no label key | JSON | accepted |  | passes | admits | user-created |
| X2 | Container holding a Text Display and an Action Row with components [] | control | **refused** | E28: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| X3 | Container holding a Text Display and a Media Gallery with items [] | control | **refused** | E29: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| X4 | Container holding only a Separator | default | accepted |  | passes | admits | user-created |
| X5 | link button url 'ftp://example.com' | typed | **refused** | E30: `URL_TYPE_INVALID_SCHEME` | passes | admits | user-created |
| X6 | Thumbnail media.url 'ftp://example.com/a.png' | typed | accepted |  | passes | admits | user-created |
| X7 | Container holding a Section whose only Text Display is empty, valid Thumbnail | default | **refused** | E31: `BASE_TYPE_BAD_LENGTH` | passes | admits | user-created |
| N1 | 40 top-level Text Displays (site count 40) | control | accepted |  | passes | admits | user-created |
| N2 | 41 top-level Text Displays (site count 41) | control | **refused** | E32: `BASE_TYPE_MAX_LENGTH` | blocks | rejects | user-created |
| N3 | Container holding 39 Text Displays (site count 40) | control | accepted |  | passes | admits | user-created |
| N4 | Container holding 40 Text Displays (site count 41) | control | **refused** | E33: `COMPONENT_MAX_TOTAL_COMPONENTS_EXCEEDED` | blocks | admits | user-created |
| N5 | 13 Sections each with one Text Display and a Thumbnail, plus 1 Text Display (site count 40) | control | accepted |  | passes | admits | user-created |
| N6 | 13 Sections each with one Text Display and a Thumbnail, plus 2 Text Displays (site count 41) | control | **refused** | E33: `COMPONENT_MAX_TOTAL_COMPONENTS_EXCEEDED` | blocks | admits | user-created |
| N7 | 39 Text Displays plus a Media Gallery of 10 items (site count 40) | control | accepted |  | passes | admits | user-created |
| N8 | 38 Text Displays plus an Action Row with one link button (site count 40) | control | accepted |  | passes | admits | user-created |
| N9 | 39 Text Displays plus an Action Row with one link button (site count 41) | control | **refused** | E33: `COMPONENT_MAX_TOTAL_COMPONENTS_EXCEEDED` | blocks | admits | user-created |

Error bodies, verbatim (33 distinct). Each is byte-identical across every request that cites it.

- E1: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"_errors": [["Cannot send an empty message", 50006]]}}}`
- E2: `{"message": "Invalid Form Body", "code": 50035, "errors": {"content": {"_errors": [{"code": "MESSAGE_CANNOT_USE_LEGACY_FIELDS_WITH_COMPONENTS_V2", "message": "The 'content' field cannot be used when using MessageFlags.IS_COMPONENTS_V2"}]}}}`
- E3: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"content": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 4000 in length."}]}}}}}`
- E4: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"content": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}`
- E5: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"content": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 4000 in length."}]}}}}}`
- E6: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"0": {"content": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 4000 in length."}]}}}}}}}`
- E7: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 3 in length."}]}}}}}`
- E8: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"media": {"url": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}}}`
- E9: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}`
- E10: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"url": {"_errors": [{"code": "BUTTON_COMPONENT_URL_REQUIRED", "message": "A url is required"}]}}}}}}`
- E11: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"label": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}}`
- E12: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"description": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 1024 in length."}]}}}}}}`
- E13: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"items": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 10 in length."}]}}}}}`
- E14: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"items": {"0": {"media": {"url": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}}}}`
- E15: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"items": {"0": {"description": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 1024 in length."}]}}}}}}}`
- E16: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"items": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}`
- E17: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"file": {"url": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}}`
- E18: ``{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"file": {"url": {"_errors": [{"code": "UNFURLED_MEDIA_ITEM_MUST_USE_ATTACHMENT_PROTOCOL", "message": "This UnfurledMediaItem does not support arbitrary external urls. You must use the `attachment://` reference system."}]}}}}}}``
- E19: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"file": {"url": {"_errors": [{"code": "UNFURLED_MEDIA_ITEM_REFERENCED_ATTACHMENT_NOT_FOUND", "message": "The referenced attachment (\"attachment://missing.png\") was not found"}]}}}}}}`
- E20: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 40 in length."}]}}}}}`
- E21: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}`
- E22: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"components": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 5 in length."}]}}}}}`
- E23: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"components": {"0": {"url": {"_errors": [{"code": "BUTTON_COMPONENT_URL_REQUIRED", "message": "A url is required"}]}}}}}}}`
- E24: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"components": {"0": {"label": {"_errors": [{"code": "BASE_TYPE_REQUIRED", "message": "This field is required"}]}}}}}}}`
- E25: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"components": {"0": {"url": {"_errors": [{"code": "URL_TYPE_INVALID_SCHEME", "message": "Scheme \"abc\" is not supported. Scheme must be one of ('http', 'https', 'discord')."}, {"code": "URL_TYPE_INVALID_URL", "message": "Not a well formed URL."}]}}}}}}}`
- E26: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"media": {"url": {"_errors": [{"code": "URL_TYPE_INVALID_URL", "message": "Not a well formed URL."}]}}}}}}}`
- E27: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"items": {"0": {"media": {"url": {"_errors": [{"code": "URL_TYPE_INVALID_URL", "message": "Not a well formed URL."}]}}}}}}}}`
- E28: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"1": {"components": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 5 in length."}]}}}}}}}`
- E29: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"1": {"items": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 10 in length."}]}}}}}}}`
- E30: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"components": {"0": {"url": {"_errors": [{"code": "URL_TYPE_INVALID_SCHEME", "message": "Scheme \"ftp\" is not supported. Scheme must be one of ('http', 'https', 'discord')."}]}}}}}}}`
- E31: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"components": {"0": {"components": {"0": {"content": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 4000 in length."}]}}}}}}}}}`
- E32: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"_errors": [{"code": "BASE_TYPE_MAX_LENGTH", "message": "Must be 40 or fewer in length."}]}}}`
- E33: `{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"_errors": [{"code": "COMPONENT_MAX_TOTAL_COMPONENTS_EXCEEDED", "message": "Total number of components cannot exceed 40"}]}}}`

## Not established by these runs

| # | Not established | Why | What would establish it |
|---|---|---|---|
| N-1 | Whether any stored record is in a refused shape, and how many | The brief rules it out: no agent reads that database | A count over stored messages by whoever may read them, using the refused shapes above as the predicate |
| N-2 | Whether a user can type a whitespace-only Text Display in the editor | The `typed` rows rest on the input handlers storing what they are given; the text editor's own handling of whitespace was not traced, and this session has no browser | Type one space into a Text Display in a running editor and read the message JSON |
| N-3 | Discord's whitespace set beyond the 11 characters tried | Only those were sent | The same single-Text-Display send for each further character of interest |
| N-4 | The exact default Section as one component | Its two refused parts were sent separately (B9, C3) | One send of `createSection`'s output |
| N-5 | A File component on an edit of a message that already has attachments | Only messages without attachments were used | `PATCH` a message sent with an uploaded file, with a File component referencing it |
| N-6 | The edit path beyond the 10 shapes of run 3, and the bot-created webhook for runs 2 to 4 | Sampled, not swept | Runs 2 and 4 on the second webhook; run 3 widened |
| N-7 | Where the composer catches an empty embed | The owner's sentence says it does; `validateContentRequirements` counts any embed object as content, and the path was not traced further | Read the embed editor and `hasClassicContent`'s callers |
| N-8 | Refusals outside emptiness, URL form, File and the 40 total | The brief put emptiness first. Not sent: values over the per-field caps (label 80, Section 3, Action Row 5, gallery 10), which the website's constants set at the same numbers Discord's error bodies state | One over-cap send per cap |

## Open Questions

| # | Question | What would close it |
|---|---|---|
| OQ-1 | Whether and how the website's send check should change, given F-1 to F-7 and F-12 to F-14. The owner's selection reserves this to him ("Any fix to the send check from the results comes back to you as its own question") | His answer, through `steering-queue-hooks`. ROUTED: carried by `../../handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (`Status: Open`, with `Owning-Stage` and `Review-Trigger`), whose subject is this gap. That handoff does not yet cite this document; it is not this session's file to edit |

## Process facts of this run

- **Sends and cleanup.** 138 send requests and one base message for the edit run. 39 messages were
  created in `#general` and all 39 were deleted by the probe as the test bot (39 deletes, each
  204). One temporary webhook, `v2-validity-probe` (`1569998621364191312`), was created and
  deleted in run 1 (204, then `GET` returned 404). `GET /guilds/{guild}/webhooks` after run 4
  listed only "Spidey Bot". The existing "Spidey Bot" webhook was used as a sender and not
  modified. `~/.claude/skills/discord-test-browser/test-estate.json` was not edited: the estate is
  as it was.
- **No secret was printed or written.** Tokens stayed in the probe's memory.
- **Website code was executed, read-only.** `validateMessage` and `discordMessageShape` were
  imported from the working tree by a scratch script under Node 24's own TypeScript loader, with a
  resolve hook for the `~/` alias. `SKIP_ENV_VALIDATION=1` was set so `src/env.mjs` did not demand
  the app's environment; no `.env` file was loaded and nothing touched a database. Two earlier
  attempts failed before that: the package store's `esbuild` 0.14.47 would not start, and a run
  without `SKIP_ENV_VALIDATION` stopped at `src/env.mjs` with "Invalid environment variables".
- **The website tree moved under this session** (see Context). Reads were taken from `6d78b19` by
  `git show`, and the executed files were checked identical to it afterwards.
- **No helper subagents.** Every read was of material this session judged.
- **Scratch files** (the probe, its four result files, the loader script, exported sources) were
  in the session scratchpad and deleted at run end.

## Recommendations (investigation only)

1. Put OQ-1 to the owner. The class is established for emptiness; nothing further needs measuring
   to ask it.
2. If a count of affected stored messages is wanted before deciding, N-1 names who can take it and
   with what predicate.
3. N-2 is the one reachability gap that needs a browser.

## Appendix: reproducing the runs

Every request: `User-Agent: DiscordBot (https://hooks.gg, 1.0) v2-validity-probe`,
`Content-Type: application/json`, no `Authorization` header (the webhook token is in the URL), body
`{"flags": 32768, "components": <shape>}` plus any extra top-level key the shape names. Sends were
1.5 seconds apart. Run 3 first created a base message (`[Text Display 'patch base']`), then sent
each shape as `PATCH /webhooks/{id}/{token}/messages/{base}?wait=true&with_components=true`.

Builders, from which every shape in the Evidence table is assembled as its description says:

```python
MEDIA = "https://cdn.discordapp.com/embed/avatars/0.png"
LINK = "https://hooks.gg"

def td(s="hello"):            return {"type": 10, "content": s}
def thumb(url=MEDIA, **kw):   return {"type": 11, "media": {"url": url}, **kw}
def button(**kw):             # label=None drops the key
    b = {"type": 2, "style": 5, "label": "Link", "url": LINK}; b.update(kw)
    return {k: v for k, v in b.items() if v is not None}
def section(children, acc):   return {"type": 9, "components": children, **({"accessory": acc} if acc else {})}
def gallery(items):           return {"type": 12, "items": items}
def item(url=MEDIA, **kw):    return {"media": {"url": url}, **kw}
def row(buttons):             return {"type": 1, "components": buttons}
def container(children):      return {"type": 17, "components": children}
SEP = {"type": 14, "divider": True, "spacing": 1}
```

The website's side, per request body `b`:
`validateMessage({ username: 'Probe', ...b })` from `src/utils/limits.tsx` and
`discordMessageShape.safeParse({ username: 'Probe', ...b })` from
`src/server/api/utils/shapes.ts`, run as
`SKIP_ENV_VALIDATION=1 node --experimental-transform-types --import <hooks> <entry>`, where the
hooks script resolves `~/x` to `website/src/x`, tries `.ts`, `.tsx` and `/index.ts` on extensionless
imports, and loads `.ts` and `.tsx` as `module-typescript`.
