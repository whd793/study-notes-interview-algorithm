# 67. Add Binary

## Problem Statement
Given two binary strings `a` and `b`, return their sum as a binary string.

## Examples

**Example 1:**
```
Input: a = "11", b = "1"
Output: "100"
```

**Example 2:**
```
Input: a = "1010", b = "1011"
Output: "10101"
```

## Constraints
- 1 <= a.length, b.length <= 10^4
- a and b consist only of '0' or '1' characters.
- Each string does not contain leading zeros except for the zero itself.

## Approach

### Built-in Conversion
Convert the binary strings to integers, add them, and then convert the result back to a binary string. This approach is straightforward but may not work for very large binary strings due to integer size limitations in some languages. Time complexity: O(n+m) where n and m are the lengths of the input strings.

### Bit-by-Bit Addition
Implement binary addition manually by processing both strings from right to left. Keep track of the carry and compute each bit of the result. This approach works for arbitrarily large binary strings. Time complexity: O(max(n, m)).