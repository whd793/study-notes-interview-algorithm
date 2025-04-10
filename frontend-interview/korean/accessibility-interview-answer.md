# 웹 접근성 인터뷰 답변

웹 접근성은 장애가 있는 사용자를 포함한 모든 사람이 웹 콘텐츠를 인식하고, 이해하며, 탐색하고 상호작용할 수 있도록 하는 것입니다. WCAG(웹 콘텐츠 접근성 지침)은 인식 가능, 조작 가능, 이해 가능, 견고함이라는 네 가지 원칙을 기반으로 합니다.

접근성 있는 웹사이트를 만들기 위한 핵심 사항으로는 시맨틱 HTML 사용, 적절한 대체 텍스트 제공, 키보드 접근성 보장, 충분한 색상 대비 구현, 명확한 오류 메시지와 지침 제공 등이 있습니다. 시맨틱 HTML은 <div>나 <span> 대신 <header>, <nav>, <main> 같은 요소를 사용하여 콘텐츠의 구조와 의미를 명확히 합니다.

폼 요소는 접근성에서 특히 중요한데, <label>을 사용하여 입력 필드와 연결하고, 필수 필드를 aria-required 속성으로 표시하며, 오류 메시지를 aria-describedby로 연결해야 합니다. 동적 콘텐츠에는 aria-live 영역을 활용하여 스크린 리더 사용자에게 변경 사항을 알릴 수 있습니다.

개발 과정에서 자동화된 도구(예: axe, Lighthouse)로 기본적인 접근성 문제를 확인하고, 키보드만 사용하여 모든 기능을 테스트하며, 다양한 스크린 리더로 사이트를 검증하는 것이 중요합니다. 접근성은 단순한 체크리스트가 아니라 지속적인 프로세스로 접근해야 합니다.

접근성이 높은 웹사이트는 장애인뿐만 아니라 모든 사용자에게 더 나은 경험을 제공하며, 많은 국가에서 법적 요구사항이 되고 있습니다. 또한 SEO에도 긍정적인 영향을 미칩니다.