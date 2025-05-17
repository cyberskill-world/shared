## ✅ Bước 1: Cài đặt node (nếu chưa cài)

[Xem tại đây](./setup-node.md)

## ✅ Bước 2: Cài đặt pm2

```
npm install pm2 -g
```

## ✅ Bước 3: Chạy pm2

Chạy bằng node mặc định

```
pm2 start tên-file.js --name tên-app
```

> ⚠️ Lưu ý: ví dụ `pm2 start index.js --name cyberskill-example`

Đối với dự án có script chạy từ package.json

```
pm2 start pnpm --name tên-app -- run tên-script-chạy
```

> ⚠️ Lưu ý: ví dụ `pm2 start pnpm --name cyberskill-example -- run start`
