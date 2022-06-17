# 121. Best Time to Buy and Sell Stock

def max_profit(prices):
    """Find the maximum profit from buying and selling a stock once.
    
    Args:
        prices: List of stock prices, where prices[i] is the price on day i
    
    Returns:
        Maximum profit that can be achieved
    """
    if not prices or len(prices) < 2:
        return 0
    
    # Initialize variables to keep track of minimum price and maximum profit
    min_price = prices[0]
    max_profit_value = 0
    
    # Iterate through the prices
    for price in prices:
        # Update the minimum price if a lower price is found
        min_price = min(min_price, price)
        
        # Update the maximum profit if a higher profit is possible
        current_profit = price - min_price
        max_profit_value = max(max_profit_value, current_profit)
    
    return max_profit_value

# Alternative implementation using two pointers
def max_profit_two_pointers(prices):
    if not prices or len(prices) < 2:
        return 0
    
    left = 0  # Buy position
    right = 1  # Sell position
    max_profit_value = 0
    
    while right < len(prices):
        # If the current price is higher than the buy price, calculate profit
        if prices[right] > prices[left]:
            current_profit = prices[right] - prices[left]
            max_profit_value = max(max_profit_value, current_profit)
        else:
            # If the current price is lower, it's a better buy opportunity
            left = right
        
        right += 1
    
    return max_profit_value

# Test cases
print(max_profit([7, 1, 5, 3, 6, 4]))  # 5 (buy at 1, sell at 6)
print(max_profit([7, 6, 4, 3, 1]))      # 0 (prices only decrease, no profit)

print(max_profit_two_pointers([7, 1, 5, 3, 6, 4]))  # 5
print(max_profit_two_pointers([7, 6, 4, 3, 1]))      # 0