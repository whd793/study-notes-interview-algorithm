/**
 * 94. Binary Tree Inorder Traversal
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const result = [];
    
    // Helper function for recursive inorder traversal
    const inorder = function(node) {
        if (!node) return;
        
        // Visit left subtree
        inorder(node.left);
        
        // Visit root
        result.push(node.val);
        
        // Visit right subtree
        inorder(node.right);
    };
    
    inorder(root);
    return result;
};

// Iterative implementation
var inorderTraversalIterative = function(root) {
    const result = [];
    const stack = [];
    let curr = root;
    
    while (curr || stack.length > 0) {
        // Reach the leftmost node of the current subtree
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        
        // Current is now null, get the last node from the stack
        curr = stack.pop();
        result.push(curr.val);  // Visit the node
        
        // Move to the right subtree
        curr = curr.right;
    }
    
    return result;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [1, null, 2, 3] => [1, 3, 2]
const root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log(inorderTraversal(root1));  // [1, 3, 2]

// Example 2: [] => []
console.log(inorderTraversal(null));  // []

// Example 3: [1] => [1]
const root3 = new TreeNode(1);
console.log(inorderTraversal(root3));  // [1]