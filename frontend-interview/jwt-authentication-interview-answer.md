# JWT Authentication Interview Answer

JSON Web Tokens (JWT) provide a compact, self-contained way to securely transmit information between parties as a JSON object. In frontend applications, I implement JWT authentication by storing the token after a successful login, then including it in the Authorization header for subsequent API requests.

The JWT structure includes three parts: the header identifying the algorithm, the payload containing claims like user ID and expiration time, and the signature to verify the token hasn't been tampered with. For security, I never store JWTs in localStorage due to XSS vulnerability risks. Instead, I use HTTP-only cookies for persistent sessions or memory variables for single-page application sessions.

I handle token expiration by either implementing a silent refresh mechanism using refresh tokens or by detecting 401 responses and redirecting to the login page. To prevent CSRF attacks when using cookie-based storage, I ensure the backend implements proper protections like SameSite cookie attributes and CSRF tokens for mutation operations.