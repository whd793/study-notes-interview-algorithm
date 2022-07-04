# 136. Single Number

def single_number(nums):
    """Find the single element in an array where every other element appears twice.
    
    Args:
        nums: Array of integers
    
    Returns:
        The single element that appears only once
    """
    # Use XOR to find the single number
    # XOR of a number with itself is 0, and XOR of a number with 0 is the number itself
    # So XOR of all numbers will leave only the single number
    result = 0
    for num in nums:
        result ^= num
    
    return result

# Alternative implementation using a hash set
def single_number_hashset(nums):
    # Use a set to keep track of numbers
    # Add a number to the set if it's not there, remove it if it's already there
    # The only number left in the set will be the single number
    num_set = set()
    
    for num in nums:
        if num in num_set:
            num_set.remove(num)
        else:
            num_set.add(num)
    
    # Return the only element in the set
    return num_set.pop()

# Test cases
print(single_number([2, 2, 1]))          # 1
print(single_number([4, 1, 2, 1, 2]))     # 4
print(single_number([1]))                 # 1

print(single_number_hashset([2, 2, 1]))        # 1
print(single_number_hashset([4, 1, 2, 1, 2]))   # 4