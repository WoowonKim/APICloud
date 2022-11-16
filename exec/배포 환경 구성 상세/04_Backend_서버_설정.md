# 04. Backend 서버 설정

## **springboot**

> ### **Dockerfile**

```dockerfile
FROM openjdk:11 AS builder
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN chmod =x ./gradlew
RUN ./gradlew bootJar

FROM openjdk:11
COPY --from=builder build/libs/apicloud-0.0.1-SNAPSHOT.jar apicloud.jar

EXPOSE 8005
CMD ["java","-jar","/apicloud.jar"]
```

#### 과정 설명

1. jdk 11버전을 빌드 환경으로 불러온다
2. 빌드에 필요한 gradle 파일 및 세팅 파일, src 폴더의 내용물들을 복사해온다.
3. chmod를 통해 gradlew를 실행할 수 있는 권한을 부여한다
4. RUN ./gradlew bootJar를 통해서 gradle이 프로젝트의 jar파일을 생성하게 한다
5. jdk 11버전을 실행 환경으로 불러온다
6. 빌드 스테이지에서 빌드한 결과(.jar 파일)를 `apicloud.jar`라는 파일로 이름을 바꾼 뒤에 현재 워킹 디렉토리로 복사해온다
   - 여기서 `*.jar`로 쓴 이유는 자바 프로젝트 명에 따라서 기본적으로 설정되는 이름이 있는데, 생성되는 이름이 길 경우, 직접 다 써 줄 필요 없이 에스테릭(\*)을 사용해서 .jar 파일을 풀러오는 것임
7. 포트 번호를 8005번으로 명시(기능적인 효과 없음)
   - ※ EXPOSE는 컨테이너에 포트를 직접 연결해주는 기능을 하지 않고, 연결 포트가 무엇인지 알려주는 명시적인 역할을 할뿐 기능은 없다 => 실제 포트를 연결하는 것은 docker run에서 -p를 통해서 설정하는 것임
8. 컨테이너 환경에서 apicloud.jar를 실행

> ### **MySQL 설정**

- src/main/resourse/application.properties

```properties
# Database
spring.datasource.url=jdbc:mysql://{server-domain}:3306/${db-name}?serverTimezone=UTC
spring.datasource.username=${db-username}
spring.datasource.password=${db-password}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# port
server.port = {port-number}
```

※ 배포 환경에서 변수 바인딩으로 위와 같이 설정해줄 경우, 배포 환경에서도 해당 변수 바인딩이 가능해야함
<br>

> ### **Node**

- node 백그라운드 실행

  ```bash
  sudo PORT=3333 nohup node {server.js 경로} &
  ```

  ※ server.js 경로 :  y-webrtc/node_modules/y-webrtc/bin/server.js
  
  ※ root계정에 18버전 이상의 node가 설치되어 있어야함 
