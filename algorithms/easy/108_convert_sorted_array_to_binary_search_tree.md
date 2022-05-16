# 108. Convert Sorted Array to Binary Search Tree

## Problem Statement
Given an integer array `nums` where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.

A **height-balanced** binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

## Examples

**Example 1:**
```
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:
```

**Example 2:**
```
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,3] and [3,1] are both height-balanced BSTs.
```

## Constraints
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums is sorted in a strictly increasing order.

## Approach

### Divide and Conquer
Use the middle element of the array as the root of the tree, which ensures the tree is height-balanced. Recursively apply the same approach to the left and right subarrays to build the left and right subtrees. Time complexity: O(n) where n is the number of elements in the array.

### Optimized Recursive Approach
Instead of creating new subarrays at each step (which costs additional memory), use indices to represent the current subarray. This reduces the space complexity from O(n log n) to O(log n) for the recursive call stack. Time complexity remains O(n).