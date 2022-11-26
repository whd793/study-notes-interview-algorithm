# Explain Web Accessibility (A11y)

**Answer:**

Web accessibility (often abbreviated as A11y) is the practice of designing and developing websites that can be used by everyone, including people with disabilities. It ensures equal access to information and functionality regardless of how users navigate the web.

## Why Accessibility Matters

1. **Inclusivity**: Approximately 15-20% of the global population has some form of disability
2. **Legal requirements**: Many countries have laws requiring accessibility (ADA, Section 508, EAA)
3. **SEO benefits**: Many accessibility practices improve search engine optimization
4. **Better UX for everyone**: Features like keyboard navigation benefit all users

## Key Accessibility Guidelines

The Web Content Accessibility Guidelines (WCAG) provide standards organized around four principles:

1. **Perceivable**: Information must be presentable in ways all users can perceive
2. **Operable**: Interface components must be operable by all users
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough to work with assistive technologies

## Essential Implementation Techniques

### Semantic HTML

```html
<!-- Bad: Divs with no semantic meaning -->
<div class="header">
  <div class="navigation">
    <div class="nav-item">Home</div>
  </div>
</div>

<!-- Good: Semantic elements convey structure -->
<header>
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
    </ul>
  </nav>
</header>
```

### Proper Heading Structure

```html
<!-- Use h1-h6 in a logical hierarchy -->
<h1>Main Page Title</h1>
<section>
  <h2>Section Title</h2>
  <h3>Subsection Title</h3>
</section>
```

### Alternative Text for Images

```html
<!-- Essential image needs alt text -->
<img src="chart.png" alt="Sales increased by 25% in Q3 2023" />

<!-- Decorative images should have empty alt -->
<img src="decorative-line.png" alt="" />
```

### Keyboard Navigation

```html
<!-- Ensure interactive elements are keyboard accessible -->
<button type="button" onclick="showMenu()">Menu</button>

<!-- Don't rely solely on mouseover events -->
<div 
  tabindex="0" 
  role="button"
  onclick="togglePanel()"
  onkeydown="if(event.key==='Enter') togglePanel()"
>
  Toggle Panel
</div>
```

### ARIA Attributes

```html
<!-- Use ARIA when HTML semantics aren't sufficient -->
<div role="alert" aria-live="assertive">
  Your form has been submitted successfully.
</div>

<button aria-expanded="false" aria-controls="dropdown1">
  Options
</button>
<div id="dropdown1" hidden>
  <!-- Dropdown content -->
</div>
```

### Color Contrast

Text must have sufficient contrast with its background:
- Regular text: minimum ratio of 4.5:1
- Large text: minimum ratio of 3:1

```css
/* Good contrast */
.text {
  color: #212121;
  background-color: #ffffff;
}
```

### Focus Indicators

```css
/* Never remove focus outlines without replacement */
:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

## Testing Accessibility

1. **Automated Tools**:
   - Lighthouse (Chrome DevTools)
   - axe DevTools
   - WAVE Evaluation Tool

2. **Manual Testing**:
   - Keyboard navigation (without mouse)
   - Screen reader testing (NVDA, VoiceOver, JAWS)
   - Zoom text to 200%
   - Disable styles to check content structure

3. **User Testing**:
   - Include people with disabilities in user testing

Accessibility is not a one-time effort but an ongoing commitment to inclusive design. By integrating these practices into your development workflow, you create experiences that work for everyone.