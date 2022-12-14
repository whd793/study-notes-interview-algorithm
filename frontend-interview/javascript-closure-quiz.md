# JavaScript Closure Quiz

**Answer:**

Test your understanding of JavaScript closures with this quiz. Closures occur when a function retains access to its lexical scope even when executed outside that scope.

## Question 1

What will the following code output?

```javascript
function createCounter() {
  let count = 0;
  return function() {
    count += 1;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1());
console.log(counter1());
console.log(counter2());
```

A) 1, 2, 3

B) 1, 2, 1

C) 1, 1, 1

D) undefined, undefined, undefined

**Answer: B) 1, 2, 1**

Explanation: Each call to `createCounter()` creates a new closure with its own independent `count` variable. `counter1` and `counter2` are separate functions with their own separate lexical environments.

## Question 2

What will this code log to the console?

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

A) 0, 1, 2

B) 3, 3, 3

C) 0, 0, 0

D) undefined, undefined, undefined

**Answer: B) 3, 3, 3**

Explanation: Since `var` has function scope (not block scope), there's only one `i` variable. By the time the `setTimeout` callbacks execute, the loop has completed and `i` is 3. All three closures reference the same `i` variable.

## Question 3

How would you modify the previous example to log 0, 1, 2 instead?

A) Use `let` instead of `var`

B) Wrap each setTimeout in an IIFE

C) Use `const` instead of `var`

D) Both A and B would work

**Answer: D) Both A and B would work**

Explanation:

Option A: Using `let` creates block-scoped variables for each iteration:
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

Option B: Using an IIFE creates a new scope with a parameter for each iteration:
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j);
    }, 1000);
  })(i);
}
```

## Question 4

What will this code output?

```javascript
function outer() {
  let x = 10;
  
  function inner() {
    let y = 5;
    console.log(x + y);
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc();
```

A) 15

B) 10

C) 5

D) Error

**Answer: A) 15**

Explanation: The `inner` function forms a closure over the outer function's scope, so it still has access to `x` even after `outer` has finished executing. It adds `x` (10) and its own local `y` (5) to output 15.

## Question 5

What will be logged?

```javascript
let message = 'Hello';

function greet() {
  console.log(message);
}

function changeMessage() {
  let message = 'Hi';
  greet();
}

changeMessage();
```

A) Hello

B) Hi

C) undefined

D) Error

**Answer: A) Hello**

Explanation: The `greet` function captures the global `message` variable. Inside `changeMessage`, a new local variable called `message` is declared, but this doesn't affect the global `message` that `greet` accesses. This demonstrates lexical scope (where a function is defined), not dynamic scope (where a function is called).

## Question 6

What will this code output?

```javascript
function createIncrementer(start) {
  return function(step) {
    start += step;
    return start;
  };
}

const inc = createIncrementer(5);
console.log(inc(1));
console.log(inc(2));
console.log(inc(3));
```

A) 5, 5, 5

B) 6, 7, 8

C) 6, 8, 11

D) 6, 8, 10

**Answer: C) 6, 8, 11**

Explanation: The returned function forms a closure over `start`. Each call to `inc` modifies and returns the enclosed `start` variable: 5+1=6, then 6+2=8, then 8+3=11.

## Question 7

What will be logged by the following code?

```javascript
function makeAdder() {
  let x = 0;
  
  function add(y) {
    return x += y;
  }
  
  return {
    add: add,
    reset: function() { x = 0; }
  };
}

const adder = makeAdder();
console.log(adder.add(5));
console.log(adder.add(10));
adder.reset();
console.log(adder.add(7));
```

A) 5, 15, 22

B) 5, 15, 7

C) 5, 10, 7

D) 5, 10, 0

**Answer: B) 5, 15, 7**

Explanation: Both the `add` and `reset` methods form closures over the same `x` variable. `add(5)` returns 5, `add(10)` adds 10 more to get 15, `reset()` sets `x` back to 0, and finally `add(7)` returns 7.

## Question 8

What's the output of this code?

```javascript
const funcs = [];

for (var i = 0; i < 3; i++) {
  funcs.push(function() {
    console.log(i * i);
  });
}

funcs[0]();
funcs[1]();
funcs[2]();
```

A) 0, 1, 4

B) 0, 1, 2

C) 9, 9, 9

D) undefined, undefined, undefined

**Answer: C) 9, 9, 9**

Explanation: Similar to Question 2, all functions in the array reference the same `i` variable, which is 3 when they execute. So each function logs 3 * 3 = 9.