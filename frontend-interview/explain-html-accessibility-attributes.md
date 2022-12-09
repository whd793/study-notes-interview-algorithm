# Explain HTML Accessibility Attributes

**Answer:**

HTML accessibility attributes enhance web content usability for people with disabilities. They provide additional information to assistive technologies like screen readers, making websites more inclusive.

## Essential Accessibility Attributes

### aria-label
Provides a label for elements that don't have visible text:

```html
<button aria-label="Close dialog">×</button>
```

### aria-labelledby
References another element that serves as a label:

```html
<div id="title">Account Settings</div>
<section aria-labelledby="title">...</section>
```

### aria-describedby
References an element that provides additional description:

```html
<input type="password" aria-describedby="password-requirements">
<p id="password-requirements">Password must be at least 8 characters.</p>
```

### aria-hidden
Hides elements from screen readers:

```html
<div aria-hidden="true"><!-- Decorative content --></div>
```

### aria-expanded
Indicates whether a control is expanded or collapsed:

```html
<button aria-expanded="false" onclick="toggleMenu()">Menu</button>
```

### aria-required
Indicates that user input is required:

```html
<input type="text" aria-required="true">
```

### aria-current
Indicates the current item in a set:

```html
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>
```

### aria-live
Announces dynamic content changes:

```html
<div aria-live="polite"><!-- Content that updates --></div>
```

## Native HTML Attributes

### alt (for images)

```html
<img src="chart.png" alt="Q1 2023 sales increased by 25% compared to Q4 2022">
<!-- Decorative images should have empty alt -->
<img src="decorative-divider.png" alt="">
```

### lang

```html
<html lang="en">
<!-- For specific sections in different languages -->
<blockquote lang="es">Hola mundo</blockquote>
```

### title

```html
<abbr title="World Health Organization">WHO</abbr>
```

### tabindex

```html
<!-- Make non-interactive elements focusable -->
<div tabindex="0" role="button">Click me</div>
<!-- Remove from tab order -->
<div tabindex="-1">Not focusable via keyboard</div>
```

### for (label)

```html
<label for="username">Username:</label>
<input id="username" type="text">
```

## Semantic HTML

Using semantic elements provides built-in accessibility benefits:

```html
<!-- Non-semantic -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Semantic - better for accessibility -->
<header>
  <nav>...</nav>
</header>
```

## Form Accessibility

```html
<form>
  <fieldset>
    <legend>Contact Information</legend>
    
    <label for="name">Name:</label>
    <input id="name" type="text" autocomplete="name" required>
    
    <label for="email">Email:</label>
    <input id="email" type="email" autocomplete="email" required
           aria-describedby="email-help">
    <p id="email-help">We'll never share your email.</p>
    
    <button type="submit">Submit</button>
  </fieldset>
</form>
```

## Accessible Rich Internet Applications (ARIA) Roles

When semantic HTML isn't sufficient, ARIA roles help convey purpose:

```html
<div role="alert">Your form has been submitted successfully.</div>
<div role="tablist">
  <button role="tab" aria-selected="true" id="tab1">Tab 1</button>
  <button role="tab" aria-selected="false" id="tab2">Tab 2</button>
</div>
<div role="tabpanel" aria-labelledby="tab1">Content 1</div>
```

## Best Practices

1. **Use semantic HTML first** before resorting to ARIA attributes
2. **Test with screen readers** (VoiceOver, NVDA, JAWS)
3. **Ensure keyboard navigability** of all interactive elements
4. **Maintain visible focus indicators** for all focusable elements
5. **Provide text alternatives** for non-text content
6. **Use appropriate color contrast** (WCAG AA requires 4.5:1 for normal text)

Implementing these accessibility attributes helps ensure compliance with standards like WCAG (Web Content Accessibility Guidelines) and creates a better experience for all users, regardless of how they access your content.