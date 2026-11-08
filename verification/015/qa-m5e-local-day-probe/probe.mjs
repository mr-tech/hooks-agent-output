// "now" = 2026-11-08T20:00Z; message = 2026-11-08T10:00Z (same UTC day) and 2026-11-07T23:30Z (UTC yesterday).
// Expected (local-day semantics), as independent literals per zone:
//   UTC:                 10:00Z today; 23:30Z prev not today
//   Pacific/Auckland +13: now = 11-09 09:00 local; 10:00Z = 11-08 23:00 local -> NOT today; 23:30Z = 11-08 12:30 -> NOT today
//   America/Los_Angeles -8: now = 11-08 12:00 local; 10:00Z = 11-08 02:00 -> today; 23:30Z(11-07) = 11-07 15:30 -> NOT today
const { default: fmt } = await import('./formatMessageDate.ts');
const RealDate = Date;
const NOW = RealDate.parse('2026-11-08T20:00:00Z');
globalThis.Date = class extends RealDate { constructor(...a) { super(...(a.length ? a : [NOW])); } static now() { return NOW; } };
const expected = {
  UTC: [true, false],
  'Pacific/Auckland': [false, false],
  'America/Los_Angeles': [true, false],
}[process.env.TZ];
const got = ['2026-11-08T10:00:00Z', '2026-11-07T23:30:00Z'].map((t) => fmt(t, 'Today at ').startsWith('Today at '));
console.log(process.env.TZ, JSON.stringify(got), JSON.stringify(expected), JSON.stringify(got) === JSON.stringify(expected) ? 'OK' : 'MISMATCH');
