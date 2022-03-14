# 27. Remove Element

def remove_element(nums, val):
    """Remove all occurrences of val in nums in-place.
    
    Args:
        nums: List of integers
        val: Value to remove
    
    Returns:
        Integer k, the number of elements not equal to val
        The first k elements of nums should contain these elements
    """
    # Initialize the pointer for elements not equal to val
    i = 0
    
    # Iterate through the array
    for j in range(len(nums)):
        # If the current element is not equal to val
        if nums[j] != val:
            # Place it at the position indicated by the pointer
            nums[i] = nums[j]
            # Increment the pointer
            i += 1
    
    # Return the length of the array without val elements
    return i

# Test cases
nums1 = [3, 2, 2, 3]
val1 = 3
k1 = remove_element(nums1, val1)
print(k1, nums1[:k1])  # 2, [2, 2]

nums2 = [0, 1, 2, 2, 3, 0, 4, 2]
val2 = 2
k2 = remove_element(nums2, val2)
print(k2, nums2[:k2])  # 5, [0, 1, 3, 0, 4]