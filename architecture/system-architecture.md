---
Status: Active
Last Updated: 2026-08-23
---

# System Architecture — Hooks.gg

## Changelog

| Date       | Change                                                                 | Rationale                                                                                          | Plan |
| ---------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---- |
| 2026-08-23 | Corrected cdn mechanism: no node_modules; lockfile pins pre-removal SHA | Prior revision wrongly claimed a frozen 2023 node_modules snapshot (error caught by steering-01, re-derived here); floating-ref-vs-lock fragility added | —    |
| 2026-08-23 | Recorded owner rulings: cdn deployed, website on Vercel, D-002 rationale | Rulings relayed via steering-01; D-002 parity with statbot-utils re-derived in-tree; preview-path seam narrowed and re-scoped | —    |
| 2026-08-23 | Reconciled to workspace altitude; verified against all five trees      | Doc covered only `website`; Problem Areas were stale (V2 flag fix and Vitest adoption had landed)   | —    |
| 2026-04-06 | Reviewed Plan 004 lazy loading overhaul                                | Approved with 6 changes; RC-1 blocks React.lazy approach                                            | 004  |
| 2025-07-15 | Initial creation; Components V2 review                                 | Established baseline during Plan 001 arch review                                                    | 001  |

---

## Purpose

Hooks.gg is a Discord message/embed builder: users compose Discord messages in a WYSIWYG editor and send them via webhooks, with a companion Discord bot. The system supports embeds, rich text (Markdown), and Components V2.

The workspace root is `/usr/local/bin/hooks`. It is **not itself a git repository**; it holds five sibling repositories:

| Repo                      | Remote                                  | Branch   | Role                                                        |
| ------------------------- | --------------------------------------- | -------- | ----------------------------------------------------------- |
| `website`                 | `hooks-gg/website`                      | `master` | The product: Next.js app, API, and Discord bot endpoints    |
| `project-utils`           | `hooks-gg/project-utils`                | `master` | Shared data layer: Prisma schema, generated Kysely types    |
| `preview-image-generator` | `hooks-gg/preview-image-generator`      | `prod`   | Headless-browser screenshot service for message previews    |
| `cdn`                     | `hooks-gg/cdn`                          | `master` | Preview-serving app at `cdn.hooks.gg` — deployed; legacy toolchain |
| `agent-output`            | `mr-tech/hooks-agent-output`            | `master` | Process record for the agent pipeline (its own repo)        |

`hooks.code-workspace` at the root defines the **active** working set: `website`, `project-utils`, `preview-image-generator`, `agent-output`, plus two out-of-tree reference clones — `../discord-api-types` (upstream `discordjs/discord-api-types`) and `../embed-generator` (upstream `merlinfuchs/embed-generator`). Both reference clones point at their upstream remotes, not hooks-gg forks; they are consulted, not developed. `cdn` is **not** a member of the workspace. `website.code-workspace` is a narrower view (website + the two reference clones).

---

## High-Level Architecture

```
                    ┌────────────────────────────────────────────────┐
                    │  website  (Next.js 16 hybrid, React 19, pnpm)  │
                    │                                                │
                    │  App Router (src/app/)   Pages Router API      │
                    │   UI pages, /preview      (src/pages/api/)     │
                    │   providers               tRPC v11, NextAuth,  │
                    │                           interactions, cron   │
                    │  bot/ edgeCommands + serverCommands            │
                    └───────┬───────────────┬──────────────┬─────────┘
                            │ imports       │ POST /generate│
                            ▼               ▼   (API key)   ▼
   ┌───────────────────────────┐  ┌──────────────────────┐  ┌───────────┐
   │ project-utils             │  │ preview-image-       │  │  Redis    │
   │ Prisma schema → Kysely    │  │ generator            │  │ (ioredis) │
   │ types; getPostgres()      │  │ puppeteer pool →     │  └───────────┘
   │ singleton; committed dist │  │ screenshots website  │
   └────────────┬──────────────┘  │ /preview → S3 JPEG   │
                ▼                 └──────────┬───────────┘
         ┌──────────────┐                    ▼
         │  PostgreSQL  │          ┌───────────────────┐
         └──────────────┘          │ S3-compatible CDN │
                                   │ previews/{id}/…   │
                                   └───────────────────┘
```

A companion Mermaid diagram lives at `architecture-diagram.mmd`.

---

## Components

### website (the product)

