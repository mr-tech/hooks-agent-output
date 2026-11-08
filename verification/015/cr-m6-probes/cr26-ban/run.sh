#!/usr/bin/env bash
# Usage: run.sh <website repo> <out>
# CR-26 re-attack: each plant (plants.txt: label TAB source with \n escapes) is linted over stdin with the repo's own
# .eslintrc.json, as the existing tsconfig member src/components/Button.tsx (a symlinked node_modules breaks plugin
# resolution in an export, so the shared tree's config and modules are used; nothing is written into the tree).
# Per plant: the count of no-restricted-imports messages, and the rule ids of any other errors.
set -u
W=$1; OUT=$2; HERE=$(cd "$(dirname "$0")" && pwd)
{
  echo "website HEAD $(git -C "$W" rev-parse --short HEAD); .eslintrc.json blob $(git -C "$W" hash-object "$W/.eslintrc.json") (b195eeb: $(git -C "$W" rev-parse b195eeb:.eslintrc.json))"
  while IFS=$'\t' read -r label src; do
    printf '%b\n' "$src" | (cd "$W" && npx eslint --no-ignore --stdin --stdin-filename src/components/Button.tsx -f json) > "$HERE/.lint.json" 2>/dev/null
    node -e '
      const r = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"))[0] || { messages: [] };
      const ri = r.messages.filter((m) => m.ruleId === "no-restricted-imports").length;
      const other = [...new Set(r.messages.filter((m) => m.ruleId !== "no-restricted-imports").map((m) => m.ruleId || "parse"))];
      console.log(`${process.argv[2]}: no-restricted-imports=${ri} other=${other.join(",") || "-"}`);
    ' "$HERE/.lint.json" "$label"
  done < "$HERE/plants.txt"
  rm -f "$HERE/.lint.json"
} > "$OUT" 2>&1
