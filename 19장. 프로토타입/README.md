# 19장. 프로토타입

# 1. 객체지향 프로그래밍

- 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임
- 실체 : 특징이나 성질을 나타내는 속성(Attribute/Property)
- 추상화(Abstraction) : 다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것
    
    ```jsx
    // 이름과 주소 속성을 갖는 객체
    const person = {
      name: 'Lee',
      address: 'Seoul'
    };
    
    console.log(person); // {name: "Lee", address: "Seoul"}
    ```
    
- 객체 : 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조
    - 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료구조
        - 상태 데이터 : 프로퍼티
        - 동작 : 메서드
- 데이터 : 객체의 상태를 나타냄
- 동작 : 상태 데이터를 조작
    
    ```jsx
    const circle = {
      radius: 5, // 반지름
    
      // 원의 지름: 2r
      getDiameter() {
        return 2 * this.radius;
      },
    
      // 원의 둘레: 2πr
      getPerimeter() {
        return 2 * Math.PI * this.radius;
      },
    
      // 원의 넓이: πrr
      getArea() {
        return Math.PI * this.radius ** 2;
      }
    };
    
    console.log(circle);
    // {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}
    
    console.log(circle.getDiameter());  // 10
    console.log(circle.getPerimeter()); // 31.41592653589793
    console.log(circle.getArea());      // 78.53981633974483
    ```
    

# 2. 상속과 프로토타입

- 상속(Inheritance) : 어떤 객체의 프로퍼티 또는 메서드를 다른 객체가 상속받아 그대로 사용할 수 있는 것
    
    ```jsx
    // 생성자 함수
    function Circle(radius) {
      this.radius = radius;
      this.getArea = function () {
        // Math.PI는 원주율을 나타내는 상수다.
        return Math.PI * this.radius ** 2;
      };
    }
    
    // 반지름이 1인 인스턴스 생성
    const circle1 = new Circle(1);
    // 반지름이 2인 인스턴스 생성
    const circle2 = new Circle(2);
    
    // Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
    // getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
    // getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
    console.log(circle1.getArea === circle2.getArea); // false
    
    console.log(circle1.getArea()); // 3.141592653589793
    console.log(circle2.getArea()); // 12.566370614359172
    ```
    
- 자바스크립트는 프로토타입 기반으로 상속 구현
    
    ```jsx
    // 생성자 함수
    function Circle(radius) {
      this.radius = radius;
    }
    
    // Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
    // 공유해서 사용할 수 있도록 프로토타입에 추가한다.
    // 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
    Circle.prototype.getArea = function () {
      return Math.PI * this.radius ** 2;
    };
    
    // 인스턴스 생성
    const circle1 = new Circle(1);
    const circle2 = new Circle(2);
    
    // Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
    // 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
    // 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
    console.log(circle1.getArea === circle2.getArea); // true
    
    console.log(circle1.getArea()); // 3.141592653589793
    console.log(circle2.getArea()); // 12.566370614359172
    ```
    

# 3. 프로토타입 객체

- 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용
- 어떤 객체의 상위 객체의 역할을 하는 객체
- 다른 객체에 공유 프로퍼티를 제공

## 1. `__proto__` 접근자 프로퍼티

- 모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, `[[Prototype]]` 내부 슬롯에 간접적으로 접근 가능
    
    ```jsx
    const person = { name: 'Lee' };
    ```
    

### 1. `__proto__` 는 접근자 프로퍼티

- 접근자 프로퍼티를 통해 간접적으로 내부 슬롯의 값, 프로토타입에 접근 가능
- `getter/setter` 함수라고 부르는 접근자 함수(`[[Get]], [[Set]]`) 프로퍼티 어트리뷰트에 할당된 함수)를 통해 `[[Prototype]]` 내부 슬롯의 값, 프로토타입을 취득하거나 할당
    
    ```jsx
    const obj = {};
    const parent = { x: 1 };
    
    // getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
    obj.__proto__;
    // setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
    obj.__proto__ = parent;
    
    console.log(obj.x); // 1
    ```
    

### 2. `__proto__` 접근자 프로퍼티는 상속을 통해 사용

- 모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티 사용 가능
    
    ```jsx
    const person = { name: 'Lee' };
    
    // person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
    console.log(person.hasOwnProperty('__proto__')); // false
    
    // __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
    console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
    // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
    
    // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
    console.log({}.__proto__ === Object.prototype); // true
    ```
    
