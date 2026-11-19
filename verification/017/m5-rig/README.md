# verification/017/m5-rig — the local-walk rig for M5 (QA's B-4, E-9)

Built by the implementer as M5's last step and handed to UAT (plan § M5 "Human-observable form"). It is not a standing instrument.

1. Export the generator's chain tip and install it (`git archive <sha> -- . ':(exclude).github' | tar -x -C <dir>`, then `PUPPETEER_SKIP_DOWNLOAD=true npm ci`).
2. `node rig.mjs <dir> <log file>` — starts the loopback S3 stub (`127.0.0.1:39001`) and the generator (`127.0.0.1:39002`, `ENV=development`),
   and prints the environment the local website must be started with. The website's `CDN_ENDPOINT` is checked in its process environment
   (not `.env.local`, whose value is a real Spaces host) and on the stub's request log: the website's list and delete requests must appear there.
3. Before the first save on the local website, move message ids past 900000000000001 (the workspace `CLAUDE.md`).
4. Walk: generator stopped, save an edit — the list keeps the old preview; generator running, save again — after a reload the new preview shows.
5. Stop the rig with SIGINT. It stops the stub and the generator; check with `ps` that no generator or Chrome process remains.

`self-test.out` is the rig run against a generator export with the preview endpoint pointed at the probe's preview stub.
