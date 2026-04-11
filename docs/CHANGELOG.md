## Unreleased

### 🔒 Security

* **deps:** fix `next-intl` open redirect vulnerability (GHSA-8f24-v5vv-gm5j) — bump from `4.9.0` to `4.9.1` (FIX-1775887777, 2026-04-11)
  - **WHAT:** Bump `next-intl` to `4.9.1` to patch open redirect vulnerability.
  - **WHY:** Consumers using redirect/rewrite utilities were at risk of arbitrary URL redirects.
  - **WHERE:** `package.json`
  - **HOW:** Version bump + `pnpm install` + `pnpm audit` verification.
* **deps:** fix transitive `next` DoS with Server Components (GHSA-q4gf-8mx6-v5v3) — force `next@16.2.3` via `pnpm.overrides` and bump `eslint-config-next`/`@next/eslint-plugin-next` to `16.2.3` (FIX-1775887778, 2026-04-11)
  - **WHAT:** Pin `next` to `16.2.3` via override; bump Next.js ESLint deps to `16.2.3`.
  - **WHY:** Transitive `next@16.2.2` via `@apollo/client-integration-nextjs` was vulnerable to DoS with Server Components.
  - **WHERE:** `package.json` (`pnpm.overrides`, `dependencies`, `devDependencies`)
  - **HOW:** Added `"next": "16.2.3"` to `pnpm.overrides`; bumped `eslint-config-next` and `@next/eslint-plugin-next` to `16.2.3`; regenerated lockfile; verified 0 audit vulnerabilities.
* **validate:** reject IPv4 addresses with leading zeros in `isValidIP` to prevent SSRF/ACL bypass (RFC 6943 §3.3) and add input length guard (FIX-1775887779, 2026-04-11)
  - **WHAT:** Reject ambiguous leading-zero IPv4 octets (e.g., `010.0.0.1`); cap input to 45 chars.
  - **WHY:** Leading zeros cause octal interpretation on some platforms (`010.0.0.1` → `8.0.0.1`), enabling SSRF bypass on IP-based allowlists.
  - **WHERE:** `src/util/validate/validate.util.ts`, `src/util/validate/validate.test.unit.ts`
  - **HOW:** Added octet-level leading-zero check; added length guard; added 7 regression tests covering SSRF vectors and edge cases.

### 🐛 Bug Fixes

* **upload:** fix file-descriptor leak in `getFileWebStream` when file exceeds size limit (FIX-1775887782, 2026-04-11)
  - **WHAT:** Destroy source `ReadStream` when size-validation `Transform` stream emits overflow error.
  - **WHY:** Without cleanup, the file descriptor leaks until GC — causing resource exhaustion under heavy upload load.
  - **WHERE:** `src/node/upload/upload.util.ts`
  - **HOW:** Added `sizeValidationStream.on('error', () => originalStream.destroy())` after pipe setup.

### ✨ Features

* **storage:** add `storage.size()` to node and react storage drivers (FEAT-1775887783, 2026-04-11)
  - **WHAT:** Add `size(): Promise<number>` to both `localStorage` (O(1)) and filesystem (`keys().length`) storage drivers.
  - **WHY:** Monitoring and dashboards need key counts without loading all values.
  - **WHERE:** `src/node/storage/storage.util.ts`, `src/react/storage/storage.util.ts`
  - **HOW:** Browser uses `localStorage.length`; node delegates to `keys()`. Added 3 unit tests.
* **object:** add type-safe `pick()` and `omit()` utilities (FEAT-1775887784, 2026-04-11)
  - **WHAT:** Add `pick<T, K>(obj, keys): Pick<T, K>` and `omit<T, K>(obj, keys): Omit<T, K>`.
  - **WHY:** Most common object subsetting operation — eliminates ad-hoc spread/delete patterns across consumers.
  - **WHERE:** `src/util/object/object.util.ts`
  - **HOW:** Set-based key lookup for O(K+N) performance. Added 12 unit tests.
* **string:** add `truncate()` utility with configurable suffix (FEAT-1775887785, 2026-04-11)
  - **WHAT:** Add `truncate(str, maxLength, suffix='…')` — guarantees result never exceeds `maxLength`.
  - **WHY:** Needed across UI components, log formatting, and error messages.
  - **WHERE:** `src/util/string/string.util.ts`
  - **HOW:** Unicode ellipsis default, `RangeError` guard for invalid bounds. Added 9 unit tests.
* **common:** add `clamp(value, min, max)` utility for numeric range clamping (FEAT-1775887788, 2026-04-11)
  - **WHAT:** Constrain a number to `[min, max]` with `RangeError` guard for invalid bounds.
  - **WHY:** Eliminates ad-hoc `Math.min(Math.max(...))` patterns across consumers.
  - **WHERE:** `src/util/common/common.util.ts`
  - **HOW:** One-liner with `RangeError` guard. Added 8 unit tests.
