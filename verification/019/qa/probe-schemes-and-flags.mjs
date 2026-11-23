// QA Phase 1 probe (plan 019): Syntax member values, and which URL schemes parse() returns as links.
// Run: node probe-schemes-and-flags.mjs, from a directory whose node_modules holds @discord/markdown-wasm@0.16.0.
import { parse, Syntax } from "@discord/markdown-wasm";
const names = Object.keys(Syntax);
const single = names.filter(n => { const v = Syntax[n]; return v > 0 && (v & (v - 1)) === 0; });
console.log("members", names.length, "single-bit", single.length, single.join(","));
console.log("groups", names.filter(n => !single.includes(n)).map(n => `${n}=${Syntax[n]}`).join(" "));
const inputs = ["<javascript:alert(1)>", "[a](javascript:alert(1))", "<data:text/html,x>", "[a](data:text/html,x)",
  "<vbscript:x>", "[a](JaVaScRiPt:alert(1))", "<ftp://x.y>", "<foo:/bar>", "<mailto:a@b.c>", "<a@b.c>", "dev://branch/main",
  "<dev://branch/main>", "[a](https://x.y)", "https://x.y🙂", "[a](https://x.y \"t\")", "[a](<https://x.y>)",
  "[a](https://x.y/\u0000z)", "[a](https://x.y/ z)", "https://x.y!", "https://x.y/(a)"];
const links = (n, out=[]) => { if (n && typeof n === "object") { if (n.type === "link" || n.link) out.push(JSON.stringify(n)); for (const v of Object.values(n)) links(v, out); } return out; };
for (const t of inputs) console.log(JSON.stringify(t), "=>", links(parse(t)).join(" ; ") || "(no link) " + JSON.stringify(parse(t)));
console.log("flags0==ALL", JSON.stringify(parse("**a**", 0)) === JSON.stringify(parse("**a**", Syntax.ALL)));
console.log("devlinks on", JSON.stringify(links(parse("dev://branch/main", Syntax.ALL))), "off", JSON.stringify(links(parse("dev://branch/main", Syntax.ALL & ~Syntax.DEV_LINKS))));
