function outer() {
  const name = "Rakib";
  const me = {
    name: "hi",
  };
  function inner() {
    console.log(name);
  }

  return inner;
}

const fn = outer();
fn();

//==============================================================
function createCounter() {
  let count = 0;

  return function () {
    count++;

    console.log(count);
  };
}

// First call → creates first function execution context
const counter1 = createCounter();

// Second call → creates second function execution context
const counter2 = createCounter();

// two separate execution context

// counter1 references the function from the first call
counter1();
counter1();

// counter2 references the function from the second call
counter2();

//=======================================================================

function createUser() {
  let score = 0;

  return {
    increase() {
      score++;
    },

    getScore() {
      return score;
    },
  };
}

// creates first execution context + first private score
const userA = createUser();

// creates a separate execution context + separate private score
const userB = createUser();

// modifies userA's score
userA.increase();
userA.increase();

// modifies userB's separate score
userB.increase();

// reads userA's score → 2
console.log(userA.getScore());

// reads userB's score → 1
console.log(userB.getScore());

// =======================================================
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log("A", i);
  }, 100);
}

for (var j = 0; j < 3; j++) {
  setTimeout(() => {
    console.log("B", j);
  }, 100);
}
// output is 3 three times because each loop refer the same j variable
// after the timer finishes j is 3
// thats why all the callbacks(3 callbacks scheduled) get the var j 3

// but let is block-scoped, and the for loop creates a separate lexical binding for each iteration when needed.
// so each callback haS its own i variable

// ========================Function factory==========================================
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

// two createMultiplier func exec context is created one with argument 2
const double = createMultiplier(2);
// and other with 3
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));

// What execution contexts are created?
// two createMultiplier func exec context is created one with argument 2 and other with 3

// What does double close over?
// 2
// What does triple close over?
// 3
// Do double and triple share the same multiplier?
// nobecause their exec contexts are diff
// Output?
// 10 and 15
