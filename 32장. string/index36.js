const str = 'Hello Hello';

// 'hello'를 대소문자를 구별하지 않고 전역 검색한다.
str.replace(/hello/gi, 'Lee'); // -> 'Lee Lee'