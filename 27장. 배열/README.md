# 27장. 배열

# 1. 배열(Array)이란?

- 여러 개의 값을 순차적으로 나열한 자료구조
    
    ```jsx
    const arr = ['apple', 'banana', 'orange'];
    ```
    
- 요소(Element) : 배열이 가지고 있는 값
- 인덱스(Index) : 배열에서 자신의 위치를 나타내는 0 이상의 정수
- 요소 접근 → 대괄효 표기법 사용
    
    ```jsx
    arr[0] // -> 'apple'
    arr[1] // -> 'banana'
    arr[2] // -> 'orange'
    ```
    
- 배열의 길이 : 배열 요소의 개수, `length` 프로퍼티
    
    ```jsx
    arr.length // -> 3
    ```
    
    ```jsx
    // 배열의 순회
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]); // 'apple' 'banana' 'orange'
    }
    ```
    
- 객체 타입
    
    ```jsx
    typeof arr // -> object
    ```
    
- 배열 리터럴, `Array` 생성자 함수, `Array.of` , `Array.from` 메서드 → 배열 생성
    - 배열의 생성자 함수 : `Array`
    - 배열의 프로토타입 객체 : `Array.prototype`
    
    ```jsx
    const arr = [1, 2, 3];
    
    arr.constructor === Array // -> true
    Object.getPrototypeOf(arr) === Array.prototype // -> true
    ```
    
    | --- | --- | --- |
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 반복문으로 자료 구조를 순서대로 순회하기 위해서는 자료 구조의 요소에 순서대로
    // 접근할 수 있어야 하며 자료 구조의 길이를 알 수 있어야 한다.
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]); // 1 2 3
    }
    ```
    
- 처음부터 순차적으로 요소 접근 가능
- 마지막부터 역순으로 요소 접근 가능
- 특정 위치부터 순차적으로 요소 접근 가능

# 2. 자바스크립트 배열은 배열이 아니다

- 동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조
- 밀집 배열(Dence Array) : 하나의 데이터 타입으로 통일, 서로 연속적으로 인접
    - 인덱스를 통해 단 한 번의 연산으로 임의의 요소에 접근 가능
    - `검색 대상 요소의 메모리 주소 = 배열의 시작 메모리 주소 + 인덱스 * 요소의 바이트 수`
- 정렬되지 않은 배열 → 선형 검색(Linear Search)
    
    ```jsx
    // 선형 검색을 통해 배열(array)에 특정 요소(target)가 존재하는지 확인한다.
    // 배열에 특정 요소가 존재하면 특정 요소의 인덱스를 반환하고, 존재하지 않으면 -1을 반환한다.
    function linearSearch(array, target) {
      const length = array.length;
    
      for (let i = 0; i < length; i++) {
        if (array[i] === target) return i;
      }
    
      return -1;
    }
    
    console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
    console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
    ```
    
- 희소 배열(Sparce Array) : 각각의 메모리 공간을 동일한 크기를 갖지 않아도 됨, 연속적으로 이어져 있지 않을 수도 있음
- 자바스크립트의 배열은 일반적인 배열의 동작을 흉내 낸 특수한 객체
    
    ```jsx
    // "16.2. 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체" 참고
    console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
    /*
    {
      '0': {value: 1, writable: true, enumerable: true, configurable: true}
      '1': {value: 2, writable: true, enumerable: true, configurable: true}
      '2': {value: 3, writable: true, enumerable: true, configurable: true}
      length: {value: 3, writable: true, enumerable: false, configurable: false}
    }
    */
    ```
    
    ```jsx
    const arr = [
      'string',
      10,
      true,
      null,
      undefined,
      NaN,
      Infinity,
      [ ],
      { },
      function () {}
    ];
    ```
    
- 자바스크립트 배열은 해시 테이블로 구현된 객체 → 요소를 삽입 또는 삭제하는 경우 일반적인 배열보다 빠른 성능 기대 가능
    
    ```jsx
    const arr = [];
    
    console.time('Array Performance Test');
    
    for (let i = 0; i < 10000000; i++) {
      arr[i] = i;
    }
    console.timeEnd('Array Performance Test');
    // 약 340ms
    
    const obj = {};
    
    console.time('Object Performance Test');
    
    for (let i = 0; i < 10000000; i++) {
      obj[i] = i;
    }
    
    console.timeEnd('Object Performance Test');
    // 약 600ms
    ```
    

# 3. `length` 프로퍼티와 희소 배열

- 배열의 길이를 나타내는 0 이상의 정수
    
    ```jsx
    [].length        // -> 0
    [1, 2, 3].length // -> 3
    ```
    
    ```jsx
    const arr = [1, 2, 3];
    console.log(arr.length); // 3
    
    // 요소 추가
    arr.push(4);
    // 요소를 추가하면 length 프로퍼티의 값이 자동 갱신된다.
    console.log(arr.length); // 4
    
    // 요소 삭제
    arr.pop();
    // 요소를 삭제하면 length 프로퍼티의 값이 자동 갱신된다.
    console.log(arr.length); // 3
    ```
    
- 임의의 숫자 값을 명시적으로 할당 가능
    
    ```jsx
    const arr = [1, 2, 3, 4, 5];
    
    // 현재 length 프로퍼티 값인 5보다 작은 숫자 값 3을 length 프로퍼티에 할당
    arr.length = 3;
    
    // 배열의 길이가 5에서 3으로 줄어든다.
    console.log(arr); // [1, 2, 3]
    ```
    
    ```jsx
    const arr = [1];
    
    // 현재 length 프로퍼티 값인 1보다 큰 숫자 값 3을 length 프로퍼티에 할당
    arr.length = 3;
    
    // length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.
    console.log(arr.length); // 3
    console.log(arr); // [1, empty × 2]
    ```
    
    ```jsx
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
      '0': {value: 1, writable: true, enumerable: true, configurable: true},
      length: {value: 3, writable: true, enumerable: false, configurable: false}
    }
    */
    ```
    
- 희소 배열 : 배열의 요소가 연속적으로 위치하지 않고 일부가 비어 있는 배열
    
    ```jsx
    // 희소 배열
    const sparse = [, 2, , 4];
    
    // 희소 배열의 length 프로퍼티 값은 요소의 개수와 일치하지 않는다.
    console.log(sparse.length); // 4
    console.log(sparse); // [empty, 2, empty, 4]
    
    // 배열 sparse에는 인덱스가 0, 2인 요소가 존재하지 않는다.
    console.log(Object.getOwnPropertyDescriptors(sparse));
    /*
    {
      '1': { value: 2, writable: true, enumerable: true, configurable: true },
      '3': { value: 4, writable: true, enumerable: true, configurable: true },
      length: { value: 4, writable: true, enumerable: false, configurable: false }
    }
    */
    ```
    
    - `length` 와 배열 요소의 개수가 일치하지 않음
    - `length` 는 희소 배열의 실제 요소 개수보다 언제나 큼
- 배열에는 같은 타입의 요소를 연속적으로 위치시키는 것이 최선

# 4. 배열 생성

## 1. 배열 리터럴

- 0개 이상의 요소를 쉼표로 구분하여 대괄호(`[]`)로 묶음
- 프로퍼티 키가 없고 값만 존재
    
    ```jsx
    const arr = [1, 2, 3];
    console.log(arr.length); // 3
    ```
    
- 배열 리터럴에 요소를 하나도 추가하지 않음 → `length` 프로퍼티 값이 0인 빈 배열
    
    ```jsx
    const arr = [];
    console.log(arr.length); // 0
    ```
    
- 요소를 생략하면 희소 배열 생성
    
    ```jsx
    const arr = [1, , 3]; // 희소 배열
    
    // 희소 배열의 length는 배열의 실제 요소 개수보다 언제나 크다.
    console.log(arr.length); // 3
    console.log(arr);        // [1, empty, 3]
    console.log(arr[1]);     // undefined
    ```
    

## 2. `Array` 생성자 함수

- 전달된 인수가 1개이고 숫자인 경우 `length` 프로퍼티 값이 인수인 배열 생성
    
    ```jsx
    const arr = new Array(10);
    
    console.log(arr); // [empty × 10]
    console.log(arr.length); // 10
    ```
    
- 희소 배열
    
    ```jsx
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
      length: {value: 10, writable: true, enumerable: false, configurable: false}
    }
    */
    ```
    
    ```jsx
    // 배열은 요소를 최대 4,294,967,295개 가질 수 있다.
    new Array(4294967295);
    
    // 전달된 인수가 0 ~ 4,294,967,295를 벗어나면 RangeError가 발생한다.
    new Array(4294967296); // RangeError: Invalid array length
    
    // 전달된 인수가 음수이면 에러가 발생한다.
    new Array(-1); // RangeError: Invalid array length
    ```
    
- 전달된 인수가 없는 경우 빈 배열 생성
    
    ```jsx
    new Array(); // -> []
    ```
    
- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열 생성
    
    ```jsx
    // 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
    new Array(1, 2, 3); // -> [1, 2, 3]
    
    // 전달된 인수가 1개지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
    new Array({}); // -> [{}]
    ```
    
- 일반 함수로서 호출해도 배열을 생성하는 생성자 함수로 동작
    
    ```jsx
    Array(1, 2, 3); // -> [1, 2, 3]
    ```
    

## 3. `Array.of`

- 전달된 인수를 요소로 갖는 배열 생성
- 전달된 인수가 1개, 숫자이더라도 인수를 요소로 갖는 배열 생성
    
    ```jsx
    // 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.
    Array.of(1); // -> [1]
    
    Array.of(1, 2, 3); // -> [1, 2, 3]
    
    Array.of('string'); // -> ['string']
    ```
    

## 4. `Array.from`

- 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환하여 반환
    
    ```jsx
    // 유사 배열 객체를 변환하여 배열을 생성한다.
    Array.from({ length: 2, 0: 'a', 1: 'b' }); // -> ['a', 'b']
    
    // 이터러블을 변환하여 배열을 생성한다. 문자열은 이터러블이다.
    Array.from('Hello'); // -> ['H', 'e', 'l', 'l', 'o']
    ```
    
- 두 번째 인수로 전달한 콜백 함수를 통해 값을 만들면서 요소를 채울 수 있음
- 두 번째 인수로 전달한 콜백 함수에 첫 번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달하면서 호출
- 콜백 함수의 반환값으로 구성된 배열 반환
    
    ```jsx
    // Array.from에 length만 존재하는 유사 배열 객체를 전달하면 undefined를 요소로 채운다.
    Array.from({ length: 3 }); // -> [undefined, undefined, undefined]
    
    // Array.from은 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
    Array.from({ length: 3 }, (_, i) => i); // -> [0, 1, 2]
    ```
    
    ```jsx
    // 유사 배열 객체
    const arrayLike = {
      '0': 'apple',
      '1': 'banana',
      '2': 'orange',
      length: 3
    };
    
    // 유사 배열 객체는 마치 배열처럼 for 문으로 순회할 수도 있다.
    for (let i = 0; i < arrayLike.length; i++) {
      console.log(arrayLike[i]); // apple banana orange
    }
    ```
    

# 5. 배열 요소의 참조

- 대괄호 표기법(`[]`)
- 대괄호 안 → 인덱스, 정수로 평가되는 표현식
    
    ```jsx
    const arr = [1, 2];
    
    // 인덱스가 0인 요소를 참조
    console.log(arr[0]); // 1
    // 인덱스가 1인 요소를 참조
    console.log(arr[1]); // 2
    ```
    
- 존재하지 않는 요소에 접근 → `undefined` 반환
    
    ```jsx
    const arr = [1, 2];
    
    // 인덱스가 2인 요소를 참조. 배열 arr에는 인덱스가 2인 요소가 존재하지 않는다.
    console.log(arr[2]); // undefined
    ```
    
- 희소 배열의 존재하지 않는 요소 참조 → `undefined` 반환
    
    ```jsx
    // 희소 배열
    const arr = [1, , 3];
    
    // 배열 arr에는 인덱스가 1인 요소가 존재하지 않는다.
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
      '0': {value: 1, writable: true, enumerable: true, configurable: true},
      '2': {value: 3, writable: true, enumerable: true, configurable: true},
      length: {value: 3, writable: true, enumerable: false, configurable: false}
    */
    
    // 존재하지 않는 요소를 참조하면 undefined가 반환된다.
    console.log(arr[1]); // undefined
    console.log(arr[3]); // undefined
    ```
    

# 6. 배열 요소의 추가와 갱신

- 배열에도 요소를 동적으로 추가 가능
    
    ```jsx
    const arr = [0];
    
    // 배열 요소의 추가
    arr[1] = 1;
    
    console.log(arr); // [0, 1]
    console.log(arr.length); // 2
    ```
    
- 현재 배열의 `length` 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가 → 희소 배열
    
    ```jsx
    arr[100] = 100;
    
    console.log(arr); // [0, 1, empty × 98, 100]
    console.log(arr.length); // 101
    ```
    
- 인덱스로 요소에 접근하여 명시적으로 값을 할당하지 않은 요소 → 생성되지 않음
    
    ```jsx
    // 명시적으로 값을 할당하지 않은 요소는 생성되지 않는다.
    console.log(Object.getOwnPropertyDescriptors(arr));
    /*
    {
      '0': {value: 0, writable: true, enumerable: true, configurable: true},
      '1': {value: 1, writable: true, enumerable: true, configurable: true},
      '100': {value: 100, writable: true, enumerable: true, configurable: true},
      length: {value: 101, writable: true, enumerable: false, configurable: false}
    */
    ```
    
    ```jsx
    // 요소값의 갱신
    arr[1] = 10;
    
    console.log(arr); // [0, 10, empty × 98, 100]
    ```
    
- 인덱스는 요소의 위치를 나타내므로 반드시 0 이상의 정수 사용
- 정수 이외의 값 인덱스처럼 사용 → 프로퍼티 생성
    
    ```jsx
    const arr = [];
    
    // 배열 요소의 추가
    arr[0] = 1;
    arr['1'] = 2;
    
    // 프로퍼티 추가
    arr['foo'] = 3;
    arr.bar = 4;
    arr[1.1] = 5;
    arr[-1] = 6;
    
    console.log(arr); // [1, 2, foo: 3, bar: 4, '1.1': 5, '-1': 6]
    
    // 프로퍼티는 length에 영향을 주지 않는다.
    console.log(arr.length); // 2
    ```
    

# 7. 배열 요소의 삭제

- `delete` 연산자 사용 가능
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 배열 요소의 삭제
    delete arr[1];
    console.log(arr); // [1, empty, 3]
    
    // length 프로퍼티에 영향을 주지 않는다. 즉, 희소 배열이 된다.
    console.log(arr.length); // 3
    ```
    
