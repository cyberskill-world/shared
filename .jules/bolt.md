## 2025-02-20 - [NFD Normalization Bug]

**Learning:** Using `String.prototype.normalize('NFD')` before regex generation for search can break matching against NFC content if the regex pattern relies on pre-composed characters.
**Action:** Always verify if target content is NFC or NFD before normalizing input. For web content, NFC is standard, so avoid NFD normalization unless necessary for decomposition logic.

## 2025-02-20 - [Avoid Object.keys() inside JSON.stringify replacers]
**Learning:** Using `Object.keys()` or dynamically iterating over object properties inside a `JSON.stringify` replacer function causes significant performance degradation because it allocates a new array and loops for *every single key-value pair* being stringified.
**Action:** Always prefer explicit `typeof` and `instanceof` checks (or simple pre-computed arrays/maps) inside frequently called loop bodies or replacer functions over dynamic object introspection.
