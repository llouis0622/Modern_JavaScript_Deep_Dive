# 15장. let, const 키워드와 블록 레벨 스코프

# 1. `var` 키워드로 선언한 변수의 문제점

## 1. 변수 중복 선언 허용

- `var` 키워드로 선언한 변수는 중복 선언 가능
    
    ```jsx
    var x = 1;
    var y = 1;
    
    // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var x = 100;
    // 초기화문이 없는 변수 선언문은 무시된다.
    var y;
    
    console.log(x); // 100
    console.log(y); // 1
    ```
    

## 2. 함수 레벨 스코프

- `var` 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정
- 함수 외부에서 선언 → 코드 블록 내에서 선언해도 모두 전역 변수
    
    ```jsx
    var x = 1;
    
    if (true) {
      // x는 전역 변수다. 이미 선언된 전역 변수 x가 있으므로 x 변수는 중복 선언된다.
      // 이는 의도치 않게 변수값이 변경되는 부작용을 발생시킨다.
      var x = 10;
    }
    
    console.log(x); // 10
    ```
    
- `for` 문의 변수 선언문에서 `var` 키워드로 선언한 변수도 전역 변수
    
    ```jsx
    var i = 10;
    
    // for문에서 선언한 i는 전역 변수이다. 이미 선언된 전역 변수 i가 있으므로 중복 선언된다.
    for (var i = 0; i < 5; i++) {
      console.log(i); // 0 1 2 3 4
    }
    
    // 의도치 않게 i 변수의 값이 변경되었다.
    console.log(i); // 5
    ```
    

## 3. 변수 호이스팅

- `var` 키워드로 변수 선언 → 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작
    
    ```jsx
    // 이 시점에는 변수 호이스팅에 의해 이미 foo 변수가 선언되었다(1. 선언 단계)
    // 변수 foo는 undefined로 초기화된다. (2. 초기화 단계)
    console.log(foo); // undefined
    
    // 변수에 값을 할당(3. 할당 단계)
    foo = 123;
    
    console.log(foo); // 123
    
    // 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행된다.
    var foo;
    ```
    

# 2. `let` 키워드

## 1. 변수 중복 선언 금지

- 이름이 같은 변수를 중복 선언 → 문법 에러(SyntaxError) 발생
    
    ```jsx
    var foo = 123;
    // var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
    // 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
    var foo = 456;
    
    let bar = 123;
    // let이나 const 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않는다.
    let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
    ```
    

## 2. 블록 레벨 스코프(Block-Level Scope)

- 모든 코드 블록(`함수, if 문, for 문, while 문, try/catch 문` 등)을 지역 스코프로 인정
    
    ```jsx
    let foo = 1; // 전역 변수
    
    {
      let foo = 2; // 지역 변수
      let bar = 3; // 지역 변수
    }
    
    console.log(foo); // 1
    console.log(bar); // ReferenceError: bar is not defined
    ```
    

## 3. 변수 호이스팅

- `let` 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작
    
    ```jsx
    console.log(foo); // ReferenceError: foo is not defined
    let foo;
    ```
    
- `let` 키워드로 선언한 변수를 변수 선언문 이전에 참조 → 참조 에러(ReferenceError) 발생
    
    ```jsx
    // var 키워드로 선언한 변수는 런타임 이전에 선언 단계와 초기화 단계가 실행된다.
    // 따라서 변수 선언문 이전에 변수를 참조할 수 있다.
    console.log(foo); // undefined
    
    var foo;
    console.log(foo); // undefined
    
    foo = 1; // 할당문에서 할당 단계가 실행된다.
    console.log(foo); // 1
    ```
    
- `let` 키워드로 선언한 변수 → 선언 단계 및 초기화 단계 분리 진행
    - 선언 단계 : 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행
    - 초기화 단계 : 변수 선언문에 도달했을 때 실행
