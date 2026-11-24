// QA probe (not a suite file): placed at src/utils/markdown/__tests__/ in an export of e58f2ed, run, removed.
// Re-derives the AC-3.1 / AC-3.6 exclusion set by a second instrument: a walk of the raw engine parse,
// not the canonical form the tests' pattern reads. Prints both sets and their symmetric difference.
import { writeFileSync } from 'node:fs';

import { beforeAll, expect, it } from 'vitest';

import { startEngine } from '../engine';

import { canonFromNative } from './helpers/canonicalForm';
import { CORPUS, LINK_INPUTS } from './helpers/discordInputs';
import { nativeParse } from './helpers/discordOracle';
import { generateInputs } from './helpers/markdownGenerator';

beforeAll(async () => { await startEngine(); });

const INPUTS = [
  ...CORPUS.map((c) => ({ src: `corpus:${c.id}`, text: c.text })),
  ...LINK_INPUTS.map((text, i) => ({ src: `link:${i}`, text })),
  ...generateInputs(20261123, 2000).map((g, i) => ({ src: `gen:${i}`, text: g.text })),
];

const TEST_PATTERN = /m\((command|static|game):/;
const TEST_TS = /ts\(-?\d{16,}/;

// Second instrument: every object in the raw tree; a mention is { type: 'mention', value: { type: <kind>, ... } }
// or any object whose own `type` is 'mention' with a `type` on its value.
function walk(v: unknown, seen: { kinds: Set<string>; bigTs: boolean }) {
  if (v === null || typeof v !== 'object') return;
  if (Array.isArray(v)) { v.forEach((x) => walk(x, seen)); return; }
  const o = v as Record<string, unknown>;
  if (o.type === 'mention' && o.value && typeof o.value === 'object') {
    const k = (o.value as Record<string, unknown>).type;
    if (typeof k === 'string') seen.kinds.add(k);
  }
  if (o.type === 'timestamp' && o.value !== undefined && o.value !== null) {
    const raw = o.value as unknown;
    const seconds = typeof raw === 'object' ? (raw as Record<string, unknown>).value ?? (raw as Record<string, unknown>).seconds : raw;
    if (typeof seconds === 'bigint' || typeof seconds === 'number' || typeof seconds === 'string') {
      const n = BigInt(seconds);
      if (n > BigInt(Number.MAX_SAFE_INTEGER) || n < -BigInt(Number.MAX_SAFE_INTEGER)) seen.bigTs = true;
    }
  }
  Object.values(o).forEach((x) => walk(x, seen));
}

it('prints the exclusion set by both instruments', () => {
  const rows = INPUTS.map((i) => {
    const tree = nativeParse(i.text);
    const canon = canonFromNative(tree, true);
    const seen = { kinds: new Set<string>(), bigTs: false };
    walk(tree, seen);
    const byWalk = ['command', 'game', 'static'].some((k) => seen.kinds.has(k));
    return {
      src: i.src, byPattern: TEST_PATTERN.test(canon), byWalk, tsPattern: TEST_TS.test(canon), tsWalk: seen.bigTs, kinds: [...seen.kinds].sort(),
    };
  });
  const kindsSeen = new Set(rows.flatMap((r) => r.kinds));
  const out = {
    inputs: rows.length,
    byPattern: rows.filter((r) => r.byPattern).length,
    byWalk: rows.filter((r) => r.byWalk).length,
    patternNotWalk: rows.filter((r) => r.byPattern && !r.byWalk).map((r) => r.src),
    walkNotPattern: rows.filter((r) => r.byWalk && !r.byPattern).map((r) => r.src),
    tsPattern: rows.filter((r) => r.tsPattern).map((r) => r.src),
    tsWalk: rows.filter((r) => r.tsWalk).map((r) => r.src),
    perKind: Object.fromEntries([...kindsSeen].sort().map((k) => [k, rows.filter((r) => r.kinds.includes(k)).length])),
    excludedEither: rows.filter((r) => r.byPattern || r.tsPattern).length,
  };
  writeFileSync(process.env.QA_PROBE_OUT as string, `${JSON.stringify(out, null, 1)}\n`);
  expect(out.inputs).toBe(2378);
});
