# Rulings — fixer chain `fix-desktop-draft-as-typed` (website: text typed on desktop is drafted only when the editor closes)

Fixer chain steered by `steering-hooks` (cwd `/usr/local/bin/hooks`; coordinator `steering-coordinator`), chain 4 of effort
`fixer-queue-2026-11-21`. Commission and order: `steering/fixer-queue-2026-11-21-rulings.md`, blocks "2026-11-21T05:32Z", "05:38Z",
"05:50Z", "05:59Z". Brief common part: `steering/fix-desktop-draft-as-typed-brief-common.md`. tmux category: `fix-desktop-draft-as-typed`.

## 2026-11-21T10:43Z — scoping determination: fixer chain, website, one handoff

**His words.** Effort block "2026-11-21T05:50Z", Q3, chosen by selection: "Agent: save as you type (Recommended)" — "a fixer chain
makes desktop save the draft as he types, as mobile does." Its reach, effort block "2026-11-21T05:59Z", chosen by selection: "Agent: all
typed text (Recommended)" — content editor plus author name and footer text save as typed; the two dialogs keep their button. A
refutation helper found every limb of the sweep's conclusion HOLDS (same block, read from code, not run).

**Source.** `handoff/open-content-editor-text-not-drafted-until-close-2026-11-20.md` (UUID f1356f4b, Open, Owning-Stage planner), IN
whole: its "intended draft boundary" question is answered by his 05:50Z selection (on each keystroke, as mobile).

**Shape.** Change to existing behaviour, user-visible (desktop text typed into an open editor is lost on a reload or forced sign-out).
No dated outside event. Cause read from code, not run (sweep §1, §3; refutation helper, effort block 05:59Z). Blast radius: the desktop
`DiscordContentEditor` and its six consumers (message content, embed title, description, field name and value, Text Display inside
Section and Container), the embed author name and the footer text; the draft store (`messageDrafts.ts`) is written more often, unchanged
in form. No library holds the fix. End step: website `master`, Vercel production; his word, asked by devops in its own session.
**Release ref.** `node ~/.claude/tools/release-move.js /usr/local/bin/hooks/website master b663b354… --dry-run` (10:43Z): "DRY RUN: every
check passed; nothing moved"; "workflows none — … .github/workflows absent"; `--report`: "one serving ref at origin (master); no pair".
Tree: `master` `b663b35` = `origin/master` (`git ls-remote`, 10:42Z); `?? .playwright-mcp/` only. Lockfile: the chain branch is cut at
the tree's own commit, so nothing differs across the switch.
**Premises re-read at `b663b35`** (10:42Z): `git diff --numstat 76da25c b663b354` lists 19 files; of the sweep's region only
`providers/MessageProvider/index.tsx` changed (+8, the not-found retry and `isNotFound`), and its draft effect is unchanged (now
L188-198). Author and footer commits read at `b663b35`: `EmbedAuthor.tsx:57-61` (`onBlurWithin` commits `localUsername.trim()`),
`EmbedFooter.tsx:123` (`onBlur` commits `localText?.trim()`).
**Released chains whose scope touched this route:** plan 017 (the draft store, M3; closed). Its open carrier
`handoff/017-existing-items-backlog-post-deploy-2026-11-19.md` (26c40e4f): B-9 PASS with this limit stated; open rows B-7 and B-10 are
not this route. This chain's post-deploy row reads B-9's stated limit after the fix.

**Scope sweep** (helper, `verification/fix-desktop-draft-as-typed/scoping/sweep.md`, commit `ebd7365`, at `76da25c`; premises re-read
as above). Property: text typed into a message input is held outside the message until blur, close or confirm, so a reload before then
loses it. Has it: the desktop content editor (`Desktop.tsx:32,45-52,95`) in all six consumers; embed author name; footer text; the image
URL dialog; the JSON dialog. Does not: mobile (`Mobile.tsx:98-99`), message username, controlled URL fields, component editors, the
message name. Not message data: webhook URL, thread and message-link fields (never in a draft).

**Stage set:** `fixer-fix-desktop-draft-as-typed` → `code-reviewer-fix-desktop-draft-as-typed` (and QA Phase 2,
`qa-fix-desktop-draft-as-typed`, only at 20 or more added production lines; under 20 the reviewer also runs the suite and the red tests)
→ devops for website `master` (his word). No plan, critic, Phase 1 or UAT; the fixer's **User-visible flows** list is quoted to him
with the release.

**Scope statement (bounded).** Repository `website` only, from `origin/master` `b663b35`, on `chain/fix-desktop-draft-as-typed`:
1. On desktop, text typed into the open content editor reaches the message as it is typed, as on mobile, so the existing draft effect
   (`MessageProvider/index.tsx` L188-198) stores it; every consumer of `DiscordContentEditor` inherits this.
2. The embed author name and the footer text reach the message as typed. The trim they apply today happens where it does not eat a
   space the user is still typing (hazard 2).
3. The image URL dialog and the JSON dialog keep committing on their button (unchanged).
Write set: website `src/components/DiscordContentEditor/**`, `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedAuthor.tsx`
and `EmbedFooter.tsx`, `src/components/ContentEditable.tsx` and `src/utils/hooks/index.ts` (`usePassedProp`) only where hazard 2 or 3
needs them, and `__tests__/` beside each; in the record, the fixer's document and `verification/fix-desktop-draft-as-typed/`. A change to
`messageDrafts.ts`, `MessageProvider`, `SlateEditor`, the two dialogs or a debounce of the draft write is a re-scope.