- **Next.js 16 hybrid**: App Router (`src/app/`) for UI pages (`message/`, `preview/`, `legal/`), Pages Router (`src/pages/api/`) for API endpoints: tRPC (`trpc/`), NextAuth (`auth/`), Discord interactions (`interactions-edge.ts`, `interactions-server.ts`), `cron.ts`, `v1/`, `messages/`.
- **Bot**: `bot/edgeCommands.ts` answered directly from the signature-verified edge endpoint; `bot/serverCommands.ts` forwarded to `interactions-server` authenticated by `HOOKS_API_TOKEN`.
- **Editor architecture** (key frontend pattern): a **single component tree** serves both editing and preview. `DiscordMessageEditor` accepts `message`, `setMessage`, `editableState`; `editableState.showEdit=true` renders Slate editors and toolbars, otherwise static read-only views. `MessagePreview` wraps it with a no-op `setMessage`. Sub-components (`DiscordContentEditor`, `EmbedEditor`, `ComponentEditor`) follow the same dual-mode pattern.
- **Provider architecture**: every provider follows the 5-step formula — `createContext(null)`, throwing `useXxx()` consumer hook, private `useValue()` with `useMemo`, `memo()` wrapper, `displayName`. Key providers: `MessageProvider`, `GuildProvider`, `MarkdownProvider`, `WebhookProvider`.
- **Data flow**: Load: DB (JSONB) → `message.get` → `makeEditable()` → key injection → UI state. Save: UI state → key stripping → `message.upsert` → DB. Send: UI state → `sendWebhook()` → Discord API; `sendWebhook` (`src/utils/sendWebhook.ts`) applies `IS_COMPONENTS_V2_FLAG` for V2 messages.
- **Packaging**: pnpm with a patched dependency (`simple-markdown` via `patches/`); `paracord` from `github:mr-tech/paracord`.

### project-utils (shared data layer)

- Owns the **database schema**: `prisma/schema.prisma` is the source of truth; `prisma-kysely` generates Kysely types (`src/generated/`).
- Exposes `getPostgres()` — a Kysely-over-pg **singleton** (reused to prevent `ECONNRESET` on idle connections).
- Consumed by `website` and `cdn` as a **git dependency** (`github:hooks-gg/project-utils#master`) with `dist/` committed to the repo; `npm run rebuild` regenerates lint + JS + rolled-up types (api-extractor), guarded by a pre-commit hook in `.githooks/`.

### preview-image-generator (screenshot service)

- Standalone Node `http` server (no framework), deployed under PM2 (`ecosystem.config.js`, `wait_ready`, graceful SIGINT drain). Deployment branch is `prod`.
- `POST /generate` (Authorization: API key) → renders the **website's own `/preview` page** (`PREVIEW_ENDPOINT` with the message JSON as a query param) in a pooled puppeteer browser (`generic-pool`), screenshots to JPEG, deletes the message's prior objects, and uploads to the S3-compatible CDN bucket at `previews/{messageId}/{nonce}.jpeg` with `public-read` ACL.
- Invoked from the website server side: `src/server/api/utils/shared.ts` fetches `env.PREVIEW_IMAGE_URL` with `PREVIEW_IMAGE_API_KEY`; messages carry a `previewImageNonce` for cache-busting.

### cdn (deployed; legacy toolchain)

- Next.js 13 Pages Router app (package name still `"website"`), deployed as `cdn.hooks.gg` (owner ruling 2026-08-23) under PM2. One API route: `src/pages/api/previews/[id]/[file].ts` — serves preview image **blobs out of Postgres** (`MessagePreviewImages` table via project-utils). `next.config.js` permanently redirects `/previews/:path*` → `/api/previews/:path*`, so the URLs the website emits resolve to this route.
- The website addresses it directly: `getCDNUrl()` (`src/utils/getCDNUrl.ts`) builds preview URLs from `NEXT_PUBLIC_CDN_HOST` = `https://cdn.hooks.gg`.
- Excluded from `hooks.code-workspace`; checkout matches `origin/master` (2023-08-02). See Problem Areas for the preview-storage seam.

### agent-output (process record)

- The agent pipeline's document repository (planning, implementation, QA, architecture, etc.). Its own git repo, distinct remote (`mr-tech/hooks-agent-output`). Plans 001–010 are closed; all target the `website` repo.

---

## Runtime Flows

