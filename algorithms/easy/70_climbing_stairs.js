/**
 * 70. Climbing Stairs
 * 
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // Base cases
    if (n <= 2) return n;
    
    // Initialize the first two numbers in the sequence
    let first = 1;
    let second = 2;
    
    // Calculate the rest of the sequence iteratively
    for (let i = 3; i <= n; i++) {
        const curr = first + second;
        first = second;
        second = curr;
    }
    
    return second;
};

// Alternative implementation using dynamic programming
var climbStairsDP = function(n) {
    if (n <= 2) return n;
    
    // Initialize DP array
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    // Fill the DP array
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
};

// Test cases
console.log(climbStairs(2));     // 2
console.log(climbStairs(3));     // 3
console.log(climbStairs(4));     // 5
console.log(climbStairs(5));     // 8