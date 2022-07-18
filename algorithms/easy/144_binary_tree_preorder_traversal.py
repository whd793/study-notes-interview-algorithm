# 144. Binary Tree Preorder Traversal

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder_traversal(root):
    """Perform preorder traversal on a binary tree.
    
    In preorder traversal, we visit root -> left subtree -> right subtree.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        List of node values in preorder traversal order
    """
    result = []
    
    def preorder(node):
        if not node:
            return
        
        # Visit root
        result.append(node.val)
        
        # Visit left subtree
        preorder(node.left)
        
        # Visit right subtree
        preorder(node.right)
    
    preorder(root)
    return result

# Iterative implementation
def preorder_traversal_iterative(root):
    if not root:
        return []
    
    result = []
    stack = [root]
    
    while stack:
        # Pop the top node from the stack
        node = stack.pop()
        
        # Visit the node
        result.append(node.val)
        
        # Push right child first (so it's processed after the left child)
        if node.right:
            stack.append(node.right)
        
        # Push left child
        if node.left:
            stack.append(node.left)
    
    return result

# Test cases
# Example 1: [1,null,2,3] => [1,2,3]
root1 = TreeNode(1)
root1.right = TreeNode(2)
root1.right.left = TreeNode(3)
print(preorder_traversal(root1))  # [1, 2, 3]

# Example 2: [] => []
print(preorder_traversal(None))  # []

# Example 3: [1] => [1]
root3 = TreeNode(1)
print(preorder_traversal(root3))  # [1]