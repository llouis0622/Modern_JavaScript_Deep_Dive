# 41장. 타이머

# 1. 호출 스케줄링

- 함수를 명시적으로 호출하면 함수가 즉시 실행
- 함수를 명시적으로 호출하지 않고 일정 시간이 경과된 이후에 호출되도록 함수 호출 예약 → 타이머 함수 사용
- 타이머를 생성할 수 있는 타이머 함수 : `setTimeout` , `setInterval`
- 타이머를 제거할 수 있는 타이머 함수 : `clearTimeout` , `clearInterval`
- 모두 일정 시간이 경과된 이후 콜백 함수가 호출되도록 타이머 생성
- `setTimeout` 함수의 콜백 함수 → 타이머가 만료되면 단 한 번 호출
- `setInterval` 함수의 콜백 함수 → 타이머가 만료될 때마다 반복 호출
- 타이머 함수 `setTimeout` 과 `setInteval` 은 비동기 처리 방식으로 동작

# 2. 타이머 함수

## 1. `setTimeout / clearTimeout`

- 두 번째 인수 : 전달받은 시간으로 단 한 번 동작하는 타이머 생성
- 첫 번째 인수 : 전달받은 콜백 함수 호출
- 콜백 함수는 두 번째 인수로 전달받은 시간 이후 단 한 번 실행되도록 호출 스케줄링
    
    ```jsx
    const timeoutId = setTimeout(func|code[, delay, param1, param2, ...]);
    ```
    
- `func` : 타이머가 만료된 뒤 호출될 콜백 함수
- `delay` : 타이머 만료 시간, `setTimeout` 함수는 `delay` 시간으로 단 한 번 동작하는 타이머를 생성, 인수 전달 생략 시 기본값 0 지정
- `param1, param2, ...` : 호출 스케줄링된 콜백 함수에 전달해야 할 인수가 존재하는 경우 세 번째 이후의 인수로 전달 가능
    
    ```jsx
    // 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
    setTimeout(() => console.log('Hi!'), 1000);
    
    // 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
    // 이때 콜백 함수에 'Lee'가 인수로 전달된다.
    setTimeout(name => console.log(`Hi! ${name}.`), 1000, 'Lee');
    
    // 두 번째 인수(delay)를 생략하면 기본값 0이 지정된다.
    setTimeout(() => console.log('Hello!'));
    ```
    
- 생성된 타이머를 식별할 수 있는 고유한 타이머 `id` 반환
- `setTimeout` 함수가 반환한 타이머 `id` 를 `clearTimeout` 함수의 인수로 전달하여 타이머 취소 가능 → `clearTimeout` 함수는 호출 스케줄링 취소
    
    ```jsx
    // 1초(1000ms) 후 타이머가 만료되면 콜백 함수가 호출된다.
    // setTimeout 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
    const timerId = setTimeout(() => console.log('Hi!'), 1000);
    
    // setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를
    // 취소한다. 타이머가 취소되면 setTimeout 함수의 콜백 함수가 실행되지 않는다.
    clearTimeout(timerId);
    ```
    

## 2. `setInterval / clearInterval`

- 두 번째 인수 : 전달받은 시간으로 반복 동작하는 타이머 생성
- 첫 번째 인수 : 전달받은 콜백 함수가 반복 호출
- `setInterval` 함수의 콜백 함수는 두 번째 인수로 전달받은 시간이 경과할 때마다 반복 실행되도록 호출 스케줄링
    
    ```jsx
    const timerId = setInterval(func|code[, delay, param1, param2, ...]);
    ```
    
- 생성된 타이머를 식별할 수 있는 고유한 타이머 `id` 반환
- `setInterval` 함수가 반환한 타이머 `id` 를 `clearInterval` 함수의 인수로 전달하여 타이머 취소 가능 → `clearInterval` 함수는 호출 스케줄링 취소
    
    ```jsx
    let count = 1;
    
    // 1초(1000ms) 후 타이머가 만료될 때마다 콜백 함수가 호출된다.
    // setInterval 함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환한다.
    const timeoutId = setInterval(() => {
      console.log(count); // 1 2 3 4 5
      // count가 5이면 setInterval 함수가 반환한 타이머 id를 clearInterval 함수의
      // 인수로 전달하여 타이머를 취소한다. 타이머가 취소되면 setInterval 함수의 콜백 함수가
      // 실행되지 않는다.
      if (count++ === 5) clearInterval(timeoutId);
    }, 1000);
    ```
    

# 3. 디바운스와 스로틀

