async (page) => {
  const cases = [{"id": 141, "text": "> q"}, {"id": 146, "text": ">>>a"}, {"id": 151, "text": ">  two spaces"}, {"id": 152, "text": " > leading space"}, {"id": 157, "text": "> "}, {"id": 158, "text": ">>> "}, {"id": 161, "text": "- a"}, {"id": 169, "text": "- a\n  - b"}, {"id": 177, "text": "1. a\n- b"}, {"id": 178, "text": "- # head"}, {"id": 186, "text": "<t:1700000000>"}, {"id": 189, "text": "<t:1700000000:x>"}, {"id": 191, "text": "<t:99999999999999999>"}, {"id": 193, "text": "<t:1700000000:s>"}, {"id": 198, "text": "<@123456789012345678>"}, {"id": 203, "text": "@here"}, {"id": 208, "text": "**<@123456789012345678>**"}, {"id": 214, "text": "@silent hi"}, {"id": 215, "text": "<:name:123456789012345678>"}, {"id": 220, "text": "👍🏽"}, {"id": 225, "text": "\\:smile:"}, {"id": 232, "text": "\\*a\\*"}, {"id": 233, "text": "\\**a**"}, {"id": 239, "text": "\\||sp\\||"}, {"id": 245, "text": "[t\\](https://example.com)"}, {"id": 246, "text": "\\https://example.com"}, {"id": 252, "text": "a\nb"}, {"id": 255, "text": "a  \nb"}, {"id": 258, "text": "# h\ntext\n- a\n> q\n-# s"}, {"id": 259, "text": "**# not head**"}, {"id": 260, "text": "*- not list*"}, {"id": 261, "text": "||> q||"}, {"id": 266, "text": "***a** b*"}, {"id": 272, "text": "\t\ttabs"}, {"id": "x1", "text": "```js\nlet a = 1;\n```"}, {"id": "x2", "text": "[text](https://example.com \"title\")"}, {"id": "x3", "text": "> a\n> b"}, {"id": "x4", "text": "1. a\n2. b"}, {"id": "x5", "text": ":smile:"}, {"id": "x6", "text": "<#1574358729577599086>"}, {"id": "x7", "text": "@everyone"}];
  const ed = page.locator('[data-slate-editor="true"][role="textbox"]').first();
  await ed.click();
  const empty = async () => (await ed.evaluate(e => e.querySelectorAll('[data-slate-node="element"]').length <= 1 && [...e.querySelectorAll('[data-slate-string]')].map(s => s.textContent).join('') === '' && !e.querySelector('[data-slate-void], [data-slate-inline]')));
  const clear = async () => { for (let i = 0; i < 30 && !(await empty()); i++) { await page.keyboard.press('Control+A'); await page.keyboard.press('Backspace'); await page.keyboard.press('Delete'); await page.waitForTimeout(80); } return empty(); };
  const out = [];
  for (const c of cases) {
    const cleared = await clear();
    if (!cleared) { out.push({id: c.id, error: 'not cleared'}); continue; }
    await page.keyboard.insertText(c.text);
    await page.waitForTimeout(350);
    const lines = await ed.evaluate(e => {
      const strip = s => (s || '').split(/\s+/).filter(Boolean).map(k => k.replace(/_[A-Za-z0-9_-]{6}$/, '_'));
      const walk = (n) => {
        const items = [];
        for (const k of n.children) {
          if (k.matches('[data-slate-leaf]')) { const z = k.querySelector('[data-slate-zero-width]'); items.push({cls: strip(k.className), text: z ? '' : k.textContent}); }
          else if (k.matches('[data-slate-inline], [data-slate-void]')) items.push({inline: strip(k.className), aria: k.getAttribute('aria-label'), text: k.textContent.slice(0, 60), img: (k.querySelector('img') || {}).alt});
          else if (k.matches('[data-slate-node="text"]')) items.push(...walk(k));
          else if (k.matches('[data-slate-node="element"]')) items.push({el: strip(k.className), kids: walk(k)});
          else items.push(...walk(k));
        }
        return items;
      };
      return [...e.children].filter(l => l.matches('[data-slate-node="element"]')).map(l => ({cls: strip(l.className), tag: l.tagName, items: walk(l)}));
    });
    out.push({id: c.id, text: c.text, lines});
  }
  const final = await clear();
  await page.evaluate(o => { window.__tb = o; }, {final, out});
  return {final, n: out.length, errors: out.filter(o => o.error).length};
}