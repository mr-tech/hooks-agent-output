#!/usr/bin/env bash
# Usage: pig-host-read-fixture.sh <probe-result.json from a probe run> <out file>
# RK-7's liveness precondition (QAF-14, plan 017 M6-c): the changed verification/015/pig-host-read.sh section [7] counts a line of
# M6-c's exact shape on this box. The member lines are REAL: the generator's own failure and success lines out of a probe run
# (green-8512a1d/probe-result.json). The non-members are a near-miss class, a stack head, and a line of another message's shape.
# The script is copied with H pointed at the fixture and the claude-ro refusal removed (the same way
# verification/015/pig-span-read-fixture/run.sh does); only section [7] is printed.
set -u
RESULT=${1:?probe-result.json}
OUT=$(realpath -m "${2:?out file}")
R=/usr/local/bin/hooks/agent-output
T=$(mktemp -d); trap 'rm -rf "$T"' EXIT
P=hooks-image-preview-generator-prod
mkdir -p "$T/fx/logs"
node -e '
  const r = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
  const lines = r.generatorLines;
  const fail = lines.filter((l) => l.startsWith("preview-image-failure"));
  const gen = lines.filter((l) => l.includes("Generated image for message"));
  require("fs").writeFileSync(process.argv[2] + "/err.txt", fail.join("\n") + "\n");
  require("fs").writeFileSync(process.argv[2] + "/gen.txt", gen.join("\n") + "\n");
' "$RESULT" "$T"
{
  cat "$T/err.txt"
  echo "preview-image-failure id=42 class=error-statusX elapsedMs=7"
  echo "Error: Preview render failed: error-status"
  echo "    at generateMessagePreviewImage (src/generateImage.ts:1:1)"
} > "$T/fx/logs/$P-error.log"
cat "$T/gen.txt" > "$T/fx/logs/$P-out.log"
echo "$(date -u +%Y-%m-%dT%H:%M:%S.000Z) Server running at http://0.0.0.0:3000/" >> "$T/fx/logs/$P-out.log"
: > "$T/fx/pm2.log"
sed -e "s#^H=/etc/.pm2#H=$T/fx#" -e '/^\[ "\$ME" = "claude-ro" \]/d' "$R/verification/015/pig-host-read.sh" > "$T/script.sh"
{
  echo "fixture members: $(grep -c '^preview-image-failure id=42 class=\(goto-rejected\|error-status\|screenshot\|put\) elapsedMs=[0-9]*$' "$T/fx/logs/$P-error.log") real failure lines; non-members: 1 near-miss class, 1 stack head, 1 stack frame"
  echo "fixture generated-image lines: $(grep -c 'Generated image for message' "$T/fx/logs/$P-out.log")"
  bash "$T/script.sh" 2>&1 | sed -n '/^\[7\]/,/^=== end/p'
} > "$OUT"
cat "$OUT"
