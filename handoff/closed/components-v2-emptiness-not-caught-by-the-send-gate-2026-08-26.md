---
UUID: 14b1eac9
Status: Addressed
Status-Detail: >-
  Addressed by chain 016 (plan M3), released website master 395510e; B-3's fixed read on hooks.gg (uat, 2026-11-11T18:35Z, handoff/send-check-validity-post-deploy-2026-11-11.md) shows "A Text Display is empty." for the owner's instance. The text below is as written 2026-08-26.
  A Components V2 message can be assembled in the composer in a state Discord rejects on send, and
  the send gate does not catch it. The owner's instance: a V2 message whose only component is an
  EMPTY Text Display. Empty `content` and empty embeds ARE caught by the existing gate; the V2
  emptiness equivalent is not. This is stated as an owner observation of live behaviour, not as a
  derived conclusion - see "What is established and what is not" below. Nothing here is diagnosed:
  no agent has read the gate for this question, and the class of invalid V2 configurations has NOT
  been enumerated. The one instance is known; the class is not.
Owning-Stage: >-
  Unassigned. The next step is establishing the CLASS - which V2 configurations Discord rejects -
  and only then a gate change; the fix shape cannot be chosen before the class is known, because a
  gate that special-cases the empty Text Display would leave every sibling shape unguarded.
  Deliberately NOT scoped, diagnosed or routed to an implementer here: steering performed no
  investigation, and a handoff that guesses at a mechanism sends its reader looking in the place the
  guess names. NOTE THE CONSTRAINT on how the class may be established - see below.
Review-Trigger: >-
  Re-read this if a user reports a V2 message failing to send with no explanation from the UI, if
  work is proposed on the composer's send gate or on `validateContentRequirements`, if the set of
  supported V2 component types changes, or if anyone proposes determining Discord's acceptance rules
  by sending live messages.
---

# Handoff — Components V2 emptiness is not caught by the composer's send gate

**Raised:** 2026-08-26, by the owner, in the steering session `steering-hooks-012-2`.

## What he observed

His words, recorded verbatim because he is the instrument here and there is no better source:

> "checking which component v2 configurations are valid (namely, emptiness), for instance, a V2
> message with only an empty Text Display errors on send, and the UI doesn't catch this like empty
> content / embeds."

Two distinct things are in that sentence and they are worth separating:

1. **A specific instance.** A V2 message whose only component is an empty Text Display **errors on
   send**. Observed.
2. **An asymmetry.** The composer already refuses to send on empty `content` and empty embeds. It
   does not refuse on this. Observed.

The general question he is raising is broader than the instance: **which Components V2
configurations are valid at all**, with emptiness as the first family worth settling.

## Why this is not the same as anything chain 012 fixed

Chain 012 changed this exact gate, which is why the adjacency matters and why it is easy to assume
this is already covered. **It is not.**

- Plan 012's **M2** made the send gate decide **one** class: a message whose `flags` carry the
  Components V2 bit while its components are structurally classic — the "stranded" disagreement.
  See `planning/closed/012-message-valid-field.md` (M2, and register rows **D5** and **D8**).
- **This is a different class in the same gate.** Here the flag and the structure agree — the
  message genuinely is V2 — and the defect is that its *contents* are empty in a way Discord will
  not accept. 012's fix does not reach it and was never claimed to.

The adjacent-but-distinct question chain 012 *did* leave open is register row **D14** and QA row
**R20**: structurally-V2 records with non-empty but **whitespace-only** `content`. That family was
measured empty for the corpus at the time and deliberately left undetermined in general. **Empty vs
whitespace-only vs structurally-absent are three different things and should not be collapsed.**

## The constraint on establishing the class — read this before planning any instrument

**No agent on this machine may determine Discord's acceptance rules by sending a live message.** A
live POST is a standing prohibition with no approval path; plan 012 registered this explicitly at
**D14**, where the same temptation arose and was refused. The owner is the only party who sends.

