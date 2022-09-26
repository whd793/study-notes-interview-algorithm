# What is the purpose of the `defer` and `async` attributes on a script tag?

**Answer:**

The `defer` and `async` attributes on script tags control how JavaScript files are loaded and executed in relation to HTML parsing. They help improve page loading performance by changing the default blocking behavior of scripts.

## Default Behavior (no attributes)

By default, when the browser encounters a `<script>` tag:

1. HTML parsing is paused (blocked)
2. The script is fetched
3. The script is executed immediately
4. HTML parsing continues after the script is executed

This can slow down page rendering, especially for large scripts or slow network connections.

```html
<!-- Regular script: blocks HTML parsing during fetch and execution -->
<script src="script.js"></script>
```

## `defer` Attribute

When you add the `defer` attribute:

1. HTML parsing continues while the script is fetched in parallel
2. Script execution is deferred until HTML parsing is complete
3. Scripts with `defer` execute in the order they appear in the document
4. Scripts execute before the `DOMContentLoaded` event

```html
<!-- Deferred script: doesn't block parsing, executes when HTML is fully parsed -->
<script defer src="script.js"></script>
```

Key characteristics:
- Maintains script execution order
- Guaranteed to run after the DOM is built
- Ideal for scripts that need the full DOM and depend on each other

## `async` Attribute

When you add the `async` attribute:

1. HTML parsing continues while the script is fetched in parallel
2. HTML parsing is paused for script execution once the script is downloaded
3. Scripts execute as soon as they're downloaded, regardless of document order

```html
<!-- Async script: doesn't block parsing, executes immediately after download -->
<script async src="script.js"></script>
```

Key characteristics:
- Does not guarantee execution order
- May execute before or after the DOM is fully parsed
- Ideal for independent scripts that don't rely on DOM or other scripts

## Visual Comparison

```
Regular:
┌─────────┐         ┌─────────┐
│ Parse   │ Blocked │ Parse   │
└─────────┘         └─────────┘
             ┌─────┐ ┌─────┐
             │ Fetch│ │Exec │
             └─────┘ └─────┘

defer:
┌─────────────────────────────┐
│ Parse                        │
└─────────────────────────────┘
  ┌─────┐                 ┌─────┐
  │ Fetch│                 │Exec │
  └─────┘                 └─────┘
  
async:
┌───────────┐ Blocked ┌───────────┐
│ Parse     │         │ Parse     │
└───────────┘         └───────────┘
  ┌─────┐ ┌─────┐
  │ Fetch│ │Exec │
  └─────┘ └─────┘
```

## Best Use Cases

### Use `defer` for:
- Scripts that need access to the fully parsed DOM
- Scripts that depend on other scripts in a specific order
- Most application script files that interact with page elements
- Maintaining script execution order

```html
<!-- These will execute in order after DOM is parsed -->
<script defer src="jquery.js"></script>
<script defer src="jquery-plugin.js"></script>
<script defer src="app.js"></script>
```

### Use `async` for:
- Independent scripts that don't need DOM access
- Scripts that don't depend on other scripts
- Analytics, tracking, or advertising scripts
- Any script where execution order doesn't matter

```html
<!-- Will execute as soon as downloaded, regardless of DOM or other scripts -->
<script async src="analytics.js"></script>
<script async src="ads.js"></script>
```

## Inline Scripts

Note that `defer` and `async` only work with external scripts (those with a `src` attribute). They have no effect on inline scripts.

```html
<!-- This defer has no effect, it executes immediately -->
<script defer>console.log('This still blocks parsing');</script>
```

## Module Scripts

Scripts with `type="module"` behave like `defer` by default:

```html
<!-- This behaves like defer by default -->
<script type="module" src="module.js"></script>

<!-- This makes a module script load asynchronously -->
<script type="module" async src="module.js"></script>
```

## Browser Support

Both `defer` and `async` are widely supported in all modern browsers. However, if you need to support very old browsers, consider using alternative script loading techniques or bundling scripts.