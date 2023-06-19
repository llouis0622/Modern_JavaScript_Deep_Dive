# 40장. 이벤트

# 1. 이벤트 드리븐 프로그래밍

- 브라우저는 처리해야 할 특정 사건 발생 → 이를 감지하여 이벤트 발생
- 이벤트 핸들러(Event Handler) : 이벤트가 발생했을 때 호출될 함수
- 이벤트 핸들러 등록 : 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출 위임
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // 사용자가 버튼을 클릭하면 함수를 호출하도록 요청
        $button.onclick = () => { alert('button click'); };
      </script>
    </body>
    </html>
    ```
    
- 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식

# 2. 이벤트 타입

- 이벤트의 종류를 나타내는 문자열

## 1. 마우스 이벤트

- `click` : 마우스 버튼을 클릭했을 때
- `dbclick` : 마우스 버튼을 더블 클릭했을 때
- `mousedown` : 마우스 버튼을 눌렀을 때
- `mouseup` : 누르고 있던 마우스 버튼을 놓았을 때
- `mousemove` : 마우스 커서를 움직였을 때
- `mouseenter` : 마우스 커서를 HTML 요소 안으로 이동했을 때(버블링 되지 않음)
- `mouseover` : 마우스 커서를 HTML 요소 안으로 이동했을 때(버블링 됨)
- `mouseleave` : 마우스 커서를 HTML 요소 밖으로 이동했을 때(버블링 되지 않음)
- `mouseout` : 마우스 커서를 HTML 요소 밖으로 이동했을 때(버블링 됨)

## 2. 키보드 이벤트

- `keydown` : 모든 키를 눌렀을 때 발생
    - control, option, shift, tab, delete, enter, 방향 키와 문자, 숫자, 특수 문자 키를 눌렀을 때 발생
    - 문자, 숫자, 특수 문자, enter 키를 눌렀을 때는 연속적으로 발생, 그 이외의 키는 한 번만 발생
- `keypress` : 문자 키를 눌렀을 때 발생
    - control, option, shift, tab, delete, 방향 키 등을 눌렀을 때는 발생하지 않음
    - 문자, 숫자, 특수 문자, enter 키를 눌렀을 때만 발생
- `keyup` : 누르고 있던 키를 놓았을 때 한 번만 발생
    - control, option, shift, tab, delete, enter, 방향 키와 문자, 숫자, 특수 문자 키를 놓았을 때 발생

## 3. 포커스 이벤트

- `focus` : HTML 요소가 포커스를 받았을 때(버블링 되지 않음)
- `blur` : HTML 요소가 포커스를 잃었을 때(버블링 되지 않음)
- `focusin` : HTML 요소가 포커스를 받았을 때(버블링 됨)
- `focusout` : HTML 요소가 포커스를 잃었을 때(버블링 됨)

## 4. 폼 이벤트

- `submit`
    - `form` 요소 내 `input(text, checkbox, radio), select` 입력 필드에서 엔터 키를 눌렀을 때
    - `form` 요소 내 `submit` 버튼(`<button>, <input type=”submit”>`)을 클릭했을 때
- `reset` : `form` 요소 내 `reset` 버튼을 클릭했을 때

## 5. 값 변경 이벤트

- `input` : `input(text, checkbox, radio), select, textarea` 요소의 값이 입력되었을 때
- `change` : `input(text, checkbox, radio), select, textarea` 요소의 값이 변경되었을 때
    - HTML 요소가 포커스를 잃었을 때 사용자 입력이 종료되었다고 인식하여 발생
    - 사용자가 입력을 하고 있을 때는 `input` 이벤트가 발생하고 사용자 입력이 종료되어 값이 변경되면 `change` 이벤트 발생
- `readystatechange` : HTML 문서의 로드와 파싱 상태를 나타내는 `document.readyState` 프로퍼티 값(`loading` , `interactive` , `complete`)이 변경될 때

## 6. DOM 뮤테이션 이벤트

- `DOMContentLoaded` : HTML 문서의 로드와 파싱이 완료되어 DOM 생성이 완료되었을 때

## 7. 뷰 이벤트

- `resize` : 브라우저 윈도우의 크기를 리사이즈할 때 연속적으로 발생
- `scroll` : 웹페이지 또는 HTML 요소를 스크롤할 때 연속적으로 발생

## 8. 리소스 이벤트

- `load` : `DOMContentLoaded` 이벤트가 발생한 이후 모든 리소스의 로딩이 완료되었을 때
- `unload` : 리소스가 언로드될 때
- `abort` : 리소스 로딩이 중단되었을 때
- `error` : 리소스 로딩이 실패했을 때

# 3. ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~이벤트 핸들러(Event Handler) 등록~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

- 이벤트가 발생했을 때 브라우저에 호출을 위임한 함수
- 이벤트가 발생하면 브라우저에 의해 호출될 함수

## 1. 이벤트 핸들러 어트리뷰트 방식

- `on` 접두사와 이벤트의 종류를 나타내는 이벤트 타입으로 이루어져 있음
- 이벤트 핸들러 어트리뷰트 값으로 함수 호출문 등의 문을 할당 → 이벤트 핸들러 등록
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button onclick="sayHi('Lee')">Click me!</button>
      <script>
        function sayHi(name) {
          console.log(`Hi! ${name}.`);
        }
      </script>
    </body>
    </html>
    ```
    
