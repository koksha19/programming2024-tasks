async function* randomNumberGenerator() {
  while (true) {
    const randomNum = Math.floor(Math.random() * 10);
    console.log("Random number", randomNum);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield randomNum;
  }
}

async function* asyncMap(iterator, transformFn) {
  for await (const num of iterator) {
    yield transformFn(num);
  }
}

async function main() {
  const generator = randomNumberGenerator();

  const mappedGenerator = asyncMap(generator, (num) => num * num);

  for await (const mappedNum of mappedGenerator) {
    console.log(`Mapped number: ${mappedNum}`);
  }
}

main();
