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
    

# 3. 노드 탐색

```html
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="banana">Banana</li>
  <li class="orange">Orange</li>
</ul>
```

- `Node` , `Element` 인터페이스 : 트리 탐색 프로퍼티 제공
- `Node.prototype` 제공 : `parentNode, previousSibling, firstChild, childNodes` 프로퍼티
- `Element.prototype` 제공 : `previousElementSibling, nextElementSibling, children` 프로퍼티
- 노드 탐색 프로퍼티 : `setter` 없이 `getter` 만 존재, 참조만 가능한 읽기 전용 접근자 프로퍼티

## 1. 공백 텍스트 노드

- HTML 요소 사이의 스페이스, 탭, 줄바꿈 등의 공백 문자는 텍스트 노드 생성
    
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
    </html>
    ```
    
    ```html
    <ul id="fruits"><li
      class="apple">Apple</li><li
      class="banana">Banana</li><li
      class="orange">Orange</li></ul>
    ```
    

## 2. 자식 노드 탐색

- `Node.prototype.childNodes`
    - 자식 노드를 모두 탐색하여 DOM 컬렉션 객체인 `NodeList` 에 담아 반환
    - `childNode` 프로퍼티가 반환한 `NodeList` 에는 요소 노드뿐만 아니라 텍스트 노드도 포함될 수 있음
- `Element.prototype.children`
    - 자식 노드 중에서 요소 노드만 모두 탐색하여 DOM 컬렉션 객체인 `HTMLCollection` 에 담아 반환
    - `children` 프로퍼티가 반환한 `HTMLCollection` 에는 텍스트 노드가 포함되지 않음
- `Node.prototype.firstChild`
    - 첫 번째 자식 노드 반환
    - `firstChild` 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드
- `Node.prototype.lastChild`
    - 마지막 자식 노드 반환
    - `lastChild` 프로퍼티가 반환한 노드는 텍스트 노드이거나 요소 노드
- `Element.prototype.firstElementChild`
    - 첫 번째 자식 요소 노드 반환
    - `firstElementChild` 프로퍼티는 요소 노드만 반환
- `Element.prototype.lastElementChild`
    - 마지막 자식 요소 노드 반환
    - `lastElementChild` 프로퍼티는 요소 노드만 반환
    
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
        // 노드 탐색의 기점이 되는 #fruits 요소 노드를 취득한다.
        const $fruits = document.getElementById('fruits');
    
        // #fruits 요소의 모든 자식 노드를 탐색한다.
        // childNodes 프로퍼티가 반환한 NodeList에는 요소 노드뿐만 아니라 텍스트 노드도 포함되어 있다.
        console.log($fruits.childNodes);
        // NodeList(7) [text, li.apple, text, li.banana, text, li.orange, text]
    
        // #fruits 요소의 모든 자식 노드를 탐색한다.
        // children 프로퍼티가 반환한 HTMLCollection에는 요소 노드만 포함되어 있다.
        console.log($fruits.children);
        // HTMLCollection(3) [li.apple, li.banana, li.orange]
    
        // #fruits 요소의 첫 번째 자식 노드를 탐색한다.
        // firstChild 프로퍼티는 텍스트 노드를 반환할 수도 있다.
        console.log($fruits.firstChild); // #text
    
        // #fruits 요소의 마지막 자식 노드를 탐색한다.
        // lastChild 프로퍼티는 텍스트 노드를 반환할 수도 있다.
        console.log($fruits.lastChild); // #text
    
        // #fruits 요소의 첫 번째 자식 노드를 탐색한다.
        // firstElementChild 프로퍼티는 요소 노드만 반환한다.
        console.log($fruits.firstElementChild); // li.apple
    
        // #fruits 요소의 마지막 자식 노드를 탐색한다.
        // lastElementChild 프로퍼티는 요소 노드만 반환한다.
        console.log($fruits.lastElementChild); // li.orange
      </script>
    </html>
    ```
    

## 3. 자식 노드 존재 확인

