# 37장. Set과 Map

# 1. `Set`

- 중복되지 않는 유일한 값들의 집합
- 배열과 유사
    - 동일한 값을 중복하여 포함 불가
    - 요소 순서 X
    - 인덱스로 요소 접근 불가
- 수학적 집합의 특성과 일치 → 수학적 집합을 구현하기 위한 자료구조

## 1. `Set` 객체의 생성

- `Set` 생성자 함수로 생성
    
    ```jsx
    const set = new Set();
    console.log(set); // Set(0) {}
    ```
    
- 이터러블을 인수로 전달받아 `Set` 객체 생성
- 이터러블의 중복된 값은 `Set` 객체에 요소로 저장되지 않음
    
    ```jsx
    const set1 = new Set([1, 2, 3, 3]);
    console.log(set1); // Set(3) {1, 2, 3}
    
    const set2 = new Set('hello');
    console.log(set2); // Set(4) {"h", "e", "l", "o"}
    ```
    
- 배열에서 중복된 요소 제거 가능
    
    ```jsx
    // 배열의 중복 요소 제거
    const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i);
    console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
    
    // Set을 사용한 배열의 중복 요소 제거
    const uniq = array => [...new Set(array)];
    console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
    ```
    

## 2. 요소 개수 확인

- `Set.prototype.size` 프로퍼티 사용
    
    ```jsx
    const { size } = new Set([1, 2, 3, 3]);
    console.log(size); // 3
    ```
    
- `getter` 함수만 존재하는 접근자 프로퍼티
- 숫자를 할당하여 `Set` 객체의 요소 개수 변경 불가능
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
    // {set: undefined, enumerable: false, configurable: true, get: ƒ}
    
    set.size = 10; // 무시된다.
    console.log(set.size); // 3
    ```
    

## 3. 요소 추가

- `Set.prototype.add` 메서드 사용
    
    ```jsx
    const set = new Set();
    console.log(set); // Set(0) {}
    
    set.add(1);
    console.log(set); // Set(1) {1}
    ```
    
- 새로운 요소가 출가된 `Set` 객체 반환
- 연속적으로 호출 가능
    
    ```jsx
    const set = new Set();
    
    set.add(1).add(2);
    console.log(set); // Set(2) {1, 2}
    ```
    
- 중복된 요소의 추가는 허용되지 않음
    
    ```jsx
    const set = new Set();
    
    set.add(1).add(2).add(2);
    console.log(set); // Set(2) {1, 2}
    ```
    
    ```jsx
    const set = new Set();
    
    console.log(NaN === NaN); // false
    console.log(0 === -0); // true
    
    // NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
    set.add(NaN).add(NaN);
    console.log(set); // Set(1) {NaN}
    
    // +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
    set.add(0).add(-0);
    console.log(set); // Set(2) {NaN, 0}
    ```
    
- 자바스크립트의 모든 값을 요소로 저장 가능
    
    ```jsx
    const set = new Set();
    
    set
      .add(1)
      .add('a')
      .add(true)
      .add(undefined)
      .add(null)
      .add({})
      .add([]);
    
    console.log(set); // Set(7) {1, "a", true, undefined, null, {}, []}
    ```
    

## 4. 요소 존재 여부 확인

- `Set.prototype.has` 메서드 사용
- 특정 요소의 존재 여부를 나타내는 불리언 값 반환
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    console.log(set.has(2)); // true
    console.log(set.has(4)); // false
    ```
    

## 5. 요소 삭제

- `Set.prototype.delete` 메서드 사용
- 삭제 성공 여부를 나타내는 불리언 값 반환
- 인덱스가 아니라 삭제하려는 요소값을 인수로 전달
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    // 요소 2를 삭제한다.
    set.delete(2);
    console.log(set); // Set(2) {1, 3}
    
    // 요소 1을 삭제한다.
    set.delete(1);
    console.log(set); // Set(1) {3}
    ```
    
- 존재하지 않는 요소 삭제 → 에러 없이 무시
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    // 존재하지 않는 요소 0을 삭제하면 에러없이 무시된다.
    set.delete(0);
    console.log(set); // Set(3) {1, 2, 3}
    ```
    
- 연속적으로 호출 불가능
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    // delete는 불리언 값을 반환한다.
    set.delete(1).delete(2); // TypeError: set.delete(...).delete is not a function
    ```
    

## 6. 요소 일괄 삭제

- `Set.prototype.clear` 메서드 사용
- `clear` 메서드는 언제나 `undefined` 반환
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    set.clear();
    console.log(set); // Set(0) {}
    ```
    

## 7. 요소 순회

