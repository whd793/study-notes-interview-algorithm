/**
 * 125. Valid Palindrome
 * 
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // Convert to lowercase and filter out non-alphanumeric characters
    const filteredChars = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if the filtered string is equal to its reverse
    return filteredChars === filteredChars.split('').reverse().join('');
};

// Alternative implementation using two pointers
var isPalindromeTwoPointers = function(s) {
    // Convert to lowercase and filter out non-alphanumeric characters
    const filteredChars = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Use two pointers to compare characters from both ends
    let left = 0;
    let right = filteredChars.length - 1;
    
    while (left < right) {
        if (filteredChars[left] !== filteredChars[right]) {
            return false;
        }
        left++;
        right--;
    }
    
    return true;
};

// More efficient implementation without creating a new string
var isPalindromeEfficient = function(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters from the left
        while (left < right && !isAlphanumeric(s[left])) {
            left++;
        }
        
        // Skip non-alphanumeric characters from the right
        while (left < right && !isAlphanumeric(s[right])) {
            right--;
        }
        
        // Compare characters (case-insensitive)
        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
};

// Helper function to check if a character is alphanumeric
function isAlphanumeric(char) {
    const code = char.charCodeAt(0);
    return (code >= 48 && code <= 57) ||  // 0-9
           (code >= 65 && code <= 90) ||  // A-Z
           (code >= 97 && code <= 122);   // a-z
}

// Test cases
console.log(isPalindrome("A man, a plan, a canal: Panama"));  // true
console.log(isPalindrome("race a car"));                     // false
console.log(isPalindrome(" "));                              // true

console.log(isPalindromeTwoPointers("A man, a plan, a canal: Panama"));  // true
console.log(isPalindromeEfficient("A man, a plan, a canal: Panama"));     // true