---
Status: Active
Last Updated: 2026-11-08
---

# System Architecture — Hooks.gg

## Changelog

| Date       | Change                                                                 | Rationale                                                                                          | Plan |
| ---------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ---- |
| 2026-11-08T08:10 | AF-26 Problem Area restated to the owner's ruling (a known limit), severity Medium → Low | All three of the site's own sign-in entry points need no session, so only a hand-made sign-in visit creates the second row (rulings `766bd4b`) | 015 |
| 2026-11-08T08:07 | Registered the stack-printing shared error fallback Problem Area | Found in the 015 rev 23 conformance pass (AF-27) | 015 |
| 2026-11-08T08:06 | Registered the one-user-many-Discord-accounts Problem Area | Found answering QA's routed assumption in 015 M1 (AF-26). The schema and next-auth allow a second Discord row per user, and the per-user reads take an arbitrary one | 015 |
| 2026-11-08T08:00 | Registered the validation-chrome-in-preview-images Problem Area | Found in the 015 rev 22 conformance pass (AF-25). M6-l's over-40 error follows its siblings onto `/preview` | 015 |
| 2026-11-08T07:30 | Registered the inert Enter-guard Problem Area (the dead `tagName` compare in three dialogs; the guard that actually protects Enter-on-Cancel is unidentified) | Found in the 015 rev 21 conformance pass (AF-22), after D30 removed M3 | 015 |
| 2026-11-08T07:25 | Registered the inline error-copy drift Problem Area ("Invalid URL" in two spellings; an unused language catalogue) | Found in the 015 rev 20 conformance pass (AF-21) | 015 |
| 2026-11-08T06:42 | Registered two Problem Areas: the overloaded `user-access-token` key, and the session-cookie name decided in three places | Found in the 015 rev 12 + rev 13 conformance pass (AF-18) | 015 |
| 2026-11-08T06:28 | Registered the session→account cache Problem Area | Found in the 015 rev 9 + rev 10 conformance pass (AF-17). The 600 s cache is invalidated only by an explicit clear, and `authorizeGuildAdmin` does not re-check the session | 015 |
| 2026-11-08T05:45 | `upsertMessage` count Problem Area extended with the cap's concurrency limit | Plan 015 rev 6 records it as X-16, a stated limit at the same site as AF-9a's count | 015 |
| 2026-11-08T05:16 | preview-image-generator component line corrected to the read stop path and deploy route; four Problem Areas registered | Conformance pass on plan 015 rev 3. The line declared a "graceful SIGINT drain" (PM2 stops by IPC message, so the drain is never reached — analysis 015, PM2 source) and "the checkout is production" (`prod.yml` builds and copies). The P-3 record entry is proposed, not changed. Findings: `015-bug-evaluation-fixes-architecture-findings.md` | 015 |
| 2026-08-24 | Created `architecture/preview-image-generator.md` from six owner-sourced answers; registered the P-6 preview-failure defect and re-graded the toolchain row | His stated intent (*"show a stale one is fine"*) does not match the mechanism — the nonce rotates unconditionally, so a failed generation 404s. The defect was invisible while nobody had written the intent down. P-2 also shows the dependency age is low-consequence structurally, not by luck | — |
| 2026-08-24 | Created `architecture/website.md` from six owner-sourced answers; graded D-001 a confirmed inference and D-003 a route he knew rather than a trade-off | The first per-repo record in this workspace. D-003's "zero rendering drift" framing would have had a reader weigh alternatives against a rationale nobody held; his own words reopen it on evidence | 013 |
| 2026-08-24 | Recorded Pusher: cross-tab staleness notice added as Runtime Flow 1b, and to Dependencies | A real-time service the doc did not mention at all. Owner-sourced intent (it flags divergence, does not coordinate) confirmed against `usePusher.ts` and `shared.ts` | 013 |
| 2026-08-24 | Recorded the owner's rule that only the V2 bit carries product meaning | Every other `flags` bit is user data passing through unexamined — makes the D7 residue a stated invariant rather than a plan-local decision | 013 |
| 2026-08-24 | Recorded D-005 "the back end reflects what the front end allows" (owner ruling) | Answers this architect's own question about enforcing serialisation at `message.upsert`: the owner rules bad-state saves are allowed and the back end never silently morphs a front-end-permitted shape. The Problem Area registered the day before pointed the debt the wrong way (a missing boundary gate) and is reworded to front-end cohesion, severity Medium → Low | 013 |
| 2026-08-24 | D-004 extended for D17: the JSON surfaces dispose by a five-row table, they do not refuse | D-004 was recorded hours before the owner ruled D17; its "the import surfaces refuse it" clause was D5 option (a), which D17 withdrew. Corrected in place so the ADR does not carry a withdrawn premise | 013 |
| 2026-08-24 | Recorded D-004 "the flag is the mode" (owner ruling D15, chain 013) | The invariant deciding V2-ness is written down for the first time; it withdraws the "flags derive from structure" premise every prior document in this line held, including research `8311155a` | 013 |
| 2026-08-24 | Corrected "Data flow": `stripKeys` applies the V2 flag on both write paths; `sendWebhook` reads it to set `with_components=true` | Prior revision credited `sendWebhook` with applying the flag — a claim taken from the constant appearing in the file, not from its use. Send is also browser-issued, not API-issued. Two new Problem Areas registered (the flag ignored at the surfaces that show the mode; save serialisation as a call-site convention) | 013 |
| 2026-08-23 | cdn removed: owner ruled it entirely deprecated; repo moved to `hooks-deprecated` | Earlier "cdn is deployed" was the owner's own conflation with preview-image-generator, owner-corrected. Both cdn Problem Areas rows closed; website's project-utils pin re-derived current (`eb38a15` = master HEAD) | —    |
| 2026-08-23 | PIG prod SHA recorded: deployed commit `471578fa` = the checkout, zero drift | Owner ruling; SHA identity re-derived. Every step of the preview pipeline is now evidenced against deployed code, none inferred | —    |
| 2026-08-23 | Closed preview seam: owner ruling + DNS — `cdn.hooks.gg` CNAMEs to the Spaces CDN | Read and write paths are the same bucket; cdn app's preview route is bypassed. New open item: what the cdn deployment still serves | —    |
| 2026-08-23 | Corrected cdn mechanism: no node_modules; lockfile pins pre-removal SHA | Prior revision wrongly claimed a frozen 2023 node_modules snapshot (error caught by steering-01, re-derived here); floating-ref-vs-lock fragility added | —    |
| 2026-08-23 | Recorded owner rulings: cdn deployed, website on Vercel, D-002 rationale | Rulings relayed via steering-01; D-002 parity with statbot-utils re-derived in-tree; preview-path seam narrowed and re-scoped | —    |
| 2026-08-23 | Reconciled to workspace altitude; verified against all five trees      | Doc covered only `website`; Problem Areas were stale (V2 flag fix and Vitest adoption had landed)   | —    |
| 2026-04-06 | Reviewed Plan 004 lazy loading overhaul                                | Approved with 6 changes; RC-1 blocks React.lazy approach                                            | 004  |
| 2025-07-15 | Initial creation; Components V2 review                                 | Established baseline during Plan 001 arch review                                                    | 001  |

