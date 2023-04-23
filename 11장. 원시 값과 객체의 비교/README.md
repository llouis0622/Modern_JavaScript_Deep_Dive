# 11장. 원시 값과 객체의 비교

- 원시 타입(Primitive Type)
    - 원시 타입의 값, 원시 값 : 변경 불가능한 값(Immutable Value)
    - 원시 값을 변수에 할당 → 변수(확보된 메모리 공간)에 실제 값 저장
    - 값에 의한 전달(Pass By Value) : 원본의 원시 값이 복사되어 전달
- 객체 타입(Object/Reference Type)
    - 객체(참조) 타입의 값, 객체 : 변경 가능한 값(Mutable Value)
    - 객체를 변수에 할당 → 변수(확보된 메모리 공간)에 참조 값 저장
    - 참조에 의한 전달(Pass By Reference) : 참조 값이 복사되어 전달

# 1. 원시 값

## 1. 변경 불가능한 값

- 변경 불가능하다는 것은 변수가 아니라 값에 대한 진술
    
    ```jsx
    // const 키워드를 사용해 선언한 변수는 재할당이 금지된다. 상수는 재할당이 금지된 변수일 뿐이다.
    const o = {};
    
    // const 키워드를 사용해 선언한 변수에 할당한 원시값(상수)은 변경할 수 없다.
    // 하지만 const 키워드를 사용해 선언한 변수에 할당한 객체는 변경할 수 있다.
    o.a = 1;
    console.log(o); // {a: 1}
    ```
    
- 불변성(Immutability) : 원시 값을 재할당하면 새로운 메모리 공간을 확보하고 재할당한 값을 저장한 후, 변수가 참조하던 메모리 공간의 주소 변경
- 불변성을 갖는 원시 값을 할당한 변수는 재할당 이외에 변수 값을 변경할 수 있는 방법이 없음

## 2. 문자열과 불변성

- 문자열 : 0개 이상의 문자로 이뤄진 집합, 1개의 문자는 2바이트의 메모리 공간에 저장
    
    ```jsx
    // 문자열은 0개 이상의 문자들로 이뤄진 집합이다.
    var str1 = '';      // 0개의 문자로 이뤄진 문자열(빈 문자열)
    var str2 = 'Hello'; // 5개의 문자로 이뤄진 문자열
    ```
    
    ```jsx
    var str = 'Hello';
    str = 'world';
    ```
    
    ```jsx
    var str = 'string';
    
    // 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
    // 하지만 문자열은 원시값이므로 변경할 수 없다. 이때 에러가 발생하지 않는다.
    str[0] = 'S';
    
    console.log(str); // string
    ```
    
- 유사 배열 객체(Array-Like Object) : 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 `length` 프로퍼티를 갖는 객체
    
    ```jsx
    var str = 'string';
    
    // 문자열은 유사 배열이므로 배열과 유사하게 인덱스를 사용해 각 문자에 접근할 수 있다.
    console.log(str[0]); // s
    
    // 원시 값인 문자열이 객체처럼 동작한다.
    console.log(str.length); // 6
    console.log(str.toUpperCase()); // STRING
    ```
    

## 3. 값에 의한 전달

```jsx
var score = 80;
var copy = score;

console.log(score); // 80
console.log(copy);  // 80

score = 100;

console.log(score); // 100
console.log(copy);  // ?
```

- 변수에 원시 값을 갖는 변수를 할당하면 할당받는 변수에는 할당되는 변수의 원시 값이 복사되어 전달
    
    ```jsx
    var score = 80;
    
    // copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
    var copy = score;
    
    console.log(score, copy); // 80  80
    console.log(score === copy); // true
    ```
    
- 다른 메모리 공간에 저장된 별개의 값
    
    ```jsx
    var score = 80;
    
    // copy 변수에는 score 변수의 값 80이 복사되어 할당된다.
    var copy = score;
    
    console.log(score, copy);    // 80  80
    console.log(score === copy); // true
    
    // score 변수와 copy 변수의 값은 다른 메모리 공간에 저장된 별개의 값이다.
    // 따라서 score 변수의 값을 변경해도 copy 변수의 값에는 어떠한 영향도 주지 않는다.
    score = 100;
    
    console.log(score, copy);    // 100  80
    console.log(score === copy); // false
    ```
    
- 엄격하게 표현하면 변수에는 값이 전달되는 것이 아니라 메모리 주소가 전달
- 변수와 같은 식별자는 값이 아니라 메모리 주소 기억
    
    ```jsx
    var x = 10;
    ```
    
    ```jsx
    var copy = score;
    ```
    
