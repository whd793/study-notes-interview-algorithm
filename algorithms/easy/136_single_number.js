/**
 * 136. Single Number
 * 
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    // Use XOR to find the single number
    // XOR of a number with itself is 0, and XOR of a number with 0 is the number itself
    // So XOR of all numbers will leave only the single number
    let result = 0;
    for (let num of nums) {
        result ^= num;
    }
    
    return result;
};

// Alternative implementation using a hash set
var singleNumberHashSet = function(nums) {
    // Use a set to keep track of numbers
    // Add a number to the set if it's not there, remove it if it's already there
    // The only number left in the set will be the single number
    const numSet = new Set();
    
    for (let num of nums) {
        if (numSet.has(num)) {
            numSet.delete(num);
        } else {
            numSet.add(num);
        }
    }
    
    // Return the only element in the set
    return [...numSet][0];
};

// Test cases
console.log(singleNumber([2, 2, 1]));          // 1
console.log(singleNumber([4, 1, 2, 1, 2]));     // 4
console.log(singleNumber([1]));                 // 1

console.log(singleNumberHashSet([2, 2, 1]));        // 1
console.log(singleNumberHashSet([4, 1, 2, 1, 2]));   // 4