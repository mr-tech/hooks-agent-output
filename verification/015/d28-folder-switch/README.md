# D28 browser read: does `NewMessageModal` survive `/message/f/A -> /message/f/B`?

Question (planner's, plan rev 24 M5-i residue, `d28-seed-probes/report.md` (c)): does a client navigation between two
folder URLs remount `app/message/f/[id]/page.tsx` (and with it `NewMessageModal`, whose `selectedGuildId` is a mount-time seed)?

Terms kept: existing `playwright-core` (`~/.npm/_npx/314abffa6aaf2cd1`) with `/usr/bin/google-chrome` headless, a fresh
context, `~/.cache/ms-playwright-mcp/mcp-chrome-313b550` untouched, nothing installed; `next dev --webpack` from a
`git archive` export of website `24ac49f` (export has 0 `.env*` files), inside `unshare -rn` (lo only: 0 non-loopback
links, 0 default routes, asserted by `server.sh` before the server starts), probe env, no host port.

| Run | Script | What it did | Result |
|---|---|---|---|
| 1 | `run.cjs` | Logged out, GET `/message/f/111`, read the text and buttons | The "You're not logged in" panel; no folder list, no New Message button (`run1-output.txt`) |
| 2 | `run2.cjs` | Logged out. Marked the first and last child of `<main>` (DOM identity), `router.push` to `f/111?x=1` (same-segment control) then `f/222` | `Redirects/Client.tsx` replaced the URL with `/message/m/0/edit` on first render: the path read `/message/m/0/edit` before any push, and both marked elements were disconnected after the first push. The folder page was never on screen (`run2-output.txt`) |
| 3 | `run3.cjs` | As run 2, with the browser answering `/api/auth/session` with a stub signed-in session (two guilds) | Same redirect: the `SessionProvider` starts from the server's null session, so `status` is `unauthenticated` on the first render, before the client fetch the stub answers (`run3-output.txt`) |

## Result

**Not decided by a browser.** The folder page is reachable only with a session the server accepts, which this rig has no
way to mint (database sessions; the database is a dead port by design). Nothing reachable logged out holds the page's
state. Three runs are the stop: a further attempt would need a forged cookie or a live database, neither in the terms.

## What stands (code path, not run)

- `f/[id]/page.tsx` returns `LoadingDots` while `guild === undefined && isGuildLoading`, which unmounts the page and its
  modal while an uncached guild loads; with a cached guild (the session carries the user's guilds) no such unmount happens.
- Whether Next's App Router remounts a page when only a dynamic segment's value changes is not established here. If it
  does not, the modal's `selectedGuildId` seed goes stale on a folder switch (`d28-seed-probes/report.md`, cell (a)).
  If it does, there is no defect. The planner's X-21 style residue is the place to carry it: severity LOW, as the report
  rated it (the Save To dropdown is visible and editable).