- 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제 → `Array.prototype.splice` 메서드 사용
    
    ```jsx
    const arr = [1, 2, 3];
    
    // Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소 수)
    // arr[1]부터 1개의 요소를 제거
    arr.splice(1, 1);
    console.log(arr); // [1, 3]
    
    // length 프로퍼티가 자동 갱신된다.
    console.log(arr.length); // 2
    ```
    

# 8. 배열 메서드

- `Array` 생성자 함수 → 정적 메서드 제공
- `Array.prototype` → 프로토타입 메서드 제공
- 원본 배열을 직접 변경하는 메서드(Mutator Method)
    - 외부 상태를 직접 변경하는 부수 효과
- 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드(Accessor Method)
    
    ```jsx
    const arr = [1];
    
    // push 메서드는 원본 배열(arr)을 직접 변경한다.
    arr.push(2);
    console.log(arr); // [1, 2]
    
    // concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
    const result = arr.concat(3);
    console.log(arr);    // [1, 2]
    console.log(result); // [1, 2, 3]
    ```
    

## 1. `Array.isArray`

- 전달한 인수가 배열이면 `true` , 배열이 아니면 `false` 반환
    
    ```jsx
    // true
    Array.isArray([]);
    Array.isArray([1, 2]);
    Array.isArray(new Array());
    
    // false
    Array.isArray();
    Array.isArray({});
    Array.isArray(null);
    Array.isArray(undefined);
    Array.isArray(1);
    Array.isArray('Array');
    Array.isArray(true);
    Array.isArray(false);
    Array.isArray({ 0: 1, length: 1 })
    ```
    

## 2. `Array.prototype.indexOf`

- 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스 반환
- 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스 반환
- 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1 반환
    
    ```jsx
    const arr = [1, 2, 2, 3];
    
    // 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
    arr.indexOf(2);    // -> 1
    // 배열 arr에 요소 4가 없으므로 -1을 반환한다.
    arr.indexOf(4);    // -> -1
    // 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
    arr.indexOf(2, 2); // -> 2
    ```
    
- 배열에 특정 요소가 존재하는지 확인할 때 유용
    
    ```jsx
    const foods = ['apple', 'banana', 'orange'];
    
    // foods 배열에 'orange' 요소가 존재하는지 확인한다.
    if (foods.indexOf('orange') === -1) {
      // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
      foods.push('orange');
    }
    
    console.log(foods); // ["apple", "banana", "orange"]
    ```
    
- ES7에서 도입된 `Array.prototype.includes` 메서드 사용 → 가독성 증가
    
    ```jsx
    const foods = ['apple', 'banana'];
    
    // foods 배열에 'orange' 요소가 존재하는지 확인한다.
    if (!foods.includes('orange')) {
      // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
      foods.push('orange');
    }
    
    console.log(foods); // ["apple", "banana", "orange"]
    ```
    

## 3. `Array.prototype.push`

- 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가, 변경된 `length` 프로퍼티 값 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 인수로 전달받은 모든 값을 원본 배열 arr의 마지막 요소로 추가하고 변경된 length 값을 반환한다.
    let result = arr.push(3, 4);
    console.log(result); // 4
    
    // push 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 2, 3, 4]
    ```
    
- 마지막 요소로 추가할 요소가 하나 → `length` 프로퍼티 사용, 배열의 마지막에 요소 직접 추가 가능
    
    ```jsx
    const arr = [1, 2];
    
    // arr.push(3)과 동일한 처리를 한다. 이 방법이 push 메서드보다 빠르다.
    arr[arr.length] = 3;
    console.log(arr); // [1, 2, 3]
    ```
    
- 스프레드 문법 사용 → 함수 호출 없이 표현식으로 마지막에 요소 추가 가능, 부수 효과 없음
    
    ```jsx
    const arr = [1, 2];
    
    // ES6 스프레드 문법
    const newArr = [...arr, 3];
    console.log(newArr); // [1, 2, 3]
    ```
    

## 4. `Array.prototype.pop`

- 원본 배열에서 마지막 요소를 제거, 제거한 요소 반환
- 원본 배열이 빈 배열 → `undefined` 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
    let result = arr.pop();
    console.log(result); // 2
    
    // pop 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1]
    ```
    
