## ✅ Bước 1: Cài đặt homebrew (nếu chưa cài)

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## ✅ Bước 2: Cài đặt nvm

```
brew install nvm
```

Thêm đoạn script dưới đây vào `~/.profile` hoặc `~/.zshrc`

```
export NVM_DIR="$HOME/.nvm"
[ -s "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/nvm.sh"  # This loads nvm
[ -s "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/home/linuxbrew/.linuxbrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

Tắt mở lại terminal hoặc chạy lệnh `source ~/.profile` hoặc `source  ~/.zshrc`

## ✅ Bước 3: Cài đặt phiên bản node tương ứng

```
nvm install phiên-bản-node
```

> ⚠️ Lưu ý: ví dụ `nvm install 22.15.0`
