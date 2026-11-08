# security-hooks-015 post-deploy host read — READS ONLY, run as claude-ro over `ssh hooks-pig 'bash -s' < this-file`.
# No pm2 command, no write, no .env content, no /home/nodejs/.pm2/dump.pm2, no /proc/*/environ.
# Purpose: date the accepted host posture (handoff/preview-image-generator-host-security-posture-2026-11-08.md)
# past the chain 015 release of preview-image-generator prod 8de2b53 (deployed 2026-11-08T22:02Z, re-run 22:04:49Z).
D=/usr/local/bin/hooks-image-preview-generator/deployed/prod
echo "== whoami / date"; whoami; date -u +%FT%TZ
echo "== deployed puppeteer-core package version"; grep -m1 '"version"' $D/node_modules/puppeteer-core/package.json
echo "== deployed puppeteer package version"; grep -m1 '"version"' $D/node_modules/puppeteer/package.json
echo "== revisions.js chrome line"; grep -m1 -i 'chrome' $D/node_modules/puppeteer-core/lib/cjs/puppeteer/revisions.js
echo "== deployed tree mtimes and modes (no content)"; ls -la --time-style=+%FT%TZ $D/dist/server.js $D/ecosystem.config.js $D/.env $D/package-lock.json 2>&1; test -d $D/.git && echo ".git present in deployed tree" || echo ".git absent in deployed tree"
echo "== kill_timeout / shutdown_with_message in deployed ecosystem"; grep -n 'kill_timeout\|shutdown_with_message' $D/ecosystem.config.js
echo "== generator process"; ps -eo user,pid,lstart,args | grep '[d]ist/server.js'
echo "== chromium process count"; ps -eo args | grep -c '[c]hrome-linux64/chrome'
echo "== chromium binary path / user / flags of interest (uniq -c)"; ps -eo user,args | grep '[c]hrome-linux64/chrome' | grep -o '^root\|^[a-z_][a-z0-9_-]*\|/root/.cache/puppeteer/chrome/linux-[0-9.]*\|--no-sandbox\|--disable-setuid-sandbox\|--remote-debugging-port=[0-9]*' | sort | uniq -c
echo "== listeners"; ss -ltnH 2>/dev/null
echo "== node"; node --version
echo "== /etc/.pm2 dump modes"; ls -la --time-style=+%FT%TZ /etc/.pm2/dump.pm2 /etc/.pm2/dump.pm2.bak 2>&1
