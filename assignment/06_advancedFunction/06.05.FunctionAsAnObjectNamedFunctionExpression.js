// 06.05. 객체로서의 함수와 기명 함수 표현식
// 01. 숫자 설정과 감소가 가능한 counter 만들기
function makeCounter() {
    let count = 0;
  
    function counter() {
        return counter.count++;
    }
    return counter;
  }
  
  let counter = makeCounter();
  
  alert( counter() ); // 0
  alert( counter() ); // 1
  
counter.set(10); // set the new count
  
//   alert( counter() ); // 10
  
//   counter.decrease(); // decrease the count by 1
  
//   alert( counter() ); // 10 (instead of 11)