- 함수 호출문 등의 문 할당
- 이벤트 핸들러 어트리뷰트 값은 사실 암묵적으로 생성될 이벤트 핸들러의 함수 몸체를 의미
    
    ```jsx
    function onclick(event) {
      sayHi('Lee');
    }
    ```
    
    ```jsx
    <!-- 이벤트 핸들러에 인수를 전달하기 곤란하다. -->
    <button onclick="sayHi">Click me!</button>
    ```
    
    ```jsx
    <button onclick="console.log('Hi! '); console.log('Lee');">Click me!</button>
    ```
    
- CBD(Component Based Development) 방식의 Angular / React / Svelte / Vue.js 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트 처리
    
    ```jsx
    <!-- Angular -->
    <button (click)="handleClick($event)">Save</button>
    
    { /* React */ }
    <button onClick={handleClick}>Save</button>
    
    <!-- Svelte -->
    <button on:click={handleClick}>Save</button>
    
    <!-- Vue.js -->
    <button v-on:click="handleClick($event)">Save</button>
    ```
    

## 2. 이벤트 핸들러 프로퍼티 방식

- `on` 접두사와 이벤트의 종류를 나타내는 이벤트 타입으로 이루어져 있음
- 이벤트 핸들러 프로퍼티에 함수를 바인딩하면 이벤트 핸들러가 등록
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
        $button.onclick = function () {
          console.log('button click');
        };
      </script>
    </body>
    </html>
    ```
    
- 이벤트 타깃 : 이벤트 핸들러를 등록하기 위해 이벤트를 발생시킬 객체
- 이벤트 타입 : 이벤트의 종류를 나타내는 문자열
- 이벤트 핸들러 → 대부분 이벤트를 발생시킬 이벤트 타깃에 바인딩
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // 이벤트 핸들러 프로퍼티 방식은 하나의 이벤트에 하나의 이벤트 핸들러만을 바인딩할 수 있다.
        // 첫 번째로 바인딩된 이벤트 핸들러는 두 번째 바인딩된 이벤트 핸들러에 의해 재할당되어
        // 실행되지 않는다.
        $button.onclick = function () {
          console.log('Button clicked 1');
        };
    
        // 두 번째로 바인딩된 이벤트 핸들러
        $button.onclick = function () {
          console.log('Button clicked 2');
        };
      </script>
    </body>
    </html>
    ```
    

## 3. `addEventListener` 메서드 방식

- DOM Level 2에서 도입된 `EventTarget.prototype.addEventListener` 메서드 사용
- 첫 번째 매개변수 : 이벤트의 종류를 나타내는 문자열인 이벤트 타입 전달, `on` 접두사 X
- 두 번째 매개변수 : 이벤트 핸들러 전달
- 마지막 매개변수 : 이벤트를 캐치할 이벤트 전파 단계를 지정
    - 생략 , `false` 지정 : 버블링 단계에서 이벤트 캐치
    - `true` 지정 : 캡처링 단계에서 이벤트 캐치
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // 이벤트 핸들러 프로퍼티 방식
        // $button.onclick = function () {
        //   console.log('button click');
        // };
    
        // addEventListener 메서드 방식
        $button.addEventListener('click', function () {
          console.log('button click');
        });
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러를 인수로 전달
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // 이벤트 핸들러 프로퍼티 방식
        $button.onclick = function () {
          console.log('[이벤트 핸들러 프로퍼티 방식]button click');
        };
    
        // addEventListener 메서드 방식
        $button.addEventListener('click', function () {
          console.log('[addEventListener 메서드 방식]button click');
        });
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 아무런 영향을 주지 않음
- 버튼 요소에서 클릭 이벤트가 발생 → 2개의 이벤트 핸들러 모두 호출
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        // addEventListener 메서드는 동일한 요소에서 발생한 동일한 이벤트에 대해
        // 하나 이상의 이벤트 핸들러를 등록할 수 있다.
        $button.addEventListener('click', function () {
          console.log('[1]button click');
        });
    
        $button.addEventListener('click', function () {
          console.log('[2]button click');
        });
      </script>
    </body>
    </html>
    ```
    
- 참조가 동일한 이벤트 핸들러를 중복 등록 → 하나의 이벤트 핸들러만 등록
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        const handleClick = () => console.log('button click');
    
        // 참조가 동일한 이벤트 핸들러를 중복 등록하면 하나의 핸들러만 등록된다.
        $button.addEventListener('click', handleClick);
        $button.addEventListener('click', handleClick);
      </script>
    </body>
    </html>
    ```
    

# 4. 이벤트 핸들러 제거

