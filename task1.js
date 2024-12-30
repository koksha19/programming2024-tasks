"use strict";

const asyncMap = (array, callback, result) => {
  const newArray = [];
  let callbackCount = 0;
  let errorOccurred = false;

  for (let i = 0; i < array.length; i++) {
    if (errorOccurred) break;
    callback(array[i], (err, newValue) => {
      if (err && !errorOccurred) {
        errorOccurred = true;
        result(err, null);
      }
      newArray.push(newValue);
      callbackCount++;
      if (callbackCount === array.length) {
        result(null, newArray);
      }
    });
  }
};

asyncMap(
  [4, 62, 'sdfdf', 242, 'sfsf'],
  (data, cb) => {
    setTimeout(() => {
      if (typeof data !== "number") {
        cb(new Error('Wrong type'), null);
      } else {
        cb(null, data * 2);
      }
    }, 1000);
  },
  (err, result) => {
    if (err) {
      console.log('Error occurred: ', err);
    } else {
      console.log('Result: ', result);
    }
  },
);