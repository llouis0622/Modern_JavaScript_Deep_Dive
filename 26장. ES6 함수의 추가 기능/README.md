# 26장. ES6 함수의 추가 기능

# 1. 함수의 구분

```jsx
var foo = function () {
  return 1;
};

// 일반적인 함수로서 호출
foo(); // -> 1

// 생성자 함수로서 호출
new foo(); // -> foo {}

// 메서드로서 호출
var obj = { foo: foo };
obj.foo(); // -> 1
```

- ES6 이전의 모든 함수 : 일반 함수로서 호출 가능, 생성자 함수로서 호출 가능
- ES6 이전의 모든 함수 → `callable` 이면서 `constructor`
    
    ```jsx
    var foo = function () {};
    
    // ES6 이전의 모든 함수는 callable이면서 constructor다.
    foo(); // -> undefined
    new foo(); // -> foo {}
    ```
    
    - `callable` : 호출할 수 있는 함수 객체
    - `constructor` : 인스턴스를 생성할 수 있는 함수 객체
    - `non-constructor` : 인스턴스를 생성할 수 없는 함수 객체
- ES6 이전 메서드라 부르던 객체에 바인딩된 함수 → `callable` 이면서 `constructor`
    
    ```jsx
    // 프로퍼티 f에 바인딩된 함수는 callable이며 constructor다.
    var obj = {
      x: 10,
      f: function () { return this.x; }
    };
    
    // 프로퍼티 f에 바인딩된 함수를 메서드로서 호출
    console.log(obj.f()); // 10
    
    // 프로퍼티 f에 바인딩된 함수를 일반 함수로서 호출
    var bar = obj.f;
    console.log(bar()); // undefined
    
    // 프로퍼티 f에 바인딩된 함수를 생성자 함수로서 호출
    console.log(new obj.f()); // f {}
    ```
    
    ```jsx
    // 콜백 함수를 사용하는 고차 함수 map. 콜백 함수도 constructor이며 프로토타입을 생성한다.
    [1, 2, 3].map(function (item) {
      return item * 2;
    }); // -> [ 2, 4, 6 ]
    ```
    
- 일반 함수 → `constructor` , ES6의 메서드와 화살표 함수 → `non-constructor`

# 2. 메서드

- ES6 사양에서 메서드 : 메서드 축약 표현으로 정의된 함수만을 의미
    
    ```jsx
    const obj = {
      x: 1,
      // foo는 메서드이다.
      foo() { return this.x; },
      // bar에 바인딩된 함수는 메서드가 아닌 일반 함수이다.
      bar: function() { return this.x; }
    };
    
    console.log(obj.foo()); // 1
    console.log(obj.bar()); // 1
    ```
    
- ES6 사양에서 정의한 메서드 → 인스턴스를 생성할 수 없는 `non-constructor`
    
    ```jsx
    new obj.foo(); // -> TypeError: obj.foo is not a constructor
    new obj.bar(); // -> bar {}
    ```
    
