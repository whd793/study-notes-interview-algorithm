# 3. Longest Substring Without Repeating Characters

## Problem Statement
Given a string `s`, find the length of the longest substring without repeating characters.

## Examples

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**
```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

## Constraints
- 0 <= s.length <= 5 * 10^4
- s consists of English letters, digits, symbols and spaces.

## Approach

### Sliding Window with Hash Map
Use a sliding window approach with a hash map to track the last position of each character. When a repeating character is encountered, move the start of the window to the position after the last occurrence of that character. This ensures that the current window always contains unique characters.

For each character:
1. If the character is already in the current window, update the start position to exclude the previous occurrence
2. Otherwise, update the maximum length if the current window is longer
3. Update the last position of the character

Time complexity: O(n) where n is the length of the string. Each character is processed exactly once.
Space complexity: O(min(m, n)) where m is the size of the character set and n is the length of the string.