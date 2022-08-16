/**
 * 3. Longest Substring Without Repeating Characters
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Edge case: empty string
    if (!s) return 0;
    
    // Map to store the last position of each character
    const charPosition = new Map();
    
    // Initialize variables to track the current substring
    let start = 0;
    let maxLength = 0;
    
    // Iterate through the string
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        // If the character is already in the current substring,
        // update the start position to exclude the previous occurrence
        if (charPosition.has(char) && start <= charPosition.get(char)) {
            start = charPosition.get(char) + 1;
        } else {
            // Update maxLength if the current substring is longer
            maxLength = Math.max(maxLength, i - start + 1);
        }
        
        // Update the last position of the character
        charPosition.set(char, i);
    }
    
    return maxLength;
};

// Test cases
console.log(lengthOfLongestSubstring("abcabcbb"));  // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb"));     // 1 ("b")
console.log(lengthOfLongestSubstring("pwwkew"));    // 3 ("wke")
console.log(lengthOfLongestSubstring(""));          // 0 (empty string)