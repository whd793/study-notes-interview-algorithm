# 160. Intersection of Two Linked Lists

# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def get_intersection_node(headA, headB):
    """Find the node where two linked lists intersect.
    
    Args:
        headA: Head of first linked list
        headB: Head of second linked list
    
    Returns:
        The node where the two lists intersect, or None if they don't
    """
    # Edge case: if either list is empty, there's no intersection
    if not headA or not headB:
        return None
    
    # Two pointers: one for each list
    ptrA = headA
    ptrB = headB
    
    # If the lists have different lengths, the pointers will eventually align
    # When ptrA reaches the end of list A, point it to the head of list B
    # When ptrB reaches the end of list B, point it to the head of list A
    # This way, both pointers will travel the same distance before meeting
    while ptrA != ptrB:
        ptrA = headB if ptrA is None else ptrA.next
        ptrB = headA if ptrB is None else ptrB.next
    
    # If there's an intersection, ptrA (which is the same as ptrB now) is the intersection point
    # If there's no intersection, ptrA and ptrB will both be None
    return ptrA

# Alternative implementation using a hash set
def get_intersection_node_hash_set(headA, headB):
    # Use a set to store all nodes in list A
    nodes_in_A = set()
    
    # Traverse list A and add all nodes to the set
    current = headA
    while current:
        nodes_in_A.add(current)
        current = current.next
    
    # Traverse list B and check if any node is in the set
    current = headB
    while current:
        if current in nodes_in_A:
            return current
        current = current.next
    
    # If no intersection is found, return None
    return None

# Test cases
# Example 1: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
# The intersection node is the node with value 8
headA1 = ListNode(4)
headA1.next = ListNode(1)
interSection1 = ListNode(8)
headA1.next.next = interSection1
interSection1.next = ListNode(4)
interSection1.next.next = ListNode(5)

headB1 = ListNode(5)
headB1.next = ListNode(6)
headB1.next.next = ListNode(1)
headB1.next.next.next = interSection1  # Points to the same node as in list A

print(get_intersection_node(headA1, headB1) == interSection1)  # True

# Example 2: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]
# The intersection node is the node with value 2
headA2 = ListNode(1)
headA2.next = ListNode(9)
headA2.next.next = ListNode(1)
interSection2 = ListNode(2)
headA2.next.next.next = interSection2
interSection2.next = ListNode(4)

headB2 = ListNode(3)
headB2.next = interSection2  # Points to the same node as in list A

print(get_intersection_node(headA2, headB2) == interSection2)  # True

# Example 3: intersectVal = 0, listA = [2,6,4], listB = [1,5]
# There is no intersection
headA3 = ListNode(2)
headA3.next = ListNode(6)
headA3.next.next = ListNode(4)

headB3 = ListNode(1)
headB3.next = ListNode(5)

print(get_intersection_node(headA3, headB3) is None)  # True