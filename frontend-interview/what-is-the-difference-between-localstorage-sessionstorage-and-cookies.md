# What's the difference between localStorage, sessionStorage, and cookies?

**Answer:**

localStorage, sessionStorage, and cookies are all mechanisms for storing data in the browser, but they differ in several important ways:

## localStorage
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

## sessionStorage
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

## Cookies
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

## Use case recommendations
- **localStorage**: Long-term persistent data, theme preferences, user settings
- **sessionStorage**: Temporary data for the current session, form data backup
- **Cookies**: Authentication tokens, user tracking, server-side state management