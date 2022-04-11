/**
 * 69. Sqrt(x)
 * 
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    // Handle edge cases
    if (x === 0 || x === 1) return x;
    
    // Binary search for the square root
    let left = 1;
    let right = x;
    
    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const square = mid * mid;
        
        if (square === x) {
            return mid;
        } else if (square < x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // When the loop ends, 'right' will be the integer square root of x
    return right;
};

// Alternative implementation using Newton's method
var mySqrtNewton = function(x) {
    if (x === 0 || x === 1) return x;
    
    let r = x;
    while (r > x / r) {
        r = Math.floor((r + x / r) / 2);
    }
    
    return Math.floor(r);
};

// Test cases
console.log(mySqrt(4));     // 2
console.log(mySqrt(8));     // 2
console.log(mySqrt(9));     // 3
console.log(mySqrt(16));    // 4
console.log(mySqrt(17));    // 4