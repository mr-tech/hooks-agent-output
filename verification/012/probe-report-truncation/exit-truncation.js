// Reproduces src/scripts/backfillValid.ts's main() tail:
//     process.stdout.write(JSON.stringify(report, null, 2) + '\n');
//     process.exit(0);
// Size is passed in argv[2] (bytes of payload, approx).
const n = Number(process.argv[2] || 100000);
const report = { rowIds: Array.from({ length: Math.ceil(n / 22) }, (_, i) => `row-${String(i).padStart(12, '0')}`) };
const out = JSON.stringify(report, null, 2) + '\n';
process.stderr.write(`INTENDED_BYTES=${Buffer.byteLength(out)}\n`);
process.stdout.write(out);
process.exit(0);
