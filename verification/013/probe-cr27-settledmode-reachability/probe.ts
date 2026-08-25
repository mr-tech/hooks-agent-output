/**
 * probe-cr27 — is settledMode's `requiresChoice` branch DEAD, as code review round 24's CR24-2
 * claimed, or LIVE via the `current` argument, as QA's INFO-2 claims?
 *
 * MY CLAIM UNDER TEST (CR24-2, `e648aa0`): "the branch is dead on both sides."
 * That reasoning checked the guard on ONE argument. `computeLoadDiff(current, incoming)` takes TWO,
 * and `settledMode` is applied to BOTH:
 *     JsonModalBody.tsx:270 -> computeLoadDiff(message?.data ?? {}, validatedDraft)
 * `validatedDraft` (incoming) is guarded — the parsing effect nulls it when requiresChoice.
 * `message?.data` (current) is the STORED record and is guarded by nothing.
 *
 * ORACLE, stated before running: if a stored ROW E record (V2 components AND classic content ->
 * requiresChoice) yields a NON-null fromMode, the branch executed and my "dead" claim is FALSE.
 *
 * Imports from the tree. No embedded copy.
 */
// Rig: `src/utils/index.ts` pulls SVG assets and env.mjs that the vitest specs stub with vi.mock.
// ts-node has no vi.mock, so redirect ONLY those leaf modules at _resolveFilename (which preserves
// the parent context that a _load override destroys — a repair for a rig break, not a change to the
// code under test). computeLoadDiff/resolveContentLoss are loaded from the tree, unmodified.
/* eslint-disable */
const Module = require('module');
const STUB = require('path').join(__dirname, 'stub.js');
const origResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, ...rest: any[]) {
  if (/assets\/svg\//.test(request) || /env\.mjs$/.test(request)) return STUB;
  return origResolve.call(this, request, ...rest);
};
const { computeLoadDiff, resolveContentLoss } = require('../../../../website/src/utils');

const V2_FLAG = 1 << 15;
const CONTAINER = { type: 17, components: [{ type: 10, content: 'hello' }] };

// ROW E by construction: V2 components AND classic content.
const rowEStored = { flags: V2_FLAG, components: [CONTAINER], content: 'classic text' };
const classicIncoming = { content: 'just text' };

const d = resolveContentLoss(
  rowEStored.flags, rowEStored.components as any, rowEStored.content, undefined,
);
console.log(`stored record row=${d.row} requiresChoice=${d.requiresChoice} mode=${JSON.stringify(d.mode)}`);
console.log(`  => settledMode(current) MUST take the requiresChoice branch: ${d.requiresChoice}`);

const diff = computeLoadDiff(rowEStored as any, classicIncoming as any);
console.log(`\ncomputeLoadDiff(rowE_stored, classic_incoming):`);
console.log(`  fromMode = ${JSON.stringify(diff.fromMode)}`);
console.log(`  toMode   = ${JSON.stringify(diff.toMode)}`);
console.log(`  modeChanges = ${diff.modeChanges}`);
console.log(`  removedTypes = ${JSON.stringify(diff.removedTypes)}`);

// What the M9-b spec's own oracle would say for the SAME input.
const oracleSays = d.requiresChoice ? 'classic' : d.mode;
console.log(`\nM9-b spec oracle (modeAfterLoad) for the same record: ${JSON.stringify(oracleSays)}`);
console.log(`production settledMode says: ${JSON.stringify(diff.fromMode)}`);
console.log(`  AGREE? ${oracleSays === diff.fromMode}`);

console.log(`\nVERDICT ON CR24-2's REACHABILITY CLAIM:`);
console.log(`  branch executed for 'current': ${d.requiresChoice === true}`);
console.log(`  => CR24-2's "dead on both sides" is ${d.requiresChoice ? 'FALSE' : 'true'}`);
