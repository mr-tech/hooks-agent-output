#!/usr/bin/env bash
# Code-review instruments for project-utils, each in a git archive export (never the shared tree).
# Usage: review-checks.sh <project-utils repo> <base rev> <fix rev> <out-dir>
#   R1 installed set: `npm ci --omit=dev` at base and at fix; every installed package path (any depth) listed
#      by walking node_modules on disk. The removed set must equal the fix lock's entries that gained dev:true
#      (computed independently from the two lockfiles: entries whose only changed field is dev), the added set
#      must be empty, and every surviving path must carry the same version on disk at both revs.
#   R2 shared build cache: the fix export is built with a copy of the shared tree's gitignored build/ dir in
#      place, as a rebuild in the shared tree would; dist/ must equal the committed dist/ with no prisma.js.
#      Positive control: the same build with build/js/prisma.js and prisma.js.map planted must leave them in dist/.
set -u
repo=$1; base=$2; fix=$3; out=$4
mkdir -p "$out"
work=$(mktemp -d "${TMPDIR:-/tmp}/pu-review.XXXXXX")
: > "$out/result.txt"
res() { echo "$1" | tee -a "$out/result.txt"; }

listpkgs() {
  node -e '
const fs=require("fs"),path=require("path");const root=process.argv[1];const out=[];
function walk(nm,rel){ if(!fs.existsSync(nm))return;
 for(const d of fs.readdirSync(nm)){ if(d.startsWith("."))continue;
  const names=d.startsWith("@")?fs.readdirSync(path.join(nm,d)).map(x=>d+"/"+x):[d];
  for(const n of names){const p=path.join(nm,n);const pj=path.join(p,"package.json");
   if(!fs.existsSync(pj))continue;const v=JSON.parse(fs.readFileSync(pj)).version;
   const r=(rel?rel+"/":"")+"node_modules/"+n;out.push(r+"\t"+v);walk(path.join(p,"node_modules"),r);}}}
walk(path.join(root,"node_modules"),"");out.sort();console.log(out.join("\n"));' "$1"
}

for rev in "$base" "$fix"; do
  mkdir -p "$work/$rev"
  git -C "$repo" archive "$rev" | tar -x -C "$work/$rev"
  ( cd "$work/$rev" && timeout 600 npm ci --omit=dev --no-audit --no-fund ) > "$out/r1-npm-ci-$rev.txt" 2>&1; echo "exit $?" >> "$out/r1-npm-ci-$rev.txt"
  listpkgs "$work/$rev" > "$out/r1-installed-$rev.tsv"
done

node -e '
const fs=require("fs");const [bl,fl,bi,fi,o]=process.argv.slice(1);
const canon=o=>JSON.stringify(Object.keys(o).sort().map(k=>[k,o[k]]));
const b=JSON.parse(fs.readFileSync(bl)).packages,f=JSON.parse(fs.readFileSync(fl)).packages;
const onlyDev=Object.keys(b).filter(k=>k in f&&b[k].dev!==true&&f[k].dev===true&&
 canon({...b[k],dev:1})===canon({...f[k],dev:1})).sort();
const rd=p=>new Map(fs.readFileSync(p,"utf8").split("\n").filter(Boolean).map(l=>l.split("\t")));
const B=rd(bi),F=rd(fi);
const removed=[...B.keys()].filter(k=>!F.has(k)).sort(),added=[...F.keys()].filter(k=>!B.has(k));
const reversioned=[...F.keys()].filter(k=>B.has(k)&&B.get(k)!==F.get(k));
const eq=JSON.stringify(removed)===JSON.stringify(onlyDev);
const r={installedBase:B.size,installedFix:F.size,removed:removed.length,added,reversioned,lockDevGained:onlyDev.length,
 removedNotDevGained:removed.filter(x=>!onlyDev.includes(x)),devGainedNotRemoved:onlyDev.filter(x=>!removed.includes(x)),
 prismaKyselyInstalledFix:F.has("node_modules/prisma-kysely"),ok:eq&&!added.length&&!reversioned.length};
fs.writeFileSync(o,JSON.stringify(r,null,2));console.log(JSON.stringify({...r,added:added.length,reversioned:reversioned.length,removedNotDevGained:r.removedNotDevGained.length,devGainedNotRemoved:r.devGainedNotRemoved.length}));
process.exit(r.ok?0:1);' "$work/$base/package-lock.json" "$work/$fix/package-lock.json" \
  "$out/r1-installed-$base.tsv" "$out/r1-installed-$fix.tsv" "$out/r1-compare.json" > "$out/r1-summary.txt"
r1=$?; res "R1 exit=$r1 $(cat "$out/r1-summary.txt")"

build_with_cache() { # $1 dir name, $2 plant(0/1)
  local d="$work/$1"; mkdir -p "$d"
  git -C "$repo" archive "$fix" | tar -x -C "$d"
  cp -a "$repo/build" "$d/build"
  [ -f "$repo/tsconfig.tsbuildinfo" ] && cp -a "$repo/tsconfig.tsbuildinfo" "$d/"
  if [ "$2" = 1 ]; then git -C "$repo" show 749606d:dist/prisma.js > "$d/build/js/prisma.js"; git -C "$repo" show 749606d:dist/prisma.js.map > "$d/build/js/prisma.js.map"; fi
  ( cd "$d" && timeout 600 npm ci --no-audit --no-fund && timeout 600 npm run build && timeout 600 npm run build:types ) > "$out/r2-build-$1.txt" 2>&1; echo "exit $?" >> "$out/r2-build-$1.txt"
  mkdir -p "$work/committed-$1"; git -C "$repo" archive "$fix" dist | tar -x -C "$work/committed-$1"
  diff -r "$work/committed-$1/dist" "$d/dist" > "$out/r2-dist-$1.diff" 2>&1; echo $?
}
c=$(build_with_cache cache 0); p=$(build_with_cache planted 1)
res "R2 shared-cache rebuild: distdiff=$c lines=$(grep -c '' "$out/r2-dist-cache.diff") prisma_in_dist=$([ -e "$work/cache/dist/prisma.js" ] && echo yes || echo no)"
res "R2 control (planted cache): distdiff=$p lines=$(grep -c '' "$out/r2-dist-planted.diff") prisma_in_dist=$([ -e "$work/planted/dist/prisma.js" ] && echo yes || echo no)"
rm -rf "$work"
