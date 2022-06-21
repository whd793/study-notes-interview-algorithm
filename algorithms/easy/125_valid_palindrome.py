# 125. Valid Palindrome

def is_palindrome(s):
    """Determine if a string is a palindrome, considering only alphanumeric characters.
    
    A palindrome reads the same backward as forward.
    
    Args:
        s: String to check
    
    Returns:
        Boolean indicating if the string is a palindrome
    """
    # Convert to lowercase and filter out non-alphanumeric characters
    filtered_chars = [c.lower() for c in s if c.isalnum()]
    
    # Check if the filtered string is equal to its reverse
    return filtered_chars == filtered_chars[::-1]

# Alternative implementation using two pointers
def is_palindrome_two_pointers(s):
    # Convert to lowercase and filter out non-alphanumeric characters
    filtered_chars = [c.lower() for c in s if c.isalnum()]
    
    # Use two pointers to compare characters from both ends
    left, right = 0, len(filtered_chars) - 1
    
    while left < right:
        if filtered_chars[left] != filtered_chars[right]:
            return False
        left += 1
        right -= 1
    
    return True

# More efficient implementation without creating a new list
def is_palindrome_efficient(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric characters from the left
        while left < right and not s[left].isalnum():
            left += 1
        
        # Skip non-alphanumeric characters from the right
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True

# Test cases
print(is_palindrome("A man, a plan, a canal: Panama"))  # True
print(is_palindrome("race a car"))                     # False
print(is_palindrome(" "))                              # True

print(is_palindrome_two_pointers("A man, a plan, a canal: Panama"))  # True
print(is_palindrome_efficient("A man, a plan, a canal: Panama"))     # True