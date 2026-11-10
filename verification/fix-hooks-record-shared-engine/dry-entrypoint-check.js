'use strict';
const path = require('path');
const os = require('os');
const ENGINE = path.join(os.homedir(), '.claude', 'tools', 'record-engine.js');
const variant = process.env.VARIANT || 'bare';
const now = process.env.ADOPT || new Date().toISOString().replace(/\.\d+Z$/, 'Z');
const SETTINGS = {
  root: '/usr/local/bin/hooks/agent-output',
  toolsDir: __dirname,
  indexSettings: { root: '/usr/local/bin/hooks/agent-output' },
  selfName: 'hooks',
  documentRules: true,
  releaseJoinExemption: true,
  notADocument: new Set(['WORKING-NOTES.md', 'INDEX.md', '.gitkeep']),
  duplicateBasenameExceptions: new Map([['README.md', 'Directory-level READMEs.']]),
};
if (variant !== 'bare') { SETTINGS.gateInstant = now; SETTINGS.vocabularyInstant = now; }
require(ENGINE).runCheck(SETTINGS);
