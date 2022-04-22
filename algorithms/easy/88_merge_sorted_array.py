# 88. Merge Sorted Array

def merge(nums1, m, nums2, n):
    """Merge nums2 into nums1 as one sorted array.
    
    Args:
        nums1: Array with enough space to hold additional elements from nums2
        m: Number of elements in nums1
        nums2: Array to merge into nums1
        n: Number of elements in nums2
    """
    # Start from the end of both arrays
    p1 = m - 1  # Pointer for nums1
    p2 = n - 1  # Pointer for nums2
    p = m + n - 1  # Pointer for the merged array
    
    # While there are elements in both arrays
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1
    
    # If there are still elements in nums2, copy them to nums1
    # (No need to check for remaining elements in nums1, they're already in place)
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1

# Test cases
nums1 = [1, 2, 3, 0, 0, 0]
merge(nums1, 3, [2, 5, 6], 3)
print(nums1)  # [1, 2, 2, 3, 5, 6]

nums2 = [1]
merge(nums2, 1, [], 0)
print(nums2)  # [1]

nums3 = [0]
merge(nums3, 0, [1], 1)
print(nums3)  # [1]