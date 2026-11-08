# QA Phase 2 (chain 015, M8-b to M8-e) mutants at preview-image-generator 6c613a5.
# The guards from the implementer's list (M8 document, TDD Compliance) that M8-b to M8-e own; M8-a's guards
# (once-only, message test, registration order, pool-exists) wait for CR-27's round.
# Selected by MUT_ID; each target must occur exactly once (else the mutator exits non-zero).
import os
import sys

SV = 'src/server.ts'
GI = 'src/generateImage.ts'
GP = 'src/getPool.ts'
CF = 'src/config.ts'

MUTANTS = {
    # M8-b (I-1 precondition "body parsed"): the object test, its null conjunct, the catch swallowing.
    'm8b-object-test-dropped': [(SV, "      if (typeof parsedBody !== 'object' || parsedBody === null) throw new TypeError('Request body is not an object.');\n", '')],
    'm8b-null-conjunct-dropped': [(SV, "if (typeof parsedBody !== 'object' || parsedBody === null) throw",
                                   "if (typeof parsedBody !== 'object') throw")],
    'm8b-catch-rethrows': [(SV, "      res.writeHead(500);\n      res.end();\n      console.error(err);\n      return;\n",
                            "      throw err;\n")],
    # M8-c: the page close in finally; the base's sequential image/delete order.
    'm8c-finally-no-close': [(GI, 'await page.close().catch((err) => { console.error(err); });', 'void 0;')],
    'm8c-sequential-delete': [(GI, "  const [image] = await Promise.all([\n    getPool().use((p) => generateMessagePreviewImage(p, message)),\n    deleteMessagePreviewImages(messageId),\n  ]);",
                               "  const imagePromise = getPool().use((p) => generateMessagePreviewImage(p, message));\n  await deleteMessagePreviewImages(messageId);\n  const image = await imagePromise;")],
    # M8-d: the factory returns null for an error (the base); no creation-error handler.
    'm8d-factory-returns-null': [(GP, '        throw err;', '        return null;')],
    'm8d-no-create-error-handler': [(GP, "  pool.on('factoryCreateError', (err) => { waitingClients.dequeue()?.reject(err); });\n", '')],
    # M8-e (I-1 precondition "auth matches API_KEY"): the start gate removed; empty treated as set.
    'm8e-gate-dropped': [(CF, 'if (!process.env.API_KEY) {', 'if (false) {')],
    'm8e-empty-allowed': [(CF, 'if (!process.env.API_KEY) {', 'if (process.env.API_KEY === undefined) {')],
}

mutant_id = os.environ['MUT_ID']
edits = MUTANTS[mutant_id]
sources = {}
for path, old, _ in edits:
    sources.setdefault(path, open(path).read())
for path, old, new in edits:
    n = sources[path].count(old)
    if n != 1:
        sys.exit(f'mutant {mutant_id}: target in {path} found {n} times')
    sources[path] = sources[path].replace(old, new)
for path, text in sources.items():
    open(path, 'w').write(text)
