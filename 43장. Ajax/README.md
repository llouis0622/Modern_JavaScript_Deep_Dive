# 43장. Ajax

# 1. `Ajax` (Asynchronous JavaScript and XML)란?

- 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식
- 브라우저에서 제공하는 Web API인 `XMLHttpRequest` 객체를 기반으로 동작
- HTTP 비동기 통신을 위한 메서드와 프로퍼티 제공
- 전통적인 방식
    - 이전 웹페이지와 차이가 없어서 변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신 발생
    - 변경할 필요가 없는 부분까지 처음부터 다시 렌더링, 화면 전환이 일어나면 화면이 순간적으로 깜박이는 현상 발생
    - 클라이언트와 서버와의 통신이 동기 방식으로 동작하기 때문에 서버로부터 응답이 있을 때까지 다음 처리는 블로킹
- 변경할 필요가 있는 부분만 한정적으로 렌더링하는 방식
    - 변경할 부분을 갱신하는 데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않음
    - 변경할 필요가 없는 부분은 다시 렌더링하지 않음, 화면이 순간적으로 깜박이는 현상 발생하지 않음
    - 클라이언트와 서버와의 통신이 비동기 방식으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹이 발생하지 않음

# 2. JSON(JavaScript Object Notation)

- 클라이언트와 서버 간의 HTTP 통신을 위한 텍스트 데이터 포맷
- 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷

## 1. JSON 표기 방식

- 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트
    
    ```json
    {
      "name": "Lee",
      "age": 20,
      "alive": true,
      "hobby": ["traveling", "tennis"]
    }
    ```
    
- JSON의 키 : 반드시 큰따옴표로 묶음
- 값 : 객체 리터럴과 같은 표기법을 그대로 사용 가능
- 문자열은 반드시 큰따옴표로 묶음

## 2. `JSON.stringify`

- 객체를 JSON 포맷의 문자열로 변환
- 직렬화(Serializing) : 클라이언트가 서버로 객체를 전송하기 위해 객체를 문자열화시키는 것
    
    ```jsx
    const obj = {
      name: 'Lee',
      age: 20,
      alive: true,
      hobby: ['traveling', 'tennis']
    };
    
    // 객체를 JSON 포맷의 문자열로 변환한다.
    const json = JSON.stringify(obj);
    console.log(typeof json, json);
    // string {"name":"Lee","age":20,"alive":true,"hobby":["traveling","tennis"]}
    
    // 객체를 JSON 포맷의 문자열로 변환하면서 들여쓰기 한다.
    const prettyJson = JSON.stringify(obj, null, 2);
    console.log(typeof prettyJson, prettyJson);
    /*
    string {
      "name": "Lee",
      "age": 20,
      "alive": true,
      "hobby": [
        "traveling",
        "tennis"
      ]
    }
    */
    
    // replacer 함수. 값의 타입이 Number이면 필터링되어 반환되지 않는다.
    function filter(key, value) {
      // undefined: 반환하지 않음
      return typeof value === 'number' ? undefined : value;
    }
    
    // JSON.stringify 메서드에 두 번째 인수로 replacer 함수를 전달한다.
    const strFilteredObject = JSON.stringify(obj, filter, 2);
    console.log(typeof strFilteredObject, strFilteredObject);
    /*
    string {
      "name": "Lee",
      "alive": true,
      "hobby": [
        "traveling",
        "tennis"
      ]
    }
    */
    ```
    
- 배열도 JSON 포맷의 문자열로 변환
    
    ```jsx
    const todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
    
    // 배열을 JSON 포맷의 문자열로 변환한다.
    const json = JSON.stringify(todos, null, 2);
    console.log(typeof json, json);
    /*
    string [
      {
        "id": 1,
        "content": "HTML",
        "completed": false
      },
      {
        "id": 2,
        "content": "CSS",
        "completed": true
      },
      {
        "id": 3,
        "content": "Javascript",
        "completed": false
      }
    ]
    */
    ```
    

## 3. `JSON.parse`

- JSON 포맷의 문자열을 객체로 변환
- 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열
- 역직렬화(Deserializing) : 문자열을 객체로서 사용하려면 JSON 포맷의 문자열을 객체화
    
    ```jsx
    const obj = {
      name: 'Lee',
      age: 20,
      alive: true,
      hobby: ['traveling', 'tennis']
    };
    
    // 객체를 JSON 포맷의 문자열로 변환한다.
    const json = JSON.stringify(obj);
    
    // JSON 포맷의 문자열을 객체로 변환한다.
    const parsed = JSON.parse(json);
    console.log(typeof parsed, parsed);
    // object {name: "Lee", age: 20, alive: true, hobby: ["traveling", "tennis"]}
    ```
    
