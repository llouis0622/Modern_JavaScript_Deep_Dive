// 무명 함수를 이벤트 핸들러로 등록
$button.addEventListener('click', function () {
  console.log('button click');
  // 이벤트 핸들러를 제거한다. 따라서 이벤트 핸들러는 단 한 번만 호출된다.
  // arguments.callee는 호출된 함수, 즉 함수 자신을 가리킨다.
  $button.removeEventListener('click', arguments.callee);
});