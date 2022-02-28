/**
 * 14. Longest Common Prefix
 * 
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return "";
    
    // Sort the array (this brings the shortest and alphabetically smallest strings to the front)
    strs.sort();
    
    // Take the first and last strings in the sorted array
    const first = strs[0];
    const last = strs[strs.length - 1];
    
    // Find the common prefix between these two strings
    // This will be the common prefix for all strings
    let commonLength = 0;
    for (let i = 0; i < Math.min(first.length, last.length); i++) {
        if (first[i] !== last[i]) {
            break;
        }
        commonLength++;
    }
    
    return first.substring(0, commonLength);
};

// Test cases
console.log(longestCommonPrefix(["flower", "flow", "flight"]));  // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""