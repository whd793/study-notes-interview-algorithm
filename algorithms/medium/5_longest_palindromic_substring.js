/**
 * 5. Longest Palindromic Substring
 * 
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s) return "";
    
    // Initialize variables to track the longest palindrome
    let start = 0;
    let maxLength = 1;
    
    // Helper function to expand around center
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;  // Length of palindrome
    }
    
    // Iterate through the string
    for (let i = 0; i < s.length; i++) {
        // Expand around center (odd length palindrome)
        const len1 = expandAroundCenter(i, i);
        
        // Expand around center (even length palindrome)
        const len2 = expandAroundCenter(i, i + 1);
        
        // Get the maximum length from both expansions
        const length = Math.max(len1, len2);
        
        // Update start and maxLength if a longer palindrome is found
        if (length > maxLength) {
            maxLength = length;
            start = i - Math.floor((length - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLength);
};

// Dynamic programming approach
var longestPalindromeDp = function(s) {
    if (!s) return "";
    
    const n = s.length;
    // Initialize a table to store palindrome status
    // dp[i][j] is true if substring s[i:j+1] is a palindrome
    const dp = Array(n).fill().map(() => Array(n).fill(false));
    
    // All substrings of length 1 are palindromes
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    let start = 0;
    let maxLength = 1;
    
    // Check substrings of length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }
    
    // Check substrings of length 3 and more
    for (let length = 3; length <= n; length++) {
        for (let i = 0; i <= n - length; i++) {
            const j = i + length - 1;  // ending index
            
            // Check if substring s[i+1:j] is a palindrome and s[i] === s[j]
            if (dp[i + 1][j - 1] && s[i] === s[j]) {
                dp[i][j] = true;
                if (length > maxLength) {
                    start = i;
                    maxLength = length;
                }
            }
        }
    }
    
    return s.substring(start, start + maxLength);
};

// Test cases
console.log(longestPalindrome("babad"));  // "bab" or "aba"
console.log(longestPalindrome("cbbd"));   // "bb"
console.log(longestPalindrome("a"));      // "a"
console.log(longestPalindrome("ac"));     // "a"

console.log(longestPalindromeDp("babad"));  // "bab" or "aba"
console.log(longestPalindromeDp("cbbd"));   // "bb"