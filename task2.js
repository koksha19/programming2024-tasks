"use strict";

const asyncMap = (array, func) => {
  let promiseChain = Promise.resolve([]);

  array.forEach((item, index) => {
    promiseChain = promiseChain.then((results) =>
      func(item).then((result) => {
        console.log(item, index);
        results[index] = result;
        return results;
      }),
    );
  });

  return promiseChain;
};

asyncMap([4, 62, 242, "sdfljad"], (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof data === "string") {
        reject(new Error("Wrong type"));
      } else {
        resolve(data * 2);
      }
    }, 1000);
  });
}).then(
  (result) => console.log("Case 1:", result),
  (err) => console.error("Case 1 Error:", err),
);
//.catch();