- `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않음
    
    ```jsx
    // obj.foo는 constructor가 아닌 ES6 메서드이므로 prototype 프로퍼티가 없다.
    obj.foo.hasOwnProperty('prototype'); // -> false
    
    // obj.bar는 constructor인 일반 함수이므로 prototype 프로퍼티가 있다.
    obj.bar.hasOwnProperty('prototype'); // -> true
    ```
    
- 표준 빌트인 객체가 제공하는 프로토타입 메서드, 정적 메서드 → `non-constructor`
    
    ```jsx
    String.prototype.toUpperCase.prototype; // -> undefined
    String.fromCharCode.prototype           // -> undefined
    
    Number.prototype.toFixed.prototype; // -> undefined
    Number.isFinite.prototype;          // -> undefined
    
    Array.prototype.map.prototype; // -> undefined
    Array.from.prototype;          // -> undefined
    ```
    
- ES6 메서드 → 자신을 바인딩한 객체를 가리키는 내부 슬롯 `[[HomeObject]]` 가짐
    
    ```jsx
    const base = {
      name: 'Lee',
      sayHi() {
        return `Hi! ${this.name}`;
      }
    };
    
    const derived = {
      __proto__: base,
      // sayHi는 ES6 메서드다. ES6 메서드는 [[HomeObject]]를 갖는다.
      // sayHi의 [[HomeObject]]는 sayHi가 바인딩된 객체인 derived를 가리키고
      // super는 sayHi의 [[HomeObject]]의 프로토타입인 base를 가리킨다.
      sayHi() {
        return `${super.sayHi()}. how are you doing?`;
      }
    };
    
    console.log(derived.sayHi()); // Hi! Lee. how are you doing?
    ```
    
    ```jsx
    const derived = {
      __proto__: base,
      // sayHi는 ES6 메서드가 아니다.
      // 따라서 sayHi는 [[HomeObject]]를 갖지 않으므로 super 키워드를 사용할 수 없다.
      sayHi: function () {
        // SyntaxError: 'super' keyword unexpected here
        return `${super.sayHi()}. how are you doing?`;
      }
    };
    ```
    

# 3. 화살표 함수

## 1. 화살표 함수 정의

### 1. 함수 정의

- 함수 선언문으로 정의할 수 없고 함수 표현식으로 정의
    
    ```jsx
    const multiply = (x, y) => x * y;
    multiply(2, 3); // -> 6
    ```
    

### 2. 매개변수 선언

- 매개변수가 여러 개인 경우 소괄호 `()` 안에 매개변수 선언
    
    ```jsx
    const arrow = (x, y) => { ... };
    ```
    
- 매개변수가 한 개인 경우 소괄호 `()` 생략 가능
    
    ```jsx
    const arrow = x => { ... };
    ```
    
- 매개변수가 없는 경우 소괄호 `()` 생략 불가능
    
    ```jsx
    const arrow = () => { ... };
    ```
    

### 3. 함수 몸체 정의

- 함수 몸체가 하나의 문으로 구성 → 함수 몸체를 감싸는 중괄호 `{}` 생략 가능
- 함수 몸체 내부의 문이 값으로 평가될 수 있는 표현식인 문 → 암묵적으로 반환
    
    ```jsx
    // concise body
    const power = x => x ** 2;
    power(2); // -> 4
    
    // 위 표현은 다음과 동일하다.
    // block body
    const power = x => { return x ** 2; };
    ```
    
    ```jsx
    const arrow = () => const x = 1; // SyntaxError: Unexpected token 'const'
    
    // 위 표현은 다음과 같이 해석된다.
    const arrow = () => { return const x = 1; };
    ```
    
- 함수 몸체가 하나의 문으로 구성, 함수 몸체의 문이 표현식이 아닌 문 → 중괄호 생략 불가능
    
    ```jsx
    const arrow = () => { const x = 1; };
    ```
    
- 객체 리터럴을 반환하는 경우 객체 리터럴을 소괄호 `()` 로 감싸 주어야 함
    
    ```jsx
    const create = (id, content) => ({ id, content });
    create(1, 'JavaScript'); // -> {id: 1, content: "JavaScript"}
    
    // 위 표현은 다음과 동일하다.
    const create = (id, content) => { return { id, content }; };
    ```
    
    ```jsx
    // { id, content }를 함수 몸체 내의 쉼표 연산자문으로 해석한다.
    const create = (id, content) => { id, content };
    create(1, 'JavaScript'); // -> undefined
    ```
    
- 함수 몸체가 여러 개의 문으로 구성 → 함수 몸체를 감싸는 중괄호 `{}` 생략 불가능
- 반환값이 있다면 명시적으로 반환
    
    ```jsx
    const sum = (a, b) => {
      const result = a + b;
      return result;
    };
    ```
    
- 즉시 실행 함수(IIFE)로 사용 가능
    
    ```jsx
    const person = (name => ({
      sayHi() { return `Hi? My name is ${name}.`; }
    }))('Lee');
    
    console.log(person.sayHi()); // Hi? My name is Lee.
    ```
    
- 일급 객체 → `Array.prototype.map, Array.prototype.filter, Array.prototype.reduce` 같은 고차 함수(HOF)에 인수로 전달 가능
    
    ```jsx
    // ES5
    [1, 2, 3].map(function (v) {
      return v * 2;
    });
    
    // ES6
    [1, 2, 3].map(v => v * 2); // -> [ 2, 4, 6 ]
    ```
    
- 콜백 함수로서 정의할 때 유용

## 2. 화살표 함수와 일반 함수의 차이

- 인스턴스를 생성할 수 없는 `non-constructor`
    
    ```jsx
    const Foo = () => {};
    // 화살표 함수는 생성자 함수로서 호출할 수 없다.
    new Foo(); // TypeError: Foo is not a constructor
    ```
    
- `prototype` 프로퍼티가 없고 프로토타입도 생성하지 않음
    
    ```jsx
    const Foo = () => {};
    // 화살표 함수는 prototype 프로퍼티가 없다.
    Foo.hasOwnProperty('prototype'); // -> false
    ```
    
- 중복된 매개변수 이름 선언 불가능
    
    ```jsx
    function normal(a, a) { return a + a; }
    console.log(normal(1, 2)); // 4
    ```
    
    ```jsx
    'use strict';
    
    function normal(a, a) { return a + a; }
    // SyntaxError: Duplicate parameter name not allowed in this context
    ```
    
    ```jsx
    const arrow = (a, a) => a + a;
    // SyntaxError: Duplicate parameter name not allowed in this context
    ```
    
- 함수 자체의 `this, arguments, super, new.target` 바인딩을 갖지 않음 → 스코프 체인을 통해 상위 스코프의 `this, arguments, super, new.target` 참조

## 3. `this`

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    // add 메서드는 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
    // ①
    return arr.map(function (item) {
      return this.prefix + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
    });
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
```

