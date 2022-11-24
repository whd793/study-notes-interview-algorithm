# Describe CSS Grid

**Answer:**

CSS Grid is a two-dimensional layout system designed for creating complex grid-based layouts in CSS. Unlike Flexbox (which is primarily one-dimensional), Grid allows precise control over both rows and columns simultaneously.

## Basic Usage

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  grid-template-rows: auto 200px auto;
  gap: 20px;
}
```

## Key Concepts

### Grid Container Properties

- **grid-template-columns/rows**: Define track sizes
  ```css
  /* Fixed units */
  grid-template-columns: 100px 200px 100px;
  
  /* Flexible units with fr */
  grid-template-columns: 1fr 2fr 1fr;
  
  /* Repeat notation */
  grid-template-columns: repeat(3, 1fr);
  
  /* Named lines */
  grid-template-columns: [start] 1fr [middle] 2fr [end];
  ```

- **gap**: Define spacing between tracks
  ```css
  gap: 20px; /* row-gap and column-gap */
  row-gap: 10px;
  column-gap: 15px;
  ```

- **grid-template-areas**: Define named template areas
  ```css
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  ```

### Grid Item Properties

- **grid-column/row**: Define an item's placement and span
  ```css
  grid-column: 1 / 3; /* start at line 1, end at line 3 */
  grid-column: 1 / span 2; /* start at line 1, span 2 tracks */
  grid-row: 2 / 4;
  ```

- **grid-area**: Place item using named template areas
  ```css
  .header { grid-area: header; }
  .sidebar { grid-area: sidebar; }
  ```

## FR Units and minmax()

The `fr` unit represents a fraction of available space:

```css
/* Three equal columns */
grid-template-columns: 1fr 1fr 1fr;

/* First column gets twice the space of others */
grid-template-columns: 2fr 1fr 1fr;
```

The `minmax()` function sets minimum and maximum sizes:

```css
/* Columns at least 100px wide but can grow */
grid-template-columns: repeat(3, minmax(100px, 1fr));
```

## Auto-placement

Items can flow automatically using the `grid-auto-flow` property:

```css
/* Items flow by row (default) */
grid-auto-flow: row;

/* Items flow by column */
grid-auto-flow: column;

/* Dense packing algorithm */
grid-auto-flow: row dense;
```

## Responsive Layouts

CSS Grid excels at responsive layouts, especially with modern features:

```css
/* Auto-fit: creates as many columns as possible */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* Auto-fill: similar to auto-fit but can leave empty tracks */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

CSS Grid gives developers unprecedented control over layout, allowing complex designs that would be difficult to achieve with older CSS approaches.