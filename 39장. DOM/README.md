# 39장. DOM

# 1. 노드

## 1. HTML 요소와 노드 객체

- HTML 요소 : HTML 문서를 구성하는 개별적인 요소
- 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 객체로 변환
    - 어트리뷰트 → 어트리뷰트 노드
    - 텍스트 콘텐츠 → 텍스트 노드
- HTML 요소들의 집합으로 이루어짐, HTML 요소 중첩 관계를 가짐
- HTML 요소 간의 부자 관계를 반영 → HTML 문서의 구성 요소인 HTML 요소를 객체화한 모든 노드 객체들을 트리 자료구조로 구성

### 1. 트리 자료구조(Tree Data Structure)

- 노드들의 계층 구조로 이루어짐
- 부모 노드와 자식 노드로 구성
- 노드 간의 계층적 구조를 표현하는 비선형 자료구조
- DOM : 노드 객체들로 구성된 트리 자료구조, DOM 트리

## 2. 노드 객체의 타입

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

### 1. 문서 노드(Document Node)

- DOM 트리의 최상위에 존재하는 루트 노드로서 `document` 객체를 가리킴
- 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로서 전역 객체 `window` 의 `document` 프로퍼티에 바인딩
- HTML 문서당 `document` 객체는 유일
- DOM 트리의 노드들에 접근하기 위한 진입점 역할 담당

### 2. 요소 노드(Element Node)

- HTML 문서당 `document` 객체는 유일
- DOM 트리의 노드들에 접근하기 위한 진입점 역할 담당

### 2. 요소 노드(Element Node)

- HTML 요소를 가리키는 객체
- HTML 요소 간의 중첩에 의해 부자 관계를 가지며 부자 관계를 통해 정보를 구조화함
- 문서의 구조 표현

### 3. 어트리뷰트 노드(Attribute Node)

- HTML 요소의 어트리뷰트를 가리키는 객체
- 어트리뷰트가 지정된 HTML 요소의 요소 노드와 연결
- 어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경하려면 먼저 요소 노드에 접근

### 4. 텍스트 노드(Text Node)

- HTML 요소의 텍스트를 가리키는 객체
- 문서 정보 표현
- DOM 트리의 최종단

## 3. 노드 객체의 상속 구조

- 브라우저 환경에서 추가적으로 제공하는 호스트 객체
- 모든 노드 객체는 `Object` , `EventTarget` , `Node` 인터페이스 상속받음
- 문서 노드는 `Document` , `HTMLDocument` 인터페이스 상속받음
- 어트리뷰트 노드는 `Attr` , 텍스트 노드는 `CharacterData` 인터페이스 상속받음
- 요소 노드는 `Element` 인터페이스 상속받음
- 요소 노드는 추가적으로 `HTMLElement` 와 태그의 종류별로 세분화된 `HTMLHtmlElement` , `HTMLHeadElement` , `HTMLBodyElement` , `HTMLULinstElement` 등의 인터페이스 상속받음
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <input type="text">
      <script>
        // input 요소 노드 객체를 선택
        const $input = document.querySelector('input');
    
        // input 요소 노드 객체의 프로토타입 체인
        console.log(
          Object.getPrototypeOf($input) === HTMLInputElement.prototype,
          Object.getPrototypeOf(HTMLInputElement.prototype) === HTMLElement.prototype,
          Object.getPrototypeOf(HTMLElement.prototype) === Element.prototype,
          Object.getPrototypeOf(Element.prototype) === Node.prototype,
          Object.getPrototypeOf(Node.prototype) === EventTarget.prototype,
          Object.getPrototypeOf(EventTarget.prototype) === Object.prototype
        ); // 모두 true
      </script>
    </body>
    </html>
    ```
    
- 노드 객체는 공통된 기능일수록 프로토타입 체인의 상위에, 개별적인 고유 기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축하여 노드 객체에 필요한 기능 → 프로퍼티와 메서드를 제공하는 상속 구조를 가짐
- DOM은 HTML 문서의 계층적 구조와 정보를 표현하는 것은 물론 노드 객체의 종류, 노드 타입에 따라 필요한 기능을 프로퍼티와 메서드의 집합인 DOM API로 제공
- DOM API를 통해 HTML의 구조나 내용 또는 스타일 등을 동적으로 조작 가능

# 2. 요소 노드 취득

- HTML 요소를 조작하는 시점
- DOM은 요소 노드를 취득할 수 있는 다양한 메서드 제공

## 1. id를 이용한 요소 노드 취득

- `Document.prototype.getElementById` 메서드 : 인술로 전달한 id 어트리뷰트 값을 갖는 하나의 요소 노드를 탐색하여 반환
- 문서 노드인 `document` 를 통해 호출
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li id="apple">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
        <script>
          // id 값이 'banana'인 요소 노드를 탐색하여 반환한다.
          // 두 번째 li 요소가 파싱되어 생성된 요소 노드가 반환된다.
          const $elem = document.getElementById('banana');
    
          // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
          $elem.style.color = 'red';
        </script>
      </body>
    </html>
    ```
    
