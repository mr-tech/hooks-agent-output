# Rulings — fix-personal-message-access (fixer chain)

Steered by `steering-roadmap-hooks` (cwd `/usr/local/bin/hooks`). Origin: his "Fix right after 017"
(`steering/017-rulings.md` blocks 2026-11-19T08:41Z, 08:43Z, 09:01Z). Coordinator: `steering-coordinator`.

## 2026-11-19T20:30Z — scoping determination (scope awaiting his selection)

**His words that bound it** (block 09:01Z, by selection): "Fix right after 017", covering both defects. On reads, "No, owner only",
with the option text "The fix blocks reading another user's personal message entirely" (block 08:41Z). His question at 08:43Z:
"Are you absolutely sure there's no filtering mechanism that would make it so that the actual query can only get a message the user
owns?"

**Shape.** Defect. No dated outside event. Cause proven: S2 was confirmed on production by the browser check (`verification/access-defects/
browser-check/README.md`, `497f0de`). S2, S6b and S11 were executed through the real routers (`appRouter.createCaller`) against a
throwaway local postgres, with all three NOT REFUTED (`verification/access-defects/scoping/refutation.md`, helper 20:3xZ; env, Pusher,
`waitUntil`, preview generation and redis stubbed in its export; S11's NextAuth adapter path not run). Blast radius: every signed-in hooks.gg
user's personal messages. Specification uncertainty: `app/message/f/[id]` copies a message by number through `getOne`, so after the fix,
copying another user's personal message stops working. That is what "owner only" chose. Where the fix lives: website alone. project-utils holds no query (sweep S23); the
generator takes no user identity (S17).
**End step:** a website `master` push, which Vercel deploys to production; it needs his word (`~/.claude/CLAUDE.md`, Git).
`release-move.js website master 787bec5… --dry-run` at 20:30Z: every check passed. There is one serving ref at origin (`--report`: "one
serving ref at origin (master); no pair"). No workflows (`website/.github/workflows` absent). Released chains whose scope touched the
route: 017 (M5 changed `upsertMessage`), whose open post-deploy carrier is `handoff/017-existing-items-backlog-post-deploy-2026-11-19.md`.

**Property** (from his words): a signed-in user can get, change or delete only the personal messages (no guild) they own. A message
number sent by the browser never lets a user read, create, claim, overwrite or delete a row that is not theirs.
**Region swept** (`verification/access-defects/scoping/sweep.md`): every request surface that takes a message identifier, in website
`787bec5`, project-utils `749606d` and generator `8512a1d` (23 rows; predicates, counts and blind spots in the file). Placement of every
hit (S-numbers from the sweep):
- **In scope, whichever option he picks:** S2 `message.getOne` (and S18, the `[id]` pages that use it); S6b `message.upsert` creating a row
  at a client-sent id.
- **In scope under the recommended option only:**
  - S11, the hydrated session reading `recentMessageIds` without an owner check.
  - An owner term in the write queries of S6a and S7: the check and the write are separate queries today.
  - A canonical id at the input of S7, S8 and S9: S9 leaves the owner's own previews in the bucket when the id text is non-canonical.
- **Exclusions he sees in the same question:**
  - S5, the share code: public by design, with a 1-hour code.
  - S16, preview URLs: public by design. Id plus nonce is the capability, and S11's fix closes the nonce leak.
  - S17, the generator's shared key: X-21 already carries it.
  - S15, Pusher channels: public, and they carry a save hash only.
  - S14, the cron key `vercel`: a constant, not a secret. It is not a message-id path.
  - S1b, `authorizeGuildAdmin`: it tests guild membership, not admin bits. Guild messages are outside his "personal" words. Whether
    `session.user.guilds` holds only the guilds he manages is unread.
  Each exclusion he does not bring in becomes one handoff.
**What would catch a breach of the rule:** a router-level test per surface, where a second user is refused (S2, S6b, S11, S6a, S7, S8). Post-deploy,
the browser check re-run on production: test account 1 opens test account 2's personal message and is refused.
**Not covered by the sweep** (sweep step 5): database policy and sequence state, Vercel env, Pusher and bucket settings, NextAuth internals,
and the check-then-write race (read from code only).
**Stage set:** `fixer` (red test per in-scope surface), then `code-reviewer`, then QA Phase 2 (at 20 or more production lines), then
`security` on the change (it changes an authentication boundary on production; this thread's choice, recorded here), then devops for
website `master` (his word needed). No plan, critic, Phase 1 or UAT. Post-deploy: the browser check, walked by a uat-role session on the
test accounts (screenshots stay untracked, his 09:01Z ruling).

## 2026-11-19T22:35Z — scope: fix all three, with query hardening (his selection)

Selection prompt put 22:3xZ. Blocking prompts were back on, per steering-coordinator; the flag `~/.claude/state/prompt-gate-off` was
absent this turn. The question was first put in plain text at 20:3xZ and re-stated at 21:1xZ while prompts were off. Answered 22:35Z.
Selection-ledger day file `steering/selection-ledger/2026-11-19.md`, block "2026-11-19T22:35Z — steering-roadmap-hooks", header
"Access fix".
- **Agent: fix all three (Recommended)** — CHOSEN, by selection. Its description: "Agent fixes 1–3. It also puts the owner check inside
  the save/update/delete queries (today the check and the write are separate queries) and cleans up oddly formatted message numbers, so
  deleting a message no longer leaves its preview images behind. Then a test per case, code review, QA, a security review, and a
  production push that needs your word."
- Agent: fix only 1 and 2. Bug 3 and the query hardening each go to a handoff record for later.
- Agent: don't fix now. Each of the three goes to a handoff record and this fix closes. The holes stay open on production.
Under every option the question kept three items out, each with its own handoff record: the cron key `vercel` (S14), the public Pusher
channels (S15) and the guild-admin membership check (S1b). The options' wording is this thread's.
Premises read this turn: live website `master` is `787bec5` (`ls-remote`, 22:32Z). `refutation.md` was read whole at 21:1xZ: S2, S6b
and S11 NOT REFUTED; S11's NextAuth path was not run.
**Scope statement, now bounded.** In scope: S2 with S18, S6b, S11, an owner term in the S6a and S7 write queries, and a canonical id at
the S7, S8 and S9 inputs. All of it is in website alone. Out: S5, S16 and S17 (no record; X-21 carries S17). S14, S15 and S1b get one
handoff each. The stage set is as in block 20:30Z. Owner-wait `access-fix-scope` resolved (`challenge-alert.js resolved`, exit 0).
Disclosure: the record-write gate refused this block's first write, a shell heredoc. It was re-issued with the Edit tool.

## 2026-11-19T22:38Z — chain started: handoffs, branch, briefs, fixer spawned, standing check armed

- **Exclusion handoffs** (helper subagent, `6f333f0`, check-repo PASS exit 0):
  - `handoff/cron-endpoint-key-is-a-fixed-value-2026-11-19.md` (S14)
  - `handoff/pusher-message-update-channels-are-public-2026-11-19.md` (S15)
  - `handoff/authorize-guild-admin-tests-membership-not-admin-bits-2026-11-19.md` (S1b)
  The helper chose each record's Owning-Stage ("steering thread …") and its event triggers; the sources name neither. The record-write
  gate refused the helper's first shell write, and it re-issued the write with the Write tool.
- **Chain branch:** website `chain/fix-personal-message-access`, cut 22:36Z with `git switch --no-track -c … origin/master` at `787bec5`.
  There is no upstream (`@{u}` fatal). The tree before the switch was `master` at `787bec5`, and `git status --porcelain` showed only
  `?? .playwright-mcp/`: screenshots from 2026-11-11, not this chain's. The switch touches no file (same commit), so I treated it as
  a clean tree and recorded it here. The lockfile is unchanged.
- **Briefs:** `steering/fix-personal-message-access-brief-common.md` (`860d50e`), and the fixer, code-reviewer and qa briefs (`66fcfd6`).
- **Spawned** `fixer-hooks-fix-personal-message-access` (`tmux-agent spawn`, category `fix-personal-message-access`, cwd website, effort
  medium as printed). The code reviewer and QA are spawned when they can start: on the fixer's handoff, and on the review's approval at
  20 or more lines. Security comes after QA.
- **Standing check** armed as a one-shot, id `846d57b8`, for 23:07Z. It replaces the cache-warm wake. OOM count 0. Usage live 22:37Z:
  session 1%, `weekly_all` 19%.
