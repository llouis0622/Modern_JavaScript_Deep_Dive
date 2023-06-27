# 48장. 모듈

# 1. 모듈의 일반적 의미

- 애플리케이션을 구성하는 개별적 요소
- 재사용 가능한 코드 조각
- 기능을 기준으로 파일 단위로 분리
- 자신만의 파일 스코프를 가질 수 있어야 함 → 자신만의 파일 스코프를 갖는 모듈의 모든 자산은 캡슐화되어 다른 모듈에서 접근할 수 없음
- `export` : 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개 가능
- `import` : 모듈 사용자는 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용 가능

# 2. 자바스크립트와 모듈

- ECMAScript 표준 사양은 아지니만 모듈 시스템 지원

# 3. ES6 모듈(ESM)

- `script` 태그에 `type="module"` 어트리뷰트 추가 → 로드된 자바스크립트 파일은 모듈로서 동작
- 일반적인 자바스크립트 파일이 아닌 ESM임을 명확히 하기 위해 ESM의 파일 확장자는 `mjs` 사용
    
    ```jsx
    <script type="module" src="app.mjs"></script>
    ```
    
- 기본적으로 strict mode 적용

## 1. 모듈 스코프

- 독자적인 모듈 스코프를 가짐
- 일반적인 자바스크립트 파일은 `script` 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않음
    
    ```jsx
    // foo.js
    // x 변수는 전역 변수다.
    var x = 'foo';
    console.log(window.x); // foo
    ```
    
    ```jsx
    // bar.js
    // x 변수는 전역 변수다. foo.js에서 선언한 전역 변수 x와 중복된 선언이다.
    var x = 'bar';
    
    // foo.js에서 선언한 전역 변수 x의 값이 재할당되었다.
    console.log(window.x); // bar
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <script src="foo.js"></script>
      <script src="bar.js"></script>
    </body>
    </html>
    ```
    
- 파일 자체의 독자적인 모듈 스코프 제공
- 모듈 내에서 `var` 키워드로 선언한 변수는 더는 전역 변수가 아니며 `window` 객체의 프로퍼티도 아님
    
    ```jsx
    // foo.mjs
    // x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
    var x = 'foo';
    console.log(x); // foo
    console.log(window.x); // undefined
    ```
    
    ```jsx
    // bar.mjs
    // x 변수는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
    // foo.mjs에서 선언한 x 변수와 스코프가 다른 변수다.
    var x = 'bar';
    console.log(x); // bar
    console.log(window.x); // undefined
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <script type="module" src="foo.mjs"></script>
      <script type="module" src="bar.mjs"></script>
    </body>
    </html>
    ```
    
- 모듈 내에서 선언한 식별자는 모듈 외부에서 참조 불가
    
    ```jsx
    // foo.mjs
    const x = 'foo';
    console.log(x); // foo
    ```
    
    ```jsx
    // bar.mjs
    console.log(x); // ReferenceError: x is not defined
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <script type="module" src="foo.mjs"></script>
      <script type="module" src="bar.mjs"></script>
    </body>
    </html>
    ```
    

## 2. `export` 키워드

- 모듈 내부에서 선언한 식별자를 외부에 공개하여 다른 모듈들이 재사용할 수 있게 함
- 선언문 앞에 사용
    
    ```jsx
    // lib.mjs
    // 변수의 공개
    export const pi = Math.PI;
    
    // 함수의 공개
    export function square(x) {
      return x * x;
    }
    
    // 클래스의 공개
    export class Person {
      constructor(name) {
        this.name = name;
      }
    }
    ```
    
- `export` 할 대상을 하나의 객체로 구성하여 한 번에 `export` 가능
    
    ```jsx
    // lib.mjs
    const pi = Math.PI;
    
    function square(x) {
      return x * x;
    }
    
    class Person {
      constructor(name) {
        this.name = name;
      }
    }
    
    // 변수, 함수 클래스를 하나의 객체로 구성하여 공개
    export { pi, square, Person };
    ```
    

## 3. `import` 키워드

- 다른 모듈에서 공개한 식별자를 자신의 모듈 스코프 내부로 로드함
- 다른 모듈이 `export` 한 식별자 이름으로 `import` 해야 하며 ESM의 경우 파일 확장자를 생략 불가
    
    ```jsx
    // app.mjs
    // 같은 폴더 내의 lib.mjs 모듈이 export한 식별자 이름으로 import한다.
    // ESM의 경우 파일 확장자를 생략할 수 없다.
    import { pi, square, Person } from './lib.mjs';
    
    console.log(pi);         // 3.141592653589793
    console.log(square(10)); // 100
    console.log(new Person('Lee')); // Person { name: 'Lee' }
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <script type="module" src="app.mjs"></script>
    </body>
    </html>
    ```
    
- 모듈이 `export` 한 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 한 번에 `import` 가능
- `import` 되는 식별자는 `as` 뒤에 지정한 이름의 객체에 프로퍼티로 할당
    
    ```jsx
    // app.mjs
    // lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import한다.
    import * as lib from './lib.mjs';
    
    console.log(lib.pi);         // 3.141592653589793
    console.log(lib.square(10)); // 100
    console.log(new lib.Person('Lee')); // Person { name: 'Lee' }
    ```
    
- 모듈이 `export` 한 식별자 이름을 변경하여 `import` 가능
    
    ```jsx
    // app.mjs
    // lib.mjs 모듈이 export한 식별자 이름을 변경하여 import한다.
    import { pi as PI, square as sq, Person as P } from './lib.mjs';
    
    console.log(PI);    // 3.141592653589793
    console.log(sq(2)); // 4
    console.log(new P('Kim')); // Person { name: 'Kim' }
    ```
    
- 모듈에서 하나의 값만 `export` 한다면 `default` 키워드 사용 가능
- 이름 없이 하나의 값을 `export`
    
    ```jsx
    // lib.mjs
    export default x => x * x;
    ```
    
- `default` 키워드 사용 → `var, let, const` 키워드 사용 불가
    
    ```jsx
    // lib.mjs
    export default const foo = () => {};
    // => SyntaxError: Unexpected token 'const'
    // export default () => {};
    ```
    
- `default` 키워드와 함께 `export` 한 모듈 → `{ }` 없이 임의의 이름으로 `import`
    
    ```jsx
    // app.mjs
    import square from './lib.mjs';
    
    console.log(square(3)); // 9
    ```
