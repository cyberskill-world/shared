<div align="center">
  <img src="https://res.cloudinary.com/cyberskill/image/upload/v1742786793/cyberskill/favicon/favicon-96x96.png" width="96" height="96" alt="CyberSkill Logo">

# CyberSkill Shared

**Enterprise-grade utility library for consistent, scalable development across CyberSkill projects**

[![📦 npm version](https://img.shields.io/npm/v/@cyberskill/shared?style=for-the-badge&logo=npm)](https://npmjs.com/package/@cyberskill/shared)
[![📥 npm downloads](https://img.shields.io/npm/dm/@cyberskill/shared?style=for-the-badge&logo=npm)](https://npmjs.com/package/@cyberskill/shared)
[![📚 JSDoc Documentation](https://img.shields.io/badge/JSDoc-Documentation-blue?style=for-the-badge&logo=javascript)](https://www.jsdocs.io/package/@cyberskill/shared)
[![📄 License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#️-architecture)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [API Reference](#-api-reference)
- [Development](#️-development)
- [Contributing](#-contributing)
- [Support](#-support)
- [License](#-license)

---

## 🎯 Overview

CyberSkill Shared is a comprehensive, enterprise-grade utility library designed to standardize development practices across CyberSkill projects. Built with TypeScript-first architecture, it provides a robust foundation of utilities, configurations, and components that ensure consistency, maintainability, and developer productivity at scale.

### 🏆 Why Choose CyberSkill Shared?

| Feature                | Benefit                                                 |
| ---------------------- | ------------------------------------------------------- |
| **🔄 Consistency**     | Standardized patterns and utilities across all projects |
| **⚡ Productivity**    | Pre-built solutions for common development tasks        |
| **🛡️ Reliability**     | Type-safe implementations with comprehensive testing    |
| **📈 Scalability**     | Modular architecture that grows with your needs         |
| **🔧 Maintainability** | Well-documented, clean, and extensible codebase         |
| **🚀 Performance**     | Optimized for production with minimal bundle impact     |
| **🔒 Security**        | Built-in security best practices and validation         |

### 🎯 Target Use Cases

- **Enterprise Applications**: Large-scale applications requiring consistency and maintainability
- **Microservices**: Distributed systems needing shared utilities and configurations
- **Full-Stack Development**: Projects spanning frontend and backend with shared logic
- **Team Collaboration**: Development teams requiring standardized tooling and patterns
- **Rapid Prototyping**: Quick development with pre-built, tested components

---

## ✨ Key Features

### 🛠️ Core Utilities & Helpers

<details>
<summary><strong>🔧 Utility Functions</strong></summary>

- **Type-safe utilities** for common operations
- **Object manipulation** and validation helpers
- **String processing** and formatting functions
- **Serialization** and data transformation tools
- **Validation** frameworks with comprehensive error handling

</details>

<details>
<summary><strong>⚙️ Configuration Management</strong></summary>

- **Environment configuration** with type safety and validation
- **ESLint configurations** for consistent code quality across projects
- **Testing setups** for unit, integration, and e2e tests
- **Build tool configurations** optimized for performance and DX
- **Git hooks** and commit message validation

</details>

<details>
<summary><strong>🌐 Node.js Integration</strong></summary>

- **Express.js utilities** for API development with middleware support
- **MongoDB integration** with advanced query builders and validation
- **WebSocket management** tools for real-time applications
- **File system operations** with enhanced error handling and validation
- **CLI development** utilities for command-line applications
- **Package management** with dependency resolution and updates

</details>

<details>
<summary><strong>⚛️ React Ecosystem</strong></summary>

- **Apollo Client** integration with error handling and caching
- **Internationalization** (i18n) support for multi-language applications
- **Loading states** and user feedback components
- **Storage management** hooks and utilities for client-side persistence
- **Toast notifications** system with customizable themes
- **User feedback** integration for product improvement

</details>

<details>
<summary><strong>📝 TypeScript Excellence</strong></summary>

- **Comprehensive type definitions** for all utilities and components
- **React component types** with proper prop validation
- **Utility type helpers** for advanced TypeScript patterns
- **Style declaration files** for CSS-in-JS solutions
- **Generic type support** for flexible, reusable components

</details>

---

## 🏗️ Architecture

### 📁 Project Structure

```text
shared/
├── 📁 public/                    # Static assets and configuration
│   ├── favicon/                  # Application icons and manifest
│   └── tsconfig.base.json       # Base TypeScript configuration
├── 📁 src/
│   ├── 📁 config/               # Application configuration
│   │   ├── commitlint/          # Git commit message validation
│   │   ├── eslint/              # Code quality and style rules
│   │   ├── env/                 # Environment variable management
│   │   ├── graphql-codegen/     # GraphQL code generation setup
│   │   ├── lint-staged/         # Pre-commit code quality checks
│   │   └── vitest/              # Testing framework configuration
│   ├── 📁 constant/             # Shared constants and enums
│   ├── 📁 node/                 # Node.js utilities and modules
│   │   ├── apollo-server/       # Apollo Server integration helpers
│   │   ├── cli/                 # Command-line interface utilities
│   │   ├── command/             # Command execution and management
│   │   ├── express/             # Express.js framework utilities
│   │   ├── fs/                  # File system operations
│   │   ├── log/                 # Structured logging and error handling
│   │   ├── mongo/               # MongoDB ODM and query builders
│   │   ├── package/             # Package management and dependency resolution
│   │   ├── path/                # Path manipulation and resolution
│   │   ├── storage/             # Data persistence and caching
│   │   ├── upload/              # File upload handling and validation
│   │   └── ws/                  # WebSocket connection management
│   ├── 📁 react/                # React utilities and components
│   │   ├── apollo-client/       # Apollo Client setup and configuration
│   │   ├── apollo-error/        # GraphQL error handling and display
│   │   ├── i18next/             # Internationalization framework
│   │   ├── loading/             # Loading state management and UI
│   │   ├── log/                 # Client-side logging utilities
│   │   ├── next-intl/           # Next.js internationalization
│   │   ├── storage/             # Browser storage management
│   │   ├── toast/               # Toast notification system
│   │   └── userback/            # User feedback and analytics
│   ├── 📁 typescript/           # TypeScript type definitions
│   └── 📁 util/                 # Utility functions and helpers
│       ├── common/              # Common utility types and functions
│       ├── object/              # Object manipulation and transformation
│       ├── serializer/          # Data serialization and deserialization
│       ├── string/              # String processing and formatting
│       └── validate/            # Data validation and sanitization
├── 📄 package.json              # Project manifest and dependencies
├── 📄 tsconfig.json             # TypeScript compiler configuration
├── 📄 eslint.config.js          # ESLint configuration
├── 📄 vite.config.ts            # Vite build tool configuration
└── 📄 README.md                 # Project documentation
```

---

## 🚀 Installation

### Prerequisites

- **Node.js**: 18.0.0 or higher
- **pnpm**: 8.0.0 or higher (recommended)
- **TypeScript**: 5.0.0 or higher

### Package Installation

```bash
# Using pnpm (recommended)
pnpm add @cyberskill/shared

# Using npm
npm install @cyberskill/shared

# Using yarn
yarn add @cyberskill/shared
```

### TypeScript Configuration

Add to your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@cyberskill/shared/*": ["node_modules/@cyberskill/shared/src/*"]
        }
    }
}
```

---

## 🏃 Quick Start

### Basic Usage

```typescript
import {
    catchError,
    formatCurrency,
    isEmpty,
    validateEmail
} from '@cyberskill/shared';

// Email validation
const isValidEmail = validateEmail('user@example.com');
console.log(isValidEmail); // true

// Currency formatting
const formattedPrice = formatCurrency(1234.56, 'USD');
console.log(formattedPrice); // "$1,234.56"

// Empty value checking
const isEmptyValue = isEmpty(null); // true
const hasValue = isEmpty('hello'); // false

// Error handling
try {
    // Your code here
}
catch (error) {
    const handledError = catchError(error);
    console.log(handledError.message);
}
```

### React Integration

```tsx
import {
    ApolloProvider,
    LoadingProvider,
    useApolloError,
    useLoading
} from '@cyberskill/shared';
import React from 'react';

// Main application wrapper
/**
 *
 */
// eslint-disable-next-line react-refresh/only-export-components
function App() {
    return (
        <ApolloProvider options={{ uri: 'https://api.example.com/graphql' }}>
            <LoadingProvider>
                <MyApplication />
            </LoadingProvider>
        </ApolloProvider>
    );
}

// Component with loading and error handling
/**
 *
 */
// eslint-disable-next-line react-refresh/only-export-components
function MyComponent() {
    const { showLoading, hideLoading } = useLoading();
    const { showError } = useApolloError();

    const handleAsyncOperation = async () => {
        try {
            showLoading();
            // Your async operation
            await someAsyncTask();
        }
        catch (error) {
            showError(error);
        }
        finally {
            hideLoading();
        }
    };

    return (
        <div>
            <button type="button" onClick={handleAsyncOperation}>
                Perform Operation
            </button>
        </div>
    );
}
```

### Node.js Integration

```typescript
import {
    createCorsOptions,
    mongo,
    RESPONSE_STATUS,
    throwError
} from '@cyberskill/shared';
// Express.js setup with CORS
import express from 'express';

const app = express();

const corsOptions = createCorsOptions({
    isDev: process.env.NODE_ENV === 'development',
    whiteList: ['https://example.com', 'https://api.example.com']
});

app.use(cors(corsOptions));

// MongoDB integration
const mongoose = await mongo.connect({
    uri: process.env.MONGODB_URI,
    options: {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000
    }
});

// Error handling
app.use('/api/users', (req, res, next) => {
    try {
    // Your route logic
    }
    catch (error) {
        throwError({
            message: 'User operation failed',
            status: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            type: 'rest'
        });
    }
});
```

---

## 🛠️ Development

### Quick Setup

```bash
# Clone the repository
git clone https://github.com/cyberskill-world/shared.git
cd shared

# Install dependencies
pnpm install

# Build the project
pnpm run build

# Start development mode
pnpm run dev
```

### Available Scripts

| Command             | Description                            | Usage        |
| ------------------- | -------------------------------------- | ------------ |
| `pnpm run dev`      | Start development mode with hot reload | Development  |
| `pnpm run build`    | Build for production                   | Production   |
| `pnpm run lint`     | Check for linting issues               | Code Quality |
| `pnpm run lint:fix` | Fix linting issues automatically       | Code Quality |
| `pnpm run test`     | Run tests                              | Testing      |
| `pnpm run inspect`  | Inspect project dependencies           | Analysis     |
| `pnpm run reset`    | Reset project state                    | Maintenance  |
| `pnpm run ready`    | Prepare project for development        | Setup        |

For detailed development guidelines, code standards, and contribution workflow, see our [Contributing Guide](CONTRIBUTING.md).

---

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information about our development process, code standards, and contribution workflow.

### Quick Start for Contributors

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Make** your changes following our standards
4. **Test** your changes thoroughly
5. **Commit** with conventional commit messages
6. **Push** to your branch and create a Pull Request

For complete guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 🆘 Support

### Getting Help

- **🐛 Issues**: [GitHub Issues](https://github.com/cyberskill-world/shared/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/cyberskill-world/shared/discussions)
- **📧 Email**: [support@cyberskill.world](mailto:support@cyberskill.world)

### Community Resources

- **📚 API Reference**: [JSDocs](https://www.jsdocs.io/package/@cyberskill/shared)

### Migration Support

- **📋 Changelog**: [Release Notes](https://github.com/cyberskill-world/shared/releases)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License Benefits:**

- ✅ Commercial use allowed
- ✅ Modification permitted
- ✅ Distribution allowed
- ✅ Private use allowed
- ✅ No warranty provided
- ✅ No liability for damages

---

## 🏢 About CyberSkill

CyberSkill JSC is a leading technology company focused on building innovative solutions for the cybersecurity industry. Our shared libraries and tools help developers create secure, scalable, and maintainable applications that meet enterprise-grade standards.

### Company Information

- **🌐 Website**: [https://cyberskill.world](https://cyberskill.world)
- **🐙 GitHub**: [https://github.com/cyberskill-world](https://github.com/cyberskill-world)
- **📧 Contact**: [hello@cyberskill.world](mailto:hello@cyberskill.world)

### Our Mission

To provide developers with the tools and utilities they need to build secure, scalable, and maintainable applications that protect users and organizations in an increasingly complex digital landscape.

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://github.com/cyberskill-world">CyberSkill Team</a></p>

  <p>
    <a href="https://cyberskill.world">Website</a>
    <a href="https://github.com/cyberskill-world/shared/issues">Issues</a>
    <a href="https://github.com/cyberskill-world/shared/discussions">Discussions</a>
  </p>

  <p>
    <sub>If this project helps you, please consider giving us a ⭐ on GitHub!</sub>
  </p>
</div>
