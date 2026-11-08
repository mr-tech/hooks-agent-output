#!/usr/bin/env python3
"""QA effort-final: website gap mutants over 7ce866b..c5303ca hunks that no recorded mutant reaches (gapmap.txt), plus
restatements of recorded mutants whose target text changed in a later round (consolidate-report.txt NOT-APPLICABLE).
Each old string is checked exactly once at c5303ca; writes website-gap-mutants.json in mutation-run.py format."""
import json, subprocess
W='/usr/local/bin/hooks/website'; TIP='c5303ca'
def src(f): return subprocess.run(['git','-C',W,'show',f'{TIP}:{f}'],capture_output=True,text=True,check=True).stdout
HD='src/app/message/_layout/Header.tsx'; FP='src/app/message/f/[id]/page.tsx'
JM='src/app/message/m/[id]/_components/JsonModalBody.tsx'; SA='src/app/message/m/[id]/_components/SaveAsMenu.tsx'
WM='src/app/message/m/[id]/send/_components/WebhookMenu/index.tsx'; SP='src/app/message/m/[id]/send/page.tsx'
AU='src/components/DiscordMessageEditor/components/Author.tsx'; EF='src/components/DiscordMessageEditor/components/EmbedEditor/EmbedFooter.tsx'
WP='src/providers/WebhookProvider.tsx'; VW='src/utils/hooks/useValidateWebhook.ts'; RD='src/utils/redis/index.ts'
h=src(HD)
def span_to(text, needle, anchor):
    a=text.index(anchor); i=text.rindex(needle,0,a); return text[i:a+len(anchor)]
