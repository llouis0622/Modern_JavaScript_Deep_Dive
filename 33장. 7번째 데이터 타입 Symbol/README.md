# 33장. 7번째 데이터 타입 Symbol

# 1. 심벌이란?

- 7번째 데이터 타입, 변경 불가능한 원시 타입의 값
- 다른 값과 중복되지 않는 유일무이한 값
- 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용

# 2. 심벌 값의 생성

## 1. `Symbol` 함수

- `Symbol` 함수 호출하여 생성
- 생성된 심벌 값은 외부로 노출되지 않아 확인할 수 없음
- 다른 값과 절대 중복되지 않는 유일무이한 값
    
    ```jsx
    // Symbol 함수를 호출하여 유일무이한 심벌 값을 생성한다.
    const mySymbol = Symbol();
    console.log(typeof mySymbol); // symbol
    
    // 심벌 값은 외부로 노출되지 않아 확인할 수 없다.
    console.log(mySymbol);        // Symbol()
    ```
    
- `new` 연산자와 함께 호출하지 않음
    
    ```jsx
    new Symbol(); // TypeError: Symbol is not a constructor
    ```
    
- 선택적으로 문자열을 인수로 전달 가능
- 생성된 심벌 값에 대한 설명으로 디버깅 용도로만 사용
    
    ```jsx
    // 심벌 값에 대한 설명이 같더라도 유일무이한 심벌 값을 생성한다.
    const mySymbol1 = Symbol('mySymbol');
    const mySymbol2 = Symbol('mySymbol');
    
    console.log(mySymbol1 === mySymbol2); // false
    ```
    
- 문자열, 숫자, 불리언과 같이 객체처럼 접근하면 암묵적으로 래퍼 객체 생성
    
    ```jsx
    const mySymbol = Symbol('mySymbol');
    
    // 심벌도 레퍼 객체를 생성한다
    console.log(mySymbol.description); // mySymbol
    console.log(mySymbol.toString());  // Symbol(mySymbol)
    ```
    
- 암묵적으로 문자열이나 숫자 타입으로 변환되지 않음
    
    ```jsx
    const mySymbol = Symbol();
    
    // 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않는다.
    console.log(mySymbol + ''); // TypeError: Cannot convert a Symbol value to a string
    console.log(+mySymbol);     // TypeError: Cannot convert a Symbol value to a number
    ```
    
- 불리언 타입으로는 암묵적 타입 변환 가능
    
    ```jsx
    const mySymbol = Symbol();
    
    // 불리언 타입으로는 암묵적으로 타입 변환된다.
    console.log(!!mySymbol); // true
    
    // if 문 등에서 존재 확인을 위해 사용할 수 있다.
    if (mySymbol) console.log('mySymbol is not empty.');
    ```
    

## 2. `Symbol.for / Symbol.keyFor` 메서드

- 인수로 전달받은 문자열을 키로 사용하여 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리에서 해당 키와 일치하는 심벌 값을 검색
- 검색 성공 → 새로운 심벌 값을 생성하지 않고 검색된 심벌 값을 반환
- 검색 실패 → 새로운 심벌 값을 생성하여 `Symbol.for` 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장한 후, 생성된 심벌 값을 반환
    
    ```jsx
    // 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
    const s1 = Symbol.for('mySymbol');
    // 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 있으면 해당 심벌 값을 반환
    const s2 = Symbol.for('mySymbol');
    
    console.log(s1 === s2); // true
    ```
    
- 전역 심벌 레지스트리에 저장된 심벌 값의 키 추출 가능
    
    ```jsx
    // 전역 심벌 레지스트리에 mySymbol이라는 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성
    const s1 = Symbol.for('mySymbol');
    // 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
    Symbol.keyFor(s1); // -> mySymbol
    
    // Symbol 함수를 호출하여 생성한 심벌 값은 전역 심벌 레지스트리에 등록되어 관리되지 않는다.
    const s2 = Symbol('foo');
    // 전역 심벌 레지스트리에 저장된 심벌 값의 키를 추출
    Symbol.keyFor(s2); // -> undefined
    ```
    

# 3. 심벌과 상수

```jsx
// 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
// 이때 값 1, 2, 3, 4에는 특별한 의미가 없고 상수 이름에 의미가 있다.
const Direction = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};

// 변수에 상수를 할당
const myDirection = Direction.UP;

if (myDirection === Direction.UP) {
  console.log('You are going UP.');
}
```

