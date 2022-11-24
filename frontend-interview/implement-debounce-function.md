# Implement a Debounce Function

**Answer:**

A debounce function limits how often a function can be called. It's particularly useful for performance optimization when dealing with events that fire rapidly, like window resizing, scrolling, or keystrokes.

Here's an implementation of a debounce function:

```javascript
function debounce(callback, delay = 300) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}
```

## How It Works

1. When the debounced function is called, it clears any existing timeout
2. It then sets a new timeout to call the original function after the specified delay
3. If the debounced function is called again before the delay expires, the process repeats
4. The original function only executes after the specified time has passed since the last call

## Usage Examples

### Event Handling

```javascript
// Without debounce - executes on every keystroke
const handleInput = (e) => {
  fetchSearchResults(e.target.value);
};

// With debounce - waits until typing pauses
const debouncedHandleInput = debounce((e) => {
  fetchSearchResults(e.target.value);
}, 500);

searchInput.addEventListener('input', debouncedHandleInput);
```

### Window Resizing

```javascript
const handleResize = () => {
  recalculateLayout();
};

window.addEventListener('resize', debounce(handleResize, 250));
```

## Enhanced Version with Immediate Option

A more flexible implementation that optionally allows immediate execution on the first call:

```javascript
function debounce(callback, delay = 300, immediate = false) {
  let timeoutId;
  
  return function(...args) {
    const callNow = immediate && !timeoutId;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      timeoutId = null;
      
      if (!immediate) {
        callback.apply(this, args);
      }
    }, delay);
    
    if (callNow) {
      callback.apply(this, args);
    }
  };
}
```

## Use Cases

1. **Search Inputs**: Prevent API calls while user is still typing
2. **Form Validation**: Validate after user finishes typing
3. **Window Resize Handlers**: Recalculate layouts after resizing stops
4. **Scroll Events**: Update UI elements after scrolling pauses
5. **Button Clicks**: Prevent double submissions

Debouncing is an essential technique for optimizing performance in frontend applications, particularly for expensive operations that don't need to happen on every event.