- `EventTarget.prototype.removeEventListener` 메서드 사용
- `addEventListener` 메서드와 인수 동일, 불일치 → 이벤트 핸들러 제거 X
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        const handleClick = () => console.log('button click');
    
        // 이벤트 핸들러 등록
        $button.addEventListener('click', handleClick);
    
        // 이벤트 핸들러 제거
        // addEventListener 메서드에 전달한 인수와 removeEventListener 메서드에
        // 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않는다.
        $button.removeEventListener('click', handleClick, true); // 실패
        $button.removeEventListener('click', handleClick); // 성공
      </script>
    </body>
    </html>
    ```
    
    ```jsx
    // 이벤트 핸들러 등록
    $button.addEventListener('click', () => console.log('button click'));
    // 등록한 이벤트 핸들러를 참조할 수 없으므로 제거할 수 없다.
    ```
    
- 기명 이벤트 핸들러 내부에서 `removeEventListener` 메서드를 호출 → 이벤트 핸들러 제거 가능
    
    ```jsx
    // 기명 함수를 이벤트 핸들러로 등록
    $button.addEventListener('click', function foo() {
      console.log('button click');
      // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
      $button.removeEventListener('click', foo);
    });
    ```
    
- 함수 자신을 가리키는 `arguments.callee` 사용
    
    ```jsx
    // 무명 함수를 이벤트 핸들러로 등록
    $button.addEventListener('click', function () {
      console.log('button click');
      // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
      // arguments.callee는 호출된 함수, 즉 함수 자신을 가리킨다.
      $button.removeEventListener('click', arguments.callee);
    });
    ```
    
- 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러 → `removeEventListener` 메서드로 제거 불가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button>Click me!</button>
      <script>
        const $button = document.querySelector('button');
    
        const handleClick = () => console.log('button click');
    
        // 이벤트 핸들러 프로퍼티 방식으로 이벤트 핸들러 등록
        $button.onclick = handleClick;
    
        // removeEventListener 메서드로 이벤트 핸들러를 제거할 수 없다.
        $button.removeEventListener('click', handleClick);
    
        // 이벤트 핸들러 프로퍼티에 null을 할당하여 이벤트 핸들러를 제거한다.
        $button.onclick = null;
      </script>
    </body>
    </html>
    ```
    

# 5. 이벤트 객체

- 이벤트에 관련한 다양한 정보를 담고 있는 이벤트 객체가 동적으로 생성
- 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
      <em class="message"></em>
      <script>
        const $msg = document.querySelector('.message');
    
        // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
        function showCoords(e) {
          $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
        }
    
        document.onclick = showCoords;
      </script>
    </body>
    </html>
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html, body { height: 100%; }
      </style>
    </head>
    <!-- 이벤트 핸들러 어트리뷰트 방식의 경우 event가 아닌 다른 이름으로는 이벤트 객체를
    전달받지 못한다. -->
    <body onclick="showCoords(event)">
      <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
      <em class="message"></em>
      <script>
        const $msg = document.querySelector('.message');
    
        // 클릭 이벤트에 의해 생성된 이벤트 객체는 이벤트 핸들러의 첫 번째 인수로 전달된다.
        function showCoords(e) {
          $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientY}`;
        }
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러 어트리뷰트 방식 → 이벤트 객체를 전달받기 위해 이벤트 핸들러의 첫 번째 매개변수 이름이 반드시 `event`
    
    ```jsx
    function onclick(event) {
      showCoords(event);
    }
    ```
    

## 1. 이벤트 객체의 상속 구조

- 생성자 함수를 호출하여 이벤트 객체 생성 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <script>
        // Event 생성자 함수를 호출하여 foo 이벤트 타입의 Event 객체를 생성한다.
        let e = new Event('foo');
        console.log(e);
        // Event {isTrusted: false, type: "foo", target: null, ...}
        console.log(e.type); // "foo"
        console.log(e instanceof Event); // true
        console.log(e instanceof Object); // true
    
        // FocusEvent 생성자 함수를 호출하여 focus 이벤트 타입의 FocusEvent 객체를 생성한다.
        e = new FocusEvent('focus');
        console.log(e);
        // FocusEvent {isTrusted: false, relatedTarget: null, view: null, ...}
    
        // MouseEvent 생성자 함수를 호출하여 click 이벤트 타입의 MouseEvent 객체를 생성한다.
        e = new MouseEvent('click');
        console.log(e);
        // MouseEvent {isTrusted: false, screenX: 0, screenY: 0, clientX: 0, ... }
    
        // KeyboardEvent 생성자 함수를 호출하여 keyup 이벤트 타입의 KeyboardEvent 객체를
        // 생성한다.
        e = new KeyboardEvent('keyup');
        console.log(e);
        // KeyboardEvent {isTrusted: false, key: "", code: "", ctrlKey: false, ...}
    
        // InputEvent 생성자 함수를 호출하여 change 이벤트 타입의 InputEvent 객체를 생성한다.
        e = new InputEvent('change');
        console.log(e);
        // InputEvent {isTrusted: false, data: null, inputType: "", ...}
      </script>
    </body>
    </html>
    ```
    
