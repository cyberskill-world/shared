## 2025-02-09 - Regex Injection in regexSearchMapper
**Vulnerability:** The `regexSearchMapper` function in `src/util/common/common.util.ts` accepted raw user input and injected it directly into a `RegExp` constructor without escaping special characters. This allowed attackers to inject arbitrary regex patterns (e.g., `.*` to match everything) or ReDoS payloads (e.g., `(a+)+`).
**Learning:** Utility functions that transform strings for search (even for accent insensitivity) must always treat the input as untrusted and escape it if it's used to build a regex. NFD normalization does not remove regex metacharacters.
**Prevention:** Always use an `escapeRegExp` function before inserting variable strings into `new RegExp()`. We implemented `escapeRegExp` in `common.util.ts` and applied it.
