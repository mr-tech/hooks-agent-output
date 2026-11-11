// Scripted run on the kept test-account Chrome profile (the stage browser), shown on DISPLAY=:0.
// Usage: DISPLAY=:0 node kept_profile_run.cjs <steps.cjs> <evidence dir> [playwright module dir]
// <steps.cjs> exports async (page, ctx, h) => result; h.shot(name), h.err(), h.log(...) are helpers.
// The runner writes <evidence dir>/<steps basename>.json with the result and the log, and closes the
// browser on every path. A Discord challenge or login page stops the run (the owner answers those).
const fs = require('fs');
const path = require('path');
const [, , stepsFile, evDir, pwDir] = process.argv;
const { chromium } = require(pwDir || 'playwright');
const PROFILE = '/home/dev/.cache/ms-playwright-mcp/mcp-chrome-313b550';

(async () => {
  fs.mkdirSync(evDir, { recursive: true });
  const name = path.basename(stepsFile, '.cjs');
  const log = [];
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    executablePath: '/usr/bin/google-chrome', headless: false, viewport: { width: 1350, height: 900 },
  });
  let result; let error = null;
  try {
    const page = ctx.pages()[0] || await ctx.newPage();
    const h = {
      log: (...a) => { const l = a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' '); log.push(`${new Date().toISOString()} ${l}`); console.log(l); },
      shot: (n) => page.screenshot({ path: path.join(evDir, `${n}.png`) }),
      err: () => page.evaluate(() => [...document.querySelectorAll('.text-error')].map((e) => e.textContent.trim())),
      guard: async () => {
        const u = page.url();
        const t = await page.evaluate(() => document.body.innerText.slice(0, 2000)).catch(() => '');
        if (/discord\.com\/login/.test(u) || /hcaptcha|Are you human|captcha/i.test(t)) throw new Error(`challenge-or-login at ${u}`);
      },
    };
    result = await require(path.resolve(stepsFile))(page, ctx, h);
  } catch (e) { error = String(e && e.stack || e); console.error(error); }
  finally {
    await ctx.close();
    fs.writeFileSync(path.join(evDir, `${name}.json`), JSON.stringify({ steps: name, result, error, log }, null, 1));
  }
  process.exit(error ? 1 : 0);
})();
