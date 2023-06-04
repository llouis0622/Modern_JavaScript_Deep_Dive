const str = '   foo  ';

// String.prototype.{trimStart,trimEnd} : Proposal stage 4
str.trimStart(); // -> 'foo  '
str.trimEnd();   // -> '   foo'