# 101. Symmetric Tree

## Problem Statement
Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).

## Examples

**Example 1:**
```
Input: root = [1,2,2,3,4,4,3]
Output: true
```

**Example 2:**
```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

## Constraints
- The number of nodes in the tree is in the range [1, 1000].
- -100 <= Node.val <= 100

## Approach

### Recursive Approach
Create a helper function that checks if two subtrees are mirrors of each other. Two trees are mirrors if:
1. Their root values are the same.
2. The left subtree of the first tree is a mirror of the right subtree of the second tree.
3. The right subtree of the first tree is a mirror of the left subtree of the second tree.

Time complexity: O(n) where n is the number of nodes in the tree.

### Iterative Approach
Use a queue to perform a level-order traversal of the tree. At each step, check pairs of nodes that should be mirrors of each other. Time complexity: O(n).