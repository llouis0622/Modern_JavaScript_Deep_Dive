# 02장. 자바스크립트란?

# 1. 자바스크립트의 탄생

- 웹페이지의 보조적인 기능을 수행하기 위해 브라우저에서 동작하는 경량 프로그래밍 언어 도입
- 모카(Mocha) → 라이브스크립트(LiveScript) → 자바스크립트(JavaScript)

# 2. 자바스크립트의 표준화

- 크로스 브라우징 이슈 발생 → ECMAScript
- `let/const` 키워드, 화살표 함수, 클래스, 모듈 등 범용 프로그래밍 언어의 기능 대거 도입

# 3. 자바스크립트 성장의 역사

- 웹 서버에서 대부분의 로직 실행
- 브라우저에서 서버로부터 전달받은 HTML과 CSS 단순 렌더링

## 1. Ajax(Asynchronous JavaScript and XML)

- 서버와 브라우저가 비동기(Asynchronous) 방식으로 데이터 교환
- 웹 페이지에서 변경할 필요가 없는 부분 → 다시 렌더링 X
- 서버로부터 필요한 데이터만 전송 → 변경해야 하는 부분만 한정적으로 렌더링

## 2. jQuery

- DOM(Document Object Model) 쉽게 제어 가능
- 크로스 브라우징 이슈 해결

## 3. V8 자바스크립트 엔진

- 데스크톱 애플리케이션과 유사한 사용자 경험(UX, User eXperience) 제공
- 과거 웹 서버에서 수행되던 로직 → 클라이언트(브라우저)로 이동

## 4. Node.js

- 구글 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임 환경
- 브라우저 이외의 환경에서도 동작할 수 있도록 자바스크립트 엔진을 브라우저에서 독립
- 서버 사이드 애플리케이션 개발
- 빌트인 API 제공 : 모듈, 파일 시스템, HTTP 등
- 동형성(Isomorphic) : 프론트엔드와 백엔드 영역에서 자바스크립트 사용 가능
- 비동기 I/O 지원
- 단일 스레드(Single Thread) 이벤트 루프 → 이벤트 처리 성능
- SPA(Single Page Application) 적합

## 5. SPA 프래임워크

- CBD(Component Based Development) 방법론 기반
- Angular, React, Vue.js, Svelte 등

# 4. 자바스크립트와 ECMAScript

- 핵심 문법 : 프로그래밍 언어의 값, 타입, 객체와 프로퍼티, 함수 표준 빌트인 객체 등
- 클라이언트 사이드 Web API
- DOM, BOM, Canvas, XMLHttpRequest, fetch, requestAnimationFrame, SVG, Web Storgate, Web Component, Web Worker 등

# 5. 자바스크립트의 특징

- HTML, CSS와 함께 웹을 구성하는 요소
- 웹 브라우저에서 동작하는 유일한 프로그래밍 언어
- 인터프리터 언어(Interpreter Language) : 개발자가 별도의 컴파일 작업 수행 X
- 소스코드 즉시 실행 및 빠르게 동작하는 머신 코드 생성 및 최적화 가능
- 명령형(Imperative), 함수형(Functional), 프로토타입 기반(Prototype-Based) 객체지향 프로그래밍
- 멀티 패러다임 프로그래밍 언어
- 프로토타입 기반 객체지향 언어
