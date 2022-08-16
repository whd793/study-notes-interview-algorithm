# 3. Longest Substring Without Repeating Characters

def length_of_longest_substring(s):
    """Find the length of the longest substring without repeating characters.
    
    Args:
        s: String to process
    
    Returns:
        Length of the longest substring without repeating characters
    """
    # Edge case: empty string
    if not s:
        return 0
    
    # Dictionary to store the last position of each character
    char_position = {}
    
    # Initialize variables to track the current substring
    start = 0
    max_length = 0
    
    # Iterate through the string
    for i, char in enumerate(s):
        # If the character is already in the current substring,
        # update the start position to exclude the previous occurrence
        if char in char_position and start <= char_position[char]:
            start = char_position[char] + 1
        else:
            # Update max_length if the current substring is longer
            max_length = max(max_length, i - start + 1)
        
        # Update the last position of the character
        char_position[char] = i
    
    return max_length

# Test cases
print(length_of_longest_substring("abcabcbb"))  # 3 ("abc")
print(length_of_longest_substring("bbbbb"))     # 1 ("b")
print(length_of_longest_substring("pwwkew"))    # 3 ("wke")
print(length_of_longest_substring(""))          # 0 (empty string)