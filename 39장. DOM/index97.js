// class 어트리뷰트에 강제로 'foo' 클래스를 추가
$box.classList.toggle('foo', true); // -> class="box blue foo"
// class 어트리뷰트에서 강제로 'foo' 클래스를 제거
$box.classList.toggle('foo', false); // -> class="box blue"