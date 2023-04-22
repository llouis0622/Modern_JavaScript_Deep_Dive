# 05장. 표현식과 문

# 1. 값(Value)

- 식(표현식, Expression)이 평가(Evaluate)되어 생성된 결과
    
    ```jsx
    // 10 + 20은 평가되어 숫자 값 30을 생성한다.
    10 + 20; // 30
    ```
    
    ```jsx
    // 변수에는 10 + 20이 평가되어 생성된 숫자 값 30이 할당된다.
    var sum = 10 + 20;
    ```
    

# 2. 리터럴(Literal)

- 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기법(Notation)
    
    ```jsx
    // 숫자 리터럴 3
    3
    ```
    
    | 정수 리터럴 | 100 |
    | --- | --- |
    | 부동소수점 리터럴 | 10.5 |
    | 2진수 리터럴 | 0b01000001 |
    | 8진수 리터럴 | 0o101 |
    | 16진수 리터럴 | 0x41 |
    | 문자열 리터럴 | ‘Hello’, “World” |
    | 불리언 리터럴 | true, false |
    | null 리터럴 | null |
    | undefined 리터럴 | undefined |
    | 객체 리터럴 | { name: ‘Lee’, address: ‘Seoul’ } |
    | 배열 리터럴 | [1, 2, 3] |
    | 함수 리터럴 | function() {} |
    | 정규 표현식 리터럴 | /[A-Z]+/g |

# 3. 표현식(Expression)

- 값으로 평가될 수 있는 문(Statement)
- 표현식이 평가되면 새로운 값을 생성하거나 기존 값을 참조
- 표현식과 표현식이 평가된 값을 동치임(Equivalent)
    
    ```jsx
    var score = 100;
    ```
    
    ```jsx
    var score = 50 + 50;
    ```
    
    ```jsx
    score; // -> 100
    ```
    
    ```jsx
    // 리터럴 표현식
    10
    'Hello'
    
    // 식별자 표현식(선언이 이미 존재한다고 가정)
    sum
    person.name
    arr[1]
    
    // 연산자 표현식
    10 + 20
    sum = 10
    sum !== 10
    
    // 함수/메서드 호출 표현식(선언이 이미 존재한다고 가정)
    square()
    person.getName()
    ```
    
    ```jsx
    var x = 1 + 2;
    
    // 식별자 표현식 x는 3으로 평가된다.
    x + 3; // -> 6
    ```
    

# 4. 문(Statement)

- 프로그램을 구성하는 기본 단위이자 최소 실행 단위
- 여러 토큰으로 구성
    - 토큰(Token) : 문법적인 의미, 문법적으로 더 이상 나눌 수 없는 코드의 기본 요소
    
    ```jsx
    // 변수 선언문
    var x;
    
    // 표현식 문(할당문)
    x = 5;
    
    // 함수 선언문
    function foo () {}
    
    // 조건문
    if (x > 1) { console.log(x); }
    
    // 반복문
    for (var i = 0; i < 2; i++) { console.log(i); }
    ```
    

# 5. 세미콜론과 세미콜론 자동 삽입 기능

- 세미콜론(`;`) : 문의 종료
- 세미콜론 자동 삽입 기능(ASI, Automatic Semicolon Insertion)
    
    ```jsx
    function foo () {
      return
        {}
      // ASI의 동작 결과 => return; {};
      // 개발자의 예측 => return {};
    }
    
    console.log(foo()); // undefined
    
    var bar = function () {}
    (function() {})();
    // ASI의 동작 결과 => var bar = function () {}(function() {})();
    // 개발자의 예측 => var bar = function () {}; (function() {})();
    // TypeError: (intermediate value)(...) is not a function
    ```
    

# 6. 표현식인 문과 표현식이 아닌 문

```jsx
// 변수 선언문은 값으로 평가될 수 없으므로 표현식이 아니다.
var x;
// 1, 2, 1 + 2, x = 1 + 2는 모두 표현식이다.
// x = 1 + 2는 표현식이면서 완전한 문이기도 하다.
x = 1 + 2;
```

- 표현식인 문 : 값으로 평가될 수 있는 문
- 표현식이 아닌 문 : 값으로 평가될 수 없는 문
- 표현식인 문과 표현식이 아닌 문을 구별하는 가장 간단하고 명료한 방법 → 변수에 할당