s1=span_to(h,'{formatMessageDate(msg.updatedAt)}','<NullableComponent show={otherMatches.length > 0}>')
s2=span_to(h,'{formatMessageDate(msg.updatedAt)}','show={matches.length + otherMatches.length === 0}')
M=[
 ('ef-header-recent-bypasses-formatter',HD,s1,s1.replace('{formatMessageDate(msg.updatedAt)}','{String(msg.updatedAt)}',1)),
 ('ef-header-other-bypasses-formatter',HD,s2,s2.replace('{formatMessageDate(msg.updatedAt)}','{String(msg.updatedAt)}',1)),
 ('ef-folder-list-drops-prefix',FP,"<div className=\"text-sm text-mute\">\n                        {`${orderProp === 'name' ? 'Last Modified: ' : ''}${formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt, 'Today at ')}",
      "<div className=\"text-sm text-mute\">\n                        {`${orderProp === 'name' ? 'Last Modified: ' : ''}${formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt)}"),
 ('ef-folder-grid-drops-prefix',FP,"<div className='text-xs'>{`${orderProp === 'name' ? 'Last Modified: ' : ''}${formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt, 'Today at ')}",
      "<div className='text-xs'>{`${orderProp === 'name' ? 'Last Modified: ' : ''}${formatMessageDate(orderProp === 'createdAt' ? msg.createdAt : msg.updatedAt)}"),
 ('ef-jsonmodal-copytext-catch-rethrows',JM,"  } catch (e) {\n    return null;\n  }\n}\n\ninterface Props","  } catch (e) {\n    throw e;\n  }\n}\n\ninterface Props"),
 ('ef-saveas-proposed-name-no-copy',SA,"`${message.name} Copy`","message.name"),
 ('ef-webhookmenu-pick-ignored',WM,"onChange={setPickedCategory}","onChange={() => {}}"),
 ('ef-menu-url-error-inverted',WM,"selectedWebhook === null ? INVALID_URL_ERROR","selectedWebhook !== null ? INVALID_URL_ERROR"),
 ('ef-menu-url-conjunct-dropped',WM,"url && !isWebhookLoading && selectedWebhook === null ? INVALID_URL_ERROR","!isWebhookLoading && selectedWebhook === null ? INVALID_URL_ERROR"),
 ('ef-send-withsending-dropped',SP,"await withSending(sendWebhook({","await (sendWebhook({"),
 ('ef-author-effect-deps-dropped',AU,"      clearInterval(interval);\n    };\n  }, []);","      clearInterval(interval);\n    };\n  });"),
 ('ef-embedfooter-iconurl-falsy',EF,"_setIconUrl(val === '' ? undefined : val)","_setIconUrl(val || undefined)"),
 ('ef-cron-error-eq-null','src/pages/api/cron.ts',".where('ScheduledMessages.error', 'is', null)",".where('ScheduledMessages.error', '=', null)"),
 ('ef-wp-url-cleanup-dropped',WP,"    return () => { isStale = true; };\n  }, [url]);","  }, [url]);"),
 ('ef-wp-message-cleanup-dropped',WP,"    return () => { isStale = true; };\n  }, [selectedWebhook, messageIdOrUrl, threadId]);","  }, [selectedWebhook, messageIdOrUrl, threadId]);"),
 ('ef-vw-url-cleanup-dropped',VW,"    return () => { isStale = true; };\n  }, [url]);","  }, [url]);"),
 ('ef-vw-message-cleanup-dropped',VW,"    return () => { isStale = true; };\n  }, [webhook, url, messageIdOrUrl]);","  }, [webhook, url, messageIdOrUrl]);"),
 ('ef-vw-webhook-catch-text-message-load',VW,"if (!isStale) setWebhookError(INVALID_URL_ERROR);","if (!isStale) setWebhookError(MESSAGE_LOAD_FAILED_ERROR);"),
 ('ef-vw-webhook-catch-silent',VW,"if (!isStale) setWebhookError(INVALID_URL_ERROR);","if (!isStale) setWebhookError(null);"),
 ('ef-agu-empty-guard-dropped','src/server/api/utils/authorizeGuildUser.ts',"  if (!messageIds.length) return [];\n",""),
 ('ef-user-empty-guard-dropped','src/server/api/utils/user.ts',"    if (!messageIds.length) return { account, oldMessageCount: 0 };\n",""),
 ('ef-shared-recent-empty-guard-dropped','src/server/api/utils/shared.ts',"  if (!messageIds.length) return [];\n",""),
 ('ef-shared-partial-guild-branch-always','src/server/api/utils/shared.ts',"await (guilds.length\n    ? query","await (true\n    ? query"),
 ('ef-shared-partial-user-branch-unfiltered','src/server/api/utils/shared.ts',"    : query.where('Messages.fk_users_id', '=', userId)\n  ).execute();","    : query\n  ).execute();"),
 ('ef-shapes-id-regex-reverted','src/server/api/utils/shapes.ts',"/^(0|[0-9]{17,23})$/","/^(0|[0-9]{17,23}$)/"),
 ('ef-auth-revoke-token-param-dropped','src/server/auth.ts',"  urlencoded.append('token', accessToken);\n",""),
 ('ef-cdn-port-dropped','src/utils/getCDNUrl.ts',"${process.env.NEXT_PUBLIC_CDN_PORT ? `:${process.env.NEXT_PUBLIC_CDN_PORT}` : ''}",""),
 ('ef-redis-getfromcache-falsy-miss',RD,"if (cachedItem) return cachedItem.item;","if (cachedItem?.item) return cachedItem.item;"),
 ('ef-redis-wait-falsy-miss',RD,"  if (cached) {\n    resolveDeferred(key, cached.item","  if (cached?.item) {\n    resolveDeferred(key, cached.item"),
 ('ef-redis-wait-timeout-falsy-miss',RD,"if (cached) resolveDeferred(key, cached.item","if (cached?.item) resolveDeferred(key, cached.item"),
 ('ef-redis-clearuser-guilds-del-skipped',RD,"if (discordId) pipeline.del(formatKey('user-guilds', discordId));","if (false) pipeline.del(formatKey('user-guilds', discordId));"),
 ('ef-imageuploader-validation-bypassed','src/components/ImageUploader.tsx',"  if (!isValidImageUrl(url)) {","  if (false) {"),
 ('ef-rules-codeblock-anchor-dropped','src/utils/markdown/rules.tsx',"inlineRegex(new RegExp(`^${FENCE}`, 'i'))","inlineRegex(new RegExp(FENCE, 'i'))"),
]
existing={(m['file'],m['old'],m['new']) for m in json.load(open('website-mutants-apply.json'))}
out=[]; bad=[]
for i,f,o,n in M:
    c=src(f).count(o)
    if c!=1: bad.append((i,c))
    if (f,o,n) in existing: bad.append((i,'duplicate of a recorded mutant'))
    out.append({'id':i,'file':f,'old':o,'new':n})
json.dump(out,open('website-gap-mutants.json','w'),indent=1)
print(len(out),'written; problems:',bad)
