# CSS 애니메이션 vs JavaScript 애니메이션 인터뷰 답변

CSS 애니메이션과 JavaScript 애니메이션은 각각 고유한 장단점이 있어 상황에 맞게 적절히 선택해야 합니다. CSS 애니메이션은 주로 @keyframes 규칙과 transition 속성을 통해 구현되며, 간단하고 성능이 좋습니다. 브라우저는 CSS 애니메이션을 최적화할 수 있어 메인 스레드에 부담을 주지 않으며, transform과 opacity 속성을 사용하면 GPU 가속을 활용할 수 있습니다.

```css
.box {
  transition: transform 0.3s ease;
}
.box:hover {
  transform: scale(1.1);
}
```

CSS 애니메이션은 간단한 상태 변화나 반복 애니메이션에 적합하지만, 복잡한 상호작용, 동적 값에 기반한 애니메이션, 애니메이션 순서 제어가 필요한 경우에는 제한적입니다.

반면 JavaScript 애니메이션은 requestAnimationFrame API나 GSAP, anime.js와 같은 라이브러리를 통해 구현됩니다. JavaScript는 더 세밀한 제어와 복잡한 로직을 적용할 수 있어 유연성이 높습니다. 애니메이션 중에 값을 계산하거나, 애니메이션 순서를 제어하거나, 사용자 상호작용에 반응하는 애니메이션을 만들 수 있습니다.

```javascript
function animate(time) {
  element.style.transform = `translateX(${position}px)`;
  position += 5;
  if (position < 600) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);
```

그러나 JavaScript 애니메이션은 메인 스레드에서 실행되므로, 과도한 계산이나 레이아웃 재계산을 유발하면 성능이 저하될 수 있습니다.

선택 기준으로는 애니메이션의 복잡성, 성능 요구사항, 브라우저 지원, 그리고 개발 편의성을 고려합니다. 간단한 전환 효과나 기본 애니메이션은 CSS를 사용하고, 복잡한 상호작용이나 물리 기반 애니메이션은 JavaScript 라이브러리를 활용하는 것이 좋습니다.

최신 웹 애플리케이션에서는 두 접근법을 함께 사용하는 하이브리드 접근법이 일반적입니다. 예를 들어, CSS로 기본 애니메이션을 구현하고 JavaScript로 이를 제어하거나, Web Animations API를 사용하여 CSS 애니메이션의 선언적 문법과 JavaScript의 제어 기능을 결합할 수 있습니다.