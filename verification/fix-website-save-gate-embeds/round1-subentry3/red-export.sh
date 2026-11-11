#!/usr/bin/env bash
# Usage: red-export.sh <label> <base-sha> <export-dir> <out-dir> [unwire|mutate <sed-expr> [<file>]]
# mutate: <base-sha> is the tree under mutation; <sed-expr> is applied to <file> (default src/utils/index.ts).
# Exports website at <base-sha> into <export-dir> (detached worktree), overlays the
# working-tree versions of the files named in <out-dir>/targets.txt plus, for label
# "unwired", the new src/utils/index.ts with the callers left at <base-sha>; runs the
# targets under a killed-whole scope; writes <out-dir>/red-<label>.txt; removes the export.
set -u
LABEL=$1; BASE=$2; EXP=$3; OUT=$4; MODE=${5:-}; EXPR=${6:-}; MFILE=${7:-src/utils/index.ts}
SRC=/usr/local/bin/hooks/website
read -r -a TARGETS < "$OUT/targets.txt"
git -C "$SRC" worktree add --detach "$EXP" "$BASE" -q
ln -s "$SRC/node_modules" "$EXP/node_modules"
for f in "${TARGETS[@]}"; do mkdir -p "$EXP/$(dirname "$f")"; cp "$SRC/$f" "$EXP/$f"; done
if [ "$MODE" = unwire ]; then cp "$SRC/src/utils/index.ts" "$EXP/src/utils/index.ts"; fi
if [ "$MODE" = mutate ]; then
  sed -i "$EXPR" "$EXP/$MFILE"
  git -C "$EXP" diff -- "$MFILE" > "$OUT/red-$LABEL-mutation.diff"
fi
{ echo "label=$LABEL base=$BASE mode=${MODE:-none}"; git -C "$EXP" status --short; } > "$OUT/red-$LABEL-tree.txt"
( cd "$EXP" && systemd-run --user --scope -q -p RuntimeMaxSec=300 -p TasksMax=512 npx vitest run "${TARGETS[@]}" > "$OUT/red-$LABEL.txt" 2>&1; echo "exit=$?" >> "$OUT/red-$LABEL.txt" )
rm "$EXP/node_modules"
git -C "$SRC" worktree remove --force "$EXP"
