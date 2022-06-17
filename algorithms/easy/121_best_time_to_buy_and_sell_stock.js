/**
 * 121. Best Time to Buy and Sell Stock
 * 
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (!prices || prices.length < 2) return 0;
    
    // Initialize variables to keep track of minimum price and maximum profit
    let minPrice = prices[0];
    let maxProfitValue = 0;
    
    // Iterate through the prices
    for (let price of prices) {
        // Update the minimum price if a lower price is found
        minPrice = Math.min(minPrice, price);
        
        // Update the maximum profit if a higher profit is possible
        const currentProfit = price - minPrice;
        maxProfitValue = Math.max(maxProfitValue, currentProfit);
    }
    
    return maxProfitValue;
};

// Alternative implementation using two pointers
var maxProfitTwoPointers = function(prices) {
    if (!prices || prices.length < 2) return 0;
    
    let left = 0;  // Buy position
    let right = 1;  // Sell position
    let maxProfitValue = 0;
    
    while (right < prices.length) {
        // If the current price is higher than the buy price, calculate profit
        if (prices[right] > prices[left]) {
            const currentProfit = prices[right] - prices[left];
            maxProfitValue = Math.max(maxProfitValue, currentProfit);
        } else {
            // If the current price is lower, it's a better buy opportunity
            left = right;
        }
        
        right++;
    }
    
    return maxProfitValue;
};

// Test cases
console.log(maxProfit([7, 1, 5, 3, 6, 4]));  // 5 (buy at 1, sell at 6)
console.log(maxProfit([7, 6, 4, 3, 1]));      // 0 (prices only decrease, no profit)

console.log(maxProfitTwoPointers([7, 1, 5, 3, 6, 4]));  // 5
console.log(maxProfitTwoPointers([7, 6, 4, 3, 1]));      // 0