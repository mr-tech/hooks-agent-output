#!/usr/bin/env bash
# M5-e / B-7 instrument, widened: every script the page's HTML names under /_next/static/ (any subpath, e.g. Next 16.4.6's
# /_next/static/immutable/chunks/), fetched and counted for "16.4.6" and "16.1.6". Usage: m5e-version-read.sh <origin> <workdir>
H=$1; W=$2; mkdir -p "$W"; curl -s "$H/" -o "$W/page.html"
n=0; a=0; b=0
for c in $(grep -o 'src="/_next/static/[^"]*\.js[^"]*"' "$W/page.html" | sed 's/^src="//; s/"$//' | sort -u); do
  n=$((n+1)); f="$W/chunk-$n.js"; curl -s "$H$c" -o "$f"
  if grep -q '"16\.4\.6"' "$f"; then a=$((a+1)); echo "16.4.6 in $c: $(grep -o 'window.next={version:"[0-9.]*"' "$f" | head -1)"; fi
  if grep -q '"16\.1\.6"' "$f"; then b=$((b+1)); echo "16.1.6 in $c: $(grep -o 'window.next={version:"[0-9.]*"' "$f" | head -1)"; fi
done
echo "scripts=$n files-with-16.4.6=$a files-with-16.1.6=$b"
