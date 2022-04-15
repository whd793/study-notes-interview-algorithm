# 70. Climbing Stairs

## Problem Statement
You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

## Constraints
- 1 <= n <= 45

## Approach

### Fibonacci Sequence
This problem is essentially asking for the (n+1)th Fibonacci number. The number of ways to reach the nth step is the sum of the ways to reach the (n-1)th step and the (n-2)th step. We can calculate this iteratively or recursively. Time complexity: O(n).

### Dynamic Programming
Create an array dp where dp[i] represents the number of ways to reach the ith step. Initialize dp[1] = 1 and dp[2] = 2, then for each subsequent step, dp[i] = dp[i-1] + dp[i-2]. Time complexity: O(n).