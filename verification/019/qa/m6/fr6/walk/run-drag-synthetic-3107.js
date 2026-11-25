async (page) => {
// QA M6 Fix Round 6, code review Round 9's Assumption Not Checked: a browser drag-and-drop move of the backtick ending line 0
// into a run past a code block, in the first embed description, with every editor.apply logged (top-level move_node named).
// Text: 'a🙂`', 98 x 'a🙂', 'a🙂`', '```', 'code', '```', 'z' (the shape of crprobe.offselection-inline's delete/other-unit row
// at N 100). Expected after the drop: no page error, the backtick at the end of 'z', line 0 'a🙂' holding its emoji image, and
// every 'a🙂' line still an emoji line (images: 100 before and after).
const W = '/usr/local/bin/hooks/agent-output/verification/019/qa/m6/fr6/walk/';
const ORIGIN = 'http://127.0.0.1:3107';
const errs = []; page.on('pageerror', (e) => errs.push('pageerror: ' + String(e.message || e).slice(0, 300)));
page.on('console', (m) => { if (m.type() === 'error') errs.push('console.error: ' + m.text().slice(0, 300)); });
const out = { case: 'drag', origin: ORIGIN };
const ed = () => page.locator('[data-slate-editor="true"]').first();
if (!(await page.locator('[data-slate-editor="true"]').count())) {
  const art = page.locator('article.discord-visualizer__embed-wrapper').first();
  const t = await art.locator('button').evaluateAll((bs) => bs.map((b) => b.innerText.length));
  await art.locator('button').nth(t.indexOf(Math.max(...t))).click(); await page.waitForTimeout(1000);
}
const lines = ['a🙂`', ...Array(98).fill('a🙂'), 'a🙂`', '```', 'code', '```', 'z'];
await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: ORIGIN });
await ed().click(); await page.waitForTimeout(500);
await page.keyboard.press('Control+a'); await page.keyboard.press('Delete'); await page.waitForTimeout(800);
await page.evaluate((t) => navigator.clipboard.writeText(t), lines.join('\n'));
await page.keyboard.press('Control+v'); await page.waitForTimeout(4000);
out.linesBefore = await ed().evaluate((e) => e.children.length);
out.imagesBefore = await ed().evaluate((e) => e.querySelectorAll('img').length);
out.errsPaste = errs.splice(0);
// the Slate editor object, from the React fiber of the editable element: wrap apply to log every operation
out.applyHooked = await ed().evaluate((el) => {
  const key = Object.keys(el).find((k) => k.startsWith('__reactFiber$')); let f = key ? el[key] : null; let editor = null;
  while (f && !editor) { const p = f.memoizedProps; if (p && p.editor && typeof p.editor.apply === 'function') editor = p.editor; f = f.return; }
  if (!editor) return false;
  window.__qaOps = []; const { apply } = editor;
  editor.apply = (op) => { window.__qaOps.push({ type: op.type, path: op.path, newPath: op.newPath }); apply(op); };
  window.__qaEditor = editor; return true;
});
// select the backtick at the end of line 0, then drag it to the end of 'z' (the run unit after the code block)
await ed().click(); await page.keyboard.press('Control+Home'); await page.keyboard.press('End'); await page.keyboard.press('Shift+ArrowLeft');
await page.waitForTimeout(500);
out.selectedText = await page.evaluate(() => String(window.getSelection()));
const from = await page.evaluate(() => { const r = window.getSelection().getRangeAt(0).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const zLine = ed().locator(':scope > *').last(); await zLine.scrollIntoViewIfNeeded();
const fromNow = await page.evaluate(() => { const r = window.getSelection().getRangeAt(0).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
const zBox = await zLine.boundingBox();
out.dragFrom = fromNow; out.dragTo = { x: zBox.x + zBox.width - 2, y: zBox.y + zBox.height / 2 };
// line 0 may be scrolled away: scroll it back, take its coordinates, then move through the editor with the button held
await ed().locator(':scope > *').first().scrollIntoViewIfNeeded();
const start = await page.evaluate(() => { const r = window.getSelection().getRangeAt(0).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
// the drag as the DOM events slate-react's Editable handles (dragstart on the selection, dragover and drop at the target's
// coordinates, one DataTransfer), since a native mouse drag did not start one in the first walk
const zBox2 = await zLine.boundingBox();
out.dropAt = { x: zBox2.x + zBox2.width - 2, y: zBox2.y + zBox2.height / 2 };
out.dragDispatch = await page.evaluate(async ({ start, to }) => {
  const dt = new DataTransfer(); const sel = window.getSelection(); const src = sel.anchorNode.parentElement;
  const fire = (el, type, x, y) => el.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, dataTransfer: dt }));
  const r = [fire(src, 'dragstart', start.x, start.y)];
  document.querySelector('[data-slate-editor="true"]').lastElementChild.scrollIntoView({ block: 'center' });
  await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
  const z = document.querySelector('[data-slate-editor="true"]').lastElementChild.getBoundingClientRect();
  const x = z.right - 2; const y = z.top + z.height / 2; const target = document.elementFromPoint(x, y);
  r.push(fire(target, 'dragenter', x, y), fire(target, 'dragover', x, y), fire(target, 'drop', x, y), fire(src, 'dragend', x, y));
  return { notCancelled: r, types: [...dt.types], target: target && target.tagName };
}, { start, to: out.dropAt });
await page.waitForTimeout(2500);
out.ops = await page.evaluate(() => window.__qaOps || null);
out.topLevelMoveNodes = (out.ops || []).filter((o) => o.type === 'move_node' && o.path && o.path.length === 1).length;
out.opTypes = (out.ops || []).reduce((a, o) => { a[o.type] = (a[o.type] || 0) + 1; return a; }, {});
out.errsDrag = errs.splice(0);
out.linesAfter = await ed().evaluate((e) => e.children.length);
out.imagesAfter = await ed().evaluate((e) => e.querySelectorAll('img').length);
out.line0After = await ed().evaluate((e) => e.children[0].innerText);
out.lastLinesAfter = await ed().evaluate((e) => [...e.children].slice(-4).map((x) => x.innerText));
out.textLinesWithRawEmoji = await ed().evaluate((e) => [...e.children].filter((x) => x.innerText.includes('🙂') && !x.querySelector('img')).length);
await page.screenshot({ path: W + 'drag-synthetic-after-' + ORIGIN.slice(-4) + '.png' });
return out;
}
