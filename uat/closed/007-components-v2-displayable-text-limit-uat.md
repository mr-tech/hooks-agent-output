---
ID: 7
Origin: 7
UUID: d4e8a1c3
Status: Released
---

# UAT Report: Components V2 Aggregate Displayable Text Limit

**Plan Reference**: `agent-output/planning/007-components-v2-displayable-text-limit.md`
**Date**: 2026-04-09
**UAT Agent**: Product Owner (UAT)

## Changelog

| Date       | Agent Handoff | Request                                 | Summary                                                                                |
| ---------- | ------------- | --------------------------------------- | -------------------------------------------------------------------------------------- |
| 2026-04-09 | QA → UAT      | QA Complete, ready for value validation | UAT Complete — implementation delivers stated value across all three validation layers |

## Value Statement Under Test

**As a** Hooks.gg user composing Components V2 messages, **I want** the editor to warn me when my total Text Display content exceeds Discord's 4,000-character aggregate limit, **so that** I can fix my message before sending rather than encountering an opaque API error.

## UAT Scenarios

### Scenario 1: User sees warning when aggregate text exceeds limit

- **Given**: A user composing a Components V2 message with multiple Text Display components whose combined content exceeds 4,000 characters
- **When**: The user types beyond the aggregate limit in the editor
- **Then**: A red error message appears below the components area saying "Components text exceeds 4000 characters" and a red error border wraps the components section
- **Result**: PASS
- **Evidence**: [index.tsx](website/src/components/DiscordMessageEditor/index.tsx#L199) computes `v2TextError = validateDisplayableTextCount(components)`. [index.tsx](website/src/components/DiscordMessageEditor/index.tsx#L326) applies `styles.errorBorder` when truthy. [index.tsx](website/src/components/DiscordMessageEditor/index.tsx#L367-L369) renders the error text via `NullableComponent`. Pattern mirrors existing `embedCharacterError` exactly.

### Scenario 2: Send button is blocked for oversized messages

- **Given**: A user has a V2 message whose aggregate Text Display content exceeds 4,000 characters
- **When**: The user navigates to the Send page
- **Then**: The Send button is disabled because `isMessageValid` evaluates to false
- **Result**: PASS
- **Evidence**: [limits.tsx](website/src/utils/limits.tsx#L139-L140) returns error from `validateDisplayableTextCount()` inside `validateMessage()`. [page.tsx](website/src/app/message/m/[id]/send/page.tsx#L158) computes `isMessageValid = message && !validateMessage(message.data)` — a non-empty error string makes this `false`. 33 tests verify boundary behavior (4000 accepted, 4001 rejected).

### Scenario 3: Server rejects oversized payloads on save

- **Given**: A malicious or corrupted payload with aggregate Text Display content > 4,000 reaches the server
- **When**: The server validates via `messageShape` (which wraps `discordMessageShape`)
- **Then**: Zod validation fails with a `too_big` issue on the `components` path
- **Result**: PASS
- **Evidence**: [shapes.ts](website/src/server/api/utils/shapes.ts#L207) applies `.superRefine(refineDisplayableText)` to the base shape. QA test "rejects aggregate via messageShape" verifies transitivity through the `messageShape` wrapper. Error path confirmed pointing to `components`.

### Scenario 4: JSON import rejects oversized payloads

- **Given**: A user imports a JSON payload whose Text Display aggregate exceeds 4,000
- **When**: The import modal parses via `discordMessageImportShape.parse()`
- **Then**: Import is rejected with a Zod error
- **Result**: PASS
- **Evidence**: [shapes.ts](website/src/server/api/utils/shapes.ts#L231) applies `.superRefine(refineDisplayableText)` independently to the import shape. QA tests verify rejection > 4000, acceptance at exactly 4000, and that filtered-out unsupported components reduce the aggregate correctly.

### Scenario 5: Nested text displays are counted correctly

- **Given**: Text Display components nested inside Sections (type 9), Containers (type 17), and Sections-within-Containers
- **When**: Their combined content exceeds 4,000
- **Then**: The aggregate limit is triggered regardless of nesting depth
- **Result**: PASS
- **Evidence**: 5 nesting-depth tests across client and Zod (top-level, section, container, section-in-container, deep nesting with 3 sections × 3 displays). Both `sumDisplayableText` implementations recurse through types 9 and 17.

### Scenario 6: Classic mode is unaffected

- **Given**: A user composing a classic message (embeds + content + ActionRow buttons only)
- **When**: ActionRow buttons have labels
- **Then**: The aggregate text check runs but returns 0 (no Text Displays), so no false positive
- **Result**: PASS
- **Evidence**: QA tests "does not count button labels in ActionRows" and "returns empty string for classic ActionRows (no text displays)" verify zero contribution. Validation runs unconditionally matching the `validateEmbedCharacterCount` pattern.

## Value Delivery Assessment

The implementation **fully delivers** the stated business value:

1. **"warn me when my total Text Display content exceeds 4,000"** — Delivered. The editor computes `v2TextError` on every render and displays a red error message + error border when exceeded. This is real-time feedback, not just at send time.

2. **"so that I can fix my message before sending"** — Delivered. The error appears inline in the editor, giving the user immediate context. The Send button is independently disabled via `validateMessage()` → `isMessageValid`, providing a hard gate.

3. **"rather than encountering an opaque API error"** — Delivered. The error message `"Components text exceeds 4000 characters."` is clear, actionable, and includes the limit number. This replaces the opaque Discord error code `50035 / COMPONENT_DISPLAYABLE_TEXT_SIZE_EXCEEDED`.

**Core value is NOT deferred.** All three validation layers (UI warning, send gate, server gate) are implemented and tested.

## QA Integration

**QA Report Reference**: `agent-output/qa/007-components-v2-displayable-text-limit-qa.md`
**QA Status**: QA Complete
**QA Findings Alignment**: QA identified and resolved 11 coverage gaps with 16 additional tests. All gaps were edge cases (deep nesting, filtered imports, undefined components) — no gaps in core value delivery. The import shape boundary test (code review F5) was also resolved by QA.

## Technical Compliance

### Plan Deliverables

| Deliverable                                    | Status |
| ---------------------------------------------- | ------ |
| M1: `MAX_COMPONENTS_DISPLAYABLE_TEXT` constant | PASS   |
| M2: `validateDisplayableTextCount()` + wiring  | PASS   |
| M3: Editor UI error display                    | PASS   |
| M4: Zod schema `.superRefine()` on both shapes | PASS   |
| M5: Tests (client + Zod)                       | PASS   |

### Test Coverage

- **Total tests for feature**: 33 (17 implementer + 16 QA)
- **Full suite**: 244/244 pass
- **TypeScript**: zero errors
- **Regressions**: none

### Known Limitations

1. **Assumption 1**: Only `TextDisplay.content` fields are counted. If Discord also counts `description` fields from MediaGallery/Thumbnail items, users could still hit the API error with very long descriptions. The counting function is structured to easily extend (one-line change per field). A QA test explicitly documents this behavior boundary.

## Objective Alignment Assessment

**Does code meet original plan objective?**: YES

**Evidence**:

| Success Criterion (from plan)                          | Delivered?                                                                                                     |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Combined Text Display > 4,000 blocked with clear error | YES — `validateMessage()` returns "Components text exceeds 4000 characters.", `isMessageValid` → `false`       |
| Editor displays visible aggregate warning              | YES — `v2TextError` renders via `NullableComponent` with `text-error` class + `errorBorder` on accessories div |
| Zod schema rejects on server (save/import)             | YES — `.superRefine(refineDisplayableText)` on both `discordMessageShape` and `discordMessageImportShape`      |
| All three nesting positions counted                    | YES — recursive `sumDisplayableText` walks types 9 (Section), 10 (TextDisplay), 17 (Container) at all depths   |

**Drift Detected**: One structural deviation — `discordMessageBaseShape` (unexported) was introduced to work around `ZodEffects` lacking `.extend()`. This is a sound engineering adaptation, not objective drift. The end behavior is identical to the plan's intent. The deviation is well-documented in both the implementation doc and code review.

## UAT Status

**Status**: UAT Complete
**Rationale**: All four success criteria from the plan are met. The value statement is demonstrably delivered: users composing V2 messages exceeding the 4,000-character aggregate limit will see a clear error in the editor, be prevented from sending, and have their payloads rejected at the server level. No value is deferred. The one structural deviation improves the implementation without changing behavior. QA passed with 244/244 tests. Code review approved with no blocking findings.

## Release Decision

**Final Status**: APPROVED FOR RELEASE
**Rationale**: Implementation delivers the full value statement without deferral. Three independent validation layers ensure users cannot hit the opaque Discord API error. 33 targeted tests verify all nesting depths, boundary values, and edge cases. Code review approved with only documentation-level comments. QA resolved all identified coverage gaps. Zero TypeScript errors, zero regressions.
**Recommended Version**: Patch bump (bug-fix: validation gap for existing feature)
**Key Changes for Changelog**:
- Added aggregate displayable text limit (4,000 characters) for Components V2 messages
- Editor shows inline warning when limit is exceeded
- Send button blocked for oversized V2 messages
- Server-side Zod validation rejects on save and import

## Next Actions

- Commit with message: `fix: add aggregate displayable text limit for Components V2 messages`
- Handing off to devops agent for release execution
