/**
 * 110. Balanced Binary Tree
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
 * @return {boolean}
 */
var isBalanced = function(root) {
    // Variable to store the result
    let isBalancedValue = true;
    
    // Helper function to calculate the height
    function height(node) {
        if (!node || !isBalancedValue) return 0;
        
        // Calculate the height of left and right subtrees
        const leftHeight = height(node.left);
        const rightHeight = height(node.right);
        
        // Check if the current subtree is balanced
        if (Math.abs(leftHeight - rightHeight) > 1) {
            isBalancedValue = false;
        }
        
        // Return the height of the current subtree
        return 1 + Math.max(leftHeight, rightHeight);
    }
    
    height(root);
    return isBalancedValue;
};

// Alternative implementation that returns both height and balance status
var isBalancedAlt = function(root) {
    function dfs(node) {
        // Returns [isBalanced, height]
        if (!node) return [true, 0];
        
        // Check if left subtree is balanced and get its height
        const [leftBalanced, leftHeight] = dfs(node.left);
        if (!leftBalanced) return [false, 0];
        
        // Check if right subtree is balanced and get its height
        const [rightBalanced, rightHeight] = dfs(node.right);
        if (!rightBalanced) return [false, 0];
        
        // Check if current subtree is balanced
        const balanced = Math.abs(leftHeight - rightHeight) <= 1;
        
        // Return balance status and height
        return [balanced, 1 + Math.max(leftHeight, rightHeight)];
    }
    
    return dfs(root)[0];
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [3,9,20,null,null,15,7] => true
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(isBalanced(root1));  // true

// Example 2: [1,2,2,3,3,null,null,4,4] => false
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(2);
root2.left.left = new TreeNode(3);
root2.left.right = new TreeNode(3);
root2.left.left.left = new TreeNode(4);
root2.left.left.right = new TreeNode(4);
console.log(isBalanced(root2));  // false