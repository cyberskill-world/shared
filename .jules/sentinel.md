
## 2025-02-14 - Add Explicit `x-powered-by` Header Disablement
**Vulnerability:** Information Leakage / Fingerprinting
**Learning:** While `helmet` usually removes the `X-Powered-By` header by default, if a consumer app overrides or disables `helmet`, the Express framework defaults to advertising itself. Relying solely on a middleware for framework-level header suppression creates a gap in defense-in-depth.
**Prevention:** Always explicitly call `app.disable('x-powered-by')` on the Express application instance during setup to provide an additional layer of security against framework fingerprinting.