- `Node.prototype.hasChildNodes` 메서드 사용
- 자식 노드가 존재하면 `true` , 자식 노드가 존재하지 않으면 `false` 반환
- 텍스트 노드를 포함하여 자식 노드의 존재 확인
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
        </ul>
      </body>
      <script>
        // 노드 탐색의 기점이 되는 #fruits 요소 노드를 취득한다.
        const $fruits = document.getElementById('fruits');
    
        // #fruits 요소에 자식 노드가 존재하는지 확인한다.
        // hasChildNodes 메서드는 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.
        console.log($fruits.hasChildNodes()); // true
      </script>
    </html>
    ```
    
- 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지 확인 → `children.length` 또는 `Element` 인터페이스의 `childElementCount` 프로퍼티 사용
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
        </ul>
      </body>
      <script>
        // 노드 탐색의 기점이 되는 #fruits 요소 노드를 취득한다.
        const $fruits = document.getElementById('fruits');
    
        // hasChildNodes 메서드는 텍스트 노드를 포함하여 자식 노드의 존재를 확인한다.
        console.log($fruits.hasChildNodes()); // true
    
        // 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지는 확인한다.
        console.log(!!$fruits.children.length); // 0 -> false
        // 자식 노드 중에 텍스트 노드가 아닌 요소 노드가 존재하는지는 확인한다.
        console.log(!!$fruits.childElementCount); // 0 -> false
      </script>
    </html>
    ```
    

## 4. 요소 노드의 텍스트 노드 탐색

- 요소 노드의 텍스트 노드는 `firstChild` 프로퍼티로 접근 가능
- 첫 번째 자식 노드 반환
- 텍스트 노드이거나 요소 노드
    
    ```html
    <!DOCTYPE html>
    <html>
    <body>
      <div id="foo">Hello</div>
      <script>
        // 요소 노드의 텍스트 노드는 firstChild 프로퍼티로 접근할 수 있다.
        console.log(document.getElementById('foo').firstChild); // #text
      </script>
    </body>
    </html>
    ```
    

## 5. 부모 노드 탐색

- `Node.prototype.parentNode` 프로퍼티 사용
- 텍스트 노드는 DOM 트리의 최종단 노드인 리프 노드, 부모 노드가 텍스트 노드인 경우는 없음
    
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
        // 노드 탐색의 기점이 되는 .banana 요소 노드를 취득한다.
        const $banana = document.querySelector('.banana');
    
        // .banana 요소 노드의 부모 노드를 탐색한다.
        console.log($banana.parentNode); // ul#fruits
      </script>
    </html>
    ```
    

## 6. 형제 노드 탐색

- 텍스트 노드 또는 요소 노드만 반환
- `Node.prototype.previousSibling`
    - 부모 노드가 같은 형제 노드 중에서 자신의 이전 형제 노드를 탐색하여 반환
    - `previousSibling` 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있음
- `Node.prototype.nextSibling`
    - 부모 노드가 같은 형제 노드 중에서 자신의 다음 형제 노드를 탐색하여 반환
    - `nextSibling` 프로퍼티가 반환하는 형제 노드는 요소 노드뿐만 아니라 텍스트 노드일 수도 있음
- `Element.prototype.previousElementSibling`
    - 부모 노드가 같은 형제 요소 노드 중에서 자신의 이전 형제 요소 노드를 탐색하여 반환
    - `previousElementSibling` 프로퍼티는 요소 노드만 반환
- `Element.prototype.nextElementSibling`
    - 부모 노드가 같은 형제 요소 노드 중에서 자신의 다음 형제 요소 노드를 탐색하여 반환
    - `nextElementSibling` 프로퍼티는 요소 노드만 반환
    
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
        // 노드 탐색의 기점이 되는 #fruits 요소 노드를 취득한다.
        const $fruits = document.getElementById('fruits');
    
        // #fruits 요소의 첫 번째 자식 노드를 탐색한다.
        // firstChild 프로퍼티는 요소 노드뿐만 아니라 텍스트 노드를 반환할 수도 있다.
        const { firstChild } = $fruits;
        console.log(firstChild); // #text
    
        // #fruits 요소의 첫 번째 자식 노드(텍스트 노드)의 다음 형제 노드를 탐색한다.
        // nextSibling 프로퍼티는 요소 노드뿐만 아니라 텍스트 노드를 반환할 수도 있다.
        const { nextSibling } = firstChild;
        console.log(nextSibling); // li.apple
    
        // li.apple 요소의 이전 형제 노드를 탐색한다.
        // previousSibling 프로퍼티는 요소 노드뿐만 아니라 텍스트 노드를 반환할 수도 있다.
        const { previousSibling } = nextSibling;
        console.log(previousSibling); // #text
    
        // #fruits 요소의 첫 번째 자식 요소 노드를 탐색한다.
        // firstElementChild 프로퍼티는 요소 노드만 반환한다.
        const { firstElementChild } = $fruits;
        console.log(firstElementChild); // li.apple
    
        // #fruits 요소의 첫 번째 자식 요소 노드(li.apple)의 다음 형제 노드를 탐색한다.
        // nextElementSibling 프로퍼티는 요소 노드만 반환한다.
        const { nextElementSibling } = firstElementChild;
        console.log(nextElementSibling); // li.banana
    
        // li.banana 요소의 이전 형제 요소 노드를 탐색한다.
        // previousElementSibling 프로퍼티는 요소 노드만 반환한다.
        const { previousElementSibling } = nextElementSibling;
        console.log(previousElementSibling); // li.apple
      </script>
    </html>
    ```
    

