---
UUID: 61f24e56
Status: Open
Status-Detail: >-
  Owner-directed work on the hooks.gg side, agreed in shape but not yet built. A `valid` boolean is to be
  added to stored message records so Statbot can refuse messages hooks.gg already knows cannot be sent.
  The shape below was proposed by statbot chain 023's planner and accepted by the owner unaltered on
  2026-08-23; statbot chain 023 is proceeding in parallel against it as a settled contract. Nothing here
  is built yet. This document records what was agreed and why, so the hooks.gg implementation is not
  re-derived from a conversation.
Owning-Stage: >-
  Unassigned on the hooks.gg side. The work is a schema addition plus a backfill plus a recompute hook,
  not a design effort — the design is settled. Whoever plans it inherits the contract verbatim from the
  Agreed shape section and must not amend it without the owner, because a Statbot chain has already
  registered it as a decision (statbot agent-output, plan 023, register row D10).
Review-Trigger: >-
  Re-read this if the field's shape is questioned, if Statbot reports records arriving without `valid`
  after the backfill is believed complete, or if a second consumer beyond Statbot wants to key off
  message validity — the deliberate omission of per-reason detail is the first thing such a consumer
  will want revisited.
---

# Handoff — add a `valid` field to stored hooks.gg messages

**Raised:** 2026-08-23, by the owner, during statbot chain 023's planning.
**Counterpart record:** statbot agent-output, `planning/023-statrole-cv2-notification-refix.md`
(register rows D9 and D10). That chain is proceeding in parallel on the assumption this field will exist.
**Written by:** `steering-023` (statbot workspace steering thread), at the owner's direction. This
thread does not own the hooks.gg domain and has written nothing else here.

---

## Why this exists

Statbot maps stored hooks.gg messages into Discord sends. Some stored messages **cannot be sent** —
they are drafts a user saved in a state Discord will reject. That is reasonable on the hooks.gg side,
because the composer UI has extensive error notifications explaining why something cannot be sent.

The owner's framing, verbatim, 2026-08-23:

> "Let me phrase it this way, validation for compliance is on hooksgg. Statbot should not be concerned
> with revalidating that which should not have been broken in the first place."

> "Oh, users can save broken / incomplete messages, and that's resaonable on the hooksgg side because of
> the extensive UI error notifications that explain why something can't be _sent_. Right now, there's no
> way for hooksgg to communicate that a message is invalid. I think I need to pause this effort while I
> add a `valid` field to messages that Statbot can key off of."

> "Proceed as though hookgg has that valid field. Let's settle on a shape now, and 023 can proceed while
> I implement that in parellel."

**The gap is communication, not validation.** hooks.gg already knows which messages cannot be sent; it
just has no machine-readable way to say so. Without the field, Statbot's only options are to revalidate
(which the owner has ruled out as a boundary violation) or to attempt the send and fail.

### The concrete case that produced it

Stored message **5712**, guild `966088462803537960`, name "MOTM Chat":

```json
{ "flags": 32768, "content": "Complimenti {{user}} ! Sei il Member of The Month in …",
  "username": "…", "avatar_url": "…", "components": [] }
```

`flags: 32768` is `IS_COMPONENTS_V2`, but `components` is empty and `content` is not. Discord rejects
that combination — verified live by the owner on 2026-08-23, `400`, `code 50035`,
`MESSAGE_CANNOT_USE_LEGACY_FIELDS_WITH_COMPONENTS_V2`, the error naming `content`.

It happens to deliver correctly through Statbot today only because Statbot never reads the stored
`flags`. That is an accident, not a design, and any correction to Statbot's flag handling turns this
record into a live failure. It is exactly the record a `valid` field should mark `false`.

**Scale, measured:** a full sweep of all 444 guilds configuring hooks.gg for Statbot statroles —
1,976 stored messages, 444/444 responding, no errors — found **one** such record. The problem is real
but rare. (Instrument: statbot agent-output `user-files/023/hooksgg-sweep.js` → `r.json`, executed by
the owner, 2026-08-23.)

---

## Agreed shape

Proposed by statbot chain 023's planner, **accepted by the owner unaltered** on 2026-08-23 by selection
prompt. All six points were accepted as proposed; none was amended.

### 1. Name and placement

`valid: boolean`, on the **message record itself**, beside `id` and `name` — **not** inside `data`:

```json
{ "id": 5712, "name": "MOTM Chat", "valid": false, "data": { … } }
```

