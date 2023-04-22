// 동등 비교. 결과를 예측하기 어렵다.
'0' == ''; // -> false
0 == '';   // -> true
0 == '0';  // -> true
false == 'false';   // -> false
false == '0';       // -> true
false == null;      // -> false
false == undefined; // -> false