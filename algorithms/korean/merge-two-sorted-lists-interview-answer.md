# Merge Two Sorted Lists(두 정렬 리스트 병합) 문제에 대한 인터뷰 답변

## 문제 설명
두 개의 정렬된 연결 리스트(Linked List)가 주어졌을 때, 이 두 리스트를 하나의 정렬된 리스트로 병합하는 문제입니다. 새로운 리스트의 노드들은 원래 두 리스트의 노드들을 재배치하여 만들어야 합니다.

## 접근 방법
이 문제는 두 가지 방법으로 접근할 수 있습니다:

1. **반복적(Iterative) 접근법**: 두 리스트를 순회하면서 더 작은 값을 가진 노드를 새 리스트에 추가합니다.
2. **재귀적(Recursive) 접근법**: 각 단계에서 두 리스트의 헤드 값을 비교하고, 더 작은 값을 가진 노드를 선택한 후 나머지 리스트에 대해 재귀적으로 함수를 호출합니다.

여기서는 좀 더 직관적인 반복적 접근법을 설명하겠습니다.

## 코드 구현 (반복적 접근법)
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    # 더미 헤드 노드 생성 (결과 리스트의 시작점을 쉽게 추적하기 위함)
    dummy = ListNode(0)
    # 현재 노드 포인터
    current = dummy
    
    # 두 리스트 모두 끝에 도달할 때까지 반복
    while l1 and l2:
        # 두 노드의 값을 비교하여 더 작은 값을 가진 노드를 결과 리스트에 추가
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        # 현재 포인터 이동
        current = current.next
    
    # 남은 노드 처리 (한 리스트가 먼저 끝났을 경우)
    current.next = l1 if l1 else l2
    
    # 더미 노드 다음 노드부터 시작하는 결과 리스트 반환
    return dummy.next
```

## 시간 및 공간 복잡도
- 시간 복잡도: O(n + m) - 여기서 n과 m은 각각 두 리스트의 길이입니다. 모든 노드를 한 번씩 방문합니다.
- 공간 복잡도: O(1) - 추가 노드를 생성하지 않고 기존 노드들을 재배열하므로 상수 공간만 사용합니다.

## 재귀적 접근법
재귀적 접근법에서는 각 단계에서 두 리스트의 헤드를 비교하고, 더 작은 값을 가진 노드를 선택한 후 나머지 리스트에 대해 재귀적으로 함수를 호출합니다.

```python
def merge_two_lists_recursive(l1, l2):
    # 기저 조건: 한 리스트가 비어있으면 다른 리스트 반환
    if not l1: return l2
    if not l2: return l1
    
    # 두 노드의 값을 비교
    if l1.val <= l2.val:
        l1.next = merge_two_lists_recursive(l1.next, l2)
        return l1
    else:
        l2.next = merge_two_lists_recursive(l1, l2.next)
        return l2
```

## 엣지 케이스 처리
- 한 리스트가 비어있는 경우: 다른 리스트를 그대로 반환합니다.
- 두 리스트 모두 비어있는 경우: None을 반환합니다.

이 문제는 연결 리스트의 기본 조작과 병합 정렬의 병합 단계를 이해하고 있는지 테스트합니다. 면접에서는 두 가지 접근법을 설명하고, 각각의 장단점을 논의할 수 있으면 좋습니다.