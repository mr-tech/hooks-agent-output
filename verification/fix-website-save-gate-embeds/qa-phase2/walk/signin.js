// Sign the test account in to the locally served build (127.0.0.1:3000) through Discord OAuth.
// Adapted from verification/015/uat/b01-signin-message-list.js. Clicks Authorize on the consent page
// only; on a challenge or a login page it returns without acting. The OAuth code and state are
// redacted from the returned URL.
async (page) => {
  const out = {};
  const session = async () => {
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1000);
    return page.evaluate(async () => {
      const j = await fetch('/api/auth/session').then((r) => r.json());
      return j && j.user ? { name: j.user.name ?? null, hasId: !!j.user.id } : null;
    });
  };
  await page.goto('http://127.0.0.1:3000/message');
  await page.waitForTimeout(5000);
  out.before = await session();
  if (!out.before) {
    const login = page.getByRole('button', { name: 'Log in', exact: true }).last();
    if (!(await login.isVisible().catch(() => false))) {
      await page.getByRole('button', { name: 'login' }).click();
      await page.waitForTimeout(600);
    }
    await page.getByRole('button', { name: 'Log in', exact: true }).last().click();
    await page.waitForURL(/discord\.com/, { timeout: 30000 });
    await page.waitForTimeout(3000);
    const t = await page.evaluate(() => document.body.innerText);
    out.consentPage = /Authorize access|wants to access your Discord account/.test(t);
    out.challenge = /captcha|Are you human|Log in|Welcome back/i.test(t) && !out.consentPage;
    if (out.challenge) { out.url = page.url().split('?')[0]; return out; }
    await page.getByRole('button', { name: 'Authorize' }).click();
    await page.waitForURL(/127\.0\.0\.1:3000/, { timeout: 30000 });
    await page.waitForTimeout(5000);
    out.returnedTo = page.url().replace(/(code|state)=[^&]+/g, '$1=REDACTED');
  }
  out.after = await session();
  return out;
}
