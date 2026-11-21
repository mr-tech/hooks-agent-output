---
UUID: 7ca5ab96
Status: Open
Status-Detail: "Three eslint errors in website NewMessageModal.tsx, present at f4baebb and left untouched by fix-import-save-conflict (shipped as is, recorded as debt). A later chain fixes them; until then convention-check reports 3 FAIL for any chain that touches the file."
Owning-Stage: steering (scopes a chain for it)
Review-Trigger: "when NewMessageModal.tsx's guild-selection effects or its page Transition refs are next edited, or when a chain touching NewMessageModal.tsx meets these FAILs in convention-check"
---

# Handoff — website: three pre-existing react-hooks lint errors in `NewMessageModal.tsx`

## What is seeded

In `src/app/message/_components/NewMessageModal.tsx`, eslint reports three errors, all already present at website `f4baebb`:

1. `react-hooks/set-state-in-effect`: the effect that copies the loaded message's guild into `setSelectedGuildId` (`useEffect(() => { const gId = webhook?.guild_id ?? discordMessage?.guildId ?? commandMessage?.guildId ?? null; if (!guildId && gId) setSelectedGuildId(gId); }, …)`). Line 107 at both `f4baebb` and `fb1140f`.
2. `react-hooks/set-state-in-effect`: `useEffect(() => { if (guild) setSelectedGuildId(guild.id); }, [guild]);`. Line 146 at `f4baebb`, 161 at `fb1140f`.
3. `react-hooks/refs`: refs read during render, at the page-1 `<Transition ref={menuRefs[1]} …>` (from the `menuRefs` record). Line 383 at `f4baebb`, 405 at `fb1140f`.

The work is to make the file lint-clean on these three rules without changing what the dialog does: the guild picked up from a loaded message or webhook, and the two-page transition. Fixing them was outside the scope statement of `fix-import-save-conflict`, which ships them unchanged.

## Evidence

- Per-file eslint, base and fix: `verification/fix-import-save-conflict/lint-base-NewMessageModal.tsx.json` (at `f4baebb`, run in a detached export) and `lint-fix-NewMessageModal.tsx.json` (at `fb1140f`). Each shows 3 errors with the same three rule ids.
- `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=f4baebb` at `fb1140f`: 3 FAIL, the same three errors (`verification/fix-import-save-conflict/convention-check.txt`).
- Steering's refutation helper reproduced them at both `f4baebb` and `3c6f16f` (`steering/fix-import-save-conflict-rulings.md`, block "2026-11-21T08:13Z").

## Origin

Raised by `fixer-fix-import-save-conflict` (`implementation/fix-import-save-conflict-implementation.md`, § Open questions) when its convention check failed on lines the fix did not write. The owner chose to ship as is and record the debt, by selection prompt, recorded in `steering/fix-import-save-conflict-rulings.md` block "2026-11-21T08:13Z".

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T08:17 | fixer-fix-import-save-conflict | Opened on steering's 08:13Z relay: three eslint errors, present at `f4baebb`, left untouched by fix-import-save-conflict. |
