# CSS and Styling

## CSS Fundamentals

### CSS Selectors

```css
/* Type selector */
div { color: blue; }

/* Class selector */
.container { width: 80%; }

/* ID selector */
#header { height: 100px; }

/* Attribute selector */
input[type="text"] { border: 1px solid gray; }

/* Pseudo-class */
a:hover { text-decoration: underline; }

/* Pseudo-element */
p::first-line { font-weight: bold; }

/* Descendant combinator */
div p { margin-bottom: 10px; }

/* Child combinator */
ul > li { list-style-type: square; }

/* Adjacent sibling combinator */
h2 + p { font-style: italic; }

/* General sibling combinator */
h2 ~ p { color: gray; }
```

### Specificity

Selector specificity determines which CSS rule applies when multiple rules could apply to an element. Specificity hierarchy (from highest to lowest):

1. Inline styles (`style` attribute)
2. IDs (#id)
3. Classes (.class), attributes ([attr=value]), and pseudo-classes (:hover)
4. Elements (div) and pseudo-elements (::before)

Specificity is calculated as a four-part value: (inline, ids, classes, elements)

```css
/* Specificity: 0,0,0,1 */
div { color: blue; }

/* Specificity: 0,0,1,0 */
.container { color: red; }

/* Specificity: 0,1,0,0 */
#header { color: green; }

/* Specificity: 0,0,1,1 */
div.container { color: yellow; }

/* Specificity: 0,1,1,1 */
#header div.container { color: purple; }
```

### Cascade and Inheritance

The cascade determines which style takes precedence when multiple rules apply to the same element. Order of precedence (from highest to lowest):

1. `!important` declarations
2. Inline styles
3. External and internal stylesheets (based on specificity)
4. Browser defaults

Inheritance: Some properties are inherited from parent elements (e.g., font-family, color), while others are not (e.g., border, margin).

```css
/* Example of !important overriding specificity */
.sidebar { color: blue !important; } /* This wins */
#sidebar { color: red; }
```

## CSS Box Model

### Box Model Components

- **Content**: The actual content of the element (text, images, etc.)
- **Padding**: Space between the content and the border
- **Border**: Line around the padding and content
- **Margin**: Space outside the border

```css
.box {
  width: 300px;  /* Content width */
  padding: 20px;  /* Space inside the border */
  border: 2px solid black;  /* Border */
  margin: 30px;  /* Space outside the border */
}

/* Total width calculation (default box-sizing) */
/* 300px + 40px (padding) + 4px (border) = 344px */
```

### Box Sizing

```css
/* Default box-sizing */
.box-content {
  box-sizing: content-box; /* Width/height applies to content only */
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Total width: 300 + 40 + 4 = 344px */
}

/* Alternative box-sizing */
.box-border {
  box-sizing: border-box; /* Width/height includes padding and border */
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* Total width: 300px */
}
```

## CSS Layout

### Display Property

```css
/* Basic display values */
.block { display: block; } /* Takes full width, creates a new line */
.inline { display: inline; } /* Takes only needed width, no new line */
.inline-block { display: inline-block; } /* Inline but respects width/height */
.none { display: none; } /* Removes element from layout */

/* Flex container */
.flex-container { display: flex; }

/* Grid container */
.grid-container { display: grid; }
```

### Positioning

```css
/* Static positioning (default) */
.static { position: static; }

/* Relative positioning */
.relative {
  position: relative;
  top: 20px;
  left: 30px; /* Offset from normal position */
}

/* Absolute positioning */
.absolute {
  position: absolute;
  top: 0;
  right: 0; /* Positioned relative to nearest positioned ancestor */
}

/* Fixed positioning */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px; /* Positioned relative to viewport */
}

/* Sticky positioning */
.sticky {
  position: sticky;
  top: 0; /* Stuck when scrolled to this position */
}
```

### Flexbox

```css
.flex-container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
  justify-content: space-between; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center; /* stretch | flex-start | flex-end | center | baseline */
  align-content: flex-start; /* stretch | flex-start | flex-end | center | space-between | space-around */
  gap: 10px; /* Space between flex items */
}

.flex-item {
  flex-grow: 1; /* Proportion of available space to distribute */
  flex-shrink: 1; /* Ability to shrink if needed */
  flex-basis: auto; /* Initial size before growing/shrinking */
  /* Shorthand */
  flex: 1 1 auto; /* grow shrink basis */
  align-self: flex-end; /* Override container's align-items for specific item */
  order: 2; /* Controls order of items */
}
```

### CSS Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Three columns with proportional widths */
  grid-template-rows: 100px auto; /* First row 100px, second row auto-sized */
  grid-template-areas: 
    "header header header"
    "sidebar content content"
    "footer footer footer";
  gap: 10px; /* Gap between grid items */
  justify-items: center; /* Horizontal alignment within cells */
  align-items: center; /* Vertical alignment within cells */
}

