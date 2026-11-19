# Architect delta pass, plan 017 revision 2: draft-map serialise cost

Captured 2026-11-19T00:07Z by architect-hooks-017 for AF-16 in
`architecture/017-existing-items-backlog-architecture-findings.md`.

`m3-draft-map-serialise-cost.txt` holds `JSON.stringify` and `JSON.parse` times of a `messageDrafts`-shaped map
(`{ <key>: { data, name, editedAt } }`) at 1, 5 and 20 entries. Each entry is about 0.37 MB: content of 2000
characters and 10 embeds, each with a 4000-character description and 25 fields. Each figure is the mean of 20
runs, on Node v24.14.0 on this box, run under `timeout 60` by an inline `node -e` script.

What it measures is the serialise and parse work only. It does not include a browser's `localStorage.setItem` or
the cost to other tabs of handling the `storage` event, so treat it as a lower bound on what each edit costs.
