/**
 * 108. Convert Sorted Array to Binary Search Tree
 * 
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (nums.length === 0) return null;
    
    // Find the middle element to make it the root
    const mid = Math.floor(nums.length / 2);
    
    // Create the root node with the middle element
    const root = new TreeNode(nums[mid]);
    
    // Recursively build the left subtree with elements before the middle
    root.left = sortedArrayToBST(nums.slice(0, mid));
    
    // Recursively build the right subtree with elements after the middle
    root.right = sortedArrayToBST(nums.slice(mid + 1));
    
    return root;
};

// More efficient implementation using indices instead of slicing
var sortedArrayToBSTOptimized = function(nums) {
    const helper = function(left, right) {
        if (left > right) return null;
        
        // Find the middle element
        const mid = Math.floor((left + right) / 2);
        
        // Create the root node with the middle element
        const root = new TreeNode(nums[mid]);
        
        // Recursively build the left and right subtrees
        root.left = helper(left, mid - 1);
        root.right = helper(mid + 1, right);
        
        return root;
    };
    
    return helper(0, nums.length - 1);
};

// Helper function to perform inorder traversal for testing
function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        result.push(node.val);
        inorder(node.right);
    }
    
    inorder(root);
    return result;
}

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [-10,-3,0,5,9] => [0,-3,9,-10,null,5]
const root1 = sortedArrayToBST([-10, -3, 0, 5, 9]);
console.log(inorderTraversal(root1));  // [-10, -3, 0, 5, 9] (should match original array)

// Example 2: [1,3] => [3,1]
const root2 = sortedArrayToBST([1, 3]);
console.log(inorderTraversal(root2));  // [1, 3] (should match original array)