- id 값 : HTML 문서 내에서 유일한 값, `class` 어트리뷰트와는 달리 공백 문자로 구분하여 여러 개의 값을 가질 수 없음
- HTML 문서 내에는 중복된 id 값을 갖는 요소가 여러 개 존재할 가능성 있음 → 인수로 전달된 id 값을 갖는 첫 번째 요소 노드만 반환
- 언제나 단 하나의 요소 노드 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li id="banana">Apple</li>
          <li id="banana">Banana</li>
          <li id="banana">Orange</li>
        </ul>
        <script>
          // getElementById 메서드는 언제나 단 하나의 요소 노드를 반환한다.
          // 첫 번째 li 요소가 파싱되어 생성된 요소 노드가 반환된다.
          const $elem = document.getElementById('banana');
    
          // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
          $elem.style.color = 'red';
        </script>
      </body>
    </html>
    ```
    
- 인수로 전달된 id 값을 갖는 HTML 요소 존재하지 않을 경우 → `null` 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li id="apple">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
        <script>
          // id 값이 'grape'인 요소 노드를 탐색하여 반환한다. null이 반환된다.
          const $elem = document.getElementById('grape');
    
          // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
          $elem.style.color = 'red';
          // -> TypeError: Cannot read property 'style' of null
        </script>
      </body>
    </html>
    ```
    
- HTML 요소에 id 어트리뷰트 부여 → id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당되는 부수 효과 존재
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo"></div>
        <script>
          // id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당된다.
          console.log(foo === document.getElementById('foo')); // true
    
          // 암묵적 전역으로 생성된 전역 프로퍼티는 삭제되지만 전역 변수는 삭제되지 않는다.
          delete foo;
          console.log(foo); // <div id="foo"></div>
        </script>
      </body>
    </html>
    ```
    
- id 값과 동일한 이름의 전역 변수 이미 선언 → 전역 변수에 노드 객체가 재할당되지 않음
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo"></div>
        <script>
          let foo = 1;
    
          // id 값과 동일한 이름의 전역 변수가 이미 선언되어 있으면 노드 객체가 재할당되지 않는다.
          console.log(foo); // 1
        </script>
      </body>
    </html>
    ```
    

## 2. 태그 이름을 이용한 요소 노드 취득

