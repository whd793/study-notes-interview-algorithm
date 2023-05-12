# 자바스크립트 Promise와 Async/Await 인터뷰 답변

Promise와 async/await는 자바스크립트에서 비동기 작업을 처리하는 두 가지 주요 패턴입니다. Promise는 비동기 작업의 최종 완료(또는 실패)와 결과값을 나타내는 객체로, 콜백 지옥 문제를 해결하고 더 구조화된 코드를 작성할 수 있게 해줍니다.

Promise는 pending(대기), fulfilled(이행), rejected(거부)의 세 가지 상태를 가지며, then(), catch(), finally() 메서드를 통해 체인 형태로 작업을 연결할 수 있습니다. 여러 Promise를 조합하는 방법으로는 Promise.all()(모든 Promise가 완료될 때까지 대기), Promise.race()(가장 빨리 완료되는 Promise 결과 반환), Promise.allSettled()(성공/실패 여부와 관계없이 모든 Promise가 처리될 때까지 대기) 등이 있습니다.

async/await는 Promise 기반으로 구축된 문법적 설탕(syntactic sugar)으로, 비동기 코드를 동기 코드처럼 보이게 작성할 수 있어 가독성이 크게 향상됩니다. async 함수는 항상 Promise를 반환하며, 내부에서 await 키워드를 사용해 Promise가 처리될 때까지 실행을 일시 중지할 수 있습니다.

error 처리 측면에서 Promise는 catch() 메서드를 사용하고, async/await는 일반적인 try/catch 블록을 사용합니다. 이는 error 처리 로직을 더 직관적으로 작성할 수 있게 해줍니다. 병렬 처리가 필요한 경우 async/await에서도 Promise.all()과 함께 사용하면 효과적입니다.

실제 프로젝트에서는 두 패턴을 상황에 맞게 혼합하여 사용합니다. 간단한 비동기 처리나 Promise 조합이 필요할 때는 Promise 자체를, 복잡한 비동기 로직이나 가독성이 중요한 경우에는 async/await를 선호합니다.