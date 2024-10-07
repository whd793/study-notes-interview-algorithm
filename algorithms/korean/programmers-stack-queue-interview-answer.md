# 프로그래머스: 스택/큐 문제에 대한 인터뷰 답변

## 기능개발 문제 분석 및 해결

### 문제 설명
프로그래머스 팀에서는 기능 개선 작업을 수행 중입니다. 각 기능은 진도가 100%일 때 서비스에 반영할 수 있습니다. 각 기능의 개발속도는 모두 다르기 때문에 뒤에 있는 기능이 앞에 있는 기능보다 먼저 개발될 수 있고, 이때 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포됩니다.

먼저 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses와 각 작업의 개발 속도가 적힌 정수 배열 speeds가 주어질 때, 각 배포마다 몇 개의 기능이 배포되는지를 return 하도록 solution 함수를 완성하세요.

### 접근 방법
이 문제는 큐(Queue)를 활용하여 해결할 수 있습니다. 핵심 아이디어는 다음과 같습니다:

1. 각 기능이 완료되는데 필요한 일수를 계산합니다.
2. 앞에서부터 순서대로 기능을 확인하면서, 앞 기능이 배포되기 전까지 완료된 뒤의 기능들을 함께 배포합니다.

### 코드 구현
```python
def solution(progresses, speeds):
    answer = []
    time = 0  # 현재 날짜
    count = 0  # 오늘 배포할 기능 수
    
    for i in range(len(progresses)):
        # 현재 기능이 완료되는데 필요한 시간 계산
        # (100 - 현재 진도) / 개발 속도, 올림 처리
        days_needed = (100 - progresses[i] + speeds[i] - 1) // speeds[i]
        
        # 현재 기능이 이전 기능보다 더 늦게 완료되는 경우
        if days_needed > time:
            # 이전에 카운트된 기능이 있으면 결과에 추가
            if count > 0:
                answer.append(count)
            # 새로운 날짜와 카운트 설정
            time = days_needed
            count = 1
        else:  # 현재 기능이 이미 완료되었거나 이전 기능과 같은 날 완료되는 경우
            count += 1
    
    # 마지막 배포 추가
    if count > 0:
        answer.append(count)
    
    return answer
```

### 시간 및 공간 복잡도
- **시간 복잡도**: O(n) - 각 기능을 한 번씩 순회합니다.
- **공간 복잡도**: O(n) - 최악의 경우 모든 기능이 개별적으로 배포되어 n개의 배포가 발생할 수 있습니다.

### 다른 접근법: 큐 자료구조 명시적 사용
```python
from collections import deque

def solution_with_queue(progresses, speeds):
    answer = []
    # 각 기능의 완료까지 필요한 일수 계산
    days_left = [(100 - p) // s + (1 if (100 - p) % s > 0 else 0) for p, s in zip(progresses, speeds)]
    queue = deque(days_left)
    
    while queue:
        # 첫 번째 기능 배포에 필요한 일수
        day = queue.popleft()
        count = 1
        
        # 함께 배포될 수 있는 기능 확인
        while queue and queue[0] <= day:
            queue.popleft()
            count += 1
        
        answer.append(count)
    
    return answer
```

### 핵심 고려사항 및 최적화
- 배포는 앞에서부터 순서대로 이루어지므로, 앞 기능이 완료되기 전까지 뒤 기능은 배포될 수 없습니다.
- 기능 완료 시간 계산 시 올림 처리가 필요합니다. Python에서는 음수 제외 올림 나눗셈을 `(a + b - 1) // b`로 구현할 수 있습니다.
- 코드를 더 간결하게 만들기 위해 math.ceil() 함수를 사용할 수도 있습니다.

### 면접 팁
이 문제는 스택/큐의 개념을 이해하고 있는지 테스트합니다. 면접에서는 다음 사항을 강조하면 좋습니다:
1. 문제를 어떻게 큐의 특성(FIFO)과 연결시켰는지
2. 기능 완료 시간 계산 방법과 올림 처리의 중요성
3. 배포 순서와 동시 배포 조건의 이해
4. 시간 및 공간 복잡도 분석

실제 코딩 테스트에서는 이해하기 쉬운 코드와 명확한 변수명을 사용하는 것도 중요합니다.