1. **Edit/save**: browser UI state ↔ tRPC `message` router ↔ Postgres JSONB via project-utils Kysely.
2. **Send**: UI state → `sendWebhook()` → Discord webhook API (V2 flag applied when set).
3. **Preview image (write)**: `message.upsert` → website server POSTs to preview-image-generator `/generate` → puppeteer renders website `/preview` → JPEG → DigitalOcean Spaces bucket `hooks` at `previews/{id}/{nonce}.jpeg` (public-read); the website's `deleteMessagePreviewImages.ts` cleans the same bucket keys.
4. **Preview image (read)**: the website emits `https://cdn.hooks.gg/previews/{id}/{nonce}.jpeg`; the cdn app serves that route from Postgres blobs. See Problem Areas — no code in any tree writes those blobs.
5. **Bot interaction**: Discord → `POST /api/interactions-edge` (signature verify) → edge commands answered inline; server commands forwarded to `/api/interactions-server` (`HOOKS_API_TOKEN`) → DB/Redis.
6. **Cron**: daily `/api/cron?key=vercel` per `vercel.json`.

---

## Data Boundaries

- **PostgreSQL** — canonical store (messages as JSONB, guilds, users, preview-image metadata). Schema owned by project-utils; all access through its generated Kysely types and `getPostgres()`.
- **Redis** (ioredis) — caching layer for the website/bot server side.
- **S3-compatible object store / CDN** — public preview JPEGs, keyed `previews/{messageId}/{nonce}.jpeg` (`dev/` prefix in development).

---

## Dependencies

- `website` → `project-utils` (git dep, committed dist), `discord-api-types` (npm), Slate, tRPC v11, NextAuth 4, Kysely, ioredis, sharp, puppeteer-free.
- `cdn` → `project-utils` (git dep declared `#master`, lockfile-pinned to pre-removal commit `8b08d23e` — see Problem Areas).
- `preview-image-generator` → no project-utils dependency; talks only to the website's `/preview` URL and S3.
- Reference clones (`../discord-api-types`, `../embed-generator`) are consultation sources, not build inputs.

---

## Quality Attributes

- **Type safety**: `tsc --noEmit` is the primary gate across repos; `satisfies z.ZodType<...>` locks Zod schemas to TS types in the website.
- **Tests**: Vitest is present in the website (`vitest.config.ts`; `src/utils/__tests__/` includes `components-v2-data-layer.test.ts`, `mutual-exclusivity.test.ts`). Coverage is narrow — data-layer roundtrips — not broad.
- **Build/deploy**: the website deploys on **Vercel** (owner ruling 2026-08-23); its PM2 `ecosystem.config.json` is not the live path. `preview-image-generator` and `cdn` deploy under PM2.

---

## Problem Areas

| Area                                   | Severity | Notes                                                                                                                                                              |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Preview-storage seam: cdn reads a table the schema no longer defines | High | The write path (PIG, website delete util) operates on the Spaces bucket `hooks`. The read path (`cdn.hooks.gg`, which the owner confirms is deployed) does `selectFrom('MessagePreviewImages')` — and that is the **only** touch of the table anywhere: the identifier appears in exactly three files across the five trees, and the other two (website `message.ts`, PIG `generateImage.ts`) are calls to/definitions of a `deleteMessagePreviewImages` that operates on bucket **objects** — the name is a leftover from the table era. Stronger still: **`MessagePreviewImages` is absent from the current schema** — no model in `project-utils/prisma/schema.prisma`, no mention in `src/generated/` or the committed `dist/`; the table was removed by project-utils `4b5c9b6` ("update schema", 2023-08-04). cdn type-checks only against the pre-removal commit its lockfile pins (see the floating-ref row below). Live hypotheses: `cdn.hooks.gg` DNS fronts the Spaces CDN with the app's route vestigial; the deployed cdn was built from the pinned pre-removal SHA and reads a table that may or may not still exist in the production DB (schema.prisma states desired schema, not what a migration actually did); or previews are broken. "A writer exists somewhere unsearched" is ruled out. Needs a production probe (fetch one live preview URL, compare bytes/headers against the bucket object). |
| cdn's project-utils ref floats while its lock pins a pre-removal SHA | Medium | `cdn/package.json` declares `project-utils: github:hooks-gg/project-utils#master` (floating), but `cdn/package-lock.json` resolves it to commit `8b08d23e` — whose schema still contains the table. `npm ci` honours the pin and builds; a plain `npm install` re-resolves `#master` (currently `eb38a15`, table gone) and the build breaks at `DatabaseSchema['MessagePreviewImages']`. Nothing in the tree warns of this. Same failure family as the statbot workspace's pinned-build rule: declaration and lock disagree, so a local build proves nothing about a fresh install. The tree currently has no `node_modules` at all. |
| ESLint health unverified               | Medium   | Doc previously recorded ESLint as broken (circular structure error). devDependencies show an in-progress flat-config migration (`eslint` ~8.57 pinned alongside `typescript-eslint` v8 and `@eslint/js` v10). Not re-verified 2026-08-23.  |
| No CLAUDE.md / workspace self-description | Medium | Nothing in the tree states what the workspace is or which members are active; only `hooks.code-workspace` encodes it implicitly.                                    |
| Per-repo architecture records absent   | Low      | `agent-output/architecture/<repo>.md` owner-sourced records do not exist; invariants live only in code and in this reconciled doc.                                   |
| 2023-era toolchains in deployed satellites | Medium | `cdn` (Next 13) and `preview-image-generator` (2023 deps, puppeteer 21) are far behind the website's stack — and both are live services, not shelfware.              |

