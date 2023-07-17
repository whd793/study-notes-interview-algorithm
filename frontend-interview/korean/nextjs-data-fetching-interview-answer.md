# Next.js 데이터 페칭 인터뷰 답변

Next.js에서의 데이터 페칭 방식은 App Router와 Pages Router에서 상당히 다른 접근법을 취합니다. 두 시스템 모두 서버 사이드 렌더링과 정적 생성을 지원하지만, 구현 방법과 API가 다릅니다.

App Router에서는 React 서버 컴포넌트의 도입으로 데이터 페칭이 더 직관적이고 유연해졌습니다. 서버 컴포넌트에서는 async/await를 직접 사용하여 데이터를 가져올 수 있습니다. Next.js는 fetch API를 확장하여 캐싱과 재검증 옵션을 제공합니다.

```jsx
// App Router에서의 데이터 페칭 (서버 컴포넌트)
async function UserProfile({ userId }) {
  // 기본적으로 결과는 캐싱됨
  const userData = await fetch(`https://api.example.com/users/${userId}`);
  const user = await userData.json();
  
  // 데이터를 5분마다 재검증
  const posts = await fetch(`https://api.example.com/posts?userId=${userId}`, { 
    next: { revalidate: 300 } 
  }).then(res => res.json());
  
  // 캐싱하지 않고 매 요청마다 새로운 데이터 가져오기
  const notifications = await fetch(`https://api.example.com/notifications?userId=${userId}`, { 
    cache: 'no-store' 
  }).then(res => res.json());
  
  return (
    <div>
      <h1>{user.name}</h1>
      {/* 나머지 컴포넌트 렌더링 */}
    </div>
  );
}
```

서버 컴포넌트에서는 API 키나 직접적인 데이터베이스 접근과 같은 백엔드 로직도 안전하게 구현할 수 있습니다. Next.js는 자동으로 동일한 요청을 중복 제거하여 성능을 최적화합니다.

Pages Router에서는 getServerSideProps, getStaticProps, getStaticPaths와 같은 특수 함수를 사용합니다. 이 함수들은 페이지 컴포넌트와 함께 export되며, 빌드 시점 또는 요청 시점에 데이터를 가져옵니다.

```jsx
// Pages Router에서의 데이터 페칭
export default function UserProfile({ user, posts }) {
  return (
    <div>
      <h1>{user.name}</h1>
      {/* 나머지 컴포넌트 렌더링 */}
    </div>
  );
}

// 서버 사이드 렌더링 (SSR)
export async function getServerSideProps({ params }) {
  const { userId } = params;
  
  const userData = await fetch(`https://api.example.com/users/${userId}`);
  const user = await userData.json();
  
  const postsData = await fetch(`https://api.example.com/posts?userId=${userId}`);
  const posts = await postsData.json();
  
  return { props: { user, posts } };
}
```

클라이언트 사이드 데이터 페칭도 두 시스템에서 다르게 접근합니다. App Router에서는 'use client' 지시어를 사용하여 클라이언트 컴포넌트를 만들고, React의 useEffect나 SWR, React Query와 같은 라이브러리를 사용합니다. Pages Router에서는 클라이언트 사이드 페칭을 위한 특별한 API는 없으며, 마찬가지로 useEffect나 외부 라이브러리를 활용합니다.

최신 Next.js 애플리케이션에서는 다음과 같은 데이터 페칭 패턴이 권장됩니다. 가능한 한 서버 컴포넌트에서 데이터를 가져와 클라이언트로 전송되는 JavaScript를 줄입니다. 적절한 캐싱 전략을 선택하여 성능과 데이터 신선도 사이의 균형을 맞춥니다. React Suspense를 활용하여 데이터 로딩 상태를 처리하고, 사용자 경험을 향상시킵니다.

또한 Next.js 14에서는 Server Actions이 정식 출시되어, 폼 제출과 같은 변형(mutation) 작업을 간소화할 수 있게 되었습니다. 이를 통해 클라이언트에서 서버 함수를 직접 호출할 수 있어, API 라우트 없이도 데이터 수정이 가능해졌습니다.