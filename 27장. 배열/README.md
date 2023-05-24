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
