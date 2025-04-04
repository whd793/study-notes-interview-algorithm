# 데이터 파티셔닝 및 샤딩

데이터 파티셔닝(또는 샤딩)은 대규모 데이터베이스를 파티션 또는 샤드라고 불리는 더 작고 관리하기 쉬운 부분으로 분할하는 데이터베이스 아키텍처 기술입니다. 각 샤드는 동일한 스키마를 나타내면서도 데이터의 일부만 보유하는 별도의 데이터베이스 인스턴스입니다. 이 접근 방식을 통해 데이터베이스는 여러 서버에 데이터를 분산시켜 수평적으로 확장할 수 있습니다.

일반적인 파티셔닝 전략으로는 다음과 같은 것들이 있습니다: 파티션 키를 기반으로 다른 행을 다른 샤드에 저장하는 수평적(행 기반) 샤딩; 다른 열이나 기능을 별도의 데이터베이스로 분할하는 수직적 파티셔닝; 그리고 어떤 데이터가 어떤 샤드에 저장되는지 추적하기 위한 조회 서비스를 유지하는 디렉토리 기반 샤딩.

파티션 키 선택은 중요하며 데이터 접근 패턴을 기반으로 해야 합니다. 이상적인 파티션 키는 데이터를 균등하게 분산시키고, 샤드 간 작업을 최소화하며, 일반적인 쿼리 패턴과 일치합니다. 옵션으로는 해시 기반 파티셔닝(키의 해시 사용), 범위 기반 파티셔닝(값 범위별), 지리적 파티셔닝(사용자 위치별)이 있습니다.

과제로는 샤드 간 조인 처리, 참조 무결성 유지, 샤드가 성장함에 따른 데이터 재조정, 분산 트랜잭션 관리 등이 있습니다. 실용적 고려사항으로는 일관된 라우팅 계층 구현, 모든 샤드에서 동시에 스키마 변경 처리, 샤드 건강 상태 및 분산 메트릭에 대한 적절한 모니터링 설정 등이 있습니다.

대부분의 현대적인 데이터베이스 시스템은 MongoDB(자동 샤딩), Amazon DynamoDB(파티션 키 포함), Google Cloud Spanner(인터리브 테이블 포함), MySQL을 위한 Vitess와 같은 전통적인 RDBMS를 위한 샤딩 미들웨어 등 내장된 샤딩 기능을 제공합니다.