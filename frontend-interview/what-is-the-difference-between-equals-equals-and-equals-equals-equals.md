# What is the difference between `==` and `===` operators?

**Answer:**

The `==` (loose equality) and `===` (strict equality) operators in JavaScript are used to compare values, but they differ in how they handle type conversion:

## `==` (Loose/Abstract Equality)

- Compares values **after** type conversion (coercion)
- Attempts to convert operands to the same type before comparison
- More permissive, focuses on value equivalence

## `===` (Strict Equality)

- Compares both value **and** type without conversion
- Returns `true` only if both operands are of the same type and have the same value
- More restrictive, focuses on exact equality

## Type Conversion Rules with `==`

When using `==`, JavaScript follows these type conversion rules:

1. If the operands have the same type, they're compared directly (like `===`)
2. If one is `null` and the other is `undefined`, they're equal
3. If comparing a number with a string, the string is converted to a number
4. If one is a boolean, it's converted to a number (`true` → `1`, `false` → `0`)
5. If comparing an object with a primitive, the object is converted to a primitive

## Examples

### Numbers and Strings
```javascript
5 == '5'    // true  (string '5' is converted to number 5)
5 === '5'   // false (different types: number vs string)

0 == ''     // true  (empty string converts to 0)
0 === ''    // false (different types)

'' == '0'   // false ('' converts to 0, '0' converts to 0, but the strings are different)
0 == '0'    // true  (string '0' converts to number 0)
```

### With null and undefined
```javascript
null == undefined   // true  (special case in the equality algorithm)
null === undefined  // false (different types)

null == 0           // false (null only equals undefined or null)
undefined == 0      // false (undefined only equals null or undefined)

null == false       // false (null doesn't convert to 0 for comparison)
undefined == false  // false (undefined doesn't convert to 0 for comparison)
```

### Booleans
```javascript
1 == true    // true  (true converts to 1)
1 === true   // false (different types)

0 == false   // true  (false converts to 0)
0 === false  // false (different types)

'' == false  // true  (both convert to 0)
'' === false // false (different types)
```

### Objects
```javascript
{} == {}      // false (comparing references, not values)
{} === {}     // false (comparing references, not values)

let a = {};
let b = a;
a == b        // true  (same reference)
a === b       // true  (same reference)

[] == ''      // true  (empty array converts to empty string)
[] === ''     // false (different types)
```

### Other Notable Cases
```javascript
// These can be confusing
NaN == NaN    // false (NaN doesn't equal anything, including itself)
NaN === NaN   // false (NaN doesn't equal anything, including itself)

// Array comparisons
[1, 2] == [1, 2]    // false (different references)
[1, 2] === [1, 2]   // false (different references)

// Nested type conversions
'' == '0'           // false
0 == ''             // true
0 == '0'            // true

// Therefore, by transitivity one might expect:
'' == '0'           // true (should follow from above)
// But it's actually false! This demonstrates why == can be confusing
```

## Recommendations

### When to use `===` (Recommended for most cases)

- By default, prefer `===` for more predictable behavior
- When you need exact type checking
- In conditional statements to avoid unexpected truthy/falsy results
- When writing code that others will maintain
- In strict mode and modern JavaScript projects

```javascript
// Good practice
if (userRole === 'admin') {
  // Only runs for the string 'admin'
}

if (count === 0) {
  // Only runs when count is exactly 0, not false, '', or null
}
```

### When to use `==` (Use with caution)

- When you specifically want type coercion
- When checking for null/undefined with a single check: `if (value == null)`
- In rare cases where you're explicitly exploiting type conversion
- Legacy code that relies on coercion behavior

```javascript
// One advantage: checking both null and undefined
if (value == null) {
  // Runs if value is null or undefined
  // Equivalent to: if (value === null || value === undefined)
}
```

## Best Practices

1. Use `===` by default
2. Be consistent within a codebase
3. Consider using ESLint with the `eqeqeq` rule to enforce strict equality
4. If you must use `==`, add a comment explaining why
5. Be especially careful with `==` around falsy values (`0`, `''`, `false`, `null`, `undefined`)

Many JavaScript style guides, including the widely-used Airbnb JavaScript Style Guide, recommend using `===` over `==` to avoid unexpected type coercion bugs.