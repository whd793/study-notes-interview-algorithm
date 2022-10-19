# Explain the concept of hoisting in JavaScript

**Answer:**

Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during the compilation phase, before the code is executed. This means that regardless of where declarations appear in your code, they are conceptually "moved" to the top of their scope.

## Function Hoisting

### Function Declarations

Function declarations are completely hoisted, meaning both the declaration and the function body are moved to the top of their scope.

```javascript
// We can call the function before its declaration
sayHello(); // Outputs: "Hello, World!"

// Function declaration
function sayHello() {
  console.log("Hello, World!");
}
```

During the compilation phase, the JavaScript engine effectively reorganizes the code like this:

```javascript
// Hoisted function declaration
function sayHello() {
  console.log("Hello, World!");
}

// Function call
sayHello(); // Outputs: "Hello, World!"
```

### Function Expressions

Function expressions, unlike function declarations, are not hoisted in their entirety. Only the variable declaration is hoisted, not the function assignment.

```javascript
// Error: TypeError: sayHi is not a function
// sayHi();

// Function expression
var sayHi = function() {
  console.log("Hi, World!");
};

// Now it works
sayHi(); // Outputs: "Hi, World!"
```

During the compilation phase, the JavaScript engine reorganizes this code like:

```javascript
// Variable declaration is hoisted
var sayHi; // Initialized as undefined

// Error if called here: sayHi is undefined, not a function
// sayHi();

// Function assignment occurs here during execution
sayHi = function() {
  console.log("Hi, World!");
};

// Now it works
sayHi();
```

### Arrow Functions

Arrow functions behave like function expressions with regard to hoisting:

```javascript
// Error: TypeError: greet is not a function
// greet();

// Arrow function expression
var greet = () => {
  console.log("Greetings!");
};

// Now it works
greet(); // Outputs: "Greetings!"
```

## Variable Hoisting

### var

Variables declared with `var` are hoisted to the top of their function or global scope. The declaration is hoisted, but not the initialization - the variable is initialized with a value of `undefined`.

```javascript
console.log(x); // Outputs: undefined (not an error!)
var x = 5;
console.log(x); // Outputs: 5
```

This is equivalent to:

```javascript
// Declaration is hoisted
var x;

console.log(x); // undefined
x = 5; // Initialization stays in place
console.log(x); // 5
```

### let and const

Variables declared with `let` and `const` are also hoisted, but they are not initialized with a value of `undefined`. They exist in a "temporal dead zone" (TDZ) from the start of the block until the declaration is processed.

```javascript
// This causes a ReferenceError
// console.log(y);
let y = 10;

// Same for const
// console.log(z);
const z = 15;
```

While hoisting still occurs with `let` and `const`, trying to access these variables before their declaration results in a ReferenceError rather than returning `undefined`.

## Temporal Dead Zone (TDZ) Explained

The TDZ is the period between entering a scope where a variable is declared (when hoisting occurs) and the actual declaration statement.

```javascript
{
  // TDZ for myVar starts here
  
  // Accessing myVar here would cause a ReferenceError
  // console.log(myVar); // Error: Cannot access 'myVar' before initialization
  
  let myVar = 'Hello'; // TDZ ends here
  
  console.log(myVar); // Works fine: 'Hello'
}
```

## Class Hoisting

Classes, like `let` and `const` declarations, are hoisted but remain uninitialized until evaluation. This creates a TDZ:

```javascript
// This causes a ReferenceError
// const p = new Person();

class Person {
  constructor(name) {
    this.name = name;
  }
}

// This works
const p = new Person('John');
```

## Hoisting with Function Scopes vs. Block Scopes

### Function Scope (var)

```javascript
function example() {
  console.log(x); // undefined
  
  if (true) {
    var x = 'I am hoisted to function scope';
  }
  
  console.log(x); // 'I am hoisted to function scope'
}

example();
```

### Block Scope (let/const)

```javascript
function example() {
  // Cannot access y here (TDZ)
  // console.log(y);
  
  if (true) {
    let y = 'I am block scoped';
    console.log(y); // 'I am block scoped'
  }
  
  // y is not accessible here
  // console.log(y); // ReferenceError
}

example();
```

## Function and Variable Declaration Priority

When both a variable and a function have the same name, the function declaration takes precedence.

```javascript
console.log(duplicate); // [Function: duplicate]

var duplicate = 'I am a variable';

function duplicate() {
  return 'I am a function';
}

console.log(duplicate); // 'I am a variable'
```

However, reassigning the variable after the function declaration will override the function:

```javascript
function duplicate() {
  return 'I am a function';
}

var duplicate; // This doesn't affect the function

console.log(duplicate); // [Function: duplicate]

duplicate = 'Now I am a variable';

console.log(duplicate); // 'Now I am a variable'
```

## Practical Implications

### Avoiding Hoisting-Related Bugs

1. **Declare variables at the top of their scope**

```javascript
function calculateArea(radius) {
  // Declare all variables at the top
  var pi = 3.14159;
  var area;
  
  // Rest of the function
  area = pi * radius * radius;
  return area;
}
```

2. **Use let and const instead of var**

```javascript
// let and const provide clearer scoping and avoid some hoisting issues
function betterFunction() {
  let count = 0;
  const MAX = 100;
  
  // Logic here
}
```

3. **Use function expressions with const for more predictable behavior**

```javascript
// Function is only available after declaration
const calculateTotal = function(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
};
```

### Leveraging Hoisting

There are cases where understanding hoisting can be beneficial:

1. **Organize code with core functions at the bottom**

```javascript
function main() {
  setupEnvironment();
  initializeData();
  renderUI();
  attachEventListeners();
}

// Called above but defined below
function setupEnvironment() {
  // Implementation
}

function initializeData() {
  // Implementation
}

// etc.
```

2. **Mutual recursion is possible with function declarations**

```javascript
function isEven(n) {
  if (n === 0) return true;
  return isOdd(Math.abs(n) - 1);
}

function isOdd(n) {
  if (n === 0) return false;
  return isEven(Math.abs(n) - 1);
}

console.log(isEven(4)); // true
console.log(isOdd(5));  // true
```

## Hoisting in Modern JavaScript

In modern JavaScript development, hoisting is less of an issue because of:

1. **Block-scoped variables**: `let` and `const` reduce unexpected behavior
2. **Strict mode**: Catches some issues that hoisting might mask
3. **ESLint rules**: Tools can enforce declaration before use
4. **Modules**: Better organization that reduces reliance on hoisting

```javascript
// Modern JavaScript approach
'use strict';

// Import dependencies at the top
import { helper } from './helper.js';

// Constants
const API_URL = 'https://api.example.com';

// Function declarations
function fetchData() {
  // implementation
}

// Main code
fetchData();
```

## Key Takeaways

1. **Function declarations** are fully hoisted with their implementation
2. **Variable declarations** (`var`) are hoisted but initialized as `undefined`
3. **let/const/class** declarations are hoisted but not initialized (TDZ)
4. **Function expressions** and **arrow functions** are not hoisted as functions
5. Hoisting happens on a **per-scope basis**
6. Understanding hoisting helps avoid bugs and understand JavaScript behavior