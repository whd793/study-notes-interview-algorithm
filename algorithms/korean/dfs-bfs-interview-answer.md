# DFS와 BFS 알고리즘에 대한 인터뷰 답변

## DFS(Depth-First Search, 깊이 우선 탐색)와 BFS(Breadth-First Search, 너비 우선 탐색)란?
DFS와 BFS는 그래프나 트리 구조에서 모든 노드를 방문하기 위한 두 가지 기본적인 탐색 알고리즘입니다.

- **DFS**: 현재 경로상의 노드를 가능한 깊게 탐색한 후, 더 이상 갈 수 없을 때 백트래킹하여 다른 경로를 탐색합니다.
- **BFS**: 시작 노드에서 가까운 노드부터 순차적으로 탐색하며, 같은 레벨의 모든 노드를 방문한 후 다음 레벨로 진행합니다.

## DFS 구현 방법
DFS는 스택 자료구조를 사용하거나 재귀 호출을 통해 구현할 수 있습니다.

### 재귀를 사용한 DFS 구현
```python
def dfs_recursive(graph, node, visited):
    # 현재 노드를 방문 처리
    visited[node] = True
    print(node, end=' ')
    
    # 현재 노드와 연결된 노드들을 재귀적으로 방문
    for neighbor in graph[node]:
        if not visited[neighbor]:
            dfs_recursive(graph, neighbor, visited)
```

### 스택을 사용한 DFS 구현
```python
def dfs_iterative(graph, start):
    visited = [False] * len(graph)
    stack = [start]
    
    while stack:
        # 스택에서 노드를 꺼냄
        node = stack.pop()
        
        # 방문하지 않은 노드라면 방문 처리
        if not visited[node]:
            visited[node] = True
            print(node, end=' ')
            
            # 인접 노드를 스택에 삽입 (역순으로 삽입하여 작은 번호부터 방문)
            for neighbor in sorted(graph[node], reverse=True):
                if not visited[neighbor]:
                    stack.append(neighbor)
```

## BFS 구현 방법
BFS는 큐 자료구조를 사용하여 구현합니다.

```python
from collections import deque

def bfs(graph, start):
    visited = [False] * len(graph)
    queue = deque([start])
    visited[start] = True
    
    while queue:
        # 큐에서 노드를 꺼냄
        node = queue.popleft()
        print(node, end=' ')
        
        # 인접 노드 중 방문하지 않은 노드를 큐에 삽입
        for neighbor in graph[node]:
            if not visited[neighbor]:
                queue.append(neighbor)
                visited[neighbor] = True
```

## DFS와 BFS의 시간 및 공간 복잡도
- **시간 복잡도**: 두 알고리즘 모두 O(V + E)입니다. 여기서 V는 노드(Vertex)의 수, E는 간선(Edge)의 수입니다.
- **공간 복잡도**:
  - DFS: 재귀를 사용할 경우 O(H)의 공간이 필요합니다. 여기서 H는 그래프의 높이(최대 재귀 깊이)입니다. 최악의 경우 O(V)가 될 수 있습니다.
  - BFS: O(V)의 공간이 필요합니다. 최악의 경우 모든 노드가 큐에 들어갈 수 있기 때문입니다.

## DFS와 BFS의 용도 비교

### DFS가 유리한 경우
1. **경로 탐색**: 모든 가능한 경로를 탐색해야 할 때
2. **사이클 탐색**: 그래프 내의 사이클을 찾을 때
3. **백트래킹**: 모든 가능성을 시도해봐야 하는 문제
4. **위상 정렬**: 방향 그래프에서 노드 간의 순서를 결정할 때
5. **연결 요소**: 그래프의 연결 요소를 찾을 때

### BFS가 유리한 경우
1. **최단 경로**: 가중치 없는 그래프에서 최단 경로를 찾을 때
2. **레벨 순회**: 트리나 그래프를 레벨별로 탐색할 때
3. **최소 연산 수**: 최소한의 조작으로 목표 상태에 도달하는 문제
4. **네트워크 분석**: 소셜 네트워크에서 연결 관계 분석

## 면접 팁
- DFS와 BFS의 차이점과 각각 언제 사용하는 것이 적합한지 설명할 수 있어야 합니다.
- 각 알고리즘의 구현 방법을 코드로 작성할 수 있어야 합니다.
- 실제 문제에 어떤 알고리즘을 적용할지 판단하는 근거를 설명할 수 있어야 합니다.
- 시간 및 공간 복잡도를 분석할 수 있어야 합니다.

이 두 알고리즘은 많은 그래프 문제의 기초가 되며, 다양한 알고리즘 문제 해결에 활용됩니다.