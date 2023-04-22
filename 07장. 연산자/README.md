# 07장. 연산자(Operator)

- 하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산 등을 수행
- 피연산자(Operand) : 연산의 대상, 값으로 평가될 수 있는 표현식

```jsx
// 산술 연산자
5 * 4 // -> 20

// 문자열 연결 연산자
'My name is ' + 'Lee' // -> 'My name is Lee'

// 할당 연산자
color = 'red' // -> 'red'

// 비교 연산자
3 > 5 // -> false

// 논리 연산자
true && false // -> false

// 타입 연산자
typeof 'Hi' // -> string
```

# 1. 산술 연산자(Arithmetic Operator)

- 피연산자를 대상으로 수학적 계산을 수행해 새로운 숫자 값 제작
- 산술 연산 불가능 → NaN 반환

## 1. 이항(Binary) 산술 연산자

- 2개의 피연산자 산술 연산
    
    
    | 이항 산술 연산자 | 의미 | 부수 효과 |
    | --- | --- | --- |
    | + | 덧셈 | X |
    | - | 뺄셈 | X |
    | * | 곱셈 | X |
    | / | 나눗셈 | X |
    | % | 나머지 | X |
    
    ```jsx
    5 + 2; // -> 7
    5 - 2; // -> 3
    5 * 2; // -> 10
    5 / 2; // -> 2.5
    5 % 2; // -> 1
    ```
    

## 2. 단항(Unary) 산술 연산자

- 1개의 피연산자 산술 연산
    
    
    | 단항 산술 연산자 | 의미 | 부수 효과 |
    | --- | --- | --- |
    | ++ | 증가 | O |
    | -- | 감소 | O |
    | + | 어떠한 효과도 없음, 음수를 양수로 반전하지도 않음 | X |
    | - | 양수를 음수로, 음수를 양수로 반전한 값을 반환 | X |
    
    ```jsx
    var x = 1;
    
    // ++ 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
    x++; // x = x + 1;
    console.log(x); // 2
    
    // -- 연산자는 피연산자의 값을 변경하는 암묵적 할당이 이뤄진다.
    x--; // x = x - 1;
    console.log(x); // 1
    ```
    
- 피연산자 앞에 위치한 전위 증가/감소 연산자(Prefix Increment/Decrement Operator) : 먼저 피연산자의 값을 증가/감소시킨 후, 다른 연산 수행
- 피연산자 뒤에 위치한 후위 증가/감소 연산자(Postfix Increment/Decrement Operator) : 먼저 다른 연산을 수행한 후 피연산자의 값을 증가/감소시킴
    
    ```jsx
    var x = 5, result;
    
    // 선할당 후증가(postfix increment operator)
    result = x++;
    console.log(result, x); // 5 6
    
    // 선증가 후할당(prefix increment operator)
    result = ++x;
    console.log(result, x); // 7 7
    
    // 선할당 후감소(postfix decrement operator)
    result = x--;
    console.log(result, x); // 7 6
    
    // 선감소 후할당(prefix decrement operator)
    result = --x;
    console.log(result, x); // 5 5
    ```
    
    ```jsx
    // 아무런 효과가 없다.
    +10;    // -> 10
    +(-10); // -> -10
    ```
    
- 숫자 타입이 아닌 피연산자에 `+, -` 단항 연산자 사용 → 피연산자를 숫자 타입으로 변환 후 반환
    
    ```jsx
    var x  = '1';
    
    // 문자열을 숫자로 타입 변환한다.
    console.log(+x); // 1
    // 부수 효과는 없다.
    console.log(x); // "1"
    
    // 불리언 값을 숫자로 타입 변환한다.
    x = true;
    console.log(+x); // 1
    // 부수 효과는 없다.
    console.log(x); // true
    
    // 불리언 값을 숫자로 타입 변환한다.
    x = false;
    console.log(+x); // 0
    // 부수 효과는 없다.
    console.log(x); // false
    
    // 문자열을 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
    x = 'Hello';
    console.log(+x); // NaN
    // 부수 효과는 없다.
    console.log(x); // "Hello"
    ```
    
    ```jsx
    // 부호를 반전한다.
    -(-10); // -> 10
    
    // 문자열을 숫자로 타입 변환한다.
    -'10'; // -> -10
    
    // 불리언 값을 숫자로 타입 변환한다.
    -true; // -> -1
    
    // 문자열은 숫자로 타입 변환할 수 없으므로 NaN을 반환한다.
    -'Hello'; // -> NaN
    ```
    

