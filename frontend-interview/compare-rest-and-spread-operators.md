# Compare Rest and Spread Operators in JavaScript

**Answer:**

The rest (`...`) and spread (`...`) operators in JavaScript share the same syntax but serve opposite purposes. While they look identical, their functionality differs based on context.

## Rest Operator

The rest operator collects multiple elements into a single array or object. It's used in function parameters or destructuring assignments.

### In Function Parameters

```javascript
// Collects all remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5); // 15
```

### In Array Destructuring

```javascript
const [first, second, ...rest] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
```

### In Object Destructuring

```javascript
const { name, age, ...otherProps } = {
  name: 'Alex',
  age: 30,
  occupation: 'Developer',
  location: 'New York'
};

console.log(name); // 'Alex'
console.log(age); // 30
console.log(otherProps); // { occupation: 'Developer', location: 'New York' }
```

## Spread Operator

The spread operator expands an array or object into individual elements. It's used when you want to include elements of one array/object in another.

### With Arrays

```javascript
// Combining arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Cloning arrays
const original = [1, 2, 3];
const copy = [...original];

// Inserting elements
const fruits = ['apple', 'orange'];
const moreFruits = ['banana', ...fruits, 'kiwi'];
console.log(moreFruits); // ['banana', 'apple', 'orange', 'kiwi']
```

### With Objects

```javascript
// Combining objects
const defaults = { theme: 'dark', fontSize: 16 };
const userPrefs = { fontSize: 18, showSidebar: true };
const settings = { ...defaults, ...userPrefs };
console.log(settings); // { theme: 'dark', fontSize: 18, showSidebar: true }

// Cloning objects
const original = { a: 1, b: 2 };
const copy = { ...original };

// Adding properties conditionally
const user = { name: 'John', role: 'admin' };
const result = {
  ...user,
  ...(user.role === 'admin' ? { permissions: 'full' } : {})
};
console.log(result); // { name: 'John', role: 'admin', permissions: 'full' }
```

### In Function Calls

```javascript
// Passing array elements as separate arguments
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3

function greet(first, last) {
  return `Hello, ${first} ${last}`;
}

const person = ['John', 'Doe'];
console.log(greet(...person)); // "Hello, John Doe"
```

## Key Differences

| Feature | Rest Operator | Spread Operator |
|---------|--------------|------------------|
| Purpose | Collects multiple elements into one | Expands one element into multiple |
| Position | Must be the last parameter in a function or destructuring | Can appear anywhere in array/object literals or function calls |
| Output | Creates a new array or object | Expands existing array or object |
| Usage context | Function parameters, destructuring assignments | Array literals, object literals, function arguments |

These operators have become essential in modern JavaScript, enabling more concise and readable code for handling collections and function arguments.