# 20장. strict mode

# 1. strict mode란?

```jsx
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

- 암묵적 전역(Implicit Global) : 암묵적으로 전역 객체에 프로퍼티 동적 생성
    - 전역 변수처럼 사용 가능
- 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러 발생
- ESLint : 정적 분석 기능을 통해 소스코드를 실행하기 전에 소스코드를 스캔하여 문법적 오류만이 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구
    - strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제 가능

# 2. strict mode의 적용

- 전역의 선두 또는 함수 몸체의 선두에 `'use strict';` 추가
    
    ```jsx
    'use strict';
    
    function foo() {
      x = 10; // ReferenceError: x is not defined
    }
    foo();
    ```
    
- 함수 몸체의 선두에 추가 → 해당 함수와 중첩 함수에 strict mode 적용
    
    ```jsx
    function foo() {
      'use strict';
    
      x = 10; // ReferenceError: x is not defined
    }
    foo();
    ```
    
- 코드 선두에 `'use strict';` 위치시키지 않으면 strict mode가 제대로 동작 불가
    
    ```jsx
    function foo() {
      x = 10; // 에러를 발생시키지 않는다.
      'use strict';
    }
    foo();
    ```
    

# 3. 전역에 strict mode를 적용하는 것은 피하자

- 스크립트 단위로 적용
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        'use strict';
      </script>
      <script>
        x = 1; // 에러가 발생하지 않는다.
        console.log(x); // 1
      </script>
      <script>
        'use strict';
    
        y = 1; // ReferenceError: y is not defined
        console.log(y);
      </script>
    </body>
    </html>
    ```
    
- 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode 적용
    
    ```jsx
    // 즉시 실행 함수의 선두에 strict mode 적용
    (function () {
      'use strict';
    
      // Do something...
    }());
    ```
    

# 4. 함수 단위로 strict mode를 적용하는 것도 피하자

- 어떤 함수는 strict mode를 적용하고 어떤 함수는 strict mode를 적용하지 않는 것은 바람직하지 않음
    
    ```jsx
    (function () {
      // non-strict mode
      var lеt = 10; // 에러가 발생하지 않는다.
    
      function foo() {
        'use strict';
    
        let = 20; // SyntaxError: Unexpected strict mode reserved word
      }
      foo();
    }());
    ```
    

# 5. strict mode가 발생시키는 에러

## 1. 암묵적 전역

- 선언하지 않은 변수 참조 → ReferenceError 발생
    
    ```jsx
    (function () {
      'use strict';
    
      x = 1;
      console.log(x); // ReferenceError: x is not defined
    }());
    ```
    

## 2. 변수, 함수, 매개변수의 삭제

- `delete` 연산자로 변수, 함수, 매개변수 삭제 → SyntaxError 발생
    
    ```jsx
    (function () {
      'use strict';
    
      var x = 1;
      delete x;
      // SyntaxError: Delete of an unqualified identifier in strict mode.
    
      function foo(a) {
        delete a;
        // SyntaxError: Delete of an unqualified identifier in strict mode.
      }
      delete foo;
      // SyntaxError: Delete of an unqualified identifier in strict mode.
    }());
    ```
    

## 3. 매개변수 이름의 중복

- 중복된 매개변수 이름 사용 → SyntaxError 발생
    
    ```jsx
    (function () {
      'use strict';
    
      //SyntaxError: Duplicate parameter name not allowed in this context
      function foo(x, x) {
        return x + x;
      }
      console.log(foo(1, 2));
    }());
    ```
    

## 4. `with` 문의 사용

- SyntaxError 발생
- 전달된 객체를 스코프 체인에 추가
    
    ```jsx
    (function () {
      'use strict';
    
      // SyntaxError: Strict mode code may not include a with statement
      with({ x: 1 }) {
        console.log(x);
      }
    }());
    ```
    

# 6. strict mode 적용에 의한 변화

## 1. 일반 함수의 `this`

- 함수를 일반 함수로써 호출 → `this` 에 `undefined` 바인딩
    
    ```jsx
    (function () {
      'use strict';
    
      function foo() {
        console.log(this); // undefined
      }
      foo();
    
      function Foo() {
        console.log(this); // Foo
      }
      new Foo();
    }());
    ```
    

## 2. `arguments` 객체

- 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않음
    
    ```jsx
    (function (a) {
      'use strict';
      // 매개변수에 전달된 인수를 재할당하여 변경
      a = 2;
    
      // 변경된 인수가 arguments 객체에 반영되지 않는다.
      console.log(arguments); // { 0: 1, length: 1 }
    }(1));
    ```