## 3. 문자열 연결 연산자

- `+` 연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작
    
    ```jsx
    // 문자열 연결 연산자
    '1' + 2; // -> '12'
    1 + '2'; // -> '12'
    
    // 산술 연산자
    1 + 2; // -> 3
    
    // true는 1로 타입 변환된다.
    1 + true; // -> 2
    
    // false는 0으로 타입 변환된다.
    1 + false; // -> 1
    
    // null은 0으로 타입 변환된다.
    1 + null; // -> 1
    
    // undefined는 숫자로 타입 변환되지 않는다.
    +undefined;    // -> NaN
    1 + undefined; // -> NaN
    ```
    
- 암묵적 타입 변환(Implicit Coercion), 타입 강제 변환(Type Coercion) : 자바스크립트 엔진은 암묵적으로 불리언 타입의 값인 true를 숫자 타입인 1로 타입을 강제로 변환한 후 연산 수행

# 2. 할당 연산자(Assignment Operator)

- 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당
    
    
    | 할당 연산자 | 예 | 동일 표현 | 부수 효과 |
    | --- | --- | --- | --- |
    | = | x = 5 | x = 5 | O |
    | += | x += 5 | x = x + 5 | O |
    | -= | x -= 5 | x = x - 5 | O |
    | *= | x *= 5 | x = x * 5 | O |
    | /= | x /= 5 | x = x / 5 | O |
    | %= | x %= 5 | x = x % 5 | O |
    
    ```jsx
    var x;
    
    x = 10;
    console.log(x); // 10
    
    x += 5; // x = x + 5;
    console.log(x); // 15
    
    x -= 5; // x = x - 5;
    console.log(x); // 10
    
    x *= 5; // x = x * 5;
    console.log(x); // 50
    
    x /= 5; // x = x / 5;
    console.log(x); // 10
    
    x %= 5; // x = x % 5;
    console.log(x); // 0
    
    var str = 'My name is ';
    
    // 문자열 연결 연산자
    str += 'Lee'; // str = str + 'Lee';
    console.log(str); // 'My name is Lee'
    ```
    
    ```jsx
    var x;
    
    // 할당문은 표현식인 문이다.
    console.log(x = 10); // 10
    ```
    
- 할당문은 값으로 평가되는 표현식인 문으로서 할당된 값으로 평가
    
    ```jsx
    var a, b, c;
    
    // 연쇄 할당. 오른쪽에서 왼쪽으로 진행.
    // ① c = 0 : 0으로 평가된다
    // ② b = 0 : 0으로 평가된다
    // ③ a = 0 : 0으로 평가된다
    a = b = c = 0;
    
    console.log(a, b, c); // 0 0 0
    ```
    

# 3. 비교 연산자(Comparison Operator)

- 좌항과 우항의 피연산자를 비교한 다음 그 결과를 불리언 값으로 반환

## 1. 동등(Loose Equality) / 일치(Strict Equality) 비교 연산자

