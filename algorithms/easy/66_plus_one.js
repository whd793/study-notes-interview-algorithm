/**
 * 66. Plus One
 * 
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    const n = digits.length;
    
    // Start from the least significant digit
    for (let i = n - 1; i >= 0; i--) {
        // If the current digit is less than 9, we can simply increment it and return
        if (digits[i] < 9) {
            digits[i]++;
            return digits;
        }
        
        // Otherwise, set the current digit to 0 and continue to the next digit
        digits[i] = 0;
    }
    
    // If we get here, it means all digits were 9, so we need to add a leading 1
    digits.unshift(1);
    return digits;
};

// Test cases
console.log(plusOne([1, 2, 3]));        // [1, 2, 4]
console.log(plusOne([4, 3, 2, 1]));      // [4, 3, 2, 2]
console.log(plusOne([9]));              // [1, 0]
console.log(plusOne([9, 9, 9]));        // [1, 0, 0, 0]