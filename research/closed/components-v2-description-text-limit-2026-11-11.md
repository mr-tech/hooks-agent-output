---
UUID: 4eb89197
Parent: 007-components-v2-displayable-text-limit
Status: Answered
Status-Detail: >-
  Answered by measurement: Thumbnail and MediaGallery item descriptions do not count toward
  Discord's 4000-character Components V2 displayable-text total (F-1 to F-4). The adjacent finding
  F-6 (Discord bounds each description at 1024 characters and the website bounds neither) is
  carried by steering/queue-hooks-rulings.md, block "2026-11-11T08:48Z — selection 11", and
  TODO.md, section "Website fix: bound V2 description fields at 1024 characters".
---

# Do Thumbnail and MediaGallery descriptions count toward the Components V2 4000-character text total?

## Changelog

| Date | Agent | Change | Status |
|---|---|---|---|
| 2026-11-11T08:44 | researcher-hooks-text-limit | Created with the question, three probe runs (36 requests), findings F-1 to F-6, process facts and the one open item | Active |
| 2026-11-11T08:46 | researcher-hooks-text-limit | OQ-1 now cites the ruling read and why its words do not answer F-6 | Active |
| 2026-11-11T08:48 | researcher-hooks-text-limit | OQ-1 resolved: F-6's carrier named by steering-queue-hooks and read at the files. Document closed | Status: Answered |

## Question

Do a Thumbnail's `description` (a Section accessory) and a MediaGallery item's `description` count
toward Discord's 4000-character Components V2 displayable-text total?

Asked by `steering-queue-hooks` on the owner's selection of 2026-11-11
(`steering/queue-hooks-rulings.md`, block "selections 1 to 4", prompt 3: "Agent: send on test server
(Recommended)"). The brief is `steering/queue-hooks-briefs/researcher-text-limit-brief.md`.

## Answer

**No.** With Text Display content at exactly 4000 characters, a message carrying a 1000-character
Thumbnail description, a 1000-character MediaGallery item description, or both, is accepted with
HTTP 200. The same sender in the same channel is refused with HTTP 400, code 50035,
`COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED`, when Text Display content alone is 4001. This held for
all three senders tried: the test bot, a bot-created webhook and a user-created webhook.

On these two fields the website's sum matches Discord's, so no fix question arises from the
question as asked. One adjacent finding (F-6) does raise one.

## Context

- The assumption under test is plan 007's Assumption 1
  (`../../planning/closed/007-components-v2-displayable-text-limit.md`): only `TextDisplay.content`
  counts. Its paired analysis
  (`../../analysis/closed/007-components-v2-displayable-text-limit-analysis.md`, Open Questions 1)
  recommended a live proof that was never run. The question was carried in `OPEN_QUESTIONS.md`
  until `a22fb73` (entry "one live send would close a four-month-old assumption") and deleted from
  that file when this session took it.
- That entry names a second consumer: the statbot side budgets text against the same limit.
  Relaying this result to it is not this session's act.
- Records read: `architecture/system-architecture.md` (whole) and `architecture/website.md` (the
  validity-predicate paragraph naming `validateMessage` and `sumDisplayableText`). The product
  purpose as the first states it is a Discord message builder that sends through webhooks; a local
  limit check that agrees with Discord's serves that directly.
- Website tree read: `website` at `6d78b19` (branch `fix/website-save-gate-embeds`). The three
  files cited below do not differ from the local `origin/master` tracking ref
  (`git -C website diff --numstat origin/master HEAD -- <the three paths>` printed nothing).

## Methodology

A Python probe (standard library only) sent Components V2 messages (`flags: 32768`) to `#general`
(`1566742403195469906`), the only text channel of the agents' test server (guild
`1566742402180456559`). Before any send the probe read the channel and asserted its `guild_id` is
the test guild. Text was the ASCII letter `a` repeated; descriptions were `d` or `g` repeated; media
was `https://cdn.discordapp.com/embed/avatars/0.png`.

Three senders, each given every case:

| Sender | Request | Identity |
|---|---|---|
| bot | `POST /channels/{channel}/messages` with the test bot's token | user `1558266761101447248` |
| webhook-bot-created | `POST /webhooks/{id}/{token}?wait=true&with_components=true` | a webhook the probe created through the bot and deleted after each run; `application_id` `1558266761101447248` |
| webhook-user-created | same request form | the existing "Spidey Bot" webhook `1569086816387203143`, `application_id` null. This is the kind of webhook a website user supplies |

