// Load Discord's public markdown wasm parser under Node. Research probe; nothing here is committed.
// usage: node wasm-oracle.js <assets-js-dir> <wasm-file> [--lossless] [--syntax N] [--file corpus.json | text...]
// The glue module is located by content (its wasm-bindgen import namespace), never by a module id.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GLUE_MARK = './discord_markdown_wasm_bg.js';

function loadGlue(jsDir) {
  for (const f of fs.readdirSync(jsDir)) {
    if (!f.endsWith('.js')) continue;
    const src = fs.readFileSync(path.join(jsDir, f), 'utf8');
    if (!src.includes(GLUE_MARK)) continue;
    if (!src.startsWith('(this.webpackChunkdiscord_app=this.webpackChunkdiscord_app||[]).push(')) {
      throw new Error(`glue found in ${f} but the file is not a plain pushed chunk`);
    }
    const sandbox = { TextDecoder, TextEncoder, WebAssembly, URL, console: { warn() {}, log() {}, error() {} }, BigInt };
    sandbox.self = sandbox;
    const ctx = vm.createContext(sandbox);
    vm.runInContext(src, ctx, { filename: f, timeout: 5000 });
    const pushed = sandbox.webpackChunkdiscord_app;
    for (const [, modules] of pushed) {
      for (const [id, fn] of Object.entries(modules)) {
        if (!fn.toString().includes(GLUE_MARK)) continue;
        const exportsObj = {};
        const req = () => { throw new Error('glue module required another module'); };
        req.d = (target, a, b) => {
          // Served shape: n.d(exports, {name: getter}, {name: value}) — second argument getters, third direct values.
          for (const k of Object.keys(a || {})) Object.defineProperty(target, k, { enumerable: true, get: a[k] });
          for (const k of Object.keys(b || {})) target[k] = b[k];
        };
        fn({ exports: exportsObj }, exportsObj, req);
        return { file: f, id, glue: exportsObj };
      }
    }
  }
  throw new Error('glue module not found');
}

function classify(glue) {
  // Export names are minified; tell the entry points apart by the wasm export each one calls.
  const out = {};
  for (const k of Object.keys(glue)) {
    const s = glue[k].toString();
    if (s.includes('.parseLossless(')) out.parseLossless = glue[k];
    else if (s.includes('.parse(')) out.parse = glue[k];
    else if (s.includes('new WebAssembly.Instance')) out.initSync = glue[k];
  }
  return out;
}

function main() {
  const [jsDir, wasmFile, ...rest] = process.argv.slice(2);
  const { file, id, glue } = loadGlue(jsDir);
  const api = classify(glue);
  const bytes = fs.readFileSync(wasmFile);
  const mod = new WebAssembly.Module(bytes);
  api.initSync(mod); // the module itself: an options object from this realm fails the glue's cross-realm prototype check
  let lossless = false;
  let syntax;
  let inputs = [];
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === '--lossless') lossless = true;
    else if (rest[i] === '--syntax') syntax = Number(rest[++i]);
    else if (rest[i] === '--file') inputs = JSON.parse(fs.readFileSync(rest[++i], 'utf8')).map((c) => (typeof c === 'string' ? c : c.text));
    else if (rest[i] === '--exports') {
      console.log(JSON.stringify({ file, id, glueExports: Object.keys(glue), wasmExports: WebAssembly.Module.exports(mod).map((e) => `${e.kind}:${e.name}`), wasmImports: WebAssembly.Module.imports(mod).map((e) => `${e.module}:${e.name}`).length }, null, 1));
      return;
    } else inputs.push(rest[i]);
  }
  const fn = lossless ? api.parseLossless : api.parse;
  const replacer = (k, v) => (typeof v === 'bigint' ? `${v}n` : Object.prototype.toString.call(v) === '[object Map]' ? Object.fromEntries(v) : v);
  for (const text of inputs) {
    let result;
    try { result = fn(text, syntax); } catch (e) { result = { __error: String(e) }; }
    console.log(JSON.stringify({ in: text, out: result }, replacer));
  }
}

main();
