// AC-4.7 revision 9: the en-GB fixture and the vi-VN fixture share one process-wide dayjs global.
// An unloaded tag leaves the global unchanged, so vi-VN's expected `en` form holds only if nothing earlier set another locale.
const base = process.argv[2]; const dayjs = require(base); require(base + '/locale/en-gb'); require(base + '/locale/ja');
const t = new Date(1700000000000), opt = { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' };
const s = () => new Intl.DateTimeFormat(dayjs.locale(), opt).format(t);
dayjs.locale('vi-VN'); console.log(JSON.stringify({ order: 'vi-VN first', dayjsEffective: dayjs.locale(), s: s() }));
dayjs.locale('en-GB'); console.log(JSON.stringify({ order: 'en-GB', dayjsEffective: dayjs.locale(), s: s() }));
dayjs.locale('vi-VN'); console.log(JSON.stringify({ order: 'vi-VN after en-GB', dayjsEffective: dayjs.locale(), s: s() }));
