# 83. Remove Duplicates from Sorted List

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def delete_duplicates(head):
    """Remove duplicates from a sorted linked list.
    
    Args:
        head: Head of sorted linked list
    
    Returns:
        Head of linked list with duplicates removed
    """
    # If the list is empty or has only one node, return it as is
    if not head or not head.next:
        return head
    
    current = head
    
    # Traverse the list
    while current and current.next:
        # If the current node's value is the same as the next node's value
        if current.val == current.next.val:
            # Skip the next node by updating the pointer
            current.next = current.next.next
        else:
            # Move to the next node
            current = current.next
    
    return head

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
l1 = create_linked_list([1, 1, 2])
result1 = delete_duplicates(l1)
print(linked_list_to_list(result1))  # [1, 2]

l2 = create_linked_list([1, 1, 2, 3, 3])
result2 = delete_duplicates(l2)
print(linked_list_to_list(result2))  # [1, 2, 3]