# Refutation of decision-item conclusions C1-C4

Ref: website origin/master = 76da25ccd8fbd063803d4896b9eda3c3759d7221 (git rev-parse origin/master).
Everything below was READ FROM CODE at that ref via `git show` / `git grep`. Nothing was run.
One Bash call that included a `git grep` in preview-image-generator was not completed. The read was made as
`git grep -c ScheduledMessages` (count form, rc=1 -> zero matches).

## C1 - HOLDS
- Absent row: src/server/api/utils/shared.ts:145-166 getMessage ends `.executeTakeFirstOrThrow()` (NoResultError, not TRPCError). Called by message.getOne at src/server/api/routers/message.ts:57.
- Another user's personal message: getOne -> authorizeUser (src/server/api/utils/user.ts:7-30) throws TRPCError NOT_FOUND (so the "other user" case IS a tRPC NOT_FOUND; only the absent case is raw).
- Retry: MessageProvider/index.tsx:210-216 useQuery sets no `retry`; src/providers/TrpcProvider.tsx:16 `new QueryClient()` with no defaultOptions (git grep defaultOptions in src: no hits) -> react-query default retry 3.
- `messageError` is exposed (index.tsx:67, :330) but `git grep messageError` outside NewMessageModal/SaveAsMenu/useValidateWebhook/tests: only the provider. No consumer renders it.
- edit page (src/app/message/m/[id]/edit/page.tsx ~:149) renders `{!message ? null : <DiscordMessageEditor/>}` inside the bg-primary shell; message state starts null (index.tsx:114). m/[id]/layout.tsx has no error boundary / not-found. Navigation shows ' ' title while isLoading.
- Caveat: the absent case surfaces as INTERNAL_SERVER_ERROR, not NOT_FOUND, as stated.

## C2 - HOLDS
- NewMessageModal.tsx:126 `contentFloorError = validateContentRequirements(loadedMessage)`; :193 `disableSave = ... || !!contentFloorError ...`; Save button :~424 isDisabled={disableSave}; Form (src/components/Form.tsx:13) skips onSubmit when isDisabled.
- limits.tsx:233-247: hasV2 (components or flag) && (content.trim() || embeds.length>0) returns 'Components V2 messages cannot contain embeds or content.'
- The choice UI (pendingChoice, :150-179, :210-230) is reached only via onSubmit's gateBeforePersist (utils/index.ts:172), whose mustAsk (row E, :115-135) requires hasV2Components && hasClassicContent. The floor check is a superset of that (isV2Message is structural OR flag; embeds counted by length), so the gate is unreachable while Save is disabled. No other control in the modal offers a resolution.
- The repo's own test says so: src/app/message/_components/__tests__/NewMessageModal.persist-gate-wiring.test.tsx header lines 6-10.
- JSON tab: NewMessageJsonInput.tsx:96-110 calls resolveContentLoss, shows the choice, and setMessage(applyDisposition(...)), so the modal never receives a conflicted draft from JSON.
- Not checked: whether each ingress (bot/webhook/code) can actually produce a V2+content draft in practice (that is the premise of the conclusion; the test header refers to the ingress converter's row-E reachability).

## C3 - PARTLY (desktop only)
- Desktop: src/components/DiscordContentEditor/Desktop.tsx: SlateEditor onChange={setLocalValue} (local state only); `onChange(_value)` is called only in _onClose, wired to useFocusWithin onBlurWithin (lines ~38-51). Draft write is MessageProvider/index.tsx:182-191, an effect on `message`, so it fires only after that onChange. No beforeunload/pagehide/visibilitychange handler anywhere in src (git grep, non-test: none). So a reload with the desktop editor focused loses the text. useUnloadAlert(hasChanged) keys off message, which has not changed, so no warning either.
- Mobile: Mobile.tsx:~99 passes `onChange={onChange}` straight to SlateEditor, so each keystroke updates message and writes the draft. Not affected.
- Same applies to TextDisplay / embed uses of DiscordContentEditor on desktop (same component).

## C4 - HOLDS for the guard and the writers; "sends nothing" is conditional; scheduled
- Guard: src/pages/api/cron.ts:15 `if (req.query.key !== 'vercel') { res.status(404).end(); return; }` - literal, no env secret.
- Writers: `git grep -l ScheduledMessages origin/master` in website: cron.ts (select + updateTable only), server/api/utils/guild.ts and shared.ts (leftJoin selects), tests. No insertInto. website/bot: no hits. project-utils (`git grep -l`): only dist/index.d.ts, prisma/schema.prisma, src/generated/*/types.ts (types). preview-image-generator (`git grep -c`): no matches.
- Caveat: absence of writers in code does not prove the table is empty; rows written by an earlier (prisma-era) version or by hand would still be sent. Production DB not read (out of scope). So "sends nothing" holds only if the table holds no unsent, error-free rows with sendAt <= now.
- Schedule: website/vercel.json: crons [{ path: "/api/cron?key=vercel", schedule: "0 0 * * *" }] (daily 00:00 UTC). No .github/workflows in the website tree at the ref (git ls-tree); ecosystem.config.json not inspected for cron.
- Anyone who reads vercel.json or this repo can call the endpoint; each call processes all due rows.
