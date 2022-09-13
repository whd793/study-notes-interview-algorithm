# Frontend Trivia Answers

## JavaScript

### Answer: What is the difference between `==` and `===` operators?

The `==` (equality) operator compares values after converting them to a common type, which is called "type coercion." The `===` (strict equality) operator compares both value and type, without any type conversion.

Examples:
```javascript
5 == '5'    // true (string '5' is converted to number 5)
5 === '5'   // false (different types: number vs string)

null == undefined  // true
null === undefined  // false

0 == false  // true
0 === false  // false
```

In modern JavaScript, it's generally recommended to use `===` to avoid unexpected type conversion issues.

### Answer: Explain how prototypal inheritance works in JavaScript.

Prototypal inheritance is the mechanism by which objects in JavaScript inherit properties and methods from other objects. Each object has an internal property called `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`) that references another object (its prototype).

When accessing a property or method on an object, JavaScript first looks for it directly on the object. If not found, it continues searching up the prototype chain until it either finds the property or reaches the end of the chain (typically `Object.prototype`).

```javascript
// Constructor function
function Person(name) {
  this.name = name;
}

// Adding a method to the prototype
Person.prototype.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

// Creating an instance
const john = new Person('John');
console.log(john.sayHello());  // "Hello, my name is John"

// Class syntax (ES6+) - syntactic sugar over prototypal inheritance
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

const dog = new Dog('Rex');
console.log(dog.speak());  // "Rex barks."
```

### Answer: What is event bubbling and capturing in the DOM?

Event bubbling and capturing are the two phases of event propagation in the DOM:

**Event Capturing (Trickling)**: The event starts from the root element and travels down to the target element. This is the first phase of event propagation.

**Event Bubbling**: After reaching the target element, the event bubbles up from the target element to the root element. This is the second phase.

By default, event handlers are executed during the bubbling phase. To handle events during the capturing phase, you need to set the third parameter of `addEventListener` to `true`.

```javascript
// Bubbling phase (default)
document.querySelector('#parent').addEventListener('click', function() {
  console.log('Parent clicked - bubbling phase');
});

// Capturing phase
document.querySelector('#child').addEventListener('click', function() {
  console.log('Child clicked - capturing phase');
}, true);

// Stopping propagation
document.querySelector('#button').addEventListener('click', function(event) {
  event.stopPropagation();  // Prevents further bubbling
  console.log('Button clicked - propagation stopped');
});
```

Event delegation is a technique that leverages event bubbling to handle events for multiple elements with a single event listener on a common ancestor.

### Answer: What is the difference between `let`, `const`, and `var`?

**`var`** (pre-ES6):
- Function-scoped (or globally-scoped if declared outside a function)
- Hoisted to the top of its scope and initialized with `undefined`
- Can be redeclared and updated
- No block scope (if statements, loops, etc.)

**`let`** (ES6+):
- Block-scoped
- Hoisted but not initialized (results in ReferenceError if accessed before declaration, known as the "Temporal Dead Zone")
- Can be updated but not redeclared in the same scope
- More predictable behavior in loops

**`const`** (ES6+):
- Block-scoped like `let`
- Must be initialized at declaration
- Cannot be reassigned to a different value
- For objects and arrays, the binding is immutable but the content can be modified

```javascript
// var example
function varExample() {
  var x = 1;
  if (true) {
    var x = 2;  // Same variable
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

// let example
function letExample() {
  let y = 1;
  if (true) {
    let y = 2;  // Different variable
    console.log(y);  // 2
  }
  console.log(y);  // 1
}

// const example
const z = { name: 'John' };
// z = {}; // Error: Assignment to constant variable
z.name = 'Jane';  // OK: Modifying property of constant object
```

### Answer: What are closures in JavaScript and why are they useful?

A closure is a function that has access to its own scope, the scope of the outer function, and the global scope, even after the outer function has finished executing. Closures are created when a function is defined within another function, allowing the inner function to access the outer function's variables.

Closures are useful for:
1. **Data encapsulation and privacy** - Creating private variables and methods
2. **Function factories** - Creating functions with customized behavior
3. **Maintaining state** - Preserving values between function calls
4. **Implementing modules** - Organizing code with public and private parts

```javascript
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getValue: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getValue());   // 2
console.log(counter.decrement());  // 1
```

In this example, the `count` variable is not accessible directly from outside, but the returned functions form a closure that can access and modify it.

### Answer: What is the difference between synchronous and asynchronous code?

**Synchronous code** executes line by line, blocking further execution until the current operation completes. Each operation must finish before the next one starts.

**Asynchronous code** allows operations to proceed in the background without blocking the main thread. Code execution continues while waiting for asynchronous operations to complete.

```javascript
// Synchronous code
console.log("Start");
function syncOperation() {
  // This blocks execution until it completes
  const result = someTimeConsumingOperation();
  return result;
}
const result = syncOperation();
console.log("Result:", result);
console.log("End");  // Will only run after syncOperation completes

// Asynchronous code
console.log("Start");
function asyncOperation() {
  // This doesn't block execution
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("async result");
    }, 1000);
  });
}
asyncOperation().then(result => {
  console.log("Result:", result);
});
console.log("End");  // Runs before asyncOperation completes
```