- `Document.prototype/Element.prototype.getElementsByTagName` 메서드 : 인수로 전달한 태그 이름을 갖는 모든 요소 노드들을 탐색하여 반환
- 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 `HTMLCollection` 객체 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li id="apple">Apple</li>
          <li id="banana">Banana</li>
          <li id="orange">Orange</li>
        </ul>
        <script>
          // 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
          // 탐색된 요소 노드들은 HTMLCollection 객체에 담겨 반환된다.
          // HTMLCollection 객체는 유사 배열 객체이면서 이터러블이다.
          const $elems = document.getElementsByTagName('li');
    
          // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
          // HTMLCollection 객체를 배열로 변환하여 순회하며 color 프로퍼티 값을 변경한다.
          [...$elems].forEach(elem => { elem.style.color = 'red'; });
        </script>
      </body>
    </html>
    ```
    
- 여러 개의 값 반환 → 배열이나 객체와 같은 자료구조에 담아 반환
- 유사 배열 객체이면서 이터러블
- HTML 문서의 모든 요소 노드 취득 → `getElementsByTagName` 메서드 인수로 `*` 전달
    
    ```jsx
    // 모든 요소 노드를 탐색하여 반환한다.
    const $all = document.getElementsByTagName('*');
    // -> HTMLCollection(8) [html, head, body, ul, li#apple, li#banana, li#orange, script, apple: li#apple, banana: li#banana, orange: li#orange]
    ```
    
- `Document.prototype.getElementsByTagName`
    - DOM의 루트 노드인 문서 노드, `document` 를 통해 호출
    - DOM 전체에서 요소 노드를 탐색하여 반환
- `Element.prototype.getElementsByTagName` 메서드
    - 특정 요소 노드를 통해 호출
    - 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
        <ul>
          <li>HTML</li>
        </ul>
        <script>
          // DOM 전체에서 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
          const $lisFromDocument = document.getElementsByTagName('li');
          console.log($lisFromDocument); // HTMLCollection(4) [li, li, li, li]
    
          // #fruits 요소의 자손 노드 중에서 태그 이름이 li인 요소 노드를 모두
          // 탐색하여 반환한다.
          const $fruits = document.getElementById('fruits');
          const $lisFromFruits = $fruits.getElementsByTagName('li');
          console.log($lisFromFruits); // HTMLCollection(3) [li, li, li]
        </script>
      </body>
    </html>
    ```
    
- 인수로 전달된 태그 이름을 갖는 요소 존재하지 않을 경우 → 빈 `HTMLCollection` 객체 반환

## 3. class를 이용한 요소 노드 취득

- `Document.prototype/Element.prototype.getElementsByClassName` 메서드 : 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소 노드들을 탐색하여 반환
- 인수로 전달할 class 값은 공백으로 구분하여 여러 개의 class 지정
- 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 `HTMLCollection` 객체 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li class="fruit apple">Apple</li>
          <li class="fruit banana">Banana</li>
          <li class="fruit orange">Orange</li>
        </ul>
        <script>
          // class 값이 'fruit'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다.
          const $elems = document.getElementsByClassName('fruit');
    
          // 취득한 모든 요소의 CSS color 프로퍼티 값을 변경한다.
          [...$elems].forEach(elem => { elem.style.color = 'red'; });
    
          // class 값이 'fruit apple'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다.
          const $apples = document.getElementsByClassName('fruit apple');
    
          // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
          [...$apples].forEach(elem => { elem.style.color = 'blue'; });
        </script>
      </body>
    </html>
    ```
    
- `Document.prototype.getElementsByClassName` 메서드
    - DOM의 루트 노드인 문서 노드, `document` 를 통해 호출
    - DOM 전체에서 요소 노드를 탐색하여 반환
- `Element.prototype.getElementsByClassName` 메서드
    - 특정 요소 노드를 통해 호출
    - 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
          <li class="banana">Banana</li>
          <li class="orange">Orange</li>
        </ul>
        <div class="banana">Banana</div>
        <script>
          // DOM 전체에서 class 값이 'banana'인 요소 노드를 모두 탐색하여 반환한다.
          const $bananasFromDocument = document.getElementsByClassName('banana');
          console.log($bananasFromDocument); // HTMLCollection(2) [li.banana, div.banana]
    
          // #fruits 요소의 자손 노드 중에서 class 값이 'banana'인 요소 노드를 모두 탐색하여 반환한다.
          const $fruits = document.getElementById('fruits');
          const $bananasFromFruits = $fruits.getElementsByClassName('banana');
    
          console.log($bananasFromFruits); // HTMLCollection [li.banana]
        </script>
      </body>
    </html>
    ```
    
