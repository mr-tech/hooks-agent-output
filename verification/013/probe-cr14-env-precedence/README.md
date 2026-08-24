# probe-cr14 — which `DATABASE_URL` does a process actually get?

**Built for**: the **M8-G** round, not for a verdict on any tree. It establishes the mechanism the
M8-G safety constraint rests on, before that round needs it.

**Not tree-indexed.** It measures loader behaviour (`dotenv`, `@next/env@16.1.6`), which is a
property of the dependencies, not of the chain branch. It does not expire when `website` moves; it
expires when either loader is upgraded. Re-run it if `next` or `dotenv` changes version.

```bash
node /usr/local/bin/hooks/agent-output/verification/013/probe-cr14-env-precedence/env-precedence.cr14.js
```

**Result: OK** (`run-cr14.txt`). Exits non-zero if the constraint stops being sound.

## No credential is read

Every fixture is synthetic. `website/.env.local` is **never loaded, parsed, or printed** by this
probe. It was characterised only by counting key names with values redacted
(`grep -n DATABASE_URL .env.local | sed 's/=.*/=<REDACTED>/'`), which is how the correction below
was established. Steering asked that the file not be read further than establishing the count, and
it was not.

## What it establishes

| question | answer |
|---|---|
| is a `#`-commented entry ever selected? | **No** — at any position, indented or not |
| two **active** entries, which wins? | **last-wins** |
| does explicit `process.env` survive `dotenv.config()`? | **yes** (default `override:false`) |
| …survive `dotenv.config({override:true})`? | **NO — this form defeats the constraint** |
| …survive `@next/env` `loadEnvConfig`, the loader Next 16.1.6 actually uses? | **yes** |

## The correction this probe carries

`steering-hooks-013-2` reported that `website/.env.local` carries **two** `DATABASE_URL` entries and
inferred that *"which one an ambient-env process picks up depends on the loader's precedence"*, so a
run avoiding one could still reach a live database.

**The count is right; the inference does not follow.** The two occurrences are at lines 16 and 18,
and **line 18 is `#`-commented**. Section A above shows a `#` entry is never selected by any loader
here, so **there is exactly one selectable entry** and no precedence question arises between them.

**The operational instruction survives, for a stronger reason than the one given.** The single
selectable entry is the remote hosted database. So inheriting the file or the ambient env reaches a
live database with **certainty**, not by ambiguity. That is a worse hazard than the one described,
and it argues for the same discipline.

## What this does NOT establish — read before citing it

- **It does not make the M8-G oracle unnecessary.** Section C shows one reachable form
  (`override:true`) that clobbers an explicit setting. Any loader in the path could use it. So
  "I set `DATABASE_URL` to a dead port" is **necessary and not sufficient**: the negative must
  still be asserted **on the persistence surface** (no `message.upsert` before a choice), which is
  what actually proves nothing was written.
- **It does not cover every route to a connection.** A hardcoded URL, a second env var consumed by
  the DB client, or a connection built from parts would all be invisible to it. The predicate is
  the literal key `DATABASE_URL`.
- **It says nothing about whether the dead port is genuinely dead** on the box at run time. Check
  that in the round, not from here.