- 사실은 값을 전달하는 것이 아니라 메모리 주소 전달
- 전달된 메모리 주소를 통해 메모리 공간에 접근하면 값 참조 가능
- 두 변수의 원시 값은 서로 다른 메모리 공간에 저장된 별개의 값이 되어 어느 한쪽에서 재할당을 통해 값을 변경하더라도 서로 간섭할 수 없음

# 2. 객체

- 프로퍼티의 개수가 정해져 있지 않음
- 동적으로 추가 및 삭제 가능
- 프로퍼티 값에도 제약이 없음
- 메모리 공간의 크기를 사전에 결정 불가

## 1. 변경 가능한 값

```jsx
var person = {
  name: 'Lee'
};
```

- 참조 값(Reference Value) : 생성된 객체가 저장된 메모리 공간의 주소
    
    ```jsx
    // 할당이 이뤄지는 시점에 객체 리터럴이 해석되고, 그 결과 객체가 생성된다.
    var person = {
      name: 'Lee'
    };
    
    // person 변수에 저장되어 있는 참조값으로 실제 객체에 접근해서 그 객체를 반환한다.
    console.log(person); // {name: "Lee"}
    ```
    
- 객체를 할당한 변수는 재할당 없이 객체를 직접 변경 가능
- 재할당 없이 프로퍼티를 동적으로 추가할 수도 있고 프로퍼티 값을 갱신할 수도 있으며 프로퍼티 자체를 삭제할 수도 있음
    
    ```jsx
    var person = {
      name: 'Lee'
    };
    
    // 프로퍼티 값 갱신
    person.name = 'Kim';
    
    // 프로퍼티 동적 생성
    person.address = 'Seoul';
    
    console.log(person); // {name: "Kim", address: "Seoul"}
    ```
    
- 여러 개의 식별자가 하나의 객체를 공유할 수 있음

## 💭. 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)

- 얕은 복사
    - 한 단계까지만 복사하는 것
    - 객체에 중첩되어 있는 객체의 경우 참조 값을 복사
    - 객체를 할당한 변수를 다른 변수에 할당하는 것
- 깊은 복사
    - 객체에 중첩되어 있는 객체까지 모두 복사하는 것
    - 객체에 중첩되어 있는 객체까지 모두 복사해서 원시 값처럼 완전한 복사본 제작
    - 원시 값을 할당한 변수를 다른 변수에 할당하는 것

```jsx
const o = { x: { y: 1 } };

// 얕은 복사
const c1 = { ...o }; // 35장 "스프레드 문법" 참고
console.log(c1 === o); // false
console.log(c1.x === o.x); // true

// lodash의 cloneDeep을 사용한 깊은 복사
// "npm install lodash"로 lodash를 설치한 후, Node.js 환경에서 실행
const _ = require('lodash');
// 깊은 복사
const c2 = _.cloneDeep(o);
console.log(c2 === o); // false
console.log(c2.x === o.x); // false
```

```jsx
const v = 1;

// "깊은 복사"라고 부르기도 한다.
const c1 = v;
console.log(c1 === v); // true

const o = { x: 1 };

// "얕은 복사"라고 부르기도 한다.
const c2 = o;
console.log(c2 === o); // true
```

## 2. 참조에 의한 전달

```jsx
var person = {
  name: 'Lee'
};

// 참조값을 복사(얕은 복사)
var copy = person;
```

- 참조 값이 복사되어 전달
- 두 개의 식별자가 하나의 객체 공유
    
    ```jsx
    var person = {
      name: 'Lee'
    };
    
    // 참조값을 복사(얕은 복사). copy와 person은 동일한 참조값을 갖는다.
    var copy = person;
    
    // copy와 person은 동일한 객체를 참조한다.
    console.log(copy === person); // true
    
    // copy를 통해 객체를 변경한다.
    copy.name = 'Kim';
    
    // person을 통해 객체를 변경한다.
    person.address = 'Seoul';
    
    // copy와 person은 동일한 객체를 가리킨다.
    // 따라서 어느 한쪽에서 객체를 변경하면 서로 영향을 주고 받는다.
    console.log(person); // {name: "Kim", address: "Seoul"}
    console.log(copy);   // {name: "Kim", address: "Seoul"}
    ```
    
- 식별자가 기억하는 메모리 공간에 저장되어 있는 값을 복사해서 전달한다는 면에서 동일
- 자바스크립트에는 값에 의한 전달만 존재
    
    ```jsx
    var person1 = {
      name: 'Lee'
    };
    
    var person2 = {
      name: 'Lee'
    };
    
    console.log(person1 === person2); // ① false
    console.log(person1.name === person2.name); // ② true
    ```
