/**
 * 100. Same Tree
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // If both nodes are null, they are the same
    if (!p && !q) return true;
    
    // If one is null and the other isn't, they are different
    if (!p || !q) return false;
    
    // If the values are different, they are different trees
    if (p.val !== q.val) return false;
    
    // Recursively check left and right subtrees
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

// Iterative implementation using a queue
var isSameTreeIterative = function(p, q) {
    // Initialize queue with both root nodes
    const queue = [[p, q]];
    
    while (queue.length > 0) {
        const [nodeP, nodeQ] = queue.shift();
        
        // If both nodes are null, continue with the next pair
        if (!nodeP && !nodeQ) continue;
        
        // If one is null and the other isn't, they are different
        if (!nodeP || !nodeQ) return false;
        
        // If the values are different, they are different trees
        if (nodeP.val !== nodeQ.val) return false;
        
        // Add the left and right children to the queue
        queue.push([nodeP.left, nodeQ.left]);
        queue.push([nodeP.right, nodeQ.right]);
    }
    
    return true;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [1,2,3], [1,2,3] => true
const p1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const q1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.log(isSameTree(p1, q1));  // true

// Example 2: [1,2], [1,null,2] => false
const p2 = new TreeNode(1, new TreeNode(2));
const q2 = new TreeNode(1, null, new TreeNode(2));
console.log(isSameTree(p2, q2));  // false

// Example 3: [1,2,1], [1,1,2] => false
const p3 = new TreeNode(1, new TreeNode(2), new TreeNode(1));
const q3 = new TreeNode(1, new TreeNode(1), new TreeNode(2));
console.log(isSameTree(p3, q3));  // false