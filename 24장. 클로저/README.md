# 24장. 클로저

## 0. 들어가기

> 클로저(Closure)는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.
> 
- 함수가 선언된 렉시컬 환경
    
    ```jsx
    const x = 1;
    
    function outerFunc() {
      const x = 10;
    
      function innerFunc() {
        console.log(x); // 10
      }
    
      innerFunc();
    }
    
    outerFunc();
    ```
    
    ```jsx
    const x = 1;
    
    function outerFunc() {
      const x = 10;
      innerFunc();
    }
    
    function innerFunc() {
      console.log(x); // 1
    }
    
    outerFunc();
    ```
    
- 자바스크립트가 렉시컬 스코프를 따르는 프로그래밍 언어임

# 1. 렉시컬 스코프

- 자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 함수를 어디에 정의했는지에 따라 상위 스코프를 결정
    
    ```jsx
    const x = 1;
    
    function foo() {
      const x = 10;
      bar();
    }
    
    function bar() {
      console.log(x);
    }
    
    foo(); // ?
    bar(); // ?
    ```
    
- 스코프 체인 : 외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)
- 렉시컬 환경의 ‘외부 렉시컬 환경에 대한 참조’에 저장할 참조값, 상위 스코프에 대한 참조는 함수 정의가 평가되는 시점에 함수가 정의된 환경에 의해 결정

# 2. 함수 객체의 내부 슬롯 `[[Environment]]`

- 함수는 자신의 내부 슬롯 `[[Environment]]` 에 자신이 정의된 환경 → 상위 스코프의 참조 저장
- 함수 객체의 내부 슬롯 `[[Environment]]` 에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조 → 상위 스코프
- 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 ‘외부 렉시컬 환경에 대한 참조’ → 저장될 참조값
- 함수 객체는 내부 슬롯 `[[Environment]]` 에 저장한 렉시컬 환경의 참조, 상위 스코프를 자신이 존재하는 한 기억함
    
    ```jsx
    const x = 1;
    
    function foo() {
      const x = 10;
    
      // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
      // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
      bar();
    }
    
    // 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 [[Environment]]에 저장하여 기억한다.
    function bar() {
      console.log(x);
    }
    
    foo(); // ?
    bar(); // ?
    ```
    
- 외부 렉시컬 환경에 대한 참조에는 함수 객체의 내부 슬롯 `[[Environment]]` 에 저장된 렉시컬 환경의 참조가 할당

# 3. 클로저와 렉시컬 환경

```jsx
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// outer 함수를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

- 외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있음 → 클로저(Closure) : 중첩 함수
- ‘그 함수가 선언된 렉시컬 환경’ → 함수가 정의된 위치의 스코프, 상위 스코프를 의미하는 실행 컨텍스트의 렉시컬 환경
- outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 제거, outer 함수의 렉시컬 환경까지 소멸하는 것은 아님
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        function foo() {
          const x = 1;
          const y = 2;
    
          // 일반적으로 클로저라고 하지 않는다.
          function bar() {
            const z = 3;
    
            debugger;
            // 상위 스코프의 식별자를 참조하지 않는다.
            console.log(z);
          }
    
          return bar;
        }
    
        const bar = foo();
        bar();
      </script>
    </body>
    </html>
    ```
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        function foo() {
          const x = 1;
    
          // 일반적으로 클로저라고 하지 않는다.
          // bar 함수는 클로저였지만 곧바로 소멸한다.
          function bar() {
            debugger;
            // 상위 스코프의 식별자를 참조한다.
            console.log(x);
          }
          bar();
        }
    
        foo();
      </script>
    </body>
    </html>
    ```
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        function foo() {
          const x = 1;
          const y = 2;
    
          // 클로저
          // 중첩 함수 bar는 외부 함수보다 더 오래 유지되며 상위 스코프의 식별자를 참조한다.
          function bar() {
            debugger;
            console.log(x);
          }
          return bar;
        }
    
        const bar = foo();
        bar();
      </script>
    </body>
    </html>
    ```
    
