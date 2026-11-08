// ILLUSTRATIVE: two bubble listeners on one node; the first calls stopPropagation.
const { JSDOM } = require(process.argv[2]);
const { window } = new JSDOM('<button id=b>Cancel</button>');
const d = window.document; const seen = [];
d.addEventListener('keydown', (e) => { seen.push('root-listener(stopPropagation)'); e.stopPropagation(); });
d.addEventListener('keydown', () => { seen.push('hotkey-listener fired'); });
d.getElementById('b').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
console.log(JSON.stringify(seen));