- 이벤트 발생 → 암묵적으로 생성되는 이벤트 객체도 생성자 함수에 의해 생성
- 생성된 이벤트 객체 → 생성자 함수와 더불어 생성되는 프로토타입으로 구성된 프로토타입 체인의 일원
- `Event` 인터페이스 → DOM 내에서 발생한 이벤트에 의해 생성되는 이벤트 객체 나타냄
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="text">
      <input type="checkbox">
      <button>Click me!</button>
      <script>
        const $input = document.querySelector('input[type=text]');
        const $checkbox = document.querySelector('input[type=checkbox]');
        const $button = document.querySelector('button');
    
        // load 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
        window.onload = console.log;
    
        // change 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
        $checkbox.onchange = console.log;
    
        // focus 이벤트가 발생하면 FocusEvent 타입의 이벤트 객체가 생성된다.
        $input.onfocus = console.log;
    
        // input 이벤트가 발생하면 InputEvent 타입의 이벤트 객체가 생성된다.
        $input.oninput = console.log;
    
        // keyup 이벤트가 발생하면 KeyboardEvent 타입의 이벤트 객체가 생성된다.
        $input.onkeyup = console.log;
    
        // click 이벤트가 발생하면 MouseEvent 타입의 이벤트 객체가 생성된다.
        $button.onclick = console.log;
      </script>
    </body>
    </html>
    ```
    

## 2. 이벤트 객체의 공통 프로퍼티

- `Event` 인터페이스의 이벤트 관련 프로퍼티 → 모든 이벤트 객체가 상속받는 공통 프로퍼티
- `type` : 이벤트 타입
- `target` : 이벤트를 발생시킨 DOM 요소
- `currentTarget` : 이벤트 핸들러가 바인딩된 DOM 요소
- `eventPhase` : 이벤트 전파 단계(0 : 이벤트 없음, 1 : 캡처링 단계, 2 : 타깃 단계, 3 : 버블링 단계)
- `bubbles` : 이벤트를 버블링으로 전파하는지 여부
- `cancelable` : `preventDefault` 메서드를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 여부
- `defaultPrevented` : `preventDefault` 메서드를 호출하여 이벤트를 취소했는지 여부
- `isTrusted` : 사용자의 행위에 의해 발생한 이벤트인지 여부
- `timestamp` : 이벤트가 발생한 시각(1970/01/01/00:00:0부터 경과한 밀리초)
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="checkbox">
      <em class="message">off</em>
      <script>
        const $checkbox = document.querySelector('input[type=checkbox]');
        const $msg = document.querySelector('.message');
    
        // change 이벤트가 발생하면 Event 타입의 이벤트 객체가 생성된다.
        $checkbox.onchange = e => {
          console.log(Object.getPrototypeOf(e) === Event.prototype); // true
    
          // e.target은 change 이벤트를 발생시킨 DOM 요소 $checkbox를 가리키고
          // e.target.checked는 체크박스 요소의 현재 체크 상태를 나타낸다.
          $msg.textContent = e.target.checked ? 'on' : 'off';
        };
      </script>
    </body>
    </html>
    ```
    
    ```jsx
    $checkbox.onchange = e => {
      // e.target은 change 이벤트를 발생시킨 DOM 요소 $checkbox를 가리키고
      // e.currentTarget은 이벤트 핸들러가 바인딩된 DOM 요소 $checkbox를 가리킨다.
      console.log(e.target === e.currentTarget); // true
    
      $msg.textContent = e.target.checked ? 'on' : 'off';
    };
    ```
    
- 이벤트 객체의 `target` 프로퍼티와 `currentTarget` 프로퍼티가 서로 다른 DOM 요소 가리킬 수 있음

## 3. 마우스 정보 취득

