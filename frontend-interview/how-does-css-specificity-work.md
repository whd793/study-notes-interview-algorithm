# How does CSS specificity work?

**Answer:**

CSS specificity is the algorithm that browsers use to determine which CSS declaration should be applied when multiple conflicting rules target the same element. It determines which styles take precedence.

## Specificity Hierarchy

Specificity is calculated as a four-part value (a,b,c,d), where:

1. **`a`**: Inline styles (`style` attribute)
2. **`b`**: Number of ID selectors (#id)
3. **`c`**: Number of class selectors (.class), attribute selectors ([attr]), and pseudo-classes (:hover)
4. **`d`**: Number of element selectors (div, p) and pseudo-elements (::before)

A higher value in an earlier part of the specificity value always wins, regardless of the values in later parts.

## Calculating Specificity

| Selector | Inline | IDs | Classes/Attributes | Elements | Specificity Value |
|----------|--------|-----|-------------------|----------|-------------------|
| `h1` | 0 | 0 | 0 | 1 | 0,0,0,1 |
| `.header` | 0 | 0 | 1 | 0 | 0,0,1,0 |
| `#nav` | 0 | 1 | 0 | 0 | 0,1,0,0 |
| `style="color: red;"` | 1 | 0 | 0 | 0 | 1,0,0,0 |
| `div p.text` | 0 | 0 | 1 | 2 | 0,0,1,2 |
| `#header .nav li:hover` | 0 | 1 | 2 | 1 | 0,1,2,1 |
| `*` (universal selector) | 0 | 0 | 0 | 0 | 0,0,0,0 |

## Examples

Consider the following CSS rules:

```css
/* Specificity: 0,0,0,1 */
div {
  color: blue;
}

/* Specificity: 0,0,1,0 */
.text {
  color: green;
}

/* Specificity: 0,0,1,1 */
div.text {
  color: red;
}

/* Specificity: 0,1,0,0 */
#content {
  color: purple;
}
```

For an element like `<div class="text" id="content">...</div>`:
- The `#content` rule wins because ID selectors have the highest specificity in these examples (0,1,0,0).

## The `!important` Exception

The `!important` declaration overrides normal specificity calculations. When a rule includes `!important`, it takes precedence over all other rules for that property, regardless of their specificity.

```css
/* This overrides even inline styles with !important */
.text {
  color: orange !important; /* Will win regardless of specificity */
}
```

However, if multiple rules with `!important` target the same element, specificity rules apply among those `!important` rules.

## Tie-Breaking: The Cascade

When two selectors have exactly the same specificity, the one that appears later in the CSS takes precedence. This is part of the "cascade" in Cascading Style Sheets.

```css
/* Both have specificity of 0,0,1,0 */
.text {
  color: blue;
}

.text {
  color: red; /* This one wins because it comes later */
}
```

## Inheritance

Inheritance occurs when an element inherits a property from its parent. Inherited properties have the lowest priority - any direct styling of an element will override inherited values, regardless of the specificity of the rule that set the parent's value.

## Specificity in the Real World

### Avoiding Specificity Issues

1. **Use classes for most styling**: They provide enough specificity without being too strong
2. **Minimize ID selectors**: They can lead to specificity conflicts
3. **Avoid `!important`**: It breaks the natural cascading of styles
4. **Avoid inline styles**: They're hard to override without `!important`
5. **Keep selectors simple**: Long, complex selectors can be hard to override

### BEM Naming Convention

BEM (Block, Element, Modifier) uses a naming convention to avoid specificity conflicts by using only classes:

```css
.block {}
.block__element {}
.block--modifier {}
.block__element--modifier {}
```

This way, all selectors have the same specificity (0,0,1,0).

### SCSS/Sass Nesting

Be careful with nesting in preprocessors, as it can unintentionally increase specificity:

```scss
// Results in .card .header h2 {color: red;}
// Specificity: 0,0,2,1
.card {
  .header {
    h2 {
      color: red;
    }
  }
}
```

## Common Specificity Scenarios

### Overriding Framework Styles

When a framework uses a specific selector that's hard to override:

```css
/* Bootstrap might use */
.btn-primary {
  background-color: #007bff;
}

/* To override without !important, increase specificity */
.my-form .btn-primary {
  background-color: #ff6b00;
}
```

### Reset vs. Author Styles

CSS resets often use element selectors (low specificity), making them easy to override with class selectors in your own CSS.

### Media Queries

Media queries don't affect specificity - the same specificity rules apply within them.

```css
.element {
  color: blue; /* Specificity: 0,0,1,0 */
}

@media (max-width: 600px) {
  .element {
    color: red; /* Same specificity, overrides due to order */
  }
}
```

## Debugging Specificity Issues

1. Use browser DevTools to inspect computed styles and see which rules are being applied/overridden
2. Consider using specificity calculators for complex selectors
3. Organize CSS to minimize specificity conflicts (mobile-first, component-based, etc.)
4. When all else fails, use more specific selectors to override problematic rules