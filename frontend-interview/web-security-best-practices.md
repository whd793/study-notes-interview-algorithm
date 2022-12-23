# Web Security Best Practices

**Answer:**

Web security is critical for protecting both users and applications from various threats. Here are the essential security best practices that every frontend developer should know.

## Cross-Site Scripting (XSS) Prevention

XSS attacks inject malicious scripts into web pages viewed by other users.

### Content Security Policy (CSP)

Implement CSP headers to restrict script sources:

```html
<!-- In the HTML head -->
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted-cdn.com">
```

Or via HTTP header:

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com
```

### Output Encoding

Always encode user-generated content before rendering:

```javascript
// React does this automatically with JSX
const userComment = <div>{userProvidedContent}</div>;

// Vanilla JavaScript - manual encoding required
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, (match) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return entities[match];
  });
}

document.getElementById('comment').innerHTML = escapeHTML(userProvidedContent);
```

### Sanitization Libraries

Use libraries like DOMPurify for more complex content:

```javascript
import DOMPurify from 'dompurify';

// Allow certain HTML tags but sanitize potentially dangerous content
const clean = DOMPurify.sanitize(userProvidedHTML, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
  ALLOWED_ATTR: ['href', 'title']
});

element.innerHTML = clean;
```

## Cross-Site Request Forgery (CSRF) Protection

CSRF tricks users into performing unwanted actions on authenticated sites.

### CSRF Tokens

```javascript
// Include CSRF token in forms
const form = document.querySelector('form');
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const hiddenInput = document.createElement('input');
hiddenInput.type = 'hidden';
hiddenInput.name = 'csrf_token';
hiddenInput.value = csrfToken;

form.appendChild(hiddenInput);

// Or with fetch
fetch('/api/update-profile', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});
```

### SameSite Cookies

Modern browsers support SameSite attributes for cookies:

```
Set-Cookie: sessionId=abc123; SameSite=Strict; Secure; HttpOnly
```

- `SameSite=Strict`: Cookies only sent in first-party context
- `SameSite=Lax`: Cookies sent with top-level navigations
- `SameSite=None`: Cookies sent in all contexts (requires Secure flag)

## Authentication & Authorization

### Secure Authentication

```javascript
// Use HTTPS for login forms
if (window.location.protocol !== 'https:') {
  // Redirect to HTTPS
  window.location.href = window.location.href.replace('http:', 'https:');
}

// Implement proper password strength validation
function validatePassword(password) {
  const minLength = password.length >= 12;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return minLength && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars;
}
```

### JSON Web Tokens (JWT)

```javascript
// Store JWT in memory (not localStorage) for SPA auth
let authToken;

async function login(credentials) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  authToken = data.token; // Store in variable, not localStorage
  
  // Use token for subsequent requests
  fetch('/api/protected-resource', {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
}
```

## Secure Data Storage

### Avoiding Sensitive Data in localStorage/sessionStorage

```javascript
// BAD - Insecure storage of sensitive data
localStorage.setItem('userToken', token); // Vulnerable to XSS

// BETTER - Use memory variables for tokens
let userToken = token;

// ALTERNATIVE - Use HttpOnly cookies (set by server)
// These cannot be accessed by JavaScript
```

### Secure Forms

```html
<!-- Don't use autocomplete for sensitive fields -->
<input type="password" name="password" autocomplete="off">

<!-- Prevent browsers from storing form data -->
<form autocomplete="off">
```

## Secure Communication

### HTTPS

Enforce HTTPS everywhere:

```javascript
// Redirect to HTTPS
if (window.location.protocol !== 'https:') {
  window.location.href = 'https://' + window.location.host + window.location.pathname;
}
```

### HSTS (HTTP Strict Transport Security)

Implemented via HTTP headers (requires server configuration):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

### Subresource Integrity (SRI)

Verify the integrity of resources loaded from CDNs:

```html
<script 
  src="https://cdn.example.com/library.js" 
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC" 
  crossorigin="anonymous">
</script>
```

## Preventing Common Vulnerabilities

### Clickjacking Protection

Implemented via HTTP headers:

```
X-Frame-Options: DENY
```

Or CSP frame ancestors:

```
Content-Security-Policy: frame-ancestors 'none';
```

### Preventing DOM-based Vulnerabilities

```javascript
// UNSAFE - Using location.hash directly
const hash = window.location.hash.substring(1);
document.getElementById('output').innerHTML = hash; // XSS vulnerability

// SAFER - Sanitize input from URLs
const hash = DOMPurify.sanitize(window.location.hash.substring(1));
document.getElementById('output').textContent = hash; // Use textContent, not innerHTML
```

### Avoiding Eval and Similar Functions

```javascript
// UNSAFE - Dynamic code execution
eval(userProvidedCode); // Never do this
new Function(userInput)(); // Also unsafe

document.getElementById('element').setAttribute('onclick', userInput); // Dangerous

// SAFER - Avoid dynamic code execution entirely
// Use safer alternatives like JSON.parse instead of eval for JSON
const data = JSON.parse(jsonString);
```

## Security Headers

Implement these HTTP security headers:

```
Content-Security-Policy: default-src 'self';
X-Content-Type-Options: nosniff;
X-Frame-Options: DENY;
Referrer-Policy: no-referrer-when-downgrade;
Permissions-Policy: geolocation=(), camera=(), microphone=();
Strict-Transport-Security: max-age=31536000; includeSubDomains;
```

## Third-Party Dependencies

### Dependency Security

```bash
# Regularly audit dependencies
npm audit

# Fix vulnerabilities
npm audit fix

# Use tools like Snyk or Dependabot for automated monitoring
```

### Iframe Security

```html
<iframe 
  src="https://trusted-site.com" 
  sandbox="allow-scripts allow-same-origin" 
  referrerpolicy="no-referrer">
</iframe>
```

## Security Testing

1. **Automated Scanning**: Use tools like OWASP ZAP, Burp Suite
2. **Penetration Testing**: Conduct regular security assessments
3. **Bug Bounty Programs**: Invite ethical hackers to find vulnerabilities

## Keeping Informed

Stay updated on security best practices and vulnerabilities:
- Subscribe to OWASP newsletters
- Follow security researchers
- Participate in security communities

Implementing these web security best practices will significantly reduce the risk of common vulnerabilities in your web applications.