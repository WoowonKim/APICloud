# 06. Nginx, SSL 설정

> ### **Nginx 설치**

```bash
sudo apt update
sudo apt install nginx
```

> ### **SSL 설정**

- certbot 설치

```bash
sudo apt update

sudo apt upgrade

sudo add-apt-repository ppa:certbot/certbot

sudo apt install python3-certbot-nginx
```

- /etc/nginx/sites-available/default에서 서버 경로 설정

- Key 발급

```bash
sudo certbot --nginx -d [도메인]
```

- 이메일 입력 후 2번 선택

> ### **default.conf**

- /etc/nginx/sites-available 경로에서 default 파일 열기

```bash
sudo vi /etc/nginx/sites-available/default
```

```nginx
server {
        listen 80;
        listen [::]:80;

        server_name apiclouds.net;
        return 301 https://apiclouds.net$request_uri;
}
server  {
    #listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot

    ssl_certificate /etc/letsencrypt/live/apiclouds.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/apiclouds.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        location / {
                proxy_pass http://localhost:3000;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }

        location /api {
                proxy_pass http://localhost:8005;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }
    
        location /socket {
                    proxy_set_header    HOST $http_host;
                    proxy_set_header    X-Real-IP $remote_addr;
                    proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header    X-Forwarded-Proto $scheme;
                    proxy_set_header    X-NginX-Proxy true;
                    proxy_pass http://localhost:3333;
                    proxy_redirect  off;
                    charset utf-8;

                    # WebSocket support
                    proxy_http_version 1.1;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
            }
}

server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name k7b205.p.ssafy.io;
        return 301 https://k7b205.p.ssafy.io$request_uri;
}

server  {
    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k7b205.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/k7b205.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

        location / {
                proxy_pass http://localhost:3000;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }

        location /api {
                proxy_pass http://localhost:8005;
                proxy_redirect off;
                charset utf-8;

                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-NginX-Proxy true;
        }
}
```

해당 프로젝트에서는 별도의 도메인을 구매하였기 때문에 2개의 도메인을 연결

- Nginx 재실행

```bash
sudo service nginx restart
```
