# 12장. 함수

# 1. 함수란?

```jsx
// f(x, y) = x + y
function add(x, y) {
  return x + y;
}

// f(2, 5) = 7
add(2, 5); // 7
```

- 일련의 과정을 문(Statement)으로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
- 매개변수(Parameter) : 함수 내부로 입력을 전달받는 변수
- 인수(Argument) : 입력
- 반환값(Return Value) : 출력
- 함수 정의(Function Definition)을 통해 함수 생성
    
    ```jsx
    // 함수 정의
    function add(x, y) {
      return x + y;
    }
    ```
    
- 함수 호출(Function Call / Invoke) : 인수를 매개변수를 통해 함수에 전달하면서 함수의 실행을 명시적으로 지시
    
    ```jsx
    // 함수 호출
    var result = add(2, 5);
    
    // 함수 add에 인수 2, 5를 전달하면서 호출하면 반환값 7을 반환한다.
    console.log(result); // 7
    ```
    

# 2. 함수를 사용하는 이유

- 코드의 재사용 가능
- 유지보수의 편의성
- 코드의 신뢰성 상승
- 코드의 가독성 향상

# 3. 함수 리터럴

- 함수 → 객체
- 일반 객체는 호출할 수 없음, 함수는 호출 가능

```jsx
// 변수에 함수 리터럴을 할당
var f = function add(x, y) {
  return x + y;
};
```

- 함수 이름
    - 식별자 → 식별자 네이밍 규칙 준수
    - 함수 몸체 내에서만 참조할 수 있는 식별자
    - 생략 가능
    - 기명 함수(Named Function) : 이름이 있는 함수
    - 무명/익명 함수(Anonymous Function) : 이름이 없는 함수
- 매개변수 목록
    - 0개 이상의 매개변수를 소괄호로 감싸고 쉼표로 구분
    - 함수를 호출할 때 지정한 인수가 순서대로 할당
    - 함수 몸체 내에서 변수와 동일하게 취급 → 식별자 네이밍 규칙 준수
- 함수 몸체
    - 함수가 호출되었을 때 일괄적으로 실행될 문들을 하나의 실행 단위로 정의한 코드 블록
    - 함수 호출에 의해 실행

# 4. 함수 정의

## 1. 함수 선언문

```jsx
// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 참조
// console.dir은 console.log와는 달리 함수 객체의 프로퍼티까지 출력한다.
// 단, Node.js 환경에서는 console.log와 같은 결과가 출력된다.
console.dir(add); // ƒ add(x, y)

// 함수 호출
console.log(add(2, 5)); // 7
```

- 함수 선언문은 함수 이름 생략 불가능
    
    ```jsx
    // 함수 선언문은 함수 이름을 생략할 수 없다.
    function (x, y) {
      return x + y;
    }
    // SyntaxError: Function statements require a function name
    ```
    
- 함수 선언문은 표현식이 아닌 문
    
    ```jsx
    // 함수 선언문은 표현식이 아닌 문이므로 변수에 할당할 수 없다.
    // 하지만 함수 선언문이 변수에 할당되는 것처럼 보인다.
    var add = function add(x, y) {
      return x + y;
    };
    
    // 함수 호출
    console.log(add(2, 5)); // 7
    ```
    
    ```jsx
    // 기명 함수 리터럴을 단독으로 사용하면 함수 선언문으로 해석된다.
    // 함수 선언문에서는 함수 이름을 생략할 수 없다.
    function foo() { console.log('foo'); }
    foo(); // foo
    
    // 함수 리터럴을 피연산자로 사용하면 함수 선언문이 아니라 함수 리터럴 표현식으로 해석된다.
    // 함수 리터럴에서는 함수 이름을 생략할 수 있다.
    (function bar() { console.log('bar'); });
    bar(); // ReferenceError: bar is not defined
    ```
    
- 자바스크립트 엔진은 생성된 함수를 호출하기 위해 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고, 거기에 함수 객체 할당
    
    ```jsx
    var add = function add(x, y) {
      return x + y;
    };
    
    console.log(add(2, 5)); // 7
    ```
    
