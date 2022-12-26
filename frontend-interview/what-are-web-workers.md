# What are Web Workers?

**Answer:**

Web Workers are a JavaScript feature that enables running scripts in background threads, separate from the main browser thread. They allow for multithreading in web applications without blocking the user interface.

## Core Concepts

### Main Thread vs. Worker Threads

Browsers typically run JavaScript in a single thread (the main thread), which handles:
- DOM manipulation
- User events (clicks, typing)
- Rendering/painting
- JavaScript execution

When heavy processing occurs, it can block this thread and freeze the UI. Web Workers provide separate threads that:
- Run in parallel to the main thread
- Cannot directly access the DOM
- Communicate via message passing

## Types of Web Workers

### 1. Dedicated Workers

Used by a single script instance, the most common type.

```javascript
// Main thread (script.js)
const worker = new Worker('worker.js');

// Send data to worker
worker.postMessage({ data: [1, 2, 3, 4, 5], operation: 'sum' });

// Receive results from worker
worker.onmessage = function(event) {
  console.log('Result from worker:', event.data);
};

// Handle errors
worker.onerror = function(error) {
  console.error('Worker error:', error.message);
};

// Terminate when done
function stopWorker() {
  worker.terminate();
  console.log('Worker terminated');
}
```

```javascript
// Worker thread (worker.js)
self.onmessage = function(event) {
  const { data, operation } = event.data;
  
  if (operation === 'sum') {
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < data.length; i++) {
      result += data[i];
    }
    self.postMessage(result);
  }
};
```

### 2. Shared Workers

Can be shared between multiple scripts or windows from the same origin.

```javascript
// Main thread
const sharedWorker = new SharedWorker('shared-worker.js');

// Communication happens through the port object
sharedWorker.port.postMessage({ data: [1, 2, 3, 4] });

sharedWorker.port.onmessage = function(event) {
  console.log('Result from shared worker:', event.data);
};

// Must start the port
sharedWorker.port.start();
```

```javascript
// shared-worker.js
self.onconnect = function(e) {
  const port = e.ports[0];
  
  port.onmessage = function(event) {
    // Process data
    port.postMessage('Processed: ' + event.data.data);
  };
  
  port.start();
};
```

### 3. Service Workers

A special type of worker that acts as a proxy between web applications, the browser, and the network. Often used for offline capabilities and push notifications.

```javascript
// Registering a service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered:', registration);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
```

## Use Cases for Web Workers

### 1. Heavy Computations

```javascript
// Main thread
function calculatePrimes() {
  const worker = new Worker('prime-worker.js');
  worker.postMessage({ max: 10000000 });
  
  worker.onmessage = function(e) {
    document.getElementById('result').textContent = 
      `Found ${e.data.length} prime numbers`;
  };
}

// prime-worker.js
self.onmessage = function(e) {
  const max = e.data.max;
  const primes = findPrimes(max);
  self.postMessage(primes);
};

function findPrimes(max) {
  // Prime finding algorithm
  // ...
}
```

### 2. Data Processing

```javascript
// Processing large datasets
const worker = new Worker('data-processor.js');

fetch('https://api.example.com/large-dataset')
  .then(response => response.json())
  .then(data => {
    worker.postMessage({ action: 'process', data });
  });

worker.onmessage = function(e) {
  renderChart(e.data.processedData);
};
```

### 3. Real-time Operations

```javascript
// Image filtering in real-time
const worker = new Worker('image-processor.js');
const canvas = document.getElementById('preview');
const ctx = canvas.getContext('2d');

function applyFilter(filter) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  worker.postMessage({
    imageData: imageData,
    filter: filter
  }, [imageData.data.buffer]); // Transfer ownership of the buffer
}

worker.onmessage = function(e) {
  ctx.putImageData(e.data, 0, 0);
};
```

## Transferable Objects

For large data, use transferable objects to avoid copying:

```javascript
// Main thread
const largeArray = new Uint8Array(1024 * 1024 * 32); // 32MB
fillArrayWithData(largeArray);

// Transfer ownership (faster than copying)
worker.postMessage({ data: largeArray }, [largeArray.buffer]);

// After transfer, largeArray is no longer usable in the main thread
console.log(largeArray.length); // 0
```

## Worker Limitations

1. **No DOM Access**: Workers cannot directly manipulate the DOM
2. **Limited Window Object**: Only a subset of window APIs are available
3. **No Shared Memory**: Communication via copying (except with transferables or SharedArrayBuffer)
4. **Same-Origin Restriction**: Workers must be from the same origin as the parent page

## Available APIs in Workers

Workers have access to:
- `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`
- `XMLHttpRequest` and `fetch`
- `WebSockets` and other network APIs
- `IndexedDB` and `Cache` API
- `console` methods

## Best Practices

1. **Worker Size**: Keep worker scripts small and focused
2. **Initialization Cost**: Create workers in advance if possible
3. **Message Frequency**: Minimize the number of messages between threads
4. **Message Size**: Batch data to reduce overhead
5. **Termination**: Clean up workers when no longer needed

## Browser Support and Fallbacks

Modern browsers support Web Workers, but always implement feature detection:

```javascript
if (window.Worker) {
  // Use workers
} else {
  // Fallback to synchronous processing
  // (with warning about potential UI blocking)
}
```

Web Workers provide a powerful way to improve performance for compute-intensive web applications by moving heavy processing off the main thread, resulting in a more responsive user experience.