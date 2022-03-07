/**
 * 21. Merge Two Sorted Lists
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    // Create a dummy head node to simplify edge cases
    const dummy = new ListNode(-1);
    let current = dummy;
    
    // Traverse both lists and compare values
    while (l1 && l2) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }
    
    // Attach the remaining nodes from either list
    current.next = l1 ? l1 : l2;
    
    // Return the head of the merged list (excluding dummy node)
    return dummy.next;
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    const dummy = new ListNode(-1);
    let current = dummy;
    for (const val of arr) {
        current.next = new ListNode(val);
        current = current.next;
    }
    return dummy.next;
}

// Helper function to convert a linked list to an array for easier printing
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

// Test cases
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// Uncomment to test
/*
const l1 = createLinkedList([1, 2, 4]);
const l2 = createLinkedList([1, 3, 4]);
const merged = mergeTwoLists(l1, l2);
console.log(linkedListToArray(merged));  // [1, 1, 2, 3, 4, 4]
*/