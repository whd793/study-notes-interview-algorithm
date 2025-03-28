# CSS 전처리기 인터뷰 답변

CSS 전처리기는 변수, 중첩, 믹스인, 함수와 같은 프로그래밍 기능을 CSS에 추가하여 스타일시트 작성을 더 효율적으로 만드는 도구입니다. 대표적인 CSS 전처리기로는 Sass, Less, Stylus 등이 있으며, 이 중 Sass는 가장 성숙하고 널리 사용되는 전처리기입니다.

전처리기의 주요 장점으로는 변수를 통한 일관된 값(색상, 간격 등) 관리, 중첩된 선택자를 통한 더 명확한 계층 구조, 믹스인을 통한 재사용 가능한 스타일 블록, 함수를 통한 동적 값 계산 등이 있습니다. 이러한 기능들은 대규모 프로젝트에서 CSS 코드를 더 유지보수하기 쉽게 만들어 줍니다.

프로젝트에서 Sass를 사용할 때는 보통 파일을 컴포넌트나 기능별로 분할하고, _partial.scss와 같은 부분 파일을 만들어 @import 또는 @use로 조합합니다. 또한 변수로 테마 색상, 타이포그래피, 간격 등을 정의하고, 믹스인으로 반복되는 스타일 패턴(미디어 쿼리, 플렉스박스 설정 등)을 추상화합니다.

최근에는 CSS 자체가 사용자 정의 속성(변수), calc() 함수 등을 통해 더 강력해져서 전처리기와 순수 CSS의 격차가 줄어들고 있습니다. 그러나 중첩, 믹스인, 조건문, 반복문과 같은 기능은 여전히 전처리기의 강점입니다.

전처리기를 사용할 때 주의할 점으로는 디버깅의 어려움(소스맵으로 일부 해결 가능), 과도한 중첩으로 인한 특이성 문제, 지나치게 복잡한 믹스인이나 함수로 인한 가독성 저하 등이 있습니다. 또한 빌드 프로세스가 필요하기 때문에 개발 환경 설정의 복잡성이 증가합니다.