/**
 * 13. Roman to Integer
 * 
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    // Map each Roman numeral to its value
    const romanMap = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let result = 0;
    let prevValue = 0;
    
    // Traverse the string from right to left
    for (let i = s.length - 1; i >= 0; i--) {
        const currentValue = romanMap[s[i]];
        
        // If current value is greater than or equal to previous value, add it
        // Otherwise, subtract it (for cases like IV, IX, etc.)
        if (currentValue >= prevValue) {
            result += currentValue;
        } else {
            result -= currentValue;
        }
        
        prevValue = currentValue;
    }
    
    return result;
};

// Test cases
console.log(romanToInt("III"));     // 3
console.log(romanToInt("LVIII"));   // 58
console.log(romanToInt("MCMXCIV")); // 1994