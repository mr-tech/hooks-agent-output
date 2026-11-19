"""Code review Round 10 (chain 017, M2-d): builds a mounted-MessageProvider probe from the own-save-notice test file of an
export. The pusher-js mock's disconnect counts calls on globalThis.__disconnects; one case mounts the real provider on a
stored message, asserts no disconnect while mounted, unmounts, and asserts exactly one. Usage: make-probe.py <export dir>"""
import re, sys
d = sys.argv[1] + '/src/providers/MessageProvider/__tests__/'
src = open(d + 'MessageProvider.own-save-notice.test.tsx').read()
src = re.sub(r"\n\s*disconnect: \(\) => undefined,", "", src)
anchor = "      unsubscribe: () => undefined,\n"
assert src.count(anchor) == 1
src = src.replace(anchor, anchor + "      disconnect: () => { const g = globalThis as unknown as { __disconnects?: number }; g.__disconnects = (g.__disconnects ?? 0) + 1; },\n")
src += """
describe('probe: the mounted provider closes its Pusher connection', () => {
  it('disconnects once when the provider unmounts, and not before', () => {
    const g = globalThis as unknown as { __disconnects?: number };
    g.__disconnects = 0;
    mountStored(CLASSIC);
    expect(g.__disconnects).toBe(0);
    unmountDom();
    expect(g.__disconnects).toBe(1);
  });
});
"""
open(d + 'MessageProvider.disconnect-probe.test.tsx', 'w').write(src)
