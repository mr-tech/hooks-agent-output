// Loaded into the generator under test through NODE_OPTIONS=--require. For a render whose message asks for a mode a stub page cannot
// induce, it makes page.screenshot reject ("screenshot"), page.goto resolve null ("goto-null") or resolve a response whose status is 199
// ("goto-199", a status below 200 that Chrome never hands to puppeteer). While the file named by SHIM_VIEWPORT_FAIL exists,
// page.setViewport rejects: a failure of the render's setup, outside the four classes. Everything else passes through.
const { CDPPage } = require('puppeteer-core');

const original = CDPPage.prototype.screenshot;
CDPPage.prototype.screenshot = function screenshot(...args) {
  if (decodeURIComponent(this.url()).includes('"mode":"screenshot"')) return Promise.reject(new Error('shim: screenshot rejected'));
  return original.apply(this, args);
};

const originalGoto = CDPPage.prototype.goto;
CDPPage.prototype.goto = function goto(url, ...rest) {
  const decoded = decodeURIComponent(String(url));
  if (decoded.includes('"mode":"goto-null"')) return Promise.resolve(null);
  if (decoded.includes('"mode":"goto-199"')) return Promise.resolve({ status: () => 199 });
  return originalGoto.call(this, url, ...rest);
};

const { existsSync } = require('fs');

const originalSetViewport = CDPPage.prototype.setViewport;
CDPPage.prototype.setViewport = function setViewport(...args) {
  if (process.env.SHIM_VIEWPORT_FAIL && existsSync(process.env.SHIM_VIEWPORT_FAIL)) return Promise.reject(new Error('shim: setViewport rejected'));
  return originalSetViewport.apply(this, args);
};