- `Object.prototype` : 프로토타입 체인의 최상위 객체, 프로퍼티와 메서드는 모든 객체에 상속

### 3. `__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

- 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지
    
    ```jsx
    const parent = {};
    const child = {};
    
    // child의 프로토타입을 parent로 설정
    child.__proto__ = parent;
    // parent의 프로토타입을 child로 설정
    parent.__proto__ = child; // TypeError: Cyclic __proto__ value
    ```
    
- 프로토타입 체인은 단뱡향 링크드 리스트로 구현

### 4. `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않음

- 모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아님
- 직접 상속을 통해 `Object.prototype` 을 상속받지 않는 객체 생성 가능
    
    ```jsx
    // obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
    const obj = Object.create(null);
    
    // obj는 Object.__proto__를 상속받을 수 없다.
    console.log(obj.__proto__); // undefined
    
    // 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
    console.log(Object.getPrototypeOf(obj)); // null
    ```
    
- 프로토타입의 참조 취득 → `Object.getPrototypeOf` 메서드 사용
- 프로토타입 교체 → `Object.setPrototypeOf` 메서드 사용
    
    ```jsx
    const obj = {};
    const parent = { x: 1 };
    
    // obj 객체의 프로토타입을 취득
    Object.getPrototypeOf(obj); // obj.__proto__;
    // obj 객체의 프로토타입을 교체
    Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;
    
    console.log(obj.x); // 1
    ```
    

## 2. 함수 객체의 `prototype` 프로퍼티

- 함수 객체만이 소유하는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킴
    
    ```jsx
    // 함수 객체는 prototype 프로퍼티를 소유한다.
    (function () {}).hasOwnProperty('prototype'); // -> true
    
    // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
    ({}).hasOwnProperty('prototype'); // -> false
    ```
    
    ```jsx
    // 화살표 함수는 non-constructor다.
    const Person = name => {
      this.name = name;
    };
    
    // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
    console.log(Person.hasOwnProperty('prototype')); // false
    
    // non-constructor는 프로토타입을 생성하지 않는다.
    console.log(Person.prototype); // undefined
    
    // ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
    const obj = {
      foo() {}
    };
    
    // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
    console.log(obj.foo.hasOwnProperty('prototype')); // false
    
    // non-constructor는 프로토타입을 생성하지 않는다.
    console.log(obj.foo.prototype); // undefined
    ```
    
- 모든 객체가 가지고 있는(`Object.prototype` 으로부터 상속받은) `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 결국 동일한 프로토타입을 가리킴
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
    console.log(Person.prototype === me.__proto__);  // true
    ```
    

## 3. 프로토타입의 `constructor` 프로퍼티와 생성자 함수

- `prototype` 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // me 객체의 생성자 함수는 Person이다.
    console.log(me.constructor === Person);  // true
    ```
    

# 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

```jsx
// obj 객체를 생성한 생성자 함수는 Object다.
const obj = new Object();
console.log(obj.constructor === Object); // true

// add 함수 객체를 생성한 생성자 함수는 Function이다.
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

// 생성자 함수
function Person(name) {
  this.name = name;
}

// me 객체를 생성한 생성자 함수는 Person이다.
const me = new Person('Lee');
console.log(me.constructor === Person); // true
```

- 명시적으로 `new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 방식도 있음
    
    ```jsx
    // 객체 리터럴
    const obj = {};
    
    // 함수 리터럴
    const add = function (a, b) { return a + b; };
    
    // 배열 리터럴
    const arr = [1, 2, 3];
    
    // 정규표현식 리터럴
    const regexp = /is/ig;
    ```
    
    ```jsx
    // obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
    const obj = {};
    
    // 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
    console.log(obj.constructor === Object); // true
    ```
    
