// QA re-key probe (plan 019, revision 6): three premises of revision 6, each settled by a run.
//  (1) AC-6.5's "0x02000000 is the heading bit, by inference": decode it with the pinned Syntax constants, and list the single-bit
//      members each of AC-2.3's masks clears relative to content's.
//  (2) AC-6.5's box/helper split: over the 272 corpus, the link inputs and an emoji-in-construct grid, compare parseLossless's
//      emoji-node spans under each AC-2.3 mask with content's. A surface on the box needs 0 differing inputs; a surface on the
//      helper needs at least one differing input per construct its mask turns off (the helper's discriminating fixtures).
//  (3) AC-4.7's literals: what this Node's Intl prints for `s` and `S` at 1700000000, en-US, UTC, by code point, beside the drawn
//      bytes Discord gave (analysis an8/dom-account1.json).
// argv[2] corpus-272.json, argv[3] link-inputs.json, argv[4] an8/dom-account1.json (read only), argv[5] output file.
// Run network-isolated from a directory whose node_modules holds @discord/markdown-wasm@0.16.0.
import { readFileSync, writeFileSync } from "node:fs";
import { Syntax, init, parseLossless } from "@discord/markdown-wasm";
await init();
const out = [];
const log = (s) => out.push(s);
const singles = Object.entries(Syntax).filter(([, v]) => typeof v === "number" && v > 0 && (v & (v - 1)) === 0);
const name = (v) => singles.filter(([, b]) => (v & b) !== 0).map(([k]) => k).join(",") || "(none)";
const masks = { content: 0x3fffffff, "embed description": 0x3fffffff, "embed field value": 0x3dffffff,
  "title / field name": 0x19fec97f, "title / field name, url": 0x19fec907, "V2 text display": 0x3fffffff };
log(`(1) 0x02000000 = ${name(0x02000000)}`);
for (const [k, v] of Object.entries(masks)) log(`(1) ${k} 0x${v.toString(16)} clears vs content: ${name(masks.content & ~v)}`);
const emojiSpans = (text, mask) => {
  const acc = [];
  const walk = (n) => {
    if (n.kind && n.kind.type === "emoji") acc.push(JSON.stringify(n.span));
    for (const c of n.children ?? []) if (c.type === "node") walk(c);
  };
  walk(parseLossless(text, mask));
  return acc.join(";");
};
const E = ["🙂", ":ok:", "<:x:123456789012345678>"];
const wraps = { plain: (e) => `a ${e} b`, inlineCode: (e) => `\`${e}\``, codeBlock: (e) => `\`\`\`\n${e}\n\`\`\``,
  heading: (e) => `# ${e}`, subtext: (e) => `-# ${e}`, list: (e) => `- ${e}`, maskedLinkLabel: (e) => `[${e}](https://x.y)`,
  urlPath: (e) => `https://x.y/${e}`, autoLink: (e) => `<https://x.y/${e}>`, quote: (e) => `> ${e}`, spoiler: (e) => `||${e}||`,
  bold: (e) => `**${e}**`, escaped: (e) => `\\${e}` };
const grid = Object.entries(wraps).flatMap(([w, f]) => E.map((e) => ({ id: `${w}:${e}`, t: f(e) })));
const corpus = JSON.parse(readFileSync(process.argv[2], "utf8")).map((t, i) => ({ id: `corpus#${i}`, t }));
const links = JSON.parse(readFileSync(process.argv[3], "utf8")).map((t, i) => ({ id: `link#${i}`, t }));
const inputs = [...corpus, ...links, ...grid];
const withEmoji = inputs.filter((x) => emojiSpans(x.t, masks.content) !== "").length;
log(`(2) inputs ${inputs.length} (corpus ${corpus.length}, links ${links.length}, grid ${grid.length}); with an emoji node under content: ${withEmoji}`);
for (const [k, v] of Object.entries(masks)) {
  if (k === "content") continue;
  const diff = inputs.filter((x) => emojiSpans(x.t, v) !== emojiSpans(x.t, masks.content));
  const byWrap = [...new Set(diff.filter((x) => x.id.includes(":")).map((x) => x.id.split(":")[0]))];
  log(`(2) ${k}: inputs whose emoji spans differ from content's: ${diff.length}; grid constructs: ${byWrap.join(",") || "(none)"}; first: ${diff.slice(0, 3).map((x) => JSON.stringify(x.t)).join(" | ")}`);
}
// Positive control for (2): a mask with EMOJI cleared must differ from content on every grid input with an emoji.
const noEmoji = masks.content & ~Syntax.EMOJI;
log(`(2) control, content with EMOJI cleared: differing grid inputs ${grid.filter((x) => emojiSpans(x.t, noEmoji) !== emojiSpans(x.t, masks.content)).length} of ${grid.length}`);
const cps = (s) => [...s].map((c) => c.codePointAt(0).toString(16).padStart(4, "0")).join(" ");
const d = new Date(1700000000 * 1000);
const fmt = (o) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(d);
const s = fmt({ dateStyle: "short", timeStyle: "short" });
const S = fmt({ dateStyle: "short", timeStyle: "medium" });
log(`(3) node ${process.version}, ICU ${process.versions.icu}, tz env ${process.env.TZ ?? "(unset)"}`);
log(`(3) s=${JSON.stringify(s)} cps ${cps(s)}`);
log(`(3) S=${JSON.stringify(S)} cps ${cps(S)}`);
const dom = JSON.parse(readFileSync(process.argv[4], "utf8"));
for (const r of dom.rows.slice(0, 2)) {
  const m = r.html.match(/class="timestamp_[^"]*">([^<]*)</);
  log(`(3) drawn ${JSON.stringify(m?.[1])} cps ${m ? cps(m[1]) : "(no match)"}`);
}
log(`(3) default-locale call (no locale, no timeZone): ${JSON.stringify(new Intl.DateTimeFormat(undefined, { dateStyle: "short", timeStyle: "short" }).format(d))}`);
writeFileSync(process.argv[5], `${out.join("\n")}\n`);
