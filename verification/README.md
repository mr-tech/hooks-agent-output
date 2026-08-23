# verification/

Runnable material — probes, generators, and frozen artifacts that later work is bound to.

Unlike the rest of this repository, which holds documents *about* the code, everything here is code
that runs against real systems. Read a script's header in full before running it.

**Chain-bound, unlike `tools/`.** Each artifact belongs to a numbered effort and is part of that
effort's record, so it lives under a directory named for that chain (`verification/004/`). Nothing
here is a standing utility; standing executables belong in `tools/`.

Three kinds live here:

- **one-shot probes** that answer a specific question for one chain;
- **generators and drop scripts**;
- **frozen artifacts** — a captured population or baseline that later work is bound to, which is why
  they are committed rather than regenerated.

**Bind verification to a commit SHA rather than to a recomputed content hash** where you have the
choice; this material is under version control and the SHA is the stronger identity.

*Empty. No chain has produced verification material in this repository yet.*
