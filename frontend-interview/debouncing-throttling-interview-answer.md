# Debouncing and Throttling Interview Answer

Debouncing and throttling are techniques to control how many times a function executes, which is especially important for performance-intensive event handlers like scroll, resize, or input events.

Debouncing delays executing a function until after a certain timeout has passed since the last time it was invoked. I use it for search inputs to prevent API calls while the user is still typing, or for window resize handlers to recalculate layouts only after resizing is complete. The implementation involves clearing the previous timeout and setting a new one each time the function is called.

Throttling, in contrast, ensures a function executes at most once in a specified time period. I apply throttling to scroll events, mousemove handlers, or any scenario where I need regular updates during continuous events but can't afford to run the function for every single event. This prevents performance issues while still providing responsive feedback to the user.