# 136. Single Number

## Problem Statement
Given a **non-empty** array of integers `nums`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

## Examples

**Example 1:**
```
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**
```
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**
```
Input: nums = [1]
Output: 1
```

## Constraints
- 1 <= nums.length <= 3 * 10^4
- -3 * 10^4 <= nums[i] <= 3 * 10^4
- Each element in the array appears twice except for one element which appears only once.

## Approach

### XOR Approach
Use the XOR (exclusive OR) operation to find the single number. XOR has the following properties:
1. XOR of a number with itself is 0: a ⊕ a = 0
2. XOR of a number with 0 is the number itself: a ⊕ 0 = a
3. XOR is commutative and associative: a ⊕ b ⊕ a = (a ⊕ a) ⊕ b = 0 ⊕ b = b

By XORing all numbers in the array, the duplicate numbers will cancel out (become 0), and only the single number will remain. Time complexity: O(n). Space complexity: O(1).

### Hash Set Approach
Use a hash set to track numbers. Add a number to the set if it's not there, and remove it if it's already in the set. The only number left in the set will be the single number. Time complexity: O(n). Space complexity: O(n).