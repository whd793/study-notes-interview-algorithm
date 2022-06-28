# 125. Valid Palindrome

## Problem Statement
A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.

## Examples

**Example 1:**
```
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
```

**Example 2:**
```
Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
```

**Example 3:**
```
Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
```

## Constraints
- 1 <= s.length <= 2 * 10^5
- s consists only of printable ASCII characters.

## Approach

### Filter and Reverse
Convert the string to lowercase and filter out non-alphanumeric characters. Then check if the resulting string is equal to its reverse. Time complexity: O(n) where n is the length of the string.

### Two-Pointer Approach
Use two pointers starting from both ends of the string. Skip non-alphanumeric characters and compare the characters at both pointers (ignoring case). If all comparisons match, the string is a palindrome. This approach can be more efficient as it doesn't require creating a new string. Time complexity: O(n).