# 111. Minimum Depth of Binary Tree

## Problem Statement
Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

## Examples

**Example 1:**
```
Input: root = [3,9,20,null,null,15,7]
Output: 2
```

**Example 2:**
```
Input: root = [2,null,3,null,4,null,5,null,6]
Output: 5
```

## Constraints
- The number of nodes in the tree is in the range [0, 105].
- -1000 <= Node.val <= 1000

## Approach

### Recursive Approach
The minimum depth is the shortest path from the root to a leaf node. For each node, we need to consider the following cases:
1. If the node is empty, the depth is 0.
2. If the node has no left child, the minimum depth is 1 plus the minimum depth of the right subtree.
3. If the node has no right child, the minimum depth is 1 plus the minimum depth of the left subtree.
4. If the node has both children, the minimum depth is 1 plus the minimum of the depths of the left and right subtrees.

Time complexity: O(n) where n is the number of nodes in the tree.

### BFS Approach
Use a queue to perform a breadth-first search, keeping track of the depth of each node. As soon as we encounter a leaf node (a node with no children), we can return its depth as the minimum depth of the tree. This approach is often more efficient for finding the minimum depth. Time complexity: O(n).