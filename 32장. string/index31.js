const str = '   foo  ';

// 첫 번째 인수로 전달한 정규 표현식에 매치하는 문자열을 두 번째 인수로 전달한 문자열로 치환한다.
str.replace(/\s/g, '');   // -> 'foo'
str.replace(/^\s+/g, ''); // -> 'foo  '
str.replace(/\s+$/g, ''); // -> '   foo'