#!/bin/sh
# QA Phase 2, plan 019 M2 at website 78c5f74. Runs in a git-archive export with its own frozen install (install-frozen.*).
# $1 = export dir, $2 = capture dir (this directory). Each step writes <name>.log and <name>.exit.
# 1. pnpm test's projects (node, dom) offline: own network namespace, loopback up (P-Q1's form).
# 2. pnpm run typecheck (both tsc programs).
# 3. next build of the tip.
# 4. Control for AC-2.6: a copy of the export with the one line `startEngine.notice = ENGINE_NOTICE;` removed, built the same way.
E="$1"; V="$2"
cd "$E" || exit 9
unshare -rn sh -c 'ip link set lo up && npx vitest run --project node --project dom --reporter=json --outputFile="$0/suite-78c5f74-offline.json"' "$V" > "$V/suite-78c5f74-offline.log" 2>&1
echo $? > "$V/suite-78c5f74-offline.exit"
pnpm run typecheck > "$V/typecheck-78c5f74.log" 2>&1
echo $? > "$V/typecheck-78c5f74.exit"
SKIP_ENV_VALIDATION=1 pnpm run build > "$V/build-tip.log" 2>&1
echo $? > "$V/build-tip.exit"
C="$E-control"
rm -rf "$C"
mkdir "$C"
(cd "$E" && tar --exclude=./.next -cf - .) | (cd "$C" && tar -xf -)
grep -c '^startEngine.notice = ENGINE_NOTICE;$' "$C/src/utils/markdown/engine.ts" > "$V/control-line-count-before.txt"
sed -i '/^startEngine.notice = ENGINE_NOTICE;$/d' "$C/src/utils/markdown/engine.ts"
grep -c '^startEngine.notice = ENGINE_NOTICE;$' "$C/src/utils/markdown/engine.ts" > "$V/control-line-count-after.txt"
cd "$C" && SKIP_ENV_VALIDATION=1 pnpm run build > "$V/build-control.log" 2>&1
echo $? > "$V/build-control.exit"
