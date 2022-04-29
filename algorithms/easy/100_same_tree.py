# 100. Same Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_same_tree(p, q):
    """Check if two binary trees are the same.
    
    Two binary trees are considered the same if they are structurally identical
    and the nodes have the same value.
    
    Args:
        p: Root of first binary tree
        q: Root of second binary tree
    
    Returns:
        Boolean indicating if the trees are the same
    """
    # If both nodes are None, they are the same
    if not p and not q:
        return True
    
    # If one is None and the other isn't, they are different
    if not p or not q:
        return False
    
    # If the values are different, they are different trees
    if p.val != q.val:
        return False
    
    # Recursively check left and right subtrees
    return is_same_tree(p.left, q.left) and is_same_tree(p.right, q.right)

# Iterative implementation using a queue
def is_same_tree_iterative(p, q):
    from collections import deque
    
    # Initialize queue with both root nodes
    queue = deque([(p, q)])
    
    while queue:
        node_p, node_q = queue.popleft()
        
        # If both nodes are None, continue with the next pair
        if not node_p and not node_q:
            continue
        
        # If one is None and the other isn't, they are different
        if not node_p or not node_q:
            return False
        
        # If the values are different, they are different trees
        if node_p.val != node_q.val:
            return False
        
        # Add the left and right children to the queue
        queue.append((node_p.left, node_q.left))
        queue.append((node_p.right, node_q.right))
    
    return True

# Test cases
# Example 1: [1,2,3], [1,2,3] => true
p1 = TreeNode(1, TreeNode(2), TreeNode(3))
q1 = TreeNode(1, TreeNode(2), TreeNode(3))
print(is_same_tree(p1, q1))  # True

# Example 2: [1,2], [1,null,2] => false
p2 = TreeNode(1, TreeNode(2))
q2 = TreeNode(1, None, TreeNode(2))
print(is_same_tree(p2, q2))  # False

# Example 3: [1,2,1], [1,1,2] => false
p3 = TreeNode(1, TreeNode(2), TreeNode(1))
q3 = TreeNode(1, TreeNode(1), TreeNode(2))
print(is_same_tree(p3, q3))  # False