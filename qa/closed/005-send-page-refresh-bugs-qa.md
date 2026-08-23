---
ID: 5
Origin: 5
UUID: b8d4f2a3
Status: QA Failed
---

# QA Report: Send Page Refresh Bugs (id=0, not logged in)

**QA Status**: QA Failed
**QA Specialist**: qa

## Changelog

| Date       | Agent Handoff | Request                                           | Summary                                                                              |
| ---------- | ------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 2026-04-07 | User          | Investigate two bugs on /message/m/0/send refresh | Root-caused both issues; one is a real code bug, one is a browser extension artifact |
| 2026-04-07 | User          | Bug still reproduces on reload                    | Deep-dive into data flow; wrote 8 automated tests; confirmed fix is correct          |

## Timeline
- **Test Strategy Started**: 2026-04-07
- **Testing Started**: 2026-04-07
- **Testing Completed**: 2026-04-07
- **Final Status**: QA Failed — code bug confirmed in uncommitted changes

---

## Bug 1: Local message cache replaced with default on refresh

### Status: **CONFIRMED BUG** — requires implementation fix

### Root Cause

An uncommitted change in `src/providers/MessageProvider/index.tsx` replaced `useMount` (from `react-use`) with `useEffect([paramMessageId])` and **simultaneously removed the local storage check**.

**Before (committed at HEAD `7cc7bfc`):**
```js
useMount(() => {
  if (paramMessageId === '0' && !messageCode) {
    const tmp = localMessageStore.current.id ? copyIntroMessage() : localMessageStore.current;
    setMessage(tmp);
    setSavedMessage(tmp);
  }
});
```

**After (uncommitted working tree):**
```js
useEffect(() => {
  if (paramMessageId === '0' && !messageCode) {
    const tmp = copyIntroMessage();
    setMessage(tmp);
    setSavedMessage(tmp);
  }
}, [paramMessageId]);
```

### Analysis

The original logic in the ternary `localMessageStore.current.id ? copyIntroMessage() : localMessageStore.current` is intentional and correct:

| `localMessageStore.current.id` | Meaning                                                                                           | Behavior                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **Falsy** (undefined)          | Local message is a local-only edit (id=0 route, never saved to DB)                                | Use cached local message — preserves user edits |
| **Truthy** (e.g. `"abc123"`)   | Local message came from a saved DB message (user was previously editing `/message/m/abc123/edit`) | Discard it; create fresh intro for id=0 route   |

The `useMount` → `useEffect` change itself is fine (both fire on mount; `paramMessageId` is static from the route). The bug is the removal of the conditional: the new code **always** calls `copyIntroMessage()`, discarding any locally cached edits.

### Required Fix

Restore the local storage check inside the `useEffect` (line ~135 of `src/providers/MessageProvider/index.tsx`):

```js
useEffect(() => {
  if (paramMessageId === '0' && !messageCode) {
    const local = localMessageStore.current;
    const tmp = local.id ? copyIntroMessage() : local;
    setMessage(tmp);
    setSavedMessage(tmp);
  }
}, [paramMessageId]);
```

#### Why this works — full data flow trace

On page refresh at `/message/m/0/send`:

