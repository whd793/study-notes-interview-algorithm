# What are Event Bubbling and Capturing?

**Answer:**

Event bubbling and capturing are the two phases of event propagation in the DOM. When an event occurs on an element, it first runs the handlers on it, then on its parent, and all the way up the DOM tree.

## Event Propagation Phases

When an event occurs, it goes through three phases:

1. **Capturing Phase**: The event travels from the `window` down to the target element
2. **Target Phase**: The event reaches the target element
3. **Bubbling Phase**: The event bubbles up from the target element to the `window`

### Visual Representation

For a click on a button inside a div inside the body:

```
Capturing Phase (1):  window → document → body → div → button
Target Phase (2):                                  button
Bubbling Phase (3):   button → div → body → document → window
```

## Event Bubbling

Event bubbling is the default behavior where the event starts from the target element and bubbles up to the ancestors. 

```html
<div id="outer">
  <div id="inner">
    <button id="button">Click me</button>
  </div>
</div>

<script>
  document.getElementById('button').addEventListener('click', function() {
    console.log('Button clicked');
  });
  
  document.getElementById('inner').addEventListener('click', function() {
    console.log('Inner div clicked');
  });
  
  document.getElementById('outer').addEventListener('click', function() {
    console.log('Outer div clicked');
  });
</script>
```

If you click the button, the console output will be:
```
Button clicked
Inner div clicked
Outer div clicked
```

## Event Capturing

Event capturing happens before bubbling. To catch events in the capturing phase, add a `true` parameter to `addEventListener`:

```javascript
document.getElementById('outer').addEventListener('click', function() {
  console.log('Outer div - capturing phase');
}, true); // true enables capturing

document.getElementById('inner').addEventListener('click', function() {
  console.log('Inner div - capturing phase');
}, true);
```

With both bubbling and capturing handlers in place, clicking the button would output:
```
Outer div - capturing phase
Inner div - capturing phase
Button clicked
Inner div clicked
Outer div clicked
```

## Stopping Propagation

You can stop event propagation using `event.stopPropagation()`:

```javascript
document.getElementById('inner').addEventListener('click', function(event) {
  console.log('Inner div clicked');
  event.stopPropagation(); // Stops the event from bubbling up
});
```

With this in place, clicking the button would only trigger the button and inner div handlers.

## Event Delegation

Event bubbling enables a powerful pattern called event delegation. Instead of attaching events to many elements, you can attach one event to a parent element:

```html
<ul id="todo-list">
  <li>Task 1</li>
  <li>Task 2</li>
  <li>Task 3</li>
</ul>

<script>
  document.getElementById('todo-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      console.log('Task clicked:', event.target.textContent);
    }
  });
</script>
```

This approach:
- Reduces memory usage (fewer event handlers)
- Works for dynamically added elements
- Simplifies code maintenance

## Practical Considerations

1. Most events bubble (click, mousedown, keydown, etc.), but some don't (focus, blur, etc.)
2. Use `event.target` to identify the actual element that triggered the event
3. Use `event.currentTarget` to identify the element that the event handler is attached to
4. Modern best practice is to use bubbling with event delegation for most scenarios
5. Capturing is rarely used except for specialized cases