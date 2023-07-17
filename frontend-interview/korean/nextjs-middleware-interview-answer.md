# Next.js 미들웨어 인터뷰 답변

Next.js 미들웨어는 페이지나 API 라우트가 렌더링되기 전에 요청을 가로채고 수정할 수 있는 기능입니다. 이는 인증, 리디렉션, 지리적 위치 기반 사용자 정의, 국제화(i18n), 로깅 등 다양한 용도로 활용할 수 있습니다.

미들웨어는 프로젝트 루트 디렉토리에 middleware.js(또는 .ts) 파일을 생성하여 구현합니다. 모든 요청은 이 미들웨어를 통과하게 되며, 요청을 처리하거나 응답을 수정할 수 있습니다.

```javascript
// middleware.js
export function middleware(request) {
  const currentUser = request.cookies.get('currentUser');
  const { pathname } = request.nextUrl;
  
  // 인증이 필요한 페이지에 로그인되지 않은 사용자가 접근하는 경우 리디렉션
  if (pathname.startsWith('/dashboard') && !currentUser) {
    return Response.redirect(new URL('/login', request.url));
  }
  
  // 요청 헤더 수정 예시
  if (pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-custom-header', 'custom-value');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
  }
  
  // 일반적인 경우 요청을 그대로 진행
  return NextResponse.next();
}

// 미들웨어가 실행될 경로 지정 (선택 사항)
export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};
```

미들웨어의 주요 사용 사례로는 다음과 같은 것들이 있습니다. 인증 및 권한 검사를 통해 보호된 라우트에 접근하기 전에 사용자 인증 상태를 확인할 수 있습니다. URL 변환이나 리디렉션을 통해 레거시 URL을 새 URL로 리디렉트하거나, 지역별로 다른 콘텐츠를 제공할 수 있습니다. 또한 요청 및 응답 헤더를 수정하여 보안 헤더 추가나 쿠키 설정 등을 수행할 수 있습니다.

미들웨어는 Edge 런타임에서 실행되므로 몇 가지 제한사항이 있습니다. Node.js 특화 API나 일부 npm 패키지를 사용할 수 없으며, 파일 시스템에 직접 접근할 수 없습니다. 또한 복잡한 계산이나 긴 실행 시간이 필요한 작업은 미들웨어에 적합하지 않을 수 있습니다.

미들웨어를 효과적으로 사용하기 위한 몇 가지 모범 사례가 있습니다. matcher 구성을 사용하여 미들웨어가 실행될 경로를 제한함으로써 불필요한 처리를 줄여야 합니다. 미들웨어는 가능한 간결하고 효율적으로 유지하여 지연 시간을 최소화해야 합니다. 또한 복잡한 로직은 미들웨어보다는 API 라우트나 서버 컴포넌트로 옮기는 것이 좋습니다.

개발 시 주의할 점으로, 미들웨어는 개발 서버에서 자동으로 다시 로드되지 않을 수 있으므로 변경 후 서버를 재시작해야 할 수도 있습니다. 또한 미들웨어에서의 console.log 출력은 서버 콘솔에 표시되므로 디버깅 시 참고해야 합니다.