---

## Purpose

Hooks.gg is a Discord message/embed builder: users compose Discord messages in a WYSIWYG editor and send them via webhooks, with a companion Discord bot. The system supports embeds, rich text (Markdown), and Components V2.

The workspace root is `/usr/local/bin/hooks`. It is **not itself a git repository**; it holds four sibling repositories:

| Repo                      | Remote                                  | Branch   | Role                                                        |
| ------------------------- | --------------------------------------- | -------- | ----------------------------------------------------------- |
| `website`                 | `hooks-gg/website`                      | `master` | The product: Next.js app, API, and Discord bot endpoints    |
| `project-utils`           | `hooks-gg/project-utils`                | `master` | Shared data layer: Prisma schema, generated Kysely types    |
| `preview-image-generator` | `hooks-gg/preview-image-generator`      | `prod`   | Headless-browser screenshot service for message previews    |
| `agent-output`            | `mr-tech/hooks-agent-output`            | `master` | Process record for the agent pipeline (its own repo)        |

`hooks.code-workspace` at the root defines the same working set — all four repos — plus two out-of-tree reference clones: `../discord-api-types` (upstream `discordjs/discord-api-types`) and `../embed-generator` (upstream `merlinfuchs/embed-generator`). Both reference clones point at their upstream remotes, not hooks-gg forks; they are consulted, not developed. `website.code-workspace` is a narrower view (website + the two reference clones). Deprecated repos live outside the project space in `/usr/local/bin/hooks-deprecated/`.

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
- **Data flow**: Load: DB (JSONB) → `message.get` → `makeEditable()` → key injection → UI state. Save: UI state → `stripKeys()` → `message.upsert` → DB. Send: UI state → `stripKeys()` → `sendWebhook()` → Discord webhook API — issued from the browser (`src/app/message/m/[id]/send/page.tsx`, a client component), not through the website's own API.
- **One serialiser on both write paths**: `stripKeys` (`src/utils/index.ts`) is the single place `IS_COMPONENTS_V2_FLAG` is applied. When `data.components` is an array carrying a V2 type it ORs the bit into `data.flags` and deletes `data.content` and `data.embeds`; it never clears the bit. Save and send both call it, so the same function decides what the DB stores and what Discord receives. `sendWebhook` (`src/utils/sendWebhook.ts`) *reads* that bit and, when set, adds `with_components=true` to the webhook URL — it applies nothing to the message. `switchToClassic` (`src/utils/messageMode.ts`) is the only writer that clears the bit.
- **Save-path writers bypass the serialiser**: `message.upsert` has five call sites and two reach it through `stripKeys` (`message/m/[id]/_components/SaveAsMenu.tsx`, `providers/MessageProvider/useApiMethods.ts`). `message/_components/NewMessageModal.tsx` (`onSubmit`) writes an imported message straight to upsert, and `message/f/[id]/page.tsx` and `message/m/new/page.tsx` write canned intro messages the same way. Serialisation is a convention observed at the call site, not a boundary the write path must cross — so a stored message's `flags` reflect which writer produced it.
- **Message `flags`**: only `IS_COMPONENTS_V2_FLAG` carries product meaning — owner ruling 2026-08-24, verbatim: *"V2 is the only one the product has an opinion about"*. Every other Discord bit (4 `SUPPRESS_EMBEDS`, 4096 `SUPPRESS_NOTIFICATIONS`, and any future one) is user data that passes through every surface unexamined and unchanged.
- **Where the V2 bit is read**: `validateContentRequirements` (`src/utils/limits.tsx`) is the only consumer that treats it as an input, over the predicate `hasStructuralV2 || hasFlagV2`. The composer's mode (`detectMode`, `providers/MessageProvider/index.tsx`) and the JSON/URL import (`enforceImportMutualExclusivity`, `src/utils/index.ts`) decide from components alone and never consult `flags`.
- **Packaging**: pnpm with a patched dependency (`simple-markdown` via `patches/`); `paracord` from `github:mr-tech/paracord`.

