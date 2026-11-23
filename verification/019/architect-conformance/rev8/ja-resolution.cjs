// Does ja-JP resolve to en or ja once the site's locale files (loadLocales.ts at af3d95a imports dayjs/locale/ja) are loaded?
const base = process.argv[2]; const dayjs = require(base);
const t = new Date(1700000000000), opt = { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' };
const row = (label) => { dayjs.locale('ja-JP'); const eff = dayjs.locale(); return { label, dayjsEffective: eff, intlEffective: new Intl.DateTimeFormat(eff, opt).format(t) }; };
const before = row('without the site locale files');
require(base + '/locale/ja');
const after = row('after require dayjs/locale/ja, as loadLocales.ts does');
for (const tag of ['vi-VN']) { dayjs.locale('en'); dayjs.locale(tag); console.log(JSON.stringify({ label: 'vi-VN (no file in loadLocales.ts)', dayjsEffective: dayjs.locale(), intlEffective: new Intl.DateTimeFormat(dayjs.locale(), opt).format(t) })); }
console.log(JSON.stringify(before)); console.log(JSON.stringify(after));
