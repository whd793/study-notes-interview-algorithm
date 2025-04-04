# Next.js의 SSR, SSG, ISR 인터뷰 답변

Next.js는 다양한 렌더링 전략을 제공하여 각 페이지나 컴포넌트에 가장 적합한 방식을 선택할 수 있습니다. 대표적인 세 가지 렌더링 전략은 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 증분 정적 재생성(ISR)입니다.

서버 사이드 렌더링(SSR)은 요청 시점에 서버에서 페이지를 렌더링하는 방식입니다. 각 요청마다 최신 데이터로 HTML을 생성하여 전달하므로, 항상 최신 콘텐츠를 제공할 수 있습니다. Pages Router에서는 getServerSideProps 함수를, App Router에서는 기본적으로 서버 컴포넌트를 사용하거나 `export const dynamic = 'force-dynamic'`을 지정하여 구현합니다. SSR은 사용자별 맞춤 콘텐츠, 실시간 데이터가 필요한 대시보드, 검색 결과 페이지 등에 적합합니다. 하지만 매 요청마다 서버에서 렌더링하므로 서버 부하가 높고 응답 시간이 길어질 수 있습니다.

정적 사이트 생성(SSG)은 빌드 시점에 모든 페이지를 미리 렌더링하여 HTML 파일로 생성하는 방식입니다. 이렇게 생성된 페이지는 CDN에 캐싱되어 매우 빠르게 제공될 수 있습니다. Pages Router에서는 getStaticProps와 getStaticPaths 함수를, App Router에서는 기본 동작이나 `export const dynamic = 'force-static'`을 사용하여 구현합니다. SSG는 블로그, 마케팅 페이지, 문서 사이트처럼 콘텐츠가 자주 변경되지 않는 경우에 이상적입니다. 단점으로는 콘텐츠가 변경될 때마다 전체 사이트를 다시 빌드해야 한다는 점이 있습니다.

증분 정적 재생성(ISR)은 SSG의 확장으로, 특정 시간 간격으로 페이지를 재생성하거나 필요에 따라 온디맨드로 재생성할 수 있습니다. 이를 통해 정적 생성의 성능 이점을 유지하면서도 최신 데이터를 제공할 수 있습니다. Pages Router에서는 getStaticProps에 revalidate 옵션을, App Router에서는 fetch 함수에 next: { revalidate: 시간(초) } 옵션을 추가하여 구현합니다. ISR은 콘텐츠가 정기적으로 업데이트되지만 실시간 데이터가 필요하지 않은 e-커머스 제품 페이지, 뉴스 기사, 블로그 등에 적합합니다.

이 세 가지 방식 외에도, Next.js 14부터는 부분적 프리렌더링(Partial Prerendering)이라는 새로운 기능을 실험적으로 제공하고 있습니다. 이는 페이지의 정적 부분은 빌드 시에 생성하고, 동적 부분만 요청 시에 렌더링하는 하이브리드 접근법입니다.

프로젝트에서는 페이지나 컴포넌트의 특성과 요구사항에 따라 다양한 렌더링 전략을 조합하여 사용하는 것이 일반적입니다. 이는 Next.js의 강력한 장점 중 하나입니다.