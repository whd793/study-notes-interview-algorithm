# 그래프 알고리즘에 대한 인터뷰 답변

## 그래프란?
그래프는 정점(Vertex)와 간선(Edge)으로 구성된 자료구조로, 다양한 관계와 연결을 표현할 수 있습니다. 그래프는 방향성 유무(유향/무향), 가중치 유무, 사이클 유무 등에 따라 여러 종류로 나뉩니다.

## 그래프 표현 방법

### 1. 인접 행렬(Adjacency Matrix)
정점 간의 연결 관계를 2차원 배열로 표현합니다.

```python
# n개의 정점이 있는 그래프의 인접 행렬 표현
adjacency_matrix = [[0 for _ in range(n)] for _ in range(n)]

# 정점 i와 j 사이에 간선 추가 (무향 그래프)
adjacency_matrix[i][j] = 1
adjacency_matrix[j][i] = 1

# 가중치가 있는 그래프
adjacency_matrix[i][j] = weight
```

- **장점**: 구현이 간단하고, 두 정점 간 연결 확인이 O(1)로 빠릅니다.
- **단점**: 공간 복잡도가 O(V²)로 높고, 희소 그래프(간선이 적은 그래프)에서 비효율적입니다.

### 2. 인접 리스트(Adjacency List)
각 정점에 연결된 정점들을 리스트로 표현합니다.

```python
# n개의 정점이 있는 그래프의 인접 리스트 표현
adjacency_list = [[] for _ in range(n)]

# 정점 i와 j 사이에 간선 추가 (무향 그래프)
adjacency_list[i].append(j)
adjacency_list[j].append(i)

# 가중치가 있는 그래프
adjacency_list[i].append((j, weight))
```

- **장점**: 공간 복잡도가 O(V+E)로 효율적이고, 희소 그래프에 적합합니다.
- **단점**: 두 정점 간 연결 확인이 O(V) 시간이 걸릴 수 있습니다.

## 주요 그래프 알고리즘

### 1. 깊이 우선 탐색(DFS)
스택 또는 재귀를 사용하여 그래프를 탐색하는 알고리즘입니다. 한 경로를 깊게 탐색한 후 다른 경로로 이동합니다.

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start, end=' ')
    
    for next_node in graph[start]:
        if next_node not in visited:
            dfs(graph, next_node, visited)
```

- **시간 복잡도**: O(V+E)
- **공간 복잡도**: O(V)
- **활용**: 경로 탐색, 사이클 탐지, 위상 정렬, 연결 요소 찾기

### 2. 너비 우선 탐색(BFS)
큐를 사용하여 그래프를 탐색하는 알고리즘입니다. 시작점에서 가까운 노드부터 탐색합니다.

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        vertex = queue.popleft()
        print(vertex, end=' ')
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

- **시간 복잡도**: O(V+E)
- **공간 복잡도**: O(V)
- **활용**: 최단 경로(무가중치), 레벨별 탐색, 연결 요소 찾기

### 3. 다익스트라 알고리즘(Dijkstra's Algorithm)
가중치가 있는 그래프에서 한 정점에서 다른 모든 정점까지의 최단 경로를 찾는 알고리즘입니다.

```python
import heapq

def dijkstra(graph, start):
    # 거리 초기화
    distances = {node: float('inf') for node in range(len(graph))}
    distances[start] = 0
    priority_queue = [(0, start)]  # (거리, 노드)
    
    while priority_queue:
        current_distance, current_node = heapq.heappop(priority_queue)
        
        # 현재 거리가 기록된 거리보다 크면 무시
        if current_distance > distances[current_node]:
            continue
        
        # 인접 노드 탐색
        for neighbor, weight in graph[current_node]:
            distance = current_distance + weight
            
            # 더 짧은 경로를 찾으면 갱신
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))
    
    return distances