- 좌항과 우항의 피연산자가 같은 값으로 평가되는지 비교해 불리언 값을 반환
- 동등 비교 : 느슨한 비교
- 일치 비교 : 엄격한 비교
    
    
    | 비교 연산자 | 의미 | 사례 | 설명 | 부수 효과 |
    | --- | --- | --- | --- | --- |
    | == | 동등 비교 | x == y | x와 y의 값이 같음 | X |
    | === | 일치 비교 | x === y | x와 y의 값과 타입이 같음 | X |
    | != | 부동등 비교 | x ≠ y | x와 y의 값이 다름 | X |
    | !== | 불일치 비교 | x ≠= y | x와 y의 값과 타입이 다름 | X |
- 동등 비교 연산자는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후 같은 값인지 비교
    
    ```jsx
    // 동등 비교
    5 == 5; // -> true
    
    // 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 동등하다.
    5 == '5'; // -> true
    ```
    
    ```jsx
    // 동등 비교. 결과를 예측하기 어렵다.
    '0' == ''; // -> false
    0 == ''; // -> true
    0 == '0'; // -> true
    false == 'false'; // -> false
    false == '0'; // -> true
    false == null; // -> false
    false == undefined; // -> false
    ```
    
- 일치 비교 연산자는 좌항과 우항의 피연산자가 타입도 같고 값도 같은 경우에 한하여 true 반환
    
    ```jsx
    // 일치 비교
    5 === 5; // -> true
    
    // 암묵적 타입 변환을 하지 않고 값을 비교한다.
    // 즉, 값과 타입이 모두 같은 경우만 true를 반환한다.
    5 === '5'; // -> false
    ```
    
    ```jsx
    // NaN은 자신과 일치하지 않는 유일한 값이다.
    NaN === NaN; // -> false
    ```
    
- NaN은 자신과 일치하지 않는 유일한 값
    
    ```jsx
    // Number.isNaN 함수는 지정한 값이 NaN인지 확인하고 그 결과를 불리언 값으로 반환한다.
    Number.isNaN(NaN); // -> true
    Number.isNaN(10);  // -> false
    Number.isNaN(1 + undefined); // -> true
    ```
    
    ```jsx
    // 양의 0과 음의 0의 비교. 일치 비교/동등 비교 모두 결과는 true이다.
    0 === -0; // -> true
    0 == -0; // -> true
    ```
    
- `Object.is` 메서드 : 예측 가능한 정확한 비교 결과 반환, `===` 와 동일하게 동작
    
    ```jsx
    -0 === +0; // -> true
    Object.is(-0, +0); // -> false
    
    NaN === NaN;  // -> false
    Object.is(NaN, NaN); // -> true
    ```
    
    ```jsx
    // 부동등 비교
    5 != 8;   // -> true
    5 != 5;   // -> false
    5 != '5'; // -> false
    
    // 불일치 비교
    5 !== 8;   // -> true
    5 !== 5;   // -> false
    5 !== '5'; // -> true
    ```
    

## 2. 대소 관계 비교 연산자

- 피연산자의 크기를 비교하여 불리언 값을 반환
    
    
    | 대소 관계 비교 연산자 | 예제 | 설명 | 부수 효과 |
    | --- | --- | --- | --- |
    | > | x > y | x가 y보다 크다 | X |
    | < | x < y | x가 y보다 작다 | X |
    | >= | x ≥ y | x가 y보다 크거나 같다 | X |
    | <= | x ≤ y | x가 y보다 작거나 같다 | X |
    
    ```jsx
    // 대소 관계 비교
    5 > 0; // -> true
    5 > 5; // -> false
    5 >= 5; // -> true
    5 <= 5; // -> true
    ```
    

# 4. 삼항 조건 연산자(Ternary Operator)

- 조건식의 평가 결과에 따라 반환할 값을 결정
- `조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값`
    
    ```jsx
    var x = 2;
    
    // 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
    var result = x % 2 ? '홀수' : '짝수';
    
    console.log(result); // 짝수
    ```
    
    ```jsx
    var x = 2, result;
    
    // 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
    if (x % 2) result = '홀수';
    else result = '짝수';
    
    console.log(result); // 짝수
    ```
    
    ```jsx
    var x = 10;
    
    // if...else 문은 표현식이 아닌 문이다. 따라서 값처럼 사용할 수 없다.
    var result = if (x % 2) { result = '홀수'; } else { result = '짝수'; };
    // SyntaxError: Unexpected token if
    ```
    
