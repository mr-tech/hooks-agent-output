// M5-e executable oracle: two saves s1, s2 of one message m (s1 upserted first), each answered by the
// generator in one class, and every interleaving of the events those answers imply.
//
// Spec model, written from plan 017 revision 1 (M5-a, M5-b, M5-c, M5-e) and never from production code:
//   W_i  the generator stores previews/<m>/<n_i>.jpeg            (only when it will answer 204, or late)
//   C_i  the website's continuation commits n_i to the row         (M5-a: only on 204, and only when no
//        save upserted after s_i has committed its own)
//   D_i  the website deletes every object under the prefix except n_i, after C_i (M5-c)
//   F_i  the continuation records a failure answer (no write by the website)
// Answer classes per save:
//   ok    204: W_i < C_i < D_i
//   fail  500 / 404 / network error: nothing stored, F_i only (M6-a: "nothing written")
//   late  no answer within T: the continuation gives up (F_i); the generator may still store W_i at any
//         later point, or never (the render finishing after T, M5-f / RK-2)
// Invariants checked at every step and at the end:
//   B  (M5-b)  the object named by the committed nonce exists at every moment
//   E1 (M5-e)  the committed nonce at the end is n_k for the latest-upserted save k whose 204 was
//              processed, else n0
//   E2 (M5-e)  the prefix at the end holds exactly the committed object
//
// Usage: node oracle.mjs [--json]   prints the per-row table and every counterexample interleaving.
// Exit 0 always; the result is the printed table (this is an oracle, not a gate).

const CLASSES = ['ok', 'fail', 'late'];

function eventsFor(i, cls) {
  if (cls === 'ok') return [[`W${i}`], [`C${i}`], [`D${i}`]];
  if (cls === 'fail') return [[`F${i}`]];
  return [[`F${i}`], [`W${i}`, 'optional']]; // late: W_i may come after F_i, or never
}

// All interleavings of two chains, each chain's order kept; optional events may be dropped.
function interleave(a, b) {
  const out = [];
  const rec = (x, y, acc) => {
    if (!x.length && !y.length) { out.push(acc); return; }
    if (x.length) {
      rec(x.slice(1), y, [...acc, x[0][0]]);
      if (x[0][1] === 'optional' && x.length === 1) rec([], y, acc);
    }
    if (y.length) {
      rec(x, y.slice(1), [...acc, y[0][0]]);
      if (y[0][1] === 'optional' && y.length === 1) rec(x, [], acc);
    }
  };
  rec(a, b, []);
  return [...new Set(out.map((s) => s.join(' ')))].map((s) => (s ? s.split(' ') : []));
}

function run(seq) {
  const objects = new Set(['n0']);
  let committed = 'n0';
  let committedBy = 0; // upsert order of the committing save; 0 = before s1
  const processedOk = new Set();
  let bViolatedAt = null;
  for (const ev of seq) {
    const i = Number(ev.slice(1));
    switch (ev[0]) {
      case 'W': objects.add(`n${i}`); break;
      case 'C':
        processedOk.add(i);
        if (committedBy <= i) { committed = `n${i}`; committedBy = i; }
        break;
      case 'D':
        if (committed === `n${i}` || committedBy < i) {
          // literal M5-c: the save that committed deletes every other object it lists
          for (const o of [...objects]) if (o !== `n${i}`) objects.delete(o);
        }
        break;
      default: break; // F_i: no website write
    }
    if (!objects.has(committed) && bViolatedAt === null) bViolatedAt = ev;
  }
  const want = processedOk.size ? `n${Math.max(...processedOk)}` : 'n0';
  return {
    committed,
    prefix: [...objects].sort(),
    B: bViolatedAt === null,
    bViolatedAt,
    E1: committed === want,
    E2: objects.size === 1 && objects.has(committed),
  };
}

const rows = [];
for (const c1 of CLASSES) {
  for (const c2 of CLASSES) {
    const seqs = interleave(eventsFor(1, c1), eventsFor(2, c2));
    const results = seqs.map((s) => ({ seq: s.join(' '), ...run(s) }));
    rows.push({
      s1: c1,
      s2: c2,
      interleavings: results.length,
      allB: results.every((r) => r.B),
      allE1: results.every((r) => r.E1),
      allE2: results.every((r) => r.E2),
      counterexamples: results.filter((r) => !r.B || !r.E1 || !r.E2),
    });
  }
}

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(rows, null, 1)}\n`);
} else {
  for (const r of rows) {
    console.log(`s1=${r.s1.padEnd(4)} s2=${r.s2.padEnd(4)} n=${String(r.interleavings).padStart(2)}  B=${r.allB} E1=${r.allE1} E2=${r.allE2}  counterexamples=${r.counterexamples.length}`);
    for (const c of r.counterexamples) {
      console.log(`    [${c.seq}] -> committed ${c.committed}, prefix {${c.prefix.join(',')}}${c.B ? '' : `, B broken at ${c.bViolatedAt}`}${c.E2 ? '' : ', E2 broken'}`);
    }
  }
}
