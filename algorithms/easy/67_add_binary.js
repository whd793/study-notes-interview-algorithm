/**
 * 67. Add Binary
 * 
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    // Using built-in methods (may not work for very large binary strings due to JS number limitations)
    return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2);
};

// Alternative implementation without built-in conversion
var addBinaryManual = function(a, b) {
    let result = "";
    // Start from the end of both strings
    let i = a.length - 1;
    let j = b.length - 1;
    let carry = 0;
    
    // Process both strings from right to left
    while (i >= 0 || j >= 0 || carry > 0) {
        // Get the current bits, or 0 if we've processed all bits
        const bitA = i >= 0 ? parseInt(a[i]) : 0;
        const bitB = j >= 0 ? parseInt(b[j]) : 0;
        
        // Calculate the sum and carry
        const sum = bitA + bitB + carry;
        result = (sum % 2) + result;  // Add the current bit to the result
        carry = Math.floor(sum / 2);  // Update the carry
        
        // Move to the next bits
        i--;
        j--;
    }
    
    return result;
};

// Test cases
console.log(addBinary("11", "1"));       // "100"
console.log(addBinary("1010", "1011"));  // "10101"