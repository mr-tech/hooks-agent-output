// Read Discord messages through getFromUrl's own path (S1, website src/server/api/routers/message.ts): paracord's Api.request
// GET /channels/{channel}/messages/{message} with a bot token, then the real discordResponseToMessage, taken from a committed SHA.
//
// Usage: node read-s1.mjs <hooks|test> <sha> <workdir> <output.json> <channelId>:<messageId>[=label] ...
//   hooks : the token website/.env.local names as DISCORD_BOT_TOKEN (the Hooks.gg app on this box)
//   test  : ~/.claude-credentials/test_bot_token (the test bot)
// No token is printed or written. The raw response is summarised (author, content length and text, embed types, component
// types, flags) beside the converter's output.
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const WEBSITE = '/usr/local/bin/hooks/website';
const [which, sha, workdir, outPath, ...targets] = process.argv.slice(2);
const req = createRequire(join(WEBSITE, 'package.json'));
const ts = req('typescript');
const { Api } = req('paracord');

function token() {
  if (which === 'test') return readFileSync(join(homedir(), '.claude-credentials/test_bot_token'), 'utf8').trim();
  const line = readFileSync(join(WEBSITE, '.env.local'), 'utf8').split('\n').find((l) => l.startsWith('DISCORD_BOT_TOKEN='));
  return line.slice('DISCORD_BOT_TOKEN='.length).trim().replace(/^["']|["']$/g, '');
}

function transpile(path) {
  const src = execFileSync('git', ['-C', WEBSITE, 'show', `${sha}:${path}`], { encoding: 'utf8' });
  return ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
}

mkdirSync(workdir, { recursive: true });
const dapi = pathToFileURL(req.resolve('discord-api-types/v10')).href;
writeFileSync(join(workdir, 'constructImageUrl.mjs'), transpile('src/utils/constructImageUrl.ts'));
writeFileSync(
  join(workdir, 'discordResponseToMessage.mjs'),
  transpile('src/utils/discordResponseToMessage.ts')
    .replace(/from ['"]discord-api-types\/v10['"]/g, `from '${dapi}'`)
    .replace(/from ['"]\.\/constructImageUrl['"]/g, "from './constructImageUrl.mjs'"),
);
const { default: discordResponseToMessage } = await import(pathToFileURL(join(workdir, 'discordResponseToMessage.mjs')).href);

const api = new Api(token());
const me = await api.request('GET', '/users/@me', { validateStatus: null });
const out = { at: new Date().toISOString(), reader: which, reader_bot: { id: me.data?.id, username: me.data?.username }, sha, reads: {} };

for (const t of targets) {
  const [ids, label] = t.split('=');
  const [channelId, messageId] = ids.split(':');
  const { data: message, status } = await api.request('GET', `/channels/${channelId}/messages/${messageId}`, { validateStatus: null });
  const entry = { channelId, messageId, status };
  if (status === 200) {
    entry.raw = {
      author: { id: message.author?.id, username: message.author?.username, bot: message.author?.bot },
      webhook_id: message.webhook_id,
      content_length: (message.content ?? '').length,
      content: message.content,
      embed_types: (message.embeds ?? []).map((e) => e.type),
      component_types: (message.components ?? []).map((c) => c.type),
      flags: message.flags,
      mentions: (message.mentions ?? []).map((u) => u.id),
    };
    entry.converted = discordResponseToMessage(message);
  } else {
    entry.error = message;
  }
  out.reads[label ?? messageId] = entry;
}
writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
// paracord's Api keeps timers alive after the last request; exit once the output is written.
process.exit(0);
