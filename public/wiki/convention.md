# Hướng Dẫn Sử Dụng Dự Án

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

<!-- Mục lục -->

- [Yêu Cầu](#yêu-cầu)
- [Cài Đặt](#cài-đặt)
- [Chạy Dự Án](#chạy-dự-án)
    - [Chạy ở môi trường development với Docker](#chạy-ở-môi-trường-development-với-docker)
    - [Chạy ở môi trường development (Local)](#chạy-ở-môi-trường-development-local)
- [Các Script & Ý Nghĩa](#các-script--ý-nghĩa)
- [Quy Ước Viết Code & Đặt Tên](#quy-ước-viết-code--đặt-tên)
    - [Quy Ước Đặt Tên](#quy-ước-đặt-tên)
    - [Quy Ước Đặt Tên Chung](#quy-ước-đặt-tên-chung)
    - [Quy Ước Tiền Tố Trong TypeScript](#quy-ước-tiền-tố-trong-typescript)
    - [Quy Ước Đặt Tên Type Trong GraphQL](#quy-ước-đặt-tên-type-trong-graphql)
    - [Quy Ước Đặt Tên Biến Môi Trường](#quy-ước-đặt-tên-biến-môi-trường)
    - [Quy Ước Khi Import](#quy-ước-khi-import)
    - [Quy Ước Viết Code](#quy-ước-viết-code)
    - [Quy Ước Đặt Commit Message](#quy-ước-đặt-commit-message)
- [Quy Trình Làm Việc Với Git](#quy-trình-làm-việc-với-git)

---

## Yêu Cầu

- **nvm (Node Version Manager):**
    - MacOS: [nvm-sh/nvm](https://github.com/nvm-sh/nvm)
    - Windows: [coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- **Node.js:** 22.14.0
  _(nvm sẽ tự động cài đặt phiên bản này nếu chưa có)_
    - MacOS: [node-v22.14.0.pkg](https://nodejs.org/dist/v22.14.0/node-v22.14.0.pkg)
    - Windows: [node-v22.14.0-x64.msi](https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi)
- **Docker:** [Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Ghi chú:** Dùng **pnpm** để tránh xung đột với các công cụ khác.

---

## Cài Đặt

1. **Tạo file cấu hình môi trường:**
   Sao chép file `.env.example` thành `.env`.
2. **Chỉnh sửa file `.env`:**
   Cập nhật các trường cần thiết phù hợp với môi trường máy.

---

## Chạy Dự Án

### Chạy ở môi trường development với Docker

_(Lưu ý: Hãy bật Docker trước khi chạy)_

```bash
make build-development
make start-development
```

### Chạy ở môi trường development (Local)

```bash
pnpm i
pnpm run dev
```

---

## Các Script & Ý Nghĩa

| Script           | Ý nghĩa                                 |
| ---------------- | --------------------------------------- |
| **lint**         | Kiểm tra lỗi lint và typescript         |
| **lint:fix**     | Tự động sửa các lỗi có thể sửa          |
| **lint:inspect** | Xem chi tiết các lint rule đang dùng    |
| **reset**        | Cài đặt lại dependencies                |
| **setup**        | Nâng cấp dependencies                   |
| **inspect**      | Xem chi tiết các dependencies đang dùng |

---

## Quy Ước Viết Code & Đặt Tên

### Quy Ước Đặt Tên

| Loại          | Quy Ước      | Ví Dụ               |
| ------------- | ------------ | ------------------- |
| **Biến**      | `camelCase`  | `userName`          |
| **Hàm**       | `camelCase`  | `getUserInfo()`     |
| **Parameter** | `camelCase`  | `id, userData`      |
| **Argument**  | `camelCase`  | `fetchData(userId)` |
| **Private**   | `_camelCase` | `_isHidden`         |
| **Class**     | `PascalCase` | `UserProfile`       |
| **Hằng số**   | `UPPER_CASE` | `MAX_RETRY_COUNT`   |
| **File**      | `kebab-case` | `user-service.ts`   |
| **Thư mục**   | `kebab-case` | `services/`         |

### Quy Ước Đặt Tên Chung

| Loại                     | Tiền Tố       | Quy Tắc                       | Ví Dụ                       |
| ------------------------ | ------------- | ----------------------------- | --------------------------- |
| **Biến đại diện input**  | `I_Input_`    | Tiền tố + loại + kiểu dữ liệu | `interface I_Input_User`    |
| **Biến đại diện output** | `I_Response_` | Tiền tố + loại + kiểu dữ liệu | `interface I_Response_User` |

### Quy Ước Tiền Tố Trong TypeScript

| Loại          | Tiền Tố | Ví Dụ              |
| ------------- | ------- | ------------------ |
| **Interface** | `I_`    | `interface I_User` |
| **Type**      | `T_`    | `type T_User`      |
| **Enum**      | `E_`    | `enum E_User`      |

### Quy Ước Đặt Tên Type Trong GraphQL

| Loại          | Tiền Tố | Ví Dụ                   |
| ------------- | ------- | ---------------------   |
| **Type**      | `T_`    | `type T_User`           |
| **Input**     | `Input_`| `input Input_CreateUser`|
| **Interface** | `I_`    | `input I_User`          |
| **Union**     | `U_`    | `input U_SearchResult`  |

### Quy Ước Đặt Tên Biến Môi Trường

| Loại        | Tiền Tố        | Ví Dụ                 |
| ----------- | -------------- | --------------------- |
| **Vite**    | `VITE_`        | `VITE_API_SECRET`     |
| **Next.js** | `NEXT_PUBLIC_` | `NEXT_PUBLIC_API_KEY` |
| **Node.js** | `NODE_`        | `NODE_ENV`            |

### Quy Ước Khi Import

1. Các thư viện bên ngoài **ở trên cùng**.
2. Các module/hàm tiện ích **ở dưới**, cách một dòng trắng với phần trên.
3. Định cấu hình đường dẫn để **import nhanh** trong `tsconfig.json`.

```ts
import React from 'react'; // Thư viện bên ngoài

import { formatDate } from '#shared/utils'; // Module nội bộ
```

### Quy Ước Viết Code

✅ **Làm**

- Dùng `let` và `const` thay vì `var`.
- Dùng `===` thay vì `==`.
- Xóa `console.log`, `alert` và `debugger` trước khi commit.

❌ **Không làm**

- Không dùng `any`, `unknown`, `never`.
- Không dùng `@ts-ignore`, `@ts-nocheck`.

### Quy Ước Đặt Commit Message

| Loại Commit       | Cú Pháp                 | Ví Dụ                                      |
| ----------------- | ----------------------- | ------------------------------------------ |
| **Tính năng mới** | `feat(module): message` | `feat(user): add user login form`          |
| **Sửa lỗi**       | `fix(module): message`  | `fix(auth): incorrect password validation` |
| **Dọn dẹp**       | `chore(module): message`| `chore(product): refactor product filter`  |

## Quy Trình Làm Việc Với Git

1. **Tạo nhánh mới từ `develop`**:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
```

2. **Commit theo chuẩn**:

```bash
git commit -m "feat(module): mô tả ngắn gọn"
```

3. **Rebase trước khi merge**:

```bash
git checkout develop
git pull origin develop
git checkout feature/new-feature
git rebase develop
```

4. **Tạo Pull Request (PR)** và đợi review trước khi merge vào `develop`.

---

> **Ghi chú:** Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ team phát triển!
