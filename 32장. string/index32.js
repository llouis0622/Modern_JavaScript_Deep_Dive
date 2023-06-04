const str = 'abc';

str.repeat();    // -> ''
str.repeat(0);   // -> ''
str.repeat(1);   // -> 'abc'
str.repeat(2);   // -> 'abcabc'
str.repeat(2.5); // -> 'abcabc' (2.5 → 2)
str.repeat(-1);  // -> RangeError: Invalid count value