- 함수는 함수 이름으로 호출하는 것이 아니라 함수 객체를 가리키는 식별자로 호출

## 2. 함수 표현식

- 일급 객체
    - 값처럼 변수에 할당 가능
    - 프로퍼티 값 가능
    - 배열의 요소 가능
- 자바스크립트의 함수는 일급 객체임
- 함수 리터럴로 생성한 함수 객체를 변수에 할당 가능
    
    ```jsx
    // 함수 표현식
    var add = function (x, y) {
      return x + y;
    };
    
    console.log(add(2, 5)); // 7
    ```
    
- 익명 함수 : 함수 리터럴의 함수 이름 생략 가능
    
    ```jsx
    // 기명 함수 표현식
    var add = function foo (x, y) {
      return x + y;
    };
    
    // 함수 객체를 가리키는 식별자로 호출
    console.log(add(2, 5)); // 7
    
    // 함수 이름으로 호출하면 ReferenceError가 발생한다.
    // 함수 이름은 함수 몸체 내부에서만 유효한 식별자다.
    console.log(foo(2, 5)); // ReferenceError: foo is not defined
    ```
    
- 함수 선언문 : 표현식이 아닌 문
- 함수 표현식 : 표현식인 문

## 3. 함수 생성 시점과 함수 호이스팅

```jsx
// 함수 참조
console.dir(add); // ƒ add(x, y)
console.dir(sub); // undefined

// 함수 호출
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function (x, y) {
  return x - y;
};
```

- 함수 선언문으로 정의한 함수와 함수 표현식으로 정의한 함수의 생성 시점 다름
- 함수 호이스팅(Function Hoisting) : 함수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징
- 변수 할당문의 값은 할당문이 실행되는 시점 → 런타임에 평가
- 함수 표현식의 함수 리터럴도 할당문이 실행되는 시점에 평가되어 함수 객체가 됨
- 함수 표현식으로 함수 정의 → 함수 호이스팅이 발생하는 것이 아니라 변수 호이스팅 발생

## 4. `Function` 생성자 함수

- 생성자 함수(Constructor Function) : 객체를 생성하는 함수
    
    ```jsx
    var add = new Function('x', 'y', 'return x + y');
    
    console.log(add(2, 5)); // 7
    ```
    
- 클로저(Closure) 생성하지 않음
    
    ```jsx
    var add1 = (function () {
      var a = 10;
      return function (x, y) {
        return x + y + a;
      };
    }());
    
    console.log(add1(1, 2)); // 13
    
    var add2 = (function () {
      var a = 10;
      return new Function('x', 'y', 'return x + y + a;');
    }());
    
    console.log(add2(1, 2)); // ReferenceError: a is not defined
    ```
    

## 5. 화살표 함수(Arrow Function)

- 화살표(Fat Arrow, `=>`)를 사용해 좀 더 간략한 방법으로 함수 선언
    
    ```jsx
    // 화살표 함수
    const add = (x, y) => x + y;
    console.log(add(2, 5)); // 7
    ```
    
- 생성자 함수로 사용할 수 없음
- 기존 함수와 this 바인딩 방식이 다름
- prototype 프로퍼티 없음
- arguments 객체 생성 X

# 5. 함수 호출

## 1. 매개변수와 인수

- 인수 : 값으로 평가될 수 있는 표현식
    - 함수를 호출할 때 지정
    - 개수와 타입에 제한 없음
    
    ```jsx
    // 함수 선언문
    function add(x, y) {
      return x + y;
    }
    
    // 함수 호출
    // 인수 1과 2는 매개변수 x와 y에 순서대로 할당되고 함수 몸체의 문들이 실행된다.
    var result = add(1, 2);
    ```
    
- 함수 몸체 내부에서 변수와 동일하게 취급
- 매개변수의 스코프(유효 범위)는 함수 내부
    
    ```jsx
    function add(x, y) {
      console.log(x, y); // 2 5
      return x + y;
    }
    
    add(2, 5);
    
    // add 함수의 매개변수 x, y는 함수 몸체 내부에서만 참조할 수 있다.
    console.log(x, y); // ReferenceError: x is not defined
    ```
    