```

- **시간 복잡도**: O((V+E)logV) - 우선순위 큐 사용 시
- **공간 복잡도**: O(V)
- **제약**: 음수 가중치 간선이 없어야 합니다.

### 4. 벨만-포드 알고리즘(Bellman-Ford Algorithm)
음수 가중치가 있는 그래프에서도 사용 가능한 최단 경로 알고리즘입니다. 음수 사이클도 감지할 수 있습니다.

```python
def bellman_ford(graph, start, n):
    # 거리 초기화
    distances = [float('inf')] * n
    distances[start] = 0
    
    # 최대 n-1번 반복 (최단 경로의 최대 간선 수)
    for _ in range(n-1):
        for u, v, w in graph:  # 간선 리스트 (시작, 도착, 가중치)
            if distances[u] != float('inf') and distances[u] + w < distances[v]:
                distances[v] = distances[u] + w
    
    # 음수 사이클 감지
    for u, v, w in graph:
        if distances[u] != float('inf') and distances[u] + w < distances[v]:
            return None  # 음수 사이클 존재
    
    return distances
```

- **시간 복잡도**: O(VE)
- **공간 복잡도**: O(V)
- **활용**: 음수 가중치 간선이 있는 그래프의 최단 경로, 음수 사이클 감지

### 5. 플로이드-워셜 알고리즘(Floyd-Warshall Algorithm)
모든 정점 쌍 간의 최단 경로를 구하는 알고리즘입니다.

```python
def floyd_warshall(graph):
    n = len(graph)
    distances = [row[:] for row in graph]  # 그래프 복사
    
    # k를 거쳐가는 경로 고려
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if distances[i][k] + distances[k][j] < distances[i][j]:
                    distances[i][j] = distances[i][k] + distances[k][j]
    
    return distances
```

- **시간 복잡도**: O(V³)
- **공간 복잡도**: O(V²)
- **활용**: 모든 정점 간 최단 경로, 경로 복원

### 6. 크루스칼 알고리즘(Kruskal's Algorithm)
최소 신장 트리(MST)를 찾는 알고리즘으로, 간선을 가중치 순으로 정렬한 후 사이클을 형성하지 않는 간선을 선택합니다.

```python
def kruskal(graph, n):
    # 간선을 가중치 순으로 정렬
    edges = sorted(graph, key=lambda x: x[2])  # (u, v, weight)
    parent = list(range(n))
    
    # 유니온-파인드 헬퍼 함수
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        parent[find(x)] = find(y)
    
    mst = []
    for u, v, w in edges:
        if find(u) != find(v):  # 사이클이 형성되지 않음
            union(u, v)
            mst.append((u, v, w))
    
    return mst
```

- **시간 복잡도**: O(ElogE) - 간선 정렬에 의해 주로 결정됨
- **공간 복잡도**: O(V+E)
- **활용**: 최소 신장 트리, 네트워크 설계

### 7. 위상 정렬(Topological Sort)
방향 그래프에서 노드를 선형으로 정렬하여 모든 간선 (u, v)에 대해 u가 v보다 먼저 오도록 하는 알고리즘입니다.

```python
from collections import deque

def topological_sort(graph):
    n = len(graph)
    in_degree = [0] * n
    
    # 진입 차수 계산
    for i in range(n):
        for j in graph[i]:
            in_degree[j] += 1
    
    # 진입 차수가 0인 노드부터 시작
    queue = deque([i for i in range(n) if in_degree[i] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # 사이클이 있으면 결과 길이가 n이 아님
    return result if len(result) == n else None
```

- **시간 복잡도**: O(V+E)
- **공간 복잡도**: O(V)
- **활용**: 작업 스케줄링, 선수 과목 순서 결정, 의존성 해결

## 면접 팁
- 그래프 알고리즘은 알고리즘 면접에서 매우 중요한 주제입니다.
- 인접 행렬과 인접 리스트의 장단점을 이해하고 적절히 선택할 수 있어야 합니다.
- DFS와 BFS의 차이점과 각각 어떤 상황에 적합한지 설명할 수 있어야 합니다.
- 최단 경로 알고리즘(다익스트라, 벨만-포드, 플로이드-워셜)의 차이점을 이해해야 합니다.
- 그래프 문제를 접했을 때, 어떤 알고리즘이 적합한지 판단하는 능력이 중요합니다.