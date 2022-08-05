/**
 * 160. Intersection of Two Linked Lists
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    // Edge case: if either list is empty, there's no intersection
    if (!headA || !headB) return null;
    
    // Two pointers: one for each list
    let ptrA = headA;
    let ptrB = headB;
    
    // If the lists have different lengths, the pointers will eventually align
    // When ptrA reaches the end of list A, point it to the head of list B
    // When ptrB reaches the end of list B, point it to the head of list A
    // This way, both pointers will travel the same distance before meeting
    while (ptrA !== ptrB) {
        ptrA = ptrA === null ? headB : ptrA.next;
        ptrB = ptrB === null ? headA : ptrB.next;
    }
    
    // If there's an intersection, ptrA (which is the same as ptrB now) is the intersection point
    // If there's no intersection, ptrA and ptrB will both be null
    return ptrA;
};

// Alternative implementation using a hash set
var getIntersectionNodeHashSet = function(headA, headB) {
    // Use a set to store all nodes in list A
    const nodesInA = new Set();
    
    // Traverse list A and add all nodes to the set
    let current = headA;
    while (current) {
        nodesInA.add(current);
        current = current.next;
    }
    
    // Traverse list B and check if any node is in the set
    current = headB;
    while (current) {
        if (nodesInA.has(current)) {
            return current;
        }
        current = current.next;
    }
    
    // If no intersection is found, return null
    return null;
};

// Test cases
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// Example 1: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]
// The intersection node is the node with value 8
const headA1 = new ListNode(4);
headA1.next = new ListNode(1);
const interSection1 = new ListNode(8);
headA1.next.next = interSection1;
interSection1.next = new ListNode(4);
interSection1.next.next = new ListNode(5);

const headB1 = new ListNode(5);
headB1.next = new ListNode(6);
headB1.next.next = new ListNode(1);
headB1.next.next.next = interSection1;  // Points to the same node as in list A

console.log(getIntersectionNode(headA1, headB1) === interSection1);  // true

// Example 2: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4]
// The intersection node is the node with value 2
const headA2 = new ListNode(1);
headA2.next = new ListNode(9);
headA2.next.next = new ListNode(1);
const interSection2 = new ListNode(2);
headA2.next.next.next = interSection2;
interSection2.next = new ListNode(4);

const headB2 = new ListNode(3);
headB2.next = interSection2;  // Points to the same node as in list A

console.log(getIntersectionNode(headA2, headB2) === interSection2);  // true

// Example 3: intersectVal = 0, listA = [2,6,4], listB = [1,5]
// There is no intersection
const headA3 = new ListNode(2);
headA3.next = new ListNode(6);
headA3.next.next = new ListNode(4);

const headB3 = new ListNode(1);
headB3.next = new ListNode(5);

console.log(getIntersectionNode(headA3, headB3) === null);  // true