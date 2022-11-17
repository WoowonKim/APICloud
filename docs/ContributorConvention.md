# ContributorConvention

### ApiCloud에 Contribute를 하기 위한 Git Convention을 소개합니다. 아래 양식에 맞춰 진행해주세요.

> ## Branch Convention

### Branch 종류

```
main : 서비스 중인 최종 버전의 소스가 있는 브랜치

    ↳ develop : 개발 버전의 소스가 있는 브랜치, 배포 준비 브랜치

         ↳ feature : 기능 구현 브랜치

         ↳ fix: 버그 수정 브랜치

         ↳ release: 서버에서 배포관리를 위한 브랜치

         ↳ refactor: 코드 스타일 수정 및 리팩토링을 위한 브랜치

         ↳ docs: readme 등 문서 작업을 하는 브랜치

    ↳ hotfix: main에서 발생한 버그를 수정할 브랜치
```

### 개발 파트

```
back : 백엔드

front : 프론트엔드
```

다음과 같이 Branch를 생성합니다.

```
<Branch종류>/<개발파트>-issue<이슈번호>

ex) git branch feature/back-issue12
```

### 이슈 생성 방법

1. Git Issue를 생성합니다.

2. Issue는 Pull Request Convention과 동일한 양식으로 작성합니다. (작성 상세 내용에는 작업할 내용을 작성합니다.)

3. 생성된 Issue번호로 branch를 생성합니다.

> ## Commit Convention

### Commit 종류

- **feat** : 새로운 기능 추가

- **fix** : 버그 수정

- **refactor** : 코드 리팩토링

- **style** : 코드 스타일(코드 컨벤션 추가) 수정

- **docs** : 문서 작업

- **design** : 프론트 CSS 수정

- **test** : 테스트 코드 작성

- **chore** : 프로젝트 설정 파일 수정

Commit 메시지는 한글로 작성합니다. (기술적인 영어 제외)

다음과 같이 Commit 메시지를 작성합니다.

```
<Commit종류> : <작업 내용>

ex) feat: add 로그인 기능 (X)
    feat: 로그인 기능 추가 (O)
```

> ## Pull Request Convention

### PR 종류

- **feat** : 새로운 기능 추가

- **fix** : 버그 수정

- **refactor** : 코드 리팩토링

- **style** : 코드 스타일(코드 컨벤션 추가) 수정

- **docs** : 문서 작업

- **design** : 프론트 CSS 수정

- **test** : 테스트 코드 작성

- **chore** : 프로젝트 설정 파일 수정

### 개발 파트

```
BE : 백엔드

FE : 프론트엔드
```

다음과 같이 Pull Request를 작성합니다.

```bash
#제목
<[개발파트]> <PR 종류> : <작업 내용>

ex) [BE] feat : 로그인 기능 추가

#본문
목적 : Pull Request의 목적을 간략하게 작성합니다.

작업 상세 내용 : 수정된 사항을 자세히 작성합니다.

참고사항 : 이외에 참고해야할 사항들을 작성합니다.
```
