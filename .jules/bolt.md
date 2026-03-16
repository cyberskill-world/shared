## 2025-02-20 - [NFD Normalization Bug]

**Learning:** Using `String.prototype.normalize('NFD')` before regex generation for search can break matching against NFC content if the regex pattern relies on pre-composed characters.
**Action:** Always verify if target content is NFC or NFD before normalizing input. For web content, NFC is standard, so avoid NFD normalization unless necessary for decomposition logic.

## 2025-03-06 - Array cloning optimization
**Learning:** While `Array.from({ length: len })` seems like a good way to pre-allocate an array, it actually iterates internally to fill the array with `undefined` values, and then the subsequent `for` loop iterates again to overwrite them. This makes it slower than `Array.map`. The optimal way to pre-allocate an array in V8 is `new Array(len)`, though it might require a linting override (e.g. `// eslint-disable-next-line unicorn/no-new-array`).
**Action:** Always benchmark optimizations. When cloning or mapping arrays where performance is critical, use `new Array(len)` with a traditional `for` loop instead of `Array.map` or `Array.from`.
