# 자바스크립트 DOM 조작 인터뷰 답변

DOM(Document Object Model) 조작은 자바스크립트를 사용하여 웹 페이지의 구조, 콘텐츠, 스타일을 동적으로 변경하는 것을 의미합니다. React나 Vue와 같은 현대 프레임워크가 이 작업을 추상화하지만, 기본적인 DOM 조작 원리를 이해하는 것은 여전히 중요합니다.

요소를 선택하는 주요 메서드로는 getElementById(), querySelector(), querySelectorAll() 등이 있습니다. querySelector()는 CSS 선택자 문법을 사용하여 유연하게 요소를 선택할 수 있어 가장 널리 사용됩니다. 콘텐츠를 수정할 때는 innerHTML(보안 위험이 있음), textContent(텍스트만 처리), innerText(가시적 텍스트만 처리) 속성을 사용할 수 있습니다.

새 요소를 생성하고 추가하는 방법은 다음과 같습니다. createElement()로 요소를 생성하고, appendChild() 또는 insertBefore()로 DOM에 추가합니다. 여러 요소를 추가할 때는 DocumentFragment를 사용하여 리플로우 횟수를 줄일 수 있습니다. 요소를 제거할 때는 remove() 또는 부모 요소의 removeChild()를 사용합니다.

속성을 조작하는 방법으로는 getAttribute(), setAttribute(), removeAttribute()를 사용하거나, 요소의 속성에 직접 접근할 수 있습니다. 또한 classList API(add(), remove(), toggle(), contains())를 사용하여 클래스를 효과적으로 관리할 수 있습니다.

DOM 조작 시 성능을 고려하는 것이 중요합니다. 불필요한 리플로우와 리페인트를 방지하기 위해 스타일 변경을 일괄 처리하고, DOM 접근을 최소화하며, 비가시적 요소를 조작한 후 DOM에 추가하는 방식을 사용합니다. 또한 이벤트 위임을 통해 여러 요소의 이벤트를 효율적으로 관리할 수 있습니다.