/**
 * 119. Pascal's Triangle II
 * 
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    // Initialize the row with the first element
    const row = [1];
    
    // Generate the rest of the elements
    for (let i = 0; i < rowIndex; i++) {
        // Calculate the next element based on the previous one
        // Formula: next = prev * (rowIndex - i) / (i + 1)
        const nextVal = Math.floor(row[i] * (rowIndex - i) / (i + 1));
        row.push(nextVal);
    }
    
    return row;
};

// Alternative implementation that builds the entire row iteratively
var getRowIterative = function(rowIndex) {
    // Start with the first row
    let row = [1];
    
    // Generate each row until reaching the desired one
    for (let i = 0; i < rowIndex; i++) {
        // Create the next row using the current one
        const nextRow = [1];  // First element is always 1
        
        // Calculate the middle elements
        for (let j = 0; j < row.length - 1; j++) {
            nextRow.push(row[j] + row[j + 1]);
        }
        
        nextRow.push(1);  // Last element is always 1
        row = nextRow;
    }
    
    return row;
};

// Space-optimized implementation (O(k) space)
var getRowOptimized = function(rowIndex) {
    // Initialize the row with all 1's (final row length)
    const row = new Array(rowIndex + 1).fill(1);
    
    // Fill in the row from right to left (to avoid overwriting values we still need)
    for (let i = 1; i < rowIndex; i++) {
        for (let j = i; j > 0; j--) {
            row[j] = row[j] + row[j - 1];
        }
    }
    
    return row;
};

// Test cases
console.log(getRow(3));  // [1, 3, 3, 1]
console.log(getRow(0));  // [1]
console.log(getRow(1));  // [1, 1]

console.log(getRowIterative(3));  // [1, 3, 3, 1]
console.log(getRowOptimized(3));  // [1, 3, 3, 1]