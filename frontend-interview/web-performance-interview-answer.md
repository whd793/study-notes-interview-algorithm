# Web Performance Interview Answer

I approach web performance optimization by first measuring core metrics like Largest Contentful Paint and Time to Interactive using tools like Lighthouse. This gives me a baseline and helps identify the biggest opportunities for improvement.

For initial load performance, I focus on reducing JavaScript bundle size through code splitting and tree shaking, optimizing images with proper formats and compression, and leveraging browser caching. To improve runtime performance, I minimize DOM operations, avoid layout thrashing, and use efficient CSS selectors.

I also implement critical rendering path optimizations by inlining critical CSS, deferring non-critical JavaScript, and using resource hints like preconnect and preload. For faster perceived performance, I implement content skeleton screens and ensure text remains visible during font loading.

My experience has shown that the biggest performance gains often come from shipping less code and optimizing images, as these directly impact download and parse times.