**Exclusions.** The image URL dialog and the JSON dialog: OUT (his 05:59Z selection). A debounce or throttle of the draft write: OUT
(his words "as mobile does"; mobile writes on each change); a measured cost that needs one returns here. An unload flush
(`beforeunload`/`pagehide`): OUT (a different mechanism than his words name).

**What the sweep did not cover** (devops hazard lines): no run or browser; pre-017 behaviour at `1ad625e`; whether the leave-page
warning (`useUnloadAlert`) fires on that reload; setter bodies (whether they bail out on equal value, so focusing writes a draft);
`useLocalStorage` readers of the synchronous `storage` event; caret behaviour of `ContentEditable` under a controlled round trip;
per-keystroke cost of the 1 MiB draft map (017's 17.2 ms / 5.1 ms figures, not re-measured); mobile `BottomPortal` close.

Chain started 10:44Z: website `chain/fix-desktop-draft-as-typed` cut by this thread (`git switch --no-track -c … origin/master`, HEAD
`b663b35`, porcelain before and after `?? .playwright-mcp/` only); determination and briefs committed `39dd56f`;
`fixer-fix-desktop-draft-as-typed` started with `tmux-agent spawn` (category `fix-desktop-draft-as-typed`, cwd website, effort medium
as printed), brief `steering/fix-desktop-draft-as-typed-brief-fixer.md`. The reviewer is started on the fixer's spawn cue.
Spawn cue 11:0xZ (the fixer, by SendMessage): handed off at website `b68f94c`, 17 added production lines (`git diff --numstat
b663b35 b68f94c`, read by this thread: 4+8+5 over `Desktop.tsx`, `EmbedAuthor.tsx`, `EmbedFooter.tsx`, all in the write set, plus three
test files), so code review alone. `code-reviewer-fix-desktop-draft-as-typed` started 11:06Z (`tmux-agent spawn`, cwd website, effort
medium as printed), brief `steering/fix-desktop-draft-as-typed-brief-code-reviewer.md` (`d8f5a4a`).

## 2026-11-21T11:13Z — code review approved at `b68f94c`; the browser-only limbs are a decision point

`code-review/fix-desktop-draft-as-typed-code-review.md` (record `488b209`, read whole by this thread 11:1xZ): Round 1
APPROVED_WITH_COMMENTS, `Reviewed-At` `b68f94c`; 17 production lines recounted, so no QA. Suite 2316/2316 at `b663b35` and 2326/2326 at
`b68f94c`, exit 0 both; red 8 of 10 at base, green 10 of 10, 7 controls killed. CR-1 MEDIUM, record only: User-visible flow 5 is
false for an unset field (opening sets it to `''`, so a draft and the reload prompt follow, as closing did at base and as mobile does
on open); routed by the reviewer to `fixer-fix-desktop-draft-as-typed` for correction before devops quotes the flows. This thread's
reading: no product decision in CR-1 — the end state is base's and mobile's, inside his words "as mobile does".
Assumption Not Checked (review line 98): real-browser Slate per-keystroke emit, and the author/footer caret under the round trip;
the reviewer routes it to his walk of flows 1-4 after the release. An agent can walk it in a browser before release (typing only, no
Save), so whether the release waits on that walk is put to him (block below, when answered).

## 2026-11-21T11:14Z — selection: an agent walks flows 1-4 in a browser before the release

Selection prompt put 11:13Z, answered 11:14Z (ledger `steering/selection-ledger/2026-11-21.md`, block "2026-11-21T11:13Z —
steering-hooks"); wording this thread's. Premise: the review's Assumption Not Checked (line 98) and its hazard 5 (a stub `SlateEditor`),
read this turn. Options: A "Agent: walk before release (Recommended)" — "A QA session builds b68f94c locally and, in a desktop-width
browser, types into the content editor, author name and footer, then reloads. It types only and never saves. Devops asks your release
word after that. Costs one QA session, roughly 30-60 minutes, before the push."; B "Agent: release, check after" — "… If the cursor
jumps, production has it until a follow-up fix ships."; C "You: walk it after release". Chosen by selection: **A**.
**Stage set, amended:** `fixer` → `code-reviewer` (approved) → **`qa-fix-desktop-draft-as-typed`, a pre-release browser walk of the
fixer's User-visible flows 1-4 at `b68f94c` on a local build, typing and reload only, no Save** → devops for website `master` (his word).
The walk's verdict carries `Verified-At`; devops starts from it and from the review. Recipients: `qa-fix-desktop-draft-as-typed` (its
brief); devops (its later brief).
`qa-fix-desktop-draft-as-typed` started 11:14Z (`tmux-agent spawn`, cwd website, effort medium as printed), brief
`steering/fix-desktop-draft-as-typed-brief-qa.md` (`2ae615a`).

## 2026-11-21T11:25Z — QA walk PASS at `b68f94c`; devops started

`qa/fix-desktop-draft-as-typed-qa.md` (record `71fc7b56`, Status "QA Complete", `Verified-At` `b68f94c`, read this turn): flows 1-4 hold
in Chrome at route 0; base `b663b35` loses the same text; caret held on every key; no findings; no database, no Save. Its Assumption
Not Checked (line 103, the saved-message route) is put on devops's post-deploy row, run by a test-account session, not left to his
walk (an agent can perform it). Chain tip `b68f94c`, `origin/master` `b663b35` (`git ls-remote`, 11:2xZ).
`devops-fix-desktop-draft-as-typed` started with `tmux-agent spawn`, brief `steering/fix-desktop-draft-as-typed-brief-devops.md`.
