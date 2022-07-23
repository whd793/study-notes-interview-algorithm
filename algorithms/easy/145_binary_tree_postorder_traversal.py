# 145. Binary Tree Postorder Traversal

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def postorder_traversal(root):
    """Perform postorder traversal on a binary tree.
    
    In postorder traversal, we visit left subtree -> right subtree -> root.
    
    Args:
        root: Root of the binary tree
    
    Returns:
        List of node values in postorder traversal order
    """
    result = []
    
    def postorder(node):
        if not node:
            return
        
        # Visit left subtree
        postorder(node.left)
        
        # Visit right subtree
        postorder(node.right)
        
        # Visit root
        result.append(node.val)
    
    postorder(root)
    return result

# Iterative implementation
def postorder_traversal_iterative(root):
    if not root:
        return []
    
    result = []
    stack = []
    
    # Keep track of the current node and the last visited node
    current = root
    last_visited = None
    
    while current or stack:
        # Reach the leftmost node of the current subtree
        while current:
            stack.append(current)
            current = current.left
        
        # Peek at the top node
        peek = stack[-1]
        
        # If the right child exists and has not been visited yet
        if peek.right and last_visited != peek.right:
            # Move to the right subtree
            current = peek.right
        else:
            # Visit the node
            result.append(peek.val)
            last_visited = stack.pop()
    
    return result

# Alternative iterative implementation using two stacks
def postorder_traversal_two_stacks(root):
    if not root:
        return []
    
    result = []
    stack1 = [root]
    stack2 = []
    
    # First stack is used to traverse the tree in preorder-like manner
    # Second stack will contain nodes in reverse postorder
    while stack1:
        # Pop from the first stack
        node = stack1.pop()
        
        # Push to the second stack
        stack2.append(node)
        
        # Push left child to the first stack first (so right is processed first)
        if node.left:
            stack1.append(node.left)
        
        # Push right child to the first stack
        if node.right:
            stack1.append(node.right)
    
    # Pop from the second stack to get postorder traversal
    while stack2:
        result.append(stack2.pop().val)
    
    return result

# Test cases
# Example 1: [1,null,2,3] => [3,2,1]
root1 = TreeNode(1)
root1.right = TreeNode(2)
root1.right.left = TreeNode(3)
print(postorder_traversal(root1))  # [3, 2, 1]

# Example 2: [] => []
print(postorder_traversal(None))  # []

# Example 3: [1] => [1]
root3 = TreeNode(1)
print(postorder_traversal(root3))  # [1]