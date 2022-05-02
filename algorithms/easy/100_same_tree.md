# 100. Same Tree

## Problem Statement
Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

## Examples

**Example 1:**
```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

**Example 2:**
```
Input: p = [1,2], q = [1,null,2]
Output: false
```

**Example 3:**
```
Input: p = [1,2,1], q = [1,1,2]
Output: false
```

## Constraints
- The number of nodes in both trees is in the range [0, 100].
- -10^4 <= Node.val <= 10^4

## Approach

### Recursive Approach
Compare the trees node by node using depth-first traversal. Base cases: if both nodes are null, return true; if one is null and the other isn't, return false; if the values are different, return false. Recursively check the left and right subtrees. Time complexity: O(n) where n is the number of nodes in the tree.

### Iterative Approach
Use a queue to perform breadth-first traversal of both trees simultaneously. At each step, compare the current pair of nodes. Time complexity: O(n).