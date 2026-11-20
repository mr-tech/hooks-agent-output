const which = process.argv[2];
const { discordMessageShape } = await import('./' + which + '.ts');
const show = (label, data) => { const r = discordMessageShape.safeParse(data); console.log(which, '|', label, '| issues', r.success ? 0 : r.error.issues.length, '|', r.success ? '' : JSON.stringify(r.error.issues.map(i => [i.code, i.maximum, i.path.join('.')]).slice(0, 4))); };
show('41 valid text displays, 100 chars each', { components: Array.from({ length: 41 }, () => ({ type: 10, content: 'x'.repeat(100) })) });
show('41 text displays, 100 chars each, one bad type', { components: [{ type: 99 }, ...Array.from({ length: 40 }, () => ({ type: 10, content: 'x'.repeat(100) }))] });
show('41 text displays, 5000 chars each (each element invalid)', { components: Array.from({ length: 41 }, () => ({ type: 10, content: 'x'.repeat(5000) })) });
