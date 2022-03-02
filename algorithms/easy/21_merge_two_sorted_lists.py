# 21. Merge Two Sorted Lists

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def merge_two_lists(l1, l2):
    """Merge two sorted linked lists into one sorted linked list.
    
    Args:
        l1: Head of first sorted linked list
        l2: Head of second sorted linked list
    
    Returns:
        Head of merged sorted linked list
    """
    # Create a dummy head node to simplify edge cases
    dummy = ListNode(-1)
    current = dummy
    
    # Traverse both lists and compare values
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    # Attach the remaining nodes from either list
    current.next = l1 if l1 else l2
    
    # Return the head of the merged list (excluding dummy node)
    return dummy.next

# Helper function to create a linked list from a list of values
def create_linked_list(values):
    dummy = ListNode(-1)
    current = dummy
    for val in values:
        current.next = ListNode(val)
        current = current.next
    return dummy.next

# Helper function to convert a linked list to a list for easier printing
def linked_list_to_list(head):
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

# Test cases
l1 = create_linked_list([1, 2, 4])
l2 = create_linked_list([1, 3, 4])
merged = merge_two_lists(l1, l2)
print(linked_list_to_list(merged))  # [1, 1, 2, 3, 4, 4]