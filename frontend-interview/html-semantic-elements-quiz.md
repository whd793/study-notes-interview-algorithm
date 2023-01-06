# HTML Semantic Elements Quiz

**Answer:**

Semantic HTML involves using the correct HTML elements that clearly describe their meaning and purpose, rather than just their presentation. Test your knowledge with this quiz.

## Question 1

Which of these elements is NOT considered a semantic HTML5 element?

```html
<article>
<div>
<section>
<nav>
```

A) `<article>`

B) `<div>`

C) `<section>`

D) `<nav>`

**Answer: B) `<div>`**

Explanation: The `<div>` element is a generic container with no semantic meaning. The other elements (`<article>`, `<section>`, and `<nav>`) all have specific semantic meanings in HTML5.

## Question 2

Which semantic element would be most appropriate for a widget showing current weather conditions?

A) `<article>`

B) `<section>`

C) `<aside>`

D) `<figure>`

**Answer: C) `<aside>`**

Explanation: An `<aside>` element represents content that is tangentially related to the content around it, like sidebars or call-out boxes. A weather widget typically contains information that's related but separate from the main content, making `<aside>` the most appropriate choice.

## Question 3

Which element should be used for the primary navigation links of a website?

A) `<ul>` inside `<nav>`

B) `<ul>` inside `<header>`

C) `<nav>` inside `<div>`

D) `<menu>`

**Answer: A) `<ul>` inside `<nav>`**

Explanation: The `<nav>` element is specifically designed to contain navigation links. Placing an unordered list (`<ul>`) of links inside `<nav>` is the most semantically correct approach for primary navigation.

## Question 4

Which element is designed to represent a standalone piece of content that could be distributed independently, like a blog post or news article?

A) `<section>`

B) `<content>`

C) `<article>`

D) `<main>`

**Answer: C) `<article>`**

Explanation: The `<article>` element represents a self-contained composition that is intended to be independently distributable or reusable. Blog posts, news stories, and forum posts are perfect examples of content that should be wrapped in `<article>` tags.

## Question 5

For a page with multiple blog posts, each with its own heading, content, and metadata, what would be the most semantically correct structure?

A) Multiple `<div>` elements inside a `<main>` element

B) Multiple `<article>` elements inside a `<section>` element

C) Multiple `<section>` elements inside an `<article>` element

D) Multiple `<content>` elements inside a `<blog>` element

**Answer: B) Multiple `<article>` elements inside a `<section>` element**

Explanation: Each blog post is a standalone piece of content (an `<article>`), and the collection of posts forms a thematic grouping, which is what `<section>` is designed for. Option D contains elements that don't exist in HTML5.

## Question 6

Which element should be used to mark up a site's copyright information and links to privacy policy, terms of service, etc.?

A) `<section id="copyright">`

B) `<div class="footer">`

C) `<footer>`

D) `<address>`

**Answer: C) `<footer>`**

Explanation: The `<footer>` element represents a footer for its nearest sectioning content or sectioning root element. It typically contains information about the author, copyright data, links to related documents, etc.

## Question 7

Which element is most appropriate for marking up a figure caption?

A) `<caption>`

B) `<figcaption>`

C) `<legend>`

D) `<desc>`

**Answer: B) `<figcaption>`**

Explanation: The `<figcaption>` element is specifically designed to provide a caption or legend for a `<figure>` element. `<caption>` is used with tables, `<legend>` is used with fieldsets, and `<desc>` is not a standard HTML element.

## Question 8

Which is the most semantically correct way to mark up a product review that includes rating stars, reviewer name, and review text?

A)
```html
<div class="review">
  <div class="stars">★★★★☆</div>
  <div class="reviewer">Jane Doe</div>
  <div class="text">Great product! Would buy again.</div>
</div>
```

B)
```html
<article class="review">
  <div class="stars">★★★★☆</div>
  <cite>Jane Doe</cite>
  <p>Great product! Would buy again.</p>
</article>
```

C)
```html
<section class="review">
  <span class="stars">★★★★☆</span>
  <h3>Jane Doe</h3>
  <p>Great product! Would buy again.</p>
</section>
```

D)
```html
<table class="review">
  <tr><td>★★★★☆</td></tr>
  <tr><td>Jane Doe</td></tr>
  <tr><td>Great product! Would buy again.</td></tr>
</table>
```

**Answer: B) The `<article>` example**

Explanation: A product review is a self-contained piece of content, making `<article>` appropriate. The `<cite>` element correctly attributes the review to its author, and a paragraph (`<p>`) is the correct container for the review text. Option A uses non-semantic `<div>` elements, option C uses `<section>` which is less specific than `<article>` for this purpose, and option D misuses `<table>` for layout rather than tabular data.

## Question 9

Which element is specifically designed for marking up time and dates in a machine-readable format?

A) `<time>`

B) `<date>`

C) `<calendar>`

D) `<datetime>`

**Answer: A) `<time>`**

Explanation: The `<time>` element represents a specific period in time and can include the `datetime` attribute for machine-readable formats. Options B, C, and D are not valid HTML5 elements.

## Question 10

What is the most semantically correct way to mark up a primary heading for a webpage?

A) `<h1>Page Title</h1>`

B) `<header><h1>Page Title</h1></header>`

C) `<main><h1>Page Title</h1></main>`

D) `<div class="heading"><span>Page Title</span></div>`

**Answer: B) `<header><h1>Page Title</h1></header>`**

Explanation: The `<header>` element represents introductory content for its nearest ancestor sectioning content. Typically, a page's main heading would be wrapped in an `<h1>` inside a `<header>` element. Option D uses non-semantic elements, while options A and C are less complete - although option A is not incorrect, option B provides better semantic structure.

## Question 11

Which of these is NOT a valid use of the `<aside>` element?

A) A sidebar containing related links

B) Pull quotes in an article

C) A section dividing an article into parts

D) Advertising related to the main content

**Answer: C) A section dividing an article into parts**

Explanation: The `<aside>` element is for content that is tangentially related to the content around it. A section dividing an article into parts is part of the main content flow and should use a `<section>` or possibly just a heading with subsequent content, not an `<aside>`.

## Question 12

Which element would you use to group together a set of controls in a form?

A) `<form-group>`

B) `<group>`

C) `<fieldset>`

D) `<controls>`

**Answer: C) `<fieldset>`**

Explanation: The `<fieldset>` element is specifically designed to group related form controls. It can also include a `<legend>` element to provide a caption for the fieldset. The other options are not valid HTML elements.