# Next.js internals, 16.1.6 vs 16.4.6 (npm pack tarballs), 2026-11-20T03:16Z

Command: npm pack -q next@<v>; tar tzf (listing) and cmp of extracted files.
- SAME dist/shared/lib/router-context.shared-runtime.js
- SAME dist/api/app-dynamic.js
- SAME dist/shared/lib/loadable.shared-runtime.js
- SAME dist/shared/lib/dynamic.js
- SAME dist/shared/lib/app-dynamic.js
- DIFF dist/shared/lib/lazy-dynamic/loadable.js

```
63,64c63
<         }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSR, {
<             reason: "next/dynamic",
---
>         }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_dynamicbailouttocsr.BailoutToCSRForNextDynamic, {
```
