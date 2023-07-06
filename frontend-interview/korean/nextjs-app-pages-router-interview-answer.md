# Next.js App Router vs Pages Router 인터뷰 답변

Next.js는 최근 App Router라는 새로운 라우팅 시스템을 도입했는데, 기존의 Pages Router와 비교했을 때 여러 중요한 차이점이 있습니다. 두 시스템의 특징과 차이점을 이해하는 것은 Next.js 프로젝트를 설계하는 데 중요합니다.

App Router는 Next.js 13에서 도입된 새로운 라우팅 시스템으로, React의 최신 기능인 Server Components, Streaming, Suspense 등을 활용하며 app 디렉토리를 사용합니다. 가장 큰 특징은 기본적으로 서버 컴포넌트를 사용하므로 클라이언트로 보내는 JavaScript 양을 줄일 수 있다는 점입니다. 또한 중첩 라우팅과 레이아웃을 더 직관적으로 구현할 수 있으며, 파일 시스템 기반의 특수 파일(layout.js, page.js, loading.js, error.js 등)을 통해 복잡한 UI 패턴을 간단하게 구현할 수 있습니다.

반면, Pages Router는 기존의 방식으로 pages 디렉토리를 사용하며, 모든 컴포넌트는 기본적으로 클라이언트 컴포넌트입니다. getStaticProps, getServerSideProps와 같은 데이터 페칭 함수를 통해 서버 사이드 렌더링을 구현하며, _app.js와 _document.js를 통해 전역 레이아웃을 정의합니다.

데이터 페칭 방식도 크게 다릅니다. App Router에서는 컴포넌트 내에서 직접 async/await를 사용하여 데이터를 가져올 수 있으며, 서버 컴포넌트에서는 클라이언트에 JavaScript를 전송하지 않고도 데이터를 가져올 수 있습니다. Pages Router에서는 getStaticProps, getServerSideProps와 같은 특수 함수를 사용하여 페이지 수준에서만 데이터를 페칭합니다.

라우트 핸들링에서도 차이가 있습니다. App Router는 layout.js로 중첩 레이아웃을 쉽게 구현할 수 있고, 서버 중심 라우팅 모델을 사용합니다. Pages Router는 _app.js로 단일 공유 레이아웃을 정의하고, 클라이언트 중심 라우팅 모델을 사용합니다.

프로젝트 요구사항에 따라 적절한 라우터를 선택해야 합니다. 최신 React 기능을 활용하고 복잡한 레이아웃 구조가 필요한 새 프로젝트라면 App Router가 적합합니다. 기존 프로젝트나 특정 API 라우트 기능이 필요한 경우에는 Pages Router가 더 안정적인 선택일 수 있습니다. 두 시스템은 동일한 프로젝트에서 공존할 수 있으므로, 점진적인 마이그레이션도 가능합니다.