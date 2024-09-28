# 프로그래머스: 디스크 컨트롤러 문제에 대한 인터뷰 답변

## 문제 설명
하드디스크는 한 번에 하나의 작업만 수행할 수 있습니다. 각 작업은 [작업이 요청되는 시점, 작업의 소요시간]을 담은 2차원 배열 jobs로 주어질 때, 작업의 요청부터 종료까지 걸린 시간의 평균을 가장 줄이는 방법으로 처리하면 평균이 얼마가 되는지 return 하는 문제입니다.

## 접근 방법
이 문제는 SJF(Shortest Job First) 스케줄링 알고리즘을 구현하는 문제입니다. 현재 시점에서 수행 가능한 작업들 중 소요시간이 가장 짧은 작업을 먼저 처리하면 평균 대기 시간을 최소화할 수 있습니다.

알고리즘의 핵심 아이디어는 다음과 같습니다:
1. 작업들을 요청 시간 기준으로 정렬합니다.
2. 현재 시점에서 처리할 수 있는 모든 작업을 우선순위 큐(최소 힙)에 넣습니다.
3. 우선순위 큐에서 소요시간이 가장 짧은 작업을 꺼내 처리합니다.
4. 모든 작업이 처리될 때까지 2-3을 반복합니다.

## 코드 구현
```python
import heapq

def solution(jobs):
    # 요청 시간 기준으로 정렬
    jobs.sort()
    
    # 현재 시간, 총 대기 시간, 처리된 작업 수 초기화
    current_time = 0
    total_waiting_time = 0
    processed_jobs = 0
    job_index = 0
    heap = []  # 우선순위 큐 (최소 힙) length = len(jobs)
    
    # 모든 작업이 처리될 때까지 반복
    while processed_jobs < length:
        # 현재 시간에 요청된 모든 작업을 힙에 추가
        while job_index < length and jobs[job_index][0] <= current_time:
            # (소요시간, 요청시간) 형태로 힙에 추가 (소요시간 기준 최소 힙)
            heapq.heappush(heap, (jobs[job_index][1], jobs[job_index][0]))
            job_index += 1
        
        if heap:
            # 소요시간이 가장 짧은 작업 처리
            duration, request_time = heapq.heappop(heap)
            
            # 현재 시간 갱신
            current_time += duration
            
            # 대기 시간 계산 및 총 대기 시간에 추가
            # (대기 시간 = 현재 시간(작업 완료 시간) - 요청 시간)
            waiting_time = current_time - request_time
            total_waiting_time += waiting_time
            
            processed_jobs += 1
        else:
            # 처리할 수 있는 작업이 없으면 다음 작업 요청 시간으로 이동
            if job_index < length:
                current_time = jobs[job_index][0]
            else:
                break
    
    # 평균 대기 시간 계산 및 반환
    return total_waiting_time // length
```

## 시간 및 공간 복잡도
- 시간 복잡도: O(n log n) - 정렬에 O(n log n), 힙 연산이 각 작업마다 O(log n)이므로 총 O(n log n)입니다.
- 공간 복잡도: O(n) - 최악의 경우 모든 작업이 힙에 저장될 수 있습니다.

## 엣지 케이스 처리
- 빈 배열: 작업이 없으므로 평균 대기 시간은 0입니다.
- 작업이 한 개인 경우: 해당 작업의 소요시간이 대기 시간이 됩니다.
- 모든 작업이 동시에 요청되는 경우: 순수하게 SJF 스케줄링만 적용하면 됩니다.
- 작업 사이에 유휴 시간이 있는 경우: 현재 시간을 다음 작업 요청 시간으로 점프해야 합니다.

## 최적화 고려사항
현재 알고리즘은 이미 최적화되어 있습니다. SJF 스케줄링은 평균 대기 시간을 최소화하는 최적의 알고리즘입니다.

## 면접 팁
이 문제는 운영체제의 CPU 스케줄링 알고리즘 중 하나인 SJF를 구현하는 문제입니다. 면접에서는 다음 포인트를 강조하면 좋습니다:
1. SJF 알고리즘의 특성과 왜 평균 대기 시간을 최소화하는지
2. 우선순위 큐(힙)를 사용하는 이유와 효율성
3. 유휴 시간 처리 방법
4. 실제 운영체제에서는 미래의 작업 시간을 예측할 수 없어 SJF를 완벽히 구현할 수 없지만, 이 문제에서는 모든 정보가 주어지므로 가능하다는 점

이런 스케줄링 문제는 그리디 알고리즘의 이해도와 우선순위 큐 활용 능력을 평가하는 좋은 문제입니다.