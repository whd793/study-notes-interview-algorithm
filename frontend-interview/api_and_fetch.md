# Working with APIs and Fetch

## Making HTTP Requests

### XMLHttpRequest (Legacy)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 300) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Request failed with status:', xhr.status);
  }
};

xhr.onerror = function() {
  console.error('Request failed');
};

xhr.send();
```

### Fetch API

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

### Async/Await with Fetch

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();
```

## Request Methods and Options

```javascript
// POST request with JSON data
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com'
  })
})
.then(response => response.json())
.then(data => console.log(data));

// File upload
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('user', 'John');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));

// PUT request
fetch('https://api.example.com/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Updated Name' })
})
.then(response => response.json())
.then(data => console.log(data));

// DELETE request
fetch('https://api.example.com/users/1', {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('User deleted successfully');
  }
});
```

## Response Handling

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    // Response headers
    console.log(response.headers.get('Content-Type'));
    
    // Response status
    console.log(response.status, response.statusText);
    
    // Check if response succeeded
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Response type handling
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    } else if (contentType && contentType.includes('text/')) {
      return response.text();
    } else if (contentType && contentType.includes('image/')) {
      return response.blob();
    }
    return response.blob();
  })
  .then(data => {
    console.log(data);
  });
```

## Handling CORS

```javascript
// Request with CORS enabled
fetch('https://api.other-domain.com/data', {
  mode: 'cors',  // 'cors', 'no-cors', 'same-origin'
  credentials: 'include',  // 'include', 'same-origin', 'omit'
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

## AbortController for Cancellation

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/large-data', { signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Fetch aborted');
    } else {
      console.error('Fetch error:', err);
    }
  });

// Abort the fetch after 5 seconds
setTimeout(() => {
  controller.abort();
  console.log('Fetch aborted after timeout');
}, 5000);
```

## Axios Library

```javascript
// Basic GET request
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// POST request
axios.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error('Error:', error);
});

// Axios with config object
axios({
  method: 'post',
  url: 'https://api.example.com/users',
  data: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  headers: {
    'Authorization': 'Bearer token123'
  }
})
.then(response => console.log(response.data));

// Axios instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {'X-Custom-Header': 'CustomValue'}
});

api.get('/users')
  .then(response => console.log(response.data));
```

## Error Handling

```javascript
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      // Server returned an error status code
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized access');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded');
      } else {
        throw new Error(`Server error: ${response.status}`);
      }
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Network errors, JSON parsing errors, or thrown errors
    console.error('Error details:', error);
    
    // Rethrow or handle as needed
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// Usage with retry logic
async function fetchWithRetry(url, maxRetries = 3) {
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      return await fetchWithErrorHandling(url);
    } catch (error) {
      retries++;
      console.log(`Attempt ${retries} failed. ${maxRetries - retries} retries left.`);
      
      if (retries >= maxRetries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = 1000 * Math.pow(2, retries);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
```

## Authentication

```javascript
// Basic Authentication
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Basic ' + btoa('username:password')
  }
});

// Bearer Token Authentication
fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
});

// OAuth 2.0 with Refresh Token
let accessToken = 'initial-access-token';
let refreshToken = 'refresh-token';

async function fetchWithAuth(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (response.status === 401) {
      // Token expired, try to refresh
      accessToken = await refreshAccessToken(refreshToken);
      
      // Retry with new token
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    }
    
    return response;
  } catch (error) {
    console.error('Auth error:', error);
    throw error;
  }
}

async function refreshAccessToken(refreshToken) {
  const response = await fetch('https://auth.example.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    })
  });
  
  const data = await response.json();
  return data.access_token;
}
```

## Common Interview Questions

### Question: What happens when you type a URL into your browser and press Enter?

**Answer:**
When you type a URL into your browser and press Enter, the following sequence of events occurs:

1. **URL Parsing**: The browser parses the URL to extract components like protocol, domain, path, etc.

2. **DNS Lookup**: The browser checks its cache for the domain's IP address. If not found, it queries the OS, router, and eventually DNS servers to resolve the domain name to an IP address.

3. **TCP Connection**: The browser establishes a TCP connection with the server using a three-way handshake (SYN, SYN-ACK, ACK).

4. **TLS Handshake** (for HTTPS): If using HTTPS, a TLS handshake occurs to establish an encrypted connection.

5. **HTTP Request**: The browser sends an HTTP request to the server with headers, including cookies and user agent information.

6. **Server Processing**: The server processes the request and generates an HTTP response.

7. **HTTP Response**: The server sends back an HTTP response with status code, headers, and the requested content.

8. **Content Processing**: The browser processes the received content:
   - Parses HTML and builds the DOM
   - Requests additional resources (CSS, JavaScript, images)
   - Executes JavaScript
   - Builds the CSSOM and combines with DOM to create the render tree

9. **Rendering**: The browser renders the content on the screen, applying styles and layouts.

10. **Post-load Actions**: JavaScript may continue to execute, making additional requests (AJAX) and updating the DOM.

This entire process typically takes place in milliseconds depending on network conditions and the complexity of the website.

### Question: Explain the Same-Origin Policy and CORS. How do they work?

**Answer:**
The **Same-Origin Policy** is a critical security mechanism implemented by browsers that restricts how a document or script loaded from one origin can interact with resources from another origin. An origin consists of the scheme (protocol), hostname, and port.

For example, if a script from `https://example.com` tries to make an XMLHttpRequest or fetch request to `https://api.different-domain.com`, the browser will block the request due to the Same-Origin Policy.

