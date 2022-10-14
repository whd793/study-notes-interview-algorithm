# Explain how prototypal inheritance works in JavaScript

**Answer:**

Prototypal inheritance is the mechanism by which objects in JavaScript inherit properties and methods from other objects. Unlike classical inheritance found in languages like Java or C++, JavaScript uses a prototype chain to inherit properties and behaviors.

## Core Concepts

### Objects and Prototypes

In JavaScript:

1. Almost everything is an object (excluding primitives like numbers, strings, etc.)
2. Every object has an internal property called `[[Prototype]]` (accessed via `__proto__` or `Object.getPrototypeOf()`)
3. This `[[Prototype]]` points to another object, which is the object's prototype
4. Objects inherit properties and methods from their prototype

## How Property Lookup Works

When you access a property or method on an object, JavaScript follows these steps:

1. Check if the object has the property directly (own property)
2. If not, check the object's prototype
3. If not found, check the prototype's prototype
4. Continue up the prototype chain until reaching `Object.prototype`
5. If still not found, return `undefined`

This sequence forms the prototype chain.

```javascript
// Simple example
let animal = {
  eats: true,
  walk() {
    console.log('Animal walking');
  }
};

let rabbit = {
  jumps: true,
  __proto__: animal  // Set animal as rabbit's prototype
};

rabbit.eats;  // true (inherited from animal)
rabbit.jumps; // true (own property)
rabbit.walk(); // 'Animal walking' (method inherited from animal)
```

## Creating Objects with Prototypal Inheritance

### Using Object.create()

The cleanest way to implement prototypal inheritance is with `Object.create()`:

```javascript
// Parent object
const vehicle = {
  type: 'vehicle',
  getType() {
    return this.type;
  }
};

// Create child object with vehicle as prototype
const car = Object.create(vehicle);
car.type = 'car';
car.numWheels = 4;

car.getType(); // 'car' - note that 'this' refers to car, not vehicle
console.log(car.numWheels); // 4

// Verify the prototype
console.log(Object.getPrototypeOf(car) === vehicle); // true
```

### Constructor Functions and the prototype Property

Before classes were introduced, constructor functions were the common way to create objects:

```javascript
// Constructor function
function Person(name) {
  this.name = name;
}

// Adding methods to the prototype
Person.prototype.sayHello = function() {
  return `Hello, my name is ${this.name}`;
};

// Creating instances
const john = new Person('John');
const jane = new Person('Jane');

console.log(john.sayHello()); // "Hello, my name is John"
console.log(jane.sayHello()); // "Hello, my name is Jane"

// Both instances share the same method
console.log(john.sayHello === jane.sayHello); // true
```

When you use the `new` keyword with a constructor function:

1. A new empty object is created
2. The function is called with `this` set to the new object
3. The object's `[[Prototype]]` is set to the constructor's `prototype` property
4. The object is returned (unless the function returns another object)

### ES6 Classes

Classes in JavaScript are primarily syntactic sugar over the prototypal inheritance model:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a noise.`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    return `${this.name} barks.`;
  }
  
  getBreed() {
    return this.breed;
  }
}

const d = new Dog('Rex', 'German Shepherd');
console.log(d.speak()); // "Rex barks."
console.log(d.getBreed()); // "German Shepherd"
```

Under the hood, classes still use prototypal inheritance:
- Methods defined in the class are added to the prototype
- The `extends` keyword sets up the prototype chain
- `super()` calls the parent constructor

## The Prototype Chain Visualization

For the Dog example above, the prototype chain looks like:

```
d ---> Dog.prototype ---> Animal.prototype ---> Object.prototype ---> null
```

Each step in this chain represents a prototype lookup.

## Checking Prototypes

```javascript
// Check if an object is in another object's prototype chain
console.log(Animal.prototype.isPrototypeOf(d)); // true

// Check direct prototype
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true

// Check if a property exists directly on the object
console.log(d.hasOwnProperty('breed')); // true
console.log(d.hasOwnProperty('speak')); // false - it's on the prototype
```

## Property Shadowing

If an object has a property with the same name as one in its prototype chain, the object's own property "shadows" the prototype property:

```javascript
function Vehicle() {
  this.wheels = 0;
}

Vehicle.prototype.drive = function() {
  return 'Driving...';
};

function Car() {
  Vehicle.call(this); // Call parent constructor
  this.wheels = 4; // Override parent's wheels property
}

// Set up inheritance
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car; // Fix constructor reference

// Shadow the drive method
Car.prototype.drive = function() {
  return 'Driving a car...';
};

const myCar = new Car();
console.log(myCar.wheels); // 4 (from Car)
console.log(myCar.drive()); // "Driving a car..." (from Car.prototype, not Vehicle.prototype)
```

## Benefits of Prototypal Inheritance

1. **Memory efficiency**: Methods are defined once on the prototype, not on each instance
2. **Dynamic**: Properties can be added to prototypes at runtime and affect all objects
3. **Flexibility**: Multiple inheritance patterns can be implemented

## Common Patterns

### Prototype Pattern

```javascript
function Animal() {}

Animal.prototype.breathe = function() {
  return "Breathing...";
};

function Dog() {}

// Set Animal prototype as Dog's prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Restore constructor

// Add methods specific to Dog
Dog.prototype.bark = function() {
  return "Woof!";
};

const myDog = new Dog();
console.log(myDog.breathe()); // "Breathing..."
console.log(myDog.bark()); // "Woof!"
```

### Mixin Pattern

```javascript
// Mixins to simulate multiple inheritance
const swimMixin = {
  swim() {
    return `${this.name} is swimming.`;
  }
};

const flyMixin = {
  fly() {
    return `${this.name} is flying.`;
  }
};

function Duck(name) {
  this.name = name;
}

// Add both behaviors
Object.assign(Duck.prototype, swimMixin, flyMixin);

const donald = new Duck('Donald');
console.log(donald.swim()); // "Donald is swimming."
console.log(donald.fly()); // "Donald is flying."
```

## Modern JavaScript and Inheritance

While ES6 classes make inheritance more familiar for developers coming from class-based languages, the underlying mechanism is still prototypal inheritance.

The key difference between prototypal and classical inheritance is:

- **Classical inheritance**: Relationships between classes are defined at compile time
- **Prototypal inheritance**: Relationships between objects can be defined and changed at runtime

This gives JavaScript a powerful and flexible object model, although it can sometimes be less intuitive for developers used to classical inheritance.