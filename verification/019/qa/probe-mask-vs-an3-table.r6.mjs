// QA re-key probe (plan 019, revision 6): AC-2.3's six mask literals (eight surface variants), decoded bit by bit with the pinned
// Syntax constants, beside AN-3's table column for each surface. AN-3's GAME_MENTION row is stale (it was posted in the research's
// `<game:id>` form, text in both parsers; analysis AN-8 limb 2), so that row's legacy cell is replaced by AN-8 limb 2b's run:
// legacy allows GAME_MENTION on a surface iff its tree holds `gameMention` for every case in gm-surfaces.json.
// argv[2] = an3-table.md, argv[3] = an8/gm-surfaces.json (both read only), argv[4] = output file this script writes.
// Run from a directory whose node_modules holds @discord/markdown-wasm@0.16.0.
// Positive controls on the same run: revision 4's masks (GAME_MENTION cleared on five surfaces) must show exactly the three
// rich-surface disagreements, and a BOLD flip on the title mask must be detected.
import { readFileSync, writeFileSync } from "node:fs";
import { Syntax } from "@discord/markdown-wasm";
const out = [];
const log = (s) => out.push(s);
const G = Syntax.GAME_MENTION;
// AC-2.3 at plan revision 6 (record 946d4e54), typed from the plan's table, not derived from AN-3.
const r6 = { "content (webhook)": 0x3fffffff, "embed description": 0x3fffffff, "embed field value": 0x3dffffff,
  "embed title": 0x19fec97f, "embed title, embed has url": 0x19fec907, "field name": 0x19fec97f,
  "field name, embed has url": 0x19fec907, "V2 text display": 0x3fffffff };
const r4 = { ...r6, "embed description": 0x3ffffbff, "embed field value": 0x3dfffbff, "V2 text display": 0x3ffffbff };
const gmKey = { "content (webhook)": "content_webhook", "embed description": "embed_description",
  "embed field value": "embed_field_value", "embed title": "embed_title", "embed title, embed has url": "embed_title_with_url",
  "field name": "field_name", "field name, embed has url": "field_name_embed_has_url", "V2 text display": "text_display_webhook" };
const gm = JSON.parse(readFileSync(process.argv[3], "utf8")).rows;
const lines = readFileSync(process.argv[2], "utf8").split("\n").filter((l) => l.startsWith("|"));
const head = lines[0].split("|").map((s) => s.trim());
const rows = lines.slice(2).map((l) => l.split("|").map((s) => s.trim()));
function compare(masks, label) {
  let mismatches = 0, cells = 0;
  for (const [surface, mask] of Object.entries(masks)) {
    const col = head.indexOf(surface);
    if (col < 0) { log(`${label} NO COLUMN ${surface}`); continue; }
    for (const r of rows) {
      const bit = r[1]; if (!(bit in Syntax)) continue;
      const allowedByTable = bit === "GAME_MENTION"
        ? gm.every((c) => c[gmKey[surface]].includes("gameMention"))
        : r[col].split("/")[0].replace(/\*|≠/g, "").trim().startsWith("L");
      const allowedByMask = (mask & Syntax[bit]) !== 0;
      cells++;
      if (allowedByTable !== allowedByMask) { mismatches++; log(`${label} ${surface} ${bit}: legacy=${allowedByTable ? "on" : "off"} mask=${allowedByMask ? "on" : "off"}`); }
    }
  }
  log(`${label} cells ${cells} mismatches ${mismatches}`);
  return mismatches;
}
log(`gm-surfaces cases: ${gm.length}; legacy GAME_MENTION per surface: ${Object.entries(gmKey).map(([s, k]) => `${s}=${gm.every((c) => c[k].includes("gameMention"))}`).join("; ")}`);
compare(r6, "r6");
compare(r4, "control-r4");
log(`r6 masks (hex): ${Object.entries(r6).map(([k, v]) => `${k}=0x${v.toString(16)}`).join("; ")}`);
log(`no mask is 0: ${Object.values(r6).every((v) => v !== 0)}; DEV_LINKS set in any: ${Object.values(r6).some((v) => (v & Syntax.DEV_LINKS) !== 0)}`);
log(`GAME_MENTION = 0x${G.toString(16)}`);
compare({ ...r6, "embed title": r6["embed title"] ^ Syntax.BOLD }, "control-bold-flip");
writeFileSync(process.argv[4], `${out.join("\n")}\n`);
