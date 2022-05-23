/**
 * 111. Minimum Depth of Binary Tree
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
 * @return {number}
 */
var minDepth = function(root) {
    // Base case: empty tree
    if (!root) return 0;
    
    // If the node has no left child, recur on the right side
    if (!root.left) return 1 + minDepth(root.right);
    
    // If the node has no right child, recur on the left side
    if (!root.right) return 1 + minDepth(root.left);
    
    // If both children exist, return the minimum of the two depths
    return 1 + Math.min(minDepth(root.left), minDepth(root.right));
};

// Iterative implementation using BFS
var minDepthBFS = function(root) {
    if (!root) return 0;
    
    const queue = [[root, 1]];  // [node, depth]
    
    while (queue.length > 0) {
        const [node, depth] = queue.shift();
        
        // If this is a leaf node, return its depth
        if (!node.left && !node.right) return depth;
        
        // Add child nodes to the queue
        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }
    
    return 0;  // This should not be reached if the tree is valid
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [3,9,20,null,null,15,7] => 2
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(minDepth(root1));  // 2

// Example 2: [2,null,3,null,4,null,5,null,6] => 5
const root2 = new TreeNode(2);
root2.right = new TreeNode(3);
root2.right.right = new TreeNode(4);
root2.right.right.right = new TreeNode(5);
root2.right.right.right.right = new TreeNode(6);
console.log(minDepth(root2));  // 5