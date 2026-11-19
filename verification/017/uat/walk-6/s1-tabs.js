async (page) => {
  const ctx = page.context();
  const A = page;
  const B = await ctx.newPage();
  A.__log = [];
  A.__crashes = [];
  A.on('pageerror', e => A.__log.push([new Date().toISOString(), 'pageerror', String(e).slice(0,300)]));
  A.on('console', m => { if (m.type()==='error') A.__log.push([new Date().toISOString(), 'console.error', m.text().slice(0,300)]); });
  B.__log = [];
  B.on('pageerror', e => B.__log.push([new Date().toISOString(), 'pageerror', String(e).slice(0,300)]));
  await B.goto('http://127.0.0.1:3000/message/m/900000000000001/edit');
  await B.waitForTimeout(3000);
  let fsOk; try { const fs = await import('fs'); fsOk = typeof fs.writeFileSync; } catch (e) { fsOk = 'ERR ' + e; }
  return {pages: ctx.pages().length, aCap: await A.evaluate(()=>!!window.__cap && Object.keys(window.__cap)), bCap: await B.evaluate(()=>!!window.__cap && Object.keys(window.__cap)), aUrl: A.url(), bUrl: B.url(), fsOk, aFrames: await A.evaluate(()=>window.__cap.frames.length), aUps: await A.evaluate(()=>window.__cap.upserts)};
}
