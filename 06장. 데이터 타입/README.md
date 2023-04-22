# 06장. 데이터 타입(Data Type)

- 값의 종류
- 7개의 데이터 타입 : 6개의 원시 타입(Primitive Type) + 1개의 객체 타입(Object/Reference Type)
    
    ![1.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7e0cca63-1a13-427f-9d48-368fb851a15a/1.png)
    

# 1. 숫자 타입

- 배정밀도 64비트 부동소수점 형식
- 모든 수를 실수로 처리
    
    ```jsx
    // 모두 숫자 타입이다.
    var integer = 10;    // 정수
    var double = 10.12;  // 실수
    var negative = -20;  // 음의 정수
    ```
    
- 모두 10진수로 해석
    
    ```jsx
    var binary = 0b01000001; // 2진수
    var octal = 0o101;       // 8진수
    var hex = 0x41;          // 16진수
    
    // 표기법만 다를 뿐 모두 같은 값이다.
    console.log(binary); // 65
    console.log(octal);  // 65
    console.log(hex);    // 65
    console.log(binary === octal); // true
    console.log(octal === hex);    // true
    ```
    
- 정수로 표시되는 수끼리 나눠도 실수로 나옴
    
    ```jsx
    // 숫자 타입은 모두 실수로 처리된다.
    console.log(1 === 1.0); // true
    console.log(4 / 2);     // 2
    console.log(3 / 2);     // 1.5
    ```
    
- 특별한 값 표현 가능
    - `Infinity` : 양의 무한대
    - `-Infinity` : 음의 무한대
    - `NaN` : 산술 연산 불가(Not-A-Number)
    
    ```jsx
    // 숫자 타입의 세 가지 특별한 값
    console.log(10 / 0);       // Infinity
    console.log(10 / -0);      // -Infinity
    console.log(1 * 'String'); // NaN
    ```
    
- 대소문자 구별(Case-Sensitive)
    
    ```jsx
    // 자바스크립트는 대소문자를 구별한다.
    var x = nan; // ReferenceError: nan is not defined
    ```
    

# 2. 문자열 타입

- 텍스트 데이터를 표현
- 16비트 유니코드 문자(UTF-16)의 집합
- 작은따옴표, 큰따옴표, 백틱 사용
    
    ```jsx
    // 문자열 타입
    var string;
    string = '문자열'; // 작은따옴표
    string = "문자열"; // 큰따옴표
    string = `문자열`; // 백틱 (ES6)
    
    string = '작은따옴표로 감싼 문자열 내의 "큰따옴표"는 문자열로 인식된다.';
    string = "큰따옴표로 감싼 문자열 내의 '작은따옴표'는 문자열로 인식된다.";
    ```
    
    ```jsx
    // 따옴표로 감싸지 않은 hello를 식별자로 인식한다.
    var string = hello; // ReferenceError: hello is not defined
    ```
    
- 원시 타입, 변경 불가능한 값(Immutable Value)
- 문자열이 생성되면 그 문자열을 변경할 수 없음

# 3. 템플릿 리터럴(Template Literal)

- 멀티라인 문자열(Multi-Line String), 표현식 삽입(Expression Interpolation), 태그드 템플릿(Tagged Template) 등 편리한 문자열 처리 기능 제공
- 백틱 사용
    
    ```jsx
    var template = `Template literal`;
    console.log(template); // Template literal
    ```
    

## 1. 멀티라인 문자열

```jsx
var str = 'Hello
world.';
// SyntaxError: Invalid or unexpected token
```

- 일반 문자열 내의 줄바꿈 등의 공백 표현 → 이스케이프 시퀀스(Escape Sequence)
    
    
    | \0 | Null |
    | --- | --- |
    | \b | 백스페이스 |
    | \f | 폼 피드(Form Feed) : 프린터로 출력할 경우 다음 페이지의 시작 지점으로 이동 |
    | \n | 개행(LF, Line Feed) : 다음 행으로 이동 |
    | \r | 개행(CR, Carrige Return) : 커서를 처음으로 이동 |
    | \t | 탭(수평) |
    | \v | 탭(수직) |
    | \uXXXX | 유니코드 |
    | \’ | 작은따옴표 |
    | \” | 큰따옴표 |
    | \\ | 백슬래시 |
    
    ```jsx
    var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';
    
    console.log(template);
    /*
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
    */
    ```
    
- 템플릿 리터럴 → 이스케이프 시퀀스를 사용하지 않고도 줄바꿈 허용, 모든 공백도 있는 그대로 적용
    
    ```jsx
    var template = `<ul>
      <li><a href="#">Home</a></li>
    </ul>`;
    
    console.log(template);
    /*
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
    */
    ```
    

## 2. 표현식 삽입

- 문자열 연산자(`+`) 사용해 연결
    
    ```jsx
    var first = 'Ung-mo';
    var last = 'Lee';
    
    // ES5: 문자열 연결
    console.log('My name is ' + first + ' ' + last + '.'); // My name is Ung-mo Lee.
    ```
    
- 표현식 삽입(Expression Interpolation)
- `${}` 로 표현식을 감싸서 표현
    
    ```jsx
    var first = 'Ung-mo';
    var last = 'Lee';
    
    // ES6: 표현식 삽입
    console.log(`My name is ${first} ${last}.`); // My name is Ung-mo Lee.
    ```
    
    ```jsx
    console.log(`1 + 2 = ${1 + 2}`); // 1 + 2 = 3
    ```
    
    ```jsx
    console.log('1 + 2 = ${1 + 2}'); // 1 + 2 = ${1 + 2}
    ```
    