- 스택(Stack) : 후입 선출(LIFO, Last In First Out) 방식 자료구조
    
    ```jsx
    const Stack = (function () {
      function Stack(array = []) {
        if (!Array.isArray(array)) {
          // "47. 에러 처리" 참고
          throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
      }
    
      Stack.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Stack,
        // 스택의 가장 마지막에 데이터를 밀어 넣는다.
        push(value) {
          return this.array.push(value);
        },
        // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
        pop() {
          return this.array.pop();
        },
        // 스택의 복사본 배열을 반환한다.
        entries() {
          return [...this.array];
        }
      };
    
      return Stack;
    }());
    
    const stack = new Stack([1, 2]);
    console.log(stack.entries()); // [1, 2]
    
    stack.push(3);
    console.log(stack.entries()); // [1, 2, 3]
    
    stack.pop();
    console.log(stack.entries()); // [1, 2]
    ```
    
    ```jsx
    class Stack {
      #array; // private class member
    
      constructor(array = []) {
        if (!Array.isArray(array)) {
          throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
      }
    
      // 스택의 가장 마지막에 데이터를 밀어 넣는다.
      push(value) {
        return this.#array.push(value);
      }
    
      // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
      pop() {
        return this.#array.pop();
      }
    
      // 스택의 복사본 배열을 반환한다.
      entries() {
        return [...this.#array];
      }
    }
    
    const stack = new Stack([1, 2]);
    console.log(stack.entries()); // [1, 2]
    
    stack.push(3);
    console.log(stack.entries()); // [1, 2, 3]
    
    stack.pop();
    console.log(stack.entries()); // [1, 2]
    ```
    

## 5. `Array.prototype.unshift`

- 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가, 변경된 `length` 프로퍼티 값 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
    let result = arr.unshift(3, 4);
    console.log(result); // 4
    
    // unshift 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [3, 4, 1, 2]
    ```
    
- 스프레드 문법 사용 → 함수 호출 없이 표현식으로 선두에 요소 추가 가능, 부수 효과 없음
    
    ```jsx
    const arr = [1, 2];
    
    // ES6 스프레드 문법
    const newArr = [3, ...arr];
    console.log(newArr); // [3, 1, 2]
    ```
    

## 6. `Array.prototype.shift`

- 원본 배열에서 첫 번째 요소 제거, 제거한 요소 반환
- 원본 배열이 빈 배열 → `undefined` 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
    let result = arr.shift();
    console.log(result); // 1
    
    // shift 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [2]
    ```
    
- 큐(Queue) : 선입 선출(FIFO, First In First Out) 방식 자료구조
    
    ```jsx
    const Queue = (function () {
      function Queue(array = []) {
        if (!Array.isArray(array)) {
          // "47. 에러 처리" 참고
          throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
      }
    
      Queue.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Queue,
        // 큐의 가장 마지막에 데이터를 밀어 넣는다.
        enqueue(value) {
          return this.array.push(value);
        },
        // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
        dequeue() {
          return this.array.shift();
        },
        // 큐의 복사본 배열을 반환한다.
        entries() {
          return [...this.array];
        }
      };
    
      return Queue;
    }());
    
    const queue = new Queue([1, 2]);
    console.log(queue.entries()); // [1, 2]
    
    queue.enqueue(3);
    console.log(queue.entries()); // [1, 2, 3]
    
    queue.dequeue();
    console.log(queue.entries()); // [2, 3]
    ```
    
    ```jsx
    class Queue {
      #array; // private class member
    
      constructor(array = []) {
        if (!Array.isArray(array)) {
          throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
      }
    
      // 큐의 가장 마지막에 데이터를 밀어 넣는다.
      enqueue(value) {
        return this.#array.push(value);
      }
    
      // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
      dequeue() {
        return this.#array.shift();
      }
    
      // 큐의 복사본 배열을 반환한다.
      entries() {
        return [...this.#array];
      }
    }
    
    const queue = new Queue([1, 2]);
    console.log(queue.entries()); // [1, 2]
    
    queue.enqueue(3);
    console.log(queue.entries()); // [1, 2, 3]
    
    queue.dequeue();
    console.log(queue.entries()); // [2, 3]
    ```
    

## 7. `Array.prototype.concat`

- 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열 반환
- 인수로 전달한 값이 배열인 경우 → 배열을 해체하여 새로운 배열의 요소로 추가
    
    ```jsx
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    
    // 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    // 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
    let result = arr1.concat(arr2);
    console.log(result); // [1, 2, 3, 4]
    
    // 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    result = arr1.concat(3);
    console.log(result); // [1, 2, 3]
    
    // 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    result = arr1.concat(arr2, 5);
    console.log(result); // [1, 2, 3, 4, 5]
    
    // 원본 배열은 변경되지 않는다.
    console.log(arr1); // [1, 2]
    ```
    
- `push` 와 `unshift` 메서드 → `concat` 메서드로 대체 가능
    - `push` 와 `unshift` 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 하며 `concat` 메서드를 사용할 경우 반환값을 반드시 변수에 할당
    - 인수로 전달받은 값이 배열인 경우 `push` 와 `unshift` 메서드는 배열을 그대로 원본 배열의 마지막/첫 번째 요소로 추가하지만 `concat` 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가
- ES6의 스프레드 문법으로 대체 가능
    
    ```jsx
    let result = [1, 2].concat([3, 4]);
    console.log(result); // [1, 2, 3, 4]
    
    // concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
    result = [...[1, 2], ...[3, 4]];
    console.log(result); // [1, 2, 3, 4]
    ```

# 8. 배열 메서드

- `Array` 생성자 함수 → 정적 메서드 제공
- `Array.prototype` → 프로토타입 메서드 제공
- 원본 배열을 직접 변경하는 메서드(Mutator Method)
    - 외부 상태를 직접 변경하는 부수 효과
- 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드(Accessor Method)
    
    ```jsx
    const arr = [1];
    
    // push 메서드는 원본 배열(arr)을 직접 변경한다.
    arr.push(2);
    console.log(arr); // [1, 2]
    
    // concat 메서드는 원본 배열(arr)을 직접 변경하지 않고 새로운 배열을 생성하여 반환한다.
    const result = arr.concat(3);
    console.log(arr);    // [1, 2]
    console.log(result); // [1, 2, 3]
    ```
    

## 1. `Array.isArray`

- 전달한 인수가 배열이면 `true` , 배열이 아니면 `false` 반환
    
    ```jsx
    // true
    Array.isArray([]);
    Array.isArray([1, 2]);
    Array.isArray(new Array());
    
    // false
    Array.isArray();
    Array.isArray({});
    Array.isArray(null);
    Array.isArray(undefined);
    Array.isArray(1);
    Array.isArray('Array');
    Array.isArray(true);
    Array.isArray(false);
    Array.isArray({ 0: 1, length: 1 })
    ```
    

## 2. `Array.prototype.indexOf`

- 원본 배열에서 인수로 전달된 요소를 검색하여 인덱스 반환
- 원본 배열에 인수로 전달한 요소와 중복되는 요소가 여러 개 있다면 첫 번째로 검색된 요소의 인덱스 반환
- 원본 배열에 인수로 전달한 요소가 존재하지 않으면 -1 반환
    
    ```jsx
    const arr = [1, 2, 2, 3];
    
    // 배열 arr에서 요소 2를 검색하여 첫 번째로 검색된 요소의 인덱스를 반환한다.
    arr.indexOf(2);    // -> 1
    // 배열 arr에 요소 4가 없으므로 -1을 반환한다.
    arr.indexOf(4);    // -> -1
    // 두 번째 인수는 검색을 시작할 인덱스다. 두 번째 인수를 생략하면 처음부터 검색한다.
    arr.indexOf(2, 2); // -> 2
    ```
    
- 배열에 특정 요소가 존재하는지 확인할 때 유용
    
    ```jsx
    const foods = ['apple', 'banana', 'orange'];
    
    // foods 배열에 'orange' 요소가 존재하는지 확인한다.
    if (foods.indexOf('orange') === -1) {
      // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
      foods.push('orange');
    }
    
    console.log(foods); // ["apple", "banana", "orange"]
    ```
    
- ES7에서 도입된 `Array.prototype.includes` 메서드 사용 → 가독성 증가
    
    ```jsx
    const foods = ['apple', 'banana'];
    
    // foods 배열에 'orange' 요소가 존재하는지 확인한다.
    if (!foods.includes('orange')) {
      // foods 배열에 'orange' 요소가 존재하지 않으면 'orange' 요소를 추가한다.
      foods.push('orange');
    }
    
    console.log(foods); // ["apple", "banana", "orange"]
    ```
    

## 3. `Array.prototype.push`

- 인수로 전달받은 모든 값을 원본 배열의 마지막 요소로 추가, 변경된 `length` 프로퍼티 값 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 인수로 전달받은 모든 값을 원본 배열 arr의 마지막 요소로 추가하고 변경된 length 값을 반환한다.
    let result = arr.push(3, 4);
    console.log(result); // 4
    
    // push 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 2, 3, 4]
    ```
    
- 마지막 요소로 추가할 요소가 하나 → `length` 프로퍼티 사용, 배열의 마지막에 요소 직접 추가 가능
    
    ```jsx
    const arr = [1, 2];
    
    // arr.push(3)과 동일한 처리를 한다. 이 방법이 push 메서드보다 빠르다.
    arr[arr.length] = 3;
    console.log(arr); // [1, 2, 3]
    ```
    
- 스프레드 문법 사용 → 함수 호출 없이 표현식으로 마지막에 요소 추가 가능, 부수 효과 없음
    
    ```jsx
    const arr = [1, 2];
    
    // ES6 스프레드 문법
    const newArr = [...arr, 3];
    console.log(newArr); // [1, 2, 3]
    ```
    

## 4. `Array.prototype.pop`

- 원본 배열에서 마지막 요소를 제거, 제거한 요소 반환
- 원본 배열이 빈 배열 → `undefined` 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 원본 배열에서 마지막 요소를 제거하고 제거한 요소를 반환한다.
    let result = arr.pop();
    console.log(result); // 2
    
    // pop 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1]
    ```
    
