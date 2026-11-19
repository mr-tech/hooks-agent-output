#!/usr/bin/env python3
"""QA probes for M4's two survivors, each run at the tip and under its mutant, in an isolated export of website a5dd76f.

Usage: python3 -I run-probes.py <website repo> <export dir> <out dir>
Each probe file is the committed test file at a5dd76f (read with git show, never an editable copy) with one describe
appended. Each runs twice: at the tip's source (expected green) and with the survivor's mutant applied (expected red),
network-isolated, the whole process group killed at 180 s. Source files are restored and checked byte-identical after
each run. Writes <out>/<probe>-<tip|mutant>.json and .out, and prints one line per run.
"""
import json
import os
import signal
import subprocess
import sys

repo, export, out = sys.argv[1], os.path.realpath(sys.argv[2]), os.path.realpath(sys.argv[3])
if export.startswith('/usr/local/bin/hooks/website'):
    sys.exit('refusing to run in the shared tree')
SHA = 'a5dd76f'
os.makedirs(out, exist_ok=True)

LONE_ENTER = r"""

describe('probe: Enter with one confirmation open', () => {
  it('answers the link prompt alone on Enter', async () => {
    await mountTree(true);
    edit();
    click(link('inside the editor'));
    expect(titleOfFocusedDialog()).toContain(TITLE);

    enter();

    expect(hoisted.push).toHaveBeenCalledTimes(1);
  });

  it('answers the update prompt alone on Enter', async () => {
    await mountTree(true);
    edit();
    act(() => { raiseEditorPrompt(); });
    expect(titleOfFocusedDialog()).toContain('Message Update Detected');

    enter();

    expect(hoisted.reload).toHaveBeenCalledTimes(1);
  });
});
"""

STABLE_WITHDRAW = r"""

const PROBE_LETS_THROUGH: NavigationGuard = () => false;
const PROBE_HOLDS: NavigationGuard = () => true;

describe('probe: withdrawal with stable guard identities', () => {
  it('keeps the newer guard when an older registration is withdrawn, each guard one function', () => {
    let withdraw: VoidFunction = () => undefined;
    const Both: FC = () => {
      const [older, setOlder] = useState(true);
      withdraw = () => setOlder(false);
      return (
        <>
          {older && <Registers guard={PROBE_LETS_THROUGH} />}
          <Registers guard={PROBE_HOLDS} />
        </>
      );
    };
    mountDom(
      <WithLinkRouter router={linkRouter}>
        <NavigationGuardProvider>
          <Both />
          <StyledLink href="/message/f/0">go home</StyledLink>
        </NavigationGuardProvider>
      </WithLinkRouter>,
    );
    act(() => { withdraw(); });

    click(link('go home'));

    expect(document.body.textContent).toContain(TITLE);
    expect(linkRouter.push).not.toHaveBeenCalled();
  });
});
"""

PROBES = [
    {
        'name': 'lone-enter',
        'base': 'src/app/message/__tests__/layout.navigation-guard.test.tsx',
        'append': LONE_ENTER,
        'mutant': ('src/components/ConfirmationDialog.tsx', "if (ref.current?.closest(",
                   "if (document.querySelectorAll('[role=\"dialog\"]').length > 1 && ref.current?.closest("),
    },
    {
        'name': 'stable-withdraw',
        'base': 'src/providers/__tests__/NavigationGuardProvider.link-confirmation.test.tsx',
        'append': STABLE_WITHDRAW,
        'mutant': ('src/providers/NavigationGuardProvider.tsx',
                   "if (guardRef.current === guard) guardRef.current = null;", "guardRef.current = null;"),
    },
]


def show(path):
    return subprocess.run(['git', '-C', repo, 'show', f'{SHA}:{path}'], check=True, capture_output=True, text=True).stdout


def run(name, test_rel):
    report = os.path.join(out, name + '.json')
    if os.path.exists(report):
        os.remove(report)
    cmd = ['unshare', '-rn', 'npx', 'vitest', 'run', '--reporter=json', '--outputFile=' + report, test_rel]
    with open(os.path.join(out, name + '.out'), 'w') as fh:
        p = subprocess.Popen(cmd, cwd=export, stdout=fh, stderr=subprocess.STDOUT, start_new_session=True)
        try:
            code = p.wait(timeout=180)
        except subprocess.TimeoutExpired:
            os.killpg(p.pid, signal.SIGKILL)
            code = 'timeout'
    rows = []
    if os.path.exists(report):
        for tr in json.load(open(report))['testResults']:
            rows += [(a['status'], a['fullName']) for a in tr['assertionResults'] if a['fullName'].startswith('probe:')]
    return code, rows


for pr in PROBES:
    base_text = show(pr['base'])
    probe_rel = pr['base'].replace('.test.tsx', '.probe.test.tsx')
    probe_path = os.path.join(export, probe_rel)
    open(probe_path, 'w').write(base_text + pr['append'])
    mfile, old, new = pr['mutant']
    mpath = os.path.join(export, mfile)
    original = show(mfile)
    assert open(mpath).read() == original, f'{mfile} in the export differs from {SHA}'
    assert original.count(old) == 1, f'{pr["name"]}: mutant anchor not unique'
    try:
        code, rows = run(pr['name'] + '-tip', probe_rel)
        print(pr['name'], 'tip exit', code, rows)
        open(mpath, 'w').write(original.replace(old, new))
        code, rows = run(pr['name'] + '-mutant', probe_rel)
        print(pr['name'], 'mutant exit', code, rows)
    finally:
        open(mpath, 'w').write(original)
        assert open(mpath).read() == original, 'restore failed'
        os.remove(probe_path)
