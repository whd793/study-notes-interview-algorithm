# JavaScript Frameworks

## React

### Core Concepts

#### Components

Components are the building blocks of React applications. They are reusable pieces of code that return React elements describing what should appear on the screen.

```jsx
// Functional Component
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

#### JSX

JSX is a syntax extension for JavaScript that looks similar to HTML and makes it easier to write and add HTML in React.

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;

// Compiles to:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

#### Props

Props (short for "properties") are read-only inputs to components. They allow you to pass data from a parent component to a child component.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// Usage
<Welcome name="Sara" />
```

#### State

State allows React components to change their output over time in response to user actions, network responses, and anything else.

```jsx
// Using useState hook in functional component
function Counter() {
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

// Using state in class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from function components.

#### useState

```jsx
function Example() {
  // Declare a state variable 'count' with initial value 0
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

#### useEffect

```jsx
function Example() {
  const [count, setCount] = useState(0);
  
  // Similar to componentDidMount and componentDidUpdate
  useEffect(() => {
    document.title = `You clicked ${count} times`;
    
    // Similar to componentWillUnmount
    return () => {
      document.title = 'React App';
    };
  }, [count]); // Only re-run if count changes
  
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

#### useContext

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return <ThemedButton />;
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Themed Button</button>;
}
```

#### useReducer

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

#### useMemo and useCallback

```jsx
function MyComponent({ a, b }) {
  // Memoize expensive calculation
  const expensiveResult = useMemo(() => {
    return computeExpensiveValue(a, b);
  }, [a, b]); // Only recompute if a or b changes
  
  // Memoize callback function
  const memoizedCallback = useCallback(() => {
    doSomething(a, b);
  }, [a, b]); // Only create a new function if a or b changes
  
  return <ChildComponent result={expensiveResult} onClick={memoizedCallback} />;
}
```

### Component Lifecycle

#### Class Component Lifecycle

```jsx
class LifecycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('Constructor: Component is being initialized');
  }
  
  componentDidMount() {
    console.log('ComponentDidMount: Component has been rendered to the DOM');
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ShouldComponentUpdate: Deciding whether to re-render');
    return nextState.count !== this.state.count;
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('ComponentDidUpdate: Component has been updated');
  }
  
  componentWillUnmount() {
    console.log('ComponentWillUnmount: Component is about to be removed from the DOM');
  }
  
  render() {
    console.log('Render: Rendering component');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

#### Functional Component with Hooks

```jsx
function LifecycleHooks() {
  console.log('Rendering function component');
  
  const [count, setCount] = useState(0);
  
  // componentDidMount and componentDidUpdate
  useEffect(() => {
    console.log('After render (componentDidMount/componentDidUpdate)');
    
    // componentWillUnmount
    return () => {
      console.log('Cleanup (componentWillUnmount)');
    };
  });
  
  // Only runs on mount and unmount (empty dependency array)
  useEffect(() => {
    console.log('Component did mount');
    return () => {
      console.log('Component will unmount');
    };
  }, []);
  
  // Only runs when count changes
  useEffect(() => {
    console.log(`Count changed to ${count}`);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### State Management

#### Redux

```jsx
// Actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function increment() {
  return { type: INCREMENT };
}

function decrement() {
  return { type: DECREMENT };
}

// Reducer
function counter(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

// Store
import { createStore } from 'redux';
const store = createStore(counter);

// Connect React component
import { connect } from 'react-redux';

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  count: state
});

const mapDispatchToProps = {
  increment,
  decrement
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

#### Context API

```jsx
// Create Context
const CountContext = React.createContext();

// Provider
function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
}

// Consumer with Hooks
function Counter() {
  const { count, increment, decrement } = useContext(CountContext);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

// Usage
function App() {
  return (
    <CountProvider>
      <Counter />
    </CountProvider>
  );
}
```

## Vue.js

### Core Concepts

#### Vue Instance

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  },
  methods: {
    reverseMessage() {
      this.message = this.message.split('').reverse().join('');
    }
  }
});
```

#### Vue 3 Composition API

```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    
    const increment = () => {
      count.value++;
    };
    
    const doubleCount = computed(() => count.value * 2);
    
    return {
      count,
      increment,
      doubleCount
    };
  }
};
```

#### Vue Components

```javascript
// Global component registration
Vue.component('button-counter', {
  data() {
    return {
      count: 0
    };
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times
    </button>
  `
});

// Single file component (.vue file)
<template>
  <button @click="count++">
    You clicked me {{ count }} times
  </button>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    };
  }
};
</script>

<style scoped>
button {
  background-color: #f1f1f1;
  padding: 10px;
}
</style>
```

## Angular

### Core Concepts

#### Components

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ count }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  count = 0;
  
  increment() {
    this.count++;
  }
}
```

#### Services and Dependency Injection

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private count = 0;
  
  getCount() {
    return this.count;
  }
  
  increment() {
    this.count++;
    return this.count;
  }
}

