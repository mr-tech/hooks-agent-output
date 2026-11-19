// Checks the predicate P = /^-?(0|[1-9][0-9]*)(e[0-9]+)?$/ against JSON.parse over hashMessage's alphabet (-?[0-9a-f]+).
// Exhaustive over every string of length 1..6 on the alphabet {0,1,9,a,e,f} with and without a leading '-'.
const P = /^-?(0|[1-9][0-9]*)(e[0-9]+)?$/;
const A = ['0', '1', '9', 'a', 'e', 'f'];
let n = 0, members = 0, disagree = [];
function* strs(len) { if (len === 0) { yield ''; return; } for (const s of strs(len - 1)) for (const c of A) yield s + c; }
for (let len = 1; len <= 6; len++) for (const body of strs(len)) for (const s of [body, '-' + body]) {
  n++;
  let nonString; try { nonString = typeof JSON.parse(s) !== 'string'; } catch { nonString = false; }
  if (P.test(s)) members++;
  if (P.test(s) !== nonString) disagree.push(s);
}
console.log(JSON.stringify({ strings: n, predicateMembers: members, disagreements: disagree.length, sample: disagree.slice(0, 5) }));
// Positive control: a deliberately wrong predicate (no exponent) must disagree.
const W = /^-?(0|[1-9][0-9]*)$/; let wd = 0;
for (const s of ['5e7', '-1e10', '12', '012']) { let ns; try { ns = typeof JSON.parse(s) !== 'string'; } catch { ns = false; } if (W.test(s) !== ns) wd++; }
console.log(JSON.stringify({ controlDisagreements: wd }));
