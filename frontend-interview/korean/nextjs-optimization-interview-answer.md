# Next.js 최적화 기법 인터뷰 답변

Next.js 애플리케이션의 성능 최적화는 사용자 경험과 SEO에 직접적인 영향을 미칩니다. Next.js는 기본적으로 많은 최적화 기능을 제공하지만, 추가적인 기법을 적용하여 더 나은 성능을 얻을 수 있습니다.

이미지 최적화는 Next.js의 강점 중 하나입니다. 내장된 Image 컴포넌트는 자동으로 이미지 크기 조정, WebP와 AVIF 같은 현대적 포맷 변환, 지연 로딩을 제공합니다. 이를 통해 Core Web Vitals 중 LCP(Largest Contentful Paint)를 크게 개선할 수 있습니다.

```jsx
import Image from 'next/image';

function ProductCard({ product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        placeholder="blur" // 로딩 중 블러 효과
        blurDataURL={product.blurDataUrl} // 저해상도 placeholder
        priority={product.featured} // 중요 이미지의 경우 우선 로딩
      />
    </div>
  );
}
```

라우트 최적화를 위해 Next.js는 자동 코드 분할을 제공하지만, 추가적으로 dynamic import를 사용하여 필요할 때만 컴포넌트를 로드할 수 있습니다. 이는 특히 큰 라이브러리나 초기 로드에 필요하지 않은 컴포넌트에 유용합니다.

```jsx
import dynamic from 'next/dynamic';

// 필요할 때만 로드되는 무거운 컴포넌트
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false // 클라이언트 사이드에서만 렌더링이 필요한 경우
});
```

스크립트 최적화는 next/script 컴포넌트를 통해 가능합니다. 이는 서드파티 스크립트의 로딩 우선순위를 제어하여 핵심 기능에 영향을 미치지 않도록 합니다.

```jsx
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="afterInteractive" // 페이지 인터랙티브 후 로드
  onLoad={() => console.log('Analytics loaded')}
/>
```

폰트 최적화는 next/font 모듈을 통해 이루어집니다. 이는 폰트 파일을 빌드 시점에 다운로드하여 자체 호스팅하고, 레이아웃 시프트를 방지합니다.

```jsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return (
    <html lang="ko" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

데이터 페칭 최적화를 위해 적절한 캐싱 전략을 사용해야 합니다. 정적 데이터는 빌드 타임이나 ISR을 통해 캐싱하고, 동적 데이터는 필요한 경우에만 서버 사이드 렌더링을 사용합니다.

App Router의 경우, 적절한 정적/동적 렌더링 설정과 네이티브 fetch 캐싱을 활용하는 것이 중요합니다.

```jsx
// 정적 데이터 (빌드 시 캐싱)
const staticData = await fetch('https://api.example.com/static-data', {
  next: { revalidate: 3600 } // 1시간마다 재검증
});

// 동적 데이터 (요청마다 새로 가져옴)
const dynamicData = await fetch('https://api.example.com/user-data', {
  cache: 'no-store'
});
```

마지막으로, Lighthouse나 Next.js Analytics와 같은 도구를 사용하여 정기적으로 성능을 측정하고 최적화할 영역을 파악하는 것이 중요합니다. Core Web Vitals(LCP, FID, CLS)를 모니터링하고 개선하는 데 중점을 두어야 합니다.