/**
 * 101. Symmetric Tree
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
var isSymmetric = function(root) {
    if (!root) return true;
    
    return isMirror(root.left, root.right);
};

/**
 * Helper function to check if two subtrees are mirrors of each other.
 * @param {TreeNode} left - Root of left subtree
 * @param {TreeNode} right - Root of right subtree
 * @return {boolean}
 */
function isMirror(left, right) {
    // If both nodes are null, they are mirrors
    if (!left && !right) return true;
    
    // If one is null and the other isn't, they are not mirrors
    if (!left || !right) return false;
    
    // Check if the values are the same and if the subtrees are mirrors
    return (left.val === right.val) && 
           isMirror(left.left, right.right) && 
           isMirror(left.right, right.left);
}

// Iterative implementation using a queue
var isSymmetricIterative = function(root) {
    if (!root) return true;
    
    const queue = [[root.left, root.right]];
    
    while (queue.length > 0) {
        const [left, right] = queue.shift();
        
        // If both are null, continue
        if (!left && !right) continue;
        
        // If one is null or values are different, return false
        if (!left || !right || left.val !== right.val) return false;
        
        // Add the pairs to check
        queue.push([left.left, right.right]);
        queue.push([left.right, right.left]);
    }
    
    return true;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [1,2,2,3,4,4,3] => true
const root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(2);
root1.left.left = new TreeNode(3);
root1.left.right = new TreeNode(4);
root1.right.left = new TreeNode(4);
root1.right.right = new TreeNode(3);
console.log(isSymmetric(root1));  // true

// Example 2: [1,2,2,null,3,null,3] => false
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(2);
root2.left.right = new TreeNode(3);
root2.right.right = new TreeNode(3);
console.log(isSymmetric(root2));  // false