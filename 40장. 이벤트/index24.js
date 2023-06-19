$checkbox.onchange = e => {
  // e.target은 change 이벤트를 발생시킨 DOM 요소 $checkbox를 가리키고
  // e.currentTarget은 이벤트 핸들러가 바인딩된 DOM 요소 $checkbox를 가리킨다.
  console.log(e.target === e.currentTarget); // true

  $msg.textContent = e.target.checked ? 'on' : 'off';
};