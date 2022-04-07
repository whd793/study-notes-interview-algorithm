# 67. Add Binary

def add_binary(a, b):
    """Add two binary strings.
    
    Args:
        a: First binary string
        b: Second binary string
    
    Returns:
        String representing the sum of a and b in binary
    """
    # Convert binary strings to integers, add them, then convert back to binary
    # The [2:] slice removes the '0b' prefix from Python's binary representation
    return bin(int(a, 2) + int(b, 2))[2:]

# Alternative implementation without built-in conversion
def add_binary_manual(a, b):
    result = ""
    # Start from the end of both strings
    i, j = len(a) - 1, len(b) - 1
    carry = 0
    
    # Process both strings from right to left
    while i >= 0 or j >= 0 or carry:
        # Get the current bits, or 0 if we've processed all bits
        bit_a = int(a[i]) if i >= 0 else 0
        bit_b = int(b[j]) if j >= 0 else 0
        
        # Calculate the sum and carry
        sum_val = bit_a + bit_b + carry
        result = str(sum_val % 2) + result  # Add the current bit to the result
        carry = sum_val // 2  # Update the carry
        
        # Move to the next bits
        i -= 1
        j -= 1
    
    return result

# Test cases
print(add_binary("11", "1"))       # "100"
print(add_binary("1010", "1011"))  # "10101"