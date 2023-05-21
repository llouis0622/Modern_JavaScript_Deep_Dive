# 25장. 클래스

# 1. 클래스는 프로토타입의 문법적 설탕인가?

```jsx
// ES5 생성자 함수
var Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메서드
  Person.prototype.sayHi = function () {
    console.log('Hi! My name is ' + this.name);
  };

  // 생성자 함수 반환
  return Person;
}());

// 인스턴스 생성
var me = new Person('Lee');
me.sayHi(); // Hi! My name is Lee
```

- 클래스는 함수이며 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 문법적 설탕
- 클래스는 생성자 함수보다 엄격, 생성자 함수에서는 제공하지 않는 기능도 제공
    - `new` 연산자 없이 호출 시 에러 발생
    - 상속을 지원하는 `extends` 와 `super` 키워드 제공
    - 호이스팅이 발생하지 않는 것처럼 동작
    - 모든 코드에는 암묵적으로 strict mode가 지정되어 실행, strict mode 해제 불가능
    - `constructor` , 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 값이 `false` → 열거되지 않음
- 새로운 객체 생성 메커니즘

# 2. 클래스 정의

- `class` 키워드를 사용하여 정의
- 파스칼 케이스 사용
    
    ```jsx
    // 클래스 선언문
    class Person {}
    ```
    
- 표현식으로 클래스 정의 가능
    
    ```jsx
    // 익명 클래스 표현식
    const Person = class {};
    
    // 기명 클래스 표현식
    const Person = class MyClass {};
    ```
    
- 클래스가 값으로 사용할 수 있는 일급 객체
    - 무명의 리터럴로 생성 가능 → 런타임에 생성 가능
    - 변수나 자료구조에 저장 가능
    - 함수의 매개변수에게 전달 가능
    - 함수의 반환값으로 사용 가능
- 0개 이상의 메서드만 정의 → `constructor` , 프로토타입 메서드, 정적 메서드
    
    ```jsx
    // 클래스 선언문
    class Person {
      // 생성자
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name; // name 프로퍼티는 public하다.
      }
    
      // 프로토타입 메서드
      sayHi() {
        console.log(`Hi! My name is ${this.name}`);
      }
    
      // 정적 메서드
      static sayHello() {
        console.log('Hello!');
      }
    }
    
    // 인스턴스 생성
    const me = new Person('Lee');
    
    // 인스턴스의 프로퍼티 참조
    console.log(me.name); // Lee
    // 프로토타입 메서드 호출
    me.sayHi(); // Hi! My name is Lee
    // 정적 메서드 호출
    Person.sayHello(); // Hello!
    ```
    

# 3. 클래스 호이스팅

- 함수로 평가 가능
    
    ```jsx
    // 클래스 선언문
    class Person {}
    
    console.log(typeof Person); // function
    ```
    
- 런타임 이전에 먼저 평가되어 함수 객체를 생성 → `constructor`
- 클래스 정의 이전에 참조할 수 없음
    
    ```jsx
    console.log(Person);
    // ReferenceError: Cannot access 'Person' before initialization
    
    // 클래스 선언문
    class Person {}
    ```
    
- 호이스팅이 발생하지 않는 것처럼 보이나 그렇지 않음
    
    ```jsx
    const Person = '';
    
    {
      // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
      console.log(Person);
      // ReferenceError: Cannot access 'Person' before initialization
    
      // 클래스 선언문
      class Person {}
    }
    ```
    
- 클래스 선언문 이전에 일시적 사각지대에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작

# 4. 인스턴스 생성

- 생성자 함수이며 `new` 연산자와 함께 호출되어 인스턴스 생성
    
    ```jsx
    class Person {}
    
    // 인스턴스 생성
    const me = new Person();
    console.log(me); // Person {}
    ```
    
    ```jsx
    class Person {}
    
    // 클래스를 new 연산자 없이 호출하면 타입 에러가 발생한다.
    const me = Person();
    // TypeError: Class constructor Person cannot be invoked without 'new'
    ```
    
