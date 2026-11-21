// leave-prompt-and-field-probe.js — the QA stage's own look after the browser-walker's table (2026-11-21, ~11:23Z).
// Run through the Playwright MCP `browser_run_code_unsafe` as inline `code` (the tool's `filename` form refuses paths
// outside its roots; the inline form is disclosed in qa/fix-desktop-draft-as-typed-qa.md). Typing and reload only; no Save.
// Each run starts with the login panel dismissed ("I'll do it later") at route 0, `/message/m/0/edit`.
//
// Instrument: the real `beforeunload` dialog the reload raises. The Playwright MCP surfaces it as a modal state
// (`["beforeunload" dialog ...]`) on the run's result; a run returning its string means no dialog blocked the reload.
// WITHDRAWN instrument: a synthetic `new Event('beforeunload', {cancelable:true})` dispatched in-page read
// `defaultPrevented` false on every reading, including where the real dialog fired — it failed its positive control
// and nothing is read from it.

// Run A — FIX (http://127.0.0.1:3100): open the field name "Familiar Tools", type " QA three", reload with the editor open.
async (page) => {
  const URL = 'http://127.0.0.1:3100/message/m/0/edit';
  await page.locator('button:has-text("Familiar Tools")').first().click(); await page.waitForTimeout(700);
  await page.keyboard.press('Control+End');
  for (const k of ' QA three') await page.keyboard.press(k === ' ' ? 'Space' : k);
  await page.waitForTimeout(400);
  await page.goto(URL); await page.waitForTimeout(2500);   // FIX: a beforeunload modal state appeared here; accepted
  // then, by browser_evaluate on the fresh load: the field button's text tail and whether messageDrafts holds the text
};

// Run B — BASE (http://127.0.0.1:3101): same typing, reload with the editor open (negative direction).
async (page) => {
  const O = 'http://127.0.0.1:3101';
  await page.goto(O + '/message/m/0/edit'); await page.waitForTimeout(2500);
  await page.evaluate(() => { localStorage.removeItem('messageDrafts'); localStorage.removeItem('message'); });
  await page.reload(); await page.waitForTimeout(2500);
  const b = page.getByRole('button', { name: "I'll do it later" });
  if (await b.count() && await b.first().isVisible()) await b.first().click();
  await page.locator('button:has-text("Familiar Tools")').first().click(); await page.waitForTimeout(700);
  await page.keyboard.press('Control+End');
  for (const k of ' QA three') await page.keyboard.press(k === ' ' ? 'Space' : k);
  await page.waitForTimeout(400);
  const tail = await page.evaluate(() => document.activeElement.innerText.slice(-25));
  await page.goto(O + '/message/m/0/edit'); await page.waitForTimeout(2500);
  const field = await page.evaluate(() => { const b=[...document.querySelectorAll('button')].find(b=>b.innerText.includes('Familiar Tools')); return b && b.innerText.slice(-30); });
  return JSON.stringify({ base_typing_tail: tail, base_field_after_reload: field, note: 'reached here = no dialog blocked the reload' });
};

// Run C — BASE, positive control for the dialog instrument: type " QA five" in the field name, click away (base commits
// on close), reload. Expected: a beforeunload modal state.
async (page) => {
  const O = 'http://127.0.0.1:3101';
  await page.locator('button:has-text("Familiar Tools")').first().click(); await page.waitForTimeout(700);
  await page.keyboard.press('Control+End');
  for (const k of ' QA five') await page.keyboard.press(k === ' ' ? 'Space' : k);
  await page.mouse.click(1400, 600); await page.waitForTimeout(600);
  await page.goto(O + '/message/m/0/edit'); await page.waitForTimeout(2500);
  return 'reached here = no dialog blocked the reload';
};