.grid-item {
  grid-column: 1 / 3; /* Start at column 1, end before column 3 */
  grid-row: 2; /* Place in row 2 */
  /* Alternative using area names */
  grid-area: header; /* Place in the "header" area */
  justify-self: start; /* Override container's justify-items for specific item */
  align-self: end; /* Override container's align-items for specific item */
}
```

## Responsive Design

### Media Queries

```css
/* Base styles for all devices */
body {
  font-size: 16px;
}

/* Styles for tablets */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
}

/* Styles for mobile phones */
@media (max-width: 480px) {
  body {
    font-size: 12px;
  }
}

/* Orientation-based media query */
@media (orientation: landscape) {
  .sidebar {
    width: 30%;
  }
}

/* Combination of conditions */
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .container {
    width: 90%;
  }
}
```

### Responsive Units

```css
/* Relative to font-size of the element */
.box { font-size: 1.5em; }

/* Relative to font-size of the root element */
.box { font-size: 1.5rem; }

/* Relative to 1% of viewport width */
.container { width: 80vw; }

/* Relative to 1% of viewport height */
.hero { height: 50vh; }

/* Relative to 1% of viewport's smaller dimension */
.square { width: 50vmin; height: 50vmin; }

/* Relative to 1% of viewport's larger dimension */
.banner { width: 80vmax; }

/* Percentage (relative to parent) */
.column { width: 50%; }

/* Using calc for mixed units */
.sidebar { width: calc(100% - 2rem); }
```

### Responsive Design Principles

1. **Fluid Layouts**: Use relative units instead of fixed pixel values
   ```css
   .container {
     width: 90%;
     max-width: 1200px;
     margin: 0 auto;
   }
   ```

2. **Flexible Images**
   ```css
   img {
     max-width: 100%;
     height: auto;
   }
   ```

3. **Media Queries**: Adjust layout at different breakpoints

4. **Mobile First**: Start with mobile styles, then add complexity for larger screens
   ```css
   /* Mobile styles (default) */
   .container {
     flex-direction: column;
   }
   
   /* Desktop styles */
   @media (min-width: 768px) {
     .container {
       flex-direction: row;
     }
   }
   ```

## CSS Preprocessors

### SASS/SCSS Features

```scss
// Variables
$primary-color: #3498db;
$padding: 15px;

