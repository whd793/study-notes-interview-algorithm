# CSS Grid 인터뷰 답변

CSS Grid는 2차원 레이아웃 시스템으로, 행과 열을 동시에 제어할 수 있어 복잡한 레이아웃 구현에 매우 적합합니다. Flexbox가 한 방향으로만 요소를 배치하는 반면, Grid는 두 방향 모두에서 정밀한 배치가 가능합니다.

주요 속성으로는 grid-template-columns와 grid-template-rows로 열과 행의 크기를 정의하고, grid-gap으로 간격을 설정하며, grid-template-areas로 영역을 이름으로 정의할 수 있습니다. 또한 fr 단위를 사용하여 사용 가능한 공간을 비율로 분배할 수 있습니다.

아이템 배치는 grid-column과 grid-row 속성을 사용하여 명시적으로 지정할 수 있으며, 시작 라인과 끝 라인 또는 span 키워드로 몇 개의 셀을 차지할지 설정할 수 있습니다. 자동 배치 알고리즘을 활용하면 명시적 위치 지정 없이도 아이템을 효율적으로 배치할 수 있습니다.

반응형 디자인에서는 minmax() 함수와 auto-fill, auto-fit 키워드를 조합하여 화면 크기에 따라 자동으로 열 수가 조정되는 그리드를 만들 수 있습니다. 예를 들어, grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))은 최소 250px 너비를 가지며 가능한 많은 열을 생성합니다.

실무에서는 페이지 전체 레이아웃, 카드 그리드, 대시보드 인터페이스 등에 Grid를 활용하고, 개별 컴포넌트 내부에는 Flexbox를 사용하는 접근이 효과적입니다.