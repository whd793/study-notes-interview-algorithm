# Frontend Trivia Questions

## HTML

### Question: What's the difference between `localStorage`, `sessionStorage`, and cookies?

**Answer:**
- **localStorage**: Stores data with no expiration date. The data will persist even when the browser is closed and reopened. Limited to about 5MB.
- **sessionStorage**: Stores data for one session. Data is cleared when the page session ends (when the tab is closed). Limited to about 5MB.
- **Cookies**: Stores data that has to be sent back to the server with subsequent requests. Expiration can be set. Limited to about 4KB.

### Question: What are data attributes in HTML?

**Answer:**
Data attributes are custom attributes that allow you to store extra information on HTML elements. They begin with `data-` followed by a descriptor (e.g., `data-user-id="123"`). These attributes don't affect rendering but can be accessed via JavaScript using the `dataset` property.

```html
<div data-user-id="123" data-user-name="John">User Profile</div>
```

```javascript
const div = document.querySelector('div');
console.log(div.dataset.userId); // "123"
console.log(div.dataset.userName); // "John"
```

### Question: What is the purpose of the `defer` and `async` attributes on a script tag?

**Answer:**
- **defer**: Scripts with the `defer` attribute will load in parallel to HTML parsing and execute in order after the HTML is fully parsed, but before the `DOMContentLoaded` event.
- **async**: Scripts with the `async` attribute will load in parallel to HTML parsing and execute as soon as they are available, potentially before HTML is fully parsed. They will not necessarily execute in the order they appear in the document.

Without these attributes, script loading and execution blocks HTML parsing.

```html
<!-- Execute after HTML is parsed, maintain order -->  
<script defer src="script1.js"></script>

<!-- Execute as soon as possible, order not guaranteed -->
<script async src="analytics.js"></script>
```

### Question: What is the difference between `<section>` and `<div>` elements?

**Answer:**
- **`<section>`**: A semantic element that represents a standalone section of content that is thematically related. It typically includes a heading. Helps with document structure and SEO.
- **`<div>`**: A generic container with no semantic meaning. Used for styling purposes or as a container for other elements.

```html
<!-- Semantic section with related content -->
<section>
  <h2>Latest News</h2>
  <article>News item 1...</article>
  <article>News item 2...</article>
</section>

<!-- Generic container for styling -->
<div class="wrapper">
  <p>Some content...</p>
</div>
```

## CSS

### Question: What's the difference between `em`, `rem`, and `px` units?

**Answer:**
- **px**: Absolute unit that represents screen pixels. Fixed size regardless of parent element or page settings.
- **em**: Relative unit that is based on the font-size of its direct parent element. 1em equals the font size of the parent.
- **rem**: Relative unit that is based on the font-size of the root element (html). 1rem equals the font size of the root element. Consistent throughout the document.

```css
html {
  font-size: 16px; /* 1rem = 16px */
}

.parent {
  font-size: 20px; /* 1em = 20px for child elements */
}

.child {
  padding: 1em; /* 20px */
  margin: 1rem; /* 16px */
  border: 2px solid; /* 2px */
}
```

### Question: What is the CSS Box Model?

**Answer:**
The CSS Box Model describes how elements are rendered as rectangular boxes. It consists of:

1. **Content**: The actual content of the element (text, images, etc.)
2. **Padding**: Space between the content and the border
3. **Border**: Line around the padding (or content if no padding)
4. **Margin**: Space outside the border

By default (`box-sizing: content-box`), width and height properties apply only to the content box. With `box-sizing: border-box`, width and height include content, padding, and border.

```css
.content-box {
  box-sizing: content-box; /* Default */
  width: 100px;
  padding: 10px;
  border: 5px solid black;
  /* Total width: 100px + 20px (padding) + 10px (border) = 130px */
}

.border-box {
  box-sizing: border-box;
  width: 100px;
  padding: 10px;
  border: 5px solid black;
  /* Total width: 100px (includes content, padding, and border) */
}
```

### Question: What are pseudo-classes and pseudo-elements in CSS?

**Answer:**
- **Pseudo-classes**: Select elements based on state or position. They use a single colon (`:`) syntax.
- **Pseudo-elements**: Create "virtual" elements that don't exist in the HTML. They use a double colon (`::`) syntax (though single colon works for backwards compatibility).

```css
/* Pseudo-classes */
a:hover { color: red; } /* When mouse is over the link */
input:focus { border-color: blue; } /* When input has focus */
li:first-child { font-weight: bold; } /* First item in a list */

/* Pseudo-elements */
p::first-line { font-variant: small-caps; } /* First line of paragraph */
.quote::before { content: "\201C"; } /* Add content before element */
div::after { content: ""; display: block; clear: both; } /* Clearfix */
```

### Question: How does CSS specificity work?

**Answer:**
Specificity determines which CSS rule applies when multiple rules could apply to the same element. It's calculated as follows (from highest to lowest priority):

1. Inline styles (`style` attribute)
2. IDs (#id)
3. Classes (.class), attributes ([attr]), and pseudo-classes (:hover)
4. Elements (div) and pseudo-elements (::before)

If two selectors have the same specificity, the one that comes later in the CSS wins.

The `!important` declaration overrides normal specificity calculations.

```css
/* Specificity: 0-0-0-1 */
div { color: blue; }

/* Specificity: 0-0-1-0 */
.text { color: red; } /* This wins over div */

/* Specificity: 0-1-0-0 */
#special { color: green; } /* This wins over .text */

/* Specificity: 1-0-0-0 */
<div style="color: orange;"> /* This wins over #special */

/* Specificity: 0-0-1-0 with !important */
.text { color: purple !important; } /* This wins over everything */
```