- 기명 클래스 표현식의 클래스 이름을 사용해 인스턴스를 생성하면 에러가 발생
    
    ```jsx
    const Person = class MyClass {};
    
    // 함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 한다.
    const me = new Person();
    
    // 클래스 이름 MyClass는 함수와 동일하게 클래스 몸체 내부에서만 유효한 식별자다.
    console.log(MyClass); // ReferenceError: MyClass is not defined
    
    const you = new MyClass(); // ReferenceError: MyClass is not defined
    ```
    

# 5. 메서드

- 0개 이상의 메서드만 선언 가능 → `constructor` , 프로토타입 메서드, 정적 메서드

## 1. `constructor`

- 인스턴스를 생성하고 초기화하기 위한 특수한 메서드
- 이름을 변경할 수 없음
    
    ```jsx
    class Person {
      // 생성자
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
      }
    }
    ```
    
    ```jsx
    // 클래스는 함수다.
    console.log(typeof Person); // function
    console.dir(Person);
    ```
    
    ```jsx
    // 인스턴스 생성
    const me = new Person('Lee');
    console.log(me);
    ```
    
- `constructor` 내부에서 `this` 에 추가한 프로퍼티는 인스턴스 프로퍼티가 됨
    
    ```jsx
    // 클래스
    class Person {
      // 생성자
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
      }
    }
    
    // 생성자 함수
    function Person(name) {
      // 인스턴스 생성 및 초기화
      this.name = name;
    }
    ```
    
- 클래스 정의가 평가되면 `constructor` 의 기술된 동작을 하는 함수 객체가 생성
- 클래스 내에 최대 한 개만 존재 가능
    
    ```jsx
    class Person {
      constructor() {}
      constructor() {}
    }
    // SyntaxError: A class may only have one constructor
    ```
    
- 생략 가능
    
    ```jsx
    class Person {}
    ```
    
- 생략 → 빈 `constructor` 가 암묵적으로 정의
    
    ```jsx
    class Person {
      // constructor를 생략하면 다음과 같이 빈 constructor가 암묵적으로 정의된다.
      constructor() {}
    }
    
    // 빈 객체가 생성된다.
    const me = new Person();
    console.log(me); // Person {}
    ```
    
- 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 `constructor` 내부에서 `this` 에 인스턴스 프로퍼티를 추가
    
    ```jsx
    class Person {
      constructor() {
        // 고정값으로 인스턴스 초기화
        this.name = 'Lee';
        this.address = 'Seoul';
      }
    }
    
    // 인스턴스 프로퍼티가 추가된다.
    const me = new Person();
    console.log(me); // Person {name: "Lee", address: "Seoul"}
    ```
    
- 인스턴스를 생성할 때 클래스 외부에서 인스턴스 프로퍼티의 초기값을 전달하려면 다음과 같이 `constructor` 에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달
    
    ```jsx
    class Person {
      constructor(name, address) {
        // 인수로 인스턴스 초기화
        this.name = name;
        this.address = address;
      }
    }
    
    // 인수로 초기값을 전달한다. 초기값은 constructor에 전달된다.
    const me = new Person('Lee', 'Seoul');
    console.log(me); // Person {name: "Lee", address: "Seoul"}
    ```
    
- 별도의 반환문을 갖지 않아야 함
    
    ```jsx
    class Person {
      constructor(name) {
        this.name = name;
    
        // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
        return {};
      }
    }
    
    // constructor에서 명시적으로 반환한 빈 객체가 반환된다.
    const me = new Person('Lee');
    console.log(me); // {}
    ```
    
- 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 `this` 가 반환
    
    ```jsx
    class Person {
      constructor(name) {
        this.name = name;
    
        // 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
        return 100;
      }
    }
    
    const me = new Person('Lee');
    console.log(me); // Person { name: "Lee" }
    ```
    
- `constructor` 내부에서 `return` 문을 반드시 생략

## 2. 프로토타입 메서드

