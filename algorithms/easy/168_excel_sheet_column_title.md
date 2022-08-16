# 168. Excel Sheet Column Title

## Problem Statement
Given an integer `columnNumber`, return its corresponding column title as it appears in an Excel sheet.

For example:
```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28 
...
```

## Examples

**Example 1:**
```
Input: columnNumber = 1
Output: "A"
```

**Example 2:**
```
Input: columnNumber = 28
Output: "AB"
```

**Example 3:**
```
Input: columnNumber = 701
Output: "ZY"
```

## Constraints
- 1 <= columnNumber <= 2^31 - 1

## Approach

### Conversion to Base-26
This problem is similar to converting a decimal number to a base-26 number system, but with a slight twist. In Excel's column title system, there is no "0" digit; instead, we have the digits A through Z representing 1 through 26.

To handle this, we can decrement the column number by 1 before each calculation, which effectively shifts the range from 1-26 to 0-25, making it compatible with a 0-indexed calculation.

For each iteration:
1. Decrement the column number by 1
2. Calculate the remainder when divided by 26 (this gives us the current digit)
3. Convert the remainder to the corresponding letter (A-Z)
4. Prepend the letter to our result string
5. Divide the column number by 26 to get the next digit

Time complexity: O(log₂₆(n)) which is equivalent to O(log(n)) where n is the column number.