### project-utils (shared data layer)

- Owns the **database schema**: `prisma/schema.prisma` is the source of truth; `prisma-kysely` generates Kysely types (`src/generated/`).
- Exposes `getPostgres()` — a Kysely-over-pg **singleton** (reused to prevent `ECONNRESET` on idle connections).
- Consumed by `website` as a **git dependency** (`github:hooks-gg/project-utils#master`) with `dist/` committed to the repo; `npm run rebuild` regenerates lint + JS + rolled-up types (api-extractor), guarded by a pre-commit hook in `.githooks/`.

### preview-image-generator (screenshot service)

- Standalone Node `http` server (no framework), run under PM2 in fork mode (`ecosystem.config.js`: `wait_ready`, `shutdown_with_message: true`, `kill_timeout: 5000`). `src/server.ts` drains on SIGINT only. PM2's configured stop sends the IPC message `'shutdown'` instead, so the drain is not reached and the process is SIGKILLed after `kill_timeout` — read from PM2 source (`analysis/015-bug-evaluation-fixes-analysis.md`), host confirmation pending plan 015 M8-0. Deployment: a push to `prod` (or `preview`, port 3001) runs `prod.yml` / `preview.yml` on a self-hosted runner — `npm ci --omit=optional` (skipped on a lockfile-keyed cache hit), `npm run build`, then `.github/deploy.sh`, which replaces `deployed/<env>` with a copy of the built tree and runs `pm2 startOrReload --update-env`. The owner names running-in-prod commit `471578fa` (2026-08-23, previews observed generating normally), equal to `prod` HEAD. The 2023-08-22 last-commit date means unchanged, not stale.
- `POST /generate` (Authorization: API key) → renders the **website's own `/preview` page** (`PREVIEW_ENDPOINT` with the message JSON as a query param) in a pooled puppeteer browser (`generic-pool`), screenshots to JPEG, deletes the message's prior objects, and uploads to the S3-compatible CDN bucket at `previews/{messageId}/{nonce}.jpeg` with `public-read` ACL.
- Invoked from the website server side: `src/server/api/utils/shared.ts` fetches `env.PREVIEW_IMAGE_URL` with `PREVIEW_IMAGE_API_KEY`; messages carry a `previewImageNonce` for cache-busting.

### agent-output (process record)

- The agent pipeline's document repository (planning, implementation, QA, architecture, etc.). Its own git repo, distinct remote (`mr-tech/hooks-agent-output`). Plans 001–010 are closed; all target the `website` repo.

---

## Runtime Flows

1. **Edit/save**: browser UI state ↔ tRPC `message` router ↔ Postgres JSONB via project-utils Kysely.
1b. **Cross-tab staleness notice**: on upsert the server triggers a Pusher event on a per-message channel — `shared.ts` `upsertMessage` sends `hashMessage(message)` to `genMessageChannelKey(message.id)` as `message-update`. Each open composer subscribes (`providers/MessageProvider/usePusher.ts`) and compares the broadcast hash against `hashMessage(stripKeys(current))`; a mismatch raises the *"Message Update Detected"* prompt offering Reload, warning that local changes will be lost. It **flags divergence; it does not coordinate or merge** — owner-stated intent, 2026-08-24, verbatim: *"there's a `pusher` or similar service employed to try and allow some kind of coordination (or rather, flag when front-end state doesn't match back-end because of a different tab saving)"*, his own correction mid-sentence, confirmed against the tree. Producer and consumer must hash the same form for the comparison to mean anything; they do not today (the server hashes the upsert input, the client hashes `stripKeys` of the draft), which is why component-only edits raise no prompt.
2. **Send**: UI state → `stripKeys()`, which applies `IS_COMPONENTS_V2_FLAG` when V2 components are present → `sendWebhook()` → Discord webhook API, called from the browser. `sendWebhook` reads the bit to set `with_components=true` on the URL; it does not set the bit.
3. **Preview image (write)**: `message.upsert` → website server POSTs to preview-image-generator `/generate` → puppeteer renders website `/preview` → JPEG → DigitalOcean Spaces bucket `hooks` at `previews/{id}/{nonce}.jpeg` (public-read); the website's `deleteMessagePreviewImages.ts` cleans the same bucket keys (a table-era name — despite reading as database code, both this helper and the generator's namesake are S3 bucket operations).
4. **Preview image (read)**: the website emits `https://cdn.hooks.gg/previews/{id}/{nonce}.jpeg` (`getCDNUrl()` + `NEXT_PUBLIC_CDN_HOST`); `cdn.hooks.gg` is a CNAME to the Spaces CDN edge (`hooks.nyc3.cdn.digitaloceanspaces.com`, Cloudflare-proxied), so the request is served straight from the bucket object PIG wrote.
5. **Bot interaction**: Discord → `POST /api/interactions-edge` (signature verify) → edge commands answered inline; server commands forwarded to `/api/interactions-server` (`HOOKS_API_TOKEN`) → DB/Redis.
6. **Cron**: daily `/api/cron?key=vercel` per `vercel.json`.

