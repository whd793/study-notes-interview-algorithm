# 서버 사이드 렌더링(SSR)을 어떻게 구현하셨나요?

SEO가 중요한 콘텐츠 기반 웹사이트에서 클라이언트 사이드 렌더링의 한계를 극복하기 위해 서버 사이드 렌더링(SSR)을 구현한 경험이 있습니다.

초기 상황은 Create React App(CRA)으로 구축된 클라이언트 사이드 렌더링(CSR) 애플리케이션이었습니다. 이 애플리케이션은 사용자 경험은 좋았지만, 검색 엔진 최적화가 부족하고 초기 로딩 성능이 좋지 않았으며, 소셜 미디어 공유 시 메타데이터가 제대로 표시되지 않는 문제가 있었습니다.

먼저 요구사항과 목표를 명확히 정의했습니다. SEO 개선, 초기 페이지 로드 시간 단축, 소셜 미디어 공유 최적화, 그리고 기존 기능을 모두 유지하는 것이 주요 목표였습니다. 또한 개발자 경험도 고려하여 기존 React 코드베이스를 최대한 재사용하고자 했습니다.

기술 스택 선택을 위해 여러 대안을 평가했습니다. Next.js, Gatsby, 그리고 직접 구현하는 방법을 비교 분석했습니다. 최종적으로 서버 렌더링, 정적 생성, API 라우트 등 필요한 모든 기능을 제공하고 활발한 커뮤니티 지원이 있는 Next.js를 선택했습니다.

마이그레이션 전략을 수립했습니다. 점진적 접근 방식을 채택하여, 초기에는 중요한 공개 페이지(홈, 제품 리스트, 제품 상세 등)만 SSR로 전환하고, 나머지 페이지는 후속 단계에서 마이그레이션하기로 계획했습니다.

구현을 위해 다음과 같은 작업을 수행했습니다:

1. **프로젝트 구조 재구성**: CRA에서 Next.js로 전환하면서 파일 구조를 재구성했습니다. 페이지 기반 라우팅에 맞게 `pages` 디렉토리를 생성하고, 공통 컴포넌트는 `components` 디렉토리로 이동했습니다.

2. **데이터 페칭 로직 수정**: 클라이언트 측 데이터 페칭 로직을 Next.js의 `getServerSideProps`와 `getStaticProps`로 마이그레이션했습니다. 페이지 특성에 따라 적절한 데이터 페칭 방법을 선택했습니다.

   ```jsx
   // 서버 사이드 렌더링 예시 (동적 데이터)
   export async function getServerSideProps(context) {
     const { id } = context.params;
     try {
       const product = await fetchProductById(id);
       return {
         props: { product }
       };
     } catch (error) {
       return {
         notFound: true
       };
     }
   }
   
   // 정적 생성 예시 (정적 데이터)
   export async function getStaticProps() {
     const categories = await fetchCategories();
     return {
       props: { categories },
       revalidate: 3600 // ISR: 1시간마다 재생성
     };
   }
   
   export async function getStaticPaths() {
     const products = await fetchFeaturedProducts();
     const paths = products.map(product => ({
       params: { id: product.id.toString() }
     }));
     
     return {
       paths,
       fallback: 'blocking' // 생성되지 않은 경로는 SSR로 처리
     };
   }
   ```

3. **메타데이터 최적화**: Next.js의 `Head` 컴포넌트를 사용하여 각 페이지에 동적 메타데이터를 추가했습니다. 또한 구조화된 데이터(JSON-LD)를 구현하여 검색 엔진 최적화를 강화했습니다.

4. **스타일링 접근 방식 조정**: CSS-in-JS 라이브러리(styled-components)를 서버 환경에서 작동하도록 구성했습니다. Next.js의 `_document.js`를 커스터마이징하여 서버에서 생성된 스타일이 클라이언트로 전달되도록 했습니다.

5. **환경 설정 분리**: 클라이언트와 서버 환경에 대한 환경 변수를 적절히 분리하고, Next.js의 환경 변수 시스템을 활용하여 보안을 강화했습니다.

6. **API 라우트 구현**: 클라이언트에서 직접 접근하면 안 되는 API 호출을 위해 Next.js API 라우트를 구현했습니다. 이를 통해 인증 토큰과 같은 민감한 정보를 서버에서 안전하게 관리할 수 있었습니다.

7. **성능 최적화**: 이미지 최적화를 위해 Next.js의 Image 컴포넌트를 활용했고, 코드 스플리팅, 번들 분석, 불필요한 의존성 제거 등을 통해 번들 크기를 최적화했습니다.

구현 과정에서 몇 가지 도전적인 문제를 해결했습니다. 클라이언트 전용 라이브러리(localStorage 접근 등)로 인한 서버/클라이언트 불일치 문제는 동적 임포트와 useEffect를 사용하여 해결했습니다. 또한 인증 상태를 서버와 클라이언트 간에 일관되게 유지하기 위해 쿠키 기반 인증 시스템을 구현했습니다.

SSR 도입 결과, 핵심 웹 바이탈 지표가 크게 개선되었습니다. LCP(Largest Contentful Paint)가 4.2초에서 1.8초로 감소했고, FID(First Input Delay)와 CLS(Cumulative Layout Shift) 값도 최적화되었습니다. 또한 검색 엔진에서의 가시성이 향상되어 유기적 트래픽이 45% 증가했고, 소셜 미디어 공유 시 풍부한 미리보기가 제공되어 클릭률이 개선되었습니다.