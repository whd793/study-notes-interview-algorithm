# 69. Sqrt(x)

def my_sqrt(x):
    """Compute the square root of x, truncated to the nearest integer.
    
    Args:
        x: Non-negative integer
    
    Returns:
        Integer square root of x, truncated to the nearest integer
    """
    # Handle edge cases
    if x == 0 or x == 1:
        return x
    
    # Binary search for the square root
    left, right = 1, x
    while left <= right:
        mid = left + (right - left) // 2
        square = mid * mid
        
        if square == x:
            return mid
        elif square < x:
            left = mid + 1
        else:
            right = mid - 1
    
    # When the loop ends, 'right' will be the integer square root of x
    return right

# Alternative implementation using Newton's method
def my_sqrt_newton(x):
    if x == 0 or x == 1:
        return x
    
    r = x
    while r > x / r:
        r = (r + x / r) // 2
    
    return int(r)

# Test cases
print(my_sqrt(4))     # 2
print(my_sqrt(8))     # 2
print(my_sqrt(9))     # 3
print(my_sqrt(16))    # 4
print(my_sqrt(17))    # 4