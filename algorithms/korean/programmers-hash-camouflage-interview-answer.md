# 프로그래머스: 위장 문제에 대한 인터뷰 답변

## 문제 설명
스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때, 서로 다른 옷의 조합의 수를 return하는 문제입니다. clothes의 각 행은 [의상의 이름, 의상의 종류]로 이루어져 있으며, 스파이는 하루에 최소 한 개의 의상을 입습니다.

## 접근 방법
이 문제는 해시 자료구조를 활용하여 의상의 종류별로 개수를 세고, 조합론을 적용하여 해결할 수 있습니다. 핵심 아이디어는 다음과 같습니다:

1. 의상의 종류별로 개수를 해시맵에 저장합니다.
2. 각 종류별로 의상을 입는 경우의 수는 '해당 종류의 의상 개수 + 1'입니다. 여기서 +1은 해당 종류의 의상을 입지 않는 경우를 의미합니다.
3. 모든 종류에 대한 경우의 수를 곱합니다 (곱의 법칙).
4. 최소 한 개의 의상은 입어야 하므로, 모든 종류의 의상을 입지 않는 경우인 1을 뺍니다.

## 코드 구현
```python
def solution(clothes):
    # 의상 종류별 개수를 저장할 해시맵
    clothes_count = {}
    
    # 의상 종류별로 개수 세기
    for name, type in clothes:
        if type in clothes_count:
            clothes_count[type] += 1
        else:
            clothes_count[type] = 1
    
    # 조합 계산: (각 종류별 의상 수 + 1)을 모두 곱한 후 1을 뺌
    answer = 1
    for count in clothes_count.values():
        answer *= (count + 1)
    
    # 아무것도 입지 않는 경우 제외
    return answer - 1
```

## 최적화된 코드
```python
from collections import Counter

def solution(clothes):
    # Counter를 사용하여 의상 종류별 개수 세기
    counter = Counter([type for name, type in clothes])
    
    # 조합 계산
    answer = 1
    for count in counter.values():
        answer *= (count + 1)
    
    # 아무것도 입지 않는 경우 제외
    return answer - 1
```

## 시간 및 공간 복잡도
- **시간 복잡도**: O(n) - 의상 목록을 한 번 순회합니다.
- **공간 복잡도**: O(k) - k는 의상의 종류 수로, 최악의 경우 O(n)입니다.

## 문제 해결 과정 설명
예를 들어, 다음과 같은 의상이 있다고 가정해봅시다:

```
["yellowhat", "headgear"]
["bluesunglasses", "eyewear"]
["green_turban", "headgear"]
```

1. 먼저 의상 종류별로 개수를 세면:
   - headgear: 2개 (yellowhat, green_turban)
   - eyewear: 1개 (bluesunglasses)

2. 각 종류별 선택 가능한 경우의 수:
   - headgear: 3가지 (yellowhat 착용, green_turban 착용, 미착용)
   - eyewear: 2가지 (bluesunglasses 착용, 미착용)

3. 전체 조합의 수: 3 × 2 = 6

4. 모든 종류를 미착용하는 경우 1가지를 제외: 6 - 1 = 5

따라서 가능한 서로 다른 옷의 조합은 5가지입니다.

## 엣지 케이스 처리
- 의상이 하나만 있는 경우: 해당 의상을 입거나 입지 않는 2가지 경우 중, 입지 않는 경우를 제외하면 1을 반환합니다.
- 의상의 종류가 하나뿐인 경우: 해당 종류의 의상 수가 답이 됩니다.

## 면접 팁
이 문제는 해시와 조합론을 함께 활용하는 문제입니다. 면접에서는 다음 사항을 강조하면 좋습니다:

1. **문제 이해**: 각 의상 종류에서 최대 한 개만 선택할 수 있으며, 최소 한 개의 의상은 입어야 한다는 조건을 명확히 이해했음을 보여주세요.

2. **자료구조 선택**: 의상 종류별 개수를 세기 위해 해시맵을 선택한 이유와 효율성을 설명하세요.

3. **수학적 접근**: 조합론의 곱의 법칙을 적용한 이유와 '각 종류별 의상 수 + 1'을 곱하는 이유를 설명하세요.

4. **최종 조정**: 모든 종류의 의상을 입지 않는 경우를 제외하는 이유를 설명하세요.

5. **코드 최적화**: Counter 클래스를 사용하여 코드를 더 간결하게 만들 수 있음을 언급하세요.

이 문제는 실생활 상황에서의 조합 문제를 해결하는 능력과, 효율적인 자료구조 활용 능력을 테스트합니다.