
// Round 9 probe (code review, chain 017): two DIFFERENT hashes that pusher-js delivers as the same number. The frame data is
// decoded as pusher-js 8.3.0 dist/web/pusher.js decodeMessage does (JSON.parse, string on failure). M2-c: a broadcast whose
// hash equals neither the shown content nor a held record raises the notice.
describe('probe: distinct hashes delivered as the same number', () => {
  const delivered = (h: string): unknown => { try { return JSON.parse(h) as unknown; } catch { return h; } };
  const findPair = () => {
    mountStored(CLASSIC);
    const seen = new Map<string, string>();
    for (let i = 0; i < 200000; i += 1) {
      const content = `p${i}`;
      const h = remoteHash({ content });
      const v = delivered(h);
      if (typeof v !== 'number') continue;
      const key = String(v);
      const other = seen.get(key);
      if (other !== undefined && remoteHash({ content: other }) !== h) return { a: other, b: content, ha: remoteHash({ content: other }), hb: h };
      seen.set(key, content);
    }
    throw new Error('no pair found');
  };
  const pair = findPair();

  it('raises the notice when another tab saves content whose hash differs from the shown content but is delivered as the same number', () => {
    console.log(`PAIR ${pair.a}=${pair.ha} ${pair.b}=${pair.hb} delivered ${String(delivered(pair.ha))}`);
    mountStored(CLASSIC);
    edit({ content: pair.a });
    act(() => { hoisted.handler?.(delivered(remoteHash({ content: pair.b }))); });
    expect(hoisted.confirm).toHaveLength(1);
  });

  it('raises the notice when another tab saves content whose hash differs from a held record but is delivered as the same number', () => {
    mountStored(CLASSIC);
    edit({ content: pair.a });
    save();
    edit({ content: 'typed later' });
    act(() => { hoisted.handler?.(delivered(remoteHash({ content: pair.b }))); });
    expect(hoisted.confirm).toHaveLength(1);
  });
});
