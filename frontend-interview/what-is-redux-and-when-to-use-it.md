# What is Redux and When to Use It?

**Answer:**

Redux is a predictable state management library for JavaScript applications, most commonly used with React. It provides a centralized store that holds the entire application state, with strict rules governing how state can be modified.

## Core Concepts

1. **Store**: A single source of truth that holds the application state

2. **Actions**: Plain JavaScript objects that describe what happened
   ```javascript
   { type: 'ADD_TODO', payload: { text: 'Buy milk', id: 1 } }
   ```

3. **Reducers**: Pure functions that take the current state and an action, then return a new state
   ```javascript
   function todoReducer(state = [], action) {
     switch (action.type) {
       case 'ADD_TODO':
         return [...state, action.payload];
       default:
         return state;
     }
   }
   ```

4. **Dispatch**: The method used to send actions to the store
   ```javascript
   store.dispatch({ type: 'ADD_TODO', payload: { text: 'Buy milk', id: 1 } });
   ```

## When to Use Redux

### Good Use Cases

1. **Complex State Logic**: When components need to share and update the same state in many places

2. **Medium to Large Applications**: Projects with many components and deep component hierarchies

3. **Frequent Updates**: Applications where state changes frequently across components

4. **Time-Travel Debugging**: When you need the ability to track state changes over time

5. **Predictable State Updates**: When you need explicit tracking of how state changes occur

### When Redux May Not Be Necessary

1. **Simple Applications**: Small apps with few components

2. **Beginner React Projects**: Learning React basics might be more important initially

3. **Localized State**: When state is isolated to a few components

4. **Modern Alternatives**: Context API + useReducer hook can handle simpler state management needs

## Modern Redux with Redux Toolkit

Redux Toolkit (RTK) simplifies Redux usage with built-in best practices:

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      // With RTK, we can "mutate" state directly thanks to Immer
      state.push(action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    }
  }
});

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
});

// Actions are automatically generated
export const { addTodo, toggleTodo } = todosSlice.actions;
```

Redux remains popular because it enforces a structured approach to state management, which leads to more maintainable code in complex applications.