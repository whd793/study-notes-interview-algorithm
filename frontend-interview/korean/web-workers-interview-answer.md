# 웹 워커 인터뷰 답변

웹 워커(Web Workers)는 브라우저에서 백그라운드 스레드에서 스크립트를 실행할 수 있게 해주는 API입니다. 자바스크립트는 기본적으로 단일 스레드로 동작하기 때문에, 계산 집약적인 작업이 메인 스레드를 차단하여 UI 응답성에 문제를 일으킬 수 있습니다. 웹 워커는 이러한 문제를 해결하여 사용자 경험을 개선합니다.

웹 워커의 주요 유형으로는 전용 워커(Dedicated Workers), 공유 워커(Shared Workers), 서비스 워커(Service Workers)가 있습니다. 전용 워커는 생성한 스크립트에서만 접근할 수 있는 가장 기본적인 형태입니다. 공유 워커는 여러 스크립트나 창에서 공유할 수 있으며, 서비스 워커는 오프라인 기능, 푸시 알림 등을 위한 특수한 형태의 워커입니다.

웹 워커 사용의 주요 이점은 다음과 같습니다. 먼저 메인 스레드 차단 방지로, 계산 집약적 작업을 백그라운드에서 처리하여 UI 응답성을 유지합니다. 또한 병렬 처리가 가능해져 멀티코어 프로세서를 더 효율적으로 활용할 수 있습니다. 복잡한 데이터 처리나 계산을 별도 스레드로 옮겨 애플리케이션 아키텍처를 개선할 수도 있습니다.

```javascript
// 메인 스크립트
const worker = new Worker('worker.js');

worker.onmessage = function(event) {
  console.log('워커로부터 받은 결과:', event.data);
};

worker.postMessage({data: [1, 2, 3, 4], operation: 'sum'});

// worker.js
self.onmessage = function(event) {
  const { data, operation } = event.data;
  
  if (operation === 'sum') {
    let result = data.reduce((sum, num) => sum + num, 0);
    self.postMessage(result);
  }
};
```

워커에는 몇 가지 제한사항이 있습니다. DOM에 직접 접근할 수 없으며, window 객체의 일부 기능만 사용 가능합니다. 메인 스크립트와 워커 간 데이터는 복사되어 전송되므로, 대용량 데이터 전송 시 성능 문제가 발생할 수 있습니다. 이 문제는 Transferable Objects나 SharedArrayBuffer를 사용하여 해결할 수 있습니다.

실제 애플리케이션에서는 이미지 처리, 데이터 파싱 및 가공, 복잡한 계산, 암호화 작업 등에 웹 워커를 활용할 수 있습니다. 워커는 브라우저 지원이 광범위하지만, 폴리필이나 대체 방안을 고려하는 것이 좋습니다.