// B-1 (M1-a, limb 1): signed in as the test account, open /message and read whether the message list loads.
// Signs in through Discord OAuth when no session exists (Authorize on the consent page, the test account only).
// Reads: session presence, the guild-admin count the site itself reports, the page text, and the API responses.
async (page) => {
  const out = {};
  const session = async () => { await page.waitForLoadState('networkidle').catch(() => {}); await page.waitForTimeout(1000); return page.evaluate(async () => { const j = await fetch('/api/auth/session').then(r => r.json()); return !!(j && j.user); }); };
  await page.goto('http://127.0.0.1:3000/message'); await page.waitForTimeout(5000);
  if (!(await session())) {
    const login = page.getByRole('button', { name: 'Log in', exact: true }).last();
    if (!(await login.isVisible().catch(() => false))) { await page.getByRole('button', { name: 'login' }).click(); await page.waitForTimeout(600); }
    await page.getByRole('button', { name: 'Log in', exact: true }).last().click();
    await page.waitForURL(/discord\.com/, { timeout: 30000 });
    await page.waitForTimeout(3000);
    const t = await page.evaluate(() => document.body.innerText);
    out.consentPage = /Authorize access|wants to access your Discord account/.test(t);
    out.challenge = /captcha|Are you human|Log in|Welcome back/i.test(t) && !out.consentPage;
    if (out.challenge) return out;
    await page.getByRole('button', { name: 'Authorize' }).click();
    await page.waitForURL(/127\.0\.0\.1:3000/, { timeout: 30000 });
    await page.waitForTimeout(5000);
    out.returnedTo = page.url().replace(/(code|state)=[^&]+/g, '$1=REDACTED');
  }
  out.signedIn = await session();
  const resp = [];
  const h = r => { if (/\/api\/trpc\//.test(r.url())) resp.push(r.url().split('/api/trpc/')[1].split('?')[0] + ' ' + r.status()); };
  page.on('response', h);
  await page.goto('http://127.0.0.1:3000/message/f/0'); await page.waitForTimeout(8000);
  page.off('response', h);
  out.url = page.url();
  out.trpc = resp;
  out.text = (await page.evaluate(() => document.body.innerText)).slice(0, 700);
  out.errorToasts = await page.evaluate(() => Array.from(document.querySelectorAll('[data-sonner-toast], .text-error')).map(e => e.textContent.trim()).filter(Boolean));
  return out;
}
