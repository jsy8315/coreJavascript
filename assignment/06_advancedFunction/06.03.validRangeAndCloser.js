// 02. 어떤 변수가 사용될까요?
function makeWorker() {
    let name = "Pete";
    return function () {
      alert(name);
    };
  }
  let name = "John";
  // 함수를 만듭니다.
  let work = makeWorker();
  // 함수를 호출합니다.
  work(); // 무엇이 나올까요?

  // 내 사고방식
//   01. 전역 렉시컬 환경 (전역 렉시컬 환경은 하기 괄호 안과 같음)
//       (
//       makeWorker : function
//       work : undefined
//       name : "John"
//       )
//       전역 렉시컬 환경에 위와 같이 저장됨 (변수 호이스팅 떄문에 먼저 변수와 함수가 메모리에 등록)
  
//   02. makeWorker가 호출되면서 렉시컬 환경(makeWorker)이 새로 생성
//       lexical environment of makeWorker
//       (name : "Pete")
//       동시에 makeWorker.[[Environment]]가 생성되면서, 전역 렉시컬 함수를 참조함(기억함)
//       (함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장되기 때문에)
//   03. makeWorker가 호출되면서 내부 함수 반환(내부함수.[[Environment]]가 생성되고, 이는 lexical environment of makeWorker를 참조)
//   04. 따라서 Pete를 alert한다

// 정답
//   "Pete"가 출력된다. 
//   만약 makeWorker()함수 내부에 let name가 없었다면 외부 렉시컬 환경(전역 렉시컬 환경)을 참조후, "John"이 출력됐을것.

// 03. counter는 독립적일까요?
function makeCounter() {
    let count = 0;
  
    return function() {
      return count++;
    };
  }
  
  let counter = makeCounter();
  let counter2 = makeCounter();
  
  alert( counter() ); // 0
  alert( counter() ); // 1
  
  alert( counter2() ); // ?
  alert( counter2() ); // ?

// 내 답압
// 1. 먼저 전역 렉시컬 환경에 변수, 함수가 할당된다

// 전역 렉시컬 환경
// makeCounter : function
// counter : undefined
// counter2 : undefined

// 2. makeCounter() 함수 할당
// lexical environment of makeCounter 
// count : 0
// [[Environment]] -> 전역 렉시컬 환경
// 내부함수 : function

// 3. 내부 함수 할당
// lexical environment of 내부함수
// count : undefined
// [[Environment]] -> lexical environment of makeCounter

// alert( counter() ) > makeCounter의 내부함수에서 lexical environment of makeCounter를 참고, 
// lexical environment of makeCounter 
// count : 1
// 로 변하고 1을 출력
// alert( counter() );도 같은 절차로 2를 출력

// alert( counter2())
// lexical environment of makeCounter 
// count : 2

// alert( counter2() );를 진행할땐?
// 같은 lexical environment of makeCounter 하니까 3이 되지 않을까?
// 어차피 똑같이 내부 함수의 렉시컬 환경은 empty이기 때문에, 외부 참조를 해서 count를 확인할텐데

