# 5. Longest Palindromic Substring

def longest_palindrome(s):
    """Find the longest palindromic substring in s.
    
    Args:
        s: String to process
    
    Returns:
        Longest palindromic substring
    """
    if not s:
        return ""
    
    # Initialize variables to track the longest palindrome
    start = 0
    max_length = 1
    
    # Helper function to expand around center
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1  # Length of palindrome
    
    # Iterate through the string
    for i in range(len(s)):
        # Expand around center (odd length palindrome)
        len1 = expand_around_center(i, i)
        
        # Expand around center (even length palindrome)
        len2 = expand_around_center(i, i + 1)
        
        # Get the maximum length from both expansions
        length = max(len1, len2)
        
        # Update start and max_length if a longer palindrome is found
        if length > max_length:
            max_length = length
            start = i - (length - 1) // 2
    
    return s[start:start + max_length]

# Dynamic programming approach
def longest_palindrome_dp(s):
    if not s:
        return ""
    
    n = len(s)
    # Initialize a table to store palindrome status
    # dp[i][j] is True if substring s[i:j+1] is a palindrome
    dp = [[False] * n for _ in range(n)]
    
    # All substrings of length 1 are palindromes
    for i in range(n):
        dp[i][i] = True
    
    start = 0
    max_length = 1
    
    # Check substrings of length 2
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            start = i
            max_length = 2
    
    # Check substrings of length 3 and more
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1  # ending index
            
            # Check if substring s[i+1:j] is a palindrome and s[i] == s[j]
            if dp[i + 1][j - 1] and s[i] == s[j]:
                dp[i][j] = True
                if length > max_length:
                    start = i
                    max_length = length
    
    return s[start:start + max_length]

# Test cases
print(longest_palindrome("babad"))  # "bab" or "aba"
print(longest_palindrome("cbbd"))   # "bb"
print(longest_palindrome("a"))      # "a"
print(longest_palindrome("ac"))     # "a"

print(longest_palindrome_dp("babad"))  # "bab" or "aba"
print(longest_palindrome_dp("cbbd"))   # "bb"