* **common:** add `groupBy(items, keyFn)` utility for array-to-Map transformation (FEAT-1775887789, 2026-04-11)
  - **WHAT:** Group array items into `Map<K, T[]>` keyed by selector function result.
  - **WHY:** Eliminates ad-hoc `reduce` patterns; `Map` return enables O(1) group lookup and arbitrary key types.
  - **WHERE:** `src/util/common/common.util.ts`
  - **HOW:** Single-pass iteration with `Map.get()`/`.set()`. Added 5 unit tests.

### 🐛 Bug Fixes (Phase 3)

* **fs:** fix `addGitIgnoreEntry` writing a leading newline when creating a new `.gitignore` (FIX-1775887786, 2026-04-11)
  - **WHAT:** New `.gitignore` files started with a blank line because the template used `\n${entry}\n`.
  - **WHY:** Creates non-standard file format; some linting tools and editors flag leading whitespace.
  - **WHERE:** `src/node/fs/fs.util.ts`
  - **HOW:** Changed new-file branch to `${entry}\n`; append branch still uses `\n${entry}\n`.

### 🧪 Test Coverage (Phase 3)

* **storage:** add 3 integration tests for node `storage.size()` (TEST-1775887787, 2026-04-11)
  - Covers empty state, populated state (2 keys), and driver error fallback.
  - **WHERE:** `src/node/storage/storage.test.unit.ts`

### 🔒 Security (2026-04-12)

* **ci:** add top-level `permissions: {}` to `deploy.yml` for least-privilege enforcement (FIX-1775930297, 2026-04-12)
  - **WHAT:** Add `permissions: {}` at the workflow level in `deploy.yml`.
  - **WHY:** Without top-level restrictions, any future jobs added to this workflow inherit overly permissive repo-default permissions.
  - **WHERE:** `.github/workflows/deploy.yml`
  - **HOW:** Inserted `permissions: {}` between `concurrency` and `jobs`, consistent with `check.yml` and `codeql.yml`.
* **ci:** pin `@cyclonedx/cdxgen` to `12.1.5` in deploy workflow (FIX-1775930298, 2026-04-12)
  - **WHAT:** Replace unpinned `npx -y @cyclonedx/cdxgen` with `npx -y @cyclonedx/cdxgen@12.1.5`.
  - **WHY:** Unpinned `npx -y` fetches the latest version at runtime; a compromised NPM release could execute arbitrary code inside the privileged deploy pipeline.
  - **WHERE:** `.github/workflows/deploy.yml`
  - **HOW:** Pinned version in the `npx` invocation with inline comment for explicit bumping.
* **deps:** add `minimumReleaseAge: "3 days"` to Renovate config (FIX-1775930299, 2026-04-12)
  - **WHAT:** Add `minimumReleaseAge` field to prevent auto-merging packages published less than 3 days ago.
  - **WHY:** Protects against supply-chain attacks (e.g., ua-parser-js, event-stream) where malicious versions are quickly yanked.
  - **WHERE:** `renovate.json`
  - **HOW:** Added `"minimumReleaseAge": "3 days"` to root config object.

### ✨ Features (2026-04-12)

* **common:** add `debounce(fn, waitMs)` utility with `.cancel()` support (FEAT-1775930300, 2026-04-12)
  - **WHAT:** Add type-safe `debounce<T>(fn, waitMs): T & { cancel(): void }` to common utilities.
  - **WHY:** Debounce is needed across search inputs, resize handlers, and form validation. Eliminates scattered, inconsistent implementations.
  - **WHERE:** `src/util/common/common.util.ts`, `src/util/common/common.test.unit.ts`
  - **HOW:** Uses `setTimeout`/`clearTimeout` with proper `this` binding. Added 6 unit tests covering delay, reset, cancel, zero-wait, invalid args, argument forwarding.
* **common:** add `retry(fn, options)` async utility with exponential backoff (FEAT-1775930301, 2026-04-12)
  - **WHAT:** Add `retry<T>(fn, { attempts?, delayMs?, backoff? }): Promise<T>` for async retry operations.
  - **WHY:** Retry logic is needed across HTTP clients, database connections, and external APIs. Eliminates scattered implementations with inconsistent backoff strategies.
  - **WHERE:** `src/util/common/common.util.ts`, `src/util/common/common.test.unit.ts`
  - **HOW:** Configurable attempts (default 3), delay (default 1000ms), optional exponential backoff. Added 7 unit tests covering first-try success, retry-then-succeed, exhaustion, defaults, backoff timing, zero-delay, and invalid args.