- 스택(Stack) : 후입 선출(LIFO, Last In First Out) 방식 자료구조
    
    ```jsx
    const Stack = (function () {
      function Stack(array = []) {
        if (!Array.isArray(array)) {
          // "47. 에러 처리" 참고
          throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
      }
    
      Stack.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Stack,
        // 스택의 가장 마지막에 데이터를 밀어 넣는다.
        push(value) {
          return this.array.push(value);
        },
        // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
        pop() {
          return this.array.pop();
        },
        // 스택의 복사본 배열을 반환한다.
        entries() {
          return [...this.array];
        }
      };
    
      return Stack;
    }());
    
    const stack = new Stack([1, 2]);
    console.log(stack.entries()); // [1, 2]
    
    stack.push(3);
    console.log(stack.entries()); // [1, 2, 3]
    
    stack.pop();
    console.log(stack.entries()); // [1, 2]
    ```
    
    ```jsx
    class Stack {
      #array; // private class member
    
      constructor(array = []) {
        if (!Array.isArray(array)) {
          throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
      }
    
      // 스택의 가장 마지막에 데이터를 밀어 넣는다.
      push(value) {
        return this.#array.push(value);
      }
    
      // 스택의 가장 마지막 데이터, 즉 가장 나중에 밀어 넣은 최신 데이터를 꺼낸다.
      pop() {
        return this.#array.pop();
      }
    
      // 스택의 복사본 배열을 반환한다.
      entries() {
        return [...this.#array];
      }
    }
    
    const stack = new Stack([1, 2]);
    console.log(stack.entries()); // [1, 2]
    
    stack.push(3);
    console.log(stack.entries()); // [1, 2, 3]
    
    stack.pop();
    console.log(stack.entries()); // [1, 2]
    ```
    

## 5. `Array.prototype.unshift`

