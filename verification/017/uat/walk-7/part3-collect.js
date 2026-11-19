async (page) => {
  // page.__p3label set by caller; collects 5 s+ after trigger, then cancels notices
  const A = page, B = page.__B, b = page.__p3;
  await A.waitForTimeout(5000);
  const r = { label: A.__p3label, at: new Date().toISOString(), A: await A.__dump(A, b.A), B: await A.__dump(B, b.B), noticeA: await A.__noticeIn(A), noticeB: await A.__noticeIn(B) };
  r.cancelled = await A.__cancel();
  r.afterCancel = { A: await A.__noticeIn(A), B: await A.__noticeIn(B) };
  await A.__post(`part3-${A.__p3label}.json`, r);
  const f = (x) => ({ frames: x.frames.map(q => q[1]), decoded: x.decoded.map(d => d.slice(1)), ui: x.ui.map(u => [u[0].slice(11), u[1].map(s=>s.slice(0,30)), u[2]]), errors: x.errors, upserts: x.upserts.length });
  return { label: r.label, A: f(r.A), B: f(r.B), noticeA: r.noticeA.length, noticeB: r.noticeB.length, cancelled: r.cancelled.map(c => [c[0], c[1]]), afterCancel: r.afterCancel, pageerrors: [A.__log.errs, B.__log.errs] };
}