- 인수가 부족해서 인수가 할당되지 않은 매개변수의 값은 `undefined`
    
    ```jsx
    function add(x, y) {
      return x + y;
    }
    
    console.log(add(2)); // NaN
    ```
    
- 매개변수보다 인수가 더 많은 경우 초과된 인수는 무시
    
    ```jsx
    function add(x, y) {
      return x + y;
    }
    
    console.log(add(2, 5, 10)); // 7
    ```
    
- 암묵적으로 arguments 객체의 프로퍼티로 보관
    
    ```jsx
    function add(x, y) {
      console.log(arguments);
      // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    
      return x + y;
    }
    
    add(2, 5, 10);
    ```
    
- arguments 객체 : 함수를 정의할 때 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하게 사용

## 2. 인수 확인

```jsx
function add(x, y) {
  return x + y;
}
```

```jsx
function add(x, y) {
  return x + y;
}

console.log(add(2));        // NaN
console.log(add('a', 'b')); // 'ab'
```

- 자바스크립트 함수는 매개변수와 인수의 개수가 일치하는지 확인하지 않음
- 자바스크립트는 동적 타입 언어 → 자바스크립트 함수는 매개변수의 타입을 사전 지정 불가
    
    ```jsx
    function add(x, y) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        // 매개변수를 통해 전달된 인수의 타입이 부적절한 경우 에러를 발생시킨다.
        throw new TypeError('인수는 모두 숫자 값이어야 합니다.');
      }
    
      return x + y;
    }
    
    console.log(add(2));        // TypeError: 인수는 모두 숫자 값이어야 합니다.
    console.log(add('a', 'b')); // TypeError: 인수는 모두 숫자 값이어야 합니다.
    ```
    
- 인수가 전달되지 않은 경우 단축 평가를 사용해 매개변수에 기본값을 할당
    
    ```jsx
    function add(a, b, c) {
      a = a || 0;
      b = b || 0;
      c = c || 0;
      return a + b + c;
    }
    
    console.log(add(1, 2, 3)); // 6
    console.log(add(1, 2)); // 3
    console.log(add(1)); // 1
    console.log(add()); // 0
    ```
    
    ```jsx
    function add(a = 0, b = 0, c = 0) {
      return a + b + c;
    }
    
    console.log(add(1, 2, 3)); // 6
    console.log(add(1, 2)); // 3
    console.log(add(1)); // 1
    console.log(add()); // 0
    ```
    

## 3. 매개변수의 최대 개수

- 이상적인 매개변수 개수는 0개
- 이상적인 함수는 한 가지 일만 해야 하며 가급적 작게 만들어야 함
- 매개변수의 개수 최대 3개 이상을 넘지 않는 것을 권장
    
    ```jsx
    $.ajax({
      method: 'POST',
      url: '/user',
      data: { id: 1, name: 'Lee' },
      cache: false
    });
    ```
    
- 함수 외부에서 함수 내부로 전달한 객체를 함수 내부에서 변경하면 함수 외부의 객체가 변경되는 부수 효과 발생

## 4. 반환문

- 실행 결과를 함수 외부로 반환
    
    ```jsx
    function multiply(x, y) {
      return x * y; // 반환문
    }
    
    // 함수 호출은 반환값으로 평가된다.
    var result = multiply(3, 5);
    console.log(result); // 15
    ```
    
- 함수 호출은 표현식
- 반환문은 함수의 실행을 중단하고 함수 몸체를 빠져나감
    
    ```jsx
    function multiply(x, y) {
      return x * y; // 반환문
      // 반환문 이후에 다른 문이 존재하면 그 문은 실행되지 않고 무시된다.
      console.log('실행되지 않는다.');
    }
    
    console.log(multiply(3, 5)); // 15
    ```
    
