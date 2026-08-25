# `probe-qa-p3-render-instrument-reduction/` — ruling devops F-1 by execution

**Built by**: `qa-hooks-013-3`, 2026-08-25. **Question routed here**: `devops-hooks-013-2`'s **F-1**
(deployment record `14bc31c`, §12.6) — *"the serving tree carries 4 of the 8 test blocks of QA's
formally adopted render instrument, and no verdict covers the remainder. Decide whether the removals
are correct and whether a verdict is owed at `2d90e8a`."*

The instrument is `src/utils/__tests__/013-qa-toast-vessel-render.test.ts`, adopted at `664e0c0`
(F-QA23). It is QA's, so the ruling is QA's.

## Limb 1 — are the removals correct? **YES.** Ruled by identifying every removed case

The four removed `it(` blocks are the whole of the `CodeMessageNotice — does the converted
code-import notice actually render?` describe block:

| Removed case | Subject |
|---|---|
| renders NOTHING when there is no dropped-components fact | `CodeMessageNotice` |
| renders the notice TEXT when the fact is present | `CodeMessageNotice` |
| carries a visible styling hook rather than rendering bare/unstyled | `CodeMessageNotice` |
| CLEARS when the fact goes away | `CodeMessageNotice` |

`2d90e8a` deletes `src/app/message/m/[id]/_layout/CodeMessageNotice.tsx` outright, together with
`codeMessageDroppedNotice` in `MessageProvider` and its mount in `layout.tsx`. **Tests of a deleted
component are correctly deleted with it.** No surviving behaviour lost coverage: the
`paste surface guard '!error && settledNotice' — conjunct isolation` block survives **whole** (four
cases), and the `NullableComponent` `it.each` block survives whole (five cases).

## Limb 2 — is a verdict owed? **YES, and NOT at `2d90e8a`**

Nothing is *uncovered* by the removal. What is true is that the **surviving** instrument has never
been executed under a QA verdict at `2d90e8a` — `QA Complete` was reached at `4a7126b`. A verdict is
owed, and per steering's hold it is owed at the **post-rider tip**, not at `2d90e8a`, which is about
to be superseded by the MEDIUM-1 rider. Taking one here would be a verdict thrown away.

## Correction to F-1's magnitude: it is **4 of 13**, not 4 of 8

**Measured by running the file, not by counting its text:**

| Tree | `it(` / `test(` matches | **tests actually run** |
|---|---|---|
| `4a7126b` | 8 | **13 passed** |
| `2d90e8a` | 4 | **9 passed** |

The `NullableComponent` describe block uses **`it.each` with five rows**, which a predicate matching
`it(` / `test(` cannot see. So the instrument lost **4 of 13 cases (~31%)**, not half.

**The delta is right and the substance of F-1 stands** — four cases went, and devops was right that
nobody had checked them. What is wrong is the word *"half"*, which is the word that makes the finding
alarming. Devops's counter was sound (`grep -c`, computing before any output filter); **the predicate
was the wrong one.** That is this chain's recurring shape, and it is the third instance in this QA
pass alone. **Run the suite; do not count its source.**

## Residual this ruling found, and F-1 did not: a dangling pointer to a deleted disclosure

The trim removed the file's closing `WHAT THIS CANNOT ESTABLISH` block **and left the header's
pointer to it** — `instrument-at-2d90e8a.ts:14` still reads *"(see \"WHAT THIS CANNOT ESTABLISH\" at
the foot of this file)"*, and there is no such section. `git grep -c` for the phrase returns 1 at
`2d90e8a`: **the pointer, not the section.** An existence check on that phrase therefore reports the
disclosure as present when it is gone.

**What the deleted block carried matters more than the pointer.** Items 1–3 were about
`CodeMessageNotice` and died correctly with it. **Item 4 did not**: it recorded that the paste
surface's render path is asserted only as source text, called it *"THE LARGER OF THE TWO GAPS and the
site the owner's ruling actually named"*, and stated the falsity signature routed to the owner —
*"he pastes a rows-B/D payload into New Message and sees NO persistent warning in the modal (or sees
one that never clears when he fixes the JSON)."*

**That sentence is BC-18's predicate verbatim.** The trim deleted the in-repo statement of BC-18's own
falsity signature and left a pointer to it. Raised as **F-QA33**; same class as code review's LOW-1
(`ID_LAYOUT`, `NOTICE`), and it belongs in the same repair.

## Files

| File | What it is |
|---|---|
| `instrument-at-4a7126b.ts`, `instrument-at-2d90e8a.ts` | the instrument at each tree, by `git show` |
| `diff-4a7126b-to-2d90e8a.txt` | every removed case, readable in one place |
| `run-4a7126b.txt`, `run-2d90e8a.txt` | **13 passed** and **9 passed** — the counts this ruling rests on |

## Reproduce

```sh
cd /usr/local/bin/hooks/website
for REV in 4a7126b 2d90e8a; do
  rm -rf /tmp/tvcount-$REV && mkdir -p /tmp/tvcount-$REV
  git archive $REV | tar -x -C /tmp/tvcount-$REV
  ln -sfn /usr/local/bin/hooks/website/node_modules /tmp/tvcount-$REV/node_modules
  ( cd /tmp/tvcount-$REV && DATABASE_URL='postgresql://qa:qa@127.0.0.1:1/deadport' \
      npx vitest run src/utils/__tests__/013-qa-toast-vessel-render.test.ts )
done
```
