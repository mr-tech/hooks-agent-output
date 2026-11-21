#!/usr/bin/env bash
# Usage: run-probe.sh WEBSITE_REPO WORK_DIR OUT_DIR
# Builds the probe from the fixer's content-editor test harness (lines 1-72 at b68f94c) plus
# open-without-typing.tail.tsx, runs it in a git archive export of each SHA, output to files.
# The probe asserts User-visible flow 5 as written ("opening without typing leaves the message unchanged").
set -u
repo=$1; work=$2; out=$3; here=$(cd "$(dirname "$0")" && pwd)
t=src/components/DiscordContentEditor/__tests__/DiscordContentEditor.desktop-typed-text-reaches-message.test.tsx
p=src/components/DiscordContentEditor/__tests__/DiscordContentEditor.open-without-typing.test.tsx
mkdir -p "$out"
for sha in b663b35 b68f94c; do
  d="$work/probe-$sha"; rm -rf "$d"; mkdir -p "$d"
  git -C "$repo" archive "$sha" | tar -x -C "$d"
  ln -s "$repo/node_modules" "$d/node_modules"
  mkdir -p "$d/$(dirname "$p")"
  { git -C "$repo" show "b68f94c:$t" | sed -n 1,72p; cat "$here/open-without-typing.tail.tsx"; } > "$d/$p"
  (cd "$d" && setsid timeout -s KILL 240 npx vitest run --no-cache --reporter=json --outputFile="$out/probe-$sha.json" "$p" \
     < /dev/null > "$out/probe-$sha.stdout" 2> "$out/probe-$sha.stderr"; echo "$sha exit=$?" >> "$out/exit-codes.txt")
  rm -rf "$d"
done
