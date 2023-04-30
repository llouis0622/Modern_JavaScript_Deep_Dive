# 14장. 전역 변수의 문제점

# 1. 변수의 생명 주기

## 1. 지역 변수의 생명 주기

- 전역 변수의 생명 주기는 애플리케이션의 생명 주기와 동일
    
    ```jsx
    function foo() {
      var x = 'local';
      console.log(x); // local
      return x;
    }
    
    foo();
    console.log(x); // ReferenceError: x is not define
    ```
    
- 지역 변수의 생명 주기는 함수의 생명 주기와 일치
- 변수의 생명 주기는 메모리 공간이 확보된 시점부터 메모리 공간이 해제되어 가용 메모리 풀에 반환되는 시점
    
    ```jsx
    var x = 'global';
    
    function foo() {
      console.log(x); // undefined
      var x = 'local';
    }
    
    foo();
    console.log(x); // global
    ```
    
- 호이스팅은 스코프 댠위로 동작
- 호이스팅 : 변수 선언이 스코프의 선두로 끌어 올려진 것처럼 동작

## 2. 전역 변수의 생명 주기

- 전역 객체(Global Object) : 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체
- `var` 키워드로 선언한 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치

# 2. 전역 변수의 문제점

## 1. 암묵적 결합(Implicit Coupling)

- 코드 어디서든 참조하고 할당할 수 있는 변수 사용
- 모든 코드가 전역 변수를 참조하고 변경 가능

## 2. 긴 생명 주기

- 전역 변수 → 긴 생명 주기
- 메모리 리소스 → 오랜 기간 소비
    
    ```jsx
    var x = 1;
    
    // ...
    
    // 변수의 중복 선언. 기존 변수에 값을 재할당한다.
    var x = 100;
    console.log(x); // 100
    ```
    

## 3. 스코프 체인 상에서 종점에 존재

- 전역 변수의 검색 속도가 가장 느림

## 4. 네임스페이스 오염

- 파일 분리 → 하나의 전역 스코프 공유

# 3. 전역 변수의 사용을 억제하는 방법

- 전역 변수를 반드시 사용해야 할 이유를 찾지 못한다면 지역 변수를 사용
- 변수의 스코프는 좁을수록 좋음

## 1. 즉시 실행 함수

- 모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 됨
    
    ```jsx
    (function () {
      var foo = 10; // 즉시 실행 함수의 지역 변수
      // ...
    }());
    
    console.log(foo); // ReferenceError: foo is not defined
    ```
    
- 라이브러리 등에 자주 사용

## 2. 네임스페이스 객체

- 전역에 네임스페이스 역할을 담당할 객체를 생성하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가
    
    ```jsx
    var MYAPP = {}; // 전역 네임스페이스 객체
    
    MYAPP.name = 'Lee';
    
    console.log(MYAPP.name); // Lee
    ```
    
- 네임스페이스 객체에 또 다른 네임스페이스 객체를 프로퍼티로 추가해서 네임스페이스를 계층적으로 구성
    
    ```jsx
    var MYAPP = {}; // 전역 네임스페이스 객체
    
    MYAPP.person = {
      name: 'Lee',
      address: 'Seoul'
    };
    
    console.log(MYAPP.person.name); // Lee
    ```
    

## 3. 모듈 패턴

- 클래스를 모방해서 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만듦
- 전역 변수의 억제는 물론 캡슐화까지 구현 가능
- 캡슐화(Encapsulation) : 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것
    - 정보 은닉(Information Hiding) : 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용
    
    ```jsx
    var Counter = (function () {
      // private 변수
      var num = 0;
    
      // 외부로 공개할 데이터나 메서드를 프로퍼티로 추가한 객체를 반환한다.
      return {
        increase() {
          return ++num;
        },
        decrease() {
          return --num;
        }
      };
    }());
    
    // private 변수는 외부로 노출되지 않는다.
    console.log(Counter.num); // undefined
    
    console.log(Counter.increase()); // 1
    console.log(Counter.increase()); // 2
    console.log(Counter.decrease()); // 1
    console.log(Counter.decrease()); // 0
    ```
    

## 4. ES6 모듈

- 파일 자체의 독자적인 모듈 스코프 제공
    
    ```jsx
    <script type="module" src="lib.mjs"></script>
    <script type="module" src="app.mjs"></script>
    ```
