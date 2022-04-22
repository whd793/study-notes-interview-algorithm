# 83. Remove Duplicates from Sorted List

## Problem Statement
Given the head of a sorted linked list, delete all duplicates such that each element appears only once. Return the linked list sorted as well.

## Examples

**Example 1:**
```
Input: head = [1,1,2]
Output: [1,2]
```

**Example 2:**
```
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

## Constraints
- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.

## Approach

### Iterative Traversal
Traverse the linked list and check if the current node's value is the same as the next node's value. If it is, update the current node's next pointer to skip the duplicate node. Otherwise, move to the next node. Time complexity: O(n) where n is the number of nodes in the linked list.