- 배열이 JSON 포맷의 문자열로 변환되어 있는 경우 문자열을 배열 객체로 변환
- 배열의 요소가 객체인 경우 배열의 요소까지 객체로 변환
    
    ```jsx
    const todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
    
    // 배열을 JSON 포맷의 문자열로 변환한다.
    const json = JSON.stringify(todos);
    
    // JSON 포맷의 문자열을 배열로 변환한다. 배열의 요소까지 객체로 변환된다.
    const parsed = JSON.parse(json);
    console.log(typeof parsed, parsed);
    /*
     object [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ]
    */
    ```
    

# 3. `XMLHttpRequest`

- 자바스크립트를 사용하여 HTTP 요청 전송

## 1. `XMLHttpRequest` 객체 생성

- `XMLHttpRequest` 생성자 함수를 호출하여 생성
- 브라우저에서 제공하는 Web API이므로 브라우저 환경에서만 정상적으로 실행
    
    ```jsx
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();
    ```
    

## 2. `XMLHttpRequest` 객체의 프로퍼티와 메서드

### 1. `XMLHttpRequest` 객체의 프로토타입 프로퍼티

- `readyState` : HTTP 요청의 현재 상태를 나타내는 정수
    - `UNSENT` : 0
    - `OPENED` : 1
    - `HEADERS_RECEIVED` : 2
    - `LOADING` : 3
    - `DONE` : 4
- `status` : HTTP 요청에 대한 응답 상태를 나타내는 정수
- `statusText` : HTTP 요청에 대한 응답 메시지를 나타내는 문자열
- `responseType` : HTTP 응답 타입
- `response` : HTTP 요청에 대한 응답 몸체, `responseType` 에 따라 타입이 다름
- `responseText` : 서버가 전송한 HTTP 요청에 대한 응답 문자열

### 2. `XMLHttpRequest` 객체의 이벤트 핸들러 프로퍼티

- `onreadystatechange` : `readyState` 프로퍼티 값이 변경된 경우
- `onloadstart` : HTTP 요청에 대한 응답을 받기 시작한 경우
- `onprogress` : HTTP 요청에 대한 응답을 받는 도중 주기적으로 발생
- `onabort` : `abort` 메서드에 의해 HTTP 요청이 중단된 경우
- `onerror` : HTTP 요청에 에러가 발생한 경우
- `onload` : HTTP 요청에 성공적으로 완료한 경우
- `ontimeout` : HTTP 요청 시간이 초과한 경우
- `onloadend` : HTTP 요청이 완료한 경우, HTTP 요청이 성공 또는 실패하면 발생

### 3. `XMLHttpRequest` 객체의 메서드

- `open` : HTTP 요청 초기화
- `send` : HTTP 요청 전송
- `abort` : 이미 전송된 HTTP 요청 중단
- `setRequestHeader` : 특정 HTTP 요청 헤더의 값 설정
- `getRequestHeader` : 특정 HTTP 요청 헤더의 값을 문자열로 반환

### 4. `XMLHttpRequest` 객체의 정적 프로퍼티

- `UNSENT` : 0, `open` 메서드 호출 이전
- `OPENED` : 1, `open` 메서드 호출 이후
- `HEADERS_RECEIVED` : 2, `send` 메서드 호출 이후
- `LOADING` : 3, 서버 응답 중
- `DONE` : 4, 서버 응답 완료

## 3. HTTP 요청 전송

- `XMLHttpRequest.prototype.open` 메서드로 HTTP 요청 초기화
- 필요에 따라 `XMLHttpRequest.prototype.setRequestHeader` 메서드로 특정 HTTP 요청의 헤더 값 설정
- `XMLHttpRequest.prototype.send` 메서드로 HTTP 요청 전송
    
    ```jsx
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();
    
    // HTTP 요청 초기화
    xhr.open('GET', '/users');
    
    // HTTP 요청 헤더 설정
    // 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
    xhr.setRequestHeader('content-type', 'application/json');
    
    // HTTP 요청 전송
    xhr.send();
    ```
    

### 1. `XMLHttpRequest.prototype.open`

