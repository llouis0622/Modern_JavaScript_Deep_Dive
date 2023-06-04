const str = 'Hello World'; // str.length == 11

// 첫 번째 인수 > 두 번째 인수인 경우 두 인수는 교환된다.
str.substring(4, 1); // -> 'ell'

// 인수 < 0 또는 NaN인 경우 0으로 취급된다.
str.substring(-2); // -> 'Hello World'

// 인수 > 문자열의 길이(str.length)인 경우 인수는 문자열의 길이(str.length)으로 취급된다.
str.substring(1, 100); // -> 'ello World'
str.substring(20); // -> ''