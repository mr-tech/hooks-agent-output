#!/bin/sh
# QA Phase 2 refresh, plan 019 M2 at website 7dcedc9 (fix round 2 over 78c5f74). $1 = git-archive export of 7dcedc9, $2 = this dir.
# 1. frozen install; 2. pnpm test's projects offline; 3. next build (generates next-env.d.ts); 4. typecheck; 5. two QA mutants, each
# applied to the export, run over its one test file offline, then restored and the restore verified by sha256:
#   QM-1 removes `spoiler: 'spoiler',` from MODIFIER_KINDS in engine.ts (production);
#   QM-2 changes BITS's `SPOILER: 0x1000000,` to `SPOILER: 0x2000000,` in engine.surface-masks.test.ts (the QAF-30 case's table).
E="$1"; V="$2"; cd "$E" || exit 9
sha256sum pnpm-lock.yaml > "$V/lock-before.sha256"
pnpm install --frozen-lockfile > "$V/install-frozen.log" 2>&1; echo $? > "$V/install-frozen.exit"
sha256sum pnpm-lock.yaml > "$V/lock-after.sha256"
unshare -rn sh -c 'ip link set lo up && npx vitest run --project node --project dom --reporter=json --outputFile="$0/suite-7dcedc9-offline.json"' "$V" > "$V/suite-7dcedc9-offline.log" 2>&1
echo $? > "$V/suite-7dcedc9-offline.exit"
SKIP_ENV_VALIDATION=1 pnpm run build > "$V/build-tip.log" 2>&1; echo $? > "$V/build-tip.exit"
pnpm run typecheck > "$V/typecheck.log" 2>&1; echo $? > "$V/typecheck.exit"
mut() { # $1 id, $2 file, $3 old line (fixed string), $4 new line, $5 test file
  f="$2"; s0=$(sha256sum "$f" | cut -d' ' -f1)
  n=$(grep -cF "$3" "$f"); echo "$1 occurrences-before=$n" > "$V/$1.txt"
  python3 -c 'import sys;p,o,n=sys.argv[1:];t=open(p).read();assert t.count(o)==1;open(p,"w").write(t.replace(o,n))' "$f" "$3" "$4" >> "$V/$1.txt" 2>&1
  unshare -rn sh -c 'ip link set lo up && npx vitest run --project node "$0" --reporter=json --outputFile="$1"' "$5" "$V/$1.json" > "$V/$1.log" 2>&1
  echo "exit=$?" >> "$V/$1.txt"
  python3 -c 'import sys;p,o,n=sys.argv[1:];t=open(p).read();open(p,"w").write(t.replace(n,o,1))' "$f" "$3" "$4"
  s1=$(sha256sum "$f" | cut -d' ' -f1); [ "$s0" = "$s1" ] && echo "restored=yes" >> "$V/$1.txt" || echo "restored=NO" >> "$V/$1.txt"
}
mut QM-1 src/utils/markdown/engine.ts "  spoiler: 'spoiler',
} as const satisfies Record<ModifierKind, string>;" "} as const satisfies Record<ModifierKind, string>;" src/utils/markdown/__tests__/engine.kind-maps.test.ts
mut QM-2 src/utils/markdown/__tests__/engine.surface-masks.test.ts "  SPOILER: 0x1000000," "  SPOILER: 0x2000000," src/utils/markdown/__tests__/engine.surface-masks.test.ts
