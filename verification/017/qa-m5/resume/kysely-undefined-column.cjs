// Does Kysely drop a column whose value is undefined from an INSERT? Decides whether
// `if (true) values.id = message.id` (shared.ts upsertMessage) is equivalent for a new message.
// Positive control: the same insert with id = 'x' must carry the column.
const { Kysely, PostgresAdapter, DummyDriver, PostgresIntrospector, PostgresQueryCompiler } = require(process.argv[2] + '/node_modules/kysely');
const db = new Kysely({ dialect: { createAdapter: () => new PostgresAdapter(), createDriver: () => new DummyDriver(), createIntrospector: (d) => new PostgresIntrospector(d), createQueryCompiler: () => new PostgresQueryCompiler() } });
for (const [label, v] of [['absent', { a: 1 }], ['undefined', { a: 1, id: undefined }], ['control x', { a: 1, id: 'x' }]]) {
  const c = db.insertInto('Messages').values(v).compile();
  console.log(label, '|', c.sql, '|', JSON.stringify(c.parameters));
}
