# 28장. Number

# 1. `Number` 생성자 함수

- 생성자 함수 객체
- `new` 연산자와 함께 호출하여 `Number` 인스턴스 생성 가능
- `Number` 생성자 함수에 인수를 전달하지 않고 `new` 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 0을 할당한 `Number` 래퍼 객체 생성
    
    ```jsx
    const numObj = new Number();
    console.log(numObj); // Number {[[PrimitiveValue]]: 0}
    ```
    
- `Number` 생성자 함수의 인수로 숫자를 전달하면서 `new` 연산자와 함께 호출하면 `[[NumberData]]` 내부 슬롯에 인수로 전달받은 숫자를 할당한 `Number` 래퍼 객체 생성
    
    ```jsx
    const numObj = new Number(10);
    console.log(numObj); // Number {[[PrimitiveValue]]: 10}
    ```
    
- `Number` 생성자 함수의 인수로 숫자가 아닌 값을 전달하면 인수를 숫자로 강제 변환한 후, `[[NumberData]]` 내부 슬롯에 변환된 숫자를 할당한 `Number` 래퍼 객체 생성
- 인수를 숫자로 변환 불가 → `NaN` 을 `[[NumberData]]` 내부 슬롯에 할당한 `Number` 래퍼 객체 생성
    
    ```jsx
    let numObj = new Number('10');
    console.log(numObj); // Number {[[PrimitiveValue]]: 10}
    
    numObj = new Number('Hello');
    console.log(numObj); // Number {[[PrimitiveValue]]: NaN}
    ```
    
- `new` 연산자를 사용하지 않고 `Number` 생성자 함수를 호출하면 `Number` 인스턴스가 아닌 숫자 반환
    
    ```jsx
    // 문자열 타입 => 숫자 타입
    Number('0');     // -> 0
    Number('-1');    // -> -1
    Number('10.53'); // -> 10.53
    
    // 불리언 타입 => 숫자 타입
    Number(true);  // -> 1
    Number(false); // -> 0
    ```
    

# 2. `Number` 프로퍼티

## 1. `Number.EPSILON`

- 1과 1보다 큰 숫자 중에서 가장 작은 숫자와의 차이와 같음
- 약 `2.2204460492503130808472633361816e-16`
    
    ```jsx
    0.1 + 0.2;         // -> 0.30000000000000004
    0.1 + 0.2 === 0.3; // -> false
    ```
    
- 부동소수점으로 인해 발생하는 오차를 해결하기 위해 사용
    
    ```jsx
    function isEqual(a, b){
      // a와 b를 뺀 값의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
      return Math.abs(a - b) < Number.EPSILON;
    }
    
    isEqual(0.1 + 0.2, 0.3); // -> true
    ```
    

## 2. `Number.MAX_VALUE`

- 자바스크립트에서 표현할 수 있는 가장 큰 양수 값($1.7976931348623157 * 10^{308}$)
- `Number.MAX_VALUE` 보다 큰 숫자는 `Infinity`
    
    ```jsx
    Number.MAX_VALUE; // -> 1.7976931348623157e+308
    Infinity > Number.MAX_VALUE; // -> true
    ```
    

## 3. `Number.MIN_VALUE`

- 자바스크립트에서 표현할 수 있는 가장 작은 양수 값(`5e-324`)
- `Number.MIN_VALUE` 보다 작은 숫자는 0
    
    ```jsx
    Number.MIN_VALUE; // -> 5e-324
    Number.MIN_VALUE > 0; // -> true
    ```
    

## 4. `Number.MAX_SAFE_INTEGER`

- 자바스크립트에서 안전하게 표현할 수 있는 가장 큰 정수값(`9007199254740991`)
    
    ```jsx
    Number.MAX_SAFE_INTEGER; // -> 9007199254740991
    ```
    

## 5. `Number.MIN_SAFE_INTEGER`

- 자바스크립트에서 안전하게 표현할 수 있는 가장 작은 정수값(`-9007199254740991`)
    
    ```jsx
    Number.MIN_SAFE_INTEGER; // -> -9007199254740991
    ```
    

