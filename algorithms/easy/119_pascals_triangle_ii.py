# 119. Pascal's Triangle II

def get_row(row_index):
    """Return the rowIndex-th row of Pascal's triangle.
    
    Args:
        row_index: 0-based index of the row to return
    
    Returns:
        List representing the row
    """
    # Initialize the row with the first element
    row = [1]
    
    # Generate the rest of the elements
    for i in range(row_index):
        # Calculate the next element based on the previous one
        # Formula: next = prev * (row_index - i) / (i + 1)
        next_val = row[i] * (row_index - i) // (i + 1)
        row.append(next_val)
    
    return row

# Alternative implementation that builds the entire row iteratively
def get_row_iterative(row_index):
    # Start with the first row
    row = [1]
    
    # Generate each row until reaching the desired one
    for i in range(row_index):
        # Create the next row using the current one
        next_row = [1]  # First element is always 1
        
        # Calculate the middle elements
        for j in range(len(row) - 1):
            next_row.append(row[j] + row[j + 1])
        
        next_row.append(1)  # Last element is always 1
        row = next_row
    
    return row

# Space-optimized implementation (O(k) space)
def get_row_optimized(row_index):
    # Initialize the row with all 1's (final row length)
    row = [1] * (row_index + 1)
    
    # Fill in the row from right to left (to avoid overwriting values we still need)
    for i in range(1, row_index):
        for j in range(i, 0, -1):
            row[j] = row[j] + row[j - 1]
    
    return row

# Test cases
print(get_row(3))  # [1, 3, 3, 1]
print(get_row(0))  # [1]
print(get_row(1))  # [1, 1]

print(get_row_iterative(3))  # [1, 3, 3, 1]
print(get_row_optimized(3))  # [1, 3, 3, 1]