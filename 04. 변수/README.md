# 04장. 변수

# 1. 변수란 무엇인가? 왜 필요한가?

```jsx
10 + 20
```

- 기호의 의미 파악 : 리터럴(Literal)과 연산자(Operator)
- 식의 의미 해석 가능 : 표현식(Expression) 파싱(Parsing)
- 메모리(Memory) : 데이터를 저장할 수 있는 메모리 셀(Memory Cell)의 집합체
    - 메모리 셀 : 1바이트(8비트)
        - 메모리 주소(Memory Address) 보유
    - 데이터의 종류(숫자, 텍스트, 이미지, 동영상 등)와 상관없이 모두 2진수로 저장
- 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 또는 그 메모리 공간을 식별하기 위해 붙인 이름
- 값의 위치를 가리키는 상징적인 이름

```jsx
// 변수는 하나의 값을 저장하기 위한 수단이다.
var userId = 1;
var userName = 'Lee';

// 객체나 배열 같은 자료구조를 사용하면 여러 개의 값을 하나로 그룹화해서 하나의 값처럼 사용할 수 있다.
var user = { id: 1, name: 'Lee' };

var users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' }
];
```

```jsx
var result = 10 + 20;
```

- 변수 이름 : 메모리 공간에 저장된 값을 식별할 수 있는 고유한 이름
- 변수 값 : 변수에 저장된 값
- 할당(Assignment) : 변수에 값을 저장하는 것
- 참조(Reference) : 변수에 저장된 값을 읽어 들이는 것

# 2. 식별자(Identifier)

- 어떤 값을 구별해서 식별할 수 있는 고유한 이름
- 값이 아닌 메모리 주소 기억

# 3. 변수 선언(Variable Declaration)

- 값을 저장하기 위한 메모리 공간을 확보하고 변수 이름과 확보된 메모리 공간의 주소를 연결해서 값을 저장할 수 있게 준비하는 것
- 변수 사용 시 반드시 선언 필요
- `var, let, const` 키워드 사용
    
    ```jsx
    var score; // 변수 선언(변수 선언문)
    ```
    
- `undefined` 값 암묵적으로 할당되어 초기화 : 자바스크립트에서 제공하는 원시 타입의 값(Primitive Value)
- 선언 단계 : 변수 이름을 등록해서 자바스크립트 엔진에 변수의 존재 알림
- 초기화 단계 : 값을 저장하기 위한 메모리 공간 확보 및 암묵적으로 `undefined` 할당해 초기화

# 4. 변수 선언의 실행 시점과 변수 호이스팅

```jsx
console.log(score); // undefined

var score; // 변수 선언문
```

- 변수 선언이 소스코드가 한 줄씩 순차적으로 실행되는 시점 → 런타임이 아닌 그 이전 단계에서 먼저 실행
- 변수 호이스팅(Variable Hoisting) : 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트 고유의 특징
- `var, let, const, function, function*, class` 키워드 → 모두 호이스팅 가능

# 5. 값의 할당

- 할당 연산자 `=`  사용
    
    ```jsx
    var score;  // 변수 선언
    score = 80; // 값의 할당
    ```
    
    ```jsx
    var score = 80; // 변수 선언과 값의 할당
    ```
    
- 소스코드가 순차적으로 실행되는 시점인 런타임에 실행
    
    ```jsx
    console.log(score); // undefined
    
    var score;  // ① 변수 선언
    score = 80; // ② 값의 할당
    
    console.log(score); // 80
    ```
    
    ```jsx
    console.log(score); // undefined
    
    var score = 80;     // 변수 선언과 값의 할당
    
    console.log(score); // 80
    ```
    
    ```jsx
    console.log(score); // undefined
    
    score = 80; // 값의 할당
    var score;  // 변수 선언
    
    console.log(score); // 80
    ```
    

# 6. 값의 재할당

```jsx
var score = 80; // 변수 선언과 값의 할당
score = 90;     // 값의 재할당
```

- `var` 키워드로 선언한 변수 → 재할당 가능
- 값을 재할당할 수 없어서 변수에 저장된 값을 변경할 수 없다면 변수가 아닌 상수(Constant)
- 가비지 콜렉터(Garbage Collector)에 의해 불필요한 값 메모리에서 자동 해제
    - 더 이상 사용하지 않는 메모리 해제(Release)
    - 어떤 식별자도 참조하지 않는 메모리 공간
    - 메모리 누수(Memory Leak) 방지

# 💭. 언매니지드 언어 & 매니지드 언어

- 언매니지드 언어(Unmanaged Language)
    - 명시적으로 메모리를 할당하도 해제
    - 저수준 메모리 제어 기능 제공
- 매니지드 언어(Managed Language)
    - 메모리의 할당 및 해제를 위한 메모리 관리 기능을 언어 차원에서 담당
    - 개발자의 직접적인 메모리 제어 허용 불가

# 7. 식별자 네이밍 규칙

- 특수문자를 제외한 문자, 숫자, 언더스코어 `_` , 달러 기호 `$` 포함 가능
- 특수문자를 제외한 문자, 언더스코어 `_` , 달러 기호 `$` 로 시작, 숫자 시작 불가
- 예약어 식별자 사용 불가
    
    
    | await | break | case | catch | class | const |
    | --- | --- | --- | --- | --- | --- |
    | continue | debugger | default | delete | do | else |
    | enum | export | extends | false | finally | for |
    | function | if | implements* | import | in | instanceof |
    | interface* | let* | new | null | package* | private* |
    | protected* | public* | return | super | static* | switch |
    | this | throw | true | try | typeof | var |
    | void | while | with | yield* |  |  |

```jsx
var person, $elem, _name, first_name, val1;
```

```jsx
var 이름, なまえ;
```

```jsx
var first-name; // SyntaxError: Unexpected token –
var 1st;        // SyntaxError: Invalid or unexpected token
var this;       // SyntaxError: Unexpected token this
```

```jsx
var firstname;
var firstName;
var FIRSTNAME;
```

```jsx
var x = 3;       // NG. x 변수가 의미하는 바를 알 수 없다.
var score = 100; // OK. score 변수는 점수를 의미한다.
```

```jsx
// 경과 시간. 단위는 날짜다
var d;                 // NG

var elapsedTimeInDays; // OK
```

- 네이밍 컨벤션(Naming Convention) : 하나 이상의 영어 단어로 구성된 식별자를 만들 때 가독성 좋게 단어를 한눈에 구분하기 위한 규정한 명명 규칙
    
    ```jsx
    // 카멜 케이스 (camelCase)
    var firstName;
    
    // 스네이크 케이스 (snake_case)
    var first_name;
    
    // 파스칼 케이스 (PascalCase)
    var FirstName;
    
    // 헝가리언 케이스 (typeHungarianCase)
    var strFirstName; // type + identifier
    var $elem = document.getElementById('myId'); // DOM 노드
    var observable$ = fromEvent(document, 'click'); // RxJS 옵저버블
    ```
    
- 일반적으로 변수나 함수 이름 → 카멜 케이스 사용
- 생성자 함수, 클래스 이름 → 파스칼 케이스 사용
