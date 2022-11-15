# Explain CSS Specificity

**Answer:**

CSS specificity is the algorithm that browsers use to determine which CSS rule applies when multiple rules target the same element. It's essentially a measure of how specific a selector is.

## Specificity Hierarchy (from lowest to highest)

1. **Type selectors** (`h1`, `div`) and pseudo-elements (`:before`, `:after`)
2. **Class selectors** (`.example`), attribute selectors (`[type="text"]`), and pseudo-classes (`:hover`)
3. **ID selectors** (`#example`)
4. **Inline styles** (`style="color: red"`)
5. **!important** (overrides all of the above)

## Calculating Specificity

Specificity is calculated as a four-part value: (a,b,c,d) where:

- **a**: 1 if inline style, 0 otherwise
- **b**: Number of ID selectors
- **c**: Number of class selectors, attribute selectors, and pseudo-classes
- **d**: Number of type selectors and pseudo-elements

### Examples:

```css
/* Specificity: 0,0,0,1 */
div { color: black; }

/* Specificity: 0,0,1,0 */
.text { color: blue; }

/* Specificity: 0,0,1,1 */
div.text { color: green; }

/* Specificity: 0,1,0,0 */
#header { color: red; }

/* Specificity: 0,1,0,1 */
#header div { color: purple; }

/* Specificity: 0,1,1,0 */
#header.active { color: orange; }
```

## Common Specificity Problems

### Unexpected Overriding

```css
/* This rule might not apply if there's a higher specificity selector targeting the same property */
nav a { color: blue; }

/* This selector has higher specificity and will override the previous one */
body nav.main-nav a { color: red; }
```

### The !important Exception

```css
/* Will override even highly specific selectors */
.button { color: green !important; }
```

Using `!important` is generally discouraged as it breaks the natural cascading of styles and can lead to maintenance issues.

## Best Practices

1. **Use appropriate specificity for the task**
   - Use type selectors for broad styles
   - Use class selectors for reusable components
   - Use ID selectors sparingly for truly unique elements

2. **Avoid unnecessary nesting**
   ```css
   /* Avoid */
   body header nav ul li a { color: red; }
   
   /* Better */
   .nav-link { color: red; }
   ```

3. **Organize CSS with methodologies** like BEM, SMACSS, or OOCSS to reduce specificity conflicts

4. **Treat !important as a last resort**, especially in large codebases

Understanding specificity is crucial for debugging CSS issues and writing maintainable stylesheets that behave predictably.