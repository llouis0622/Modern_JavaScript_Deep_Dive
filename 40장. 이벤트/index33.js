function activate({ target }) {
  // 이벤트를 발생시킨 요소(target)이 ul#fruits의 자식 요소가 아니라면 무시한다.
  if (!target.matches('#fruits > li')) return;
  ...