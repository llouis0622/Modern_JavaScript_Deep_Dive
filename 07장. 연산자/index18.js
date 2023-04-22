-0 === +0;         // -> true
Object.is(-0, +0); // -> false

NaN === NaN;         // -> false
Object.is(NaN, NaN); // -> true