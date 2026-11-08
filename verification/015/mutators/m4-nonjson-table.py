import os
import sys

PROV = 'src/providers/WebhookProvider.tsx'
HOOK = 'src/utils/hooks/useValidateWebhook.ts'
MUTANTS = {
    'nj-hook-body-failure-is-refusal': (HOOK, ".then<DiscordWebhook | { message: string }>((res) => res.json()));", ".then<DiscordWebhook | { message: string }>((res) => res.json().catch(() => ({ message: 'bad body' }))));"),
    'nj-provider-body-failure-selects-webhook': (PROV, "fetch(url).then<Webhook | null>((res) => (res.status === 200 ? res.json() : null)),", "fetch(url).then<Webhook | null>((res) => (res.status === 200 ? res.json().catch(() => ({ id: 'x' } as Webhook)) : null)),"),
}

mid = os.environ['MUT_ID']
path, old, new = MUTANTS[mid]
src = open(path).read()
if src.count(old) != 1:
    print('MUTATOR FAILED: %s matched %d times' % (mid, src.count(old)))
    sys.exit(1)
open(path, 'w').write(src.replace(old, new))
print('mutated', mid)
