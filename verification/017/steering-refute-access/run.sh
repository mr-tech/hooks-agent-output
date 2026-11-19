#!/usr/bin/env bash
# Usage: run.sh <sha> <export dir (already git-archived + pnpm installed --offline)> <outdir>
set -uo pipefail
SHA=$1; EXP=$2; OUT=$(realpath -m "$3"); HERE=$(cd "$(dirname "$0")" && pwd)
NAME=refute-access-pg; SOCK=$(mktemp -d /dev/shm/ra.XXXXXX); chmod 777 "$SOCK"; mkdir -p "$OUT"
cleanup() { docker exec -u root "$NAME" chown "$(id -u):$(id -g)" /var/run/postgresql >/dev/null 2>&1; docker stop -t 5 "$NAME" >/dev/null 2>&1; docker rm -f "$NAME" >/dev/null 2>&1; rm -rf "$SOCK" "$EXP/probe"; }
trap cleanup EXIT
test -e "$EXP/.env.local" && { echo "export holds .env.local"; exit 2; }
mkdir -p "$EXP/probe"; cp "$HERE/probe.test.ts" "$EXP/probe/"
docker rm -f "$NAME" >/dev/null 2>&1
docker run -d --rm --name "$NAME" --network none -v "$SOCK:/var/run/postgresql" -e POSTGRES_PASSWORD=probe -e POSTGRES_DB=probe postgres:16 >/dev/null || exit 1
for _ in $(seq 1 60); do docker exec "$NAME" pg_isready -U postgres -d probe >/dev/null 2>&1 && break; sleep 1; done; sleep 2
cd "$EXP" || exit 1
systemd-run --user --scope -q -p RuntimeMaxSec=900 -p MemoryMax=4G -p TasksMax=512 env -i PATH="$PATH" HOME="$HOME" NODE_ENV=production DATABASE_URL="postgresql://postgres@localhost/probe?host=$SOCK" PG_SOCKET_DIR="$SOCK" \
  NEXTAUTH_SECRET=d NEXTAUTH_URL=http://localhost:3000 DISCORD_CLIENT_SECRET=d DISCORD_URL=http://localhost DISCORD_BOT_TOKEN=d \
  REDISHOST=127.0.0.1 REDISPORT=1 REDISUSER=d REDISPASSWORD=d CDN_KEY=d CDN_SECRET=d CDN_BUCKET=b CDN_ENDPOINT=http://127.0.0.1:1 \
  DISCORD_PUBLIC_KEY=d ENCRYPTION_KEY=d ENCRYPTION_IV=d HOOKS_API_TOKEN=d PUSHER_APP_ID=d PUSHER_SECRET=d \
  PREVIEW_IMAGE_URL=http://127.0.0.1:1/g PREVIEW_IMAGE_API_KEY=d NEXT_PUBLIC_PUSHER_KEY=d NEXT_PUBLIC_PUSHER_CLUSTER=d NEXT_PUBLIC_DISCORD_CLIENT_ID=d \
  ATTACK_EXPORT="$EXP" ATTACK_HERE="$HERE" VITE_CACHE="$SOCK/vite" \
  timeout 300 unshare -rn sh -c 'ip link set lo up; exec node_modules/.bin/vitest run --no-cache --configLoader runner --config "$ATTACK_HERE/vitest.config.mjs" --reporter=verbose' > "$OUT/probe.out" 2>&1
echo "exit $?" > "$OUT/probe.exit"; cat "$OUT/probe.exit"
