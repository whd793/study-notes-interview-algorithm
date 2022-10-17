# What is the difference between `let`, `const`, and `var`?

**Answer:**

The `var`, `let`, and `const` keywords in JavaScript are used to declare variables, but they have important differences in terms of scope, hoisting, reassignment, and initialization.

## Scope

### `var`
- **Function-scoped**: Variables are only scoped to the immediate function body
- **No block scope**: Variables defined in blocks (if, for, etc.) are accessible outside the block

```javascript
function varExample() {
  var x = 1;
  
  if (true) {
    var x = 2;  // Same variable as above (redefined)
    console.log(x);  // 2
  }
  
  console.log(x);  // 2 (not 1)
}

for (var i = 0; i < 3; i++) {
  // i is defined
}
console.log(i);  // 3 (i is accessible outside the loop)
```

### `let` and `const`
- **Block-scoped**: Variables are limited to the block, statement, or expression where they are defined
- **Respects blocks**: Variables defined in blocks (if, for, etc.) are not accessible outside the block

```javascript
function letExample() {
  let x = 1;
  
  if (true) {
    let x = 2;  // Different variable (new block scope)
    console.log(x);  // 2
  }
  
  console.log(x);  // 1 (outer x is still 1)
}

for (let i = 0; i < 3; i++) {
  // i is defined only in the loop
}
// console.log(i);  // ReferenceError: i is not defined
```

## Hoisting

### `var`
- **Hoisted with initialization**: Declarations are hoisted to the top of the function or global scope
- **Initialized with `undefined`**: Variables can be accessed before declaration but will be undefined

```javascript
console.log(hoistedVar);  // undefined (not an error)
var hoistedVar = 5;

// Equivalent to:
var hoistedVar;
console.log(hoistedVar);  // undefined
hoistedVar = 5;
```

### `let` and `const`
- **Hoisted without initialization**: Declarations are hoisted but remain uninitialized
- **Temporal Dead Zone (TDZ)**: Accessing variables before declaration causes a ReferenceError

```javascript
// console.log(hoistedLet);  // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = 5;

// Same with const
// console.log(hoistedConst);  // ReferenceError
const hoistedConst = 5;
```

## Reassignment and Mutation

### `var` and `let`
- **Can be reassigned**: The variable can point to a different value after declaration

```javascript
var varVariable = 1;
varVariable = 2;  // OK

let letVariable = 1;
letVariable = 2;  // OK
```

### `const`
- **Cannot be reassigned**: The variable cannot be made to point to a different value
- **Objects/arrays can be mutated**: The content of objects and arrays can still be changed

```javascript
const constVariable = 1;
// constVariable = 2;  // TypeError: Assignment to constant variable

// But for objects and arrays:
const obj = { name: 'John' };
obj.name = 'Jane';  // OK - the object contents can be modified
// obj = { name: 'Jane' };  // TypeError - the binding cannot be changed

const arr = [1, 2, 3];
arr.push(4);  // OK - the array can be modified
// arr = [1, 2, 3, 4];  // TypeError - the binding cannot be changed
```

## Redeclaration

### `var`
- **Can be redeclared**: The same variable can be declared multiple times in the same scope

```javascript
var user = 'John';
var user = 'Jane';  // OK
console.log(user);  // 'Jane'
```

### `let` and `const`
- **Cannot be redeclared**: Declaring the same variable again in the same scope raises an error

```javascript
let user = 'John';
// let user = 'Jane';  // SyntaxError: Identifier 'user' has already been declared

const item = 'Apple';
// const item = 'Orange';  // SyntaxError: Identifier 'item' has already been declared
```

## Initialization

### `var` and `let`
- **Can be declared without initialization**: The variable can be declared first and assigned later

```javascript
var varVariable;  // Initialized as undefined
varVariable = 5;  // OK

let letVariable;  // Initialized as undefined
letVariable = 5;  // OK
```

### `const`
- **Must be initialized during declaration**: A value must be assigned when the variable is declared

```javascript
// const constVariable;  // SyntaxError: Missing initializer in const declaration
const constVariable = 5;  // Must provide a value
```

## Global Object Property

### `var`
- **Creates a property on the global object**: When declared in the global scope

```javascript
var globalVar = 'I am global';
console.log(window.globalVar);  // 'I am global' (in browsers)
```

### `let` and `const`
- **Does not create a property on the global object**: Even when declared in the global scope

```javascript
let globalLet = 'I am not on the global object';
console.log(window.globalLet);  // undefined

const globalConst = 'I am not on the global object either';
console.log(window.globalConst);  // undefined
```

## Performance

In terms of performance, there's no significant difference between `var`, `let`, and `const`. The choice should be based on the semantic meaning and the required behavior.

## Temporal Dead Zone (TDZ) Explained

The TDZ is a period in code execution where a `let` or `const` variable exists but cannot be accessed because it hasn't been initialized yet.

```javascript
// TDZ starts for myVar
console.log(myVar);  // ReferenceError: Cannot access 'myVar' before initialization
let myVar = 5;  // TDZ ends for myVar
```

## Best Practices

1. **Use `const` by default**: For variables that won't be reassigned
2. **Use `let` when needed**: For variables that will be reassigned
3. **Avoid `var`**: It's generally better to use the more predictable `let` and `const`
4. **Declare at the beginning**: Even though hoisting exists, declare variables at the top of their scope
5. **Initialize during declaration**: Especially for `const`, but good practice for all variables

## Summary Table

| Feature | `var` | `let` | `const` |
|---------|-------|-------|--------|
| Scope | Function | Block | Block |
| Hoisting | Hoisted with `undefined` | Hoisted but uninitialized (TDZ) | Hoisted but uninitialized (TDZ) |
| Reassignable | Yes | Yes | No |
| Redeclarable | Yes | No | No |
| Must Initialize | No | No | Yes |
| Global Object Property | Yes | No | No |