- `click, dbclick, mousedown, mouseup, mousemove, mouseenter, mouseleave` 이벤트가 발생하면 생성되는 `MouseEvent` 타입의 이벤트 객체
    - 마우스 포인터의 좌표 정보를 나타내는 프로퍼티 : `screenX/screenY, clientX/clientY, pageX/pageY, offsetX/offsetY`
    - 버튼 정부를 나타내는 프로퍼티 : `altKey, ctrlKey, shiftKey, button`
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .box {
          width: 100px;
          height: 100px;
          background-color: #fff700;
          border: 5px solid orange;
          cursor: pointer;
        }
      </style>
    </head>
    <body>
      <div class="box"></div>
      <script>
        // 드래그 대상 요소
        const $box = document.querySelector('.box');
    
        // 드래그 시작 시점의 마우스 포인터 위치
        const initialMousePos = { x: 0, y: 0 };
        // 오프셋: 이동할 거리
        const offset = { x: 0, y: 0 };
    
        // mousemove 이벤트 핸들러
        const move = e => {
          // 오프셋 = 현재(드래그하고 있는 시점) 마우스 포인터 위치 - 드래그 시작 시점의 마우스 포인터 위치
          offset.x = e.clientX - initialMousePos.x;
          offset.y = e.clientY - initialMousePos.y;
    
          // translate3d는 GPU를 사용하므로 absolute의 top, left를 사용하는 것보다 빠르다.
          // top, left는 레이아웃에 영향을 준다.
          $box.style.transform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
        };
    
        // mousedown 이벤트가 발생하면 드래그 시작 시점의 마우스 포인터 좌표를 저장한다.
        $box.addEventListener('mousedown', e => {
          // 이동 거리를 계산하기 위해 mousedown 이벤트가 발생(드래그를 시작)하면
          // 드래그 시작 시점의 마우스 포인터 좌표(e.clientX/e.clientY: 뷰포트 상에서 현재
          // 마우스의 포인터 좌표)를 저장해 둔다. 한번 이상 드래그로 이동한 경우 move에서
          // translate3d(${offset.x}px, ${offset.y}px, 0)으로 이동한 상태이므로
          // offset.x와 offset.y를 빼주어야 한다.
          initialMousePos.x = e.clientX - offset.x;
          initialMousePos.y = e.clientY - offset.y;
    
          // mousedown 이벤트가 발생한 상태에서 mousemove 이벤트가 발생하면
          // box 요소를 이동시킨다.
          document.addEventListener('mousemove', move);
        });
    
        // mouseup 이벤트가 발생하면 mousemove 이벤트를 제거해 이동을 멈춘다.
        document.addEventListener('mouseup', () => {
          document.removeEventListener('mousemove', move);
        });
      </script>
    </body>
    </html>
    ```
    

## 4. 키보드 정보 취득

- `keydown, keyup, keypress` 이벤트가 발생하면 생성되는 `KeyboardEvent` 타입의 이벤트 객체
    - `altKey, ctrlKey, shiftKey, metaKey, key, keyCode` 같은 고유 프로퍼티 보유
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="text" />
      <em class="message"></em>
      <script>
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');
    
        $input.onkeyup = e => {
          // e.key는 입력한 키 값을 문자열로 반환한다.
          // 입력한 키가 'Enter', 즉 엔터 키가 아니면 무시한다.
          if (e.key !== 'Enter') return;
    
          // 엔터키가 입력되면 현재까지 입력 필드에 입력된 값을 출력한다.
          $msg.textContent = e.target.value;
          e.target.value = '';
        };
      </script>
    </body>
    </html>
    ```
    

# 6. 이벤트 전파

- DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트 → DOM 트리를 통해 전파
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
    </body>
    </html>
    ```
    
- 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 DOM 트리를 통해 전파
    - 캡처링 단계(Capturing Phase) : 이벤트가 상위 요소에서 하위 요소 방향으로 전파
    - 타깃 단계(Target Phase) : 이벤트가 이벤트 타깃에 도달
    - 버블링 단계(Bubbling Phase) : 이벤트가 하위 요소에서 상위 요소 방향으로 전파
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
        $fruits.addEventListener('click', e => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        });
      </script>
    </body>
    </html>
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
      <script>
        const $fruits = document.getElementById('fruits');
        const $banana = document.getElementById('banana');
    
        // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우
        // 캡처링 단계의 이벤트를 캐치한다.
        $fruits.addEventListener('click', e => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        }, true);
    
        // 타깃 단계의 이벤트를 캐치한다.
        $banana.addEventListener('click', e => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
        });
    
        // 버블링 단계의 이벤트를 캐치한다.
        $fruits.addEventListener('click', e => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        });
      </script>
    </body>
    </html>
    ```
    
- 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치 가능
- 버블링을 통해 이벤트를 전파하는지 여부를 나타내는 이벤트 객체의 공통 프로퍼티 `event.bubbles` 의 값이 모두 `false`
    - 포커스 이벤트 : `focus / blur` → `focusin/focusout` 대체 가능
    - 리소스 이벤트 : `load / unload / abort / error`
    - 마우스 이벤트 : `mouseenter / mouseleave` → `mouseover/mouseout` 대체 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        html, body { height: 100%; }
      </style>
    <body>
      <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
      <script>
        // 버블링 단계의 이벤트를 캐치
        document.body.addEventListener('click', () => {
          console.log('Handler for body.');
        });
    
        // 캡처링 단계의 이벤트를 캐치
        document.querySelector('p').addEventListener('click', () => {
          console.log('Handler for paragraph.');
        }, true);
    
        // 타깃 단계의 이벤트를 캐치
        document.querySelector('button').addEventListener('click', () => {
          console.log('Handler for button.');
        });
      </script>
    </body>
    </html>
    ```
    

# 7. 이벤트 위임(Event Delegation)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #fruits {
      display: flex;
      list-style-type: none;
      padding: 0;
    }

    #fruits li {
      width: 100px;
      cursor: pointer;
    }

    #fruits .active {
      color: red;
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    const $fruits = document.getElementById('fruits');
    const $msg = document.querySelector('.msg');

    // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
    // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
    function activate({ target }) {
      [...$fruits.children].forEach($fruit => {
        $fruit.classList.toggle('active', $fruit === target);
        $msg.textContent = target.id;
      });
    }

    // 모든 내비게이션 아이템(li 요소)에 이벤트 핸들러를 등록한다.
    document.getElementById('apple').onclick = activate;
    document.getElementById('banana').onclick = activate;
    document.getElementById('orange').onclick = activate;
  </script>
</body>
</html>
```

