# OAuth 2.0 구현 설계

OAuth 2.0은 서드파티 애플리케이션이 자격 증명을 공유하지 않고도 서버에서 사용자 계정에 대한 제한된 액세스를 얻을 수 있게 하는 권한 부여 프레임워크입니다. 이는 리소스 소유자의 역할을 클라이언트와 분리하여 자원에 대한 안전한 위임 액세스를 허용하는 과제를 해결합니다.

OAuth 2.0의 네 가지 주요 역할은 리소스 소유자(사용자), 클라이언트(액세스를 요청하는 애플리케이션), 권한 부여 서버(액세스 토큰 발급), 리소스 서버(보호된 자원 호스팅)입니다. 핵심 권한 부여 유형에는 인가 코드(서버 측 애플리케이션용), 암시적(브라우저 기반 또는 모바일 앱용), 리소스 소유자 비밀번호 자격 증명(신뢰할 수 있는 애플리케이션용), 클라이언트 자격 증명(머신 투 머신 통신용)이 있습니다.

OAuth 2.0을 구현할 때 주요 아키텍처 결정에는 토큰 형식(JWT vs 불투명 토큰), 토큰 저장(데이터베이스 vs 자체 포함), 토큰 검증 및 해지 처리가 포함됩니다. 보안 고려 사항에는 공개 클라이언트를 위한 PKCE(Proof Key for Code Exchange) 구현, 리프레시 토큰이 있는 수명이 짧은 액세스 토큰 사용, 모든 통신에 TLS 적용, 화이트리스트에 대한 리디렉션 URI 검증 등이 포함되어야 합니다.

마이크로서비스 아키텍처의 경우, Keycloak, Auth0, AWS Cognito와 같은 중앙 집중식 권한 부여 서버가 인증을 관리하는 동안 개별 서비스는 토큰을 검증하고 세분화된 권한 부여를 구현합니다. API 게이트웨이는 종종 개별 서비스의 구현 복잡성을 줄이면서 토큰 검증을 처리합니다.

일반적인 과제로는 적절한 토큰 검증 구현, 토큰 범위 효과적 관리, 세션 상태 처리, 애플리케이션 간 로그아웃 기능 구현, 보안과 사용자 경험 간의 균형 유지 등이 있습니다. 올바르게 설계된 경우, OAuth 2.0은 현대적인 분산 애플리케이션에 적합한 확장성이 뛰어난 안전한 권한 부여 메커니즘을 제공합니다.