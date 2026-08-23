#!/bin/sh
# CR round 6 — enumerates what the pin-refresh commit actually changed in pnpm-lock.yaml.
# Tests commit 49f2bf1's claim: "444 changed lines in pnpm-lock.yaml, 0 unrelated to project-utils".
#
# Counting discipline: the diff is written to a FILE and counted from the file. Counting a piped
# diff under this workspace's output filter is unsound (a leading +/- no longer marks what it marks
# in raw diff bytes), which is how a "nothing else changed" conclusion gets reached over a change
# that was in fact made.
W=${W:-/usr/local/bin/hooks/website}
OUT=$(mktemp -d)
git -C "$W" show 49f2bf1 -- pnpm-lock.yaml > "$OUT/lock.diff"

grep -E '^[+-]' "$OUT/lock.diff" | grep -v '^[+-][+-]' > "$OUT/changed"
CHANGED=$(grep -c '' "$OUT/changed")
grep -vi 'project-utils' "$OUT/changed" > "$OUT/notpu"
NOTPU=$(grep -c '' "$OUT/notpu")

# Distinct package@version entry headers that moved.
grep -oE "^[+-]  '[^']+@[0-9][^']*':" "$OUT/changed" \
  | sed "s/^\([+-]\)  '/\1/;s/':$//" | sort > "$OUT/pkgs"
NAMES=$(sed 's/^[+-]//; s/@[0-9][^@]*$//' "$OUT/pkgs" | sort -u | grep -c '')

echo "changed lines                 : $CHANGED"
echo "changed lines NOT project-utils: $NOTPU"
echo "distinct package names moved   : $NAMES"
echo
echo "package names moved:"
sed 's/^[+-]//; s/@[0-9][^@]*$//' "$OUT/pkgs" | sed 's/(.*//' | sort -u | sed 's/^/  /'
echo
if [ "$NOTPU" -eq 0 ]; then
  echo "RESULT: claim holds — nothing unrelated to project-utils changed."
else
  echo "RESULT: claim FALSE — $NOTPU of $CHANGED changed lines are unrelated to project-utils."
fi
rm -rf "$OUT"
