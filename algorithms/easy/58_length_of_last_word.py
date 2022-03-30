# 58. Length of Last Word

def length_of_last_word(s):
    """Return the length of the last word in a string.
    
    Args:
        s: String containing words and spaces
    
    Returns:
        Length of the last word
    """
    # Remove trailing and leading spaces, then split by spaces
    words = s.strip().split()
    
    # If there are no words, return 0
    if not words:
        return 0
    
    # Return the length of the last word
    return len(words[-1])

# Alternative implementation without using split
def length_of_last_word_alt(s):
    s = s.strip()  # Remove trailing and leading spaces
    length = 0
    
    # Start from the end and count characters until a space is encountered
    for i in range(len(s) - 1, -1, -1):
        if s[i] == ' ':
            break
        length += 1
    
    return length

# Test cases
print(length_of_last_word("Hello World"))         # 5
print(length_of_last_word("   fly me   to   the moon  "))  # 4
print(length_of_last_word("luffy is still joyboy"))  # 6