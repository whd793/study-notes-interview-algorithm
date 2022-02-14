# 9. Palindrome Number

def is_palindrome(x):
    """Determine if an integer is a palindrome.
    
    A palindrome reads the same forwards and backwards.
    
    Args:
        x: Integer to check
    
    Returns:
        Boolean indicating if x is a palindrome
    """
    # Negative numbers are not palindromes
    if x < 0:
        return False
    
    # Convert to string and check if it equals its reverse
    return str(x) == str(x)[::-1]

# Alternative solution without converting to string
def is_palindrome_math(x):
    if x < 0 or (x % 10 == 0 and x != 0):
        return False
    
    reversed_num = 0
    while x > reversed_num:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    
    # When length is odd, we need to remove the middle digit
    return x == reversed_num or x == reversed_num // 10

# Test cases
print(is_palindrome(121))   # True
print(is_palindrome(-121))  # False
print(is_palindrome(10))    # False