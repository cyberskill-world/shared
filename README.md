<div align="center">
  <img src="https://res.cloudinary.com/cyberskill/image/upload/v1742786793/cyberskill/favicon/favicon-96x96.png" width="96" height="96" alt="CyberSkill Logo">

# CyberSkill Shared

**A comprehensive utility library for consistent development across CyberSkill projects**

[![npm version](https://img.shields.io/npm/v/@cyberskill/shared)](https://npmjs.com/package/@cyberskill/shared)
[![npm downloads](https://img.shields.io/npm/dm/@cyberskill/shared)](https://npmjs.com/package/@cyberskill/shared)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [API Reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 📖 Overview

CyberSkill Shared is a modular, TypeScript-first utility library designed to standardize development practices across CyberSkill projects. Built with enterprise-grade architecture, it provides a comprehensive suite of utilities, configurations, and components that ensure consistency, maintainability, and developer productivity.

### 🎯 Key Benefits

- **🔄 Consistency**: Standardized patterns and utilities across all projects
- **⚡ Productivity**: Pre-built solutions for common development tasks
- **🛡️ Reliability**: Type-safe implementations with comprehensive testing
- **📈 Scalability**: Modular architecture that grows with your needs
- **🔧 Maintainability**: Well-documented, clean, and extensible codebase

---

## ✨ Features

### 🛠️ Core Utilities

- **Type-safe utilities** for common operations
- **Object manipulation** and validation helpers
- **String processing** and formatting functions
- **Serialization** and data transformation tools

### ⚙️ Configuration Management

- **Environment configuration** with type safety
- **ESLint configurations** for consistent code quality
- **Testing setups** for unit and integration tests
- **Build tool configurations** optimized for performance

### 🌐 Node.js Modules

- **Express.js utilities** for API development
- **MongoDB integration** helpers
- **WebSocket management** tools
- **File system operations** with enhanced error handling
- **CLI development** utilities

### ⚛️ React Components

- **Apollo Client** integration and error handling
- **Internationalization** (i18n) support
- **Loading states** and user feedback components
- **Storage management** hooks and utilities
- **Toast notifications** system

### 📝 TypeScript Support

- **Comprehensive type definitions**
- **React component types**
- **Utility type helpers**
- **Style declaration files**

---

## 🚀 Installation

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install Package

```bash
# Using pnpm (recommended)
pnpm add @cyberskill/shared

# Using npm
npm install @cyberskill/shared

# Using yarn
yarn add @cyberskill/shared
```

---

## 🏃 Quick Start

### Basic Usage

```typescript
import { formatCurrency, validateEmail } from '@cyberskill/shared';

// Validate email
const isValid = validateEmail('user@example.com');

// Format currency
const formatted = formatCurrency(1234.56, 'USD');
```

### React Components

```tsx
import { LoadingProvider, useLoading } from '@cyberskill/shared';

function App() {
    return (
        <LoadingProvider>
            <MyComponent />
        </LoadingProvider>
    );
}

function MyComponent() {
    const { showLoading, hideLoading } = useLoading();

    // Use loading states
    return <div>Your component</div>;
}
```

---

## 📚 Documentation

For detailed documentation, visit our [documentation site](https://docs.cyberskill.com/shared) or check the [JSDocs reference](https://www.jsdocs.io/package/@cyberskill/shared).

### Key Documentation Sections

- [Getting Started Guide](https://docs.cyberskill.com/shared/getting-started)
- [API Reference](https://docs.cyberskill.com/shared/api)
- [Migration Guide](https://docs.cyberskill.com/shared/migration)
- [Best Practices](https://docs.cyberskill.com/shared/best-practices)

---

## 🔧 API Reference

### Core Modules

| Module        | Description                 | Import Path                     |
| ------------- | --------------------------- | ------------------------------- |
| **Utils**     | Common utility functions    | `@cyberskill/shared/util`       |
| **Constants** | Shared constants and enums  | `@cyberskill/shared/constant`   |
| **Types**     | TypeScript type definitions | `@cyberskill/shared/typescript` |
| **Config**    | Configuration utilities     | `@cyberskill/shared/config`     |

### Node.js Modules

| Module            | Description                    | Import Path                             |
| ----------------- | ------------------------------ | --------------------------------------- |
| **apollo-server** | Apollo Server utilities        | `@cyberskill/shared/node/apollo-server` |
| **cli**           | Command-line interface helpers | `@cyberskill/shared/node/cli`           |
| **command**       | Command execution utilities    | `@cyberskill/shared/node/command`       |
| **express**       | Express.js utilities           | `@cyberskill/shared/node/express`       |
| **fs**            | File system helpers            | `@cyberskill/shared/node/fs`            |
| **log**           | Logging utilities              | `@cyberskill/shared/node/log`           |
| **mongo**         | MongoDB helpers                | `@cyberskill/shared/node/mongo`         |
| **package**       | Package management utilities   | `@cyberskill/shared/node/package`       |
| **path**          | Path utilities                 | `@cyberskill/shared/node/path`          |
| **storage**       | Storage helpers                | `@cyberskill/shared/node/storage`       |
| **upload**        | File upload utilities          | `@cyberskill/shared/node/upload`        |
| **ws**            | WebSocket utilities            | `@cyberskill/shared/node/ws`            |

### React Modules

| Module            | Description                  | Import Path                              |
| ----------------- | ---------------------------- | ---------------------------------------- |
| **apollo-client** | Apollo Client integration    | `@cyberskill/shared/react/apollo-client` |
| **apollo-error**  | Apollo error handling        | `@cyberskill/shared/react/apollo-error`  |
| **i18next**       | Internationalization (i18n)  | `@cyberskill/shared/react/i18next`       |
| **loading**       | Loading state management     | `@cyberskill/shared/react/loading`       |
| **log**           | Logging utilities            | `@cyberskill/shared/react/log`           |
| **next-intl**     | Next.js internationalization | `@cyberskill/shared/react/next-intl`     |
| **storage**       | Client-side storage          | `@cyberskill/shared/react/storage`       |
| **toast**         | Toast notification system    | `@cyberskill/shared/react/toast`         |
| **userback**      | User feedback integration    | `@cyberskill/shared/react/userback`      |

### Util Modules

| Module         | Description                      | Import Path                          |
| -------------- | -------------------------------- | ------------------------------------ |
| **common**     | Common utility types and helpers | `@cyberskill/shared/util/common`     |
| **object**     | Object manipulation utilities    | `@cyberskill/shared/util/object`     |
| **serializer** | Serialization and transformation | `@cyberskill/shared/util/serializer` |
| **string**     | String processing utilities      | `@cyberskill/shared/util/string`     |
| **validate**   | Validation helpers               | `@cyberskill/shared/util/validate`   |

---

## 🛠️ Development

### Prerequisites

- Node.js 22+
- pnpm 10+
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/cyberskill-world/shared.git
cd shared

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### Available Scripts

| Command              | Description                            |
| -------------------- | -------------------------------------- |
| `pnpm run dev`       | Start development mode with hot reload |
| `pnpm run build`     | Build for production                   |
| `pnpm run lint`      | Check for linting issues               |
| `pnpm run lint:fix`  | Fix linting issues automatically       |
| `pnpm run test:unit` | Run unit tests                         |
| `pnpm run test:e2e`  | Run end-to-end tests                   |
| `pnpm run inspect`   | Inspect project dependencies           |
| `pnpm run reset`     | Reset project state                    |
| `pnpm run ready`     | Prepare project for development        |

### Project Structure

```text
shared/
├── public/                  # Static assets (favicons, manifest, etc.)
├── src/
│   ├── config/              # App configuration (commitlint, eslint, env, graphql-codegen, lint-staged, vitest)
│   ├── constant/            # Static values and constants
│   ├── node/                # Node.js utilities and modules
│   │   ├── apollo-server/   # Apollo Server helpers
│   │   ├── cli/             # CLI utilities
│   │   ├── command/         # Command execution helpers
│   │   ├── express/         # Express.js utilities
│   │   ├── fs/              # File system helpers
│   │   ├── log/             # Logging utilities
│   │   ├── mongo/           # MongoDB helpers
│   │   ├── package/         # Package management
│   │   ├── path/            # Path utilities
│   │   ├── storage/         # Storage helpers
│   │   ├── upload/          # File upload utilities
│   │   └── ws/              # WebSocket utilities
│   ├── react/               # React utilities and modules
│   │   ├── apollo-client/   # Apollo Client integration
│   │   ├── apollo-error/    # Apollo error handling
│   │   ├── i18next/         # Internationalization (i18n)
│   │   ├── loading/         # Loading state management
│   │   ├── log/             # Logging utilities
│   │   ├── next-intl/       # Next.js internationalization
│   │   ├── storage/         # Client-side storage
│   │   ├── toast/           # Toast notifications
│   │   └── userback/        # User feedback integration
│   ├── typescript/          # TypeScript types and interfaces
│   └── util/                # Utility functions and helpers
│       ├── common/          # Common utilities
│       ├── object/          # Object manipulation
│       ├── serializer/      # Serialization helpers
│       ├── string/          # String utilities
│       └── validate/        # Validation helpers
├── package.json             # Project manifest
├── tsconfig.json            # TypeScript configuration
└── ...                      # Other configuration and metadata files
```

### Testing

```bash
# Run all tests
pnpm run test

# Run unit tests only
pnpm run test:unit

# Run e2e tests only
pnpm run test:e2e

# Run tests with coverage
pnpm run test:coverage
```

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass (`pnpm run test`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Write comprehensive tests
- Update documentation for new features
- Follow our ESLint configuration
- Use conventional commit messages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🏢 About CyberSkill

CyberSkill JSC is a technology company focused on building innovative solutions for the cybersecurity industry. Our shared libraries and tools help developers create secure, scalable, and maintainable applications.

- **Website**: [https://cyberskill.com](https://cyberskill.com)
- **GitHub**: [https://github.com/cyberskill-world](https://github.com/cyberskill-world)
- **Documentation**: [https://docs.cyberskill.com](https://docs.cyberskill.com)

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://github.com/cyberskill-world">CyberSkill Team</a></p>

  <p>
    <a href="https://cyberskill.com">Website</a> •
    <a href="https://docs.cyberskill.com">Documentation</a> •
    <a href="https://github.com/cyberskill-world/shared/issues">Issues</a> •
    <a href="https://github.com/cyberskill-world/shared/discussions">Discussions</a>
  </p>
</div>