1. **`useLocalStorage('message', copyIntroMessage())`** initializes:
   - `store = withLocalStorage('message', default)` — wraps localStorage
   - `current = useState(store.get())` — during client hydration, `store.get()` reads localStorage (because `typeof window !== 'undefined'`)
   - So `localMessageStore.current` = **real localStorage contents** (user's cached edits)

2. **Mount effect fires** (`useEffect([paramMessageId])`, fires once since `paramMessageId='0'` is static):
   - `localMessageStore.current` is the cached edited message (no `id` field for route-0 edits)
   - `local.id` → `undefined` (falsy) → uses `local` → preserves edits ✓

3. **`[message]` effect fires** after re-render:
   - `localMessageStore.set({...message})` writes the edited message back to localStorage
   - No data loss ✓

The `useMount` → `useEffect` conversion itself is fine — `useMount` from `react-use` is just `useEffect(fn, [])`. The only bug is the removal of the conditional check.

#### Automated test verification

Test file: `src/utils/__tests__/message-init-route0.test.ts` (8 tests, all passing)

Covers:
- **Broken path**: `copyIntroMessage()` always replaces cached edits
- **Fixed path**: ternary preserves cached local edits when `id` is absent
- **Edge case**: ternary correctly returns fresh intro when `id` is present (prevents leaking saved messages to route 0)
- **First visit**: correctly shows default intro when localStorage is empty
- **localStorage round-trip**: JSON serialization preserves message structure and `id` field presence/absence

### Reproduction Steps

1. Open `/message/m/0/edit` (not logged in)
2. Edit the message content (e.g., change the intro text)
3. Navigate to `/message/m/0/send`
4. Observe: the locally cached edits are replaced with the default intro message
5. Navigate back to `/message/m/0/edit` — edits are gone

### User Impact

**High** — Any unauthenticated user who edits a message and then goes to the Send page (or refreshes) loses all their work. This is the primary workflow for unauthenticated users.

---

## Bug 2: Hydration mismatch (`abId*` IDs on div elements)

### Status: **NOT A CODE BUG** — browser extension artifact

### Evidence

The mismatched `id` attributes follow the pattern `abId0.<random float>`:
- `id="abId0.2917944581902927"`
- `id="abId0.8495523060974363"`
- `id="abId0.38537030542046935"`

These IDs:
1. Do not appear anywhere in the source code (`grep` returns zero matches outside `.next/dev/logs/`)
2. Are not generated by `react-aria`'s `useId()` (which produces deterministic IDs)
3. Are not in `extractDataProps()` output (which only extracts `data-*` prefixed props)
4. Match the known pattern of **AdBlock Plus** browser extension, which injects `id` attributes with `abId` prefix + `Math.random()` for element tracking
5. The React hydration error message itself states: *"It can also happen if the client has a browser extension installed which messes with the HTML before React loaded."*

### Recommendation

No code change needed. If the warning is annoying during development, the user should disable the ad blocker extension on localhost. Adding `suppressHydrationWarning` to the `TextField` wrapper div could silence it, but that would mask legitimate hydration issues.

---

## Test Strategy

### Automated Unit Tests

**Test file**: `src/utils/__tests__/message-init-route0.test.ts`
**Command**: `npx vitest run src/utils/__tests__/message-init-route0.test.ts`
**Status**: 8/8 PASS

| Test                                                                        | Status              |
| --------------------------------------------------------------------------- | ------------------- |
| BROKEN: unconditional copyIntroMessage() replaces cached edits              | PASS (confirms bug) |
| FIXED: ternary preserves cached local edits                                 | PASS                |
| FIXED: ternary returns fresh intro (does not leak saved message at route 0) | PASS                |
| FIXED: ternary returns the default intro (correct for first visit)          | PASS                |
| withLocalStorage: returns defaultValue when localStorage item is null       | PASS                |
| withLocalStorage: parses JSON from localStorage when item starts with {     | PASS                |
| withLocalStorage: round-trips message through JSON without losing structure | PASS                |
| withLocalStorage: round-trips message with id field correctly               | PASS                |

### Manual Verification (after fix is applied)

1. **Local edits preserved**: Edit message at `/message/m/0/edit` → navigate to `/send` → edits should persist
2. **Fresh intro for saved messages**: While logged in, edit a saved message → navigate to `/message/m/0/send` → should show fresh intro (not the saved message's data)
3. **Code message takes precedence**: Navigate to `/message/m/0/send?code=<valid_code>` → should show the code message, not local storage
4. **First visit shows intro**: Clear localStorage → visit `/message/m/0/send` → should show the default intro message

### Acceptance Criteria

- [ ] `useEffect` at line ~135 in `MessageProvider/index.tsx` restores the `localMessageStore.current.id` ternary check
- [ ] Local edits at id=0 route survive navigation between `/edit` and `/send`
- [ ] Fresh intro is shown when local store has a saved message ID
- [ ] No regression: code messages still load correctly

---

## Handoff

Handing off to implementer to restore the local storage check in the `useEffect` for `paramMessageId === '0'`.
