# 44장. REST API

# 0. 들어가기

- RESTful : REST의 기본 원칙을 성실히 지킨 서비스 디자인
- REST : HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API : REST를 기반으로 서비스 API를 구현한 것

# 1. REST API의 구성

- 자원(Resource), 행위(Verb), 표현(Representations)의 3가지 요소로 구성
    - 자원 : 자원, URI(엔드포인트)
    - 행위 : 자원에 대한 행위, HTTP 요청 메서드
    - 표현 : 자원에 대한 행위의 구체적 내용, 페이로드
- REST는 자체 표현 구조로 구성되어 REST API만으로 HTTP 요청의 내용 이해 가능

# 2. REST API 설계 원칙

## 1. URI는 리소스를 표현해야 함

- 리소스를 식별할 수 있는 이름 : 동사보다는 명사 사용
- `get` 같은 행위에 대한 표현이 들어가면 안됨
    
    ```sql
    # bad
    GET /getTodos/1
    GET /todos/show/1
    
    # good
    GET /todos/1
    ```
    

## 2. 리소스에 대한 행위는 HTTP 요청 메서드로 표현

- 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법
- 5가지 요청 메서드(`GET, POST, PUT, PATCH, DELETE` 등)를 사용하여 CRUD 구현
    - `GET` : index/retrieve, 모든/특정 리소스 취득, 페이로드 X
    - `POST` : create, 리소스 생성, 페이로드 O
    - `PUT` : replace, 리소스 전체 교체, 페이로드 O
    - `PATCH` : modify, 리소스 일부 수정, 페이로드 O
    - `DELETE` : delete, 모든/특정 리소스 삭제, 페이로드 X
    
    ```sql
    # bad
    GET /todos/delete/1
    
    # good
    DELETE todos/1
    ```
    

# 3. JSON Server를 이용한 REST API 실습

## 1. JSON Server 설치

- json 파일을 사용하여 가상 REST API 서버를 구축할 수 있는 툴
- npm을 사용하여 JSON Server 설치
    - npm(Node Package Manager) : 자바스크립트 패키지 매니저
        - Node.js에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할
        - 패키지 설치 및 관리는 위한 CLI(Command Line Interface) 제공
    
    ```bash
    # mkdir json-server-exam && cd json-server-exam
    # npm init -y
    # npm install json-server --save-dev
    ```
    

## 2. db.json 파일 생성

- 프로젝트 루트 폴더(/json-server-exam)에 db.json 파일 생성
- 리소스를 제공하는 데이터베이스 역할
    
    ```json
    {
      "todos": [
        {
          "id": 1,
          "content": "HTML",
          "completed": true
        },
        {
          "id": 2,
          "content": "CSS",
          "completed": false
        },
        {
          "id": 3,
          "content": "Javascript",
          "completed": true
        }
      ]
    }
    ```
    

## 3. JSON Server 실행

- JSON Server가 데이터베이스 역할을 하는 db.json 파일의 변경을 감지하게 하려면 `watch` 옵션 추가
    
    ```bash
    ## 기본 포트(3000) 사용 / watch 옵션 적용
    $ json-server --watch db.json
    ```
    
- 기본 포트(3000)
    
    ```bash
    ## 포트 변경 / watch 옵션 적용
    $ json-server --watch db.json --port 5000
    ```
    
    ```json
    {
      "name": "json-server-exam",
      "version": "1.0.0",
      "scripts": {
        "start": "json-server --watch db.json"
      },
      "devDependencies": {
        "json-server": "^0.16.1"
      }
    }
    ```
    
    ```bash
    $ npm start
    
    > json-server-exam@1.0.0 start /Users/llouis/Desktop/json-server-exam
    > json-server --watch db.json
    
    	\{^_^}/ hi!
    
    	Loading db.json
    	Oops, db.json doesn't seem to exist
    	Creating db.json with some default data
    
    	Done
    
    	Resources
    	http://localhost:3000/ports
    	http://localhost:3000/comments
    	http://localhost:3000/profile
    
    	Home
    	http://localhost:3000
    
    	Type s + enter at any time to create a snapshot of the database
    	Watching...
    ```
    

## 4. `GET` 요청

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 모든 todo를 취득(index)
    xhr.open('GET', '/todos');

    // HTTP 요청 전송
    xhr.send();

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 id를 사용하여 특정 todo를 취득(retrieve)
    xhr.open('GET', '/todos/1');

    // HTTP 요청 전송
    xhr.send();

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

## 5. `POST` 요청

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에 새로운 todo를 생성
    xhr.open('POST', '/todos');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 새로운 todo를 생성하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ id: 4, content: 'Angular', completed: false }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200(OK) 또는 201(Created)이면 정상적으로 응답된 상태다.
      if (xhr.status === 200 || xhr.status === 201) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

## 6. `PUT` 요청

- 특정 리소스 전체 교체

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 id로 todo를 특정하여 id를 제외한 리소스 전체를 교체
    xhr.open('PUT', '/todos/4');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 리소스 전체를 교체하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ id: 4, content: 'React', completed: true }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

## 7. `PATCH` 요청

- 특정 리소스의 일부를 수정

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스의 id로 todo를 특정하여 completed만 수정
    xhr.open('PATCH', '/todos/4');

    // 요청 몸체에 담아 서버로 전송할 페이로드의 MIME 타입을 지정
    xhr.setRequestHeader('content-type', 'application/json');

    // HTTP 요청 전송
    // 리소스를 수정하기 위해 페이로드를 서버에 전송해야 한다.
    xhr.send(JSON.stringify({ completed: false }));

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```

## 8. `DELETE` 요청

```html
<!DOCTYPE html>
<html>
<body>
  <pre></pre>
  <script>
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();

    // HTTP 요청 초기화
    // todos 리소스에서 id를 사용하여 todo를 삭제한다.
    xhr.open('DELETE', '/todos/4');

    // HTTP 요청 전송
    xhr.send();

    // load 이벤트는 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태다.
      if (xhr.status === 200) {
        document.querySelector('pre').textContent = xhr.response;
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
  </script>
</body>
</html>
```