// Nesting
.container {
  background-color: #fff;
  padding: $padding;
  
  .header {
    color: $primary-color;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// Mixins
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.centered-box {
  @include flex-center;
  height: 200px;
}

// Extensions/Inheritance
%button-base {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
}

.primary-button {
  @extend %button-base;
  background-color: $primary-color;
  color: white;
}

// Functions and control structures
@function calculate-width($columns) {
  @return $columns * 60px + ($columns - 1) * 20px;
}

.sidebar {
  width: calculate-width(3);
  
  @if $padding > 10px {
    padding: $padding / 2;
  } @else {
    padding: $padding;
  }
}
```

## CSS Architecture

### BEM (Block Element Modifier)

```css
/* Block: A standalone component */
.card {}

/* Element: Parts of a block */
.card__title {}
.card__image {}
.card__content {}

/* Modifier: Different states or variations of a block or element */
.card--featured {}
.card__title--large {}
```

### OOCSS (Object-Oriented CSS)

```css
/* Structure (layout) separated from skin (visual) */
.structural-class { /* Positioning, layout properties */
  display: flex;
  width: 100%;
}

.skin-class { /* Colors, fonts, aesthetic properties */
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Reusable objects */
.media-object {
  display: flex;
  align-items: flex-start;
}

.media-object__image {
  margin-right: 1rem;
}

.media-object__content {
  flex: 1;
}
```

### SMACSS (Scalable and Modular Architecture for CSS)

Divides CSS into five categories:

1. **Base** - Default styles for HTML elements
```css
html, body { margin: 0; padding: 0; }
a { color: blue; }
```

2. **Layout** - Major layout components
```css
.l-header { height: 80px; }
.l-sidebar { width: 25%; }
.l-content { width: 75%; }
```

3. **Module** - Reusable, modular components
```css
.card { border: 1px solid #ddd; }
.card-title { font-size: 1.2rem; }
```

4. **State** - Describes how modules or layouts look in a particular state
```css
.is-active { background-color: #e6e6e6; }
.is-hidden { display: none; }
```

5. **Theme** - (Optional) Visual appearance for modules or layout
```css
.theme-dark .card { background-color: #333; color: white; }
```

## CSS Animation and Transitions

### Transitions

```css
.button {
  background-color: blue;
  color: white;
  /* property duration timing-function delay */
  transition: background-color 0.3s ease-in-out 0s;
}

.button:hover {
  background-color: darkblue;
}

/* Multiple transitions */
.card {
  transition:
    transform 0.3s ease-out,
    box-shadow 0.2s linear;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
```

### Animations

```css
/* Define keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}

/* Apply animations */
.element {
  /* name duration timing-function delay iteration-count direction fill-mode play-state */
  animation: fadeIn 1s ease-out 0.5s 1 normal forwards running;
}

/* Multiple animations */
.element {
  animation:
    fadeIn 1s ease-out,
    slideIn 1.2s ease-in-out;
}

/* Animation properties individually */
.element {
  animation-name: fadeIn;
  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-delay: 0.5s;
  animation-iteration-count: 1; /* or 'infinite' */
  animation-direction: normal; /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards; /* none, forwards, backwards, both */
  animation-play-state: running; /* running, paused */
}
```

### Transform

```css
/* 2D Transforms */
.element {
  transform: translateX(20px) rotate(45deg) scale(1.5);
}

/* 3D Transforms */
.element {
  transform: rotateY(45deg) perspective(1000px) translateZ(50px);
}

/* Transform properties */
.container {
  perspective: 1000px; /* Applied to parent for 3D effects */
  transform-style: preserve-3d; /* flat or preserve-3d */
  transform-origin: center center; /* Changes the origin point of transformation */
  backface-visibility: hidden; /* Controls visibility of backside */
}
```

## CSS Variables (Custom Properties)

```css
/* Defining variables at root (global scope) */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --spacing-unit: 8px;
  --font-stack: 'Roboto', sans-serif;
}

/* Using variables */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 2);
  font-family: var(--font-stack);
}

/* Local scope variables */
.card {
  --card-padding: 16px;
  padding: var(--card-padding);
}

/* Fallback values */
.element {
  color: var(--text-color, black);
}

/* Changing variables with media queries */
:root {
  --container-width: 1200px;
}

@media (max-width: 768px) {
  :root {
    --container-width: 100%;
  }
}

.container {
  width: var(--container-width);
}
```

## Common CSS Interview Questions

### What is the difference between `display: none` and `visibility: hidden`?
- `display: none` - Element is removed from the document flow, no space is allocated
- `visibility: hidden` - Element is invisible but still takes up space in the layout

### What's the difference between absolute and relative positioning?
- `position: relative` - Element is positioned relative to its normal position
- `position: absolute` - Element is positioned relative to its nearest positioned ancestor

### How does CSS specificity work?
Specificity determines which CSS rule applies when multiple rules target the same element. The hierarchy is: inline styles > IDs > classes/attributes/pseudo-classes > elements/pseudo-elements.

### What are CSS preprocessors and why use them?
CSS preprocessors like SASS/SCSS extend CSS with features like variables, nesting, mixins, and functions. They help maintain larger stylesheets and reduce repetition.

### What is the CSS Box Model?
The CSS Box Model describes how elements are rendered, consisting of content, padding, border, and margin.

### How would you make a website responsive?
1. Use a responsive meta tag in HTML
2. Employ fluid layouts with percentages or other responsive units
3. Implement media queries to adjust layouts for different screen sizes
4. Use flexible images that scale appropriately
5. Consider a mobile-first approach

### What is the purpose of CSS Normalize or Reset?
CSS Normalize/Reset helps ensure consistent styling across different browsers by either resetting all browser styles to a baseline (Reset) or making them render elements more consistently (Normalize).

### How do you center an element horizontally and vertically?
```css
/* Method 1: Flexbox */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* If parent needs to be full height */
}

/* Method 2: Grid */
.parent {
  display: grid;
  place-items: center;
  height: 100vh;
}

/* Method 3: Absolute positioning + transform */
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