- 인수로 전달된 class 값을 갖는 요소가 존재하지 않는 경우 → 빈 `HTMLCollection` 객체 반환

## 4. CSS 선택자를 이용한 요소 노드 취득

- 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법
    
    ```jsx
    /* 전체 선택자: 모든 요소를 선택 */
    * { ... }
    /* 태그 선택자: 모든 p 태그 요소를 모두 선택 */
    p { ... }
    /* id 선택자: id 값이 'foo'인 요소를 모두 선택 */
    #foo { ... }
    /* class 선택자: class 값이 'foo'인 요소를 모두 선택 */
    .foo { ... }
    /* 어트리뷰트 선택자: input 요소 중에 type 어트리뷰트 값이 'text'인 요소를 모두 선택 */
    input[type=text] { ... }
    /* 후손 선택자: div 요소의 후손 요소 중 p 요소를 모두 선택 */
    div p { ... }
    /* 자식 선택자: div 요소의 자식 요소 중 p 요소를 모두 선택 */
    div > p { ... }
    /* 인접 형제 선택자: p 요소의 형제 요소 중에 p 요소 바로 뒤에 위치하는 ul 요소를 선택 */
    p + ul { ... }
    /* 일반 형제 선택자: p 요소의 형제 요소 중에 p 요소 뒤에 위치하는 ul 요소를 모두 선택 */
    p ~ ul { ... }
    /* 가상 클래스 선택자: hover 상태인 a 요소를 모두 선택 */
    a:hover { ... }
    /* 가상 요소 선택자: p 요소의 콘텐츠의 앞에 위치하는 공간을 선택
       일반적으로 content 프로퍼티와 함께 사용된다. */
    p::before { ... }
    ```
    
- `Document.prototype/Element.prototype.querySelector` 메서드 : 인수로 전달한 CSS 선택자를 만족시키는 하나의 요소 노드를 탐색하여 반환
    - 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 여러 개인 경우 : 첫 번째 요소 노드만 반환
    - 인수로 전달한 CSS 선택자를 만족시키는 요소 노드가 존재하지 않는 경우 : `null` 반환
    - 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 : `DOMException` 에러 발생
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li class="apple">Apple</li>
          <li class="banana">Banana</li>
          <li class="orange">Orange</li>
        </ul>
        <script>
          // class 어트리뷰트 값이 'banana'인 첫 번째 요소 노드를 탐색하여 반환한다.
          const $elem = document.querySelector('.banana');
    
          // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
          $elem.style.color = 'red';
        </script>
      </body>
    </html>
    ```
    
- `Document.prototype/Element.prototype.querySelectorAll` 메서드 : 인수로 전달한 CSS 선택자를 만족시키는 모든 요소 노드를 탐색하여 반환
- 여러 개의 요소 노드 객체를 갖는 DOM 컬렉션 객체인 `NodeList` 객체 반환
- 유사 배열 객체이면서 이터러블
    - 인수로 전달한 CSS 선택자를 만족시키는 요소가 존재하지 않을 경우 : 빈 `NodeList` 객체 반환
    - 인수로 전달한 CSS 선택자가 문법에 맞지 않는 경우 : `DOMException` 에러 발생
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul>
          <li class="apple">Apple</li>
          <li class="banana">Banana</li>
          <li class="orange">Orange</li>
        </ul>
        <script>
          // ul 요소의 자식 요소인 li 요소를 모두 탐색하여 반환한다.
          const $elems = document.querySelectorAll('ul > li');
          // 취득한 요소 노드들은 NodeList 객체에 담겨 반환된다.
          console.log($elems); // NodeList(3) [li.apple, li.banana, li.orange]
    
          // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
          // NodeList는 forEach 메서드를 제공한다.
          $elems.forEach(elem => { elem.style.color = 'red'; });
        </script>
      </body>
    </html>
    ```
    
