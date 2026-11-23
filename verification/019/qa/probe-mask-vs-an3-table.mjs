// QA re-key probe (plan 019, revision 3): each AN-3 native mask value, decoded bit by bit with the pinned Syntax constants,
// beside AN-3's table column for that surface. Reports where the decoded mask allows a bit the table's legacy cell does not
// allow, or the reverse. Run from a directory whose node_modules holds @discord/markdown-wasm@0.16.0; argv[2] = an3-table.md.
import { readFileSync } from "node:fs";
import { Syntax } from "@discord/markdown-wasm";
const masks = { "content (webhook)": 0x3fffffff, "embed description": 0x3fffffff, "embed field value": 0x3dffffff,
  "embed title": 0x19fecd7f, "embed title, embed has url": 0x19fecd07, "field name": 0x19fecd7f,
  "field name, embed has url": 0x19fecd07, "V2 text display": 0x3fffffff };
const lines = readFileSync(process.argv[2], "utf8").split("\n").filter(l => l.startsWith("|"));
const head = lines[0].split("|").map(s => s.trim());
const rows = lines.slice(2).map(l => l.split("|").map(s => s.trim()));
let mismatches = 0, cells = 0;
for (const [surface, mask] of Object.entries(masks)) {
  const col = head.indexOf(surface);
  if (col < 0) { console.log("NO COLUMN", surface); continue; }
  for (const r of rows) {
    const bit = r[1]; if (!(bit in Syntax)) continue;
    const legacy = r[col].split("/")[0].replace(/\*|≠/g, "").trim();
    const allowedByTable = legacy.startsWith("L");
    const allowedByMask = (mask & Syntax[bit]) !== 0;
    cells++;
    if (allowedByTable !== allowedByMask) { mismatches++; console.log(`${surface} ${bit}: table legacy=${r[col]} mask=${allowedByMask ? "on" : "off"}`); }
  }
}
console.log("cells", cells, "mismatches", mismatches);
// positive control: a deliberately wrong mask must report mismatches
const wrong = 0x19fecd7f ^ Syntax.BOLD; const col = head.indexOf("embed title");
const boldRow = rows.find(r => r[1] === "BOLD");
console.log("control (title mask with BOLD flipped): BOLD", ((wrong & Syntax.BOLD) !== 0) === boldRow[col].startsWith("L") ? "NOT DETECTED" : "detected");