- `Object` 생성자 함수에 인수를 전달하지 않거나 `undefined` 또는 `null` 을 인수로 전달하면서 호출 → 내부적으로는 추상 연산 `OrdinaryObjectCreate` 를 호출하여 `Object.prototype` 을 프로토타입으로 갖는 빈 객체 생성
    
    ```jsx
    // 2. Object 생성자 함수에 의한 객체 생성
    // 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
    let obj = new Object();
    console.log(obj); // {}
    
    // 1. new.target이 undefined나 Object가 아닌 경우
    // 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
    class Foo extends Object {}
    new Foo(); // Foo {}
    
    // 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
    // Number 객체 생성
    obj = new Object(123);
    console.log(obj); // Number {123}
    
    // String  객체 생성
    obj = new Object('123');
    console.log(obj); // String {"123"}
    ```
    
- 객체 리터럴이 평가될 때 → 추상 연산 `OrdinaryObjectCreate` 를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의
    
    ```jsx
    // foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
    function foo() {}
    
    // 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
    console.log(foo.constructor === Function); // true
    ```
    
- 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재
- 프로토타입의 `constructor` 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 가능

# 5. 프로토타입의 생성 시점

- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성

## 1. 사용자 정의 생성자 함수와 프로토타입 생성 시점

- 생성자 함수로서 호출할 수 있는 함수, `constructor` 는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성
    
    ```jsx
    // 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
    console.log(Person.prototype); // {constructor: ƒ}
    
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    ```
    
- 생성자 함수로서 호출할 수 없는 함수, `non-constructor` 는 프로토타입이 생성되지 않음
    
    ```jsx
    // 화살표 함수는 non-constructor다.
    const Person = name => {
      this.name = name;
    };
    
    // non-constructor는 프로토타입이 생성되지 않는다.
    console.log(Person.prototype); // undefined
    ```
    
- 사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성, 생성된 프로토타입의 프로토타입은 언제나 `Object.prototype`

## 2. 빌트인 생성자 함수와 프로토타입 생성 시점

- `Object, String, Number, Function, Array, RegExp, Date, Promise` 등과 같은 빌트인 생성자 함수도 일반 함수와 마찬가지로 빌트인 생성자 함수가 생성되는 시점에 프로토타입 생성
- 전역 객체(Global Object) : 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체
    
    ```jsx
    // 전역 객체 window는 브라우저에 종속적이므로 아래 코드는 브라우저 환경에서 실행해야 한다.
    // 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다.
    window.Object === Object // true
    ```
    
- 생성자 함수 또는 리터럴 표기법으로 객체 생성 → 프로토타입은 생성된 객체의 `[[Prototype]]` 내부 슬롯에 할당

# 6. 객체 생성 방식과 프로토타입의 결정

- 객체 리터럴, `Object` 생성자 함수, 생성자 함수, `Object.create` 메서드, 클래스(ES6)
- 추상 연산 `OrdinaryObjectCreate` 에 의해 생성된다는 공통점
- 프로토타입은 추상 연산 `OrdinaryObjectCreate` 에 전달되는 인수에 의해 결정
- 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정

## 1. 객체 리터럴에 의해 생성된 객체의 프로토타입

- 추상 연산 `OrdinaryObjectCreate` 에 전달되는 프로토타입은 `Object.prototype`
    
    ```jsx
    const obj = { x: 1 };
    ```
    
    ```jsx
    const obj = { x: 1 };
    
    // 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
    console.log(obj.constructor === Object); // true
    console.log(obj.hasOwnProperty('x'));    // true
    ```
    

## 2. `Object` 생성자 함수에 의해 생성된 객체의 프로토타입

- `Object` 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 `OrdinaryObjectCreate` 가 호출
- 추상 연산 `OrdinaryObjectCreate` 에 전달되는 프로토타입 → `Object.prototype`
    
    ```jsx
    const obj = new Object();
    obj.x = 1;
    ```
    
    ```jsx
    const obj = new Object();
    obj.x = 1;
    
    // Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
    console.log(obj.constructor === Object); // true
    console.log(obj.hasOwnProperty('x'));    // true
    ```
    

## 3. 생성자 함수에 의해 생성된 객체의 프로토타입

- `new` 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성 → 추상 연산 `OrdinaryObjectCreate` 호출
- 추상 연산 `OrdinaryObjectCreate` 에 전달되는 프로토타입 → 생성자 함수의 `prototype` 프로퍼티에 바인딩되어 있는 객체
    
    ```jsx
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    ```
    
    ```jsx
    function Person(name) {
      this.name = name;
    }
    
    // 프로토타입 메서드
    Person.prototype.sayHello = function () {
      console.log(`Hi! My name is ${this.name}`);
    };
    
    const me = new Person('Lee');
    const you = new Person('Kim');
    
    me.sayHello();  // Hi! My name is Lee
    you.sayHello(); // Hi! My name is Kim
    ```
    

