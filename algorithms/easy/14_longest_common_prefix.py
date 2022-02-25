# 14. Longest Common Prefix

def longest_common_prefix(strs):
    """Find the longest common prefix among an array of strings.
    
    Args:
        strs: List of strings
    
    Returns:
        Longest common prefix string
    """
    if not strs:
        return ""
    
    # Sort the array (this brings the shortest and alphabetically smallest strings to the front)
    strs.sort()
    
    # Take the first and last strings in the sorted array
    first = strs[0]
    last = strs[-1]
    
    # Find the common prefix between these two strings
    # This will be the common prefix for all strings
    common_length = 0
    for i in range(min(len(first), len(last))):
        if first[i] != last[i]:
            break
        common_length += 1
    
    return first[:common_length]

# Test cases
print(longest_common_prefix(["flower", "flow", "flight"]))  # "fl"
print(longest_common_prefix(["dog", "racecar", "car"]))    # ""