```jsx
...
add(arr) {
  // this를 일단 회피시킨다.
  const that = this;
  return arr.map(function (item) {
    // this 대신 that을 참조한다.
    return that.prefix + ' ' + item;
  });
}
...
```

```jsx
...
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }, this); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}
...
```

```jsx
...
add(arr) {
  return arr.map(function (item) {
    return this.prefix + ' ' + item;
  }.bind(this)); // this에 바인딩된 값이 콜백 함수 내부의 this에 바인딩된다.
}
...
```

```jsx
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  add(arr) {
    return arr.map(item => this.prefix + item);
  }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));
// ['-webkit-transition', '-webkit-user-select']
```

- 함수 자체의 `this` 바인딩을 갖지 않음
- `lexical this` : 화살표 함수 내부에서 `this` 를 참조하면 상위 스코프의 `this` 를 그대로 참조
- 화살표 함수 내부에서 `this` 를 참조하면 일반적인 식별자처럼 스코프 체인을 통해 상위 스코프에서 `this` 탐색
    
    ```jsx
    // 화살표 함수는 상위 스코프의 this를 참조한다.
    () => this.x;
    
    // 익명 함수에 상위 스코프의 this를 주입한다. 위 화살표 함수와 동일하게 동작한다.
    (function () { return this.x; }).bind(this);
    ```
    
- 화살표 함수와 화살표 함수가 중첩되어 있다면 상위 화살표 함수에도 `this` 바인딩이 없으므로 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 `this` 를 참조
    
    ```jsx
    // 중첩 함수 foo의 상위 스코프는 즉시 실행 함수다.
    // 따라서 화살표 함수 foo의 this는 상위 스코프인 즉시 실행 함수의 this를 가리킨다.
    (function () {
      const foo = () => console.log(this);
      foo();
    }).call({ a: 1 }); // { a: 1 }
    
    // bar 함수는 화살표 함수를 반환한다.
    // bar 함수가 반환한 화살표 함수의 상위 스코프는 화살표 함수 bar다.
    // 하지만 화살표 함수는 함수 자체의 this 바인딩을 갖지 않으므로 bar 함수가 반환한
    // 화살표 함수 내부에서 참조하는 this는 화살표 함수가 아닌 즉시 실행 함수의 this를 가리킨다.
    (function () {
      const bar = () => () => console.log(this);
      bar()();
    }).call({ a: 1 }); // { a: 1 }
    ```
    
