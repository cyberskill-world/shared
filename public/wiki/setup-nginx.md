## ✅ Bước 1: Cài đặt homebrew (nếu chưa cài)

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## ✅ Bước 2: Cài đặt nginx

```
brew install nginx
```

## ✅ Bước 3: Cấu hình nginx

```
cd $HOMEBREW_PREFIX/etc/nginx
```

```
nano nginx.conf
```

Thiết lập cấu hình

```
    server {
        listen       port-sẽ-chạy;
        server_name  địa-chỉ-ip;

        location / {
            proxy_pass http://localhost:port-sẽ-chạy;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
```

## ✅ Bước 4: Kiểm tra cấu hình

```
nginx -t
```

Nếu hiện như sau là cấu hình ok
`nginx: the configuration file /home/linuxbrew/.linuxbrew/etc/nginx/nginx.conf syntax is ok`
`nginx: configuration file /home/linuxbrew/.linuxbrew/etc/nginx/nginx.conf test is successful`

## ✅ Bước 4: Khởi động lại nginx với cấu hình mới

```
nginx -s reload
```
