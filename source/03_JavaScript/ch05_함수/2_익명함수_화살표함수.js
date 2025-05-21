let funVar = function(){
    console.log('1. 매개변수가 없는 일반함수 호출');
}
funVar = () =>{
    console.log('2. 매개변수가 없는 화살표 함수 호출');
};  

funVar = function(i){
    console.log('3.매개변수가 하나 있는 일반 함수 호출');
    console.log('매개변수 값 = ', i);
} 

funVar(10);
funVar = i=>{
    console.log('4.매개변수가 하나 있는 화살표 함수 호출');
    console.log('매개변수 값 = ', i);
} 

funVar(10);
funVar = function(i){
    console.log('5.매개변수가 하나의 한줄짜리 일반 함수 호출', i);
} 

funVar(20);
funVar = i => console.log('6. 매개변수가 하나의 한줄짜리 화살표 함수 호출', i); 
funVar(20);
funVar=function(x){
    return x*x;
}
console.log('7. retrun문 만 있는 일반함수 호출', funVar(10));

funVar = x => x*x;
console.log('8. retrun문 만 있는 화살표 함수 호출', funVar(7));

funVar= (x, y) => x*10+y;
console.log('9. 매개변수 2개짜리 retrun 문장의 화살표 함수 호출', funVar(5, 3));

// var arr=[1, '홍길동','신림동'];
// arr.forEach(function(data, idx){
//     console.log(idx, '번째 :', data);
// }); // 옛날사람 취급받음

var arr=[1, '홍길동','신림동'];
arr.forEach((data, idx) => console.log(idx, '번째 :', data));

arr.forEach(data => console.log(data));