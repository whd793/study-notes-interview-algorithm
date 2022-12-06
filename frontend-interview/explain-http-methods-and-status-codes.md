# Explain HTTP Methods and Status Codes

**Answer:**

HTTP methods (or verbs) define the type of action to be performed on a resource, while status codes indicate the result of an HTTP request. Understanding both is crucial for RESTful API design and frontend-backend communication.

## Common HTTP Methods

### GET
Retrieve data from a specified resource. Should not have side effects.

```javascript
fetch('https://api.example.com/users/123')
  .then(response => response.json())
  .then(data => console.log(data));
```

### POST
Submit data to create a new resource. Often used for form submissions.

```javascript
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});
```

### PUT
Update a resource by replacing it entirely. Idempotent (multiple identical requests have same effect as a single request).

```javascript
fetch('https://api.example.com/users/123', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', email: 'john@example.com' })
});
```

### PATCH
Partially update a resource. Only send the fields that need to be updated.

```javascript
fetch('https://api.example.com/users/123', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'newemail@example.com' })
});
```

### DELETE
Remove a specified resource.

```javascript
fetch('https://api.example.com/users/123', { method: 'DELETE' });
```

### OPTIONS
Describe the communication options for a resource. Often used for CORS preflight requests.

### HEAD
Similar to GET but returns only HTTP headers, not the body. Useful for checking if a resource exists or has been modified.

## HTTP Status Codes

Status codes are grouped by their first digit:

### 1xx: Informational

- **100 Continue**: The server has received the request headers and the client should proceed to send the request body.

### 2xx: Success

- **200 OK**: The request has succeeded.
- **201 Created**: A new resource has been successfully created.
- **204 No Content**: The request succeeded but returns no content (common for DELETE operations).

### 3xx: Redirection

- **301 Moved Permanently**: The resource has been permanently moved to a new URL.
- **302 Found**: The resource is temporarily located at a different URL.
- **304 Not Modified**: The client's cached version is still valid (used with conditional requests).

### 4xx: Client Errors

- **400 Bad Request**: The server couldn't understand the request due to invalid syntax.
- **401 Unauthorized**: Authentication is required and has failed or not been provided.
- **403 Forbidden**: The client does not have access rights to the content.
- **404 Not Found**: The server can't find the requested resource.
- **422 Unprocessable Entity**: The request was well-formed but has semantic errors.
- **429 Too Many Requests**: The user has sent too many requests in a given time (rate limiting).

### 5xx: Server Errors

- **500 Internal Server Error**: The server encountered an unexpected condition.
- **502 Bad Gateway**: The server, while acting as a gateway, received an invalid response from an upstream server.
- **503 Service Unavailable**: The server is not ready to handle the request, often due to maintenance or overloading.

## Handling Status Codes in Frontend Code

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (response.ok) { // Status in the range 200-299
      return response.json();
    }
    
    if (response.status === 401) {
      // Handle authentication error
      redirectToLogin();
      throw new Error('Please log in to continue');
    }
    
    if (response.status === 404) {
      // Handle not found
      throw new Error('Resource not found');
    }
    
    // Handle other errors
    throw new Error(`HTTP error! Status: ${response.status}`);
  })
  .then(data => displayData(data))
  .catch(error => displayError(error.message));
```

## RESTful API Conventions

When working with RESTful APIs, there are common conventions for matching HTTP methods to CRUD operations:

| Operation | HTTP Method | Path                | Status Code      |
|-----------|-------------|---------------------|------------------|
| Create    | POST        | /resource           | 201 Created      |
| Read      | GET         | /resource/id        | 200 OK           |
| Read All  | GET         | /resource           | 200 OK           |
| Update    | PUT/PATCH   | /resource/id        | 200 OK           |
| Delete    | DELETE      | /resource/id        | 204 No Content   |

Understanding HTTP methods and status codes is essential for effective frontend-backend communication and building robust web applications.