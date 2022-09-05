# JavaScript Basics

## Variable Declarations

JavaScript has three ways to declare variables: `var`, `let`, and `const`.

### var
- Function-scoped (not block-scoped)
- Hoisted to the top of its scope
- Can be redeclared and updated

```javascript
var x = 10;
if (true) {
  var x = 20; // Same variable!
}
console.log(x); // 20
```

### let
- Block-scoped
- Hoisted but not initialized (Temporal Dead Zone)
- Can be updated but not redeclared in the same scope

```javascript
let y = 10;
if (true) {
  let y = 20; // Different variable!
}
console.log(y); // 10
```

### const
- Block-scoped
- Must be initialized when declared
- Cannot be updated or redeclared
- For objects and arrays, the reference is constant but properties can be modified

```javascript
const z = 10;
// z = 20; // Error!

const obj = { name: 'John' };
obj.name = 'Jane'; // OK
// obj = {}; // Error!
```

## Data Types

JavaScript has 8 data types:

1. **Primitive Types**:
   - **Number**: Represents both integer and floating-point numbers
   - **String**: Sequence of characters
   - **Boolean**: `true` or `false`
   - **Undefined**: Variable declared but not assigned a value
   - **Null**: Represents the intentional absence of any value
   - **Symbol**: Unique and immutable primitive value
   - **BigInt**: Represents integers of arbitrary precision

2. **Reference Type**:
   - **Object**: Collections of key-value pairs

```javascript
// Primitive types
let num = 42;
let str = 'Hello';
let bool = true;
let undef;
let n = null;
let sym = Symbol('description');
let bigInt = 9007199254740991n;

// Reference type
let obj = { name: 'John', age: 30 };
let arr = [1, 2, 3]; // Array is a type of object
let func = function() {}; // Function is a type of object
```

## Type Coercion and Equality

JavaScript performs automatic type conversion when operations involve different types.

### Implicit Coercion
```javascript
'5' + 2; // '52' (number is converted to string)
'5' - 2; // 3 (string is converted to number)
5 + true; // 6 (true is converted to 1)
5 + false; // 5 (false is converted to 0)
5 + null; // 5 (null is converted to 0)
```

### Equality Operators
- **==** (Abstract Equality): Compares values after type conversion
- **===** (Strict Equality): Compares values without type conversion

```javascript
5 == '5'; // true (type coercion)
5 === '5'; // false (different types)

null == undefined; // true
null === undefined; // false
```

## Functions

Functions in JavaScript are first-class objects and can be:
- Assigned to variables
- Passed as arguments
- Returned from other functions

### Function Declarations vs Expressions

```javascript
// Function Declaration
function add(a, b) {
  return a + b;
}

// Function Expression
const subtract = function(a, b) {
  return a - b;
};

// Arrow Function
const multiply = (a, b) => a * b;
```

### Function Scope and Closures

A closure is a function that has access to its own scope, the scope of the outer function, and the global scope.

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

## Objects and Prototypes

Objects in JavaScript are collections of key-value pairs. Every object has a prototype, which is another object from which it inherits properties.

```javascript
// Object literal
const person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, my name is ${this.name}`;
  }
};

// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, my name is ${this.name}`;
};

const john = new Person('John', 30);
console.log(john.greet()); // "Hello, my name is John"
```

## ES6+ Features

ECMAScript 2015 (ES6) and later versions introduced many new features:

### Destructuring
```javascript
const person = { name: 'John', age: 30 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second] = numbers;
```

### Spread/Rest Operator
```javascript
// Spread
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

const obj1 = { name: 'John' };
const obj2 = { ...obj1, age: 30 };

// Rest
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
```

### Template Literals
```javascript
const name = 'John';
const greeting = `Hello, ${name}!`;
```

### Classes
```javascript
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
```

### Promises and Async/Await
```javascript
// Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    // Asynchronous operation
    setTimeout(() => {
      resolve('Data received');
    }, 1000);
  });
}

// Using Promise
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Using async/await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

## Event Loop and Asynchronous JavaScript

JavaScript is single-threaded but can handle asynchronous operations through its event loop.

### Call Stack, Callback Queue, and Event Loop
1. The **Call Stack** records where in the program we are
2. The **Callback Queue** holds callback functions waiting to be executed
3. The **Event Loop** checks if the call stack is empty and moves callbacks from the queue to the stack

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise resolved');
});

console.log('End');

// Output:
// Start
// End
// Promise resolved
// Timeout callback
```

## Common JavaScript Interview Questions

### What is the difference between `==` and `===`?
`==` performs type coercion before comparison, while `===` compares without type coercion.

### Explain hoisting
Hoisting is JavaScript's default behavior of moving declarations to the top of their scope during compilation.

### What is the `this` keyword?
`this` refers to the object that is executing the current function. Its value depends on how a function is called.

### What is event delegation?
Event delegation is a technique where you attach an event listener to a parent element instead of multiple child elements.

### What is a closure and why is it useful?
A closure is a function that has access to variables from its outer scope even after the outer function has finished executing. It's useful for data privacy, function factories, and maintaining state.
