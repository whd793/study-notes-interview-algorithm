# 94. Binary Tree Inorder Traversal

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def inorder_traversal(root):
    """Perform inorder traversal on a binary tree.
    
    In inorder traversal, we visit left subtree -> root -> right subtree.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        List of node values in inorder traversal order
    """
    result = []
    
    def inorder(node):
        if not node:
            return
        
        # Visit left subtree
        inorder(node.left)
        
        # Visit root
        result.append(node.val)
        
        # Visit right subtree
        inorder(node.right)
    
    inorder(root)
    return result

# Iterative implementation
def inorder_traversal_iterative(root):
    result = []
    stack = []
    curr = root
    
    while curr or stack:
        # Reach the leftmost node of the current subtree
        while curr:
            stack.append(curr)
            curr = curr.left
        
        # Current is now None, get the last node from the stack
        curr = stack.pop()
        result.append(curr.val)  # Visit the node
        
        # Move to the right subtree
        curr = curr.right
    
    return result

# Test cases
# Example 1: [1, null, 2, 3] => [1, 3, 2]
root1 = TreeNode(1)
root1.right = TreeNode(2)
root1.right.left = TreeNode(3)
print(inorder_traversal(root1))  # [1, 3, 2]

# Example 2: [] => []
print(inorder_traversal(None))  # []

# Example 3: [1] => [1]
root3 = TreeNode(1)
print(inorder_traversal(root3))  # [1]