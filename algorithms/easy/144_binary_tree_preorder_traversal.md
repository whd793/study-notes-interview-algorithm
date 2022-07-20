# 144. Binary Tree Preorder Traversal

## Problem Statement
Given the `root` of a binary tree, return the preorder traversal of its nodes' values.

## Examples

**Example 1:**
```
Input: root = [1,null,2,3]
Output: [1,2,3]
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

## Follow-up
Recursive solution is trivial, could you do it iteratively?

## Approach

### Recursive Approach
Preorder traversal follows the pattern: root -> left subtree -> right subtree. Implement this recursively by visiting the root first, then the left subtree, and finally the right subtree. Time complexity: O(n) where n is the number of nodes in the tree.

### Iterative Approach
Use a stack to simulate the recursive process. Start by pushing the root node. For each node popped from the stack:
1. Visit the node (add its value to the result)
2. Push its right child (if any) to the stack
3. Push its left child (if any) to the stack

Note: We push the right child first so that the left child is processed first (LIFO property of the stack). Time complexity: O(n).