It describes the record, not the message content. Keeping it out of `data` means it can never leak into
what gets mapped or sent, and Statbot's existing `data` pass-through stays untouched.

### 2. Truth condition

`valid: true` **⇔** the message passes the same checks the composer UI already runs when it explains why
something cannot be sent.

**The field is those existing notifications made machine-readable — not a new validation regime.** If a
check does not already exist in the UI, it does not belong in this field.

### 3. Backfill

**Computed for all existing stored messages when the field ships** — all 1,976 records carry it from day
one. The owner chose this over leaving legacy records absent, so the field's meaning is uniform and
there is no mixed population to reason about.

### 4. Freshness

**Recomputed on every save.** The owner confirmed this. Statbot can therefore trust the value directly.

*Note carried from the agreement: this settles freshness only. Statbot's own gate stands regardless —
"trust it directly" is not a licence for Statbot to skip its check.*

### 5. Absent-field semantics

A record with **no `valid` key** is treated by Statbot exactly as it behaves today: full shape-faithful
mapping. **There is no flag day.** This field can ship before, during or after Statbot chain 023's
release and every combination is correct.

With backfill (3) and recompute-on-save (4), the absent case is a **rollout-window artifact, not a
steady state** — its lifespan is bounded by the backfill completing.

### 6. Deliberately not included

**No per-reason detail** (`errors: [...]`) on the record. Statbot keys off the boolean only; the reasons
live in the hooks.gg UI, where the user fixes them. This can be added later if a consumer ever needs to
display reasons — nothing in the agreed contract would change.

---

## What Statbot will do with it

Recorded here so the hooks.gg side knows what the field controls. Statbot's implementation is chain
023's, not this document's.

- **`valid: false` is rejected before any message processing**, on both consumers.
- **Test-notification path**: a clear non-5xx error to the dashboard, telling the user hooks.gg reports
  the message invalid and to fix it in hooks.gg. Never a 500, never a partial send.
- **Scheduled/worker path**: the notification is skipped — no crash, no partial send. A log line by
  default.
- The gate sits **before** the mapping path, so a `valid: false` record cannot fail on its way to being
  rejected.

---

## Known consequence, accepted

**When 5712 is marked invalid, guild `966088462803537960` stops receiving that notification.** Today it
delivers (by the accident described above); after the field ships and Statbot gates on it, it will not.

This is correct behaviour — the message genuinely cannot be sent as Components V2 — and it is resolved
by that guild's owner editing the message in the hooks.gg composer, not by any change in Statbot. It is
recorded here and in statbot plan 023 so it is never mistaken later for a regression introduced by
Statbot's chain.

---

## What this is NOT

**This field does not fix, and is not related to, the Statbot 500s currently affecting Components V2
Statrole notifications.**

Those messages are **valid**. A bare top-level Text Display carrying `flags: 32768` is well-formed
Components V2 and Discord accepts it — proven live by the owner on 2026-08-23, HTTP 200 on exactly that
shape. 16 stored messages across at least 9 guilds crash Statbot today because Statbot's own component
walk mishandles them, not because anything is wrong with the messages.

A correct `valid` field would mark all 16 of them **`true`**, and they would still fail. That defect is
Statbot's, and it is chain 023's core work. **Do not let this handoff be read as addressing it.**

---

## Open questions for the hooks.gg side

None blocking. Two worth a decision when the work is planned:

1. **Where the recompute hook attaches** — save path only, or also any path that can mutate a stored
   message outside a normal save (imports, migrations, admin edits). The agreement says "on every save";
   whether other mutation paths exist is a hooks.gg question this document cannot answer.
2. **Whether the backfill's result is spot-checked against the composer UI** before Statbot is told the
   field is live — the truth condition is defined by parity with the UI, and a backfill computed by a
   separate code path is the obvious place for that parity to drift.

---

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-08-23 | steering-023 | Created at the owner's direction, recording the `valid` field shape agreed during statbot chain 023 planning. Shape proposed by statbot's planner, accepted by the owner unaltered by selection prompt the same day (statbot plan 023, register row D10); his three framing statements quoted verbatim. Evidence cited rather than restated: message 5712's contents, the live `50035` rejection, and the 444-guild sweep are all owner-executed instruments recorded in the statbot agent-output repo. Written by a session that does not own the hooks.gg domain; nothing else in this repo was touched. |
