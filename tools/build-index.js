#!/usr/bin/env node
'use strict';

const REVIEW = 'pending review at 7b4419a';

const fs = require('fs');
const os = require('os');
const path = require('path');

const ENGINE = path.join(process.env.RECORD_ENGINE_DIR || path.join(os.homedir(), '.claude', 'tools'), 'record-engine.js');

const SETTINGS = {
  root: path.resolve(__dirname, '..'),
};

function main() {
  if (!fs.existsSync(ENGINE)) {
    console.error(`record engine not found at ${ENGINE}. The record tooling is bound to this box: the engine lives in ~/.claude/tools, and its git remote is a backup, not a second home.`);
    process.exit(2);
  }
  require(ENGINE).runIndex(SETTINGS);
}

module.exports = { SETTINGS, REVIEW };

if (require.main === module) main();
