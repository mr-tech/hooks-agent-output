// Payload sweep over the adapter's link allow-list at website 22f3e58.
// Usage: node m2-link-allowlist-attack.mjs <path to engine.ts in an export or clone of 22f3e58>
// Oracle: an anchor resolves its href against the document base, so the scheme a browser would
// navigate is new URL(href, BASE).protocol. A payload is a defect when the predicate admits it and
// that resolved scheme is outside the allow-list, or when the predicate refuses a payload whose
// resolved scheme is in the list and which is absolute (a refusal of a relative href is by design).
import { pathToFileURL } from 'node:url';

const engine = await import(pathToFileURL(process.argv[2]).href);
const ALLOWED = new Set(['http:', 'https:', 'mailto:', 'discord:', 'tel:', 'sms:']);
const BASE = 'https://hooks.example/message/m/1/edit';

const schemes = ['javascript', 'data', 'vbscript', 'file', 'blob', 'about', 'dev', 'ftp', 'ws', 'http', 'https', 'mailto', 'tel', 'sms', 'discord'];
const tails = { javascript: 'alert(1)', data: 'text/html,x', vbscript: 'x', file: '///etc/passwd', blob: 'https://a.b/x', about: 'blank', dev: '//branch/main', ftp: '//a.b/', ws: '//a.b/', http: '//a.b/', https: '//a.b/', mailto: 'a@b.c', tel: '+15550100', sms: '+15550100', discord: '//-/channels/1/2' };
const pads = [];
for (let c = 0; c <= 0x20; c += 1) pads.push(String.fromCharCode(c));
pads.push('\x7f', ' ', '﻿', ' ', '　');
const inner = ['\t', '\n', '\r', '\x00', ' ', '­', '​'];

function caseMix(s) {
  return [s, s.toUpperCase(), [...s].map((ch, i) => (i % 2 ? ch.toUpperCase() : ch)).join('')];
}

const payloads = new Set();
for (const scheme of schemes) {
  const tail = tails[scheme];
  for (const s of caseMix(scheme)) {
    payloads.add(`${s}:${tail}`);
    for (const p of pads) { payloads.add(`${p}${s}:${tail}`); payloads.add(`${s}:${tail}${p}`); }
    for (const i of inner) {
      for (let k = 1; k < s.length; k += 1) payloads.add(`${s.slice(0, k)}${i}${s.slice(k)}:${tail}`);
    }
    payloads.add(`${s}%3A${tail}`);
    payloads.add(`${s}：${tail}`);
    payloads.add(`https:${s}:${tail}`);
    payloads.add(`${s}:`);
  }
}
for (const extra of ['//evil.example/x', '\\\\evil.example\\x', '/\\evil.example', 'https:/\\evil.example', 'https:evil.example', '?q', '#h', '', ' ', 'https://a.b/\u0000', 'https://[::1]/', 'https://user:pw@a.b/', 'https://a.b:99999/', 'HTTPS:\\\\a.b']) payloads.add(extra);

let admitted = 0;
let refused = 0;
const defects = [];
const absoluteRefusals = [];
for (const href of payloads) {
  const verdict = engine.isAllowedLinkUrl(href);
  let resolved = null;
  let absolute = true;
  try { resolved = new URL(href, BASE).protocol; } catch { resolved = 'unparseable'; }
  try { new URL(href); } catch { absolute = false; }
  if (verdict) admitted += 1; else refused += 1;
  if (verdict && !ALLOWED.has(resolved)) defects.push({ href, resolved });
  if (!verdict && absolute && ALLOWED.has(resolved)) absoluteRefusals.push({ href, resolved });
}
console.log(JSON.stringify({ payloads: payloads.size, admitted, refused, defects, absoluteRefusals }, null, 1));
process.exit(defects.length === 0 && absoluteRefusals.length === 0 ? 0 : 1);