This is the reason the class is unenumerated, and it is not an oversight to be corrected by being
more thorough. Whatever instrument is proposed must establish the class from documentation, from
the API's published rules, from observed rejections the owner has already collected, or from the
product's own model — **not by probing Discord.**

**Reconcile note, 2026-11-11 (`steering-queue-hooks`).** The section above was true when written:
in August no agent could send anywhere. The owner's global instructions now make the Discord test
server (guild `1566742402180456559`) the agents' own, and on 2026-11-11 he selected an agent send
there (`steering/queue-hooks-rulings.md`, prompt 3). A researcher then measured two acceptance
rules by live sends in that server: `research/components-v2-description-text-limit-2026-11-11.md`.
So the class can now be established by sends in the test server and nowhere else. One member is
measured and being fixed separately: a Thumbnail or MediaGallery description over 1024 characters is
refused (that document's F-6). Whether Discord refuses an empty-string description is its N-4,
not measured. Nothing else in this handoff is changed or answered by this note.

**Reconcile note, 2026-11-11, second (`steering-queue-hooks`).** The class is now measured:
`research/closed/components-v2-send-validity-2026-11-11.md` (76 shapes sent in the test server, 52
refused). It answers the "NOT established" list below except the count of stored records, which no
agent reads. It also settles two older points: Discord accepts whitespace-only top-level content
beside V2 components (plan 012 D14, QA R20; its F-8) and refuses an empty-string description (its
F-6). The owner chose one send-check fix covering these and the 1024 bound
(`steering/queue-hooks-rulings.md`, selection 14); this handoff stays open until that fix is
released.

## What is established and what is not

**Established:** the single instance, by the owner's own observation.

**NOT established, and no agent has looked:**

- Whether the gate has any notion of V2 emptiness at all, or has one that this shape slips past.
- Whether other V2 component types behave the same way when empty, or whether Text Display is
  special.
- What Discord actually returns for this send, and whether it is the same rejection class as the
  `50035` seen elsewhere on this work.
- Whether any stored record is currently in this state. **Nobody has counted.**
- Whether the composer's existing empty-`content` and empty-embed checks share a code path that the
  V2 case could reuse, or whether they are structurally separate.

**Do not treat any of the above as answered by this document.**

## Where a reader should start

Cited rather than summarised, because these are the authorities and this document is not:

- `planning/closed/012-message-valid-field.md` — M2 for what the gate now does, D5 and D8 for why
  the fix lives in the composer's own gate, D14 for the live-POST prohibition and the whitespace
  family.
- `qa/closed/012-message-valid-field-qa.md` — row R20 and the frozen cell partition, which is the
  nearest existing enumeration of V2 shapes and the obvious thing to extend rather than replace.
- `architecture/013-components-v2-editing-surfaces-architecture-findings.md` and
  `architecture/website.md` — the V2 editing surfaces and how mode is modelled.

## What this document does NOT claim

- **It does not name a file, a function or a cause.** The gate's module is identifiable from plan
  012's M2 by anyone who needs it; naming it here would be steering asserting a diagnosis it has not
  made.
- **It does not size the work or propose a fix shape.** Both depend on the class, which is unknown.
- **It does not claim severity.** Whether this is user-visible pain or an edge case depends on how
  many real records sit in the state, and nobody has counted.
- **It does not reopen chain 012**, which is released, declared live and fully closed.

## Closure (devops, 2026-11-11T18:44)

The owner's instance (a V2 message whose only component is an empty Text Display) now shows the reason line "A Text Display is empty." in production, with the unfixed read (no line, 0e3d903, 2026-11-11T14:07Z) recorded beforehand: B-3 EXECUTED, PASS at website master `395510e`, UAT's changelog row of 2026-11-11T18:35 in `handoff/send-check-validity-post-deploy-2026-11-11.md`. The class was established by the researcher's measurement (`research/closed/components-v2-send-validity-2026-11-11.md`) and fixed by chain 016 (deployment record `deployment/closed/016-send-check-validity-deployment.md`). Plan 016's stated limits (RK-1, RK-3 to RK-5, X-1 to X-11) are carried in that plan and its handoffs, not here.
