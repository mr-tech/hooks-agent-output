// Reviewer's probe, not a suite file: the link allow-list attacked at the rendered anchor, website e58f2ed (M4 round).
// Placed for a run at src/utils/markdown/__tests__/crprobe.anchor-attack.test.tsx in a `git archive` export only, and run with
//   ANCHOR_OUT=<file> [ANCHOR_SURFACE=<one key>] npx vitest run --project dom src/utils/markdown/__tests__/crprobe.anchor-attack.test.tsx   (under unshare -rn)
// Entry point: the production static parsers (`markdown.static.*` of utils/markdown/index.tsx), all six, with the parser state the
// preview passes. Input class: the M2 payload set (15 schemes x 3 casings, C0/space/DEL/NBSP/BOM/U+2028/U+3000 padding either side,
// tab/LF/CR/NUL/space/soft hyphen/ZWSP inside the scheme, %3A, fullwidth colon, https: nesting, scheme-only, 14 relative or authority
// oddities), each wrapped in five link syntaxes: [l](P), [l](<P>), [l](P "t"), <P>, and P bare after a space.
// Oracle: for every <a> in the rendered markup, the scheme a browser navigates is new URL(rawHref, BASE).protocol, where rawHref is
// the attribute as the HTML parser decodes it (DOMParser over the markup). A defect is an anchor whose resolved scheme is outside the
// list, or an anchor carrying an attribute other than href and title. Positive control: [l](https://a.b/) yields one anchor on
// every surface.
// Blind spot: an anchor a later client-side transform adds (none exists in M4's renderer), and navigation by a non-anchor element.
import { writeFileSync } from 'node:fs';
import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeAll, expect, it, vi } from 'vitest';

import { startEngine } from '../engine';
import markdown from '../index';

import type { ReactNode } from 'react';

vi.mock('~/env.mjs', () => ({ env: { NEXT_PUBLIC_DISCORD_CLIENT_ID: 'test' } }));

const ALLOWED = new Set(['http:', 'https:', 'mailto:', 'discord:', 'tel:', 'sms:']);
const BASE = 'https://hooks.example/message/m/1/edit';
const schemes = ['javascript', 'data', 'vbscript', 'file', 'blob', 'about', 'dev', 'ftp', 'ws', 'http', 'https', 'mailto', 'tel', 'sms', 'discord'];
const tails: Record<string, string> = { javascript: 'alert(1)', data: 'text/html,x', vbscript: 'x', file: '///etc/passwd', blob: 'https://a.b/x', about: 'blank', dev: '//branch/main', ftp: '//a.b/', ws: '//a.b/', http: '//a.b/', https: '//a.b/', mailto: 'a@b.c', tel: '+15550100', sms: '+15550100', discord: '//-/channels/1/2' };
const pads: string[] = [];
for (let c = 0; c <= 0x20; c += 1) pads.push(String.fromCharCode(c));
pads.push('\x7f', ' ', '﻿', ' ', '　');
const inner = ['\t', '\n', '\r', '\x00', ' ', '­', '​'];
const caseMix = (s: string) => [s, s.toUpperCase(), [...s].map((ch, i) => (i % 2 ? ch.toUpperCase() : ch)).join('')];
const payloads = new Set<string>();
for (const scheme of schemes) {
  const tail = tails[scheme]!;
  for (const s of caseMix(scheme)) {
    payloads.add(`${s}:${tail}`);
    for (const p of pads) { payloads.add(`${p}${s}:${tail}`); payloads.add(`${s}:${tail}${p}`); }
    for (const i of inner) for (let k = 1; k < s.length; k += 1) payloads.add(`${s.slice(0, k)}${i}${s.slice(k)}:${tail}`);
    payloads.add(`${s}%3A${tail}`);
    payloads.add(`${s}：${tail}`);
    payloads.add(`https:${s}:${tail}`);
    payloads.add(`${s}:`);
  }
}
for (const extra of ['//evil.example/x', '\\\\evil.example\\x', '/\\evil.example', 'https:/\\evil.example', 'https:evil.example', '?q', '#h', '', ' ', 'https://a.b/\u0000', 'https://[::1]/', 'https://user:pw@a.b/', 'https://a.b:99999/', 'HTTPS:\\\\a.b']) payloads.add(extra);

const forms: Record<string, (p: string) => string> = {
  masked: (p) => `[l](${p})`,
  maskedAngle: (p) => `[l](<${p}>)`,
  maskedTitle: (p) => `[l](${p} "t")`,
  autolink: (p) => `<${p}>`,
  bare: (p) => `x ${p}`,
};
const ALL_SURFACES = ['parseContent', 'parseEmbedDescription', 'parseEmbedTitle', 'parseEmbedTitleWithUrl', 'parseEmbedField', 'parseTextDisplay'];
// One surface per run (ANCHOR_SURFACE), so each shard fits its own time cap; unset runs all six.
const surfaces = process.env.ANCHOR_SURFACE ? [process.env.ANCHOR_SURFACE] : ALL_SURFACES;

beforeAll(async () => { await startEngine(); });

it('probe', () => {
  const parser = new DOMParser();
  const anchorsOf = (markup: string) => [...parser.parseFromString(`<body>${markup}</body>`, 'text/html').querySelectorAll('a')];
  const statics = markdown.static as unknown as Record<string, (s: string, st: object) => ReactNode>;
  const draw = (surface: string, text: string) => renderToStaticMarkup(createElement(Fragment, null, statics[surface]!(text, { mounted: false, isEmbed: false })));
  const control = Object.fromEntries(surfaces.map((s) => [s, anchorsOf(draw(s, '[l](https://a.b/)')).length]));
  let renders = 0;
  let anchors = 0;
  const byForm: Record<string, number> = {};
  const schemesSeen: Record<string, number> = {};
  const defects: unknown[] = [];
  const extraAttributes: unknown[] = [];
  for (const surface of surfaces) {
    for (const [form, wrap] of Object.entries(forms)) {
      for (const p of payloads) {
        const text = wrap(p);
        renders += 1;
        for (const a of anchorsOf(draw(surface, text))) {
          anchors += 1;
          byForm[form] = (byForm[form] ?? 0) + 1;
          const raw = a.getAttribute('href') ?? '';
          let scheme: string;
          try { scheme = new URL(raw, BASE).protocol; } catch { scheme = 'unparseable'; }
          schemesSeen[scheme] = (schemesSeen[scheme] ?? 0) + 1;
          if (!ALLOWED.has(scheme)) defects.push({ surface, form, text, raw, scheme });
          const names = a.getAttributeNames().filter((n) => n !== 'href' && n !== 'title');
          if (names.length) extraAttributes.push({ surface, form, text, names });
        }
      }
    }
  }
  const out = { payloads: payloads.size, renders, anchors, byForm, schemesSeen, control, defects: defects.slice(0, 50), defectCount: defects.length, extraAttributes: extraAttributes.slice(0, 20), extraAttributeCount: extraAttributes.length };
  writeFileSync(process.env.ANCHOR_OUT!, JSON.stringify(out, null, 1));
  expect(true).toBe(true);
}, 600_000);
