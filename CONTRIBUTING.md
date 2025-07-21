# Contributing to CyberSkill Shared

Thank you for your interest in contributing to CyberSkill Shared! This document provides guidelines and information for contributors to help ensure a smooth and productive collaboration.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#️-development-setup)
- [Contribution Workflow](#-contribution-workflow)
- [Code Standards](#-code-standards)
- [Testing Guidelines](#-testing-guidelines)
- [Documentation Standards](#-documentation-standards)
- [Review Process](#-review-process)
- [Release Process](#-release-process)
- [Support](#-support)

---

## 🤝 Code of Conduct

### Our Pledge

We as members, contributors, and leaders pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

Examples of behavior that contributes to a positive environment for our community include:

- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing opinions and viewpoints
- ✅ Gracefully accepting constructive criticism
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards other community members

Examples of unacceptable behavior include:

- ❌ The use of sexualized language or imagery, and sexual attention or advances
- ❌ Trolling, insulting or derogatory comments, and personal or political attacks
- ❌ Public or private harassment
- ❌ Publishing others' private information without explicit permission
- ❌ Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the community leaders responsible for enforcement at [support@cyberskill.world](mailto:support@cyberskill.world). All complaints will be reviewed and investigated promptly and fairly.

---

## 🚀 Getting Started

### Prerequisites

Before you begin contributing, ensure you have the following installed:

- **Node.js**: 22.0.0 or higher
- **pnpm**: 10.0.0 or higher
- **Git**: Latest version
- **VS Code**: Recommended with extensions (see below)

### First Steps

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** (see Development Setup)
4. **Create a feature branch** for your contribution
5. **Make your changes** following our standards
6. **Test your changes** thoroughly
7. **Submit a pull request**

---

## 🛠️ Development Setup

### Initial Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/shared.git
cd shared

# Add the upstream repository
git remote add upstream https://github.com/cyberskill-world/shared.git

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Run tests to ensure everything works
pnpm run test
```

### Development Commands

| Command             | Description                            |
| ------------------- | -------------------------------------- |
| `pnpm run dev`      | Start development mode with hot reload |
| `pnpm run build`    | Build for production                   |
| `pnpm run lint`     | Check for linting issues               |
| `pnpm run lint:fix` | Fix linting issues automatically       |
| `pnpm run test`     | Run all tests                          |
| `pnpm run inspect`  | Inspect project dependencies           |
| `pnpm run reset`    | Reset project state                    |
| `pnpm run ready`    | Prepare project for development        |

### Environment Configuration

Create a `.env` file in the root directory:

```env
# optional, default: false
# DEBUG=false

# optional, default: .cyberskill-storage
# CYBERSKILL_STORAGE_DIRECTORY=.cyberskill-storage
```

---

## 🔄 Contribution Workflow

### 1. Issue Creation

Before starting work on a new feature or bug fix:

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with a clear description
3. **Use appropriate labels** (bug, enhancement, documentation, etc.)
4. **Provide reproduction steps** for bugs
5. **Describe the expected behavior** for features

### 2. Branch Strategy

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b fix/issue-description

# For documentation
git checkout -b docs/description

# For dependencies
git checkout -b chore/dependency-update
```

### 3. Development Process

```bash
# Make your changes
# ... edit files ...

# Stage your changes
git add .

# Check linting
pnpm run lint

# Run tests
pnpm run test

# Build the project
pnpm run build

# Commit your changes
git commit -m "feat: add new utility function

- Add formatPhoneNumber function
- Add comprehensive tests
- Update documentation

Closes #123"
```

### 4. Pull Request Creation

1. **Push your branch** to your fork
2. **Create a pull request** against the main branch
3. **Fill out the PR template** completely
4. **Link related issues** using keywords
5. **Request reviews** from maintainers

### 5. PR Template

```markdown
## Description

<!-- What and why: Describe your changes and the motivation behind them -->
<!-- Be the storyteller here — what magic did you work and why does the world need it? -->

## Related Issue

<!-- Link to the issue this PR addresses (if any). -->
<!-- Psst... linking issues helps us all stay sane. If this’s a new feature or bug fix, please create an issue first — teamwork makes the dream work! -->

- Resolve cyberskill-world/shared#<issue_number>
- Fix cyberskill-world/shared#<issue_number>

## Type of Change

<!-- Select all that apply -->

- [ ] Bug fix (non-breaking change that resolves an issue — you’re a bug whisperer 🐛)
- [ ] New feature (adding shiny new toys for everyone to enjoy ✨)
- [ ] Optimization (speeding things up like a caffeinated cheetah ⚡)
- [ ] Refactor (tidying up the code closet without changing behavior 🧹)
- [ ] Documentation (making our life easier for future humans 📚)
- [ ] Other (please describe):

## Testing

<!-- How did you verify your changes? Include environment, test types, and relevant configurations -->
<!-- Be the hero and tell us how you proved your code works. -->

- [ ] Unit Tests (testing bits and pieces in isolation — like mini checkups 🩺)
- [ ] Integration Tests (making sure all the parts play nice together 🤝)

**Test Environment:**

<!-- OS, tools, dependencies, or any other wizardry -->

## Screenshots (if applicable)

<!-- A picture is worth a thousand words — show off your handiwork! 📸 -->

## Checklist:

<!-- Mark all applicable items with an `x`. If unsure, shout for help! -->

- [ ] Code follows style guidelines and has been self-reviewed (mirror time 🪞)
- [ ] Comments added for complex or unclear code (be the guiding light 🔦)
- [ ] Documentation updated if needed (help out future you 🙌)
- [ ] No new warnings introduced; all tests pass locally (smooth sailing ⛵)
- [ ] Tests added or updated to verify changes (proof is in the pudding 🍮)
- [ ] Dependent changes merged and published (all linked up 🔗)
```

---

## 📝 Code Standards

### TypeScript Guidelines

- **Strict Mode**: Always use TypeScript strict mode
- **No `any` Types**: Avoid using `any` type - use proper typing
- **Generic Types**: Use generics for reusable components and functions
- **Interface over Type**: Prefer interfaces for object shapes
- **Explicit Returns**: Always specify return types for public functions

```typescript
// ✅ Good
interface UserConfig {
    name: string;
    email: string;
    preferences?: UserPreferences;
}

/**
 *
 */
function createUser<T extends UserConfig>(config: T): User<T> {
    return new User(config);
}

// ❌ Bad
/**
 *
 */
function createUser(config: any): any {
    return new User(config);
}
```

### JSDoc Requirements

Every exported function, class, interface, and constant must have JSDoc documentation:

````typescript
/**
 * Formats a phone number according to the specified locale.
 * This function handles various phone number formats and returns
 * a standardized string representation.
 *
 * @param phoneNumber - The phone number to format (can include spaces, dashes, etc.)
 * @param locale - The locale to use for formatting (default: 'en-US')
 * @param options - Optional formatting options
 * @param options.includeCountryCode - Whether to include the country code (default: false)
 * @returns The formatted phone number string
 * @throws {Error} When the phone number is invalid or unsupported
 * @example
 * ```typescript
 * formatPhoneNumber('1234567890'); // '(123) 456-7890'
 * formatPhoneNumber('+1-234-567-8900', 'en-US', { includeCountryCode: true }); // '+1 (234) 567-8900'
 * ```
 */
export function formatPhoneNumber(
    phoneNumber: string,
    locale: string = 'en-US',
    options: { includeCountryCode?: boolean } = {}
): string {
    // Implementation
    return phoneNumber; // Placeholder return
}
````

### ESLint Configuration

Follow our ESLint rules strictly:

- **No unused variables** or imports
- **Consistent naming conventions**
- **Proper error handling**
- **No console statements** in production code
- **Proper async/await usage**

### File Organization

```
src/
├── module-name/
│   ├── index.ts              # Main exports
│   ├── module-name.type.ts   # Type definitions
│   ├── module-name.util.ts   # Utility functions
│   ├── module-name.constant.ts # Constants
│   └── module-name.component.tsx # React components
```

### Naming Conventions

https://github.com/cyberskill-world/.github/wiki/Conventions

---

## 🧪 Testing Guidelines

### Test Structure

```typescript
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { formatPhoneNumber } from '../formatPhoneNumber';

describe('formatPhoneNumber', () => {
    describe('valid phone numbers', () => {
        it('should format US phone numbers correctly', () => {
            const result = formatPhoneNumber('1234567890');
            expect(result).toBe('(123) 456-7890');
        });

        it('should handle phone numbers with existing formatting', () => {
            const result = formatPhoneNumber('123-456-7890');
            expect(result).toBe('(123) 456-7890');
        });
    });

    describe('invalid phone numbers', () => {
        it('should throw error for empty string', () => {
            expect(() => formatPhoneNumber('')).toThrow('Phone number cannot be empty');
        });

        it('should throw error for non-numeric characters', () => {
            expect(() => formatPhoneNumber('abc123def')).toThrow('Invalid phone number format');
        });
    });

    describe('edge cases', () => {
        it('should handle null input', () => {
            expect(() => formatPhoneNumber(null as any)).toThrow();
        });

        it('should handle undefined input', () => {
            expect(() => formatPhoneNumber(undefined as any)).toThrow();
        });
    });
});
```

### Test Requirements

- **Coverage**: Minimum 95% code coverage
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test module interactions
- **E2E Tests**: Test complete user workflows
- **Edge Cases**: Test boundary conditions and error scenarios
- **Performance**: Test for performance regressions

### Test Naming

- Use descriptive test names that explain the expected behavior
- Group related tests using `describe` blocks
- Use the pattern: "should [expected behavior] when [condition]"

---

## 📚 Documentation Standards

### README Updates

- Update README.md for new features or breaking changes
- Add examples for new utilities or components
- Update API reference tables
- Include migration guides for breaking changes

### JSDoc Standards

- **Complete parameter documentation** with types and descriptions
- **Return value documentation** with types and examples
- **Error documentation** for functions that can throw
- **Usage examples** for complex functions
- **Deprecation notices** for deprecated functions

### Code Comments

- Use comments to explain **why**, not **what**
- Comment complex algorithms or business logic
- Use TODO comments for future improvements
- Remove commented-out code before committing

---

## 👀 Review Process

### Before Submitting

1. **Self-review** your changes
2. **Run all tests** and ensure they pass
3. **Check linting** and fix any issues
4. **Update documentation** as needed
5. **Test manually** in different environments

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are comprehensive and pass
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance impact is considered
- [ ] Security implications are addressed
- [ ] Accessibility standards are met (for UI components)

### Review Comments

- Be constructive and specific
- Suggest improvements with examples
- Ask questions when clarification is needed
- Use the "suggestion" feature for minor changes

---

## 🚀 Release Process

### Version Management

We use [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. **Update version** in package.json
2. **Update CHANGELOG.md** with release notes
3. **Create release branch** from main
4. **Run full test suite** including integration tests
5. **Build and verify** the package
6. **Create GitHub release** with release notes
7. **Publish to npm** (automated via CI/CD)

### Changelog Format

```markdown
## [1.2.0] - 2024-01-15

### Added

- New `formatPhoneNumber` utility function
- Support for international phone number formats
- React hook for phone number validation

### Changed

- Improved error handling in `validateEmail` function
- Updated TypeScript types for better type safety

### Fixed

- Bug in currency formatting for zero values
- Memory leak in Apollo Client integration

### Breaking Changes

- `formatCurrency` now requires currency code parameter
```

---

## 🆘 Support

### Getting Help

- **🐛 Issues**: [GitHub Issues](https://github.com/cyberskill-world/shared/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/cyberskill-world/shared/discussions)
- **📧 Email**: [support@cyberskill.world](mailto:support@cyberskill.world)

### Community Resources

- **📚 API Reference**: [JSDocs](https://www.jsdocs.io/package/@cyberskill/shared)

### Mentorship

New contributors can request mentorship by:

1. Adding the "mentorship" label to your issue/PR
2. Mentioning @cyberskill/maintainers in your PR
3. Joining our Discord community for real-time help

---

## 🏆 Recognition

### Contributors

All contributors are recognized in:

- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions
- **Company blog** for major features

### Contribution Levels

- **🥉 Bronze**: 1-5 contributions
- **🥈 Silver**: 6-20 contributions
- **🥇 Gold**: 21+ contributions
- **💎 Diamond**: Core maintainer status

---

## 📄 License

By contributing to CyberSkill Shared, you agree that your contributions will be licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Thank you for contributing to CyberSkill Shared! 🚀</p>
  <p>Your contributions help make the developer community better for everyone.</p>
</div>
