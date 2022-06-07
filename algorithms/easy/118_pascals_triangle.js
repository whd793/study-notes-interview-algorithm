/**
 * 118. Pascal's Triangle
 * 
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    // Base case
    if (numRows === 0) return [];
    
    // Initialize the result with the first row
    const result = [[1]];
    
    // Generate the rest of the rows
    for (let i = 1; i < numRows; i++) {
        // Each row starts with 1
        const row = [1];
        
        // Calculate the middle elements of the row
        for (let j = 1; j < i; j++) {
            // Each element is the sum of the two elements above it
            row.push(result[i-1][j-1] + result[i-1][j]);
        }
        
        // Each row ends with 1
        row.push(1);
        
        // Add the row to the result
        result.push(row);
    }
    
    return result;
};

// Test cases
console.log(generate(5));  // [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
console.log(generate(1));  // [[1]]

// Mathematical approach using combinations
var generateMath = function(numRows) {
    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }
    
    function combination(n, k) {
        return factorial(n) / (factorial(k) * factorial(n - k));
    }
    
    const result = [];
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j <= i; j++) {
            row.push(combination(i, j));
        }
        result.push(row);
    }
    
    return result;
};

console.log(generateMath(5));  // [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]