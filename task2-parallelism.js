"use strict";

const asyncMap = async (array, func) => {
  const promises = [];

  for (let i = 0; i < array.length; i++) {
    promises.push(
      func(array[i])
        .then((result) => ({ stat: "fulfilled", index: i, result }))
        .catch((reason) => ({ stat: "rejected", index: i, reason })),
    );
  }

  const results = await Promise.allSettled(promises);

  const errors = results
    .filter((result) => result.value.stat === "rejected")
    .map((result) => result.value.reason);

  if (errors.length !== 0) {
    throw new AggregateError(errors, "One or more operations failed");
  }

  const finalResults = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].status === "fulfilled") {
      finalResults.push(results[i].value.result);
    }
  }

  return finalResults;
};

(async () => {
  try {
    const result = await asyncMap([4, 32, 242], async (data) => {
      if (typeof data !== "number") throw new Error("Wrong type");
      if (data === 62) throw new Error("error");
      return new Promise((resolve) =>
        setTimeout(() => {
          resolve(data * 2);
        }, 1000),
      );
    });
    console.log("Result:", result);
  } catch (err) {
    console.error("Error:", err);
  }
})();