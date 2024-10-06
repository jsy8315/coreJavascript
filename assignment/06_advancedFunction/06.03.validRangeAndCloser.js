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

// 정답 코드
// let counter = makeCounter(); 이 코드는 makeCounter()를 실행해서 반환된 함수를 counter 변수에 저장합니다. 
// 이때 counter는 count가 0인 새로운 렉시컬 환경을 기억하는 클로저가 됩니다.
// 마찬가지로 let counter2 = makeCounter();를 실행하면 또 다른 렉시컬 환경이 만들어지고, counter2는 이 환경을 기억하는 새로운 클로저가 됩니다.

// 0,1 이 출력된다
// 함수 실행 시 새로운 레시컬 환경이 생성된다는게 차이점, 

// 함수가 반환할떄 마다 (실행될때마다)새로운 렉시컬 환경이 만들어진다. (포인트)

// 함수는 단순히 메모리 상의 코드 조각이 아니라(변수와 다르게) 함수가 호출될 떄마다 그 함수가 실행된 렉시컬 환경이 함께 따라온다

// 04. counter 객체
// 내 정답 코드
// 01. 전역 렉시컬 환경에 다음과 같은 변수와 함수가 올라간다

// global lexical environment
// Counter : function
// counter : undefined

// lexical environment of Counter
// count : 0
// this.up : undefined
// this.down : undefined
// [[Environment]] of Counter -> global lexical environment (참조)

// Counter의 첫번째 내장함수 lexical environmen
// count : undefined
// [[Environment]] -> lexical environment of Counter 참조

// Counter의 두번째 내장함수 lexical environmen
// count : undefined
// [[Environment]] -> lexical environment of Counter 참조

// alert( counter.up() ); // 1
// alert( counter.up() ); // 2
// alert( counter.down() ); // 1
// 이렇게 출력될거 같은디 

// 정답
// 생성자 함수의 두 중첩 함수는 동일한 외부 렉시컬 환경에서 만들어졌기 때문에 같은 count 변수를 공유함


// 05. if문 안의 함수
// 내 정답 코드
// 내가 생각한 코드 구현 방식
// 01. 전역 렉시컬 환경
// phrase : "Hello"
// sayHi() : undefined

// 02. if문의 렉시컬 환경
// user: "John"
// [[Environment]] -> 전역 렉시컬 환경 참조

// 03. 내부함수 sayHi의 렉시컬 환경
// phrase : undefined
// user: undefined
// [[Environment]] -> if문의 렉시컬 환경

// sayHi 실행 > 차례차례 참조해서 "Hello, John"을 출력할듯

// 정답
// sayHi는 if문 안에서 정의했기에, if문 안에서만 접근 가능, 에러가 발생한다
// 전역 렉시컬 환경에 sayHi가 들어가지 않는다. (함수 생성과 선언은 다른것, )


// 진행
// 1. 코드 시작 시 (전역 렉시컬 환경 생성)
// 먼저 자바스크립트 엔진은 **전역 렉시컬 환경(Global Lexical Environment)**을 생성합니다. 
// 여기에는 let, const, function으로 선언된 전역 변수와 함수가 등록됩니다. 이때 변수는 undefined로 초기화됩니다.

// 전역 렉시컬 환경 초기 상태:
//   phrase: undefined
//   sayHi: undefined (아직 함수가 if 블록 안에 선언되어 있으므로 전역 환경에는 등록되지 않음)
//   user: undefined (if 블록 안에 있으므로 전역 렉시컬 환경에는 등록되지 않음)

// 변수 할당 단계:
//     phrase가 "Hello"로 할당됨

// 아직 sayHi는 if 블록 안에 있어서 전역 렉시컬 환경에 선언되지 않음.

// 전역 렉시컬 환경 (실행 후):
// phrase: "Hello"

// 2. if 블록 실행 (if 블록 렉시컬 환경 생성)
// if (true) 조건이 실행되면 자바스크립트 엔진은 새로운 렉시컬 환경을 생성합니다. 
// 이 렉시컬 환경은 if 블록 안에 있는 변수와 함수들을 저장합니다.

// if 블록의 렉시컬 환경:
// user: undefined (초기화 단계)
// sayHi: undefined (초기화 단계)
// 이후 user 변수에 "John"이 할당되고, sayHi 함수가 선언됩니다.

// if 블록의 렉시컬 환경 (완료 후):
// user: "John"
// sayHi: function (function body)
// 함수의 [[Environment]] 프로퍼티 생성
// sayHi 함수가 선언될 때, sayHi 함수는 자신이 선언된 시점의 외부 렉시컬 환경을 기억합니다. 
// 이 외부 렉시컬 환경은 if 블록 렉시컬 환경이 되며, 이는 전역 렉시컬 환경을 참조할 수 있습니다.

// sayHi 함수의 [[Environment]]는 if 블록 렉시컬 환경을 가리킵니다.

// 3. sayHi() 함수 호출 시 (오류 발생)
// if 블록이 끝난 후, sayHi() 함수를 호출하려고 하지만 이 코드는 오류를 발생시킵니다. 왜냐하면 sayHi 함수는 if 블록 안에서 선언되었기 때문에, if 블록의 렉시컬 환경이 사라지면서 전역에서 접근할 수 없게 됩니다.

// if 블록 내부에서 선언된 변수와 함수는 블록 스코프에 속하므로, 블록 바깥에서는 접근할 수 없습니다. 따라서 sayHi()를 호출하려고 하면 ReferenceError: sayHi is not defined라는 오류가 발생합니다.

// 06. 클로저를 이용하여 합 구하기
// 내 정답코드
// sum(1)(2) = 3
// sum(5)(-1) = 4

// 정답코드
function sum(a) {

  return function(b) {
    return a + b; // 'a'는 외부 렉시컬 환경에서 가져옵니다.
  };

}
// 01. 전역 렉시컬 환경
//   sum : function
//   (a, b는 전역 렉시컬 환경에 존재하지 않음)

//   그리고 sum의 [[Environment]]에 함수 생성 정보 저장

//   내부 함수 function(b) 선언 : [[Environment]]에 함수 생성 정보 저장, 
//   이후 lexical environment of sum참조

// 02. alert( (sum(1) ) : sum함수 실행, lexical environment of sum 생성
//  a : 1
//  [[Environment]] -> (전역 렉시컬 환경 참조)


// 03. sum(1)(2) 호출, lexical environment of sum(a)(b) 생성 (두번째 함수 생성)
//   b : 2
//   [[Environment]] -> lexical environment of sum 참조 (a = 1)
  

// 07. 변수가 보일까요?
let x = 1;

function func() {
  console.log(x); // ?

  let x = 2;
}

func();

// 내 로직
// 01. 전역 렉시컬 환경
//   x : 1
//   func : function

// 02. func()가 선언, [[Environment]] -> 전역 렉시컬 환경 참조

// 03. lexical environment of func
//   x : 2

// 2가 출력된다

// 정답 코드
// 03. lexical environment of func
//   에서 x : 2로 초기화되기 전에 console.log(x)이므로, 에러가 발생한다
// 데드존 (초기화가 일어나기 전 변수를 일시적으로 사용하지 못하는 구간(코드 블록의 시작부터 let이 나올 때까지))

