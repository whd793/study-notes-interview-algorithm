# Next.js 인증 구현 인터뷰 답변

Next.js에서 인증을 구현하는 방법은 다양하며, 프로젝트의 요구사항과 구조에 따라 적합한 접근법이 달라집니다. 가장 널리 사용되는 방법들과 그 장단점을 살펴보겠습니다.

Next-Auth(NextAuth.js)는 Next.js를 위한 완전한 인증 솔루션으로, 소셜 로그인(Google, Facebook, GitHub 등), 이메일/비밀번호 인증, JWT, 세션 관리 등을 쉽게 구현할 수 있습니다. 특히 소셜 로그인 구현이 간단하고, Pages Router와 App Router 모두 지원합니다.

```jsx
// App Router에서의 Next-Auth 설정 예시
// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    CredentialsProvider({
      // 커스텀 로그인 구현
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 데이터베이스 확인 로직
        // 성공 시 사용자 객체 반환, 실패 시 null 반환
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      // 세션에 추가 정보 포함
      session.user.id = token.sub;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
```

JWT(JSON Web Tokens)를 직접 구현하는 방법도 있습니다. 이 접근법은 클라이언트와 서버 간에 상태를 공유하지 않는 무상태(stateless) 인증을 제공합니다. JWT는 쿠키나 localStorage에 저장될 수 있으며, API 요청 시 Authorization 헤더로 전송됩니다.

```jsx
// JWT 생성 예시 (API 라우트에서)
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { username, password } = await request.json();
  
  // 사용자 인증 로직
  // ...
  
  // 인증 성공 시 JWT 생성
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  return Response.json({ token });
}

// JWT 검증 미들웨어
export function middleware(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // 검증된 사용자 정보 추가
    return NextResponse.next();
  } catch (error) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }
}
```

세션 기반 인증도 Next.js에서 구현할 수 있습니다. 이 방식은 서버에 세션 정보를 저장하고, 클라이언트에는 세션 ID를 쿠키로 제공합니다. 이는 전통적인 방식으로, 서버 측 상태를 유지합니다.

보호된 라우트 구현은 인증 상태에 따라 페이지 접근을 제어하는 것입니다. App Router에서는 미들웨어를 사용하거나, 서버 컴포넌트에서 리디렉션을 처리할 수 있습니다.

```jsx
// 미들웨어를 사용한 보호된 라우트 (middleware.js)
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register');
  const token = request.cookies.get('token')?.value;
  
  if (isAuthPage && token) {
    // 이미 로그인한 사용자가 인증 페이지에 접근하면 대시보드로 리디렉션
    return Response.redirect(new URL('/dashboard', request.url));
  }
  
  if (!isAuthPage && !token) {
    // 인증되지 않은 사용자가 보호된 페이지에 접근하면 로그인 페이지로 리디렉션
    return Response.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register']
};
```

인증 구현 시 고려해야 할 주요 사항으로는 보안(HTTPS 사용, CSRF 보호), 토큰 저장 방식(HttpOnly 쿠키 권장), 인증 상태 관리(전역 상태, Context API 등), 그리고 에러 처리가 있습니다. 또한 배포 환경에 따라 쿠키 설정이 달라질 수 있으므로 주의해야 합니다.