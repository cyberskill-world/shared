## 2025-02-20 - [NFD Normalization Bug]
**Learning:** Using `String.prototype.normalize('NFD')` before regex generation for search can break matching against NFC content if the regex pattern relies on pre-composed characters.
**Action:** Always verify if target content is NFC or NFD before normalizing input. For web content, NFC is standard, so avoid NFD normalization unless necessary for decomposition logic.
