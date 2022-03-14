/**
 * 27. Remove Element
 * 
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // Initialize the pointer for elements not equal to val
    let i = 0;
    
    // Iterate through the array
    for (let j = 0; j < nums.length; j++) {
        // If the current element is not equal to val
        if (nums[j] !== val) {
            // Place it at the position indicated by the pointer
            nums[i] = nums[j];
            // Increment the pointer
            i++;
        }
    }
    
    // Return the length of the array without val elements
    return i;
};

// Test cases
const nums1 = [3, 2, 2, 3];
const val1 = 3;
const k1 = removeElement(nums1, val1);
console.log(k1, nums1.slice(0, k1));  // 2, [2, 2]

const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
const val2 = 2;
const k2 = removeElement(nums2, val2);
console.log(k2, nums2.slice(0, k2));  // 5, [0, 1, 3, 0, 4]