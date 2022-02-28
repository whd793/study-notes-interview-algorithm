# 20. Valid Parentheses

def is_valid(s):
    """Determine if the input string has valid parentheses.
    
    Args:
        s: String containing just the characters '(', ')', '{', '}', '[' and ']'
    
    Returns:
        Boolean indicating if the input string is valid
    """
    # Initialize a stack for keeping track of opening brackets
    stack = []
    
    # Define a mapping of closing brackets to their opening counterparts
    mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    
    # Iterate through each character in the string
    for char in s:
        # If the character is a closing bracket
        if char in mapping:
            # Pop the top element from the stack or use a dummy value '#' if stack is empty
            top_element = stack.pop() if stack else '#'
            
            # If the popped element doesn't match the corresponding opening bracket
            if mapping[char] != top_element:
                return False
        # If the character is an opening bracket, push it onto the stack
        else:
            stack.append(char)
    
    # The stack should be empty if all brackets are properly matched
    return len(stack) == 0

# Test cases
print(is_valid("()"))         # True
print(is_valid("()[]{}"))    # True
print(is_valid("(]"))        # False
print(is_valid("([)]")))     # False
print(is_valid("{[]}"))      # True