- 화살표 함수가 전역 함수라면 화살표 함수의 `this` 는 전역 객체를 가리킴
    
    ```jsx
    // 전역 함수 foo의 상위 스코프는 전역이므로 화살표 함수 foo의 this는 전역 객체를 가리킨다.
    const foo = () => console.log(this);
    foo(); // window
    ```
    
- 프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수의 `this` 를 참조
    
    ```jsx
    // increase 프로퍼티에 할당한 화살표 함수의 상위 스코프는 전역이다.
    // 따라서 increase 프로퍼티에 할당한 화살표 함수의 this는 전역 객체를 가리킨다.
    const counter = {
      num: 1,
      increase: () => ++this.num
    };
    
    console.log(counter.increase()); // NaN
    ```
    
- 함수 자체의 `this` 바인딩을 갖지 않기 때문에 `Function.prototype.call, Function.prototype.apply, Function.prototype.bind` 메서드를 사용해도 화살표 함수 내부의 `this` 교체 불가능
    
    ```jsx
    window.x = 1;
    
    const normal = function () { return this.x; };
    const arrow = () => this.x;
    
    console.log(normal.call({ x: 10 })); // 10
    console.log(arrow.call({ x: 10 }));  // 1
    ```
    
    ```jsx
    const add = (a, b) => a + b;
    
    console.log(add.call(null, 1, 2));    // 3
    console.log(add.apply(null, [1, 2])); // 3
    console.log(add.bind(null, 1, 2)());  // 3
    ```
    
- 메서드를 화살표 함수로 정의하는 것은 피해야 함
    
    ```jsx
    // Bad
    const person = {
      name: 'Lee',
      sayHi: () => console.log(`Hi ${this.name}`)
    };
    
    // sayHi 프로퍼티에 할당된 화살표 함수 내부의 this는 상위 스코프인 전역의 this가 가리키는
    // 전역 객체를 가리키므로 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는
    // window.name과 같다. 전역 객체 window에는 빌트인 프로퍼티 name이 존재한다.
    person.sayHi(); // Hi
    ```
    
- 메서드를 정의할 때는 ES6 메서드 축약 표현으로 정의한 ES6 메서드를 사용
    
    ```jsx
    // Good
    const person = {
      name: 'Lee',
      sayHi() {
        console.log(`Hi ${this.name}`);
      }
    };
    
    person.sayHi(); // Hi Lee
    ```
    
- 프로토타입 객체의 프로퍼티에 화살표 함수를 할당하는 경우
    
    ```jsx
    // Bad
    function Person(name) {
      this.name = name;
    }
    
    Person.prototype.sayHi = () => console.log(`Hi ${this.name}`);
    
    const person = new Person('Lee');
    // 이 예제를 브라우저에서 실행하면 this.name은 빈 문자열을 갖는 window.name과 같다.
    person.sayHi(); // Hi
    ```
    
- 프로퍼티를 동적 추가할 때는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당
    
    ```jsx
    // Good
    function Person(name) {
      this.name = name;
    }
    
    Person.prototype.sayHi = function () { console.log(`Hi ${this.name}`); };
    
    const person = new Person('Lee');
    person.sayHi(); // Hi Lee
    ```
    
- 일반 함수가 아닌 ES6 메서드를 동적 추가하고 싶다면 다음과 같이 객체 리터럴을 바인딩하고 프로토타입의 `constructor` 프로퍼티와 생성자 함수 간의 연결 재설정
    
    ```jsx
    function Person(name) {
      this.name = name;
    }
    
    Person.prototype = {
      // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
      constructor: Person,
      sayHi() { console.log(`Hi ${this.name}`); }
    };
    
    const person = new Person('Lee');
    person.sayHi(); // Hi Lee
    ```
    
