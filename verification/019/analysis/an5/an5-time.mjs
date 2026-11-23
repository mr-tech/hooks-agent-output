import { parse, parseLossless } from '@discord/markdown-wasm';
import fs from 'node:fs';
const corpus = JSON.parse(fs.readFileSync(process.argv[2], 'utf8')).map((c) => c.text);
const big = corpus.join('\n');
parse('warm'); parseLossless('warm');
const time = (f, xs, reps) => { const t = process.hrtime.bigint(); for (let r = 0; r < reps; r++) for (const x of xs) f(x); return Number(process.hrtime.bigint() - t) / 1e6 / reps; };
console.log(JSON.stringify({ corpusChars: big.length, parseCorpusMs: time(parse, corpus, 20), losslessCorpusMs: time(parseLossless, corpus, 20), parse2000ByteMsgMs: time(parse, [big.slice(0, 2000)], 200), lossless2000ByteMsgMs: time(parseLossless, [big.slice(0, 2000)], 200), node: process.version }));
