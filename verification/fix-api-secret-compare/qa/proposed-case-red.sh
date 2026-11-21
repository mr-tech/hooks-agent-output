#!/usr/bin/env bash
# proposed-case-red: runs the proposed secretEquals.equality.test.ts in a `git archive` export of a website commit,
# unmutated (control) and under each sweep survivor on secretEquals.ts, each run contained and network-isolated.
# Usage: proposed-case-red.sh <scratch dir> <website sha>   (output beside this script, proposed-case-red-*.txt / .exit;
# the first run, at 32d10f7, was made before the SHA became an argument)
set -u
V=$(cd "$(dirname "$0")" && pwd)
E="$1/proposed-export"
SHA="${2:?website sha}"
rm -rf "$E"; mkdir -p "$E"
git -C /usr/local/bin/hooks/website archive "$SHA" | tar -x -C "$E"
ln -s /usr/local/bin/hooks/website/node_modules "$E/node_modules"
cp "$V/proposed-secretEquals.equality.test.ts" "$E/src/server/api/utils/__tests__/secretEquals.equality.test.ts"
F=src/server/api/utils/secretEquals.ts
cp "$E/$F" "$E/secretEquals.orig"
run() {
  (cd "$E" && systemd-run --user --scope -q -p RuntimeMaxSec=240 -p MemoryMax=6G -p TasksMax=512 \
    unshare -rn npx vitest run --no-cache --configLoader runner --config "$V/../fixer/vitest.config.export.ts" \
    src/server/api/utils/__tests__/secretEquals.equality.test.ts > "$V/proposed-case-red-$1.txt" 2>&1; echo $? > "$V/proposed-case-red-$1.exit")
  echo "$1 exit $(cat "$V/proposed-case-red-$1.exit")"; grep -E "Tests |✓|×|FAIL" "$V/proposed-case-red-$1.txt" | head -12
}
mutate() { # id old new
  cp "$E/secretEquals.orig" "$E/$F"
  python3 - "$E/$F" "$2" "$3" <<'EOF'
import sys
p, old, new = sys.argv[1:]
s = open(p).read()
assert s.count(old) == 1, 'old must occur once'
open(p, 'w').write(s.replace(old, new))
EOF
  run "$1"
}
run control
mutate plain-equality 'return timingSafeEqual(digest(a), digest(b));' 'return a === b;'
mutate buffer-equals 'return timingSafeEqual(digest(a), digest(b));' 'return digest(a).equals(digest(b));'
mutate md5 "createHash('sha256')" "createHash('md5')"
cp "$E/secretEquals.orig" "$E/$F"
rm -rf "$E"
ls -d "$E" 2>&1
