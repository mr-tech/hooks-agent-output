---
UUID: 215003eb
Status: Open
Status-Detail: >-
  A test file (`website/src/utils/__tests__/message-init-route0.test.ts`) pinned a bug in its own
  transcription of MessageProvider's route-0 mount-effect logic, not in the production module
  itself — the file imported nothing from `~/` or `bot/`. The pin is deleted by plan 014 (D2: delete
  the pin, log the bug, no bug fixes in a test-cleanup chain). Whether the defect is live in
  production was NOT verified by chain 014 (out of scope by ruling); an informal, non-authoritative
  observation is recorded below and should not be read as a verification.
Owning-Stage: >-
  Unassigned. Next step, if anyone picks this up: read `src/providers/MessageProvider/index.tsx`'s
  route-0 mount effect against the informal observation below and decide whether a fix is still
  needed, then write a real covering test under `~/providers/MessageProvider` that imports the
  production module (this deleted file never did).
Review-Trigger: >-
  Re-read this if a user reports cached local message edits disappearing after a refresh at
  `/message/m/0`, or if anyone proposes writing a new test for MessageProvider's route-0
  initialization.
---

# Handoff — a pinned "cached edits lost at route 0" bug, deleted by test-suite cleanup

**Raised:** 2026-08-27, by `implementer-hooks-014`, plan 014 M4b (row 43), on D2.

## What the deleted test claimed

The file's own header and its one `BROKEN`-titled case, quoted verbatim (case title and inline
comment):

> `it('BROKEN: unconditional copyIntroMessage() replaces cached edits', ...)`
> `// This is the current bug — cached edits are lost`

The file's header framed the claim as: refreshing `/message/m/0/send` while not logged in replaces
locally cached message edits with the default intro message, because (its words) "the mount effect
unconditionally calls `copyIntroMessage()` instead of checking localStorage first."

## Why this chain deletes it rather than fixes it

Plan 014 (Hooks test-suite cleanup) ruling D2: a test pinning a known-unfixed bug is deleted, and
the bug is logged here instead — no bug fixes happen inside a test-cleanup chain. Separately, the
file is disposed of under class H7 (zero-production-import transcription): it imported nothing from
`~/` or `bot/` at all. Its `copyIntroMessage` and `selectInitialMessage` were **local
re-implementations** of production names, not the production functions — so even where the file
passed, it was never exercising `src/providers/MessageProvider/index.tsx`. The seven other cases in
the file (a "FIXED" ternary branch, two `localStorage`-shaped round-trip cases, and others) tested
the same local transcription, not the module.

## What is established and what is not

**Not verified by this chain — out of scope by ruling, stated so a later reader does not read
silence as confirmation either way.** No test was run against production code to determine whether
the described defect is currently live.

**An informal observation, made in the course of dispositioning this file, offered as a lead and
not as a verification:** `src/providers/MessageProvider/index.tsx`, in the mount effect gated on
`paramMessageId === '0' && !messageCode`, currently reads:

```ts
const local = localMessageStore.current;
const tmp = local.id ? copyIntroMessage() : local;
```

That is the **ternary** form the deleted test's own "FIXED" cases described as correct — not the
unconditional `copyIntroMessage()` the "BROKEN" case named. Whoever picks this up should not take
that as proof the bug is fixed: reading one `useEffect` in isolation does not establish what
`local.id` and `local` actually hold at runtime, what `localMessageStore.current` resolves to before
this effect runs, or whether a different code path (e.g. the initial value from
`useLocalMessageStore` in `src/utils/hooks/useLocalStorage.ts`) reintroduces the same loss earlier
in the chain. It is a lead for the next investigation, not a closed question.

## Surface with no covering test

No surviving test in the suite imports `src/providers/MessageProvider/index.tsx` and exercises its
route-0 mount-effect initialization logic specifically (checked: `grep -rl 'MessageProvider'
src --include='*.test.ts*'` names six files, none of which cover this effect — they cover hash
parity, toast rendering, and a JSON editor repair path). This surface is recorded here per plan 014
AC3 rather than silently dropped.