**CORS (Cross-Origin Resource Sharing)** is a mechanism that allows servers to specify who can access their resources and how. It works through HTTP headers:

**Server-side headers:**
- `Access-Control-Allow-Origin`: Specifies which origins can access the resource (e.g., `*` for any origin or a specific domain)
- `Access-Control-Allow-Methods`: Specifies allowed HTTP methods (GET, POST, etc.)
- `Access-Control-Allow-Headers`: Specifies allowed headers
- `Access-Control-Allow-Credentials`: Indicates whether credentials (cookies, HTTP authentication) can be included
- `Access-Control-Max-Age`: Specifies how long preflight results can be cached

**How CORS works:**

1. **Simple requests** (GET, POST, or HEAD with standard headers) are sent directly with an `Origin` header indicating the requesting origin. The server then responds with `Access-Control-Allow-Origin` and other CORS headers.

2. **Preflight requests** are used for complex requests (PUT, DELETE, or custom headers). The browser first sends an OPTIONS request to check if the actual request is allowed. If the server responds with appropriate CORS headers, the actual request proceeds.

```javascript
// Example of a cross-origin request
fetch('https://api.different-domain.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Custom-Header': 'value'
  },
  credentials: 'include', // Include cookies
  body: JSON.stringify({ key: 'value' })
});
```

For this request, the browser would first send a preflight OPTIONS request, and only if the server responds with appropriate CORS headers would the actual POST request be made.

Workarounds for CORS restrictions include:
- Server-side proxies (your server makes the request and returns the result)
- JSONP (for GET requests only, legacy solution)
- Server-side configuration to properly support CORS

### Question: What's the difference between localStorage, sessionStorage, and cookies?

**Answer:**
All three mechanisms allow storing data in the browser, but they differ in several important ways:

**localStorage:**
- **Persistence**: Data persists until explicitly deleted, even if the browser is closed and reopened
- **Storage limit**: ~5MB (varies by browser)
- **Accessibility**: Available across all tabs and windows from the same origin
- **Auto-expiration**: None, data remains until explicitly cleared
- **Sent with requests**: No, data stays in the browser
- **API**: Simple key-value store with `setItem()`, `getItem()`, `removeItem()`, `clear()`

```javascript
localStorage.setItem('username', 'john_doe');
const username = localStorage.getItem('username'); // 'john_doe'
```

**sessionStorage:**
- **Persistence**: Data lasts for the duration of the page session (until the tab/browser is closed)
- **Storage limit**: ~5MB (varies by browser)
- **Accessibility**: Limited to the tab that created it
- **Auto-expiration**: When the tab/browser is closed
- **Sent with requests**: No, data stays in the browser
- **API**: Same as localStorage

```javascript
sessionStorage.setItem('tempData', JSON.stringify({id: 123}));
const data = JSON.parse(sessionStorage.getItem('tempData')); // {id: 123}
```

**Cookies:**
- **Persistence**: Can be session-based or persistent with explicit expiration date
- **Storage limit**: ~4KB for entire cookie string
- **Accessibility**: Available across all tabs from the same origin
- **Auto-expiration**: Can be set via `Expires` or `Max-Age` attributes
- **Sent with requests**: Yes, sent to the server with every HTTP request (can increase overhead)
- **Security options**: Can be secured with attributes like `HttpOnly`, `Secure`, `SameSite`
- **API**: More complex string manipulation or `document.cookie`

```javascript
// Set a cookie that expires in 7 days
document.cookie = 'username=john_doe; max-age=604800; path=/; secure; samesite=strict';

// Reading cookies requires parsing the cookie string
function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=');
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
}
```

**Use case recommendations:**
- **localStorage**: Long-term persistent data, theme preferences, user settings
- **sessionStorage**: Temporary data for the current session, form data backup
- **Cookies**: Authentication tokens, user tracking, server-side state management

