# 03. MySQL 설정

> **MySQL 설정**

- EC2 서버 업데이트

```bash
sudo apt update
```

- MySQL 설치

```bash
sudo apt install mysql-server
```

> **MySQL 계정 설정**

- root 계정 접속

입력 시, 비밀번호를 입력하라고 뜨나, 아직 비밀번호가 설정된 상태가 아니므로 아무거나 입력해도 접속 가능

```bash
sudo mysql -u root -p
```

```sql
use mysql;
```

- root 계정 비밀번호 변경

```sql
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '[변경 비밀번호]';
```

- 변경 사항 적용

```sql
FLUSH PRIVILEGES;
```

- mysql 재시작

```bash
sudo service mysql restart
```

- 계정 생성 및 권한 부여

```sql
create user '{userName}'@'%' identified by '{password}'
```

```sql
  grant all privileges on *.* to '{userName}'@'%' with grant option;
```

> **외부 접속 허용하기**

- sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf 로 접근

```
bind-address = 0.0.0.0
```

- mysql 재시작

```bash
sudo service mysql restart
```

> **Workbench 설정**

- 사용자 계정 생성<br>
  Users and Privileges -> Add Account 후 계정 생성
  ![image](https://user-images.githubusercontent.com/64150747/201581062-23f0802e-c139-4c90-9c65-8029b6498d63.png)
  생성된 계정 클릭 -> Schema Privileges -> Add Entry.. -> 권한 부여할 스키마 선택
  ![image](https://user-images.githubusercontent.com/64150747/201581113-02c8c8f1-ece9-4415-bd36-15d3f3ab84aa.png)
  부여할 권한 선택 -> Apply

- 커넥션 생성
  ![image](https://user-images.githubusercontent.com/64150747/201581481-097449a1-b1aa-4e59-abc3-b94d64263bb6.png)
- DB 접속 후 database 생성
