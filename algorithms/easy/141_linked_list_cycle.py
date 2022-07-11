# 141. Linked List Cycle

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def has_cycle(head):
    """Determine if a linked list has a cycle.
    
    Args:
        head: Head of the linked list
    
    Returns:
        Boolean indicating if the linked list has a cycle
    """
    # Edge case: empty list or a single node
    if not head or not head.next:
        return False
    
    # Use two pointers: slow moves one step at a time, fast moves two steps
    slow = head
    fast = head
    
    # If there's a cycle, the fast pointer will eventually catch up to the slow pointer
    while fast and fast.next:
        slow = slow.next        # Move slow one step
        fast = fast.next.next   # Move fast two steps
        
        # If they meet, there's a cycle
        if slow == fast:
            return True
    
    # If fast reaches the end of the list, there's no cycle
    return False

# Alternative implementation using a hash set
def has_cycle_hash_set(head):
    # Use a set to keep track of visited nodes
    visited = set()
    
    # Traverse the list
    current = head
    while current:
        # If the node is already in the set, there's a cycle
        if current in visited:
            return True
        
        # Add the current node to the set
        visited.add(current)
        
        # Move to the next node
        current = current.next
    
    # If we can reach the end of the list, there's no cycle
    return False

# Test cases
# Example 1: [3,2,0,-4] with a cycle from -4 to 2 => true
head1 = ListNode(3)
node2 = ListNode(2)
node0 = ListNode(0)
node4 = ListNode(-4)
head1.next = node2
node2.next = node0
node0.next = node4
node4.next = node2  # Creates a cycle
print(has_cycle(head1))  # True

# Example 2: [1,2] with a cycle from 2 to 1 => true
head2 = ListNode(1)
node2_2 = ListNode(2)
head2.next = node2_2
node2_2.next = head2  # Creates a cycle
print(has_cycle(head2))  # True

# Example 3: [1] => false
head3 = ListNode(1)
print(has_cycle(head3))  # False