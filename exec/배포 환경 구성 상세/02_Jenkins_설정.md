# 02. Jenkins 설정

> ### **젠킨스 컨테이너 생성**

- docker-compose.yml 파일

```bash
vim docker-compose.yml
```

```yml
version: "3"

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - /jenkins:/var/jenkins_home
    ports:
      - "9090:8080"
    privileged: true
    user: root
```

- 컨테이너 생성

```bash
sudo docker-compose up -d
sudo docker ps
```

- Administrator password 확인

```bash
sudo docker logs jenkins
```

- 젠킨스 접속

  - http://도메인:9090 접속
  - 플러그인 설치

> ### **Jenkins plugin 설치**

- 도메인:9090 포트로 접속 후 Admin password 비밀번호를 입력

  <img src="https://user-images.githubusercontent.com/93081720/191662258-7cf44cfa-76ca-42bf-b5bf-a15c2e08e2f8.png" width="600"/>

- 기본 플러그인 설치

  <img src="https://user-images.githubusercontent.com/93081720/191662709-3b3e6afb-5228-4a0c-83dc-d317e2b345d0.png" width="600"/>

- 계정 생성

  <img src="https://user-images.githubusercontent.com/93081720/191662872-6f195fff-7e65-4f65-9f92-65cac427afb0.png" width="600"/>

- Jenkins 관리 > 플러그인 관리

  <img src="https://user-images.githubusercontent.com/93081720/191663424-5328f9ca-75a6-4482-b943-0d84aa8910c0.png" width="600"/>

  <img src="https://user-images.githubusercontent.com/93081720/191663444-d9706a0f-0829-4ebc-9ba8-c32145f52dc7.png" width="600"/>

  <img src="https://user-images.githubusercontent.com/93081720/191664182-36c31681-5ea3-4cf5-adf7-9c1296cfc6f1.png" width="600"/>

  <img src="https://user-images.githubusercontent.com/93081720/191664275-252a3316-e84c-4b0e-adc9-1290450878b2.png" width="600"/>

> **Jenkins 프로젝트 생성**

- 메인페이지에서 `새로운 item` 을 클릭하여 새로운 프로젝트를 생성

  <img src="https://user-images.githubusercontent.com/93081720/191665108-876a7071-3160-469c-a7dd-0e3c911ced54.png" width="600"/>

- 레포지토리 등록

  <img src="https://user-images.githubusercontent.com/93081720/191666699-c2ce269c-f271-4e12-95c2-60e41b08cd8d.png" width="600"/>
  <br>

- `credentials`에서 `add`를 하여 gitlab과 연결된 계정을 등록

  <img src="https://user-images.githubusercontent.com/93081720/191668285-1a5162be-b348-43bd-80de-adcd3fa55cd9.png" width="600"/>
  <img src="https://user-images.githubusercontent.com/93081720/191669080-dc728d24-5f95-4d51-b09e-1716de4a19c0.png" width="600"/>

- 빌드 유발<br>
  아래 그림과 같이 체크박스에 체크한 뒤에 고급 선택

  <img src="https://user-images.githubusercontent.com/93081720/191669807-ae8e4349-6fd1-4b6b-bc00-f0b6cc5f98a3.png" width="600"/>

- Secret 토큰 생성<br>
  고급에서 generate를 눌러서 토큰생성

  <img src="https://user-images.githubusercontent.com/93081720/191669972-2c0470d3-d3fb-403b-9362-c518a6464309.png" width="600"/>

> **GitLab WebHook 연결**

- GitLab -> Setting -> WebHook

  <img src="https://user-images.githubusercontent.com/64150747/201577589-2f48ea71-6431-41a2-9632-43ca2ba0c9e8.png" width="600"/>

  URL에는 http://배포서버도메인:9090/project/생성한 jenkins 프로젝트이름/<br>

  빌드 유발 Trigger로, Push events, Merge request events를 설정<br>

  대상 Branch는 연동을 원하는 브랜치를 선택 <br>

  완료했다면 하단의 Add Webhook 버튼을 눌러 webhook을 생성

### **젠킨스 컨테이너 Docker 설치**

- Ec2 접속 후

  ```bash
  sudo docker exec -it jenkins bash
  ```

- 패키지 설치

  ```bash
  apt update
  apt-get install -y ca-certificates \
     curl \
        software-properties-common \
        apt-transport-https \
        gnupg \
        lsb-release
  ```

- gpg 키 다운로드

  ```bash
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

  echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
  ```

- Docker 설치

  ```bash
  apt update
  apt install docker-ce docker-ce-cli containerd.io docker-compose
  ```

> ### **jenkins 도커 이미지 빌드하기**

- jenkins 빌드 구성<br>

  빌드 단계에 들어가서 Add build step을 누르고 Execute Shell을 선택하여 아래와 같이 입력

  ```bash
  docker image prune -a --force

  mkdir -p /var/jenkins_home/images_tar

  cd /var/jenkins_home/workspace/ApiCloud/backend/apicloud/
  docker build -t springboot_deploy .
  docker save springboot_deploy > /var/jenkins_home/images_tar/springboot_deploy.tar

  cd /var/jenkins_home/workspace/ApiCloud/frontend/
  docker build -t react_deploy .
  docker save react_deploy > /var/jenkins_home/images_tar/react_deploy.tar

  ls /var/jenkins_home/images_tar

  docker load < /var/jenkins_home/images_tar/springboot_deploy.tar
  docker load < /var/jenkins_home/images_tar/react_deploy.tar

  if (docker ps | grep "springboot_deploy"); then docker stop springboot_deploy; fi
  if (docker ps | grep "react_deploy"); then docker stop react_deploy; fi

  docker run -it -d --rm -p 8005:8005 --name springboot_deploy springboot_deploy
  echo "Run springboot_deploy"
  docker run -it -d --rm -p 3000:80 --name react_deploy react_deploy
  echo "Run react_deploy"
  ```