# 4. 노드 정보 취득

- `Node.prototype.nodeType`
    - 노드 객체의 종류, 노드 타입을 나타내는 상수 반환
    - 노드 타입 상수는 `Node` 에 정의
        - `Node.ELEMENT_NODE` : 요소 노드 타입을 나타내는 상수 1 반환
        - `Node.TEXT_NODE` : 텍스트 노드 타입을 나타내는 상수 3 반환
        - `Node.DOCUMENT_NODE` : 문서 노드 타입을 나타내는 상수 9 반환
- `Node.prototype.nodeName`
    - 노드의 이름을 문자열로 반환
        - 요소 노드 : 대문자 문자열로 태그 이름을 반환
        - 텍스트 노드 : 문자열 `#text` 반환
        - 문서 노드 : 문자열 `#document` 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // 문서 노드의 노드 정보를 취득한다.
        console.log(document.nodeType); // 9
        console.log(document.nodeName); // #document
    
        // 요소 노드의 노드 정보를 취득한다.
        const $foo = document.getElementById('foo');
        console.log($foo.nodeType); // 1
        console.log($foo.nodeName); // DIV
    
        // 텍스트 노드의 노드 정보를 취득한다.
        const $textNode = $foo.firstChild;
        console.log($textNode.nodeType); // 3
        console.log($textNode.nodeName); // #text
    </script>
    </html>
    ```
    

# 5. 요소 노드의 텍스트 조작

## 1. `nodeValue`

- `setter` 와 `getter` 모두 존재하는 접근자 프로퍼티
- 참조와 할당 모두 가능
- 노드 객체의 `nodeValue` 프로퍼티 참조 → 노드 객체의 값 반환
- 문서 노드나 요소 노드의 `nodeValue` 프로퍼티 참조 → `null` 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // 문서 노드의 nodeValue 프로퍼티를 참조한다.
        console.log(document.nodeValue); // null
    
        // 요소 노드의 nodeValue 프로퍼티를 참조한다.
        const $foo = document.getElementById('foo');
        console.log($foo.nodeValue); // null
    
        // 텍스트 노드의 nodeValue 프로퍼티를 참조한다.
        const $textNode = $foo.firstChild;
        console.log($textNode.nodeValue); // Hello
      </script>
    </html>
    ```
    
