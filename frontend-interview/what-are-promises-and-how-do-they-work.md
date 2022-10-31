# What are Promises and how do they work?

**Answer:**

Promises are objects in JavaScript that represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a more structured and manageable way to handle asynchronous operations compared to traditional callbacks.

## Promise States

A Promise can be in one of three states:

1. **Pending**: Initial state - the operation is not yet complete
2. **Fulfilled**: The operation completed successfully, and the promise has a resulting value
3. **Rejected**: The operation failed, and the promise has a reason for the failure

Once a promise transitions to either fulfilled or rejected, it is considered **settled** and cannot change to another state. The value or reason associated with a settled promise is also immutable.

## Creating Promises

You create a Promise using the `Promise` constructor, which takes an executor function with two parameters: `resolve` and `reject`.

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Operation completed successfully!');
  } else {
    reject(new Error('Operation failed'));
  }
});
```

## Consuming Promises

Promises provide several methods to handle their eventual result:

### .then()

The `then()` method registers callbacks to receive the promise's eventual value or reason for rejection.

```javascript
myPromise.then(
  // onFulfilled callback
  (value) => {
    console.log('Success:', value);
  },
  // onRejected callback (optional)
  (reason) => {
    console.error('Error:', reason);
  }
);
```

### .catch()

The `catch()` method registers a callback to handle promise rejection, equivalent to `.then(null, onRejected)`.

```javascript
myPromise
  .then((value) => {
    console.log('Success:', value);
  })
  .catch((reason) => {
    console.error('Error:', reason);
  });
```

### .finally()

The `finally()` method registers a callback that will be executed regardless of whether the promise is fulfilled or rejected.

```javascript
myPromise
  .then((value) => {
    console.log('Success:', value);
  })
  .catch((reason) => {
    console.error('Error:', reason);
  })
  .finally(() => {
    console.log('Promise settled (fulfilled or rejected)');
  });
```

## Promise Chaining

One of the most powerful features of promises is the ability to chain them together for sequential asynchronous operations.

```javascript
fetchUserData(userId)
  .then(userData => {
    return fetchUserPosts(userData.id); // Returns a new promise
  })
  .then(posts => {
    return fetchComments(posts[0].id); // Returns another promise
  })
  .then(comments => {
    console.log('Comments:', comments);
  })
  .catch(error => {
    // Handles any error that occurred in any of the previous promises
    console.error('Error in promise chain:', error);
  });
```

Each `.then()` can return:
- A value, which is wrapped in a resolved promise automatically
- Another promise, which the chain will wait for
- A thrown error, which will be caught by the next `.catch()`

## Error Handling in Promises

Promises provide several ways to handle errors:

### Using catch()

```javascript
fetchData()
  .then(data => {
    return processData(data);
  })
  .catch(error => {
    console.error('An error occurred:', error);
    // You can return a fallback value to continue the chain
    return fallbackData;
  })
  .then(result => {
    // This runs with either the processed data or the fallback
    console.log('Final result:', result);
  });
```

### Error propagation

Errors propagate down the promise chain until they encounter a `.catch()` handler:

```javascript
fetchData()
  .then(data => {
    // If this throws an error, it skips all following .then() handlers
    const processed = processData(data);
    return processed;
  })
  .then(result => {
    // This is skipped if an error occurred above
    return furtherProcess(result);
  })
  .catch(error => {
    // This catches errors from any of the above steps
    console.error('Error:', error);
  });
```

## Static Promise Methods

The `Promise` object provides several static methods:

### Promise.resolve()

Creates a promise that is already resolved with a given value.

```javascript
const resolvedPromise = Promise.resolve('Already resolved');
resolvedPromise.then(value => console.log(value)); // 'Already resolved'
```

### Promise.reject()

Creates a promise that is already rejected with a given reason.

```javascript
const rejectedPromise = Promise.reject(new Error('Already rejected'));
rejectedPromise.catch(error => console.error(error)); // Error: Already rejected
```

### Promise.all()

Takes an iterable of promises and returns a new promise that fulfills when all input promises have fulfilled, or rejects if any input promise rejects.

```javascript
const promise1 = fetch('/users');
const promise2 = fetch('/posts');
const promise3 = fetch('/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    // All three promises fulfilled
    console.log('Users:', users);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  })
  .catch(error => {
    // At least one promise rejected
    console.error('One or more requests failed:', error);
  });
