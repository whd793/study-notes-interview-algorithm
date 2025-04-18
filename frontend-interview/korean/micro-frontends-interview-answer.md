# 마이크로 프론트엔드 인터뷰 답변

마이크로 프론트엔드는 마이크로서비스 아키텍처의 개념을 프론트엔드 영역으로 확장한 접근 방식입니다. 이는 큰 모놀리식 프론트엔드 애플리케이션을 더 작고 독립적으로 개발, 테스트, 배포할 수 있는 단위로 분해하는 것을 의미합니다.

이 아키텍처의 주요 장점은 다음과 같습니다. 첫째, 독립적인 개발과 배포가 가능해 여러 팀이 각자의 영역에 집중할 수 있습니다. 둘째, 각 마이크로 프론트엔드는 자체 기술 스택을 선택할 수 있어 점진적인 기술 마이그레이션이 가능합니다. 셋째, 코드베이스가 작고 집중되어 있어 유지보수가 용이합니다.

마이크로 프론트엔드를 구현하는 여러 방식이 있습니다. 클라이언트 측 통합 방식에서는 Single-SPA와 같은 프레임워크나 웹 컴포넌트를 사용하여 런타임에 각 마이크로 프론트엔드를 로드합니다. 서버 측 통합은 서버에서 마이크로 프론트엔드를 조합하여 전체 페이지를 구성하는 방식으로, 서버 사이드 인클루드(SSI)나 Edge Side Includes(ESI)를 사용할 수 있습니다. 빌드 타임 통합은 각 마이크로 프론트엔드를 배포 과정에서 하나의 애플리케이션으로 결합하는 방식입니다.

마이크로 프론트엔드를 설계할 때 고려해야 할 주요 과제로는 첫째, 일관된 사용자 경험을 유지하기 위한 디자인 시스템과 공유 컴포넌트 라이브러리의 구축이 필요합니다. 둘째, 마이크로 프론트엔드 간 통신 방식(이벤트 버스, 커스텀 이벤트, 공유 상태 등)을 결정해야 합니다. 셋째, 공통 종속성을 관리하여 중복 코드를 최소화하고 번들 크기를 최적화해야 합니다.

테스팅 전략으로는 각 마이크로 프론트엔드의 독립적인 테스트와 함께, 통합 환경에서의 엔드투엔드 테스트가 필요합니다. 배포 파이프라인은 개별 마이크로 프론트엔드의 독립적인 배포와 전체 애플리케이션의 일관성을 모두 지원해야 합니다.

마이크로 프론트엔드는 대규모 애플리케이션과 대규모 개발 조직에서 가장 큰 이점을 제공하지만, 작은 팀이나 간단한 애플리케이션에서는 추가적인 복잡성으로 인해 효율성이 떨어질 수 있습니다.