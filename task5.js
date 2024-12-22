async function* randomNumberGenerator() {
  while (true) {
    const randomNum = Math.random();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield randomNum;
  }
}

(async () => {
  const generator = randomNumberGenerator();
  for await (const num of generator) {
    console.log(`Generated number: ${num}`);
  }
})();
