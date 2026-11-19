Part 1 runs (UTC 2026-11-19). A notice = "Message Update Detected" in saving tab A. Pusher frame = A's websocket framereceived, event message-update.
Setup: A and B on /message/m/900000000000001/edit; A's websocket listener only sees sockets opened after attach, so both tabs were reloaded once after attach (10:15:50Z).
R1 first attempt (typed word did NOT land, invalid, no name edit confirmed): upsert 10:15:17.692Z (first partial capture); B notice from 10:15:18.093Z; A none; frame not captured (listener not yet effective)
R1 retry (typed word did not land; content unchanged r1w28005): upsert 10:16:15.356Z; frame 10:16:15.633Z; A none; B none
R1b: word r1bw91063; save click ~10:16:44.2Z; name edit 10:16:45.883Z (name -> New Messagexxx); upsert 10:16:45.851Z (name sent New Messagexx); frame 10:16:46.101Z; A none; B yes (log from 10:16:46.218Z)
R2: r2w39681; edit 10:17:33.635Z; upsert 10:17:33.604Z; frame 10:17:33.845Z; A none; B yes
R3: r3w49239; edit 10:18:16.029Z; upsert 10:18:15.998Z; frame 10:18:16.284Z; A none; B yes
R4: r4w38382; edit 10:18:56.268Z; upsert 10:18:56.234Z; frame 10:18:56.456Z; A none; B yes
R5 (no edit): r5w36747; upsert 10:19:57.252Z; frame 10:19:57.913Z; A none; B yes
R6 (no edit): r6w72445; upsert 10:20:21.260Z; frame 10:20:21.537Z; A none; B yes
Between-run saves of A's leftover name edit: 10:17:05 (after R1b), 10:17:57 (after R2), 10:18:37 (after R3), after R4 (output lost to a script error; name verified saved as New Messagexxxxxx). A notice none in all recorded.
Content strings: each run's A content ended with the typed word, no trailing whitespace; content contains markdown characters (* _ [ ] ( ) / :) and U+FEFF zero-width chars after paragraph breaks (pre-existing).
Note: in each run the upsert fired a few ms BEFORE the 30 ms name edit timestamp (the Save click action took ~1.6 s, so the edit came ~30 ms after the click returned, after the request was already sent).
