# Fix Round 4 design read — where the `a🙂` fence keystrokes' time goes, on plain Slate

Run 2026-11-24T22:4xZ by architect-019. Node v24.14.0. `slate` 0.123.0 is the website workspace's installed copy, read-only. Each
script ran in a capped scope (`systemd-run --user --scope -p RuntimeMaxSec=120|180 -p MemoryMax=2G -p TasksMax=64`). No website
source is imported: the probes build plain Slate documents of N lines, each `a🙂` as one text, and apply the operations Fix Round 3
names. Median of 5 runs per row.

Process note: both `.mjs` files were written with a shell heredoc, not the Write tool. They are probe scripts, not record
documents. This README and the findings section were written with Write and Edit.

## `dirty-probe.mjs` → `dirty-probe.out.txt`

The retype first (`setNodes` on every line, which dirties N lines), then the round's 4 operations per line (`set_node`,
`remove_text`, `insert_node` emoji, `insert_node` padding), all inside `Editor.withoutNormalizing`. `quiet: true` suppresses the
settle's own dirty paths through an `editor.getDirtyPaths` override while it runs. The retype's N stay pending.

| quiet | N | median ms | µs per op |
|---|---|---|---|
| false | 200 | 96.6 | 120.7 |
| false | 1,000 | 1,996.7 | 499.2 |
| false | 2,000 | 8,357 | 1,044.6 |
| true | 200 | 26.1 | 32.7 |
| true | 1,000 | 517.7 | 129.4 |
| true | 2,000 | 2,039.8 | 255 |

The 200-line row matches the implementer's tip close on line 2 (96.7 / 93.0 ms). The cost per operation grows linearly with N, so
the total is quadratic.

## `dirty-probe-2.mjs` → `dirty-probe-2.out.txt`

Two forms, each applied as hand-built operations (`editor.apply`), inside `withoutNormalizing`:
- **inPlace**: 4 operations per line, the type folded into the `set_node`.
- **rebuild**: `remove_node` and `insert_node` of the line with its new children, 2 operations per line.

`quietAll: true` makes `editor.getDirtyPaths` return no paths for every operation.

| form | quietAll | N=200 ms | N=1,000 ms | N=2,000 ms |
|---|---|---|---|---|
| inPlace | false | 72.3 | 1,559 | 6,818.3 |
| inPlace | true | 3.7 | 30.6 | 88.6 |
| rebuild | false | 59 | 1,469.6 | 6,523.6 |
| rebuild | true | 1.0 | 11.6 | 39.2 |

Reading: hand-built operations and rebuilding each line both stay quadratic while the operations dirty paths. The cost is Slate's
pending dirty-path list. Slate's `updateDirtyPaths`, called from `apply`, rebuilds that whole list with string keys on every
path-transforming operation (`insert_node`, `remove_node`). A fence keystroke leaves about N lines pending. With nothing pending,
the same operations cost 11.6 to 30.6 ms at 1,000 lines.

Scope: plain Slate only. The site's own work per keystroke is not in these figures: the fence scan, the unit parse through the
wasm, `liftLoaded` over the changed lines, and the `apply` override. React and slate-react are not mounted, the same as the
implementer's probe.
