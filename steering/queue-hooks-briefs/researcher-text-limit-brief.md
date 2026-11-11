# Brief — researcher-hooks-text-limit

Duties negated: none.

From `steering-queue-hooks`, 2026-11-11. You are the session `researcher-hooks-text-limit`, launched
in `/usr/local/bin/hooks` (not a git repository: every git command takes `-C <repo>`).

## The question

Do a Thumbnail's `description` (a Section accessory) and a MediaGallery item's `description` count
toward Discord's 4000-character Components V2 displayable-text total?

The website assumes they do not and sums Text Display `content` only. That assumption was never
tested against the live API.

## Why it is being asked now

The owner's selection of 2026-11-11: `steering/queue-hooks-rulings.md`, block "selections 1 to 4",
prompt 3. The option he chose, in full:

> "Agent: send on test server (Recommended)" — "Agent: I spawn a researcher session to send one
> sized message in the agents' test server and record the result. HTTP 200 means descriptions do not
> count; 400 with code 50035 means they do and the website's limit check is too generous, which
> comes back to you as a separate fix question. Assumption this choice does not ratify: that a
> webhook can be created there; if not, the researcher reports back."

## What to read

- The question as it stood: `git -C agent-output show a22fb73:OPEN_QUESTIONS.md`, the entry "one
  live send would close a four-month-old assumption". It was deleted from the file today because you
  now carry it.
- `agent-output/planning/closed/007-components-v2-displayable-text-limit.md` and
  `agent-output/analysis/closed/007-components-v2-displayable-text-limit-analysis.md`: where the
  assumption was taken and where the captured Discord rejection is quoted.
- `agent-output/architecture/system-architecture.md` and `agent-output/architecture/website.md`.
- `~/.claude/skills/discord-test-browser/SKILL.md`, section "While using it", and `test-estate.json`
  beside it: the test server (guild `1566742402180456559`) is the agents' own, a test may create a
  webhook there, and REST calls go as the test bot (`~/.claude-credentials/test_bot_token`, never
  printed). Its rules on updating `test-estate.json` and on sending nothing outside that server bind
  you. This session has no browser; none is needed for a REST send.

## Fence

- Sends go to the test server only. Nothing reaches any other server, DM or person.
- Read-only on `website`, `project-utils` and `preview-image-generator`. Your one output is a
  research document under `agent-output/research/`.
- No fix, no plan. If descriptions count, say so and stop; the fix question returns to the owner
  through this thread.

## Delivery

No stage consumes your document. Owner-needing items and blocks come to `steering-queue-hooks` by
SendMessage; so does one line when the document is committed, naming it and its commit, because
nothing else wakes this thread.

## Guidance that is this thread's, not the owner's

A 200 alone is ambiguous unless the same channel and sender are shown to return 50035 when Text
Display content alone breaches 4000. Record each request's status and error body verbatim.

## Not checked by this brief

- Whether a webhook may carry Thumbnail and MediaGallery components, and whether a webhook send and
  a bot send are counted the same way.
- Whether the test server has a channel suited to the sends.
- The 007 plan and analysis: cited by path, not read by this thread.
