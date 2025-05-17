## ✅ Bước 1: Cài đặt certbot

```
sudo apt update
```

```
sudo apt install certbot python3-certbot-nginx
```

## ✅ Bước 2: Chạy certbot

```
sudo certbot --nginx -d tên-miền
```

> ⚠️ Lưu ý: nếu có nhiều tên miền có thể ghi liên tục, ví dụ `sudo certbot --nginx -d cyberskill.example -d api.cyberskill.example -d www.cyberskill.example`

Nếu hiện như sau là cấu hình ok
`Successfully received certificate.`
`Certificate is saved at: đường-dẫn/fullchain.pem`
`Key is saved at:         đường-dẫn/privkey.pem`
`This certificate expires on năm-tháng-ngày.`
`These files will be updated when the certificate renews.`
`Certbot has set up a scheduled task to automatically renew this certificate in the background.`

## ✅ Bước 3: Cập nhật cấu hình nginx

Ví dụ cho cấu hình Backend và Frontend

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name cyberskill.example www.cyberskill.example api.cyberskill.example;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name cyberskill.example www.cyberskill.example;

    ssl_certificate /etc/letsencrypt/live/cyberskill.example/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cyberskill.example/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:port-frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name api.cyberskill.example;

    ssl_certificate /etc/letsencrypt/live/cyberskill.example/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cyberskill.example/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    location / {
        proxy_pass http://localhost:port-backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## ✅ Bước 4: Kiểm tra cấu hình

```
sudo nginx -t
```

Nếu hiện như sau là cấu hình ok
`nginx: the configuration file /etc/nginx/nginx.conf syntax is ok`
`nginx: configuration file /etc/nginx/nginx.conf test is successful`

## ✅ Bước 5: Khởi động lại nginx với cấu hình mới

```
sudo nginx -s reload
```