# 7. 프로토타입 체인

```jsx
function Person(name) {
  this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메서드다.
console.log(me.hasOwnProperty('name')); // true
```

```jsx
Object.getPrototypeOf(me) === Person.prototype; // -> true
```

```jsx
Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
```

- 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `[[Prototype]]` 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색
- 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 메커니즘
    
    ```jsx
    // hasOwnProperty는 Object.prototype의 메서드다.
    // me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색하여 사용한다.
    me.hasOwnProperty('name'); // -> true
    ```
    
    ```jsx
    Object.prototype.hasOwnProperty.call(me, 'name');
    ```
    
    - `call` 메서드 : `this` 로 사용할 객체를 전달하면서 함수 호출
- `Object.prototype` : 프로토타입 체인의 종점(End of Prototype Chain) → `[[Prototype]]` 내부 슬롯의 값은 `null`
- 프로토타입 체인의 종점인 `Object.prototype` 에서도 프로퍼티를 검색할 수 없는 경우 `undefind` 반환
    
    ```jsx
    console.log(me.foo); // undefined
    ```
    
- 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘
- 스코프 체인은 식별자 검색을 위한 메커니즘
    
    ```jsx
    me.hasOwnProperty('name');
    ```
    
- 스코프 체인과 프로토타입 체인은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용

# 8. 오버라이딩과 프로퍼티 섀도잉

```jsx
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');

// 인스턴스 메서드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

- 프로토타입 프로퍼티 : 프로토타입이 소유한 프로퍼티(메서드 포함)
- 인스턴스 프로퍼티 : 인스턴스가 소유한 프로퍼티
- 프로퍼티 섀도잉(Property Shadowing) : 상속 관계에 의해 프로퍼티가 가려지는 현상
    - 오버라이딩 : 상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의하여 사용
    - 오버로딩 : 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메서드를 구현하고 매개변수에 의해 메서드를 구별하여 호출하는 방식
    
    ```jsx
    // 인스턴스 메서드를 삭제한다.
    delete me.sayHello;
    // 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
    me.sayHello(); // Hi! My name is Lee
    ```
    
    ```jsx
    // 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
    delete me.sayHello;
    // 프로토타입 메서드가 호출된다.
    me.sayHello(); // Hi! My name is Lee
    ```
    
- 프로토타입 프로퍼티를 변경 또는 삭제 → 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근
    
    ```jsx
    // 프로토타입 메서드 변경
    Person.prototype.sayHello = function () {
      console.log(`Hey! My name is ${this.name}`);
    };
    me.sayHello(); // Hey! My name is Lee
    
    // 프로토타입 메서드 삭제
    delete Person.prototype.sayHello;
    me.sayHello(); // TypeError: me.sayHello is not a function
    ```
    

# 9. 프로토타입의 교체

- 부모 객체인 프로토타입을 동적으로 변경

## 1. 생성자 함수에 의한 프로토타입의 교체

```jsx
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');
```

```jsx
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

- 프로토타입을 교체하면 `constructor` 프로퍼티와 생성자 함수 간의 연결 파괴
- 프로토타입으로 교체한 객체 리터럴에 `constructor` 프로퍼티를 추가하여 프로토타입의 `constructor` 프로퍼티 되살림
    
    ```jsx
    const Person = (function () {
      function Person(name) {
        this.name = name;
      }
    
      // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
      Person.prototype = {
        // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
        constructor: Person,
        sayHello() {
          console.log(`Hi! My name is ${this.name}`);
        }
      };
    
      return Person;
    }());
    
    const me = new Person('Lee');
    
    // constructor 프로퍼티가 생성자 함수를 가리킨다.
    console.log(me.constructor === Person); // true
    console.log(me.constructor === Object); // false
    ```
    

## 2. 인스턴스에 의한 프로토타입의 교체