Design of the decisive cases: the control pair puts the boundary at exactly 4000 (4000 accepted,
4001 refused, text split over two Text Displays so the per-field limit is not what fires). The
description cases then hold text at exactly 4000, so a single counted description character would
breach. Each 200 response was checked to echo the descriptions at full length, so Discord did not
drop or shorten them before counting.

A Thumbnail exists only inside a Section, so the thumbnail and nested cases mean something only if
Discord's counter descends into Sections and Containers. Run 2 shows it does.

Run times (UTC, from the probe's own clock): run 1 08:37:47 to 08:38:33, run 2 08:40:02 to
08:40:19, run 3 08:41:21 to 08:41:49, all 2026-11-11. Counts below were computed by a script over
the probe's saved JSON, not from terminal output: 36 send requests, 18 returned 200 and 18
returned 400.

## Findings

### Verified (by execution against the live API)

**F-1. A Thumbnail description does not count toward the 4000 total.** Requests 3, 8 and 13: text
4000 plus a 1000-character Thumbnail description returned 200 on every sender. Requests 2, 7 and 12
(text 4001, no description) returned 400 with body E1 on the same sender and channel.

**F-2. A MediaGallery item description does not count toward the 4000 total.** Requests 4, 9 and
14: text 4000 in two top-level Text Displays plus a 1000-character gallery item description
returned 200 on every sender. This case needs no nesting assumption.

**F-3. Neither counts when nested in a Container, and the counter does descend into Sections and
Containers.** Requests 5, 10 and 15 (Container holding a Section with a described Thumbnail, a
described gallery and text, 4000 text and 2000 description characters in all) returned 200.
Requests 16 to 24 (text 2000 + 2001 placed in a Section, in a Container, and in a Section inside a
Container, no descriptions) all returned 400 with body E1. So the 200s in F-1 and F-3 are not an
artefact of text in those positions going uncounted.

**F-4. The three senders are counted the same way, and a webhook may carry Thumbnail and
MediaGallery components.** Across all 36 requests the status and error body were identical per case
on the bot, the bot-created webhook and the user-created webhook. This answers the two sender items
the brief listed as unchecked.

**F-5. The website's sum agrees with Discord's on these two fields.** By code read at website
`6d78b19`: `sumDisplayableText` in `src/utils/limits.tsx` (called by
`validateDisplayableTextCount`, which `validateMessage` calls) and its twin of the same name in
`src/server/api/utils/shapes.ts` (the save schema's refinement) both add `content.length` for type
10 only and descend into types 9 and 17. Neither reads `accessory` or gallery `items`. The bound is
`MAX_COMPONENTS_DISPLAYABLE_TEXT = 4000` in `src/constants/messageLimits.ts`. Plan 007's
Assumption 1 therefore holds within the scope measured here (see "Not established").

**F-6. Adjacent, outside the brief's question: Discord bounds each description at 1024 characters
and the website bounds neither.** Discord's half is measured. Requests 25 to 36: a 1024-character
description returned 200 and a 1025-character one returned 400 with code 50035 and
`BASE_TYPE_BAD_LENGTH`, "Must be between 1 and 1024 in length." (bodies E2 and E3), for both the
Thumbnail and the gallery item on every sender. The website's half is a code read at `6d78b19`,
not an execution:

- `thumbnailShape` and `mediaGalleryItemShape` in `src/server/api/utils/shapes.ts` declare
  `description: z.string().optional()` with no `.max`.
- `validateMessage` in `src/utils/limits.tsx`, read whole, has no check on a component
  description.
- The description inputs in `ThumbnailEditor.tsx` and `MediaGalleryEditor.tsx` (under
  `src/components/DiscordMessageEditor/components/ComponentEditors/`) are plain text inputs with no
  `maxLength`.
- `src/utils/index.ts` (`stripKeys`) and `src/utils/sendWebhook.ts` contain the word "description"
  zero times (`grep -ci`, both files), so nothing on the send path shortens one by name.

`architecture/website.md` states that `validateMessage` is the single validity predicate and also
feeds the stored `valid` column. If so, a message with a 1025-character description is recorded
valid and passes the send gate, and Discord refuses it. That consequence is this document's
inference from the code read (below), not something run in an editor.

### High-confidence inference

**I-1. A website user can compose, save and attempt to send a description over 1024 characters,
and the send fails at Discord.** Rests on F-6's code read. Not run: this session has no browser and
is read-only on `website`, so no test was added. Fastest disconfirming test: call
`discordMessageShape.safeParse` and `validateMessage` with a V2 message whose Thumbnail description
is 1025 characters; the inference fails if either rejects it.

### Hypothesis

None.

## Evidence

Every send request, in order. "Text" and "Desc" are the characters sent.

| # | Run | Sender | Case | Text | Desc | Status | Result |
|---|---|---|---|---|---|---|---|
| 1 | 1 | bot | control-pass: text 2000+2000, no descriptions | 4000 | 0 | 200 | message `1569994547616809012`; echoed text [2000, 2000] |
| 2 | 1 | bot | control-fail: text 2000+2001, no descriptions | 4001 | 0 | 400 | E1 |
| 3 | 1 | bot | thumbnail: Section[text 2000] with Thumbnail description 1000, plus text 2000 | 4000 | 1000 | 200 | message `1569994565350588487`; echoed text [2000, 2000], thumbnail description [1000] |
| 4 | 1 | bot | gallery: text 2000+2000, MediaGallery item description 1000 | 4000 | 1000 | 200 | message `1569994574338727960`; echoed text [2000, 2000], gallery description [1000] |
| 5 | 1 | bot | nested: Container[Section(text 2000, Thumbnail description 1000), MediaGallery(description 1000), text 2000] | 4000 | 2000 | 200 | message `1569994589408862270`; echoed text [2000, 2000], thumbnail description [1000], gallery description [1000] |
| 6 | 1 | webhook-bot-created | control-pass | 4000 | 0 | 200 | message `1569994604650954833`; echoed text [2000, 2000] |
| 7 | 1 | webhook-bot-created | control-fail | 4001 | 0 | 400 | E1 |
| 8 | 1 | webhook-bot-created | thumbnail | 4000 | 1000 | 200 | message `1569994619687665685`; echoed text [2000, 2000], thumbnail description [1000] |
| 9 | 1 | webhook-bot-created | gallery | 4000 | 1000 | 200 | message `1569994627581481021`; echoed text [2000, 2000], gallery description [1000] |
| 10 | 1 | webhook-bot-created | nested | 4000 | 2000 | 200 | message `1569994634854142013`; echoed text [2000, 2000], thumbnail description [1000], gallery description [1000] |
| 11 | 1 | webhook-user-created | control-pass | 4000 | 0 | 200 | message `1569994642064154769`; echoed text [2000, 2000] |
| 12 | 1 | webhook-user-created | control-fail | 4001 | 0 | 400 | E1 |
| 13 | 1 | webhook-user-created | thumbnail | 4000 | 1000 | 200 | message `1569994657251991574`; echoed text [2000, 2000], thumbnail description [1000] |
| 14 | 1 | webhook-user-created | gallery | 4000 | 1000 | 200 | message `1569994665779003488`; echoed text [2000, 2000], gallery description [1000] |
| 15 | 1 | webhook-user-created | nested | 4000 | 2000 | 200 | message `1569994673341206619`; echoed text [2000, 2000], thumbnail description [1000], gallery description [1000] |
| 16 | 2 | bot | descent control: Section[text 2000, text 2001] with Thumbnail, no description | 4001 | 0 | 400 | E1 |
| 17 | 2 | bot | descent control: Container[text 2000, text 2001] | 4001 | 0 | 400 | E1 |
| 18 | 2 | bot | descent control: Container[Section[text 2000, text 2001] with Thumbnail, no description] | 4001 | 0 | 400 | E1 |
| 19 | 2 | webhook-bot-created | descent control: Section | 4001 | 0 | 400 | E1 |
| 20 | 2 | webhook-bot-created | descent control: Container | 4001 | 0 | 400 | E1 |
| 21 | 2 | webhook-bot-created | descent control: Container > Section | 4001 | 0 | 400 | E1 |
| 22 | 2 | webhook-user-created | descent control: Section | 4001 | 0 | 400 | E1 |
| 23 | 2 | webhook-user-created | descent control: Container | 4001 | 0 | 400 | E1 |
| 24 | 2 | webhook-user-created | descent control: Container > Section | 4001 | 0 | 400 | E1 |
| 25 | 3 | bot | description bound: Thumbnail 1024 | 1 | 1024 | 200 | message `1569995442299871284`; echoed thumbnail description [1024] |
| 26 | 3 | bot | description bound: Thumbnail 1025 | 1 | 1025 | 400 | E2 |
| 27 | 3 | bot | description bound: MediaGallery item 1024 | 1 | 1024 | 200 | message `1569995457701085265`; echoed gallery description [1024] |
| 28 | 3 | bot | description bound: MediaGallery item 1025 | 1 | 1025 | 400 | E3 |
| 29 | 3 | webhook-bot-created | description bound: Thumbnail 1024 | 1 | 1024 | 200 | message `1569995472645394473`; echoed thumbnail description [1024] |
| 30 | 3 | webhook-bot-created | description bound: Thumbnail 1025 | 1 | 1025 | 400 | E2 |
| 31 | 3 | webhook-bot-created | description bound: MediaGallery item 1024 | 1 | 1024 | 200 | message `1569995487145103361`; echoed gallery description [1024] |
| 32 | 3 | webhook-bot-created | description bound: MediaGallery item 1025 | 1 | 1025 | 400 | E3 |
| 33 | 3 | webhook-user-created | description bound: Thumbnail 1024 | 1 | 1024 | 200 | message `1569995501569314902`; echoed thumbnail description [1024] |
| 34 | 3 | webhook-user-created | description bound: Thumbnail 1025 | 1 | 1025 | 400 | E2 |
| 35 | 3 | webhook-user-created | description bound: MediaGallery item 1024 | 1 | 1024 | 200 | message `1569995516073214035`; echoed gallery description [1024] |
| 36 | 3 | webhook-user-created | description bound: MediaGallery item 1025 | 1 | 1025 | 400 | E3 |

Every 200 response carried `flags: 32768` and `channel_id` `1566742403195469906` (asserted by the
tabulating script over the saved results).

Error bodies, verbatim. Each was byte-identical across every request that cites it.

E1:

```json
{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"_errors": [{"code": "COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED", "message": "Components displayable text size exceeds maximum size of 4000"}]}}}
```

E2:

```json
{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"0": {"accessory": {"description": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 1024 in length."}]}}}}}}
```

E3:

```json
{"message": "Invalid Form Body", "code": 50035, "errors": {"components": {"1": {"items": {"0": {"description": {"_errors": [{"code": "BASE_TYPE_BAD_LENGTH", "message": "Must be between 1 and 1024 in length."}]}}}}}}}
```

## Not established by these runs

These bound the answer; none is part of the question as asked.

| # | Not established | Why | What would establish it |
|---|---|---|---|
| N-1 | How Discord counts non-ASCII text | All filler was ASCII. The website counts UTF-16 code units (`.length`) | The control pair repeated with astral-plane characters |
| N-2 | The message-edit path and interaction responses | Only message creation was sent | The control pair and one description case sent as `PATCH` on an existing message |
| N-3 | Whether any other text-bearing component field counts (a link button's label, for one) | Not in the question; `sumDisplayableText` counts none of them | Text 4000 plus a labelled link button as a Section accessory, same controls |
| N-4 | Whether Discord refuses an empty-string description | E2 and E3 say "between 1 and 1024"; no empty description was sent. The editors write `undefined` for an empty input, but the schema admits `""` | One send with `description: ""` |

## Open Questions

OQ-1 RESOLVED — F-6 (the 1024-character description limit the website does not enforce) went to
the owner through `steering-queue-hooks`; he chose "Agent: scope a fix (Recommended)". Carried by
`../../steering/queue-hooks-rulings.md`, block "2026-11-11T08:48Z — selection 11" (`74a4a44`), and
`../../TODO.md`, section "Website fix: bound V2 description fields at 1024 characters". Both read
by this session at 2026-11-11T08:48Z. The argument that stood here is in this document at
`de54612`.

None open.

## Process facts of this run

- **Scope extension, this session's own decision.** The brief asked one question. Run 2 (descent
  controls) is part of validating that answer. Run 3 (the per-description bound) is not: it was
  added after the code read for F-5 showed no bound on either description field. It cost 12
  requests in the same channel under the same fence. It is reported as F-6, separate from the
  answer.
- **Sends and cleanup.** 18 messages were created in `#general`, 6 by each sender, and all 18 were
  deleted by the probe as the bot (each delete returned 204). The existing "Spidey Bot" webhook was
  used as a sender for 6 of them; it was not modified.
- **Test estate unchanged.** Three temporary webhooks named `text-limit-probe` were created, one per
  run (`1569994545117134869`, `1569995109595086929`, `1569995440496050206`), and each was deleted
  in its run (204, then `GET` returned 404 `{"message": "Unknown Webhook", "code": 10015}`).
  `GET /guilds/{guild}/webhooks` listed the single "Spidey Bot" webhook before run 1 and after run
  3. `~/.claude/skills/discord-test-browser/test-estate.json` was therefore not edited. Read from
  Discord this run, for whoever next verifies that file: the guild's name is "Claude"; the test
  bot is user `1558266761101447248`, username "Statbot TEST"; "Spidey Bot" is webhook
  `1569086816387203143` in `#general`, `application_id` null. The bot's Administrator permission,
  the other two bots and the upgrades were not read.
- **No secret was printed or written.** The bot token and the webhook tokens stayed in the probe's
  memory. The saved results hold ids, statuses and bodies only.
- **A hook refused one command, and it was re-issued in the form the hook names.** While checking
  F-6, a Bash call of the shape `cd /usr/local/bin/hooks/website && grep -rli … src … ; grep -rn
  "1024" src …` was refused by `secret-file-gate-hook`, which said the call could print lines of
  `preview-image-generator/.github/workflows/prod.yml`. The call was not aimed at that file. The
  hook cannot resolve a relative path after a `cd`, and its message lists that shape as one it
  refuses. The search was re-issued as listings only (`grep -rli`, `grep -rl`) over the literal
  path `/usr/local/bin/hooks/website/src`, a form the hook's message permits, and the hits were then
  read from named files. Nothing was read from the flagged file.
- **No website code was executed.** The website has no `tsx` runner and adding a test file is
  outside this session's fence, so F-6's website half and I-1 are code reads.
- **Scratch files** (the probe and its three result files) lived in the session scratchpad and were
  deleted at run end. The appendix carries what is needed to repeat the runs.

## Recommendations (investigation only)

1. F-6 is routed (Open Questions, OQ-1). Nothing further needs investigating to state it.
2. If the 4000 check is ever revisited, N-3 and N-1 are the two unmeasured ways it could still
   disagree with Discord. Each is one control pair plus one case with the probe below.

## Appendix: the probe

Standard-library Python. Headers on every request: `User-Agent: DiscordBot (https://hooks.gg, 1.0)
text-limit-probe`, `Content-Type: application/json`, and for bot requests `Authorization: Bot
<token read from ~/.claude-credentials/test_bot_token>`. Body of every send:
`{"flags": 32768, "components": <case>}`. A 429 would have been retried after its `retry_after`; the
probe did not record whether any occurred, and no 429 is among the 36 final statuses. Sends were
spaced 1.5 seconds apart.

```python
MEDIA = "https://cdn.discordapp.com/embed/avatars/0.png"

def td(n):            return {"type": 10, "content": "a" * n}
def thumb(n):         return {"type": 11, "media": {"url": MEDIA}, "description": "d" * n}
def thumb_plain():    return {"type": 11, "media": {"url": MEDIA}}
def gallery(n):       return {"type": 12, "items": [{"media": {"url": MEDIA}, "description": "g" * n}]}
def section(t, d):    return {"type": 9, "components": [td(t)], "accessory": thumb(d)}

RUN1 = [
    [td(2000), td(2000)],                                                     # control-pass
    [td(2000), td(2001)],                                                     # control-fail
    [section(2000, 1000), td(2000)],                                          # thumbnail
    [td(2000), td(2000), gallery(1000)],                                      # gallery
    [{"type": 17, "components": [section(2000, 1000), gallery(1000), td(2000)]}],  # nested
]
DESCENT = [
    [{"type": 9, "components": [td(2000), td(2001)], "accessory": thumb_plain()}],
    [{"type": 17, "components": [td(2000), td(2001)]}],
    [{"type": 17, "components": [{"type": 9, "components": [td(2000), td(2001)], "accessory": thumb_plain()}]}],
]
DESCBOUND = [
    [section(1, 1024)],
    [section(1, 1025)],
    [td(1), gallery(1024)],
    [td(1), gallery(1025)],
]

# Senders, each given every case of the run in the order above:
#   bot:      POST /api/v10/channels/1566742403195469906/messages
#   webhooks: POST /api/v10/webhooks/{id}/{token}?wait=true&with_components=true   (no Authorization)
# Setup per run:   GET /channels/{id} and assert guild_id == 1566742402180456559;
#                  POST /channels/{id}/webhooks {"name": "text-limit-probe"} as the bot.
# Cleanup per run: DELETE /channels/{id}/messages/{message} for every 200; DELETE /webhooks/{created id}.
```