---

## Data Boundaries

- **PostgreSQL** — canonical store (messages as JSONB, guilds, users, preview-image metadata). Schema owned by project-utils; all access through its generated Kysely types and `getPostgres()`.
- **Redis** (ioredis) — caching layer for the website/bot server side.
- **S3-compatible object store / CDN** — public preview JPEGs, keyed `previews/{messageId}/{nonce}.jpeg` (`dev/` prefix in development).

---

## Dependencies

- `website` → `project-utils` (git dep, committed dist), `discord-api-types` (npm), Slate, tRPC v11, NextAuth 4, Kysely, ioredis, sharp, Pusher (`pusher` server-side, `pusher-js` in the browser — the cross-tab staleness channel, Runtime Flow 1b), puppeteer-free. The git dep is declared floating (`#master`) while `pnpm-lock.yaml` pins a commit — currently `eb38a15`, which **is** project-utils `master` HEAD. The pattern's standing caution (the statbot pinned-build family): the pin trails `#master` until deliberately refreshed, so after a project-utils push the lockfile — not the declaration — says what a fresh install builds against.
- `preview-image-generator` → no project-utils dependency; talks only to the website's `/preview` URL and S3.
- Reference clones (`../discord-api-types`, `../embed-generator`) are consultation sources, not build inputs.

---

## Quality Attributes

- **Type safety**: `tsc --noEmit` is the primary gate across repos; `satisfies z.ZodType<...>` locks Zod schemas to TS types in the website.
- **Tests**: Vitest is present in the website (`vitest.config.ts`; `src/utils/__tests__/` includes `components-v2-data-layer.test.ts`, `mutual-exclusivity.test.ts`). Coverage is narrow — data-layer roundtrips — not broad.
- **Build/deploy**: the website deploys on **Vercel** (owner ruling 2026-08-23); its PM2 `ecosystem.config.json` is not the live path. `preview-image-generator` deploys under PM2.

---

## Problem Areas

