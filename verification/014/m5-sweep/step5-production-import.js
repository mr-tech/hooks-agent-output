#!/usr/bin/env node
// M5 step 5 instrument, as corrected at plan rev 15 (agent-output `ac558ef`): every test file
// imports production code — either an aliased import (`~/`, `bot/`, static or dynamic `import(`)
// OR a relative import whose resolved basename equals the file's own `<module>` segment (a
// colocated `__tests__/X.behaviour.test.tsx` importing `'../X'` — the axiom-(C) tie and the
// DOM-mount convention M4c established). Rev 10's instrument (alias-only) rejected 3 conforming
// M4c files (JsonModalBody.load-floors-resolved-draft is NOT among them — it also imports a `~/`
// helper; the three are NewMessageJsonInput.settled-notice, NullableComponent.show-guard,
// TransitionHeightElement.height-and-visibility) found live at M5 step 5's first run.
//
// Run from `website/`.
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ALIAS_RE = /(from |import\()\s*'(~|bot)\//;

function findFiles() {
  const out = execSync(
    "find src \\( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \\)",
    { encoding: 'utf8' },
  );
  return out.split('\n').filter(Boolean).sort();
}

// The file's own <module> segment, per axiom (C): the first dot-separated segment of the
// basename (before the behaviour segment and `.test.ts[x]`).
function moduleSegment(file) {
  const base = path.basename(file);
  return base.replace(/\.tsx?$/, '').split('.')[0];
}

// A relative import line whose resolved basename equals `mod` — e.g. `from '../X'`,
// `from '../../X'`, `import('../X')`, matched against the module segment `X` at the end of the
// specifier (optionally followed by a trailing slash/extension, which none of these carry).
function relativeImportAdmitting(content, mod) {
  const re = new RegExp(`(from |import\\()\\s*'(?:\\.\\./)+${mod}'`, '');
  const line = content.split('\n').find((l) => re.test(l));
  return line ? line.trim() : null;
}

function main() {
  const files = findFiles();
  const aliasLess = files.filter((f) => !ALIAS_RE.test(fs.readFileSync(f, 'utf8')));
  const survivors = aliasLess.map((f) => {
    const mod = moduleSegment(f);
    const admittingLine = relativeImportAdmitting(fs.readFileSync(f, 'utf8'), mod);
    return {
      file: f, moduleSegment: mod, admittingLine, admitted: !!admittingLine,
    };
  });
  const unadmitted = survivors.filter((s) => !s.admitted);
  const result = {
    fileCount: files.length,
    aliasLessCount: aliasLess.length,
    survivors,
    unadmittedCount: unadmitted.length,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.stderr.write(
    `files: ${files.length}, alias-less: ${aliasLess.length}, unadmitted: ${unadmitted.length}\n`,
  );
}

main();
