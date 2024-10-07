# 힙(Heap) 자료구조에 대한 인터뷰 답변

## 힙(Heap)이란?
힙은 완전 이진 트리(Complete Binary Tree) 구조를 가지며, 특정한 순서 속성을 만족하는 자료구조입니다. 주로 최대값이나 최소값을 빠르게 찾아야 하는 경우에 사용됩니다. 두 가지 주요 유형이 있습니다:

1. **최대 힙(Max Heap)**: 부모 노드의 값이 자식 노드의 값보다 크거나 같습니다.
2. **최소 힙(Min Heap)**: 부모 노드의 값이 자식 노드의 값보다 작거나 같습니다.

## 힙의 핵심 연산
1. **삽입(Insert)**: 새 요소를 힙의 마지막에 추가한 후, 힙 속성을 유지하기 위해 위로 이동시킵니다(up-heap, bubble-up).
2. **추출(Extract)**: 루트 노드를 제거하고 반환한 후, 마지막 요소를 루트로 이동시키고 힙 속성을 유지하기 위해 아래로 이동시킵니다(down-heap, bubble-down).

## 힙의 구현 - 최소 힙 예시
힙은 일반적으로 배열을 사용하여 구현됩니다. 노드 인덱스 i에 대해:
- 부모 노드: (i-1) // 2
- 왼쪽 자식: 2*i + 1
- 오른쪽 자식: 2*i + 2

```python
class MinHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, key):
        self.heap.append(key)
        self.heapify_up(len(self.heap) - 1)
    
    def heapify_up(self, i):
        # 부모 노드와 비교하여 더 작으면 위로 이동
        parent = self.parent(i)
        if i > 0 and self.heap[i] < self.heap[parent]:
            self.swap(i, parent)
            self.heapify_up(parent)
    
    def extract_min(self):
        if len(self.heap) == 0:
            return None
        
        min_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        if len(self.heap) > 0:
            self.heapify_down(0)
        return min_val
    
    def heapify_down(self, i):
        smallest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        # 왼쪽 자식이 더 작은 경우
        if left < len(self.heap) and self.heap[left] < self.heap[smallest]:
            smallest = left
        
        # 오른쪽 자식이 더 작은 경우
        if right < len(self.heap) and self.heap[right] < self.heap[smallest]:
            smallest = right
        
        # 현재 노드가 가장 작지 않으면 교환하고 재귀 호출
        if smallest != i:
            self.swap(i, smallest)
            self.heapify_down(smallest)
```

## 시간 복잡도
- **삽입(Insert)**: O(log n) - 힙의 높이에 비례
- **최소/최대값 추출(Extract Min/Max)**: O(log n) - 힙의 높이에 비례
- **최소/최대값 조회(Peek)**: O(1) - 루트 노드 값 반환
- **힙 구성(Heapify)**: O(n) - 모든 노드에 대해 힙 속성 적용

## 공간 복잡도
- **기본 힙**: O(n) - n개의 요소 저장

## 힙의 활용 사례
1. **우선순위 큐(Priority Queue)**: 가장 높은/낮은 우선순위의 항목을 효율적으로 처리
2. **힙 정렬(Heap Sort)**: O(n log n) 시간 복잡도의 비교 기반 정렬 알고리즘
3. **다익스트라 알고리즘(Dijkstra's Algorithm)**: 최단 경로 찾기
4. **프림 알고리즘(Prim's Algorithm)**: 최소 신장 트리 구성
5. **중앙값 유지(Median Maintenance)**: 최대 힙과 최소 힙을 함께 사용

## Python의 heapq 모듈
Python에서는 `heapq` 라이브러리를 통해 최소 힙 기능을 제공합니다:

```python
import heapq

# 빈 힙 생성
heap = []

# 요소 삽입
heapq.heappush(heap, 4)
heapq.heappush(heap, 1)
heapq.heappush(heap, 7)

# 최소값 추출
min_val = heapq.heappop(heap)  # 1 반환

# 기존 리스트를 힙으로 변환
list_to_heapify = [4, 1, 7, 3, 8, 5]
heapq.heapify(list_to_heapify)

# 최대 힙 구현 (값에 -1을 곱하여 사용)
max_heap = []
heapq.heappush(max_heap, -4)
heapq.heappush(max_heap, -1)
max_val = -heapq.heappop(max_heap)  # 4 반환
```

## 힙 vs 다른 자료구조

### 힙 vs 정렬된 배열
- **삽입**: 힙 O(log n) vs 정렬된 배열 O(n)
- **최소/최대값 추출**: 힙 O(log n) vs 정렬된 배열 O(1)
- **최소/최대값 조회**: 힙 O(1) vs 정렬된 배열 O(1)
- **검색**: 힙 O(n) vs 정렬된 배열 O(log n) (이진 탐색)

### 힙 vs 이진 탐색 트리(BST)
- **삽입**: 힙 O(log n) vs BST O(log n) (균형 잡힌 경우)
- **최소/최대값 조회**: 힙 O(1) vs BST O(log n) (최소값/최대값까지 이동 필요)
- **검색**: 힙 O(n) vs BST O(log n) (균형 잡힌 경우)
- **메모리 효율성**: 힙이 더 효율적 (배열 기반)

## 면접 팁
- 힙의 기본 원리와 구현 방법을 설명할 수 있어야 합니다.
- 최대 힙과 최소 힙의 차이점을 이해하고 있어야 합니다.
- 힙 연산(삽입, 추출)의 시간 복잡도를 분석할 수 있어야 합니다.
- 실제 문제 상황에서 힙을 사용하는 것이 적합한 이유를 설명할 수 있어야 합니다.
- Python에서 힙을 구현하거나 `heapq` 모듈을 사용하는 방법을 알고 있어야 합니다.