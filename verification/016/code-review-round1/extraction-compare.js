// Usage: node extraction-compare.js <base.json> <tip.json>
// Compares validateContentRequirements outputs member by member, and validateMessage outputs on
// members the tip leaves unrefused by the new V2 check, and on classic members (no V2 type, no flag).
const [a, b] = process.argv.slice(2).map((p) => require(require('path').resolve(p)));
const V2 = new Set([9, 10, 11, 12, 13, 14, 17]);
let crDiff = 0; let classic = 0; let classicDiff = 0; let moved = 0; let movedOnBaseEmpty = 0; let throws = 0;
for (let i = 0; i < a.length; i += 1) {
  if (JSON.stringify(a[i].m) !== JSON.stringify(b[i].m)) throw new Error(`corpus differs at ${i}`);
  if (a[i].cr !== b[i].cr) crDiff += 1;
  if (String(a[i].vm).startsWith('THROW') || String(b[i].vm).startsWith('THROW')) throws += 1;
  const isV2 = (a[i].m.components || []).some((c) => V2.has(c.type)) || ((a[i].m.flags || 0) & 32768);
  if (!isV2) { classic += 1; if (a[i].vm !== b[i].vm) classicDiff += 1; }
  if (a[i].vm !== b[i].vm) { moved += 1; if (a[i].vm === '') movedOnBaseEmpty += 1; }
}
console.log(JSON.stringify({ members: a.length, contentRequirementsDiffer: crDiff, classicMembers: classic, classicValidateMessageDiffer: classicDiff, validateMessageMoved: moved, movedFromBaseEmpty: movedOnBaseEmpty, membersWithThrow: throws }));
