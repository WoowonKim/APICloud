# CodeConvention

### APICloud에 Contribute를 하기 위한 Code Convention을 소개합니다. 아래 양식에 맞춰 진행해주세요.

> ## Springboot

### 패키지명

- 소문자로 작성합니다.

### 파일명

- 모든 파일명은 Pascal Case를 사용합니다.

-
- **Config**

  - <기능명>Config로 작성해주세요.
  - ex ) SecurityConfig

- **Controller**

  - <기능명/객체명>Controller로 작성해주세요.
  - ex ) UserController

- **Service**

  - 인터페이스는 <기능명/객체명>Service로 작성해주세요.
  - 실제 기능 구현은 <기능명/객체명>ServiceImpl을 생성해 구현해주세요.
  - ex ) UserService / UserServiceImpl

- **Dto**

  - 요청 Dto는 <기능명/객체명>Request로 작성해주세요.
  - 응답 Dto는 <기능명/객체명>Response로 작성해주세요.
  - 그 외에 필요한 Dto는 <기능명/객체명>DTO로 작성해주세요.
  - ex ) CreateDocRequest / CreateDocResponse

- **Vo**

  - <기능명/객체명>VO로 작성해주세요.
  - ex ) ApiDetailVO

- **Entity**

  - 사용하고자 하는 테이블명을 작성해주세요.
  - ex ) GroupUser

- **Repository**

  - <Entity명>Repository로 작성해주세요.
  - ex ) UserRepository

- **Exception**

  - Error 처리를 할 Exception을 <Exception명>Exception으로 작성해주세요.
  - ex ) BadRequestException

- **Util**
  - 위의 항목 외에 구현에 필요한 파일들을 기능명에 맞춰 작성해주세요.
  - ex ) ControllerAdvice / FileUtils

### 함수명

- 모든 함수는 Camel Case를 사용합니다.

- 구현하고자 하는 기능 동사/전치사 + 기능 주체를 결합해 작성합니다.

- ex ) changeAuthority / registerUser

### 변수명

- 모든 변수명은 Camel Case를 사용합니다.

- 해당 변수의 사용목적을 명확히 알 수 있도록 작성합니다.

### 상수명

- 대문자와 언더스코어를 사용합니다.

> ## REACT / TypeScript

> ## Data

### JPA

- **Entity**

  - Pascal Case를 사용합니다.
  - ex) User / Group

- **컬럼**
  - Camel Case를 사용합니다.

### MySQL

- **테이블**

  - Snake Case를 사용합니다.
  - 'tb\_' 를 붙여서 테이블임을 명시합니다.
  - ex) user / group_user

- **컬럼**
  - Snake Case를 사용합니다.
  - PK는 테이블명\_id로 작성합니다.
  - 약어 대신 풀네임을 사용합니다.
  - ex) user_id

#### 해당 문서에 서술된 양식 외의 컨벤션은 [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html) / [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) 를 참고하여 작성해주세요.
