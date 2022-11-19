# Explain Promise in JavaScript

**Answer:**

A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. It serves as a placeholder for a value that may not be available yet, allowing you to attach callbacks to handle the success or failure of the operation.

## Promise States

A Promise exists in one of three states:
1. **Pending**: Initial state, operation not completed yet
2. **Fulfilled**: Operation completed successfully, promise has a resulting value
3. **Rejected**: Operation failed, promise has a reason for failure

Once a promise settles (fulfills or rejects), it becomes immutable - it can't change to another state or have its value/reason changed.

## Basic Promise Usage

```javascript
// Creating a Promise
const fetchData = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve('Data retrieved successfully');
  } else {
    reject('Failed to fetch data');
  }
});

// Consuming a Promise
fetchData
  .then(data => {
    console.log(data); // 'Data retrieved successfully'
    return processData(data);
  })
  .then(processedData => {
    console.log(processedData);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    console.log('Operation complete');
  });
```

## Promise Methods

### Static Methods

1. **Promise.resolve(value)**: Returns a promise resolved with the given value
   ```javascript
   const resolved = Promise.resolve(42);
   resolved.then(value => console.log(value)); // 42
   ```

2. **Promise.reject(reason)**: Returns a promise rejected with the given reason
   ```javascript
   const rejected = Promise.reject('Something went wrong');
   rejected.catch(reason => console.log(reason)); // 'Something went wrong'
   ```

3. **Promise.all(iterable)**: Waits for all promises to resolve, or rejects if any rejects
   ```javascript
   const promises = [
     fetch('/api/users'),
     fetch('/api/posts'),
     fetch('/api/comments')
   ];
   
   Promise.all(promises)
     .then(responses => Promise.all(responses.map(r => r.json())))
     .then(data => console.log(data))
     .catch(error => console.error('One of the requests failed:', error));
   ```

4. **Promise.race(iterable)**: Resolves/rejects as soon as one promise resolves/rejects
   ```javascript
   const timeout = new Promise((_, reject) => 
     setTimeout(() => reject('Timeout'), 5000));
   
   Promise.race([fetch('/api/data'), timeout])
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error(error));
   ```

5. **Promise.allSettled(iterable)**: Waits for all promises to settle (resolve or reject)
   ```javascript
   Promise.allSettled(promises).then(results => {
     results.forEach(result => {
       if (result.status === 'fulfilled') {
         console.log('Value:', result.value);
       } else {
         console.log('Reason:', result.reason);
       }
     });
   });
   ```

6. **Promise.any(iterable)**: Resolves when any promise resolves, rejects if all reject
   ```javascript
   Promise.any([fetch('/api/backup1'), fetch('/api/backup2')])
     .then(response => response.json())
     .then(data => console.log('First successful result:', data))
     .catch(error => console.error('All requests failed'));
   ```

## Common Promise Patterns

### Sequential Execution

```javascript
function sequentialFetch(urls) {
  return urls.reduce((promise, url) => {
    return promise.then(results => {
      return fetch(url)
        .then(response => response.json())
        .then(data => [...results, data]);
    });
  }, Promise.resolve([]));
}
```

### Promisification (Converting Callback-based APIs)

```javascript
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}
```

Promises have revolutionized asynchronous JavaScript programming, providing a cleaner alternative to callback hell and forming the foundation for modern async patterns like async/await.