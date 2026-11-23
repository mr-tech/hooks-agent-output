#!/bin/sh
# QA Phase 2, plan 019 M2, AC-2.6: is the MIT notice in a JavaScript file the editor page loads?
# $1 = a built export root (its .next), $2 = label. Prints, per manifest that belongs to an edit page, every static chunk the
# manifest names and, for each, the count of lines holding the copyright line and the permission text's first sentence
# (grep -c over the file, not a sourcemap). Then the same two counts over every .js under .next/static, as the population.
R="$1"; L="$2"
C='Copyright 2025 Discord, Inc.'
P='Permission is hereby granted, free of charge, to any person obtaining a copy of this software'
echo "== $L"
find "$R/.next/server/app" -path '*edit*' -name 'page_client-reference-manifest.js' | sort | while read -r m; do
  echo "manifest ${m#$R/}"
  grep -o 'static/chunks/[A-Za-z0-9_./~-]*\.js' "$m" | sort -u | while read -r c; do
    f="$R/.next/$c"
    [ -f "$f" ] || { echo "  $c MISSING"; continue; }
    echo "  $c copyright=$(grep -c "$C" "$f") permission=$(grep -c "$P" "$f")"
  done
done
n=$(find "$R/.next/static" -name '*.js' | wc -l)
hc=$(grep -rl --include='*.js' "$C" "$R/.next/static" | wc -l)
hp=$(grep -rl --include='*.js' "$P" "$R/.next/static" | wc -l)
echo "population: $n .js files under .next/static; holding copyright: $hc; holding permission sentence: $hp"
