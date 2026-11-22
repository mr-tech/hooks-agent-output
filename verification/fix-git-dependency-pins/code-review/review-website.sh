#!/usr/bin/env bash
# Code-review instruments for the website pin, each in a git archive export (never the shared tree).
# Usage: review-website.sh <website repo> <base rev> <fix rev> <out-dir>
#   R3 cold fetch: at the fix rev, `pnpm install --frozen-lockfile --store-dir <empty dir>` so every package, both GitHub
#      commits included, is fetched from the network rather than a warm store. Exit 0 and the installed project-utils
#      resolving to the pinned commit is the pass.
#   R4 installed set: the `node_modules/.pnpm` directory listing at base and at fix (warm store), compared with the
#      lockfile's snapshot keys removed and added between the two revs (parsed with the repo's own js-yaml). The
#      installed directories removed must be exactly as many as the snapshot keys removed, each removed directory's
#      name@version prefix must belong to a removed key, and the only added directory must be the new project-utils.
set -u
repo=$1; base=$2; fix=$3; out=$4
mkdir -p "$out"
work=$(mktemp -d "${TMPDIR:-/tmp}/web-review.XXXXXX")
: > "$out/result.txt"
res() { echo "$1" | tee -a "$out/result.txt"; }

mkdir -p "$work/cold" "$work/cold-store"
git -C "$repo" archive "$fix" | tar -x -C "$work/cold"
( cd "$work/cold" && timeout 1500 pnpm install --frozen-lockfile --store-dir "$work/cold-store" ) > "$out/r3-install-cold.txt" 2>&1; r3=$?
echo "exit $r3" >> "$out/r3-install-cold.txt"
pu=$(readlink -f "$work/cold/node_modules/project-utils")
res "R3 cold-store frozen install exit=$r3 project-utils=$(basename "$(dirname "$(dirname "$pu")")")"
rm -rf "$work/cold" "$work/cold-store"

for rev in "$base" "$fix"; do
  mkdir -p "$work/$rev"
  git -C "$repo" archive "$rev" | tar -x -C "$work/$rev"
  ( cd "$work/$rev" && timeout 900 pnpm install --frozen-lockfile ) > "$out/r4-install-$rev.txt" 2>&1; echo "exit $?" >> "$out/r4-install-$rev.txt"
  ls -1 "$work/$rev/node_modules/.pnpm" | grep -v -x -e lock.yaml -e node_modules | sort > "$out/r4-pnpm-dirs-$rev.txt"
done
yaml=$(dirname "$(readlink -f "$work/$fix/node_modules/.pnpm/node_modules/js-yaml")")/js-yaml
node -e '
const fs=require("fs");const y=require(process.argv[1]);const [bl,fl,bd,fd,o]=process.argv.slice(2);
const B=Object.keys(y.load(fs.readFileSync(bl,"utf8")).snapshots),F=Object.keys(y.load(fs.readFileSync(fl,"utf8")).snapshots);
const rmKeys=B.filter(k=>!F.includes(k)),addKeys=F.filter(k=>!B.includes(k));
const rd=p=>fs.readFileSync(p,"utf8").split("\n").filter(Boolean);
const D0=rd(bd),D1=rd(fd);const rmDirs=D0.filter(d=>!D1.includes(d)),addDirs=D1.filter(d=>!D0.includes(d));
const pre=k=>{const m=k.replace(/\(.*$/,"");const i=m.indexOf("@",1);return (m.slice(0,i)+"@"+m.slice(i+1)).replace(/\//g,"+").replace(/[:#]/g,"+");};
const keyPre=new Set(rmKeys.map(pre));
const dirPre=d=>{const i=d.indexOf("@",1);return i<0?d:d.slice(0,i+1)+d.slice(i+1).replace(/_.*$/,"");};
const unmatched=rmDirs.filter(d=>{const n=dirPre(d);return ![...keyPre].some(p=>n===p||n.startsWith(p.slice(0,60)));});
const r={snapshotKeysRemoved:rmKeys.length,snapshotKeysAdded:addKeys,dirsBase:D0.length,dirsFix:D1.length,dirsRemoved:rmDirs.length,
 dirsAdded:addDirs,removedDirsWithoutRemovedKey:unmatched,
 ok:rmDirs.length===rmKeys.length&&addDirs.length===1&&/^project-utils@/.test(addDirs[0])&&!unmatched.length};
fs.writeFileSync(o,JSON.stringify({...r,rmDirs,rmKeys},null,2));console.log(JSON.stringify(r));process.exit(r.ok?0:1);
' "$yaml" "$work/$base/pnpm-lock.yaml" "$work/$fix/pnpm-lock.yaml" "$out/r4-pnpm-dirs-$base.txt" "$out/r4-pnpm-dirs-$fix.txt" "$out/r4-compare.json" > "$out/r4-summary.txt" 2>&1
res "R4 exit=$? $(cat "$out/r4-summary.txt")"
# R5 the real project-utils (the suite mocks it everywhere) loads from website's own install at each rev.
for rev in "$base" "$fix"; do
  ( cd "$work/$rev" && timeout 60 node -e 'const m=require("project-utils");if(typeof m.getPostgres!=="function")process.exit(1);console.log(require.resolve("project-utils"));console.log(Object.keys(m).join(","))' ) > "$out/r5-require-$rev.txt" 2>&1
  res "R5 $rev require(project-utils) exit=$? $(tail -n 1 "$out/r5-require-$rev.txt")"
done
rm -rf "$work"
