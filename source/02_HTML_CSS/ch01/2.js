// 2.js
/* 동적인부분*/

var name = prompt("이름은?", "홍길동"); //취소 클릭시 'null' 리턴
if (name != 'null' && name != '') { // 입력 후 확인버튼 클릭시
    document.write(name + '님 개반갑!!!<br>');
}