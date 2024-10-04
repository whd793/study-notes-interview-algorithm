# 정렬 알고리즘에 대한 인터뷰 답변

## 주요 정렬 알고리즘 개요
정렬 알고리즘은 데이터를 특정 순서로 배열하는 알고리즘입니다. 여러 정렬 알고리즘이 있으며, 각각 시간 복잡도, 공간 복잡도, 안정성 등의 특성이 다릅니다.

## 주요 정렬 알고리즘 비교

### 1. 버블 정렬(Bubble Sort)
인접한 두 요소를 비교하여 필요시 교환하는 방식으로, 한 패스마다 가장 큰 요소가 배열 끝으로 이동합니다.

- **시간 복잡도**: 평균 및 최악 O(n²), 최선 O(n) (이미 정렬된 경우)
- **공간 복잡도**: O(1)
- **안정성**: 안정적(Stable)

```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        # 최적화: 한 패스에서 교환이 없으면 이미 정렬된 상태
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
```

### 2. 선택 정렬(Selection Sort)
배열에서 최소값을 찾아 맨 앞 요소와 교환하는 과정을 반복합니다.

- **시간 복잡도**: 항상 O(n²)
- **공간 복잡도**: O(1)
- **안정성**: 불안정(Unstable)

```python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
```

### 3. 삽입 정렬(Insertion Sort)
정렬된 부분 배열에 새 요소를 적절한 위치에 삽입하는 방식입니다.

- **시간 복잡도**: 평균 및 최악 O(n²), 최선 O(n) (이미 정렬된 경우)
- **공간 복잡도**: O(1)
- **안정성**: 안정적(Stable)

```python
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr
```

### 4. 병합 정렬(Merge Sort)
배열을 반으로 나누고, 각 부분을 정렬한 후 병합하는 분할 정복 방식입니다.

- **시간 복잡도**: 항상 O(n log n)
- **공간 복잡도**: O(n)
- **안정성**: 안정적(Stable)

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # 분할(Divide)
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # 정복(Conquer)
    left = merge_sort(left)
    right = merge_sort(right)
    
    # 병합(Merge)
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### 5. 퀵 정렬(Quick Sort)
피벗(pivot)을 선택하고, 피벗보다 작은 요소와 큰 요소로 분할하는 분할 정복 방식입니다.

- **시간 복잡도**: 평균 O(n log n), 최악 O(n²) (이미 정렬된 경우), 최선 O(n log n)
- **공간 복잡도**: O(log n) ~ O(n)
- **안정성**: 불안정(Unstable)

```python
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        # 분할(Partition)
        pi = partition(arr, low, high)
        
        # 분할 정복(Divide and Conquer)
        quick_sort(arr, low, pi - 1)  # 피벗보다 작은 부분 정렬
        quick_sort(arr, pi + 1, high)  # 피벗보다 큰 부분 정렬
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # 마지막 요소를 피벗으로 선택
    i = low - 1  # 피벗보다 작은 요소들의 경계 인덱스
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]  # 피벗을 올바른 위치에 배치
    return i + 1  # 피벗의 인덱스 반환
```

### 6. 힙 정렬(Heap Sort)
배열을 최대 힙으로 구성한 후, 루트(최대값)를 배열 끝으로 이동시키는 과정을 반복합니다.

- **시간 복잡도**: 항상 O(n log n)
- **공간 복잡도**: O(1)
- **안정성**: 불안정(Unstable)

```python
def heap_sort(arr):
    n = len(arr)
    
    # 최대 힙 구성
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # 하나씩 요소를 추출
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # 루트와 마지막 요소 교환
        heapify(arr, i, 0)  # 힙 속성 유지
    
    return arr

def heapify(arr, n, i):
    largest = i  # 루트를 가장 큰 값으로 초기화
    left = 2 * i + 1  # 왼쪽 자식
    right = 2 * i + 2  # 오른쪽 자식
    
    # 왼쪽 자식이 루트보다 크면
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # 오른쪽 자식이 가장 큰 값보다 크면
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # largest가 루트가 아니면 교환하고 재귀적으로 힙 속성 유지
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

## 정렬 알고리즘 선택 기준
1. **데이터 크기**: 작은 데이터셋에는 삽입 정렬이, 큰 데이터셋에는 퀵 정렬, 병합 정렬, 힙 정렬이 적합합니다.
2. **데이터 분포**: 이미 부분적으로 정렬된 데이터에는 삽입 정렬이 효율적입니다.
3. **안정성 요구**: 안정적인 정렬이 필요하면 병합 정렬이나 삽입 정렬을 선택합니다.
4. **메모리 제약**: 제한된 메모리 환경에서는 제자리 정렬(in-place sorting)인 퀵 정렬이나 힙 정렬이 유리합니다.
5. **최악의 경우 성능**: 최악의 경우에도 일관된 성능이 필요하면 병합 정렬이나 힙 정렬을 선택합니다.

## 정렬 알고리즘의 안정성
정렬 알고리즘의 안정성(Stability)은 같은 값을 가진 요소들의 상대적 순서가 정렬 후에도 유지되는지를 나타냅니다.

- **안정적(Stable)**: 버블 정렬, 삽입 정렬, 병합 정렬
- **불안정(Unstable)**: 선택 정렬, 퀵 정렬, 힙 정렬

## 면접 팁
- 각 정렬 알고리즘의 작동 원리를 설명할 수 있어야 합니다.
- 시간 복잡도, 공간 복잡도, 안정성을 비교하여 설명할 수 있어야 합니다.
- 실제 상황에서 어떤 정렬 알고리즘을 선택할지 판단할 수 있어야 합니다.
- 퀵 정렬이나 병합 정렬과 같은 주요 알고리즘의 코드를 작성할 수 있어야 합니다.