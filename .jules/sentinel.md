## 2025-02-14 - Add Explicit `x-powered-by` Header Disablement

**Vulnerability:** Information Leakage / Fingerprinting
**Learning:** While `helmet` usually removes the `X-Powered-By` header by default, if a consumer app overrides or disables `helmet`, the Express framework defaults to advertising itself. Relying solely on a middleware for framework-level header suppression creates a gap in defense-in-depth.
**Prevention:** Always explicitly call `app.disable('x-powered-by')` on the Express application instance during setup to provide an additional layer of security against framework fingerprinting.

## 2025-02-09 - Prototype Pollution Defense-in-Depth Implementation

**Vulnerability:** Found potential for prototype pollution in utility functions (`deepMerge`, `setNestedValue`, and `normalizeMongoFilter`) if they were ever passed user-controlled objects, even though the current implementation is mostly immune to basic pollution.
**Learning:** Utilities that parse and iterate over object properties (like deep merge or filter normalization) can become attack vectors if the `__proto__` key is parsed and used to assign to the object's prototype via its accessor. Keys like `constructor` and `prototype` are legitimate data field names on plain objects and do not cause prototype mutation when set as own properties, so they should not be blocked.
**Prevention:** Always add an explicit check to ignore `__proto__` in recursive object parsing utilities. Centralize this check in a shared constant to avoid inconsistencies. E.g.: `const PROTOTYPE_POLLUTION_KEYS = new Set(['__proto__']); if (PROTOTYPE_POLLUTION_KEYS.has(key)) continue;`