### Question: How does the Fetch API differ from XMLHttpRequest?

**Answer:**
The Fetch API and XMLHttpRequest (XHR) are both used to make HTTP requests from the browser, but they have several key differences:

**Promise-based vs. Event-based:**
- **Fetch**: Uses Promises, which makes for cleaner, more modern code and integrates well with async/await.
- **XHR**: Uses an event-based model with callbacks, which can lead to "callback hell."

```javascript
// Fetch API
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/data');
xhr.onload = function() {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log(data);
  } else {
    console.error('Request failed');
  }
};
xhr.onerror = function() {
  console.error('Network error');
};
xhr.send();
```

**Request/Response Objects:**
- **Fetch**: Uses Request and Response objects, providing a more flexible and powerful API.
- **XHR**: Works with a single XHR object for both the request and response.

**Streaming:**
- **Fetch**: Supports streaming responses, which allows processing data as it arrives.
- **XHR**: Gets the complete response before it can be processed.

**Error Handling:**
- **Fetch**: Network errors trigger the catch block, but HTTP error status codes (400, 500) do not. You need to check `response.ok`.
- **XHR**: Both network errors and HTTP errors are handled in the onerror and onload handlers respectively.

**Timeout Handling:**
- **Fetch**: Doesn't have built-in timeout support (requires AbortController).
- **XHR**: Has a built-in timeout property (`xhr.timeout`).

**Progress Monitoring:**
- **Fetch**: Limited support via ReadableStream.
- **XHR**: Better support with the `onprogress` event.

**CORS Handling:**
- **Fetch**: More explicit with mode and credentials options.
- **XHR**: Uses `withCredentials` property for cross-origin requests with credentials.

**Browser Support:**
- **Fetch**: Modern browsers, but needs polyfills for older browsers.
- **XHR**: Wider browser support, including older browsers.

In modern applications, Fetch is generally preferred due to its cleaner API and better integration with other modern JavaScript features, but XHR might still be needed for specific use cases like detailed progress tracking or in environments where broad browser compatibility is required.

### Question: What are the common HTTP status codes and what do they mean?

**Answer:**
HTTP status codes are three-digit numbers that indicate the outcome of an HTTP request. They are grouped into five classes:

**1xx: Informational** - The request was received and the process is continuing.
- **100 Continue**: The server has received the request headers and the client should proceed to send the request body.
- **101 Switching Protocols**: The server is switching protocols as requested by the client.

**2xx: Success** - The request was successfully received, understood, and accepted.
- **200 OK**: The request succeeded. The response includes the requested data.
- **201 Created**: The request succeeded and a new resource was created.
- **204 No Content**: The request succeeded but there's no content to send back.
- **206 Partial Content**: The server fulfilled a partial GET request (used for resuming downloads).

**3xx: Redirection** - Further action needs to be taken to complete the request.
- **301 Moved Permanently**: The requested resource has been permanently moved to a new URL.
- **302 Found**: The requested resource is temporarily at a different URL.
- **304 Not Modified**: The client's cached version is still valid.
- **307 Temporary Redirect**: Similar to 302, but client should use the same HTTP method.
- **308 Permanent Redirect**: Similar to 301, but client should use the same HTTP method.

**4xx: Client Error** - The request contains bad syntax or cannot be fulfilled.
- **400 Bad Request**: The server cannot process the request due to a client error.
- **401 Unauthorized**: Authentication is required and has failed or not been provided.
- **403 Forbidden**: The client does not have permission to access the resource.
- **404 Not Found**: The requested resource could not be found on the server.
- **405 Method Not Allowed**: The HTTP method used is not supported for this resource.
- **429 Too Many Requests**: The client has sent too many requests in a given time (rate limiting).

**5xx: Server Error** - The server failed to fulfill a valid request.
- **500 Internal Server Error**: A generic error message when the server encounters an unexpected condition.
- **502 Bad Gateway**: The server was acting as a gateway and received an invalid response from the upstream server.
- **503 Service Unavailable**: The server is temporarily unavailable, often due to overload or maintenance.
- **504 Gateway Timeout**: The server was acting as a gateway and did not receive a timely response from the upstream server.

**How to handle different status codes in code:**

```javascript
async function handleRequest(url) {
  try {
    const response = await fetch(url);
    
    switch (response.status) {
      case 200:
        return await response.json();
      case 401:
        // Redirect to login
        window.location.href = '/login';
        break;
      case 403:
        throw new Error('You do not have permission to access this resource');
      case 404:
        throw new Error('Resource not found');
      case 500:
        throw new Error('Server error. Please try again later');
      default:
        throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
```

Understanding HTTP status codes is essential for handling API responses correctly and providing appropriate feedback to users when things go wrong.
