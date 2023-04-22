# 03장. 자바스크립트 개발 환경과 실행 방법

# 1. 자바스크립트 실행 환경

- 브라우저
    - HTML, CSS, 자바스크립트를 실행해 웹페이지를 브라우저 화면에 렌더링
    - 클라이언트 사이드 Web API 지원
- Node.js
    - 브라우저 외부에서 자바스크립트 실행 환경을 제공
    - ECMAScript와 Node.js 고유 API 지원

# 2. 웹 브라우저

## 1. 개발자 도구

- Elements : 로딩된 웹페이지의 DOM과 CSS를 편집해서 렌더링된 뷰 확인
- Console : 로딩된 웹페이지의 에러 확인 및 자바스크립트 소스코드에 작성한 `console.log` 메서드 실행 결과 확인
- Sources : 로딩된 웹페이지의 자바스크립트 코드 디버깅
- Network : 로딩된 웹페이지에 관련된 네트워크 요청 정보와 성능 확인
- Application : 웹 스토리지, 세션, 쿠키 확인 및 관리

## 2. 콘솔

- 자바스크립트 코드에서 에러가 발생해 애플리케이션이 정상적으로 동작하지 않을 때 가상 우선적으로 살펴봐야 할 곳
- 디버깅을 실행하는 것보다 간편하게 코드 실행 결과 확인 가능

## 3. 브라우저에서 자바스크립트 실행

```jsx
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Counter</title>
</head>
<body>
    <div id="counter">0</div>
    <button id="increase">+</button>
    <button id="decrease">-</button>
    <script>
        // 에러를 발생시키는 코드 : 선택자는 'counter-x'가 아니라 'counter'를 지정해야 한다.
        const $counter = document.getElementById('counter-x');
        const $increase = document.getElementById('increase');
        const $decrease = document.getElementById('decrease');
    
        let num = 0;
        const render = function () { $counter.innerHTML = num; };
    
        $increase.onclick = function () {
            num++;
            console.log('increase 버튼 클릭', num);
            render();
        };

        $decrease.onclick = function () {
            num--;
            console.log('decrease 버튼 클릭', num);
            render();
        };
    </script>
</body>
</html>
```

## 4. 디버깅

- 에러 메시지를 확인하고 에러가 발생한 원인을 제거하는 것

# 3. Node.js

- 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경
- 브라우저에서만 동작하던 자바스크립트를 브라우저 이외의 환경에서 동작시킬 수 있는 자바스크립트 실행 환경
- NPM(Node Package Manager)
    - 자바스크립트 패키지 매니저
    - Node.js에서 사용할 수 있는 모듈들을 패키지화해서 모아둔 저장소 역할
    - 패키지 설치 및 관리를 위한 CLI(Command Line Interface) 제공

# 4. 비주얼 스튜디오 코드

- 코드 에디터
- 내장 터미널 : VS Code 자체 터미널
    
    ```jsx
    const arr = [1, 2, 3];
    
    arr.forEach(console.log);
    ```
    
- Code Runner 확장 플러그인 : 내장 터미널에서 단축기를 사용해 자바스크립트를 비롯한 다양한 프로그래밍 언어로 구현된 소스코드 간단히 실행 가능
    
    ```jsx
    const arr = [1, 2, 3];
    
    arr.forEach(alert);
    // alert : 브라우저에서만 동작하는 클라이언트 사이트 Web API
    ```
    
- Live Server 확장 플러그인 : 소스코드 수정 시 수정 사항을 브라우저에 자동으로 반영
    
    ```jsx
    <!DOCTYPE html>
    <html>
    <body>
        <script src="index.js"></script>
    </body>
    </html>
    ```
