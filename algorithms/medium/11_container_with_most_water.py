# 11. Container With Most Water

def max_area(height):
    """Find the maximum area that can be contained between two vertical lines.
    
    Args:
        height: List of integers representing heights of vertical lines
    
    Returns:
        Maximum water area that can be contained
    """
    # Initialize two pointers at the ends of the array
    left = 0
    right = len(height) - 1
    max_water = 0
    
    # Move the pointers inward until they meet
    while left < right:
        # Calculate the width between the lines
        width = right - left
        
        # The amount of water is limited by the shorter line
        water = width * min(height[left], height[right])
        
        # Update the maximum water area
        max_water = max(max_water, water)
        
        # Move the pointer pointing to the shorter line inward
        # This is because moving the pointer with the taller line would only decrease the area
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water

# Test cases
print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49 (between heights 8 and 7)
print(max_area([1, 1]))                        # 1 (between heights 1 and 1)
print(max_area([4, 3, 2, 1, 4]))               # 16 (between heights 4 and 4)
print(max_area([1, 2, 1]))                     # 2 (between heights 1 and 1)