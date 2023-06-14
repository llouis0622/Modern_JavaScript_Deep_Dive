# 38장. 브라우저의 렌더링 과정

# 0. 들어가기

- 파싱(Parsing)
    - 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어 들여 실행하기 위해 텍스트 문서의 문자열을 토큰으로 분해
    - 토큰에 문법적 의미와 구조를 반영하여 트리 구조의 자료구조인 파스 트리를 생성하는 일련의 과정
    - 중간 언어인 바이트코드를 생성하고 실행
- 렌더링(Rendering)
    - HTML, CSS, JS로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것

# 1. 요청과 응답

- 렌더링에 필요한 리소스는 모두 서버에 존재
- 필요한 리소스를 서버에 요청하고 서버가 응답한 리소스를 파싱하여 렌더링

# 2. HTTP 1.1과 HTTP 2.0

- 웹에서 브라우저와 서버가 통신하기 위한 프로토콜
- HTTP 1.1
    - 커넥션당 하나의 요청과 응답만 처리
    - 리소스의 동시 전송이 불가능한 구조 → 요청할 리소스의 개수에 비례하여 응답 시간 증가
- HTTP 2.0
    - 커넥션당 여러 개의 요청과 응답 가능

# 3. HTML 파싱과 DOM 생성

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

- 응답받은 HTML 문서를 파싱하여 브라우저가 이해할 수 있는 자료구조인 DOM 생성
    1. 서버에 존재하던 HTML 파일이 브라우저 요청에 의해 응답, 브라우저가 요청한 HTML 파일을 읽어 들여 메모리에 저장 → 메모리에 저장된 바이트를 인터넷을 경유하여 응답
    2. 서버가 응답한 HTML 문서를 바이트 형태로 응답받음, 응답된 바이트 형태의 HTML 문서는 `meta` 태그의 `charset` 어트리뷰트에 의해 지정된 인코딩 방식을 기준으로 문자열로 변환
    3. 문자열로 변환된 HTML 문서를 읽어 들여 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해
    4. 각 토큰들을 객체로 변환하여 노드들을 생성 → DOM을 구성하는 기본 요소
    5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 중첩 관계를 가짐, HTML 요소의 콘텐츠 영역에는 텍스트뿐만 아니라 다른 HTML 요소 포함 가능

# 4. CSS 파싱과 CSSOM 생성

- HTML과 동일한 파싱 과정을 거치며 해석 → CSSOM(CSS Object Model) 생성
    
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
    ...
    ```
    
- `meta` 태그까지 `HTML` 을 순차적으로 해석, `link` 태크를 만나면 DOM 생성을 일시 중단하고 `link` 태크의 `href` 어트리뷰트에 지정된 CSS 파일을 서버에 요청
    
    ```css
    body {
      font-size: 18px;
    }
    
    ul {
      list-style-type: none;
    }
    ```
    
- CSS 상속을 반영하여 생성

# 5. 렌더 트리 생성

- DOM과 CSSOM은 렌더링을 위해 렌더 트리로 결합
- 렌더 트리 : 렌더링을 위한 트리 구조의 자료구조
- 브라우저 화면에 렌더링되는 노드만으로 구성
- 각 HTML 요소의 레이아웃을 계산하는 데 사용되며 브라우저 화면에 픽셀을 렌더링하는 페인팅 처리에 입력
- 브라우저의 렌더링 과정은 반복해서 실행 가능
    - 자바스크립트에 의한 노드 추가 또는 삭제
    - 브라우저 창의 리사이징에 의한 뷰포트 크기 변경
    - HTML 요소의 레이아웃에 변경을 발생시키는 스타일 변경

# 6. 자바스크립트 파싱과 실행

- 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작 가능
- 자바스크립트 파싱과 실행은 브라우저 렌더링 엔진이 아닌 자바스크립트 엔진이 처리
- 모든 자바스크립트 엔진은 ECMAScript 사양 준수
- 자바스크립트 엔진은 자바스크립트를 해석 → AST(Abstract Syntax Tree, 추상적 구문 트리) 생성
- 토크나이징(Tokenizing)
    - 단순한 문자열인 자바스크립트 소스코드를 어휘 분석하여 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해, 렉싱
- 파싱
    - 토큰들의 집합을 구문 분석하여 AST 생성
    - AST : 토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료구조
    - TypeScript, Babel, Prettier 같은 트랜스파일러 구현 가능
- 바이트코드 생성과 실행
    - 파싱의 결과물로서 생성된 AST는 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 인터프리터에 의해 실행

# 7. 리플로우와 리페인트

- 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링
- 리플로우 : 레이아웃 계산을 다시 하는 것, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행
- 리페인트 : 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것

# 8. 자바스크립트 파싱에 의한 HTML 파싱 중단

- 직렬적으로 파싱 수행
- 동기적(Synchronous) : 위에서 아래 방향으로 순차적으로 HTML, CSS, JS를 파싱하고 실행
    
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
        <script>
          /*
          DOM API인 document.getElementById는 DOM에서 id가 'apple'인 HTML 요소를
          취득한다. 아래 DOM API가 실행되는 시점에는 아직 id가 'apple'인 HTML 요소를 파싱하지
          않았기 때문에 DOM에는 id가 'apple'인 HTML 요소가 포함되어 있지 않다.
          따라서 아래 코드는 정상적으로 id가 'apple'인 HTML 요소를 취득하지 못한다.
          */
          const $apple = document.getElementById('apple');
    
          // id가 'apple'인 HTML 요소의 css color 프로퍼티 값을 변경한다.
          // 이때 DOM에는 id가 'apple'인 HTML 요소가 포함되어 있지 않기 때문에 에러가 발생한다.
          $apple.style.color = 'red'; // TypeError: Cannot read property 'style' of null
        </script>
      </head>
      <body>
        <ul>
          <li id="apple">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
      </body>
    </html>
    ```
    
- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러 발생 가능
- 자바스크립트 로딩/파싱/실행으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 페이지 로딩 시간이 단축
    
    ```html
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="style.css">
      </head>
      <body>
        <ul>
          <li id="apple">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
        <script>
          /*
          DOM API인 document.getElementById는 DOM에서 id가 'apple'인 HTML 요소를
          취득한다. 아래 코드가 실행되는 시점에는 id가 'apple'인 HTML 요소의 파싱이 완료되어
          DOM에 포함되어 있기 때문에 정상적으로 동작한다.
          */
          const $apple = document.getElementById('apple');
    
          // apple 요소의 css color 프로퍼티 값을 변경한다.
          $apple.style.color = 'red';
        </script>
      </body>
    </html>
    ```
    

# 9. `script` 태그의 `async/defer` 어트리뷰트

- `src` 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용
    
    ```html
    <script async src="extern.js"></script>
    <script defer src="extern.js"></script>
    ```
    
- HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적(Asynchronous)으로 동시에 진행
- `async` 어트리뷰트
    - HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행
    - 자바스크립트 파싱과 실행은 자바스크립트 파일의 로드가 완료된 직후 진행, HTML 파싱 중단
    - 순서 보장이 필요한 `script` 태그에는 `async` 어트리뷰트 미지정
- `defer` 어트리뷰트
    - HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행
    - HTML 파싱이 완료된 직후 DOM 생성이 완료된 직후 진행
    - DOM 생성이 완료된 이후 실행되어야 할 자바스크립트에 유용