- 텍스트 노드의 `nodeValue` 프로퍼티 참조할 때만 텍스트 노드의 값, 텍스트 반환
- 텍스트 노드의 `nodeValue` 프로퍼티에 값 할당 → 텍스트 노드의 값, 텍스트 변경 가능
    - 텍스트를 변경할 요소 노드를 취득한 다음, 취득한 요소 노드의 텍스트 노드 탐색
    - 텍스트 노드는 요소 노드의 자식 노드 → `firstChild` 프로퍼티를 사용하여 탐색
    - 탐색한 텍스트 노드의 `nodeValue` 프로퍼티를 사용하여 텍스트 노드의 값 변경
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // 1. #foo 요소 노드의 자식 노드인 텍스트 노드를 취득한다.
        const $textNode = document.getElementById('foo').firstChild;
    
        // 2. nodeValue 프로퍼티를 사용하여 텍스트 노드의 값을 변경한다.
        $textNode.nodeValue = 'World';
    
        console.log($textNode.nodeValue); // World
      </script>
    </html>
    ```
    

## 2. `textContent`

- `setter` 와 `getter` 모두 존재하는 접근자 프로퍼티
- 요소 노드의 텍스트와 모든 자손 노드의 텍스트를 모두 취득하거나 변경
- 요소 노드의 콘텐츠 영역 내의 텍스트 모두 반환
- 요소 노드의 `childNodes` 프로퍼티가 반환한 모든 노드들의 텍스트 노드의 값, 텍스트 모두 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello <span>world!</span></div>
      </body>
      <script>
        // #foo 요소 노드의 텍스트를 모두 취득한다. 이때 HTML 마크업은 무시된다.
        console.log(document.getElementById('foo').textContent); // Hello world!
      </script>
    </html>
    ```
    
- 텍스트 노드가 아닌 노드의 `nodeValue` 프로퍼티는 `null` 반환
- 텍스트 노드의 `nodeValue` 프로퍼티를 참조할 때 텍스트 노드의 값, 텍스트 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello <span>world!</span></div>
      </body>
      <script>
        // #foo 요소 노드는 텍스트 노드가 아니다.
        console.log(document.getElementById('foo').nodeValue); // null
        // #foo 요소 노드의 자식 노드인 텍스트 노드의 값을 취득한다.
        console.log(document.getElementById('foo').firstChild.nodeValue); // Hello
        // span 요소 노드의 자식 노드인 텍스트 노드의 값을 취득한다.
        console.log(document.getElementById('foo').lastChild.firstChild.nodeValue); // world!
      </script>
    </html>
    ```
    
- 요소 노드의 콘텐츠 영역에 자식 요소 노드가 없고 텍스트만 존재 → `firstChild.nodeValue` 와 `textContent` 프로퍼티 같은 결과 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <!-- 요소 노드의 콘텐츠 영역에 다른 요소 노드가 없고 텍스트만 존재 -->
        <div id="foo">Hello</div>
      </body>
      <script>
        const $foo = document.getElementById('foo');
    
        // 요소 노드의 콘텐츠 영역에 자식 요소 노드가 없고 텍스트만 존재한다면
        // firstChild.nodeValue와 textContent는 같은 결과를 반환한다.
        console.log($foo.textContent === $foo.firstChild.nodeValue); // true
      </script>
    </html>
    ```
    
