# 11. Container With Most Water

## Problem Statement
You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `ith` line are `(i, 0)` and `(i, height[i])`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

**Notice** that you may not slant the container.

## Examples

**Example 1:**
```
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
```

**Example 2:**
```
Input: height = [1,1]
Output: 1
```

## Constraints
- n == height.length
- 2 <= n <= 10^5
- 0 <= height[i] <= 10^4

## Approach

### Two-Pointer Approach
Use two pointers, one at the beginning and one at the end of the array. The area of water contained between the lines is determined by the width (distance between the lines) and the height (minimum height of the two lines).

Strategy:
1. Start with the maximum width (pointers at both ends)
2. Calculate the area as min(height[left], height[right]) * (right - left)
3. Move the pointer pointing to the shorter line inward (since moving the taller line would only decrease the area)
4. Continue until the pointers meet

Time complexity: O(n) where n is the length of the height array.
Space complexity: O(1).

This approach works because even though we might miss some combinations in the middle, we can prove that those can't produce a larger area than what we've already seen.