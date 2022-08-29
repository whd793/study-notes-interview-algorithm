/**
 * 11. Container With Most Water
 * 
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Initialize two pointers at the ends of the array
    let left = 0;
    let right = height.length - 1;
    let maxWater = 0;
    
    // Move the pointers inward until they meet
    while (left < right) {
        // Calculate the width between the lines
        const width = right - left;
        
        // The amount of water is limited by the shorter line
        const water = width * Math.min(height[left], height[right]);
        
        // Update the maximum water area
        maxWater = Math.max(maxWater, water);
        
        // Move the pointer pointing to the shorter line inward
        // This is because moving the pointer with the taller line would only decrease the area
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
};

// Test cases
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));  // 49 (between heights 8 and 7)
console.log(maxArea([1, 1]));                        // 1 (between heights 1 and 1)
console.log(maxArea([4, 3, 2, 1, 4]));               // 16 (between heights 4 and 4)
console.log(maxArea([1, 2, 1]));                     // 2 (between heights 1 and 1)