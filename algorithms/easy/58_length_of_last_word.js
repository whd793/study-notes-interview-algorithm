/**
 * 58. Length of Last Word
 * 
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    // Remove trailing and leading spaces, then split by spaces
    const words = s.trim().split(' ');
    
    // Return the length of the last word
    return words[words.length - 1].length;
};

// Alternative implementation without using split
var lengthOfLastWordAlt = function(s) {
    s = s.trim();  // Remove trailing and leading spaces
    let length = 0;
    
    // Start from the end and count characters until a space is encountered
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === ' ') {
            break;
        }
        length++;
    }
    
    return length;
};

// Test cases
console.log(lengthOfLastWord("Hello World"));         // 5
console.log(lengthOfLastWord("   fly me   to   the moon  "));  // 4
console.log(lengthOfLastWord("luffy is still joyboy"));  // 6