#!/usr/bin/env node
// M5 step 2 instrument: positive naming form (per-file) + negative ID-token form (three domains).
// Run from `website/`. Plan 014's "Naming predicate implementing (C)", as corrected at rev 14
// (agent-output `56f23b6`): the module segment's leading-character anchor was widened from
// `[a-z]` to `[A-Za-z]`. Rev 10's anchor was an instrument error, not a deliberate exclusion —
// axiom (C) defines `<module>` as the production module's own basename verbatim, and a React
// component's own basename is PascalCase (`JsonModalBody.tsx`), so its test's module segment must
// be able to be too. The behaviour segment's anchor is unchanged (`[a-z]`, always lowercase-led).
// Found live at M5 step 2's first run against this chain's own M4c output: 13 DOM-mount files
// (JsonModalBody.*, NewMessageModal.*, SectionEditor.*, NullableComponent.*,
// TransitionHeightElement.*, MessageProvider.*, SaveAsMenu.*, NewMessageJsonInput.*) failed the
// rev-10 anchor despite conforming to axiom (C) itself.
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const POSITIVE = /^[A-Za-z][a-zA-Z0-9-]*\.[a-z][a-zA-Z0-9-]*\.test\.tsx?$/;
const ID_TOKEN = /\b(m|ms|cr|qa|fqa|f-qa|ec|d|l|plan|rider)-?[0-9]+[a-z]?\b|\b0[0-9]{2}\b|20[0-9]{2}-[0-9]{2}-[0-9]{2}/i;

function findFiles() {
  const out = execSync(
    "find src \\( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \\)",
    { encoding: 'utf8' },
  );
  return out.split('\n').filter(Boolean).sort();
}

function positiveFormFailures(files) {
  const failures = [];
  for (const f of files) {
    const base = path.basename(f);
    const segments = base.replace(/\.tsx?$/, '').split('.');
    const moduleSeg = segments[0] ?? '';
    const behaviourSeg = segments.length > 2 ? segments.slice(1, -1).join('.') : (segments[1] ?? '');
    const formOk = POSITIVE.test(base);
    const idFree = !ID_TOKEN.test(moduleSeg) && !ID_TOKEN.test(behaviourSeg);
    if (!formOk || !idFree) failures.push({ file: f, formOk, idFree });
  }
  return failures;
}

function negativeFormLines(files) {
  const hits = [];
  for (const f of files) {
    const base = path.basename(f);
    if (ID_TOKEN.test(base) && !/\/\/\s*escaped:/.test(base)) {
      hits.push({ file: f, domain: 'basename', text: base });
    }
    const content = fs.readFileSync(f, 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, i) => {
      const isEscapedLine = /\/\/\s*escaped:/.test(line);
      if (isEscapedLine) return;
      const titleMatch = /\b(describe|it|test)(?:\.\w+)?\s*\(\s*(['"`])((?:\\.|(?!\2).)*)\2/.exec(line);
      if (titleMatch && ID_TOKEN.test(titleMatch[3])) {
        hits.push({
          file: f, domain: 'title', line: i + 1, text: line.trim(),
        });
      }
      const isCommentLine = /^\s*(\/\/|\/\*|\*)/.test(line);
      if (isCommentLine && ID_TOKEN.test(line)) {
        hits.push({
          file: f, domain: 'comment', line: i + 1, text: line.trim(),
        });
      }
    });
  }
  return hits;
}

function main() {
  const files = findFiles();
  const posFailures = positiveFormFailures(files);
  const negHits = negativeFormLines(files);
  const result = {
    fileCount: files.length,
    positiveFormFailures: posFailures,
    negativeFormHits: negHits,
  };
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.stderr.write(
    `files: ${files.length}, positive-form failures: ${posFailures.length}, negative-form hits: ${negHits.length}\n`,
  );
}

main();
