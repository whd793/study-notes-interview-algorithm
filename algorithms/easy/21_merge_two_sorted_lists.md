# 21. Merge Two Sorted Lists

## Problem Statement
You are given the heads of two sorted linked lists `list1` and `list2`.

Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

## Examples

**Example 1:**
```
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
```

**Example 2:**
```
Input: list1 = [], list2 = []
Output: []
```

**Example 3:**
```
Input: list1 = [], list2 = [0]
Output: [0]
```

## Constraints
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.

## Approach

### Iterative Approach
Use a dummy head node and iterate through both lists, comparing the values of the current nodes in each list. At each step, attach the node with the smaller value to the merged list. When one list is exhausted, attach the remaining nodes from the other list. Time complexity: O(n + m) where n and m are the lengths of the two lists.

### Recursive Approach
Recursively determine which node should be the next node in the merged list by comparing the current nodes of both lists. The base case is when one list is empty, in which case we return the other list. Time complexity: O(n + m).