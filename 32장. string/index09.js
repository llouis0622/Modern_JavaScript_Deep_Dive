const str = 'Hello World';

// 문자열 str에서 'l'을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf('l'); // -> 2


// 문자열 str에서 'or'을 검색하여 첫 번째 인덱스를 반환한다.
str.indexOf('or'); // -> 7

// 문자열 str에서 'x'를 검색하여 첫 번째 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.
str.indexOf('x'); // -> -1