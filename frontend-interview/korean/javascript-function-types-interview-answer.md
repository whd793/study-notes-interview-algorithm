# 자바스크립트 함수 타입 인터뷰 답변

자바스크립트에는 다양한 함수 타입과 선언 방식이 있으며, 각각 다른 특성과 활용 사례를 가지고 있습니다. 가장 기본적인 것은 함수 선언(Function Declaration)으로, 함수 명을 지정하고 호이스팅의 영향을 받아 선언 전에도 호출할 수 있습니다.

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

함수 표현식(Function Expression)은 변수에 할당되는 함수로, 호이스팅의 영향을 받지 않아 선언 이후에만 사용 가능합니다. 익명 함수를 사용하거나 함수명을 지정할 수 있는데, 함수명이 있어도 외부에서는 변수명으로만 호출 가능합니다.

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

화살표 함수(Arrow Function)는 ES6에서 도입된 간결한 문법으로, 특히 짧은 함수나 콜백에 적합합니다. 화살표 함수는 렉시컬 this를 가지므로 상위 스코프의 this를 유지합니다. 이는 객체 메서드나 이벤트 핸들러에서 this 바인딩 문제를 해결하는 데 유용합니다.

```javascript
const greet = name => `Hello, ${name}!`;
```

생성자 함수(Constructor Function)는 new 키워드와 함께 사용되어 객체 인스턴스를 생성합니다. ES6 클래스는 내부적으로 생성자 함수를 사용하는 문법적 설탕입니다.

```javascript
function Person(name) {
  this.name = name;
}

const john = new Person('John');
```

즉시 실행 함수 표현식(IIFE)은 정의되자마자 실행되는 함수로, 변수 스코프를 제한하고 전역 네임스페이스 오염을 방지하는 데 유용합니다.

```javascript
(function() {
  const privateVar = 'I am private';
  // 코드 실행
})();
```

고차 함수(Higher-Order Function)는 함수를 인자로 받거나 함수를 반환하는 함수입니다. map, filter, reduce와 같은 배열 메서드나 함수형 프로그래밍에서 자주 사용됩니다.

프로젝트에서는 상황에 맞게 적절한 함수 타입을 선택해야 합니다. 화살표 함수는 간결성과 this 바인딩이 필요할 때, 일반 함수는 자체 this나 arguments 객체가 필요할 때 사용합니다.