# 108. Convert Sorted Array to Binary Search Tree

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def sorted_array_to_bst(nums):
    """Convert a sorted array to a height-balanced binary search tree.
    
    A height-balanced binary tree is a binary tree in which the depth of the 
    two subtrees of every node never differs by more than one.
    
    Args:
        nums: Sorted array of integers
    
    Returns:
        Root of the balanced BST
    """
    if not nums:
        return None
    
    # Find the middle element to make it the root
    mid = len(nums) // 2
    
    # Create the root node with the middle element
    root = TreeNode(nums[mid])
    
    # Recursively build the left subtree with elements before the middle
    root.left = sorted_array_to_bst(nums[:mid])
    
    # Recursively build the right subtree with elements after the middle
    root.right = sorted_array_to_bst(nums[mid+1:])
    
    return root

# More efficient implementation using indices instead of slicing
def sorted_array_to_bst_optimized(nums):
    def helper(left, right):
        if left > right:
            return None
        
        # Find the middle element
        mid = (left + right) // 2
        
        # Create the root node with the middle element
        root = TreeNode(nums[mid])
        
        # Recursively build the left and right subtrees
        root.left = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        
        return root
    
    return helper(0, len(nums) - 1)

# Helper function to perform inorder traversal for testing
def inorder_traversal(root):
    result = []
    
    def inorder(node):
        if not node:
            return
        inorder(node.left)
        result.append(node.val)
        inorder(node.right)
    
    inorder(root)
    return result

# Test cases
# Example 1: [-10,-3,0,5,9] => [0,-3,9,-10,null,5]
root1 = sorted_array_to_bst([-10, -3, 0, 5, 9])
print(inorder_traversal(root1))  # [-10, -3, 0, 5, 9] (should match original array)

# Example 2: [1,3] => [3,1]
root2 = sorted_array_to_bst([1, 3])
print(inorder_traversal(root2))  # [1, 3] (should match original array)