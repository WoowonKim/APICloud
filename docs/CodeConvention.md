# CodeConvention

### ApiCloud에 Contribute를 하기 위한 Code Convention을 소개합니다. 아래 양식에 맞춰 진행해주세요.

> ## Springboot

### 패키지명

- 소문자로 작성합니다.

### 파일명

- 모든 파일명은 Pascal Case를 사용합니다.

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

### 폴더명

- 컴포넌트 관련 폴더명은 Pascal Case를 사용합니다.
- 그 외의 폴더명은 Camel Case를 사용합니다.
- 컴포넌트의 폴더는 컴포넌트 파일과 스타일 파일로 구분하여 작성합니다.
  - ex) Component.tsx / Component.scss

### 파일명

- react 컴포넌트
  - 파일명은 Pascal Case를 사용합니다.
  - react의 컴포넌트인 경우 파일 확장자를 .tsx로 작성합니다.
- 스타일
  - 파일명은 Pascal Case를 사용합니다.
  - 스타일 코드의 경우 파일 확장자를 .scss로 작성합니다.
- 비즈니스 로직
  - 파일명은 Cascal Case를 사용합니다.
  - 컴포넌트가 아닌 비즈니스 로직과 관련된 파일의 경우 파일 확장자를 .ts로 작성합니다.

### 함수명

- 모든 함수는 Camel Case를 사용합니다.
- 함수의 경우 기능 동사/전치사 + 기능 주체를 결합해 작성합니다.

### 변수명

- 모든 변수명은 Camel Case를 사용합니다.
- 해당 변수의 사용목적을 명확히 알 수 있도록 작성합니다.
- 변수의 선언은 var를 지양하고 let이나 const를 사용합니다.

### 스타일

- 스타일 코드는 StyledComponent와 SCSS를 사용합니다.
- 여러 컴포넌트에서 사용하는 스타일은 StyledComponent를 활용하여 작성합니다.
- inline CSS를 작성하지 않습니다.
- className은 파일명 + 기능 주체를 결합해 작성합니다.
  - ex) className=”welcomeHeader”

### 들여쓰기

- 탭(tab) 문자를 사용하여 들여씁니다. 탭 대신 스페이스를 사용하지 않습니다
- 1개의 탭 크기는 스페이스 2개와 같도록 에디터에서 설정합니다.

### TypeScript

- react의 useDispath/useSelector 대신 type을 지정해둔 useAppDispath/useAppSelector를 사용합니다.
- 여러 컴포넌트에서 사용되는 타입의 경우 .ts 파일에서 관리합니다.
- 적절한 타입을 정의하여 작성합니다.

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
