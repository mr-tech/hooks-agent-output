// M5-e executable oracle, keyed to plan 017 revision 2 (agent-output 3d678cc), M5-a, M5-b, M5-c, M5-e.
// A spec model written from the plan's text, never from production code. The revision-1 model is
// frozen beside it as oracle-rev1.mjs.
//
// Two saves s1, s2 of one message m, s1 upserted first, so n1 orders below n2 (M5-a order token).
// The row starts committed to n0, an old object. Optionally an old orphan z (an extra object
// older than L) is already in the prefix.
// Events:
//   W_i  the generator stores n_i's object (fresh: younger than L for the window's life)
//   C_i  conditional commit (M5-a): accepted iff the row exists and its nonce is null or orders
//        below n_i; it learns the nonce it replaced; it never inserts
//   D_i  the continuation's deletes (M5-c): accepted → delete the replaced nonce's object (form 1)
//        and sweep every object other than n_i whose age is at least L (form 3); refused → delete
//        its own object (form 2)
//   F_i  a failure answer processed (500 / 404 / other / network / no answer within T): no write
//   X    the message's row is deleted;  P  the delete route's purge of the prefix (after X)
// Classes per save: ok (W < C < D), fail (F), late (F, then optionally W at any later point:
// the render finishing after T; no continuation sees it).
// Timing premise, which this model does not check: L = 120 s outlasts any continuation (60 s,
// D-10), so inside one window every object written by a live save is younger than L, and a sweep
// can collect only z and n0. That premise is the age guard's and is owed a test of its own (NM-23).
//
// Invariants:
//   B   (M5-b)  while the row exists, the committed nonce's object exists, at every step
//   E1  (M5-a)  the row's final nonce is the greatest-ordered n_i whose C_i was accepted, else n0;
//               after X the row stays gone (nothing recreates it)
//   E2  (M5-c)  at the end, no object of a save whose 204 was processed remains unless it is the
//               committed one: every such object is removed by forms 1 or 2, or by the purge
//   E3  (M5-c)  after every accepted commit's deletes, the prefix holds the committed object plus
//               only fresh objects (z and n0 are gone)
//   Residue (allowed, counted, not a failure): late objects left in the prefix, and objects left
//   after X by a late write.
//
// Usage: node oracle.mjs [--json]. Exit 0 always; the printed table is the result.

const CLASSES = ['ok', 'fail', 'late'];

function chain(i, cls) {
  if (cls === 'ok') return [[`W${i}`], [`C${i}`], [`D${i}`]];
  if (cls === 'fail') return [[`F${i}`]];
  return [[`F${i}`], [`W${i}`, 'optional']];
}

// Interleave several chains, each chain's order kept; a trailing optional event may be dropped.
function interleave(chains) {
  const out = new Set();
  const rec = (cs, acc) => {
    if (cs.every((c) => !c.length)) { out.add(acc.join(' ')); return; }
    cs.forEach((c, k) => {
      if (!c.length) return;
      const next = cs.map((x, j) => (j === k ? x.slice(1) : x));
      rec(next, [...acc, c[0][0]]);
      if (c[0][1] === 'optional' && c.length === 1) rec(cs.map((x, j) => (j === k ? [] : x)), acc);
    });
  };
  rec(chains, []);
  return [...out].map((s) => (s ? s.split(' ') : []));
}

const ORDER = { n0: 0, n1: 1, n2: 2 };

