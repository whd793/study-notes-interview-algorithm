# What is the difference between `<section>` and `<div>` elements?

**Answer:**

The primary difference between `<section>` and `<div>` elements is that `<section>` is a semantic element with meaning, while `<div>` is a generic container with no semantic meaning.

## `<section>` Element

The `<section>` element represents a thematically coherent standalone section of a document, typically with a heading. It was introduced in HTML5 as part of the effort to make HTML more semantic.

**Key characteristics:**

- Represents a thematic grouping of content
- Generally should include a heading (`<h1>` to `<h6>`) as a child
- Contributes to the document's outline and structure
- Helps search engines understand the document structure
- Improves accessibility for assistive technologies
- Should be used when the content would logically appear in the table of contents

**Example usage:**

```html
<section>
  <h2>Product Features</h2>
  <p>Our product offers the following key features:</p>
  <ul>
    <li>Easy integration</li>
    <li>High performance</li>
    <li>24/7 support</li>
  </ul>
</section>

<section>
  <h2>Customer Testimonials</h2>
  <blockquote>This product changed our business completely.</blockquote>
  <cite>— Jane Smith, CEO of Acme Inc.</cite>
</section>
```

## `<div>` Element

The `<div>` element is a generic container with no specific semantic meaning. It should be used for styling purposes or when no other semantic element (like `<section>`, `<article>`, `<nav>`, etc.) is appropriate.

**Key characteristics:**

- Generic container with no inherent meaning
- Does not convey any information about its contents
- Does not contribute to the document's semantic structure
- Useful for layout and styling purposes
- Should be used only when no semantic element fits the purpose

**Example usage:**

```html
<!-- Using div for layout/styling purposes -->
<div class="container">
  <div class="row">
    <div class="column">
      <!-- Content here -->
    </div>
    <div class="column">
      <!-- More content here -->
    </div>
  </div>
</div>

<!-- Using div for grouping elements for JavaScript functionality -->
<div id="sortable-list" class="draggable-container">
  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
</div>
```

## When to use `<section>` vs `<div>`

**Use `<section>` when:**

- The content represents a thematic grouping
- The content would make sense as an entry in an outline
- The content typically includes a heading
- You want to improve the semantic structure of your document

**Use `<div>` when:**

- You need a container purely for styling purposes
- You need a wrapper for JS functionality
- No semantic element is appropriate for your specific case
- The grouping doesn't represent a logical section of content

## Comparison with other semantic elements

- **`<article>`** - Represents a self-contained composition that could be distributed independently (blog post, news story, etc.)
- **`<aside>`** - Represents content tangentially related to the content around it (sidebars, pull quotes)
- **`<nav>`** - Represents a section of navigation links
- **`<header>`** - Represents introductory content or navigational aids for a page or section
- **`<footer>`** - Represents a footer for a page or section with metadata
- **`<main>`** - Represents the main content of the document, only one per page

## Benefits of using semantic elements like `<section>`

1. **Accessibility** - Screen readers and assistive technologies can better understand your page
2. **SEO** - Search engines give more weight to content in semantic elements
3. **Maintainability** - Code is more self-descriptive and easier to understand
4. **Future-proofing** - Semantic markup is more robust to changes in browsers and devices
5. **Consistency** - Encourages a more standardized approach to structuring web pages

## Common mistakes to avoid

1. Overusing `<section>` for every div-like grouping
2. Using `<section>` without a heading
3. Using `<div>` when a more appropriate semantic element exists
4. Nesting `<section>` elements too deeply without logical reasons