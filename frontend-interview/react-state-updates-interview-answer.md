# React State Updates Interview Answer

State updates in React are asynchronous and batched for performance reasons. When I call setState or a state updater function from useState, React doesn't immediately update the state but schedules an update, which may be processed later in a batch with other state changes. This behavior prevents unnecessary re-renders when multiple state updates happen in quick succession.

When new state depends on previous state, I always use the functional form of state updates. For example, with useState, I pass a function that receives the previous state value and returns the new state, ensuring I'm working with the most current state value regardless of batching.

For complex state objects, I maintain immutability by creating new objects rather than mutating existing ones. With useState, I spread the previous state into a new object and override specific properties. For more complex state logic, I use useReducer which provides a more structured approach to state transitions through action types and a reducer function. This pattern is particularly helpful when different parts of state depend on each other or when state transitions have side effects.