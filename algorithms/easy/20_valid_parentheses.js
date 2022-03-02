/**
 * 20. Valid Parentheses
 * 
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    // Initialize a stack for keeping track of opening brackets
    const stack = [];
    
    // Define a mapping of closing brackets to their opening counterparts
    const mapping = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    // Iterate through each character in the string
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        // If the character is a closing bracket
        if (char in mapping) {
            // Pop the top element from the stack or use a dummy value '#' if stack is empty
            const topElement = stack.length > 0 ? stack.pop() : '#';
            
            // If the popped element doesn't match the corresponding opening bracket
            if (mapping[char] !== topElement) {
                return false;
            }
        } 
        // If the character is an opening bracket, push it onto the stack
        else {
            stack.push(char);
        }
    }
    
    // The stack should be empty if all brackets are properly matched
    return stack.length === 0;
};

// Test cases
console.log(isValid("()"));         // true
console.log(isValid("()[]{}"));    // true
console.log(isValid("(]"));        // false
console.log(isValid("([)]"));     // false
console.log(isValid("{[]}"));      // true