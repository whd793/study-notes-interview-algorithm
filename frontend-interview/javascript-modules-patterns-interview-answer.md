# JavaScript Module Patterns Interview Answer

Before ES6 modules, JavaScript used several patterns to achieve modularity. The Immediately Invoked Function Expression (IIFE) pattern creates a private scope by wrapping code in a function that executes immediately. This prevents variable leakage into the global scope. The Revealing Module Pattern extends this by returning only the public API, keeping implementation details private.

The CommonJS pattern, popularized by Node.js, uses require() for imports and module.exports for exports. This synchronous approach works well for server environments but needs bundling tools for browsers. AMD (Asynchronous Module Definition) addressed this with define() functions and callback-based loading, better suited for browsers before ES modules.

Modern JavaScript uses the standardized ES module system with import and export statements. This offers benefits like static analysis, tree-shaking for dead code elimination, and top-level await. When designing modules, I focus on single responsibility, explicit dependencies, and minimal API surface to create maintainable, testable code structures.