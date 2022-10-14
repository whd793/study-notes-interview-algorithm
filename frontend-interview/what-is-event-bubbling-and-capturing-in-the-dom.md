# What is event bubbling and capturing in the DOM?

**Answer:**

Event bubbling and capturing are the two phases of event propagation in the Document Object Model (DOM). When an event occurs on an element, it can be handled at different levels of the DOM hierarchy through these propagation mechanisms.

## The Three Phases of Event Propagation

When an event occurs, it goes through three phases:

1. **Capturing Phase**: The event travels from the `Window` down through the DOM tree to the target element
2. **Target Phase**: The event reaches the target element
3. **Bubbling Phase**: The event bubbles up from the target element back to the `Window`

## Event Bubbling

Event bubbling is the process where an event triggered on a nested element "bubbles up" through its ancestor elements in the DOM hierarchy, from the target element up to the `document` root.

### How Bubbling Works

1. An event occurs on an element (e.g., a click on a button)
2. The event handler on that element runs (if one exists)
3. The event handler on the parent element runs
4. The event continues up the DOM tree, running handlers on each ancestor

```html
<div id="outer">
  <div id="inner">
    <button id="button">Click Me</button>
  </div>
</div>

<script>
  document.getElementById('button').addEventListener('click', function(e) {
    console.log('Button clicked');
  });
  
  document.getElementById('inner').addEventListener('click', function(e) {
    console.log('Inner div clicked');
  });
  
  document.getElementById('outer').addEventListener('click', function(e) {
    console.log('Outer div clicked');
  });
</script>
```

When the button is clicked, the console output will be:
```
Button clicked
Inner div clicked
Outer div clicked
```

## Event Capturing

Event capturing (or "trickling") is the opposite of bubbling. The event starts at the root and travels down through the DOM tree to the target element.

### How Capturing Works

1. An event occurs on an element
2. The event handler on the document root runs (if set to capture)
3. The event travels down, running capture handlers on each ancestor
4. Finally, the event reaches the target element

To use event capturing, set the third parameter of `addEventListener` to `true`:

```javascript
document.getElementById('outer').addEventListener('click', function(e) {
  console.log('Outer div - capture phase');
}, true); // true enables capturing

document.getElementById('inner').addEventListener('click', function(e) {
  console.log('Inner div - capture phase');
}, true);

document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button - capture phase');
}, true);
```

With these capture listeners, clicking the button would output:
```
Outer div - capture phase
Inner div - capture phase
Button - capture phase
```

## Combining Both Phases

If we have both capturing and bubbling handlers, the execution order will be:

1. All capture handlers from root to target
2. The target handler
3. All bubble handlers from target to root

```javascript
// Capturing handlers (third parameter true)
document.getElementById('outer').addEventListener('click', function(e) {
  console.log('1. Outer div - capture phase');
}, true);

document.getElementById('inner').addEventListener('click', function(e) {
  console.log('2. Inner div - capture phase');
}, true);

// Target handlers
document.getElementById('button').addEventListener('click', function(e) {
  console.log('3. Button - target phase (bubble)');
});
document.getElementById('button').addEventListener('click', function(e) {
  console.log('4. Button - target phase (capture)');
}, true);

// Bubbling handlers (third parameter false or omitted)
document.getElementById('inner').addEventListener('click', function(e) {
  console.log('5. Inner div - bubble phase');
});

document.getElementById('outer').addEventListener('click', function(e) {
  console.log('6. Outer div - bubble phase');
});
```

When the button is clicked, the output will be:
```
1. Outer div - capture phase
2. Inner div - capture phase
3. Button - target phase (bubble)
4. Button - target phase (capture)
5. Inner div - bubble phase
6. Outer div - bubble phase
```

## Stopping Event Propagation

Two methods can be used to control event propagation:

### stopPropagation()

Prevents the event from propagating further up or down the DOM tree but allows other event handlers on the current element to run.

```javascript
document.getElementById('inner').addEventListener('click', function(e) {
  e.stopPropagation(); // Stops the event from reaching outer div
  console.log('Inner div clicked - propagation stopped');
});
```

### stopImmediatePropagation()

Prevents the event from propagating AND prevents other handlers on the same element from running.

```javascript
document.getElementById('button').addEventListener('click', function(e) {
  e.stopImmediatePropagation();
  console.log('Button clicked - handler 1');
});

// This handler won't run
document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button clicked - handler 2');
});
```

## Event Delegation

Event delegation is a technique that leverages event bubbling to handle events at a higher level in the DOM than the element on which the event originated.

### Advantages of Event Delegation

1. **Memory efficiency**: Attach one event handler instead of many
2. **Dynamic elements**: Works for elements added to the DOM after the initial page load
3. **Less code**: Reduces the number of event bindings

### Example of Event Delegation

```html
<ul id="todo-list">
  <li>Task 1</li>
  <li>Task 2</li>
  <li>Task 3</li>
</ul>

<script>
  // Instead of adding a click handler to each li
  document.getElementById('todo-list').addEventListener('click', function(e) {
    // Check if the clicked element is an li
    if (e.target.tagName === 'LI') {
      console.log('Task clicked:', e.target.textContent);
      e.target.classList.toggle('completed');
    }
  });
  
  // New items will work without additional handlers
  const newItem = document.createElement('li');
  newItem.textContent = 'Task 4';
  document.getElementById('todo-list').appendChild(newItem);
</script>
```

## Browser Compatibility

- All modern browsers support both bubbling and capturing
- Internet Explorer < 9 only supported bubbling
- The `addEventListener` method is standard, but older IE versions used `attachEvent` (bubbling only)

## Use Cases

- **Bubbling**: More commonly used, great for event delegation
- **Capturing**: Less common, useful for intercepting events before they reach the target
- **Both**: Useful for complex applications that need fine-grained control over event handling

## Best Practices

1. Use event delegation when handling events on multiple similar elements
2. Be cautious with `stopPropagation()` as it might interfere with other code
3. Choose the right phase for your specific use case (usually bubbling)
4. Be aware of events that don't bubble (e.g., `focus`, `blur`, `load`)
5. When developing libraries, consider using capturing to ensure your code runs before page-specific handlers