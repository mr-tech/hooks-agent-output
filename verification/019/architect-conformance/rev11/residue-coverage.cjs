// Per surface: inputs run, inputs the DOM (visible-form) measurement covered, and differing counts, from the implementer's captures.
const dir = process.argv[2];
const lossless = require(`${dir}/m4-residue-measurement-6379abc.json`), dom = require(`${dir}/m4-dom-residue-before.json`);
for (const s of Object.keys(dom)) {
  const d = dom[s], members = Object.values(d.classes).flat();
  console.log(JSON.stringify({ surface: s, inputsRun: d.n, domMeasured: d.atomFree, domExcluded: d.n - d.atomFree, domDiffering: d.count,
    domClasses: Object.keys(d.classes).length, domCorpusDiffering: members.filter((m) => String(m).startsWith('corpus:')).length,
    losslessDiffering: lossless[s].count }));
}