- 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 과도한 이벤트 핸들러의 호출을 방지하는 프로그래밍 기법
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>click me</button>
      <pre>일반 클릭 이벤트 카운터    <span class="normal-msg">0</span></pre>
      <pre>디바운스 클릭 이벤트 카운터 <span class="debounce-msg">0</span></pre>
      <pre>스로틀 클릭 이벤트 카운터   <span class="throttle-msg">0</span></pre>
      <script>
        const $button = document.querySelector('button');
        const $normalMsg = document.querySelector('.normal-msg');
        const $debounceMsg = document.querySelector('.debounce-msg');
        const $throttleMsg = document.querySelector('.throttle-msg');
    
        const debounce = (callback, delay) => {
          let timerId;
          return (...args) => {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(callback, delay, ...args);
          };
        };
    
        const throttle = (callback, delay) => {
          let timerId;
          return (...args) => {
            if (timerId) return;
            timerId = setTimeout(() => {
              callback(...args);
              timerId = null;
            }, delay);
          };
        };
    
        $button.addEventListener('click', () => {
          $normalMsg.textContent = +$normalMsg.textContent + 1;
        });
    
        $button.addEventListener('click', debounce(() => {
          $debounceMsg.textContent = +$debounceMsg.textContent + 1;
        }, 500));
    
        $button.addEventListener('click', throttle(() => {
          $throttleMsg.textContent = +$throttleMsg.textContent + 1;
        }, 500));
      </script>
    </body>
    </html>
    ```
    
- 이벤트 처리 시 유용

## 1. 디바운스(Debounce)

- 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않다가 일정 시간이 경과한 이후에 이벤트 핸들러가 한 번만 호출되도록 함
- 짧은 시간 간격으로 발생하는 이벤트를 그룹화해서 마지막에 한 번만 이벤트 핸들러가 호출되도록 함
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="text">
      <div class="msg"></div>
      <script>
        const $input = document.querySelector('input');
        const $msg = document.querySelector('.msg');
    
        const debounce = (callback, delay) => {
          let timerId;
          // debounce 함수는 timerId를 기억하는 클로저를 반환한다.
          return (...args) => {
            // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고
            // 새로운 타이머를 재설정한다.
            // 따라서 delay보다 짧은 간격으로 이벤트가 발생하면 callback은 호출되지 않는다.
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(callback, delay, ...args);
          };
        };
    
        // debounce 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다.
        // 300ms보다 짧은 간격으로 input 이벤트가 발생하면 debounce 함수의 콜백 함수는
        // 호출되지 않다가 300ms 동안 input 이벤트가 더 이상 발생하면 한 번만 호출된다.
        $input.oninput = debounce(e => {
          $msg.textContent = e.target.value;
        }, 300);
      </script>
    </body>
    </html>
    ```
    
- `resize` 이벤트 처리, `input` 요소에 입력된 값으로 `ajax` 요청하는 입력 필드 자동완성 UI 구현, 버튼 중복 클릭 방지 처리

## 2. 스로틀(Throttle)

- 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가 최대 한 번만 호출되도록 함
- 짧은 시간 간격으로 연속해서 발생하는 이벤트를 그룹화해서 일정 시간 단위로 이벤트 핸들러가 호출되도록 호출 주기를 만듦
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container {
          width: 300px;
          height: 300px;
          background-color: rebeccapurple;
          overflow: scroll;
        }
    
        .content {
          width: 300px;
          height: 1000vh;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content"></div>
      </div>
      <div>
        일반 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
        <span class="normal-count">0</span>
      </div>
      <div>
        스로틀 이벤트 핸들러가 scroll 이벤트를 처리한 횟수:
        <span class="throttle-count">0</span>
      </div>
    
      <script>
        const $container = document.querySelector('.container');
        const $normalCount = document.querySelector('.normal-count');
        const $throttleCount = document.querySelector('.throttle-count');
    
        const throttle = (callback, delay) => {
          let timerId;
          // throttle 함수는 timerId를 기억하는 클로저를 반환한다.
          return (...args) => {
            // delay가 경과하기 이전에 이벤트가 발생하면 아무것도 하지 않다가
            // delay가 경과했을 때 이벤트가 발생하면 새로운 타이머를 재설정한다.
            // 따라서 delay 간격으로 callback이 호출된다.
            if (timerId) return;
            timerId = setTimeout(() => {
              callback(...args);
              timerId = null;
            }, delay);
          };
        };
    
        let normalCount = 0;
        $container.addEventListener('scroll', () => {
          $normalCount.textContent = ++normalCount;
        });
    
        let throttleCount = 0;
        // throttle 함수가 반환하는 클로저가 이벤트 핸들러로 등록된다.
        $container.addEventListener('scroll', throttle(() => {
          $throttleCount.textContent = ++throttleCount;
        }, 100));
      </script>
    </body>
    </html>
    ```
    
- `scroll` 이벤트 처리, 무한 스크롤 UI 구현
