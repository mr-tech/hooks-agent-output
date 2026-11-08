// Real Chrome, fresh context: does the page instance under app/message/f/[id] survive a client navigation f/111 -> f/222?
// Instrument: DOM element identity. Mark elements, navigate, read isConnected on the held references.
//  - outside = an element of the shared layout (Navigation): must stay connected (positive control for "not remounted").
//  - inside  = the page's own root element: connected after f/111?x=1 (same segment, control) and after f/222 (the question).
const { chromium } = require('/home/dev/.npm/_npx/314abffa6aaf2cd1/node_modules/playwright-core');
const OUT = process.env.OUT;
const BASE = `http://127.0.0.1:${process.env.PORT}`;
(async () => {
  const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  const ctx = await b.newContext({ viewport: { width: 1400, height: 1000 } });
  const p = await ctx.newPage();
  const log = [];
  p.on('pageerror', (e) => log.push('pageerror ' + e.message.slice(0, 200)));
  await p.goto(`${BASE}/message/f/111`, { waitUntil: 'load', timeout: 180000 });
  await p.waitForTimeout(5000);
  const outline = await p.evaluate(() => {
    const rows = [];
    const walk = (el, d) => {
      if (d > 5) return;
      rows.push(`${'  '.repeat(d)}${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/).slice(0, 2).join('.') : ''} children=${el.children.length}`);
      [...el.children].slice(0, 8).forEach((c) => walk(c, d + 1));
    };
    walk(document.querySelector('main') ?? document.body, 0);
    return rows.join('\n');
  });
  console.log('outline of main at /message/f/111:\n' + outline);
  console.log('path now:', await p.evaluate(() => location.pathname));
  console.log('window.next.router present:', await p.evaluate(() => typeof window.next?.router?.push));
  const mark = await p.evaluate(() => {
    const main = document.querySelector('main');
    const kids = [...main.children];
    // main's children: Navigation output first, then the page output (Redirects renders nothing).
    window.__outside = kids[0];
    window.__inside = kids[kids.length - 1];
    window.__marks = { outsideTag: window.__outside?.tagName, insideTag: window.__inside?.tagName, kids: kids.length,
      same: window.__outside === window.__inside };
    return window.__marks;
  });
  console.log('marks', JSON.stringify(mark));
  const state = () => p.evaluate(() => ({ path: location.pathname, outside: window.__outside?.isConnected, inside: window.__inside?.isConnected }));
  console.log('before', JSON.stringify(await state()));
  await p.evaluate(() => window.next.router.push('/message/f/111?x=1'));
  await p.waitForTimeout(3000);
  console.log('after push f/111?x=1 (same segment, control)', JSON.stringify(await state()));
  await p.evaluate(() => window.next.router.push('/message/f/222'));
  await p.waitForTimeout(8000);
  console.log('after push f/222', JSON.stringify(await state()));
  await p.screenshot({ path: `${OUT}/folder-222.png` });
  console.log('log', JSON.stringify(log));
  await b.close();
})();
