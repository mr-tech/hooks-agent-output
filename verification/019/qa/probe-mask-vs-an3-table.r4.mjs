// QA re-key probe (plan 019, revision 4): the seven AN-3 native masks with GAME_MENTION cleared on the five legacy-only surfaces
// (content keeps Discord's own mask), decoded bit by bit with the pinned Syntax constants, beside AN-3's table column for each
// surface. argv[2] = an3-table.md (read only), argv[3] = output file this script writes.
// Run from a directory whose node_modules holds @discord/markdown-wasm@0.16.0.
import { readFileSync, writeFileSync } from "node:fs";
import { Syntax } from "@discord/markdown-wasm";
const out = [];
const log = (s) => out.push(s);
const G = Syntax.GAME_MENTION;
const native = { "content (webhook)": 0x3fffffff, "embed description": 0x3fffffff, "embed field value": 0x3dffffff,
  "embed title": 0x19fecd7f, "embed title, embed has url": 0x19fecd07, "field name": 0x19fecd7f,
  "field name, embed has url": 0x19fecd07, "V2 text display": 0x3fffffff };
const masks = Object.fromEntries(Object.entries(native).map(([k, v]) => [k, k.startsWith("content") ? v : (v & ~G)]));
const lines = readFileSync(process.argv[2], "utf8").split("\n").filter((l) => l.startsWith("|"));
const head = lines[0].split("|").map((s) => s.trim());
const rows = lines.slice(2).map((l) => l.split("|").map((s) => s.trim()));
let mismatches = 0, cells = 0;
for (const [surface, mask] of Object.entries(masks)) {
  const col = head.indexOf(surface);
  if (col < 0) { log(`NO COLUMN ${surface}`); continue; }
  for (const r of rows) {
    const bit = r[1]; if (!(bit in Syntax)) continue;
    const allowedByTable = r[col].split("/")[0].replace(/\*|≠/g, "").trim().startsWith("L");
    const allowedByMask = (mask & Syntax[bit]) !== 0;
    cells++;
    if (allowedByTable !== allowedByMask) { mismatches++; log(`${surface} ${bit}: table legacy=${r[col]} mask=${allowedByMask ? "on" : "off"}`); }
  }
}
log(`masks (hex): ${Object.entries(masks).map(([k, v]) => `${k}=0x${v.toString(16)}`).join("; ")}`);
log(`no mask is 0: ${Object.values(masks).every((v) => v !== 0)}; DEV_LINKS set in any: ${Object.values(masks).some((v) => (v & Syntax.DEV_LINKS) !== 0)}`);
log(`cells ${cells} mismatches ${mismatches}`);
const col = head.indexOf("embed title");
const boldRow = rows.find((r) => r[1] === "BOLD");
const wrong = masks["embed title"] ^ Syntax.BOLD;
log(`control (title mask with BOLD flipped): ${((wrong & Syntax.BOLD) !== 0) === boldRow[col].startsWith("L") ? "NOT DETECTED" : "detected"}`);
writeFileSync(process.argv[3], `${out.join("\n")}\n`);
