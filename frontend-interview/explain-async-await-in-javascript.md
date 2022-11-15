# Explain Async/Await in JavaScript

**Answer:**

Async/await is a modern JavaScript syntax that simplifies working with asynchronous code. It builds on Promises, making asynchronous code more readable and easier to reason about by allowing it to be written in a way that resembles synchronous code.

## Basic Syntax

```javascript
// Function declaration with async keyword
async function fetchUserData() {
  // await can only be used inside async functions
  const response = await fetch('/api/users');
  const data = await response.json();
  return data;
}
```

## Key Points

1. **async functions** always return a Promise
   ```javascript
   async function greeting() {
     return "Hello";
   }
   // Equivalent to: function greeting() { return Promise.resolve("Hello"); }
   ```

2. **await** pauses execution until the Promise resolves
   ```javascript
   async function getTotal() {
     const prices = await fetchPrices(); // Waits for this Promise to resolve
     console.log("After prices"); // Executes after fetchPrices completes
     return prices.reduce((sum, price) => sum + price, 0);
   }
   ```

3. **Error handling** with try/catch
   ```javascript
   async function fetchData() {
     try {
       const response = await fetch('/api/data');
       if (!response.ok) throw new Error('Network response was not ok');
       return await response.json();
     } catch (error) {
       console.error('Fetch error:', error);
       // Handle error appropriately
     }
   }
   ```

4. **Handling multiple Promises**
   ```javascript
   // Sequential execution
   async function sequential() {
     const resultA = await serviceA();
     const resultB = await serviceB(resultA);
     return resultB;
   }
   
   // Parallel execution
   async function parallel() {
     const [resultA, resultB] = await Promise.all([
       serviceA(),
       serviceB()
     ]);
     return { resultA, resultB };
   }
   ```

## Advantages Over Plain Promises

- More readable, especially for complex chains of asynchronous operations
- Better error stack traces and debugging experience
- More intuitive control flow with loops and conditionals

```javascript
// Promise chain
function fetchWithPromises() {
  return fetch('/api/users')
    .then(response => response.json())
    .then(users => {
      return fetch(`/api/posts?userId=${users[0].id}`);
    })
    .then(response => response.json())
    .catch(error => console.error(error));
}

// With async/await
async function fetchWithAsyncAwait() {
  try {
    const usersResponse = await fetch('/api/users');
    const users = await usersResponse.json();
    const postsResponse = await fetch(`/api/posts?userId=${users[0].id}`);
    return await postsResponse.json();
  } catch (error) {
    console.error(error);
  }
}
```

Async/await has become the standard approach for handling asynchronous operations in modern JavaScript, making code more maintainable and intuitive while maintaining all the power of Promises underneath.