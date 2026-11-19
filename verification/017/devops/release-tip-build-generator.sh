#!/bin/bash
# release-tip-build-generator.sh <export-dir> <log-dir> — Phase 2A step 5 for the generator, in the forms the deploy
# workflow's run steps name (`npm ci --omit=optional`, `npm run build`), in a throwaway export of the tip's package files
# and src. Deviation: PUPPETEER_SKIP_DOWNLOAD=1, so the install does not fetch a browser; no step here runs one.
set -u
EXP="$1"; LOGS="$2"; mkdir -p "$LOGS"; cd "$EXP" || exit 90
{ echo "== npm ci $(date -u +%FT%TZ) npm $(npm --version) node $(node --version)"; timeout 900 env PUPPETEER_SKIP_DOWNLOAD=1 npm ci --omit=optional 2>&1 | tail -15; echo "npm ci exit=${PIPESTATUS[0]}"; } > "$LOGS/install.log" 2>&1
timeout 600 npm run build > "$LOGS/build.log" 2>&1; echo "npm run build exit=$?" >> "$LOGS/build.log"
{ grep 'npm ci exit=' "$LOGS/install.log"; tail -1 "$LOGS/build.log"; } > "$LOGS/summary.txt"
