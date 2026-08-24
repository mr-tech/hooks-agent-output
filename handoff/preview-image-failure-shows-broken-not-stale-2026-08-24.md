---
UUID: e6ac06b5
Status: Open
Status-Detail: >-
  A live defect in `preview-image-generator`'s integration, found by writing the owner's intent down
  rather than by anything failing. He stated what should happen when preview generation fails; the
  tree does something else. Nothing is built, nothing is committed to, and no chain is minted — the
  owner ruled this a handoff rather than a chain because it belongs to a different service from the
  effort in flight. The mechanism below was established by `architect-hooks-013` and has NOT been
  re-derived by the thread that wrote this document.
Owning-Stage: >-
  Unassigned. The next step is implementation, not research: the owner has already stated the
  intended behaviour, so what is missing is a fix and a decision about failure visibility, not an
  investigation of what the product should do. Chain 013 proceeds without this and does not touch it.
Review-Trigger: >-
  Re-read this if anyone reports missing or broken preview images, if the generator service is
  restarted, redeployed or has its credentials rotated (each is a window in which every save during
  the outage rotates a nonce with nothing behind it), if anyone proposes changing the nonce or
  retention behaviour, or before anyone proposes replacing the generator service — the failure path
  is part of what a replacement has to reproduce.
---

# Handoff — a failed preview generation shows a broken image, not a stale one

**Raised:** 2026-08-24, by `architect-hooks-013`, while building
`agent-output/architecture/preview-image-generator.md` from the owner's answers.
**Written by:** `steering-hooks-013`, at the owner's direction (*"You write it. This isn't a research
doc. It's just a record of the gap and context around it."*). **Nothing here was derived by this
thread.** The mechanism is the architect's, established first-hand from `website` at `c85945f` and
committed in the architecture record; it is reproduced here as pointers, and whoever picks this up
re-derives it rather than inheriting it from this document.

---

## What the owner said

Asked what the product should do if the generator is down or slow — show no preview, show a stale
one, or block the save — he answered, verbatim:

> "Show a stale one is fine."

That answer settles the product question. It is not a request for an investigation and it is not
ambiguous. It is recorded in `architecture/preview-image-generator.md` as owner-authored.

## What the tree does instead

Three facts, all the architect's, from `website` at `c85945f`:

1. `upsertMessage` mints a fresh `nonce` on **every** save and commits it to `previewImageNonce` via
   `buildMessageValues` — unconditionally, **before and independently of** the generation attempt.
2. `postMessagePreviewImage` is fire-and-forget: `void`, `catch (_) { /* pass */ }`, and the
   **response status is never checked**. A non-2xx — auth failure, generator error, service down — is
   indistinguishable from success at the call site.
3. Preview URLs are `previews/{id}/{nonce}.jpeg`. A new nonce is committed with no object behind it,
   so the URL **404s**. The previous JPEG is still in the bucket at the old nonce, now unreferenced.

So the failure mode is a **broken image**, not a stale one. The half of his answer that does hold is
the other half: the save never blocks and never slows, whatever the generator does.

**The defect is invisible from the code alone.** Every one of those three behaviours is reasonable in
isolation and the whole is self-consistent. Only the stated intent makes it wrong — which is the
argument for owner-sourced architecture records, and is recorded as such in the record itself.

## Fix shape, as the architect stated it

Rotate the nonce only on confirmed success, or fall back to the last known-good nonce. Registered in
`architecture/preview-image-generator.md` as a Problem Area and as Recommendation 4.

## Open questions this document does not answer

Named because they bear on the fix and nobody has established them. **Do not treat any of these as
findings.**

- **Does the fallback have anything to fall back to?** The owner ruled retention deliberately absent
  — *"Intended. There's no purpose for retention."* — and regenerating deletes the message's prior
  objects. The architect's observation that the previous JPEG survives a failure is consistent with
  the delete being part of the generation path that never ran, but **that has not been established**.
  If the delete happens anywhere that runs regardless of generation outcome, "fall back to the last
  known-good nonce" has nothing behind it and only the rotate-on-success shape works. Establish which
  before choosing between the two shapes.
- **How often does this happen?** Unknown, and **not measurable from what exists**: the response
  status is discarded, so no failure is recorded anywhere. Whether failures should become visible —
  logged, surfaced, alerted — is a product question nobody has put to the owner, and it is separable
  from the fix.
- **Does the same path serve every write?** `upsertMessage` is reached from several call sites and
  chain 013 is changing some of them. Whether they all mint a nonce the same way has not been checked.

## Related, and deliberately not folded in

- **`preview-image-generator` runs 2023 dependencies (puppeteer 21) on a live production service.**
  The owner's answer that nothing forced an update retires the *functional drift* risk — the service
  reuses the browser code, so it tracks the preview surface for free — but it does not speak to
  security or maintenance exposure, which nobody has assessed. Recorded separately as Recommendation
  5 in the master architecture document. It is a different question from this one and should not be
  bundled into a fix for it.
- **Preview objects are `public-read`.** The owner accepted that risk explicitly, scoped to the
  current audience. Not in question here; noted so that whoever touches the bucket path knows the
  acceptance exists and knows what it rests on.

## Sources

- `architecture/preview-image-generator.md` (`2d4fc6e`) — the mechanism, the owner's six answers
  verbatim with provenance grades, the Problem Area and Recommendation 4. **The authority for
  everything in this document.**
- `architecture/system-architecture.md` — the preview pipeline end-to-end, and Recommendation 5.
