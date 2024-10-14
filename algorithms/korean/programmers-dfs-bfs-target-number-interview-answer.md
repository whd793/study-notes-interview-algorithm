# 프로그래머스: 타겟 넘버 문제에 대한 인터뷰 답변

## 문제 설명
정수 배열 numbers와 타겟 넘버 target이 주어집니다. numbers의 각 원소에 +나 -를 붙여 만들 수 있는 모든 수 중에서, target과 일치하는 경우의 수를 구하는 문제입니다.

예를 들어, [1, 1, 1, 1, 1]과 타겟 넘버 3이 주어지면, 다음과 같은 경우의 수가 있습니다:
- +1+1+1+1-1 = 3
- +1+1+1-1+1 = 3
- +1+1-1+1+1 = 3
- +1-1+1+1+1 = 3
- -1+1+1+1+1 = 3
따라서 5를 반환해야 합니다.

## 접근 방법
이 문제는 DFS(깊이 우선 탐색) 또는 BFS(너비 우선 탐색)를 사용하여 해결할 수 있습니다. 모든 경우의 수를 탐색해야 하므로, 완전 탐색 문제입니다.

1. **DFS 접근법**: 각 원소마다 +를 붙이는 경우와 -를 붙이는 경우를 재귀적으로 탐색합니다.
2. **BFS 접근법**: 큐를 사용하여 각 단계에서 가능한 모든 상태를 탐색합니다.

여기서는 직관적인 DFS 접근법을 사용하겠습니다.

## DFS 구현
```python
def solution(numbers, target):
    answer = 0
    
    def dfs(index, current_sum):
        nonlocal answer
        
        # 모든 숫자를 사용했을 때
        if index == len(numbers):
            # 현재 합이 타겟과 일치하면 카운트 증가
            if current_sum == target:
                answer += 1
            return
        
        # 현재 숫자에 + 부호를 붙이는 경우
        dfs(index + 1, current_sum + numbers[index])
        
        # 현재 숫자에 - 부호를 붙이는 경우
        dfs(index + 1, current_sum - numbers[index])
    
    # 0번 인덱스부터 시작, 초기 합은 0
    dfs(0, 0)
    return answer
```

## BFS 구현
```python
from collections import deque

def solution_bfs(numbers, target):
    answer = 0
    queue = deque([(0, 0)])  # (인덱스, 현재까지의 합)
    
    while queue:
        index, current_sum = queue.popleft()
        
        # 모든 숫자를 사용했을 때
        if index == len(numbers):
            if current_sum == target:
                answer += 1
        else:
            # 현재 숫자에 + 부호를 붙이는 경우
            queue.append((index + 1, current_sum + numbers[index]))
            
            # 현재 숫자에 - 부호를 붙이는 경우
            queue.append((index + 1, current_sum - numbers[index]))
    
    return answer
```

## 시간 및 공간 복잡도
- **시간 복잡도**: O(2^n) - 각 숫자마다 +와 - 두 가지 선택지가 있으므로, 전체 경우의 수는 2^n입니다.
- **공간 복잡도**: O(n) - 재귀 호출 스택의 최대 깊이는 n입니다(DFS의 경우). BFS의 경우 최악의 경우 O(2^n)의 공간이 필요할 수 있습니다.

## 최적화 고려사항
이 문제의 경우, 모든 경우의 수를 탐색해야 하므로 시간 복잡도를 크게 개선하기는 어렵습니다. 그러나 다음과 같은 최적화를 고려할 수 있습니다:

1. **DP(동적 계획법)**: 만약 동일한 인덱스와 현재 합이 여러 번 계산된다면, 메모이제이션을 사용할 수 있습니다. 그러나 이 문제에서는 모든 경로가 고유하므로 큰 이점이 없습니다.

2. **가지치기(Pruning)**: 현재까지의 합에서 남은 모든 숫자를 더하거나 빼도 타겟에 도달할 수 없는 경우, 탐색을 중단할 수 있습니다. 그러나 이는 구현이 복잡해질 수 있습니다.

## 면접 팁
이 문제는 DFS/BFS의 기본 개념을 이해하고 있는지 테스트합니다. 면접에서는 다음 사항을 강조하면 좋습니다:

1. **문제 분석**: 이 문제가 왜 DFS/BFS로 해결 가능한지 설명합니다.
2. **재귀적 사고**: DFS 구현 시 재귀 함수의 역할과 종료 조건을 명확히 설명합니다.
3. **시간/공간 복잡도 분석**: 완전 탐색의 불가피성과 복잡도를 정확히 분석합니다.
4. **다양한 접근법**: DFS와 BFS 중 어느 방법이 이 문제에 더 적합한지 논의합니다(메모리 사용량, 구현 복잡성 등).

실제 코딩 테스트에서는 재귀 함수의 깊이 제한에 주의해야 하며, 파이썬의 경우 sys.setrecursionlimit()를 사용하여 제한을 늘릴 수 있습니다.