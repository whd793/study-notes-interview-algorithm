/**
 * 145. Binary Tree Postorder Traversal
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
var postorderTraversal = function(root) {
    const result = [];
    
    function postorder(node) {
        if (!node) return;
        
        // Visit left subtree
        postorder(node.left);
        
        // Visit right subtree
        postorder(node.right);
        
        // Visit root
        result.push(node.val);
    }
    
    postorder(root);
    return result;
};

// Iterative implementation
var postorderTraversalIterative = function(root) {
    if (!root) return [];
    
    const result = [];
    const stack = [];
    
    // Keep track of the current node and the last visited node
    let current = root;
    let lastVisited = null;
    
    while (current || stack.length > 0) {
        // Reach the leftmost node of the current subtree
        while (current) {
            stack.push(current);
            current = current.left;
        }
        
        // Peek at the top node
        const peek = stack[stack.length - 1];
        
        // If the right child exists and has not been visited yet
        if (peek.right && lastVisited !== peek.right) {
            // Move to the right subtree
            current = peek.right;
        } else {
            // Visit the node
            result.push(peek.val);
            lastVisited = stack.pop();
        }
    }
    
    return result;
};

// Alternative iterative implementation using two stacks
var postorderTraversalTwoStacks = function(root) {
    if (!root) return [];
    
    const result = [];
    const stack1 = [root];
    const stack2 = [];
    
    // First stack is used to traverse the tree in preorder-like manner
    // Second stack will contain nodes in reverse postorder
    while (stack1.length > 0) {
        // Pop from the first stack
        const node = stack1.pop();
        
        // Push to the second stack
        stack2.push(node);
        
        // Push left child to the first stack first (so right is processed first)
        if (node.left) stack1.push(node.left);
        
        // Push right child to the first stack
        if (node.right) stack1.push(node.right);
    }
    
    // Pop from the second stack to get postorder traversal
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }
    
    return result;
};

// Test cases
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

// Example 1: [1,null,2,3] => [3,2,1]
const root1 = new TreeNode(1);
root1.right = new TreeNode(2);
root1.right.left = new TreeNode(3);
console.log(postorderTraversal(root1));  // [3, 2, 1]

// Example 2: [] => []
console.log(postorderTraversal(null));  // []

// Example 3: [1] => [1]
const root3 = new TreeNode(1);
console.log(postorderTraversal(root3));  // [1]