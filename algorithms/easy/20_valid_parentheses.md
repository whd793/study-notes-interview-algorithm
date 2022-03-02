# 20. Valid Parentheses

## Problem Statement
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

**Example 1:**
```
Input: s = "()"
Output: true
```

**Example 2:**
```
Input: s = "()[]{}"
Output: true
```

**Example 3:**
```
Input: s = "(]"
Output: false
```

**Example 4:**
```
Input: s = "([)]"
Output: false
```

**Example 5:**
```
Input: s = "{[]}"
Output: true
```

## Constraints
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'.

## Approach

### Stack-based Approach
Use a stack to keep track of opening brackets encountered. When a closing bracket is found, check if it matches the most recent opening bracket (the one at the top of the stack). If all brackets match and the stack is empty at the end, the string is valid. Time complexity: O(n).