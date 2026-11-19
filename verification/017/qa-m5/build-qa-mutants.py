#!/usr/bin/env python3
"""Build QA's M5 hand mutants as exact-once anchors against website 4b8db9c (M5's reviewed tip).

Usage: python3 -I build-qa-mutants.py <website repo> <node-out.json> <lane-out.json>
Each mutant's "old" must occur exactly once in its file at 4b8db9c (read with git show); the script refuses otherwise.
Node set: run with the whole suite (about 13 s). Lane set: run by lane-mutants.sh against the real-Postgres lane, since
the Node suite substitutes the database (NM-22's class).
Scope (qa.md, Phase 2 step 4): the Irreversible Side-Effect Register guards M5 changed, E-1 (the website's bucket
deletes) and E-2 (the nonce commit), seeded at their branch conditions and decision constants: QA Phase 1's named
mutants NM-10 to NM-17, NM-22, NM-23 and NM-26, plus coupling mutants (each conjunct or disjunct alone) and the two
decision constants, which mutant-gen does not mutate (no `num` row for 120_000 or 40_000 in m5-mutants-gen.json).
NM-21 is not placed as a one-change mutant: the commit is one UPDATE ... FROM statement, no insert path exists to
mutate (the shape case and the lane's "inserts nothing" case hold the statement).
"""
import json
import subprocess
import sys

repo, node_out, lane_out = sys.argv[1], sys.argv[2], sys.argv[3]
SHA = '4b8db9c'
PI = 'src/server/api/utils/previewImage.ts'
PB = 'src/server/api/utils/previewBucket.ts'
SH = 'src/server/api/utils/shared.ts'

WHERE = ("  .where((eb) => eb.or([\n"
         "    eb('Messages.previewImageNonce', 'is', null),\n"
         "    sql<boolean>`\"Messages\".\"previewImageNonce\" collate \"C\" < ${nonce}`,\n"
         "  ]))\n")
NULL_DISJ = "    eb('Messages.previewImageNonce', 'is', null),\n"
LT_DISJ = "    sql<boolean>`\"Messages\".\"previewImageNonce\" collate \"C\" < ${nonce}`,\n"
AGE = "committedAt.getTime() - LastModified.getTime() >= SWEEP_AGE_MS"
COMMIT = "    const committed = await buildCommitPreviewNonceQuery(getPostgres(), id, nonce).execute();\n"
LOG = "      logFailure(id, failure, Date.now() - start);\n"

