// OQ-4 POC (analysis 019): a recording Emitter through the typed `__emitter` option on a separate instance.
const base = require(process.argv[2]);
class Recorder {
  constructor() { this.root = { scope: null, children: [] }; this.stack = [this.root]; }
  startScope(name) { const n = { scope: name, children: [] }; this.stack.at(-1).children.push(n); this.stack.push(n); }
  endScope() { this.stack.pop(); }
  openNode(name) { this.startScope(name); }
  closeNode() { this.endScope(); }
  addText(t) { this.stack.at(-1).children.push(t); }
  __addSublanguage(em, lang) { const n = { scope: `language:${lang}`, children: em.root.children }; this.stack.at(-1).children.push(n); }
  finalize() {}
  toHTML() { return ''; }
}
const hl = base.newInstance();
hl.configure({ __emitter: Recorder });
hl.registerLanguage('javascript', require(process.argv[2] + '/lib/languages/javascript'));
const r = hl.highlight('const x = `a${b}c`; // n', { language: 'javascript' });
const flat = (n, s = []) => (typeof n === 'string' ? [[n, s.join('>')]] : n.children.flatMap((c) => flat(c, n.scope ? [...s, n.scope] : s)));
console.log(JSON.stringify({ separateInstanceUnaffected: base.highlight('x', { language: 'javascript' }).value === 'x', tokens: flat(r._emitter.root), valueEmpty: r.value === "", errorRaised: String(r.errorRaised || "") }));
