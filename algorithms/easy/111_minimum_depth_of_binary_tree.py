# 111. Minimum Depth of Binary Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def min_depth(root):
    """Find the minimum depth of a binary tree.
    
    The minimum depth is the number of nodes along the shortest path
    from the root node down to the nearest leaf node.
    
    Note: A leaf node is a node with no children.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        Integer representing the minimum depth
    """
    # Base case: empty tree
    if not root:
        return 0
    
    # If the node has no left child, recur on the right side
    if not root.left:
        return 1 + min_depth(root.right)
    
    # If the node has no right child, recur on the left side
    if not root.right:
        return 1 + min_depth(root.left)
    
    # If both children exist, return the minimum of the two depths
    return 1 + min(min_depth(root.left), min_depth(root.right))

# Iterative implementation using BFS
def min_depth_bfs(root):
    if not root:
        return 0
    
    from collections import deque
    queue = deque([(root, 1)])  # (node, depth)
    
    while queue:
        node, depth = queue.popleft()
        
        # If this is a leaf node, return its depth
        if not node.left and not node.right:
            return depth
        
        # Add child nodes to the queue
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    
    return 0  # This should not be reached if the tree is valid

# Test cases
# Example 1: [3,9,20,null,null,15,7] => 2
root1 = TreeNode(3)
root1.left = TreeNode(9)
root1.right = TreeNode(20)
root1.right.left = TreeNode(15)
root1.right.right = TreeNode(7)
print(min_depth(root1))  # 2

# Example 2: [2,null,3,null,4,null,5,null,6] => 5
root2 = TreeNode(2)
root2.right = TreeNode(3)
root2.right.right = TreeNode(4)
root2.right.right.right = TreeNode(5)
root2.right.right.right.right = TreeNode(6)
print(min_depth(root2))  # 5