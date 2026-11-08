#!/usr/bin/env bash
# QA Phase 1 instrument (chain 015, M2-a colour class). Usage: qa-m2a-colour-truthiness-sweep.sh <website-repo> <rev>...
# Class (plan rev 13 § M2-a): every site that tests an integer colour for truthiness, so 0 reads as "no colour".
# Predicate, step 1: lines naming a colour field (color|accent_color|accentColor) in production source
#   (src/**/*.ts(x), bot/**), tests excluded. Step 2: identifiers the colour is renamed into (initColor) and
#   every intToHex( call. Step 3: the truthiness filter below, over both.
# Excludes: colour values reached only through other renames not in step 2; computed property access.
# Positive control: the base's two known members (discordResponseToMessage.ts `if (e.color)`, EmbedEditor
#   `color ? intToHex`) must appear in the base's truthiness hits.
set -u
repo=$1; shift
for rev in "$@"; do
  echo "== $rev"
  echo -n "step1 lines (grep -c summed): "
  git -C "$repo" grep -cE '\b(color|accent_color|accentColor)\b' "$rev" -- 'src/**/*.ts' 'src/**/*.tsx' 'bot/**' ':!**/__tests__/**' | awk -F: '{s+=$NF} END{print s}'
  echo "truthiness hits:"
  { git -C "$repo" grep -nE '\b(color|accent_color|accentColor)\b' "$rev" -- 'src/**/*.ts' 'src/**/*.tsx' 'bot/**' ':!**/__tests__/**'
    git -C "$repo" grep -nE 'initColor|intToHex\(' "$rev" -- 'src/**' ':!**/__tests__/**'; } \
  | sort -u \
  | grep -E '(\b(e\.color|color|accent_color|initColor)\s*(\?[^.?]|&&|\|\|))|if \(!?[a-zA-Z_.]*(color|Color)\)' \
  | grep -vE 'prefers-color|theme' || echo "  (none)"
done
