// function sumAll(){
//     // 매개변수가 없으면 -999 return
//     // 매개변수가 있으면 매개변수들의 합을 return
// }
function sumAll() {
  if (arguments.length === 0) return -999;
  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    const n = Number(arguments[i]);
    sum += isNaN(n) ? 0 : n;
  }
  return sum;
}

//test
console.log(sumAll());
console.log(sumAll(1, 2));
console.log(sumAll(1, 2, 3, 4, 5));

    // var sum = sumAll(); // -999 (매개변수가 없으면 -999를 리턴)
    // document.write('sumAll() = ' + sum + '<br>');
    // var sum = sumAll(1); // 1 (매개변수가 1개 이상이면 누적값리턴)
    // document.write('sumAll(1) = ' + sum + '<br>');
    // var sum = sumAll(1, 2, 3, 4, 5); // 15
    // document.write('sumAll(1, 2, 3, 4, 5) = ' + sum + '<br>');


