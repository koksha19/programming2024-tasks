"use strict";

const asyncMap = async (array, callback) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
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
  const results = await asyncMap([1, 2, "beb", 3], (value) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof value !== "number") {
          reject(new Error("Wrong type"));
        } else {
          resolve(value * 2);
        }
      }, 1000);
    });
  });
  console.log(results);
})();
