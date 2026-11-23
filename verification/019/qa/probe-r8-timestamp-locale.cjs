// QA re-key probe (plan 019, revision 8). Corrects probe-r7-timestamp-locale.cjs, which loaded only de and en-gb and so treated
// ja-JP as a locale the site does not ship. The site loads ja (src/utils/loadLocales.ts at af3d95a). This probe loads exactly the
// dayjs locales that file imports, read from argv[3] (the file's text, from `git show af3d95a:src/utils/loadLocales.ts`), then
// resolves each tag the way LoadLocale's dayjs.locale(tag) does and compares Intl(tag) with Intl(resolved).
// argv[2] = a dayjs package directory (read only), argv[3] = loadLocales.ts text file, argv[4] = output file.
// Positive control: with the loaded list empty, ja-JP must resolve to en (reproducing the r7 probe's premise).
const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const dayjs = require(path.join(process.argv[2], "dayjs.min.js"));
const names = [...readFileSync(process.argv[3], "utf8").matchAll(/dayjs\/locale\/([a-z-]+)/g)].map((m) => m[1]);
const out = [];
const d = new Date(1700000000 * 1000);
const f = (locale) => new Intl.DateTimeFormat(locale, { timeZone: "UTC", dateStyle: "short", timeStyle: "short" }).format(d);
const resolve = (tag) => { dayjs.locale("en"); dayjs.locale(tag); return dayjs.locale(); };
out.push(`control (no site locales loaded): ja-JP -> ${resolve("ja-JP")}`);
for (const n of names) require(path.join(process.argv[2], `locale/${n}.js`));
out.push(`site loads ${names.length} dayjs locales: ${names.join(" ")}`);
for (const tag of ["en-US", "en-GB", "ja-JP", "vi-VN", "cs-CZ", "da-DK"]) {
  const r = resolve(tag);
  const a = f(tag), b = f(r);
  out.push(`tag ${tag} -> dayjs ${r}: Intl(tag) ${JSON.stringify(a)}; Intl(resolved) ${JSON.stringify(b)}; readings ${a === b ? "agree" : "DIFFER"}`);
}
writeFileSync(process.argv[4], `${out.join("\n")}\n`);
