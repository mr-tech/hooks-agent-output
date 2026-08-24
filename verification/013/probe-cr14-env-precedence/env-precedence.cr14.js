#!/usr/bin/env node
/**
 * CR14 — which DATABASE_URL does a process actually get?
 *
 * Built for the M8-G round, whose safety constraint is:
 *   "never let the attack process inherit the ambient env or website/.env.local;
 *    set DATABASE_URL explicitly in its own environment."
 *
 * That constraint is only sound if an explicitly-set process env var SURVIVES
 * whatever loader runs. This probe establishes that mechanically rather than
 * assuming it, against BOTH loaders reachable from this tree.
 *
 * NO CREDENTIAL IS READ. Every fixture below is synthetic. The real
 * website/.env.local is characterised only by counting key names with values
 * redacted; its contents are never loaded, printed, or parsed here.
 */
const path = require('path');

const WEBSITE = '/usr/local/bin/hooks/website';
const dotenv = require(path.join(WEBSITE, 'node_modules/dotenv'));
const NEXT_ENV = path.join(
  WEBSITE, 'node_modules/.pnpm/@next+env@16.1.6/node_modules/@next/env',
);

const out = [];
const say = (s) => { out.push(s); console.log(s); };

say('CR14 — DATABASE_URL selection and precedence. All fixtures synthetic.');
say('');
say('--- A. does a #-commented entry ever get selected? ---');
[
  ['active first, #comment second', 'DATABASE_URL=A_LIVE\n#DATABASE_URL=B_COMMENTED\n'],
  ['#comment first, active second', '#DATABASE_URL=B_COMMENTED\nDATABASE_URL=A_LIVE\n'],
  ['indented #comment', 'DATABASE_URL=A_LIVE\n   #DATABASE_URL=B_COMMENTED\n'],
  ['#comment only, no active entry', '#DATABASE_URL=B_COMMENTED\n'],
].forEach(([label, txt]) => {
  const v = dotenv.parse(Buffer.from(txt)).DATABASE_URL;
  say(`  ${label.padEnd(32)} -> ${JSON.stringify(v)}`);
});
say('  CONCLUSION: a #-commented entry is NEVER selected, at any position or indent.');
say('');
say('--- B. two ACTIVE entries: which wins? ---');
say(`  first vs second -> ${JSON.stringify(
  dotenv.parse(Buffer.from('DATABASE_URL=FIRST\nDATABASE_URL=SECOND\n')).DATABASE_URL)}`);
say('  CONCLUSION: last-wins. (Only relevant if BOTH are active; see A.)');
say('');
say('--- C. does an explicitly-set process env survive a file load? ---');
const EXPLICIT = 'postgres://EXPLICIT_DEAD_PORT:1/none';
const fs = require('fs');
const os = require('os');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cr14-'));
fs.writeFileSync(path.join(tmp, '.env.local'), 'DATABASE_URL=FROM_FILE_WOULD_BE_LIVE\n');

const trial = (label, fn) => {
  process.env.DATABASE_URL = EXPLICIT;
  fn();
  const won = process.env.DATABASE_URL === EXPLICIT;
  say(`  ${label.padEnd(38)} -> ${won ? 'EXPLICIT WINS' : 'FILE CLOBBERED EXPLICIT'}`);
  return won;
};

const a = trial('dotenv.config() [default]', () => dotenv.config({ path: path.join(tmp, '.env.local') }));
const b = trial('dotenv.config({override:true})', () => dotenv.config({ path: path.join(tmp, '.env.local'), override: true }));
const c = trial('@next/env loadEnvConfig (Next 16.1.6)', () => {
  const cwd = process.cwd();
  process.chdir(tmp);
  try { require(NEXT_ENV).loadEnvConfig(tmp, true); } finally { process.chdir(cwd); }
});

say('');
say('--- VERDICT ---');
say(`  dotenv default          : ${a ? 'safe' : 'UNSAFE'}`);
say(`  dotenv override:true    : ${b ? 'safe' : 'UNSAFE — this form defeats the constraint'}`);
say(`  @next/env loadEnvConfig : ${c ? 'safe' : 'UNSAFE'}`);
say('');
say('  Setting DATABASE_URL explicitly in the attack process IS sound against the');
say('  loader Next actually uses, and against dotenv default. It is NOT sound against');
say('  any loader invoked with override semantics. The oracle must therefore still be');
say('  asserted on the persistence surface, never on the process env alone.');

fs.writeFileSync(path.join(__dirname, 'run-cr14.txt'), `${out.join('\n')}\n`);
if (!a || !c) { console.error('CR14 FAILED: the M8-G safety constraint is not sound as written.'); process.exit(1); }
if (b) { console.error('CR14 UNEXPECTED: override:true did not clobber; re-check the probe.'); process.exit(1); }
console.log('\nCR14 OK.');
