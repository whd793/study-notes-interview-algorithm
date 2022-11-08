# Explain the useEffect Hook in React

**Answer:**

The `useEffect` hook in React lets you perform side effects in functional components. It serves similar purposes to lifecycle methods in class components, but provides a more unified API.

```javascript
useEffect(callback, dependencies);
```

- **callback**: Function containing side effect code
- **dependencies**: Array of values that the effect depends on

## Key Use Cases

1. **Data fetching**
```javascript
useEffect(() => {
  async function fetchData() {
    const response = await fetch(`/api/user/${userId}`);
    const data = await response.json();
    setUser(data);
  }
  fetchData();
}, [userId]); // Re-run when userId changes
```

2. **Subscriptions/event listeners**
```javascript
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []); // Empty array = run once on mount
```

3. **DOM manipulations**
```javascript
useEffect(() => {
  document.title = `${notifications.length} new messages`;
}, [notifications]);
```

## Dependency Array Behaviors

- **Empty array `[]`**: Effect runs once after initial render (like componentDidMount)
- **With dependencies `[a, b]`**: Effect runs when any dependency changes
- **No array provided**: Effect runs after every render
- **Return function**: Cleanup function that runs before next effect or unmount

The cleanup function is crucial for preventing memory leaks by removing subscriptions, event listeners, or canceling requests before the component unmounts.

## Common Mistakes

1. **Missing dependencies**: Can cause stale closures or infinite loops
2. **Unnecessary dependencies**: Can cause excessive re-renders
3. **Forgetting cleanup**: Can cause memory leaks or duplicate subscriptions

Rule of thumb: Include all values from the component scope that change over time and are used by the effect.