- 클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수 할당 가능
    
    ```jsx
    // Bad
    class Person {
      // 클래스 필드 정의 제안
      name = 'Lee';
      sayHi = () => console.log(`Hi ${this.name}`);
    }
    
    const person = new Person();
    person.sayHi(); // Hi Lee
    ```
    
    ```jsx
    class Person {
      constructor() {
        this.name = 'Lee';
        // 클래스가 생성한 인스턴스(this)의 sayHi 프로퍼티에 화살표 함수를 할당한다.
        // sayHi 프로퍼티는 인스턴스 프로퍼티이다.
        this.sayHi = () => console.log(`Hi ${this.name}`);
      }
    }
    ```
    
    ```jsx
    // Good
    class Person {
      // 클래스 필드 정의
      name = 'Lee';
    
      sayHi() { console.log(`Hi ${this.name}`); }
    }
    const person = new Person();
    person.sayHi(); // Hi Lee
    ```
    

## 4. `super`

- 함수 자체의 `super` 바인딩을 갖지 않음
- 화살표 함수 내부에서 `super` 를 참조하면 `this` 와 마찬가지로 상위 스코프의 `super` 참조
    
    ```jsx
    class Base {
      constructor(name) {
        this.name = name;
      }
    
      sayHi() {
        return `Hi! ${this.name}`;
      }
    }
    
    class Derived extends Base {
      // 화살표 함수의 super는 상위 스코프인 constructor의 super를 가리킨다.
      sayHi = () => `${super.sayHi()} how are you doing?`;
    }
    
    const derived = new Derived('Lee');
    console.log(derived.sayHi()); // Hi! Lee how are you doing?
    ```
    

## 5. `arguments`

- 함수 자체의 `arguments` 바인딩을 갖지 않음
- 화살표 함수 내부에서 `arguments` 를 참조하면 `this` 와 마찬가지로 상위 스코프의 `arguments` 참조
    
    ```jsx
    (function () {
      // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
      const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
      foo(3, 4);
    }(1, 2));
    
    // 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
    // 하지만 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
    const foo = () => console.log(arguments);
    foo(1, 2); // ReferenceError: arguments is not defined
    ```
    
- 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 `Rest` 파라미터 사용

# 4. `Rest` 파라미터

## 1. 기본 문법

- 매개변수 이름 앞에 세개의 점(`…`)을 붙여서 정의한 매개변수
- 함수에 전달된 인수들의 목록을 배열로 전달받음
    
    ```jsx
    function foo(...rest) {
      // 매개변수 rest는 인수들의 목록을 배열로 전달받는 Rest 파라미터다.
      console.log(rest); // [ 1, 2, 3, 4, 5 ]
    }
    
    foo(1, 2, 3, 4, 5);
    ```
    
- 일반 매개변수와 `Rest` 파라미터는 함께 사용 가능
- 함수에 전달된 인수들은 매개변수와 `Rest` 파리미터에 순차적으로 할당
    
    ```jsx
    function foo(param, ...rest) {
      console.log(param); // 1
      console.log(rest);  // [ 2, 3, 4, 5 ]
    }
    
    foo(1, 2, 3, 4, 5);
    
    function bar(param1, param2, ...rest) {
      console.log(param1); // 1
      console.log(param2); // 2
      console.log(rest);   // [ 3, 4, 5 ]
    }
    
    bar(1, 2, 3, 4, 5);
    ```
    
- `Rest` 파라미터는 이름 그대로 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들로 구성된 배열이 할당 → 반드시 마지막 파라미터
    
    ```jsx
    function foo(...rest, param1, param2) { }
    
    foo(1, 2, 3, 4, 5);
    // SyntaxError: Rest parameter must be last formal parameter
    ```
    
