# JavaScript Hoisting Quiz

**Answer:**

Hoisting is a JavaScript behavior where variable and function declarations are moved to the top of their containing scope during compilation. Let's test your understanding with this quiz.

## Question 1

What will the following code log to the console?

```javascript
console.log(x);
var x = 5;
```

A) 5

B) undefined

C) ReferenceError

D) null

**Answer: B) undefined**

Explanation: Variable declarations with `var` are hoisted, but not initializations. The code is equivalent to:

```javascript
var x;
console.log(x); // undefined
x = 5;
```

## Question 2

What will this code output?

```javascript
console.log(x);
let x = 5;
```

A) 5

B) undefined

C) ReferenceError

D) null

**Answer: C) ReferenceError**

Explanation: `let` declarations are hoisted but remain in the "temporal dead zone" until the declaration line. Accessing them before the declaration results in a ReferenceError.

## Question 3

What will this function log?

```javascript
function test() {
  console.log(a);
  console.log(foo());
  
  var a = 1;
  function foo() {
    return 2;
  }
}

test();
```

A) `undefined, 2`

B) `ReferenceError`

C) `1, 2`

D) `undefined, undefined`

**Answer: A) undefined, 2**

Explanation: The variable `a` is hoisted but not initialized (so it's `undefined`), while the entire function `foo` is hoisted and available for execution, returning 2.

## Question 4

What will be logged?

```javascript
var myVar = 'global';
function myFunction() {
  console.log(myVar);
  var myVar = 'local';
  console.log(myVar);
}
myFunction();
```

A) `global, local`

B) `undefined, local`

C) `global, global`

D) `local, local`

**Answer: B) undefined, local**

Explanation: The `myVar` inside the function is hoisted to the top of the function scope, shadowing the global `myVar`. It's initially `undefined` and then assigned 'local'.

## Question 5

What will this code log?

```javascript
function foo() {
  return bar();
  function bar() {
    return 'bar';
  }
}
console.log(foo());
```

A) ReferenceError

B) undefined

C) 'bar'

D) It won't log anything

**Answer: C) 'bar'**

Explanation: Function declarations are completely hoisted, so `bar` is available even though it's defined after it's called.

## Question 6

What will be logged?

```javascript
function foo() {
  if (false) {
    var x = 1;
  }
  console.log(x);
}
foo();
```

A) 1

B) undefined

C) ReferenceError

D) null

**Answer: B) undefined**

Explanation: `var` declarations are hoisted to function scope, not block scope. `x` is declared but never assigned a value since the `if` block doesn't execute.

## Question 7

What will this code print?

```javascript
var x = 1;
function foo() {
  console.log(x);
  var x = 2;
}
foo();
```

A) 1

B) 2

C) undefined

D) ReferenceError

**Answer: C) undefined**

Explanation: The local `x` is hoisted within the function, shadowing the global `x`. It's `undefined` when logged because the assignment hasn't happened yet.

## Question 8

What's the output of this code?

```javascript
console.log(foo);
console.log(bar);
var foo = function bar() {
  return 'Hello';
};
```

A) `[Function: bar], [Function: bar]`

B) `undefined, ReferenceError`

C) `undefined, undefined`

D) `[Function: foo], ReferenceError`

**Answer: B) undefined, ReferenceError**

Explanation: `foo` is declared with `var` so it's hoisted and initially `undefined`. The function expression `bar` is not hoisted as a separate variable, it's only accessible inside the function as its name.