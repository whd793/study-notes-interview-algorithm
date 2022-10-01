# What's the difference between `em`, `rem`, and `px` units?

**Answer:**

In CSS, these three units represent different ways to specify sizes, each with distinct behaviors and use cases:

## `px` (Pixels)

- **Absolute unit**: Represents exactly one pixel on the screen
- **Fixed size**: Maintains the same size regardless of parent elements or user settings
- **Predictable**: What you set is exactly what you get
- **Non-scalable**: Doesn't change when the user changes browser font settings

```css
.element {
  font-size: 16px;
  margin: 24px;
  border-radius: 4px;
}
```

## `em` (Relative to parent element)

- **Relative unit**: Based on the font-size of its direct parent element
- **Compounding effect**: Values can compound in nested elements
- **Contextual**: Size changes based on parent context
- **Adaptable**: Scales with parent element's font size

```css
body {
  font-size: 16px; /* Base font size */
}

.parent {
  font-size: 1.5em; /* 1.5 × 16px = 24px */
}

.child {
  font-size: 1.5em; /* 1.5 × 24px = 36px */
  padding: 1em;    /* 1 × 36px = 36px */
  margin: 0.5em;   /* 0.5 × 36px = 18px */
}
```

## `rem` (Root em - Relative to root element)

- **Relative unit**: Based on the font-size of the root element (html)
- **Consistent**: Values don't compound in nested elements
- **Predictable yet scalable**: Changes only when the root font size changes
- **Accessible**: Scales with user's browser font settings if root uses relative units

```css
html {
  font-size: 16px; /* Root font size */
}

.parent {
  font-size: 1.5rem; /* 1.5 × 16px = 24px */
}

.child {
  font-size: 1.5rem; /* 1.5 × 16px = 24px (based on root, not parent) */
  padding: 1rem;    /* 1 × 16px = 16px */
  margin: 0.5rem;   /* 0.5 × 16px = 8px */
}
```

## Key Differences

| Feature | `px` | `em` | `rem` |
|---------|------|------|-------|
| Reference | None (absolute) | Parent element | Root element |
| Scalability | Fixed | Scales with parent | Scales with root |
| Compounding | No | Yes | No |
| Browser zoom | Scales with zoom | Scales with zoom | Scales with zoom |
| User font size | Doesn't scale | Inherits scaling | Scales directly |

## Best Practices

### When to use `px`:
- For pixel-perfect designs where exact sizes are required
- Border widths (`border: 1px solid black`)
- Shadow effects (`box-shadow: 0 2px 4px rgba(0,0,0,0.5)`)
- Fine details that shouldn't scale

### When to use `em`:
- For elements that should scale with their parent
- Padding and margins within a component
- When creating components that need to adapt to their context
- Font sizes in modular components

### When to use `rem`:
- For most font sizes across the site
- For consistent spacing (margins, paddings) throughout the application
- For responsive designs that need to scale with user preferences
- Layout dimensions that should maintain proportion

## Common Pattern for Responsive Typography

```css
html {
  font-size: 16px; /* Base size */
}

@media (max-width: 768px) {
  html {
    font-size: 14px; /* Smaller base size on smaller screens */
  }
}

body {
  /* All rem values will now adjust based on screen size */
  font-size: 1rem;
  line-height: 1.5;
}

h1 {
  font-size: 2.5rem; /* 40px on large screens, 35px on small screens */
}

.card {
  padding: 1.5rem;
  margin-bottom: 2rem;
}
```

This approach gives you the best of both worlds: scalable, accessible typography and spacing that adjusts automatically for different screen sizes.