NODE = [
    ('NM-10-any-resolved-fetch-commits', PI,
     "return response.status === 204 ? null : failureClassOf(response.status);", "return null;"),
    ('NM-11-commit-unconditional', PI, WHERE, ""),
    ('qa-commit-null-disjunct-dropped', PI, NULL_DISJ, ""),
    ('qa-commit-order-disjunct-dropped', PI, LT_DISJ, ""),
    ('NM-12a-form1-deletes-new-object', PI,
     "if (prev) await deleteObjects([previewKey(id, prev)]);", "if (prev) await deleteObjects([previewKey(id, nonce)]);"),
    ('NM-12b-own-object-deleted-before-commit', PI, COMMIT,
     "    await deleteObjects([previewKey(id, nonce)]);\n" + COMMIT),
    ('qa-form2-dropped', PI,
     "    if (!committed.length) {\n      await deleteObjects([previewKey(id, nonce)]);\n      return;\n    }\n",
     "    if (!committed.length) {\n      return;\n    }\n"),
    ('qa-form1-dropped', PI, "    if (prev) await deleteObjects([previewKey(id, prev)]);\n", ""),
    ('qa-sweep-dropped', PI, "    await sweepOlderObjects(id, previewKey(id, nonce));\n", ""),
    ('NM-13-prefix-trailing-slash-dropped', PB, "previews/${messageId}/`", "previews/${messageId}`"),
    ('NM-14-dev-predicate-differs', PB, "${env.NODE_ENV === 'development'", "${process.env.NODE_ENV === 'development'"),
    ('NM-15a-line-carries-nonce', PI, LOG, "      logFailure(`${id} ${nonce}`, failure, Date.now() - start);\n"),
    ('NM-15b-line-on-204', PI, COMMIT,
     "    console.error(`${PREVIEW_FAILURE_PREFIX} id=${id} class=ok elapsedMs=0`);\n" + COMMIT),
    ('NM-15c-line-carries-content', PI, LOG,
     "      logFailure(`${id} ${JSON.stringify(message)}`, failure, Date.now() - start);\n"),
    ('NM-15d-line-carries-key', PI, LOG,
     "      logFailure(`${id} ${previewKey(id, nonce)}`, failure, Date.now() - start);\n"),
    ('qa-line-dropped', PI, LOG, ""),
    ('NM-16a-timer-not-cleared', PI, "    clearTimeout(timer);\n", ""),
    ('NM-16b-timeout-writes-two-lines', PI, "{ timedOut = true; controller.abort(); }",
     "{ timedOut = true; logFailure(id, 'no-answer-within-T', PREVIEW_ANSWER_TIMEOUT_MS); controller.abort(); }"),
    ('qa-timeout-labelled-network', PI, "return timedOut ? 'no-answer-within-T' : 'network-error';", "return 'network-error';"),
    ('NM-17-continuation-awaited', SH,
     "waitUntil(runPreviewContinuation({ id, nonce: mintNonce(savedAtMicros), message: message.data }));",
     "await runPreviewContinuation({ id, nonce: mintNonce(savedAtMicros), message: message.data });"),
    ('NM-23a-age-from-function-clock', PI, AGE, "Date.now() - LastModified.getTime() >= SWEEP_AGE_MS"),
    ('NM-23b-L-60s', PI, "SWEEP_AGE_MS = 120_000;", "SWEEP_AGE_MS = 60_000;"),
    ('qa-L-plus-one', PI, "SWEEP_AGE_MS = 120_000;", "SWEEP_AGE_MS = 120_001;"),
    ('qa-L-minus-one', PI, "SWEEP_AGE_MS = 120_000;", "SWEEP_AGE_MS = 119_999;"),
    ('NM-23c-age-guard-dropped', PI, "\n      && " + AGE, ""),
    ('qa-sweep-committed-key-conjunct-dropped', PI, "Key !== committedKey\n      && ", ""),
    ('NM-26-absent-reference-deletes-all', PI, "  if (!committedAt) return;\n",
     "  if (!committedAt) {\n    await deleteObjects((Contents ?? []).filter(({ Key }) => Key !== committedKey)"
     ".map(({ Key }) => Key as string));\n    return;\n  }\n"),
    ('qa-T-minus-one', PI, "PREVIEW_ANSWER_TIMEOUT_MS = 40_000;", "PREVIEW_ANSWER_TIMEOUT_MS = 39_999;"),
    ('qa-T-plus-one', PI, "PREVIEW_ANSWER_TIMEOUT_MS = 40_000;", "PREVIEW_ANSWER_TIMEOUT_MS = 40_001;"),
    ('qa-nonce-pad-15', PI, "padStart(16, '0')", "padStart(15, '0')"),
    ('qa-nonce-random-4-bytes', PI, "randomBytes(8)", "randomBytes(4)"),
    ('qa-nonce-leads-0', PI, "=> `v${clockMicros", "=> `0${clockMicros"),
    ('qa-clock-now', SH, "extract(epoch from clock_timestamp())", "extract(epoch from now())"),
]

LANE = [
    ('NM-22-replaced-read-unlocked', PI, "    .where('id', '=', id)\n    .forUpdate())", "    .where('id', '=', id))"),
    ('qa-collate-dropped', PI, '"Messages"."previewImageNonce" collate "C" < ${nonce}', '"Messages"."previewImageNonce" < ${nonce}'),
    ('qa-clock-now', SH, "extract(epoch from clock_timestamp())", "extract(epoch from now())"),
    ('NM-11-commit-unconditional', PI, WHERE, ""),
]


def build(rows):
    out = []
    for mid, path, old, new in rows:
        text = subprocess.run(['git', '-C', repo, 'show', f'{SHA}:{path}'], check=True, capture_output=True, text=True).stdout
        count = text.count(old)
        if count != 1:
            sys.exit(f'{mid}: anchor occurs {count} times in {path}')
        out.append({'id': mid, 'file': path, 'old': old, 'new': new})
    return out


node = build(NODE)
lane = build(LANE)
json.dump(node, open(node_out, 'w'), indent=1)
json.dump(lane, open(lane_out, 'w'), indent=1)
print(f'{len(node)} node mutants, {len(lane)} lane mutants')
