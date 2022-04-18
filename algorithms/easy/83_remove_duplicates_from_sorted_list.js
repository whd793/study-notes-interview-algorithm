/**
 * 83. Remove Duplicates from Sorted List
 * 
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // If the list is empty or has only one node, return it as is
    if (!head || !head.next) return head;
    
    let current = head;
    
    // Traverse the list
    while (current && current.next) {
        // If the current node's value is the same as the next node's value
        if (current.val === current.next.val) {
            // Skip the next node by updating the pointer
            current.next = current.next.next;
        } else {
            // Move to the next node
            current = current.next;
        }
    }
    
    return head;
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
const l1 = createLinkedList([1, 1, 2]);
const result1 = deleteDuplicates(l1);
console.log(linkedListToArray(result1));  // [1, 2]

const l2 = createLinkedList([1, 1, 2, 3, 3]);
const result2 = deleteDuplicates(l2);
console.log(linkedListToArray(result2));  // [1, 2, 3]
*/