- 인스턴스의 `__proto__` 접근자 프로퍼티(또는 `Object.setPrototypeOf` 메서드)를 통해 프로토타입 교체 가능
    
    ```jsx
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // 프로토타입으로 교체할 객체
    const parent = {
      sayHello() {
        console.log(`Hi! My name is ${this.name}`);
      }
    };
    
    // ① me 객체의 프로토타입을 parent 객체로 교체한다.
    Object.setPrototypeOf(me, parent);
    // 위 코드는 아래의 코드와 동일하게 동작한다.
    // me.__proto__ = parent;
    
    me.sayHello(); // Hi! My name is Lee
    ```
    
    ```jsx
    // 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
    console.log(me.constructor === Person); // false
    // 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
    console.log(me.constructor === Object); // true
    ```
    
    ```jsx
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // 프로토타입으로 교체할 객체
    const parent = {
      // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
      constructor: Person,
      sayHello() {
        console.log(`Hi! My name is ${this.name}`);
      }
    };
    
    // 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
    Person.prototype = parent;
    
    // me 객체의 프로토타입을 parent 객체로 교체한다.
    Object.setPrototypeOf(me, parent);
    // 위 코드는 아래의 코드와 동일하게 동작한다.
    // me.__proto__ = parent;
    
    me.sayHello(); // Hi! My name is Lee
    
    // constructor 프로퍼티가 생성자 함수를 가리킨다.
    console.log(me.constructor === Person); // true
    console.log(me.constructor === Object); // false
    
    // 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
    console.log(Person.prototype === Object.getPrototypeOf(me)); // true
    ```
    
- 프로토타입은 직접 교체하지 않는 것이 좋음

# 10. `instanceof` 연산자

- 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받음
    
    ```jsx
    객체 instanceof 생성자 함수
    ```
    
