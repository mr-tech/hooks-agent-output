#!/usr/bin/env bash
# RK-7 transitive check (qa/015-bug-evaluation-fixes-qa.md): is any module that reads a non-NEXT_PUBLIC_, non-NODE_ENV key
# through ~/env.mjs reachable by value imports from a client root ('use client' files; src/pages non-api)?
# Bounded predicate: static `import/export ... from`, `import('…')`, bare `import '…'`; specifiers '~/', 'bot/', relative.
# Type-only imports are skipped. Excludes: require(), computed dynamic imports, package-internal paths, files outside src/.
# Controls: constants/index.ts reachable; planted value import fires; planted `{ type x }` import does not; planted mixed fires.
# Usage: qa-rk7-client-reach-run.sh <website-repo> <sha> <scratch-dir>
set -u; REPO=$1; SHA=$2; D=$3/rk7-$SHA; HERE=$(cd "$(dirname "$0")" && pwd)
rm -rf "$D"; mkdir -p "$D"; git -C "$REPO" archive "$SHA" src bot | tar -x -C "$D"
echo "== $SHA"; node "$HERE/qa-rk7-client-reach.js" "$D"
P="$D/src/PlantedClientProbe.tsx"
printf "'use client';\nimport { x } from '~/utils/discord';\nexport default x;\n" > "$P"; echo "control value import (expect 1): $(node "$HERE/qa-rk7-client-reach.js" "$D" | grep -c PlantedClientProbe)"
printf "'use client';\nimport { type x } from '~/utils/discord';\nexport default 1;\n" > "$P"; echo "control braces-type import (expect 0): $(node "$HERE/qa-rk7-client-reach.js" "$D" | grep -c PlantedClientProbe)"
printf "'use client';\nimport { type x, y } from '~/utils/discord';\nexport default y;\n" > "$P"; echo "control mixed import (expect 1): $(node "$HERE/qa-rk7-client-reach.js" "$D" | grep -c PlantedClientProbe)"
rm -rf "$D"
