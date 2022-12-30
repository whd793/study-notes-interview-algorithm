# JavaScript Promises vs Async/Await

**Answer:**

Promises and async/await are two approaches for handling asynchronous operations in JavaScript. While async/await is built on top of Promises, they offer different syntax and capabilities that suit different situations.

## Promises: The Foundation

Promises represent a value that might not be available yet but will be resolved at some point in the future.

```javascript
function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Fetch error:', error);
      throw error;
    });
}

// Usage
fetchUserData(123)
  .then(user => {
    console.log('User data:', user);
    return fetchUserPosts(user.id);
  })
  .then(posts => {
    console.log('User posts:', posts);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Key Promise Features

1. **Chaining**: Use `.then()` to sequence operations
2. **Error handling**: Use `.catch()` to handle errors in the chain
3. **Composability**: Combine promises with `Promise.all()`, `Promise.race()`, etc.

```javascript
// Running promises in parallel
Promise.all([
  fetchUserData(1),
  fetchUserData(2),
  fetchUserData(3)
])
  .then(usersArray => {
    console.log('All users:', usersArray);
  })
  .catch(error => {
    console.error('At least one request failed:', error);
  });
```

## Async/Await: Modern Syntax

Async/await provides a more synchronous-looking syntax for working with Promises.

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

// Usage
async function getUserInfo(userId) {
  try {
    const user = await fetchUserData(userId);
    console.log('User data:', user);
    
    const posts = await fetchUserPosts(user.id);
    console.log('User posts:', posts);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call the async function
getUserInfo(123);
```

### Key Async/Await Features

1. **Cleaner syntax**: Looks more like synchronous code
2. **Easier debugging**: Better stack traces and breakpoints
3. **Error handling**: Uses familiar try/catch blocks

## Comparing Approaches

### Sequential Operations

**Promises:**
```javascript
function processingSequence() {
  return fetchData()
    .then(data => processData(data))
    .then(processedData => saveData(processedData))
    .then(result => {
      console.log('Done:', result);
      return result;
    });
}
```

**Async/Await:**
```javascript
async function processingSequence() {
  const data = await fetchData();
  const processedData = await processData(data);
  const result = await saveData(processedData);
  console.log('Done:', result);
  return result;
}
```

### Parallel Operations

**Promises:**
```javascript
function loadMultipleResources() {
  return Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
  ]);
}
```

**Async/Await:**
```javascript
async function loadMultipleResources() {
  const [users, products, orders] = await Promise.all([
    fetchUsers(),
    fetchProducts(),
    fetchOrders()
  ]);
  
  return { users, products, orders };
}
```

### Error Handling Patterns

**Promises:**
```javascript
fetchData()
  .then(processData)
  .then(saveData)
  .catch(error => {
    // Handles any error in the chain
    console.error('Operation failed:', error);
  })
  .finally(() => {
    // Cleanup code runs regardless of success/failure
    console.log('Operation complete');
  });
```

**Async/Await:**
```javascript
async function performOperation() {
  try {
    const data = await fetchData();
    const processedData = await processData(data);
    const result = await saveData(processedData);
    return result;
  } catch (error) {
    // Handles any error in any await line
    console.error('Operation failed:', error);
  } finally {
    // Cleanup code runs regardless of success/failure
    console.log('Operation complete');
  }
}
```

## Conditional Logic Scenarios

**Promises can be verbose:**
```javascript
fetchUserData(userId)
  .then(user => {
    if (user.isAdmin) {
      return fetchAdminData()
        .then(adminData => {
          return { user, adminData };
        });
    } else {
      return { user, adminData: null };
    }
  })
  .then(result => {
    console.log(result);
  });
```

**Async/await is cleaner:**
```javascript
async function getUserWithAdminData(userId) {
  const user = await fetchUserData(userId);
  
  let adminData = null;
  if (user.isAdmin) {
    adminData = await fetchAdminData();
  }
  
  return { user, adminData };
}
```

## When to Use Each

### Use Promises When:

- Working with libraries that return promises
- Using higher-order Promise methods like Promise.all or Promise.race
- When functional programming style is preferred
- For simple chains without complex logic

### Use Async/Await When:

- Writing code with complex logic flows
- Working with conditional async operations
- For better readability in complex async scenarios
- When you need more linear error handling (try/catch)
- For easier debugging

## Mixing Both Approaches

Both approaches can be mixed since async/await is built on top of Promises:

```javascript
async function processData() {
  // Use Promise.all with await for parallel operations
  const results = await Promise.all([
    fetchData1(),
    fetchData2(),
    fetchData3()
  ]);
  
  // Process results sequentially with await
  for (const result of results) {
    await processItem(result);
  }
  
  // Return a Promise explicitly
  return Promise.resolve('All done');
}

// Can still use .then() with async functions
processData()
  .then(message => {
    console.log(message);
  })
  .catch(error => {
    console.error(error);
  });
```

## Practical Considerations

1. **Async functions always return Promises**: Even if you return a simple value, it's wrapped in a Promise

2. **Error propagation**: Unhandled errors in async functions will propagate to the caller

3. **Top-level await**: Available in ES modules, allows using await without wrapping in an async function

4. **Performance**: There's no significant performance difference - both are syntactic approaches to the same underlying mechanism

Async/await has largely become the preferred approach for most developers due to its improved readability, but understanding Promises remains essential as they form the foundation of JavaScript's asynchronous programming model.