- 반환문은 `return` 키워드 뒤에 오는 표현식을 평가해 반환
    
    ```jsx
    function foo () {
      return;
    }
    
    console.log(foo()); // undefined
    ```
    
- 반환문 생략 가능
    
    ```jsx
    function foo () {
      // 반환문을 생략하면 암묵적으로 undefined가 반환된다.
    }
    
    console.log(foo()); // undefined
    ```
    
    ```jsx
    function multiply(x, y) {
      // return 키워드와 반환값 사이에 줄바꿈이 있으면
      return // 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론이 추가된다.
      x * y; // 무시된다.
    }
    
    console.log(multiply(3, 5)); // undefined
    ```
    
- 반환문은 함수 몸체 내부에서만 사용 가능
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        return; // SyntaxError: Illegal return statement
      </script>
    </body>
    </html>
    ```
    

# 6. 참조에 의한 전달과 외부 상태의 변경

- 매개변수도 함수 몸체 내부에서 변수와 동일하게 취급 → 매개변수 또한 타입에 따라 값에 의한 전달, 함조에 의한 전달 방식을 그대로 따름
    
    ```jsx
    // 매개변수 primitive는 원시 값을 전달받고, 매개변수 obj는 객체를 전달받는다.
    function changeVal(primitive, obj) {
      primitive += 100;
      obj.name = 'Kim';
    }
    
    // 외부 상태
    var num = 100;
    var person = { name: 'Lee' };
    
    console.log(num); // 100
    console.log(person); // {name: "Lee"}
    
    // 원시 값은 값 자체가 복사되어 전달되고 객체는 참조 값이 복사되어 전달된다.
    changeVal(num, person);
    
    // 원시 값은 원본이 훼손되지 않는다.
    console.log(num); // 100
    
    // 객체는 원본이 훼손된다.
    console.log(person); // {name: "Kim"}
    ```
    
- 원시 타입 인수 : 함수 외부에서 함수 몸체 내부로 전달한 원시 값의 원본을 변경하는 어떠한 부수 효과 발생 X
- 객체 타입 인수 : 함수의 외부에서 함수 몸체 내부로 전달한 참조 값에 의해 원본 객체가 변경되는 부수 효과 발생
- 불변 객체(Immutable Object)로 만들어 사용
- 깊은 복사를 통해 새로운 객체를 생성하고 재할당을 통해 교체

# 7. 다양한 함수의 형태

## 1. 즉시 실행 함수(IIFE, Immediately Invoked Function Expression)

- 함수 정의와 동시에 호출되는 함수
- 단 한 번만 호출되며 다시 호출 불가
    
    ```jsx
    // 익명 즉시 실행 함수
    (function () {
      var a = 3;
      var b = 5;
      return a * b;
    }());
    ```
    
- 익명 함수를 사용하는 것이 일반적
    
    ```jsx
    // 기명 즉시 실행 함수
    (function foo() {
      var a = 3;
      var b = 5;
      return a * b;
    }());
    
    foo(); // ReferenceError: foo is not defined
    ```
    
- 즉시 실행 함수는 반드시 그룹 연산자(`( )`)로 감싸야 함
    
    ```jsx
    function () { // SyntaxError: Function statements require a function name
      // ...
    }();
    ```
    
    ```jsx
    function foo() {
      // ...
    }(); // SyntaxError: Unexpected token ')'
    ```
    
    ```jsx
    function foo() {}(); // => function foo() {};();
    ```
    
    ```jsx
    (); // SyntaxError: Unexpected token ')'
    ```
    
    ```jsx
    console.log(typeof (function f(){})); // function
    console.log(typeof (function (){}));  // function
    ```
    
    ```jsx
    (function () {
      // ...
    }());
    
    (function () {
      // ...
    })();
    
    !function () {
      // ...
    }();
    
    +function () {
      // ...
    }();
    ```
    
    ```jsx
    // 즉시 실행 함수도 일반 함수처럼 값을 반환할 수 있다.
    var res = (function () {
      var a = 3;
      var b = 5;
      return a * b;
    }());
    
    console.log(res); // 15
    
    // 즉시 실행 함수에도 일반 함수처럼 인수를 전달할 수 있다.
    res = (function (a, b) {
      return a * b;
    }(3, 5));
    
    console.log(res); // 15
    ```
    

## 2. 재귀 함수(Recursive Function)

- 재귀 호출 : 함수가 자기 자신을 호출하는 것
- 재귀 호출을 수행하는 함수
- 반복되는 처리를 위해 사용
    
    ```jsx
    function countdown(n) {
      for (var i = n; i >= 0; i--) console.log(i);
    }
    
    countdown(10);
    ```
    
    ```jsx
    function countdown(n) {
      if (n < 0) return;
      console.log(n);
      countdown(n - 1); // 재귀 호출
    }
    
    countdown(10);
    ```
    
    ```jsx
    // 팩토리얼(계승)은 1부터 자신까지의 모든 양의 정수의 곱이다.
    // n! = 1 * 2 * ... * (n-1) * n
    function factorial(n) {
      // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
      if (n <= 1) return 1;
      // 재귀 호출
      return n * factorial(n - 1);
    }
    
    console.log(factorial(0)); // 0! = 1
    console.log(factorial(1)); // 1! = 1
    console.log(factorial(2)); // 2! = 2 * 1 = 2
    console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
    console.log(factorial(4)); // 4! = 4 * 3 * 2 * 1 = 24
    console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
    ```
    
    ```jsx
    // 함수 표현식
    var factorial = function foo(n) {
      // 탈출 조건: n이 1 이하일 때 재귀 호출을 멈춘다.
      if (n <= 1) return 1;
      // 함수를 가리키는 식별자로 자기 자신을 재귀 호출
      return n * factorial(n - 1);
    
      // 함수 이름으로 자기 자신을 재귀 호출할 수도 있다.
      // console.log(factorial === foo); // true
      // return n * foo(n - 1);
    };
    
    console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
    ```
    
    ```jsx
    function factorial(n) {
      if (n <= 1) return 1;
    
      var res = n;
      while (--n) res *= n;
      return res;
    }
    
    console.log(factorial(0)); // 0! = 1
    console.log(factorial(1)); // 1! = 1
    console.log(factorial(2)); // 2! = 2 * 1 = 2
    console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
    console.log(factorial(4)); // 4! = 4 * 3 * 2 * 1 = 24
    console.log(factorial(5)); // 5! = 5 * 4 * 3 * 2 * 1 = 120
    ```
    

## 3. 중첩 함수(Nested Function)

- 중첩 함수, 내부 함수(Inner Function) : 함수 내부에 정의된 함수
- 외부 함수(Outer Function) : 중첩 함수를 포함하는 함수
- 일반적으로 중첩 함수는 자신을 포함하는 외부 함수를 돕는 헬퍼 함수의 역할
    
    ```jsx
    function outer() {
      var x = 1;
    
      // 중첩 함수
      function inner() {
        var y = 2;
        // 외부 함수의 변수를 참조할 수 있다.
        console.log(x + y); // 3
      }
    
      inner();
    }
    
    outer();
    ```
    

## 4. 콜백 함수(Callback Function)

```jsx
// n만큼 어떤 일을 반복한다.
function repeat(n) {
  // i를 출력한다.
  for (var i = 0; i < n; i++) console.log(i);
}

