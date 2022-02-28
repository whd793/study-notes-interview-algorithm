# 14. Longest Common Prefix

## Problem Statement
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

## Examples

**Example 1:**
```
Input: strs = ["flower","flow","flight"]
Output: "fl"
```

**Example 2:**
```
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
```

## Constraints
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters.

## Approach

### Sorting Method
Sort the array of strings. Then, compare the first and last strings in the sorted array. The common prefix of these two strings will be the common prefix for all strings. Time complexity: O(n log n) for sorting + O(m) for comparison, where m is the length of the shortest string.

### Horizontal Scanning
Take the first string as the prefix, then iterate through the remaining strings, updating the prefix as we find common characters. Time complexity: O(n * m) where n is the number of strings and m is the length of the shortest string.