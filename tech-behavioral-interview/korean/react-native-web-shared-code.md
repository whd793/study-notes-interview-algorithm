# React Native와 웹 간의 코드 공유 전략을 설명해주세요

핀테크 스타트업에서 웹과 모바일 앱 모두에서 일관된 사용자 경험을 제공하면서도 개발 효율성을 높이기 위해 React와 React Native 간의 코드 공유 전략을 설계하고 구현했습니다.

먼저 코드 공유의 목표와 범위를 명확히 정의했습니다. 비즈니스 로직, API 통신, 상태 관리, 유틸리티 함수는 최대한 공유하고, UI 컴포넌트는 각 플랫폼의 특성을 살리면서 일관된 사용자 경험을 제공하는 것이 목표였습니다.

모노레포 아키텍처를 구축했습니다. Yarn Workspaces와 Lerna를 사용하여 여러 패키지를 하나의 저장소에서 관리하는 구조를 만들었습니다. 이 구조에서 @core 패키지에는 공유 로직을, @web과 @mobile 패키지에는 플랫폼별 코드를 배치했습니다.

비즈니스 로직 공유를 위해 플랫폼 독립적인 코드를 작성했습니다. Redux 또는 MobX와 같은 상태 관리 라이브러리, API 클라이언트, 유효성 검증, 데이터 변환 로직 등을 플랫폼에 구애받지 않는 순수 JavaScript/TypeScript로 구현했습니다.

UI 컴포넌트 추상화 전략을 수립했습니다. 플랫폼별 구현을 추상화하는 어댑터 패턴을 적용했습니다. 예를 들어, 버튼 컴포넌트는 공통 인터페이스를 정의하고 웹과 모바일에서 각각 구현했습니다. 이를 통해 비즈니스 로직에서는 플랫폼 독립적인 인터페이스를 사용할 수 있었습니다.

```typescript
// 공통 인터페이스 정의 (shared/components/Button/types.ts)
export interface ButtonProps {
  onPress: () => void;
  label: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

// 웹 구현 (web/components/Button/index.tsx)
import { ButtonProps } from '@shared/components/Button/types';

export const Button = ({ onPress, label, variant, disabled }: ButtonProps) => (
  <button onClick={onPress} className={`btn btn-${variant}`} disabled={disabled}>
    {label}
  </button>
);

// React Native 구현 (mobile/components/Button/index.tsx)
import { ButtonProps } from '@shared/components/Button/types';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const Button = ({ onPress, label, variant, disabled }: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles[variant || 'primary']}
    disabled={disabled}
  >
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);
```

네비게이션 로직을 공유하기 위한 전략을 개발했습니다. 라우팅 정의와 매개변수를 공통 코드로 관리하고, 실제 네비게이션 구현은 React Router(웹)와 React Navigation(모바일)을 사용하여 플랫폼별로 분리했습니다.

환경 분기 처리를 위해 Platform 모듈을 구현했습니다. 이를 통해 코드 내에서 플랫폼별 분기 처리가 필요한 경우 명확하게 구분할 수 있었습니다.

```typescript
// 플랫폼 감지 유틸리티 (shared/utils/platform.ts)
export const Platform = {
  OS: typeof navigator !== 'undefined' && navigator.product === 'ReactNative' ? 'native' : 'web',
  select: (options: { native?: any; web?: any; default?: any }) => {
    if (Platform.OS in options) {
      return options[Platform.OS];
    }
    return options.default;
  }
};

// 사용 예시
import { Platform } from '@shared/utils/platform';

const fontSize = Platform.select({
  native: 16,
  web: '1rem',
  default: 16
});
```

테스트 전략도 공유했습니다. Jest를 기반으로 공통 테스트 설정을 구성하고, 비즈니스 로직에 대한 테스트는 공유 코드로 작성했습니다. UI 컴포넌트는 React Testing Library(웹)와 React Native Testing Library(모바일)를 사용하여 테스트했습니다.

CI/CD 파이프라인을 최적화했습니다. 변경된 패키지만 빌드하고 테스트하는 증분 빌드 시스템을 구축하여 개발 피드백 루프를 빠르게 유지했습니다.

이러한 코드 공유 전략의 결과, 코드베이스의 약 70%를 공유할 수 있었고, 새로운 기능 개발 시간이 50% 단축되었습니다. 또한 웹과 모바일 앱 간의 기능 패리티가 향상되어 일관된 사용자 경험을 제공할 수 있게 되었습니다.