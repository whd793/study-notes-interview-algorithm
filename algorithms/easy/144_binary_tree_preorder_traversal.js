/**
 * 144. Binary Tree Preorder Traversal
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
var preorderTraversal = function(root) {
    const result = [];
    
    function preorder(node) {
        if (!node) return;
        
        // Visit root
        result.push(node.val);
        
        // Visit left subtree
        preorder(node.left);
        
        // Visit right subtree
        preorder(node.right);
    }
    
    preorder(root);
    return result;
};

// Iterative implementation
var preorderTraversalIterative = function(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [root];
    
    while (stack.length > 0) {
        // Pop the top node from the stack
        const node = stack.pop();
        
        // Visit the node
        result.push(node.val);
        
        // Push right child first (so it's processed after the left child)
        if (node.right) stack.push(node.right);
        
        // Push left child
        if (node.left) stack.push(node.left);
    }
    
    return result;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [1,null,2,3] => [1,2,3]
const root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log(preorderTraversal(root1));  // [1, 2, 3]

// Example 2: [] => []
console.log(preorderTraversal(null));  // []

// Example 3: [1] => [1]
const root3 = new TreeNode(1);
console.log(preorderTraversal(root3));  // [1]