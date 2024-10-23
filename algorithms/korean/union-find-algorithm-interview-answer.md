# 유니온-파인드(Union-Find) 알고리즘에 대한 인터뷰 답변

## 유니온-파인드란?
유니온-파인드(또는 분리 집합, Disjoint Set)는 여러 개의 원소가 있을 때, 각 원소가 어떤 집합에 속해 있는지를 관리하는 자료구조입니다. 주로 두 가지 연산을 지원합니다:

1. **유니온(Union)**: 두 원소가 속한 집합을 합치는 연산
2. **파인드(Find)**: 특정 원소가 속한 집합을 찾는 연산

## 기본 구현
유니온-파인드는 보통 배열이나 리스트를 사용하여 구현합니다. 각 원소의 부모를 저장하는 방식으로 집합을 표현합니다.

```python
class UnionFind:
    def __init__(self, n):
        # 각 원소의 부모를 자기 자신으로 초기화
        self.parent = list(range(n))
    
    # x가 속한 집합의 대표 원소(루트)를 찾는 함수
    def find(self, x):
        if self.parent[x] != x:
            # 루트를 찾을 때까지 재귀적으로 탐색
            self.parent[x] = self.find(self.parent[x])  # 경로 압축
        return self.parent[x]
    
    # x와 y가 속한 집합을 합치는 함수
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x != root_y:
            self.parent[root_y] = root_x  # y의 루트를 x의 루트 아래에 배치
```

## 최적화 기법

### 1. 경로 압축(Path Compression)
파인드 연산 시 거쳐간 모든 노드가 직접 루트를 가리키도록 설정하여 트리의 깊이를 줄입니다.

```python
def find(self, x):
    if self.parent[x] != x:
        self.parent[x] = self.find(self.parent[x])  # 경로 압축
    return self.parent[x]
```

### 2. 랭크 기반 합치기(Union by Rank)
두 집합을 합칠 때, 더 작은 트리를 더 큰 트리 아래에 붙여 트리의 깊이 증가를 최소화합니다.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n  # 각 노드의 랭크(트리의 높이 근사값)
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return
        
        # 랭크가 작은 트리를 랭크가 큰 트리 아래에 붙임
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        else:
            self.parent[root_y] = root_x
            if self.rank[root_x] == self.rank[root_y]:
                self.rank[root_x] += 1  # 동일한 랭크일 경우 랭크 증가
```

## 시간 복잡도
- **초기화**: O(n)
- **파인드(최악)**: O(n) - 모든 노드가 일렬로 연결된 경우
- **파인드(평균)**: O(log n) - 일반적인 트리 구조
- **파인드(최적화 후)**: O(α(n)) - 경로 압축과 랭크 기반 합치기 적용 시, α(n)은 아커만 함수의 역함수로 실질적으로 상수 시간
- **유니온**: O(α(n)) - 내부적으로 파인드 연산을 사용

## 공간 복잡도
- O(n) - n개의 원소에 대한 부모 정보와 랭크 정보 저장

## 유니온-파인드 활용 예시

### 1. 사이클 감지(무방향 그래프)
그래프에 사이클이 있는지 확인하는 알고리즘입니다. 모든 간선에 대해 두 정점이 이미 같은 집합에 속해 있다면 사이클이 존재합니다.

```python
def has_cycle(edges, n):
    uf = UnionFind(n)
    
    for u, v in edges:
        # 두 정점이 이미 같은 집합에 속해 있다면 사이클 발견
        if uf.find(u) == uf.find(v):
            return True
        uf.union(u, v)
    
    return False
```

### 2. 크루스칼 알고리즘(Kruskal's Algorithm)
최소 신장 트리(MST)를 찾는 알고리즘으로, 유니온-파인드를 활용합니다.

```python
def kruskal(edges, n):
    # 간선을 가중치 기준으로 정렬
    edges.sort(key=lambda x: x[2])  # [u, v, weight]
    
    uf = UnionFind(n)
    mst = []
    
    for u, v, weight in edges:
        # 사이클을 형성하지 않는 간선만 선택
        if uf.find(u) != uf.find(v):
            uf.union(u, v)
            mst.append((u, v, weight))
    
    return mst
```

### 3. 네트워크 연결 문제
여러 컴퓨터가 있을 때, 모든 컴퓨터가 서로 통신 가능한지 확인하는 문제입니다.

```python
def is_connected(connections, n):
    uf = UnionFind(n)
    
    for u, v in connections:
        uf.union(u, v)
    
    # 모든 컴퓨터가 같은 집합에 속하는지 확인
    root = uf.find(0)
    for i in range(1, n):
        if uf.find(i) != root:
            return False
    
    return True
```

## 면접 팁
- 유니온-파인드의 기본 원리와 두 가지 주요 연산(유니온, 파인드)을 명확히 설명할 수 있어야 합니다.
- 경로 압축과 랭크 기반 합치기 최적화 기법의 필요성과 효과를 이해하고 있어야 합니다.
- 시간 복잡도 분석 시 아커만 함수의 역함수(α(n))가 실질적으로 상수 시간임을 언급하면 좋습니다.
- 유니온-파인드를 활용한 문제(사이클 감지, 최소 신장 트리, 네트워크 연결 등)를 해결할 수 있어야 합니다.
- 유니온-파인드 외에 동일한 문제를 해결할 수 있는 다른 알고리즘(예: DFS/BFS를 이용한 사이클 감지)과 비교하여 각각의 장단점을 설명할 수 있으면 좋습니다.