- `Set.prototype.forEach` 메서드 사용
- 콜백 함수와 `forEach` 메서드의 콜백 함수 내부에서 `this` 로 사용될 객체를 인수로 전달
    - 첫 번째 인수 : 현재 순회 중인 요소값
    - 두 번째 인수 : 현재 순회 중인 요소값
    - 세 번째 인수 : 현재 순회 중인 `Set` 객체 자체
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    set.forEach((v, v2, set) => console.log(v, v2, set));
    /*
    1 1 Set(3) {1, 2, 3}
    2 2 Set(3) {1, 2, 3}
    3 3 Set(3) {1, 2, 3}
    */
    ```
    
- 이터러블 → `for ... of` 문으로 순회 가능, 스프레드 문법과 배열 디스트럭처링의 대상 가능
    
    ```jsx
    const set = new Set([1, 2, 3]);
    
    // Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
    console.log(Symbol.iterator in set); // true
    
    // 이터러블인 Set 객체는 for...of 문으로 순회할 수 있다.
    for (const value of set) {
      console.log(value); // 1 2 3
    }
    
    // 이터러블인 Set 객체는 스프레드 문법의 대상이 될 수 있다.
    console.log([...set]); // [1, 2, 3]
    
    // 이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
    const [a, ...rest] = [...set];
    console.log(a, rest); // 1, [2, 3]
    ```
    
- `Set` 객체를 순회하는 순서 : 요소가 추가된 순서

## 8. 집합 연산

### 1. 교집합

- 집합 A와 집합 B의 공통 요소로 구성
    
    ```jsx
    Set.prototype.intersection = function (set) {
      const result = new Set();
    
      for (const value of set) {
        // 2개의 set의 요소가 공통되는 요소이면 교집합의 대상이다.
        if (this.has(value)) result.add(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 교집합
    console.log(setA.intersection(setB)); // Set(2) {2, 4}
    // setB와 setA의 교집합
    console.log(setB.intersection(setA)); // Set(2) {2, 4}
    ```
    
    ```jsx
    Set.prototype.intersection = function (set) {
      return new Set([...this].filter(v => set.has(v)));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 교집합
    console.log(setA.intersection(setB)); // Set(2) {2, 4}
    // setB와 setA의 교집합
    console.log(setB.intersection(setA)); // Set(2) {2, 4}
    ```
    

### 2. 합집합

- 집합 A와 집합 B의 중복 없는 모든 요소로 구성
    
    ```jsx
    Set.prototype.union = function (set) {
      // this(Set 객체)를 복사
      const result = new Set(this);
    
      for (const value of set) {
        // 합집합은 2개의 Set 객체의 모든 요소로 구성된 집합이다. 중복된 요소는 포함되지 않는다.
        result.add(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 합집합
    console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
    // setB와 setA의 합집합
    console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
    ```
    
    ```jsx
    Set.prototype.union = function (set) {
      return new Set([...this, ...set]);
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA와 setB의 합집합
    console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
    // setB와 setA의 합집합
    console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
    ```
    

### 3. 차집합

- 집합 A에는 존재하지만 집합 B에는 존재하지 않는 요소로 구성
    
    ```jsx
    Set.prototype.difference = function (set) {
      // this(Set 객체)를 복사
      const result = new Set(this);
    
      for (const value of set) {
        // 차집합은 어느 한쪽 집합에는 존재하지만 다른 한쪽 집합에는 존재하지 않는 요소로 구성된 집합이다.
        result.delete(value);
      }
    
      return result;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA에 대한 setB의 차집합
    console.log(setA.difference(setB)); // Set(2) {1, 3}
    // setB에 대한 setA의 차집합
    console.log(setB.difference(setA)); // Set(0) {}
    ```
    
    ```jsx
    Set.prototype.difference = function (set) {
      return new Set([...this].filter(v => !set.has(v)));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA에 대한 setB의 차집합
    console.log(setA.difference(setB)); // Set(2) {1, 3}
    // setB에 대한 setA의 차집합
    console.log(setB.difference(setA)); // Set(0) {}
    ```
    

### 4. 부분 집합과 상위 집합

- 집합 A가 집합 B에 포함되는 경우 집합 A는 집합 B의 부분 집합
- 집합 B는 집합 A의 상위 집합
    
    ```jsx
    // this가 subset의 상위 집합인지 확인한다.
    Set.prototype.isSuperset = function (subset) {
      for (const value of subset) {
        // superset의 모든 요소가 subset의 모든 요소를 포함하는지 확인
        if (!this.has(value)) return false;
      }
    
      return true;
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA가 setB의 상위 집합인지 확인한다.
    console.log(setA.isSuperset(setB)); // true
    // setB가 setA의 상위 집합인지 확인한다.
    console.log(setB.isSuperset(setA)); // false
    ```
    
    ```jsx
    // this가 subset의 상위 집합인지 확인한다.
    Set.prototype.isSuperset = function (subset) {
      const supersetArr = [...this];
      return [...subset].every(v => supersetArr.includes(v));
    };
    
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([2, 4]);
    
    // setA가 setB의 상위 집합인지 확인한다.
    console.log(setA.isSuperset(setB)); // true
    // setB가 setA의 상위 집합인지 확인한다.
    console.log(setB.isSuperset(setA)); // false
    ```
