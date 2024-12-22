"use strict";

const asyncMap = (array, callback, result) => {
  const newArray = [];
  let callbackCount = 0;

  for (let i = 0; i < array.length; i++) {
    callback(array[i], (err, newValue) => {
      if (err) {
        result(err);
      }
      newArray.push(newValue);
      callbackCount++;
      if (callbackCount === array.length) {
        result(err, newArray);
      }
    });
  }
};

asyncMap(
  [4, 62, 242],
  (data, cb) => {
    setTimeout(() => {
      cb(null, data * 2);
    }, 1000);
  },
  (err, result) => {
    console.log(err, result);
  },
);
