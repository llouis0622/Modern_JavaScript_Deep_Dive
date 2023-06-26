# 47장. 에러 처리

# 1. 에러 처리의 필요성

```jsx
console.log('[Start]');

foo(); // ReferenceError: foo is not defined
// 발생한 에러를 방치하면 프로그램은 강제 종료된다.

// 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다.
console.log('[End]');
```

- `try ... catch` 문을 사용해 발생한 에러에 적절하게 대응
    
    ```jsx
    console.log('[Start]');
    
    try {
      foo();
    } catch (error) {
      console.error('[에러 발생]', error);
      // [에러 발생] ReferenceError: foo is not defined
    }
    
    // 발생한 에러에 적절한 대응을 하면 프로그램이 강제 종료되지 않는다.
    console.log('[End]');
    ```
    
- 직접적으로 에러를 발생하지는 않는 예외적인 상황 발생 가능
    
    ```jsx
    // DOM에 button 요소가 존재하지 않으면 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
    const $button = document.querySelector('button'); // null
    
    $button.classList.add('disabled');
    // TypeError: Cannot read property 'classList' of null
    ```
    
    ```jsx
    const $elem = document.querySelector('#1');
    // DOMException: Failed to execute 'querySelector' on 'Document': '#1' is not a valid selector.
    ```
    
    ```jsx
    // DOM에 button 요소가 존재하는 경우 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
    const $button = document.querySelector('button'); // null
    $button?.classList.add('disabled');
    ```
    

# 2. `try ... catch ... finally` 문

- `if` 문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 확인해서 처리하는 방법
- 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 하는 방법
    - `try ... catch ... finally` : 에러 처리
    - `finally` 문은 불필요시 생략 가능
    
    ```jsx
    try {
    	// 실행할 코드(에러가 발생할 가능성이 있는 코드)
    } catch (err) {
    	// try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
    	// err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
    } finally {
    	// 에러 발생과 상관없이 반드시 한 번 실행된다.
    }
    ```
    
    ```jsx
    console.log('[Start]');
    
    try {
      // 실행할 코드(에러가 발생할 가능성이 있는 코드)
      foo();
    } catch (err) {
      // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
      // err에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
      console.error(err); // ReferenceError: foo is not defined
    } finally {
      // 에러 발생과 상관없이 반드시 한 번 실행된다.
      console.log('finally');
    }
    
    // try...catch...finally 문으로 에러를 처리하면 프로그램이 강제 종료되지 않는다.
    console.log('[End]');
    ```
    

# 3. `Error` 객체

- `Error` 생성자 함수 : 에러 객체 생성
- 에러를 상세히 설명하는 에러 메시지를 인수로 전달 가능
    
    ```jsx
    const error = new Error('invalid');
    ```
    
- `message` 프로퍼티 값 : `Error` 생성자 함수에 인수로 전달한 에러 메시지
- `stack` 프로퍼티 값 : 에러를 발생시킨 콜 스택의 호출 정보를 나타내는 문자열, 디버깅 목적
- 생성자 함수가 생성한 에러 객체의 프로토타입 → `Error.prototype` 상속받음
    - `Error` : 일반적 에러 객체
    - `SyntaxError` : 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체
    - `ReferenceError` : 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체
    - `TypeError` : 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체
    - `RangeError` : 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체
    - `URIError` : `encodeURI` 또는 `decodeURI` 함수에 부적절한 인수를 전달했을 때 발생하는 에러 객체
    - `EvalError` : `eval` 함수에서 발생하는 에러 객체
    
    ```jsx
    1 @ 1;    // SyntaxError: Invalid or unexpected token
    foo();    // ReferenceError: foo is not defined
    null.foo; // TypeError: Cannot read property 'foo' of null
    new Array(-1); // RangeError: Invalid array length
    decodeURIComponent('%'); // URIError: URI malformed
    ```
    

# 4. `throw` 문

```jsx
try {
  // 에러 객체를 생성한다고 에러가 발생하는 것은 아니다.
  new Error('something wrong');
} catch (error) {
  console.log(error);
}
```

- 에러 발생 → `try` 코드 블록에서 `throw` 문으로 에러 객체 던져야 함
    
    ```jsx
    throw 표현식;
    ```
    
- 에러를 던지면 `catch` 문의 에러 변수 생성, 던져진 에러 객체 할당
    
    ```jsx
    try {
      // 에러 객체를 던지면 catch 코드 블록이 실행되기 시작한다.
      throw new Error('something wrong');
    } catch (error) {
      console.log(error);
    }
    ```
    
    ```jsx
    // 외부에서 전달받은 콜백 함수를 n번만큼 반복 호출한다
    const repeat = (n, f) => {
      // 매개변수 f에 전달된 인수가 함수가 아니면 TypeError를 발생시킨다.
      if (typeof f !== 'function') throw new TypeError('f must be a function');
    
      for (var i = 0; i < n; i++) {
        f(i); // i를 전달하면서 f를 호출
      }
    };
    
    try {
      repeat(2, 1); // 두 번째 인수가 함수가 아니므로 TypeError가 발생(throw)한다.
    } catch (err) {
      console.error(err); // TypeError: f must be a function
    }
    ```
    

# 5. 에러의 전파

```jsx
const foo = () => {
  throw Error('foo에서 발생한 에러'); // ④
};

const bar = () => {
  foo(); // ③
};

const baz = () => {
  bar(); // ②
};

try {
  baz(); // ①
} catch (err) {
  console.error(err);
}
```

- `throw` 된 에러를 캐치하지 않으면 호출자 방향으로 전파
