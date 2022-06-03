/**
 * 112. Path Sum
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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function(root, targetSum) {
    // Base case: empty tree
    if (!root) return false;
    
    // If the node is a leaf (no children), check if its value equals the remaining sum
    if (!root.left && !root.right) return root.val === targetSum;
    
    // Update the remaining sum and check both subtrees
    const remainingSum = targetSum - root.val;
    return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
};

// Iterative implementation using a stack
var hasPathSumIterative = function(root, targetSum) {
    if (!root) return false;
    
    // Stack holds [node, remainingSum] pairs
    const stack = [[root, targetSum]];
    
    while (stack.length > 0) {
        const [node, currSum] = stack.pop();
        
        // If the node is a leaf and its value equals the remaining sum, we found a path
        if (!node.left && !node.right && node.val === currSum) return true;
        
        // Push child nodes to the stack with updated remaining sum
        if (node.right) stack.push([node.right, currSum - node.val]);
        if (node.left) stack.push([node.left, currSum - node.val]);
    }
    
    return false;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22 => true
const root1 = new TreeNode(5);
root1.left = new TreeNode(4);
root1.right = new TreeNode(8);
root1.left.left = new TreeNode(11);
root1.left.left.left = new TreeNode(7);
root1.left.left.right = new TreeNode(2);
root1.right.left = new TreeNode(13);
root1.right.right = new TreeNode(4);
root1.right.right.right = new TreeNode(1);
console.log(hasPathSum(root1, 22));  // true (5 -> 4 -> 11 -> 2 = 22)

// Example 2: [1,2,3], targetSum = 5 => false
const root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
console.log(hasPathSum(root2, 5));  // false

// Example 3: [], targetSum = 0 => false
console.log(hasPathSum(null, 0));  // false