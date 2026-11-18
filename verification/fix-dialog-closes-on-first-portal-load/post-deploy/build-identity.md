# Which build hooks.gg served — uat-fix-dialog-closes-on-first-portal-load, 2026-11-18

Method: `git archive` of website `1ad625e` (fix) and `395510e` (its parent, pre-fix) into scratch,
`next build` (Next 16.1.6, Turbopack) of each with the working tree's node_modules bind-mounted
read-only (`unshare -rm`). Both compiled ("Compiled successfully"); both builds then stopped at
prerender on "Invalid environment variables" (no env supplied, by choice: `.env.local` holds
credentials), after the client chunks were written. Chunk names: `local-turbo-1ad625e-chunks.txt`,
`local-turbo-395510e-chunks.txt` (Turbopack names chunks by content hash).

Instrument: HTTP status from https://hooks.gg/_next/static/chunks/<name> of every chunk unique to
one build (`live-chunk-identity.txt`, 22:46:37Z). Result: 11/11 395510e-only chunks 404; 12/12
1ad625e-only chunks 200. Two-sided, so it discriminates: the pre-fix build's own chunks are absent,
the fix build's are served. Corroboration: the 2026-11-08 live list (`../../015/upload-dialog/live-f0-chunks.txt`)
names 3257e693…, 4544703d…, ced9ae5a…, e6a64b73…, all 395510e-only, all 404 today.

Conclusion: production serves a build whose client bundle is website `1ad625e`'s. Limit: it identifies
the client bundle, not the server build or Vercel's recorded SHA (unread).
