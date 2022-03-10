# 26. Remove Duplicates from Sorted Array

def remove_duplicates(nums):
    """Remove duplicates from a sorted array in-place.
    
    Args:
        nums: List of sorted integers
    
    Returns:
        Integer k, the number of unique elements in nums
        The first k elements of nums should contain the unique elements in order
    """
    if not nums:
        return 0
    
    # Initialize the pointer for unique elements
    i = 0
    
    # Iterate through the array
    for j in range(1, len(nums)):
        # If the current element is different from the previous unique element
        if nums[j] != nums[i]:
            # Move the unique pointer forward
            i += 1
            # Update the element at the unique pointer position
            nums[i] = nums[j]
    
    # Return the length of the array with unique elements (i + 1)
    return i + 1

# Test cases
nums1 = [1, 1, 2]
k1 = remove_duplicates(nums1)
print(k1, nums1[:k1])  # 2, [1, 2]

nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
k2 = remove_duplicates(nums2)
print(k2, nums2[:k2])  # 5, [0, 1, 2, 3, 4]