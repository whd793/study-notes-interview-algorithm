# 118. Pascal's Triangle

def generate(num_rows):
    """Generate Pascal's triangle up to numRows.
    
    Args:
        num_rows: Number of rows to generate
    
    Returns:
        List of lists representing Pascal's triangle
    """
    # Base case
    if num_rows == 0:
        return []
    
    # Initialize the result with the first row
    result = [[1]]
    
    # Generate the rest of the rows
    for i in range(1, num_rows):
        # Each row starts with 1
        row = [1]
        
        # Calculate the middle elements of the row
        for j in range(1, i):
            # Each element is the sum of the two elements above it
            row.append(result[i-1][j-1] + result[i-1][j])
        
        # Each row ends with 1
        row.append(1)
        
        # Add the row to the result
        result.append(row)
    
    return result

# Test cases
print(generate(5))  # [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
print(generate(1))  # [[1]]

# Mathematical approach using combinations
from math import factorial

def generate_math(num_rows):
    def combination(n, k):
        return factorial(n) // (factorial(k) * factorial(n - k))
    
    result = []
    for i in range(num_rows):
        row = []
        for j in range(i + 1):
            row.append(combination(i, j))
        result.append(row)
    
    return result

print(generate_math(5))  # [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]