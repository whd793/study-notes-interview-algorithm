# 110. Balanced Binary Tree

## Problem Statement
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differs by more than 1.

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: true
```

**Example 2:**
```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
```

**Example 3:**
```
Input: root = []
Output: true
```

## Constraints
- The number of nodes in the tree is in the range [0, 5000].
- -10^4 <= Node.val <= 10^4

## Approach

### Bottom-up Recursive Approach
Perform a depth-first traversal of the tree, calculating the height of each subtree and checking if it's balanced. If any subtree is unbalanced, the entire tree is unbalanced. This approach avoids recalculating heights multiple times. Time complexity: O(n) where n is the number of nodes in the tree.

### Alternative Implementation
Combine the height calculation and balance check in a single recursive function that returns both the height and balance status of each subtree. This makes the code cleaner and more efficient. Time complexity: O(n).