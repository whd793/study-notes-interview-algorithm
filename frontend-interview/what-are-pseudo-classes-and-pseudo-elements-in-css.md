# What are pseudo-classes and pseudo-elements in CSS?

**Answer:**

Pseudo-classes and pseudo-elements are CSS selectors that target elements in specific states or create virtual elements for styling purposes.

## Pseudo-classes

Pseudo-classes select elements that exist in a particular state or position. They use a single colon (`:`) syntax.

### Key characteristics:

- Select existing elements in a special state
- Use single colon (`:`) syntax
- Can be combined with other selectors
- Can be used in selector chains

### Common pseudo-classes:

#### User interaction states
```css
:hover       /* When mouse is over the element */
:active      /* When element is being activated (e.g., clicked) */
:focus       /* When element has keyboard focus */
:focus-within /* When element or its descendants have focus */
:visited     /* For links that have been visited */
```

#### Form states
```css
:checked     /* For checked inputs (checkbox, radio) */
:disabled    /* For disabled form elements */
:enabled     /* For enabled form elements */
:required    /* For required form elements */
:valid       /* For form elements with valid data */
:invalid     /* For form elements with invalid data */
:in-range    /* For inputs with value within range */
:out-of-range /* For inputs with value outside range */
:placeholder-shown /* For inputs showing placeholder text */
```

#### Structural pseudo-classes
```css
:first-child  /* First child of its parent */
:last-child   /* Last child of its parent */
:nth-child(n) /* Matches element that is the nth child */
:nth-last-child(n) /* Counts from the last child */
:only-child   /* Only child of its parent */
:first-of-type /* First element of its type */
:last-of-type  /* Last element of its type */
:nth-of-type(n) /* Matches nth element of its type */
:only-of-type  /* Only element of its type */
:empty         /* Element with no children */
:not(selector) /* Elements not matching the selector */
```

### Examples of pseudo-classes

```css
/* Change link color on hover */
a:hover {
  color: tomato;
}

/* Style every odd row in a table */
tr:nth-child(odd) {
  background-color: #f2f2f2;
}

/* Style invalid input fields */
input:invalid {
  border: 2px solid red;
}

/* Target the third list item */
li:nth-child(3) {
  font-weight: bold;
}

/* Complex example: active submit button that's not disabled */
button[type="submit"]:not(:disabled):active {
  transform: scale(0.98);
}
```

## Pseudo-elements

Pseudo-elements create virtual elements that don't actually exist in the HTML. They use a double colon (`::`) syntax (although single colon works for backward compatibility).

### Key characteristics:

- Create virtual elements not present in the HTML
- Use double colon (`::`) syntax (CSS3)
- Can only have one per selector
- Can style specific parts of an element

### Common pseudo-elements:

```css
::before      /* Creates a virtual element before the content */
::after       /* Creates a virtual element after the content */
::first-line  /* Targets the first line of text */
::first-letter /* Targets the first letter of text */
::selection   /* Targets text that has been selected */
::placeholder /* Targets placeholder text in inputs */
::marker      /* Targets list item markers (bullets, numbers) */
::backdrop    /* Targets the backdrop of dialog elements */
```

### Examples of pseudo-elements

```css
/* Add a quote mark before blockquotes */
blockquote::before {
  content: '"';
  font-size: 2em;
  color: #888;
}

/* Add clearfix after floated elements */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

/* Style the first line of a paragraph */
p::first-line {
  font-variant: small-caps;
  font-weight: bold;
}

/* Style the first letter (drop cap) */
p::first-letter {
  font-size: 2.5em;
  float: left;
  line-height: 0.8;
  margin-right: 0.1em;
}

/* Style the text selection */
::selection {
  background-color: #ffb7b7;
  color: #333;
}

/* Style input placeholder text */
input::placeholder {
  color: #aaa;
  font-style: italic;
}
```

## Key Differences Between Pseudo-classes and Pseudo-elements

| Pseudo-classes | Pseudo-elements |
|----------------|------------------|
| Select existing elements | Create virtual elements |
| Target elements in specific states | Target specific parts of elements |
| Single colon (`:`) | Double colon (`::`) syntax |
| Can be chained (e.g., `:hover:not(:first-child)`) | Only one per selector |
| Don't require the `content` property | Often use the `content` property |

## Practical Use Cases

### Navigation Menu Hover Effects
```css
.nav-link {
  position: relative;
  text-decoration: none;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}
```

### Required Form Field Indicator
```css
label.required::after {
  content: " *";
  color: red;
}

input:required:invalid {
  border-color: red;
}

input:required:valid {
  border-color: green;
}
```

### Custom List Styling
```css
ul.custom-list {
  list-style: none;
  padding-left: 1.5em;
}

ul.custom-list li {
  position: relative;
}

ul.custom-list li::before {
  content: "→";
  position: absolute;
  left: -1.5em;
  color: blue;
}
```

### Tooltip Implementation
```css
.tooltip {
  position: relative;
  cursor: help;
}

.tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s;
}

.tooltip:hover::after {
  opacity: 1;
  visibility: visible;
}
```

## Browser Support

Most pseudo-classes and pseudo-elements are well-supported in modern browsers. Some newer ones may have limited support, so it's always good to check compatibility before using them in production.