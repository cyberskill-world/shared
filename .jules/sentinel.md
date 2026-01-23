# Sentinel's Journal

## 2024-05-22 - Regex Injection in Search Mapper
**Vulnerability:** User input was being used to construct a RegExp in `regexSearchMapper` without escaping special characters. This allowed for Regex Injection and potential ReDoS attacks.
**Learning:** Utility functions that transform strings for regex usage must always assume the input is untrusted and escape it first.
**Prevention:** Added `escapeRegExp` utility and applied it to the input string in `regexSearchMapper` before any processing.
