#!/usr/bin/env python3
"""Build QA's hand mutants for M4 as exact-once anchors against website a5dd76f.

Usage: python3 -I build-qa-mutants.py <website repo> <out.json>
Each mutant's "old" must occur exactly once in its file at a5dd76f (read with git show); the script refuses otherwise.
Every case runs the whole suite (no "tests" key): the suite takes about 15 s.
"""
import json
import subprocess
import sys

repo, out = sys.argv[1], sys.argv[2]
SHA = 'a5dd76f'

SL = 'src/components/StyledLink.tsx'
NG = 'src/providers/NavigationGuardProvider.tsx'
MP = 'src/providers/MessageProvider/index.tsx'
CD = 'src/components/ConfirmationDialog.tsx'
EL = 'src/app/message/m/[id]/layout.tsx'
ML = 'src/app/message/layout.tsx'

M = [
    ('qa-nm8-same-message-by-prefix', MP,
     "&& /^\\/message\\/m\\/(\\d+)\\/(?:edit|send)\\/?$/.exec(url.pathname)?.[1] === messageId;",
     "&& url.pathname.startsWith(`/message/m/${messageId}`);"),
    ('qa-same-message-end-unanchored', MP, "(?:edit|send)\\/?$/", "(?:edit|send)\\/?/"),
    ('qa-same-message-origin-dropped', MP, "url.origin === window.location.origin\n    && /", "/"),
    ('qa-nm9-pointer-only', SL,
     "          if (intercept({ href: hrefToString(rest.href), replace, scroll })) e.preventDefault();\n"
     "        },\n"
     "        onClick: (e: MouseEvent<HTMLAnchorElement>) => {\n",
     "          if (Reflect.get(globalThis, 'qaPointer') !== false && intercept({ href: hrefToString(rest.href), replace, scroll })) e.preventDefault();\n"
     "        },\n"
     "        onClick: (e: MouseEvent<HTMLAnchorElement>) => {\n"
     "          Reflect.set(globalThis, 'qaPointer', e.detail > 0);\n"
     "          if (e.detail === 0) return;\n"),
    ('qa-nm24-modified-click-held', SL,
     "if (e.defaultPrevented || !opensInThisTab(e) || isOnThisSite(href)) return;",
     "if (e.defaultPrevented || isOnThisSite(href)) return;"),
    ('qa-nm25-editor-prompt-shares-layout-slot', EL,
     "    <ConfirmationProvider>\n      <WebhookProvider>\n        <MessageProvider>\n"
     "          <Navigation key=\"navigation\" />\n          {children}\n        </MessageProvider>\n"
     "      </WebhookProvider>\n    </ConfirmationProvider>\n",
     "    <>\n      <WebhookProvider>\n        <MessageProvider>\n"
     "          <Navigation key=\"navigation\" />\n          {children}\n        </MessageProvider>\n"
     "      </WebhookProvider>\n    </>\n"),
    ('qa-enter-lone-dialog-dead', CD,
     "if (ref.current?.closest(",
     "if (document.querySelectorAll('[role=\"dialog\"]').length > 1 && ref.current?.closest("),
    ('qa-scroll-not-passed', NG, "(href, { scroll });", "(href, {});"),
    ('qa-replace-not-passed-local', SL, "const { replace, scroll } = rest;",
     "const { scroll } = rest; const replace = undefined;"),
    ('qa-external-confirm-without-suppression', NG,
     "void leaveWithoutAlert(async () => window.location[replace ? 'replace' : 'assign'](href));",
     "window.location[replace ? 'replace' : 'assign'](href);"),
    ('qa-guard-context-not-mounted', ML,
     "      <NavigationGuardProvider>\n", "      <>\n"),
    ('qa-register-ignores-hasChanged', MP,
     "register((destination) => hasChanged && !isSameMessage", "register((destination) => !isSameMessage"),
    ('qa-unregister-unconditional', NG,
     "if (guardRef.current === guard) guardRef.current = null;", "guardRef.current = null;"),
    ('qa-url-href-read-as-path', SL,
     "if (href instanceof URL) return href.href;", "if (href instanceof URL) return href.pathname + href.search;"),
]

# the guard-context mutant needs its closing tag too; a second unique anchor is folded into one edit
ML_CLOSE_OLD = "        <ToastContainerWrapper />\n      </NavigationGuardProvider>\n"

rows = []
for mid, path, old, new in M:
    text = subprocess.run(['git', '-C', repo, 'show', f'{SHA}:{path}'], check=True, capture_output=True, text=True).stdout
    if mid == 'qa-guard-context-not-mounted':
        start = text.index(old)
        end = text.index(ML_CLOSE_OLD) + len(ML_CLOSE_OLD)
        old = text[start:end]
        new = old.replace("      <NavigationGuardProvider>\n", "      <>\n").replace("      </NavigationGuardProvider>\n", "      </>\n")
    count = text.count(old)
    if count != 1:
        sys.exit(f'{mid}: anchor occurs {count} times in {path}')
    rows.append({'id': mid, 'file': path, 'old': old, 'new': new})

json.dump(rows, open(out, 'w'), indent=1)
print(f'{len(rows)} mutants written to {out}')
