"""Code review Round 10 sub-entry (chain 017, CR-21): writes mutants.json for mutation-run.py at website 24e9be7.
Three cross-instance mutants of usePusher's cleanup, each one 'old' block (subscribe line through disconnect):
nm44 (cleanup closes the latest-created instance), all (cleanup closes every instance created), first (cleanup closes
the first instance created in the worker). Each must be killed by the two-hooks case in usePusher.update-prompt.test.tsx.
Usage: python3 make-mutants.py <website repo> <sha> > mutants.json"""
import json, subprocess, sys
repo, sha = sys.argv[1], sys.argv[2]
f = 'src/providers/MessageProvider/usePusher.ts'
s = subprocess.check_output(['git', '-C', repo, 'show', f'{sha}:{f}'], text=True)
a = s.index('    const channel = pusher.subscribe(')
b = s.index('      pusher.disconnect();') + len('      pusher.disconnect();')
old = s[a:b]
assert s.count(old) == 1
g = '(globalThis as any)'
forms = {
    'nm44-latest': (f'    {g}.__lp = pusher;\n', f'{g}.__lp.disconnect();'),
    'all-created': (f'    ({g}.__all ??= []).push(pusher);\n', f'{g}.__all.forEach((p: Pusher) => p.disconnect());'),
    'first-created': (f'    {g}.__first ??= pusher;\n', f'{g}.__first.disconnect();'),
}
out = []
for mid, (pre, dis) in forms.items():
    new = pre + old.replace('pusher.disconnect();', dis)
    assert new != old
    out.append({'id': mid, 'file': f, 'old': old, 'new': new,
                'tests': ['src/providers/MessageProvider/__tests__/usePusher.update-prompt.test.tsx']})
json.dump(out, sys.stdout, indent=1)
