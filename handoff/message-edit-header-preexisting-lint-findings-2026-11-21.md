---
UUID: b88e8be8
Status: Open
Status-Detail: "Five eslint findings in website src/app/message/m/[id]/_layout/Navigation.tsx (2 errors, 3 warnings) were already present at b829314. fix-get-one-absent-not-found left them untouched: shipped as is, recorded as debt. A later chain fixes them. Until then, convention-check reports 5 FAIL for any chain that touches the file."
Owning-Stage: steering (scopes a chain for it)
Review-Trigger: "when Navigation.tsx's avatar fallback, its unauthenticated name line or its File menu items are next edited, or when a chain touching Navigation.tsx meets these FAILs in convention-check"
---

# Handoff — website: five pre-existing lint findings in the message editor's header (`m/[id]/_layout/Navigation.tsx`)

## What is seeded

eslint reports five findings in `src/app/message/m/[id]/_layout/Navigation.tsx` (the `Navigation` component behind the edit
page's `Header`). All five are present at website `b829314`. Line numbers are given at `b829314` and at `b663b35`. The fix
inserted one line above the last three, which moved them down by one.

1. `@typescript-eslint/prefer-nullish-coalescing` (warning): `if (!avatar) { avatar = <div className="w-10" />; }`, the avatar
   fallback when there is no message or the session is still loading. Line 235 at both SHAs.
2. `@typescript-eslint/prefer-nullish-coalescing` (warning): `if (!avatar) { avatar = (<StyledLink …><Image … src={LOGO_IMAGE_URL} … /></StyledLink>); }`,
   the guild-message avatar fallback. Line 246 at both SHAs.
3. `@typescript-eslint/prefer-nullish-coalescing` (warning): `{message?.name ? message?.name : (isLoading ? ' ' : 'New Message')}`,
   the name line shown to a signed-out viewer. Line 318 at `b829314`, 319 at `b663b35`. **Not a mechanical fix**: `??` would show an
   empty string where the ternary shows `'New Message'` for a message whose name is `''`.
4. and 5. `react-hooks/refs` (error ×2): "Cannot access refs during render" at `{menuItems.map(…)}`. The source is `fileMenuItems`'
   `useMemo` dependency list `[hasChanged, message, nameRef.current]`, which reads a ref during render. Line 377 at `b829314`, 378
   at `b663b35`. The dependency is at line 177.

The work: make the file lint-clean on these rules without changing what the header does. Concretely: the avatar fallbacks, the
signed-out name line (including its empty-name case), and the File menu's Rename item focusing the name field. Fixing them was
outside the scope statement of `fix-get-one-absent-not-found`, which ships them unchanged. Convention-check reports the three
warnings as FAIL because the repository lints with `--max-warnings=0` (`package.json` `lint` script).

## Evidence

- Per-file eslint JSON, base and fix:
  - `verification/fix-get-one-absent-not-found/fixer/lint-base-Navigation.tsx.json`: at `b829314`, run in a detached
    `git worktree` export.
  - `lint-fix-Navigation.tsx.json`: at `b663b35`, the working tree equal to `b663b35` for this file.
  - Each shows 2 errors and 3 warnings, with the same rule ids.
- `node ~/.claude/tools/convention-check.js /usr/local/bin/hooks/website --since=b829314` at `b663b35`: 5 FAIL, the same five
  findings (`verification/fix-get-one-absent-not-found/fixer/convention-check.txt`).

## Origin

Raised by `fixer-fix-get-one-absent-not-found` (`implementation/fix-get-one-absent-not-found-implementation.md`, § Verification,
convention-check dispositions) when its convention check failed on lines the fix did not write. Steering ruled to ship as is and
record the debt (`steering/fix-get-one-absent-not-found-rulings.md`, block "2026-11-21T09:16Z"). That ruling applies the owner's
selection on the same case for `NewMessageModal.tsx`, whose debt is carried by
`handoff/newmessagemodal-preexisting-react-hooks-lint-errors-2026-11-21.md`.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-21T09:16 | fixer-fix-get-one-absent-not-found | Opened on steering's 09:16Z ruling: five eslint findings, present at `b829314`, left untouched by fix-get-one-absent-not-found. |