- 명시적으로 프로토타입에 메서드를 추가
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    // 프로토타입 메서드
    Person.prototype.sayHi = function () {
      console.log(`Hi! My name is ${this.name}`);
    };
    
    const me = new Person('Lee');
    me.sayHi(); // Hi! My name is Lee
    ```
    
- 클래스 몸체에서 정의한 메서드는 생성자 함수에 의한 객체 생성 방식과는 다르게 클래스의 `prototype` 프로퍼티에 메서드를 추가하지 않아도 기본적으로 프로토타입 메서드가 됨
    
    ```jsx
    class Person {
      // 생성자
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
      }
    
      // 프로토타입 메서드
      sayHi() {
        console.log(`Hi! My name is ${this.name}`);
      }
    }
    
    const me = new Person('Lee');
    me.sayHi(); // Hi! My name is Lee
    ```
    
- 클래스가 생성한 인스턴스는 프로토타입 체인의 일원
    
    ```jsx
    // me 객체의 프로토타입은 Person.prototype이다.
    Object.getPrototypeOf(me) === Person.prototype; // -> true
    me instanceof Person; // -> true
    
    // Person.prototype의 프로토타입은 Object.prototype이다.
    Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true
    me instanceof Object; // -> true
    
    // me 객체의 constructor는 Person 클래스다.
    me.constructor === Person; // -> true
    ```
    
- 클래스 몸체에서 정의한 메서드는 인스턴스의 프로토타입에 존재하는 프로토타입 메서드가 됨

## 3. 정적 메서드

- 인스턴스를 생성하지 않아도 호출할 수 있는 메서드
- 명시적으로 생성자 함수에 메서드를 추가
    
    ```jsx
    // 생성자 함수
    function Person(name) {
      this.name = name;
    }
    
    // 정적 메서드
    Person.sayHi = function () {
      console.log('Hi!');
    };
    
    // 정적 메서드 호출
    Person.sayHi(); // Hi!
    ```
    
- 클래스에서는 메서드에 `static` 키워드를 붙여 정적 메서드로 정의
    
    ```jsx
    class Person {
      // 생성자
      constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
      }
    
      // 정적 메서드
      static sayHi() {
        console.log('Hi!');
      }
    }
    ```
    
- 인스턴스로 호출하지 않고 클래스로 호출
    
    ```jsx
    // 정적 메서드는 클래스로 호출한다.
    // 정적 메서드는 인스턴스 없이도 호출할 수 있다.
    Person.sayHi(); // Hi!
    ```
    
- 인스턴스로 호출 불가 → 인스턴스의 프로토타입 체인 상에는 클래스가 존재하지 않음, 인스턴스로 클래스의 메서드를 상속 불가
    
    ```jsx
    // 인스턴스 생성
    const me = new Person('Lee');
    me.sayHi(); // TypeError: me.sayHi is not a function
    ```
    

## 4. 정적 메서드와 프로토타입 메서드의 차이

- 자신이 속해 있는 프로토타입 체인이 다름
- 정적 메서드 : 클래스로 호출, 프로토타입 메서드 : 인스턴스로 호출
- 정적 메서드 : 인스턴스 프로퍼티 참조 불가, 프로토타입 메서드 : 인스턴스 프로퍼티 참조 가능
    
    ```jsx
    class Square {
      // 정적 메서드
      static area(width, height) {
        return width * height;
      }
    }
    
    console.log(Square.area(10, 10)); // 100
    ```
    
    ```jsx
    class Square {
      constructor(width, height) {
        this.width = width;
        this.height = height;
      }
    
      // 프로토타입 메서드
      area() {
        return this.width * this.height;
      }
    }
    
    const square = new Square(10, 10);
    console.log(square.area()); // 100
    ```
    
    ```jsx
    // 표준 빌트인 객체의 정적 메서드
    Math.max(1, 2, 3);          // -> 3
    Number.isNaN(NaN);          // -> true
    JSON.stringify({ a: 1 });   // -> "{"a":1}"
    Object.is({}, {});          // -> false
    Reflect.has({ a: 1 }, 'a'); // -> true
    ```
    
- 클래스 또는 생성자 함수를 하나의 네임스페이스로 사용하여 정적 메서드를 모아 놓으면 이름 충돌 가능성을 줄여 주고 관련 함수들을 구조화할 수 있는 효과

## 5. 클래스에서 정의한 메서드의 특징

- `function` 키워드를 생략한 메서드 축약 표현 사용
- 클래스에 메서드를 정의할 때는 콤마가 필요 없음
- 암묵적으로 strict mode로 실행
- `for ... in` 문이나 `Object.keys` 메서드 등으로 열거 불가능 → 프로퍼티 어트리뷰트 `[[Enumerable]]` 의 값이 `false`
- non-constructor → `new` 연산자와 함께 호출 불가능

# 6. 클래스의 인스턴스 생성 과정

## 1. 인스턴스 생성과 `this` 바인딩

- `new` 연산자와 함께 클래스를 호출하면 `constructor` 의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체 생성
- `constructor` 내부의 `this` 는 클래스가 생성한 인스턴스를 가리킴

## 2. 인스턴스 초기화

- `constructor` 의 내부 코드가 실행되어 `this` 에 바인딩되어 있는 인스턴스를 초기화

## 3. 인스턴스 반환

- 완성된 인스턴스가 바인딩된 `this` 가 암묵적으로 반환
    
    ```jsx
    class Person {
      // 생성자
      constructor(name) {
        // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // Person {}
        console.log(Object.getPrototypeOf(this) === Person.prototype); // true
    
        // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
        this.name = name;
    
        // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
      }
    }
    ```
    

# 7. 프로퍼티

## 1. 인스턴스 프로퍼티

- `constructor` 내부에서 정의
    
    ```jsx
    class Person {
      constructor(name) {
        // 인스턴스 프로퍼티
        this.name = name;
      }
    }
    
    const me = new Person('Lee');
    console.log(me); // Person {name: "Lee"}
    ```
    
- `constructor` 내부에서 `this` 에 인스턴스 프로퍼티를 추가
- 인스턴스에 프로퍼티가 추가되어 인스턴스가 초기화
    
    ```jsx
    class Person {
      constructor(name) {
        // 인스턴스 프로퍼티
        this.name = name; // name 프로퍼티는 public하다.
      }
    }
    
    const me = new Person('Lee');
    
    // name은 public하다.
    console.log(me.name); // Lee
    ```
    

## 2. 접근자 프로퍼티

- 자체적으로는 값(`[[Value]]` 내부 슬롯)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티
    
    ```jsx
    const person = {
      // 데이터 프로퍼티
      firstName: 'Ungmo',
      lastName: 'Lee',
    
      // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
      // getter 함수
      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
      // setter 함수
      set fullName(name) {
        // 배열 디스트럭처링 할당: "36.1. 배열 디스트럭처링 할당" 참고
        [this.firstName, this.lastName] = name.split(' ');
      }
    };
    
    // 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
    console.log(`${person.firstName} ${person.lastName}`); // Ungmo Lee
    
    // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
    // 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
    person.fullName = 'Heegun Lee';
    console.log(person); // {firstName: "Heegun", lastName: "Lee"}
    
    // 접근자 프로퍼티를 통한 프로퍼티 값의 참조
    // 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
    console.log(person.fullName); // Heegun Lee
    
    // fullName은 접근자 프로퍼티다.
    // 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
    console.log(Object.getOwnPropertyDescriptor(person, 'fullName'));
    // {get: ƒ, set: ƒ, enumerable: true, configurable: true}
    ```
    
    ```jsx
    class Person {
      constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
      }
    
      // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
      // getter 함수
      get fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    
      // setter 함수
      set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
      }
    }
    
    const me = new Person('Ungmo', 'Lee');
    
    // 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
    console.log(`${me.firstName} ${me.lastName}`); // Ungmo Lee
    
    // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
    // 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
    me.fullName = 'Heegun Lee';
    console.log(me); // {firstName: "Heegun", lastName: "Lee"}
    
    // 접근자 프로퍼티를 통한 프로퍼티 값의 참조
    // 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
    console.log(me.fullName); // Heegun Lee
    
    // fullName은 접근자 프로퍼티다.
    // 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
    console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
    // {get: ƒ, set: ƒ, enumerable: false, configurable: true}
    ```
    
- `getter` 함수와 `setter` 함수로 구성
    - `getter` : 인스턴스 프로퍼티에 접근할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용
        - 메서드 이름 앞에 `get` 키워드를 사용해 정의
        - 참조 시에 내부적으로 `getter` 가 호출
        - 반드시 무언가를 반환
    - `setter` : 인스턴스 프로퍼티에 값을 할당할 때마다 프로퍼티 값을 조작하거나 별도의 행위가 필요할 때 사용
        - 메서드 이름 앞에 `set` 키워드를 사용해 정의
        - 할당 시에 내부적으로 `setter` 가 호출
        - 반드시 매개변수가 있어야 함
    
    ```jsx
    // Object.getOwnPropertyNames는 비열거형(non-enumerable)을 포함한 모든 프로퍼티의 이름을 반환한다.(상속 제외)
    Object.getOwnPropertyNames(me); // -> ["firstName", "lastName"]
    Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // -> ["constructor", "fullName"]
    ```
    

## 3. 클래스 필드 정의 제안

- 클래스 기반 객체지향 언어에서 클래스가 생설할 인스턴스의 프로퍼티를 가리키는 용어
    
    ```jsx
    // 자바의 클래스 정의
    public class Person {
      // ① 클래스 필드 정의
      // 클래스 필드는 클래스 몸체에 this 없이 선언해야 한다.
      private String firstName = "";
      private String lastName = "";
    
      // 생성자
      Person(String firstName, String lastName) {
        // ③ this는 언제나 클래스가 생성할 인스턴스를 가리킨다.
        this.firstName = firstName;
        this.lastName = lastName;
      }
    
      public String getFullName() {
        // ② 클래스 필드 참조
        // this 없이도 클래스 필드를 참조할 수 있다.
        return firstName + " " + lastName;
      }
    }
    ```
    
- 자바스크립트의 클래스에서 인스턴스 프로퍼티를 선언하고 초기화하려면 반드시 `constructor` 내부에서 `this` 프로퍼티 추가
- 자바스크립트의 클래스 몸체에는 메서드만 선언 가능
    
    ```jsx
    class Person {
      // 클래스 필드 정의
      name = 'Lee';
    }
    
    const me = new Person('Lee');
    ```
    
    ```jsx
    class Person {
      // 클래스 필드 정의
      name = 'Lee';
    }
    
    const me = new Person();
    console.log(me); // Person {name: "Lee"}
    ```
    
- 클래스 몸체에서 클래스 필드를 정의하는 경우 `this` 에 클래스 필드를 바인딩해서는 안됨
    
    ```jsx
    class Person {
      // this에 클래스 필드를 바인딩해서는 안된다.
      this.name = ''; // SyntaxError: Unexpected token '.'
    }
    ```
    
- 클래스 필드를 참조하는 경우 자바와 같은 클래스 기반 객체지향 언어에서는 `this` 를 생략할 수 있으나 자바스크립트에서는 `this` 를 반드시 사용
    
    ```jsx
    class Person {
      // 클래스 필드
      name = 'Lee';
    
      constructor() {
        console.log(name); // ReferenceError: name is not defined
      }
    }
    
    new Person();
    ```
    
- 클래스 필드에 초기값을 할당하지 않으면 `undefined` 가짐
    
    ```jsx
    class Person {
      // 클래스 필드를 초기화하지 않으면 undefined를 갖는다.
      name;
    }
    
    const me = new Person();
    console.log(me); // Person {name: undefined}
    ```
    
- 인스턴스를 생성할 때 외부의 초기값으로 클래스 필드를 초기화해야 할 필요가 있다면 `constructor` 에서 클래스 필드 초기화
    
    ```jsx
    class Person {
      name;
    
      constructor(name) {
        // 클래스 필드 초기화.
        this.name = name;
      }
    }
    
    const me = new Person('Lee');
    console.log(me); // Person {name: "Lee"}
    ```
    
    ```jsx
    class Person {
      constructor(name) {
        this.name = name;
      }
    }
    
    const me = new Person('Lee');
    console.log(me); // Person {name: "Lee"}
    ```
    
- 함수는 일급 객체이므로 클래스 필드에 할당 가능 → 클래스 필드를 통해 메서드 정의 가능
    
    ```jsx
    class Person {
      // 클래스 필드에 문자열을 할당
      name = 'Lee';
    
      // 클래스 필드에 함수를 할당
      getName = function () {
        return this.name;
      }
      // 화살표 함수로 정의할 수도 있다.
      // getName = () => this.name;
    }
    
    const me = new Person();
    console.log(me); // Person {name: "Lee", getName: ƒ}
    console.log(me.getName()); // Lee
    ```
    
- 클래스 필드에 화살표 함수를 할당하여 화살표 함수 내부의 `this` 가 인스턴스를 가리키게 하는 경우
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">0</button>
      <script>
        class App {
          constructor() {
            this.$button = document.querySelector('.btn');
            this.count = 0;
    
            // increase 메서드를 이벤트 핸들러로 등록
            // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
            // 하지만 increase는 화살표 함수로 정의되어 있으므로
            // increase 내부의 this는 인스턴스를 가리킨다.
            this.$button.onclick = this.increase;
    
            // 만약 increase가 화살표 함수가 아니라면 bind 메서드를 사용해야 한다.
            // $button.onclick = this.increase.bind(this);
          }
    
          // 인스턴스 메서드
          // 화살표 함수 내부의 this는 언제나 상위 컨텍스트의 this를 가리킨다.
          increase = () => this.$button.textContent = ++this.count;
        }
        new App();
      </script>
    </body>
    </html>
    ```
    

