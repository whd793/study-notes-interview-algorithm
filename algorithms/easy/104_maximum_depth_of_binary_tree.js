/**
 * 104. Maximum Depth of Binary Tree
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
var maxDepth = function(root) {
    // Base case: empty tree
    if (!root) return 0;
    
    // Recursive case: max depth = 1 (current node) + max depth of deepest subtree
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return 1 + Math.max(leftDepth, rightDepth);
};

// Iterative implementation using a queue (BFS)
var maxDepthBFS = function(root) {
    if (!root) return 0;
    
    const queue = [[root, 1]];  // [node, depth]
    let maxDepthValue = 0;
    
    while (queue.length > 0) {
        const [node, depth] = queue.shift();
        maxDepthValue = Math.max(maxDepthValue, depth);
        
        if (node.left) {
            queue.push([node.left, depth + 1]);
        }
        if (node.right) {
            queue.push([node.right, depth + 1]);
        }
    }
    
    return maxDepthValue;
};

// Iterative implementation using a stack (DFS)
var maxDepthDFS = function(root) {
    if (!root) return 0;
    
    const stack = [[root, 1]];  // [node, depth]
    let maxDepthValue = 0;
    
    while (stack.length > 0) {
        const [node, depth] = stack.pop();
        maxDepthValue = Math.max(maxDepthValue, depth);
        
        if (node.right) {
            stack.push([node.right, depth + 1]);
        }
        if (node.left) {
            stack.push([node.left, depth + 1]);
        }
    }
    
    return maxDepthValue;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [3,9,20,null,null,15,7] => 3
const root1 = new TreeNode(3);
root1.left = new TreeNode(9);
root1.right = new TreeNode(20);
root1.right.left = new TreeNode(15);
root1.right.right = new TreeNode(7);
console.log(maxDepth(root1));  // 3

// Example 2: [1,null,2] => 2
const root2 = new TreeNode(1);
root2.right = new TreeNode(2);
console.log(maxDepth(root2));  // 2