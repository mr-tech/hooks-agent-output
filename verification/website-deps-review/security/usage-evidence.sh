#!/usr/bin/env bash
# Counts, in a website tree, the source lines that would make each advisory's precondition true.
# Usage: usage-evidence.sh <website-root>   (prints "<count>\t<label>\t<pattern>"; counts are grep -c sums
# over non-test .ts/.tsx/.js/.mjs files under src, bot, lang and the root config files)
set -u
cd "$1" || exit 2
files=$(git ls-files 'src/*' 'bot/*' 'lang/*' next.config.js tailwind.config.js postcss.config.js vercel.json 2>/dev/null \
  | grep -E '\.(ts|tsx|js|mjs|json)$' | grep -v '/__tests__/')
[ -n "$files" ] || files=$(find src bot lang next.config.js tailwind.config.js postcss.config.js vercel.json -type f \
  \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' -o -name '*.mjs' -o -name '*.json' \) | grep -v '/__tests__/')
n() { # label, extended regex
  local c
  c=$(printf '%s\n' "$files" | xargs -d '\n' grep -cE -- "$2" 2>/dev/null | awk -F: '{s+=$NF} END{print s+0}')
  printf '%s\t%s\t%s\n' "$c" "$1" "$2"
}
printf 'files scanned\t%s\n' "$(printf '%s\n' "$files" | grep -c .)"
n "use server directive"                 "^[[:space:]]*['\"]use server['\"]"
n "use cache directive"                  "['\"]use cache['\"]"
n "cacheComponents / experimental.ppr"   "cacheComponents|experimental[[:space:]]*:|ppr[[:space:]]*:"
n "edge runtime declarations"            "runtime[[:space:]]*[:=][[:space:]]*['\"](edge|experimental-edge)['\"]"
n "next/script import"                   "from ['\"]next/script['\"]"
n "beforeInteractive"                    "beforeInteractive"
n "CSP header or script nonce"           "Content-Security-Policy|nonce=|x-nonce"
n "rewrites() config"                    "rewrites[[:space:]]*\\("
n "NextResponse.rewrite( call"           "^[^/]*NextResponse\\.rewrite\\("
n "NextResponse.redirect( call"          "NextResponse\\.redirect\\("
n "i18n config key"                      "i18n[[:space:]]*:"
n "generateStaticParams"                 "generateStaticParams"
n "ISR / cache APIs"                     "export const revalidate|revalidatePath|revalidateTag|unstable_cache|getStaticProps|force-cache"
n "new Request( construction"            "new Request\\("
n "metadata image routes"                "opengraph-image|twitter-image|ImageResponse"
n "dangerouslyAllowSVG"                  "dangerouslyAllowSVG"
n "custom server (http.createServer)"    "createServer\\("
n "next-auth getToken"                   "getToken"
n "next-auth email/credentials provider" "next-auth/providers/(email|credentials|nodemailer)|EmailProvider|CredentialsProvider"
n "next-auth provider imports"           "from ['\"]next-auth/providers/"
n "kysely sql.lit / sql.raw"             "sql\\.(lit|raw)"
n "kysely JSON-path builder"             'JSONPathBuilder|["'"'"']->>?[$]?["'"'"']' 
n "Kysely<any> outside comments"         "^[^*]*Kysely<any>"
n "MysqlDialect"                         "MysqlDialect"
n "nanoid import"                        "from ['\"]nanoid(/[a-z-]+)?['\"]"
n "nanoid non-secure import"             "nanoid/non-secure"
n "addFile( call (form-data path)"       "\\.addFile\\("
n "new FormData( from form-data"         "new FormData\\("
n "sanitize-html import"                 "from ['\"]sanitize-html['\"]|require\\(['\"]sanitize-html['\"]\\)"
n "sanitizeHtml( mention"                "sanitizeHtml\\("
n "sharp import"                         "from ['\"]sharp['\"]|require\\(['\"]sharp['\"]\\)"
n "Cookies.set/remove/withAttributes"    "Cookies\\.(set|remove|withAttributes|withConverter)"
n "Cookies.get"                          "Cookies\\.get\\("
n "react-use useCookie / useCss"         "useCookie|useCss"
n "queryString.parse"                    "queryString\\.parse\\("
n "x-query-params header read"           "get\\(['\"]x-query-params['\"]\\)"
n "lodash import"                        "from ['\"]lodash"
n "fast-xml-parser import"               "fast-xml-parser"
n "@vercel/functions import"             "from ['\"]@vercel/functions"
n "waitUntil( call"                      "waitUntil\\("