- 요소 노드의 `textContent` 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가
- HTML 마크업이 파싱되지 않음
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello <span>world!</span></div>
      </body>
      <script>
        // #foo 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가된다.
        // 이때 HTML 마크업이 파싱되지 않는다.
        document.getElementById('foo').textContent = 'Hi <span>there!</span>';
      </script>
    </html>
    ```
    
- `innerText` 프로퍼티
    - CSS에 순종적, CSS에 의해 비표시로 지정된 요소 노드의 텍스트 반환하지 않음
    - CSS를 고려해야 함 → `textContent` 프로퍼티보다 느림

# 6. DOM 조작

- 새로운 노드를 생성하여 DOM에 추가하거나 기존 노드를 삭제 또는 교체하는 것
- 리플로우와 리페인트 발생

## 1. `innerHTML`

- `setter` 와 `getter` 모두 존재하는 접근자 프로퍼티로서 요소 노드의 HTML 마크업을 취득하거나 변경
- 요소 노드의 `innerHTML` 프로퍼티를 참조하면 요소 노드의 콘텐츠 영역 내에 포함된 모든 HTML 마크업을 문자열로 반환
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello <span>world!</span></div>
      </body>
      <script>
        // #foo 요소의 콘텐츠 영역 내의 HTML 마크업을 문자열로 취득한다.
        console.log(document.getElementById('foo').innerHTML);
        // "Hello <span>world!</span>"
      </script>
    </html>
    ```
    
- HTML 마크업이 포함된 문자열을 그대로 반환
- 요소 노드의 `innerHTML` 프로퍼티에 문자열 할당 → 요소 노드의 모든 자식 노드가 제거, 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM 반영
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello <span>world!</span></div>
      </body>
      <script>
        // HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.
        document.getElementById('foo').innerHTML = 'Hi <span>there!</span>';
      </script>
    </html>
    ```
    
- HTML 마크업 문자열로 간단히 DOM 조작 가능
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 노드 추가
        $fruits.innerHTML += '<li class="banana">Banana</li>';
    
        // 노드 교체
        $fruits.innerHTML = '<li class="orange">Orange</li>';
    
        // 노드 삭제
        $fruits.innerHTML = '';
      </script>
    </html>
    ```
    
- 사용자로부터 입력받은 데이터를 그대로 `innerHTML` 프로퍼티에 할당 → 크로스 사이트 스크립팅 공격(XSS, Cross-Site Scripting Attacks)에 취약
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // innerHTML 프로퍼티로 스크립트 태그를 삽입하여 자바스크립트가 실행되도록 한다.
        // HTML5는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않는다.
        document.getElementById('foo').innerHTML
          = '<script>alert(document.cookie)</script>';
      </script>
    </html>
    ```
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div id="foo">Hello</div>
      </body>
      <script>
        // 에러 이벤트를 강제로 발생시켜서 자바스크립트 코드가 실행되도록 한다.
        document.getElementById('foo').innerHTML
          = `<img src="x" onerror="alert(document.cookie)">`;
      </script>
    </html>
    ```
    
- HTML 새니티제이션(HTML Sanitization) : 사용자로부터 입력받은 데이터에 의해 발생할 수 있는 크로스 사이트 스크립팅 공격을 예방하기 위해 잠재적 위험을 제거하는 기능, DOMPurity 라이브러리 사용
    
    ```jsx
    DOMPurity.sanitize('<img src="x" onerror="alert(document.cookie)">');
    // => <img src="x">
    ```
    
- 요소 노드의 `innerHTML` 프로퍼티에 HTML 마크업 문자열을 할당하는 경우 요소 노드의 모든 자식 노드를 제거하고 할당한 HTML 마크업 문자열을 파싱하여 DOM 변경
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li class="apple">Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 노드 추가
        $fruits.innerHTML += '<li class="banana">Banana</li>';
      </script>
    </html>
    ```
    
    ```html
    $fruits.innerHTML += '<li class="banana">Banana</li>';
    ```
    
    ```html
    $fruits.innerHTML = $fruits.innerHTML + '<li class="banana">Banana</li>';
    // '<li class="apple">Apple</li>' + '<li class="banana">Banana</li>'
    ```
    
- 새로운 요소를 삽입할 때 삽입될 위치를 지정할 수 없음
    
    ```html
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="orange">Orange</li>
    </ul>
    ```
    

## 2. `insertAdjacentHTML` 메서드

- `Element.prototype.insertAdjacentHTML(position, DOMString)` 메서드 : 기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소 삽입
- 두 번째 인수로 전달한 HTML 마크업 문자열(DOMString)을 파싱하고 그 결과로 생성된 노드를 첫 번째 인수로 전달한 위치(position)에 삽입하여 DOM에 반영
- 첫 번째 인수로 전달할 수 있는 문자열 : `beforebegin` , `afterbegin` , `beforeend` , `afterend`
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <!-- beforebegin -->
        <div id="foo">
          <!-- afterbegin -->
          text
          <!-- beforeend -->
        </div>
        <!-- afterend -->
      </body>
      <script>
        const $foo = document.getElementById('foo');
    
        $foo.insertAdjacentHTML('beforebegin', '<p>beforebegin</p>');
        $foo.insertAdjacentHTML('afterbegin', '<p>afterbegin</p>');
        $foo.insertAdjacentHTML('beforeend', '<p>beforeend</p>');
        $foo.insertAdjacentHTML('afterend', '<p>afterend</p>');
      </script>
    </html>
    ```
    
