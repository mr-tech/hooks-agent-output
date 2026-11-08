// Preload for drift.cjs (node -r). Wraps puppeteer's launch on first require and reports the call count to the parent
// over IPC every 250 ms, with the
// live pool's pending (waiting acquires) and size from build/getPool.js getExistingPool. Counts calls, not outcomes; drift.cjs cross-checks against stderr failure lines.
const Module = require('module');
const origLoad = Module._load;
let n = 0; let wrapped = false;
Module._load = function load(request, ...rest) {
  const m = origLoad.call(this, request, ...rest);
  if (request === 'puppeteer' && !wrapped) {
    wrapped = true;
    const target = m.default && m.default.launch ? m.default : m;
    const orig = target.launch.bind(target);
    target.launch = (...a) => { n += 1; return orig(...a); };
    if (m.launch && m !== target) m.launch = target.launch;
  }
  return m;
};
const path = require('path');
const poolState = () => {
  try {
    const p = require(path.resolve('build/getPool.js')).getExistingPool();
    return p ? { pending: p.pending, size: p.size } : { pending: null, size: null };
  } catch (e) { return { pending: `err:${e.message}`, size: null }; }
};
setInterval(() => { if (process.send) process.send({ launches: n, ...poolState(), t: Date.now() }); }, 250).unref();
