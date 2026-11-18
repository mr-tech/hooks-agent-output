// Init script for the post-deploy look (uat-fix-dialog-closes-on-first-portal-load, 2026-11-18).
// Injected with page.addInitScript BEFORE the fresh navigation, so it runs in the new page's life.
// Records into window.__uatLog (array of {t, kind, detail}), t = ms since navigation start:
//   loading-dots  : an <svg viewBox="0 0 100 100"> carrying a <circle fill="#a21caf"> enters the DOM
//                   or becomes visible (the app's LoadingDots).
//   hidden-important : an element gains an inline style "display: none !important" (React's way of
//                   hiding a suspended boundary's host nodes).
//   dialog-open / dialog-gone : an element with role="dialog" appears / leaves or loses its box.
//   floating-portal : a [data-floating-ui-portal] node appears.
// Read back with:  () => JSON.stringify(window.__uatLog)
(() => {
  const log = (window.__uatLog = []);
  const t = () => Math.round(performance.now());
  const push = (kind, detail) => log.push({ t: t(), kind, detail: String(detail || '').slice(0, 160) });
  const isDots = (el) => el instanceof SVGSVGElement && el.getAttribute('viewBox') === '0 0 100 100'
    && !!el.querySelector('circle[fill="#a21caf"]');
  const seenDialogs = new Set();
  const scan = (root) => {
    if (!(root instanceof Element)) return;
    const all = [root, ...root.querySelectorAll('*')];
    for (const el of all) {
      if (isDots(el)) push('loading-dots', el.parentElement ? el.parentElement.className : '');
      if (el.getAttribute && el.getAttribute('role') === 'dialog' && !seenDialogs.has(el)) {
        seenDialogs.add(el); push('dialog-open', (el.textContent || '').slice(0, 80));
      }
      if (el.hasAttribute && el.hasAttribute('data-floating-ui-portal')) push('floating-portal', '');
    }
  };
  const start = () => {
    scan(document.documentElement);
    new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(scan);
          m.removedNodes.forEach((n) => {
            if (n instanceof Element) {
              for (const d of [n, ...n.querySelectorAll('[role="dialog"]')]) {
                if (seenDialogs.has(d)) { seenDialogs.delete(d); push('dialog-gone', 'removed'); }
              }
            }
          });
        } else if (m.type === 'attributes' && m.attributeName === 'style') {
          const s = m.target.getAttribute('style') || '';
          if (/display:\s*none\s*!important/.test(s)) push('hidden-important', `${m.target.tagName}.${m.target.className}`);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
    // A dialog that loses its box without leaving the DOM (useOnDisappear's zero rect).
    setInterval(() => {
      for (const d of seenDialogs) {
        const r = d.getBoundingClientRect();
        if (r.width === 0 && r.height === 0 && !d.__uatZero) { d.__uatZero = true; push('dialog-zero-rect', ''); }
      }
    }, 50);
  };
  if (document.documentElement) start(); else document.addEventListener('DOMContentLoaded', start);
})();