- 변경 / 중복될 가능성이 있는 무의미한 상수 대신 중복될 가능성이 없는 유일무이한 심벌 값 사용 가능
    
    ```jsx
    // 위, 아래, 왼쪽, 오른쪽을 나타내는 상수를 정의한다.
    // 중복될 가능성이 없는 심벌 값으로 상수 값을 생성한다.
    const Direction = {
      UP: Symbol('up'),
      DOWN: Symbol('down'),
      LEFT: Symbol('left'),
      RIGHT: Symbol('right')
    };
    
    const myDirection = Direction.UP;
    
    if (myDirection === Direction.UP) {
      console.log('You are going UP.');
    }
    ```
    
- `enum` : 숫자 상수의 집합, 열거형
    - 객체를 동결하는 `Object.freeze` 메서드와 심벌 값 사용
    
    ```jsx
    // JavaScript enum
    // Direction 객체는 불변 객체이며 프로퍼티는 유일무이한 값이다.
    const Direction = Object.freeze({
      UP: Symbol('up'),
      DOWN: Symbol('down'),
      LEFT: Symbol('left'),
      RIGHT: Symbol('right')
    });
    
    const myDirection = Direction.UP;
    
    if (myDirection === Direction.UP) {
      console.log('You are going UP.');
    }
    ```
    

# 4. 심벌과 프로퍼티 키

- 심벌 값을 프로퍼티 키로 사용하려면 프로퍼티 키로 사용할 심벌 값에 대괄호 사용
- 접근할 때도 마찬가지로 대괄호 사용
    
    ```jsx
    const obj = {
      // 심벌 값으로 프로퍼티 키를 생성
      [Symbol.for('mySymbol')]: 1
    };
    
    obj[Symbol.for('mySymbol')]; // -> 1
    ```
    

# 5. 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 `for ... in` 문이나 `Object.keys` , `Object.getOwnPropertyNames` 메서드로 찾을 수 없음
    
    ```jsx
    const obj = {
      // 심벌 값으로 프로퍼티 키를 생성
      [Symbol('mySymbol')]: 1
    };
    
    for (const key in obj) {
      console.log(key); // 아무것도 출력되지 않는다.
    }
    
    console.log(Object.keys(obj)); // []
    console.log(Object.getOwnPropertyNames(obj)); // []
    ```
    
- `Object.getOwnPropertySymbols` 메서드 사용 → 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티 찾을 수 있음
    
    ```jsx
    const obj = {
      // 심벌 값으로 프로퍼티 키를 생성
      [Symbol('mySymbol')]: 1
    };
    
    // getOwnPropertySymbols 메서드는 인수로 전달한 객체의 심벌 프로퍼티 키를 배열로 반환한다.
    console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(mySymbol)]
    
    // getOwnPropertySymbols 메서드로 심벌 값도 찾을 수 있다.
    const symbolKey1 = Object.getOwnPropertySymbols(obj)[0];
    console.log(obj[symbolKey1]); // 1
    ```
    

# 6. 심벌과 표준 빌트인 객체 확장

- 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것을 권장하지 않음
    
    ```jsx
    // 표준 빌트인 객체를 확장하는 것은 권장하지 않는다.
    Array.prototype.sum = function () {
      return this.reduce((acc, cur) => acc + cur, 0);
    };
    
    [1, 2].sum(); // -> 3
    ```
    
    ```jsx
    // 심벌 값으로 프로퍼티 키를 동적 생성하면 다른 프로퍼티 키와 절대 충돌하지 않아 안전하다.
    Array.prototype[Symbol.for('sum')] = function () {
      return this.reduce((acc, cur) => acc + cur, 0);
    };
    
    [1, 2][Symbol.for('sum')](); // -> 3
    ```
    

# 7. Well-known `Symbol`

- 빌트인 심벌 값은 `Symbol` 함수의 프로퍼티에 할당
- 자바스크립트가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서 부르는 방법
- 이터레이션 프로토콜 준수
- `Symbol.iterator` 를 키로 갖는 메서드를 객체에 추가하고 이터레이터를 반환하도록 구현 → 그 객체는 이터러블
    
    ```jsx
    // 1 ~ 5 범위의 정수로 이루어진 이터러블
    const iterable = {
      // Symbol.iterator 메서드를 구현하여 이터러블 프로토콜을 준수
      [Symbol.iterator]() {
        let cur = 1;
        const max = 5;
        // Symbol.iterator 메서드는 next 메서드를 소유한 이터레이터를 반환
        return {
          next() {
            return { value: cur++, done: cur > max + 1 };
          }
        };
      }
    };
    
    for (const num of iterable) {
      console.log(num); // 1 2 3 4 5
    }
    ```
