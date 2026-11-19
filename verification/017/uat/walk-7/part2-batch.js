async (page) => {
  const post = (n, o) => page.request.post('http://127.0.0.1:39777/' + n, { data: JSON.stringify(o, null, 1) });
  page.__post = post;
  page.__batch = async (labels, skipFirstRun) => {
    const sum = [];
    for (const [i, l] of labels.entries()) {
      if (!(skipFirstRun && i === 0)) {
        const r = await page.__run(l, l.startsWith('P'));
        await post(`part2-${l}.json`, r);
        const f = r.A.frames[0] && JSON.parse(r.A.frames[0][1]);
        sum.push([l, r.typedVerified, r.A.upserts[0], 'Aframes', r.A.frames.length, 'Adec', r.A.decoded.map(d => d.slice(1)), 'noticeA', r.noticeA.length, 'Bframes', r.B.frames.length, 'Bdec', r.B.decoded.map(d => d.slice(1)), 'noticeB', r.noticeB.length, 'errs', r.pageerrorsA.length + r.pageerrorsB.length]);
      }
      const s = await page.__resync(l + '-resync');
      await post(`part2-${l}-resync.json`, s);
      sum.push([l + '-resync', 'nameBefore', s.nameBeforeSave, 'cancel1', s.cancel1.map(c => c[0]), 'A upsert', s.A.upserts.map(u => u.slice(0, 3)), 'noticeA after save', s.noticeA.length, 'noticeB after save', s.noticeB.length, 'Aframes', s.A.frames.length, 'Bframes', s.B.frames.length]);
    }
    return sum;
  };
  return 'ok';
}