- HTML 마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약

## 3. 노드 생성과 추가

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
    </ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 1. 요소 노드 생성
    const $li = document.createElement('li');

    // 2. 텍스트 노드 생성
    const textNode = document.createTextNode('Banana');

    // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
    $li.appendChild(textNode);

    // 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($li);
  </script>
</html>
```

### 1. 요소 노드 생성

- `Document.prototype.createElement(tagName)` 메서드 : 요소 노드를 생성하여 반환
- 매개변수 `tagName` 에는 태그 이름을 나타내는 문자열을 인수로 전달
    
    ```html
    // 1. 요소 노드 생성
    const $li = document.createElement('li');
    ```
    
- 요소 노드를 생성할 뿐 DOM에 추가하지 않음
- 요소 노드의 자식 노드인 텍스트 노드도 없음
    
    ```html
    // 1. 요소 노드 생성
    const $li = document.createElement('li');
    // 생성된 요소 노드는 아무런 자식 노드가 없다.
    console.log($li.childNodes); // NodeList []
    ```
    

### 2. 텍스트 노드 생성

- `Document.prototype.createTextNode(text)` 메서드 : 텍스트 노드를 생성하여 반환
- 매개변수 `text` 에는 텍스트 노드의 값으로 사용할 문자열 인수로 전달
    
    ```html
    // 2. 텍스트 노드 생성
    const textNode = document.createTextNode('Banana');
    ```
    

### 3. 텍스트 노드를 요소 노드의 자식 노드로 추가

- `Node.prototype.appendChild(childNode)` 메서드 : 매개변수 `childNode` 에게 인수로 전달한 노드를 `appendChild` 메서드를 호출한 노드의 마지막 자식 노드로 추가
- `appendChild` 메서드의 인수로 `createTextNode` 메서드로 생성한 텍스트 노드를 전달 → `appendChild` 메서드를 호출한 노드의 마지막 자식 노드로 텍스트 노드 추가
    
    ```html
    // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
    $li.appendChild(textNode);
    ```
    
    ```html
    // 텍스트 노드를 생성하여 요소 노드의 자식 노드로 추가
    $li.appendChild(document.createTextNode('Banana'));
    
    // $li 요소 노드에 자식 노드가 하나도 없는 위 코드와 동일하게 동작한다.
    $li.textContent = 'Banana';
    ```
    

### 4. 요소 노드를 DOM에 추가

- `Node.prototype.appendChild` 메서드 : 텍스트 노드와 부자 관계로 연결한 요소 노드를 요소 노드의 마지막 자식 요소로 추가
    
    ```html
    // 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($li);
    ```
    
- 새롭게 생성한 요소 노드가 DOM에 추가
- 리플로우와 리페인트 실행

## 4. 복수의 노드 생성과 추가

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    ['Apple', 'Banana', 'Orange'].forEach(text => {
      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode(text);

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
      $fruits.appendChild($li);
    });
  </script>
</html>
```

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits"></ul>
  </body>
  <script>
    const $fruits = document.getElementById('fruits');

    // 컨테이너 요소 노드 생성
    const $container = document.createElement('div');

    ['Apple', 'Banana', 'Orange'].forEach(text => {
      // 1. 요소 노드 생성
      const $li = document.createElement('li');

      // 2. 텍스트 노드 생성
      const textNode = document.createTextNode(text);

      // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
      $li.appendChild(textNode);

      // 4. $li 요소 노드를 컨테이너 요소의 마지막 자식 노드로 추가
      $container.appendChild($li);
    });

    // 5. 컨테이너 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
    $fruits.appendChild($container);
  </script>
