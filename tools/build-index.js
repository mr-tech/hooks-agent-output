#!/usr/bin/env node
'use strict';

/*
 * Generates INDEX.md — the lookup that answers "where does this document currently sit?"
 *
 * Run:  node tools/build-index.js            writes INDEX.md (working tree, incl. uncommitted)
 *       node tools/build-index.js --tracked  writes INDEX.md from committed documents only
 *       node tools/build-index.js --check    exits 1 if INDEX.md is stale, writes nothing
 *       node tools/build-index.js --help     usage
 *
 * ## Why
 *
 * A document's path changes when it closes. Citations therefore go stale, and a reader who knows a
 * document's name still has to guess whether it sits in `qa/` or `qa/closed/`. This file removes the
 * guess: every document, by name, with its current location and status.
 *
 * INDEX.md is GENERATED. Never hand-edit it — run this instead. The `--check` mode exists so a stale
 * index is a build failure rather than a quiet lie, which is the failure mode the close procedure
 * already demonstrated once.
 *
 * ## Portability
 *
 * The stage table is derived from the repository's own top-level directories, so adding a stage
 * directory needs no edit here — only a display-name override if the directory name does not read
 * well in a table cell.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'INDEX.md');

/**
 * Not documents: generated, scratch, structural, or repository-management files. The four
 * coordination files (`INBOX.md`, `OPEN_QUESTIONS.md`, `OWNER-QUEUE.md`, `TODO.md`) belong to no
 * chain and would sit in the index as permanently statusless rows. They are listed whether or not
 * they exist yet — a skip entry for an absent file costs nothing.
 */
const SKIP = new Set([
  'WORKING-NOTES.md', 'INDEX.md', 'README.md', '.gitkeep',
  'INBOX.md', 'OPEN_QUESTIONS.md', 'OWNER-QUEUE.md', 'TODO.md',
]);

const USAGE = `
  build-index.js — generate INDEX.md, the "where does this document sit?" lookup

    node tools/build-index.js                    write INDEX.md from the working tree
    node tools/build-index.js --tracked          write INDEX.md from committed documents only
    node tools/build-index.js --check            exit 1 if INDEX.md is stale; write nothing
    node tools/build-index.js --tracked --check  the form a gate uses on the committed index
    node tools/build-index.js --help             this text

  The COMMITTED index is generated with --tracked. The default (working-tree) form includes
  uncommitted and owner-held drafts and is a live lookup, not something to commit.
`;

/**
 * Directory -> the word that reads well in a table cell. Anything not listed falls back to the
 * directory name with hyphens turned into spaces, so a new stage directory appears automatically.
 */
const STAGE_NAME = new Map([
  ['code-review', 'code review'],
  ['critiques', 'critique'],
  ['operator-direct', 'operator direct'],
  ['planning', 'plan'],
  ['process-improvement', 'process improvement'],
  ['qa', 'QA'],
  ['retrospectives', 'retrospective'],
  ['uat', 'UAT'],
]);

const STAGE_OF = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== '.git')
  .map((e) => e.name)
  .sort()
  .map((d) => [`${d}/`, STAGE_NAME.get(d) || d.replace(/-/g, ' ')]);

/**
 * The document set to index. Two modes for two purposes:
 *
 *  - DEFAULT (live lookup): tracked markdown PLUS untracked-but-not-ignored markdown. An index that
 *    omits a document until it is committed is at its least accurate exactly when someone is looking
 *    for a document they just wrote. This is the file you browse while work is in flight.
 *
 *  - --tracked (committable record): tracked markdown ONLY. The index this produces reflects git
 *    HISTORY — it is correct in a fresh clone, and it excludes both in-flight untracked work AND
 *    deliberately-held drafts (a plan minted but frozen by the owner sits untracked indefinitely, so
 *    the default index would list it at every quiet moment and any commit of that index would assert
 *    in history that a frozen, uncommitted plan exists). Generate the committed INDEX with this flag;
 *    it self-heals as held/in-flight documents actually land.
 *
 * The two modes' output is otherwise identical, so a `--tracked` index is a strict subset of the
 * default — never a different shape, only fewer rows.
 */
const TRACKED_ONLY = process.argv.includes('--tracked');

function tracked() {
  const args = TRACKED_ONLY
    ? ['ls-files', '*.md']                                  // committed only — mirrors git history
    : ['ls-files', '--cached', '--others', '--exclude-standard', '*.md']; // + untracked — live lookup
  const out = execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' });
  // A cached path missing on disk is an uncommitted move (delete unstaged) — normal steady state
  // in a shared tree; the copy at its new path is picked up via --others (default mode only).
  return [...new Set(out.split('\n').filter(Boolean))]
    .filter((p) => fs.existsSync(path.join(ROOT, p)))
    .sort();
}

/**
 * Read frontmatter, resolving YAML block scalars.
 *
 * `Status-Detail: >-` followed by indented continuation lines is the repo's established form for a
 * long qualifier — several documents use it, and several of those qualifiers record live blocking
 * release conditions. A naive line-wise reader captures the literal `>-` and drops the text, so the
 * index displayed `QA Complete — >-` and the part that mattered was invisible. An index that hides
 * the qualifier is worse than one that omits the column.
 */
