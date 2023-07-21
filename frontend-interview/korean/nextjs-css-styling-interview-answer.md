# Next.js CSS 스타일링 방식 인터뷰 답변

Next.js는 다양한 CSS 스타일링 방식을 지원하므로, 프로젝트 요구사항이나 팀 선호도에 따라 적합한 방식을 선택할 수 있습니다. 각 접근법의 특징과 장단점을 설명해 드리겠습니다.

전역 CSS는 가장 기본적인 방식으로, styles 디렉토리에 CSS 파일을 생성하고 페이지나 컴포넌트에서 import하여 사용합니다. Pages Router에서는 _app.js, App Router에서는 layout.js에서 전역 스타일을 가져오는 것이 일반적입니다. 이 방법은 간단하지만, 스타일 충돌 가능성이 있고 컴포넌트 기반 개발에는 적합하지 않을 수 있습니다.

```javascript
// app/layout.js 또는 pages/_app.js
import '@/styles/globals.css';
```

CSS 모듈은 Next.js에 기본적으로 지원되는 방식으로, 파일명을 [name].module.css 형식으로 지정하여 사용합니다. 이 방법은 CSS 클래스를 자동으로 고유한 이름으로 변환하여 스타일 충돌을 방지하고, 컴포넌트 범위의 스타일링을 가능하게 합니다.

```jsx
// Button.module.css
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
}

// Button.js
import styles from './Button.module.css';

export default function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}
```

CSS-in-JS 라이브러리 중 가장 널리 사용되는 것은 styled-components와 emotion입니다. 이 방식은 JavaScript 내에서 직접 스타일을 정의하며, 동적 스타일링과 테마 지원이 강점입니다. 또한 컴포넌트와 스타일을 함께 관리할 수 있어 유지보수가 용이합니다. 하지만 런타임 오버헤드가 있고, 서버 사이드 렌더링 설정이 추가로 필요할 수 있습니다.

```jsx
// styled-components 예시
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.primary ? 'blue' : 'gray'};
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
`;

export default function Button({ children, primary }) {
  return (
    <StyledButton primary={primary}>
      {children}
    </StyledButton>
  );
}
```

Tailwind CSS는 유틸리티 클래스 기반의 CSS 프레임워크로, Next.js와 함께 많이 사용됩니다. 미리 정의된 클래스를 HTML 요소에 직접 적용하는 방식으로, 빠른 개발과 일관된 디자인을 가능하게 합니다. Next.js는 Tailwind CSS 설정을 위한 가이드를 제공합니다.

```jsx
// Tailwind CSS 예시
export default function Button({ children, primary }) {
  return (
    <button className={`px-5 py-2 rounded-md ${primary ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {children}
    </button>
  );
}
```

Sass/SCSS 지원도 Next.js에 내장되어 있어, .scss 또는 .sass 파일을 사용할 수 있습니다. 이 방식은 변수, 중첩, 믹스인 등 더 강력한 CSS 기능을 제공합니다.

```jsx
// Button.module.scss
$primary-color: blue;

.button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}

// Button.js
import styles from './Button.module.scss';
```

CSS 변수와 같은 최신 CSS 기능도 Next.js에서 지원됩니다. 이는 CSS 모듈이나 전역 CSS에서 활용할 수 있습니다.

```css
:root {
  --primary-color: #0070f3;
  --secondary-color: #ff6b81;
}

.button {
  background-color: var(--primary-color);
}
```

실제 프로젝트에서는 이러한 방식을 혼합하여 사용하기도 합니다. 예를 들어, Tailwind CSS를 기본으로 사용하면서 복잡한 컴포넌트에는 CSS 모듈이나 styled-components를 적용하는 방식입니다. 중요한 것은 팀 전체가 일관된 접근법을 사용하고, 스타일 관리에 명확한 규칙을 세우는 것입니다.