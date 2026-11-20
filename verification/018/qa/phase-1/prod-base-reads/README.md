# Production base reads: hooks.gg serving website 7923a1d (Next 16.1.6), QA Phase 1 re-key, 2026-11-20T04:09Z–04:10Z

Stage browser (kept profile, test account), page `https://hooks.gg/`, two `browser_evaluate` calls. Values only: no ids or tokens are recorded.

1. **B-8 minting read** (the liveness instrument): `fetch('/api/auth/session')` → `{status: 200, signedIn: true, recentIsArray: true, recentLength: 10}`.
2. **M1-h / B-6 base read:** `POST /api/trpc/message.upsert` with the superjson body
   `{json: {message: {name: 'n', data: {embeds: 50 x {title: 1}}}}}` →
   `{httpStatus: 400, code: "BAD_REQUEST", issuesInMessage: 51, nextVersion: "16.1.6"}`.
   - The request was refused at the input stage, so nothing was written.
   - The same payload touched the database 0 times through the caller (`../caller-probe/report.txt`).

The function bodies are those in the QA document's Phase 1 re-key section. After the reads the browser was closed and its cache
directories emptied (no holder).
