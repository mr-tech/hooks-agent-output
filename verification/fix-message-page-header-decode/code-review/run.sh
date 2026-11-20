#!/usr/bin/env bash
# Reproduces the code review's runs for fix-message-page-header-decode (website base 983681c, fix 7923a1d).
# Runs only in two git-archive exports under $1; never touches the shared website tree. No network beyond the pnpm store (--offline).
set -u
W=/usr/local/bin/hooks/website; S=${1:?scratch dir}; T=src/app/_components/__tests__/Providers.request-headers.test.ts
mkdir -p "$S/base" "$S/fix"
git -C "$W" archive 983681c | tar -x -C "$S/base"
git -C "$W" archive 7923a1d | tar -x -C "$S/fix"
git -C "$W" show "7923a1d:$T" > "$S/base/$T"            # red run: base production code + the fix's test
cp "$W/next-env.d.ts" "$S/base/"; cp "$W/next-env.d.ts" "$S/fix/"   # generated, git-ignored; declares image modules for tsc
(cd "$S/base" && pnpm install --frozen-lockfile --offline > "$S/base-install.txt" 2>&1; echo base-install=$?)
(cd "$S/fix"  && pnpm install --frozen-lockfile --offline > "$S/fix-install.txt" 2>&1;  echo fix-install=$?)
(cd "$S/base" && timeout 300 npx vitest run "$T" > "$S/red-run.txt" 2>&1;   echo red=$?)     # expect 1, 4 failed
(cd "$S/fix"  && timeout 300 npx vitest run "$T" > "$S/green-run.txt" 2>&1; echo green=$?)   # expect 0, 4 passed
(cd "$S/fix"  && timeout 900 npx vitest run --reporter=json --outputFile="$S/suite-fix.json" > "$S/suite-fix-stdout.txt" 2>&1; echo suite=$?)
for t in base fix; do (cd "$S/$t" && timeout 600 pnpm run typecheck > "$S/typecheck-$t.txt" 2>&1; echo "$t typecheck=$?"); done
(cd "$S/fix" && node -e 'const p=require.resolve("next/package.json");const j=require(p);console.log("next",j.version,"optionalDeps.sharp=",j.optionalDependencies&&j.optionalDependencies.sharp);console.log(require("module").createRequire(p).resolve("sharp"))' > "$S/next-sharp-resolve.txt" 2>&1)