# 4. 불리언 타입

- 논리적 참, 거짓을 나타내는 true와 false
    
    ```jsx
    var foo = true;
    console.log(foo); // true
    
    foo = false;
    console.log(foo); // false
    ```
    

# 5. `undefined` 타입

```jsx
var foo;
console.log(foo); // undefined
```

- 개발자가 의도적으로 할당하기 위한 값이 아니라 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값

# 6. `null` 타입

- 변수에 값이 없다는 것을 의도적으로 명시(의도적 부재, Intentional Absence)할 때 사용
    
    ```jsx
    var foo = 'Lee';
    
    // 이전에 할당되어 있던 값에 대한 참조를 제거. foo 변수는 더 이상 'Lee'를 참조하지 않는다.
    // 유용해 보이지는 않는다. 변수의 스코프를 좁게 만들어 변수 자체를 재빨리 소멸시키는 편이 낫다.
    foo = null;
    ```
    
- 함수가 유효한 값을 반환할 수 없는 경우 명시적으로 `null` 반환
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        var element = document.querySelector('.myClass');
    
        // HTML 문서에 myClass 클래스를 갖는 요소가 없다면 null을 반환한다.
        console.log(element); // null
      </script>
    </body>
    </html>
    ```
    

# 7. 심벌 타입(Symbol Type)

- 변경 불가능한 원시 타입의 값
- 주로 이름이 충돌할 위험이 없는 객체의 유일한 프로퍼티 키를 만들기 위해 사용
- `Symbol` 함수를 호출해 생성
    
    ```jsx
    // 심벌 값 생성
    var key = Symbol('key');
    console.log(typeof key); // symbol
    
    // 객체 생성
    var obj = {};
    
    // 이름이 충돌할 위험이 없는 유일무이한 값인 심벌을 프로퍼티 키로 사용한다.
    obj[key] = 'value';
    console.log(obj[key]); // value
    ```
    

# 8. 객체 타입

- 자바스크립트를 이루고 있는 거의 모든 것이 객체
- 원시 타입과 객체 타입은 근본적으로 다름

# 9. 데이터 타입의 필요성

## 1. 데이터 타입에 의한 메모리 공간의 확보와 참조

```jsx
var score = 100;
```

- 변수에 할당되는 값의 데이터 타입에 따라 확보해야 할 메모리 공간의 크기 결정

## 2. 데이터 타입에 의한 값의 해석

- 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정
- 값을 참조할 때 한 번에 읽어 들여야 할 메모리 공간의 크기를 결정
- 메모리에서 읽어 들인 2진수를 어떻게 해석할지 결정

# 10. 동적 타이핑

## 1. 동적 타입 언어와 정적 타입 언어

- 정적 타입 언어(Static/Strong Type)
    - 변수를 선언할 때 변수에 할당할 수 있는 값의 종류 → 데이터 타입을 사전에 선언
    - 명시적 타입 선언(Explicit Type Declaration)
    
    ```cpp
    // c 변수에는 1바이트 정수 타입의 값(-128 ~ 127)만을 할당할 수 있다.
    char c;
    
    // num 변수에는 4바이트 정수 타입의 값(-2,124,483,648 ~ 2,124,483,647)만을 할당할 수 있다.
    int num;
    ```
    
    - 변수 타입을 변경할 수 없음
    - 변수에 선언한 타입에 맞는 값만 할당할 수 있음
    - 컴파일 시점에 타입 체크(선언한 데이터 타입에 맞는 값을 할당했는지 검사하는 처리) 수행
    - C, C++, 자바, 코틀린, 고, 하스켈, 러스트, 스칼라 등
- 동적 타입 언어(Dynamic/Weak Type)
    - 변수를 선언할 때 타입 선언 X
    
    ```jsx
    var foo;
    console.log(typeof foo);  // undefined
    
    foo = 3;
    console.log(typeof foo);  // number
    
    foo = 'Hello';
    console.log(typeof foo);  // string
    
    foo = true;
    console.log(typeof foo);  // boolean
    
    foo = null;
    console.log(typeof foo);  // object
    
    foo = Symbol(); // 심벌
    console.log(typeof foo);  // symbol
    
    foo = {}; // 객체
    console.log(typeof foo);  // object
    
    foo = []; // 배열
    console.log(typeof foo);  // object
    
    foo = function () {}; // 함수
    console.log(typeof foo);  // function
    ```
    
    - 변수는 선언이 아닌 할당에 의해 타입이 결정(타입 추론)
    - 동적 타이핑(Dynamic Typing) : 재할당에 의해 변수의 타입은 언제든지 동적으로 변함
    - 자바스크립트, 파이썬, PHP, 루비, 리스프, 펄 등

## 2. 동적 타입 언어와 변수

- 변수 값은 언제든지 변경 → 복잡한 프로그램에서는 변화하는 변수 값 추적 어려움
- 동적 타입 언어의 변수는 값을 확인하기 전에는 타입 확신 불가
- 개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입 자동 변환

## 3. 변수를 사용할 때 주의 사항

- 꼭 필요한 경우에 한해 제한적으로 사용
- 유효 범위(스코프)는 최대한 좁게 만들어 변수의 부작용 억제
- 전역 변수 최대한 사용 금지
- 상수를 사용해 값의 변경 억제
- 변수 이름은 목적이나 의미를 파악할 수 있도록 네이밍
