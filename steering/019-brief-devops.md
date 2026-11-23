# Brief — devops-019

Duties negated: none.

Common part: `/usr/local/bin/hooks/agent-output/steering/slate-formatting-brief-common.md`. Read it whole first. This effort is plan 019.

From `steering-hooks-fixer`, 2026-11-23T16:01Z. You are `devops-019`, launched in `/usr/local/bin/hooks`.

## Now: plan 019 M1, AN-1's devops acts (not Stage 1)

The plan is `/usr/local/bin/hooks/agent-output/planning/019-slate-formatting-discord-engine.md`, Revision 1 (record `103687b4`).
Your act is M1 § AN-1, its fourth bullet. Read it there, and re-read the plan's `Revision` and that bullet before you act. Where they
changed, follow the current text. `analyst-019` cued this act at 16:01Z. Its spike is in
`/usr/local/bin/hooks/agent-output/verification/019/analysis/an1/` (uncommitted, the analyst's): `wasmSpike.tsx.txt` (goes at
`src/utils/markdown/wasmSpike.tsx`), `MarkdownProvider.spike.diff`, the load probe `an1-load.js`, and its local build inputs. Re-derive
what you rely on from those files and from the analyst's document once it is committed.

1. **Does the project build branch previews?** Use the look-only Vercel CLI allowed by effort rulings block "2026-11-21T19:02"
   (`/usr/local/bin/hooks/agent-output/steering/fixer-queue-2026-11-21-rulings.md`). The form: from the website directory, `timeout 60`,
   `</dev/null`. That ruling allows listing deployments, inspecting one and reading logs, and nothing else. A deployment list showing
   Preview deployments built from non-`master` branches answers the question. If the answer needs a read outside that ruling, such as
   project settings through the API, stop and tell steering.
2. **If previews build:** push a spike branch to the website remote. Its head is `af3d95a` plus the spike commit. Then read the
   deployment `READY` at that head and record the plan's three numbers there with the analyst's probe (20 loads). If previews do not
   build, record that and stop.
   - Push gate: this thread read no `.github/workflows` in the website tree this turn (`ls` said it does not exist), and there is no
     `vercel.json`. Read the mechanism yourself before the push. A push that builds only a Preview needs no prompt (`~/.claude/CLAUDE.md`,
     Git). Plan 018 took the same lane (`steering/018-brief-devops.md`, M5-a). Where the effect is unclear, ask him in your own session.
   - Thread guidance: the spike diff touches neither `package.json` nor the lockfile, and the analyst built in an export. A Vercel build
     needs `@discord/markdown-wasm` pinned at exact `0.16.0` in both, so add it in the spike commit. Use the pinned build. A floating
     version is not acceptable.
   - Don't switch the shared website tree. It is on `chain/fix-image-uploader-url`, held by the 9e chain. Build the spike commit outside
     it, for example in a separate worktree or an export. `master` and every chain branch stay untouched.
   - Delete the spike branch once the analyst's document cites your numbers. Deleting it deploys nothing.

## Hazards (this thread's; each a candidate to re-derive)

- The analyst's local run used placeholder environment values on an isolated network (`spike.env`). A Vercel Preview runs with the
  project's Preview environment, which nobody has read and which may hold production's database or Pusher app. Load pages only. No
  save, no sign-in, no write of any kind on the Preview. Never print an environment value.
- Preview Deployment Protection may put a login in front of the page. If the probe cannot load it, record that as the result, with the
  status. Don't change any setting to get past it.

## Not checked by this brief

Whether the project builds previews, the Preview environment's contents, the Preview's protection setting, and whether the analyst's
document is committed yet.

## Routing

Record your reads and numbers in your own devops document for plan 019. Copy the stamps from `date -u` in the same turn. When it is
committed, tell `analyst-019` by SendMessage with the path, so AN-1 cites it, and copy `planner-019`. Send owner-needing items and spawn
cues to `steering-hooks-fixer` by SendMessage. After this act, stay up: Stage 1 for plan 019 comes later, and its own brief comes then.
