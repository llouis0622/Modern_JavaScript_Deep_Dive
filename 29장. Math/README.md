# 29장. Math

# 1. `Math` 프로퍼티

- `PI` 값($\pi \approx 3.14159265358979$)
    
    ```jsx
    Math.PI; // -> 3.141592653589793
    ```
    

# 2. `Math` 메서드

## 1. `Math.abs`

- 인수로 전달된 숫자의 절대값을 반환
- 절대값은 반드시 0 또는 양수
    
    ```jsx
    Math.abs(-1);        // -> 1
    Math.abs('-1');      // -> 1
    Math.abs('');        // -> 0
    Math.abs([]);        // -> 0
    Math.abs(null);      // -> 0
    Math.abs(undefined); // -> NaN
    Math.abs({});        // -> NaN
    Math.abs('string');  // -> NaN
    Math.abs();          // -> NaN
    ```
    

## 2. `Math.round`

- 인수로 전달된 숫자의 소수점 이하를 반올림한 정수를 반환
    
    ```jsx
    Math.round(1.4);  // -> 1
    Math.round(1.6);  // -> 2
    Math.round(-1.4); // -> -1
    Math.round(-1.6); // -> -2
    Math.round(1);    // -> 1
    Math.round();     // -> NaN
    ```
    

## 3. `Math.ceil`

- 인수로 전달된 숫자의 소수점 이하를 올림한 정수를 반환
    
    ```jsx
    Math.ceil(1.4);  // -> 2
    Math.ceil(1.6);  // -> 2
    Math.ceil(-1.4); // -> -1
    Math.ceil(-1.6); // -> -1
    Math.ceil(1);    // -> 1
    Math.ceil();     // -> NaN
    ```
    

## 4. `Math.floor`

- 인수로 전달된 숫자의 소수점 이하를 내림한 정수를 반환
    
    ```jsx
    Math.floor(1.9);  // -> 1
    Math.floor(9.1);  // -> 9
    Math.floor(-1.9); // -> -2
    Math.floor(-9.1); // -> -10
    Math.floor(1);    // -> 1
    Math.floor();     // -> NaN
    ```
    

## 5. `Math.sqrt`

- 인수로 전달된 숫자의 제곱근을 반환
    
    ```jsx
    Math.sqrt(9);  // -> 3
    Math.sqrt(-9); // -> NaN
    Math.sqrt(2);  // -> 1.414213562373095
    Math.sqrt(1);  // -> 1
    Math.sqrt(0);  // -> 0
    Math.sqrt();   // -> NaN
    ```
    

## 6. `Math.random`

- 임의의 난수를 반환
- 난수는 0에서 1 미만의 실수
    
    ```jsx
    Math.random(); // 0에서 1 미만의 랜덤 실수(0.8208720231391746)
    
    /*
    1에서 10 범위의 랜덤 정수 취득
    1) Math.random으로 0에서 1 미만의 랜덤 실수를 구한 다음, 10을 곱해 0에서 10 미만의
    랜덤 실수를 구한다.
    2) 0에서 10 미만의 랜덤 실수에 1을 더해 1에서 10 범위의 랜덤 실수를 구한다.
    3) Math.floor로 1에서 10 범위의 랜덤 실수의 소수점 이하를 떼어 버린 다음 정수를 반환한다.
    */
    const random = Math.floor((Math.random() * 10) + 1);
    console.log(random); // 1에서 10 범위의 정수
    ```
    

## 7. `Math.pow`

- 첫 번째 인수를 밑으로, 두 번째 인수를 지수로 거듭제곱한 결과를 반환
    
    ```jsx
    Math.pow(2, 8);  // -> 256
    Math.pow(2, -1); // -> 0.5
    Math.pow(2);     // -> NaN
    ```
    
- ES7에서 도입된 지수 연산자를 사용
    
    ```jsx
    // ES7 지수 연산자
    2 ** 2 ** 2; // -> 16
    Math.pow(Math.pow(2, 2), 2); // -> 16
    ```
    

## 8. `Math.max`

- 전달받은 인수 중에서 가장 큰 수를 반환
- 인수가 전달되지 않으면 `-Infinity` 반환
    
    ```jsx
    Math.max(1); // -> 1
    Math.max(1, 2); // -> 2
    Math.max(1, 2, 3); // -> 3
    Math.max(); // -> -Infinity
    ```
    
- 배열을 인수로 전달받아 배열의 요소 중에서 최대값 구하기 →  `Function.prototype.apply` 메서드 또는 스프레드 문법 사용
    
    ```jsx
    // 배열 요소 중에서 최대값 취득
    Math.max.apply(null, [1, 2, 3]); // -> 3
    
    // ES6 스프레드 문법
    Math.max(...[1, 2, 3]); // -> 3
    ```
    

## 8. `Math.min`

- 전달받은 인수 중에서 가장 작은 수를 반환
- 인수가 전달되지 않으면 `Infinity` 반환
    
    ```jsx
    Math.min(1); // -> 1
    Math.min(1, 2); // -> 1
    Math.min(1, 2, 3); // -> 1
    Math.min(); // -> Infinity
    ```
    
- 배열을 인수로 전달받아 배열의 요소 중에서 최소값 구하기 →  `Function.prototype.apply` 메서드 또는 스프레드 문법 사용
    
    ```jsx
    // 배열 요소 중에서 최소값 취득
    Math.min.apply(null, [1, 2, 3]); // -> 1
    
    // ES6 스프레드 문법
    Math.min(...[1, 2, 3]); // -> 1
    ```
