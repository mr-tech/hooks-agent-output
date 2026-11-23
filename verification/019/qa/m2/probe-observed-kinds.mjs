// QA Phase 2, plan 019 M2 at website 78c5f74: AC-2.4's observed enumerator, re-run as a second instrument over the inputs M3 has
// lifted into the tree (corpus 272, typed cases 85, link inputs 106) plus the kind-maps test's nine inputs, under all six AC-2.3
// masks, on both engine trees: parseLossless (node kinds, token kinds, emoji / mention / static-mention sub-kinds) and parse
// (Block and Inline `type` values and their sub-kinds). Each observed value is checked against the adapter's maps, whose keys are
// read from engine.ts by the module itself (imported from the export through a TS loader is not available, so the key lists are
// copied below from website 78c5f74 src/utils/markdown/engine.ts; the copy is checked against that file's text at run time).
// argv[2] = export root, argv[3] = output file. Run network-isolated from the export root.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { init, parse, parseLossless } from "@discord/markdown-wasm";
await init();
const root = process.argv[2];
const src = readFileSync(path.join(root, "src/utils/markdown/engine.ts"), "utf8");
const keysOf = (name) => {
  const m = src.match(new RegExp(`export const ${name} = \\{([\\s\\S]*?)\\}`));
  return new Set([...m[1].matchAll(/^\s*([a-z_]+):/gm)].map((x) => x[1]));
};
const MAPS = { node: keysOf("NODE_RENDERERS"), token: keysOf("TOKEN_LEAF_ROLES"), emoji: keysOf("EMOJI_KINDS"),
  mention: keysOf("MENTION_KINDS"), staticMention: keysOf("STATIC_MENTION_KINDS") };
const MASKS = { content: 0x3fffffff, fieldValue: 0x3dffffff, embedTitle: 0x19fec97f, embedTitleWithUrl: 0x19fec907 };
const data = (f) => JSON.parse(readFileSync(path.join(root, "src/utils/markdown/__tests__/helpers/data", f), "utf8"));
const NINE = [
  "**b** *i* __u__ ~~s~~ ||sp|| `c` ``cc`` ```js\ncode\n```", "# head\n-# sub\n> quote\n1. one\n- two", ">>> rest\nmore",
  "https://a.b <https://a.b> <a@b.c> [t](https://a.b \"ti\") [u](<https://a.b>)", "<t:1700000000:R> <t:1700000000>",
  "<@1> <#2> <@&3> <@$4> </ping:5> @everyone @here",
  "<id:home> <id:browse> <id:customize> <id:guide> <id:linked-roles> <id:linked-roles:6>", ":smile: 🙂 <:n:7> <a:n:8>",
  "\\*esc\\* a\n\nb\n  indented"];
const inputs = [...data("discordCorpus.json").map((c) => c.text), ...data("discordTypedCases.json").map((c) => c.text),
  ...data("discordLinkInputs.json"), ...NINE];
const seen = { node: new Set(), token: new Set(), emoji: new Set(), mention: new Set(), staticMention: new Set(), block: new Set() };
const walkL = (n) => {
  seen.node.add(n.kind.type);
  if (n.kind.type === "emoji") seen.emoji.add(n.kind.value.type);
  if (n.kind.type === "mention") { seen.mention.add(n.kind.value.type); if (n.kind.value.type === "static") seen.staticMention.add(n.kind.value.value.type); }
  for (const c of n.children) { if (c.type === "token") seen.token.add(c.kind.type); else walkL(c); }
};
const walkP = (v) => {
  if (Array.isArray(v)) { v.forEach(walkP); return; }
  if (v && typeof v === "object") {
    if (typeof v.type === "string") seen.block.add(v.type);
    Object.values(v).forEach(walkP);
  }
};
for (const t of inputs) for (const m of Object.values(MASKS)) { walkL(parseLossless(t, m)); walkP(parse(t, m)); }
const out = [];
out.push(`inputs ${inputs.length} x masks ${Object.keys(MASKS).length}; map keys: ${Object.entries(MAPS).map(([k, v]) => `${k}=${v.size}`).join(" ")}`);
for (const k of ["node", "token", "emoji", "mention", "staticMention"]) {
  const missing = [...seen[k]].filter((x) => !MAPS[k].has(x));
  out.push(`${k}: observed ${seen[k].size} [${[...seen[k]].sort().join(",")}]; not a map key: ${missing.length ? missing.join(",") : "(none)"}; map keys never observed: ${[...MAPS[k]].filter((x) => !seen[k].has(x)).join(",") || "(none)"}`);
}
out.push(`parse() type values observed (all nesting levels): ${[...seen.block].sort().join(",")}`);
// Positive control: a planted unknown key must be reported missing.
const planted = new Set([...seen.node, "hologram"]);
out.push(`control: planted node kind reported missing: ${[...planted].filter((x) => !MAPS.node.has(x)).includes("hologram")}`);
writeFileSync(process.argv[3], `${out.join("\n")}\n`);