repeat(5); // 0 1 2 3 4
```

```jsx
// n만큼 어떤 일을 반복한다.
function repeat1(n) {
  // i를 출력한다.
  for (var i = 0; i < n; i++) console.log(i);
}

repeat1(5); // 0 1 2 3 4

// n만큼 어떤 일을 반복한다.
function repeat2(n) {
  for (var i = 0; i < n; i++) {
    // i가 홀수일 때만 출력한다.
    if (i % 2) console.log(i);
  }
}

repeat2(5); // 1 3
```

```jsx
// 외부에서 전달받은 f를 n만큼 반복 호출한다.
function repeat(n, f) {
  for (var i = 0; i < n; i++) {
    f(i); // i를 전달하면서 f를 호출
  }
}

var logAll = function (i) {
  console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logAll); // 0 1 2 3 4

var logOdds = function (i) {
  if (i % 2) console.log(i);
};

// 반복 호출할 함수를 인수로 전달한다.
repeat(5, logOdds); // 1 3
```

- 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수
- 고차 함수(HOF, Higher-Order Function) : 매개변수를 통해 함수의 외부에서 콜백 함수를 전달받은 함수
- 고차 함수는 콜백 함수를 자신의 일부분으로 합성
- 고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정해서 호출
- 콜백 함수는 고차 함수에 의해 호출 → 고차 함수는 필요에 따라 콜백 함수에 인수 전달 가능
    
    ```jsx
    // 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달한다.
    // 익명 함수 리터럴은 repeat 함수를 호출할 때마다 평가되어 함수 객체를 생성한다.
    repeat(5, function (i) {
      if (i % 2) console.log(i);
    }); // 1 3
    ```
    
    ```jsx
    // logOdds 함수는 단 한 번만 생성된다.
    var logOdds = function (i) {
      if (i % 2) console.log(i);
    };
    
    // 고차 함수에 함수 참조를 전달한다.
    repeat(5, logOdds); // 1 3
    ```
    
- 함수형 프로그래밍 패러다임뿐만 아니라 비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)에 활용되는 중요한 패턴
    
    ```jsx
    // 콜백 함수를 사용한 이벤트 처리
    // myButton 버튼을 클릭하면 콜백 함수를 실행한다.
    document.getElementById('myButton').addEventListener('click', function () {
      console.log('button clicked!');
    });
    
    // 콜백 함수를 사용한 비동기 처리
    // 1초 후에 메시지를 출력한다.
    setTimeout(function () {
      console.log('1초 경과');
    }, 1000);
    ```
    
- 배열 고차 함수에서도 사용
    
    ```jsx
    // 콜백 함수를 사용하는 고차 함수 map
    var res = [1, 2, 3].map(function (item) {
      return item * 2;
    });
    
    console.log(res); // [2, 4, 6]
    
    // 콜백 함수를 사용하는 고차 함수 filter
    res = [1, 2, 3].filter(function (item) {
      return item % 2;
    });
    
    console.log(res); // [1, 3]
    
    // 콜백 함수를 사용하는 고차 함수 reduce
    res = [1, 2, 3].reduce(function (acc, cur) {
      return acc + cur;
    }, 0);
    
    console.log(res); // 6
    ```
    

## 5. 순수 함수와 비순수 함수

- 순수 함수(Pure Function)
    - 어떤 외부 상태에 의존하지도 않고 변경하지도 않는, 부수 효과가 없는 함수
    - 오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존해 값을 생성해 반환
    - 일반적으로 최소 하나 이상의 인수 전달받음
    - 함수의 외부 상태를 변경하지 않음
    
    ```jsx
    var count = 0; // 현재 카운트를 나타내는 상태
    
    // 순수 함수 increase는 동일한 인수가 전달되면 언제나 동일한 값을 반환한다.
    function increase(n) {
      return ++n;
    }
    
    // 순수 함수가 반환한 결과값을 변수에 재할당해서 상태를 변경
    count = increase(count);
    console.log(count); // 1
    
    count = increase(count);
    console.log(count); // 2
    ```
    
- 비순수 함수(Impure Function)
    - 외부 상태에 의존하거나 외부 상태를 변경하는, 부수 효과가 있는 함수
    - 함수의 외부 상태에 따라 반환값이 달라짐
    
    ```jsx
    var count = 0; // 현재 카운트를 나타내는 상태: increase 함수에 의해 변화한다.
    
    // 비순수 함수
    function increase() {
      return ++count; // 외부 상태에 의존하며 외부 상태를 변경한다.
    }
    
    // 비순수 함수는 외부 상태(count)를 변경하므로 상태 변화를 추적하기 어려워진다.
    increase();
    console.log(count); // 1
    
    increase();
    console.log(count); // 2
    ```