function frontmatter(file) {
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (!raw.startsWith('---\n')) return {};
  const end = raw.indexOf('\n---', 4);
  if (end === -1) return {};

  const lines = raw.slice(4, end).split('\n');
  const fields = {};

  for (let i = 0; i < lines.length; i += 1) {
    const m = lines[i].match(/^([A-Za-z][A-Za-z-]*):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;

    if (/^[>|][-+]?$/.test(rawValue.trim())) {
      // Block scalar: consume the indented lines beneath it.
      const body = [];
      while (i + 1 < lines.length && (lines[i + 1].trim() === '' || /^\s+\S/.test(lines[i + 1]))) {
        i += 1;
        body.push(lines[i].trim());
      }
      // Folded joins with spaces; literal keeps the newlines, which a table cell cannot show anyway.
      fields[key] = body.join(' ').replace(/\s+/g, ' ').trim();
      continue;
    }

    fields[key] = rawValue.trim().replace(/^['"]|['"]$/g, '');
  }
  return fields;
}

function stageOf(file) {
  for (const [prefix, name] of STAGE_OF) if (file.startsWith(prefix)) return name;
  return '—';
}

/**
 * Escape a value for a markdown table cell. An unescaped `|` in a Status-Detail silently splits the
 * row into extra columns and the rest of the qualifier disappears — the same failure the folded-scalar
 * bug caused, arriving by a different route. Nothing uses one today; this is so nothing has to notice
 * when something does.
 */
function cell(value) {
  return String(value).replace(/\|/g, '\\|');
}

function build() {
  const files = tracked().filter((f) => !SKIP.has(path.basename(f)));
  const rows = files.map((f) => {
    const fm = frontmatter(f);
    return {
      file: f,
      base: path.basename(f),
      id: fm.ID && fm.ID !== 'n/a' ? fm.ID : null,
      stage: stageOf(f),
      status: fm.Status || '—',
      detail: fm['Status-Detail'] || '',
      closed: /\/closed\//.test(f),
    };
  });

  const chains = new Map();
  const unnumbered = [];
  for (const r of rows) {
    if (!r.id) { unnumbered.push(r); continue; }
    if (!chains.has(r.id)) chains.set(r.id, []);
    chains.get(r.id).push(r);
  }

  const out = [];
  out.push('# INDEX');
  out.push('');
  out.push('**Generated by `tools/build-index.js`. Do not hand-edit — your changes will be overwritten.**');
  out.push('');
  out.push('Answers "where does this document currently sit?" without having to know whether it has been');
  out.push('closed. A document\'s path changes when it closes; its name does not.');
  out.push('');
  out.push(TRACKED_ONLY
    ? '**Scope: committed documents only** (generated with `--tracked`). Uncommitted and owner-held '
      + 'drafts are omitted by design — this index is safe to commit and correct in a fresh clone.'
    : '**Scope: the working tree, including uncommitted drafts.** A live lookup — not the form to '
      + 'commit; regenerate with `--tracked` for that.');
  out.push('');
  out.push(`${rows.length} documents · ${chains.size} numbered chains · ${unnumbered.length} unnumbered.`);
  out.push('');
  out.push('---');
  out.push('');
  out.push('## By chain');
  out.push('');

  for (const id of [...chains.keys()].sort()) {
    const docs = chains.get(id).sort((a, b) => a.file.localeCompare(b.file));
    const open = docs.filter((d) => !d.closed).length;
    out.push(`### ${id} — ${open} open, ${docs.length - open} closed`);
    out.push('');
    out.push('| Stage | Location | Status |');
    out.push('|---|---|---|');
    for (const d of docs) {
      const status = d.detail ? `${d.status} — ${d.detail}` : d.status;
      out.push(`| ${cell(d.stage)} | \`${d.file}\` | ${cell(status)} |`);
    }
    out.push('');
  }

  if (unnumbered.length) {
    out.push('## Unnumbered');
    out.push('');
    out.push('Handoffs, research, evergreen documents and operator notes. These carry no chain ID by design —');
    out.push('they are the ID-less artifacts that root new efforts.');
    out.push('');
    out.push('| Kind | Location | Status |');
    out.push('|---|---|---|');
    for (const d of unnumbered.sort((a, b) => a.file.localeCompare(b.file))) {
      const status = d.detail ? `${d.status} — ${d.detail}` : d.status;
      out.push(`| ${cell(d.stage)} | \`${d.file}\` | ${cell(status)} |`);
    }
    out.push('');
  }

  out.push('## By name');
  out.push('');
  out.push('| Document | Location |');
  out.push('|---|---|');
  for (const r of [...rows].sort((a, b) => a.base.localeCompare(b.base))) {
    out.push(`| \`${r.base}\` | \`${r.file}\` |`);
  }
  out.push('');

  return `${out.join('\n')}`;
}

function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(USAGE);
    process.exit(0);
  }
  const mode = TRACKED_ONLY ? '--tracked' : 'default';
  const fix = TRACKED_ONLY ? 'node tools/build-index.js --tracked' : 'node tools/build-index.js';
  const content = build();
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
    if (current === content) { console.log(`  INDEX.md is current (${mode}).`); process.exit(0); }
    console.log(`  INDEX.md is STALE (${mode}) — run \`${fix}\`.`);
    process.exit(1);
  }
  fs.writeFileSync(OUT, content);
  console.log(`  wrote INDEX.md (${content.split('\n').length} lines, ${mode})`);
}

main();
