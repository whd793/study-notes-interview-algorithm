# 58. Length of Last Word

## Problem Statement
Given a string `s` consisting of words and spaces, return the length of the last word in the string.

A **word** is a maximal substring consisting of non-space characters only.

## Examples

**Example 1:**
```
Input: s = "Hello World"
Output: 5
Explanation: The last word is "World" with length 5.
```

**Example 2:**
```
Input: s = "   fly me   to   the moon  "
Output: 4
Explanation: The last word is "moon" with length 4.
```

**Example 3:**
```
Input: s = "luffy is still joyboy"
Output: 6
Explanation: The last word is "joyboy" with length 6.
```

## Constraints
- 1 <= s.length <= 10^4
- s consists of only English letters and spaces ' '.
- There will be at least one word in s.

## Approach

### Split Method
First trim the string to remove trailing and leading spaces, then split the string by spaces to get all words. Return the length of the last word in the array. Time complexity: O(n).

### Traversal from End
First trim the string, then start from the end and count characters until a space is encountered. This avoids creating an array of all words, which can be more memory-efficient. Time complexity: O(n).