- HTML 문서의 모든 요소 취득 → `querySelectorAll` 메서드의 인수로 전체 선택자 `*` 전달
    
    ```jsx
    // 모든 요소 노드를 탐색하여 반환한다.
    const $all = document.querySelectorAll('*');
    // -> NodeList(8) [html, head, body, ul, li#apple, li#banana, li#orange, script]
    ```
    
- `Document.prototype` 에 정의된 메서드
    - DOM의 루트 노드인 문서 노드, `document` 를 통해 호출
    - DOM 전체에서 요소 노드를 탐색하여 반환
- `Element.prototype` 에 정의된 메서드
    - 특정 요소 노드를 통해 호출
    - 특정 요소 노드의 자손 노드 중에서 요소 노드를 탐색하여 반환
- CSS 선택자 문법을 사용하여 좀 더 구체적인 조건으로 요소 노드 취득 가능
- 일관된 방식으로 요소 노드 취득 가능
- id 어트리뷰트가 있는 요소 노드를 취득하는 경우 → `getElementById` 메서드 사용

## 5. 특정 요소 노드를 취득할 수 있는지 확인

- `Element.protype.matches` 메서드 : 인수로 전달한 CSS 선택자를 통해 특정 요소 노드를 취득할 수 있는지 확인
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
          <li class="banana">Banana</li>
          <li class="orange">Orange</li>
        </ul>
      </body>
      <script>
        const $apple = document.querySelector('.apple');
    
        // $apple 노드는 '#fruits > li.apple'로 취득할 수 있다.
        console.log($apple.matches('#fruits > li.apple'));  // true
    
        // $apple 노드는 '#fruits > li.banana'로 취득할 수 없다.
        console.log($apple.matches('#fruits > li.banana')); // false
      </script>
    </html>
    ```
    

## 6. `HTMLCollection` 과 `NodeList`

- DOM API가 여러 개의 결과값을 반환하기 위한 DOM 컬렉션 객체
- 유사 배열 객체이면서 이터러블
- `for ... of` 문으로 순회 가능, 스프레드 문법을 사용하여 간단히 배열로 변환 가능
- 노드 객체의 상태 변화를 실시간으로 반영하는 살아 있는 객체

### 1. `HTMLCollection`

- 노드 객체의 상태 변화를 실시간으로 반영하는 살아 있는 DOM 컬렉션 객체
- 살아 있는 객체
    
    ```html
    <!DOCTYPE html>
    <head>
      <style>
        .red { color: red; }
        .blue { color: blue; }
      </style>
    </head>
    <html>
      <body>
        <ul id="fruits">
          <li class="red">Apple</li>
          <li class="red">Banana</li>
          <li class="red">Orange</li>
        </ul>
        <script>
          // class 값이 'red'인 요소 노드를 모두 탐색하여 HTMLCollection 객체에 담아 반환한다.
          const $elems = document.getElementsByClassName('red');
          // 이 시점에 HTMLCollection 객체에는 3개의 요소 노드가 담겨 있다.
          console.log($elems); // HTMLCollection(3) [li.red, li.red, li.red]
    
          // HTMLCollection 객체의 모든 요소의 class 값을 'blue'로 변경한다.
          for (let i = 0; i < $elems.length; i++) {
            $elems[i].className = 'blue';
          }
    
          // HTMLCollection 객체의 요소가 3개에서 1개로 변경되었다.
          console.log($elems); // HTMLCollection(1) [li.red]
        </script>
      </body>
    </html>
    ```
    
- 실시간으로 노드 객체의 상태 변경을 반영하여 요소를 제거할 수 있기 떄문에 `HTMLCollection` 객체를 `for` 문으로 순회하면서 노드 객체의 상태를 변경해야 할 때 주의 필요
- `for` 문을 역방향으로 순회하는 방법으로 회피 가능
    
    ```jsx
    // for 문을 역방향으로 순회
    for (let i = $elems.length - 1; i >= 0; i--) {
      $elems[i].className = 'blue';
    }
    ```
    
- `while` 문을 사용하여 `HTMLCollection` 객체에 노드 객체가 남아 있지 않을 때까지 무한 반복하는 방법으로 회피 가능
    
    ```jsx
    // while 문으로 HTMLCollection에 요소가 남아 있지 않을 때까지 무한 반복
    let i = 0;
    while ($elems.length > i) {
      $elems[i].className = 'blue';
    }
    ```
    
- `HTMLCollection` 객체 미사용
    
    ```jsx
    // 유사 배열 객체이면서 이터러블인 HTMLCollection을 배열로 변환하여 순회
    [...$elems].forEach(elem => elem.className = 'blue');
    ```
    

### 2. `NodeList`

- `querySelectorAll` 메서드 : DOM 컬렉션 객체인 `NodeList` 객체 반환
- `NodeList` 객체는 실시간으로 노드 객체의 상태 변경을 반영하지 않는 객체
    
    ```jsx
    // querySelectorAll은 DOM 컬렉션 객체인 NodeList를 반환한다.
    const $elems = document.querySelectorAll('.red');
    
    // NodeList 객체는 NodeList.prototype.forEach 메서드를 상속받아 사용할 수 있다.
    $elems.forEach(elem => elem.className = 'blue');
    ```
    
- `childNodes` 프로퍼티가 반환하는 `NodeList` 객체는 `HTMLCollection` 객체와 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live 객체로 동작 → 주의 필요
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // childNodes 프로퍼티는 NodeList 객체(live)를 반환한다.
        const { childNodes } = $fruits;
        console.log(childNodes instanceof NodeList); // true
    
        // $fruits 요소의 자식 노드는 공백 텍스트 노드(39.3.1절 "공백 텍스트 노드" 참고)를 포함해 모두 5개다.
        console.log(childNodes); // NodeList(5) [text, li, text, li, text]
    
        for (let i = 0; i < childNodes.length; i++) {
          // removeChild 메서드는 $fruits 요소의 자식 노드를 DOM에서 삭제한다.
          // (39.6.9절 "노드 삭제" 참고)
          // removeChild 메서드가 호출될 때마다 NodeList 객체인 childNodes가 실시간으로 변경된다.
          // 따라서 첫 번째, 세 번째 다섯 번째 요소만 삭제된다.
          $fruits.removeChild(childNodes[i]);
        }
    
        // 예상과 다르게 $fruits 요소의 모든 자식 노드가 삭제되지 않는다.
        console.log(childNodes); // NodeList(2) [li, li]
      </script>
    </html>
    ```
    
- 노드 객체의 상태 변경과 상관없이 안전하게 DOM 컬렉션 사용 → `HTMLCollection` 이나 `NodeList` 객체를 배열로 변환하여 사용하는 것을 권장
- 모두 유사 배열 객체이면서 이터러블
- 스프레드 문법이나 `Array.from` 메서드를 사용하여 간단히 배열로 변환 가능
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // childNodes 프로퍼티는 NodeList 객체(live)를 반환한다.
        const { childNodes } = $fruits;
    
        // 스프레드 문법을 사용하여 NodeList 객체를 배열로 변환한다.
        [...childNodes].forEach(childNode => {
          $fruits.removeChild(childNode);
        });
    
        // $fruits 요소의 모든 자식 노드가 모두 삭제되었다.
        console.log(childNodes); // NodeList []
      </script>
    </html>
    ```