- 클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적
- 자유 변수(Free Variable) : 클로저에 의해 참조되는 상위 스코프의 변수
    - 함수가 자유 변수에 대해 닫혀있다
    - 자유 변수에 묶여있는 함수

# 4. 클로저의 활용

- 상태를 안전하게 변경하고 유지하기 위해 사용
- 상태를 안전하게 은닉(Information Hiding)하고 특정 함수에게만 상태 변경을 허용
    
    ```jsx
    // 카운트 상태 변수
    let num = 0;
    
    // 카운트 상태 변경 함수
    const increase = function () {
      // 카운트 상태를 1만큼 증가 시킨다.
      return ++num;
    };
    
    console.log(increase()); // 1
    console.log(increase()); // 2
    console.log(increase()); // 3
    ```
    
    ```jsx
    // 카운트 상태 변경 함수
    const increase = function () {
      // 카운트 상태 변수
      let num = 0;
    
      // 카운트 상태를 1만큼 증가 시킨다.
      return ++num;
    };
    
    // 이전 상태를 유지하지 못한다.
    console.log(increase()); // 1
    console.log(increase()); // 1
    console.log(increase()); // 1
    ```
    
    ```jsx
    // 카운트 상태 변경 함수
    const increase = (function () {
      // 카운트 상태 변수
      let num = 0;
    
      // 클로저
      return function () {
        // 카운트 상태를 1만큼 증가 시킨다.
        return ++num;
      };
    }());
    
    console.log(increase()); // 1
    console.log(increase()); // 2
    console.log(increase()); // 3
    ```
    
    ```jsx
    const counter = (function () {
      // 카운트 상태 변수
      let num = 0;
    
      // 클로저인 메서드를 갖는 객체를 반환한다.
      // 객체 리터럴은 스코프를 만들지 않는다.
      // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
      return {
        // num: 0, // 프로퍼티는 public하므로 은닉되지 않는다.
        increase() {
          return ++num;
        },
        decrease() {
          return num > 0 ? --num : 0;
        }
      };
    }());
    
    console.log(counter.increase()); // 1
    console.log(counter.increase()); // 2
    
    console.log(counter.decrease()); // 1
    console.log(counter.decrease()); // 0
    ```
    
    ```jsx
    const Counter = (function () {
      // ① 카운트 상태 변수
      let num = 0;
    
      function Counter() {
        // this.num = 0; // ② 프로퍼티는 public하므로 은닉되지 않는다.
      }
    
      Counter.prototype.increase = function () {
        return ++num;
      };
    
      Counter.prototype.decrease = function () {
        return num > 0 ? --num : 0;
      };
    
      return Counter;
    }());
    
    const counter = new Counter();
    
    console.log(counter.increase()); // 1
    console.log(counter.increase()); // 2
    
    console.log(counter.decrease()); // 1
    console.log(counter.decrease()); // 0
    ```
    
    ```jsx
    // 함수를 인수로 전달받고 함수를 반환하는 고차 함수
    // 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
    function makeCounter(aux) {
      // 카운트 상태를 유지하기 위한 자유 변수
      let counter = 0;
    
      // 클로저를 반환
      return function () {
        // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
        counter = aux(counter);
        return counter;
      };
    }
    
    // 보조 함수
    function increase(n) {
      return ++n;
    }
    
    // 보조 함수
    function decrease(n) {
      return --n;
    }
    
    // 함수로 함수를 생성한다.
    // makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
    const increaser = makeCounter(increase); // ①
    console.log(increaser()); // 1
    console.log(increaser()); // 2
    
    // increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
    const decreaser = makeCounter(decrease); // ②
    console.log(decreaser()); // -1
    console.log(decreaser()); // -2
    ```
    
