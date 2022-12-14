# How to Optimize Website Performance

**Answer:**

Website performance optimization is crucial for user experience, SEO, and conversion rates. Here's a comprehensive approach covering the most important techniques:

## Frontend Optimizations

### 1. Asset Optimization

#### Image Optimization

```html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy" width="800" height="600">
</picture>
```

- Compress images using tools like ImageOptim, TinyPNG
- Use WebP, AVIF for better compression
- Implement responsive images with `srcset` and `sizes`
- Add explicit dimensions to prevent layout shifts
- Use lazy loading for off-screen images

#### Font Optimization

```css
/* Use font-display for better loading experience */
@font-face {
  font-family: 'MyFont';
  src: url('myfont.woff2') format('woff2');
  font-display: swap;
}
```

- Limit font families and weights
- Use system fonts when possible
- Preload critical fonts
- Consider variable fonts for multiple weights in a single file

### 2. Code Optimization

#### Minification and Bundling

- Minify HTML, CSS, and JavaScript
- Use tools like Webpack, Rollup, or Parcel
- Enable code splitting for smaller bundles
- Implement tree shaking to eliminate unused code

#### Critical CSS

```html
<head>
  <!-- Inline critical CSS -->
  <style>
    /* Critical styles for above-the-fold content */
  </style>
  <!-- Load non-critical CSS asynchronously -->
  <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
```

### 3. Rendering Optimization

#### Reduce DOM Size

- Keep the DOM small (ideally under 1500 nodes)
- Avoid deeply nested structures
- Remove unnecessary divs and wrappers

#### Optimize JavaScript Execution

```html
<!-- Defer non-critical JavaScript -->
<script src="app.js" defer></script>

<!-- For third-party scripts that aren't essential -->
<script async src="analytics.js"></script>
```

- Use `requestAnimationFrame` for visual updates
- Avoid layout thrashing (interleaving reads and writes)
- Debounce or throttle expensive event handlers

```javascript
// Before: Layout thrashing
function badLayout() {
  elements.forEach(el => {
    const height = el.offsetHeight; // Read
    el.style.height = (height * 2) + 'px'; // Write
    // Repeat read/write pattern forces multiple reflows
  });
}

// After: Batch reads, then writes
function goodLayout() {
  const heights = elements.map(el => el.offsetHeight); // All reads
  elements.forEach((el, i) => {
    el.style.height = (heights[i] * 2) + 'px'; // All writes
  });
}
```

## Network Optimizations

### 1. Resource Loading

#### Resource Hints

```html
<!-- Preconnect to critical third-party origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- Prefetch resources needed for next navigation -->
<link rel="prefetch" href="/next-page.js">

<!-- Preload critical resources -->
<link rel="preload" href="critical-font.woff2" as="font" type="font/woff2" crossorigin>
```

#### HTTP/2 or HTTP/3

- Enable on your server for multiplexing and concurrency
 - Consolidate small assets for HTTP/1.1, but this is less important with HTTP/2+
- Implement server push for critical resources (if using HTTP/2)

### 2. Caching Strategy

```html
<!-- Set cache headers properly -->
<!-- Example response headers: -->
<!-- Cache-Control: max-age=31536000, immutable (for versioned resources) -->
<!-- Cache-Control: no-cache (for HTML) -->
```

- Use content hashing in filenames for cache busting
- Implement service workers for offline caching
- Leverage browser cache with appropriate headers

```javascript
// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => {
      console.log('Service Worker registered');
    });
}
```

### 3. Compression

- Enable Gzip or Brotli compression
- Use appropriate compression levels (Brotli is generally better for text)

## Server-Side Optimizations

### 1. Server Response Time

- Optimize database queries
- Implement server-side caching
- Use CDNs for global content delivery
- Consider edge computing for dynamic content

### 2. API Optimization

- Implement pagination for large datasets
- Use GraphQL to prevent over-fetching
- Optimize endpoint response size

## Measurement and Monitoring

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: Target < 2.5 seconds
- **FID (First Input Delay)**: Target < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: Target < 0.1

### Performance Tools

- Lighthouse in Chrome DevTools
- WebPageTest for detailed analysis
- Chrome User Experience Report (CrUX)
- Performance API for real user monitoring

```javascript
// Performance monitoring example
function sendPerformanceMetrics() {
  const paint = performance.getEntriesByType('paint');
  const fcp = paint.find(entry => entry.name === 'first-contentful-paint');
  const navigationEntry = performance.getEntriesByType('navigation')[0];
  
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({
      fcp: fcp?.startTime,
      loadTime: navigationEntry.loadEventEnd - navigationEntry.startTime,
      ttfb: navigationEntry.responseStart - navigationEntry.requestStart
    })
  });
}
```

## Modern Performance Techniques

### 1. Component-Level Optimization (React/Vue/Angular)

```javascript
// React memo example
const ExpensiveComponent = React.memo(function ExpensiveComponent(props) {
  // Only re-renders if props change
  return <div>{/* ... */}</div>;
});

// Vue optimization
const vueComponent = {
  computed: {
    // Cached until dependencies change
    expensiveValue() { return /* ... */ }
  }
};
```

### 2. Intersection Observer for Lazy Loading

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load resource when visible
      const lazyImage = entry.target;
      lazyImage.src = lazyImage.dataset.src;
      observer.unobserve(lazyImage);
    }
  });
});

document.querySelectorAll('.lazy-image').forEach(img => {
  observer.observe(img);
});
```

### 3. Web Workers for Heavy Computation

```javascript
// Main thread
const worker = new Worker('processor.js');

worker.onmessage = function(e) {
  console.log('Result:', e.data);
};

worker.postMessage({ data: complexData });

// processor.js (worker)
self.onmessage = function(e) {
  // Heavy computation happens off the main thread
  const result = performExpensiveCalculation(e.data);
  self.postMessage(result);
};
```

Performance optimization is an ongoing process that requires constant measurement and refinement. Focus on metrics that matter most to your users and business goals, and implement improvements incrementally for the best ROI.