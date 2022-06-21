# 121. Best Time to Buy and Sell Stock

## Problem Statement
You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.

## Examples

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
```

## Constraints
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^4

## Approach

### One-Pass Approach
Keep track of the minimum price seen so far and the maximum profit that can be achieved. For each price, update the minimum price if necessary, and calculate the profit if we were to sell at the current price. Time complexity: O(n) where n is the number of prices.

### Two-Pointer Approach
Use two pointers: one for the buy position and one for the sell position. If the sell price is higher than the buy price, calculate the profit. If the sell price is lower than the buy price, move the buy position to the current position. Time complexity: O(n).