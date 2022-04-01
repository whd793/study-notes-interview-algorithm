# 66. Plus One

def plus_one(digits):
    """Increment a non-negative integer represented as an array of digits by one.
    
    Args:
        digits: Array representing a non-negative integer
    
    Returns:
        Array representing the result of incrementing the input integer by one
    """
    n = len(digits)
    
    # Start from the least significant digit
    for i in range(n - 1, -1, -1):
        # If the current digit is less than 9, we can simply increment it and return
        if digits[i] < 9:
            digits[i] += 1
            return digits
        
        # Otherwise, set the current digit to 0 and continue to the next digit
        digits[i] = 0
    
    # If we get here, it means all digits were 9, so we need to add a leading 1
    return [1] + digits

# Test cases
print(plus_one([1, 2, 3]))        # [1, 2, 4]
print(plus_one([4, 3, 2, 1]))      # [4, 3, 2, 2]
print(plus_one([9]))              # [1, 0]
print(plus_one([9, 9, 9]))        # [1, 0, 0, 0]