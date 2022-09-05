# DOM Manipulation

## DOM Basics

The Document Object Model (DOM) is a programming interface for HTML and XML documents. It represents the page as nodes and objects that can be manipulated with JavaScript.

### DOM Tree Structure

The DOM represents a document as a tree structure:
- The document node is the root node
- HTML element nodes branch out from the root
- Text nodes, attribute nodes, and comment nodes are leaf nodes

```html
<!DOCTYPE html>
<html>
<head>
  <title>DOM Example</title>
</head>
<body>
  <h1 id="heading">Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
```

DOM tree for the above HTML:
```
document
└── html
    ├── head
    │   └── title
    │       └── "DOM Example"
    └── body
        ├── h1 (id="heading")
        │   └── "Hello World"
        └── p
            └── "This is a paragraph."
```

## Selecting DOM Elements

### By ID
```javascript
const element = document.getElementById('elementId');
```

### By Class Name
```javascript
const elements = document.getElementsByClassName('className');
```

### By Tag Name
```javascript
const elements = document.getElementsByTagName('tagName');
```

### Using CSS Selectors
```javascript
// Returns the first matching element
const element = document.querySelector('.class');

// Returns all matching elements
const elements = document.querySelectorAll('div.class');
```

### Traversing the DOM
```javascript
// Parent element
const parent = element.parentNode; // or element.parentElement

// Child elements
const children = element.childNodes; // includes text nodes, comments
const childElements = element.children; // only element nodes
const firstChild = element.firstChild; // first child node
const firstElement = element.firstElementChild; // first child element
const lastChild = element.lastChild; // last child node
const lastElement = element.lastElementChild; // last child element

// Sibling elements
const nextSibling = element.nextSibling; // next sibling node
const nextElement = element.nextElementSibling; // next sibling element
const prevSibling = element.previousSibling; // previous sibling node
const prevElement = element.previousElementSibling; // previous sibling element
```

## Modifying the DOM

### Creating Elements
```javascript
const div = document.createElement('div');
const text = document.createTextNode('Hello, World!');
```

### Adding Elements
```javascript
// Append at the end
parent.appendChild(child);

// Insert before a specific element
parent.insertBefore(newElement, referenceElement);

// Modern methods
parent.append(child1, child2, ...); // Append multiple nodes or strings
parent.prepend(child); // Insert at the beginning
referenceElement.before(newElement); // Insert before referenceElement
referenceElement.after(newElement); // Insert after referenceElement
```

### Removing Elements
```javascript
// Remove a child
parent.removeChild(child);

// Self-removal
element.remove();
```

### Replacing Elements
```javascript
parent.replaceChild(newChild, oldChild);
```

### Manipulating Content
```javascript
// Get or set text content
element.textContent = 'New text';

// Get or set HTML content
element.innerHTML = '<span>New HTML</span>';

// Clone an element
const clone = element.cloneNode(true); // true to clone with all descendants
```

## Working with Attributes

```javascript
// Check if attribute exists
element.hasAttribute('class');

// Get attribute value
const value = element.getAttribute('id');

// Set attribute value
element.setAttribute('data-custom', 'value');

// Remove attribute
element.removeAttribute('disabled');

// Directly access common attributes
element.id = 'newId';
element.className = 'newClass';

// Working with classes
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active');
element.classList.contains('hidden');
element.classList.replace('old-class', 'new-class');
```

## Styling Elements

```javascript
// Set individual style
element.style.color = 'red';
element.style.fontSize = '16px';

// Set multiple styles
Object.assign(element.style, {
  color: 'blue',
  backgroundColor: '#fff',
  padding: '10px'
});

// Get computed style (including CSS from stylesheets)
const computedStyle = window.getComputedStyle(element);
const color = computedStyle.color;
```

## Event Handling

### Adding Event Listeners
```javascript
element.addEventListener('click', function(event) {
  console.log('Element clicked');
});
```

### Removing Event Listeners
```javascript
function handler(event) {
  console.log('Element clicked');
}

element.addEventListener('click', handler);
// Later:
element.removeEventListener('click', handler);
```

### Event Object Properties
```javascript
element.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default behavior
  event.stopPropagation(); // Stop event bubbling
  
  console.log(event.target); // Element that triggered the event
  console.log(event.currentTarget); // Element that the event listener is attached to
  console.log(event.type); // Type of event ('click')
  console.log(event.clientX, event.clientY); // Mouse coordinates
});
```

### Event Delegation
```javascript
document.getElementById('parent-list').addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    console.log('List item clicked:', event.target.textContent);
  }
});
```

## DOM Performance Optimization

### Document Fragments
```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}

document.getElementById('list').appendChild(fragment);
```

### Batch DOM Updates
```javascript
// Bad: Individual updates
for (let i = 0; i < 1000; i++) {
  document.getElementById('list').innerHTML += `<li>Item ${i}</li>`;
}

// Good: Single update
let html = '';
for (let i = 0; i < 1000; i++) {
  html += `<li>Item ${i}</li>`;
}
document.getElementById('list').innerHTML = html;
```

### Minimize Reflows and Repaints
```javascript
// Bad: Multiple reflows
const element = document.getElementById('box');
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// Good: Batching style changes
const element = document.getElementById('box');
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Or use a class
element.className = 'box-style';
```

## Common DOM Interview Questions

### What is the difference between `innerHTML` and `textContent`?
- `innerHTML` parses content as HTML and takes longer to process
- `textContent` treats content as plain text, faster, and safer from XSS attacks

### Explain event bubbling and capturing
- **Bubbling**: Events propagate from the target element up to the root
- **Capturing**: Events propagate from the root down to the target element

### What is a virtual DOM?
A virtual DOM is a lightweight copy of the actual DOM that helps optimize updates by batching changes and minimizing direct DOM manipulation.

### How do you optimize DOM manipulation performance?
- Minimize DOM access and updates
- Use document fragments
- Batch updates
- Use event delegation
- Modify classes instead of individual styles

### How would you handle browser compatibility issues with the DOM?
- Use feature detection instead of browser detection
- Polyfills for missing functionality
- Transpilers to convert newer syntax to older versions
- Testing across different browsers