</html>
```

```html
<ul id="fruits">
  <div>
    <li>apple</li>
    <li>banana</li>
    <li>orange</li>
  </div>
</ul>
```

- `DocumentFragment` 노드는 문서, 요소, 어트리뷰트, 텍스트 노드와 같은 노드 객체의 일종
- 부모 노드가 없어서 기존 DOM과는 별도로 존재함
- 별도의 서브 DOM을 구성하여 기존 DOM에 추가하기 위한 용도로 사용
- 자신은 제거되고 자신의 자식 노드만 DOM에 추가
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits"></ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // DocumentFragment 노드 생성
        const $fragment = document.createDocumentFragment();
    
        ['Apple', 'Banana', 'Orange'].forEach(text => {
          // 1. 요소 노드 생성
          const $li = document.createElement('li');
    
          // 2. 텍스트 노드 생성
          const textNode = document.createTextNode(text);
    
          // 3. 텍스트 노드를 $li 요소 노드의 자식 노드로 추가
          $li.appendChild(textNode);
    
          // 4. $li 요소 노드를 DocumentFragment 노드의 마지막 자식 노드로 추가
          $fragment.appendChild($li);
        });
    
        // 5. DocumentFragment 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
        $fruits.appendChild($fragment);
      </script>
    </html>
    ```
    
- DOM 변경이 발생하는 것은 한 번뿐이며 리플로우와 리페인트도 한 번만 실행

## 5. 노드 삽입

### 1. 마지막 노드로 추가

- `Node.prototype.appendChild` 메서드 : 인수로 전달받은 노드를 자신을 호출한 노드의 마지막 자식 노드로 DOM에 추가
- 언제나 마지막 자식 노드로 추가
    
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
        // 요소 노드 생성
        const $li = document.createElement('li');
    
        // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
        $li.appendChild(document.createTextNode('Orange'));
    
        // $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
        document.getElementById('fruits').appendChild($li);
      </script>
    </html>
    ```
    

### 2. 지정한 위치에 노드 삽입

- `Node.prototype.insertBefore(newNode, childNode)` 메서드 : 첫 번째 인수로 전달받은 노드를 두 번째 인수로 전달받은 노드 앞에 삽입
    
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
    
        // 요소 노드 생성
        const $li = document.createElement('li');
    
        // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
        $li.appendChild(document.createTextNode('Orange'));
    
        // $li 요소 노드를 #fruits 요소 노드의 마지막 자식 요소 앞에 삽입
        $fruits.insertBefore($li, $fruits.lastElementChild);
        // Apple - Orange - Banana
      </script>
    </html>
    ```
    
- 두 번째 인수로 전달받은 노드 : 반드시 `insertBefore` 메서드를 호출한 노드의 자식 노드, `DOMException` 에러 발생
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <div>test</div>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 요소 노드 생성
        const $li = document.createElement('li');
    
        // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
        $li.appendChild(document.createTextNode('Orange'));
    
        // 두 번째 인수로 전달받은 노드는 반드시 #fruits 요소 노드의 자식 노드이어야 한다.
        $fruits.insertBefore($li, document.querySelector('div'));
        // DOMException
      </script>
    </html>
    ```
    
- 두 번째 인수로 전달받은 노드가 `null` → 첫 번째 인수로 전달받은 노드를 `insertBefore` 메서드를 호출한 노드의 마지막 자식 노드로 추가
    
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
    
        // 요소 노드 생성
        const $li = document.createElement('li');
    
        // 텍스트 노드를 $li 요소 노드의 마지막 자식 노드로 추가
        $li.appendChild(document.createTextNode('Orange'));
    
        // 두 번째 인수로 전달받은 노드가 null이면 $li 요소 노드를 #fruits 요소 노드의 마지막 자식 노드로 추가
        $fruits.insertBefore($li, null);
      </script>
    </html>
    ```
    

