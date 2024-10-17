# 트리 순회(Tree Traversal) 알고리즘에 대한 인터뷰 답변

## 트리 순회란?
트리 순회는 트리 자료구조의 모든 노드를 체계적으로 방문하는 과정입니다. 이진 트리의 경우 주로 세 가지 기본 순회 방법(전위, 중위, 후위)과 레벨 순회 방법이 사용됩니다.

## 이진 트리 노드 정의
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

## 주요 트리 순회 방법

### 1. 전위 순회(Preorder Traversal)
루트 → 왼쪽 서브트리 → 오른쪽 서브트리 순으로 방문합니다.

```python
def preorder_traversal(root):
    result = []
    
    def dfs(node):
        if not node:
            return
        
        # 현재 노드 방문(루트)
        result.append(node.val)
        # 왼쪽 서브트리 방문
        dfs(node.left)
        # 오른쪽 서브트리 방문
        dfs(node.right)
    
    dfs(root)
    return result
```

반복적(iterative) 구현:
```python
def preorder_traversal_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        
        # 스택은 LIFO이므로 오른쪽을 먼저 넣고 왼쪽을 나중에 넣음
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

### 2. 중위 순회(Inorder Traversal)
왼쪽 서브트리 → 루트 → 오른쪽 서브트리 순으로 방문합니다. 이진 탐색 트리에서는 정렬된 결과를 얻을 수 있습니다.

```python
def inorder_traversal(root):
    result = []
    
    def dfs(node):
        if not node:
            return
        
        # 왼쪽 서브트리 방문
        dfs(node.left)
        # 현재 노드 방문(루트)
        result.append(node.val)
        # 오른쪽 서브트리 방문
        dfs(node.right)
    
    dfs(root)
    return result
```

반복적(iterative) 구현:
```python
def inorder_traversal_iterative(root):
    result = []
    stack = []
    current = root
    
    while current or stack:
        # 왼쪽으로 계속 이동하며 스택에 노드 추가
        while current:
            stack.append(current)
            current = current.left
        
        # 스택에서 노드를 꺼내서 방문
        current = stack.pop()
        result.append(current.val)
        
        # 오른쪽 자식으로 이동
        current = current.right
    
    return result
```

### 3. 후위 순회(Postorder Traversal)
왼쪽 서브트리 → 오른쪽 서브트리 → 루트 순으로 방문합니다.

```python
def postorder_traversal(root):
    result = []
    
    def dfs(node):
        if not node:
            return
        
        # 왼쪽 서브트리 방문
        dfs(node.left)
        # 오른쪽 서브트리 방문
        dfs(node.right)
        # 현재 노드 방문(루트)
        result.append(node.val)
    
    dfs(root)
    return result
```

반복적(iterative) 구현:
```python
def postorder_traversal_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [(root, False)]
    
    while stack:
        node, visited = stack.pop()
        
        if visited:
            # 노드를 이미 방문했으면 결과에 추가
            result.append(node.val)
        else:
            # 노드를 다시 스택에 넣고, 방문 표시
            stack.append((node, True))
            # 오른쪽, 왼쪽 순으로 스택에 추가 (LIFO이므로)
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))
    
    return result
```

### 4. 레벨 순회(Level Order Traversal)
트리의 각 레벨을 왼쪽에서 오른쪽으로 방문합니다. BFS(너비 우선 탐색) 알고리즘을 사용합니다.

```python
from collections import deque

def level_order_traversal(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result
```

## 각 순회 방법의 특징 및 활용

### 전위 순회(Preorder)
- **특징**: 루트를 먼저 방문하므로 트리의 구조를 빠르게 파악할 수 있습니다.
- **활용**: 트리 복제, 프리픽스 표현식(Polish notation) 생성, 디렉토리 구조 출력 등

### 중위 순회(Inorder)
- **특징**: 이진 탐색 트리에서 노드를 오름차순으로 방문합니다.
- **활용**: 정렬된 데이터 추출, 수식 트리 계산, 이진 탐색 트리 검증 등

### 후위 순회(Postorder)
- **특징**: 자식 노드를 모두 방문한 후에 부모 노드를 방문합니다.
- **활용**: 트리 삭제, 후위 표현식(Reverse Polish notation) 계산, 디렉토리 크기 계산 등

### 레벨 순회(Level Order)
- **특징**: 레벨별로 노드를 방문하므로 트리의 너비와 깊이를 파악하기 좋습니다.
- **활용**: 트리의 너비 계산, 최단 경로 찾기, 트리 시각화 등

## 시간 및 공간 복잡도
- **시간 복잡도**: 모든 순회 방법은 O(n)입니다. (n은 노드의 수)
- **공간 복잡도**:
  - 재귀 구현: O(h) (h는 트리의 높이, 최악의 경우 O(n))
  - 반복 구현: O(n) (레벨 순회), O(h) (전위, 중위, 후위 순회)

## 응용 문제 예시

### 이진 트리 최대 깊이 구하기
```python
def max_depth(root):
    if not root:
        return 0
    
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    
    return max(left_depth, right_depth) + 1
```

### 대칭 트리(Symmetric Tree) 확인하기
```python
def is_symmetric(root):
    if not root:
        return True
    
    def is_mirror(left, right):
        if not left and not right:
            return True
        if not left or not right:
            return False
        
        return (left.val == right.val and
                is_mirror(left.left, right.right) and
                is_mirror(left.right, right.left))
    
    return is_mirror(root.left, root.right)
```

## 면접 팁
- 트리 순회는 기본적인 알고리즘이므로 모든 방법을 능숙하게 구현할 수 있어야 합니다.
- 재귀적 구현과 반복적 구현의 장단점을 이해하고 설명할 수 있어야 합니다.
- 각 순회 방법의 특징과 적합한 활용 사례를 알고 있어야 합니다.
- 트리 순회를 응용한 문제(예: 최대 깊이, 대칭 트리, 경로 합 등)를 해결할 수 있어야 합니다.
- 시간 및 공간 복잡도 분석을 정확히 할 수 있어야 합니다.