## 6. `Number.POSITIVE_INFINITY`

- 양의 무한대를 나타내는 숫자값 `Infinity` 와 같음
    
    ```jsx
    Number.POSITIVE_INFINITY; // -> Infinity
    ```
    

## 7. `Number.NEGATIVE_INFINITY`

- 음의 무한대를 나타내는 숫자값 `-Infinity` 와 같음
    
    ```jsx
    Number.NEGATIVE_INFINITY; // -> -Infinity
    ```
    

## 8. `Number.NaN`

- 숫자가 아님(Not-a-Number)을 나타내는 숫자값
- `window.NaN` 과 같음
    
    ```jsx
    Number.NaN; // -> NaN
    ```
    

# 3. `Number` 메서드

## 1. `Number.isFinite`

- 인수로 전달된 숫자값이 정상적인 유한수, `Infinity` 또는 `-Infinity` 가 아닌지 검사하여 그 결과를 불리언 값으로 반환
    
    ```jsx
    // 인수가 정상적인 유한수이면 true를 반환한다.
    Number.isFinite(0);                // -> true
    Number.isFinite(Number.MAX_VALUE); // -> true
    Number.isFinite(Number.MIN_VALUE); // -> true
    
    // 인수가 무한수이면 false를 반환한다.
    Number.isFinite(Infinity);  // -> false
    Number.isFinite(-Infinity); // -> false
    ```
    
- 인수가 `NaN` 이면 언제나 `false` 반환
    
    ```jsx
    Number.isFinite(NaN); // -> false
    ```
    
- 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 `false`
    
    ```jsx
    // Number.isFinite는 인수를 숫자로 암묵적 타입 변환하지 않는다.
    Number.isFinite(null); // -> false
    
    // isFinite는 인수를 숫자로 암묵적 타입 변환한다. null은 0으로 암묵적 타입 변환된다.
    isFinite(null); // -> true
    ```
    

## 2. `Number.isInteger`

- 인수로 전달된 숫자값이 정수인지 검사하여 그 결과를 불리언 값으로 반환
- 인수를 숫자로 암묵적 타입 변환하지 않음
    
    ```jsx
    // 인수가 정수이면 true를 반환한다.
    Number.isInteger(0)     // -> true
    Number.isInteger(123)   // -> true
    Number.isInteger(-123)  // -> true
    
    // 0.5는 정수가 아니다.
    Number.isInteger(0.5)   // -> false
    // '123'을 숫자로 암묵적 타입 변환하지 않는다.
    Number.isInteger('123') // -> false
    // false를 숫자로 암묵적 타입 변환하지 않는다.
    Number.isInteger(false) // -> false
    // Infinity/-Infinity는 정수가 아니다.
    Number.isInteger(Infinity)  // -> false
    Number.isInteger(-Infinity) // -> false
    ```
    

## 3. `Number.isNaN`

- 인수로 전달된 숫자값이 `NaN` 인지 검사하여 그 결과를 불리언 값으로 반환
    
    ```jsx
    // 인수가 NaN이면 true를 반환한다.
    Number.isNaN(NaN); // -> true
    ```
    
- 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 `false`
    
    ```jsx
    // Number.isNaN은 인수를 숫자로 암묵적 타입 변환하지 않는다.
    Number.isNaN(undefined); // -> false
    
    // isFinite는 인수를 숫자로 암묵적 타입 변환한다. undefined는 NaN으로 암묵적 타입 변환된다.
    isNaN(undefined); // -> true
    ```
    

## 4. `Number.isSafeInteger`