## 4. `private` 필드 정의 제안

```jsx
class Person {
  constructor(name) {
    this.name = name; // 인스턴스 프로퍼티는 기본적으로 public하다.
  }
}

// 인스턴스 생성
const me = new Person('Lee');
console.log(me.name); // Lee
```

- 클래스 필드 정의 제안을 사용하더라도 클래스 필드는 기본적으로 public하기 때문에 외부에 그대로 노출
    
    ```jsx
    class Person {
      name = 'Lee'; // 클래스 필드도 기본적으로 public하다.
    }
    
    // 인스턴스 생성
    const me = new Person();
    console.log(me.name); // Lee
    ```
    
- private 필드의 선두에는 `#` 을 붙여줌 → private 필드를 참조할 때도 `#` 을 붙여줌
    
    ```jsx
    class Person {
      // private 필드 정의
      #name = '';
    
      constructor(name) {
        // private 필드 참조
        this.#name = name;
      }
    }
    
    const me = new Person('Lee');
    
    // private 필드 #name은 클래스 외부에서 참조할 수 없다.
    console.log(me.#name);
    // SyntaxError: Private field '#name' must be declared in an enclosing class
    ```
    
- private 필드는 클래스 내부에서만 참조 가능
    
    ```jsx
    class Person {
      // private 필드 정의
      #name = '';
    
      constructor(name) {
        this.#name = name;
      }
    
      // name은 접근자 프로퍼티다.
      get name() {
        // private 필드를 참조하여 trim한 다음 반환한다.
        return this.#name.trim();
      }
    }
    
    const me = new Person(' Lee ');
    console.log(me.name); // Lee
    ```
    
- private 필드는 반드시 클래스 몸체에 정의
    
    ```jsx
    class Person {
      constructor(name) {
        // private 필드는 클래스 몸체에서 정의해야 한다.
        this.#name = name;
        // SyntaxError: Private field '#name' must be declared in an enclosing class
      }
    }
    ```
    

## 5. `static` 필드 정의 제안

- `static` 키워드를 사용하여 정적 필드를 정의할 수 없었음
    
    ```jsx
    class MyMath {
      // static public 필드 정의
      static PI = 22 / 7;
    
      // static private 필드 정의
      static #num = 10;
    
      // static 메서드
      static increment() {
        return ++MyMath.#num;
      }
    }
    
    console.log(MyMath.PI); // 3.142857142857143
    console.log(MyMath.increment()); // 11
    ```