- 우변의 생성자 함수의 `prototype` 에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 `true` 로 평가, 그렇지 않은 경우 `false` 로 평가
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Person); // true
    
    // Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Object); // true
    ```
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // 프로토타입으로 교체할 객체
    const parent = {};
    
    // 프로토타입의 교체
    Object.setPrototypeOf(me, parent);
    
    // Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
    console.log(Person.prototype === parent); // false
    console.log(parent.constructor === Person); // false
    
    // Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않기 때문에 false로 평가된다.
    console.log(me instanceof Person); // false
    
    // Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Object); // true
    ```
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    const me = new Person('Lee');
    
    // 프로토타입으로 교체할 객체
    const parent = {};
    
    // 프로토타입의 교체
    Object.setPrototypeOf(me, parent);
    
    // Person 생성자 함수와 parent 객체는 연결되어 있지 않다.
    console.log(Person.prototype === parent); // false
    console.log(parent.constructor === Person); // false
    
    // parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩한다.
    Person.prototype = parent;
    
    // Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Person); // true
    
    // Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Object); // true
    ```
    
- 생성자 함수의 `prototype` 에 바인딩된 객체가 프로토타입 체인 상에 존재하는지 확인
    
    ```jsx
    function isInstanceof(instance, constructor) {
      // 프로토타입 취득
      const prototype = Object.getPrototypeOf(instance);
    
      // 재귀 탈출 조건
      // prototype이 null이면 프로토타입 체인의 종점에 다다른 것이다.
      if (prototype === null) return false;
    
      // 프로토타입이 생성자 함수의 prototype 프로퍼티에 바인딩된 객체라면 true를 반환한다.
      // 그렇지 않다면 재귀 호출로 프로토타입 체인 상의 상위 프로토타입으로 이동하여 확인한다.
      return prototype === constructor.prototype || isInstanceof(prototype, constructor);
    }
    
    console.log(isInstanceof(me, Person)); // true
    console.log(isInstanceof(me, Object)); // true
    console.log(isInstanceof(me, Array));  // false
    ```
    
- 생성자 함수에 의해 프로토타입이 교체되어 `constructor` 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 생성자 함수의 `prototype` 프로퍼티와 프로토타입 간의 연결을 파괴되지 않으므로 `instanceof` 는 아무런 영향을 받지 않음
    
    ```jsx
    const Person = (function () {
      function Person(name) {
        this.name = name;
      }
    
      // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
      Person.prototype = {
        sayHello() {
          console.log(`Hi! My name is ${this.name}`);
        }
      };
    
      return Person;
    }());
    
    const me = new Person('Lee');
    
    // constructor 프로퍼티와 생성자 함수 간의 연결은 파괴되어도 instanceof는 아무런 영향을 받지 않는다.
    console.log(me.constructor === Person); // false
    
    // Person.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Person); // true
    // Object.prototype이 me 객체의 프로토타입 체인 상에 존재하므로 true로 평가된다.
    console.log(me instanceof Object); // true
    ```
    

# 11. 직접 상속

## 1. `Object.create` 에 의한 직접 상속

- 명시적으로 프로토타입을 지정하여 새로운 객체 생성
- 추상 연산 `OrdinaryObjectCreate` 호출
    
    ```jsx
    /**
     * 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체를 생성하여 반환한다.
     * @param {Object} prototype - 생성할 객체의 프로토타입으로 지정할 객체
     * @param {Object} [propertiesObject] - 생성할 객체의 프로퍼티를 갖는 객체
     * @returns {Object} 지정된 프로토타입 및 프로퍼티를 갖는 새로운 객체
     */
    
    Object.create(prototype[, propertiesObject])
    ```
    
    ```jsx
    // 프로토타입이 null인 객체를 생성한다. 생성된 객체는 프로토타입 체인의 종점에 위치한다.
    // obj → null
    let obj = Object.create(null);
    console.log(Object.getPrototypeOf(obj) === null); // true
    // Object.prototype을 상속받지 못한다.
    console.log(obj.toString()); // TypeError: obj.toString is not a function
    
    // obj → Object.prototype → null
    // obj = {};와 동일하다.
    obj = Object.create(Object.prototype);
    console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
    
    // obj → Object.prototype → null
    // obj = { x: 1 };와 동일하다.
    obj = Object.create(Object.prototype, {
      x: { value: 1, writable: true, enumerable: true, configurable: true }
    });
    // 위 코드는 다음과 동일하다.
    // obj = Object.create(Object.prototype);
    // obj.x = 1;
    console.log(obj.x); // 1
    console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
    
    const myProto = { x: 10 };
    // 임의의 객체를 직접 상속받는다.
    // obj → myProto → Object.prototype → null
    obj = Object.create(myProto);
    console.log(obj.x); // 10
    console.log(Object.getPrototypeOf(obj) === myProto); // true
    
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    // obj → Person.prototype → Object.prototype → null
    // obj = new Person('Lee')와 동일하다.
    obj = Object.create(Person.prototype);
    obj.name = 'Lee';
    console.log(obj.name); // Lee
    console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
    ```
    
- 객체를 생성하면서 직접적으로 상속을 구현
    - `new` 연산자 없이도 객체 생성 가능
    - 프로토타입을 지정하면서 객체 생성 가능
    - 객체 리터럴에 의해 생성된 객체도 상속 가능
    
    ```jsx
    const obj = { a: 1 };
    
    obj.hasOwnProperty('a');       // -> true
    obj.propertyIsEnumerable('a'); // -> true
    ```
    
- 프토토타입 체인의 종점에 위치하는 객체 생성 가능
    
    ```jsx
    // 프로토타입이 null인 객체, 즉 프로토타입 체인의 종점에 위치하는 객체를 생성한다.
    const obj = Object.create(null);
    obj.a = 1;
    
    console.log(Object.getPrototypeOf(obj) === null); // true
    
    // obj는 Object.prototype의 빌트인 메서드를 사용할 수 없다.
    console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function
    ```
    
    ```jsx
    // 프로토타입이 null인 객체를 생성한다.
    const obj = Object.create(null);
    obj.a = 1;
    
    // console.log(obj.hasOwnProperty('a')); // TypeError: obj.hasOwnProperty is not a function
    
    // Object.prototype의 빌트인 메서드는 객체로 직접 호출하지 않는다.
    console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true
    ```
    

## 2. 객체 리터럴 내부에서 `__proto__` 에 의한 직접 상속

```jsx
const myProto = { x: 10 };

// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정하여 직접 상속받을 수 있다.
const obj = {
  y: 20,
  // 객체를 직접 상속받는다.
  // obj → myProto → Object.prototype → null
  __proto__: myProto
};
/* 위 코드는 아래와 동일하다.
const obj = Object.create(myProto, {
  y: { value: 20, writable: true, enumerable: true, configurable: true }
});
*/

