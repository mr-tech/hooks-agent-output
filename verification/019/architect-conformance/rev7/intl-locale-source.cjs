// A locale react-aria can report that loadLocales.ts (af3d95a) has no dayjs file for: Vietnamese, Czech, Danish.
const dayjs = require(process.argv[2]); const lf = require(process.argv[2] + '/plugin/localizedFormat'); dayjs.extend(lf);
const t = new Date(1700000000000), opt = { dateStyle: 'short', timeStyle: 'short', timeZone: 'UTC' };
for (const tag of ['vi-VN', 'cs-CZ', 'da-DK']) {
  dayjs.locale(tag);
  const eff = dayjs.locale();
  console.log(JSON.stringify({ reactAria: tag, dayjsEffective: eff, siblingT_LT: dayjs(t).format('LT'),
    intlReactAriaTag: new Intl.DateTimeFormat(tag, opt).format(t), intlEffective: new Intl.DateTimeFormat(eff, opt).format(t) }));
}
