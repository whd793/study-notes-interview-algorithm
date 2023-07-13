# Next.js API 라우트 인터뷰 답변

Next.js API 라우트는 프론트엔드 프로젝트 내에서 서버리스 함수를 쉽게 구축할 수 있게 해주는 기능입니다. 이를 통해 별도의 백엔드 서버 없이도 API 엔드포인트를 생성하고 관리할 수 있어, 풀스택 애플리케이션 개발이 간소화됩니다.

API 라우트는 Pages Router에서는 pages/api 디렉토리에, App Router에서는 app/api 디렉토리에 파일을 생성하여 구현합니다. 각 파일은 하나의 API 엔드포인트가 되며, 파일 시스템 기반 라우팅을 따릅니다. 예를 들어, pages/api/users.js 파일은 /api/users 경로로 접근할 수 있습니다.

```javascript
// pages/api/users.js (Pages Router)
export default function handler(req, res) {
  if (req.method === 'GET') {
    // 사용자 목록 반환
    res.status(200).json({ users: ['John', 'Jane', 'Bob'] });
  } else if (req.method === 'POST') {
    // 새 사용자 생성 로직
    const { name } = req.body;
    // 데이터베이스 저장 로직...
    res.status(201).json({ message: `User ${name} created` });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
```

```javascript
// app/api/users/route.js (App Router)
export async function GET() {
  return Response.json({ users: ['John', 'Jane', 'Bob'] });
}

export async function POST(request) {
  const { name } = await request.json();
  // 데이터베이스 저장 로직...
  return Response.json({ message: `User ${name} created` }, { status: 201 });
}
```

API 라우트의 주요 장점은 다음과 같습니다. 먼저, 프론트엔드와 백엔드 코드를 같은 저장소에서 관리할 수 있어 개발 워크플로우가 단순해집니다. 또한 서버리스 함수로 자동 배포되므로 별도의 서버 관리가 필요 없습니다. 클라이언트에 노출하고 싶지 않은 민감한 작업(API 키 사용, 데이터베이스 쿼리 등)을 안전하게 처리할 수 있으며, 같은 도메인에서 작동하므로 CORS 설정이 필요 없습니다.

API 라우트 사용 시 고려할 몇 가지 모범 사례가 있습니다. 요청 메서드(GET, POST 등)에 따라 로직을 구분하고, 적절한 HTTP 상태 코드와 응답 형식을 사용해야 합니다. 오류 처리를 철저히 하여 클라이언트에 의미 있는 오류 메시지를 제공하는 것이 중요합니다. 또한 미들웨어를 사용하여 인증, 로깅, 요청 검증 등의 공통 기능을 구현할 수 있습니다.

App Router의 서버 컴포넌트와 함께 사용할 때는 API 라우트의 역할이 다소 변화합니다. 서버 컴포넌트에서 직접 데이터베이스나 외부 API에 접근할 수 있기 때문에, API 라우트는 주로 사용자 입력을 처리하거나(폼 제출 등), 상태를 변경하는 작업(데이터 생성, 업데이트, 삭제)에 집중하게 됩니다.

많은 경우, 데이터베이스 액세스를 위해 Prisma나 Mongoose와 같은 ORM을 API 라우트와 함께 사용하여 안전하고 효율적인 데이터 작업을 구현합니다. 또한 Next.js의 앱 배포 환경에 따라 API 라우트의 특성이 달라질 수 있으므로, 배포 환경(Vercel, Netlify, 자체 서버 등)을 고려한 설계가 필요합니다.