| Area                                   | Severity | Notes                                                                                                                                                              |
| -------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The V2 flag decides V2-ness at one surface and is ignored at the two that show it | High | `validateContentRequirements` (`src/utils/limits.tsx`) reads `IS_COMPONENTS_V2_FLAG` as an input, over `hasStructuralV2 \|\| hasFlagV2`. The two surfaces that decide what the user sees do not: `detectMode` (`MessageProvider/index.tsx`) and `enforceImportMutualExclusivity` (`src/utils/index.ts`) both read components alone. The toggle is asymmetric for the same reason — `switchToClassic` clears the bit, `switchToV2` does not set it (`src/utils/messageMode.ts`). (`stripKeys` writing the bit from structure is not part of this debt; D-004 keeps that direction.) Until D-004 is enacted, a stored message can carry the bit, fail the send gate, and still open in Classic with nothing showing the marking. |
| Persisting writers do not share one path | Low | Three of five `message.upsert` call sites bypass `stripKeys` (see Data flow); of those, only `NewMessageModal.onSubmit` stores imports, and the two canned-intro writers persist a fixed classic message. Consistency depends on each writer remembering, so a sixth writer inherits nothing. This is **front-end cohesion, not a missing back-end gate** — see D-005, which rules the boundary must not enforce. Plan 013 takes the writer that matters (M4-a) and binds every writer to one criterion (M8-G) without unifying the path; a criterion unifying the paths would need its own owner ruling. |
| ESLint health unverified               | Medium   | Doc previously recorded ESLint as broken (circular structure error). devDependencies show an in-progress flat-config migration (`eslint` ~8.57 pinned alongside `typescript-eslint` v8 and `@eslint/js` v10). Not re-verified 2026-08-23.  |
| No CLAUDE.md / workspace self-description | Medium | Nothing in the tree states what the workspace is or which members are active; only `hooks.code-workspace` encodes it implicitly.                                    |
| Per-repo architecture record absent for `project-utils` | Low | `website.md` and `preview-image-generator.md` were created 2026-08-24 from owner-sourced answers. `project-utils` has none; D-002's rationale is owner-sourced but the rest of its intent lives only in code. |
| A failed preview generation shows a broken image, not a stale one | Medium | Owner's intent is *"Show a stale one is fine"* (`preview-image-generator.md` P-6). `upsertMessage` mints a fresh `previewImageNonce` and commits it **unconditionally**, while `postMessagePreviewImage` is fire-and-forget (`void`, `catch (_) { /* pass */ }`, response status never checked). So a down or erroring generator leaves the row pointing at `previews/{id}/{newNonce}.jpeg` with no object behind it — a 404 — while the previous JPEG sits unreferenced at the old nonce. Fix shape: rotate the nonce only on confirmed success, or fall back to the last known-good nonce. |
| `upsertMessage` counts the owner's messages on every save | Low (unmeasured) | `shared.ts` `upsertMessage` runs `countAll()` over `Messages` by `fk_users_id`/`fk_guilds_id` on every save, updates included, where the result is unused (`!message.id &&`). `schema.prisma` declares no index on either column, and Prisma creates none for foreign keys on Postgres, so the count may scan the whole table. Live indexes unread: no DB instrument on this box. The count-then-insert also has no lock or constraint, so concurrent saves at 999 can both pass the cap (plan 015 X-16, a stated limit). Registered by 015 AF-9a. |
| preview-image-generator reads its environment unvalidated | Low | `src/config.ts` casts every `process.env` value to `string`; an unset `API_KEY` composes `"Bearer "` as the accepted header. Plan 015 M8-e closes `API_KEY` only; `CDN_*` and `PREVIEW_ENDPOINT` stay unchecked. Registered by 015 AF-4. |
| Two `getDateString` copies | Low | `src/app/message/_layout/Header.tsx` and `src/app/message/f/[id]/page.tsx` each define one, with different output (`Today at …` vs the time alone); a fix to one does not reach the other (plan 015 M5-e fixes both). Registered by 015 AF-6. |
| The session→account cache outlives the session | Medium | `fetchAccountFromSession` (`src/utils/redis/index.ts`) caches `user-session-token:<token>` → `{ userId, access_token, providerAccountId }` for 600 s. It is invalidated only by an explicit `clearUser`. `authorizeGuildAdmin` trusts the cached entry and does not re-check the `Sessions` row. So any end of a session that skips `clearUser` (expiry, an adapter deletion, a sign-out whose account lookup errors, a manual DB delete) leaves the guild-admin authorisation live until the TTL expires. Plan 015 AF-17 closes the sign-out member; the class stays open. |
| One cache key, two meanings: `user-access-token` | Low | `fetchUserAccount(userId, skipUpdate)` (`src/utils/redis/index.ts`) writes `user-access-token:<userId>` for 600 s in two modes: a refreshed account or `null`, or the raw row. The first caller to miss decides what every caller reads. Plan 015's code-review CR-3 was one instance. 015 AF-18 recommends retiring `skipUpdate`, whose only caller is sign-out; this row closes when that lands. |
| The session cookie's name is decided in three places | Low | `getServerSideSessionCookie.ts` picks `next-auth.session-token` or `__Secure-…` by `NODE_ENV`, while `getClientSessionCookie.ts` and `Redirects/Server.tsx` accept either. Two rules for one cookie can disagree under a non-default deployment. Registered by 015 AF-18. |
| User-facing error copy is inline, and "Invalid URL" has already drifted | Low | At `1e12837` the string appears at 8 non-test sites in two spellings: `Invalid URL` (`WebhookMenu`, `EmbedAuthor`, `EmbedTitle`) and `Invalid URL.` (`LinkButtonEditor`, `limits.tsx` twice, `message.ts`). An i18n catalogue (`src/lang/generated/*.json`, `invalidUrl`) exists, but nothing outside `src/lang` consumes it. This is the drift shape `website.md` A-3 records for the dropped-types notice. Plan 015 D29 adds a ninth copy, following the current pattern. Registered by 015 AF-21. |
| Enter-to-confirm in dialogs rests on an unidentified mechanism | Low | `WarningDialog`, `ConfirmationDialog` and `ImageUploader` each guard their `useHotkeys(['enter'])` handler with `document.activeElement?.tagName !== '~/components/Button'`. A DOM `tagName` is never an import path, so the compare is always true and guards nothing. A real-Chrome read at website `6001f7f` (`agent-output/verification/015/m3-chrome-read/README.md`) shows Enter on a focused Cancel does **not** run confirm, so something else stops the keydown before the hotkey. A jsdom document-root mount shows it stopped in the capture phase at `document`; **what stops it is unread.** So the property "a Cancel key press never deletes" is held by a mechanism nobody has named, has no test, and has a code-level guard that looks like the protection but is not. A dependency change (`react-hotkeys-hook`, `@react-aria/interactions`, the dialog primitive) could remove it silently. Plan 015 D30 removed the fix as a non-defect; X-18 names the reopening class. Fix shape for a later chain: identify the stopping mechanism, then delete the dead compare or replace it with a real check, under a real-browser cell. Registered by 015 AF-22. |
| Validation errors render into generated preview images | Low | `DiscordMessageEditor` shows its validation lines and the `errorBorder` (`validateEmbedCharacterCount`, `validateDisplayableTextCount`; from plan 015 M6-l, the over-40 count) whether or not it is editing. `/preview` renders that same component (D-001), and the generator screenshots `/preview` (D-003). So the stored preview image of an over-limit message carries red error chrome meant for the author. No owner intent on this is recorded. Fix shape, if wanted: the preview route renders without validation chrome, once, for every error. That is one change, not one per error. Registered by 015 AF-25. |
| A hand-made sign-in visit can give one user several Discord accounts, and per-user reads take an arbitrary one | Low | The owner's intent: *"If someone signs in with a different account, that's a different Hooks user"* (rulings `766bd4b`). The site's own sign-in entry points hold to it: NavMenu, and the edit and send pages' Log in panels, call `signIn('discord')` only without a session. But next-auth 4.24.5 links a new Discord account to a user already signed in (`callback-handler.js`, `linkAccount`). `Account` is unique only on `(provider, providerAccountId)`, and `auth.ts` has no `signIn` callback, so visiting the sign-in URL by hand while signed in creates a second Discord row on the same user. `fetchUserAccount` (`redis/index.ts`) and sign-out's `removeUserSession` (`auth.ts`) read by `userId` alone, so with two rows each takes an arbitrary one. Sign-out may then revoke one token and leave the other live. The owner ruled this a known limit, carried by a handoff covering both sites and reopened if a user with two Discord rows is found or reported. Population unread. Registered by 015 AF-26. |
| The shared error fallback shows users the stack trace | Low | `src/components/ErrorBoundary.tsx` `ErrorFallback` renders `error.message` and `error.stack` in `<pre>` with a "Try again" button. It is used by `DiscordContentEditor`. So a render crash there shows an end user an internal stack, which is bundle paths in production. The wrapper takes no fallback prop, so a surface that needs a different fallback (plan 015 M5-h's `/preview`) has to bypass it. Fix shape: the wrapper takes a fallback, and the default shows a plain message, with the stack only in development. Registered by 015 AF-27. |
| preview-image-generator deploys over its running tree | Low | `.github/deploy.sh` removes and re-copies `deployed/<env>` before `pm2 startOrReload`, so the old process stops — and, once it drains, drains — out of a directory already replaced. Whether `drain()` loads anything from disk lazily is unread. Registered by 015 AF-9d. |
| 2023-era toolchain in preview-image-generator | Low (functional) / unassessed (security) | 2023 deps (puppeteer 21) far behind the website's stack, on a live production service. **Functional-drift risk is structurally nil**: the service screenshots the website's own `/preview` route, so it inherits preview-surface changes for free and needs no adjustment (owner-sourced, `preview-image-generator.md` P-2) — and it stays nil only while that reuse holds, so a change ending the reuse must price a toolchain update with it. **Security and maintenance exposure is a separate question nobody has assessed.** |

Resolved since the 2026-04-06 revision (recorded here as history, not declared above): the three Plan-001-era "High" items — stale V2 component constants, `rekey()` key duplication, and `sendWebhook` missing the V2 flag — no longer reproduce against the tree: the old constant names are gone from `src/constants`, and the V2 flag now reaches Discord. That last resolution was recorded with the wrong mechanism until 2026-08-24 — it read `sendWebhook.ts` *applies* `IS_COMPONENTS_V2_FLAG`, a claim taken from the constant appearing in the file rather than from what the file does with it. `sendWebhook` reads the bit to set `with_components=true`; `stripKeys` applies it, on both write paths. The item is still resolved; only the mechanism was wrong. "No test framework" was superseded by Vitest adoption.

Resolved 2026-08-23 by owner ruling (via steering-01): "cdn repo status unresolved" — cdn **is** deployed, so the earlier inference that the S3 path had superseded it was wrong about the deployment (the remaining tension is re-scoped as the preview-storage seam above). "Deployment-target ambiguity (website)" — production is Vercel; the PM2 config is not the live path.

Resolved 2026-08-23, later the same day (owner ruling + DNS corroboration, re-derived by this agent): the **preview-storage seam**, formerly the High row here. `cdn.hooks.gg` is a CNAME to `hooks.nyc3.cdn.digitaloceanspaces.com` — read and write paths are the same bucket, previews are not broken, and the production table's existence is moot for previews since no preview request reaches the cdn app. What the seam investigation established: the app's Postgres route was vestigial (its table was removed from the schema by project-utils `4b5c9b6`; only cdn's lockfile-pinned pre-removal commit `8b08d23e` still declared it — as model `MessagePreviewImage`, singular, mapped via `@@map` to the plural table name). Later the same day the write path's last inference was also closed: the owner named PIG's running-in-prod commit (`471578fa`), which is identical to this tree's `prod` HEAD, and observed previews generating normally — so every step of the pipeline (write code, bucket, DNS, outcome) is evidenced against production rather than read from a tree that might differ from it.

Resolved 2026-08-23, closing the cdn thread (owner ruling, verbatim): *"I think cdn is entirely deprecated. I mistook that for the preview-image-generator when I was reading about it here."* — the earlier "cdn is deployed" ruling recorded above was the owner's own conflation with PIG, corrected by the owner. The repo was moved out of the project space to `/usr/local/bin/hooks-deprecated/cdn` (by steering-01; clean at `e8d3563`, identical to `origin/master`, verified intact after the move). This closed both cdn rows formerly here: "current function unknown" (answer: nothing — the app is deprecated, `cdn.hooks.gg` was never it) and the Medium "floating ref vs pre-removal lockfile pin" (its subject left the project; re-derived that website, the sole remaining `#master` consumer, pins `eb38a15` = current project-utils `master` HEAD, so no live instance exists — the pattern-level caution is recorded under Dependencies). What outlives cdn is the naming trap now noted in Runtime Flow 3: two `deleteMessagePreviewImages` helpers (website and PIG) read as database code but perform bucket operations.

---

## Decisions

### D-001 — Single component tree for edit and preview
- **Context**: WYSIWYG fidelity requires the preview to be pixel-true to the editor.
- **Choice**: One `DiscordMessageEditor` tree, mode-switched by `editableState.showEdit`.
- **Consequences**: No drift between edit and preview rendering; every sub-component must implement both modes. Reused by the screenshot pipeline (the `/preview` route renders the same tree).
- **Standing**: **confirmed inference**, not owner-authored — put to the owner 2026-08-24, who answered *"Agent's inference is correct."* It is only as strong as the inference he was shown; re-verify the mechanism, not the agreement. See `website.md` W-3.
- **Related**: Plans 001, 004.

### D-002 — Shared data layer as a git-dependency package with committed dist
- **Context**: Multiple deployables (website, and at the time cdn) needed one schema and one connection discipline.
- **Choice**: `project-utils` owns `schema.prisma`, generates Kysely types via prisma-kysely, exports a `getPostgres()` singleton, and is consumed as `github:hooks-gg/project-utils#master` with `dist/` committed. Owner-stated rationale (2026-08-23, verbatim): *"Same architecture as Statbot. To put it shortly; api-extractor."* — a git dependency has no publish step; the committed `dist/` plus the API Extractor `.d.ts` rollup are what make the repo installable as-is.
- **Verification**: `project-utils` and statbot's `statbot-utils` carry an identical `build:types` script (`tsc -p ./tsconfig.json --declaration true --outDir build/types && api-extractor run`), both hold an `api-extractor.json`, and both track `dist/` in git (13 and 264 files respectively).
- **Consequences**: No registry publishing needed; consumers pin `#master`, so a project-utils push changes consumers on next install; committed build artifacts must be kept in sync by the pre-commit hook — and must never be "cleaned up" as if they were stray build output.
- **Related**: statbot workspace (`statbot-utils`), which this deliberately mirrors.

### D-003 — Preview images by screenshotting the app's own preview route
- **Context**: Preview images must match what the editor shows (see D-001).
- **Choice** (owner-sourced 2026-08-24, verbatim): *"That's the only way I figured how to do it: to render an exact representation of the message in the browser, one had to load and snapshot it in the browser. If there are other ways, I just did not know of them."* A separate puppeteer service renders the website's `/preview` page and uploads JPEGs to public S3 rather than re-implementing rendering server-side.
- **Standing**: this is a **route he knew**, not a trade-off he weighed — unlike D-002, whose rationale he authored. The durable requirement is *an exact representation of the message*; puppeteer is the implementation that requirement could reach. A better route is what this decision was waiting for, not a violation of it. The bar for proposing one is now stated: a demonstration of what "close enough" actually looks like, his current valuation being that the setup works and costs are immaterial (`preview-image-generator.md` P-1, conditional on those facts holding). See `website.md` W-4.
- **Consequences**: Zero rendering drift; adds a headless-browser service and an S3/CDN dependency; the service is coupled to the website's `/preview` URL contract (message JSON in a query param).

### D-005 — The back end reflects what the front end allows
- **Context**: Three of five `message.upsert` call sites bypass the `stripKeys` serialiser, and the tRPC boundary neither normalises nor rejects. This architect registered that in 2026-08-24 as a missing boundary enforcement, and asked the owner whether `message.upsert` should refuse an unserialised message.
- **Choice** (owner ruling, 2026-08-24, verbatim): *"A message is allowed to be saved in a bad state (e.g., missing content, over character limits, etc.) … I'd say that the back-end reflects what the front-end allows. If a shape is allowed in the front-end, then it's not silently morphed in the back-end. If there's a question of what's allowed in the front-end, that's the question to ask. (We're talking strictly about saving the message as it's being edited.)"* Persisting an invalid draft is intended: validity is recorded (chain 012's `valid` column), never enforced at the write boundary. The back end stores the shape the front end permitted, unaltered. Where a shape should not be storable, the answer is to settle what the front end allows — not to add a server-side gate.
- **Alternatives**: *Gate `message.upsert` on `validateMessage`* — proposed by this architect and excluded by the ruling: it would refuse the bad-state saves the owner says are allowed. *Normalise server-side* — excluded by the same words, as silent morphing.
- **Consequences**: The serialiser must not delete user content on its way to the DB, which is the architectural ground for D18/M8-G (chain 013): `stripKeys`' output is its input modulo `_key`s plus the V2 bit, and the block-and-ask for a lossy save lives at the front-end writers. The residual debt is front-end cohesion — writers sharing a criterion rather than a path (see Problem Areas) — and is not resolvable by anything at the boundary. The owner scoped this ruling to *saving a message as it is being edited*; it does not speak to the import surfaces, whose disposition is D-004's five rows.
- **Related**: D-004; plan 013 (D18, M8-G); chain 012's `valid` column, which is the recording mechanism this decision relies on instead of enforcement.

### D-004 — The flag is the mode
- **Context**: A Discord message is Components V2 by carrying `IS_COMPONENTS_V2_FLAG` (32768, `1 << 15`). The website had no single answer to "what makes a message V2": the send gate reads the bit, the composer and the importers read the components. Discord itself can send a V2-marked message whose top-level components are all Action Rows — a shape with the marking and no V2 structure — which under a structure-only rule opens in Classic with nothing showing the marking.
- **Choice** (owner ruling, 2026-08-24, verbatim): *"If it has the flag, then it's V2. If it's V2 and there are conflicts in the body, there's an error mesage."* [sic] A message is Components V2 iff its `flags` carry `IS_COMPONENTS_V2_FLAG` **or** its components include a V2 type — the predicate `validateContentRequirements` already uses — and the composer shows V2 for every such message. The flag is an input that decides V2-ness, not an output read back from structure. A V2 message whose body carries content or embeds is the conflict: a stored record in that state shows the composer's error. At the two JSON submission surfaces the disposition is not that predicate but a five-row table over the cell (V2 bit, V2 components, classic body), ruled 2026-08-24 as D17 under the owner's governing principle — *"fail gracefully when no content will be lost. If content must be lost to fulfill the request, block, notify, and present the user with a choice."* A bit standing over a classic body is warned and cleared, keeping the body; V2 components together with a body put the choice to the user. Nothing is dropped silently, and nothing is refused. On save, `stripKeys` sets the bit whenever V2 components are present (structure → flag, one direction) and never clears it; the toggle to V2 sets it and the toggle to Classic clears it, so the bit and the mode shown never disagree within a session.
- **Alternatives**: *Mode derived from structure, the flag an output only* — the premise every document in this line held until 2026-08-24, resting on `detectMode` reading `hasV2Components` alone; withdrawn by the owner. It cannot represent a marked message with no V2 structure, and it makes the send gate and the composer disagree about the same record. *Normalise the bit on every save-path writer* — was in front of the owner and not taken; it would repair records silently rather than surfacing the conflict.
- **Consequences**: The bit becomes load-bearing data, so every writer that reaches `message.upsert` must produce it correctly — which the current call-site convention does not guarantee (see Problem Areas). Three surfaces state the withdrawn premise in code today: `detectMode` and `enforceImportMutualExclusivity` must move to the flag-or-structure predicate, and `switchToV2` must set the bit its counterpart already clears. Behaviour changes for existing stored records: a message carrying the bit over Action Rows only, or over no components, now opens in V2. The bit standing over such a message is not a conflict and is not refused — only the bit together with content or embeds is.
- **Related**: Plan 013 (Decisions Register D15 and D17, with D11/D13/D16 bounding the conflict class and the toggle); plan 012's V2 data-layer work; research `8311155a`, whose "flags derive from structure" clause this supersedes. Two premises were withdrawn on the way here and neither survives in this decision: that mode derives from structure (withdrawn at D15), and that a conflicting submission is refused at import (D5 option (a), withdrawn at D17).

---

## Roadmap Readiness

Plans 001–010 (all website-scoped) are closed. Plan 012 (`message.valid` for statbot) is Released; plan 013 (Components V2 editing surfaces) is open and in critique, and it is the plan that enacts D-004 across the three surfaces still holding the withdrawn premise. The preview pipeline is fully mapped end-to-end (generate → bucket → CNAME → viewer). The two V2 Problem Areas above are the live architectural debt; ESLint health remains the one low-stakes unknown.

---

## Recommendations

1. Re-verify ESLint health in the website and either close or re-scope that Problem Area.
2. Continue the per-repo records: `website.md` and `preview-image-generator.md` exist as of 2026-08-24. `project-utils` is the remaining gap and the least urgent — D-002's rationale is already owner-sourced.
3. When refreshing website's project-utils pin after a project-utils push, treat the lockfile update as a deliberate step (see Dependencies) — the declaration alone never says what a fresh install builds against.
4. Close the P-6 preview-failure defect (Problem Areas): the owner's intended behaviour on a failed generation is already stated, so this needs an implementation, not a ruling.
5. Assess the security and maintenance exposure of preview-image-generator's 2023 dependencies. P-2 retires the functional-drift concern but explicitly does not speak to this, and the service is live in production.