- 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법
- 이벤트 위임을 통해 상위 DOM 요소에 이벤트 핸들러 등록 → 여러 개의 하위 DOM 요소에 이벤트 핸들러를 등록할 필요가 없음
    
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        #fruits {
          display: flex;
          list-style-type: none;
          padding: 0;
        }
    
        #fruits li {
          width: 100px;
          cursor: pointer;
        }
    
        #fruits .active {
          color: red;
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <nav>
        <ul id="fruits">
          <li id="apple" class="active">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
      </nav>
      <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
      <script>
        const $fruits = document.getElementById('fruits');
        const $msg = document.querySelector('.msg');
    
        // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
        // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.
        function activate({ target }) {
          // 이벤트를 발생시킨 요소(target)가 ul#fruits의 자식 요소가 아니라면 무시한다.
          if (!target.matches('#fruits > li')) return;
    
          [...$fruits.children].forEach($fruit => {
            $fruit.classList.toggle('active', $fruit === target);
            $msg.textContent = target.id;
          });
        }
    
        // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
        $fruits.onclick = activate;
      </script>
    </body>
    </html>
    ```
    
- `Element.prototype.matches` 메서드 : 인수로 전달된 선택자에 의해 특정 노드를 탐색 가능한지 확인
    
    ```jsx
    function activate({ target }) {
      // 이벤트를 발생시킨 요소(target)이 ul#fruits의 자식 요소가 아니라면 무시한다.
      if (!target.matches('#fruits > li')) return;
      ...
    ```
    
    ```jsx
    $fruits.onclick = activate;
    ```
    

# 8. DOM 요소의 기본 동작 조작

## 1. DOM 요소의 기본 동작 중단

- 이벤트 객체의 `preventDefault` 메서드
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <a href="https://www.google.com">go</a>
      <input type="checkbox">
      <script>
        document.querySelector('a').onclick = e => {
          // a 요소의 기본 동작을 중단한다.
          e.preventDefault();
        };
    
        document.querySelector('input[type=checkbox]').onclick = e => {
          // checkbox 요소의 기본 동작을 중단한다.
          e.preventDefault();
        };
      </script>
    </body>
    </html>
    ```
    

## 2. 이벤트 전파 방지

- `stopPropagation` 메서드
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <div class="container">
        <button class="btn1">Button 1</button>
        <button class="btn2">Button 2</button>
        <button class="btn3">Button 3</button>
      </div>
      <script>
        // 이벤트 위임. 클릭된 하위 버튼 요소의 color를 변경한다.
        document.querySelector('.container').onclick = ({ target }) => {
          if (!target.matches('.container > button')) return;
          target.style.color = 'red';
        };
    
        // .btn2 요소는 이벤트를 전파하지 않으므로 상위 요소에서 이벤트를 캐치할 수 없다.
        document.querySelector('.btn2').onclick = e => {
          e.stopPropagation(); // 이벤트 전파 중단
          e.target.style.color = 'blue';
        };
      </script>
    </body>
    </html>
    ```
    
- 하위 DOM 요소의 이벤트를 개별적으로 처리하기 위해 이벤트 전파 중단

# 9. 이벤트 핸들러 내부의 `this`

## 1. 이벤트 핸들러 어트리뷰트 방식

- `handleClick` 함수 내부의 `this` → 전역 객체 `window` 를 가리킴
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button onclick="handleClick()">Click me</button>
      <script>
        function handleClick() {
          console.log(this); // window
        }
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러를 호출할 때 인수로 전달한 `this` → 이벤트를 바인딩한 DOM 요소 가리킴
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button onclick="handleClick(this)">Click me</button>
      <script>
        function handleClick(button) {
          console.log(button); // 이벤트를 바인딩한 button 요소
          console.log(this);   // window
        }
      </script>
    </body>
    </html>
    ```
    

## 2. 이벤트 핸들러 프로퍼티 방식과 `addEventListener` 메서드 방식

- 이벤트 핸들러 내부의 `this` → 이벤트를 바인딩한 DOM 요소를 가리킴
- 이벤트 핸들러 내부의 `this` → 이벤트 객체의 `currentTarget` 프로퍼티와 동일
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn1">0</button>
      <button class="btn2">0</button>
      <script>
        const $button1 = document.querySelector('.btn1');
        const $button2 = document.querySelector('.btn2');
    
        // 이벤트 핸들러 프로퍼티 방식
        $button1.onclick = function (e) {
          // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
          console.log(this); // $button1
          console.log(e.currentTarget); // $button1
          console.log(this === e.currentTarget); // true
    
          // $button1의 textContent를 1 증가시킨다.
          ++this.textContent;
        };
    
        // addEventListener 메서드 방식
        $button2.addEventListener('click', function (e) {
          // this는 이벤트를 바인딩한 DOM 요소를 가리킨다.
          console.log(this); // $button2
          console.log(e.currentTarget); // $button2
          console.log(this === e.currentTarget); // true
    
          // $button2의 textContent를 1 증가시킨다.
          ++this.textContent;
        });
      </script>
    </body>
    </html>
    ```
    
- 화살표 함수로 정의한 이벤트 핸들러 내부의 `this` → 상위 스코프의 `this` 가리킴
- 화살표 함수는 함수 자체의 `this` 바인딩을 갖지 않음
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn1">0</button>
      <button class="btn2">0</button>
      <script>
        const $button1 = document.querySelector('.btn1');
        const $button2 = document.querySelector('.btn2');
    
        // 이벤트 핸들러 프로퍼티 방식
        $button1.onclick = e => {
          // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
          console.log(this); // window
          console.log(e.currentTarget); // $button1
          console.log(this === e.currentTarget); // false
    
          // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
          ++this.textContent;
        };
    
        // addEventListener 메서드 방식
        $button2.addEventListener('click', e => {
          // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
          console.log(this); // window
          console.log(e.currentTarget); // $button2
          console.log(this === e.currentTarget); // false
    
          // this는 window를 가리키므로 window.textContent에 NaN(undefined + 1)을 할당한다.
          ++this.textContent;
        });
      </script>
    </body>
    </html>
    ```
    
- 클래스에서 이벤트 핸들러를 바인딩하는 경우 `this` 주의
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">0</button>
      <script>
        class App {
          constructor() {
            this.$button = document.querySelector('.btn');
            this.count = 0;
    
            // increase 메서드를 이벤트 핸들러로 등록
            this.$button.onclick = this.increase;
          }
    
          increase() {
            // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
            // 따라서 this.$button은 this.$button.$button과 같다.
            this.$button.textContent = ++this.count;
            // -> TypeError: Cannot set property 'textContent' of undefined
          }
        }
    
        new App();
      </script>
    </body>
    </html>
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">0</button>
      <script>
        class App {
          constructor() {
            this.$button = document.querySelector('.btn');
            this.count = 0;
    
            // increase 메서드를 이벤트 핸들러로 등록
            // this.$button.onclick = this.increase;
    
            // increase 메서드 내부의 this가 인스턴스를 가리키도록 한다.
            this.$button.onclick = this.increase.bind(this);
          }
    
          increase() {
            this.$button.textContent = ++this.count;
          }
        }
    
        new App();
      </script>
    </body>
    </html>
    ```
    
- 클래스 필드에 할당한 화살표 함수 → 이벤트 핸들러로 등록하여 이벤트 핸들러 내부의 `this` 가 인스턴스를 가리키도록 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">0</button>
      <script>
        class App {
          constructor() {
            this.$button = document.querySelector('.btn');
            this.count = 0;
    
            // 화살표 함수인 increase를 이벤트 핸들러로 등록
            this.$button.onclick = this.increase;
          }
    
          // 클래스 필드 정의
          // increase는 인스턴스 메서드이며 내부의 this는 인스턴스를 가리킨다.
          increase = () => this.$button.textContent = ++this.count;
        }
        new App();
      </script>
    </body>
    </html>
    ```
    

# 10. 이벤트 핸들러에 인수 전달

- 이벤트 핸들러 내부에서 함수를 호출하면서 인수 전달 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <label>User name <input type='text'></label>
      <em class="message"></em>
      <script>
        const MIN_USER_NAME_LENGTH = 5; // 이름 최소 길이
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');
    
        const checkUserNameLength = min => {
          $msg.textContent
            = $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : '';
        };
    
        // 이벤트 핸들러 내부에서 함수를 호출하면서 인수를 전달한다.
        $input.onblur = () => {
          checkUserNameLength(MIN_USER_NAME_LENGTH);
        };
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러를 반환하는 함수를 호출하면서 인수 전달 가능
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <label>User name <input type='text'></label>
      <em class="message"></em>
      <script>
        const MIN_USER_NAME_LENGTH = 5; // 이름 최소 길이
        const $input = document.querySelector('input[type=text]');
        const $msg = document.querySelector('.message');
    
        // 이벤트 핸들러를 반환하는 함수
        const checkUserNameLength = min => e => {
          $msg.textContent
            = $input.value.length < min ? `이름은 ${min}자 이상 입력해 주세요` : '';
        };
    
        // 이벤트 핸들러를 반환하는 함수를 호출하면서 인수를 전달한다.
        $input.onblur = checkUserNameLength(MIN_USER_NAME_LENGTH);
      </script>
    </body>
    </html>
    ```
    

# 11. 커스텀 이벤트

## 1. 커스텀 이벤트 생성

- 이벤트 생성자 함수를 호출하여 명시적으로 생성한 이벤트 객체 → 임의의 이벤트 타입 지정 가능
- 개발자의 의도로 생성된 이벤트
- 첫 번째 인수 : 이벤트 타입을 나타내는 문자열 전달받음
    
    ```jsx
    // KeyboardEvent 생성자 함수로 keyup 이벤트 타입의 커스텀 이벤트 객체를 생성
    const keyboardEvent = new KeyboardEvent('keyup');
    console.log(keyboardEvent.type); // keyup
    
    // CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
    const customEvent = new CustomEvent('foo');
    console.log(customEvent.type); // foo
    ```
    
- 버블링되지 않음, `preventDefault` 메서드로 취소 불가능
- 커스텀 이벤트 객체 → `bubbles` 와 `cancelable` 프로퍼티 값이 `false` 로 기본 설정
    
    ```jsx
    // MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
    const customEvent = new MouseEvent('click');
    console.log(customEvent.type); // click
    console.log(customEvent.bubbles); // false
    console.log(customEvent.cancelable); // false
    ```
    
- 커스텀 이벤트 객체의 `bubbles` 또는 `cancelable` 프로퍼티를 `true` 로 설정 → 이벤트 생성자 함수의 두 번째 인수로 `bubbles` 또는 `cancelable` 프로퍼티를 갖는 객체 전달
    
    ```jsx
    // MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
    const customEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });
    
    console.log(customEvent.bubbles); // true
    console.log(customEvent.cancelable); // true
    ```
    
- 커스텀 이벤트 객체에는 `bubbles` 또는 `cancelable` 프로퍼티뿐만 아니라 이벤트 타입에 따라 가지는 이벤트 고유의 프로퍼티 값 지정 가능
- 이벤트 객체 고유의 프로퍼티 값 지정 → 이벤트 생성자 함수의 두 번째 인수로 프로퍼티 전달
    
    ```jsx
    // MouseEvent 생성자 함수로 click 이벤트 타입의 커스텀 이벤트 객체를 생성
    const mouseEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      clientX: 50,
      clientY: 100
    });
    
    console.log(mouseEvent.clientX); // 50
    console.log(mouseEvent.clientY); // 100
    
    // KeyboardEvent 생성자 함수로 keyup 이벤트 타입의 커스텀 이벤트 객체를 생성
    const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    
    console.log(keyboardEvent.key); // Enter
    ```
    
    ```jsx
    // InputEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
    const customEvent = new InputEvent('foo');
    console.log(customEvent.isTrusted); // false
    ```
    

## 2. 커스텀 이벤트 디스패치

- 생성된 커스텀 이벤트는 `dispatchEvent` 메서드로 디스패치 가능
- `dispatchEvent` 메서드에 이벤트 객체를 인수로 전달하면서 호출 → 인수로 전달한 이벤트 타입의 이벤트가 발생
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">Click me</button>
      <script>
        const $button = document.querySelector('.btn');
    
        // 버튼 요소에 click 커스텀 이벤트 핸들러를 등록
        // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
        $button.addEventListener('click', e => {
          console.log(e); // MouseEvent {isTrusted: false, screenX: 0, ...}
          alert(`${e} Clicked!`);
        });
    
        // 커스텀 이벤트 생성
        const customEvent = new MouseEvent('click');
    
        // 커스텀 이벤트 디스패치(동기 처리). click 이벤트가 발생한다.
        $button.dispatchEvent(customEvent);
      </script>
    </body>
    </html>
    ```
    
