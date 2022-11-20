# 05. Frontend 서버 설정

> ### **Dockerfile**

```dockerfile
FROM node:16.15.0 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/defalut.conf
COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g","daemon off;"]
```

#### 과정 설명

1. node를 build 환경으로서 불러온다
2. `/app`로 워킹 디렉토리를 설정한다
3. Dependency 파일을 로컬에서 컨테이너의 워킹 디렉토리로 복사해온다
   - 에스테릭(\*)을 사용해서 여러 파일을 복사해올 때는 워킹 디렉토리를 표현할 때 `.` 으로만 쓰면 안 되고, `./`으로 써야한다.
4. npm install
5. COPY . . 을 통해 현재 로컬에 있는 모든 파일을 복사해온다
6. npm run build를 통해 빌드 결과를 생성함
7. 컨테이너 환경에서 nginx 설치
8. `/etc/nginx/conf.d/defalut.conf`에 있는 default.conf를 삭제함
9. 로컬에 있는 nginx/default.conf를 `/etc/nginx/conf.d/default.conf`으로 복사하여 사용
10. 빌드 스테이지에서 빌드한 결과를 `/usr/share/nginx/html`파일로 복사해옴
11. 포트 번호를 80번으로 명시(기능적인 효과 없음)
    - ※ EXPOSE는 컨테이너에 포트를 직접 연결해주는 기능을 하지 않고, 연결 포트가 무엇인지 알려주는 명시적인 역할을 할뿐 기능은 없다 => 실제 포트를 연결하는 것은 docker run에서 -p를 통해서 설정하는 것임
12. nginx 환경 실행

> ### **nginx.conf**

- nginx/default.conf

```bash
server {
       listen 80;
       client_max_body_size 500M;

        location / {
                root /usr/share/nginx/html;
                index index.html;
                try_files $uri $uri/ /index.html;
        }
}
```

#### 과정 설명

1. listen : 80번 포트를 연결
2. location 설정: root에 들어가는 경로는 npm run build를 통해 생성되는 index.html의 경로