- 단 하나만 선언 가능
    
    ```jsx
    function foo(...rest1, ...rest2) { }
    
    foo(1, 2, 3, 4, 5);
    // SyntaxError: Rest parameter must be last formal parameter
    ```
    
- 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티에 영향을 주지 않음
    
    ```jsx
    function foo(...rest) {}
    console.log(foo.length); // 0
    
    function bar(x, ...rest) {}
    console.log(bar.length); // 1
    
    function baz(x, y, ...rest) {}
    console.log(baz.length); // 2
    ```
    

## 2. `Rest` 파리미터와 `arguments` 객체

- `arguments` 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체, 함수 내부에서 지역 변수처럼 사용 가능
    
    ```jsx
    // 매개변수의 개수를 사전에 알 수 없는 가변 인자 함수
    function sum() {
      // 가변 인자 함수는 arguments 객체를 통해 인수를 전달받는다.
      console.log(arguments);
    }
    
    sum(1, 2); // {length: 2, '0': 1, '1': 2}
    ```
    
- 배열 메서드를 사용하려면 `Function.prototype.call` 이나 `Function.prototype.apply` 메서드를 사용해 `arguments` 객체를 배열로 변환
    
    ```jsx
    function sum() {
      // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
      var array = Array.prototype.slice.call(arguments);
    
      return array.reduce(function (pre, cur) {
        return pre + cur;
      }, 0);
    }
    
    console.log(sum(1, 2, 3, 4, 5)); // 15
    ```
    
- 가변 인자 함수의 인수 목록을 배열로 직접 전달받을 수 있음
    
    ```jsx
    function sum(...args) {
      // Rest 파라미터 args에는 배열 [1, 2, 3, 4, 5]가 할당된다.
      return args.reduce((pre, cur) => pre + cur, 0);
    }
    console.log(sum(1, 2, 3, 4, 5)); // 15
    ```
    

# 5. 매개변수 기본값

- 인수가 전달되지 않은 매개변수의 값은 `undefined`
    
    ```jsx
    function sum(x, y) {
      return x + y;
    }
    
    console.log(sum(1)); // NaN
    ```
    
- 매개변수에 인수가 전달되었는지 확인하여 인수가 전달되지 않은 경우 매개변수에 기본값을 할당할 필요가 있음 → 방어 코드 필요
    
    ```jsx
    function sum(x, y) {
      // 인수가 전달되지 않아 매개변수의 값이 undefined인 경우 기본값을 할당한다.
      x = x || 0;
      y = y || 0;
    
      return x + y;
    }
    
    console.log(sum(1, 2)); // 3
    console.log(sum(1));    // 1
    ```
    
- ES6에서 도입된 매개변수 기본값을 사용하면 함수 내에서 수행하던 인수 체크 및 초기화 간소화
    
    ```jsx
    function sum(x = 0, y = 0) {
      return x + y;
    }
    
    console.log(sum(1, 2)); // 3
    console.log(sum(1));    // 1
    ```
    
- 매개변수 기본값 → 매개변수에 인수를 전달하지 않은 경우, `undefined` 를 전달한 경우에 유효
    
    ```jsx
    function logName(name = 'Lee') {
      console.log(name);
    }
    
    logName();          // Lee
    logName(undefined); // Lee
    logName(null);      // null
    ```
    
- `Rest` 파라미터에는 기본값을 지정할 수 없음
    
    ```jsx
    function foo(...rest = []) {
      console.log(rest);
    }
    // SyntaxError: Rest parameter may not have a default initializer
    ```
    
- 매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 `length` 프로퍼티와 `arguments` 객체에 아무런 영향을 주지 않음
    
    ```jsx
    function sum(x, y = 0) {
      console.log(arguments);
    }
    
    console.log(sum.length); // 1
    
    sum(1);    // Arguments { '0': 1 }
    sum(1, 2); // Arguments { '0': 1, '1': 2 }
    ```
