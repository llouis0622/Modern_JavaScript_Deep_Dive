// 인수로 전달받은 문자열을 역순으로 뒤집는다.
function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString('Hello world!'); // -> '!dlrow olleH'