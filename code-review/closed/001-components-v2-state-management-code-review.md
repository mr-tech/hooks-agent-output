# Code Review 001 — Post-Remediation (M7–M10)

**Plan**: 001-components-v2-state-management Rev 5 | **Date**: 2026-04-03 | **Round**: Post-remediation

---

## Prior Remediation Verification

All 6 findings from the prior review are **confirmed fixed**:

| ID   | Sev    | Finding                                       | Status                                                                     |
| ---- | ------ | --------------------------------------------- | -------------------------------------------------------------------------- |
| CR-1 | HIGH   | `useConfirmation()` crash in preview contexts | ✅ `use(ConfirmationContext)` returns `null`, guarded in `handleModeSwitch` |
| CR-2 | LOW    | Unnecessary `useCallback` wrapper             | ✅ Direct `useState` setter                                                 |
| CR-3 | MEDIUM | IIFE duplicates `validateMessage()` logic     | ✅ `validateContentRequirements()` extracted and reused                     |
| CR-4 | MEDIUM | Duplicated V2 type Set                        | ✅ `V2_COMPONENT_TYPE_VALUES` in `~/constants` as single source             |
| CR-5 | LOW    | `useEffect` dep array intent unclear          | ✅ Intent comment added                                                     |
| CR-6 | MEDIUM | Stale closure in `handleModeSwitch`           | ✅ `messageRef.current`, deps reduced                                       |

---

## New Findings

### CR-R1 — Unused `genUuid` import (LOW)

**File**: index.tsx

`genUuid` is imported but never used — dead since the `rekeyComponent` refactor replaced direct key generation.

**Fix**: Remove `genUuid` from the import destructure.

---

### CR-R2 — `handleModeSwitch` missing `_setMessage` in dependency array (LOW)

**File**: index.tsx

`handleModeSwitch` calls `_setMessage()` but omits it from deps `[editableState, isClassicMode, confirmation]`. Safe in practice because `_setMessage` is a `useCallback([setMessage])` and `setMessage` is a stable prop, but `exhaustive-deps` would flag it.

**Fix**: Add `_setMessage` to the dependency array.

---

### CR-R3 — `validateContentRequirements` type compatibility (INFO)

**File**: limits.tsx

The `Pick<MessageData, 'embeds' | 'content' | 'components'>` signature works with both `MessageData` and `EditableMessageData` via structural typing. The function only accesses `.length`, `.trim()`, and `.type` — no properties unique to either. Verified via `tsc --noEmit`. No action needed.

---

### CR-R4 — `NewMessageJsonInput` discards `detectedMode` (LOW)

**File**: NewMessageJsonInput.tsx

```tsx
const { data: cleaned } = enforceImportMutualExclusivity(parsed);
// detectedMode discarded
```

Functionally correct because `MessageProvider/index.tsx`'s `useEffect` auto-detects mode when the message loads. But the discarded return value is misleading to readers.

**Fix**: Add comment: `// Mode auto-detected on load via MessageProvider useEffect`

---

## Positive Observations

1. **CR-1 fix is architecturally sound** — `use(ConfirmationContext)` returns `null` in preview/new-message paths (no `ConfirmationProvider` in tree), matching the dual-mode editor pattern where `editableState` is also optional. Verified across all 3 render contexts: edit page, preview page, `MessagePreview`.

2. **Defense-in-depth is excellent** — mutual exclusivity enforced at 4 layers: UI mode gating → import enforcement → `stripKeys()` stripping → `validateMessage()` validation.

3. **TDD compliance genuine** — 32 tests written first, 29 failed as expected, all green after implementation.

4. **`V2_COMPONENT_TYPE_VALUES` as single source** eliminates the maintenance risk of divergent Sets.

5. **`messageRef.current` in `handleModeSwitch`** properly resolves the stale closure.

---

## Verification

| Check                                           | Result                                                                                                        |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `tsc --noEmit` (production, excl. `__tests__/`) | **0 errors**                                                                                                  |
| `npx vitest run`                                | **107/107 ✅**                                                                                                 |
| Circular dependency risk                        | None — `constants/` does not import from utils                                                                |
| Provider boundary safety                        | ✅ `ConfirmationProvider` wraps at `message/m/[id]/layout.tsx`; preview/new-message paths correctly get `null` |

---

## Verdict: **APPROVED_WITH_COMMENTS**

All prior HIGH and MEDIUM findings have been correctly remediated. The 4 remaining findings are LOW/INFO — two unused/missing deps that don't affect runtime, one type compatibility note, and one discarded return value covered by a downstream `useEffect`. No security issues, no architectural deviations, no design flaws.

**Recommended before QA (optional, non-blocking):**
- CR-R1: Remove unused `genUuid` import (1-line change)
- CR-R2: Add `_setMessage` to `handleModeSwitch` deps (1 entry)