- 삼항 조건 연산자 표현식은 값으로 평가할 수 있는 표현식인 문
    
    ```jsx
    var x = 10;
    
    // 삼항 조건 연산자 표현식은 표현식인 문이다. 따라서 값처럼 사용할 수 있다.
    var result = x % 2 ? '홀수' : '짝수';
    console.log(result); // 짝수
    ```
    

# 5. 논리 연산자(Logical Operator)

- 우항과 좌항의 피연산자(부정 논리 연산자의 경우 우항의 피연산자)를 논리 연산
    
    
    | 논리 연산자 | 의미 | 부수 효과 |
    | --- | --- | --- |
    | || | 논리합(OR) | X |
    | && | 논리곱(AND) | X |
    | ! | 부정(NOT) | X |
    
    ```jsx
    // 논리합(||) 연산자
    true || true; // -> true
    true || false; // -> true
    false || true; // -> true
    false || false; // -> false
    
    // 논리곱(&&) 연산자
    true && true; // -> true
    true && false; // -> false
    false && true; // -> false
    false && false; // -> false
    
    // 논리 부정(!) 연산자
    !true; // -> false
    !false; // -> true
    ```
    
- 언제나 불리언 값 반환
    
    ```jsx
    // 암묵적 타입 변환
    !0; // -> true
    !'Hello'; // -> false
    ```
    
    ```jsx
    // 단축 평가
    'Cat' && 'Dog'; // -> 'Dog'
    ```
    
- 드 모르간의 법칙
    
    ```jsx
    !(x || y) === (!x && !y)
    !(x && y) === (!x || !y)
    ```
    

# 6. 쉼표 연산자

- 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환
    
    ```jsx
    var x, y, z;
    
    x = 1, y = 2, z = 3; // 3
    ```
    

# 7. 그룹 연산자

- 소괄호(`()`)로 피연산자를 감싸는 그룹 연산자는 자신의 피연산자인 표현식을 가장 먼저 평가
- 연산자의 우선순위 조절 가능
    
    ```jsx
    10 * 2 + 3; // -> 23
    
    // 그룹 연산자를 사용하여 우선순위를 조절
    10 * (2 + 3); // -> 50
    ```
    

# 8. `typeof` 연산자

- 피연산자의 데이터 타입을 문자열로 반환
    
    ```jsx
    typeof '' // -> "string"
    typeof 1 // -> "number"
    typeof NaN // -> "number"
    typeof true // -> "boolean"
    typeof undefined // -> "undefined"
    typeof Symbol() // -> "symbol"
    typeof null // -> "object"
    typeof [] // -> "object"
    typeof {} // -> "object"
    typeof new Date() // -> "object"
    typeof /test/gi // -> "object"
    typeof function () {} // -> "function"
    ```
    
- typeof 연산자로 null값 연산 시 “null”이 아닌 “object”를 반환
    
    ```jsx
    var foo = null;
    
    typeof foo === null; // -> false
    foo === null; // -> true
    ```
    
- 선언하지 않은 식별자를 typeof 연산자로 연산 시 ReferenceError가 발생하지 않고 undefined 반환
    
    ```jsx
    // undeclared 식별자를 선언한 적이 없다.
    typeof undeclared; // -> undefined
    ```
    

# 9. 지수 연산자

- 좌항의 피연산자를 밑(Base)으로, 우항의 피연산자를 지수(Exponent)로 거듭 제곱하여 숫자 값을 반환
    
    ```jsx
    2 ** 2; // -> 4
    2 ** 2.5; // -> 5.65685424949238
    2 ** 0; // -> 1
    2 ** -2; // -> 0.25
    ```
    
