function createCounter() {
  let counter = 0;

  return {
    increase() {
      counter++;
    },
    getValue() {
      return counter;
    },
  };
}

const counterA = createCounter();
const counterB = createCounter();

counterA.increase();
counterA.increase();
counterA.increase();
console.log(counterA.getValue());
counterB.increase();
console.log(counterB.getValue());
counterA.counter = 100;
console.log(counterA);