Common asynchronous operations in JavaScript include:
- Fetching data from an API (`fetch`)
- Reading/writing files (in Node.js)
- Setting timers (`setTimeout`, `setInterval`)
- Event handlers

Asynchronous programming in JavaScript is typically handled using:
- Callbacks (older approach)
- Promises (ES6+)
- Async/await (ES2017+)

### Answer: Explain the concept of hoisting in JavaScript.

Hoisting is JavaScript's default behavior of moving declarations to the top of their containing scope during the compilation phase, before the code is executed.

**Variable hoisting:**
- `var` declarations are hoisted and initialized with `undefined`
- `let` and `const` declarations are hoisted but not initialized (Temporal Dead Zone)

**Function hoisting:**
- Function declarations are hoisted completely (both declaration and definition)
- Function expressions (including arrow functions) are not hoisted if assigned to variables declared with `let` or `const`

```javascript
// What we write:
console.log(x);  // undefined (not an error)
var x = 5;
console.log(x);  // 5

// How JavaScript interprets it:
var x;           // Hoisted declaration
console.log(x);  // undefined
x = 5;           // Assignment stays in place
console.log(x);  // 5

// For let/const:
console.log(y);  // ReferenceError: Cannot access 'y' before initialization
let y = 10;

// Function declaration (hoisted completely)
console.log(add(2, 3));  // 5 (works because the function is hoisted)
function add(a, b) {
  return a + b;
}

// Function expression (only the variable declaration is hoisted)
console.log(subtract(5, 2));  // TypeError: subtract is not a function
var subtract = function(a, b) {
  return a - b;
};
```

### Answer: What is the event loop in JavaScript?

The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It works by continuously checking if the call stack is empty and moving callbacks from the task queue to the call stack when it is.

Components of the event loop system:

1. **Call Stack**: Tracks function calls in the program. Functions are added to the stack when called and removed when they return.

2. **Heap**: Where objects are stored in memory.

3. **Task Queue (Macrotask Queue)**: Contains callbacks from asynchronous operations (setTimeout, DOM events, etc.) waiting to be executed.

4. **Microtask Queue**: Contains callbacks from Promises and similar APIs. Microtasks have priority over macrotasks and are processed after the current script or task completes.

5. **Event Loop**: Continuously checks if the call stack is empty. When empty, it first processes all microtasks, then takes one task from the task queue and pushes it onto the call stack.

```javascript
console.log('Start');  // 1. Added to call stack and executed immediately

setTimeout(() => {
  console.log('Timeout');  // 4. Executed after microtasks when call stack is empty
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');  // 3. Executed after call stack is empty (microtask)
});

console.log('End');  // 2. Added to call stack and executed immediately

// Output order:
// Start
// End
// Promise
// Timeout
```

Understanding the event loop is crucial for handling asynchronous operations correctly and avoiding blocking the main thread.

### Answer: What are Promises and how do they work?

Promises are objects that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner way to handle asynchronous code compared to callbacks.

A Promise can be in one of three states:
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: The operation completed successfully
3. **Rejected**: The operation failed

Promises have the following methods:
- **`.then()`**: Handles the fulfillment case and returns a new Promise
- **`.catch()`**: Handles the rejection case and returns a new Promise
- **`.finally()`**: Executes regardless of success or failure

```javascript
// Creating a Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Async operation
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve('Data fetched successfully');
      } else {
        reject('Error fetching data');
      }
    }, 1000);
  });
};

// Using the Promise
fetchData()
  .then(data => {
    console.log('Success:', data);
    return processData(data);  // Return another Promise for chaining
  })
  .then(result => {
    console.log('Processed:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Operation completed');
  });

// Promise static methods
Promise.all([fetchUsers(), fetchPosts()])  // Waits for all promises to resolve
  .then(([users, posts]) => {
    console.log('All data loaded:', users, posts);
  });

Promise.race([fetchFast(), fetchSlow()])  // Returns the first promise to settle
  .then(result => {
    console.log('First result:', result);
  });
```

Promises can be chained to handle sequences of asynchronous operations, making the code more readable and avoiding "callback hell."

### Answer: What is the difference between `null` and `undefined`?

**`undefined`** represents a variable that has been declared but not assigned a value. It's JavaScript's default value for:
- Variables that are declared but not initialized
- Function parameters that are not provided
- Function return values when nothing is explicitly returned
- Object properties that don't exist

**`null`** represents the intentional absence of any object value. It's a value that must be explicitly assigned.

Comparisons:
```javascript
typeof undefined  // 'undefined'
typeof null       // 'object' (this is considered a historical bug in JavaScript)

null == undefined   // true (loose equality performs type coercion)
null === undefined  // false (strict equality checks type)

Number(null)      // 0
Number(undefined) // NaN
```

Examples:
```javascript
// undefined examples
let variable;  // undefined
function test(param) { console.log(param); }  // param is undefined when not provided
test();  // logs: undefined
function noReturn() { /* no return statement */ }
console.log(noReturn());  // undefined
const obj = {};
console.log(obj.nonExistentProperty);  // undefined

// null examples
let empty = null;  // explicitly empty value
let user = { name: 'John' };
user = null;  // explicitly indicating that user no longer references an object
```

In practice, `null` is typically used to explicitly indicate "no value" or "empty," while `undefined` represents the default uninitialized state.
