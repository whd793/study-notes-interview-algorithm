# Describe Closure in JavaScript

**Answer:**

A closure in JavaScript is a function that has access to its own scope, the outer function's scope, and the global scope, even after the outer function has finished executing.

In simpler terms, closures allow functions to "remember" and access variables from the place where they were created, even when executed elsewhere.

## How Closures Work

```javascript
function createCounter() {
  let count = 0;  // Local variable
  
  return function() {
    count++;  // Accessing the outer function's variable
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

In this example, the inner function maintains access to `count` even after `createCounter()` has finished execution. The variable `count` is "enclosed" in the returned function's scope.

## Practical Applications

1. **Data Privacy/Encapsulation**
```javascript
function createWallet(initialBalance) {
  let balance = initialBalance;
  
  return {
    getBalance: function() { return balance; },
    deposit: function(amount) { balance += amount; },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return true;
      }
      return false;
    }
  };
}

const wallet = createWallet(100);
// No direct access to balance variable
```

2. **Function Factories**
```javascript
function multiplyBy(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

3. **Event Handlers and Callbacks**
```javascript
function setupButton(buttonId, message) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', function() {
    // Closure captures the message variable
    alert(message);
  });
}
```

Closures are fundamental to JavaScript's functional programming style and are widely used in modern JavaScript patterns like module systems, async programming, and React hooks.