console.log(obj.x, obj.y); // 10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true
```

# 12. 정적 프로퍼티 / 메서드

- 생성자 함수로 인스턴스를 생성하지 않아도 참조 / 호출할 수 있는 프로퍼티 / 메서드
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    // 프로토타입 메서드
    Person.prototype.sayHello = function () {
      console.log(`Hi! My name is ${this.name}`);
    };
    
    // 정적 프로퍼티
    Person.staticProp = 'static prop';
    
    // 정적 메서드
    Person.staticMethod = function () {
      console.log('staticMethod');
    };
    
    const me = new Person('Lee');
    
    // 생성자 함수에 추가한 정적 프로퍼티/메서드는 생성자 함수로 참조/호출한다.
    Person.staticMethod(); // staticMethod
    
    // 정적 프로퍼티/메서드는 생성자 함수가 생성한 인스턴스로 참조/호출할 수 없다.
    // 인스턴스로 참조/호출할 수 있는 프로퍼티/메서드는 프로토타입 체인 상에 존재해야 한다.
    me.staticMethod(); // TypeError: me.staticMethod is not a function
    ```
    
- 생성자 함수가 생성한 인스턴스로 참조 / 호출 불가
    
    ```jsx
    // Object.create는 정적 메서드다.
    const obj = Object.create({ name: 'Lee' });
    
    // Object.prototype.hasOwnProperty는 프로토타입 메서드다.
    obj.hasOwnProperty('name'); // -> false
    ```
    
- 인스턴스 / 프로토타입 메서드 내에서 `this` 를 사용하지 않는다면 그 메서드는 정적 메서드로 변경 가능
    
    ```jsx
    function Foo() {}
    
    // 프로토타입 메서드
    // this를 참조하지 않는 프로토타입 메소드는 정적 메서드로 변경해도 동일한 효과를 얻을 수 있다.
    Foo.prototype.x = function () {
      console.log('x');
    };
    
    const foo = new Foo();
    // 프로토타입 메서드를 호출하려면 인스턴스를 생성해야 한다.
    foo.x(); // x
    
    // 정적 메서드
    Foo.x = function () {
      console.log('x');
    };
    
    // 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있다.
    Foo.x(); // x
    ```
    
- 프로토타입 프로퍼티 / 메서드를 표기할 때 `prototype` 을 `#` 으로 표기하는 경우도 있음

# 13. 프로퍼티 존재 확인

## 1. `in` 연산자

- 객체 내에 특정 프로퍼티가 존재하는지 여부 확인
    
    ```jsx
    /**
     * key : 프로퍼티 키를 나타내는 문자열
     * object : 객체로 평가되는 표현식
     */
    key in object
    ```
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul'
    };
    
    // person 객체에 name 프로퍼티가 존재한다.
    console.log('name' in person);    // true
    // person 객체에 address 프로퍼티가 존재한다.
    console.log('address' in person); // true
    // person 객체에 age 프로퍼티가 존재하지 않는다.
    console.log('age' in person);     // false
    ```
    
- 확인 대상 객체의 프로퍼티뿐만 아니라 확인 대상 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인하므로 주의 필요
    
    ```jsx
    console.log('toString' in person); // true
    ```
    
- ES6에서 도입된 `Reflect.has` 메서드 사용 가능
    
    ```jsx
    const person = { name: 'Lee' };
    
    console.log(Reflect.has(person, 'name'));     // true
    console.log(Reflect.has(person, 'toString')); // true
    ```
    

## 2. `Object.prototype.hasOwnProperty` 메서드

- 객체에 특정 프로퍼티가 존재하는지 확인
    
    ```jsx
    console.log(person.hasOwnProperty('name')); // true
    console.log(person.hasOwnProperty('age'));  // false
    ```
    
- 인수로 전달받은 프로퍼티 키가 객체 고유의 프로퍼티 키인 경우에만 `true` 를 반환, 상속받은 프로토타입의 프로퍼티 키인 경우 `false` 반환
    
    ```jsx
    console.log(person.hasOwnProperty('toString')); // false
    ```
    

# 14. 프로퍼티 열거

## 1. `for ... in` 문

- 객체의 모든 프로퍼티를 순회하며 열거
    
    ```jsx
    for (변수선언문 in 객체) { ... }
    ```
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul'
    };
    
    // for...in 문의 변수 key에 person 객체의 프로퍼티 키가 할당된다.
    for (const key in person) {
      console.log(key + ': ' + person[key]);
    }
    // name: Lee
    // address: Seoul
    ```
    
