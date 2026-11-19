// Code review Round 9 (chain 017, M2 UAT-1): the residue of reading a broadcast hash "as delivered" (pusher-js JSON.parses
// string data). hashMessage returns an int32's toString(16). Part 1 enumerates exact members: distinct hash strings that
// JSON.parse to the same value. Part 2 estimates, under a uniform-int32 model (a model, not the real hash distribution),
// the share of hashes that are number-shaped and the probability two distinct random hashes read as equal.
// Usage: node collision.mjs [samples]
const asDelivered = (h) => { try { return JSON.parse(h); } catch { return h; } };
const hex = (i) => (i | 0).toString(16);
const examples = [['1e10', '10e9'], ['100000', '1e5'], ['1e999', '7e9999'], ['-1e999', '-5e72712'], ['0', '0e7'], ['6286e037', '62860e36']];
console.log('part 1, pairs of distinct hash strings and their delivered values:');
for (const [a, b] of examples) {
  const ia = parseInt(a, 16); const ib = parseInt(b, 16);
  const valid = (s, i) => hex(i) === s;
  console.log(`  ${a} -> ${asDelivered(a)} | ${b} -> ${asDelivered(b)} | equal ${asDelivered(a) === asDelivered(b)} | both int32 hash forms ${valid(a, ia | 0) && valid(b, ib | 0)}`);
}
const N = Number(process.argv[2] ?? 2e7);
let seed = 0x9e3779b9;
const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return seed | 0; };
const byValue = new Map(); const byString = new Map(); let numberShaped = 0;
for (let k = 0; k < N; k++) {
  const s = hex(rnd()); const v = asDelivered(s);
  if (typeof v !== 'number') continue;
  numberShaped++;
  const key = Object.is(v, -0) ? '0' : String(v);
  byValue.set(key, (byValue.get(key) ?? 0) + 1);
  byString.set(s, (byString.get(s) ?? 0) + 1);
}
const pairs = (m) => { let t = 0; for (const c of m.values()) t += c * (c - 1) / 2; return t; };
const total = N * (N - 1) / 2;
const distinctEqual = pairs(byValue) - pairs(byString);
console.log(`part 2, uniform-int32 model, ${N} samples (xorshift32):`);
console.log(`  number-shaped share: ${(numberShaped / N * 100).toFixed(3)}%`);
console.log(`  pairs of distinct hashes reading equal: ${distinctEqual} of ${total.toExponential(3)} pairs = ${(distinctEqual / total).toExponential(3)} per pair`);
const inf = (byValue.get('Infinity') ?? 0) + (byValue.get('-Infinity') ?? 0);
console.log(`  samples reading +/-Infinity: ${inf} (${(inf / N * 100).toFixed(4)}%)`);
