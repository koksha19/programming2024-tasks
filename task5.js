"use strict";

const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  async *randomNumberGenerator() {
    while (true) {
      try {
        const randomNum = Math.random();
        if (randomNum > 0.9)
          return Promise.reject(
            new Error(`Random number ${randomNum} is too big`),
          );
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.emit("data", randomNum);
        yield randomNum;
      } catch (error) {
        console.error(`Error in generator: ${error.message}`);
      }
    }
  }

  async *asyncMap(iterator, func) {
    for await (const num of iterator) {
      try {
        const mappedNum = func(num);
        this.emit("mapped", mappedNum);
        yield mappedNum;
      } catch (error) {
        console.error(`Error in asyncMap: ${error.message}`);
      }
    }
  }
}

(async () => {
  const ee = new MyEmitter();

  ee.on("data", (num) => {
    console.log(`Generated number: ${num}`);
  });

  const generator = ee.randomNumberGenerator();
  const mappedGenerator = ee.asyncMap(generator, (num) => {
    return num * 2;
  });

  try {
    for await (const mappedNum of mappedGenerator) {
    }
  } catch (error) {
    console.error(`Error in main loop: ${error.message}`);
  }
})();