- 순회 대상 객체의 프로퍼티뿐만 아니라 상속받은 프로토타입의 프로퍼티까지 열거
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul'
    };
    
    // in 연산자는 객체가 상속받은 모든 프로토타입의 프로퍼티를 확인한다.
    console.log('toString' in person); // true
    
    // for...in 문도 객체가 상속받은 모든 프로토타입의 프로퍼티를 열거한다.
    // 하지만 toString과 같은 Object.prototype의 프로퍼티가 열거되지 않는다.
    for (const key in person) {
      console.log(key + ': ' + person[key]);
    }
    
    // name: Lee
    // address: Seoul
    ```
    
- 프로퍼티 어트리뷰트 `[[Enumerable]]` 은 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 가짐
    
    ```jsx
    // Object.getOwnPropertyDescriptor 메서드는 프로퍼티 디스크립터 객체를 반환한다.
    // 프로퍼티 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 담고 있는 객체다.
    console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString'));
    // {value: ƒ, writable: true, enumerable: false, configurable: true}
    ```
    
- 객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 값이 `true` 인 프로퍼티를 순회하며 열거
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul',
      __proto__: { age: 20 }
    };
    
    for (const key in person) {
      console.log(key + ': ' + person[key]);
    }
    // name: Lee
    // address: Seoul
    // age: 20
    ```
    
- 프로퍼티 키가 심벌인 프로퍼티는 열거하지 않음
    
    ```jsx
    const sym = Symbol();
    const obj = {
      a: 1,
      [sym]: 10
    };
    
    for (const key in obj) {
      console.log(key + ': ' + obj[key]);
    }
    // a: 1
    ```
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul',
      __proto__: { age: 20 }
    };
    
    for (const key in person) {
      // 객체 자신의 프로퍼티인지 확인한다.
      if (!person.hasOwnProperty(key)) continue;
      console.log(key + ': ' + person[key]);
    }
    // name: Lee
    // address: Seoul
    ```
    
    ```jsx
    const obj = {
      2: 2,
      3: 3,
      1: 1,
      b: 'b',
      a: 'a'
    };
    
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      console.log(key + ': ' + obj[key]);
    }
    
    /*
    1: 1
    2: 2
    3: 3
    b: b
    a: a
    */
    ```
    
    ```jsx
    const arr = [1, 2, 3];
    arr.x = 10; // 배열도 객체이므로 프로퍼티를 가질 수 있다.
    
    for (const i in arr) {
      // 프로퍼티 x도 출력된다.
      console.log(arr[i]); // 1 2 3 10
    };
    
    // arr.length는 3이다.
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]); // 1 2 3
    }
    
    // forEach 메서드는 요소가 아닌 프로퍼티는 제외한다.
    arr.forEach(v => console.log(v)); // 1 2 3
    
    // for...of는 변수 선언문에서 선언한 변수에 키가 아닌 값을 할당한다.
    for (const value of arr) {
      console.log(value); // 1 2 3
    };
    ```
    

## 2. `Object.keys / values / entries` 메서드

- `Object.prototype.hasOwnProperty` 메서드를 사용하여 객체 자신의 프로퍼티인지 확인하는 추가 처리 필요
- 객체 자신의 고유 프로퍼티 열거 → `Object.keys / values / entries` 메서드를 사용 권장
- `Object.keys` : 객체 자신의 열거 가능한 프로퍼티 키를 배열로 반환
    
    ```jsx
    const person = {
      name: 'Lee',
      address: 'Seoul',
      __proto__: { age: 20 }
    };
    
    console.log(Object.keys(person)); // ["name", "address"]
    ```
    
- ES8에서 도입된 `Object.values` : 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환
    
    ```jsx
    console.log(Object.values(person)); // ["Lee", "Seoul"]
    ```
    
- ES8에서 도입된 `Object.entries` : 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환
    
    ```jsx
    console.log(Object.entries(person)); // [["name", "Lee"], ["address", "Seoul"]]
    
    Object.entries(person).forEach(([key, value]) => console.log(key, value));
    /*
    name Lee
    address Seoul
    */
    ```
