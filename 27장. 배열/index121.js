const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

// 현재 순회 중인 요소의 인덱스 i가 val의 인덱스와 같다면 val은 처음 순회하는 요소다. 이 요소만 필터링한다.
const result = values.filter((val, i, _values) => _values.indexOf(val) === i);
console.log(result); // [1, 2, 3, 5, 4]