## 6. 노드 이동

- `appendChild` 또는 `insertBefore` 메서드를 사용하여 DOM에 다시 추가 → 현재 위치에서 노드를 제거하고 새로운 위치에 노드 추가
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 이미 존재하는 요소 노드를 취득
        const [$apple, $banana, ] = $fruits.children;
    
        // 이미 존재하는 $apple 요소 노드를 #fruits 요소 노드의 마지막 노드로 이동
        $fruits.appendChild($apple); // Banana - Orange - Apple
    
        // 이미 존재하는 $banana 요소 노드를 #fruits 요소의 마지막 자식 노드 앞으로 이동
        $fruits.insertBefore($banana, $fruits.lastElementChild);
        // Orange - Banana - Apple
      </script>
    </html>
    ```
    

## 7. 노드 복사

- `Node.prototype.cloneNode([deep: true | false])` 메서드 : 노드의 사본을 생성하여 반환
- `deep` 에 `true` 인수로 전달하면 노드를 깊은 복사함 → 모든 자손 노드가 포함된 사본 생성
- `deep` 에 `false` 인수로 전달, 생략하면 노드를 얕은 복사함 → 노드 자신만의 사본 생성
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
        const $apple = $fruits.firstElementChild;
    
        // $apple 요소를 얕은 복사하여 사본을 생성. 텍스트 노드가 없는 사본이 생성된다.
        const $shallowClone = $apple.cloneNode();
        // 사본 요소 노드에 텍스트 추가
        $shallowClone.textContent = 'Banana';
        // 사본 요소 노드를 #fruits 요소 노드의 마지막 노드로 추가
        $fruits.appendChild($shallowClone);
    
        // #fruits 요소를 깊은 복사하여 모든 자손 노드가 포함된 사본을 생성
        const $deepClone = $fruits.cloneNode(true);
        // 사본 요소 노드를 #fruits 요소 노드의 마지막 노드로 추가
        $fruits.appendChild($deepClone);
      </script>
    </html>
    ```
    

## 8. 노드 교체

- `Node.prototype.replaceChild(newChild, oldChild)` 메서드 : 자신을 호출한 노드의 자식 노드를 다른 노드로 교체
- 첫 번째 매개변수 `newChild` : 교체할 새로운 노드를 인수로 전달
- 두 번째 매개변수 `oldChild` : 이미 존재하는 교체될 노드를 인수로 전달
- 자식 노드인 `oldChild` 노드를 `newChild` 노드로 교체 → `oldChild` 노드는 DOM에서 제거
    
    ```html
    <!DOCTYPE html>
    <html>
      <body>
        <ul id="fruits">
          <li>Apple</li>
        </ul>
      </body>
      <script>
        const $fruits = document.getElementById('fruits');
    
        // 기존 노드와 교체할 요소 노드를 생성
        const $newChild = document.createElement('li');
        $newChild.textContent = 'Banana';
    
        // #fruits 요소 노드의 첫 번째 자식 요소 노드를 $newChild 요소 노드로 교체
        $fruits.replaceChild($newChild, $fruits.firstElementChild);
      </script>
    </html>
    ```
    

## 9. 노드 삭제

- `Node.prototype.removeChild(child)` 메서드 : `child` 매개변수에 인수로 전달한 노드를 DOM에서 삭제
- `removeChild` 메서드를 호출한 노드의 자식 노드
    
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
    
        // #fruits 요소 노드의 마지막 요소를 DOM에서 삭제
        $fruits.removeChild($fruits.lastElementChild);
      </script>
    </html>
    ```
