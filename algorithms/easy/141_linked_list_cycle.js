/**
 * 141. Linked List Cycle
 * 
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    // Edge case: empty list or a single node
    if (!head || !head.next) return false;
    
    // Use two pointers: slow moves one step at a time, fast moves two steps
    let slow = head;
    let fast = head;
    
    // If there's a cycle, the fast pointer will eventually catch up to the slow pointer
    while (fast && fast.next) {
        slow = slow.next;        // Move slow one step
        fast = fast.next.next;   // Move fast two steps
        
        // If they meet, there's a cycle
        if (slow === fast) return true;
    }
    
    // If fast reaches the end of the list, there's no cycle
    return false;
};

// Alternative implementation using a hash set
var hasCycleHashSet = function(head) {
    // Use a set to keep track of visited nodes
    const visited = new Set();
    
    // Traverse the list
    let current = head;
    while (current) {
        // If the node is already in the set, there's a cycle
        if (visited.has(current)) return true;
        
        // Add the current node to the set
        visited.add(current);
        
        // Move to the next node
        current = current.next;
    }
    
    // If we can reach the end of the list, there's no cycle
    return false;
};

// Test cases
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// Example 1: [3,2,0,-4] with a cycle from -4 to 2 => true
const head1 = new ListNode(3);
const node2 = new ListNode(2);
const node0 = new ListNode(0);
const node4 = new ListNode(-4);
head1.next = node2;
node2.next = node0;
node0.next = node4;
node4.next = node2;  // Creates a cycle
console.log(hasCycle(head1));  // true

// Example 2: [1,2] with a cycle from 2 to 1 => true
const head2 = new ListNode(1);
const node2_2 = new ListNode(2);
head2.next = node2_2;
node2_2.next = head2;  // Creates a cycle
console.log(hasCycle(head2));  // true

// Example 3: [1] => false
const head3 = new ListNode(1);
console.log(hasCycle(head3));  // false