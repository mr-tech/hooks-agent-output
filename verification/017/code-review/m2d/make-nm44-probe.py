"""Code review Round 10 (chain 017, M2-d): settles the implementer's "nm44 is equivalent" by running it. In an export:
(1) optionally applies nm44 to usePusher.ts (a module variable holds the latest instance; the cleanup disconnects that),
(2) appends to a copy of usePusher.update-prompt.test.tsx one case with two hook instances mounted at once in two roots,
unmounting the first: only the first's instance may be disconnected (M2-d, "touches no other instance").
Usage: make-nm44-probe.py <export dir> [--mutant]"""
import sys
e = sys.argv[1]
if '--mutant' in sys.argv:
    p = e + '/src/providers/MessageProvider/usePusher.ts'
    s = open(p).read()
    for old, new in [("export default (", "let latestPusher: Pusher | null = null;\n\nexport default ("),
                     ("    const channel = pusher.subscribe(", "    latestPusher = pusher;\n    const channel = pusher.subscribe("),
                     ("      pusher.disconnect();", "      latestPusher?.disconnect();")]:
        assert s.count(old) == 1, old
        s = s.replace(old, new)
    open(p, 'w').write(s)
d = e + '/src/providers/MessageProvider/__tests__/'
t = open(d + 'usePusher.update-prompt.test.tsx').read()
t += """
describe('probe: two hook instances at once', () => {
  it('disconnects only the unmounted instance\\'s connection', () => {
    const a = document.createElement('div'); const b = document.createElement('div');
    document.body.append(a, b);
    const ra = createRoot(a); const rb = createRoot(b);
    act(() => { ra.render(<Harness hasChanged={false} />); });
    act(() => { rb.render(<Harness hasChanged={false} />); });
    expect(hoisted.instances).toHaveLength(2);
    act(() => { ra.unmount(); });
    expect(hoisted.instances[0].disconnect).toHaveBeenCalledTimes(1);
    expect(hoisted.instances[1].disconnect).not.toHaveBeenCalled();
    act(() => { rb.unmount(); });
    a.remove(); b.remove();
  });
});
"""
open(d + 'usePusher.two-instances-probe.test.tsx', 'w').write(t)
