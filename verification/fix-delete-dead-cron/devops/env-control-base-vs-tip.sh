#!/bin/bash
# Control for the errored production build: build the base and the tip with NO app env vars set and
# without SKIP_ENV_VALIDATION, and compare the failure. Exports carry no .env* file. Never reads a value.
set -u
S=/tmp/claude-1000/-usr-local-bin-hooks-website/0f1145cc-6157-43ab-923c-f272e712caf3/scratchpad
for SHA in 0c14d5b 132a7ab; do
  E=$S/envrepro-$SHA
  rm -rf "$E"; mkdir -p "$E"
  git -C /usr/local/bin/hooks/website archive $SHA | tar -x -C "$E"
  cd "$E" || exit 90
  echo "##### $SHA  env .env files: $(ls -a | grep -c '^\.env')  DATABASE_URL set: ${DATABASE_URL:+yes}${DATABASE_URL:-no}"
  timeout 420 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=430 pnpm install --frozen-lockfile --prefer-offline > "$S/envrepro-$SHA-install.txt" 2>&1
  echo "install-exit $?"
  env -u SKIP_ENV_VALIDATION -u DATABASE_URL -u REDISHOST -u REDISPORT -u REDISUSER -u REDISPASSWORD \
    timeout 400 systemd-run --user --scope -p MemoryMax=8G -p RuntimeMaxSec=410 pnpm run build 2>&1
  echo "build-exit $?"
done
