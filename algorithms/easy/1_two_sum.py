# 1. Two Sum

def two_sum(nums, target):
    """Find two numbers that add up to target.
    
    Args:
        nums: List of integers
        target: Integer target sum
    
    Returns:
        List of two indices whose values sum to target
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test cases
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]
print(two_sum([3, 3], 6))          # [0, 1]