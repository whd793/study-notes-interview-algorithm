# 112. Path Sum

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def has_path_sum(root, target_sum):
    """Determine if the tree has a root-to-leaf path that sums to target_sum.
    
    Args:
        root: Root of the binary tree
        target_sum: Target sum to find
    
    Returns:
        Boolean indicating if there exists a path with the target sum
    """
    # Base case: empty tree
    if not root:
        return False
    
    # If the node is a leaf (no children), check if its value equals the remaining sum
    if not root.left and not root.right:
        return root.val == target_sum
    
    # Update the remaining sum and check both subtrees
    remaining_sum = target_sum - root.val
    return has_path_sum(root.left, remaining_sum) or has_path_sum(root.right, remaining_sum)

# Iterative implementation using a stack
def has_path_sum_iterative(root, target_sum):
    if not root:
        return False
    
    # Stack holds (node, remaining_sum) pairs
    stack = [(root, target_sum)]
    
    while stack:
        node, curr_sum = stack.pop()
        
        # If the node is a leaf and its value equals the remaining sum, we found a path
        if not node.left and not node.right and node.val == curr_sum:
            return True
        
        # Push child nodes to the stack with updated remaining sum
        if node.right:
            stack.append((node.right, curr_sum - node.val))
        if node.left:
            stack.append((node.left, curr_sum - node.val))
    
    return False

# Test cases
# Example 1: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22 => true
root1 = TreeNode(5)
root1.left = TreeNode(4)
root1.right = TreeNode(8)
root1.left.left = TreeNode(11)
root1.left.left.left = TreeNode(7)
root1.left.left.right = TreeNode(2)
root1.right.left = TreeNode(13)
root1.right.right = TreeNode(4)
root1.right.right.right = TreeNode(1)
print(has_path_sum(root1, 22))  # True (5 -> 4 -> 11 -> 2 = 22)

# Example 2: [1,2,3], targetSum = 5 => false
root2 = TreeNode(1)
root2.left = TreeNode(2)
root2.right = TreeNode(3)
print(has_path_sum(root2, 5))  # False

# Example 3: [], targetSum = 0 => false
print(has_path_sum(None, 0))  # False