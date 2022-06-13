# 119. Pascal's Triangle II

## Problem Statement
Given an integer `rowIndex`, return the `rowIndex`th (0-indexed) row of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it.

## Examples

**Example 1:**
```
Input: rowIndex = 3
Output: [1,3,3,1]
```

**Example 2:**
```
Input: rowIndex = 0
Output: [1]
```

**Example 3:**
```
Input: rowIndex = 1
Output: [1,1]
```

## Constraints
- 0 <= rowIndex <= 33

## Approach

### Direct Calculation Approach
Use the relationship between consecutive elements in the same row. For the kth element in the nth row, the value is C(n,k) = C(n,k-1) * (n-k+1) / k. This allows us to calculate each element based on the previous one. Time complexity: O(rowIndex).

### Iterative Row-by-Row Approach
Generate each row of Pascal's triangle, starting from the first row and ending at the desired row. This is similar to the previous problem but only returns the final row. Time complexity: O(rowIndex^2).

### Space-Optimized Approach
Use a single array to represent the current row, updating it in-place for each new row. To avoid overwriting values that are still needed, update the array from right to left. Time complexity: O(rowIndex^2) with O(rowIndex) extra space.