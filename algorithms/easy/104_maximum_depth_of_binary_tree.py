# 104. Maximum Depth of Binary Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root):
    """Find the maximum depth of a binary tree.
    
    The maximum depth is the number of nodes along the longest path
    from the root node down to the farthest leaf node.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        Integer representing the maximum depth
    """
    # Base case: empty tree
    if not root:
        return 0
    
    # Recursive case: max depth = 1 (current node) + max depth of deepest subtree
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    
    return 1 + max(left_depth, right_depth)

# Iterative implementation using a queue (BFS)
def max_depth_bfs(root):
    if not root:
        return 0
    
    from collections import deque
    queue = deque([(root, 1)])  # (node, depth)
    max_depth_value = 0
    
    while queue:
        node, depth = queue.popleft()
        max_depth_value = max(max_depth_value, depth)
        
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    
    return max_depth_value

# Iterative implementation using a stack (DFS)
def max_depth_dfs(root):
    if not root:
        return 0
    
    stack = [(root, 1)]  # (node, depth)
    max_depth_value = 0
    
    while stack:
        node, depth = stack.pop()
        max_depth_value = max(max_depth_value, depth)
        
        if node.right:
            stack.append((node.right, depth + 1))
        if node.left:
            stack.append((node.left, depth + 1))
    
    return max_depth_value

# Test cases
# Example 1: [3,9,20,null,null,15,7] => 3
root1 = TreeNode(3)
root1.left = TreeNode(9)
root1.right = TreeNode(20)
root1.right.left = TreeNode(15)
root1.right.right = TreeNode(7)
print(max_depth(root1))  # 3

# Example 2: [1,null,2] => 2
root2 = TreeNode(1)
root2.right = TreeNode(2)
print(max_depth(root2))  # 2