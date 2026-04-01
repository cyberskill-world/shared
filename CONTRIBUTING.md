# Contributing to CyberSkill Shared

Welcome to the CyberSkill Shared Library! We appreciate your interest in contributing. This document outlines the standards and conventions used in this repository to maintain code quality, consistency, and a smooth onboarding experience for all developers.

## File Naming Conventions

To keep the codebase organized and discoverable, we enforce strict file naming conventions using descriptive suffixes. All files should concisely indicate their primary role in the system:

- **`*.type.ts`**: Contains TypeScript interfaces, type definitions, and mapped types. Should not contain runtime logic.
- **`*.util.ts`**: Contains pure utility functions, helpers, and shared logic. Functions should generally be side-effect free where possible.
- **`*.controller.ts`**: Contains business logic orchestration, database interactions, or class-based service patterns.
- **`*.constant.ts`**: Contains shared static values, configuration defaults, and enums.
- **`index.ts`**: Acts purely as a barrel file to export public members from a directory. Avoid placing logic in `index.ts`.

Example structure:

```
mongo/
  ├── mongo.util.ts
  ├── mongo.type.ts
  ├── mongo.controller.ts
  └── index.ts
```

## Testing Directives

We maintain a high standard of reliability through comprehensive automated testing. Tests are categorized into two primary types, and their file names must reflect this categorization:

### Unit Tests (`*.test.unit.ts`)

- **Scope**: Tests individual functions, classes, or modules in isolation.
- **Dependencies**: External dependencies (APIs, databases, file system) should be mocked or stubbed.
- **Placement**: Place unit test files in the same directory as the code they are testing. This ensures tests are easily discoverable and updated alongside the implementation.
    - Example: `mongo.util.ts` should be tested in `mongo.test.unit.ts`.

### End-to-End Tests (`*.test.e2e.ts`)

- **Scope**: Tests complex workflows and integrations across multiple components or services.
- **Dependencies**: Uses real databases (e.g., test MongoDB instances) and external systems where appropriate.
- **Placement**: Place E2E test files in the `tests/e2e` directory or alongside the entry points they test, separated logically from unit tests.

## General Guidelines

1. **Type Safety**: Avoid using `any`. Use `unknown` and perform type narrowing if the type cannot be determined statically.
2. **Linting & Formatting**: Ensure your code passes all ESLint rules and is properly formatted before submitting a pull request. Run `npm run lint:fix` to auto-format.
3. **Commit Messages**: We enforce conventional commits (e.g., `feat: Add new utility`, `fix: Resolve edge case in controller`).

Thank you for contributing to CyberSkill!
