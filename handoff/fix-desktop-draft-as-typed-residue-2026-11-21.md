---
UUID: 9e2b7c14
Status: Open
Status-Detail: "Two limits that fix-desktop-draft-as-typed ships with, unmeasured and unobserved: the per-keystroke draft-write cost on desktop, and caret behaviour in browsers other than Chrome. Neither gates the release; neither is a finding of the chain."
Owning-Stage: planner
Review-Trigger: "when the draft store (src/utils/messageDrafts.ts) or its 1 MiB bound is next changed, or when a report of typing lag in the message editor on desktop, or of a jumping caret in the embed author name or footer in Firefox or Safari, reaches the owner or a stage"
Secret-Files: none
---

# fix-desktop-draft-as-typed residue (cost and browsers)

## What is seeded

The fixer chain `fix-desktop-draft-as-typed` makes desktop write the message draft as it is typed (content editor, embed author name,
footer text), as mobile already does. Two limits it ships with:

1. **Per-keystroke draft-write cost on desktop is unmeasured.** Each change of `message` runs `writeDraft`: a whole-map `JSON.parse`,
   two `JSON.stringify`, `setItem` and a synchronous `storage` event, and route 0 adds a second `setItem`. Plan 017's figures
   (17.2 ms / 5.1 ms at 7.4 MB, bound 1 MiB, `planning/closed/017-existing-items-backlog.md` M3) were not re-measured. Source:
   fixer's outstanding item 3 (`implementation/closed/fix-desktop-draft-as-typed-implementation.md`), the brief's hazard 1, QA's
   Residue (`qa/closed/fix-desktop-draft-as-typed-qa.md`: "no lag on a short message, which is not a measurement"). A debounce is
   OUT of the chain's scope (rulings block 2026-11-21T10:43Z, Exclusions: his words "as mobile does"); a measured cost that needs one
   returns to the owner through steering.
2. **Browsers other than Chrome were not observed.** QA's walk was Chrome only. Caret behaviour of the author-name and footer
   `contenteditable` under the per-keystroke round trip, and Slate's per-change emit, are unobserved in Firefox and Safari.

**Falsity signature.** (1) typing in a long message with a draft map near the bound lags visibly on desktop; (2) the caret jumps to
the start after each character in the author name or footer in a non-Chrome browser.

**Next step, if picked up:** a measurement of `writeDraft` at the bound in a desktop browser (read-only, local build, the `Messages_id_seq`
restart in `CLAUDE.md` before any save), or a walk in Firefox. Whether either is worth planning is the owner's.

## Changelog

| Date (UTC) | Agent | Change | Token |
|---|---|---|---|
| 2026-11-21T11:28 | devops-fix-desktop-draft-as-typed | Created at Stage 1 to carry the chain's two stated limits. | opened |
