#!/usr/bin/env bash
# Runs the closing-window probe in a fresh git archive export of website at $1, once per variant:
#   tip                      the tree as committed
#   warning-enabled-dropped  WarningDialog calls useDialogEnter(onConfirm)        (the implementer's row-warning-enabled-dropped)
#   image-enabled-dropped    ImageUploader calls useDialogEnter(submit)           (NM-34's form)
# Each variant's edit is an exact-once anchor; the run refuses otherwise. Output: <variant>.probe and <variant>.out/.exit beside this script.
set -euo pipefail
SHA=$1; HERE=$(cd "$(dirname "$0")" && pwd); WEB=/usr/local/bin/hooks/website
SCR=/tmp/claude-1000/-usr-local-bin-hooks/be653729-405e-4194-a476-a39d049f5dba/scratchpad
for variant in tip warning-enabled-dropped image-enabled-dropped; do
  E=$SCR/exp-probe-$variant; rm -rf "$E"; mkdir -p "$E"
  git -C $WEB archive "$SHA" | tar -x -C "$E"; ln -s $WEB/node_modules "$E/node_modules"
  cp "$HERE/WarningDialog.closing-window.test.tsx" "$E/src/components/__tests__/"
  case $variant in
    warning-enabled-dropped) f=src/components/WarningDialog.tsx; old='useDialogEnter(onConfirm, open)'; new='useDialogEnter(onConfirm)';;
    image-enabled-dropped) f=src/components/ImageUploader.tsx; old='useDialogEnter(submit, isOpen)'; new='useDialogEnter(submit)';;
    *) f=;;
  esac
  if [ -n "$f" ]; then
    python3 -I -c "import sys;p,o,n=sys.argv[1:];s=open(p).read();c=s.count(o);assert c==1,(p,c);open(p,'w').write(s.replace(o,n))" "$E/$f" "$old" "$new"
  fi
  rm -f "$HERE/$variant.probe"
  ( cd "$E" && PROBE_OUT="$HERE/$variant.probe" timeout 300 unshare -rn npx vitest run src/components/__tests__/WarningDialog.closing-window.test.tsx > "$HERE/$variant.out" 2>&1; echo $? > "$HERE/$variant.exit" ) || true
  rm -rf "$E"
done
