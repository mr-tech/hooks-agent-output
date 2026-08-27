#!/usr/bin/env node
/*
 * AC7 sweep — axiom (E) "a test's expected value is independent of the code under test".
 * Plan 014, QA Phase 1. Run from the `website` repo root:
 *     node ../agent-output/verification/014/qa-phase1/ac7-sweep.js
 *
 * ENUMERATION PREDICATE (state this beside any count taken from this script):
 *   Domain: every file matched by
 *     find src \( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \)
 *   Three limbs of axiom (E), enumerated separately:
 *     E1 oracle-by-formula      — an expected-value argument to .toBe/.toEqual/.toStrictEqual/
 *                                 .toMatchObject that CALLS a symbol imported from `~/` or `bot/`.
 *     E2 oracle-by-source-text  — the file calls readFileSync/readFile on a path under src/ or bot/.
 *     E3a oracle-by-transcription (expected side) — the matcher's argument references a test-local
 *                                 name whose definition COMPUTES (operator / control flow / call to
 *                                 an imported production symbol), rather than a literal fixture.
 *     E3b transcription-as-subject — the assertion's SUBJECT is a test-local computing name, so the
 *                                 production symbol is never reached; the plan's H5 disposition
 *                                 ("import the production function where the transcription stood in
 *                                 for it") covers this shape, so the sweep must enumerate it.

 * EXCLUDES, and these exclusions are part of every count this prints:
 *   - test helpers that build FIXTURES rather than compute EXPECTATIONS (make*, data, author,
 *     values, apiMessage) are excluded by the fixture/computation classifier, NOT by a name list.
 *     The classifier over-approximates: it is a CANDIDATE enumerator, and every candidate is
 *     adjudicated by reading. A count from it is a candidate count, never a violation count.
 *   - an earlier revision of this script defined E3 as "local name collides with a production
 *     export". That predicate matched NONE of the plan's four named violators (rows 46, 14, 20, 22)
 *     and was therefore falsified by them and replaced; it was a coordinate list fitted to the one
 *     instance (`switchToClassic`) whose name happened to collide.
 *   - multi-line expect(...) chains: matching is per physical line, so an expectation split across
 *     lines is invisible to E1. E1 is a FLOOR, not a total.
 *   - dynamic `await import('~/...')` symbol bindings are captured for E1; destructured re-exports
 *     and aliased imports (`import { a as b }`) bind under the LOCAL name only.
 *   - `.tsx` production sources are in the E2/E3 production-symbol domain; no `.tsx` TEST file
 *     exists at a74b9e2, so the test domain is 48 `.test.ts` files.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sh = (c) => execSync(c, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const testFiles = sh(`find src \\( -name '*.test.ts' -o -name '*.test.tsx' -o -name '*.spec.ts' \\)`)
  .split('\n').filter(Boolean).sort();

// ---- production exported symbols (src/ + bot/, excluding test files) ----
const prodFiles = sh(`find src bot -type f \\( -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' \\) ! -name '*.test.ts' ! -name '*.test.tsx' ! -name '*.spec.ts'`)
  .split('\n').filter(Boolean);
const prodExports = new Map(); // name -> Set(file)
const addExport = (n, f) => {
  if (!n || !/^[A-Za-z_$][\w$]*$/.test(n)) return;
  if (!prodExports.has(n)) prodExports.set(n, new Set());
  prodExports.get(n).add(f);
};
for (const f of prodFiles) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/^\s*export\s+(?:default\s+)?(?:async\s+)?(?:const|let|function|class)\s+([A-Za-z_$][\w$]*)/gm)) addExport(m[1], f);
  for (const m of src.matchAll(/^\s*export\s*\{([^}]*)\}/gm)) {
    for (const part of m[1].split(',')) {
      const t = part.trim();
      if (!t) continue;
      const as = t.split(/\s+as\s+/);
      addExport((as[1] || as[0]).trim(), f);
    }
  }
}

// ---- per test file ----
const EXPECT_MATCHERS = /\.(toBe|toEqual|toStrictEqual|toMatchObject)\(/;
const rows = [];
for (const tf of testFiles) {
  const src = fs.readFileSync(tf, 'utf8');
  const lines = src.split('\n');

  // imported production symbols (static + dynamic destructure)
  const imported = new Set();
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*['"](?:~|bot)\//g)) {
    for (const part of m[1].split(',')) {
      const t = part.trim(); if (!t) continue;
      const as = t.split(/\s+as\s+/);
      imported.add((as[1] || as[0]).trim());
    }
  }
  for (const m of src.matchAll(/const\s*\{([^}]*)\}\s*=\s*await\s+import\(\s*['"](?:~|bot)\//g)) {
    for (const part of m[1].split(',')) {
      const t = part.trim(); if (!t) continue;
      const as = t.split(/\s*:\s*/);
      imported.add((as[1] || as[0]).trim());
    }
  }
  for (const m of src.matchAll(/import\s+(?:\*\s+as\s+)?([A-Za-z_$][\w$]*)\s+from\s*['"](?:~|bot)\//g)) imported.add(m[1]);

  // locally defined callables
  const localDefs = new Map(); // name -> line no (1-indexed)
  lines.forEach((ln, i) => {
    let m;
    if ((m = ln.match(/^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/))) localDefs.set(m[1], i + 1);
    else if ((m = ln.match(/^\s*(?:export\s+)?(?:const|let)\s+([A-Za-z_$][\w$]*)\s*(?::[^=]*)?=\s*(?:async\s*)?(?:\(|function\b)/))) localDefs.set(m[1], i + 1);
  });

  // E1: expected-value argument calls an imported production symbol, on the same line
  const e1 = [];
  lines.forEach((ln, i) => {
    if (!EXPECT_MATCHERS.test(ln)) return;
    const tail = ln.slice(ln.search(EXPECT_MATCHERS));
    for (const name of imported) {
      if (new RegExp(`\\b${name}\\s*\\(`).test(tail)) e1.push({ line: i + 1, symbol: name, text: ln.trim() });
    }
  });

  // E2: reads production source text
  const e2 = [];
  lines.forEach((ln, i) => {
    if (/readFileSync|readFile\(/.test(ln) && /(src|bot)\//.test(ln)) e2.push({ line: i + 1, text: ln.trim() });
  });
  // second form: a readSrc/read helper applied to a resolved src path elsewhere in the file
  if (!e2.length && /readFileSync/.test(src) && /['"`][^'"`]*\b(components|app|utils|providers|server)\b[^'"`]*\.tsx?['"`]/.test(src)) {
    const i = lines.findIndex((l) => /readFileSync/.test(l));
    e2.push({ line: i + 1, text: lines[i].trim(), note: 'indirect: readFileSync + a src-shaped path literal elsewhere in file' });
  }

  // ---- classify each local definition as FIXTURE or COMPUTATION ----
  // COMPUTATION = its definition body contains an arithmetic/bitwise/comparison operator, a
  // control-flow keyword, or a call to an imported production symbol. FIXTURE = everything else
  // (object/array literals, spreads of other fixtures).
  const defBody = (startLine) => lines.slice(startLine - 1, startLine + 14).join('\n');
  const computes = new Map();
  for (const [name, defLine] of localDefs) {
    // Classify on the function BODY, not the signature. The signature is where TS generics
    // (`Record<string, unknown>`) and union annotations live; including it made every fixture
    // read as a computation. Excluding it and then RESTORING comparison operators is what the
    // positive control in this script's README required — an earlier revision stripped `<`/`>`
    // wholesale and consequently missed a planted `n > 10` transcription.
    const raw = defBody(defLine);
    const brace = raw.indexOf('{');
    const arrow = raw.indexOf('=>');
    const cut = brace === -1 ? (arrow === -1 ? 0 : arrow + 2)
              : (arrow !== -1 && arrow < brace ? arrow + 2 : brace + 1);
    const body = raw.slice(cut)
      .replace(/'[^']*'|"[^"]*"|`[^`]*`/g, "''")          // string literals carry no logic
      .replace(/:\s*[A-Za-z_$][\w$.]*(\[\])?/g, ':T');  // residual type annotations
    const hasOperator = /===|!==|[<>]=?|[-+*/%^]|>>|<<|\?\?|&(?!&)|\|(?!\|)/.test(body);
    const hasControl = /\b(if|for|while|switch)\b|\?[^?]|\.map\(|\.filter\(|\.reduce\(|\.some\(|\.every\(/.test(body);
    const callsProd = [...imported].some((n) =>
      new RegExp(`\\b${n}\\s*(\\(|\\.[A-Za-z_$][\\w$]*\\s*\\()`).test(body));
    computes.set(name, { isComputation: hasOperator || hasControl || callsProd, defLine, callsProd });
  }

  const e3a = [];
  const e3b = [];
  lines.forEach((ln, i) => {
    if (!/expect\s*\(/.test(ln)) return;
    const mIdx = ln.search(EXPECT_MATCHERS);
    const subject = mIdx === -1 ? ln : ln.slice(0, mIdx);
    const expected = mIdx === -1 ? '' : ln.slice(mIdx);
    for (const [name, info] of computes) {
      if (!info.isComputation) continue;
      const ref = new RegExp(`\\b${name}\\b`);
      if (expected && ref.test(expected)) e3a.push({ line: i + 1, name, defLine: info.defLine, text: ln.trim() });
      else if (ref.test(subject)) {
        // A subject that ALSO calls an imported production symbol reaches production; the local is
        // a fixture feeding it, not a stand-in for it. E3b is the case where production is never
        // reached on this line at all.
        const subjectReachesProduction = [...imported].some((n) =>
          new RegExp(`\\b${n}\\s*(\\(|\\.[A-Za-z_$][\\w$]*\\s*\\()`).test(subject));
        if (!subjectReachesProduction) {
          e3b.push({ line: i + 1, name, defLine: info.defLine, callsProd: info.callsProd, text: ln.trim() });
        }
      }
    }
    // a local const computed in the test body (not a callable) reaching the expected side
    if (expected) {
      for (const m of expected.matchAll(/\$\{([A-Za-z_$][\w$]*)\}/g)) {
        const nm = m[1];
        const declLine = lines.findIndex((l) => new RegExp(`^\\s*const\\s+${nm}\\s*=`).test(l));
        if (declLine === -1) continue;
        const decl = lines[declLine];
        if (/[-+*/%]|>>|<<|BigInt|Number\(/.test(decl.slice(decl.indexOf('=')))) {
          e3a.push({ line: i + 1, name: nm, defLine: declLine + 1, text: ln.trim(), note: 'inline computed const' });
        }
      }
    }
  });
  // E3b-indirect: the transcription's result reaches the assertion through an intermediate
  // variable on an earlier line (`const after = switchToClassic(draft); expect(after.flags)...`).
  // Row 14 (`012-send-gate-partition`) is a named violator that the same-line form MISSES, which is
  // why this limb exists: the same-line matcher was falsified by a known instance, not the reverse.
  // Depth is ONE level; a two-hop chain is outside this predicate and is named residue.
  const e3bi = [];
  lines.forEach((ln, i) => {
    const m = ln.match(/^\s*const\s+([A-Za-z_$][\w$]*)\s*=\s*([A-Za-z_$][\w$]*)\s*\(/);
    if (!m) return;
    const [, alias, callee] = m;
    const info = computes.get(callee);
    if (!info || !info.isComputation) return;
    if (imported.has(callee)) return; // reaches production: not a stand-in
    lines.forEach((ln2, j) => {
      if (j <= i || !/expect\s*\(/.test(ln2)) return;
      if (!new RegExp(`\\b${alias}\\b`).test(ln2)) return;
      const mIdx2 = ln2.search(EXPECT_MATCHERS);
      const subject2 = mIdx2 === -1 ? ln2 : ln2.slice(0, mIdx2);
      if ([...imported].some((n) =>
        new RegExp(`\\b${n}\\s*(\\(|\\.[A-Za-z_$][\\w$]*\\s*\\()`).test(subject2))) return;
      e3bi.push({ line: j + 1, name: `${alias} = ${callee}(...)`, defLine: info.defLine, text: ln2.trim() });
    });
  });

  const e3 = [
    ...e3a.map((x) => ({ ...x, limb: 'E3a' })),
    ...e3b.map((x) => ({ ...x, limb: 'E3b' })),
    ...e3bi.map((x) => ({ ...x, limb: 'E3b-indirect' })),
  ];

  if (e1.length || e2.length || e3.length) rows.push({ file: tf, e1, e2, e3 });
}

// ---- report ----
const c1 = rows.reduce((s, r) => s + (r.e1.length ? 1 : 0), 0);
const c2 = rows.reduce((s, r) => s + (r.e2.length ? 1 : 0), 0);
const c3a = rows.reduce((s, r) => s + (r.e3.some((x) => x.limb === 'E3a') ? 1 : 0), 0);
const c3b = rows.reduce((s, r) => s + (r.e3.some((x) => x.limb === 'E3b') ? 1 : 0), 0);
const c3bi = rows.reduce((s, r) => s + (r.e3.some((x) => x.limb === 'E3b-indirect') ? 1 : 0), 0);

console.log(`# AC7 sweep - axiom (E), plan 014`);
console.log(`# domain: ${testFiles.length} test files matching the find predicate in this script's header`);
console.log(`# production-export domain: ${prodExports.size} exported names over ${prodFiles.length} non-test source files under src/ + bot/`);
console.log(`#`);
console.log(`# CANDIDATE counts. Each is a candidate count under the predicate named in the header,`);
console.log(`# not a violation count; every candidate is adjudicated by reading.`);
console.log(`# E1  oracle-by-formula          : ${c1} files (FLOOR - single-physical-line matching only)`);
console.log(`# E2  oracle-by-source-text      : ${c2} files`);
console.log(`# E3a transcription, expected side: ${c3a} files`);
console.log(`# E3b transcription-as-subject    : ${c3b} files (same line)`);
console.log(`# E3b-indirect, via one intermediate: ${c3bi} files (depth 1; a two-hop chain is residue)`);
console.log('');
for (const r of rows) {
  console.log(`## ${r.file}`);
  for (const x of r.e1) console.log(`   E1  L${x.line} calls imported \`${x.symbol}\` inside the expected value :: ${x.text.slice(0, 160)}`);
  for (const x of r.e2) console.log(`   E2  L${x.line} ${x.note ? '(' + x.note + ') ' : ''}:: ${x.text.slice(0, 160)}`);
  for (const x of r.e3) console.log(`   ${x.limb} L${x.line} local \`${x.name}\` (defined L${x.defLine})${x.note ? ' [' + x.note + ']' : ''} :: ${x.text.slice(0, 160)}`);
  console.log('');
}