- `Math.pow` 메서드도 동일한 결과 반환
    
    ```jsx
    Math.pow(2, 2); // -> 4
    Math.pow(2, 2.5); // -> 5.65685424949238
    Math.pow(2, 0); // -> 1
    Math.pow(2, -2); // -> 0.25
    ```
    
    ```jsx
    // 지수 연산자의 결합 순서는 우항에서 좌항이다. 즉, 우결합성을 갖는다.
    2 ** (3 ** 2); // -> 512
    Math.pow(2, Math.pow(3, 2)); // -> 512
    ```
    
    ```jsx
    -5 ** 2;
    // SyntaxError: Unary operator used immediately before exponentiation expression.
    // Parenthesis must be used to disambiguate operator precedence
    
    (-5) ** 2; // -> 25
    ```
    
    ```jsx
    var num = 5;
    num **= 2; // -> 25
    ```
    
- 이항 연산자 중에서 우선순위가 가장 높음
    
    ```jsx
    2 * 5 ** 2; // -> 50
    ```
    

# 10. 그 외의 연산자

| 연산자 | 개요 |
| --- | --- |
| ?. | 옵셔널 체이닝 연산자 |
| ?? | null 병합 연산자 |
| delete | 프로퍼티 삭제 |
| new | 생성자 함수를 호출할 때 사용하여 인스턴스를 생성 |
| instanceof | 좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스인지 판별 |
| in | 프로퍼티 존재 확인 |

# 11. 연산자의 부수 효과

- 할당 연산자, 증가 / 감소 연산자, `delete` 연산자는 부수 효과 보유
    
    ```jsx
    var x;
    
    // 할당 연산자는 변수 값이 변하는 부수 효과가 있다.
    // 이는 x 변수를 사용하는 다른 코드에 영향을 준다.
    x = 1;
    console.log(x); // 1
    
    // 증가/감소 연산자(++/--)는 피연산자의 값을 변경하는 부수 효과가 있다.
    // 피연산자 x의 값이 재할당되어 변경된다. 이는 x 변수를 사용하는 다른 코드에 영향을 준다.
    x++;
    console.log(x); // 2
    
    var o = { a: 1 };
    
    // delete 연산자는 객체의 프로퍼티를 삭제하는 부수 효과가 있다.
    // 이는 o 객체를 사용하는 다른 코드에 영향을 준다.
    delete o.a;
    console.log(o); // {}
    ```
    

# 12. 연산자 우선순위

| 우선순위` | 연산자 |
| --- | --- |
| 1 | () |
| 2 | new(매개변수 존재), . , [](프로퍼티 접근) , ()(함수 호출) , ?.(옵셔널 체이닝 연산자) |
| 3 | new(매개변수 존재) |
| 4 | x++, x-- |
| 5 | !x, +x, -x, ++x, --x, typeof, delete |
| 6 | **(이항 연산자 중에서 우선순위가 가장 높음) |
| 7 | *, /, % |
| 8 | +, - |
| 9 | <, <=, >, >=, in, instanceof |
| 10 | ==, !=, ===, !== |
| 11 | ??(null 병합 연산자) |
| 12 | && |
| 13 | || |
| 14 | ~ ? ~ : ~ |
| 15 | 할당 연산자(=, +=, -=, …) |
| 16 | , |

```jsx
// 그룹 연산자를 사용하여 우선순위를 명시적으로 조절
10 * (2 + 3); // -> 50
```

# 13. 연산자 결합 순서

| 결합 순서 | 연산자 |
| --- | --- |
| 좌항 → 우항 | +, -, /, %, <, <=, >, >=, &&, ||, ., [], (), ??, ?., in, instanceof |
| 우항 → 좌항 | ++, --, 할당 연산자, !x, +x, -x, ++x, --x, typeof, delete, ~ ? ~ : ~`, ** |
