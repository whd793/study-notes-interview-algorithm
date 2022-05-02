# 101. Symmetric Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_symmetric(root):
    """Check if a binary tree is symmetric around its center.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        Boolean indicating if the tree is symmetric
    """
    if not root:
        return True
    
    return is_mirror(root.left, root.right)

def is_mirror(left, right):
    """Helper function to check if two subtrees are mirrors of each other.
    
    Args:
        left: Root of left subtree
        right: Root of right subtree
    
    Returns:
        Boolean indicating if the subtrees are mirrors
    """
    # If both nodes are None, they are mirrors
    if not left and not right:
        return True
    
    # If one is None and the other isn't, they are not mirrors
    if not left or not right:
        return False
    
    # Check if the values are the same and if the subtrees are mirrors
    return (left.val == right.val) and \
           is_mirror(left.left, right.right) and \
           is_mirror(left.right, right.left)

# Iterative implementation using a queue
def is_symmetric_iterative(root):
    if not root:
        return True
    
    from collections import deque
    queue = deque([(root.left, root.right)])
    
    while queue:
        left, right = queue.popleft()
        
        # If both are None, continue
        if not left and not right:
            continue
        
        # If one is None or values are different, return False
        if not left or not right or left.val != right.val:
            return False
        
        # Add the pairs to check
        queue.append((left.left, right.right))
        queue.append((left.right, right.left))
    
    return True

# Test cases
# Example 1: [1,2,2,3,4,4,3] => true
root1 = TreeNode(1)
root1.left = TreeNode(2)
root1.right = TreeNode(2)
root1.left.left = TreeNode(3)
root1.left.right = TreeNode(4)
root1.right.left = TreeNode(4)
root1.right.right = TreeNode(3)
print(is_symmetric(root1))  # True

# Example 2: [1,2,2,null,3,null,3] => false
root2 = TreeNode(1)
root2.left = TreeNode(2)
root2.right = TreeNode(2)
root2.left.right = TreeNode(3)
root2.right.right = TreeNode(3)
print(is_symmetric(root2))  # False