- 서버에 전송할 HTTP 요청 초기화
    
    ```jsx
    xhr.open(method, url[, async])
    ```
    
    - `method` : HTTP 요청 메서드(GET, POST, PUT, DELETE)
    - `url` : HTTP 요청을 전송할 URL
    - `async` : 비동기 요청 여부, 옵션으로 기본값은 true이며 비동기 방식으로 동작
- HTTP 요청 메서드 : 클라이언트가 서버에게 요청의 종류와 목적을 알리는 방법
    - `GET` : index/retrieve, 모든/특정 리소스 취득
    - `POST` : create, 리소스 생성
    - `PUT` : replace, 리소스의 전체 교체
    - `PATCH` : modify, 리소스의 일부 수정
    - `DELETE` : delete, 모든/특정 리소스 삭제

### 2. `XMLHttpRequest.prototype.send`

- `open` 메서드로 초기화된 HTTP 요청을 서버에 전송
    - `GET` 요청 메서드 : 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송
    - `POST` 요청 메서드 : 데이터를 요청 몸체에 담아 전송
- 페이로드가 객체인 경우 반드시 `JSON.stringify` 메서드를 사용하여 직렬화한 다음 전달
    
    ```jsx
    xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));
    ```
    
- HTTP 요청 메서드가 `GET` 인 경우 `send` 메서드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 `null` 로 설정

### 3. `XMLHttpRequest.prototype.setRequestHeader`

- 특정 HTTP 요청의 헤더 값 설정
- 반드시 `open` 메서드를 호출한 이후에 호출
- `Content-type` : 요청 몸체에 담아 전송할 데이터의 MIME 타입의 정보 표현
    - `text` : text/plain, text/html, text/css, text/javascript
    - `application` : application/json, application/x-www-form-urlencode
    - `multipart` : multipart/formed-data
    
    ```jsx
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();
    
    // HTTP 요청 초기화
    xhr.open('POST', '/users');
    
    // HTTP 요청 헤더 설정
    // 클라이언트가 서버로 전송할 데이터의 MIME 타입 지정: json
    xhr.setRequestHeader('content-type', 'application/json');
    
    // HTTP 요청 전송
    xhr.send(JSON.stringify({ id: 1, content: 'HTML', completed: false }));
    ```
    
    ```jsx
    // 서버가 응답할 데이터의 MIME 타입 지정: json
    xhr.setRequestHeader('accept', 'application/json');
    ```
    
- `Accept` 헤더 미설정 → `send` 메서드가 호출될 때 `Accept` 헤더가 `*/*` 로 전송

## 4. HTTP 응답 처리

- `XMLHttpRequest` 객체가 발생시키는 이벤트 캐치
    
    ```jsx
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();
    
    // HTTP 요청 초기화
    // https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    
    // HTTP 요청 전송
    xhr.send();
    
    // readystatechange 이벤트는 HTTP 요청의 현재 상태를 나타내는 readyState 프로퍼티가
    // 변경될 때마다 발생한다.
    xhr.onreadystatechange = () => {
      // readyState 프로퍼티는 HTTP 요청의 현재 상태를 나타낸다.
      // readyState 프로퍼티 값이 4(XMLHttpRequest.DONE)가 아니면 서버 응답이 완료되지 상태다.
      // 만약 서버 응답이 아직 완료되지 않았다면 아무런 처리를 하지 않는다.
      if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
      // status 프로퍼티는 응답 상태 코드를 나타낸다.
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
      // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
      // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
      if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
        // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
    ```
    
- `readystatechange` 이벤트를 통해 HTTP 요청의 현재 상태 확인
- `load` 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생
    
    ```jsx
    // XMLHttpRequest 객체 생성
    const xhr = new XMLHttpRequest();
    
    // HTTP 요청 초기화
    // https://jsonplaceholder.typicode.com은 Fake REST API를 제공하는 서비스다.
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
    
    // HTTP 요청 전송
    xhr.send();
    
    // load 이벤트는 HTTP 요청이 성공적으로 완료된 경우 발생한다.
    xhr.onload = () => {
      // status 프로퍼티는 응답 상태 코드를 나타낸다.
      // status 프로퍼티 값이 200이면 정상적으로 응답된 상태이고
      // status 프로퍼티 값이 200이 아니면 에러가 발생한 상태다.
      // 정상적으로 응답된 상태라면 response 프로퍼티에 서버의 응답 결과가 담겨 있다.
      if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
        // {userId: 1, id: 1, title: "delectus aut autem", completed: false}
      } else {
        console.error('Error', xhr.status, xhr.statusText);
      }
    };
    ```