- 일시적 사각지대(Temporal Dead Zone, TDZ) : 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간
    
    ```jsx
    // 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
    // 초기화 이전의 일시적 사각 지대에서는 변수를 참조할 수 없다.
    console.log(foo); // ReferenceError: foo is not defined
    
    let foo; // 변수 선언문에서 초기화 단계가 실행된다.
    console.log(foo); // undefined
    
    foo = 1; // 할당문에서 할당 단계가 실행된다.
    console.log(foo); // 1
    ```
    
    ```jsx
    let foo = 1; // 전역 변수
    
    {
      console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
      let foo = 2; // 지역 변수
    }
    ```
    
- `let` 키워드로 선언한 변수 호이스팅 발생 → 참조 에러 발생
- `let, const` 를 포함해서 모든 선언(`var, let, const, function, function*, class` 등)을 호이스팅
- `let, const, class` 를 사용한 선언문 → 호이스팅이 발생하지 않는 것처럼 동작

## 4. 전역 객체와 `let`

```jsx
// 이 예제는 브라우저 환경에서 실행해야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티다.
console.log(window.x); // 1
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체 window의 프로퍼티다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체 window의 프로퍼티다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체 window의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

- `let` 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아님
    
    ```jsx
    // 이 예제는 브라우저 환경에서 실행해야 한다.
    let x = 1;
    
    // let, const 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.
    console.log(window.x); // undefined
    console.log(x); // 1
    ```
    

# 3. `const` 키워드

- 상수 선언

## 1. 선언과 초기화

- `const` 키워드로 선언한 변수 → 반드시 선언과 동시에 초기화
    
    ```jsx
    const foo = 1;
    ```
    
    ```jsx
    const foo; // SyntaxError: Missing initializer in const declaration
    ```
    
- 블록 레벨 스코프 가짐, 변수 호이스팅이 발생하지 않는 것처럼 동작
    
    ```jsx
    {
      // 변수 호이스팅이 발생하지 않는 것처럼 동작한다
      console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
      const foo = 1;
      console.log(foo); // 1
    }
    
    // 블록 레벨 스코프를 갖는다.
    console.log(foo); // ReferenceError: foo is not defined
    ```
    

## 2. 재할당 금지

- `const` 키워드로 선언한 변수 → 재할당 금지
    
    ```jsx
    const foo = 1;
    foo = 2; // TypeError: Assignment to constant variable.
    ```
    

## 3. 상수

- 재할당이 금지된 변수
    
    ```jsx
    // 세전 가격
    let preTaxPrice = 100;
    
    // 세후 가격
    // 0.1의 의미를 명확히 알기 어렵기 때문에 가독성이 좋지 않다.
    let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);
    
    console.log(afterTaxPrice); // 110
    ```
    
- `const` 키워드로 선언된 변수에 원시 값을 할당한 경우 원시 값은 변경할 수 없는 값이고 `const` 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없음
    
    ```jsx
    // 세율을 의미하는 0.1은 변경할 수 없는 상수로서 사용될 값이다.
    // 변수 이름을 대문자로 선언해 상수임을 명확히 나타낸다.
    const TAX_RATE = 0.1;
    
    // 세전 가격
    let preTaxPrice = 100;
    
    // 세후 가격
    let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);
    
    console.log(afterTaxPrice); // 110
    ```
    

## 4. `const` 키워드와 객체

- 변수에 객체를 할당한 경우 값 변경 가능
    
    ```jsx
    const person = {
      name: 'Lee'
    };
    
    // 객체는 변경 가능한 값이다. 따라서 재할당없이 변경이 가능하다.
    person.name = 'Kim';
    
    console.log(person); // {name: "Kim"}
    ```
    
- `const` 키워드는 재할당을 금지 → 불변의 의미 아님

# 4. `var` vs `let` vs `const`

- ES6 사용 시 `var` 키워드 사용 X
- 재할당이 필요한 경우 → `let` 키워드 사용, 변수의 스코프는 최대한 좁게 제작
- 변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체 → `const` 키워드 사용, 재할당 금지로 인한 안전함 보장