Resolved since the 2026-04-06 revision (recorded here as history, not declared above): the three Plan-001-era "High" items — stale V2 component constants, `rekey()` key duplication, and `sendWebhook` missing the V2 flag — no longer reproduce against the tree: the old constant names are gone from `src/constants`, and `sendWebhook.ts` applies `IS_COMPONENTS_V2_FLAG`. "No test framework" was superseded by Vitest adoption.

Resolved 2026-08-23 by owner ruling (via steering-01): "cdn repo status unresolved" — cdn **is** deployed, so the earlier inference that the S3 path had superseded it was wrong about the deployment (the remaining tension is re-scoped as the preview-storage seam above). "Deployment-target ambiguity (website)" — production is Vercel; the PM2 config is not the live path.

---

## Decisions

### D-001 — Single component tree for edit and preview
- **Context**: WYSIWYG fidelity requires the preview to be pixel-true to the editor.
- **Choice**: One `DiscordMessageEditor` tree, mode-switched by `editableState.showEdit`.
- **Consequences**: No drift between edit and preview rendering; every sub-component must implement both modes. Reused by the screenshot pipeline (the `/preview` route renders the same tree).
- **Related**: Plans 001, 004.

### D-002 — Shared data layer as a git-dependency package with committed dist
- **Context**: Multiple deployables (website, cdn) need one schema and one connection discipline.
- **Choice**: `project-utils` owns `schema.prisma`, generates Kysely types via prisma-kysely, exports a `getPostgres()` singleton, and is consumed as `github:hooks-gg/project-utils#master` with `dist/` committed. Owner-stated rationale (2026-08-23, verbatim): *"Same architecture as Statbot. To put it shortly; api-extractor."* — a git dependency has no publish step; the committed `dist/` plus the API Extractor `.d.ts` rollup are what make the repo installable as-is.
- **Verification**: `project-utils` and statbot's `statbot-utils` carry an identical `build:types` script (`tsc -p ./tsconfig.json --declaration true --outDir build/types && api-extractor run`), both hold an `api-extractor.json`, and both track `dist/` in git (13 and 264 files respectively).
- **Consequences**: No registry publishing needed; consumers pin `#master`, so a project-utils push changes consumers on next install; committed build artifacts must be kept in sync by the pre-commit hook — and must never be "cleaned up" as if they were stray build output.
- **Related**: statbot workspace (`statbot-utils`), which this deliberately mirrors.

### D-003 — Preview images by screenshotting the app's own preview route
- **Context**: Preview images must match what the editor shows (see D-001).
- **Choice** (inferred from code): a separate puppeteer service renders the website's `/preview` page and uploads JPEGs to public S3 rather than re-implementing rendering server-side.
- **Consequences**: Zero rendering drift; adds a headless-browser service and an S3/CDN dependency; the service is coupled to the website's `/preview` URL contract (message JSON in a query param).

---

## Roadmap Readiness

Plans 001–010 (all website-scoped) are closed. No open plans. The preview-storage seam (Problem Areas, High) is the main obstacle to confident work on anything touching preview images; deployment targets are otherwise settled (website on Vercel, satellites on PM2).

---

## Recommendations

1. Close the preview-storage seam (Problem Areas, High): probe one live preview URL against the Spaces bucket object, and diff the deployed cdn against its repo. Until then, no agent should modify either preview path on the assumption it knows which one production exercises.
2. Re-verify ESLint health in the website and either close or re-scope that Problem Area.
3. Start owner-sourced per-repo architecture records (`agent-output/architecture/<repo>.md`), beginning with `website` and `preview-image-generator` — D-002's rationale is now owner-sourced, but D-001 and D-003 rationales remain inference from code.
