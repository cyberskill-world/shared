## 2025-02-09 - Prototype Pollution Defense-in-Depth Implementation

**Vulnerability:** Found potential for prototype pollution in utility functions (`deepMerge`, `setNestedValue`, and `normalizeMongoFilter`) if they were ever passed user-controlled objects, even though the current implementation is mostly immune to basic pollution.
**Learning:** Utilities that parse and iterate over object properties (like deep merge or filter normalization) can become attack vectors if `__proto__`, `constructor`, or `prototype` keys are parsed and used to manipulate the object's prototype. Even if `Object.hasOwn` prevents immediate prototype escalation, explicitly preventing these keys adds a necessary layer of defense.
**Prevention:** Always add an explicit check to reject or ignore `__proto__`, `constructor`, and `prototype` in recursive object parsing utilities. E.g.: `if (key === '__proto__' || key === 'constructor' || key === 'prototype') continue;`
