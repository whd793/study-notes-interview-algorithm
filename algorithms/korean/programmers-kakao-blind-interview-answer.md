# 프로그래머스 카카오 블라인드 문제에 대한 인터뷰 답변

## 2021 카카오 블라인드: 메뉴 리뉴얼 문제

### 문제 설명
레스토랑을 운영하던 스카피는 코스요리 메뉴를 새로 구성하려고 합니다. 각 손님들이 주문한 단품메뉴들이 문자열 형식으로 담긴 배열 orders와, 코스요리를 구성하는 단품메뉴들의 갯수가 담긴 배열 course가 매개변수로 주어질 때, 스카피가 새로 추가하게 될 코스요리의 메뉴 구성을 문자열 형태로 배열에 담아 return 하는 문제입니다.

### 접근 방법
이 문제는 조합(Combination)과 카운팅을 활용하여 해결할 수 있습니다. 각 주문(order)에서 특정 길이(course)의 조합을 모두 구한 후, 가장 많이 주문된 조합을 찾아야 합니다.

알고리즘 흐름은 다음과 같습니다:
1. 각 주문을 알파벳 순으로 정렬합니다.
2. course에 있는 각 길이에 대해:
   - 각 주문에서 해당 길이의 모든 조합을 구합니다.
   - 각 조합이 등장한 횟수를 계산합니다.
   - 가장 많이 등장한 조합들을 선택합니다(최소 2번 이상 등장해야 함).
3. 결과를 알파벳 순으로 정렬하여 반환합니다.

### 코드 구현
```python
from itertools import combinations
from collections import Counter

def solution(orders, course):
    result = []
    
    # 각 코스 길이에 대해 처리
    for course_len in course:
        # 모든 주문에서 해당 길이의 조합 추출
        order_combinations = []
        for order in orders:
            # 주문을 정렬하여 조합의 순서 일관성 유지
            sorted_order = ''.join(sorted(order))
            # 현재 주문에서 course_len 길이의 모든 조합 생성
            order_combinations.extend(combinations(sorted_order, course_len))
        
        # 조합의 등장 횟수 계산
        combination_counts = Counter(order_combinations)
        
        # 등장 횟수가 2 이상이고 최대인 조합 선택
        if combination_counts:
            max_count = max(combination_counts.values(), default=0)
            if max_count >= 2:  # 최소 2명 이상의 손님에게서 주문되어야 함
                for combo, count in combination_counts.items():
                    if count == max_count:
                        result.append(''.join(combo))
    
    # 결과를 알파벳 순으로 정렬
    return sorted(result)
```

### 시간 및 공간 복잡도
- **시간 복잡도**: O(N * 2^L) - N은 주문의 수, L은 주문 내의 최대 메뉴 수입니다. 각 주문에서 모든 가능한 조합을 생성하므로 최악의 경우 2^L개의 조합이 생성될 수 있습니다.
- **공간 복잡도**: O(N * 2^L) - 모든 조합을 저장하기 위한 공간이 필요합니다.

### 해결 과정 설명
이 문제를 해결할 때 가장 중요한 점은 효율적으로 모든 가능한 메뉴 조합을 생성하고 카운팅하는 것입니다. Python의 `itertools.combinations`와 `collections.Counter`를 활용하면 이 과정을 간결하게 구현할 수 있습니다.

주의할 점은 다음과 같습니다:
1. 메뉴 조합은 순서가 중요하지 않으므로, 각 주문을 정렬하여 일관성을 유지해야 합니다.
2. 코스요리는 최소 2명 이상의 손님에게서 주문된 조합이어야 합니다.
3. 각 코스 길이별로 가장 많이 주문된 조합들만 선택해야 합니다.

### 면접 팁
이 문제는 조합과 카운팅의 개념을 이해하고 있는지 테스트합니다. 면접에서는 다음 사항을 강조하면 좋습니다:
1. 문제를 어떻게 분석하고 접근했는지 설명
2. 조합을 생성하는 방법과 그 효율성
3. 시간 및 공간 복잡도 분석
4. 엣지 케이스 처리 방법(예: 중복 주문, 최소 주문 횟수 등)

또한, 라이브러리 사용이 제한된 환경에서는 직접 조합을 생성하는 방법도 설명할 수 있어야 합니다.