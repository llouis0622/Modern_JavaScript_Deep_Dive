# 42장. 비동기 프로그래밍

# 1. 동기 처리와 비동기 처리

```jsx
const foo = () => {};
const bar = () => {};

foo();
bar();
```

- 자바스크립트 엔진 → 단 하나의 실행 컨텍스트 스택을 가짐
- 한 번에 하나의 태스크만 실행할 수 있는 싱글 스레드 방식으로 동작
- 처리에 시간이 걸리는 태스크를 실행하는 경우 블로킹이 발생
    
    ```jsx
    // sleep 함수는 일정 시간(delay)이 경과한 이후에 콜백 함수(func)를 호출한다.
    function sleep(func, delay) {
      // Date.now()는 현재 시간을 숫자(ms)로 반환한다.("30.2.1. Date.now" 참고)
      const delayUntil = Date.now() + delay;
    
      // 현재 시간(Date.now())에 delay를 더한 delayUntil이 현재 시간보다 작으면 계속 반복한다.
      while (Date.now() < delayUntil);
      // 일정 시간(delay)이 경과한 이후에 콜백 함수(func)를 호출한다.
      func();
    }
    
    function foo() {
      console.log('foo');
    }
    
    function bar() {
      console.log('bar');
    }
    
    // sleep 함수는 3초 이상 실행된다..
    sleep(foo, 3 * 1000);
    // bar 함수는 sleep 함수의 실행이 종료된 이후에 호출되므로 3초 이상 블로킹된다.
    bar();
    // (3초 경과 후) foo 호출 -> bar 호출
    ```
    
- 동기 처리(Synchronous) : 현재 실행 중인 태스크가 종료할 때까지 다음에 실행될 태스크가 대기하는 방식
    - 실행 순서 보장
    - 앞선 태스크가 종료할 때까지 이후 태스크들이 블로킹
    
    ```jsx
    function foo() {
      console.log('foo');
    }
    
    function bar() {
      console.log('bar');
    }
    
    // 타이머 함수 setTimeout은 일정 시간이 경과한 이후에 콜백 함수 foo를 호출한다.
    // 타이머 함수 setTimeout은 bar 함수를 블로킹하지 않는다.
    setTimeout(foo, 3 * 1000);
    bar();
    // bar 호출 -> (3초 경과 후) foo 호출
    ```
    
- 비동기 처리(Asynchronous) : 현재 실행 중인 태스크가 종료 되지 않은 상태라 해도 다음 태스크를 곧바로 실행하는 방식
    - 블로킹이 발생하지 않음
    - 태스크의 실행 순서가 보장되지 않음
- 타이머 함수인 `setTimeout` , `setInteval` , HTTP 요청, 이벤트 핸들러 → 비동기 처리 방식으로 동작

# 2. 이벤트 루프와 태스크 큐

- 이벤트 루프(Event Loop) : 자바스크립트의 동시성을 지원하는 것
- 콜 스택(Call Stack) : 소스코드 평가 과정에서 생성된 실행 컨텍스트가 추가되고 제거되는 스택 자료구조인 실행 컨텍스트 스택
    - 최상위 실행 컨텍스트가 종료되어 콜 스택에서 제거되기 전까지는 다른 어떤 태스크도 실행되지 않음
- 힙(Heap) : 객체가 저장되는 메모리 공간
    - 콜 스택의 요소인 실행 컨텍스트는 힙에 저장된 객체를 참조함
    - 객체가 저장되는 메모리 공간인 힙은 구조화되어 있지 않음
- 태스크 큐(Task Queue) : 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역
    - 별도로 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 마이크로태스크 큐 존재
- 이벤트 루프(Event Loop) : 콜 스택에 현재 실행 중인 실행 컨텍스트가 있는지, 태스크 큐에 대기 중인 함수가 있는지 반복해서 확인
    - 콜 스택이 비어 있고 태스크 큐에 대기 중인 함수가 존재 → 이벤트 루프는 순차적으로 태스크 큐에 대기 중인 함수를 콜 스택으로 이동
    
    ```jsx
    function foo() {
      console.log('foo');
    }
    
    function bar() {
      console.log('bar');
    }
    
    setTimeout(foo, 0); // 0초(실제는 4ms) 후에 foo 함수가 호출된다.
    bar();
    ```
    
- 전역 코드 및 명시적으로 호출된 함수가 모두 종료 → 콜 스택에 푸시되어 실행
