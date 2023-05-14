const x = 1;

function foo() {
  eval('var x = 2; console.log(x);'); // 2
  // let, const 키워드를 사용한 변수 선언문은 strict mode가 적용된다.
  eval('const x = 3; console.log(x);'); // 3
  console.log(x); // 2
}

foo();
console.log(x); // 1