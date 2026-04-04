# Comprehensive Test Coverage Gap Report

## Test Coverage Analysis (Baseline)
- Unit Testing Framework: Vitest (`vitest.config.ts`, `src/config/vitest/`)
- E2E Testing Framework: Playwright (`playwright.config.ts`, `vitest.config.ts` via browser/e2e mode)

## Identified Coverage Gaps
### Unit Test Gaps
- **High Priority (Core logic)**
  - `src/react/apollo-error/apollo-error.component.tsx` (Missing lines: 67, 73 - Focus Trap logic unhandled edge cases)
  - `src/node/ws/ws.util.ts` (Missing lines: 32, 36 - Path and server missing validation logic)

## Stories & Tasks Checklist
> **AGENT NOTE: CHANGELOG ENFORCEMENT**
> Every time you change a task status to Done `[x]` below, you MUST simultaneously document the applied fix in `docs/CHANGELOG.md`.

- [x] **Story: Component and Utility Test Coverage** `[Assignee: Agent]` `[Status: Done]`
    - [x] Task 1: `[Type: Unit]` Write new unit tests for `src/react/apollo-error/apollo-error.component.tsx` to handle focus trap missing edge cases.
    - [x] Task 2: `[Type: Unit]` Write new unit tests for `src/node/ws/ws.util.ts` to handle path and server validation.