```

### Promise.race()

Returns a promise that fulfills or rejects as soon as one of the input promises fulfills or rejects.

```javascript
const promise1 = new Promise(resolve => setTimeout(resolve, 500, 'one'));
const promise2 = new Promise(resolve => setTimeout(resolve, 100, 'two'));

Promise.race([promise1, promise2])
  .then(value => {
    console.log('Fastest promise won:', value); // 'two'
  });
```

### Promise.allSettled()

Returns a promise that resolves after all input promises have settled (fulfilled or rejected).

```javascript
const promises = [
  fetch('/endpoint-1'),
  fetch('/endpoint-2'),
  fetch('/non-existent-endpoint')
];

Promise.allSettled(promises)
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Fulfilled:', result.value);
      } else if (result.status === 'rejected') {
        console.log('Rejected:', result.reason);
      }
    });
  });
```

### Promise.any()

Returns a promise that resolves as soon as any of the input promises fulfills. Rejects only if all input promises reject.

```javascript
const promises = [
  fetch('/endpoint-1').then(() => 'endpoint-1'),
  fetch('/endpoint-2').then(() => 'endpoint-2'),
  fetch('/endpoint-3').then(() => 'endpoint-3')
];

Promise.any(promises)
  .then(value => {
    console.log('First successful result:', value);
  })
  .catch(error => {
    console.log('All promises rejected:', error);
  });
```

## Real-World Examples

### AJAX Request with Promises

```javascript
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/users/${userId}`);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(`Request failed with status ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.send();
  });
}

// Using the promise
fetchUserData(123)
  .then(user => console.log('User data:', user))
  .catch(error => console.error('Error fetching user:', error));
```

### Fetch API (Promise-based)

```javascript
fetch('/api/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Data received:', data))
  .catch(error => console.error('Fetch error:', error));
```

### Promisifying Callbacks

```javascript
// Traditional callback-based function
function readFileCallback(path, callback) {
  fs.readFile(path, 'utf8', (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(null, data);
    }
  });
}

// Promisified version
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

// Using the promisified function
readFilePromise('config.json')
  .then(data => console.log('File contents:', data))
  .catch(error => console.error('Error reading file:', error));
```

## Async/Await with Promises

Async/await is syntactic sugar built on top of promises that makes asynchronous code look more like synchronous code.

```javascript
async function getUserData(userId) {
  try {
    // Await pauses execution until the promise resolves
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw to allow catching at the call site
  }
}

// Using the async function
async function displayUserProfile() {
  try {
    const user = await getUserData(123);
    console.log('User profile:', user);
  } catch (error) {
    console.error('Failed to display profile:', error);
  }
}

// Async functions return promises
displayUserProfile().then(() => console.log('Profile display attempt completed'));
```

## Common Promise Patterns

### Sequential execution

```javascript
async function processSequentially(items) {
  const results = [];
  
  for (const item of items) {
    // Each iteration waits for the previous one to complete
    const result = await processItem(item);
    results.push(result);
  }
  
  return results;
}
```

### Parallel execution with limit

```javascript
async function processWithConcurrencyLimit(items, concurrencyLimit) {
  const results = [];
  const running = [];
  
  for (const item of items) {
    // Create a promise for this item
    const p = processItem(item)
      .then(result => {
        // Remove from running list when done
        running.splice(running.indexOf(p), 1);
        return result;
      });
    
    // Add to running list and results
    running.push(p);
    results.push(p);
    
    // Wait if we reach the concurrency limit
    if (running.length >= concurrencyLimit) {
      await Promise.race(running);
    }
  }
  
  // Wait for all to complete and return results
  return Promise.all(results);
}
```

## Promise Limitations and Best Practices

1. **Promises are not cancellable** - Once a promise is created, it will eventually settle. If you need cancellation, consider using the AbortController API or libraries that support cancellation.

2. **Error handling** - Always include a `.catch()` at the end of promise chains to handle potential errors.

3. **Promise chains vs async/await** - For complex promise flows, async/await often leads to more readable code.

4. **Avoid the Promise constructor anti-pattern**
```javascript
// Anti-pattern: wrapping an existing promise
const badPromise = new Promise((resolve, reject) => {
  existingPromise().then(resolve).catch(reject);
});

// Better approach
const goodPromise = existingPromise();
```

5. **Memory leaks** - Unhandled promise rejections or promises that never settle can cause memory leaks.

6. **Promise performance** - Creating many promises can impact performance; consider batching operations when appropriate.