- 이벤트 핸들러를 동기 처리 방식으로 호출
- 커스텀 이벤트에 바인딩된 이벤트 핸들러를 직접 호출하는 것과 동일
    
    ```jsx
    // CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
    const customEvent = new CustomEvent('foo');
    console.log(customEvent.type); // foo
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <button class="btn">Click me</button>
      <script>
        const $button = document.querySelector('.btn');
    
        // 버튼 요소에 foo 커스텀 이벤트 핸들러를 등록
        // 커스텀 이벤트를 디스패치하기 이전에 이벤트 핸들러를 등록해야 한다.
        $button.addEventListener('foo', e => {
          // e.detail에는 CustomEvent 함수의 두 번째 인수로 전달한 정보가 담겨 있다.
          alert(e.detail.message);
        });
    
        // CustomEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
        const customEvent = new CustomEvent('foo', {
          detail: { message: 'Hello' } // 이벤트와 함께 전달하고 싶은 정보
        });
    
        // 커스텀 이벤트 디스패치
        $button.dispatchEvent(customEvent);
      </script>
    </body>
    </html>
    ```
    
- 기존 이벤트 타입이 아닌 임의의 이벤트 타입을 지정하여 커스텀 이벤트 객체를 생성한 경우 → 반드시 `addEventListener` 메서드 방식으로 이벤트 핸들러 등록
