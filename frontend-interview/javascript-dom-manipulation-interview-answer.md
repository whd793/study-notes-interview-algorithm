# JavaScript DOM Manipulation Interview Answer

DOM manipulation involves changing the document structure, content, and styling using JavaScript. While modern frameworks like React abstract much of this work, understanding core DOM manipulation remains essential for performance optimization, custom directives, and working with third-party libraries.

When manipulating the DOM directly, I use querySelector and querySelectorAll for element selection as they provide CSS-like syntax which is more flexible than older methods like getElementById. For modifying content, I use textContent for simple text changes (faster and more secure than innerHTML) and createElement/appendChild for adding new elements. When working with multiple elements, I use DocumentFragment to batch changes before committing them to the live DOM, reducing reflows and repaints.

For event handling, I implement event delegation by attaching listeners to parent elements and checking the event target, rather than attaching individual listeners to many elements. This improves performance and automatically handles dynamically added elements. I'm careful about performance implications of DOM operations, particularly those that trigger layout recalculation like reading offsetWidth immediately after changing styles.

When integrating with frameworks like React, I use refs for controlled access to DOM elements while maintaining the component lifecycle, only using direct DOM manipulation for functionality not easily achieved through the framework's declarative approach.