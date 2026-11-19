async (page) => { const B = page.context().pages()[1];
  const cap = await B.evaluate(() => JSON.parse(JSON.stringify(window.__cap)));
  await page.request.post('http://127.0.0.1:3999/X-synth2-B-cap.json', { data: JSON.stringify({ cap, log: B.__log }, null, 1) });
  const n = cap.ui.filter(e => e[1].some(d => /Message Update Detected/.test(d))).slice(-1);
  await B.reload(); await B.waitForTimeout(3000);
  return { lastNoticeInB: n, bCap: await B.evaluate(() => !!window.__cap) };
}
