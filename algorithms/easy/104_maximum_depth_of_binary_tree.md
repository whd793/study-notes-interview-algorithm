# 104. Maximum Depth of Binary Tree

## Problem Statement
Given the root of a binary tree, return its maximum depth.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

**Example 2:**
```
Input: root = [1,null,2]
Output: 2
```

## Constraints
- The number of nodes in the tree is in the range [0, 10^4].
- -100 <= Node.val <= 100

## Approach

### Recursive Approach
The maximum depth of a binary tree is 1 (for the current node) plus the maximum of the depths of the left and right subtrees. Base case: if the tree is empty, the depth is 0. Time complexity: O(n) where n is the number of nodes in the tree.

### Iterative Approach (BFS)
Use a queue to perform a breadth-first traversal of the tree, keeping track of the depth of each node. The maximum depth is the depth of the deepest node. Time complexity: O(n).

### Iterative Approach (DFS)
Use a stack to perform a depth-first traversal of the tree, keeping track of the depth of each node. The maximum depth is the maximum depth encountered during the traversal. Time complexity: O(n).