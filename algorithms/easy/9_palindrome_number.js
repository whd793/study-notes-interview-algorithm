/**
 * 9. Palindrome Number
 * 
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // Negative numbers are not palindromes
    if (x < 0) return false;
    
    // Convert to string and check if it equals its reverse
    const str = x.toString();
    return str === str.split('').reverse().join('');
};

// Alternative solution without converting to string
var isPalindromeMath = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    
    let reversed = 0;
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // When length is odd, we need to remove the middle digit
    return x === reversed || x === Math.floor(reversed / 10);
};

// Test cases
console.log(isPalindrome(121));   // true
console.log(isPalindrome(-121));  // false
console.log(isPalindrome(10));    // false