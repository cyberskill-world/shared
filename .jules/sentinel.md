## 2025-05-24 - Regex Injection in `regexSearchMapper`

**Vulnerability:** The `regexSearchMapper` utility constructed a dynamic Regular Expression from user input without escaping special regex characters. While it correctly handled accent replacement, it left other characters (like `.`, `(`, `)`) unescaped, allowing for Regex Injection (potentially leading to ReDoS or application crashes).

**Learning:** When creating "smart" search utilities that map characters (like accent insensitivity), it's easy to focus on the mapping logic and forget that the *rest* of the string is also becoming part of the regex pattern.

**Prevention:** Always use an `escapeRegExp` utility to escape the entire input string before applying specific transformations or wrapping it in `new RegExp()`. We added `escapeRegExp` to `src/util/common/common.util.ts` and integrated it into `regexSearchMapper`.
