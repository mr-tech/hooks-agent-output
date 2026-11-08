# D28 candidates: mount-time seeds (planner's probe, run after M6-l; no fix)

Run: `run.sh /usr/local/bin/hooks/website <scratch> ef5a9cc <out>`, output `run1-ef5a9cc.txt` (6 cells pass, exit 0, network-isolated).
Probes: `WebhookMenu.seed-probe.test.tsx`, `NewMessageModal.seed-probe.test.tsx` (jsdom; children stubbed only to read the state: StyledAccordion's `selected` prop for WebhookMenu, the "Save To" trigger text for the modal).

## (a) prop changes with no user input, and (b) after a user selection

| Surface | Seed | Cell | Result |
|---|---|---|---|
| `WebhookMenu` `selectedCategory` | `hasWebhooks ? guild.id : 'load'` at mount | no webhooks at mount, webhooks arrive | stays `"load"` |
| | | webhooks at mount (g1), guild becomes g2 | stays `"g1"` |
| | | user picks a category, then webhooks arrive | stays the user's pick |
| `NewMessageModal` `selectedGuildId` | `guildId` prop at mount | prop 111 at mount, prop becomes 222 | Save To stays "Alpha" |
| | | no prop at mount, prop becomes 111 | stays "My Account" |
| | | user picks Beta, prop becomes 333 | stays "Beta" |

So both states are seeds: they never follow the later input (a), and a user's choice is not overwritten by it (b). Whether staying put is wrong is a product reading, not probed.

## (c) does the app change the input without remounting?

Established by code path (not run in a browser):
- `WebhookMenu` `webhooks`: yes. `GuildProvider.getWebhooksAndChannels` is `enabled` only once the guild query has resolved (`GuildProvider.tsx`, `enabled: !!(guild && session)`) and has `staleTime` 5 minutes. The send page renders `WebhookMenu` on every path (`send/page.tsx` builds `infoPanelComp` beside it, no early return before it), so on a first visit (or after the 5 minutes) the menu mounts with `webhooks = []` and the list arrives after mount. The seed is then `'load'`, and the accordion opens the "load" tab rather than the guild's webhooks. The page's "Reload Webhooks" button (`refetch`) changes the list after mount too, but a non-empty list stays non-empty.
- `WebhookMenu` `guildId`/`guild`: set by `GuildProvider.setGuildId` or the pathname; the guild changing while the send page stays mounted was not traced.
- `NewMessageModal` `guildId`: its only non-empty source is `f/[id]/page.tsx` (`guildId` from `useParsePathname`, a pure function of the pathname: `/message/f/<id>`); `message/page.tsx` passes none. The modal is mounted whether or not it is open. Whether a client navigation from `/message/f/A` to `/message/f/B` remounts the page (and so the modal) was NOT established: it needs a browser read (a Playwright act, which waits for steering's go) or a read of Next's segment keying. If the page instance persists, the modal's seed goes stale on a folder switch.

Severity: unknown, likely LOW for the modal (the user sees the dropdown and can change it; the default is a convenience). The WebhookMenu first-visit case is plausible in normal use and shows a different default tab; severity LOW to MEDIUM depending on whether "load" as the first tab is intended.
