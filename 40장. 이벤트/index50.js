// InputEvent 생성자 함수로 foo 이벤트 타입의 커스텀 이벤트 객체를 생성
const customEvent = new InputEvent('foo');
console.log(customEvent.isTrusted); // false