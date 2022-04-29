# 94. Binary Tree Inorder Traversal

## Problem Statement
Given the `root` of a binary tree, return the inorder traversal of its nodes' values.

## Examples

**Example 1:**
```
Input: root = [1,null,2,3]
Output: [1,3,2]
```

**Example 2:**
```
Input: root = []
Output: []
```

**Example 3:**
```
Input: root = [1]
Output: [1]
```

## Constraints
- The number of nodes in the tree is in the range [0, 100].
- -100 <= Node.val <= 100

## Approach

### Recursive Approach
Inorder traversal follows the pattern: left subtree -> root -> right subtree. Implement this recursively by visiting the left subtree first, then the root, and finally the right subtree. Time complexity: O(n) where n is the number of nodes in the tree.

### Iterative Approach
Use a stack to simulate the recursive process. Start with the leftmost node, then visit the root, and then move to the right subtree. Time complexity: O(n).

### Morris Traversal
A more advanced technique that achieves O(1) space complexity by temporarily modifying the tree structure (though we don't usually show this in interview settings).