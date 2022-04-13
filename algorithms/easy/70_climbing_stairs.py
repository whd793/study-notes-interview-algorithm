# 70. Climbing Stairs

def climb_stairs(n):
    """Calculate the number of ways to climb n stairs.
    
    You can either climb 1 or 2 steps at a time.
    
    Args:
        n: Number of stairs
    
    Returns:
        Number of distinct ways to climb to the top
    """
    # Base cases
    if n <= 2:
        return n
    
    # Initialize the first two numbers in the sequence
    first, second = 1, 2
    
    # Calculate the rest of the sequence iteratively
    for i in range(3, n + 1):
        curr = first + second
        first = second
        second = curr
    
    return second

# Alternative implementation using dynamic programming
def climb_stairs_dp(n):
    if n <= 2:
        return n
    
    # Initialize DP array
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    # Fill the DP array
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Test cases
print(climb_stairs(2))     # 2
print(climb_stairs(3))     # 3
print(climb_stairs(4))     # 5
print(climb_stairs(5))     # 8