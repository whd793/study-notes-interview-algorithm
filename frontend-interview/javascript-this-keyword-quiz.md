# JavaScript 'this' Keyword Quiz

**Answer:**

Test your understanding of the JavaScript `this` keyword with this quiz. The `this` value is determined by how a function is called, which can make it one of the more confusing aspects of JavaScript.

## Question 1

What will this code output?

```javascript
const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, my name is ' + this.name);
  }
};

person.greet();
```

A) Hello, my name is John

B) Hello, my name is undefined

C) TypeError: Cannot read property 'name' of undefined

D) Hello, my name is null

**Answer: A) Hello, my name is John**

Explanation: When a method is called directly on an object (using dot notation), `this` refers to the object that owns the method. So `this.name` refers to `person.name`.

## Question 2

What will be logged?

```javascript
const person = {
  name: 'John',
  greet: function() {
    console.log('Hello, my name is ' + this.name);
  }
};

const greetFunction = person.greet;
greetFunction();
```

A) Hello, my name is John

B) Hello, my name is undefined

C) TypeError: Cannot read property 'name' of undefined

D) Hello, my name is [object Window]

**Answer: B) Hello, my name is undefined**

Explanation: When a method is assigned to a variable and then called, it loses its connection to the original object. In non-strict mode, `this` will default to the global object (window in browsers), which doesn't have a `name` property (or has an empty one).

## Question 3

What will this code print?

```javascript
function Person(name) {
  this.name = name;
  this.greet = function() {
    console.log('Hello, my name is ' + this.name);
  };
}

const john = new Person('John');
john.greet();
```

A) Hello, my name is John

B) Hello, my name is undefined

C) TypeError: Cannot read property 'name' of undefined

D) ReferenceError: name is not defined

**Answer: A) Hello, my name is John**

Explanation: When a function is used as a constructor with the `new` keyword, `this` inside the constructor refers to the newly created object. `this.name` is set to 'John', so `john.greet()` outputs "Hello, my name is John".

## Question 4

What will this output?

```javascript
const person = {
  name: 'John',
  greet: function() {
    function innerFunc() {
      console.log('Hello, my name is ' + this.name);
    }
    innerFunc();
  }
};

person.greet();
```

A) Hello, my name is John

B) Hello, my name is undefined

C) TypeError: Cannot read property 'name' of undefined

D) ReferenceError: name is not defined

**Answer: B) Hello, my name is undefined**

Explanation: In a regular function (not an arrow function), `this` is determined by how the function is called, not where it's defined. The inner function `innerFunc()` is called directly, not as a method on an object, so `this` defaults to the global object in non-strict mode.

## Question 5

What will be logged?

```javascript
const person = {
  name: 'John',
  greet: function() {
    const innerFunc = () => {
      console.log('Hello, my name is ' + this.name);
    };
    innerFunc();
  }
};

person.greet();
```

A) Hello, my name is John

B) Hello, my name is undefined

C) TypeError: Cannot read property 'name' of undefined

D) ReferenceError: name is not defined

**Answer: A) Hello, my name is John**

Explanation: Arrow functions don't have their own `this` binding. Instead, they inherit `this` from the enclosing lexical context. In this case, the arrow function inherits `this` from the `greet` method, where `this` refers to the `person` object.

## Question 6

What does this code output?

```javascript
const button = {
  content: 'Submit',
  click: function() {
    console.log(this.content + ' clicked');
  }
};

const boundClick = button.click.bind({ content: 'Button' });
boundClick();
```

A) Submit clicked

B) Button clicked

C) undefined clicked

D) TypeError

**Answer: B) Button clicked**

Explanation: The `bind()` method creates a new function where `this` is permanently set to the provided value. In this case, `this` is bound to the object `{ content: 'Button' }`, so `this.content` is 'Button'.

## Question 7

What will be logged?

```javascript
function greet() {
  console.log('Hello, my name is ' + this.name);
}

greet.call({ name: 'John' });
greet.apply({ name: 'Jane' });
```

A) Hello, my name is John\nHello, my name is Jane

B) Hello, my name is undefined\nHello, my name is undefined

C) TypeError for both calls

D) Hello, my name is [object Object]\nHello, my name is [object Object]

**Answer: A) Hello, my name is John\nHello, my name is Jane**

Explanation: Both `call()` and `apply()` allow you to explicitly set what `this` should refer to when the function is called. The difference is in how additional arguments are passed (individual arguments for `call()`, array for `apply()`).

## Question 8

What will be output?

```javascript
'use strict';

function checkThis() {
  console.log(this);
}

checkThis();
```

A) window object

B) global object

C) undefined

D) null

**Answer: C) undefined**

Explanation: In strict mode, when a function is called without any context (not as a method, with `new`, or using `call`/`apply`/`bind`), `this` is `undefined` instead of the global object.