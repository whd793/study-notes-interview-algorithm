# 자바스크립트 메모리 누수 인터뷰 답변

자바스크립트에서 메모리 누수는 더 이상 필요하지 않은 객체가 가비지 컬렉터에 의해 제거되지 않고 메모리에 계속 남아있는 현상입니다. 브라우저 환경에서 이러한 누수가 지속되면 애플리케이션의 성능이 저하되고, 최악의 경우 브라우저 충돌로 이어질 수 있습니다.

가장 흔한 메모리 누수 원인으로는 먼저 의도치 않은 클로저가 있습니다. 클로저는 자신이 생성된 환경의 변수를 참조하는데, 이 참조가 불필요하게 오래 유지되면 메모리 누수가 발생합니다. 특히 이벤트 리스너를 제거하지 않고 컴포넌트를 제거하는 경우가 대표적입니다.

```javascript
function setupButton() {
  const largeData = new Array(10000000).fill('x');
  const button = document.getElementById('myButton');
  
  button.addEventListener('click', function() {
    // 이 클로저는 largeData를 참조하고 있음
    console.log('Button clicked', largeData.length);
  });
}
```

전역 변수나 전역 캐시도 주의해야 합니다. window 객체나 전역 객체에 데이터를 저장하면 페이지가 존재하는 동안 계속 메모리를 차지합니다. 특히 계속 증가하는 캐시나 콜렉션은 명시적인 크기 제한이 필요합니다.

순환 참조도 메모리 누수를 일으킬 수 있습니다. 특히 DOM 요소와 자바스크립트 객체 간의 순환 참조는 가비지 컬렉션을 방해합니다. 현대 브라우저는 이러한 상황을 대부분 처리할 수 있지만, 복잡한 참조 구조에서는 여전히 문제가 될 수 있습니다.

타이머 및 콜백 함수가 제대로 정리되지 않는 경우도 흔한 원인입니다. setTimeout이나 setInterval을 clearTimeout이나 clearInterval로 정리하지 않으면, 콜백 함수와 그 클로저가 메모리에 계속 남게 됩니다.

메모리 누수를 방지하기 위한 모범 사례로는 다음과 같은 것들이 있습니다. 컴포넌트 언마운트 시 이벤트 리스너를 제거하고, 클로저에서 큰 객체를 참조할 때 주의합니다. React의 useEffect cleanup 함수나 Vue의 beforeUnmount 훅을 활용하여 정리 로직을 구현합니다. 전역 상태는 필요한 최소한으로 유지하고, WeakMap과 WeakSet을 활용하여 약한 참조를 구현합니다.

메모리 누수를 디버깅하는 도구로는 Chrome DevTools의 Memory 패널이 있으며, 힙 스냅샷, 할당 타임라인, 메모리 사용량 모니터링 기능을 제공합니다.