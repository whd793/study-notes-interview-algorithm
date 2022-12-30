# JavaScript Event Loop Quiz

**Answer:**

Test your understanding of the JavaScript event loop, a fundamental mechanism that powers JavaScript's asynchronous behavior, with this quiz.

## Question 1

What will be the output of this code?

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

A) Start, End, Timeout, Promise

B) Start, End, Promise, Timeout

C) Start, Timeout, Promise, End

D) Start, Promise, Timeout, End

**Answer: B) Start, End, Promise, Timeout**

Explanation: This demonstrates the event loop's task prioritization. The synchronous code runs first ('Start', 'End'), then microtasks (Promise callbacks) run before macrotasks (setTimeout callbacks), even when the timeout is 0ms.

## Question 2

What will be logged?

```javascript
const promise = new Promise((resolve, reject) => {
  console.log('Promise executor');
  resolve();
});

promise.then(() => {
  console.log('Promise callback');
});

console.log('Script end');
```

A) Promise executor, Promise callback, Script end

B) Promise executor, Script end, Promise callback

C) Script end, Promise executor, Promise callback

D) Promise callback, Promise executor, Script end

**Answer: B) Promise executor, Script end, Promise callback**

Explanation: The Promise constructor executes immediately (synchronously), while the callback in `.then()` is scheduled as a microtask that executes after the current synchronous code finishes.

## Question 3

What will be the output?

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

setTimeout(() => {
  console.log('Timeout 2');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
}).then(() => {
  console.log('Promise 2');
});

console.log('End');
```

A) Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2

B) Start, End, Promise 1, Timeout 1, Promise 2, Timeout 2

C) Start, End, Timeout 1, Timeout 2, Promise 1, Promise 2

D) Start, End, Promise 1, Timeout 1, Timeout 2, Promise 2

**Answer: A) Start, End, Promise 1, Promise 2, Timeout 1, Timeout 2**

Explanation: After synchronous code, the event loop processes all microtasks (both Promise callbacks) before processing any macrotasks (setTimeout callbacks). Chained promises (multiple .then) are processed in sequence, but still as microtasks.

## Question 4

What will be logged?

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise 1');
  
  setTimeout(() => {
    console.log('Inner timeout');
  }, 0);
}).then(() => {
  console.log('Promise 2');
});

console.log('End');
```

A) Start, End, Promise 1, Promise 2, Timeout, Inner timeout

B) Start, End, Promise 1, Promise 2, Inner timeout, Timeout

C) Start, End, Promise 1, Inner timeout, Promise 2, Timeout

D) Start, End, Promise 1, Timeout, Promise 2, Inner timeout

**Answer: A) Start, End, Promise 1, Promise 2, Timeout, Inner timeout**

Explanation: After the synchronous code, all microtasks run (Promise 1, which schedules an Inner timeout, then Promise 2). Only after all microtasks are processed will the macrotask queue be checked, executing Timeout followed by Inner timeout (in the order they were scheduled).

## Question 5

What will be logged?

```javascript
console.log('Start');

Promise.resolve().then(() => {
  console.log('Promise');
  
  setTimeout(() => {
    console.log('Inner timeout');
  }, 0);
}).then(() => {
  for(let i = 0; i < 1000000000; i++) {
    // Long loop to block the thread
  }
  console.log('Intensive task finished');
});

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');
```

A) Start, End, Promise, Timeout, Inner timeout, Intensive task finished

B) Start, End, Promise, Intensive task finished, Timeout, Inner timeout 

C) Start, End, Promise, Intensive task finished, Inner timeout, Timeout

D) Start, End, Promise, Inner timeout, Intensive task finished, Timeout

**Answer: B) Start, End, Promise, Intensive task finished, Timeout, Inner timeout**

Explanation: First, synchronous code runs (Start, End). Then microtasks (Promise, then the intensive task). The intensive task blocks the main thread, even though timeouts have been scheduled. After it completes (Intensive task finished), the macrotasks run in order (Timeout, then Inner timeout).

## Question 6

What will this code output?

```javascript
console.log('Start');

requestAnimationFrame(() => {
  console.log('rAF');
});

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');
```

A) Start, End, Promise, Timeout, rAF

B) Start, End, Promise, rAF, Timeout

C) Start, End, rAF, Promise, Timeout

D) Cannot be determined exactly

**Answer: D) Cannot be determined exactly**

Explanation: While we know synchronous code runs first (Start, End) followed by microtasks (Promise), the exact timing of requestAnimationFrame depends on the browser's rendering cycle. It typically runs before rendering, but after the current task queue is finished. It may run before or after the setTimeout callback depending on frame timing.

## Question 7

What will be logged?

```javascript
async function asyncFunc() {
  console.log('Async function start');
  await Promise.resolve();
  console.log('After await');
}

console.log('Script start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

asyncFunc();

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('Script end');
```

A) Script start, Async function start, Script end, After await, Promise, Timeout

B) Script start, Async function start, Script end, Promise, After await, Timeout

C) Script start, Async function start, After await, Script end, Promise, Timeout

D) Script start, Async function start, Script end, Promise, Timeout, After await

**Answer: B) Script start, Async function start, Script end, Promise, After await, Timeout**

Explanation: The code before the `await` in an async function runs synchronously (Async function start), but the code after `await` is scheduled as a microtask. Script start and Script end are synchronous, Promise and After await are microtasks (resolved in order they were scheduled), and Timeout is a macrotask.

## Question 8

What will be the output sequence?

```javascript
console.log(1);

queueMicrotask(() => {
  console.log(2);
  queueMicrotask(() => console.log(3));
});

Promise.resolve().then(() => console.log(4));

setTimeout(() => console.log(5), 0);

Promise.resolve().then(() => {
  console.log(6);
  queueMicrotask(() => console.log(7));
  setTimeout(() => console.log(8), 0);
});

console.log(9);
```

A) 1, 9, 2, 3, 4, 6, 7, 5, 8

B) 1, 9, 2, 4, 6, 3, 7, 5, 8

C) 1, 9, 4, 6, 2, 3, 7, 5, 8

D) 1, 9, 2, 4, 3, 6, 7, 5, 8

**Answer: B) 1, 9, 2, 4, 6, 3, 7, 5, 8**

Explanation: First synchronous code (1, 9), then the first round of microtasks (2, 4, 6) in the order they were scheduled. During processing these microtasks, more microtasks are scheduled (3, 7) which run immediately after the current microtask queue is cleared. Finally, the macrotasks run (5, 8) in the order they were scheduled.