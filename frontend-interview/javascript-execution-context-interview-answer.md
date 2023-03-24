# JavaScript Execution Context Interview Answer

The execution context in JavaScript is the environment in which code is evaluated and executed. Each time a function is called, a new execution context is created, forming a stack of contexts called the call stack. Each context includes the variable environment (variables, functions, and arguments), scope chain (access to variables in parent environments), and the value of 'this'.

The global execution context is created first when a script runs, followed by function execution contexts as functions are called. JavaScript's lexical scoping means a function can access variables from its own scope and any parent scopes, but not child scopes. This creates the scope chain that JavaScript uses to resolve variable references.

Hoisting is directly related to execution contexts—during the creation phase, variable and function declarations are allocated memory before code execution, which is why we can call functions before their declaration in code. Understanding execution contexts helps me debug scope-related issues, avoid variable naming conflicts, and better structure my applications with proper encapsulation patterns.