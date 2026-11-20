# B-8 post-deploy walk 3 (qa-018)

No ids, tokens or cookies recorded; no screenshots.

| Step | UTC | Expected | Observed | Result |
|---|---|---|---|---|
| 1 session read | 13:47:19 | signed in | status 200, signedIn true, length 10, hydrationCount 6; recentInHydration [F,F,F,F,T,T,T,T,T,T]; personalInRecentPositions [4,5,6,7,8,9]; positions 2 and 3 in hydration: false, false. Chosen A = position 8, B = position 9; ids[0] !== A true | recorded |
| 2 open A edit | 13:47:25 (+8 s wait) | content beyond menubar | rendered true (body text 120 chars, 15 buttons, 3 inputs) | PASS |
| 3 network A | - | getOne 200, updatePreferences POST 200 | getOne GET 200; updatePreferences POST 200 | PASS |
| 4 session after A | - | firstIsA true, length <= 11 | status 200, length 10, firstIsA true, indexOfA 0 | PASS |
| 5 open B edit | 13:47:41 (+8 s wait) | content beyond menubar | rendered true (body text 143 chars, 16 buttons, 3 inputs) | PASS |
| 6 network B | - | getOne 200, new updatePreferences POST 200 | getOne GET 200; updatePreferences POST 200 (new, request after the first) | PASS |
| 7 session after B | - | firstIsB true, secondIsA true, length <= 11 | status 200, length 10, firstIsB true, secondIsA true | PASS |
| 8 exit | - | close, holder read, cache emptied, page files deleted | browser_close done; holder read: no holder; cache directories emptied; 5 page files from this run deleted (no console file was created); no files under .playwright-mcp for this run | done |

Deviations: "content rendered" judged by body text length, button and input counts, since reading content itself was avoided. The session had 10 recent ids, so no eviction at 11 was exercised. The step 3 and 6 request lists were each read after the navigation of that step, so the network log was per-navigation.
