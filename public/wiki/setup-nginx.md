## ✅ Bước 1: Cài đặt nginx

```
sudo apt update
sudo apt install nginx
```

## ✅ Bước 2: Cấu hình nginx

```
cd /etc/nginx/sites-enabled
```

```
sudo nano default
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

## ✅ Bước 3: Kiểm tra cấu hình

```
sudo nginx -t
```

Nếu hiện như sau là cấu hình ok
`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok`
`nginx: configuration file /etc/nginx/nginx.conf test is successful`

## ✅ Bước 4: Khởi động lại nginx với cấu hình mới

```
sudo nginx -s reload
```
