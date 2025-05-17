## ✅ Bước 1: Tạo SSH key

Mở terminal và chạy lệnh sau:

```bash
ssh-keygen -t ed25519 -C "địa-chỉ-email"
```

- Khi được hỏi "Enter a file in which to save the key", nhấn `Enter` để dùng mặc định (`~/.ssh/id_ed25519`)

> ⚠️ Lưu ý:

- Có thể đặt passphrase để tăng độ bảo mật (hoặc để trống nếu muốn nhanh)
- Nên thêm hậu tố để tránh trùng lặp đối với trường hợp dùng nhiều dự án/tài khoản, ví dụ `~/.ssh/id_ed25519_stephen_cyberskill` hoặc `~/.ssh/id_ed25519_project_xxx`

## ✅ Bước 2: Khởi động SSH Agent

```bash
eval "$(ssh-agent -s)"
```

## ✅ Bước 3: Cấu hình SSH cho GitHub

Tạo và sửa file cấu hình SSH:

```bash
touch ~/.ssh/config
nano ~/.ssh/config
```

Thêm nội dung sau:

```ssh
Host github.com
  User git
  UseKeychain yes
  HostName github.com
  AddKeysToAgent yes
  IdentitiesOnly yes
  IdentityFile ~/.ssh/id_ed25519
```

> ⚠️ Lưu ý:

- `User git` có thể không cần để, trừ một số trường hợp đặc biệt như kết nối với google cloud VM, ví dụ `User stephen.cheng` và `HostName xxx.xxx.xxx.xxx` là địa chỉ IP của server
- `UseKeychain yes` chỉ áp dụng cho macOS, nếu dùng Linux/Windows thì không cần cấu hình này.
- Trường hợp dùng nhiều tài khoản có thể tạo nhiều Host với IdentityFile và Host khác nhau, ví dụ `Host github.com` và `IdentityFile ~/.ssh/id_ed25519` khi dùng các dự án cá nhân, `Host github.com-cyberskill` và `IdentityFile ~/.ssh/id_ed25519_cyberskill` khi dùng các dự án cyberskill

Lưu và thoát (`Ctrl + X`, nhấn `Y`, rồi `Enter`).

## ✅ Bước 4: Thêm SSH key vào GitHub

Hiển thị public key:

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy toàn bộ nội dung và vào [GitHub SSH Keys Settings](https://github.com/settings/keys):

- Bấm **"New SSH key"**
- Đặt **Title** dễ nhớ (có thể dùng hậu tố ở bước 1)
- Dán public key vào phần **Key**

## ✅ Bước 5: Kiểm tra kết nối SSH

```bash
ssh -T git@XXX
```

> ⚠️ Lưu ý: XXX là Host đã đặt lúc tạo file config ở bước 3, ví dụ `ssh -T git@github.com`

Nếu thành công, terminal sẽ hiển thị:

```
Hi your-username! You've successfully authenticated, but GitHub does not provide shell access.
```

## ✅ Bước 6: Clone dự án

Clone dự án bằng SSH:

```bash
git clone git@XXX:tên-người-dùng/tên-dự-án.git
```

> ⚠️ Lưu ý:

- Tạo thư mục phù hợp trên máy và mở terminal tại thư mục đó trước khi clone dự án
- XXX là Host đã đặt lúc tạo file config ở bước 3, ví dụ `git clone git@github.com:cyberskill-world/cyberskill-example.git`

## 🛠 Tuỳ chọn: Cấu hình tên và email

```bash
git config --global user.name "Tên hiển thị"
git config --global user.email "địa-chỉ-email"
```

> ⚠️ Lưu ý: `--global` sẽ áp dụng mặc định cho toàn bộ dự án trong máy (kể cả các dự án sau này), nếu muốn dùng riêng cho từng dự án thì mở terminal tại vị trí dự án rồi chạy lệnh nhưng không để cấu hình `--global`, ví dụ `git config user.name "Stephen Cheng"`
