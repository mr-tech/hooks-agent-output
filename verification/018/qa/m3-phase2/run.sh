#!/usr/bin/env bash
# QA Phase 2 on M3. Usage: run.sh <scratch> <out>. Exports of a558f2d (parent) and 969d92a (M3), own installs, no .env,
# SKIP_ENV_VALIDATION=1; suite and lint under unshare -rn; builds have network (next/font).
set -u; S=$1; O=$2; W=/usr/local/bin/hooks/website; export SKIP_ENV_VALIDATION=1
step() { local name=$1; shift; "$@" > "$O/$name.txt" 2>&1; local rc=$?; echo "$name exit $rc" >> "$O/$name.txt"; echo "$name exit $rc" >> "$O/exits.txt"; return 0; }
manifest() { # $1 dir, $2 out: sha256 of every file under .next/server and .next/static, build id replaced
  local id; id=$(cat "$1/.next/BUILD_ID")
  (cd "$1/.next" && find server static -type f | sort | while read -r f; do printf '%s  %s\n' "$(sed "s/$id/BUILDID/g" "$f" | sha256sum | cut -c1-64)" "$(echo "$f" | sed "s/$id/BUILDID/g")"; done) > "$2"
  find "$1/.next" -name '*.nft.json' -print0 | xargs -0 cat | tr ',' '\n' | grep -o 'node_modules/[^"]*' | sed 's|.*node_modules/\.pnpm/||' | sort -u > "$2.nft-paths"
}
: > "$O/exits.txt"
for T in a558f2d 969d92a; do
  X=$S/$T; rm -rf "$X"; mkdir -p "$X"; git -C $W archive $T | tar -x -C "$X"; cd "$X"
  step $T-install timeout -k 10 600 pnpm install --frozen-lockfile
  ls -d .eslintrc.json .eslintignore eslint.config.mjs > "$O/$T-lint-configs.txt" 2>&1
  step $T-lint timeout -k 10 900 unshare -rn pnpm exec eslint . --max-warnings=0 --format json -o "$O/$T-lint.json"
  step $T-build timeout -k 10 900 npx next build
  manifest "$X" "$O/$T-build1.manifest"
  grep -rlE --include='*.js' 'fast-glob|is-core-module|@prisma/internals' .next/server .next/static > "$O/$T-cr5-strings.files" 2>/dev/null; echo "$T cr5-string files $(grep -c . "$O/$T-cr5-strings.files")" >> "$O/exits.txt"
  step $T-typecheck timeout -k 10 600 pnpm run typecheck
done
cd "$S/969d92a"; step 969d92a-suite timeout -k 10 900 unshare -rn npx vitest run --reporter=json --outputFile="$O/969d92a-suite.json"
cd "$S/a558f2d"; rm -rf .next; step a558f2d-build2 timeout -k 10 900 npx next build; manifest "$S/a558f2d" "$O/a558f2d-build2.manifest"
echo done >> "$O/exits.txt"
