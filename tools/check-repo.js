#!/usr/bin/env node
'use strict';

const REVIEW = 'pending review at 7b4419a';

const fs = require('fs');
const os = require('os');
const path = require('path');

const { SETTINGS: INDEX_SETTINGS } = require('./build-index.js');

const ENGINE = path.join(process.env.RECORD_ENGINE_DIR || path.join(os.homedir(), '.claude', 'tools'), 'record-engine.js');

const SETTINGS = {
  root: path.resolve(__dirname, '..'),
  toolsDir: __dirname,
  indexSettings: INDEX_SETTINGS,
  selfName: 'hooks',
  vocabularyInstant: '2026-11-10T09:01:13Z',
  documentRules: true,
  gateInstant: '2026-11-10T09:01:13Z',
  releaseJoinExemption: true,
  notADocument: new Set(['WORKING-NOTES.md', 'INDEX.md', '.gitkeep']),
  duplicateBasenameExceptions: new Map([
    ['README.md', 'Directory-level READMEs: the repository root, user-files/, verification/. Not chain documents.'],
    ['.gitignore', {
      reason: 'The record\'s own ignore file and the one chain 014\'s analyst scoped to its throwaway POC rig under '
        + 'verification/014/, so the rig\'s ignore cannot hide another session\'s work. Not chain documents. Only these '
        + 'two paths are covered; a third .gitignore elsewhere still fails.',
      paths: [
        '.gitignore',
        'verification/014/.gitignore',
      ],
    }],
  ]),
};

function main() {
  if (!fs.existsSync(ENGINE)) {
    console.error(`record engine not found at ${ENGINE}. The record tooling is bound to this box: the engine lives in ~/.claude/tools, and its git remote is a backup, not a second home.`);
    process.exit(2);
  }
  require(ENGINE).runCheck(SETTINGS);
}

module.exports = { SETTINGS, REVIEW };

if (require.main === module) main();
