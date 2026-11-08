#!/usr/bin/env python3
"""QA effort-final, owner ruling 2026-11-08T14:18Z (steering/015-rulings.md, bab96e0): one mutant per hunk in
gap-dispositions.md's "wrapper or plumbing whose behaviour a neighbouring mutant decides" class (16 hunks), at website
620b4ee. 13 hunks get a mutant. Button.tsx:54-55 is a pure deletion (its present-tree counterpart is the killed
cr38-button-autofocus-not-passed-to-usebutton); shared.ts:175-176 is reached by ef-shared-partial-user-branch-unfiltered;
redis:75 is a type annotation (misfiled in the plumbing class; reclassified type-only). Writes website-plumbing-mutants.json."""
import json, subprocess
W='/usr/local/bin/hooks/website'; TIP='620b4ee'
def src(f): return subprocess.run(['git','-C',W,'show',f'{TIP}:{f}'],capture_output=True,text=True,check=True).stdout
JM='src/app/message/m/[id]/_components/JsonModalBody.tsx'; AU='src/components/DiscordMessageEditor/components/Author.tsx'
WP='src/providers/WebhookProvider.tsx'; VW='src/utils/hooks/useValidateWebhook.ts'; RD='src/utils/redis/index.ts'; SH='src/server/api/utils/shared.ts'
M=[
 ('pl-jsonmodal-copytext-deps-empty',JM,"useMemo(() => toCopyText(messageString), [messageString])","useMemo(() => toCopyText(messageString), [])"),
 ('pl-preview-data-ignores-query','src/app/preview/page.tsx',"const data = parseMessageData(query);","const data = parseMessageData('{}');"),
 ('pl-author-mount-ts-not-set',AU,"  useEffect(() => {\n    setTs(new Date());\n    let interval","  useEffect(() => {\n    let interval"),
 ('pl-author-interval-not-captured',AU,"      interval = setInterval(","      setInterval("),
 ('pl-button-style-dropped','src/components/Button.tsx',"const { children, className, style } = props;","const { children, className } = props;\n  const style = undefined;"),
 ('pl-wp-url-starts-stale',WP,"useUpdateEffect(() => {\n    let isStale = false;\n    setSelectedWebhook(null);","useUpdateEffect(() => {\n    let isStale = true;\n    setSelectedWebhook(null);"),
 ('pl-vw-url-starts-stale',VW,"    let isStale = false;\n    setWebhook(null);","    let isStale = true;\n    setWebhook(null);"),
 ('pl-vw-message-starts-stale',VW,"    let isStale = false;\n    setMessage(null);","    let isStale = true;\n    setMessage(null);"),
 ('pl-shared-partial-guildid-unselected',SH,"'Messages.previewImageNonce', 'Guilds.guildId as guildId',\n    ]);\n\n  const messages = await (guilds.length","'Messages.previewImageNonce',\n    ]);\n\n  const messages = await (guilds.length"),
 ('pl-redis-getitem-falsy-value-miss',RD,"      return { item: (typeof item === 'object' && !!item ? decompress(item) : item) as T };","      const v = (typeof item === 'object' && !!item ? decompress(item) : item) as T;\n      return v ? { item: v } : null;"),
 ('pl-redis-clearuser-pipeline-not-run',RD,"  if (discordId) pipeline.del(formatKey('user-guilds', discordId));\n  return pipeline.exec();","  if (discordId) pipeline.del(formatKey('user-guilds', discordId));\n  return Promise.resolve([]);"),
 ('pl-auth-revoke-does-nothing','src/server/auth.ts',"async function revokeAccessToken(accessToken: string) {\n","async function revokeAccessToken(accessToken: string) {\n  return;\n"),
 ('pl-auth-message-promise-unwrapped','src/server/auth.ts',"const messagePromise = Promise.resolve(preferences?.recentMessageIds","const messagePromise = (preferences?.recentMessageIds"),
]
bad=[(i,src(f).count(o)) for i,f,o,n in M if src(f).count(o)!=1]
json.dump([{'id':i,'file':f,'old':o,'new':n} for i,f,o,n in M],open('website-plumbing-mutants.json','w'),indent=1)
print(len(M),'written; not exactly-once:',bad)
