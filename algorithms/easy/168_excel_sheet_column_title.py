# 168. Excel Sheet Column Title

def convert_to_title(column_number):
    """Convert a column number to the corresponding column title in Excel.
    
    In Excel, columns are labeled as A, B, C, ..., Z, AA, AB, ..., AZ, BA, ...
    which correspond to 1, 2, 3, ..., 26, 27, 28, ..., 52, 53, ...
    
    Args:
        column_number: Positive integer representing a column number
    
    Returns:
        String representing the corresponding column title
    """
    result = ""
    
    while column_number > 0:
        # Decrement by 1 to handle the 1-indexed nature of Excel columns
        column_number -= 1
        
        # Get the remainder when divided by 26 (number of letters in the alphabet)
        remainder = column_number % 26
        
        # Convert the remainder to the corresponding letter (A-Z) and add it to the result
        result = chr(65 + remainder) + result
        
        # Integer division by 26 to get the next digit
        column_number //= 26
    
    return result

# Test cases
print(convert_to_title(1))     # "A"
print(convert_to_title(28))    # "AB"
print(convert_to_title(701))   # "ZY"
print(convert_to_title(2147483647))  # "FXSHRXW"