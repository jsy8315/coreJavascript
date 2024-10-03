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