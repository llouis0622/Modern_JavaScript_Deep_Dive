# 13장. 스코프

# 1. 스코프(Scope)란?

- 유효범위
- `var` 키워드로 선언한 변수와 `let` 또는 `const` 키워드로 선언한 변수의 스코프도 다르게 동작
    
    ```jsx
    function add(x, y) {
      // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
      // 즉, 매개변수의 스코프(유효범위)는 함수 몸체 내부다.
      console.log(x, y); // 2 5
      return x + y;
    }
    
    add(2, 5);
    
    // 매개변수는 함수 몸체 내부에서만 참조할 수 있다.
    console.log(x, y); // ReferenceError: x is not defined
    ```
    
    ```jsx
    var var1 = 1; // 코드의 가장 바깥 영역에서 선언한 변수
    
    if (true) {
      var var2 = 2; // 코드 블록 내에서 선언한 변수
      if (true) {
        var var3 = 3; // 중첩된 코드 블록 내에서 선언한 변수
      }
    }
    
    function foo() {
      var var4 = 4; // 함수 내에서 선언한 변수
    
      function bar() {
        var var5 = 5; // 중첩된 함수 내에서 선언한 변수
      }
    }
    
    console.log(var1); // 1
    console.log(var2); // 2
    console.log(var3); // 3
    console.log(var4); // ReferenceError: var4 is not defined
    console.log(var5); // ReferenceError: var5 is not defined
    ```
    
- 모든 식별자(변수 이름, 함수 이름, 클래스 이름 등)는 자신이 선언한 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정
- 식별자가 유요한 범위
    
    ```jsx
    var x = 'global';
    
    function foo() {
      var x = 'local';
      console.log(x); // ①
    }
    
    foo();
    
    console.log(x); // ②
    ```
    
- 식별자 결정(Identifier Resolution) : 이름이 같은 두 개의 변수 중에서 어떤 변수를 참조해야 할 것인지를 결정
- 식별자를 검색할 때 사용하는 규칙
- 하나의 값은 유일한 식별자에 연결
- 네임스페이스
- `var` 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언 가능
    
    ```jsx
    function foo() {
      var x = 1;
      // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
      // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
      var x = 2;
      console.log(x); // 2
    }
    foo();
    ```
    
- `let` 이나 `const` 키워드로 선언한 변수는 같은 스코프 내에서 중복 선언 불가능
    
    ```jsx
    function bar() {
      let x = 1;
      // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
      let x = 2; // SyntaxError: Identifier 'x' has already been declared
    }
    bar();
    ```
    

# 2. 스코프의 종류

- 변수는 자신이 선언된 위치(전역 또는 지역)에 의해 자신이 유효한 범위인 스코프가 결정

## 1. 전역과 전역 스코프

- 코드의 가장 바깥 영역
- 전역 변수는 어디서든지 참조 가능

## 2. 지역과 지역 스코프

- 함수 몸체 내부
- 지역 변수는 자신의 지역 스코프와 하위 지역 스코프에서 유효

# 3. 스코프 체인(Scope Chain)

- 함수의 중첩 : 함수 몸체 내부에서 함수가 정의된 것
- 스코프가 함수의 중첩에 의해 계층적 구조를 가짐
- 스코프가 계층적으로 연결된 것
- 변수를 참조할 때 자바스크립트 엔진은 스코프 체인을 통해 변수를 참조하는 코드의 스코프에서 시작하여 상위 스코프 방향으로 이동하며 선언된 변수를 검색(Identifier Resolution)

## 1. 스코프 체인에 의한 변수 검색

- 상위 스코프에서 유효한 변수는 하위 스코프에서 자유롭게 참조할 수 있지만 하위 스코프에서 유효한 변수를 상위 스코프에서 참조할 수 없음
- 부자 관계로 이루어진 상속(Inheritance)과 유사

## 2. 스코프 체인에 의한 함수 검색

```jsx
// 전역 함수
function foo() {
  console.log('global function foo');
}

function bar() {
  // 중첩 함수
  function foo() {
    console.log('local function foo');
  }

  foo(); // ①
}

bar();
```

- 변수를 검색할 때 사용하는 규칙 → 식별자를 검색하는 규칙

# 4. 함수 레벨 스코프

- 코드 블록이 아닌 함수에 의해서만 지역 스코프가 생성됨
- 블록 레벨 스코프(Block Level Scope) : 함수 몸체만이 아니라 모든 코드 블록(`if, for, while, try/catch` 등)이 지역 스코프 생성
- 함수 레벨 스코프(Function Level Scope) : `var` 키워드로 선언된 변수는 오로지 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정
    
    ```jsx
    var x = 1;
    
    if (true) {
      // var 키워드로 선언된 변수는 함수의 코드 블록(함수 몸체)만을 지역 스코프로 인정한다.
      // 함수 밖에서 var 키워드로 선언된 변수는 코드 블록 내에서 선언되었다 할지라도 모두 전역 변수다.
      // 따라서 x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
      // 이는 의도치 않게 변수 값이 변경되는 부작용을 발생시킨다.
      var x = 10;
    }
    
    console.log(x); // 10
    ```
    
    ```jsx
    var i = 10;
    
    // for 문에서 선언한 i는 전역 변수다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
    for (var i = 0; i < 5; i++) {
      console.log(i); // 0 1 2 3 4
    }
    
    // 의도치 않게 변수의 값이 변경되었다.
    console.log(i); // 5
    ```
    

# 5. 렉시컬 스코프(Lexical Scope)

```jsx
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ?
bar(); // ?
```

- 동적 스코프(Dynamic Scope)
    - 함수를 어디서 호출했는지에 따라 함수의 상위 스코프 결정
    - 함수가 호출되는 시점에 동적으로 상위 스코프 결정
- 렉시컬 스코프, 정적 스코프(Static Scope)
    - 함수를 어디서 정의했는지에 따라 함수의 상위 스코프 결정
    - 상위 스코프가 동적으로 변하지 않고 함수 정의가 평가되는 시점에 상위 스코프가 정적으로 결정
- 자바스크립트 → 함수를 어디서 호출했는지가 아니라 함수를 어디서 정의했는지에 따라 상위 스코프 결정
- 함수의 상위 스코프는 언제나 자신이 정의한 스코프
- 함수의 상위 스코프는 함수 정의가 실행될 때 정적으로 결정
- 함수 정의(함수 선언문 또는 함수 표현식)가 실행되어 생성된 함수 객체는 결정된 상위 스코프를 기억 → 함수가 호출될 때마다 함수의 상위 스코프 참조
