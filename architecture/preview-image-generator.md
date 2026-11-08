---
Status: Active
Last Updated: 2026-11-08
Record-Type: owner-sourced architecture record
Repo: preview-image-generator (hooks-gg/preview-image-generator, branch `prod`)
---

# preview-image-generator — architecture record

## What this document is

The **why** behind the screenshot service, in the owner's own words. Companion to `system-architecture.md`, which states what it *is*. Construction rule, provenance grades and their decay rules are defined in `website.md` under "What this document is" and "How to read a provenance grade" — they govern this record identically and are not restated here.

Six questions asked and answered 2026-08-24.

---

## P-1 — The bar for replacing the service is a demonstration, not a prohibition

**Provenance**: owner-authored — **but read what it establishes, not what it sounds like.** **Asked**: is pixel-fidelity to the live editor a hard requirement — would a re-implementation that drifted slightly be a product failure — or is "close enough" acceptable, in which case the puppeteer route is replaceable rather than load-bearing?

> "I would have to see what "close enough" looks like, and since the current setup is working and the costs and infra are of no issue, I see little value in fixing what isn't broken."

**This does not establish pixel-fidelity as an invariant, and a record claiming it does would be wrong.** He declined to answer in the abstract. What he stated is two separable things:

1. **The bar for a replacement proposal**: a demonstration of what the drift actually looks like. A future chain may propose an alternative renderer; what it may not do is propose one without showing the drift. That is a burden of proof, not a prohibition.
2. **His current valuation**: the setup works, costs and infra are immaterial, so change has little value. **This is conditional on facts that can change.** If the service stops working, or costs or infra become an issue, the valuation he stated no longer applies — and it is his valuation, not a standing rule against change.

**This tightens `website.md` W-4 / D-003.** D-003 is graded *only path known* and marked "open to revisit on evidence". P-1 says what evidence: a demonstration of what "close enough" looks like. The two entries should be read together.

---

## P-2 — The dependency age is low-consequence for a structural reason, not by luck

**Provenance**: owner-authored. **Asked**: the service runs 2023 dependencies (puppeteer 21) while the website is on a current stack. Deliberately frozen because it works and touching it is risk for no gain, or simply un-updated because nothing forced it?

> "Nothing forced it. Since it uses the browser code, it doesn't need any tweaking or adjusting as the WYSIWG preview surface changes."

**One fact, not two.** It is *not* deliberately frozen — nothing forced an update. But the reason the staleness has cost nothing is architectural: the service screenshots the website's own `/preview` route, so it inherits every change to the preview surface for free and needs no adjustment when the editor changes. It is downstream of D-001's single-component-tree property (`website.md` W-3).

**What this governs**: the **functional-drift** risk from old dependencies is structurally nil, and will stay nil for as long as the reuse holds. **A change that broke the reuse would raise the dependency risk at the same moment** — those are one risk, not two, and a proposal that ends the reuse must price the toolchain update with it. Security and maintenance risk from 2023 dependencies on a live production service is a **separate** question this answer does not address and nobody has assessed.

---

## P-3 — Deploying by build-and-copy from a `prod` push is intended

**Provenance**: ⚠️ **confirmed inference**. He ratified a described mechanism; he did not state one.

**What he was shown, verbatim** (architect-hooks-015, selection prompt, 2026-11-08T05:18Z). This is everything he saw:

> Preview-image generator record (P-3): in August you approved "deploying is a git checkout on prod with no build step — the checkout is production". The workflow file says otherwise (read from prod.yml, not run): a push to prod installs packages, builds, copies the build into a separate deployed/prod folder, then reloads PM2. Is that build-and-copy route the one you intend?

> Selected: "Agent: record intended" — Agent rewrites P-3 to the build-and-copy route, with your answer as the ratification.

**The mechanism**, read from `prod.yml` and `.github/deploy.sh` at `471578f`:

1. A push to `prod` runs `prod.yml` on a self-hosted runner. `preview` runs `preview.yml` in the same way.
2. The runner runs `npm ci --omit=optional`, skipped on a lockfile-keyed cache hit, then `npm run build`.
3. `deploy.sh` replaces `deployed/<env>` with a copy of the built tree.
4. `deploy.sh` runs `pm2 startOrReload --update-env`.

