# 110. Balanced Binary Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_balanced(root):
    """Determine if a binary tree is height-balanced.
    
    A height-balanced binary tree is a binary tree in which the depth of the 
    two subtrees of every node never differs by more than one.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        Boolean indicating if the tree is height-balanced
    """
    # Global variable to store the result
    is_balanced_value = True
    
    def height(node):
        nonlocal is_balanced_value
        
        if not node or not is_balanced_value:
            return 0
        
        # Calculate the height of left and right subtrees
        left_height = height(node.left)
        right_height = height(node.right)
        
        # Check if the current subtree is balanced
        if abs(left_height - right_height) > 1:
            is_balanced_value = False
        
        # Return the height of the current subtree
        return 1 + max(left_height, right_height)
    
    height(root)
    return is_balanced_value

# Alternative implementation that returns both height and balance status
def is_balanced_alt(root):
    def dfs(node):
        # Returns (is_balanced, height)
        if not node:
            return True, 0
        
        # Check if left subtree is balanced and get its height
        left_balanced, left_height = dfs(node.left)
        if not left_balanced:
            return False, 0
        
        # Check if right subtree is balanced and get its height
        right_balanced, right_height = dfs(node.right)
        if not right_balanced:
            return False, 0
        
        # Check if current subtree is balanced
        balanced = abs(left_height - right_height) <= 1
        
        # Return balance status and height
        return balanced, 1 + max(left_height, right_height)
    
    return dfs(root)[0]

# Test cases
# Example 1: [3,9,20,null,null,15,7] => true
root1 = TreeNode(3)
root1.left = TreeNode(9)
root1.right = TreeNode(20)
root1.right.left = TreeNode(15)
root1.right.right = TreeNode(7)
print(is_balanced(root1))  # True

# Example 2: [1,2,2,3,3,null,null,4,4] => false
root2 = TreeNode(1)
root2.left = TreeNode(2)
root2.right = TreeNode(2)
root2.left.left = TreeNode(3)
root2.left.right = TreeNode(3)
root2.left.left.left = TreeNode(4)
root2.left.left.right = TreeNode(4)
print(is_balanced(root2))  # False