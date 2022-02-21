# 9. Palindrome Number

## Problem Statement
Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.

A palindrome is a number that reads the same backward as forward.

## Examples

**Example 1:**
```
Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.
```

**Example 2:**
```
Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
```

**Example 3:**
```
Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
```

## Constraints
- -2^31 <= x <= 2^31 - 1

## Approach

### String Conversion
Convert the number to a string and check if it equals its reverse. Time complexity: O(log₁₀(n)).

### Mathematical Approach
Reverse half of the number and compare it with the other half. This avoids string conversion. Time complexity: O(log₁₀(n)).