Under this grade, re-verify the mechanism, not the agreement. If any part of the description is wrong, his answer does not repair that part.

**Correction note.** This entry replaces the 2026-08-24 version in place. That version ratified "a git checkout on `prod` … with no build step — the checkout *is* production". The plan 015 conformance pass found that description contradicted by `prod.yml` (AF-10). The superseded wording is in git history before this commit.

---

## P-4 — Public preview objects: one answer, two grades

**Provenance**: **split — read each half on its own terms.** **Asked**: preview JPEGs are uploaded `public-read`, so anyone with the URL can fetch one. Are previews meant to be public (unguessable URL as the only protection), or is that an artifact of getting it working?

> "A little of both. I don't know how you'd authenticate a preview image in a bucket, and the consequence of leak is miniscule considering the nature of the app and target audience (community leaders making announcements)"

- *"I don't know how you'd authenticate a preview image in a bucket"* — ⚠️ **only path known.** Signed URLs, a short-TTL token, or a proxied fetch through the app are **not violations of a decision**; they are alternatives he did not have in view. A proposal for any of them is not overturning an architectural choice.
- *"The consequence of leak is miniscule considering the nature of the app and target audience (community leaders making announcements)"* — **owner-authored risk acceptance, and scoped by its own reasoning.** It rests on **who the users are**. If the audience changes — private or regulated content, paying customers with confidentiality expectations, anything beyond community announcements — **the acceptance does not automatically carry**, because the premise it was granted on has changed. A later reader must not treat it as unconditional.

---

## P-5 — Keep-only-latest is intended, and there is no retention requirement behind it

**Provenance**: owner-authored. **Asked**: regenerating deletes the message's prior objects and a `previewImageNonce` cache-busts the new one. Is "keep only the latest, forever" the intended retention rule, or has retention never come up?

> "Intended. There's no purpose for retention."

**Deleting prior objects is the intended behaviour, and nothing is being retained *for* anything.** The consequence for a future chain runs the opposite way to how it would read if a purpose existed: a proposal to keep prior objects is **a new requirement to justify**, not the restoration of something the product wanted. Nothing here protects prior versions.

**Transcription note**: the answer first reached this record as *"There's purpose for retention"* — a one-word typo, corrected by the owner the same day (*"I typo'd \"There's no purpose for retention\""*). The correction inverts the meaning and is recorded in place rather than appended. See the limitation this instance established, in `website.md` under "What this document is".

---

## P-6 — A failed generation should leave a stale preview showing — and today it does not

**Provenance**: owner-authored (the intent). The mismatch below is this architect's, re-derived from the tree. **Asked**: if the generator is down or slow, what should the product do — show no preview, show a stale one, or block the save?

> "Show a stale one is fine."

**The save correctly does not block.** `shared.ts` `postMessagePreviewImage` is fire-and-forget (`void`, `catch (_) { /* pass */ }`), so a down or slow generator never delays or fails a save. That half matches his intent.

**The stale preview does not survive, and the mechanism is why.** Re-derived at `c85945f`:

- `upsertMessage` mints a fresh `nonce` on **every** save and writes it to `previewImageNonce` through `buildMessageValues` — **unconditionally, before and independently of the generation attempt**.
- The generation call is fire-and-forget: exceptions are swallowed and the response status is never checked, so a non-2xx (auth failure, generator error) is indistinguishable from success.
- Preview URLs are `previews/{id}/{nonce}.jpeg`. With the new nonce committed and no object written behind it, the emitted URL **404s**.
- The previous JPEG is still in the bucket, at the old nonce — but nothing points to it any more.

So a failed generation yields a **broken image, not a stale one**. Achieving his stated intent requires the nonce to rotate only on confirmed success, or the URL to fall back to the last known-good nonce. Registered as a Problem Area in `system-architecture.md`.

**Recorded here as the clearest instance of why this record earns its cost**: the defect was invisible for as long as nobody had written down what was supposed to happen. The code was self-consistent; only the stated intent made it wrong.

---

## Open questions for the owner

None outstanding at 2026-08-24.