- 인수로 전달된 숫자값이 안전한 정수인지 검사하여 그 결과를 불리언 값으로 반환
- 안전한 정수값은 $-(2^{53} - 1)$과 $2^{53} - 1$ 사이의 정수값
- 인수를 숫자로 암묵적 타입 변환하지 않음
    
    ```jsx
    // 0은 안전한 정수이다.
    Number.isSafeInteger(0); // -> true
    // 1000000000000000은 안전한 정수이다.
    Number.isSafeInteger(1000000000000000); // -> true
    
    // 10000000000000001은 안전하지 않다.
    Number.isSafeInteger(10000000000000001); // -> false
    // 0.5은 정수가 아니다.
    Number.isSafeInteger(0.5); // -> false
    // '123'을 숫자로 암묵적 타입 변환하지 않는다.
    Number.isSafeInteger('123'); // -> false
    // false를 숫자로 암묵적 타입 변환하지 않는다.
    Number.isSafeInteger(false); // -> false
    // Infinity/-Infinity는 정수가 아니다.
    Number.isSafeInteger(Infinity); // -> false
    ```
    

## 5. `Number.prototype.toExponential`

- 숫자를 지수 표기법으로 변환하여 문자열로 반환
- 인수로 소수점 이하로 표현할 자릿수 전달 가능
    
    ```jsx
    (77.1234).toExponential();  // -> "7.71234e+1"
    (77.1234).toExponential(4); // -> "7.7123e+1"
    (77.1234).toExponential(2); // -> "7.71e+1"
    ```
    
- 숫자 리터럴과 함께 `Number` 프로토타입 메서드를 사용할 경우 에러 발생
    
    ```jsx
    77.toExponential(); // -> SyntaxError: Invalid or unexpected token
    ```
    
    ```jsx
    77.1234.toExponential(); // -> "7.71234e+1"
    ```
    
- 숫자 리터럴과 함께 메서드를 사용할 경우 혼란을 방지하기 위해 그룹 연산자를 사용
    
    ```jsx
    (77).toExponential(); // -> "7.7e+1"
    ```
    
- 숫자 뒤의 `.` 뒤에 공백이 오면 `.` 을 프로퍼티 접근 연산자로 해석
    
    ```jsx
    77 .toExponential(); // -> "7.7e+1"
    ```
    

## 6. `Number.prototype.toFixed`

- 숫자를 반올림하여 문자열로 반환
- 반올림하는 소수점 이하 자릿수를 나타내는 0 ~ 20 사이의 정수값을 인수로 전달
    
    ```jsx
    // 소수점 이하 반올림. 인수를 생략하면 기본값 0이 지정된다.
    (12345.6789).toFixed(); // -> "12346"
    // 소수점 이하 1자리수 유효, 나머지 반올림
    (12345.6789).toFixed(1); // -> "12345.7"
    // 소수점 이하 2자리수 유효, 나머지 반올림
    (12345.6789).toFixed(2); // -> "12345.68"
    // 소수점 이하 3자리수 유효, 나머지 반올림
    (12345.6789).toFixed(3); // -> "12345.679"
    ```
    

## 7. `Number.prototype.toPrecision`

- 인수로 전달받은 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환
- 인수로 전달받은 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과 반환
- 전체 자릿수를 나타내는 0 ~ 21 사이의 정수값을 인수로 전달 가능
    
    ```jsx
    // 전체 자리수 유효. 인수를 전달하지 않으면 기본값 0이 전달된다.
    (12345.6789).toPrecision(); // -> "12345.6789"
    // 전체 1자리수 유효, 나머지 반올림
    (12345.6789).toPrecision(1); // -> "1e+4"
    // 전체 2자리수 유효, 나머지 반올림
    (12345.6789).toPrecision(2); // -> "1.2e+4"
    // 전체 6자리수 유효, 나머지 반올림
    (12345.6789).toPrecision(6); // -> "12345.7"
    ```
    

## 8. `Number.prototype.toString`

- 숫자를 문자열로 변환하여 반환
- 진법을 나타내는 2 ~ 36 사이의 정수값을 인수로 전달
    
    ```jsx
    // 인수를 생략하면 10진수 문자열을 반환한다.
    (10).toString(); // -> "10"
    // 2진수 문자열을 반환한다.
    (16).toString(2); // -> "10000"
    // 8진수 문자열을 반환한다.
    (16).toString(8); // -> "20"
    // 16진수 문자열을 반환한다.
    (16).toString(16); // -> "10"
    ```
