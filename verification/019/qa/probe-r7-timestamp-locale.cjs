// QA re-key probe (plan 019, revision 7): AC-4.7's two CF-13 branches (UTC before mount; LoadLocale's locale), as literals a test
// can assert, and the two readings of "the locale LoadLocale sets for dayjs": the tag handed to dayjs.locale(), or the locale dayjs
// resolves it to. argv[2] = a dayjs package directory (read only), argv[3] = output file.
// Loads only the dayjs locales src/utils/loadLocales.ts imports that this probe names (de, en-gb); ja is deliberately not loaded,
// so it stands for a locale the site does not ship.
const { writeFileSync } = require("node:fs");
const path = require("node:path");
const dayjs = require(path.join(process.argv[2], "dayjs.min.js"));
require(path.join(process.argv[2], "locale/de.js"));
require(path.join(process.argv[2], "locale/en-gb.js"));
const out = [];
const d = new Date(1700000000 * 1000);
const f = (locale, timeZone, timeStyle) => new Intl.DateTimeFormat(locale, { timeZone, dateStyle: "short", timeStyle }).format(d);
out.push(`node ${process.version}, ICU ${process.versions.icu}, dayjs ${dayjs.version ?? "(no version field)"}`);
out.push(`s en-US UTC (pre-mount, any viewer zone): ${JSON.stringify(f("en-US", "UTC", "short"))}`);
out.push(`s en-US America/New_York (mounted): ${JSON.stringify(f("en-US", "America/New_York", "short"))}; S: ${JSON.stringify(f("en-US", "America/New_York", "medium"))}`);
for (const tag of ["en-US", "en-GB", "de-DE", "ja-JP"]) {
  dayjs.locale("en");
  dayjs.locale(tag);
  const resolved = dayjs.locale();
  const a = f(tag, "UTC", "short"), b = f(resolved, "UTC", "short");
  out.push(`tag ${tag} -> dayjs ${resolved}: Intl(tag) ${JSON.stringify(a)}; Intl(resolved) ${JSON.stringify(b)}; readings ${a === b ? "agree" : "DIFFER"}`);
}
writeFileSync(process.argv[3], `${out.join("\n")}\n`);
