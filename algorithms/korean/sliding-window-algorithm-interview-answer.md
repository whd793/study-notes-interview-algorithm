# 슬라이딩 윈도우(Sliding Window) 알고리즘에 대한 인터뷰 답변

## 슬라이딩 윈도우란?
슬라이딩 윈도우는 배열이나 문자열과 같은 선형 자료구조에서 일정 크기의 윈도우(창)을 유지하며 이동시키면서 문제를 해결하는 알고리즘 기법입니다. 이 기법은 중복 계산을 피하고 효율적으로 문제를 해결할 수 있게 해줍니다.

## 슬라이딩 윈도우의 핵심 원리
1. **윈도우 초기화**: 처음에 윈도우의 크기와 위치를 설정합니다.
2. **윈도우 이동**: 윈도우를 한 칸씩 이동시키면서 새로운 요소를 추가하고 이전 요소를 제거합니다.
3. **윈도우 내 계산**: 각 윈도우 위치에서 필요한 계산을 수행합니다.

## 슬라이딩 윈도우의 유형

### 1. 고정 크기 윈도우(Fixed Window)
윈도우의 크기가 고정되어 있는 경우입니다.

```python
def fixed_sliding_window(arr, k):
    n = len(arr)
    if n < k:
        return None
    
    # 첫 번째 윈도우 합 계산
    window_sum = sum(arr[:k])
    result = [window_sum]
    
    # 윈도우 슬라이딩
    for i in range(k, n):
        # 새 요소 추가, 이전 요소 제거
        window_sum = window_sum + arr[i] - arr[i-k]
        result.append(window_sum)
    
    return result
```

### 2. 가변 크기 윈도우(Variable Window)
윈도우의 크기가 조건에 따라 변하는 경우입니다.

```python
def variable_sliding_window(arr, target_sum):
    n = len(arr)
    current_sum = 0
    min_length = float('inf')
    start = 0
    
    for end in range(n):
        current_sum += arr[end]  # 윈도우에 새 요소 추가
        
        # 조건을 만족할 때까지 윈도우 시작 위치 조정
        while current_sum >= target_sum and start <= end:
            min_length = min(min_length, end - start + 1)
            current_sum -= arr[start]  # 윈도우에서 요소 제거
            start += 1
    
    return min_length if min_length != float('inf') else 0
```

## 슬라이딩 윈도우 알고리즘의 대표적인 문제

### 1. 최대 부분 배열 합 (크기 K)
크기가 K인 연속 부분 배열 중 합이 최대인 것을 찾는 문제입니다.

```python
def max_subarray_sum(arr, k):
    n = len(arr)
    if n < k:
        return None
    
    # 첫 번째 윈도우 합 계산
    max_sum = current_sum = sum(arr[:k])
    
    # 윈도우 슬라이딩
    for i in range(k, n):
        current_sum = current_sum + arr[i] - arr[i-k]
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

### 2. 최소 크기 부분 배열
합이 특정 값 이상이 되는 가장 짧은 연속 부분 배열의 길이를 찾는 문제입니다.

```python
def min_subarray_length(arr, target):
    n = len(arr)
    min_length = float('inf')
    current_sum = 0
    start = 0
    
    for end in range(n):
        current_sum += arr[end]
        
        while current_sum >= target:
            min_length = min(min_length, end - start + 1)
            current_sum -= arr[start]
            start += 1
    
    return min_length if min_length != float('inf') else 0
```

### 3. 문자열에서 특정 문자를 포함하는 최소 윈도우
문자열 S에서 문자열 T의 모든 문자를 포함하는 최소 윈도우를 찾는 문제입니다.

```python
def min_window_substring(s, t):
    if not s or not t:
        return ""
    
    # 필요한 문자와 개수 저장
    counter = {}  
    for char in t:
        counter[char] = counter.get(char, 0) + 1
    
    required = len(counter)  # 필요한 고유 문자 수
    formed = 0  # 현재 윈도우에서 조건을 만족하는 문자 수
    
    window_counts = {}  # 현재 윈도우의 문자 빈도수
    ans = float('inf'), -1, -1  # 길이, 시작 인덱스, 끝 인덱스
    
    left, right = 0, 0
    
    while right < len(s):
        # 오른쪽 확장
        character = s[right]
        window_counts[character] = window_counts.get(character, 0) + 1
        
        # 문자 조건 충족 확인
        if character in counter and window_counts[character] == counter[character]:
            formed += 1
        
        # 조건을 모두 충족하면 왼쪽 수축
        while left <= right and formed == required:
            character = s[left]
            
            # 현재 윈도우가 더 작은 경우 정답 갱신
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
            
            # 왼쪽 포인터 이동
            window_counts[character] -= 1
            if character in counter and window_counts[character] < counter[character]:
                formed -= 1
                
            left += 1
        
        right += 1
    
    return "" if ans[0] == float('inf') else s[ans[1]:ans[2]+1]
```

## 시간 및 공간 복잡도
- **시간 복잡도**: 대부분의 슬라이딩 윈도우 알고리즘은 O(n)의 시간 복잡도를 가집니다. 배열을 한 번만 순회하기 때문입니다.
- **공간 복잡도**: 일반적으로 O(1) ~ O(k)입니다. k는 윈도우 크기 또는 문제에 따라 다른 상수입니다.

## 슬라이딩 윈도우의 장점
1. **효율성**: 중복 계산을 피하고 최적화된 시간 복잡도(주로 O(n))를 제공합니다.
2. **간결성**: 코드가 간결하고 이해하기 쉬운 경우가 많습니다.
3. **적용성**: 다양한 선형 자료구조 문제에 적용할 수 있습니다.

## 슬라이딩 윈도우가 적합한 문제 유형
1. 고정 크기 윈도우의 최대/최소/평균 찾기
2. 특정 조건을 만족하는, 크기가 가변적인 부분 배열/문자열 찾기
3. 문자열에서 특정 패턴이나 특성을 가진 부분 문자열 찾기

## 면접 팁
- 슬라이딩 윈도우의 기본 아이디어와 브루트 포스 접근법과의 차이점을 명확히 설명하세요.
- 고정 크기와 가변 크기 윈도우의 차이점과 각각 어떤 상황에 적합한지 이해하고 있어야 합니다.
- 윈도우를 이동시키는 과정에서 이전 계산 결과를 효율적으로 활용하는 방법을 강조하세요.
- 다양한 문제 유형에 슬라이딩 윈도우를 적용하는 방법을 숙지하고 있어야 합니다.