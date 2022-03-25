# 35. Search Insert Position

def search_insert(nums, target):
    """Find the index where target is found, or where it would be inserted in order.
    
    Args:
        nums: Sorted array of distinct integers
        target: Target value to find or insert
    
    Returns:
        Index where target is found, or where it would be inserted in order
    """
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    # If target is not found, 'left' will be the position where it should be inserted
    return left

# Test cases
print(search_insert([1, 3, 5, 6], 5))      # 2
print(search_insert([1, 3, 5, 6], 2))      # 1
print(search_insert([1, 3, 5, 6], 7))      # 4
print(search_insert([1, 3, 5, 6], 0))      # 0