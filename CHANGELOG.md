## [3.13.0](https://github.com/cyberskill-world/shared/compare/v3.12.0...v3.13.0) (2026-03-27)

### ✨ Features

* correct vite.config.ts ([702e2bf](https://github.com/cyberskill-world/shared/commit/702e2bfa05a69dc51708346d7b0972dfc30b5c2b))

## [3.12.0](https://github.com/cyberskill-world/shared/compare/v3.11.0...v3.12.0) (2026-03-27)

### ✨ Features

* register before recursing to handle circular references within arrays ([87a6426](https://github.com/cyberskill-world/shared/commit/87a642600269020a031f094988d2d888d5f6a5fb))
* update libs ([d8f841f](https://github.com/cyberskill-world/shared/commit/d8f841f714ffe34dba4a7e889957d3334ea47716))

### 🐛 Bug Fixes

* **deps:** update all non-major dependencies ([#301](https://github.com/cyberskill-world/shared/issues/301)) ([f2677be](https://github.com/cyberskill-world/shared/commit/f2677be14635cf1723c1467eed1c123634d95d80))

### ⚡ Performance

* optimize serializer to prevent array allocation on each node ([5148579](https://github.com/cyberskill-world/shared/commit/5148579f8a728599afff14bf69b0ae935b085b2e))

### ♻️ Refactoring

* **serializer:** improve type safety and exclude Date handler from precomputed array ([3af23f6](https://github.com/cyberskill-world/shared/commit/3af23f64808b20e7aa04282e2da9d00efec3e8db))

## [3.11.0](https://github.com/cyberskill-world/shared/compare/v3.10.0...v3.11.0) (2026-03-20)

### ✨ Features

* remove localforage ([e2ef422](https://github.com/cyberskill-world/shared/commit/e2ef422248fd5538c4486219d5289b9e72b5587c))

## [3.10.0](https://github.com/cyberskill-world/shared/compare/v3.9.0...v3.10.0) (2026-03-19)

### ✨ Features

* correct trustProxy ([3e0a766](https://github.com/cyberskill-world/shared/commit/3e0a7664a17b15adad6c0b2dc94befa8909782d3))

## [3.9.0](https://github.com/cyberskill-world/shared/compare/v3.8.0...v3.9.0) (2026-03-19)

### ✨ Features

* when trustProxy is not explicitly set, suppress the ERR_ERL_UNEXPECTED_X_FORWARDED_FOR ([9749772](https://github.com/cyberskill-world/shared/commit/9749772a017ec23f5d07db86fcdcef22126b57ad))

## [3.8.0](https://github.com/cyberskill-world/shared/compare/v3.7.0...v3.8.0) (2026-03-18)

### ✨ Features

* revert eslint plugins ([08a7462](https://github.com/cyberskill-world/shared/commit/08a7462798e61684463ae62dfc08399c88ef5f76))

## [3.7.0](https://github.com/cyberskill-world/shared/compare/v3.6.0...v3.7.0) (2026-03-18)

### ✨ Features

* improvement ([7f66f79](https://github.com/cyberskill-world/shared/commit/7f66f795666afa5d9781d437a8d765b277bfc91f))
* replace @vitejs/plugin-react-swc with @vitejs/plugin-react ([3ec25fb](https://github.com/cyberskill-world/shared/commit/3ec25fbb93957e4a3545f51c37a02c561b4b6186))

# [3.6.0](https://github.com/cyberskill-world/shared/compare/v3.5.0...v3.6.0) (2026-03-18)


### Features

* add --if-present to pre-push script ([e48cfe0](https://github.com/cyberskill-world/shared/commit/e48cfe0bbbc5f2f99ab363d9206f6c8ce001ba7f))
* add --if-present to pre-push script ([eb4e8b1](https://github.com/cyberskill-world/shared/commit/eb4e8b15823cd1986030d85f17e12e220c80bd03))
* remove .simple-git-hooks.json when reset ([e4c8c3b](https://github.com/cyberskill-world/shared/commit/e4c8c3ba02bbd593e6f10ed7503fbabe07e332e1))

# [3.5.0](https://github.com/cyberskill-world/shared/compare/v3.4.0...v3.5.0) (2026-03-18)


### Features

* add default exports ([9daba4f](https://github.com/cyberskill-world/shared/commit/9daba4f0a9c2ca1eb5e1aafa49e00afb0fb38491))
* add pnpm test to pre-push hook ([8a2861d](https://github.com/cyberskill-world/shared/commit/8a2861d278e4c1d3e252613f94ebea8251bcb9e0))
* improvements ([f2de0e8](https://github.com/cyberskill-world/shared/commit/f2de0e81bc515f46ff484158dc7616c67df99d1f))

# [3.4.0](https://github.com/cyberskill-world/shared/compare/v3.3.0...v3.4.0) (2026-03-17)


### Features

* make second param of createModel as optional ([fd77033](https://github.com/cyberskill-world/shared/commit/fd77033ebeb770527d04726d05a3c4a6ad5b76a6))

# [3.3.0](https://github.com/cyberskill-world/shared/compare/v3.2.1...v3.3.0) (2026-03-17)


### Bug Fixes

* address rate limiting review feedback - configurable options, proxy trust, and tests ([fc75594](https://github.com/cyberskill-world/shared/commit/fc755945a55ce1427e5839acdc66744e80ee559b))
* **deps:** update all non-major dependencies ([d2309e8](https://github.com/cyberskill-world/shared/commit/d2309e87019465a6b367bc16b4c7426bff28741e))
* **deps:** update dependency vite to v8 ([4164b21](https://github.com/cyberskill-world/shared/commit/4164b21dd2159b52e3052aa79138fe1a48956865))
* rebase palette-a11y-apollo-error onto main ([0951335](https://github.com/cyberskill-world/shared/commit/0951335ab71d725440e2f544f2e76d7b1a548b55))
* Revert unprompted package upgrades and out-of-scope changes ([d4964f2](https://github.com/cyberskill-world/shared/commit/d4964f289a2984a1dba9bee6b29754472bf2ca7b))
* update overrides to fix high severity vulnerabilities in CI ([a073332](https://github.com/cyberskill-world/shared/commit/a0733323add264b13980b81712d07e0f61d159c8))
* vite config ([f20ce3b](https://github.com/cyberskill-world/shared/commit/f20ce3b8d3ccb6f1125a453137be4c557a5aabe7))


### Features

* **a11y:** add aria-describedby to ApolloErrorComponent ([e955f58](https://github.com/cyberskill-world/shared/commit/e955f587f2ccd32667b0b0af7fbe3f0aaa7e72f6))
* implement global rate limiting using express-rate-limit ([82fcb23](https://github.com/cyberskill-world/shared/commit/82fcb23cda7b5af555c21bf0871eb41801da5814))
* implement global rate limiting using express-rate-limit ([a8d0b33](https://github.com/cyberskill-world/shared/commit/a8d0b33044c1c770ad5042b125473481fdcb956c))
* improvements ([6072088](https://github.com/cyberskill-world/shared/commit/6072088a6bdaf1e02be16e3536e5df9cf2d20eba))
* improvements ([179a32d](https://github.com/cyberskill-world/shared/commit/179a32d8ef49c55393f57b466509ed76f2ce0063))
* improvements ([095a70b](https://github.com/cyberskill-world/shared/commit/095a70b35d74010a63a2858c4273af3bcd18b237))
* update libs ([ef0a460](https://github.com/cyberskill-world/shared/commit/ef0a460106c4b413f4652474732efa1af0e2fc76))


### Performance Improvements

* optimize `deepClone` with pre-allocated array and `for` loop ([39be0d8](https://github.com/cyberskill-world/shared/commit/39be0d81abca36776b8c8279876b8da64cd62b30))

## [3.2.1](https://github.com/cyberskill-world/shared/compare/v3.2.0...v3.2.1) (2026-03-06)


### Bug Fixes

* ci ([d0b90b3](https://github.com/cyberskill-world/shared/commit/d0b90b3e0e284c4fa5fdcec30f66b2f9bde893f4))
* ci ([59b84e6](https://github.com/cyberskill-world/shared/commit/59b84e6de1e215d94751c2f97c88ceda00070d74))

# [3.2.0](https://github.com/cyberskill-world/shared/compare/v3.1.0...v3.2.0) (2026-03-06)


### Features

* add more test cases ([6cf237e](https://github.com/cyberskill-world/shared/commit/6cf237ee579742b65f3036b528d6e2d091afc997))
* update libs ([4102ec9](https://github.com/cyberskill-world/shared/commit/4102ec979d5678d23d5651132af16b58ec6e90d2))

# [3.1.0](https://github.com/cyberskill-world/shared/compare/v3.0.0...v3.1.0) (2026-03-03)


### Features

* turn off cjs ([4a8e974](https://github.com/cyberskill-world/shared/commit/4a8e974911ad5880b1d7f6dfe887289da00f32dc))
* turn off cjs ([4f0897c](https://github.com/cyberskill-world/shared/commit/4f0897cd718f3286f9f65d70c6fdce7023003e7b))

# Changelog

All notable changes to this project are documented in [GitHub Releases](https://github.com/cyberskill-world/shared/releases).

This project adheres to [Semantic Versioning](https://semver.org/) and uses [semantic-release](https://github.com/semantic-release/semantic-release) for automated versioning and changelog generation.