- 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 가짐
    
    ```jsx
    // 함수를 반환하는 고차 함수
    // 이 함수는 카운트 상태를 유지하기 위한 자유 변수 counter를 기억하는 클로저를 반환한다.
    const counter = (function () {
      // 카운트 상태를 유지하기 위한 자유 변수
      let counter = 0;
    
      // 함수를 인수로 전달받는 클로저를 반환
      return function (aux) {
        // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
        counter = aux(counter);
        return counter;
      };
    }());
    
    // 보조 함수
    function increase(n) {
      return ++n;
    }
    
    // 보조 함수
    function decrease(n) {
      return --n;
    }
    
    // 보조 함수를 전달하여 호출
    console.log(counter(increase)); // 1
    console.log(counter(increase)); // 2
    
    // 자유 변수를 공유한다.
    console.log(counter(decrease)); // 1
    console.log(counter(decrease)); // 0
    ```
    

# 5. 캡슐화와 정보 은닉

- 캡슐화(Encapsulation) : 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것
    - 정보 은닉(Information Hiding) : 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용
        - 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지 → 정보 보호
        - 객체 간의 상호 의존성 → 결합도를 낮춤
    
    ```jsx
    function Person(name, age) {
      this.name = name; // public
      let _age = age;   // private
    
      // 인스턴스 메서드
      this.sayHi = function () {
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
      };
    }
    
    const me = new Person('Lee', 20);
    me.sayHi(); // Hi! My name is Lee. I am 20.
    console.log(me.name); // Lee
    console.log(me._age); // undefined
    
    const you = new Person('Kim', 30);
    you.sayHi(); // Hi! My name is Kim. I am 30.
    console.log(you.name); // Kim
    console.log(you._age); // undefined
    ```
    
    ```jsx
    function Person(name, age) {
      this.name = name; // public
      let _age = age;   // private
    }
    
    // 프로토타입 메서드
    Person.prototype.sayHi = function () {
      // Person 생성자 함수의 지역 변수 _age를 참조할 수 없다
      console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
    };
    ```
    
    ```jsx
    const Person = (function () {
      let _age = 0; // private
    
      // 생성자 함수
      function Person(name, age) {
        this.name = name; // public
        _age = age;
      }
    
      // 프로토타입 메서드
      Person.prototype.sayHi = function () {
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
      };
    
      // 생성자 함수를 반환
      return Person;
    }());
    
    const me = new Person('Lee', 20);
    me.sayHi(); // Hi! My name is Lee. I am 20.
    console.log(me.name); // Lee
    console.log(me._age); // undefined
    
    const you = new Person('Kim', 30);
    you.sayHi(); // Hi! My name is Kim. I am 30.
    console.log(you.name); // Kim
    console.log(you._age); // undefined
    ```
    
    ```jsx
    const me = new Person('Lee', 20);
    me.sayHi(); // Hi! My name is Lee. I am 20.
    
    const you = new Person('Kim', 30);
    you.sayHi(); // Hi! My name is Kim. I am 30.
    
    // _age 변수 값이 변경된다!
    me.sayHi(); // Hi! My name is Lee. I am 30.
    ```
    

# 6. 자주 발생하는 실수

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
  funcs[i] = function () { return i; }; // ①
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]()); // ②
}
```

```jsx
var funcs = [];

for (var i = 0; i < 3; i++){
  funcs[i] = (function (id) { // ①
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < funcs.length; j++) {
  console.log(funcs[j]());
}
```

```jsx
const funcs = [];

for (let i = 0; i < 3; i++) {
  funcs[i] = function () { return i; };
}

for (let i = 0; i < funcs.length; i++) {
  console.log(funcs[i]()); // 0 1 2
}
```

- `let` 이나 `const` 키워드를 사용하는 반복문은 코드 블록을 반복 실행할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 마치 스냅숏을 찍는 것처럼 저장
- 고차 함수를 사용하는 방법
    
    ```jsx
    // 요소가 3개인 배열을 생성하고 배열의 인덱스를 반환하는 함수를 요소로 추가한다.
    // 배열의 요소로 추가된 함수들은 모두 클로저다.
    const funcs = Array.from(new Array(3), (_, i) => () => i); // (3) [ƒ, ƒ, ƒ]
    
    // 배열의 요소로 추가된 함수 들을 순차적으로 호출한다.
    funcs.forEach(f => console.log(f())); // 0 1 2
    ```