function run(seq, withOrphan, mut = {}) {
  const objects = new Map([['n0', 'old']]);
  if (withOrphan) objects.set('z', 'old');
  let rowExists = true;
  let committed = 'n0';
  const accepted = {};
  const replaced = {};
  const processedOk = new Set();
  const lateWrites = new Set();
  const fails = [];
  const check = (ev) => {
    if (rowExists && committed && !objects.has(committed)) fails.push(`B@${ev}`);
  };
  for (const ev of seq) {
    const i = Number(ev.slice(1));
    const n = `n${i}`;
    switch (ev[0]) {
      case 'W':
        objects.set(n, 'fresh');
        if (!seq.includes(`C${i}`)) lateWrites.add(n);
        break;
      case 'C': {
        processedOk.add(i);
        const ok = mut.commitUnconditional
          ? true
          : (rowExists || mut.commitInserts) && (committed === null || ORDER[committed] < i);
        if (ok) {
          if (!rowExists && mut.commitInserts) rowExists = true;
          replaced[i] = committed;
          committed = n;
        }
        accepted[i] = ok;
        break;
      }
      case 'D':
        if (accepted[i]) {
          if (replaced[i] && !mut.noForm1) objects.delete(replaced[i]);
          for (const [o, age] of [...objects]) {
            if (o === n) continue;
            if (mut.sweepNoAgeGuard || age === 'old') objects.delete(o);
          }
          const extra = [...objects].filter(([o, age]) => o !== committed && age === 'old');
          if (rowExists && extra.length) fails.push(`E3@${ev}`);
        } else if (!mut.noForm2) {
          objects.delete(n);
        }
        break;
      case 'X': rowExists = false; break;
      case 'P': objects.clear(); break;
      default: break;
    }
    check(ev);
  }
  const acc = Object.keys(accepted).filter((k) => accepted[k]).map(Number);
  const wantRow = seq.includes('X') ? false : true;
  const want = acc.length ? `n${Math.max(...acc)}` : 'n0';
  if (rowExists !== wantRow) fails.push('E1:row');
  else if (rowExists && committed !== want) fails.push('E1');
  for (const i of processedOk) {
    const n = `n${i}`;
    if (objects.has(n) && !(rowExists && committed === n)) fails.push(`E2:${n}`);
  }
  const residue = [...objects.keys()].filter((o) => lateWrites.has(o));
  return { fails, residue, prefix: [...objects.keys()].sort(), committed: rowExists ? committed : '(row deleted)' };
}

function table(mut) {
  const rows = [];
  for (const c1 of CLASSES) {
    for (const c2 of CLASSES) {
      for (const del of [false, true]) {
        for (const orphan of [false, true]) {
          const chains = [chain(1, c1), chain(2, c2)];
          if (del) chains.push([['X'], ['P']]);
          const seqs = interleave(chains);
          const res = seqs.map((s) => ({ seq: s.join(' '), ...run(s, orphan, mut) }));
          const bad = res.filter((r) => r.fails.length);
          rows.push({
            s1: c1, s2: c2, messageDelete: del, oldOrphan: orphan,
            interleavings: res.length,
            violations: bad.length,
            withResidue: res.filter((r) => r.residue.length).length,
            examples: bad.slice(0, 3).map((r) => `[${r.seq}] ${r.fails.join(',')} prefix{${r.prefix.join(',')}}`),
          });
        }
      }
    }
  }
  return rows;
}

const MUTANTS = {
  'commit unconditional (order check dropped)': { commitUnconditional: true },
  'commit inserts when the row is gone': { commitInserts: true },
  'form 1 dropped (replaced object kept)': { noForm1: true },
  'form 2 dropped (refused save keeps its object)': { noForm2: true },
  'sweep without the age guard': { sweepNoAgeGuard: true },
};

const print = (rows) => {
  const total = rows.reduce((a, r) => a + r.interleavings, 0);
  const viol = rows.reduce((a, r) => a + r.violations, 0);
  const resid = rows.reduce((a, r) => a + r.withResidue, 0);
  console.log(`rows ${rows.length}, interleavings ${total}, violating ${viol}, with late-write residue ${resid}`);
  for (const r of rows) {
    if (r.violations) {
      console.log(`  s1=${r.s1} s2=${r.s2} delete=${r.messageDelete} orphan=${r.oldOrphan}: ${r.violations}/${r.interleavings}`);
      for (const e of r.examples) console.log(`      ${e}`);
    }
  }
};

if (process.argv.includes('--json')) {
  process.stdout.write(`${JSON.stringify(table({}), null, 1)}\n`);
} else if (process.argv.includes('--mutants')) {
  for (const [name, m] of Object.entries(MUTANTS)) {
    console.log(`\nMUTANT ${name}:`);
    print(table(m));
  }
} else {
  print(table({}));
}
