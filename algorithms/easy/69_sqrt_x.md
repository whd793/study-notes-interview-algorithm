# 69. Sqrt(x)

## Problem Statement
Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator, such as `pow(x, 0.5)` or `x ** 0.5`.

## Examples

**Example 1:**
```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**
```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
```

## Constraints
- 0 <= x <= 2^31 - 1

## Approach

### Binary Search
Use binary search to find the square root. Start with a search range from 1 to x. For each middle value, check if its square is equal to, less than, or greater than x. Adjust the search range accordingly. Time complexity: O(log x).

### Newton's Method
Newton's method is an efficient algorithm for finding the square root. Start with an initial guess, and iteratively refine it using the formula: r = (r + x/r) / 2. Time complexity: O(log x).