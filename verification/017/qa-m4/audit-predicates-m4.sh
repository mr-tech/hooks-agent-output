#!/usr/bin/env bash
# Test Conventions predicates over the test files M4 touched, read at a commit (default a5dd76f).
# Usage: audit-predicates.sh [sha]   (run from anywhere; reads /usr/local/bin/hooks/website)
set -u
SHA=${1:-a5dd76f}
W=/usr/local/bin/hooks/website
FILES=(
  src/app/_components/__tests__/NavMenu.navigation-guard.test.tsx
  src/app/message/__tests__/layout.navigation-guard.test.tsx
  src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx
  src/utils/hooks/__tests__/useUnloadAlert.act-suppression.test.tsx
  src/app/message/m/[id]/edit/__tests__/page.sign-in-exit.test.tsx
  src/components/__tests__/helpers/click.ts
  src/components/__tests__/helpers/linkNavigation.tsx
)
RX='\b(m|ms|cr|qa|qaf|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b0[0-9][0-9]\b|[0-9]{4}-[0-9]{2}-[0-9]{2}'
TITLE='^\s*(describe|it|test)(\.(each|skip|only)[^(]*)?\('
COMMENT='^\s*(//|\*|/\*)'
POS='^[A-Za-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$'

echo "# tree $SHA"
echo "# ID-token class (case-insensitive) over title-call lines, comment lines, basename; positive basename form"
for f in "${FILES[@]}"; do
  body=$(git -C "$W" show "$SHA:$f")
  t=$(printf '%s\n' "$body" | grep -E "$TITLE" | grep -ciE "$RX")
  c=$(printf '%s\n' "$body" | grep -E "$COMMENT" | grep -ciE "$RX")
  b=$(basename "$f" | grep -ciE "$RX")
  p=$(basename "$f" | grep -cE "$POS")
  echo "$f titles=$t comments=$c basename=$b positive-form=$p"
done
echo "# positive control for the ID-token predicate (expect 2 of 2 lines)"
printf '%s\n' "it('cr-3 case')" "// see 2026-11-11" | grep -ciE "$RX"
echo "# class-table predicates: source-text (readFileSync|__filename|__dirname|import.meta), time-based (timers, clock reads), local render/mount function, DOM harness use, project imports"
for f in "${FILES[@]}"; do
  body=$(git -C "$W" show "$SHA:$f")
  s=$(printf '%s\n' "$body" | grep -cE 'readFileSync|__filename|__dirname|import\.meta')
  tm=$(printf '%s\n' "$body" | grep -cE 'setTimeout|setInterval|useFakeTimers|Date\.now|advanceTimers|setSystemTime|performance\.now')
  r=$(printf '%s\n' "$body" | grep -cE 'function (render|mount)[A-Za-z]*\(|const (render|mount)[A-Za-z]* = ')
  h=$(printf '%s\n' "$body" | grep -cE 'createRoot|mountDom')
  i=$(printf '%s\n' "$body" | grep -cE "from '~/")
  echo "$f source-text=$s time=$tm local-render-fn=$r dom-harness=$h project-imports=$i"
done