- 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가, 변경된 `length` 프로퍼티 값 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 인수로 전달받은 모든 값을 원본 배열의 선두에 요소로 추가하고 변경된 length 값을 반환한다.
    let result = arr.unshift(3, 4);
    console.log(result); // 4
    
    // unshift 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [3, 4, 1, 2]
    ```
    
- 스프레드 문법 사용 → 함수 호출 없이 표현식으로 선두에 요소 추가 가능, 부수 효과 없음
    
    ```jsx
    const arr = [1, 2];
    
    // ES6 스프레드 문법
    const newArr = [3, ...arr];
    console.log(newArr); // [3, 1, 2]
    ```
    

## 6. `Array.prototype.shift`

- 원본 배열에서 첫 번째 요소 제거, 제거한 요소 반환
- 원본 배열이 빈 배열 → `undefined` 반환
- 원본 배열 직접 변경
    
    ```jsx
    const arr = [1, 2];
    
    // 원본 배열에서 첫 번째 요소를 제거하고 제거한 요소를 반환한다.
    let result = arr.shift();
    console.log(result); // 1
    
    // shift 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [2]
    ```
    
- 큐(Queue) : 선입 선출(FIFO, First In First Out) 방식 자료구조
    
    ```jsx
    const Queue = (function () {
      function Queue(array = []) {
        if (!Array.isArray(array)) {
          // "47. 에러 처리" 참고
          throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
      }
    
      Queue.prototype = {
        // "19.10.1. 생성자 함수에 의한 프로토타입의 교체" 참고
        constructor: Queue,
        // 큐의 가장 마지막에 데이터를 밀어 넣는다.
        enqueue(value) {
          return this.array.push(value);
        },
        // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
        dequeue() {
          return this.array.shift();
        },
        // 큐의 복사본 배열을 반환한다.
        entries() {
          return [...this.array];
        }
      };
    
      return Queue;
    }());
    
    const queue = new Queue([1, 2]);
    console.log(queue.entries()); // [1, 2]
    
    queue.enqueue(3);
    console.log(queue.entries()); // [1, 2, 3]
    
    queue.dequeue();
    console.log(queue.entries()); // [2, 3]
    ```
    
    ```jsx
    class Queue {
      #array; // private class member
    
      constructor(array = []) {
        if (!Array.isArray(array)) {
          throw new TypeError(`${array} is not an array.`);
        }
        this.#array = array;
      }
    
      // 큐의 가장 마지막에 데이터를 밀어 넣는다.
      enqueue(value) {
        return this.#array.push(value);
      }
    
      // 큐의 가장 처음 데이터, 즉 가장 먼저 밀어 넣은 데이터를 꺼낸다.
      dequeue() {
        return this.#array.shift();
      }
    
      // 큐의 복사본 배열을 반환한다.
      entries() {
        return [...this.#array];
      }
    }
    
    const queue = new Queue([1, 2]);
    console.log(queue.entries()); // [1, 2]
    
    queue.enqueue(3);
    console.log(queue.entries()); // [1, 2, 3]
    
    queue.dequeue();
    console.log(queue.entries()); // [2, 3]
    ```
    

## 7. `Array.prototype.concat`

- 인수로 전달된 값들을 원본 배열의 마지막 요소로 추가한 새로운 배열 반환
- 인수로 전달한 값이 배열인 경우 → 배열을 해체하여 새로운 배열의 요소로 추가
    
    ```jsx
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    
    // 배열 arr2를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    // 인수로 전달한 값이 배열인 경우 배열을 해체하여 새로운 배열의 요소로 추가한다.
    let result = arr1.concat(arr2);
    console.log(result); // [1, 2, 3, 4]
    
    // 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    result = arr1.concat(3);
    console.log(result); // [1, 2, 3]
    
    // 배열 arr2와 숫자를 원본 배열 arr1의 마지막 요소로 추가한 새로운 배열을 반환한다.
    result = arr1.concat(arr2, 5);
    console.log(result); // [1, 2, 3, 4, 5]
    
    // 원본 배열은 변경되지 않는다.
    console.log(arr1); // [1, 2]
    ```
    
- `push` 와 `unshift` 메서드 → `concat` 메서드로 대체 가능
    - `push` 와 `unshift` 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 하며 `concat` 메서드를 사용할 경우 반환값을 반드시 변수에 할당
        
        ```jsx
        const arr1 = [3, 4];
        
        // unshift 메서드는 원본 배열을 직접 변경한다.
        // 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
        arr1.unshift(1, 2);
        // unshift 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
        console.log(arr1); // [1, 2, 3, 4]
        
        // push 메서드는 원본 배열을 직접 변경한다.
        // 따라서 원본 배열을 변수에 저장해 두지 않으면 변경된 배열을 사용할 수 없다.
        arr1.push(5, 6);
        // push 메서드를 사용할 경우 원본 배열을 반드시 변수에 저장해 두어야 결과를 확인할 수 있다.
        console.log(arr1); // [1, 2, 3, 4, 5, 6]
        
        // unshift와 push 메서드는 concat 메서드로 대체할 수 있다.
        const arr2 = [3, 4];
        
        // concat 메서드는 원본 배열을 변경하지 않고 새로운 배열을 반환한다.
        // arr1.unshift(1, 2)를 다음과 같이 대체할 수 있다.
        let result = [1, 2].concat(arr2);
        console.log(result); // [1, 2, 3, 4]
        
        // arr1.push(5, 6)를 다음과 같이 대체할 수 있다.
        result = result.concat(5, 6);
        console.log(result); // [1, 2, 3, 4, 5, 6]
        ```
        
    - 인수로 전달받은 값이 배열인 경우 `push` 와 `unshift` 메서드는 배열을 그대로 원본 배열의 마지막/첫 번째 요소로 추가하지만 `concat` 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 마지막 요소로 추가
        
        ```jsx
        const arr = [3, 4];
        
        // unshift와 push 메서드는 인수로 전달받은 배열을 그대로 원본 배열의 요소로 추가한다
        arr.unshift([1, 2]);
        arr.push([5, 6]);
        console.log(arr); // [[1, 2], 3, 4,[5, 6]]
        
        // concat 메서드는 인수로 전달받은 배열을 해체하여 새로운 배열의 요소로 추가한다
        let result = [1, 2].concat([3, 4]);
        result = result.concat([5, 6]);
        
        console.log(result); // [1, 2, 3, 4, 5, 6]
        ```
        
- ES6의 스프레드 문법으로 대체 가능
    
    ```jsx
    let result = [1, 2].concat([3, 4]);
    console.log(result); // [1, 2, 3, 4]
    
    // concat 메서드는 ES6의 스프레드 문법으로 대체할 수 있다.
    result = [...[1, 2], ...[3, 4]];
    console.log(result); // [1, 2, 3, 4]
    ```
    

## 8. `Array.prototype.splice`

- 원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거하는 경우 사용
- 3개의 매개변수 존재, 원본 배열 직접 변경
    - `start` : 원본 배열의 요소를 제거하기 시작할 인덱스
    - `deleteCount` : 원본 배열의 요소를 제거하기 시작할 인덱스인 `start` 부터 제거할 요소의 개수
    - `items` : 제거한 위치에 삽입할 요소들의 목록
    
    ```jsx
    const arr = [1, 2, 3, 4];
    
    // 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
    const result = arr.splice(1, 2, 20, 30);
    
    // 제거한 요소가 배열로 반환된다.
    console.log(result); // [2, 3]
    // splice 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 20, 30, 4]
    ```
    
- 3개의 인수를 빠짐없이 전달하면 첫 번째 인수, 시작 인덱스부터 두 번째 인수, 제거할 요소의 개수만큼 원본 배열에서 요소 제거
- 세 번째 인수, 제거한 위치에 삽입할 요소들을 원본 배열에 삽입
- 두 번째 인수, 제거할 요소의 개수를 0으로 지정 → 아무런 요소도 제거하지 않고 새로운 요소 삽입
    
    ```jsx
    const arr = [1, 2, 3, 4];
    
    // 원본 배열의 인덱스 1부터 0개의 요소를 제거하고 그 자리에 새로운 요소 100을 삽입한다.
    const result = arr.splice(1, 0, 100);
    
    // 원본 배열이 변경된다.
    console.log(arr); // [1, 100, 2, 3, 4]
    // 제거한 요소가 배열로 반환된다.
    console.log(result); // []
    ```
    
- 세 번째 인수, 제거한 위치에 추가할 요소들의 목록을 전달하지 않으면 원본 배열에서 지정된 요소 제거
    
    ```jsx
    const arr = [1, 2, 3, 4];
    
    // 원본 배열의 인덱스 1부터 2개의 요소를 제거한다.
    const result = arr.splice(1, 2);
    
    // 원본 배열이 변경된다.
    console.log(arr); // [1, 4]
    // 제거한 요소가 배열로 반환된다.
    console.log(result); // [2, 3]
    ```
    
- 두 번째 인수, 제거할 요소의 개수 생략 → 첫 번째 인수로 전달된 시작 인덱스부터 모든 요소 제거
    
    ```jsx
    const arr = [1, 2, 3, 4];
    
    // 원본 배열의 인덱스 1부터 모든 요소를 제거한다.
    const result = arr.splice(1);
    
    // 원본 배열이 변경된다.
    console.log(arr); // [1]
    // 제거한 요소가 배열로 반환된다.
    console.log(result); // [2, 3, 4]
    ```
    
- 특정 요소 제거 → `indexOf` 메서드 사용, 특정 요소의 인덱스 취득 후 `splice` 메서드 사용
    
    ```jsx
    const arr = [1, 2, 3, 1, 2];
    
    // 배열 array에서 item 요소를 제거한다. item 요소가 여러 개 존재하면 첫 번째 요소만 제거한다.
    function remove(array, item) {
      // 제거할 item 요소의 인덱스를 취득한다.
      const index = array.indexOf(item);
    
      // 제거할 item 요소가 있다면 제거한다.
      if (index !== -1) array.splice(index, 1);
    
      return array;
    }
    
    console.log(remove(arr, 2)); // [1, 3, 1, 2]
    console.log(remove(arr, 10)); // [1, 3, 1, 2]
    ```
    
- `filter` 메서드 사용 → 특정 요소 제거, 중복된 경우 모두 제거
    
    ```jsx
    const arr = [1, 2, 3, 1, 2];
    
    // 배열 array에서 모든 item 요소를 제거한다.
    function removeAll(array, item) {
      return array.filter(v => v !== item);
    }
    
    console.log(removeAll(arr, 2)); // [1, 3, 1]
    ```
    

## 9. `Array.prototype.slice`

- 인수로 전달된 범위의 요소들을 복사하여 배열로 반환
    - `start` : 복사를 시작할 인덱스
    - `end` : 복사를 종료할 인덱스
    
    ```jsx
    const arr = [1, 2, 3];
    
    // arr[0]부터 arr[1] 이전(arr[1] 미포함)까지 복사하여 반환한다.
    arr.slice(0, 1); // -> [1]
    
    // arr[1]부터 arr[2] 이전(arr[2] 미포함)까지 복사하여 반환한다.
    arr.slice(1, 2); // -> [2]
    
    // 원본은 변경되지 않는다.
    console.log(arr); // [1, 2, 3]
    ```
    
- 첫 번째 인수로 전달받은 인덱스부터 두 번째 인수로 전달받은 인덱스 이전까지 요소들을 복사하여 배열로 반환
- 두 번째 인수 생략 → 첫 번째 인수로 전달받은 인덱스부터 모든 요소 복사 후 배열로 반환
    
    ```jsx
    const arr = [1, 2, 3];
    
    // arr[1]부터 이후의 모든 요소를 복사하여 반환한다.
    arr.slice(1); // -> [2, 3]
    ```
    
- 첫 번째 인수가 음수 → 배열의 끝에서부터 요소를 복사하여 배열로 반환
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 배열의 끝에서부터 요소를 한 개 복사하여 반환한다.
    arr.slice(-1); // -> [3]
    
    // 배열의 끝에서부터 요소를 두 개 복사하여 반환한다.
    arr.slice(-2); // -> [2, 3]
    ```
    
- 인수 모두 생략 → 원본 배열의 복사본을 생성하여 반환
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 인수를 모두 생략하면 원본 배열의 복사본을 생성하여 반환한다.
    const copy = arr.slice();
    console.log(copy); // [1, 2, 3]
    console.log(copy === arr); // false
    ```
    
- 얕은 복사를 통해 생성
    
    ```jsx
    const todos = [
      { id: 1, content: 'HTML', completed: false },
      { id: 2, content: 'CSS', completed: true },
      { id: 3, content: 'Javascript', completed: false }
    ];
    
    // 얕은 복사(shallow copy)
    const _todos = todos.slice();
    // const _todos = [...todos];
    
    // _todos와 todos는 참조값이 다른 별개의 객체다.
    console.log(_todos === todos); // false
    
    // 배열 요소의 참조값이 같다. 즉, 얕은 복사되었다.
    console.log(_todos[0] === todos[0]); // true
    ```
    
- `arguments, HTMLCollection, NodeList` 같은 유사 배열 객체 → 배열 변환 가능
    
    ```jsx
    function sum() {
      // 유사 배열 객체를 배열로 변환(ES5)
      var arr = Array.prototype.slice.call(arguments);
      console.log(arr); // [1, 2, 3]
    
      return arr.reduce(function (pre, cur) {
        return pre + cur;
      }, 0);
    }
    
    console.log(sum(1, 2, 3)); // 6
    ```
    
- `Array.from` 메서드 사용 → 간단하게 유사 배열 객체를 배열로 변환 가능
    
    ```jsx
    function sum() {
      const arr = Array.from(arguments);
      console.log(arr); // [1, 2, 3]
    
      return arr.reduce((pre, cur) => pre + cur, 0);
    }
    
    console.log(sum(1, 2, 3)); // 6
    ```
    
- 이터러블 객체 → ES6의 스프레드 문법을 사용하여 간단하게 배열로 변환
    
    ```jsx
    function sum() {
      // 이터러블을 배열로 변환(ES6 스프레드 문법)
      const arr = [...arguments ];
      console.log(arr); // [1, 2, 3]
    
      return arr.reduce((pre, cur) => pre + cur, 0);
    }
    
    console.log(sum(1, 2, 3)); // 6
    ```
    

## 10. `Array.prototype.join`

- 원본 배열의 모든 요소를 문자열로 변환, 인수로 전달받은 문자열, 구분자로 연결한 문자열 반환
- 기본 구분자 : 콤마(`,`)
    
    ```jsx
    const arr = [1, 2, 3, 4];
    
    // 기본 구분자는 ','이다.
    // 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 기본 구분자 ','로 연결한 문자열을 반환한다.
    arr.join(); // -> '1,2,3,4';
    
    // 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 빈문자열로 연결한 문자열을 반환한다.
    arr.join(''); // -> '1234'
    
    // 원본 배열 arr의 모든 요소를 문자열로 변환한 후, 구분자 ':'로 연결한 문자열을 반환한다.ㄴ
    arr.join(':'); // -> '1:2:3:4'
    ```
    

## 11. `Array.prototype.reverse`

- 원본 배열의 순서를 반대로 뒤집음
- 원본 배열 변경
    
    ```jsx
    const arr = [1, 2, 3];
    const result = arr.reverse();
    
    // reverse 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [3, 2, 1]
    // 반환값은 변경된 배열이다.
    console.log(result); // [3, 2, 1]
    ```
    

## 12. `Array.prototype.fill`

- 인수로 전달받은 값을 배열의 처음부터 끝까지 요소로 채움
- 원본 배열 변경
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 인수로 전달 받은 값 0을 배열의 처음부터 끝까지 요소로 채운다.
    arr.fill(0);
    
    // fill 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [0, 0, 0]
    ```
    
- 두 번째 인수로 요소 채우기를 시작할 인덱스 전달 가능
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 인수로 전달받은 값 0을 배열의 인덱스 1부터 끝까지 요소로 채운다.
    arr.fill(0, 1);
    
    // fill 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 0, 0]
    ```
    
- 세 번째 인수로 요소 채우기를 멈출 인덱스 전달 가능
    
    ```jsx
    const arr = [1, 2, 3, 4, 5];
    
    // 인수로 전달받은 값 0을 배열의 인덱스 1부터 3 이전(인덱스 3 미포함)까지 요소로 채운다.
    arr.fill(0, 1, 3);
    
    // fill 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 0, 0, 4, 5]
    ```
    
- 배열을 생성하면서 특정 값으로 요소 채우기 가능
    
    ```jsx
    const arr = new Array(3);
    console.log(arr); // [empty × 3]
    
    // 인수로 전달받은 값 1을 배열의 처음부터 끝까지 요소로 채운다.
    const result = arr.fill(1);
    
    // fill 메서드는 원본 배열을 직접 변경한다.
    console.log(arr); // [1, 1, 1]
    
    // fill 메서드는 변경된 원본 배열을 반환한다.
    console.log(result); // [1, 1, 1]
    ```
    
- `Array.from` 메서드 사용 → 두 번째 인수로 전달한 콜백 함수를 통해 요소값을 만들면서 배열 채우기 가능
    
    ```jsx
    // 인수로 전달받은 정수만큼 요소를 생성하고 0부터 1씩 증가하면서 요소를 채운다.
    const sequences = (length = 0) => Array.from({ length }, (_, i) => i);
    // const sequences = (length = 0) => Array.from(new Array(length), (_, i) => i);
    
    console.log(sequences(3)); // [0, 1, 2]
    ```
    

## 13. `Array.prototype.includes`

- 배열 내에 특정 요소가 포함되어 있는지 확인하여 `true` 또는 `false` 반환
- 첫 번째 인수로 검색할 대상 지정
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 배열에 요소 2가 포함되어 있는지 확인한다.
    arr.includes(2); // -> true
    
    // 배열에 요소 100이 포함되어 있는지 확인한다.
    arr.includes(100); // -> false
    ```
    
- 두 번째 인수로 검색을 시작할 인덱스 전달 가능
    
    ```jsx
    const arr = [1, 2, 3];
    
    // 배열에 요소 1이 포함되어 있는지 인덱스 1부터 확인한다.
    arr.includes(1, 1); // -> false
    
    // 배열에 요소 3이 포함되어 있는지 인덱스 2(arr.length - 1)부터 확인한다.
    arr.includes(3, -1); // -> true
    ```
    
- `indexOf` 메서드 사용 → 반환값이 -1인지 확인해야 함, 배열에 `NaN` 이 포함되어 있는지 확인할 수 없음
    
    ```jsx
    [NaN].indexOf(NaN) !== -1; // -> false
    [NaN].includes(NaN);       // -> true
    ```
    

## 14. `Array.prototype.flat`

- 인수로 전달한 깊이만큼 재귀적으로 배열 평탄화
    
    ```jsx
    [1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]
    ```
    
- 중첩 배열을 평탄화할 깊이를 인수로 전달 가능
- `Infinity` 전달 → 중첩 배열 모두 평탄화
    
    ```jsx
    // 중첩 배열을 평탄화하기 위한 깊이 값의 기본값은 1이다.
    [1, [2, [3, [4]]]].flat();  // -> [1, 2, [3, [4]]]
    [1, [2, [3, [4]]]].flat(1); // -> [1, 2, [3, [4]]]
    
    // 중첩 배열을 평탄화하기 위한 깊이 값을 2로 지정하여 2단계 깊이까지 평탄화한다.
    [1, [2, [3, [4]]]].flat(2); // -> [1, 2, 3, [4]]
    // 2번 평탄화한 것과 동일하다.
    [1, [2, [3, [4]]]].flat().flat(); // -> [1, 2, 3, [4]]
    
    // 중첩 배열을 평탄화하기 위한 깊이 값을 Infinity로 지정하여 중첩 배열 모두를 평탄화한다.
    [1, [2, [3, [4]]]].flat(Infinity); // -> [1, 2, 3, 4]
    ```

# 9. 배열 고차 함수

- 고차 함수(HOF, Higher-Order Function) : 함수를 인수로 전달받거나 함수를 반환하는 함수
    - 외부 상태의 변경이나 가변 데이터를 피하고 불변성을 지향
- 함수형 프로그래밍 : 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임
    - 순수 함수를 통해 부수 효과를 최대한 억제

## 1. `Array.prototype.sort`

- 배열 요소 정렬, 오름차순
- 원본 배열 직접 변경
- 정렬된 배열 반환
    
    ```jsx
    const fruits = ['Banana', 'Orange', 'Apple'];
    
    // 오름차순(ascending) 정렬
    fruits.sort();
    
    // sort 메서드는 원본 배열을 직접 변경한다.
    console.log(fruits); // ['Apple', 'Banana', 'Orange']
    ```
    
    ```jsx
    const fruits = ['바나나', '오렌지', '사과'];
    
    // 오름차순(ascending) 정렬
    fruits.sort();
    
    // sort 메서드는 원본 배열을 직접 변경한다.
    console.log(fruits); // ['바나나', '사과', '오렌지']
    ```
    
- 내림차순 정렬 : `reverse` 메서드 사용
    
    ```jsx
    const fruits = ['Banana', 'Orange', 'Apple'];
    
    // 오름차순(ascending) 정렬
    fruits.sort();
    
    // sort 메서드는 원본 배열을 직접 변경한다.
    console.log(fruits); // ['Apple', 'Banana', 'Orange']
    
    // 내림차순(descending) 정렬
    fruits.reverse();
    
    // reverse 메서드도 원본 배열을 직접 변경한다.
    console.log(fruits); // ['Orange', 'Banana', 'Apple']
    ```
    
    ```jsx
    const points = [40, 100, 1, 5, 2, 25, 10];
    
    points.sort();
    
    // 숫자 요소들로 이루어진 배열은 의도한 대로 정렬되지 않는다.
    console.log(points); // [1, 10, 100, 2, 25, 40, 5]
    ```
    
- 유니코드 코드 포인트의 순서를 따름
    
    ```jsx
    ['2', '1'].sort(); // -> ["1", "2"]
    [2, 1].sort();     // -> [1, 2]
    ```
    
    ```jsx
    ['2', '10'].sort(); // -> ["10", "2"]
    [2, 10].sort();     // -> [10, 2]
    ```
    
- 정렬 순서를 정의하는 비교 함수를 인수로 전달
    
    ```jsx
    const points = [40, 100, 1, 5, 2, 25, 10];
    
    // 숫자 배열의 오름차순 정렬. 비교 함수의 반환값이 0보다 작으면 a를 우선하여 정렬한다.
    points.sort((a, b) => a - b);
    console.log(points); // [1, 2, 5, 10, 25, 40, 100]
    
    // 숫자 배열에서 최소/최대값 취득
    console.log(points[0], points[points.length]); // 1
    
    // 숫자 배열의 내림차순 정렬. 비교 함수의 반환값이 0보다 크면 b를 우선하여 정렬한다.
    points.sort((a, b) => b - a);
    console.log(points); // [100, 40, 25, 10, 5, 2, 1]
    
    // 숫자 배열에서 최대값 취득
    console.log(points[0]); // 100
    ```
    
- 객체를 요소로 갖는 배열 정렬
    
    ```jsx
    const todos = [
      { id: 4, content: 'JavaScript' },
      { id: 1, content: 'HTML' },
      { id: 2, content: 'CSS' }
    ];
    
    // 비교 함수. 매개변수 key는 프로퍼티 키다.
    function compare(key) {
      // 프로퍼티 값이 문자열인 경우 - 산술 연산으로 비교하면 NaN이 나오므로 비교 연산을 사용한다.
      // 비교 함수는 양수/음수/0을 반환하면 되므로 - 산술 연산 대신 비교 연산을 사용할 수 있다.
      return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
    }
    
    // id를 기준으로 오름차순 정렬
    todos.sort(compare('id'));
    console.log(todos);
    /*
    [
      { id: 1, content: 'HTML' },
      { id: 2, content: 'CSS' },
      { id: 4, content: 'JavaScript' }
    ]
    */
    
    // content를 기준으로 오름차순 정렬
    todos.sort(compare('content'));
    console.log(todos);
    /*
    [
      { id: 2, content: 'CSS' },
      { id: 1, content: 'HTML' },
      { id: 4, content: 'JavaScript' }
    ]
    */
    ```
    

## 2. `Array.prototype.forEach`

```jsx
const numbers = [1, 2, 3];
let pows = [];

// for 문으로 배열 순회
for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]
```

- `for` 문을 대체할 수 있는 고차 함수
- 자신의 내부에서 반복문을 실행
- 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 콜백 함수로 전달받아 반복 호출
    
    ```jsx
    const numbers = [1, 2, 3];
    let pows = [];
    
    // forEach 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
    numbers.forEach(item => pows.push(item ** 2));
    console.log(pows); // [1, 4, 9]
    ```
    
- `forEach` 메서드를 호출한 배열의 요소값과 인덱스, `forEach` 메서드를 호출한 배열 자체, `this` 를 순차적으로 전달 받기 가능
    
    ```jsx
    // forEach 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
    [1, 2, 3].forEach((item, index, arr) => {
      console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
    });
    /*
    요소값: 1, 인덱스: 0, this: [1,2,3]
    요소값: 2, 인덱스: 1, this: [1,2,3]
    요소값: 3, 인덱스: 2, this: [1,2,3]
    */
    ```
    
- 원본 배열 변경 X
    
    ```jsx
    const numbers = [1, 2, 3];
    
    // forEach 메서드는 원본 배열을 변경하지 않지만 콜백 함수를 통해 원본 배열을 변경할 수는 있다.
    // 콜백 함수의 세 번째 매개변수 arr은 원본 배열 numbers를 가리킨다.
    // 따라서 콜백 함수의 세 번째 매개변수 arr을 직접 변경하면 원본 배열 numbers가 변경된다.
    numbers.forEach((item, index, arr) => { arr[index] = item ** 2; });
    console.log(numbers); // [1, 4, 9]
    ```
    
- 반환값은 언제나 `undefined`
    
    ```jsx
    const result = [1, 2, 3].forEach(console.log);
    console.log(result); // undefined
    ```
    
- 두 번째 인수로 `forEach` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
    
    ```jsx
    class Numbers {
      numberArray = [];
    
      multiply(arr) {
        arr.forEach(function (item) {
          // TypeError: Cannot read property 'numberArray' of undefined
          this.numberArray.push(item * item);
        });
      }
    }
    
    const numbers = new Numbers();
    numbers.multiply([1, 2, 3]);
    ```
    
    ```jsx
    class Numbers {
      numberArray = [];
    
      multiply(arr) {
        arr.forEach(function (item) {
          this.numberArray.push(item * item);
        }, this); // forEach 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
      }
    }
    
    const numbers = new Numbers();
    numbers.multiply([1, 2, 3]);
    console.log(numbers.numberArray); // [1, 4, 9]
    ```
    
- ES6의 화살표 함수 사용
    
    ```jsx
    class Numbers {
      numberArray = [];
    
      multiply(arr) {
        // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
        arr.forEach(item => this.numberArray.push(item * item));
      }
    }
    
    const numbers = new Numbers();
    numbers.multiply([1, 2, 3]);
    console.log(numbers.numberArray); // [1, 4, 9]
    ```
    
    ```jsx
    // 만약 Array.prototype에 forEach 메서드가 존재하지 않으면 폴리필을 추가한다.
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (callback, thisArg) {
        // 첫 번째 인수가 함수가 아니면 TypeError를 발생시킨다.
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
    
        // this로 사용할 두 번째 인수를 전달받지 못하면 전역 객체를 this로 사용한다.
        thisArg = thisArg || window;
    
        // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
        for (var i = 0; i < this.length; i++) {
          // call 메서드를 통해 thisArg를 전달하면서 콜백 함수를 호출한다.
          // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
          callback.call(thisArg, this[i], i, this);
        }
      };
    }
    ```
    
- `break, continue` 문 사용 불가 → 배열의 모든 요소를 빠짐없이 모두 순회하며 중간에 순회 중단 불가
    
    ```jsx
    [1, 2, 3].forEach(item => {
      console.log(item);
      if (item > 1) break; // SyntaxError: Illegal break statement
    });
    
    [1, 2, 3].forEach(item => {
      console.log(item);
      if (item > 1) continue;
      // SyntaxError: Illegal continue statement: no surrounding iteration statement
    });
    ```
    
- 존재하지 않는 요소는 순회 대상에서 제외
    
    ```jsx
    // 희소 배열
    const arr = [1, , 3];
    
    // for 문으로 희소 배열을 순회
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i]); // 1, undefined, 3
    }
    
    // forEach 메서드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
    arr.forEach(v => console.log(v)); // 1, 3
    ```
    

## 3. `Array.prototype.map`

- 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출
- 콜백 함수의 반환값들로 구성된 새로운 배열 반환
- 원본 배열 변경 X
    
    ```jsx
    const numbers = [1, 4, 9];
    
    // map 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
    // 그리고 콜백 함수의 반환값들로 구성된 새로운 배열을 반환한다.
    const roots = numbers.map(item => Math.sqrt(item));
    
    // 위 코드는 다음과 같다.
    // const roots = numbers.map(Math.sqrt);
    
    // map 메서드는 새로운 배열을 반환한다
    console.log(roots);   // [ 1, 2, 3 ]
    // map 메서드는 원본 배열을 변경하지 않는다
    console.log(numbers); // [ 1, 4, 9 ]
    ```
    
- 새로운 배열의 `length` 프로퍼티 값 : `map` 메서드를 호출한 배열의 `length` 프로퍼티 값과 반드시 일치 → `map` 메서드를 호출한 배열과 `map` 메서드가 생성하여 반환한 배열은 1:1 매핑
- `map` 메서드를 호출한 배열의 요소값과 인덱스, `map` 메서드를 호출한 배열(`this`)을 순차적으로 전달
    
    ```jsx
    // map 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
    [1, 2, 3].map((item, index, arr) => {
      console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
      return item;
    });
    /*
    요소값: 1, 인덱스: 0, this: [1,2,3]
    요소값: 2, 인덱스: 1, this: [1,2,3]
    요소값: 3, 인덱스: 2, this: [1,2,3]
    */
    ```
    
- `map` 메서드의 두 번째 인수로 `map` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달
    
    ```jsx
    class Prefixer {
      constructor(prefix) {
        this.prefix = prefix;
      }
    
      add(arr) {
        return arr.map(function (item) {
          // 외부에서 this를 전달하지 않으면 this는 undefined를 가리킨다.
          return this.prefix + item;
        }, this); // map 메서드의 콜백 함수 내부에서 this로 사용할 객체를 전달
      }
    }
    
    const prefixer = new Prefixer('-webkit-');
    console.log(prefixer.add(['transition', 'user-select']));
    // ['-webkit-transition', '-webkit-user-select']
    ```
    
- ES6의 화살표 함수 사용
    
    ```jsx
    class Prefixer {
      constructor(prefix) {
        this.prefix = prefix;
      }
    
      add(arr) {
        // 화살표 함수 내부에서 this를 참조하면 상위 스코프의 this를 그대로 참조한다.
        return arr.map(item => this.prefix + item);
      }
    }
    
    const prefixer = new Prefixer('-webkit-');
    console.log(prefixer.add(['transition', 'user-select']));
    // ['-webkit-transition', '-webkit-user-select']
    ```
    

## 4. `Array.prototype.filter`

- 자신을 호출한 배열의 모든 요소를 순회하면서 인수로 전달받은 콜백 함수를 반복 호출
- 콜백 함수의 반환값이 `true` 인 요소로만 구성된 새로운 배열 반환
    
    ```jsx
    const numbers = [1, 2, 3, 4, 5];
    
    // filter 메서드는 numbers 배열의 모든 요소를 순회하면서 콜백 함수를 반복 호출한다.
    // 그리고 콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.
    // 다음의 경우 numbers 배열에서 홀수인 요소만을 필터링한다(1은 true로 평가된다).
    const odds = numbers.filter(item => item % 2);
    console.log(odds); // [1, 3, 5]
    ```
    
- 새로운 배열의 `length` 프로퍼티 값 : `filter` 메서드를 호출한 배열의 `length` 프로퍼티 값과 같거나 작음
- `filter` 메서드를 호출한 배열의 요소값과 인덱스, `filter` 메서드를 호출한 배열(`this`)을 순차적으로 전달
    
    ```jsx
    // filter 메서드는 콜백 함수를 호출하면서 3개(요소값, 인덱스, this)의 인수를 전달한다.
    [1, 2, 3].filter((item, index, arr) => {
      console.log(`요소값: ${item}, 인덱스: ${index}, this: ${JSON.stringify(arr)}`);
      return item % 2;
    });
    /*
    요소값: 1, 인덱스: 0, this: [1,2,3]
    요소값: 2, 인덱스: 1, this: [1,2,3]
    요소값: 3, 인덱스: 2, this: [1,2,3]
    */
    ```
    
- `filter` 메서드의 두 번째 인수로 `filter` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
- 화살표 함수 사용
- 자신을 호출한 배열에서 특정 요소를 제거하기 위해 사용 가능
    
    ```jsx
    class Users {
      constructor() {
        this.users = [
          { id: 1, name: 'Lee' },
          { id: 2, name: 'Kim' }
        ];
      }
    
      // 요소 추출
      findById(id) {
        // id가 일치하는 사용자만 반환한다.
        return this.users.filter(user => user.id === id);
      }
    
      // 요소 제거
      remove(id) {
        // id가 일치하지 않는 사용자를 제거한다.
        this.users = this.users.filter(user => user.id !== id);
      }
    }
    
    const users = new Users();
    
    let user = users.findById(1);
    console.log(user); // [{ id: 1, name: 'Lee' }]
    
    // id가 1인 사용자를 제거한다.
    users.remove(1);
    
    user = users.findById(1);
    console.log(user); // []
    ```
    
- 특정 요소를 하나만 제거하려면 `indexOf` 메서드를 통해 특정 요소의 인덱스를 취득한 다음 `splice` 메서드 사용

## 5. `Array.prototype.reduce`

- 자신을 호출한 배열을 모든 요소를 순회하며 인수로 전달받은 콜백 함수를 반복 호출
- 콜백 함수의 반환값을 다음 순회 시에 콜백 함수의 첫 번째 인수로 전달하면서 콜백 함수를 호출하여 하나의 결과값을 만들어 반환
- 원본 배열 변경 X
- 첫 번째 인수 : 콜백 함수
- 두 번째 인수 : 초기값
- 콜백 함수 4개 인수 : 초기값 또는 콜백 함수의 이전 반환값, `reduce` 메서드를 호출한 배열의 요소값과 인덱스, `reduce` 메서드를 호출한 배열 자체(`this`) 전달
    
    ```jsx
    // [1, 2, 3, 4]의 모든 요소의 누적을 구한다.
    const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);
    
    console.log(sum); // 10
    ```
    
- 하나의 결과값을 반환

### 1. 평균 구하기

```jsx
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
  // 마지막 순회가 아니면 누적값을 반환하고 마지막 순회면 누적값으로 평균을 구해 반환한다.
  return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average); // 3.5
```

### 2. 최대값 구하기

```jsx
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max); // 5
```

- `Math.max` 메서드를 사용하는 것이 더 직관적
    
    ```jsx
    const values = [1, 2, 3, 4, 5];
    
    const max = Math.max(...values);
    // var max = Math.max.apply(null, values);
    console.log(max); // 5
    ```
    

### 3. 요소의 중복 횟수 구하기

```jsx
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
  // 첫 번째 순회 시 acc는 초기값인 {}이고 cur은 첫 번째 요소인 'banana'다.
  // 초기값으로 전달받은 빈 객체에 요소값인 cur을 프로퍼티 키로, 요소의 개수를 프로퍼티 값으로
  // 할당한다. 만약 프로퍼티 값이 undefined(처음 등장하는 요소)이면 프로퍼티 값을 1로 초기화한다.
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});

// 콜백 함수는 총 5번 호출되고 다음과 같이 결과값을 반환한다.
/*
{banana: 1} => {banana: 1, apple: 1} => {banana: 1, apple: 1, orange: 1}
=> {banana: 1, apple: 1, orange: 2} => {banana: 1, apple: 2, orange: 2}
*/

console.log(count); // { banana: 1, apple: 2, orange: 2 }
```

### 4. 중첩 배열 평탄화

```jsx
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat(cur), []);
// [1] => [1, 2, 3] => [1, 2, 3, 4] => [1, 2, 3, 4, 5, 6]

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

- ES10에서 도입된 `Array.prototype.flat` 메서드를 사용하는 것이 더 직관적
    
    ```jsx
    [1, [2, 3, 4, 5]].flat(); // -> [1, 2, 3, 4, 5]
    
    // 인수 2는 중첩 배열을 평탄화하기 위한 깊이 값이다.
    [1, [2, 3, [4, 5]]].flat(2); // -> [1, 2, 3, 4, 5]
    ```
    

### 5. 중복 요소 제거

```jsx
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce(
  (unique, val, i, _values) =>
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다.
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 다르다면 val은 중복된 요소다.
    // 처음 순회하는 요소만 초기값 []가 전달된 unique 배열에 담아 반환하면 중복된 요소는 제거된다.
    _values.indexOf(val) === i ? [...unique, val] : unique,
  []
);

console.log(result); // [1, 2, 3, 5, 4]
```

- `filter` 메서드를 사용하는 것에 더 직관적
    
    ```jsx
    const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
    
    // 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다. 이 요소만 필터링한다.
    const result = values.filter((val, i, _values) => _values.indexOf(val) === i);
    console.log(result); // [1, 2, 3, 5, 4]
    ```
    
- 중복되지 않는 유일한 값들의 집합인 `Set` 사용 가능 → 중복 요소 제거
    
    ```jsx
    const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];
    
    // 중복을 허용하지 않는 Set 객체의 특성을 활용하여 배열에서 중복된 요소를 제거할 수 있다.
    const result = [...new Set(values)];
    console.log(result); // [1, 2, 3, 5, 4]
    ```
    
- `reduce` 메서드의 두 번째 인수로 전달하는 초기값은 생략 가능
    
    ```jsx
    // reduce 메서드의 두 번째 인수, 즉 초기값을 생략했다.
    const sum = [1, 2, 3, 4].reduce((acc, cur) => acc + cur);
    console.log(sum); // 10
    ```
    
- `reduce` 메서드를 호출 → 언제나 초기값을 전달하는 것이 안전
    
    ```jsx
    const sum = [].reduce((acc, cur) => acc + cur);
    // TypeError: Reduce of empty array with no initial value
    ```
    
- 빈 배열로 `reduce` 메서드 호출 → 에러 발생
    
    ```jsx
    const sum = [].reduce((acc, cur) => acc + cur, 0);
    console.log(sum); // 0
    ```
    
- 객체의 특정 프로퍼티 값을 합산하는 경우
    
    ```jsx
    const products = [
      { id: 1, price: 100 },
      { id: 2, price: 200 },
      { id: 3, price: 300 }
    ];
    
    // 1번째 순회 시 acc는 { id: 1, price: 100 }, cur은 { id: 2, price: 200 }이고
    // 2번째 순회 시 acc는 300, cur은 { id: 3, price: 300 }이다.
    // 2번째 순회 시 acc에 함수에 객체가 아닌 숫자값이 전달된다. 이때 acc.price는 undefined다.
    const priceSum = products.reduce((acc, cur) => acc.price + cur.price);
    
    console.log(priceSum); // NaN
    ```
    
- 반드시 초기값 전달
    
    ```jsx
    const products = [
      { id: 1, price: 100 },
      { id: 2, price: 200 },
      { id: 3, price: 300 }
    ];
    
    /*
    1번째 순회 : acc => 0,   cur => { id: 1, price: 100 }
    2번째 순회 : acc => 100, cur => { id: 2, price: 200 }
    3번째 순회 : acc => 300, cur => { id: 3, price: 300 }
    */
    const priceSum = products.reduce((acc, cur) => acc + cur.price, 0);
    
    console.log(priceSum); // 600
    ```
    

## 6. `Array.prototype.some`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수 호출
- 콜백 함수의 반환값이 단 한 번이라도 참이면 `true` , 모두 거짓이면 `false` 반환
- 호출한 배열이 빈 배열인 경우 언제나 `false` 반환
- `some` 메서드의 콜백 함수 : `some` 메서드를 호출한 요소값과 인덱스, `some` 메서드를 호출한 배열 자체(`this`) 순차적으로 전달 받긱 가능
    
    ```jsx
    // 배열의 요소 중에 10보다 큰 요소가 1개 이상 존재하는지 확인
    [5, 10, 15].some(item => item > 10); // -> true
    
    // 배열의 요소 중에 0보다 작은 요소가 1개 이상 존재하는지 확인
    [5, 10, 15].some(item => item < 0); // -> false
    
    // 배열의 요소 중에 'banana'가 1개 이상 존재하는지 확인
    ['apple', 'banana', 'mango'].some(item => item === 'banana'); // -> true
    
    // some 메서드를 호출한 배열이 빈 배열인 경우 언제나 false를 반환한다.
    [].some(item => item > 3); // -> false
    ```
    
- `some` 메서드의 두 번째 인수로 `some` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
- 화살표 함수 사용

## 7. `Array.prototype.every`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수 호출
- 콜백 함수의 반환값이 모두 참이면 `true` , 단 한 번이라도 거짓이면 `false` 반환
- 호출한 배열의 빈 배열인 경우 언제나 `true` 반환
- `every` 메서드의 콜백 함수 : `every` 메서드를 호출한 요소값과 인덱스, `every` 메서드를 호출한 배열 자체(`this`) 순차적으로 전달 받기 가능
    
    ```jsx
    // 배열의 모든 요소가 3보다 큰지 확인
    [5, 10, 15].every(item => item > 3); // -> true
    
    // 배열의 모든 요소가 10보다 큰지 확인
    [5, 10, 15].every(item => item > 10); // -> false
    
    // every 메서드를 호출한 배열이 빈 배열인 경우 언제나 true를 반환한다.
    [].every(item => item > 3); // -> true
    ```
    
- `every` 메서드의 두 번째 인수로 `every` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
- 화살표 함수 사용

## 8. `Array.prototype.find`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 `true` 인 첫 번째 요소 반환
- 콜백 함수의 반환값이 `true` 인 요소가 존재하지 않으면 `undefined` 반환
- `find` 메서드의 콜백 함수 : `find` 메서드를 호출한 요소값과 인덱스, `find` 메서드를 호출한 배열 자체(`this`) 순차적으로 전달 받기 가능
    
    ```jsx
    const users = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
      { id: 2, name: 'Choi' },
      { id: 3, name: 'Park' }
    ];
    
    // id가 2인 첫 번째 요소를 반환한다. find 메서드는 배열이 아니라 요소를 반환한다.
    users.find(user => user.id === 2); // -> {id: 2, name: 'Kim'}
    ```
    
- 콜백 함수의 호출 결과가 `true` 인 요소만 추출한 새로운 배열 반환
- 반환값은 언제나 배열
- 콜백 함수의 반환값이 `true` 인 첫 번째 요소를 반환 → `find` 결과값은 배열이 아닌 해당 요소값
- `find` 메서드의 두 번째 인수로 `find` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
- 화살표 함수 사용

## 9. `Array.prototype.findIndex`

- 자신을 호출한 배열의 요소를 순회하면서 인수로 전달된 콜백 함수를 호출하여 반환값이 `true` 인 첫 번째 요소의 인덱스 반환
- 콜백 함수의 반환값이 `true` 인 요소가 존재하지 않으면 -1 반환
- `findIndex` 메서드의 콜백 함수 : `findIndex` 메서드를 호출한 요소값과 인덱스, `findIndex` 메서드를 호출한 배열 자체(`this`) 순차적으로 전달 받기 가능
    
    ```jsx
    const users = [
      { id: 1, name: 'Lee' },
      { id: 2, name: 'Kim' },
      { id: 2, name: 'Choi' },
      { id: 3, name: 'Park' }
    ];
    
    // id가 2인 요소의 인덱스를 구한다.
    users.findIndex(user => user.id === 2); // -> 1
    
    // name이 'Park'인 요소의 인덱스를 구한다.
    users.findIndex(user => user.name === 'Park'); // -> 3
    
    // 위와 같이 프로퍼티 키와 프로퍼티 값으로 요소의 인덱스를 구하는 경우
    // 다음과 같이 콜백 함수를 추상화할 수 있다.
    function predicate(key, value) {
      // key와 value를 기억하는 클로저를 반환
      return item => item[key] === value;
    }
    
    // id가 2인 요소의 인덱스를 구한다.
    users.findIndex(predicate('id', 2)); // -> 1
    
    // name이 'Park'인 요소의 인덱스를 구한다.
    users.findIndex(predicate('name', 'Park')); // -> 3
    ```
    
- `findIndex` 메서드의 두 번째 인수로 `findIndex` 메서드의 콜백 함수 내부에서 `this` 로 사용할 객체 전달 가능
- 화살표 함수 사용

## 10. `Array.prototype.flatMap`

- `map` 메서드를 통해 생성된 새로운 배열을 평탄화
- `map` 메서드와 `flat` 메서드를 순차적으로 실행하는 효과
    
    ```jsx
    const arr = ['hello', 'world'];
    
    // map과 flat을 순차적으로 실행
    arr.map(x => x.split('')).flat();
    // -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
    
    // flatMap은 map을 통해 생성된 새로운 배열을 평탄화한다.
    arr.flatMap(x => x.split(''));
    // -> ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
    ```
    
- 1단계만 평탄화 → `map` 메서드를 통해 생성된 중첩 배열의 평탄화 깊이를 지정해야 하면 `flatMap` 메서드를 사용하지 않고 `map` 메서드와 `flat` 메서드를 각각 호출
    
    ```jsx
    const arr = ['hello', 'world'];
    
    // flatMap은 1단계만 평탄화한다.
    arr.flatMap((str, index) => [index, [str, str.length]]);
    // -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, ['hello', 5], 1, ['world', 5]]
    
    // 평탄화 깊이를 지정해야 하면 flatMap 메서드를 사용하지 말고 map 메서드와 flat 메서드를 각각 호출한다.
    arr.map((str, index) => [index, [str, str.length]]).flat(2);
    // -> [[0, ['hello', 5]], [1, ['world', 5]]] => [0, 'hello', 5, 1, 'world', 5]
    ```
