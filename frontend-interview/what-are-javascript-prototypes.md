# What are JavaScript Prototypes?

**Answer:**

JavaScript prototypes are a fundamental mechanism that enables inheritance and property sharing between objects. Almost all objects in JavaScript have a prototype from which they inherit properties and methods.

## Prototype Chain

When you access a property on an object, JavaScript first checks if the object has that property directly. If not, it looks at the object's prototype, then that prototype's prototype, and so on up the chain until it finds the property or reaches the end of the chain (usually `Object.prototype`).

```javascript
const animal = {
  eats: true,
  walk() {
    console.log('Animal walking');
  }
};

const rabbit = {
  jumps: true,
  __proto__: animal // Sets animal as rabbit's prototype
};

console.log(rabbit.eats);  // true (inherited from animal)
console.log(rabbit.jumps); // true (own property)
rabbit.walk();             // "Animal walking" (method from animal)
```

## Constructor Functions and Prototypes

Traditionally, constructor functions were used to create objects with shared prototypes:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const alice = new Person('Alice');
const bob = new Person('Bob');

alice.greet(); // "Hello, I'm Alice"
bob.greet();   // "Hello, I'm Bob"

// Both instances share the same method
console.log(alice.greet === bob.greet); // true
```

Key points:
- `Person.prototype` becomes the prototype for all instances created with `new Person()`
- Properties on `Person.prototype` are shared among all instances
- Instance-specific properties are defined in the constructor

## Modern Prototype Access

Modern JavaScript provides cleaner ways to work with prototypes:

```javascript
// Creating objects with specific prototype
const dog = Object.create(animal);
dog.bark = function() {
  console.log('Woof!');
};

// Getting an object's prototype
const proto = Object.getPrototypeOf(dog);
console.log(proto === animal); // true

// Setting an object's prototype
Object.setPrototypeOf(dog, {}); // Changes dog's prototype (not recommended for performance reasons)
```

## Classes and Prototypes

ES6 classes are syntactic sugar over prototype-based inheritance:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

const rex = new Dog('Rex');
rex.speak(); // "Rex barks"
```

Behind the scenes:
- `Dog.prototype` inherits from `Animal.prototype`
- Methods are added to the respective prototypes
- `extends` sets up the prototype chain

## Practical Uses of Prototypes

### Method Sharing and Memory Efficiency

Prototypes allow all instances to share methods without duplicating them in memory:

```javascript
// All arrays share methods through Array.prototype
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

console.log(arr1.map === arr2.map); // true - same method reference
```

### Extending Built-in Objects

You can extend built-in prototypes (though this is generally discouraged):

```javascript
// Adding a method to all strings
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

console.log("hello".capitalize()); // "Hello"
```

### Inheritance Hierarchies

Prototypes enable multi-level inheritance chains:

```javascript
const vehicle = {
  drive() { console.log('Driving...'); }
};

const car = Object.create(vehicle);
car.honk = function() { console.log('Honk!'); };

const sedan = Object.create(car);
sedan.park = function() { console.log('Parking...'); };

sedan.drive(); // "Driving..." (from vehicle)
sedan.honk();  // "Honk!" (from car)
sedan.park();  // "Parking..." (own method)
```

Understanding prototypes is essential for advanced JavaScript development and for comprehending how JavaScript's object-oriented features actually work.