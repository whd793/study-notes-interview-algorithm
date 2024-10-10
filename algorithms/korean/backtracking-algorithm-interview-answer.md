# 백트래킹(Backtracking) 알고리즘에 대한 인터뷰 답변

## 백트래킹이란?
백트래킹은 조건을 만족하는 모든 해를 찾기 위해, 가능한 모든 경우의 수를 탐색하는 알고리즘입니다. 특정 노드에서 유망하지 않다고 판단되면, 그 노드의 부모로 돌아가서(백트래킹) 다음 자식 노드를 탐색하는 방식입니다. 이를 통해 불필요한 탐색을 줄여 효율성을 높입니다.

## 백트래킹의 핵심 원리
1. **후보군 생성**: 현재 상태에서 가능한 모든 후보를 생성합니다.
2. **유망성 검사**: 각 후보가 조건을 만족하는지 검사합니다.
3. **재귀적 탐색**: 유망한 후보에 대해 재귀적으로 더 깊게 탐색합니다.
4. **백트래킹**: 해당 경로가 해결책으로 이어지지 않으면 이전 상태로 돌아갑니다.

## 백트래킹 vs 브루트 포스
백트래킹은 브루트 포스(완전 탐색)의 최적화된 버전입니다. 브루트 포스가 모든 경우의 수를 탐색하는 반면, 백트래킹은 유망하지 않은 경로를 조기에 차단(가지치기, pruning)하여 탐색 공간을 줄입니다.

## 대표적인 백트래킹 문제와 구현

### 1. N-Queens 문제
N×N 체스판에 N개의 퀸을 서로 공격할 수 없도록 배치하는 문제입니다.

```python
def solve_n_queens(n):
    solutions = []
    board = [-1] * n  # board[r] = c는 (r, c)에 퀸이 있음을 의미
    
    def is_valid(row, col):
        for prev_row in range(row):
            prev_col = board[prev_row]
            # 같은 열이나 대각선에 퀸이 있는지 확인
            if prev_col == col or \
               prev_col - prev_row == col - row or \
               prev_col + prev_row == col + row:
                return False
        return True
    
    def place_queen(row):
        if row == n:  # 모든 행에 퀸을 배치 완료
            solutions.append(board[:])  # 현재 배치를 해답에 추가
            return
        
        for col in range(n):
            if is_valid(row, col):
                board[row] = col  # (row, col)에 퀸 배치
                place_queen(row + 1)  # 다음 행으로 진행
                # 백트래킹: 다음 열로 이동하기 위해 명시적 복원은 필요 없음
    
    place_queen(0)  # 0번 행부터 시작
    return solutions
```

### 2. 부분집합의 합 (Subset Sum) 문제
주어진 집합에서 원소들의 합이 목표 값과 같은 부분집합을 찾는 문제입니다.

```python
def subset_sum(nums, target):
    result = []
    current = []
    
    def backtrack(start, current_sum):
        if current_sum == target:
            result.append(current[:])
            return
        
        if current_sum > target or start >= len(nums):
            return
        
        for i in range(start, len(nums)):
            # 현재 원소 포함
            current.append(nums[i])
            backtrack(i + 1, current_sum + nums[i])
            # 백트래킹: 현재 원소 제외
            current.pop()
    
    backtrack(0, 0)
    return result
```

### 3. 순열 (Permutation) 생성
주어진 집합의 모든 가능한 순열을 생성하는 문제입니다.

```python
def generate_permutations(nums):
    result = []
    visited = [False] * len(nums)
    current = []
    
    def backtrack():
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for i in range(len(nums)):
            if visited[i]:
                continue
            
            visited[i] = True
            current.append(nums[i])
            backtrack()
            # 백트래킹
            current.pop()
            visited[i] = False
    
    backtrack()
    return result
```

### 4. 조합 (Combination) 생성
주어진 집합에서 r개의 원소를 선택하는 모든 조합을 생성하는 문제입니다.

```python
def generate_combinations(nums, r):
    result = []
    current = []
    
    def backtrack(start):
        if len(current) == r:
            result.append(current[:])
            return
        
        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1)  # 중복을 피하기 위해 i+1부터 시작
            current.pop()  # 백트래킹
    
    backtrack(0)
    return result
```

## 백트래킹 알고리즘의 시간 복잡도
백트래킹의 시간 복잡도는 문제와 가지치기 효율에 따라 크게 달라집니다. 최악의 경우 O(b^d)로, b는 각 노드의 평균 분기 수, d는 최대 깊이입니다. 가지치기가 효과적일수록 실제 성능은 크게 향상됩니다.

## 백트래킹 알고리즘 설계 팁
1. **상태 공간 트리 정의**: 문제의 가능한 상태를 트리로 표현합니다.
2. **유망성 함수 설계**: 현재 상태가 해결책으로 이어질 가능성이 있는지 빠르게 판단하는 함수를 만듭니다.
3. **효과적인 가지치기**: 불필요한 탐색을 최대한 빨리 중단하는 것이 핵심입니다.
4. **상태 복원**: 백트래킹 후 이전 상태로 정확히 복원해야 합니다.

## 백트래킹이 적합한 문제 유형
1. 조합 최적화 문제 (TSP, 배낭 문제 등)
2. 제약 만족 문제 (스도쿠, 크로스워드 퍼즐 등)
3. 열거 문제 (순열, 조합, 부분집합 생성 등)

## 면접 팁
- 백트래킹 알고리즘의 기본 구조를 명확히 설명할 수 있어야 합니다.
- 브루트 포스와 백트래킹의 차이를 이해하고 설명할 수 있어야 합니다.
- 유망성 검사(promising test)의 중요성을 강조하세요.
- 재귀 함수를 사용한 백트래킹 구현에 익숙해야 합니다.
- 실제 문제를 백트래킹으로 해결하는 과정을 단계별로 설명할 수 있어야 합니다.