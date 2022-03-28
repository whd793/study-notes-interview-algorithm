/**
 * 35. Search Insert Position
 * 
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // If target is not found, 'left' will be the position where it should be inserted
    return left;
};

// Test cases
console.log(searchInsert([1, 3, 5, 6], 5));      // 2
console.log(searchInsert([1, 3, 5, 6], 2));      // 1
console.log(searchInsert([1, 3, 5, 6], 7));      // 4
console.log(searchInsert([1, 3, 5, 6], 0));      // 0