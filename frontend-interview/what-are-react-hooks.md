# What are React Hooks?

**Answer:**

React Hooks are functions that let you use state and other React features in functional components without writing a class. Introduced in React 16.8, hooks enable a more direct API to React concepts you were already familiar with like props, state, context, refs, and lifecycle.

## Why Hooks Were Introduced

1. **Reuse stateful logic** between components without complex patterns like render props or HOCs
2. **Split complex components** into smaller functions based on related pieces
3. **Use React features without classes**, avoiding issues with `this` binding and making components easier to optimize

## Core Hooks

### useState

Manages local state in a functional component:

```javascript
function Counter() {
  // Declares a state variable with initial value and setter function
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect

Performs side effects in functional components:

```javascript
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Run after render, like componentDidMount/componentDidUpdate combined
    fetchUser(userId).then(userData => setUser(userData));
    
    // Optional cleanup function (runs before next effect or unmount)
    return () => {
      // Clean up resources if needed
    };
  }, [userId]); // Only re-run if userId changes
  
  return user ? <UserProfile user={user} /> : <Loading />;
}
```

### useContext

Accesses React context without nesting:

```javascript
const ThemeContext = React.createContext('light');

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

## Additional Built-in Hooks

- **useReducer**: Alternative to useState for complex state logic
- **useCallback**: Returns memoized callback to optimize child components
- **useMemo**: Memoizes expensive calculations to avoid rerenders
- **useRef**: Creates a mutable reference that persists across renders
- **useLayoutEffect**: Like useEffect, but fires synchronously after DOM mutations
- **useImperativeHandle**: Customizes the instance value exposed when using refs
- **useDebugValue**: Displays a label in React DevTools

## Custom Hooks

One of the most powerful features is the ability to create custom hooks - reusable functions that contain stateful logic:

```javascript
// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };
  
  const reset = () => setValues(initialValues);
  
  return { values, handleChange, reset };
}

// Using the custom hook
function SignupForm() {
  const { values, handleChange, reset } = useForm({
    username: '',
    email: '',
    password: ''
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={values.username} onChange={handleChange} />
      {/* Other inputs */}
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

Hooks have revolutionized how React components are written, encouraging more functional programming patterns and making code more modular and reusable.