/**
 * 88. Merge Sorted Array
 * 
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // Start from the end of both arrays
    let p1 = m - 1;  // Pointer for nums1
    let p2 = n - 1;  // Pointer for nums2
    let p = m + n - 1;  // Pointer for the merged array
    
    // While there are elements in both arrays
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
    
    // If there are still elements in nums2, copy them to nums1
    // (No need to check for remaining elements in nums1, they're already in place)
    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }
};

// Test cases
const nums1 = [1, 2, 3, 0, 0, 0];
merge(nums1, 3, [2, 5, 6], 3);
console.log(nums1);  // [1, 2, 2, 3, 5, 6]

const nums2 = [1];
merge(nums2, 1, [], 0);
console.log(nums2);  // [1]

const nums3 = [0];
merge(nums3, 0, [1], 1);
console.log(nums3);  // [1]