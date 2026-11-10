---
UUID: 26883e7c
Status: Open
Status-Detail: "Five host-posture findings on the preview-image-generator production host (H-001 to M-002 of security/015-preview-image-generator-security-audit.md), accepted by the owner as recorded on 2026-11-08 (rulings 09:43Z: no effort, no mitigation). This record carries them past chain 015's closure; nothing is owed until the trigger fires."
Owning-Stage: "Unassigned — the owner routes it when the trigger fires: a planner (a security follow-up effort) or a fixer for the code-side items (puppeteer bump, `pipe: true`, `deploy.sh` file modes, action pins); the owner for the host-side items (non-root user and PM2 daemon, firewall, Node interpreter), which no agent can perform"
Review-Trigger: When puppeteer or generic-pool is next bumped in preview-image-generator; when the generator host is next rebuilt, re-provisioned or its Node interpreter changed; when `.github/deploy.sh` or either generator workflow file is next edited; when a vulnerability in Chrome 116.0.5845.96 or Node 18.17.1 is reported as exploited against the product; or when the premise of the acceptance moves — the audience or data Hooks handles changes (architecture `preview-image-generator.md` P-4's scope clause) — whichever comes first
Secret-Files:
  - "hooks-pig:/usr/local/bin/hooks-image-preview-generator/deployed/prod/.env"
  - "hooks-pig:/etc/.pm2/dump.pm2"
  - "hooks-pig:/etc/.pm2/dump.pm2.bak"
---

# Handoff — preview-image-generator production host: security posture accepted as recorded

## What is seeded

The generator's production host (`hooks-preview-image-generator`, DigitalOcean, Ubuntu 20.04.6, kernel 5.4.0-216; reserved IP `165.227.249.183`, droplet IP `161.35.130.57`) runs the service in a posture the owner has chosen to leave as it is. Nothing is to be done until the trigger above fires; when it does, whoever is routed reads this section as the work, not the security document.

The owner's selection, 2026-11-08T09:43Z (`steering/015-rulings.md`, block "generator host security posture: accept, record only"), description verbatim: *"Agent: no effort. The findings stay in the security document, carried by a follow-up record so they don't lapse when the chain closes. The risks stay as they are."*

### H-001 HIGH — Chromium 116.0.5845.96 runs as root with `--no-sandbox` and renders user-supplied image URLs (CVSS 8.5, AV:N/AC:H/PR:L/UI:N/S:C/C:H/I:H/A:H)

- **Condition.** puppeteer 21.1.0 (lockfile) pins Chrome for Testing 116.0.5845.96 (`deployed/prod/node_modules/puppeteer-core/lib/cjs/puppeteer/revisions.js`). The browser and its renderers run as uid 0 with CapEff `0000003fffffffff`, `NoNewPrivs 0`, `Seccomp 0`, launched by `src/getPool.ts` `minimal_args` with `--no-sandbox` and `--disable-setuid-sandbox`. CVE-2023-4863 (libwebp heap overflow, exploited in the wild) is fixed in Chrome 116.0.5845.187; this build predates it, and every later Chromium fix. The rendered page is the website's `/preview`, which fetches a saved message's embed image (`EmbedImage.tsx` `<Image … unoptimized>`), V2 thumbnail (`ThumbnailEditor.tsx` `<img src>`) and media-gallery items (`MediaGalleryEditor.tsx` `<img src>`) directly from whatever URL the user typed; no CSP exists. Author/footer/thumbnail *icons* go through the Next image optimizer restricted to `cdn.discordapp.com` and `cdn.jsdelivr.net` (`next.config.js`) and are not this path.
- **Consequence.** A Hooks user's saved image can be a crafted file decoded by an unsandboxed root renderer; a renderer compromise is a root compromise of the host, including `.env` (API key, CDN key and secret), `/etc/.pm2/dump.pm2` and the deploy runner's credentials.
- **Owed when routed.** (1) Bump puppeteer to a current release so Chrome moves to a supported build; (2) run the generator under a dedicated non-root user with the sandbox on (unprivileged user namespaces are available on this kernel) — the PM2 daemon, the deployed directory's ownership and two lines in `getPool.ts`; (3) optionally an egress allowlist on the host (`hooks.gg`, the CDN endpoint, Discord's CDN) so a fetched image cannot come from an arbitrary origin.

### H-002 HIGH — Root Chromium DevTools endpoints listen on loopback, reachable by any local account (CVSS 8.8, AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H)

