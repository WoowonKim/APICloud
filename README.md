# ☁️APICloud

![](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb79b2d09-a53a-4fab-a969-7e72c96fb364%2FKakaoTalk_20221109_160041020.png?table=block&id=a775f43b-631e-4acf-82f9-c37cac455fe9&spaceId=a58fbc02-debe-4308-8332-63da46011251&width=250&userId=c5496e47-f115-4111-8d4e-742818285391&cache=v2)

💡 **APICloud - API 생성 서비스**

Spring Boot Framework 환경에서 Restful API를 개발할 시, 작성한 API 명세를 기반으로 Controller를 작성해주는 웹서비스

## 주요기능

1. 작성한 API 명세를 기반으로 SpringBoot 프로젝트, controller, DTO 생성
2. 작성된 API들의 요청값과 반환값 확인 및 테스트
3. Google/Github 로그인을 통해 사용자 API 문서를 저장 및 그룹 생성
4. 그룹 API 문서 동시 작성/편집
5. 작성된 API 문서를 PDF, CSV, Notion으로 Export
6. 프로젝트, API 문서 간 동기화 기능

## 아키텍쳐

![image](https://user-images.githubusercontent.com/105499985/202324997-0f7ffd20-c31f-43be-a0f3-81ec9d5fbfe6.png)

## 기능영상

### 웰컴페이지

![image](https://user-images.githubusercontent.com/105499985/202839993-859b00e2-1f57-4912-b994-20de7360917c.png)

- Google, Github 로그인

### API Doc 생성, 정보 수정

- api doc 생성

  ![01_main_API명세서생성](https://user-images.githubusercontent.com/105499985/202839340-22d551e6-fa32-41f3-9598-fc05769455c8.gif)

  - 서버 정보 삽입
  - 공유 유저 선택

- 유저 권한 설정

  ![02_main_유저권한설정](https://user-images.githubusercontent.com/105499985/202839342-4e85b6b3-4b5f-4106-bf20-09b0c6848a65.gif)

  - 편집자, 뷰어 중 설정
  - 그룹에서 사용자 삭제

### API Doc 편집

- 컨트롤러 생성

  ![03_createApi_컨트롤러생성](https://user-images.githubusercontent.com/105499985/202839344-a1259aa3-7f64-4862-bc17-7218a308762a.gif)

- 컨트롤러 생성 시 유효성 검사

  ![04_createApi_컨트롤러추가유효성](https://user-images.githubusercontent.com/105499985/202839345-0b0f7823-55c1-4803-878f-cfd9ffe52453.gif)

  - 중복되는 컨트롤러 이름, 중복되는 api 검사

- 명세서 작성

  ![05_createApi_명세서작성](https://user-images.githubusercontent.com/105499985/202839347-3be13fe7-51cd-4a9d-90d8-9b4ddf52e4c5.gif)

- dto 중복 확인

  ![06_createApi_dto중복확인](https://user-images.githubusercontent.com/105499985/202839348-a9c39aea-3b41-46b0-9b9a-7d14121d0ac5.gif)

  - 새로 생성할 dto 이름이 이미 같은 controller 내에 존재할 시, 이름을 변경하거나 기존 dto를 사용 가능

- dto 정보 보기

  ![07_creaeApi_dto정보보기](https://user-images.githubusercontent.com/105499985/202839349-22891125-ebb8-4a59-b105-3b737856961d.gif)

  - 해당 api 문서에서 사용된 dto 정보 확인 가능

- 추춭

  - 노션 추출

    ![08_extract_Notion](https://user-images.githubusercontent.com/105499985/202839350-a70544af-021b-46ed-a87c-db12e657142e.gif)

  - spring boot 추출

    ![09_extract_SpringBoot](https://user-images.githubusercontent.com/105499985/202839351-55e257f1-bf0b-46ab-bd45-fd5b74becfb9.gif)

  - csv 추출

    ![10_extract_CSV](https://user-images.githubusercontent.com/105499985/202839352-927cca7f-9fb6-493e-ae41-c9b9a8c3ce95.gif)

### API Doc 동기화

- 코드 > API 문서

  ![11_sync_파일to문서](https://user-images.githubusercontent.com/105499985/202839355-29f525e6-1ba6-4603-9c5d-74814d305bb0.gif)

  - 코드에서 수정된 내용을 api 문서에 적용

- API 문서 > 코드

  ![12_sync_문서to코드](https://user-images.githubusercontent.com/105499985/202839356-ec2975e2-3423-4507-b9bb-06d5500545be.gif)

  - api 문서에서 수정된 내용을 코드에 추가

### API Docs 상세보기

![13_apiDocs_문서상세보기](https://user-images.githubusercontent.com/105499985/202839357-fab76a94-76dd-415c-91bd-41aa1608d1ad.gif)

- 작성한 api를 쉽게 확인 가능
- 사이드바에서 원하는 api를 선택하여 바로 이동

### API test

![14_api_test페이지](https://user-images.githubusercontent.com/105499985/202863680-583772eb-f42e-47d3-93c1-ae71c0ced9cc.png)

- 작성한 api 문서를 기반으로 자동으로 test 틀 생성
- Request Body, Query, Parameter 전송 가능

  - Request Body: JSON 형태로 작성
  - Query: url에 ?를 입력하면 필요한 query key 자동 생성
  - Parameter: url에 직접 입력

## 산출물

- [기능명세서](https://great-haircut-17f.notion.site/8205cbddae5149f7a34d28369ca608ee)
- [Mockup](https://www.notion.so/APICloud-a775f43b631e4acf82f9c37cac455fe9?p=67043fe082194a3c925677eefefb1de6&pm=s)
- [API](https://great-haircut-17f.notion.site/API-DOCS-8beccf8f0520450a9e285bd06920a77f)
- [ERD](https://great-haircut-17f.notion.site/ERD-d01c7ef3aa8a4accb3bfd3bce1a1b12c)
- [포팅메뉴얼](https://lab.ssafy.com/s07-final/S07P31B205/-/blob/develop/exec/%ED%8F%AC%ED%8C%85%EB%A7%A4%EB%89%B4%EC%96%BC.md)

## 팀소개

| 이름   | 역할            |
| ------ | --------------- |
| 신영제 | 팀장, Frontend  |
| 김우원 | 부팀장, Backend |
| 김은경 | 팀원, Backend   |
| 김은혜 | 팀원, Frontend  |
| 정세미 | 팀원, Backend   |
| 조유진 | 팀원, Frontend  |

## 기여

APICloud 프로젝트는 오픈소스이며, 개발자 분들의 참여를 환영합니다. APICloud에 Contributor로 참여하는 법은 [Contributor Guide](https://lab.ssafy.com/s07-final/S07P31B205/-/blob/develop/docs/ContributorGuide.md)를 참고해주세요.

## 라이선스

Distributed under the SGPL license. See [License](https://lab.ssafy.com/s07-final/S07P31B205/-/blob/develop/LICENSE) for more information.
