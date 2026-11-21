#!/usr/bin/env bash
# Builds and runs the reload probe in an isolated git-archive export of website at $1 (a SHA).
# Usage: build-reload-probe.sh <export-dir> <sha> <out-file>
set -euo pipefail
export_dir=$1; sha=$2; out=$3
here=$(cd "$(dirname "$0")" && pwd)
src='src/app/message/m/[id]/_components/__tests__/MessageNotFound.edit-and-send-pages.test.tsx'
dest="$export_dir/src/app/message/m/[id]/_components/__tests__/reload.probe.test.tsx"
git -C /usr/local/bin/hooks/website cat-file blob "6b539e5:$src" | sed -n '1,132p' \
  | sed "s/^import { mountDom, unmountDom }/import { act } from 'react';\nimport { mountDom, unmountDom }/" \
  | sed "s/^  default: vi.fn(() => ({ subscribe: vi.fn(), unsubscribe: vi.fn(), disconnect: vi.fn() })),/  default: class { subscribe() { return { bind() {}, unbind() {} }; } unsubscribe() {} disconnect() {} },/" > "$dest"
grep -q 'default: class { subscribe()' "$dest" || { echo 'pusher-js mock substitution did not apply' >&2; exit 2; }
cat "$here/reload-after-load.probe-tail.tsx" >> "$dest"
cd "$export_dir"
RELOAD_OUT="$out.json" timeout -k 5 120 setsid node node_modules/vitest/vitest.mjs run "$dest" > "$out" 2>&1 || echo "exit=$?" >> "$out"
