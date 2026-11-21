# Fixer-queue inventory (scoping)

Read-only pass, 2026-11-21. origin/master heads read: website `76da25c`, project-utils `749606d`, preview-image-generator `8512a1d` (master and prod). All "still present" evidence is `git -C <repo> show origin/master:<path>` or `git grep ... origin/master`, at those heads. Handoff paths are relative to `/usr/local/bin/hooks/agent-output/`.

## Disclosures

1. Two Bash calls were refused by the secret-file gate hook because they could print lines of preview-image-generator `.github/workflows/prod.yml`. I was not aiming at that file's contents. I re-issued without those paths and used `git log --oneline --numstat 471578f..origin/master -- <the two workflow files>` (empty output) to show the files are unchanged since the handoff's baseline. No key value was read or printed.
2. One Bash call that wrote this file through a heredoc was refused by the record-write gate; this file was then written with the Write tool.
3. Impact and size are my judgments. "not verified" is stated wherever I did not read the code.

## Population and counts (commands)

- Handoff files: `ls -p handoff | grep -vc /` = 31, all read whole (017's B-6/B-8/B-9 result text and the middle of the generic-pool handoff skimmed; they are observation records).
- TODO.md items: `grep -c '^## ' TODO.md` = 10 (T1..T10).
- INBOX.md at HEAD: `git show HEAD:INBOX.md | grep -c '^## 20'` = 0 entries, so nothing to classify.
- Research: F-1..F-50 and H-1..H-8. Plan 015 (`planning/closed/015-bug-evaluation-fixes.md`, released; `deployment/closed/015-bug-evaluation-fixes-deployment.md`) covers every F-id except F-36 (its X-1); F-15/F-39 handled by removing the dead compare (X-18). Rows below marked "plan 015" were not individually read at master; the others were.
- Class counts are by row, listed in the Counts section at the end (from `grep -c`).

## Table: TODO.md and handoffs

| Id | Source | Subject | Class | Repo + files | Still present at origin/master? | Impact | Cause proven? | Size | Notes |
|---|---|---|---|---|---|---|---|---|---|
| T1 | TODO.md | competitor-feature selection to owner | record | none | n/a | none | n/a | n/a | held until other work done |
| T2 | TODO.md | lint debt in `src/utils/index.ts` + resolver test (34 findings at 6d78b19) | test-only | website `src/utils/index.ts`, `src/utils/__tests__/utils.disposition-resolver.test.ts` | not verified (no eslint run) | internal | yes | M | 32 of 34 are test formatting; `import/no-cycle` is a module-structure question |
| T3 | TODO.md | check-repo.js CHECK 4 lacks stage suffixes | record | agent-output `tools/check-repo.js` | n/a | internal | yes | S | owner approval + convention decision |
| T4 | TODO.md | verification/ probe-copy convention | record | agent-output | n/a | none | n/a | n/a | process |
| T5 | TODO.md | 013 checks never traced to criteria | record | agent-output | n/a | none | n/a | n/a | process |
| T6 | TODO.md | no roadmap | owner-only | agent-output | n/a | none | n/a | n/a | owner-only fields; standing prohibition on raising it |
| T7 | TODO.md | check-repo --status false positives | record | agent-output `tools/check-repo.js` | n/a | internal | yes | S | owner approval |
| T8 | TODO.md | record-tool test naming convention | record | agent-output | n/a | none | n/a | n/a | process |
| T9 | TODO.md | dead matcher entry `/api/guilds/(.*)` in middleware | CANDIDATE | website `src/middleware.ts` | YES: `src/middleware.ts:6` `matcher: ['/message', '/message/(.*)', '/api/guilds/(.*)', '/preview']`; `git grep -c "api/guilds" origin/master -- src` = 1 | internal-only (guards nothing) | yes | XS (1 line) | red test: matcher names no route-less path; ride along with any chain touching the file |
| T10 | TODO.md | take over three open carriers | record | agent-output | n/a | none | n/a | n/a | process |
| H01 | handoff/017-existing-items-backlog-post-deploy-2026-11-19.md | post-deploy rows B-6..B-11 and F-1..F-7 production-only assumptions | record | n/a | n/a | n/a | n/a | n/a | observation carrier; B-7/B-10 scheduled readers; F-7 is a UAT focus look |
| H02 | handoff/anchored-popover-first-load-test-is-order-dependent-2026-11-18.md | first-load red test is order-dependent | test-only | website `src/components/AnchoredPopover/__tests__/Child.portal-inside-open-dialog.test.tsx` | not verified | internal | yes (measured) | S | |
| H03 | handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md | authorizeGuildAdmin tests membership, not admin bits | already-fixed | website `src/server/api/utils/authorizeGuildAdmin.ts` | not a defect: `src/utils/redis/index.ts:235` `if (guild.owner \|\| hasDiscordPermissions(guild.permissions, ['Administrator']))` fills the list the check searches (`authorizeGuildAdmin.ts:32,40`) | none (name only) | yes | n/a | answers the handoff's own unread question; its file paths are stale (`routers/utils/` vs `api/utils/`) |
| H04 | handoff/backfill-valid-guard-has-no-db-backed-instrument-2026-08-26.md item 1 (MS-4) | NULL-guard mutant has no falsifier | test-only | website `src/scripts/backfillValid.ts` | file exists at origin/master | internal | yes | L | needs a DB-backed harness (owner decision to build) |
| H05 | same, item 2 (CR-L11) | guard host string may differ from the dialled host | needs-decision | website `src/scripts/backfillValid.ts` | yes: `:27` host built from URL, `:33` `assertConfirmedTarget` | internal, LOW, one-off script | yes | M | design choice: derive from connector vs URL string |
| H06 | same, item 3 | assumption-7 falsifier unreadable | feature | website `src/scripts/` | n/a | internal | yes | M | wants a new read-only table-wide classifier |
| H07 | handoff/bug-evaluation-fixes-unclosed-assumptions-2026-11-08.md (8 assumptions) | unchecked chain-015 assumptions | record | n/a | n/a | n/a | n/a | n/a | each is a verification, none a known defect |
| H08 | handoff/bug-evaluation-research-pm2-show-lines-2026-11-10.md | research doc advises `pm2 show` | record | agent-output research | n/a | none | yes | XS | researcher-owned text edit |
| H09 | handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md | cron key is the fixed string `vercel` | needs-decision | website `src/pages/api/cron.ts` | YES: `cron.ts:15` `if (req.query.key !== 'vercel')` | low: no code writes `ScheduledMessages`, so a trigger sends nothing today | yes | S code + owner-provisioned Vercel env secret | decision: provision a secret (owner-only env) vs delete the dead cron |
| H10 | handoff/deleted-message-url-serves-blank-editor-2026-11-20.md | deleted message URL answers 200 with a blank editor | CANDIDATE | website `src/providers/MessageProvider/index.tsx`, `src/server/api/utils/shared.ts` | YES: `MessageProvider/index.tsx:210` takes `error: messageError`, `:330` exposes it; `git grep -n messageError origin/master -- src` (non-test) shows no consumer of the provider's value; `shared.ts:160` `executeTakeFirstOrThrow` | user-visible breakage | partly (mechanism read; deleted vs never-existed not run) | S-M | same fix family as H11 and H12; handoff says the intended page "needs his word" (copy for the not-found state) |
| H11 | handoff/editor-shows-blank-shell-when-personal-message-load-is-refused-2026-11-20.md | refused user sees blank shell, getOne retried on 404, no error text | CANDIDATE | website `src/providers/MessageProvider/index.tsx`, a consumer in the message editor layout, `src/providers/TrpcProvider.tsx` | YES: as H10; `TrpcProvider.tsx:16` `new QueryClient()` with default retry | user-visible breakage on refusal (no content leaked) | partly (render path read; text after retries not checked) | S-M | observed on production at 983681c |
| H12 | handoff/get-one-absent-number-fails-without-not-found-2026-11-19.md | getOne on an absent number raises a raw error, not NOT_FOUND | CANDIDATE | website `src/server/api/utils/shared.ts`, `src/server/api/routers/message.ts` | YES: `shared.ts:145-160` getMessage ends `.executeTakeFirstOrThrow()`; `routers/message.ts:57` calls it before the `:62-66` NOT_FOUND branch | low existence oracle + a 500 that drives the retries in H10/H11 | yes | S | map NoResultError to the same NOT_FOUND as `message.ts:63-66`; red test: absent id and foreign id yield one code |
| H13 | handoff/fix-website-dependency-audit-first-run-2026-11-21.md | first scheduled audit run (R1) | record | n/a | n/a | n/a | n/a | n/a | devops reader, crontab `13 7 21-28 11 *` |
| H14 | handoff/hydrated-recent-list-returns-guild-message-rows-2026-11-19.md | session hydration returns metadata of any guild message whose number the user stored | CANDIDATE | website `src/server/api/utils/shared.ts`, `src/server/auth.ts` | YES: `shared.ts:109-126`, the `or([... fk_users_id = caller, ... eb('Messages.fk_guilds_id', 'is not', null)])` arm at `:123-126` | security: cross-guild metadata (id, name, previewImageNonce, guildId; not content) | yes (code read, query not run) | S | restrict the guild arm to the caller's own guilds; the list is already in hand at `auth.ts:153-156` |
| H15 | handoff/message-init-cached-edits-lost-2026-08-27.md | route-0 refresh replaces cached edits with intro message | already-fixed | website `src/providers/MessageProvider/index.tsx` | gone: `:164-176` now `draft = routeZeroDraftFor(tabId())` ... `: copyIntroMessage()` (draft store from plan 017); `MessageProvider.stored-draft.test.tsx` exists | none | yes | n/a | handoff is still Open but its defect form is superseded |
| H16 | handoff/mutant-equivalence-by-argument-unverified-2026-11-19.md (7 mutants) | surviving mutants judged equivalent by argument | test-only | website `leaveWithoutAlert.ts`, `messageDrafts.ts`, `withLocalStorage.ts`, `StyledLink.tsx`; generator `generateImage.ts` | n/a | internal | n/a | M | trigger-driven QA task |
| H17 | handoff/newmessagemodal-persist-gate-choice-unreachable-2026-08-27.md | conflicting V2+content draft: Save disabled, no choice UI | needs-decision | website `src/app/message/_components/NewMessageModal.tsx` | YES: `:126` `contentFloorError = loadedMessage ? validateContentRequirements(loadedMessage)` on the raw draft; `:192-193` `disableSave` includes it | user-visible breakage on bot/webhook/code import (JSON tab unaffected) | yes (mounted, observed) | S once decided | decision: float via `applyDisposition` as the JSON tab does, or block Save by design |
| H18 | handoff/one-hooks-user-several-discord-accounts-2026-11-08.md | sign-out revokes one arbitrary Discord row | needs-decision | website `src/server/auth.ts`, `src/utils/redis/index.ts` | YES: `auth.ts:76-83` `executeTakeFirst()` by userId; `redis/index.ts:193-196` same; no signIn callback (only `events.signIn`, `auth.ts:220`) | low (needs a hand-typed sign-in URL); population unread | yes | M | owner ruled a known limit (plan 015 D34); decision: refuse the link (W-7) vs allow several |
| H19 | handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md | text in an open content editor is lost on reload | needs-decision | website `src/utils/messageDrafts.ts`, content editor | not verified | possible data loss, low priority | no (not compared with base 1ad625e) | M | decision: intended draft boundary |
| H20 | handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md | API key literal in two workflow files | owner-only | generator `.github/workflows/prod.yml`, `preview.yml` | yes by inference: `git log --oneline --numstat 471578f..origin/master -- <both files>` is empty (unchanged since the baseline where the literal count was 1 each); contents not printed | security | yes | S code | needs an owner-created GitHub secret; owner ruled no rotation |
| H21 | handoff/preview-image-generator-drain-under-load-unobserved-2026-11-08.md | SIGKILL'd stop and orphan Chromium unobserved | record | n/a | n/a | n/a | n/a | n/a | devops host read at trigger |
| H22 | handoff/preview-image-generator-generic-pool-private-field-2026-11-08.md | generic-pool private field reach | record | generator `src/getPool.ts` | guard present (`getPool.ts:19-23`, `:148`) | n/a | n/a | n/a | devops read at version change |
| H23 | handoff/preview-image-generator-host-security-posture-2026-11-08.md | H-001..M-002 and L-001/L-002 | owner-only | generator `src/getPool.ts`, `.github/deploy.sh`, `src/server.ts`; host | yes: `getPool.ts:27-28` `max = 10`, `min = 2`; no `pipe`/acquire bounds (grep hit only `:146`); `deploy.sh:4` `cp -r ./`; `package.json:20` `puppeteer ^21.1.0` | security | yes | M-L, includes host acts | owner ruled "no effort" 2026-11-08; the code-only slices (pipe:true, deploy.sh chmod, pool bounds) are fixer-shaped but held by that ruling |
| H24 | handoff/pusher-message-update-channels-are-public-2026-11-19.md | public Pusher channels carry a save hash | needs-decision | website `src/server/api/utils/shared.ts`, `src/providers/MessageProvider/usePusher.ts` | YES: `shared.ts:291-299` trigger; `usePusher.ts:57-61` public subscribe | low (32-bit hash) | yes (code); Pusher settings unread | M | private channels need an auth endpoint (a feature); owner kept it out of the fixer chain |
| H25 | handoff/qa-014-bc7-closing-observation-and-test-inventory-2026-11-10.md | QA / analyst bookkeeping | record | n/a | n/a | n/a | n/a | n/a | |
| H26 | handoff/send-check-validity-excluded-toast-and-file-upload-2026-11-11.md item 1 | generic send-failure toast | feature | website `src/utils/sendWebhook.ts` | yes: `sendWebhook.ts:90-94` | minor UX | yes | S | owner ruled it out (plan 016 D-12) |
| H27 | same, item 2 | File component cannot be sent | feature | website | n/a | feature | yes | L | held by the owner's prompt-2 ruling |
| H28 | handoff/uat-local-stack-test-free-port-race-2026-11-11.md | free-port race hangs the test file | test-only | agent-output `tools/uatLocalStack.test.js` | n/a (not product) | internal | yes (measured) | S | record tool |
| H29 | handoff/update-preferences-recent-message-ids-accepts-non-int8-2026-11-19.md | recentMessageIds accepts non-int8 strings, fails the user's own session | CANDIDATE | website `src/server/api/routers/user.ts` (+ `shapes.ts`) | YES: `user.ts:32` `recentMessageIds: boundedArray(z.string(), MAX_RECENT_MESSAGE_IDS + 1).optional()`; `shapes.ts:114-117` `messageIdShape` (regex + `MAX_MESSAGE_ID`) is available to reuse | user-visible breakage, self-only | yes (reviewer ran it) | XS-S | plan 018 excluded it as X-10 |
| H30 | handoff/website-018-standing-risks-save-toast-and-lint-stack-2026-11-20.md RK-3 | reason-less toast on re-saving an over-bound message | needs-decision | website editor Save error handling | yes (owner kept the toast: plan 018 D-10/X-18) | minor | yes | S | decision: show the reason on Save |
| H31 | same, RK-5 | lint stack on a deprecated ESLint major | record | website lint deps | n/a | internal | yes | M | stated limit X-16 |
| H32 | handoff/website-api-handler-hardening-2026-10-10.md item 1 | missing `.end()` on a 400 | already-fixed | website `[code].ts` | discharged at 7606149 per the handoff; not re-read | n/a | n/a | n/a | |
| H33 | same, item 2 | constant-time secret compare at 3 sites | CANDIDATE | website `src/pages/api/v1/guilds/[guildId]/messages.ts`, `.../messages/[id].ts`, `src/pages/api/interactions-server.ts`, one new helper | YES: `messages.ts:23` `req.headers.authorization !== \`Bearer ${key}\``; `interactions-server.ts:11` `!== env.HOOKS_API_TOKEN`; `git grep -c timingSafeEqual origin/master -- src` returned no matches | security hardening, exploitability unmeasured | yes | S | keep fail-closed on unset key, accept exactly `Bearer <key>` |
| H34 | same, item 3 | v1 guard-coverage spec test | test-only | website `src/server/api/v1/__tests__/` | n/a | internal | yes | S | |
| H35 | same, item 4 | STATBOT_API_KEY through env.mjs | needs-decision | website `src/env.mjs` | `grep -c STATBOT_API_KEY` of `src/env.mjs` at master = 0 | internal | yes | S | a required var turns a missing var into a failed build: owner rules the release behaviour |
| H36 | same, item 5 | move the shared response double | test-only | website `src/server/api/v1/__tests__/helpers/apiResponse.ts` | not verified | internal | yes | XS | |
| H37 | handoff/website-git-dependencies-resolve-unpinned-2026-11-20.md | paracord and project-utils named without a commit | CANDIDATE | website `package.json`, `pnpm-lock.yaml` | YES: `package.json:69` `"project-utils": "github:hooks-gg/project-utils#master"`, `:126` `"paracord": "github:mr-tech/paracord"` | internal / supply chain; frozen installs unaffected | yes | S | handoff says "if the owner routes it"; pin to the lockfile's commits |
| H38 | handoff/website-trpc-batch-size-and-deps-review-leftovers-2026-11-20.md item 1 | one request can carry ~1000 saves | already-fixed | website `src/pages/api/trpc/[trpc].ts` | `[trpc].ts:10` `allowBatching: false` | n/a | n/a | n/a | |
| H39 | same, item 2 | `x-pathname` trusted / `x-query-params` write | already-fixed | website `src/middleware.ts` | `git grep x-query-params origin/master -- src` (non-test) none; middleware sets `x-pathname` for `/message` | n/a | n/a | n/a | handoff changelog says premise corrected |
| H40 | same, item 3 | `overrides` key does nothing under pnpm | already-fixed | website `package.json` | `grep -c '"overrides"'` of `package.json` at master = 0 | n/a | n/a | n/a | |
| H41 | same, item 4 | project-utils lists `prisma-kysely` under dependencies | CANDIDATE | project-utils `package.json` (then a website lockfile bump) | YES: `package.json:14` `"prisma-kysely": "^1.5.0"` in `"dependencies"` (`:11`; `devDependencies` at `:17`) | internal (24 never-loaded audit entries in the prod graph) | yes | XS + website lock move | cross-repo; bundle with F-36 and H37 |
| H42 | same, item 5 | nothing forces new list inputs to use the cap | test-only | website `src/server/api/utils/__tests__/helpers/listBoundSites.ts` | n/a | internal | yes | S | trigger-driven |
| H43 | same, item 6 | scheduled dependency audit | already-fixed | agent-output `tools/website-dependency-audit.js` | discharged per the handoff changelog | n/a | n/a | n/a | |
| H44 | same, item 7 | dispositions assume Vercel hosting | needs-decision | website hosting | `ecosystem.config.json` still present per handoff | none today | n/a | n/a | conditional on a hosting change |
| H45 | handoff/website-trpc-batching-refusal-outside-caller-read-2026-11-21.md | does any outside caller batch? | record | n/a | n/a | n/a | n/a | n/a | needs a request-level read; rollback patch exists |

## Table: research/codebase-bug-evaluation-2026-11-08.md (F rows)

Evidence column: file:line read at origin/master, or "plan 015" where the finding is covered by the released plan 015 and I did not read it at master (not verified individually).

| Id | Subject | Class | Repo + files | Evidence (origin/master) | Notes |
|---|---|---|---|---|---|
| F-1 | cron `error = null` | already-fixed | website `cron.ts` | `cron.ts:26` `.where('ScheduledMessages.error', 'is', null)` | |
| F-2 | empty `in ()` | already-fixed | website `shared.ts` | `shared.ts:113` `if (!messageIds.length) return [];`, `:176` `guilds.length ?` | |
| F-3 | revoke sends no token | already-fixed | website `auth.ts` | `auth.ts:60-73` `revokeAccessToken(accessToken)`, called at `:92`; the token-append line itself not printed | partly verified |
| F-4 | cap off-by-one | already-fixed | website `shared.ts` | `:275` `>= MAX_MESSAGES` | |
| F-5 | unanchored id regex | already-fixed | website `shapes.ts` | `:119` `/^(0\|[0-9]{17,23})$/` | |
| F-6 | NODE_ENV guard | already-fixed | website `env.mjs` | `:123` `prop !== 'NODE_ENV'` | |
| F-7 | parse before signature | already-fixed | website `interactions-edge.ts` | `:48` validity test before `:52` `JSON.parse` | |
| F-8 | Promise.all inner await | already-fixed | website `auth.ts` | `:153-156` | |
| F-9 | cookie parser | already-fixed | website | `ls-tree` shows no `parseServerCookies` file | file removed |
| F-10 | null cache | already-fixed | website `redis/index.ts` | plan 015 | not verified |
| F-11 | CDN `/dev:port` | already-fixed | website `getCDNUrl.ts` | port precedes `/dev` in the template | |
| F-12 | black embed unsavable | already-fixed | website `shapes.ts` | `:219` `.min(0)` | |
| F-13 | author name limit | already-fixed | website `limits.tsx` | `:95` uses `MAX_EMBED_AUTHOR_NAME_LENGTH` | |
| F-14 | title error text | already-fixed | website `limits.tsx` | `:134` `'Title is too long.'` | |
| F-15 | Enter on Cancel confirms | already-fixed | website dialogs | `ConfirmationDialog.tsx:14`, `WarningDialog.tsx:19` use `useDialogEnter` | |
| F-16 | send has no in-flight guard | already-fixed | website `send/page.tsx` | `:90`, `:168` `isSending` | |
| F-17 | inverted webhook URL error | already-fixed | website WebhookMenu | plan 015 | not verified |
| F-18 | thread Clear gating | already-fixed | website WebhookMenu | plan 015 | not verified |
| F-19 | JSON dialog stops closing | already-fixed | website JsonModalBody | plan 015 | not verified |
| F-20 | JSON copy throws | already-fixed | website JsonModalBody | plan 015 | not verified |
| F-21 | stale `hasChanged` in pusher prompt | already-fixed | website `usePusher.ts` | plan 015 (M5-c) | not verified |
| F-22 | guild dropdown computed once | already-fixed | website `useGuildDropdownItems.tsx` | `:21` still `useMemo`; deps not printed | not verified |
| F-23 | "today" by day of month | already-fixed | website `utils/formatMessageDate.ts` | `:4` compares `getDate()` as one clause of a larger comparison | partly verified |
| F-24 | Save As captured at mount | already-fixed | website SaveAsMenu | plan 015 | not verified |
| F-25 | delete toast wording | already-fixed | website `f/[id]/page.tsx` | `git grep "Failed to refresh message" origin/master -- src/app/message/f` no hit | |
| F-26 | preview parse unguarded | already-fixed | website `preview/page.tsx` | `:14` `JSON.parse(query)` kept; guard around it per plan 015 M5-h | partly verified |
| F-27 | webhook provider | already-fixed | website `WebhookProvider.tsx` | plan 015 | not verified |
| F-28 | ADMIN_PERMS | already-fixed | website `bot/scripts/app_commands/common.ts` | `:7` `PermissionFlagsBits.ManageGuild.toString()` | publishing commands is an owner act, mentioned in the 015 deployment record |
| F-29 | setTimestamp | already-fixed | website `bot/utils/DiscordEmbed.ts` | `:88` assigns | |
| F-30 | isUserCommand | already-fixed | website bot | plan 015 | not verified |
| F-31 | kill_timeout | already-fixed | generator `ecosystem.config.js` | `:25` `kill_timeout: 12000` | |
| F-32 | malformed JSON crash | already-fixed | generator `server.ts` | `:23-27` try/catch | |
| F-33 | page leak | already-fixed | generator `generateImage.ts` | `:43` `finally` | |
| F-34 | pool factory null | already-fixed | generator `getPool.ts` | `:50` `throw err` | |
| F-35 | unset API_KEY | already-fixed | generator `config.ts` | `:1-2` refuses to start | |
| F-36 | stale `project-utils/dist/prisma.js` | CANDIDATE | project-utils `dist/prisma.js`, `dist/prisma.js.map` | YES: `git -C project-utils ls-tree -r origin/master --name-only` lists both, and `prisma/schema.prisma` but no `src/prisma.ts` | internal-only; cause proven; XS; plan 015 X-1 stated limit; needs a website lockfile commit bump, bundle with H41 and H37 |
| F-37 | UpsertMapMap.delete | already-fixed | website `UpsertMapMap.ts` | `:68` `this.#map.delete(key)` | |
| F-38 | multi-line code blocks | already-fixed | website markdown `rules.tsx` | `:493` codeBlock match rewritten | |
| F-39 | uploader Enter guard | already-fixed | website `ImageUploader.tsx` | `:86` `useDialogEnter(submit, isOpen)` | |
| F-40 | image extension validator | already-fixed | website | `git grep VALID_EXTENSIONS origin/master -- src` no hit | |
| F-41 | empty embed hide | already-fixed | website `Embed.tsx` | `:37`, `:52` `hasValidField` still present; semantics not read | not verified |
| F-42 | field action index | already-fixed | website EmbedFields | plan 015 | not verified |
| F-43 | footer cap | already-fixed | website `constants/messageLimits.ts` | `:7` `= 2048` | |
| F-44 | component cap | already-fixed | website DiscordMessageEditor | plan 015 M6-l (D10) | not verified |
| F-45 | Author interval | already-fixed | website `components/Author.tsx` | plan 015 | not verified |
| F-46 | picker zero-pad | already-fixed | website Picker | plan 015 | not verified |
| F-47 | emoji sort | already-fixed | website `emoji.tsx` | `:76` `.sort((a, b) => b.length - a.length)` | |
| F-48 | aria-expanded | already-fixed | website `MarkdownSpoiler.tsx` | `:14` `aria-expanded={isVisible}` | |
| F-49 | duplicate placement | already-fixed | website `DiscordMessageEditor/index.tsx` | `:107`, `:146` `idx + 1` | |
| F-50 | footer text trim | already-fixed | website EmbedFooter | plan 015 | not verified |

## Table: research hypotheses (H-1..H-8, never run; research G-5)

| Id | Subject | Class | Repo + files | Still present? | Impact | Cause proven? | Size | Notes |
|---|---|---|---|---|---|---|---|---|
| R-H1 | escaped markdown rewritten on open | record | n/a | researcher found the premise false (no `escape` rule in the interactive set) | n/a | refuted | n/a | |
| R-H2 | normalisation loop, blockquote + bare fence | CANDIDATE | website `SlateEditor/utils/withNormalizeNode.ts`, `getInitialValue.ts` | `withNormalizeNode.ts:18` `currentLang: null` present; behaviour not run | possible editor hang | NO | S-M | needs the running-editor test first |
| R-H3 | Ctrl+X on a collapsed caret deletes the next character | CANDIDATE | website `SlateEditor/utils/onCopy.ts` | YES: `onCopy.ts:34-38` `if (cut) { Transforms.delete(editor, { at: editor.selection }) }`, no collapsed-range guard | user-visible (loses a character) | NO (not run) | XS | cheapest to prove: DOM test, caret + cut |
| R-H4 | decorator offsets drift after nested emphasis | CANDIDATE | website `SlateEditor/utils/decorator.tsx` | YES: `:47` `{ first: a === astContent.at(-1) }`, `last` never set | highlight drift | NO | S | |
| R-H5 | timestamp edit targets wrong `<t:>` | CANDIDATE | website MarkdownTimestamp | not verified | wrong edit | NO | S | |
| R-H6 | `hasThumbnail` inverted | CANDIDATE | website `Embed.tsx` | YES: `:104-108` `hasThumbnail={!!thumbnail?.url && showEdit && !editableState?.showEmbedThumbnailEditable}` | preview layout | NO | XS | |
| R-H7 | uploader saves a URL other than the one shown | CANDIDATE | website `ImageUploader.tsx` | not verified | possible wrong image | NO | S | |
| R-H8 | `>>> ` quotes rewritten on open | CANDIDATE | website `getInitialValue.ts` | not verified | content change | NO | S | |

## Counts

Rows by source (`grep -c '^| T[0-9]'` = 10, `'^| H[0-9]'` = 45, `'^| F-'` = 50, `'^| R-H'` = 8; total 113). H01..H45 are 31 handoff files split by item where a file holds several (backfill 3, send-check 2, 018 risks 2, api-hardening 5, trpc leftovers 7).

Rows by class, each `grep -c "| <class> |" inventory.md`: CANDIDATE 17, already-fixed 56, record 17, needs-decision 9, test-only 8, feature 3, owner-only 3 (sum 113).

CANDIDATE 17 = 10 firm (T9, H10, H11, H12, H14, H29, H33, H37, H41, F-36) + 7 unproven hypotheses (R-H2..R-H8, cause not proven). Of the 56 already-fixed, 49 are F rows (F-1..F-50 minus F-36); 32 of those I read at origin/master with a file:line (`grep -c '^| F-.*| already-fixed |'` = 49; rows whose Evidence says "plan 015" or "not verified" = 17, by `grep -c` with the same prefix and `\(plan 015\|not verified\)`; 49 - 17 = 32), the other 17 rest on released plan 015. The other 7 already-fixed rows are handoff items (H03, H15, H32, H38..H40, H43).

## Candidates in suggested priority order

1. H14 hydrated recent list guild arm: the only security-grade item (cross-guild metadata) with a proven cause and a one-site fix (`shared.ts:123-126`).
2. H12 getOne absent number to NOT_FOUND: small, proven, and removes the 500 and retries that feed the blank editor.
3. H11 + H10 blank editor shell on a refused or deleted message: user-visible and seen in production; render the provider's unused `messageError`. Do after #2 so the error is a clean NOT_FOUND. One chain; the owner gives the wording.
4. H29 recentMessageIds element shape: XS, proven, reuse `messageIdShape`; stops a user's own session throwing.
5. H33 constant-time compare at three sites: S, sites enumerated; exploitability unmeasured.
6. T9 dead middleware matcher: one line; ride along with any website chain touching `middleware.ts`.
7. H41 + F-36 project-utils cleanup (`prisma-kysely` to devDependencies, delete stale `dist/prisma.js`): cross-repo, needs a website lockfile move; bundle with H37.
8. H37 pin the two git dependencies by commit: S, supply-chain hygiene; the handoff asks for owner routing.
9. R-H3 Ctrl+X on a collapsed caret: write the DOM test first; becomes a fix only if red.
10. R-H6, R-H4, then R-H2, R-H5, R-H7, R-H8: unproven; each needs a red test that proves the hypothesis before it counts as a defect.
