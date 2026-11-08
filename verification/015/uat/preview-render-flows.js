// B-5 (M6-a) and the M2/M6 render flows that /preview shows without sign-in. Each case: the data,
// then the reads. Run at the tip and at 7ce866b (base) to see each read discriminate.
async (page) => {
  const s = n => 'a'.repeat(n);
  const cases = {
    codeBlockContent: { content: '```\nline one\nline two\n```' },
    codeBlockField: { embeds: [{ fields: [{ name: 'f', value: '```\nline one\nline two\n```' }] }] },
    author256: { embeds: [{ author: { name: s(256) }, description: 'x' }] },
    author257: { embeds: [{ author: { name: s(257) }, description: 'x' }] },
    title256: { embeds: [{ title: s(256) }] },
    title257: { embeds: [{ title: s(257) }] },
    footer2048: { embeds: [{ footer: { text: s(2048) }, description: 'x' }] },
    footer2049: { embeds: [{ footer: { text: s(2049) }, description: 'x' }] },
    emptyEmbed: { content: 'c', embeds: [{}] },
    oneEmbed: { content: 'c', embeds: [{ description: 'x' }] },
    emoji: { content: 'A 👍🏽 B 👨‍👩‍👧 C' },
    blackEmbed: { embeds: [{ description: 'black', color: 0 }] },
  };
  const out = {};
  for (const [name, data] of Object.entries(cases)) {
    await page.goto('http://127.0.0.1:3000/preview?data=' + encodeURIComponent(JSON.stringify(data)));
    await page.waitForTimeout(2500);
    out[name] = await page.evaluate(() => {
      const t = document.body.innerText;
      const errs = Array.from(document.querySelectorAll('.text-error')).map(e => e.textContent.trim()).filter(Boolean);
      const pres = Array.from(document.querySelectorAll('pre, pre code')).map(e => e.textContent.trim().slice(0, 40));
      const embeds = document.querySelectorAll('article').length;
      const emojiImgs = Array.from(document.querySelectorAll('img')).filter(i => /emoji|twemoji|svg/i.test(i.className + ' ' + i.src) && i.alt).map(i => i.alt);
      const art = document.querySelector('article');
      const bar = art ? getComputedStyle(art).borderLeftColor : null;
      return { errs, pres, embeds, emojiImgs, rawBackticks: t.includes('```'), bar, invalid: t.includes('Invalid message data.') };
    });
  }
  return out;
}
