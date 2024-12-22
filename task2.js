"use strict";

const asyncMap = (array, func) => {
  let promiseChain = Promise.resolve([]);

  array.forEach((item, index) => {
    promiseChain = promiseChain.then((results) =>
      func(item).then((result) => {
        results[index] = result;
        if (item === 242) throw new Error("Bebra");
        return results;
      }),
    );
  });

  return promiseChain;
};

asyncMap([4, 62, 242], (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data * 2);
    }, 1000);
  });
})
  .then((result) => console.log("Case 1:", result))
  .catch((err) => console.error("Case 1 Error:", err));
