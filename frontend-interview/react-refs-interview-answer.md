# React Refs Interview Answer

Refs in React provide a way to access DOM nodes or React component instances directly. I use the useRef hook in functional components or createRef in class components to create refs, which persist across renders without causing re-renders when their values change.

The most common use case I encounter is accessing DOM elements for operations that can't be handled through React's declarative approach, such as focusing inputs, measuring element dimensions, or integrating with third-party DOM libraries. I'm careful to use refs judiciously since they bypass React's declarative rendering model.

For passing refs to custom components, I use React.forwardRef to let parent components access a child component's DOM node. This is particularly useful for reusable form components where parent forms need direct access to inputs. When working with class components, I sometimes need to use callback refs for more complex ref logic or when I need to perform operations when the ref is assigned or changed.