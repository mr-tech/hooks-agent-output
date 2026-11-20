export default {
  root: new URL('.', import.meta.url).pathname,
  resolve: { alias: { '~': new URL('./export/src', import.meta.url).pathname } },
  test: { include: ['driver.test.mjs'], environment: 'node', server: { deps: { inline: [/export/] } } },
  server: { fs: { strict: false } },
};
