---
Status: Active
Last Updated: 2026-04-06
---

# System Architecture — Hooks.gg

## Changelog

| Date       | Change                                  | Rationale                                                | Plan |
| ---------- | --------------------------------------- | -------------------------------------------------------- | ---- |
| 2026-04-06 | Reviewed Plan 004 lazy loading overhaul | Approved with 6 changes; RC-1 blocks React.lazy approach | 004  |
| 2025-07-15 | Initial creation; Components V2 review  | Established baseline during Plan 001 arch review         | 001  |

---

## Purpose

Hooks.gg is a Discord message/embed builder web app with a companion Discord bot. Users create and edit Discord messages using a WYSIWYG editor, then send them via webhooks. The app supports embeds, rich text (Markdown), and (in progress) Components V2.

---

## High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Next.js 16 (Hybrid)                    │
│                                                          │
│  App Router (src/app/)          Pages Router (src/pages/) │
│  ┌──────────────────┐          ┌────────────────────────┐│
│  │ UI Pages          │          │ API Endpoints          ││
│  │ (use client)      │          │ - tRPC (guild/user/msg)││
│  │                   │          │ - NextAuth             ││
│  │ Providers ──────────────────►│ - Discord interactions ││
│  │ (context/state)   │          │ - Cron                 ││
│  └──────────────────┘          └────────────────────────┘│
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │        DiscordMessageEditor (dual-mode)             │ │
│  │  showEdit=true  → Slate editors, inputs, menus      │ │
│  │  showEdit=false → Static Markdown, read-only views  │ │
│  │                                                     │ │
│  │  Used by: message routes (edit), MessagePreview     │ │
│  │           (read-only, no-op setMessage)              │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────┬──────────────────────────────────┘
                        │
           ┌────────────┼────────────┐
           ▼            ▼            ▼
     ┌──────────┐ ┌──────────┐ ┌──────────┐
     │PostgreSQL│ │  Redis   │ │  S3/CDN  │
     │ (Kysely) │ │ (cache)  │ │ (images) │
     └──────────┘ └──────────┘ └──────────┘
```

---

## Components

### Editor Architecture (Key Architectural Pattern)

The WYSIWYG editor uses a **single component tree** for both editing and preview. This is the most important architectural pattern in the frontend:

- `DiscordMessageEditor` — root component, accepts `message`, `setMessage`, `editableState`
- Edit mode: `editableState.showEdit = true` — shows Slate editors, input fields, toolbars
- Preview mode: No `editableState` or `showEdit = false` — renders static content, hides all editing controls
- `MessagePreview` wraps `DiscordMessageEditor` with `setMessage={() => {}}` for read-only rendering

Sub-components follow the same pattern:
- `DiscordContentEditor` → Slate editor (edit) / `Markdown` component (preview)
- `EmbedEditor` → editable fields (edit) / styled preview (preview)
- `ComponentEditor` → input fields with toolbars (edit) / styled read-only (preview)

### Provider Architecture

Every provider follows a strict 5-step formula:
1. `createContext<State | null>(null)`
2. `useXxx()` consumer hook (calls `use(Context)`, throws if null)
3. `useValue()` private hook (business logic, returns `useMemo`)
4. `memo()` wrapper component
5. `Provider.displayName`

Key providers: `MessageProvider` (fetch/save/state), `GuildProvider`, `MarkdownProvider`, `WebhookProvider`

### Data Flow

```
Load: DB (JSONB) → message.get → makeEditable() → injectComponentKeys() → UI state
Save: UI state → stripKeys() → stripComponentKeys() → message.upsert → DB
Send: UI state → stripKeys() → sendWebhook() → Discord API
```

### Bot Architecture

```
Discord → POST /api/interactions-edge (signature verify)
  ├── edgeCommands → immediate response
  └── serverCommands → POST /api/interactions-server (HOOKS_API_TOKEN) → DB/Redis
```

---

## Quality Attributes

- **Type Safety**: `tsc --noEmit` as primary gate. `satisfies z.ZodType<MessageData>` constraint locks Zod schemas to TypeScript types.
- **ESLint**: Currently broken (pre-existing circular structure error). `eslint.ignoreDuringBuilds: true`.
- **No test framework**: Manual verification only. Type safety and build success are the verification gates.

---

## Problem Areas

| Area                              | Severity | Notes                                                                                      |
| --------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| ESLint broken                     | Medium   | Pre-existing, orthogonal to current work                                                   |
| No test framework                 | Medium   | Type safety partially compensates, but roundtrip correctness is not automatically verified |
| V2 component constants stale      | High     | `MAX_TOP_LEVEL_COMPONENTS=5` and `MAX_CONTAINER_CHILDREN=10` are wrong per Discord API     |
| `rekey()` doesn't regenerate keys | High     | Duplicate components share `_key` values, causing React reconciliation issues              |
| `sendWebhook` missing V2 flags    | High     | Components V2 messages will be rejected without `IS_COMPONENTS_V2` flag                    |

---

## Recommendations

1. Fix the five issues identified in the architecture findings document before proceeding with implementation.
2. Consider adopting a lightweight test runner (Vitest) for data-layer roundtrip tests (`injectComponentKeys` ↔ `stripComponentKeys`, `toAPIComponents` ↔ `fromAPIComponents`).
3. Track the ESLint fix as a separate initiative — it blocks all lint-based quality gates.
