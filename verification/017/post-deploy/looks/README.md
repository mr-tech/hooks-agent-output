# Plan 017 post-deploy looks B-6, B-8, B-9 (test account, live hooks.gg)

Session `uat-hooks-017-looks`, brief `steering/017-brief-uat-looks.md`, his ruling `steering/017-rulings.md` block 2026-11-20T02:41Z.
Walked 2026-11-20 02:44Z–03:10Z by the browser-walker helper on the kept profile (test account 1); judged by this session.

**Production read before the walk** (`git ls-remote`, 02:4xZ): website `master` `7923a1d`, generator `prod` `8512a1d`.
`git merge-base --is-ancestor 787bec5 7923a1d` exit 0, so the 017 website release is contained in what served the walk.

**Message used**: N = 6024 (created for the walk). The walk also created 6022 and 6023 by mistake ("New Message" rows that
`/message/m/new` → "My Account" creates at once). All three were deleted through the card's "message actions" menu (03:08:57, 03:09:37,
03:10:16Z). `cleanup.jsonl` records that the three ids are gone from the list; their URLs still answer 200 with a blank editor. The pre-existing
5996 and 6008–6012 were not touched. Route-0 and 6024 draft keys were removed; only the pre-existing `6020` draft remains.

| Row | Evidence | Scripts |
|---|---|---|
| B-6 | `b6-1.jsonl` (T1 02:47:03.793Z), `b6-2.jsonl` (T2 02:49:23.831Z, 140 s later) | `b6.mjs`, `img.mjs` |
| B-8 | `b8.jsonl` (5 valid runs, 02:55:13–02:56:04Z); `b8-attempt1-void.jsonl` (5 void: the name input does not take typing) | `b8.mjs` |
| B-9 | `b9.jsonl` (M3-a 02:56:28–03:03:43Z, M3-b 03:04:06–03:05:28Z, M4 03:07:31–03:07:48Z) | `m3a*.mjs`, `m3b.mjs`, `m4.mjs` |
| cleanup | `cleanup.jsonl` | `cleanup.mjs` |

Screenshots are untracked by ruling (017 rulings block 2026-11-19T09:01Z). They are held in this session's scratchpad `looks-shots/`, which a reboot clears.

**Forced sign-out form.** In production the hooks.gg cookie `__Secure-next-auth.session-token` was cleared (by name; no value recorded). On the
local walk, the database session row was deleted instead. Both make the client's session `unauthenticated`. The Discord session was untouched.

**Open-editor text.** Text typed into the open content editor is stored as a draft only when the editor closes (blur). This was the
same in pass 1 on the local build (UAT document, "Instrument notes", walks 3 and 4), and pass 1 re-ran with committed edits. The literal runs
(`variant:false` in `b9.jsonl`) lost the text in both M3-a and M3-b. The committed runs (`variant:true`) kept it. The rows are judged on the
committed form, as B-2 was. The open-editor loss is recorded as a stated limit and was not compared with `1ad625e`.
