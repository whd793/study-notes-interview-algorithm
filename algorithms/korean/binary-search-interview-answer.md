# 이진 탐색(Binary Search) 알고리즘에 대한 인터뷰 답변

## 이진 탐색이란?
이진 탐색은 정렬된 배열에서 특정 값을 찾는 효율적인 알고리즘입니다. 배열의 중간 요소와 찾으려는 값을 비교하고, 중간 값보다 작으면 왼쪽 절반을, 크면 오른쪽 절반을 재귀적으로 또는 반복적으로 탐색합니다. 이 과정을 통해 각 단계마다 탐색 범위를 절반씩 줄여나갑니다.

## 이진 탐색의 핵심 아이디어
1. 탐색 범위의 가운데 요소를 피벗(pivot)으로 선택합니다.
2. 피벗과 찾으려는 값을 비교합니다.
3. 피벗이 찾으려는 값과 같으면 탐색을 종료합니다.
4. 피벗이 찾으려는 값보다 크면 왼쪽 절반을 탐색합니다.
5. 피벗이 찾으려는 값보다 작으면 오른쪽 절반을 탐색합니다.
6. 값을 찾거나 탐색 범위가 비어 있을 때까지 2-5 단계를 반복합니다.

## 이진 탐색 코드 구현 (반복적 방법)
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2  # 중간 인덱스 계산
        
        if arr[mid] == target:  # 값을 찾은 경우
            return mid
        elif arr[mid] < target:  # 중간 값이 타겟보다 작은 경우, 오른쪽 탐색
            left = mid + 1
        else:  # 중간 값이 타겟보다 큰 경우, 왼쪽 탐색
            right = mid - 1
    
    return -1  # 값이 배열에 없는 경우
```

## 이진 탐색 코드 구현 (재귀적 방법)
```python
def binary_search_recursive(arr, target, left, right):
    # 기저 조건: 탐색 범위가 비어 있는 경우
    if left > right:
        return -1
    
    mid = (left + right) // 2  # 중간 인덱스 계산
    
    if arr[mid] == target:  # 값을 찾은 경우
        return mid
    elif arr[mid] < target:  # 중간 값이 타겟보다 작은 경우, 오른쪽 탐색
        return binary_search_recursive(arr, target, mid + 1, right)
    else:  # 중간 값이 타겟보다 큰 경우, 왼쪽 탐색
        return binary_search_recursive(arr, target, left, mid - 1)

# 호출 방법
# result = binary_search_recursive(arr, target, 0, len(arr) - 1)
```

## 시간 및 공간 복잡도
- 시간 복잡도: O(log n) - 각 단계마다 탐색 범위가 절반으로 줄어듭니다.
- 공간 복잡도:
  - 반복적 방법: O(1) - 상수 공간만 사용합니다.
  - 재귀적 방법: O(log n) - 재귀 호출 스택 공간이 필요합니다.

## 이진 탐색의 응용
1. **정렬된 배열에서 값 찾기**: 기본적인 이진 탐색 활용
2. **로우어 바운드(Lower Bound)**: 타겟 값 이상인 첫 번째 요소의 위치 찾기
3. **어퍼 바운드(Upper Bound)**: 타겟 값보다 큰 첫 번째 요소의 위치 찾기
4. **회전된 정렬 배열에서 값 찾기**: 피벗을 고려한 변형된 이진 탐색
5. **이진 탐색을 통한 최적화 문제 해결**: 결정 문제(Decision Problem)로 변환

## 주의사항 및 일반적인 실수
1. **오버플로우 문제**: `mid = (left + right) // 2` 대신 `mid = left + (right - left) // 2`를 사용하여 오버플로우 방지
2. **무한 루프**: 범위 설정 및 업데이트 로직에 주의
3. **범위 설정 오류**: `left <= right` vs `left < right`
4. **경계 조건**: 탐색 범위의 처음과 끝에 위치한 값 처리

## 예제 문제
1. **정렬된 배열에서 값 찾기**
2. **회전된 정렬 배열에서 최소값 찾기**
3. **배열에서 타겟의 첫 번째와 마지막 위치 찾기**
4. **제곱근 계산하기**

이진 탐색은 분할 정복(Divide and Conquer) 패러다임의 대표적인 예시이며, 효율적인 탐색이 필요한 다양한 상황에서 활용됩니다. 특히 큰 데이터셋에서 값을 빠르게 찾아야 하는 경우에 필수적인 알고리즘입니다.