# 13. Roman to Integer

def roman_to_int(s):
    """Convert a Roman numeral to an integer.
    
    Args:
        s: String representing a Roman numeral
    
    Returns:
        Integer value of the Roman numeral
    """
    # Map each Roman numeral to its value
    roman_map = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    
    result = 0
    prev_value = 0
    
    # Traverse the string from right to left
    for char in reversed(s):
        current_value = roman_map[char]
        
        # If current value is greater than or equal to previous value, add it
        # Otherwise, subtract it (for cases like IV, IX, etc.)
        if current_value >= prev_value:
            result += current_value
        else:
            result -= current_value
        
        prev_value = current_value
    
    return result

# Test cases
print(roman_to_int("III"))     # 3
print(roman_to_int("LVIII"))   # 58
print(roman_to_int("MCMXCIV")) # 1994