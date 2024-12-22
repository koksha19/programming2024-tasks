# Labs for Programming 2024

## Description
This repository contains tasks which I completed as my university works.
These tasks are focused on asynchronous programming using different approaches
such as callbacks, promises, async-await, async iterators and generators, event 
emitters.

## Links to code examples

### [Task 1](./task1.js)

 - Code for this task contains callback based `asyncMap` method. It works similarly
to `Array.prototype.map` but has asynchronous contract.

### [Task 2](./task2.js)

- Code for this task contains the same `asyncMap` method, but this time it is
based on Promises.  
#### [Task 2 async-await](./task2-async-await.js)

- `async-await` alternative for this method.
#### [Task 2 parallelism](./task2-parallelism.js)

- Integrated parallelism using `Promise.allSettled()`.

### [Task 3](./task3.js)

- Integrated `AbortController` to cancel function execution. 

### [Task 4](./task4.js)

- Used async iterator and async generator to simulate large data sets that don't fit in memory
and implemented `asyncMap` for this flow.

### [Task 5](./task5.js)

- Integrated `EventEmitter` to create reactive communication system.