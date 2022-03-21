/**
 * 28. Find the Index of the First Occurrence in a String
 * 
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === "") return 0;
    
    // Get the lengths of both strings
    const m = haystack.length;
    const n = needle.length;
    
    // Check all potential starting positions
    for (let i = 0; i <= m - n; i++) {
        // Check if substring matches needle
        if (haystack.substring(i, i + n) === needle) {
            return i;
        }
    }
    
    // Needle not found
    return -1;
};

// Alternative implementation using built-in method
var strStrBuiltin = function(haystack, needle) {
    return haystack.indexOf(needle);
};

// Test cases
console.log(strStr("hello", "ll"));       // 2
console.log(strStr("aaaaa", "bba"));     // -1
console.log(strStr("", ""));             // 0