# 28. Find the Index of the First Occurrence in a String

## Problem Statement
Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

## Examples

**Example 1:**
```
Input: haystack = "hello", needle = "ll"
Output: 2
```

**Example 2:**
```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

**Example 3:**
```
Input: haystack = "", needle = ""
Output: 0
```

## Constraints
- 0 <= haystack.length, needle.length <= 5 * 10^4
- haystack and needle consist of only lowercase English characters.

## Approach

### Brute Force
Check every possible starting position in the haystack. For each position, compare the substring starting at that position with the needle. Time complexity: O((n-m+1)*m) where n is the length of haystack and m is the length of needle.

### KMP Algorithm
The Knuth-Morris-Pratt (KMP) algorithm is an efficient string-matching algorithm that uses a preprocessing step to avoid unnecessary character comparisons. Time complexity: O(n+m).

### Built-in Functions
Many programming languages have built-in string search functions that can be used for this problem, like `indexOf()` in JavaScript or `find()` in Python.