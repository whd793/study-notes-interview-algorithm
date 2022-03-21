# 28. Find the Index of the First Occurrence in a String

def str_str(haystack, needle):
    """Find the index of the first occurrence of needle in haystack.
    
    Args:
        haystack: String to search in
        needle: String to search for
    
    Returns:
        Index of the first occurrence of needle in haystack, or -1 if not found
    """
    if not needle:
        return 0
    
    # Get the lengths of both strings
    m, n = len(haystack), len(needle)
    
    # Check all potential starting positions
    for i in range(m - n + 1):
        # Check if substring matches needle
        if haystack[i:i+n] == needle:
            return i
    
    # Needle not found
    return -1

# Alternative implementation using built-in method
def str_str_builtin(haystack, needle):
    return haystack.find(needle)

# Test cases
print(str_str("hello", "ll"))       # 2
print(str_str("aaaaa", "bba"))     # -1
print(str_str("", ""))             # 0