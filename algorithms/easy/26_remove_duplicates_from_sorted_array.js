/**
 * 26. Remove Duplicates from Sorted Array
 * 
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    
    // Initialize the pointer for unique elements
    let i = 0;
    
    // Iterate through the array
    for (let j = 1; j < nums.length; j++) {
        // If the current element is different from the previous unique element
        if (nums[j] !== nums[i]) {
            // Move the unique pointer forward
            i++;
            // Update the element at the unique pointer position
            nums[i] = nums[j];
        }
    }
    
    // Return the length of the array with unique elements (i + 1)
    return i + 1;
};

// Test cases
const nums1 = [1, 1, 2];
const k1 = removeDuplicates(nums1);
console.log(k1, nums1.slice(0, k1));  // 2, [1, 2]

const nums2 = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k2 = removeDuplicates(nums2);
console.log(k2, nums2.slice(0, k2));  // 5, [0, 1, 2, 3, 4]