# CSS Flexbox 인터뷰 답변

Flexbox는 한 방향으로 요소들을 효율적으로 배치하고 정렬하는 CSS 레이아웃 모델입니다. 주 축(main axis)과 교차 축(cross axis)을 기준으로 작동하며, 반응형 디자인에 매우 적합합니다.

주요 속성으로는 컨테이너에 적용하는 display: flex, 방향을 정하는 flex-direction, 주 축 정렬을 위한 justify-content, 교차 축 정렬을 위한 align-items 등이 있습니다. 아이템에 적용하는 속성으로는 flex-grow, flex-shrink, flex-basis가 있으며, 이를 축약한 flex 속성도 자주 사용합니다.

Flexbox는 내비게이션 바, 카드 레이아웃, 폼 요소 등 다양한 UI 컴포넌트에 활용하며, 특히 요소를 세로와 가로 중앙에 정렬하는 작업이 매우 간단해집니다. 이전에는 복잡한 방법으로 구현해야 했던 수직 중앙 정렬도 Flexbox를 사용하면 align-items: center와 justify-content: center만으로 쉽게 구현할 수 있습니다.

그러나 복잡한 그리드 레이아웃이나 2차원 배치가 필요한 경우에는 CSS Grid를 고려하는 것이 좋습니다. 보통 페이지 전체 레이아웃은 Grid로, 내부 컴포넌트는 Flexbox로 구현하는 접근 방식을 사용합니다.