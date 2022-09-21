# What are data attributes in HTML?

**Answer:**

Data attributes are custom attributes that allow you to store extra information on HTML elements. They begin with `data-` followed by a descriptor (e.g., `data-user-id="123"`). These attributes don't affect rendering but can be accessed via JavaScript using the `dataset` property.

Data attributes are useful for storing information that doesn't have a specific HTML attribute or property but is still needed for JavaScript operations or styling.

## HTML Syntax

Data attributes must:
1. Start with `data-`
2. Contain at least one character after the prefix
3. Contain no uppercase letters

```html
<!-- Basic data attributes -->  
<div data-user-id="123" data-user-name="John" data-status="active">User Profile</div>

<!-- Can be used on any HTML element -->  
<button data-action="delete" data-target="user">Delete User</button>

<!-- Can contain any string value --> 
<article data-categories="technology,programming,javascript"
         data-publish-date="2023-09-15"
         data-author-id="42">
  How to Use Data Attributes
</article>
```

## Accessing in JavaScript

Data attributes can be accessed using the `dataset` property, which converts the kebab-case attribute names to camelCase property names:

```javascript
const div = document.querySelector('div');

// Reading data attributes
console.log(div.dataset.userId);      // "123"
console.log(div.dataset.userName);    // "John"
console.log(div.dataset.status);      // "active"

// Writing data attributes
div.dataset.lastLogin = "2023-09-21";
console.log(div.dataset.lastLogin);   // "2023-09-21"

// The HTML is now:
// <div data-user-id="123" data-user-name="John" data-status="active" data-last-login="2023-09-21">User Profile</div>

// Checking if a data attribute exists
if ('userId' in div.dataset) {
  console.log('User ID exists');
}

// Deleting a data attribute
delete div.dataset.status;
```

## Accessing in CSS

Data attributes can also be targeted in CSS using attribute selectors:

```css
/* Select elements with a specific data attribute */
[data-status="active"] {
  background-color: #e6ffe6;
}

/* Select elements with a data attribute that starts with a value */
[data-user-id^="admin"] {
  font-weight: bold;
}

/* Select elements with a data attribute containing a value */
[data-categories*="javascript"] {
  border-left: 4px solid #f7df1e;
}
```

## Real-world use cases

1. **Storing state information**:
```html
<button data-expanded="false" class="accordion-toggle">Show More</button>
```

2. **Configuration for JavaScript components**:
```html
<div data-slider-autoplay="true" data-slider-interval="5000" class="image-slider">
  <!-- Slider items -->
</div>
```

3. **Storing information for event handling**:
```html
<button data-action="delete" data-item-id="42" class="action-btn">Delete</button>

<script>
  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const itemId = btn.dataset.itemId;
      
      if (action === 'delete') {
        deleteItem(itemId);
      }
    });
  });
</script>
```

4. **Internationalization**:
```html
<span data-i18n="greeting">Hello</span>
```

## Benefits of data attributes

- Separate content from behavior/presentation
- Valid HTML5 (unlike custom attributes without the `data-` prefix)
- No need for additional HTTP requests (unlike loading data via AJAX)
- Cleaner than overloading existing attributes or using non-standard ones
- Cross-browser compatible
- Doesn't affect accessibility

## Best practices

- Use data attributes for JavaScript-related metadata, not content
- Don't use them for sensitive data as they're visible in the DOM
- Consider other solutions for complex data (JSON API endpoints, etc.)
- Keep names descriptive and consistent
- For large amounts of data, consider `JSON.stringify()` to store objects