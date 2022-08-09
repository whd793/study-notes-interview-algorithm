/**
 * 168. Excel Sheet Column Title
 * 
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function(columnNumber) {
    let result = "";
    
    while (columnNumber > 0) {
        // Decrement by 1 to handle the 1-indexed nature of Excel columns
        columnNumber--;
        
        // Get the remainder when divided by 26 (number of letters in the alphabet)
        const remainder = columnNumber % 26;
        
        // Convert the remainder to the corresponding letter (A-Z) and add it to the result
        result = String.fromCharCode(65 + remainder) + result;
        
        // Integer division by 26 to get the next digit
        columnNumber = Math.floor(columnNumber / 26);
    }
    
    return result;
};

// Test cases
console.log(convertToTitle(1));     // "A"
console.log(convertToTitle(28));    // "AB"
console.log(convertToTitle(701));   // "ZY"
console.log(convertToTitle(2147483647));  // "FXSHRXW"