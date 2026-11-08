#!/usr/bin/env python3
"""QA effort-final: the import-only class of gap-dispositions.md. Every import line added in a 7ce866b..c5303ca hunk of
that class must resolve, at c5303ca, to a module that exports each name it binds (default or named). Package specifiers
are checked by presence in package.json dependencies. Positive control: a planted wrong name must be reported."""
import re, subprocess, json
W='/usr/local/bin/hooks/website'; TIP='c5303ca'
FILES=['src/app/_navigation/Redirects/Server.tsx','src/app/message/_layout/Header.tsx','src/app/message/f/[id]/page.tsx',
 'src/app/message/m/[id]/_components/JsonModalBody.tsx','src/app/message/m/[id]/_components/SaveAsMenu.tsx',
 'src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx','src/app/message/m/[id]/send/page.tsx',
 'src/components/DiscordMessageEditor/components/Author.tsx','src/components/DiscordMessageEditor/components/EmbedEditor/ColorPicker/Picker.tsx',
 'src/components/DiscordMessageEditor/index.tsx','src/components/ImageUploader.tsx','src/providers/MessageProvider/usePusher.ts',
 'src/providers/WebhookProvider.tsx','src/utils/hooks/useValidateWebhook.ts','src/utils/limits.tsx']
show=lambda p: subprocess.run(['git','-C',W,'show',f'{TIP}:{p}'],capture_output=True,text=True).stdout
pkg=json.loads(show('package.json')); deps={**pkg.get('dependencies',{}),**pkg.get('devDependencies',{})}
def resolve(spec):
    base='src/'+spec[2:]
    for c in [base+e for e in ('.ts','.tsx','.mjs','/index.ts','/index.tsx')]:
        if show(c): return c
def exports(src,name):
    if name=='default': return bool(re.search(r'export default|export \{[^}]*\bdefault\b',src))
    return bool(re.search(r'export (?:const|function|async function|class|type|interface|enum|let)\s+'+re.escape(name)+r'\b',src)) or bool(re.search(r'export \{[^}]*\b'+re.escape(name)+r'\b',src))
def check(spec,names):
    if not spec.startswith('~/'):
        root=spec.split('/')[0] if not spec.startswith('@') else '/'.join(spec.split('/')[:2])
        return [] if root in deps else [f'package {root} not in package.json']
    p=resolve(spec)
    if not p: return [f'{spec} does not resolve']
    s=show(p); return [f'{spec}:{n} not exported' for n in names if not exports(s,n)]
probs=[]; n=0
for f in FILES:
    d=subprocess.run(['git','-C',W,'diff','-U0','7ce866b',TIP,'--',f],capture_output=True,text=True).stdout
    added='\n'.join(l[1:] for l in d.splitlines() if l.startswith('+') and not l.startswith('+++'))
    for m in re.finditer(r"import\s+(?:type\s+)?([\w$]+)?\s*,?\s*(?:\{([^}]*)\})?\s*from\s*'([^']+)'",added):
        names=(['default'] if m.group(1) else [])+[x.strip().split(' as ')[0].replace('type ','') for x in (m.group(2) or '').split(',') if x.strip()]
        n+=1; probs+= [f'{f}: {x}' for x in check(m.group(3),names)]
ctl=check('~/utils/formatMessageDate',['notARealExport'])
print('import statements checked',n,'problems',probs); print('control (planted wrong name) reported:',ctl)
