# 프로그래머스: 가장 큰 정사각형 찾기 문제에 대한 인터뷰 답변

## 문제 설명
1과 0으로 채워진 표(board)가 있습니다. 표 1칸은 1 x 1 크기의 정사각형으로, 몇몇 정사각형은 색칠되어 있습니다(1로 표시). 표에서 1로 이루어진 가장 큰 정사각형을 찾아 넓이를 return하는 문제입니다.

## 접근 방법
이 문제는 동적 프로그래밍(DP)을 사용하여 효율적으로 해결할 수 있습니다. 핵심 아이디어는 다음과 같습니다:

1. DP 배열 `dp[i][j]`를 생성합니다. 여기서 `dp[i][j]`는 (i, j)를 오른쪽 하단 꼭짓점으로 하는 가장 큰 정사각형의 한 변의 길이입니다.

2. DP 배열을 채우기 위한 점화식은 다음과 같습니다:
   - 현재 위치의 값이 1인 경우: `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`
   - 현재 위치의 값이 0인 경우: `dp[i][j] = 0`

3. 이 점화식의 의미는 다음과 같습니다:
   - 현재 위치(i, j)에서 가능한 정사각형의 크기는 왼쪽, 위쪽, 왼쪽 대각선 위에 있는 세 정사각형 중 가장 작은 크기에 영향을 받습니다.
   - 세 방향 중 하나라도 작은 정사각형이 있다면, 현재 위치에서의 정사각형도 그 크기로 제한됩니다.

## 코드 구현
```python
def solution(board):
    rows = len(board)
    cols = len(board[0]) if rows > 0 else 0
    
    # 행이나 열이 1개인 경우 따로 처리
    if rows <= 1 or cols <= 1:
        return 1 if any(1 in row for row in board) else 0
    
    # DP 배열 초기화 (원본 배열 복사)
    dp = [row[:] for row in board]
    max_size = 0
    
    # DP 배열 채우기
    for i in range(1, rows):
        for j in range(1, cols):
            if board[i][j] == 1:
                dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                max_size = max(max_size, dp[i][j])
            else:
                dp[i][j] = 0
    
    # 첫 번째 행과 열이 포함되지 않았을 경우를 대비
    if max_size == 0:
        max_size = max(max(row) for row in dp)
    
    return max_size * max_size  # 넓이 반환
```

## 시간 및 공간 복잡도
- **시간 복잡도**: O(rows * cols) - 모든 셀을 한 번씩 순회합니다.
- **공간 복잡도**: O(rows * cols) - 원본 배열과 같은 크기의 DP 배열을 사용합니다.

## 최적화 방법
메모리 사용량을 최적화하기 위해, 원본 배열을 그대로 DP 배열로 사용할 수도 있습니다. 하지만 이는 입력 배열을 변경한다는 단점이 있습니다.

또 다른 최적화 방법은 전체 DP 배열이 아닌 두 행만 유지하는 것입니다:

```python
def solution_optimized(board):
    rows = len(board)
    cols = len(board[0]) if rows > 0 else 0
    
    if rows <= 1 or cols <= 1:
        return 1 if any(1 in row for row in board) else 0
    
    # 이전 행과 현재 행만 저장
    prev_row = board[0][:]
    max_size = max(prev_row)
    
    for i in range(1, rows):
        current_row = board[i][:]
        
        for j in range(1, cols):
            if board[i][j] == 1:
                current_row[j] = min(prev_row[j], current_row[j-1], prev_row[j-1]) + 1
                max_size = max(max_size, current_row[j])
        
        prev_row = current_row
    
    return max_size * max_size
```

이 최적화된 버전은 공간 복잡도를 O(cols)로 줄일 수 있습니다.

## 엣지 케이스 처리
- **빈 배열**: 빈 배열이 주어진 경우, 0을 반환합니다.
- **단일 행/열**: 행이나 열이 하나만 있는 경우, 1이 하나라도 있으면 1을, 없으면 0을 반환합니다.
- **모든 값이 0인 경우**: 0을 반환합니다.
- **모든 값이 1인 경우**: 정사각형의 크기는 min(rows, cols)^2가 됩니다.

## 직관적 이해를 위한 예시
다음과 같은 배열을 예로 들어보겠습니다:
```
0 1 1 1
1 1 1 1
1 1 1 1
```

DP 배열을 계산하면 다음과 같이 채워집니다:
```
0 1 1 1
1 1 2 2
1 2 2 3
```

여기서 dp[2][3] = 3은 (2,3)을 오른쪽 하단 꼭짓점으로 하는 3x3 정사각형이 있음을 의미합니다. 따라서 최대 정사각형의 넓이는 3x3 = 9입니다.

## 면접 팁
이 문제는 동적 프로그래밍의 기본 개념을 이해하고 있는지 테스트합니다. 면접에서는 다음 사항을 강조하면 좋습니다:

1. **문제 분석**: 왜 이 문제가 DP로 접근하기 적합한지 설명하세요.
2. **점화식 도출**: DP 점화식을 어떻게 생각해냈는지 과정을 설명하세요.
3. **최적화 고려**: 공간 복잡도를 줄이는 방법에 대해 논의하세요.
4. **시각적 설명**: 예시를 통해 알고리즘의 작동 방식을 직관적으로 설명하세요.

이 문제는 DP의 전형적인 유형으로, 2차원 DP 문제에 대한 이해와 접근법을 보여줄 좋은 기회입니다.