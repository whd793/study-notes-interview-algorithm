# 5. Longest Palindromic Substring

## Problem Statement
Given a string `s`, return the longest palindromic substring in `s`.

## Examples

**Example 1:**
```
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
```

**Example 2:**
```
Input: s = "cbbd"
Output: "bb"
```

## Constraints
- 1 <= s.length <= 1000
- s consist of only digits and English letters.

## Approach

### Expand Around Center
Observation: A palindrome mirrors around its center. There are two types of palindromes:
- Odd-length palindromes have a single character at the center (e.g., "racecar")
- Even-length palindromes have two characters at the center (e.g., "abba")

Algorithm:
1. For each position in the string, consider it as a potential center of a palindrome
2. For each center, expand outwards and check if the characters match
3. Update the longest palindrome found

Time complexity: O(n²) where n is the length of the string.
Space complexity: O(1).

### Dynamic Programming
Let dp[i][j] be true if substring s[i:j+1] is a palindrome and false otherwise.

Base cases:
- All substrings of length 1 are palindromes: dp[i][i] = true
- Substrings of length 2 are palindromes if both characters are the same: dp[i][i+1] = (s[i] == s[i+1])

Recurrence relation:
- dp[i][j] = true if dp[i+1][j-1] is true and s[i] == s[j]

Time complexity: O(n²) where n is the length of the string.
Space complexity: O(n²) for the DP table.