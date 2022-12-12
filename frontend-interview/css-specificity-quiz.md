# CSS Specificity Quiz

**Answer:**

CSS specificity determines which styles get applied when multiple rules target the same element. Let's test your understanding with this quiz.

## Question 1

Which selector has higher specificity?

```css
/* Selector A */
#header .nav li a

/* Selector B */
.header nav ul li a.active
```

A) Selector A

B) Selector B

C) Both have the same specificity

D) Cannot be determined

**Answer: A) Selector A**

Explanation: Calculating specificity as (ID, CLASS, TYPE):
- Selector A: (1, 1, 3) - 1 ID (#header), 1 class (.nav), 3 elements (li, a)
- Selector B: (0, 2, 4) - 0 IDs, 2 classes (.header, .active), 4 elements (nav, ul, li, a)

IDs have higher weight than any number of classes, so Selector A wins.

## Question 2

Which style will be applied to the paragraph?

```html
<p class="text" id="intro" style="color: black;">Hello World</p>
```

```css
#intro { color: blue; }
.text { color: green; }
p { color: red; }
```

A) color: red

B) color: green

C) color: blue

D) color: black

**Answer: D) color: black**

Explanation: Inline styles (style attribute) have higher specificity than any CSS selector. The order of specificity from highest to lowest is:
1. Inline styles
2. ID selectors
3. Class selectors
4. Type selectors

## Question 3

What color will the text be?

```html
<div class="container">
  <p class="text highlight">Colored text</p>
</div>
```

```css
div p.text { color: blue; }
.container .text { color: green; }
.highlight { color: red; }
p.text.highlight { color: purple; }
```

A) blue

B) green

C) red

D) purple

**Answer: D) purple**

Explanation: 
- `div p.text`: (0, 1, 2) - 0 IDs, 1 class, 2 elements
- `.container .text`: (0, 2, 0) - 0 IDs, 2 classes, 0 elements
- `.highlight`: (0, 1, 0) - 0 IDs, 1 class, 0 elements
- `p.text.highlight`: (0, 2, 1) - 0 IDs, 2 classes, 1 element

`p.text.highlight` has the highest specificity with 2 classes and 1 element.

## Question 4

What color will the button text be?

```html
<button class="btn" id="submit">Submit</button>
```

```css
button { color: blue; }
.btn { color: green; }
button.btn { color: red; }
#submit { color: purple; }
```

A) blue

B) green

C) red

D) purple

**Answer: D) purple**

Explanation: The ID selector `#submit` has the highest specificity, regardless of how many classes or elements are in the other selectors.

## Question 5

What color will the text be with `!important`?

```html
<p class="warning" id="notice">Important message</p>
```

```css
#notice { color: red; }
.warning { color: yellow !important; }
p { color: green; }
```

A) red

B) yellow

C) green

D) black (default)

**Answer: B) yellow**

Explanation: The `!important` declaration overrides normal specificity rules. Even though ID selectors normally have higher specificity than class selectors, `!important` takes precedence.

## Question 6

What color will the text be?

```html
<div id="app" class="container">
  <p class="text" style="color: black;">Hello</p>
</div>
```

```css
#app p.text { color: blue !important; }
p { color: red; }
```

A) blue

B) red

C) black

D) browser default

**Answer: A) blue**

Explanation: While inline styles normally override external styles, the `!important` flag in the external CSS overrides even inline styles.

## Question 7

Which selector has higher specificity?

```css
/* Selector A */
:not(p) a

/* Selector B */
div a
```

A) Selector A

B) Selector B

C) Both have the same specificity

D) Cannot be determined

**Answer: A) Selector A**

Explanation: The `:not()` pseudo-class doesn't add to specificity, but its argument does. Calculating:
- Selector A: (0, 0, 1+1) - 0 IDs, 0 classes, 1 element from `:not(p)` plus 1 from `a`
- Selector B: (0, 0, 2) - 0 IDs, 0 classes, 2 elements

Both have 2 type selectors in total, but the pseudo-class notation gives Selector A higher specificity.

## Question 8

What color will the text be?

```html
<div class="box">
  <p class="text" data-theme="dark">Colored text</p>
</div>
```

```css
p { color: red; }
.text { color: blue; }
[data-theme="dark"] { color: green; }
.box p { color: purple; }
```

A) red

B) blue

C) green

D) purple

**Answer: D) purple**

Explanation:
- `p`: (0, 0, 1) - 0 IDs, 0 classes, 1 element
- `.text`: (0, 1, 0) - 0 IDs, 1 class, 0 elements
- `[data-theme="dark"]`: (0, 1, 0) - 0 IDs, 1 attribute selector (counts same as class), 0 elements
- `.box p`: (0, 1, 1) - 0 IDs, 1 class, 1 element

`.box p` has the highest specificity with 1 class and 1 element selector.