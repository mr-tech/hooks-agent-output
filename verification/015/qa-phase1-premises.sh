#!/usr/bin/env bash
# QA Phase 1 premise reads, chain 015 (qa/015-bug-evaluation-fixes-qa.md).
#
# Read-only against the workspace trees: it reads files and greps, and never writes into
# website/ or preview-image-generator/. It fetches two registry tarballs (npm pack) into a
# temporary directory it creates and deletes, and checks each against the generator's lockfile
# integrity before reading it. It prints only the KEY NAMES of the generator's .env, never values.
#
# Usage: verification/015/qa-phase1-premises.sh [/usr/local/bin/hooks]
# Expected at website 7ce866b / preview-image-generator 471578f: see the QA document, § Populations.
set -u
W=${1:-/usr/local/bin/hooks}
WEB=$W/website
PIG=$W/preview-image-generator
T=$(mktemp -d)
trap 'rm -rf "$T"' EXIT

echo "== trees"
git -C "$WEB" rev-parse HEAD
git -C "$PIG" rev-parse HEAD

echo "== M1-a: 'in', sites under src/server (grep -rc, nonzero files)"
grep -rc "'in'," "$WEB/src/server" | grep -v ':0$'

echo "== M3: dead tagName compare sites"
grep -rc "tagName !== '~/components/Button'" "$WEB/src" | grep -v ':0$'

echo "== M6-i: duplicate handler definitions"
grep -rc "const duplicate[A-Z]" "$WEB/src" --include=*.tsx | grep -v ':0$'

echo "== M5-e: getDateString copies"
grep -rc "function getDateString\|const getDateString" "$WEB/src" | grep -v ':0$'

echo "== M6-l: countTotalComponents definition sites"
grep -rc "function countTotalComponents" "$WEB/src" | grep -v ':0$'

echo "== M7: test collection scope (vitest include, tsconfig.test include)"
grep -n "include:" "$WEB/vitest.config.ts"
grep -n '"src/\|"bot/' "$WEB/tsconfig.test.json"
echo "bot test files: $(find "$WEB/bot" -name '*.test.*' | wc -l)"

echo "== Transcribed embedShape in the standing suite (QAF-1)"
grep -n "^const embedShape = z.object\|color: z.number().int().positive()\|text: z.string().trim().max(2048)" \
  "$WEB/src/utils/__tests__/bugFixCoverage.supplemental.test.ts"
grep -n "MAX_EMBED_FOOTER_TEXT_LENGTH =" -r "$WEB/src/constants" 2>/dev/null | head -2

echo "== ID-token negative form over test basenames, titles, comments (with planted control)"
P='\b(m|ms|cr|qa|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b0[0-9]{2}\b|[0-9]{4}-[0-9]{2}-[0-9]{2}'
SEL="^\s*//|^\s*\*|(describe|it|test)(\.each\([^)]*\))?\(['\"\`]"
printf "  it('covers M3 dialog', () => {\n  // see qa-2 2026-11-08\n  it('plain', () => {\n" > "$T/control.txt"
echo "control (expect 2): $(grep -E "$SEL" "$T/control.txt" | grep -ciE "$P")"
echo "basenames: $(find "$WEB/src" -path '*__tests__*' -name '*.test.*' -printf '%f\n' | grep -ciE "$P")"
total=0
while IFS= read -r f; do
  n=$(grep -E "$SEL" "$f" | grep -v "// escaped:" | grep -ciE "$P")
  total=$((total + n)); [ "$n" != 0 ] && echo "  $n $f"
done < <(find "$WEB/src" -path '*__tests__*' -name '*.test.*')
echo "title/comment lines: $total"

echo "== Generator .env key names (values never printed) and tracking"
awk -F= 'NF>1{print $1, (length(substr($0, index($0,"=")+1))>0 ? "set" : "empty")}' "$PIG/.env"
git -C "$PIG" check-ignore -v .env

echo "== Generator call order: S3 delete starts before the image is awaited (generateImage default export)"
grep -n "getPool().use\|await deleteMessagePreviewImages\|Body: await imagePromise" "$PIG/src/generateImage.ts"
grep -n "getPool()" "$PIG/src/server.ts"

lockver() { grep -n "\"node_modules/$1\"" -A2 "$PIG/package-lock.json" | grep -o '"version": "[^"]*"' | cut -d'"' -f4; }
lockint() { grep -n "\"node_modules/$1\"" -A4 "$PIG/package-lock.json" | grep -o '"integrity": "[^"]*"' | cut -d'"' -f4; }
fetch() { # name -> extracts to $T/$1/package
  local v; v=$(lockver "$1"); mkdir -p "$T/$1"
  (cd "$T/$1" && npm pack "$1@$v" --silent >/dev/null 2>&1)
  local got="sha512-$(openssl dgst -sha512 -binary "$T/$1"/*.tgz | base64 -w0)"
  [ "$got" = "$(lockint "$1")" ] && echo "$1@$v integrity matches lockfile" || { echo "$1@$v INTEGRITY MISMATCH"; return 1; }
  tar -xzf "$T/$1"/*.tgz -C "$T/$1"
}

echo "== puppeteer: skip-download predicate (M8 install premise)"
fetch puppeteer && {
  grep -n '"postinstall"' "$T/puppeteer/package/package.json"
  grep -n "configuration.skipDownload = Boolean(process.env\['PUPPETEER_SKIP_DOWNLOAD'\]" \
    "$T/puppeteer/package/lib/cjs/puppeteer/getConfiguration.js"
}
echo "local puppeteer cache present: $(ls -d ~/.cache/puppeteer 2>/dev/null | wc -l); PUPPETEER_* env vars: $(env | grep -c '^PUPPETEER')"

echo "== generic-pool: autostart creates min resources at createPool (QAF-2)"
fetch generic-pool && {
  grep -n "this.autostart = true" "$T/generic-pool/package/lib/PoolDefaults.js"
  grep -n "if (this._config.autostart === true)" "$T/generic-pool/package/lib/Pool.js"
}
grep -n "min = 2" "$PIG/src/getPool.ts"
