"use strict";

const asyncMap = async (array, callback, signal) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (signal.aborted) {
      console.log("Results: ", newArray);
      return Promise.reject(new Error("Operation aborted"));
    }

    try {
      const newElement = await callback(array[i]);
      newArray.push(newElement);
    } catch (err) {
      console.error(err);
    }
  }
  return newArray;
};

(async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  setTimeout(() => {
    console.log("Aborting mapping");
    controller.abort();
  }, 7000);

  try {
    const results = await asyncMap(
      [3, 9, 6, 15, "bobr", 24, 45, 3, 34, 11, 23],
      (value) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (typeof value !== "number") {
              reject(new Error("Wrong type"));
            } else {
              resolve(value * 2);
            }
          }, 1000);
        });
      },
      signal,
    );
    console.log("Results:", results);
  } catch (err) {
    console.error(err);
  }
})();
