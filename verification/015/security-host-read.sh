# security-hooks-015 host read — READS ONLY. No pm2 command, no write, no .env content, no /home/nodejs/.pm2/dump.pm2, no /proc/*/environ.
set -u
PATH=/usr/bin:/bin:/usr/sbin:/sbin
D=/usr/local/bin/hooks-image-preview-generator
echo "=== sec-host-read host=$(hostname) at=$(date -u +%Y-%m-%dT%H:%M:%SZ) as=$(id -un) uid=$(id -u)"
echo "[A] listening TCP sockets (ss -ltnH):"; ss -ltnH 2>&1 | sed 's/^/  /'
echo "[A2] /proc/net/tcp{,6} rows for :3000 (0BB8) and :22 (0016): local st uid"; awk 'NR>1 && ($2 ~ /:0BB8$/ || $2 ~ /:0016$/) {print "  "FILENAME" local="$2" st="$4" uid="$8}' /proc/net/tcp /proc/net/tcp6 2>&1
echo "[B] firewall:"; for u in ufw nftables netfilter-persistent iptables firewalld; do printf '  systemctl is-active %s: ' "$u"; systemctl is-active "$u" 2>&1; done
echo "  is-enabled ufw: $(systemctl is-enabled ufw 2>&1)"
echo "  /etc/ufw listing:"; ls -la /etc/ufw 2>&1 | sed 's/^/    /'
echo "  /etc/ufw/ufw.conf non-comment:"; grep -v '^#' /etc/ufw/ufw.conf 2>&1 | grep -v '^$' | sed 's/^/    /'
echo "  /etc/default/ufw non-comment:"; grep -v '^#' /etc/default/ufw 2>&1 | grep -v '^$' | sed 's/^/    /'
echo "  user.rules readable: $(test -r /etc/ufw/user.rules && echo yes || echo no); user6.rules readable: $(test -r /etc/ufw/user6.rules && echo yes || echo no)"
if test -r /etc/ufw/user.rules; then echo "  user.rules tuple/dport lines:"; grep -n 'dport\|### tuple\|ufw-user-input' /etc/ufw/user.rules | sed 's/^/    /'; fi
echo "  nft list ruleset: $(nft list ruleset 2>&1 | head -c 160)"
echo "  iptables -S: $(iptables -S 2>&1 | head -c 160)"
echo "  /etc/iptables: $(ls -la /etc/iptables 2>&1 | head -4 | tr '\n' '|')"
echo "[C] daemons, generator, runner (user pid ppid lstart args):"
ps -eo user=,pid=,ppid=,lstart=,args= | grep -E '[h]ooks-image-preview-generator|[R]unner\.|[r]un\.sh|[a]ctions-runner|[G]od Daemon' | cut -c1-220 | sed 's/^/  /'
GENPID=$(ps -eo pid=,args= | awk '/[h]ooks-image-preview-generator\/deployed\/prod\/dist\/server.js/ {print $1; exit}')
echo "  generator pid: ${GENPID:-none}"
if [ -n "${GENPID:-}" ]; then echo "  /proc/$GENPID/status:"; grep -E '^(Uid|Gid|CapEff|CapBnd|NoNewPrivs|Seccomp|Threads|VmRSS):' "/proc/$GENPID/status" 2>&1 | sed 's/^/    /'; echo "  exe: $(readlink /proc/$GENPID/exe 2>&1)"; echo "  cwd: $(readlink /proc/$GENPID/cwd 2>&1)"; fi
echo "[D] chromium processes (user pid ppid comm):"; ps -eo user=,pid=,ppid=,comm= | grep '[c]hrom' | head -12 | sed 's/^/  /'; echo "  count all chrom: $(ps -eo comm= | grep -c chrom)"
echo "  chromium binary paths (args field 1, distinct):"; ps -eo args= | grep '[c]hrom' | awk '{print $1}' | sort -u | sed 's/^/    /'
echo "  chromium args of interest (distinct flags no-sandbox/headless/remote-debugging):"; ps -eo args= | grep '[c]hrom' | grep -o -- '--no-sandbox\|--headless[^ ]*\|--remote-debugging-port=[0-9]*\|--remote-debugging-pipe\|--disable-setuid-sandbox' | sort | uniq -c | sed 's/^/    /'
echo "[E] deployed tree (ls only):"
ls -la "$D" 2>&1 | sed 's/^/  /'; ls -la "$D/deployed" 2>&1 | sed 's/^/  /'; ls -la "$D/deployed/prod" 2>&1 | sed 's/^/  /'
echo "  deployed .env readable by claude-ro: $(test -r $D/deployed/prod/.env && echo yes || echo no) (content not read)"
echo "  deployed ecosystem.config.js lines:"; grep -n 'kill_timeout\|shutdown_with_message\|node_args\|stop_exit_codes' "$D/deployed/prod/ecosystem.config.js" 2>&1 | sed 's/^/    /'
echo "  deployed puppeteer: $(grep -m1 '"version"' $D/deployed/prod/node_modules/puppeteer/package.json 2>&1)"
echo "  deployed puppeteer-core revisions: $(grep -o "'[0-9][0-9.]*'" $D/deployed/prod/node_modules/puppeteer-core/lib/cjs/puppeteer/revisions.js 2>&1 | head -3 | tr '\n' ' ')"
echo "  deployed generic-pool: $(grep -m1 '"version"' $D/deployed/prod/node_modules/generic-pool/package.json 2>&1)"
echo "  deployed dist/server.js has closeIdleConnections: $(grep -c closeIdleConnections $D/deployed/prod/dist/server.js 2>&1)"
echo "  deployed .git present: $(test -d $D/deployed/prod/.git && echo yes || echo no)"
echo "[F] node on PATH: $(node --version 2>&1) at $(command -v node 2>&1) -> $(readlink -f "$(command -v node 2>/dev/null)" 2>&1)"
echo "  pm2.log 'Node.js version' lines (last 3):"; grep -n 'Node.js version' /etc/.pm2/pm2.log 2>&1 | tail -3 | sed 's/^/    /'
echo "  pm2.log 'PM2 version' lines (last 2):"; grep -n 'PM2 version' /etc/.pm2/pm2.log 2>&1 | tail -2 | sed 's/^/    /'
echo "[G] resources: nproc=$(nproc); $(free -m | awk 'NR==2{printf "mem_total_mb=%s used=%s avail=%s ",$2,$3,$7} NR==3{printf "swap_total_mb=%s",$2}')"
echo "  uptime: $(uptime 2>&1)"
echo "[H] /etc/.pm2 perms (ls only):"; ls -la /etc/.pm2 2>&1 | sed 's/^/  /'
echo "[I] systemd units matching runner/pm2:"; ls /etc/systemd/system 2>&1 | grep -i 'runner\|pm2' | sed 's/^/  /'
for f in /etc/systemd/system/actions.runner.*.service /etc/systemd/system/pm2-*.service; do [ -r "$f" ] && { echo "  -- $f"; grep -E '^(User|Group|ExecStart|WorkingDirectory|Environment=PM2_HOME|Environment=HOME)' "$f" | sed 's/^/     /'; }; done
echo "[J] ipv4 addrs: $(ip -4 -o addr show 2>&1 | awk '{print $2"="$4}' | tr '\n' ' ')"
echo "  os: $(grep -m1 PRETTY_NAME /etc/os-release 2>&1); kernel: $(uname -r)"
echo "=== end"
