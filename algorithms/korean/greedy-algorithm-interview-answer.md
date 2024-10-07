# 그리디 알고리즘(Greedy Algorithm)에 대한 인터뷰 답변

## 그리디 알고리즘이란?
그리디 알고리즘은 각 단계에서 지역적으로 최적인 선택을 하여 최종적으로 전역 최적해를 찾는 방법입니다. 각 순간마다 가장 좋아 보이는 선택을 하며, 한번 선택한 결정은 번복하지 않습니다. 이 방법은 항상 최적의 해를 보장하지는 않지만, 특정 문제에서는 효율적으로 최적해를 찾을 수 있습니다.

## 그리디 알고리즘의 핵심 원리
1. **최적 부분 구조(Optimal Substructure)**: 전체 문제의 최적해가 부분 문제의 최적해로 구성됩니다.
2. **탐욕적 선택 속성(Greedy Choice Property)**: 지역적으로 최적인 선택이 전역 최적해로 이어집니다.

## 그리디 알고리즘이 적용 가능한 조건
1. 탐욕적 선택 속성이 성립해야 합니다.
2. 최적 부분 구조를 가져야 합니다.
3. 이전의 선택이 이후의 선택에 영향을 주지 않아야 합니다.

## 그리디 알고리즘 예시 문제

### 1. 동전 교환 문제
목표 금액을 만들기 위해 필요한 최소 동전 개수를 구하는 문제입니다. 그리디 접근법은 가장 큰 가치의 동전부터 사용하는 것입니다.

```python
def coin_change_greedy(coins, amount):
    # 동전을 내림차순으로 정렬
    coins.sort(reverse=True)
    
    count = 0
    for coin in coins:
        # 현재 동전으로 만들 수 있는 최대 개수
        coin_count = amount // coin
        count += coin_count
        amount -= coin_count * coin
        
        # 금액을 모두 만들었으면 종료
        if amount == 0:
            break
    
    # 남은 금액이 있으면 불가능
    if amount > 0:
        return -1
    return count
```

**참고**: 이 그리디 접근법은 동전 시스템이 '정준'(canonical)일 때만 최적해를 보장합니다(예: 한국 화폐 시스템). 일반적인 경우에는 동적 프로그래밍 접근법이 필요합니다.

### 2. 활동 선택 문제(Activity Selection Problem)
겹치지 않는 활동을 최대한 많이 선택하는 문제입니다. 그리디 접근법은 가장 빨리 끝나는 활동부터 선택하는 것입니다.

```python
def activity_selection(activities):
    # 활동을 종료 시간 기준으로 정렬
    activities.sort(key=lambda x: x[1])
    
    selected = [activities[0]]  # 첫 번째 활동 선택
    last_end_time = activities[0][1]
    
    for i in range(1, len(activities)):
        start_time, end_time = activities[i]
        # 이전 활동 종료 후 시작하는 활동만 선택
        if start_time >= last_end_time:
            selected.append(activities[i])
            last_end_time = end_time
    
    return selected
```

### 3. 분할 가능 배낭 문제(Fractional Knapsack Problem)
가치/무게 비율이 가장 높은 물건부터 선택하는 문제입니다.

```python
def fractional_knapsack(items, capacity):
    # 가치/무게 비율 기준으로 내림차순 정렬
    items.sort(key=lambda x: x[1] / x[0], reverse=True)
    
    total_value = 0
    for weight, value in items:
        if capacity >= weight:  # 물건 전체를 배낭에 넣을 수 있는 경우
            total_value += value
            capacity -= weight
        else:  # 물건의 일부만 배낭에 넣을 수 있는 경우
            fraction = capacity / weight
            total_value += value * fraction
            break
    
    return total_value
```

## 시간 및 공간 복잡도
- **시간 복잡도**: 일반적으로 정렬이 필요하기 때문에 O(n log n)이지만, 문제에 따라 다를 수 있습니다.
- **공간 복잡도**: 대부분의 경우 O(1) ~ O(n)입니다.

## 그리디 알고리즘 vs 동적 프로그래밍
- **그리디 알고리즘**: 각 단계에서 최적의 선택을 하며, 이전 선택을 다시 고려하지 않습니다. 일부 문제에서만 최적해를 보장합니다.
- **동적 프로그래밍**: 모든 가능한 선택을 고려하고, 하위 문제의 결과를 저장하여 재사용합니다. 최적해를 보장하지만 그리디보다 일반적으로 더 많은 계산이 필요합니다.

## 그리디 알고리즘이 최적해를 보장하는 대표적인 문제
1. 활동 선택 문제
2. 최소 신장 트리(MST) - 크루스칼(Kruskal)과 프림(Prim) 알고리즘
3. 허프만 코딩(Huffman Coding)
4. 다익스트라(Dijkstra) 알고리즘 (음수 가중치가 없는 경우)

## 면접 팁
- 그리디 알고리즘이 항상 최적해를 보장하지 않음을 인지하고, 주어진 문제에서 왜 그리디 접근법이 작동하는지(또는 작동하지 않는지) 설명할 수 있어야 합니다.
- 반례를 찾아 그리디 알고리즘의 한계를 설명할 수 있어야 합니다.
- 그리디 알고리즘과 동적 프로그래밍을 비교하여 설명할 수 있어야 합니다.
- 실제 면접에서는 그리디 알고리즘의 적용 가능성을 파악하고, 최적해를 보장하는지 분석하는 과정이 중요합니다.