- **Condition.** Each Chromium runs with `--remote-debugging-port=0` (puppeteer 21's default transport), so the DevTools protocol listens on an ephemeral `127.0.0.1` port whose `/json/version` hands any loopback client the websocket URL. Two loopback listeners (`127.0.0.1:46423`, `127.0.0.1:33933`) were present at the read; attribution to the two browser roots is inferred from the flags, not read (`ss -p` needs root). Local accounts at the read: `nodejs` (runs its own PM2 app `hello.js`), `claude-ro`, uid 997.
- **Consequence.** A local account drives a root browser: `Page.navigate` to `file:///…` and `Runtime.evaluate` read any file as root; download behaviour can write. A compromise of the `nodejs` app or of any local account becomes root.
- **Owed when routed.** `pipe: true` in `puppeteerLaunchOptions` (`src/getPool.ts` default export) so no TCP endpoint exists; H-001 (2) bounds the blast radius either way.

### H-003 HIGH — The plain-HTTP port is reachable from the public internet, served as root by an end-of-life Node (CVSS 7.5, AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H)

- **Condition.** `prod.yml` sets `SERVER_HOST: "0.0.0.0"`, `SERVER_PORT: "3000"`; `ss -ltnH` shows `0.0.0.0:3000` LISTEN and `/proc/net/tcp` shows that socket owned by uid 0. ufw is active with `DEFAULT_INPUT_POLICY="DROP"`, yet a connect-only probe from outside to `165.227.249.183:3000` connected (port 3001 refused, control), so an allow rule exists (`user.rules` is root-only, not read). The interpreter is Node 18.17.1 (`/usr/bin/node`; `pm2.log` "Node.js version : 18.17.1" at the daemon starts of 2023-08-22, 2024-06-15, 2026-08-23); Node 18 reached end of life on 2025-04-30 (last 18.20.8), so later fixes such as CVE-2024-22019 (chunked-encoding resource exhaustion, unauthenticated) and CVE-2024-27982 (request smuggling) are absent. `ecosystem.config.js` passes `--max-http-header-size=10000000`; `src/server.ts` logs `req.method, req.url` before the auth test, so every unauthenticated request appends a line to the out log (8.8 MB at the read). The service has no TLS (`http.createServer`); whether the website's `PREVIEW_IMAGE_URL` (held in Vercel) reaches it over TLS through anything else is unread — if not, the bearer key crosses the internet in cleartext. The key check `req.headers.authorization === config.API_KEY` is a non-constant-time compare (negligible yield over the network; noted).
- **Owed when routed.** (1) Restrict inbound 3000 — the website runs on Vercel without fixed egress, so the practical forms are a TLS reverse proxy with the key check in front, or a private path from the website's side; (2) a supported Node for both the runner's build (setup-node 18) and the daemon's interpreter; (3) drop or bound `--max-http-header-size`; (4) log the pre-auth request line only for authenticated requests or at a rate.

### M-001 MEDIUM — Service secrets are world-readable on the host (CVSS 5.5, AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N)

- **Condition.** `/usr/local/bin/hooks-image-preview-generator/deployed/prod/.env` is `-rw-r--r-- root` (311 B; `test -r` as `claude-ro` → yes; content never read). `/etc/.pm2/dump.pm2` and `dump.pm2.bak` are `-rw-r--r-- root` (PM2 stores each app's env there). `.github/deploy.sh` runs `cp -r ./` from the runner's checkout, so `.git` (history included, with the X-12 workflow literal) sits in the deployed directory. Every deploy recreates this. The owner saw the dump's readability at OQ-H (rulings 05:24Z) and chose the filtered read; the `.env` and `.git` copies were not in that prompt.
- **Owed when routed.** In `deploy.sh`: `chmod 600 .env` after the copy and exclude `.git`; `chmod 700 /etc/.pm2` (its sockets are `srwxrwxr-x`, so non-root cannot connect today; the directory mode is the remaining gap). The X-12 handoff (`handoff/preview-image-generator-api-key-in-workflow-files-2026-11-08.md`) carries the key's rotation question; an INBOX entry of 2026-11-08 asks that it be read as covering these copies too.

### M-002 MEDIUM — Deploys run as root on a self-hosted runner from mutable action tags (CVSS 6.7, AV:N/AC:H/PR:H/UI:N/S:C/C:H/I:H/A:H)

- **Condition.** `/etc/systemd/system/actions.runner.hooks-gg-preview-image-generator.hooks-preview-image-generator.service` has `User=` empty (root), `WorkingDirectory=/usr/local/bin/actions-runner`. `prod.yml` triggers on `push: [prod]` and `workflow_dispatch` and uses `actions/checkout@v3`, `actions/setup-node@v3`, `actions/cache@v3` by tag. Who holds write access to the repository is unread.
- **Consequence.** A push to `prod`, a workflow dispatch, or a retagged action executes as root on the production host. This is also why root owns the deployed tree and the PM2 daemon (H-001's privilege).
- **Owed when routed.** A dedicated runner user owning `/usr/local/bin/hooks-image-preview-generator` and a non-root PM2 daemon (pairs with H-001 (2)); the three actions pinned to commit SHAs; review required on `prod`.

### Also carried, LOW, from the same document (recommendations, no owed act)

- **L-001** — `src/server.ts` `processImage` destructures `id`, `nonce`, `message` after an object test only; `src/generateImage.ts` interpolates `id`/`nonce` into S3 keys (`previews/<id>/<nonce>.jpeg`, delete prefix `previews/<id>/`). A `zod` schema at the parse site (`zod` is a dependency, unused in `src`) is the fix. Arrays pass by the owner's D35 re-put (rulings 09:28Z; plan 015 Exclusions, QAF-33).
- **L-002** — `src/getPool.ts` `createPool` defaults (`max 10`, `min 2`, no `acquireTimeoutMillis`, no `maxWaitingClients`) on a 2-vCPU, 1971 MB, no-swap host with `--max-old-space-size=1536`: sustained concurrent saves can hold ten Chromiums. `acquireTimeoutMillis`, `maxWaitingClients` and a `max` sized to the host are the fix.

## Evidence

- Host reads, read-only as `claude-ro` over `ssh hooks-pig` (D17/D18; no pm2 command, no write, no env, no `.env` content, `/home/nodejs/.pm2/dump.pm2` never opened): `verification/015/security-host-read.sh`, capture `verification/015/security-host-read-2026-11-08T0929Z.txt` — § A sockets, § A2 `/proc/net/tcp{,6}`, § B ufw, § C `ps` and `/proc/1071971/status`, § D Chromium processes and flags, § E deployed tree `ls -la` and `test -r`, § F Node version lines, § G `nproc`/`free -m`, § H `/etc/.pm2` listing, § I systemd units, § J addresses.
- External reachability: `verification/015/security-external-connect-2026-11-08T0935Z.txt` (`python3 -I`, `socket.create_connection`, 5 s, no bytes sent): 3000 CONNECTED, 22 CONNECTED, 3001 refused.
- Post-deploy read, 2026-11-08T22:16:55Z, read-only as `claude-ro` (`verification/015/security-post-deploy-read.sh`, capture `verification/015/security-post-deploy-read-2026-11-08T2216Z.txt`), after preview-image-generator prod `8de2b53` deployed (22:02Z, re-run 22:04:49Z): the deployed tree (written 22:04:49Z) carries puppeteer and puppeteer-core 21.1.0 with `revisions.js` `chrome: '116.0.5845.96'` (H-001 unchanged); `.env` `-rw-r--r-- root` 311 B and `.git` present in `deployed/prod`, `/etc/.pm2/dump.pm2` `-rw-r--r--` (M-001 reproduced by the deploy, as its Condition predicts); generator `node …/dist/server.js` as root, pid 2503931; `0.0.0.0:3000` LISTEN, Node v18.17.1 (H-003 unchanged); 0 Chromium processes at the read, so no DevTools listener was up to observe (H-002 arises per browser launch). Nothing in the posture moved with the release.
- Code, read not run: preview-image-generator at `8de2b53` (`src/getPool.ts` `minimal_args`, `createPool`, default export; `src/server.ts` handler; `ecosystem.config.js`; `.github/workflows/prod.yml`; `.github/deploy.sh`); website at its 2026-11-08 HEAD (`src/server/api/utils/shared.ts` `postMessagePreviewImage`; `src/components/DiscordMessageEditor/components/EmbedEditor/EmbedImage.tsx`; `ComponentEditors/ThumbnailEditor.tsx`, `MediaGalleryEditor.tsx`; `next.config.js`).
- Vulnerability facts: CVE-2023-4863 fixed in Chrome 116.0.5845.187 (Linux); Node 18 end of life 2025-04-30, last 18.20.8; CVE-2024-22019 in the nodejs 18 line — sources listed in `security/015-preview-image-generator-security-audit.md` § Appendix › References.

## Origin

Raised by security-hooks-015 in `security/015-preview-image-generator-security-audit.md` (agent-output `d9e5184`, initial assessment at `7e5ca5f`) as findings outside chain 015's scope (plan 015 D6, X-8). Put to the owner by steering-hooks-015 as a selection; chosen "Agent: accept, record only", rulings block 2026-11-08T09:43Z (agent-output `3a7b6b8`), which names this handoff as the carrier.

## Changelog

| Date | Author | Change |
|---|---|---|
| 2026-11-08T09:44 | security-hooks-015 | Created on the owner's selection (rulings 09:43Z); carries H-001 to M-002 and L-001, L-002 past chain 015's closure |
| 2026-11-08T22:20 | security-hooks-015 | Evidence: post-deploy read dates the posture past prod `8de2b53` (unchanged). The raising document is closed Review Complete at `security/closed/015-preview-image-generator-security-audit.md`; this record is the findings' carrier from here. |
| 2026-11-09T08:43 | implementer-PI006 | Added the `Secret-Files:` frontmatter field (PI006 AC-8.0, D-8) with three remote entries on host `hooks-pig` (the ssh alias the handoff uses): `/usr/local/bin/hooks-image-preview-generator/deployed/prod/.env`, `/etc/.pm2/dump.pm2` and `/etc/.pm2/dump.pm2.bak`. No other field or text changed. |
| 2026-11-10T08:37 | steering-cleanup (project cleanup) | `Owning-Stage` is now a double-quoted scalar: unquoted, its `: ` made the frontmatter invalid YAML since `f087a53` (reported by planner-PI006, record inbox 2026-11-10). Wording unchanged |