// Using the service in a component
import { Component } from '@angular/core';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <p>Count: {{ getCount() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `
})
export class CounterComponent {
  constructor(private counterService: CounterService) {}
  
  getCount() {
    return this.counterService.getCount();
  }
  
  increment() {
    this.counterService.increment();
  }
}
```

## Common Interview Questions

### Question: What is Virtual DOM and how does it work in React?

**Answer:**
The Virtual DOM is a lightweight JavaScript representation of the actual DOM. In React, when a component's state changes, it triggers the following process:

1. React creates a new Virtual DOM tree representing the updated UI.
2. It compares this new Virtual DOM with the previous one (a process called "diffing").
3. It calculates the minimum number of operations needed to update the real DOM.
4. It applies only those changes to the actual DOM (a process called "reconciliation").

This approach is efficient because:
- Manipulating the real DOM is slow, while manipulating the Virtual DOM is much faster.
- By batching DOM updates and only applying the necessary changes, React minimizes expensive DOM operations.
- It abstracts browser-specific DOM implementation details.

For example, if you have a list of 1000 items and only one item changes, React will only update that specific node in the DOM rather than re-rendering the entire list.

### Question: Explain the difference between controlled and uncontrolled components in React.

**Answer:**
In React, form elements can be either controlled or uncontrolled components:

**Controlled Components:**
- The form data is handled by the React component state.
- The current value is passed as a prop (typically `value` or `checked`).
- Changes are handled through callbacks (typically `onChange`).
- React is the "single source of truth" for the input's state.

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  );
}
```

**Uncontrolled Components:**
- The form data is handled by the DOM itself.
- Values are retrieved using refs when needed (e.g., on form submission).
- React doesn't track the input's state during typing.

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);
  
  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <>
      <input ref={inputRef} defaultValue="" />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

Controlled components give you more control and allow you to validate or transform user input on each keystroke, while uncontrolled components are simpler to implement for basic forms but offer less control over the input behavior.

### Question: What are React hooks and why were they introduced?

**Answer:**
React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 to address several issues:

1. **Reusing stateful logic between components**: Before hooks, patterns like higher-order components or render props were needed, which could lead to "wrapper hell" with deeply nested component trees.

2. **Complex components became hard to understand**: Class components could contain a mix of unrelated logic in lifecycle methods. Hooks allow grouping related logic together.

3. **Classes were confusing**: Classes were harder for humans and machines (optimization) to understand. They required understanding `this` binding and using methods like `.bind()` or arrow functions.

Common built-in hooks include:
- `useState`: Adds local state to functional components
- `useEffect`: Performs side effects in functional components
- `useContext`: Accesses context values
- `useReducer`: Manages more complex state logic
- `useRef`: Creates a mutable reference
- `useMemo` and `useCallback`: Optimize performance by memoizing values and functions

Hooks follow important rules:
- Only call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React functional components or custom hooks

Hooks have made React code more concise, easier to understand, and better organized by enabling feature-based code organization rather than lifecycle-based organization.

### Question: What is the purpose of keys in React lists?

**Answer:**
Keys are special attributes that help React identify which items in a list have changed, been added, or removed. They are crucial for efficient rendering and maintaining component state across renders.

When rendering a list of elements in React, each element should have a unique `key` prop:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

Reasons why keys are important:

1. **Element identity**: Keys give elements a stable identity across renders, helping React determine which elements to update, add, or remove.

2. **Performance optimization**: Without keys, React might re-render every item in a list when only one changes. With keys, React can identify exactly which items changed.

3. **Component state preservation**: Keys help preserve component state when items are reordered. Without keys, React might reuse an existing DOM element but give it new props, which can lead to unexpected behavior.

Best practices for keys:
- Use stable, unique identifiers (like IDs from your data)
- Avoid using array indices as keys unless the list is static and will never change order
- Keys should be unique among siblings, not globally

When you don't use keys (or use index as keys in dynamic lists), you might encounter issues like:
- Incorrect component state
- DOM elements being unnecessarily recreated
- Focus being lost in input elements
- Unexpected animations or transitions

### Question: How does state differ from props in React?

**Answer:**
Props and state are both plain JavaScript objects that hold information influencing the output of a component, but they serve different purposes and have different characteristics:

**Props (Properties):**
- Passed from parent to child components (unidirectional data flow)
- Read-only within the component receiving them
- Can contain default values
- Changes to props trigger re-renders
- Used to customize a component when it's created

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Greeting name="John" />
```

**State:**
- Managed within a component (private)
- Can be changed by the component itself
- Should not be modified directly (use setState or state updater functions)
- Persists between renders
- Changes to state trigger re-renders
- Used for data that changes over time

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Key differences:
1. **Ownership**: Props are owned by the parent, state is owned by the component
2. **Mutability**: Props are immutable, state is mutable (through proper state update functions)
3. **Updates**: Props can only change if the parent re-renders, state can be updated by the component itself

When deciding between props and state, consider:
- If a value is passed from a parent, it should be a prop
- If a value will change and the component itself controls that change, it should be state
- If a value can be derived from props or state, it shouldn't be state at all (use computed values)
