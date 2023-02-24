# React Component Patterns Interview Answer

React component patterns help create reusable, maintainable components while separating concerns. I commonly implement several patterns depending on the component's requirements.

The Compound Component pattern creates components that work together to form a cohesive API while maintaining encapsulation. For example, a Select component might export Select.Option components that are aware of their parent context. This improves readability and provides a natural composition model.

For components with complex logic, I use the Container/Presentational pattern (or smart/dumb components) to separate data fetching and state management from rendering. The container handles how things work while the presentational component focuses on how things look.

When a component needs to share behavior with others, I implement custom hooks or Higher-Order Components. Custom hooks are my preference for sharing stateful logic, while HOCs work well for cross-cutting concerns like authentication checks or data fetching. For maximum flexibility, I sometimes use the Render Props pattern, particularly when the child components need access to the parent component's state or methods.