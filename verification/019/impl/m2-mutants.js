const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [exportDir, outDir] = process.argv.slice(2);
if (!exportDir || !outDir) throw new Error('usage: node m2-mutants.js <export-dir> <out-dir>');
fs.mkdirSync(outDir, { recursive: true });

const ENGINE = 'src/utils/markdown/engine.ts';
const PROVIDER = 'src/providers/MarkdownProvider.tsx';
const HELPER = 'src/utils/markdown/__tests__/helpers/importersOf.ts';
const MARKDOWN_TESTS = ['src/utils/markdown/__tests__', 'src/providers/__tests__/MarkdownProvider.engine-state.test.tsx'];

const MUTANTS = [
  ['M2-01 title mask zero', ENGINE, 'const EMBED_TITLE_MASK = 0x19fec97f;', 'const EMBED_TITLE_MASK = 0;'],
  ['M2-02 title keeps GAME_MENTION', ENGINE, 'const EMBED_TITLE_MASK = 0x19fec97f;', 'const EMBED_TITLE_MASK = 0x19fecd7f;'],
  ['M2-03 field value takes the content mask', ENGINE, 'const FIELD_VALUE_MASK = 0x3dffffff;', 'const FIELD_VALUE_MASK = 0x3fffffff;'],
  ['M2-04 content mask leaves DEV_LINKS on', ENGINE, 'const CONTENT_MASK = 0x3fffffff;', 'const CONTENT_MASK = 0x7fffffff;'],
  ['M2-05 url variant equals plain title', ENGINE, 'const EMBED_TITLE_WITH_URL_MASK = 0x19fec907;', 'const EMBED_TITLE_WITH_URL_MASK = 0x19fec97f;'],
  ['M2-06 every surface parses under the content mask', ENGINE, 'parseWasm(text, SURFACE_MASKS[surface])', 'parseWasm(text, SURFACE_MASKS.content)'],
  ['M2-07 link renderer entry removed', ENGINE, "  link: 'link',\n} as const satisfies Record<NodeKind, NodeRenderer>;", '} as const satisfies Partial<Record<NodeKind, NodeRenderer>>;'],
  ['M2-08 token entry removed', ENGINE, "  whitespace: 'stack',\n", ''],
  ['M2-09 static mention entry removed', ENGINE, "  guide: 'guide',\n", ''],
  ['M2-10 init not shared between callers', ENGINE, 'starting ??= initWasm()', 'starting = initWasm()'],
  ['M2-11 failure logged per caller', ENGINE, "    (error: unknown) => {\n      console.error(`markdown-engine-init-failure version=${ENGINE_VERSION} reason=${reasonOf(error)}`);\n      settle('rejected');\n    },\n  );\n  return starting;", "    (error: unknown) => {\n      settle('rejected');\n    },\n  );\n  starting.then(() => { if (state === 'rejected') console.error(`markdown-engine-init-failure version=${ENGINE_VERSION} reason=${reasonOf(new Error())}`); });\n  return starting;"],
  ['M2-12 rejection never settles', ENGINE, "      settle('rejected');\n", ''],
  ['M2-13 resolution never settles', ENGINE, "() => { settle('resolved'); }", '() => undefined'],
  ['M2-14 unmapped kind warns every call', ENGINE, 'if (!warnedKinds.has(kind)) {', 'if (true) {'],
  ['M2-15 unmapped kind never warns', ENGINE, "    console.warn(`markdown-engine-unmapped-kind kind=${kind} version=${ENGINE_VERSION}`);\n", ''],
  ['M2-16 notice dropped from the loader', ENGINE, 'startEngine.notice = ENGINE_NOTICE;\n', ''],
  ['M2-17 allow-list admits javascript', ENGINE, "'sms:']);", "'sms:', 'javascript:']);"],
  ['M2-18 allow-list admits dev', ENGINE, "'sms:']);", "'sms:', 'dev:']);"],
  ['M2-19 allow-list refuses mailto', ENGINE, "'mailto:', ", ''],
  ['M2-20 allow-list by prefix text, not URL parse', ENGINE, 'return ALLOWED_LINK_PROTOCOLS.has(new URL(url).protocol);', "return /^(https?|mailto|discord|tel|sms):/i.test(url);"],
  ['M2-21 allow-list admits anything that parses', ENGINE, 'return ALLOWED_LINK_PROTOCOLS.has(new URL(url).protocol);', 'return Boolean(new URL(url).protocol);'],
  ['M2-22 provider never starts the engine', PROVIDER, '    void startEngine();\n', ''],
  ['M2-23 provider shows pending always', PROVIDER, 'useSyncExternalStore(subscribeEngine, engineState, (): EngineState => \'pending\')', "(subscribeEngine, engineState, 'pending' as EngineState)"],
  ['M2-24 import scan ignores subpaths', HELPER, 'specifier === name || specifier.startsWith(`${name}/`)', 'specifier === name'],
  ['M2-25 import scan skips bot directory', HELPER, "const SKIPPED_DIRECTORIES = new Set(['node_modules', '.next', '.git']);", "const SKIPPED_DIRECTORIES = new Set(['node_modules', '.next', '.git', 'bot']);"],
  ['M2-26 import scan does not skip node_modules', HELPER, "new Set(['node_modules', '.next', '.git'])", "new Set(['.next', '.git'])"],
];

const results = [];
const pristine = new Map();
for (const [name, file, from, to] of MUTANTS) {
  const target = path.join(exportDir, file);
  if (!pristine.has(file)) pristine.set(file, fs.readFileSync(target, 'utf8'));
  const original = pristine.get(file);
  if (!original.includes(from)) {
    results.push({ name, outcome: 'NOT-APPLIED (anchor absent)' });
    continue;
  }
  fs.writeFileSync(target, original.replace(from, to));
  const slug = name.split(' ')[0];
  const log = path.join(outDir, `${slug}.log`);
  const fd = fs.openSync(log, 'w');
  const run = spawnSync('setsid', ['timeout', '-k', '5', '240', 'npx', 'vitest', 'run', ...MARKDOWN_TESTS], {
    cwd: exportDir, stdio: ['ignore', fd, fd],
  });
  fs.closeSync(fd);
  fs.writeFileSync(target, original);
  const text = fs.readFileSync(log, 'utf8');
  const failedFiles = [...new Set([...text.matchAll(/FAIL\s+\|\w+\|\s+(\S+\.test\.tsx?)/g)].map((m) => m[1]))];
  const timedOut = run.status === 124 || run.status === 137;
  results.push({
    name,
    outcome: timedOut ? 'TIMEOUT (counts as a kill)' : run.status === 0 ? 'SURVIVED' : 'KILLED',
    failedFiles,
  });
}
fs.writeFileSync(path.join(outDir, 'results.json'), JSON.stringify(results, null, 2));
for (const r of results) console.log(r.outcome.padEnd(12), r.name, (r.failedFiles || []).map((f) => path.basename(f)).join(', '));
