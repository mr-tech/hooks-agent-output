// UAT instrument for B-13 limbs 1-3 (plan 017 M8). Paste into the page (browser_evaluate / run_code) as one expression;
// it installs window.__rec. Reload in "Message Update Detected" awaits a network refetch, so if the same Enter also runs
// the dialog underneath (W: field delete; I: image set), that effect renders BEFORE the refetch overwrites it. The recorder
// samples every animation frame and every DOM mutation, so a transient field-count drop or a transient marker image is seen.
//   __rec.start(markerSubstring)  -- begin; markerSubstring is a substring of the image URL used in limb 2 (or '' for none)
//   __rec.stop()                  -- end; returns { samples, minFields, maxFields, markerEverVisible, firstFields, lastFields }
// Discrimination check (seen to fail first): with W and U both open, a planted script clicks W's "Delete" then U's "Reload"
// in one task; the recorder must report minFields = firstFields - 1. Only then is a real Enter's result read.
(() => {
  const read = (marker) => {
    // One "Inline" checkbox label per embed field, in view and edit mode alike (the delete button shows on the selected
    // field only, so it does not count fields).
    const fields = [...document.querySelectorAll('label')]
      .filter((l) => l.querySelector('input[type="checkbox"]') && l.textContent.trim() === 'Inline').length;
    const dialogs = [...document.querySelectorAll('[role="dialog"]')]
      .filter((d) => d.getBoundingClientRect().width > 0 && d.textContent.trim())
      .map((d) => (d.querySelector('h1,h2,h3,[id$="title"]')?.textContent ?? d.textContent).trim().slice(0, 40));
    const markerVisible = !!marker && [...document.querySelectorAll('img')]
      .some((i) => (i.currentSrc || i.src).includes(marker) && !i.closest('[role="dialog"]'));
    const toast = [...document.querySelectorAll('.Toastify__toast')].map((t) => t.textContent.trim()).join(' | ');
    return { t: Math.round(performance.now()), fields, dialogs, markerVisible, toast };
  };
  const rec = { samples: [], on: false, marker: '', mo: null };
  const push = () => {
    const s = read(rec.marker);
    const last = rec.samples[rec.samples.length - 1];
    if (!last || last.fields !== s.fields || last.markerVisible !== s.markerVisible
      || last.dialogs.join('|') !== s.dialogs.join('|') || last.toast !== s.toast) rec.samples.push(s);
  };
  const frame = () => { if (!rec.on) return; push(); requestAnimationFrame(frame); };
  window.__rec = {
    start(marker = '') {
      rec.samples = []; rec.marker = marker; rec.on = true;
      rec.mo = new MutationObserver(push); rec.mo.observe(document.body, { subtree: true, childList: true, attributes: true });
      push(); requestAnimationFrame(frame); return rec.samples[0];
    },
    stop() {
      rec.on = false; rec.mo?.disconnect(); push();
      const f = rec.samples.map((s) => s.fields);
      return {
        samples: rec.samples, firstFields: f[0], lastFields: f[f.length - 1],
        minFields: Math.min(...f), maxFields: Math.max(...f),
        markerEverVisible: rec.samples.some((s) => s.markerVisible),
      };
    },
  };
  return 'recorder installed';
})();
