const puppeteer = require(process.argv[2]); const zlib = require('zlib'); const fs = require('fs');
(async () => {
  const b = await puppeteer.launch({ executablePath: process.argv[3], headless: 'new', args: ['--no-sandbox'] });
  const base = process.argv[4];
  const msg = encodeURIComponent(JSON.stringify({ content: '**bold** [masked](https://example.com) ||spoiler||', embeds: [] }));
  const out = {};
  for (const [name, path] of [['preview', `/preview?data=${msg}`], ['editor', '/message/m/new']]) {
    const ctx = await b.createIncognitoBrowserContext(); const page = await ctx.newPage(); const rows = [];
    page.on('response', async (r) => { const u = r.url(); if (u.includes('/_next/static/') && u.endsWith('.js')) { try { const buf = await r.buffer(); rows.push({ url: u.replace(base, ''), raw: buf.length, gzip: zlib.gzipSync(buf, { level: 6 }).length, spike: buf.toString().includes('md-engine-ready') }); } catch {} } });
    await page.goto(base + path, { waitUntil: 'networkidle0', timeout: 60000 }); await ctx.close(); out[name] = rows;
  }
  await b.close(); fs.writeFileSync(process.argv[5], JSON.stringify(out, null, 1));
  for (const k of Object.keys(out)) console.log(k, 'files', out[k].length, 'raw', out[k].reduce((a, x) => a + x.raw, 0), 'gzip', out[k].reduce((a, x) => a + x.gzip, 0), 'spike chunks', JSON.stringify(out[k].filter(x => x.spike)));
})();
