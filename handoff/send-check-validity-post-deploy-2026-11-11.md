---
UUID: 54673438
Status: Open
Status-Detail: "Carries chain 016's three post-deploy-observable register rows (B-3, B-4, B-6) from devops Stage 1, 2026-11-11T14:17Z. Nothing is released yet: the rows become decidable after the owner's release answer and the push. The reader is the UAT stage (a session, not a scheduled run); the owner is the fallback only."
Owning-Stage: uat (the executor named by QA's register rows B-3, B-4 and B-6; the owner as fallback only). devops closes the handoff on the executor's recorded results.
Review-Trigger: "when devops-hooks-016 records the push of website master to 395510e97f82a5177d5edbb38b5d44858f745f3d (git ls-remote origin refs/heads/master reads that SHA) and cues the UAT stage; the earliest-decidable condition is production serving that SHA, which B-3's fixed read itself shows"
---

# Handoff — chain 016 post-deploy rows B-3, B-4 and B-6 (the send check refuses what Discord refuses)

**Raised:** 2026-11-11T14:17Z, by `devops-hooks-016` at Stage 1 (devops.md Stage 1 step 8). Authority for the rows is the chain's one register, `qa/closed/016-send-check-validity-qa.md` § "Blocking-condition register", with UAT's copy in `uat/closed/016-send-check-validity-uat.md` (record `ceb9d93`). Each row below is carried in full from QA's cell and UAT's later block. No scheduled reader is installed: the readers are stages (the executor is the UAT stage), so there is no crontab line and no launcher brief. A row held by nothing else is held here.

**Release identifier the rows wait on:** website `master` → `395510e97f82a5177d5edbb38b5d44858f745f3d` (a fast-forward of `0e3d903ce98e108c7ca848b992ad89ac538f4b44`). Production is Vercel on a push of `master`. If a read shows the unfixed value soon after the push, the Vercel build may still be running; read again before calling it a failure.

## B-3 — the owner-reported defect is fixed in production (post-deploy-observable)

- **Condition:** on hooks.gg, a new V2 message with one fresh Text Display shows the Text Display reason line, and Send is disabled.
- **Instrument:** stage browser single look on `https://hooks.gg/message/m/new` → "My Account" (the page first shows a "Select a Server" picker; the executor chooses the entry as UAT did for draft 5996) → V2 → add Text Display; read the `.text-error` lines. Read-only: no Save, no Send. The test account's browser is the `discord-test-browser` skill.
- **Prediction:** **fixed**: the line "A Text Display is empty." is present. **Unfixed (`0e3d903`):** no line.
- **Unfixed value, recorded before release (UAT, 2026-11-11T14:07Z):** draft 5996, Components V2, edit mode, one empty Text Display (counter "1/40"): `ERR` [], no ring (`verification/016/uat/walk-production/prod_b3_unfixed.json`). The prediction "no line" held.
- **Failure mode:** if no line shows after deploy, production is not running the fix (or the Vercel build has not finished), or the fix does not reach the editor.
- **Closes on its fixed read:** `handoff/components-v2-emptiness-not-caught-by-the-send-gate-2026-08-26.md` (plan M3): `Addressed`, citing this row.

## B-4 — liveness beside B-3 (post-deploy-observable)

- **Condition:** in production, a filled V2 message (one Text Display "hello") still sends. The test account's own message, sent to the test-server webhook, returns success.
- **Instrument:** stage browser walk on hooks.gg as the test account, in B-3's session (B-3's refused member is the control). Send only to the agents' test server, as the test account: the webhook is the test bot's, in `#general` of guild `1566742402180456559`; delete the sent message afterwards.
- **Prediction:** Send enabled; Discord 200; message visible in `#general`.
- **Unfixed value:** none (the row has no unfixed limb). Locally, the filled V2 message sent at the tip (B-1, UAT, 2026-11-11T13:58:34Z, Discord message `1570075272257081487`).
- **Failure mode:** if a filled message cannot be sent, the change blocks every V2 user (the most-exposed class). The first action is the owner's: a Vercel promote of the previous deployment; the reversing patch is in the deployment record.

## B-6 — the preview image carries no validation chrome (post-deploy-observable)

- **Condition:** AC1b-4 in production: the preview image of a test-account V2 message saved on hooks.gg carries no red line or red border for (b) 41 components. Member (a), one unfilled Text Display, is clean before and after (QAF-11) and does not distinguish.
- **Subject (UAT-1 LOW, routed here):** the test account's message **5996** (named `uat-016-b6b-41-components`, 41 components: 39 Text Displays plus a Container holding one; the import caps the top-level array at 40). **Re-save 5996 after the deploy, then read its new image.** Its image URL is on `/message` as `cdn.hooks.gg/previews/5996/<nonce>.jpeg`. A save regenerates the image (UAT observed it for the unfixed tree).
- **Judged on the red border, not the text line.** The image is 192×224: at `0e3d903` it shows the red border and the "Message has 41 components; the limit is 40." line falls below the crop (UAT-1). So the fixed/unfixed call is the border: **fixed** = no red border around the components; **unfixed** = the border.
- **Unfixed value, recorded before release (UAT, 2026-11-11T14:11Z):** red border visible, text line outside the crop (`verification/016/uat/walk-production/b6b-unfixed-preview-5996.jpeg`, uncommitted by rule).
- **Instrument:** stage browser on hooks.gg as the test account: save, open the generated image, read it by eye (the Read tool on the downloaded image).
- **Failure mode:** if the border is still in the new image, production is not running M1b, or the image was not regenerated by that save (read the nonce in the URL: a new nonce means regenerated). M1 must never stay live without M1b (QA SE-6); a revert of M1b alone is not an option.
- **Limit (RK-5):** images generated before release keep their chrome until the message is saved again; that is not a failure of this row.

## How the rows are closed

The executor appends a changelog row per row with its fixed value beside the prediction and the unfixed value above. When all three are read, the executor sends devops one message; devops sets this handoff `Addressed`, closes the emptiness handoff on B-3, and moves both. A falsifier is an owner-needing item, routed through `steering-queue-hooks`. Nothing here holds the deployment record open.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-11T14:17 | devops-hooks-016 | Created at Stage 1 with B-3, B-4 and B-6 and UAT-1's border reading for B-6(b). No crontab line installed: the executor is the UAT stage. |
