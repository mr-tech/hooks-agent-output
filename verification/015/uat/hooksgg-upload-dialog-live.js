// UAT-4 live check (owner ruling 20:12Z, "sign in live"): on production hooks.gg, signed in as the test account,
// "new message" → "Upload Message": does NewMessageModal open? Saves nothing; sends nothing. Runs in its own tab.
async (page) => {
  const p = await page.context().newPage();
  const out = {};
  const dialogs = () => p.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"]'))
    .filter(d => d.getClientRects().length).map(d => d.innerText).join(' | ').slice(0, 400));
  const session = async () => { await p.waitForLoadState('networkidle').catch(() => {}); await p.waitForTimeout(1000);
    return p.evaluate(async () => { const j = await fetch('/api/auth/session').then(r => r.json()).catch(() => ({})); return !!(j && j.user); }); };
  await p.goto('https://hooks.gg/message/f/0'); await p.waitForTimeout(6000);
  out.signedInBefore = await session();
  if (!out.signedInBefore) {
    const login = p.getByRole('button', { name: 'Log in', exact: true }).last();
    if (!(await login.isVisible().catch(() => false))) { await p.getByRole('button', { name: 'login' }).click(); await p.waitForTimeout(600); }
    await p.getByRole('button', { name: 'Log in', exact: true }).last().click();
    await p.waitForURL(/discord\.com/, { timeout: 30000 }); await p.waitForTimeout(3000);
    const t = await p.evaluate(() => document.body.innerText);
    out.consent = /Authorize access|wants to access your Discord account/.test(t);
    if (!out.consent || /Are you human/.test(t)) { out.stoppedAt = p.url().split('?')[0]; return out; }
    await p.getByRole('button', { name: 'Authorize' }).click();
    await p.waitForURL(/hooks\.gg/, { timeout: 30000 }); await p.waitForTimeout(5000);
    out.signedIn = await session();
    await p.goto('https://hooks.gg/message/f/0'); await p.waitForTimeout(6000);
  }
  out.url = p.url();
  await p.getByRole('button', { name: 'new message' }).click(); await p.waitForTimeout(1500);
  out.menu = await p.evaluate(() => Array.from(document.querySelectorAll('button')).filter(b => b.getClientRects().length).map(b => (b.getAttribute('aria-label') || b.innerText).trim().slice(0, 24)));
  await p.getByRole('button', { name: 'Upload Message' }).last().click(); await p.waitForTimeout(3500);
  out.afterUpload = await dialogs();
  await p.screenshot({ path: '/usr/local/bin/hooks/agent-output/verification/015/uat/hooksgg-upload-dialog.png' });
  await p.keyboard.press('Escape'); await p.waitForTimeout(500);
  await p.close();
  return out;
}
